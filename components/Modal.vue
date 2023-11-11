<template>
    <Transition name="modal">
        <div class="modal__mask" v-if="show">
            <div class="modal__container">
                <div class="modal__header">
                    <h1 class="modal__header-title">Trier</h1>
                    <button class="modal__header-close" @click="closeModal">
                        <img src="@/assets/images/icon-croix.png" alt="Fermer">
                    </button>
                </div>
                <div class="modal__body">
                    <div class="modal__filter">
                        <h3 class="modal__filter-title">Titre</h3>
                        <div class="modal__buttons">
                            <button class="modal__buttons-a" :class="{ active: activeSortButton === 'A-Z-Title' }"
                                @click="selectedFiltrer('A-Z-Title')"> A - Z
                            </button>
                            <button class="modal__buttons-a" :class="{ active: activeSortButton === 'Z-A-Title' }"
                                @click="selectedFiltrer('Z-A-Title')"> Z - A
                            </button>
                        </div>
                    </div>
                    <div class="modal__filter">
                        <h3 class="modal__filter-title">Date</h3>
                        <div class="modal__buttons">
                            <button class="modal__buttons-a" :class="{ active: activeSortButton === 'plus-date' }"
                                @click="selectedFiltrer('plus-date')"> plus récente
                            </button>
                            <button class="modal__buttons-a" :class="{ active: activeSortButton === 'less-date' }"
                                @click="selectedFiltrer('less-date')"> plus ancienne
                            </button>
                        </div>
                    </div>
                    <div class="modal__filter">
                        <h3 class="modal__filter-title">Likes</h3>
                        <div class="modal__buttons">
                            <button class="modal__buttons-a" :class="{ active: activeSortButton === 'plus-likes' }"
                                @click="selectedFiltrer('plus-likes')"> plus liké
                            </button>
                            <button class="modal__buttons-a" :class="{ active: activeSortButton === 'less-likes' }"
                                @click="selectedFiltrer('less-likes')"> moins liké
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </Transition>
</template>
  
<script>
import axios from 'axios'


export default {
    data() {
        return {
            showModal: false,
            activeSortButton: null,
            category: [],
            selectedCategory: '',
        };
    },
    props: {
        show: Boolean
    },
    mounted() {
        this.fetchCategorie();
    },
    methods: {
        handleCategory() {
            if (this.selectedCategory === '') {
                this.selectedCategory = '';
            }
        },
        async fetchCategorie() {
            const response = await axios.get('https://localhost:7182/Category/GetAllCategory');
            this.category = response.data;
        },
        selectedFiltrer(sortType) {
            this.$emit('sort-ideas', sortType)
            this.closeModal();
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
  
<style scoped>
@import '@/assets/scss/modal.scss';
</style>