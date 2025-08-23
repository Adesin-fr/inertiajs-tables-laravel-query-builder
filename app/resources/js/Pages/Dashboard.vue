<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
import Table from "@inertiajs-tables/Components/Table.vue"

defineProps(["users", "admins", "title"]);

// Fonction pour gérer le téléchargement personnalisé des utilisateurs
const downloadUsers = (exportUrl) => {
    console.log('Téléchargement personnalisé des utilisateurs depuis:', exportUrl);
    // Ici, vous pouvez ajouter une logique personnalisée avant/après le téléchargement
    // Par exemple: analytics, notifications, transformations, etc.
    window.location.href = exportUrl;
};
</script>

<template>
    <BreezeGuestLayout>
        <div class="space-y-8">
            <h1 class="text-2xl font-bold">{{ title }}</h1>

            <!-- Users Table -->
            <div>
                <h2 class="text-xl font-semibold mb-4">All Users</h2>
                <Table name="users" :resource="users.data" :meta="users.data" :input-debounce-ms="50"
                    :resizeable-columns="true" :show-export-button="true" :hide-search-inputs-above-table="true">
                    <template #cell(actions)="{ item: user }">
                        <a :href="`/users/${user.id}/edit`" class="text-blue-600 hover:text-blue-800">
                            Edit
                        </a>
                    </template>
                    <!-- Bouton export personnalisé pour les utilisateurs -->
                    <template #exportButton="{ exportUrl, translations }">
                        <button @click="downloadUsers(exportUrl)" 
                            class="relative inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger les utilisateurs
                        </button>
                    </template>
                </Table>
            </div>

            <!-- Admins Table -->
            <div>
                <h2 class="text-xl font-semibold mb-4">Administrators</h2>
                <Table name="admins" :resource="admins.data" :meta="admins.data" :input-debounce-ms="50"
                    :resizeable-columns="true" :show-export-button="true" :hide-search-inputs-above-table="true">
                    <template #cell(actions)="{ item: admin }">
                        <a :href="`/admins/${admin.id}/edit`" class="text-red-600 hover:text-red-800">
                            Edit Admin
                        </a>
                    </template>
                    <!-- Bouton export avec style différent pour les admins -->
                    <template #exportButton="{ exportUrl, translations }">
                        <a :href="exportUrl"
                            class="relative inline-flex items-center px-6 py-2 border-2 border-red-500 text-sm font-semibold rounded-lg text-red-600 bg-white hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Exporter Admins CSV
                        </a>
                    </template>
                </Table>
            </div>
        </div>
    </BreezeGuestLayout>
</template>
