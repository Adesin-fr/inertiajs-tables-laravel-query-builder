<template>
    <div class="column-resize-handle" :class="{
        'resizing': isActive,
        'visible': isActive
    }" @mousedown="startResize">

        <!-- Indicateur principal (ligne de séparation) -->
        <div class="resize-separator"></div>

        <!-- Indicateur de redimensionnement (poignée) -->
        <div class="resize-grip">
            <div class="grip-dots">
                <div class="grip-dot"></div>
                <div class="grip-dot"></div>
                <div class="grip-dot"></div>
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

<style scoped>
.column-resize-handle {
    position: absolute;
    right: -4px;
    /* Centré sur le bord */
    top: 0;
    bottom: 0;
    width: 8px;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.1s ease;
}

.column-resize-handle:hover,
.column-resize-handle.resizing,
.column-resize-handle.visible {
    opacity: 1;
}

.column-resize-handle:active {
    transform: scaleX(1.2);
}

/* Ligne de séparation entre les colonnes */
.resize-separator {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(to bottom,
            transparent 0%,
            #3b82f6 10%,
            #3b82f6 90%,
            transparent 100%);
    transform: translateX(-50%);
    opacity: 0.6;
    transition: all 0.2s ease;
}

.column-resize-handle:hover .resize-separator {
    background: linear-gradient(to bottom,
            transparent 0%,
            #1d4ed8 10%,
            #1d4ed8 90%,
            transparent 100%);
    width: 3px;
    opacity: 0.8;
}

/* Poignée de redimensionnement */
.resize-grip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #3b82f6;
    border: 1px solid #ffffff;
    border-radius: 4px;
    width: 6px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.column-resize-handle:hover .resize-grip {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
    background: #1d4ed8;
}

.column-resize-handle.resizing .resize-grip {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
    background: #1e40af;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Petits points sur la poignée */
.grip-dots {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
}

.grip-dot {
    width: 2px;
    height: 2px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.8;
}

/* Afficher l'indicateur quand on survole l'en-tête de colonne */
th:hover .column-resize-handle {
    opacity: 1;
}

/* Animation d'apparition lors du survol */
@keyframes fadeInResize {
    from {
        opacity: 0;
        transform: translateX(4px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

th:hover .column-resize-handle {
    animation: fadeInResize 0.15s ease-out;
}

/* Indicateur permanent mais subtil */
.resize-separator::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    background: #cbd5e1;
    border-radius: 50%;
    opacity: 0.3;
    transition: opacity 0.2s ease;
}

th:hover .resize-separator::after {
    opacity: 0;
}

/* Styles pour afficher les indicateurs sur survol de la table */
:global(.show-resize-indicators) th .column-resize-handle {
    opacity: 1;
}

:global(.show-resize-indicators) th .column-resize-handle .resize-separator {
    opacity: 0.4;
}

:global(.show-resize-indicators) th .column-resize-handle .resize-separator::after {
    opacity: 0.6;
}

/* Indicateur de zone de redimensionnement au repos */
.column-resize-handle::before {
    content: '';
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 2px;
    right: 2px;
    background: rgba(59, 130, 246, 0.05);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.2s ease;
}

:global(.show-resize-indicators) th .column-resize-handle::before {
    opacity: 1;
}

.column-resize-handle:hover::before {
    background: rgba(59, 130, 246, 0.1);
}

/* Afficher la poignée quand on survole l'en-tête de colonne */
th:hover .column-resize-handle {
    opacity: 1;
}

/* Styles globaux pour le redimensionnement avec débordement */
:global(body.is-resizing-columns) {
    cursor: col-resize !important;
}

:global(body.is-resizing-columns *) {
    cursor: col-resize !important;
    user-select: none !important;
}

/* Améliorer l'apparence du scroll horizontal */
:global(.overflow-x-auto::-webkit-scrollbar) {
    height: 8px;
}

:global(.overflow-x-auto::-webkit-scrollbar-track) {
    background: #f1f5f9;
    border-radius: 4px;
}

:global(.overflow-x-auto::-webkit-scrollbar-thumb) {
    background: #cbd5e1;
    border-radius: 4px;
}

:global(.overflow-x-auto::-webkit-scrollbar-thumb:hover) {
    background: #94a3b8;
}
</style>
