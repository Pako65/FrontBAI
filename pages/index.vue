<template>
    <div>
        <section>
            <div class="list">
                <h1 class="list__title">Liste des idées</h1>
                <button class="list__button">
                    <p class="list__p">Trier</p>
                    <img src="@/assets/images/icon-trier.png" alt="bouton trier">
                </button>
            </div>
            <div class="list__idea">
                <ul v-if="idea && idea.length > 0">
                    <li v-for="ideas in idea" :key="idea.id">
                        <div class="list__image">
                            <RouterLink to="/idea/modify">
                                <img src="@/assets/images/icon-modifier.png" alt="Modifier">
                            </RouterLink>
                            <img src="@/assets/images/icon-delete.png" alt="Supprimer">
                            <img src="@/assets/images/coeur-plein.png" alt="Coeur 1">
                            <img src="@/assets/images/coeur-vide.png" alt="Coeur 2">
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <p>{{ formatDate(ideas.createdAt) }}</p>
                                    <!-- formater la date en JJ/MM/AAAA -->
                                </li>
                            </ul>
                        </div>
                        <p>{{ ideas.title }}</p>
                    </li>
                </ul>
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
import moment from 'moment';
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
            const response = await axios.get('https://localhost:7182/api/GetAll');
            this.idea = response.data;
            console.log(this.idea);
        },
        formatDate(createdAt) {
            return moment(createdAt).format("DD/MM/YYYY")
        }
    },
}
</script>

<style scoped>
@import '@/assets/scss/index.scss';
</style>