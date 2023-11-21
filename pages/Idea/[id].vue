<template>
  <section v-for="ideas in idea" class="detailedIdea">
    <div class="detailedIdea__head">
      <span class="detailedIdea__tag">{{ ideas.categoryName }}</span>
      <h1 class="detailedIdea__title">{{ ideas.title }}</h1>
    </div>
    <div class="detailedIdea__content">{{ ideas.description }}</div>


    <div v-if="!addingComment" class="detailedIdea__newComment">
      <button type="submit" class="detailedIdea__new" @click="addingComment = true">
        <label for="text"></label>
        <span class="detailedIdea__new-up">Ajouter un commentaire</span>
        <img class="detailedIdea__new-down" src="@/assets/images/icon-ajouter.png" alt="Ajouter nouvelle idée">
      </button>
    </div>
    <div class="detailedIdea__newCom" v-else>
      <textarea class="detailedIdea__newCom-up" v-model="text" placeholder="Ajouter un commentaire..."
        required></textarea>
      <button class="detailedIdea__newCom-down" @click.prevent="createComment" :disabled="text.trim().length === 0">
        <span class="detailedIdea__send">Envoyer</span>
        <img class="detailedIdea__img" src="@/assets/images/icon-envoier.png" alt="envoie nouveau commentaire">
      </button>
    </div>

    <section v-if="comment && comment.length > 0">
      <div class="detailedIdea__comment" v-for="comments in comment">


        <div class="detailedIdea__text">

          <p v-if="editingCommentId !== comments.id" class="detailedIdea__description">{{ comments.text }}</p>

          <input v-else class="detailedIdea__input" v-model="comments.text" />

          <p class="detailedIdea__date">{{ formatDate(comments.createdAt) }}</p>

        </div>

        <div class="detailedIdea__icon">

          <img v-if="editingCommentId !== comments.id" src="@/assets/images/icon-modifier-black.png"
            alt="modifier un commentaire" @click="toggleEditing(comments.id)">

          <img v-if="editingCommentId !== comments.id" src="@/assets/images/icon-delete.png"
            alt="supprimer un commentaire" @click="removedComment(comments.id)">

          <button v-else @click="submitForm(comments.id)">Modifier</button>

        </div>


      </div>
    </section>
    <div v-else>
      <div class="detailedIdea__noComment">
        <h1 class="detailedIdea__noCom">Pas de commentaire pour cette idée</h1>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';
import moment from 'moment'
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      idea: {
        categoryName: '',
        title: '',
        description: ''
      },
      comment: [],
      addingComment: false,
      editingCommentId: null,
      text: "",
      userId: '',
      commentId: '',
    };
  },
  async mounted() {
    if (process.client) {
      this.userEmail = localStorage.getItem("userEmail");
      this.userId = localStorage.getItem("userId");
      console.log(this.userId)
    }
  },
  computed: {
    jwt() {
      return localStorage.getItem('jwt');
    }
  },
  methods: {
    removedComment(commentId) {
      axios.delete(`https://localhost:7182/Comments/${commentId}/DeleteComments`, {
        headers: {
          'Authorization': `Bearer ${this.jwt}`,
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          const ideaId = this.$route.params.id;
          const commentResponse = axios.get(`https://localhost:7182/Comments/${ideaId}/GetByIdeaId`);
          this.comment = commentResponse.data;
          Swal.fire("Commentaire supprimé", "", "success");
          return response.data
        }).catch(error => {
          console.error("ah bah non", error)
        })
    },
    toggleEditing(commentId) {
      this.editingCommentId = (this.editingCommentId === commentId) ? null : commentId;
    },
    formatDate(createdAt) {
      return moment(createdAt).format("DD/MM/YYYY")
    },
    submitForm(commentId) {
      const modifyData = {
        text: this.text,
        userId: this.userId,
        ideaId: this.ideaId,
      };
      console.log(this.commentId)

      axios.put(`https://localhost:7182/Comments/${commentId}/ModifyComments`, modifyData, {
        headers: {
          'Authorization': `Bearer ${this.jwt}`,
          'Content-Type': 'application/json',
        }
      })
        .then(() => {
          Swal.fire("Commentaire modifié", "", "success");
          this.editingCommentId = null;
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("Erreur ! ", "", "error");
        });
    },
    async createComment() {
      const commentData = {
        text: this.text,
        userId: this.userId,
        ideaId: this.$route.params.id,
      };
      console.log(this.userId);
      try {
        await axios.post(`https://localhost:7182/Comments/CreateNewComments`, commentData, {
          headers: {
            'Authorization': `Bearer ${this.jwt}`,
            'Content-Type': 'application/json',
          }
        });

        const ideaId = this.$route.params.id;
        const commentResponse = await axios.get(`https://localhost:7182/Comments/${ideaId}/GetByIdeaId`, {
          headers: {
            'Authorization': `Bearer ${this.jwt}`,
            'Content-Type': 'application/json',
          }
        });
        this.comment = commentResponse.data;

        Swal.fire({
          title: "Bravo !",
          text: "Votre commentaire a bien été envoyé",
          icon: "success",
          confirmButtonText: "OK",
        });

        this.text = "";
        this.addingComment = false;
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Erreur !",
          text: "Une erreur est survenue pendant l'envoi de votre commentaire.",
          confirmButtonText: "OK",
        });
      }
    },
  },
  async created() {
    const ideaId = this.$route.params.id;
    //fetch idea
    try {
      const response = await axios.get(`https://localhost:7182/Idea/${ideaId}/getIdeaById`, {
        headers: {
          'Authorization': `Bearer ${this.jwt}`,
          'Content-Type': 'application/json',
        }
      });
      this.idea = response.data;
    } catch (error) {
      console.error("erreur pendant le fetch de l'idée", error);
    }
    //fetch comment
    try {
      const response = await axios.get(`https://localhost:7182/Comments/${ideaId}/GetByIdeaId`, {
        headers: {
          'Authorization': `Bearer ${this.jwt}`,
          'Content-Type': 'application/json',
        }
      });
      this.comment = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(response.data);
    } catch (error) {
      console.error("error fetch comment", error);
    }
  }
}

</script>

<style>
@import '@/assets/scss/detailedIdea.scss';
</style>
