<template>
    <div>
        <section>
            <div class="list">
                <h1 class="list__title">Liste des idées</h1>
                <button class="list__button" @click="showModal = true">
                    <p class="list__p">Trier</p>
                    <img src="@/assets/images/icon-trier.png" alt="bouton trier">
                </button>
                <Modal :show="showModal" @close="showModal = false" @sort-ideas="sortIdeas" ref="modalComponent" />
            </div>
            <div class="list__idea">
                <ul v-if="idea && idea.length > 0" class="list__ul">
                    <li v-for="ideas in idea" class="list__li">
                        <div class="list__image">
                            <div class="list__image-modifier">
                                <RouterLink to="/idea/modify" v-if="userEmail === ideas.ownerEmail">
                                    <img src="@/assets/images/icon-modifier-black.png" alt="Modifier" class="list__image-modifier-test">
                                </RouterLink>
                            </div>
                            <div class="list__image-delete">
                                <img src="@/assets/images/icon-delete.png" alt="Supprimer"
                                @click="deleteIdea(ideas.ideaId)" v-if="userEmail === ideas.ownerEmail">
                            </div>
                            <img src="@/assets/images/coeur-plein.png" alt="Coeur 1">
                            <img src="@/assets/images/coeur-vide.png" alt="Coeur 2">
                            <p class="list__date">{{ formatDate(ideas.createdAt) }}</p>
                            <p class="list__tag">{{ ideas.categoryName }}</p>
                            <RouterLink :to="'/idea/' + ideas.ideaId" class="list__detailed">
                                <p class="list__content">{{ ideas.title }}</p>
                            </RouterLink>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

    </div>
    <!-- <div>
        <button v-if="user" @click="logout">logout</button>
    </div>
    <div v-if="user">
        <p>Logged in as {{ user.email }}</p>
        <p>user id: {{ user.id }}</p>
    </div>
    <div v-else>Not logged in</div> -->
</template>

<script lang="ts">


import Modal from '@/components/Modal.vue';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            idea: [] as { ideaId: number; title: string; createdAt: string; categoryName: string; ownerEmail: string; }[], // Ajoutez une annotation de type pour idea
            showButton: true,
            activeSortButton: null,
            showModal: false,
            ownerEmail: '',
            userEmail: localStorage.getItem('userEmail') || '', // Définissez userEmail à partir du localStorage
        };
    },

    mounted() {
        this.fetchIdea();
    },
    components: {
        Modal,
    },
    // props: {
    //     ownerEmail: String,
    // },
    methods: {
        sortIdeas(sortType: any) {
            if (sortType === 'A-Z-Title') {
                this.idea.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortType === 'Z-A-Title') {
                this.idea.sort((a, b) => b.title.localeCompare(a.title));
            }

            this.activeSortButton = sortType;
        },
        openModal() {
            this.showModal = true;
        },
        deleteIdea(ideaId: number) {
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
                    axios.delete(`https://localhost:7182/Idea/${ideaId}/DeleteIdeaById`).then(() => {
                        Swal.fire("Supprimé !", "Votre idée a bien été supprimée.", "success").then(() => {
                            location.reload();
                        });
                    }).catch((error) => {
                        console.error("Une erreur est survenue lors de la suppression", error);
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Annulé.", "Votre idée est toujours disponible", "error");
                }
            });
        },
        async fetchIdea() {
            try {
                const response = await axios.get('https://localhost:7182/Idea/GetAll');
                this.idea = response.data;
                console.log(response.data);

            } catch (error) {
                console.error("Une erreur est survenue lors de la récupération des idées", error);
            }
        },
        formatDate(createdAt: string) {
            return moment(createdAt).format("DD/MM/YYYY");
        }
    },
    computed: {
        activeSortButtonExists(): boolean {
            return this.activeSortButton !== null;
        },
    },

}
if (process.client) {
    // Code qui utilise localStorage
    const userEmail = localStorage.getItem('userEmail');
    console.log('Email de l\'utilisateur :', userEmail);
}

</script>

<!-- <script setup lang="ts">

const user = useSupabaseUser();
const router = useRouter();
const client = useSupabaseClient();

const route = useRoute()

async function logout() {
    await client.auth.signOut();

    router.push('/');
}
</script> -->

<style scoped>
@import '@/assets/scss/index.scss';
</style>