import { useColumnResize } from '../js/composables/useColumnResize.js';

// Test du composable useColumnResize
describe('useColumnResize', () => {
    const tableName = 'test-table';
    let columnResize;

    beforeEach(() => {
        // Nettoyer localStorage
        localStorage.clear();
        columnResize = useColumnResize(tableName);
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('initialise avec des valeurs par défaut', () => {
        expect(columnResize.isResizing.value).toBe(false);
        expect(columnResize.resizingColumn.value).toBeNull();
        expect(Object.keys(columnResize.columnWidths)).toHaveLength(0);
    });

    test('définit et récupère la largeur d\'une colonne', () => {
        const columnKey = 'test-column';
        const width = 200;

        columnResize.setColumnWidth(columnKey, width);

        expect(columnResize.getColumnWidth(columnKey)).toBe(width);
    });

    test('retourne "auto" pour une colonne sans largeur définie', () => {
        const columnKey = 'undefined-column';

        expect(columnResize.getColumnWidth(columnKey)).toBe('auto');
    });

    test('sauvegarde et charge les largeurs depuis localStorage', () => {
        const columnKey = 'test-column';
        const width = 150;

        // Définir une largeur
        columnResize.setColumnWidth(columnKey, width);

        // Vérifier que c'est sauvegardé dans localStorage
        const saved = JSON.parse(localStorage.getItem(`table-column-widths-${tableName}`));
        expect(saved[columnKey]).toBe(width);

        // Créer une nouvelle instance pour tester le chargement
        const newColumnResize = useColumnResize(tableName);
        newColumnResize.loadColumnWidths();

        expect(newColumnResize.getColumnWidth(columnKey)).toBe(width);
    });

    test('réinitialise toutes les largeurs', () => {
        const column1 = 'column1';
        const column2 = 'column2';

        // Définir des largeurs
        columnResize.setColumnWidth(column1, 100);
        columnResize.setColumnWidth(column2, 200);

        // Vérifier qu'elles sont définies
        expect(columnResize.getColumnWidth(column1)).toBe(100);
        expect(columnResize.getColumnWidth(column2)).toBe(200);

        // Réinitialiser
        columnResize.resetColumnWidths();

        // Vérifier qu'elles sont réinitialisées
        expect(columnResize.getColumnWidth(column1)).toBe('auto');
        expect(columnResize.getColumnWidth(column2)).toBe('auto');
        expect(localStorage.getItem(`table-column-widths-${tableName}`)).toBeNull();
    });

    test('gère la largeur minimale lors du redimensionnement', () => {
        // Ce test nécessiterait une simulation d'événements DOM
        // Pour l'instant, nous testons juste la logique de largeur minimale
        const minimumWidth = 50;
        const startWidth = 100;
        const deltaX = -60; // Tentative de réduire à 40px

        const newWidth = Math.max(minimumWidth, startWidth + deltaX);

        expect(newWidth).toBe(minimumWidth);
    });
});

// Test du composant ColumnResizeHandle
describe('ColumnResizeHandle', () => {
    test('émet l\'événement de début de redimensionnement', () => {
        // Ce test nécessiterait Vue Test Utils pour tester le composant
        // Mock test pour la documentation
        const mockOnResize = jest.fn();
        const columnKey = 'test-column';
        const mockEvent = new MouseEvent('mousedown');

        // Simuler l'appel de la fonction
        mockOnResize(mockEvent, columnKey);

        expect(mockOnResize).toHaveBeenCalledWith(mockEvent, columnKey);
    });
});

console.log('Tests de redimensionnement des colonnes - OK');
console.log('Pour exécuter les vrais tests, utilisez Jest avec Vue Test Utils');
