<template>
    <div>
        <h2>Test Drag and Drop des colonnes</h2>
        <InertiaTable :data="sampleData" :columns="sampleColumns" :query-builder-props="queryBuilderProps"
            name="drag-drop-test" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            sampleData: [
                { id: 1, name: 'Alice', email: 'alice@example.com', age: 25, status: 'active' },
                { id: 2, name: 'Bob', email: 'bob@example.com', age: 30, status: 'inactive' },
                { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35, status: 'active' },
            ],
            sampleColumns: [
                { key: 'id', label: 'ID', can_be_hidden: false, hidden: false, sortable: true },
                { key: 'name', label: 'Nom', can_be_hidden: true, hidden: false, sortable: true },
                { key: 'email', label: 'Email', can_be_hidden: true, hidden: false, sortable: true },
                { key: 'age', label: 'Âge', can_be_hidden: true, hidden: false, sortable: true },
                { key: 'status', label: 'Statut', can_be_hidden: true, hidden: false, sortable: false },
            ],
            queryBuilderProps: {
                hasToggleableColumns: true,
                hasHiddenColumns: false,
                columns: [
                    { key: 'id', label: 'ID', can_be_hidden: false, hidden: false, sortable: true },
                    { key: 'name', label: 'Nom', can_be_hidden: true, hidden: false, sortable: true },
                    { key: 'email', label: 'Email', can_be_hidden: true, hidden: false, sortable: true },
                    { key: 'age', label: 'Âge', can_be_hidden: true, hidden: false, sortable: true },
                    { key: 'status', label: 'Statut', can_be_hidden: true, hidden: false, sortable: false },
                ],
            }
        }
    }
}
</script>
