<template>
    <OnClickOutside :do="hide">
        <div class="ijt-dropdown">
            <button ref="button" type="button" :dusk="dusk" :disabled="disabled" class="ijt-dropdown__trigger"
                :class="{ 'ijt-dropdown__trigger--disabled': disabled }" aria-haspopup="true" @click.prevent="toggle">
                <slot name="button" />
            </button>

            <div v-show="opened" ref="tooltip" class="ijt-dropdown__panel">
                <slot />
            </div>
        </div>
    </OnClickOutside>
</template>

<script setup>
import OnClickOutside from "./OnClickOutside.vue";
import { createPopper } from "@popperjs/core/lib/popper-lite";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import flip from "@popperjs/core/lib/modifiers/flip";
import eventListeners from "@popperjs/core/lib/modifiers/eventListeners";
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

const emit = defineEmits(["closed", "opened"]);

const props = defineProps({
    placement: {
        type: String,
        default: "bottom-start",
        required: false,
    },

    active: {
        type: Boolean,
        default: false,
        required: false,
    },

    dusk: {
        type: String,
        default: null,
        required: false,
    },

    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
});

const opened = ref(false);
const popper = ref(null);

const setDropdownMaxHeight = {
    name: "setDropdownMaxHeight",
    enabled: true,
    phase: "write",
    fn({ state }) {
        const popperElement = state.elements.popper;
        if (!popperElement) return;

        // Keep a little breathing room so the panel never touches the viewport edges.
        const viewportPadding = 12;
        const rect = popperElement.getBoundingClientRect();
        const placement = state.placement || "bottom";

        let available;
        if (placement.startsWith("top")) {
            // Popper is above the reference; available space is from top of viewport to popper bottom.
            available = rect.bottom - viewportPadding;
        } else {
            // Popper is below the reference; available space is from popper top to bottom of viewport.
            available = window.innerHeight - rect.top - viewportPadding;
        }

        // Avoid collapsing to 0 in extreme edge cases.
        const maxHeight = Math.max(available, 160);
        popperElement.style.maxHeight = `${maxHeight}px`;
        popperElement.style.overflowY = "auto";
        popperElement.style.overscrollBehavior = "contain";
        popperElement.style.webkitOverflowScrolling = "touch";
    },
};

function toggle() {
    opened.value = !opened.value;
}

function hide() {
    opened.value = false;
}

watch(opened, () => {
    if (opened.value && popper.value) {
        nextTick(() => popper.value.update());
    }
    if (!opened.value) {
        emit("closed");
    }
    if (opened.value) {
        emit("opened");
    }
});

const button = ref(null);
const tooltip = ref(null);

onMounted(() => {
    popper.value = createPopper(button.value, tooltip.value, {
        placement: props.placement,
        modifiers: [eventListeners, flip, preventOverflow, setDropdownMaxHeight],
    });
});

onBeforeUnmount(() => {
    if (popper.value) {
        popper.value.destroy();
        popper.value = null;
    }
});

defineExpose({ hide });
</script>
