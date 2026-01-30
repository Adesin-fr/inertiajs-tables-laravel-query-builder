<template>
    <OnClickOutside :do="hide">
        <div class="ijt-dropdown">
            <button ref="button" type="button" :dusk="dusk" :disabled="disabled" class="ijt-dropdown__trigger"
                :class="{ 'ijt-dropdown__trigger--disabled': disabled }"
                aria-haspopup="true" @click.prevent="toggle">
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
import { ref, watch, onMounted } from "vue";

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

function toggle() {
    opened.value = !opened.value;
}

function hide() {
    opened.value = false;
}

watch(opened, () => {
    popper.value.update();
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
        modifiers: [flip, preventOverflow],
    });
});

defineExpose({ hide });
</script>
