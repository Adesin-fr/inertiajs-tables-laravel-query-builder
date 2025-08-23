# CHANGELOG - Slot Export Button Personnalisable

## Version v1.x.x - [Date]

### 🆕 Nouvelles Fonctionnalités

#### Slot `exportButton` personnalisable

Ajout d'un nouveau slot `exportButton` au composant `Table.vue` qui permet de personnaliser complètement le bouton d'export CSV.

**Modifications apportées :**

1. **Composant Table.vue**
   - Ajout du passage du slot `exportButton` au composant `Pagination`
   - Transmission des props nécessaires au slot

2. **Composant Pagination.vue**
   - Ajout du slot `exportButton` avec fallback vers le bouton par défaut
   - Transmission des props `exportUrl` et `translations` au slot

3. **Documentation**
   - Mise à jour du README.md avec la documentation du nouveau slot
   - Ajout d'exemples d'utilisation complets

4. **Exemples d'implémentation**
   - Modification des pages Dashboard.vue et Users.vue pour démontrer l'utilisation
   - Création d'exemples avancés dans ExportButtonExamples.vue

5. **Tests**
   - Ajout de tests unitaires pour valider le fonctionnement du slot

### 📖 Utilisation

#### Utilisation basique
```vue
<Table :resource="data" :show-export-button="true">
    <template #exportButton="{ exportUrl, translations }">
        <button @click="customExport(exportUrl)">
            Mon bouton personnalisé
        </button>
    </template>
</Table>
```

#### Props disponibles dans le slot
- `exportUrl` : URL de téléchargement du CSV avec les filtres appliqués
- `translations` : Objet des traductions (contient `export_csv` entre autres)

#### Exemples avancés
- Bouton avec confirmation avant export
- Menu dropdown avec plusieurs options d'export (CSV, Excel, PDF)
- Bouton avec compteur de téléchargements
- Styles personnalisés avec animations

### 🔄 Rétrocompatibilité

Cette fonctionnalité est entièrement rétrocompatible. Si aucun slot `exportButton` n'est fourni, le comportement par défaut (bouton CSV standard) est maintenu.

### 🧪 Tests

Les tests couvrent :
- Rendu du bouton par défaut quand aucun slot n'est fourni
- Rendu du contenu personnalisé quand le slot est fourni
- Transmission correcte des props `exportUrl` et `translations`

### 📝 Fichiers modifiés

- `js/Components/Table.vue`
- `js/Components/Pagination.vue`
- `README.md`
- `app/resources/js/Pages/Dashboard.vue` (exemple)
- `app/resources/js/Pages/Users.vue` (exemple)
- `examples/ExportButtonExamples.vue` (nouveau)
- `tests/exportButton.test.js` (nouveau)

### 💡 Cas d'utilisation

Cette fonctionnalité permet de :
- Personnaliser l'apparence du bouton d'export
- Ajouter de la logique personnalisée avant/après l'export (analytics, notifications, etc.)
- Créer des menus d'export avec plusieurs formats
- Intégrer le bouton avec votre système de design
- Ajouter des confirmations ou validations
- Implémenter des fonctionnalités avancées (compteurs, indicateurs de progression, etc.)
