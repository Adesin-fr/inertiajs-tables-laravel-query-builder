<template>
    <div ref="range" class="flex w-full my-4 items-center justify-center" unselectable="on"
        onselectstart="return false;">
        <div class="py-1 relative min-w-full">
            <div :class="getTheme('main_bar')">
                <div class="absolute" :class="getTheme('selected_bar')"
                    :style="`width: ${rangeWidth}% !important; left: ${currentMinValueInPercent}% !important;`" />
                <div :class="getTheme('button')"
                    class="absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"
                    :style="`left: ${currentMinValueInPercent}%;`" @mousedown="handleMouseDown($event, true)">
                    <div class="z-40">
                        <div ref="popover_min" class="relative shadow-md">
                            <div :class="getTheme('popover')" :style="getMarginTop(hasOverlap && displayFirstDown)">
                                <span v-if="prefix">{{ prefix }}</span>
                                {{ currentMinValue ?? 0 }}
                                <span v-if="suffix">{{ suffix }}</span>
                            </div>
                            <svg class="absolute w-full h-2 left-0" x="0px" y="0px" viewBox="0 0 255 255"
                                xml:space="preserve"
                                :class="[hasOverlap && displayFirstDown ? 'bottom-6 rotate-180' : 'top-100', getTheme('popover_arrow')]">
                                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div :class="getTheme('button')"
                    class="absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"
                    :style="`left: ${currentMaxValueInPercent}%;`" @mousedown="handleMouseDown($event, false)">
                    <div class="z-40">
                        <div ref="popover_max" class="relative shadow-md">
                            <div :class="getTheme('popover')" :style="getMarginTop(hasOverlap && !displayFirstDown)">
                                <span v-if="prefix">{{ prefix }}</span>
                                {{ currentMaxValue ?? 0 }}
                                <span v-if="suffix">{{ suffix }}</span>
                            </div>
                            <div draggable="true">
                                <svg class="absolute w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255"
                                    xml:space="preserve"
                                    :class="[hasOverlap && !displayFirstDown ? 'bottom-6 rotate-180' : 'top-100', getTheme('popover_arrow')]">
                                    <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="absolute -ml-1 bottom-0 left-0 -mb-6" :class="getTheme('text')">
                    <span v-if="prefix">{{ prefix }}</span>
                    {{ min ?? 0 }}
                    <span v-if="suffix">{{ suffix }}</span>
                </div>
                <div class="absolute -mr-1 bottom-0 right-0 -mb-6" :class="getTheme('text')">
                    <span v-if="prefix">{{ prefix }}</span>
                    {{ max ?? 0 }}
                    <span v-if="suffix">{{ suffix }}</span>
                </div>
            </div>

            <!-- Reset Button -->
            <div v-if="hasValue" class="flex justify-end mt-4">
                <button type="button" :class="getTheme('reset_button')" @click="resetFilter">
                    <span class="sr-only">{{ translations.reset_filter }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../../helpers.js";
import translations from "../../translations.js";

export default {
    name: "SimpleMultiRange",
    inject: ["themeVariables"],
    props: {
        max: {
            required: true,
            type: Number,
        },
        modelValue: {
            required: true,
            type: Array,
        },
        min: {
            required: false,
            type: Number,
            default: 0,
        },
        prefix: {
            required: false,
            type: String,
            default: "",
        },
        suffix: {
            required: false,
            type: String,
            default: "",
        },
        step: {
            required: false,
            type: Number,
            default: 1,
        },
        color: {
            required: false,
            type: String,
            default: "primary",
        },
        ui: {
            required: false,
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            rangePositions: null,
            moveMin: false,
            moveMax: false,
            hasOverlap: false,
            internalValue: this.modelValue ? [...this.modelValue] : null,
            fallbackTheme: {
                main_bar: {
                    base: "h-2 rounded-full",
                    color: {
                        primary: "bg-gray-200",
                        dootix: "bg-gray-200",
                    },
                },
                selected_bar: {
                    base: "h-2 rounded-full",
                    color: {
                        primary: "bg-indigo-600",
                        dootix: "bg-gradient-to-r from-cyan-500 to-blue-600",
                    },
                },
                button: {
                    base: "h-4 w-4 rounded-full shadow border",
                    color: {
                        primary: "bg-white border-gray-300",
                        dootix: "bg-white border-gray-300",
                    },
                },
                popover: {
                    base: "truncate text-xs rounded py-1 px-4",
                    color: {
                        primary: "bg-gray-600 text-white",
                        dootix: "bg-gray-600 text-white",
                    },
                },
                popover_arrow: {
                    color: {
                        primary: "text-gray-600",
                        dootix: "text-gray-600",
                    },
                },
                text: {
                    color: {
                        primary: "text-gray-700",
                        dootix: "text-gray-700",
                    },
                },
                reset_button: {
                    base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
                    color: {
                        primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
                        dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500",
                    },
                },
            },
            translations: translations,
        };
    },
    computed: {
        currentMinValue() {
            try {
                if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
                    let val = Number(Math.min(...this.internalValue));
                    if (Number.isNaN(val)) {
                        throw true;
                    } else {
                        return this.checkedValue(val);
                    }
                } else {
                    throw true;
                }
            } catch (error) {
                console.error("Malformed model value. You need to have an array of 2 number");
                return Number(this.min);
            }
        },
        currentMaxValue() {
            try {
                if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
                    let val = Number(Math.max(...this.internalValue));
                    if (Number.isNaN(val)) {
                        throw true;
                    } else {
                        return this.checkedValue(val);
                    }
                } else {
                    throw true;
                }
            } catch (error) {
                console.error("Malformed model value. You need to have an array of 2 number");
                return Number(this.max);
            }
        },
        currentMinValueInPercent() {
            return (this.currentMinValue - Number(this.min)) / (Number(this.max) - Number(this.min)) * 100;
        },
        currentMaxValueInPercent() {
            return (this.currentMaxValue - Number(this.min)) / (Number(this.max) - Number(this.min)) * 100;
        },
        rangeWidth() {
            return this.currentMaxValueInPercent - this.currentMinValueInPercent;
        },
        displayFirstDown() {
            return ((this.currentMinValueInPercent + this.currentMaxValueInPercent) / 2) > 50;
        },
    },
    watch: {
        internalValue() {
            this.detectIfOverlap();
        },
    },
    mounted() {
        this.detectIfOverlap();
    },
    hasValue() {
        return this.internalValue &&
            (Number(Math.max(...this.internalValue)) !== Number(this.max) ||
                Number(Math.min(...this.internalValue)) !== Number(this.min));
    },
    methods: {
        getMarginTop(isDown) {
            const buttonTheme = this.getTheme("button");
            const regex = /h-(\d+)/;
            const match = buttonTheme.match(regex);
            const defaultNumber = 4;
            let number = null;

            if (match && 1 in match) {
                number = match[1];
            } else {
                number = defaultNumber;
            }
            if (isDown) {
                return `margin-top: ${((number - defaultNumber) + 12) * 0.25}rem`;
            }
            return `margin-top: -${(((number - defaultNumber) / 2) + 9) * 0.25}rem`;
        },
        checkedValue(value) {
            if (value < Number(this.min)) {
                console.warn("SimpleMultiRange: Your value need to be gte than your min range");
                return Number(this.min);
            } else if (value > Number(this.max)) {
                console.warn("SimpleMultiRange: Your value need to be lte than your max range");
                return Number(this.max);
            }
            return value;
        },
        detectIfOverlap() {
            let popoverMin = this.$refs.popover_min.getClientRects()[0];
            let popoverMax = this.$refs.popover_max.getClientRects()[0];
            if (popoverMin && popoverMax) {
                this.hasOverlap = popoverMin.right > popoverMax.left;
            }
        },
        handleMouseDown(event, moveMin) {
            this.moveMin = moveMin;
            this.moveMax = !moveMin;
            this.rangePositions = this.$refs.range.getClientRects()[0];
            window.addEventListener("mousemove", this.handleMouseMove);
            window.addEventListener("mouseup", this.handleMouseUp);
        },
        handleMouseMove(event) {
            let posX = event.clientX - this.rangePositions.x;
            let posInPercent = (posX / this.rangePositions.width * 100);
            let value = (posInPercent / 100) * (Number(this.max) - Number(this.min)) + Number(this.min);
            let roundedValue = Number(Math.round(value / this.step) * this.step).toFixed(2);
            if (roundedValue >= this.min && roundedValue <= this.max) {
                if (this.moveMin && roundedValue !== this.currentMinValue && roundedValue <= this.currentMaxValue) {
                    this.internalValue = [roundedValue, this.currentMaxValue];
                }
                if (this.moveMax && roundedValue !== this.currentMaxValue && roundedValue >= this.currentMinValue) {
                    this.internalValue = [this.currentMinValue, roundedValue];
                }
            }
            this.detectIfOverlap();
        },
        handleMouseUp(event) {
            this.moveMin = this.moveMax = false;
            window.removeEventListener("mousemove", this.handleMouseMove);
            window.removeEventListener("mouseup", this.handleMouseUp);
            this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
        },
        resetFilter() {
            this.internalValue = [this.min, this.max];
            this.$emit('update:modelValue', this.internalValue);
        },
        getTheme(item) {
            return twMerge(
                get_theme_part([item, "base"], this.fallbackTheme, this.themeVariables?.inertia_table?.table_filter?.number_range_filter, this.ui),
                get_theme_part([item, "color", this.color], this.fallbackTheme, this.themeVariables?.inertia_table?.table_filter?.number_range_filter, this.ui),
            );
        },
    },
};
</script>