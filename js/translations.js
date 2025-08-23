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
        search: "Search",
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
        clear_filter: "Clear filter",
        reset_search: "Reset search",
        // Number filter translations
        exact_number: "Exact number",
        less_than: "Less than",
        greater_than: "Greater than",
        less_than_or_equal: "Less than or equal",
        greater_than_or_equal: "Greater than or equal",
        number_range: "Number range",
        start_number: "Start number",
        end_number: "End number",
        // Export translations
        export_csv: "CSV",
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