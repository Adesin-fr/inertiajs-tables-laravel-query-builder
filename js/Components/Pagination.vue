<template>
  <nav v-if="hasPagination" class="ijt-pagination">
    <p v-if="!hasData || pagination.total < 1" class="ijt-no-results">
      {{ translations.no_results_found }}
    </p>

    <!-- simple and mobile -->
    <div v-if="hasData" class="ijt-pagination--simple" :class="{ 'ijt-pagination--has-links': hasLinks }">
      <component :is="previousPageUrl ? 'a' : 'div'" :class="[
        'ijt-pagination__button',
        {
          'ijt-pagination__button--disabled': !previousPageUrl,
        }
      ]" :href="previousPageUrl" :dusk="previousPageUrl ? 'pagination-simple-previous' : null"
        @click.prevent="onClick(previousPageUrl)">
        <svg xmlns="http://www.w3.org/2000/svg" class="ijt-pagination__button-icon" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span class="ijt-sm-inline ijt-hidden">{{ translations.previous }}</span>
      </component>
      <PerPageSelector dusk="per-page-mobile" :value="perPage" :options="perPageOptions" :on-change="onPerPageChange" />
      <component :is="nextPageUrl ? 'a' : 'div'" :class="[
        'ijt-pagination__button',
        {
          'ijt-pagination__button--disabled': !nextPageUrl,
        }
      ]" :href="nextPageUrl" :dusk="nextPageUrl ? 'pagination-simple-next' : null"
        @click.prevent="onClick(nextPageUrl)">
        <span class="ijt-sm-inline ijt-hidden">{{ translations.next }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="ijt-pagination__button-icon" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </component>
    </div>

    <!-- full pagination -->
    <div v-if="hasData && hasLinks" class="ijt-pagination--full">
      <div class="ijt-pagination__left">
        <PerPageSelector dusk="per-page-full" :value="perPage" :options="perPageOptions" :on-change="onPerPageChange" />

        <p class="ijt-pagination__info ijt-lg-block ijt-hidden">
          <span class="ijt-pagination__info-highlight">{{ pagination.from }}</span>
          {{ translations.to }}
          <span class="ijt-pagination__info-highlight">{{ pagination.to }}</span>
          {{ translations.of }}
          <span class="ijt-pagination__info-highlight">{{ pagination.total }}</span>
          {{ translations.results }}
        </p>
      </div>
      <div class="ijt-pagination__right">
        <nav class="ijt-pagination__nav" aria-label="Pagination">
          <component :is="previousPageUrl ? 'a' : 'div'" :class="[
            'ijt-pagination__button',
            'ijt-pagination__button--first',
            {
              'ijt-pagination__button--disabled': !previousPageUrl,
            }
          ]" :href="previousPageUrl" :dusk="previousPageUrl ? 'pagination-previous' : null"
            @click.prevent="onClick(previousPageUrl)">
            <span class="ijt-sr-only">{{ translations.previous }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="ijt-pagination__button-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </component>

          <div v-for="(link, key) in pagination.links" :key="key">
            <slot name="link">
              <component :is="link.url ? 'a' : 'div'" v-if="
                !isNaN(link.label) || link.label === '...'
              " :href="link.url" :dusk="link.url ? `pagination-${link.label}` : null"
                class="ijt-pagination__button"
                :class="{
                  'ijt-pagination__button--disabled': !link.url,
                  'ijt-pagination__button--active': link.active,
                }" @click.prevent="onClick(link.url)">
                <span class="ijt-pagination__button-text">{{ link.label }}</span>
              </component>
            </slot>
          </div>

          <component :is="nextPageUrl ? 'a' : 'div'" :class="[
            'ijt-pagination__button',
            'ijt-pagination__button--last',
            {
              'ijt-pagination__button--disabled': !nextPageUrl,
            }
          ]" :href="nextPageUrl" :dusk="nextPageUrl ? 'pagination-next' : null"
            @click.prevent="onClick(nextPageUrl)">
            <span class="ijt-sr-only">{{ translations.next }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="ijt-pagination__button-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </component>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script setup>
import PerPageSelector from "./PerPageSelector.vue";
import { computed } from "vue";
import { getTranslations } from "../translations.js";

const translations = getTranslations();

const props = defineProps({
  onClick: {
    type: Function,
    required: false,
  },
  perPageOptions: {
    type: Array,
    default() {
      return () => [15, 30, 50, 100];
    },
    required: false
  },
  onPerPageChange: {
    type: Function,
    default() {
      return () => { };
    },
    required: false,
  },
  hasData: {
    type: Boolean,
    required: true,
  },
  meta: {
    type: Object,
    required: false,
  },
  showExportButton: {
    type: Boolean,
    default: false,
    required: false,
  },
  exportUrl: {
    type: String,
    required: false,
  },
});

const hasLinks = computed(() => {
  if (!("links" in pagination.value)) {
    return false;
  }

  return pagination.value.links.length > 0;
});

const hasPagination = computed(() => {
  return Object.keys(pagination.value).length > 0;
});

const pagination = computed(() => {
  return props.meta;
});

const previousPageUrl = computed(() => {
  if ("prev_page_url" in pagination.value) {
    return pagination.value.prev_page_url;
  }

  return null;
});

const nextPageUrl = computed(() => {
  if ("next_page_url" in pagination.value) {
    return pagination.value.next_page_url;
  }

  return null;
});

const perPage = computed(() => {
  return parseInt(pagination.value.per_page);
});
</script>
