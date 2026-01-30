<template>
    <ButtonWithDropdown ref="dropdown" @closed="menuClosed" @opened="isMenuDisplayed=true">
        <template #button>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="ijt-button__icon">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        </template>

        <div role="menu" aria-orientation="horizontal" aria-labelledby="bulk-actions-menu" class="ijt-dropdown__content" style="min-width: 14rem;" @click="isMenuDisplayed=false" v-show="isMenuDisplayed">
            <slot/>
        </div>
    </ButtonWithDropdown>
</template>

<script setup>
import ButtonWithDropdown from "./ButtonWithDropdown.vue";
import { ref } from "vue";

const props = defineProps({});

const isMenuDisplayed = ref(false);

function menuClosed() {
    isMenuDisplayed.value = false;
}
</script>
