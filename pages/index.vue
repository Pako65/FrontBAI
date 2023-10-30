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
                            <img src="@/assets/images/icon-delete.png" alt="Supprimer" @click="deleteIdea(ideas.id)">
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
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
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
        deleteIdea(id) {
            Swal.fire({
                title: "Vous êtes sûr ?",
                text: "Vous ne pourrez pas revenir en arrière !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Oui je supprime !",
                cancelButtonText: "Annulez !",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://localhost:7182/api/${id}/DeleteIdeaById`).then(() => {
                        Swal.fire("Supprimé !", "Votre idée à bien été supprimée.", "success").then(() => {
                            location.reload();
                        })
                    }).catch((error) => {
                        console.error("Une erreur est survenu lors de la suppression", error);
                    });
                } else if (result.dismiss === Swal.DissmissReason.cancel) {
                    Swal.fire("Annulé.", "Votre idée est toujours disponible", "error");
                }
            })
        },
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