<template>
    <div ref="range" class="ijt-range-filter" unselectable="on" onselectstart="return false;">
        <div class="ijt-range-filter__container">
            <div class="ijt-range-filter__track">
                <div class="ijt-range-filter__selected"
                    :style="`width: ${rangeWidth}% !important; left: ${currentMinValueInPercent}% !important;`" />
                <div class="ijt-range-filter__handle"
                    :style="`left: ${currentMinValueInPercent}%;`" @mousedown="handleMouseDown($event, true)">
                    <div style="z-index: 40;">
                        <div ref="popover_min" class="ijt-range-filter__popover">
                            <div class="ijt-range-filter__popover-content" :style="getMarginTop(hasOverlap && displayFirstDown)">
                                <span v-if="prefix">{{ prefix }}</span>
                                {{ currentMinValue ?? 0 }}
                                <span v-if="suffix">{{ suffix }}</span>
                            </div>
                            <svg class="ijt-range-filter__popover-arrow" x="0px" y="0px" viewBox="0 0 255 255"
                                xml:space="preserve"
                                :class="[hasOverlap && displayFirstDown ? 'bottom-6 rotate-180' : 'top-100']">
                                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="ijt-range-filter__handle"
                    :style="`left: ${currentMaxValueInPercent}%;`" @mousedown="handleMouseDown($event, false)">
                    <div style="z-index: 40;">
                        <div ref="popover_max" class="ijt-range-filter__popover">
                            <div class="ijt-range-filter__popover-content" :style="getMarginTop(hasOverlap && !displayFirstDown)">
                                <span v-if="prefix">{{ prefix }}</span>
                                {{ currentMaxValue ?? 0 }}
                                <span v-if="suffix">{{ suffix }}</span>
                            </div>
                            <div draggable="true">
                                <svg class="ijt-range-filter__popover-arrow" x="0px" y="0px" viewBox="0 0 255 255"
                                    xml:space="preserve"
                                    :class="[hasOverlap && !displayFirstDown ? 'bottom-6 rotate-180' : 'top-100']">
                                    <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ijt-range-filter__label ijt-range-filter__label--min">
                    <span v-if="prefix">{{ prefix }}</span>
                    {{ min ?? 0 }}
                    <span v-if="suffix">{{ suffix }}</span>
                </div>
                <div class="ijt-range-filter__label ijt-range-filter__label--max">
                    <span v-if="prefix">{{ prefix }}</span>
                    {{ max ?? 0 }}
                    <span v-if="suffix">{{ suffix }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SimpleMultiRange",
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
    },
    data() {
        return {
            rangePositions: null,
            moveMin: false,
            moveMax: false,
            hasOverlap: false,
            internalValue: this.modelValue ? [...this.modelValue] : null,
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
    methods: {
        getMarginTop(isDown) {
            const defaultNumber = 4;
            let number = 4;

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
    },
};
</script>

<style scoped>
.bottom-6 {
    bottom: 1.5rem;
}
.rotate-180 {
    transform: rotate(180deg);
}
.top-100 {
    top: 100%;
}
.fill-current {
    fill: currentColor;
}
</style>
