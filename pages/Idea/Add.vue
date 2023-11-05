<template>
  <div class="add">
    <h1>Soumettre une idée</h1>


    <!-- les champs doivent etre obligatoires  -->
    <div class="add__title">
      <label for="text">Titre</label>
      <!-- <p>Titre</p> -->
      <input type="text" placeholder="EX: Mettre une piscine" v-model="title" required>
    </div>

    <div class="add__category">
      <p>Catégorie</p>
      <select v-model="selectedCategory">
        <option v-for="categorie in category" :value="categorie.id" :key="categorie.id">
          {{ categorie.name }}
        </option>
      </select>
    </div>

    <div>
      <p>Contenu</p>
      <textarea id="contenu" v-model="contenu" rows="4" cols="80" required></textarea>
    </div>

    <button>
      <p>Envoyez</p>
      <img src="@/assets/images/icon-envoier.png" alt="bouton envoyer" @click="createIdea()">
    </button>
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


