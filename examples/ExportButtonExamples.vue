<!-- 
Exemple complet d'utilisation du slot exportButton personnalisé
Ce fichier montre différentes façons d'utiliser le nouveau slot
-->
<template>
    <div class="space-y-8 p-6">
        <h1 class="text-3xl font-bold text-gray-900">Exemples de boutons export personnalisés</h1>
        
        <!-- Exemple 1: Bouton simple avec style personnalisé -->
        <section>
            <h2 class="text-xl font-semibold mb-4">1. Bouton simple personnalisé</h2>
            <Table :resource="sampleData" name="simple-example" :show-export-button="true">
                <template #exportButton="{ exportUrl, translations }">
                    <a :href="exportUrl" 
                        class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {{ translations.export_csv }}
                    </a>
                </template>
            </Table>
        </section>

        <!-- Exemple 2: Bouton avec confirmation -->
        <section>
            <h2 class="text-xl font-semibold mb-4">2. Bouton avec confirmation</h2>
            <Table :resource="sampleData" name="confirmation-example" :show-export-button="true">
                <template #exportButton="{ exportUrl, translations }">
                    <button @click="confirmExport(exportUrl)"
                        class="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Exporter avec confirmation
                    </button>
                </template>
            </Table>
        </section>

        <!-- Exemple 3: Menu dropdown avec options multiples -->
        <section>
            <h2 class="text-xl font-semibold mb-4">3. Menu dropdown avec options</h2>
            <Table :resource="sampleData" name="dropdown-example" :show-export-button="true">
                <template #exportButton="{ exportUrl, translations }">
                    <div class="relative">
                        <button @click="toggleDropdown" 
                            class="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Options d'export
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        <div v-if="showDropdown" 
                            class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                            <div class="py-1">
                                <a :href="exportUrl" 
                                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export CSV
                                </a>
                                <button @click="exportExcel" 
                                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Export Excel
                                </button>
                                <button @click="exportPDF" 
                                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </Table>
        </section>

        <!-- Exemple 4: Bouton avec compteur de téléchargements -->
        <section>
            <h2 class="text-xl font-semibold mb-4">4. Bouton avec compteur</h2>
            <Table :resource="sampleData" name="counter-example" :show-export-button="true">
                <template #exportButton="{ exportUrl, translations }">
                    <button @click="trackAndExport(exportUrl)"
                        class="relative inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export ({{ downloadCount }})
                        <span v-if="downloadCount > 0" 
                            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {{ downloadCount }}
                        </span>
                    </button>
                </template>
            </Table>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Table from '../js/Components/Table.vue';

// Données d'exemple
const sampleData = {
    data: [
        { id: 1, name: 'Utilisateur 1', email: 'user1@example.com' },
        { id: 2, name: 'Utilisateur 2', email: 'user2@example.com' },
        { id: 3, name: 'Utilisateur 3', email: 'user3@example.com' }
    ],
    meta: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 3,
        from: 1,
        to: 3
    }
};

// État pour le dropdown
const showDropdown = ref(false);
const downloadCount = ref(0);

// Méthodes
const confirmExport = (exportUrl) => {
    if (confirm('Êtes-vous sûr de vouloir exporter ces données ?')) {
        window.location.href = exportUrl;
    }
};

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const exportExcel = () => {
    alert('Export Excel personnalisé démarré !');
    showDropdown.value = false;
};

const exportPDF = () => {
    alert('Export PDF personnalisé démarré !');
    showDropdown.value = false;
};

const trackAndExport = (exportUrl) => {
    downloadCount.value++;
    console.log(`Téléchargement #${downloadCount.value} démarré`);
    window.location.href = exportUrl;
};
</script>
