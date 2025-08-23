<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
import Table from "@inertiajs-tables/Components/Table.vue"
import { hide } from "@popperjs/core";

defineProps(["users"]);
</script>

<template>
    <div class="hidden md:table-cell"></div>
    <BreezeGuestLayout>
        <Table :resource="users" :input-debounce-ms="50" :resizeable-columns="true" :show-export-button="true"
            :hide-search-inputs-above-table="true">
            <template #cell(actions)="{ item: user }">
                <a :href="`/users/${user.id}/edit`">
                    Edit
                </a>
            </template>
        </Table>
    </BreezeGuestLayout>
</template>
