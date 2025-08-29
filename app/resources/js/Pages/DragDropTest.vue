<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
import Table from "@inertiajs-tables/Components/Table.vue"
import { ref } from 'vue';

defineProps(["users"]);

</script>

<template>
    <div class="hidden md:table-cell"></div>
    <BreezeGuestLayout>
        <div class="mb-4">
            <h1 class="text-2xl font-bold">Test Drag & Drop des Colonnes</h1>
            <p class="text-gray-600">Utilisez le menu des colonnes (icône œil) pour réorganiser les colonnes par
                glisser-déposer.</p>
            <p class="text-sm text-gray-500 mt-2">Le nom de cette table est "drag-drop-test", donc l'ordre sera
                sauvegardé dans localStorage.</p>
        </div>

        <Table :resource="users" name="drag-drop-test" :input-debounce-ms="50" :resizeable-columns="true">
            <template #cell(actions)="{ item: user }">
                <a :href="`/users/${user.id}/edit`" class="text-blue-600 hover:text-blue-800">
                    Edit
                </a>
            </template>

            <template #cell(name)="{ item: user }">
                <div class="flex items-center">
                    <div
                        class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {{ user.name.charAt(0).toUpperCase() }}
                    </div>
                    {{ user.name }}
                </div>
            </template>

            <template #cell(email)="{ item: user }">
                <a :href="`mailto:${user.email}`" class="text-blue-600 hover:text-blue-800">
                    {{ user.email }}
                </a>
            </template>
        </Table>
    </BreezeGuestLayout>
</template>
