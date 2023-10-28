<template>
  <nav class="navbar">
    <!-- <RouterLink to="/add-idea">Nouvelle Page</RouterLink> -->
    <div class="navigation">
      <div class="navigation__logo">
        <img alt="Logo Boite a Idees" src="@/assets/images/logo.png" class="navigation__img" />
        <div class="navigation__title">
          <button class="navigation__button">
            <p class="navigation__bai">Boîte à Idées</p>
          </button>
          <h2 class="navigation__human">HUMAN</h2>
          <!-- <img alt="Vague" src="@/assets/images/separation-v2.svg" class="navigation_wave" /> -->
        </div>
      </div>
      <RouterLink to="/idea/add" class="navigation__idea">
        <button class="navigation__add">
          <p class="navigation__p">Ajouter une idée</p>
          <img alt="navigation__logoAdd" src="@/assets/images/icon-ajouter.png" />
        </button>
      </RouterLink>
    </div>
  </nav>

  <section class="listIdea">
    <div class="listIdea__head">
      <h1 class="listIdea__title">Liste des idées</h1>
      <button class="listIdea__button">
        <p class="listIdea__p">Trier</p>
        <img src="@/assets/images/icon-trier.png" alt="bouton trier">
      </button>
    </div>

    <div class="list">
      <ul>
        <li>{{ idea.title }}</li>
      </ul>
    </div>
  </section>

  <RouterLink to="/">
    <button>ICI</button>
  </RouterLink>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      idea: {},
    };
  },
  mounted() {
    this.fetchIdea();
  },
  methods: {
    async fetchIdea() {
      try {
        const response = await axios.get('https://localhost:7182/api/getAll');
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/scss/navbar.scss';
</style>