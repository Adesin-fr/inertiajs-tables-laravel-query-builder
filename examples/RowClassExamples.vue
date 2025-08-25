<!-- 
Complete example of rowClass prop usage
This file shows different ways to apply custom styling to table rows
-->
<template>
    <div class="space-y-8 p-6">
        <h1 class="text-3xl font-bold text-gray-900">Custom Row Styling Examples</h1>

        <!-- Example 1: Status-based styling -->
        <section>
            <h2 class="text-xl font-semibold mb-4">1. User Status-Based Styling</h2>
            <p class="text-gray-600 mb-4">
                Inactive users appear semi-transparent with a red background,
                admins have a blue border, and new users have a green background.
            </p>
            <Table :resource="sampleUsers" name="status-example" :row-class="getUserStatusRowClass">
                <template #cell(status)="{ item: user }">
                    <span :class="getStatusBadgeClass(user.status)">
                        {{ user.status }}
                    </span>
                </template>
            </Table>
        </section>

        <!-- Example 2: Numeric condition-based styling -->
        <section>
            <h2 class="text-xl font-semibold mb-4">2. Numeric Value-Based Styling</h2>
            <p class="text-gray-600 mb-4">
                Rows are colored based on age: red for under 25,
                green for 25-50, and blue for over 50.
            </p>
            <Table :resource="sampleUsers" name="age-example" :row-class="getAgeRowClass" />
        </section>

        <!-- Example 3: Date-based styling -->
        <section>
            <h2 class="text-xl font-semibold mb-4">3. Creation Date-Based Styling</h2>
            <p class="text-gray-600 mb-4">
                Users created within the last 7 days have a light green background,
                those created within the last 30 days have a light yellow background.
            </p>
            <Table :resource="sampleUsers" name="date-example" :row-class="getDateRowClass" />
        </section>

        <!-- Example 4: Complex styling with multiple conditions -->
        <section>
            <h2 class="text-xl font-semibold mb-4">4. Complex Styling with Priorities</h2>
            <p class="text-gray-600 mb-4">
                Combines multiple conditions with a priority system:
                1. Suspended users (red)
                2. Active admins (blue)
                3. VIP users (gold)
                4. New users (green)
            </p>
            <Table :resource="sampleUsers" name="complex-example" :row-class="getComplexRowClass">
                <template #cell(role)="{ item: user }">
                    <div class="flex items-center space-x-2">
                        <span :class="getRoleBadgeClass(user.role)">
                            {{ user.role }}
                        </span>
                        <span v-if="user.is_vip" class="text-yellow-500 text-sm">
                            ⭐ VIP
                        </span>
                    </div>
                </template>
            </Table>
        </section>

        <!-- Example 5: Interactive styling with custom hover -->
        <section>
            <h2 class="text-xl font-semibold mb-4">5. Interactive Styling with Animations and Custom Hover</h2>
            <p class="text-gray-600 mb-4">
                Uses CSS transitions and custom hover effects for each user type.
            </p>
            <Table :resource="sampleUsers" name="interactive-example" :row-class="getInteractiveRowClass" />
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Table from '../js/Components/Table.vue';

// Sample data
const sampleUsers = ref({
    data: [
        { id: 1, name: 'Alice Martin', email: 'alice@example.com', age: 28, role: 'admin', status: 'active', is_vip: true, created_at: '2024-08-20T10:00:00Z' },
        { id: 2, name: 'Bob Dupont', email: 'bob@example.com', age: 35, role: 'user', status: 'inactive', is_vip: false, created_at: '2024-07-15T14:30:00Z' },
        { id: 3, name: 'Charlie Moreau', email: 'charlie@example.com', age: 22, role: 'moderator', status: 'active', is_vip: false, created_at: '2024-08-24T09:15:00Z' },
        { id: 4, name: 'Diana Laurent', email: 'diana@example.com', age: 45, role: 'user', status: 'suspended', is_vip: true, created_at: '2024-06-10T16:45:00Z' },
        { id: 5, name: 'Ethan Bernard', email: 'ethan@example.com', age: 55, role: 'admin', status: 'active', is_vip: false, created_at: '2024-08-01T11:20:00Z' },
        { id: 6, name: 'Fiona Petit', email: 'fiona@example.com', age: 19, role: 'user', status: 'active', is_vip: true, created_at: '2024-08-23T13:30:00Z' },
    ],
    meta: {
        total: 6,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 6
    }
});

// Example 1: Status-based styling
const getUserStatusRowClass = (user) => {
    switch (user.status) {
        case 'inactive':
            return 'opacity-60 bg-red-50 hover:bg-red-100';
        case 'suspended':
            return 'bg-red-100 border-l-4 border-red-500 hover:bg-red-150';
        case 'active':
            if (user.role === 'admin') {
                return 'bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100';
            }
            break;
    }

    // New users (last 7 days)
    if (user.created_at && new Date(user.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        return 'bg-green-50 hover:bg-green-100';
    }

    return null;
};

// Example 2: Age-based styling
const getAgeRowClass = (user) => {
    if (user.age < 25) {
        return 'bg-pink-50 border-l-2 border-pink-300 hover:bg-pink-100';
    } else if (user.age >= 25 && user.age <= 50) {
        return 'bg-green-50 border-l-2 border-green-300 hover:bg-green-100';
    } else {
        return 'bg-blue-50 border-l-2 border-blue-300 hover:bg-blue-100';
    }
};

// Example 3: Date-based styling
const getDateRowClass = (user) => {
    const now = new Date();
    const createdAt = new Date(user.created_at);
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 7) {
        return 'bg-green-50 ring-1 ring-green-200 hover:bg-green-100';
    } else if (daysDiff <= 30) {
        return 'bg-yellow-50 ring-1 ring-yellow-200 hover:bg-yellow-100';
    }

    return 'hover:bg-gray-50';
};

// Example 4: Complex styling with priorities
const getComplexRowClass = (user) => {
    // Priority 1: Suspended users
    if (user.status === 'suspended') {
        return 'bg-red-100 border border-red-300 text-red-900 hover:bg-red-150';
    }

    // Priority 2: Active admins
    if (user.role === 'admin' && user.status === 'active') {
        return 'bg-blue-100 border-l-4 border-blue-600 hover:bg-blue-150 font-medium';
    }

    // Priority 3: VIP users
    if (user.is_vip) {
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 hover:from-yellow-100 hover:to-orange-100';
    }

    // Priority 4: New users
    const now = new Date();
    const createdAt = new Date(user.created_at);
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 7) {
        return 'bg-green-50 border-l-2 border-green-400 hover:bg-green-100';
    }

    return 'hover:bg-gray-50';
};

// Example 5: Interactive styling
const getInteractiveRowClass = (user) => {
    const baseClass = 'transition-all duration-200 ease-in-out transform hover:scale-[1.01] hover:shadow-md';

    switch (user.role) {
        case 'admin':
            return `${baseClass} bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-l-4 border-blue-500`;
        case 'moderator':
            return `${baseClass} bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-l-4 border-purple-500`;
        default:
            if (user.is_vip) {
                return `${baseClass} bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 border-l-4 border-yellow-500`;
            }
            return `${baseClass} hover:bg-gray-50`;
    }
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

<style scoped>
/* Custom styles for advanced effects */
.hover\:bg-red-150:hover {
    background-color: rgb(254 226 226 / 0.7);
}

.hover\:bg-blue-150:hover {
    background-color: rgb(219 234 254 / 0.7);
}
</style>
