<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold mb-6">Pagination Callback Example</h1>

        <!-- Status indicator -->
        <div class="mb-4 p-4 rounded-lg" :class="statusClass">
            <p class="font-medium">{{ statusMessage }}</p>
            <p class="text-sm opacity-75" v-if="lastUrl">Last URL: {{ lastUrl }}</p>
        </div>

        <!-- Custom pagination controls -->
        <div class="mb-4 flex gap-4 items-center">
            <button @click="handleCustomPagination('/users?page=1')"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Page 1
            </button>
            <button @click="handleCustomPagination('/users?page=2')"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Page 2
            </button>
            <button @click="handleCustomPagination('/users?page=3')"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Page 3
            </button>
            <div class="ml-4">
                <label class="flex items-center">
                    <input type="checkbox" v-model="useCustomCallback" class="mr-2">
                    Use Custom Pagination Callback
                </label>
            </div>
        </div>

        <!-- Table with custom pagination callback -->
        <Table :resource="users" :input-debounce-ms="50" :resizeable-columns="true" :show-export-button="true"
            :pagination-click-callback="useCustomCallback ? handlePaginationClick : null" class="shadow-lg">

            <template #cell(id)="{ item: user }">
                <span class="font-mono text-sm">#{{ user.id }}</span>
            </template>

            <template #cell(status)="{ item: user }">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="{
                    'bg-green-100 text-green-800': user.status === 'active',
                    'bg-red-100 text-red-800': user.status === 'inactive',
                    'bg-yellow-100 text-yellow-800': user.status === 'pending'
                }">
                    {{ user.status }}
                </span>
            </template>

            <template #cell(actions)="{ item: user }">
                <div class="flex gap-2">
                    <button @click="viewUser(user)" class="text-blue-600 hover:text-blue-800 text-sm">
                        View
                    </button>
                    <button @click="editUser(user)" class="text-green-600 hover:text-green-800 text-sm">
                        Edit
                    </button>
                </div>
            </template>
        </Table>

        <!-- Custom loading overlay -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <div class="flex items-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                    <span>Loading custom data...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Table } from "@adesin-fr/inertiajs-tables-laravel-query-builder";

// Props
defineProps(['users']);

// Reactive state
const useCustomCallback = ref(true);
const isLoading = ref(false);
const lastUrl = ref(null);
const loadingStatus = ref('ready'); // 'ready', 'loading', 'success', 'error'

// Computed status
const statusMessage = computed(() => {
    switch (loadingStatus.value) {
        case 'loading':
            return 'Custom pagination callback is loading...';
        case 'success':
            return 'Data loaded successfully via custom callback!';
        case 'error':
            return 'Error occurred during custom pagination';
        default:
            return useCustomCallback.value
                ? 'Custom pagination callback is enabled'
                : 'Using default Inertia navigation';
    }
});

const statusClass = computed(() => {
    const base = 'border-l-4';
    switch (loadingStatus.value) {
        case 'loading':
            return `${base} border-blue-500 bg-blue-50 text-blue-700`;
        case 'success':
            return `${base} border-green-500 bg-green-50 text-green-700`;
        case 'error':
            return `${base} border-red-500 bg-red-50 text-red-700`;
        default:
            return useCustomCallback.value
                ? `${base} border-purple-500 bg-purple-50 text-purple-700`
                : `${base} border-gray-500 bg-gray-50 text-gray-700`;
    }
});

// Custom pagination callback function
const handlePaginationClick = async (url) => {
    console.log('Custom pagination callback triggered for URL:', url);

    lastUrl.value = url;
    loadingStatus.value = 'loading';
    isLoading.value = true;

    try {
        // Simulate API call or custom data fetching
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Here you would typically:
        // 1. Parse the URL to extract pagination parameters
        // 2. Make an API call to fetch the data
        // 3. Update your component's state with the new data
        // 4. Handle any errors that might occur

        // Example of what you might do:
        // const response = await fetch(url, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'X-Inertia': 'true'
        //     }
        // });
        // const data = await response.json();
        // // Update your users data here

        loadingStatus.value = 'success';

        // Reset status after 3 seconds
        setTimeout(() => {
            loadingStatus.value = 'ready';
        }, 3000);

    } catch (error) {
        console.error('Error in custom pagination callback:', error);
        loadingStatus.value = 'error';

        // Reset status after 3 seconds
        setTimeout(() => {
            loadingStatus.value = 'ready';
        }, 3000);
    } finally {
        isLoading.value = false;
    }
};

// Manual pagination trigger for demonstration
const handleCustomPagination = (url) => {
    if (useCustomCallback.value) {
        handlePaginationClick(url);
    } else {
        // Use default behavior (this would normally be handled by Inertia)
        window.location.href = url;
    }
};

// Action handlers
const viewUser = (user) => {
    alert(`Viewing user: ${user.name} (ID: ${user.id})`);
};

const editUser = (user) => {
    alert(`Editing user: ${user.name} (ID: ${user.id})`);
};
</script>

<style scoped>
/* Custom styles for the example */
.table-container {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
