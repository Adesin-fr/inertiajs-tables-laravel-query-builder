const translationsObject = {
    translations: {
        next: "Next",
        no_results_found: "No results found",
        of: "of",
        per_page: "per page",
        previous: "Previous",
        results: "results",
        to: "to",
        reset: "Reset",
        search: "Search...",
        noLineSelected: "No line selected",
        lineSelected: "line(s) selected",
        // Date filter translations
        filter_type: "Filter type",
        no_filter: "No filter",
        exact_date: "Exact date",
        before_date: "Before",
        after_date: "After",
        date_range: "Date range",
        start_date: "Start date",
        end_date: "End date",
        reset_filter: "Reset filter",
    }
};

export default translationsObject.translations;

export function getTranslations() {
    return translationsObject.translations;
}

export function setTranslation(key, value) {
    translationsObject.translations[key] = value;
}

export function setTranslations(translations) {
    translationsObject.translations = translations;
}