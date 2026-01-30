<template>
    <div class="ijt-resize-handle" :class="{
        'ijt-resize-handle--active': isActive,
        'ijt-resize-handle--visible': isActive
    }" @mousedown="startResize">

        <!-- Main indicator (separator line) -->
        <div class="ijt-resize-handle__separator"></div>

        <!-- Resize indicator (handle) -->
        <div class="ijt-resize-handle__grip">
            <div class="ijt-resize-handle__grip-dots">
                <div class="ijt-resize-handle__grip-dot"></div>
                <div class="ijt-resize-handle__grip-dot"></div>
                <div class="ijt-resize-handle__grip-dot"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    columnKey: {
        type: String,
        required: true,
    },
    onResize: {
        type: Function,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const startResize = (event) => {
    props.onResize(event, props.columnKey);
};
</script>
