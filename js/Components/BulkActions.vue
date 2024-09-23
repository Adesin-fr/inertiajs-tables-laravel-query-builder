<template>
    <ButtonWithDropdown ref="dropdown" class="w-auto" :color="color" @closed="menuClosed" @opened="isMenuDisplayed=true">
        <template #button>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-5 w-5 text-gray-400">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        </template>

        <div role="menu" aria-orientation="horizontal" aria-labelledby="bulk-actions-menu" class="w-56" @click="isMenuDisplayed=false" v-show="isMenuDisplayed">
            <slot/>
        </div>
    </ButtonWithDropdown>
</template>

<script setup>
import ButtonWithDropdown from "./ButtonWithDropdown.vue";
import {getTranslations} from "../translations.js";
import {ref, watch} from "vue";

const translations = getTranslations();

const props = defineProps({
    color: {
        type: String,
        default: "primary",
        required: false,
    },
});

const isMenuDisplayed = ref(false);

function menuClosed() {
    isMenuDisplayed.value = false;
}
</script>
