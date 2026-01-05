import { ref, reactive, onMounted, onUnmounted, isRef, unref } from 'vue';

export function useColumnResize(storageKeyOrRef) {
    const isResizing = ref(false);
    const resizingColumn = ref(null);
    const startX = ref(0);
    const startWidth = ref(0);
    const columnWidths = reactive({});

    // Helper pour obtenir la clé de stockage actuelle
    const getStorageKey = () => {
        const key = isRef(storageKeyOrRef) ? unref(storageKeyOrRef) : storageKeyOrRef;
        return key ? `${key}-columnWidths` : null;
    };

    // Load saved widths from localStorage
    const loadColumnWidths = () => {
        const storageKey = getStorageKey();
        // Don't load widths if no storage key
        if (!storageKey) {
            return;
        }

        const saved = localStorage.getItem(storageKey);

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                Object.assign(columnWidths, parsed);
            } catch (e) {
                console.warn('Unable to load column widths:', e);
            }
        }
    };

    // Save widths to localStorage
    const saveColumnWidths = () => {
        const storageKey = getStorageKey();
        // Don't save widths if no storage key
        if (!storageKey) {
            return;
        }

        localStorage.setItem(storageKey, JSON.stringify(columnWidths));
    };

    // Initialize resize
    const startResize = (event, columnKey) => {
        event.preventDefault();
        event.stopPropagation();

        isResizing.value = true;
        resizingColumn.value = columnKey;
        startX.value = event.clientX;

        // Get current column width
        const th = event.target.closest('th');
        startWidth.value = th.offsetWidth;

        // Fix widths of all visible columns to avoid automatic redistribution
        const table = th.closest('table');
        if (table) {
            const allHeaders = table.querySelectorAll('thead th[data-column-key]');
            allHeaders.forEach(header => {
                const colKey = header.getAttribute('data-column-key');
                const currentWidth = header.offsetWidth;

                // Don't overwrite widths already defined in columnWidths
                if (!columnWidths[colKey]) {
                    columnWidths[colKey] = currentWidth;
                }

                // Apply width immediately to DOM
                header.style.width = `${columnWidths[colKey]}px`;

                // Also apply to body cells
                const columnIndex = Array.from(header.parentNode.children).indexOf(header);
                const bodyRows = table.querySelectorAll('tbody tr');
                bodyRows.forEach(row => {
                    const cell = row.children[columnIndex];
                    if (cell) {
                        cell.style.width = `${columnWidths[colKey]}px`;
                    }
                });
            });
        }

        // Add event listeners for mousemove and mouseup
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Prevent text selection during resize
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';

        // Add a class to indicate resizing in progress
        document.body.classList.add('is-resizing-columns');
    };

    // Handle mouse movement during resize
    const handleMouseMove = (event) => {
        if (!isResizing.value || !resizingColumn.value) return;

        const deltaX = event.clientX - startX.value;
        const newWidth = Math.max(50, startWidth.value + deltaX); // Minimum width of 50px

        columnWidths[resizingColumn.value] = newWidth;

        // Update column width immediately in DOM
        const th = document.querySelector(`th[data-column-key="${resizingColumn.value}"]`);
        if (th) {
            th.style.width = `${newWidth}px`;

            // Also update corresponding body cells
            const table = th.closest('table');
            if (table) {
                const columnIndex = Array.from(th.parentNode.children).indexOf(th);
                const bodyRows = table.querySelectorAll('tbody tr');
                bodyRows.forEach(row => {
                    const cell = row.children[columnIndex];
                    if (cell) {
                        cell.style.width = `${newWidth}px`;
                    }
                });
            }
        }
    };

    // Finish resizing
    const handleMouseUp = () => {
        if (isResizing.value) {
            isResizing.value = false;
            resizingColumn.value = null;

            // Save new widths
            saveColumnWidths();

            // Clean up event listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            // Restore default styles
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            document.body.classList.remove('is-resizing-columns');
        }
    };

    // Get column width
    const getColumnWidth = (columnKey) => {
        return columnWidths[columnKey] || 'auto';
    };

    // Set column width
    const setColumnWidth = (columnKey, width) => {
        columnWidths[columnKey] = width;
        saveColumnWidths();
    };

    // Initialize widths for visible columns
    const initializeColumnWidths = (tableElement) => {
        if (!tableElement) return;

        const allHeaders = tableElement.querySelectorAll('thead th[data-column-key]');
        allHeaders.forEach(header => {
            const colKey = header.getAttribute('data-column-key');

            // If width is not yet defined, use current width
            if (!columnWidths[colKey]) {
                const currentWidth = header.offsetWidth;
                columnWidths[colKey] = Math.max(currentWidth, 100); // Minimum width of 100px
            }

            // Apply width to the DOM
            header.style.width = `${columnWidths[colKey]}px`;

            // Also apply to body cells
            const columnIndex = Array.from(header.parentNode.children).indexOf(header);
            const bodyRows = tableElement.querySelectorAll('tbody tr');
            bodyRows.forEach(row => {
                const cell = row.children[columnIndex];
                if (cell) {
                    cell.style.width = `${columnWidths[colKey]}px`;
                }
            });
        });
    };

    // Reset all column widths
    const resetColumnWidths = () => {
        Object.keys(columnWidths).forEach(key => {
            delete columnWidths[key];
        });

        const storageKey = getStorageKey();
        // Remove from localStorage if we have a storage key
        if (storageKey) {
            localStorage.removeItem(storageKey);
        }
    };

    // Clean up event listeners if component is destroyed during resize
    const cleanup = () => {
        if (isResizing.value) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            document.body.classList.remove('is-resizing-columns');
        }
    };

    // Load widths on mount
    onMounted(() => {
        loadColumnWidths();
    });

    // Clean up on unmount
    onUnmounted(() => {
        cleanup();
    });

    return {
        isResizing,
        resizingColumn,
        columnWidths,
        startResize,
        getColumnWidth,
        setColumnWidth,
        resetColumnWidths,
        loadColumnWidths,
        saveColumnWidths,
        initializeColumnWidths,
    };
}
