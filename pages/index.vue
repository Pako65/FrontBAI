<template>
    <div>
        <section class="listIdea">
            <div class="listIdea__head">
                <h1 class="listIdea__title">Liste des idées</h1>
                <button class="listIdea__button">
                    <p class="listIdea__p">Trier</p>
                    <img src="@/assets/images/icon-trier.png" alt="bouton trier">
                </button>
            </div>
            <div class="list">
                <ul v-if="idea && idea.length > 0">
                    <li v-for="ide in idea" :key="ide.id">
                        {{ ide.title }} <!-- Remplacez "titre" par le nom de la propriété des idées à afficher -->
                    </li>
                </ul>
                <p v-else>Aucune idée n'a été trouvée.</p>
            </div>
        </section>

        <h1>Hello World</h1>
        <RouterLink to="/test" class="test">
            Go vers test
        </RouterLink>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            idea: [],
        };
    },
    mounted() {
        this.fetchIdea();
    },
    methods: {
        async fetchIdea() {
                const response = await axios.get('https://localhost:7182/api/getAll');
                this.idea = response.data;
        },
    },
}
</script>

<style scoped>
@import '@/assets/scss/index.scss';
</style>