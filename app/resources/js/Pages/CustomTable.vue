<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
//import { Table } from "@adesin-fr/inertiajs-tables-laravel-query-builder";
import Table from "../../../../js/Components/Table.vue"

// use this one for development:
// import Table from "../../../../js/Components/Table.vue"

defineProps(["users"]);
</script>

<template>
    <BreezeGuestLayout>
        <Table :meta="users">
            <template #head>
                <tr>
                    <th>User</th>
                </tr>
            </template>

            <template #body>
                <tr v-for="(user, key) in users.data" :key="key">
                    <td>{{ user.name }}</td>
                </tr>
            </template>
        </Table>
    </BreezeGuestLayout>
</template>
