<template>
    <div class="relative">
        <input :class="getTheme('input')" :placeholder="label" :value="value" type="text" name="global"
            @input="onChange($event.target.value)">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../helpers.js";
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

    color: {
        type: String,
        default: "primary",
        required: false,
    },

    ui: {
        required: false,
        type: Object,
        default: {},
    },
});

const translations = getTranslations();

// Theme
const fallbackTheme = {
    input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
            primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
            dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300",
        },
    },
};
const themeVariables = inject("themeVariables");
const getTheme = (item) => {
    return twMerge(
        get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.global_search, props.ui),
        get_theme_part([item, "color", props.color], fallbackTheme, themeVariables?.inertia_table?.global_search, props.ui),
    );
};
</script>
