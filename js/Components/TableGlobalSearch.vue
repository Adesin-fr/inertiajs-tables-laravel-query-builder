<template>
    <div class="ijt-global-search">
        <input class="ijt-global-search__input" :placeholder="label" :value="value" type="text" name="global"
            @input="onChange($event.target.value)">
        <div class="ijt-global-search__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { getTranslations } from "../translations.js";

const props = defineProps({
    label: {
        type: String,
        default: "Search...",
        required: false,
    },

    value: {
        type: String,
        default: "",
        required: false,
    },

    onChange: {
        type: Function,
        required: true,
    },
});

const translations = getTranslations();
</script>
