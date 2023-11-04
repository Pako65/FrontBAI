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
                </div>
            </div>

        </div>
    </Transition>
</template>
  
<script>
export default {
    data() {
        return {
            showModal: false,
            activeSortButton: null,
        };
    },
    props: {
        show: Boolean
    },
    methods: {
        selectedFiltrer(sortType) {
            this.$emit('sort-ideas', sortType)
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