<template>
    <div class="modify">
        <h1 class="modify__head">Modification d'une idée</h1>
        <form @submit.prevent="submitForm">
            <div class="modify__container">
                <div class="modify__title">
                    <label class="modify__title-up" for="title">Titre</label>
                    <input class="modify__title-down" type="text" id="title" name="title" v-model="form.title" required>
                </div>

                <div class="modify__category">
                    <label class="modify__category-up" for="category">Catégorie</label>
                    <select class="modify__category-down" name="category" id="category" v-model="form.categoryName"
                        @change="updateSelectedCategory" required>
                        <option value="" disabled>Select a category</option>
                        <option v-for="categorie in category" :value="categorie.name">{{ categorie.name }}</option>
                    </select>
                </div>

                <div class="modify__content">
                    <label class="modify__content-up" for="contenu">Contenu</label>
                    <textarea class="modify__content-down" name="contenu" id="contenu" cols="80" rows="4"
                        v-model="form.description" required></textarea>
                </div>

                <button type="submit" class="modify__button">
                    <label for="text"></label>
                    <span class="modify__button-up">Modifier</span>
                    <img class="modify__button-down" src="@/assets/images/icon-modifier-white.png" alt="envoyer">
                </button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            idea: null,
            form: {
                title: '',
                description: '',
                categoryName: '',
            },
            category: [],
            // userId: null,
            selectedCategory: null,
        };
    },
    methods: {
        updateSelectedCategory() {
            const selectedCategoryName = this.form.categoryName;
            const selectedCategory = this.category.find(categorie => categorie.name === selectedCategoryName);
            if (selectedCategory) {
                this.selectedCategoryId = selectedCategory.id;
            } else {
                this.selectedCategory = null;   
            }
        },
        async submitForm() {
            const ideaData = {
                title: this.form.title,
                description: this.form.description,
                fkUsersId: 1, //remplacer par this.userId donc aller chercher la variable userId
                ideaGetCategory: [{
                    categoryId: this.selectedCategoryId, // remplacer la variable par l'id de la catégorie
                }]
            };
            console.log(ideaData);
            const ideaId = this.$route.params.id
            axios.put(`https://localhost:7182/Idea/${ideaId}/PutIdea`, ideaData)
                .then(() => {
                    Swal.fire("Idée modifiée", "", "success", "Ok");
                }).catch((error) => {
                    console.error(error);
                    Swal.fire("Erreur ! ", "", "error", "Ok")
                })
        },
        async fetchCategorie() {
            const response = await axios.get('https://localhost:7182/Category/GetAllCategory');
            this.category = response.data;
        },
    },
    async mounted() {
        this.fetchCategorie();
        try {
            const ideaId = this.$route.params.id
            const response = await axios.get(`https://localhost:7182/Idea/${ideaId}/getIdeaById`);
            this.idea = response.data[0]
            console.log(this.idea)
            this.$nextTick(() => {
                this.form.title = this.idea.title
                this.form.description = this.idea.description
                this.form.categoryName = this.idea.categoryName

            })
        } catch (error) {
            console.error('Error loading data', error);
        }
    },
    // async created() {
    //     const response = await axios.get(`https://localhost:7182/Category/GetAllCategory`);
    //     this.category = response.data;
    //     console.log(this.category)
    // },
};
</script>

<style>
@import '@/assets/scss/modify.scss';
</style>