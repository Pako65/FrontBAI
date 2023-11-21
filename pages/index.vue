<!-- <template>
    <h1>index</h1>

    <NuxtLink to="/idea">
        <button style="height: 20px;">PAGE IDEA</button>
    </NuxtLink>
    <NuxtLink to="/idea/add">
        <button style="height: 20px;">PAGE add idea</button>
    </NuxtLink>
</template> -->

<template>
    <div>
        <form @submit.prevent></form>
    </div>
    <div class="auth">
        <div class="auth__hello" v-if="user">
            <p>Bonjour {{ user.email }}</p>
        </div>
        <div v-else>
            <p>you are not logged in
                <NuxtLink to="/login">login</NuxtLink> or
                <NuxtLink to="/register">register</NuxtLink>
            </p>
        </div>
        <div>
            <div class="separator"></div>
            <button class="auth__login" v-if="user" @click="logout">Se déconnecter</button>
            <div class="separator"></div>
        </div>
    </div>
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
                            <NuxtLink :to="'/idea/modify/' + ideas.ideaId" v-if="userEmail === ideas.ownerEmail">
                                <img src="@/assets/images/icon-modifier-black.png" alt="Modifier"
                                    class="list__image-modifier-test">
                            </NuxtLink>
                        </div>
                        <div class="list__image-delete">
                            <img src="@/assets/images/icon-delete.png" alt="Supprimer" @click="deleteIdea(ideas.ideaId)"
                                v-if="userEmail === ideas.ownerEmail">
                        </div>
                        <div class="list__image-like">
                            <img v-if="getIsLiked(ideas.ideaId)" src="@/assets/images/coeur-plein.png"
                                alt="ne pas aimer une idée" @click="removedLikes(ideas.ideaId, userDataId)">
                            <img v-else src="@/assets/images/coeur-vide.png" alt="aimer une idée"
                                @click="addLikes(ideas.ideaId, userDataId)">
                            <p class="list__image-total">{{ ideas.totalLikes }}</p>
                        </div>


                        <p class="list__date">{{ formatDate(ideas.createdAt) }}</p>
                        <p class="list__tag">{{ ideas.categoryName }}</p>
                        <NuxtLink :to="'/idea/' + ideas.ideaId" class="list__detailed">
                            <p class="list__content">{{ shortText(ideas.title, 60) }}</p>
                        </NuxtLink>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts">
//regarder pour faire une requete test avec postman

import Modal from '@/components/Modal.vue';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            idea: [] as {
                ideaId: number;
                title: string;
                createdAt: string;
                categoryName: string;
                ownerEmail: string;
                userId: number;
                isLiked: false;
                totalLikes: number;
            }[],
            likesByIdea: {} as Record<number, number[]>,
            likes: [],
            total: [],
            showButton: true,
            activeSortButton: null,
            showModal: false,
            ownerEmail: '',
            userEmail: localStorage.getItem('userEmail') || '',
            isLiked: false,
            userLikes: [] as number[],
            userDataId: localStorage.getItem('userId') || '',
        };
    },
    mounted() {
        if (process.client) {
            const userEmail = localStorage.getItem('userEmail');
            const userDataId = localStorage.getItem('userId');
        }
        this.loadUserLikes();
        this.fetchIdea();
        // this.fetchUsers();
    },
    components: {
        Modal,
    },
    methods: {
        loadUserLikes() {
            try {
                if (this.userDataId) {
                    this.fetchUserLikes(this.userDataId);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des likes")
            }
        },
        addLikes(ideaId: number, userDataId: string) {
            axios.post(`https://localhost:7182/Likes/PostNewLikes?userId=${userDataId}&ideaId=${ideaId}`)
                .then((response) => {
                    this.fetchUserLikes(userDataId);
                    this.fetchIdea();

                    return response.data;
                })
                .catch(error => {
                    console.error("Error lors de l'ajout de like", error);
                });
        },
        removedLikes(ideaId: number, userDataId: string) {
            axios.delete(`https://localhost:7182/Likes/DeleteLikesById?userId=${userDataId}&ideaId=${ideaId}`)
                .then(response => {
                    this.fetchUserLikes(userDataId);
                    this.fetchIdea();
                    return response.data
                }).catch(error => {
                    console.error("Erreur lors de la suppression du like", error)
                })
        },
        getIsLiked(ideaId: number): boolean {

            return this.userLikes.includes(ideaId);
        },
        fetchUserLikes(userDataId: string) {
            axios.get(`https://localhost:7182/Likes/GetUserLikes?userId=${userDataId}`)
                .then(response => {
                    this.userLikes = response.data;
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des likes de l'utilisateur", error);
                });
        },
        shortText(description: String, maxLength: number) {
            if (description.length <= maxLength) {
                return description
            } else {
                return description.substring(0, maxLength) + "...";
            }
        },
        sortIdeas(sortType: any) {
            switch (sortType) {
                case "A-Z-Title":
                    this.idea.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "Z-A-Title":
                    this.idea.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case "plus-date":
                    this.idea.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
                    break;
                case "less-date":
                    this.idea.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
                    break;
                case "plus-likes":
                    this.idea.sort((a, b) => b.totalLikes - a.totalLikes);
                    break;
                case "less-likes":
                    this.idea.sort((a, b) => a.totalLikes - b.totalLikes)
                    break;
                default:
                    break;
            }
            this.activeSortButton = sortType
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
                            this.fetchIdea();
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

            } catch (error) {
                console.error("Une erreur est survenue lors de la récupération des idées", error);
            }
        },
        formatDate(createdAt: string) {
            return moment(createdAt).format("DD/MM");
        }
    },
    computed: {
        activeSortButtonExists(): boolean {
            return this.activeSortButton !== null;
        },
    },

}
</script>

<script setup lang="ts">

definePageMeta({
    middleware: ['not-auth']
})
const user = useSupabaseUser();
const router = useRouter();
const client = useSupabaseClient();
console.log(user);


const route = useRoute()

async function logout() {
    await client.auth.signOut();

    router.push('/login');
}


</script>


<style scoped>
@import '@/assets/scss/index.scss';
</style>
