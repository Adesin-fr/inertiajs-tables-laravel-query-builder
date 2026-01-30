<template>
    <div class="ijt-filter">
        <button ref="trigger" @click="toggleDropdown" class="ijt-filter__button"
            :class="{ 'ijt-filter__button--active': hasActiveSearch }"
            :dusk="`column-search-${columnKey}`">
            <svg xmlns="http://www.w3.org/2000/svg" class="ijt-filter__button-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <!-- Teleported Dropdown with Popper -->
        <Teleport to="body">
            <div v-if="isDropdownOpen" ref="container"
                class="ijt-filter__dropdown ijt-column-search" style="z-index: 9999;"
                @click.stop>
                <h3 class="ijt-column-search__header">
                    {{ translations.search }} {{ columnLabel }}
                </h3>
                <div class="ijt-column-search__content">
                    <input ref="searchInput" type="text" :value="currentSearchValue" class="ijt-column-search__input"
                        :placeholder="`${translations.search} ${columnLabel.toLowerCase()}...`"
                        @input="onSearchInput" @keydown.enter="closeDropdown" @keydown.escape="closeDropdown" />
                    <div v-if="currentSearchValue && currentSearchValue !== ''" class="ijt-column-search__reset">
                        <button type="button" class="ijt-search-row__remove-button" @click="onSearchChange('')">
                            <span class="ijt-sr-only">{{ translations.reset }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ijt-search-row__remove-icon" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Backdrop -->
        <Teleport to="body">
            <div v-if="isDropdownOpen" class="ijt-filter__backdrop" style="z-index: 9998;" @click="closeDropdown" />
        </Teleport>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, Teleport, nextTick } from "vue";
import { getTranslations } from "../translations.js";
import { usePopper } from "../composables/usePopper.js";

const props = defineProps({
    columnKey: {
        type: String,
        required: true,
    },
    columnLabel: {
        type: String,
        required: true,
    },
    searchInputs: {
        type: Array,
        required: true,
    },
    onSearchChange: {
        type: Function,
        required: true,
    },
});

const translations = getTranslations();

const isDropdownOpen = ref(false);
const searchInput = ref(null);

// Configuration Popper.js
const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
        { name: 'offset', options: { offset: [0, 4] } },
        { name: 'preventOverflow', options: { padding: 8 } },
        { name: 'flip', options: { fallbackPlacements: ['top-end', 'bottom-start', 'top-start'] } }
    ],
});

// Find searchinput for this column
const columnSearchInput = computed(() => {
    return props.searchInputs.find(input => input.key === props.columnKey);
});

// Get the current value of the search input for this column
const currentSearchValue = computed(() => {
    return columnSearchInput.value ? columnSearchInput.value.value || '' : '';
});

// Check if there is an active search
const hasActiveSearch = computed(() => {
    return currentSearchValue.value !== '';
});

async function toggleDropdown() {
    if (columnSearchInput.value) {
        isDropdownOpen.value = !isDropdownOpen.value;

        if (isDropdownOpen.value) {
            // Focus the input after the dropdown is rendered
            await nextTick();
            if (searchInput.value) {
                searchInput.value.focus();
            }
        }
    }
}

function closeDropdown() {
    isDropdownOpen.value = false;
}

function onSearchInput(event) {
    const value = event.target.value;
    onSearchChange(value);
}

function onSearchChange(value) {
    props.onSearchChange(props.columnKey, value);
}

// Close the dropdown when clicking outside
function handleClickOutside(event) {
    if (container.value && !container.value.contains(event.target) && !event.target.closest(`[dusk="column-search-${props.columnKey}"]`)) {
        closeDropdown();
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
