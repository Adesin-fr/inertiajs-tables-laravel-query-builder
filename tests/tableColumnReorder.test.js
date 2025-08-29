import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from '../js/Components/Table.vue';

// Mock Inertia
vi.mock('@inertiajs/vue3', () => ({
    usePage: () => ({
        props: {
            queryBuilderProps: {
                'test-table': {
                    columns: [
                        { key: 'id', label: 'ID', can_be_hidden: false, hidden: false, sortable: true },
                        { key: 'name', label: 'Nom', can_be_hidden: true, hidden: false, sortable: true },
                        { key: 'email', label: 'Email', can_be_hidden: true, hidden: false, sortable: true },
                    ],
                    hasToggleableColumns: true,
                    hasHiddenColumns: false,
                    globalSearch: null,
                    hasFilters: false,
                    hasSearchInputs: false,
                    searchInputsWithoutGlobal: [],
                    filters: [],
                    searchInputs: [],
                    defaultVisibleToggleableColumns: ['name', 'email'],
                }
            }
        }
    }),
    router: {
        get: vi.fn(),
    },
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
};
global.localStorage = localStorageMock;

describe('Table Column Drag and Drop Integration', () => {
    const mockData = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];

    const defaultProps = {
        resource: { data: mockData, meta: { total: 2 } },
        name: 'test-table',
        inertia: {},
    };

    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        vi.clearAllMocks();
    });

    it('passe le nom de la table au composant TableColumns', () => {
        const wrapper = mount(Table, {
            props: defaultProps,
            global: {
                stubs: ['TableColumns', 'HeaderCell', 'Pagination'],
            },
        });

        const tableColumns = wrapper.findComponent({ name: 'TableColumns' });
        expect(tableColumns.exists()).toBe(true);
        expect(tableColumns.props('tableName')).toBe('test-table');
    });

    it('écoute les événements column-reorder du composant TableColumns', () => {
        const wrapper = mount(Table, {
            props: defaultProps,
            global: {
                stubs: ['TableColumns', 'HeaderCell', 'Pagination'],
            },
        });

        const tableColumns = wrapper.findComponent({ name: 'TableColumns' });

        // Simuler un événement column-reorder
        const reorderedColumns = [
            { key: 'name', label: 'Nom', can_be_hidden: true, hidden: false },
            { key: 'id', label: 'ID', can_be_hidden: false, hidden: false },
            { key: 'email', label: 'Email', can_be_hidden: true, hidden: false },
        ];

        tableColumns.vm.$emit('column-reorder', reorderedColumns);

        // Vérifier que la fonction handleColumnReorder a été appelée
        // (nous pourrions vérifier que les colonnes ont été réorganisées dans le state)
    });

    it('charge l\'ordre des colonnes au montage pour les tables nommées', () => {
        const savedOrder = [
            { key: 'name', hidden: false, order: 0 },
            { key: 'id', hidden: false, order: 1 },
            { key: 'email', hidden: false, order: 2 },
        ];

        localStorageMock.getItem.mockReturnValue(JSON.stringify(savedOrder));

        mount(Table, {
            props: defaultProps,
            global: {
                stubs: ['TableColumns', 'HeaderCell', 'Pagination'],
            },
        });

        // Vérifier que localStorage a été consulté avec la bonne clé
        expect(localStorageMock.getItem).toHaveBeenCalledWith('columns-test-table');
    });

    it('ne charge pas l\'ordre pour la table "default"', () => {
        mount(Table, {
            props: {
                ...defaultProps,
                name: 'default',
            },
            global: {
                stubs: ['TableColumns', 'HeaderCell', 'Pagination'],
            },
        });

        // Vérifier que localStorage n'a pas été consulté
        expect(localStorageMock.getItem).not.toHaveBeenCalled();
    });

    it('sauvegarde l\'ordre et la visibilité lors du changement de statut des colonnes', () => {
        const wrapper = mount(Table, {
            props: defaultProps,
            global: {
                stubs: ['TableColumns', 'HeaderCell', 'Pagination'],
            },
        });

        // Simuler un changement de visibilité de colonne
        wrapper.vm.changeColumnStatus('name', false);

        // Vérifier que localStorage a été appelé pour sauvegarder
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'columns-test-table',
            expect.stringContaining('"key":"name"')
        );
    });
});
