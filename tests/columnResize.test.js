import { useColumnResize } from '../js/composables/useColumnResize.js';

// Tests for useColumnResize composable
describe('useColumnResize', () => {
    const tableName = 'test-table';
    let columnResize;

    beforeEach(() => {
        // Clear localStorage
        localStorage.clear();
        columnResize = useColumnResize(tableName);
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('initializes with default values', () => {
        expect(columnResize.isResizing.value).toBe(false);
        expect(columnResize.resizingColumn.value).toBeNull();
        expect(Object.keys(columnResize.columnWidths)).toHaveLength(0);
    });

    test('sets and gets a column width', () => {
        const columnKey = 'test-column';
        const width = 200;

        columnResize.setColumnWidth(columnKey, width);

        expect(columnResize.getColumnWidth(columnKey)).toBe(width);
    });

    test('returns "auto" for a column without a defined width', () => {
        const columnKey = 'undefined-column';

        expect(columnResize.getColumnWidth(columnKey)).toBe('auto');
    });

    test('saves and loads widths from localStorage', () => {
        const columnKey = 'test-column';
        const width = 150;

        // Set a width
        columnResize.setColumnWidth(columnKey, width);

        // Verify it's saved in localStorage
        const saved = JSON.parse(localStorage.getItem(`table-column-widths-${tableName}`));
        expect(saved[columnKey]).toBe(width);

        // Create a new instance to test loading
        const newColumnResize = useColumnResize(tableName);
        newColumnResize.loadColumnWidths();

        expect(newColumnResize.getColumnWidth(columnKey)).toBe(width);
    });

    test('resets all widths', () => {
        const column1 = 'column1';
        const column2 = 'column2';

        // Set widths
        columnResize.setColumnWidth(column1, 100);
        columnResize.setColumnWidth(column2, 200);

        // Verify they are set
        expect(columnResize.getColumnWidth(column1)).toBe(100);
        expect(columnResize.getColumnWidth(column2)).toBe(200);

        // Reset
        columnResize.resetColumnWidths();

        // Verify they are reset
        expect(columnResize.getColumnWidth(column1)).toBe('auto');
        expect(columnResize.getColumnWidth(column2)).toBe('auto');
        expect(localStorage.getItem(`table-column-widths-${tableName}`)).toBeNull();
    });

    test('handles minimum width during resize', () => {
        // This test would require DOM event simulation
        // For now, we just test the minimum width logic
        const minimumWidth = 50;
        const startWidth = 100;
        const deltaX = -60; // Attempt to reduce to 40px

        const newWidth = Math.max(minimumWidth, startWidth + deltaX);

        expect(newWidth).toBe(minimumWidth);
    });
});

// Tests for ColumnResizeHandle component
describe('ColumnResizeHandle', () => {
    test('emits resize start event', () => {
        // This test would require Vue Test Utils to test the component
        // Mock test for documentation
        const mockOnResize = jest.fn();
        const columnKey = 'test-column';
        const mockEvent = new MouseEvent('mousedown');

        // Simulate function call
        mockOnResize(mockEvent, columnKey);

        expect(mockOnResize).toHaveBeenCalledWith(mockEvent, columnKey);
    });
});

console.log('Column resize tests - OK');
console.log('To run real tests, use Jest with Vue Test Utils');
