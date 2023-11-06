<template>
    <div class="modify">
        <h1 class="modify__head">Modification d'une idée</h1>
        <form action="">
            <div class="modify__container">
                <div class="modify__title">
                    <label class="modify__title-up" for="text">Titre</label>
                    <input class="modify__title-down" type="text" required>
                </div>

                <div class="modify__category">
                    <label class="modify__category-up" for="text">Catégorie</label>
                    <select class="modify__category-down" name="" id=""></select>
                </div>

                <div class="modify__content">
                    <label class="modify__content-up" for="text">Contenu</label>
                    <textarea class="modify__content-down" name="contenu" id="contenu" cols="80" rows="4"
                        required></textarea>
                </div>

                <button class="modify__button">
                    <label for="text"></label>
                    <span class="modify__button-up">Modifier</span>
                    <img class="modify__button-down" src="@/assets/images/icon-modifier-white.png" alt="envoyer">
                </button>
            </div>
        </form>
    </div>
</template>

<style>
@import '@/assets/scss/modify.scss';
</style>