<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
import Table from "@inertiajs-tables/Components/Table.vue"

defineProps(["users", "admins", "title"]);
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
                </Table>
            </div>
        </div>
    </BreezeGuestLayout>
</template>
