import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TableColumns from '../js/Components/TableColumns.vue';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('TableColumns Drag and Drop', () => {
    const mockColumns = [
        { key: 'id', label: 'ID', can_be_hidden: false, hidden: false },
        { key: 'name', label: 'Nom', can_be_hidden: true, hidden: false },
        { key: 'email', label: 'Email', can_be_hidden: true, hidden: false },
        { key: 'status', label: 'Statut', can_be_hidden: true, hidden: false },
    ];

    const defaultProps = {
        columns: mockColumns,
        hasHiddenColumns: false,
        onChange: vi.fn(),
        tableName: 'test-table',
        color: 'primary',
    };

    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        localStorageMock.removeItem.mockClear();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('affiche toutes les colonnes y compris celles non hideable', () => {
        const wrapper = mount(TableColumns, {
            props: defaultProps,
        });

        // Vérifier que toutes les colonnes sont affichées
        const columnItems = wrapper.findAll('[data-test="column-item"]');
        expect(columnItems).toHaveLength(4);

        // Vérifier que la colonne non hideable affiche "Fixe"
        const idColumn = wrapper.find('[data-column-key="id"]');
        expect(idColumn.text()).toContain('Fixe');
    });

    it('charge l\'ordre des colonnes depuis localStorage', () => {
        const savedOrder = [
            { key: 'name', hidden: false, order: 0 },
            { key: 'id', hidden: false, order: 1 },
            { key: 'email', hidden: false, order: 2 },
            { key: 'status', hidden: true, order: 3 },
        ];

        localStorageMock.getItem.mockReturnValue(JSON.stringify(savedOrder));

        const wrapper = mount(TableColumns, {
            props: defaultProps,
        });

        // Vérifier que localStorage a été consulté
        expect(localStorageMock.getItem).toHaveBeenCalledWith('columns-test-table');
    });

    it('ne sauvegarde pas pour la table "default"', () => {
        const wrapper = mount(TableColumns, {
            props: {
                ...defaultProps,
                tableName: 'default',
            },
        });

        // Simuler un changement d'ordre
        wrapper.vm.onColumnOrderChange();

        // Vérifier que localStorage n'a pas été appelé
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('sauvegarde l\'ordre des colonnes lors du réarrangement', async () => {
        const wrapper = mount(TableColumns, {
            props: defaultProps,
        });

        // Simuler un réarrangement
        wrapper.vm.localColumns = [
            mockColumns[1], // name
            mockColumns[0], // id  
            mockColumns[2], // email
            mockColumns[3], // status
        ];

        await wrapper.vm.onColumnOrderChange();

        // Vérifier que les données ont été sauvegardées
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'columns-test-table',
            expect.stringContaining('"key":"name","hidden":false,"order":0')
        );
    });

    it('émet un événement column-reorder lors du changement d\'ordre', async () => {
        const wrapper = mount(TableColumns, {
            props: defaultProps,
        });

        // Simuler un réarrangement
        const newOrder = [mockColumns[1], mockColumns[0], mockColumns[2], mockColumns[3]];
        wrapper.vm.localColumns = newOrder;

        await wrapper.vm.onColumnOrderChange();

        // Vérifier que l'événement a été émis
        expect(wrapper.emitted('column-reorder')).toBeTruthy();
        expect(wrapper.emitted('column-reorder')[0][0]).toEqual(newOrder);
    });

    it('gère correctement le toggle des colonnes hideable', async () => {
        const onChange = vi.fn();
        const wrapper = mount(TableColumns, {
            props: {
                ...defaultProps,
                onChange,
            },
        });

        // Simuler le toggle d'une colonne
        await wrapper.vm.onToggleColumn('name', false);

        // Vérifier que la fonction onChange a été appelée
        expect(onChange).toHaveBeenCalledWith('name', false);

        // Vérifier que localStorage a été appelé pour sauvegarder
        expect(localStorageMock.setItem).toHaveBeenCalled();
    });
});
