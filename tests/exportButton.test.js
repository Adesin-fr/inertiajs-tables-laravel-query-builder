import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
import Table from '../js/Components/Table.vue';
import Pagination from '../js/Components/Pagination.vue';

// Mock the Inertia.js dependencies
vi.mock('@inertiajs/vue3', () => ({
    router: {
        visit: vi.fn()
    },
    usePage: () => ({
        props: {
            queryBuilderProps: {}
        }
    })
}));

describe('Export Button Slot', () => {
    const defaultProps = {
        resource: {
            data: [
                { id: 1, name: 'User 1' },
                { id: 2, name: 'User 2' }
            ],
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 15,
                total: 2,
                from: 1,
                to: 2
            }
        },
        showExportButton: true,
        name: 'test-table'
    };

    test('renders default export button when no slot provided', () => {
        const wrapper = mount(Table, {
            props: defaultProps,
            global: {
                stubs: {
                    Transition: false
                }
            }
        });

        // The default export button should be rendered in the pagination
        const pagination = wrapper.findComponent(Pagination);
        expect(pagination.exists()).toBe(true);
    });

    test('renders custom export button when slot provided', () => {
        const wrapper = mount(Table, {
            props: defaultProps,
            slots: {
                exportButton: `
                    <template #exportButton="{ exportUrl, translations }">
                        <button class="custom-export-btn" data-url="url-prop-received">
                            Custom Export
                        </button>
                    </template>
                `
            },
            global: {
                stubs: {
                    Transition: false
                }
            }
        });

        // Should render custom button instead of default
        const customButton = wrapper.find('.custom-export-btn');
        expect(customButton.exists()).toBe(true);
        expect(customButton.text()).toBe('Custom Export');
    });

    test('pagination component passes exportUrl and translations to slot', () => {
        const testExportUrl = '/export/test';
        const wrapper = mount(Pagination, {
            props: {
                showExportButton: true,
                exportUrl: testExportUrl,
                hasData: true,
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: 15,
                    total: 2,
                    from: 1,
                    to: 2
                }
            },
            slots: {
                exportButton: `
                    <template #exportButton="{ exportUrl, translations }">
                        <div class="slot-test" :data-export-url="exportUrl">
                            Slot received URL: {{ exportUrl }}
                        </div>
                    </template>
                `
            }
        });

        const slotElement = wrapper.find('.slot-test');
        expect(slotElement.exists()).toBe(true);
        expect(slotElement.text()).toContain(testExportUrl);
    });
});
