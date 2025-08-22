import { ref, reactive, onMounted, onUnmounted } from 'vue';

export function useColumnResize(tableName) {
    const isResizing = ref(false);
    const resizingColumn = ref(null);
    const startX = ref(0);
    const startWidth = ref(0);
    const columnWidths = reactive({});

    // Charger les largeurs sauvegardées depuis localStorage
    const loadColumnWidths = () => {
        // Ne pas charger les largeurs si le nom de la table est "default"
        if (tableName === 'default') {
            return;
        }

        const saved = localStorage.getItem(`table-column-widths-${tableName}`);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                Object.assign(columnWidths, parsed);
            } catch (e) {
                console.warn('Impossible de charger les largeurs de colonnes:', e);
            }
        }
    };

    // Sauvegarder les largeurs dans localStorage
    const saveColumnWidths = () => {
        // Ne pas sauvegarder les largeurs si le nom de la table est "default"
        if (tableName === 'default') {
            return;
        }

        localStorage.setItem(`table-column-widths-${tableName}`, JSON.stringify(columnWidths));
    };

    // Initialiser le redimensionnement
    const startResize = (event, columnKey) => {
        event.preventDefault();
        event.stopPropagation();

        isResizing.value = true;
        resizingColumn.value = columnKey;
        startX.value = event.clientX;

        // Obtenir la largeur actuelle de la colonne
        const th = event.target.closest('th');
        startWidth.value = th.offsetWidth;

        // Fixer les largeurs de toutes les colonnes visibles pour éviter la redistribution automatique
        const table = th.closest('table');
        if (table) {
            const allHeaders = table.querySelectorAll('thead th[data-column-key]');
            allHeaders.forEach(header => {
                const colKey = header.getAttribute('data-column-key');
                const currentWidth = header.offsetWidth;

                // Ne pas écraser les largeurs déjà définies dans columnWidths
                if (!columnWidths[colKey]) {
                    columnWidths[colKey] = currentWidth;
                }

                // Appliquer la largeur immédiatement au DOM
                header.style.width = `${columnWidths[colKey]}px`;

                // Appliquer aussi aux cellules du body
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

        // Ajouter les event listeners pour le mousemove et mouseup
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Empêcher la sélection de texte pendant le redimensionnement
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';

        // Ajouter une classe pour indiquer le redimensionnement en cours
        document.body.classList.add('is-resizing-columns');
    };

    // Gérer le mouvement de la souris pendant le redimensionnement
    const handleMouseMove = (event) => {
        if (!isResizing.value || !resizingColumn.value) return;

        const deltaX = event.clientX - startX.value;
        const newWidth = Math.max(50, startWidth.value + deltaX); // Largeur minimale de 50px

        columnWidths[resizingColumn.value] = newWidth;

        // Mettre à jour immédiatement la largeur de la colonne dans le DOM
        const th = document.querySelector(`th[data-column-key="${resizingColumn.value}"]`);
        if (th) {
            th.style.width = `${newWidth}px`;

            // Mettre à jour aussi les cellules du body correspondantes
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

    // Terminer le redimensionnement
    const handleMouseUp = () => {
        if (isResizing.value) {
            isResizing.value = false;
            resizingColumn.value = null;

            // Sauvegarder les nouvelles largeurs
            saveColumnWidths();

            // Nettoyer les event listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            // Restaurer les styles par défaut
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            document.body.classList.remove('is-resizing-columns');
        }
    };

    // Obtenir la largeur d'une colonne
    const getColumnWidth = (columnKey) => {
        return columnWidths[columnKey] || 'auto';
    };

    // Définir la largeur d'une colonne
    const setColumnWidth = (columnKey, width) => {
        columnWidths[columnKey] = width;
        saveColumnWidths();
    };

    // Initialiser les largeurs des colonnes visibles
    const initializeColumnWidths = (tableElement) => {
        if (!tableElement) return;

        const allHeaders = tableElement.querySelectorAll('thead th[data-column-key]');
        allHeaders.forEach(header => {
            const colKey = header.getAttribute('data-column-key');

            // Si la largeur n'est pas encore définie, utiliser la largeur actuelle
            if (!columnWidths[colKey]) {
                const currentWidth = header.offsetWidth;
                columnWidths[colKey] = Math.max(currentWidth, 100); // Largeur minimale de 100px
            }

            // Appliquer la largeur au DOM
            header.style.width = `${columnWidths[colKey]}px`;

            // Appliquer aussi aux cellules du body
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

    // Réinitialiser toutes les largeurs de colonnes
    const resetColumnWidths = () => {
        Object.keys(columnWidths).forEach(key => {
            delete columnWidths[key];
        });

        // Ne supprimer du localStorage que si le nom de la table n'est pas "default"
        if (tableName !== 'default') {
            localStorage.removeItem(`table-column-widths-${tableName}`);
        }
    };

    // Nettoyer les event listeners si le composant est détruit pendant le redimensionnement
    const cleanup = () => {
        if (isResizing.value) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            document.body.classList.remove('is-resizing-columns');
        }
    };

    // Charger les largeurs au montage
    onMounted(() => {
        loadColumnWidths();
    });

    // Nettoyer au démontage
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
