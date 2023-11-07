<template>
  <section v-for="ideas in idea" class="detailedIdea">
    <div class="detailedIdea__head">
      <span class="detailedIdea__tag">{{ ideas.categoryName }}</span>
      <h1 class="detailedIdea__title">{{ ideas.title }}</h1>
    </div>
    <div class="detailedIdea__content">{{ ideas.description }}</div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      idea: {
        categoryName: '',
        title: '',
        description: ''
      }
    };
  },
  async created() {
    // Access the idea ID from the route parameter
    const ideaId = this.$route.params.id;

    // Fetch idea details based on the ID
    try {
      const response = await axios.get(`https://localhost:7182/Idea/${ideaId}/getIdeaById`);
      this.idea = response.data;
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred while fetching idea details", error);
    }
  }
};
</script>

<style>
@import '@/assets/scss/detailedidea.scss';
</style>
