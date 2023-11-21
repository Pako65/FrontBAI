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
                                alt="ne pas aimer une idée" @click="removedLikes(ideas.ideaId, userId)">
                            <img v-else src="@/assets/images/coeur-vide.png" alt="aimer une idée"
                                @click="addLikes(ideas.ideaId, userId)">
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
import { useSSRContext } from 'vue';

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
            users: [] as {
                id: string;
                email: string;
                password: string;
                admin: number;
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
            getUsers: [],
            userLikes: [] as number[],
            // userDataId: this.user?.id;
            userId: '',
        };
    },
    mounted() {
        if (process.client) {
            // Utilisez this.userEmail et this.userId au lieu de const
            // this.userEmail = localStorage.getItem('userEmail');
            // this.userId = localStorage.getItem('userId');
        }
        this.loadUserLikes();
        this.fetchIdea();
        this.fetchUsers();
    },
    components: {
        Modal,
    },
    methods: {
        loadUserLikes() {
            try {
                if (this.userId) {
                    this.fetchUserLikes(this.userId);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des likes")
            }
        },
        addLikes(ideaId: number, userId: string) {
            axios.post(`https://localhost:7182/Likes/PostNewLikes?userId=${userId}&ideaId=${ideaId}`, null, {
                headers: {
                    'Authorization': `Bearer ${this.jwt}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    this.fetchUserLikes(userId);
                    this.fetchIdea();
                    return response.data;
                })
                .catch(error => {
                    console.error("Error lors de l'ajout de like", error);
                });
        },
        removedLikes(ideaId: number, userId: string) {
            axios.delete(`https://localhost:7182/Likes/DeleteLikesById?userId=${userId}&ideaId=${ideaId}`, {
                headers: {
                    'Authorization': `Bearer ${this.jwt}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    this.fetchUserLikes(this.userId);
                    this.fetchIdea();
                    return response.data
                }).catch(error => {
                    console.error("Erreur lors de la suppression du like", error)
                })
        },
        getIsLiked(ideaId: number): boolean {

            return this.userLikes.includes(ideaId);
        },
        fetchUserLikes(userId: string) {
            axios.get(`https://localhost:7182/Likes/GetUserLikes?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${this.jwt}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    this.userLikes = response.data;
                    console.log(this.userLikes)
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
                    axios.delete(`https://localhost:7182/Idea/${ideaId}/DeleteIdeaById`, {
                        headers: {
                            'Authorization': `Bearer ${this.jwt}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(() => {
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
                const response = await axios.get('https://localhost:7182/Idea/GetAll', {
                    headers: {
                        'Authorization': `Bearer ${this.jwt}`,
                        'Content-Type': 'application/json',
                    }
                });
                this.idea = response.data;
            } catch (error) {
                console.error("Une erreur est survenue lors de la récupération des idées", error);
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get('https://localhost:7182/Users/GetAllUsers', {
                    headers: {
                        'Authorization': `Bearer ${this.jwt}`,
                        'Content-type': 'application/json',
                    }
                });
                this.users = response.data;

                for (const user of this.users) {
                    if (user.email === this.userEmail) {
                        this.userId = user.id;
                        break;
                    }
                }
                console.log(this.userId)
            } catch (error) {
                console.error("une erreur fetch users index", error)
            }
        },
        formatDate(createdAt: string) {
            return moment(createdAt).format("DD/MM");
        },

    },
    computed: {
        activeSortButtonExists(): boolean {
            return this.activeSortButton !== null;
        },
        jwt() {
            return localStorage.getItem('jwt')
        }
    },

}
</script>

<script setup lang="ts">

const user = useSupabaseUser();

console.log(user)


definePageMeta({
    middleware: ['not-auth']
});

const router = useRouter();
const client = useSupabaseClient();
const route = useRoute();

async function logout() {
    await client.auth.signOut();
    router.push('/login');
}
</script>



<style scoped>
@import '@/assets/scss/index.scss';
</style>
