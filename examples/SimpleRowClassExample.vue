<!-- 
Simple example of rowClass prop usage
-->
<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Simple Example: rowClass</h1>

        <p class="text-gray-600 mb-4">
            This example shows how to use the <code class="bg-gray-100 px-1 rounded">rowClass</code> prop
            to apply conditional styles to table rows.
        </p>

        <Table :resource="users" name="simple-rowclass" :row-class="getRowClass">
            <template #cell(status)="{ item: user }">
                <span :class="getStatusBadgeClass(user.status)">
                    {{ user.status }}
                </span>
            </template>
            <template #cell(role)="{ item: user }">
                <span :class="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                </span>
            </template>
        </Table>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-semibold mb-2">Color Legend:</h3>
            <ul class="text-sm space-y-1">
                <li class="flex items-center">
                    <div class="w-4 h-4 bg-red-100 border-l-4 border-red-500 mr-2"></div>
                    Inactive or suspended users
                </li>
                <li class="flex items-center">
                    <div class="w-4 h-4 bg-blue-100 border-l-4 border-blue-500 mr-2"></div>
                    Administrators
                </li>
                <li class="flex items-center">
                    <div class="w-4 h-4 bg-green-100 mr-2"></div>
                    New users (last 7 days)
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Table from '../js/Components/Table.vue';

const users = ref({
    data: [
        {
            id: 1,
            name: 'Alice Martin',
            email: 'alice@example.com',
            role: 'admin',
            status: 'active',
            created_at: '2024-08-20T10:00:00Z'
        },
        {
            id: 2,
            name: 'Bob Dupont',
            email: 'bob@example.com',
            role: 'user',
            status: 'inactive',
            created_at: '2024-07-15T14:30:00Z'
        },
        {
            id: 3,
            name: 'Charlie Moreau',
            email: 'charlie@example.com',
            role: 'user',
            status: 'active',
            created_at: '2024-08-24T09:15:00Z'
        },
        {
            id: 4,
            name: 'Diana Laurent',
            email: 'diana@example.com',
            role: 'moderator',
            status: 'suspended',
            created_at: '2024-06-10T16:45:00Z'
        }
    ],
    meta: {
        total: 4,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 4
    }
});

// rowClass function - applies styles based on conditions
const getRowClass = (user) => {
    // Inactive or suspended users -> red background
    if (user.status === 'inactive' || user.status === 'suspended') {
        return 'bg-red-50 border-l-4 border-red-500 opacity-75';
    }

    // Administrators -> blue background
    if (user.role === 'admin') {
        return 'bg-blue-50 border-l-4 border-blue-500 font-medium';
    }

    // New users (last 7 days) -> green background
    const now = new Date();
    const createdAt = new Date(user.created_at);
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 7) {
        return 'bg-green-50 ring-1 ring-green-200';
    }

    // No special styling
    return null;
};

// Utility functions for badges
const getStatusBadgeClass = (status) => {
    const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
        case 'active':
            return `${baseClass} bg-green-100 text-green-800`;
        case 'inactive':
            return `${baseClass} bg-gray-100 text-gray-800`;
        case 'suspended':
            return `${baseClass} bg-red-100 text-red-800`;
        default:
            return `${baseClass} bg-gray-100 text-gray-800`;
    }
};

const getRoleBadgeClass = (role) => {
    const baseClass = 'px-2 py-1 rounded text-xs font-medium';
    switch (role) {
        case 'admin':
            return `${baseClass} bg-blue-100 text-blue-800`;
        case 'moderator':
            return `${baseClass} bg-purple-100 text-purple-800`;
        default:
            return `${baseClass} bg-gray-100 text-gray-800`;
    }
};
</script>
