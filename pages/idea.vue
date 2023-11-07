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


                                <RouterLink :to="'/idea/modify/' + ideas.ideaId" v-if="userEmail === ideas.ownerEmail">
                                    <img src="@/assets/images/icon-modifier-black.png" alt="Modifier"
                                        class="list__image-modifier-test">
                                </RouterLink>


                            </div>
                            <div class="list__image-delete">
                                <img src="@/assets/images/icon-delete.png" alt="Supprimer" @click="deleteIdea(ideas.ideaId)"
                                    v-if="userEmail === ideas.ownerEmail">
                            </div>
                            <img src="@/assets/images/coeur-plein.png" alt="Coeur 1">
                            <img src="@/assets/images/coeur-vide.png" alt="Coeur 2">
                            <p class="list__date">{{ formatDate(ideas.createdAt) }}</p>
                            <p class="list__tag">{{ ideas.categoryName }}</p>


                            <RouterLink :to="'/idea/' + ideas.ideaId" class="list__detailed">
                                <p class="list__content">{{ shortText(ideas.title, 60) }}</p>
                            </RouterLink>


                            {{ ideas.userId }}
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

// regarde pour comment définir le localStorage tu as une réponse a la fin du fichier qui a l'air intéressant
import Modal from '@/components/Modal.vue';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            idea: [] as { ideaId: number; title: string; createdAt: string; categoryName: string; ownerEmail: string; userId: string; }[],
            showButton: true,
            activeSortButton: null,
            showModal: false,
            ownerEmail: '',
            userEmail: localStorage.getItem('userEmail') || '',
        };
    },

    mounted() {
        this.fetchIdea();

    },
    components: {
        Modal,
    },
    methods: {
        shortText(description: String, maxLength: number) {
            if (description.length <= maxLength) {
                return description
            } else {
                return description.substring(0, maxLength) + "...";
            }
        },
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
                console.log(this.idea);
                
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

// if (process.client) {
//     const userEmail = localStorage.getItem('userEmail');
// }

</script>
<!-- 
<script setup lang="ts">

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




<!-- Dans le code que vous avez fourni, vous utilisez localStorage pour récupérer la valeur de l'utilisateur (userEmail) stockée localement. Cependant, l'erreur que vous avez rencontrée, localStorage is not defined, indique que localStorage n'est pas accessible dans l'environnement où le code est exécuté. Cela peut se produire si le code est exécuté côté serveur ou dans un contexte qui ne prend pas en charge localStorage.

Pour utiliser localStorage de manière sûre, assurez-vous que vous êtes dans un environnement de navigateur, car localStorage est spécifique au navigateur. Cela signifie que vous devez vous assurer que le code est exécuté dans le navigateur, par exemple, dans un composant Vue.js qui est rendu dans une page web.

Dans votre code, vous avez déjà fait cela en utilisant la clause if (process.client) pour vérifier si le code est exécuté côté client, mais vous devez également mettre en place le stockage local de l'utilisateur dans localStorage. Voici comment vous pourriez le faire :

Lorsque l'utilisateur est authentifié, stockez son email dans localStorage :

// Après que l'utilisateur soit authentifié, stockez son email dans localStorage
localStorage.setItem('userEmail', user.email);
Lorsque l'utilisateur se déconnecte, supprimez la valeur de userEmail de localStorage :

// Lorsque l'utilisateur se déconnecte, supprimez la valeur de userEmail de localStorage
localStorage.removeItem('userEmail');
Pour accéder à la valeur de userEmail ultérieurement, vous pouvez l'obtenir de localStorage comme vous l'avez déjà fait :

userEmail: localStorage.getItem('userEmail') || '',
Assurez-vous que vous stockez et récupérez la valeur de userEmail dans les bons endroits de votre code en fonction du cycle de vie de l'authentification de l'utilisateur.

Notez que l'utilisation de localStorage pour stocker des informations sensibles comme l'email de l'utilisateur peut poser des problèmes de sécurité, car les données stockées dans localStorage sont accessibles côté client et peuvent être modifiées par l'utilisateur. Assurez-vous de prendre en compte les implications de sécurité lors de l'utilisation de localStorage pour stocker des données sensibles.


 -->

