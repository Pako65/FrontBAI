<template>
  <div class="add">
    <h1 class="add__head">Soumettre une idée</h1>
    <form @submit.prevent="createIdea">
      <div class="add__container">
        <div class="add__title">
          <label for="text" class="add__title-up">Titre</label>
          <input class="add__title-down" type="text" placeholder="EX: Mettre une piscine" v-model="title" required>
        </div>

        <div class="add__category">
          <label for="text" class="add__category-up">Catégorie</label>
          <select v-model="selectedCategory" class="add__category-down" required>
            <option v-for="categorie in category" :value="categorie.id" :key="categorie.id">
              {{ categorie.name }}
            </option>
          </select>
        </div>

        <div class="add__content">
          <label for="contenu" class="add__content-up">Contenu</label>
          <textarea class="add__content-down" id="contenu" v-model="contenu" rows="4" cols="80" required></textarea>
        </div>

        <button type="submit" class="add__button">
          <label for="text"></label>
          <span class="add__button-up">Envoyer</span>
          <img class="add__button-down" src="@/assets/images/icon-envoier.png" alt="bouton envoyer">
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      category: [],
      selectedCategory: 1,
      title: "",
      contenu: "",
      showButton: false,
      userEmail: '',
    }
  },
  async mounted() {
    if (process.client) {
      this.userEmail = localStorage.getItem("userEmail");
    }

    await this.fetchCategorie();
  },
  methods: {
    createIdea() {
      const ideaData = {
        title: this.title,
        description: this.contenu,
        fkUsersId: 1,
        ideaGetCategory: [
          {
            categoryId: parseInt(this.selectedCategory),
          },
        ],
        ownerEmail: this.userEmail,
      };
      axios.post("https://localhost:7182/Idea/PostIdea", ideaData)
        .then((response) => {

          Swal.fire({
            title: "Bravo !",
            text: "Votre idée a bien était envoyé",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error(error);

          Swal.fire({
            title: "Erreur !",
            text: "Une erreur est survenu pendant l'envoi de votre idée.",
            icon: "error",
            confirmButtonText: "OK",
          });
        })
    },
    async fetchCategorie() {
      const response = await axios.get('https://localhost:7182/Category/GetAllComment');
      this.category = response.data;
    }
  }
}
</script>

<style>
@import '@/assets/scss/add.scss';
</style>
