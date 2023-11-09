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
    const ideaId = this.$route.params.id;

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
