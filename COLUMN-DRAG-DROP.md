# Fonctionnalité Drag and Drop des Colonnes

Cette fonctionnalité permet aux utilisateurs de réorganiser les colonnes des tables par glisser-déposer directement dans le menu des colonnes.

## Fonctionnalités

-   **Réorganisation des colonnes** : Glissez-déposez les colonnes pour les réorganiser
-   **Persistance** : L'ordre des colonnes est sauvegardé dans le localStorage si le nom de la table est différent de "default"
-   **Toutes les colonnes** : Toutes les colonnes sont affichées dans le menu, y compris celles qui ne peuvent pas être masquées
-   **Visibilité des colonnes** : Les colonnes "hideable" peuvent toujours être masquées/affichées
-   **Animation fluide** : Transitions animées lors du glisser-déposer
-   **Feedback visuel** : Indicateurs visuels pendant le glisser-déposer

## Utilisation

La fonctionnalité est automatiquement activée sur tous les composants `Table` existants. Pour les tables nommées (avec un nom autre que "default"), l'ordre des colonnes sera persisté entre les sessions.

### Exemple basique

```vue
<Table
    :data="data"
    name="ma-table-personnalisee"
    :query-builder-props="queryBuilderProps"
/>
```

### Exemple complet avec configuration

```vue
<template>
    <Table
        :resource="users"
        name="users-table"
        :input-debounce-ms="50"
        :resizeable-columns="true"
        :show-export-button="true"
    >
        <template #cell(name)="{ item: user }">
            <div class="flex items-center">
                <div
                    class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3"
                >
                    {{ user.name.charAt(0).toUpperCase() }}
                </div>
                {{ user.name }}
            </div>
        </template>
    </Table>
</template>
```

## Interface utilisateur

Dans le menu des colonnes (bouton avec l'icône œil), vous verrez :

1. **En-tête** : Texte "Glissez pour réorganiser" en haut du menu
2. **Colonnes réorganisables** :
    - Une poignée de déplacement (icône à 6 points) à côté de chaque colonne
    - Le nom de la colonne (grisé si masqué)
    - Un bouton toggle pour masquer/afficher les colonnes "hideable"
    - Le texte "Fixe" pour les colonnes qui ne peuvent pas être masquées
3. **Feedback visuel** :
    - Curseur "move" au survol des poignées
    - Curseur "grabbing" pendant le glissement
    - Opacité réduite de l'élément en cours de glissement
    - Bordure bleue sur l'élément de destination

### Comportement

-   **Glisser-déposer** : Cliquez et maintenez sur la poignée, puis glissez vers la position désirée
-   **Animation** : Transition fluide de 200ms lors du réarrangement
-   **Persistance automatique** : L'ordre est sauvegardé automatiquement après chaque modification
-   **Synchronisation** : Les colonnes du tableau se réorganisent en temps réel

## Stockage

Les données sont stockées dans `localStorage` avec la clé `columns-{nom-de-la-table}` au format :

```json
[
    {
        "key": "id",
        "hidden": false,
        "order": 0
    },
    {
        "key": "name",
        "hidden": false,
        "order": 1
    },
    {
        "key": "email",
        "hidden": true,
        "order": 2
    }
]
```

### Compatibilité avec l'ancien format

Le système est compatible avec l'ancien format qui ne contenait que l'attribut `hidden` :

```json
[
    {
        "key": "id",
        "hidden": false
    },
    {
        "key": "name",
        "hidden": true
    }
]
```

Dans ce cas, l'ordre original des colonnes est conservé et seule la visibilité est appliquée.

## Configuration technique

### Props du composant TableColumns

-   `columns` : Array des colonnes avec leurs propriétés
-   `hasHiddenColumns` : Boolean indiquant s'il y a des colonnes masquées
-   `onChange` : Fonction callback pour les changements de visibilité
-   `tableName` : Nom de la table pour la persistance (nouveau)
-   `color` : Couleur du thème

### Événements émis

-   `column-reorder` : Émis quand les colonnes sont réorganisées, contient le nouveau tableau ordonné

### Props du composant Table

Le composant Table passe automatiquement la prop `tableName` au composant TableColumns via la prop `name`.

## Dépendances

Cette fonctionnalité utilise :

-   `vuedraggable` v4.1.0 (déjà inclus dans les dépendances)
-   Le système de localStorage existant du composant
-   Vue 3 Composition API

## Limitations

-   La persistance ne fonctionne que si `name !== "default"`
-   Le drag and drop fonctionne uniquement via la poignée désignée
-   Nécessite JavaScript activé côté client

## Exemples d'utilisation avancée

### Table avec ordre personnalisé au démarrage

```javascript
// Côté serveur (Laravel/PHP)
$queryBuilder = QueryBuilder::for(User::class)
    ->allowedColumns(['id', 'name', 'email', 'created_at'])
    ->allowedSorts(['name', 'email', 'created_at']);

// Les colonnes seront automatiquement réorganisées selon localStorage côté client
```

### Reset de l'ordre des colonnes

```javascript
// Pour remettre à zéro l'ordre des colonnes
localStorage.removeItem("columns-ma-table");
window.location.reload(); // Ou rafraîchir la table
```

### Écouter les changements d'ordre

```vue
<template>
    <Table name="ma-table" :resource="data">
        <template #tableColumns="{ columns, hasHiddenColumns, onChange }">
            <TableColumns
                :columns="columns"
                :has-hidden-columns="hasHiddenColumns"
                :on-change="onChange"
                :table-name="tableName"
                @column-reorder="onColumnReorder"
            />
        </template>
    </Table>
</template>

<script setup>
const onColumnReorder = (reorderedColumns) => {
    console.log("Nouvelles colonnes :", reorderedColumns);
    // Effectuer des actions personnalisées
};
</script>
```
