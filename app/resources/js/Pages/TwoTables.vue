<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
//import { Table } from "@adesin-fr/inertiajs-tables-laravel-query-builder";
import Table from "../../../../js/Components/Table.vue"

// use this one for development:

defineProps(["companies", "users"]);
</script>

<template>
    <BreezeGuestLayout>
        <Table :resource="companies" name="companies" preserve-scroll="table-top" :input-debounce-ms="50" />

        <Table class="mt-8" :resource="users" name="users" preserve-scroll="table-top" :input-debounce-ms="50" />
    </BreezeGuestLayout>
</template>
