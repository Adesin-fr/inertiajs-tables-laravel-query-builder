<template>
    <div class="ijt-global-search">
        <input ref="inputEl" class="ijt-global-search__input" :placeholder="label" :value="localValue" type="text" name="global"
            @input="onInput">
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
import { ref, watch } from "vue";
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

// Local state: the typed text must not be overwritten by a late or stale server response.
const inputEl = ref(null);
const localValue = ref(props.value ?? "");

// While the user is typing, ignore server values (they may be late or stale);
// sync only on external changes such as a reset.
watch(() => props.value, (newValue) => {
    if (document.activeElement === inputEl.value) {
        return;
    }

    localValue.value = newValue ?? "";
});

function onInput(event) {
    localValue.value = event.target.value;
    props.onChange(localValue.value);
}
</script>
