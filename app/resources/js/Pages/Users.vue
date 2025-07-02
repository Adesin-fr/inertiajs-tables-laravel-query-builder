<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
//import { Table } from "@AdesinFr/inertiajs-tables-laravel-query-builder";
import Table from "../../../../js/Components/Table.vue"

// use this one for development:
// import Table from "../../../../js/Components/Table.vue"

defineProps(["users"]);
</script>

<template>
    <div class="hidden md:table-cell"></div>
    <BreezeGuestLayout>
        <Table :resource="users" :input-debounce-ms="50">
            <template #cell(actions)="{ item: user }">
                <a :href="`/users/${user.id}/edit`">
                    Edit
                </a>
            </template>
        </Table>
    </BreezeGuestLayout>
</template>
