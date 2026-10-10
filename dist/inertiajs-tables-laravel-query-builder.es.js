import { ref as S, onMounted as ee, onBeforeUnmount as nt, openBlock as o, createElementBlock as f, renderSlot as z, watch as X, nextTick as Ne, createBlock as F, withCtx as L, createElementVNode as t, normalizeClass as P, withModifiers as R, withDirectives as T, vShow as oe, createStaticVNode as Nt, normalizeStyle as Z, toDisplayString as _, createCommentVNode as b, createTextVNode as ne, computed as q, unref as C, vModelSelect as lt, vModelText as ce, watchEffect as zt, onUnmounted as _e, Teleport as ge, Fragment as U, renderList as K, createVNode as H, withKeys as Je, inject as Ft, resolveDynamicComponent as ue, reactive as Vt, isRef as Pt, useSlots as Bt, getCurrentInstance as Et, provide as Lt, Transition as Ot, vModelCheckbox as Ze, normalizeProps as Rt, guardReactiveProps as Tt } from "vue";
import { createPopper as At } from "@popperjs/core/lib/popper-lite";
import Dt from "@popperjs/core/lib/modifiers/preventOverflow";
import Wt from "@popperjs/core/lib/modifiers/flip";
import Ut from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as Ht } from "@popperjs/core";
import Kt from "lodash-es/uniq";
import Gt from "vuedraggable";
import Xt from "lodash-es/find";
import Ie from "qs";
import Qt from "lodash-es/clone";
import Yt from "lodash-es/filter";
import Jt from "lodash-es/findKey";
import te from "lodash-es/forEach";
import Zt from "lodash-es/isEqual";
import en from "lodash-es/map";
import tn from "lodash-es/pickBy";
import { usePage as et, router as nn } from "@inertiajs/vue3";
const ln = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = S(null), d = S(null);
    return ee(() => {
      a.value = (v) => {
        v.target === d.value || d.value.contains(v.target) || u.do();
      }, document.addEventListener("click", a.value), document.addEventListener("touchstart", a.value);
    }), nt(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (v, e) => (o(), f("div", {
      ref_key: "root",
      ref: d
    }, [
      z(v.$slots, "default")
    ], 512));
  }
}, an = { class: "ijt-dropdown" }, sn = ["dusk", "disabled"], be = {
  __name: "ButtonWithDropdown",
  props: {
    placement: {
      type: String,
      default: "bottom-start",
      required: !1
    },
    active: {
      type: Boolean,
      default: !1,
      required: !1
    },
    dusk: {
      type: String,
      default: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      default: !1,
      required: !1
    }
  },
  emits: ["closed", "opened"],
  setup(n, { expose: u, emit: a }) {
    const d = a, v = n, e = S(!1), c = S(null), p = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: k }) {
        const m = k.elements.popper;
        if (!m)
          return;
        const j = 12, $ = m.getBoundingClientRect(), N = k.placement || "bottom";
        let M;
        N.startsWith("top") ? M = $.bottom - j : M = window.innerHeight - $.top - j;
        const V = Math.max(M, 160);
        m.style.maxHeight = `${V}px`, m.style.overflowY = "auto", m.style.overscrollBehavior = "contain", m.style.webkitOverflowScrolling = "touch";
      }
    };
    function y() {
      e.value = !e.value;
    }
    function h() {
      e.value = !1;
    }
    X(e, () => {
      e.value && c.value && Ne(() => c.value.update()), e.value || d("closed"), e.value && d("opened");
    });
    const r = S(null), x = S(null);
    return ee(() => {
      c.value = At(r.value, x.value, {
        placement: v.placement,
        modifiers: [Ut, Wt, Dt, p]
      });
    }), nt(() => {
      c.value && (c.value.destroy(), c.value = null);
    }), u({ hide: h }), (k, m) => (o(), F(ln, { do: h }, {
      default: L(() => [
        t("div", an, [
          t("button", {
            ref_key: "button",
            ref: r,
            type: "button",
            dusk: n.dusk,
            disabled: n.disabled,
            class: P(["ijt-dropdown__trigger", { "ijt-dropdown__trigger--disabled": n.disabled }]),
            "aria-haspopup": "true",
            onClick: R(y, ["prevent"])
          }, [
            z(k.$slots, "button")
          ], 10, sn),
          T(t("div", {
            ref_key: "tooltip",
            ref: x,
            class: "ijt-dropdown__panel"
          }, [
            z(k.$slots, "default")
          ], 512), [
            [oe, e.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, on = {
  __name: "ColumnResizeHandle",
  props: {
    columnKey: {
      type: String,
      required: !0
    },
    onResize: {
      type: Function,
      required: !0
    },
    isActive: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    const u = n, a = (d) => {
      u.onResize(d, u.columnKey);
    };
    return (d, v) => (o(), f("div", {
      class: P(["ijt-resize-handle", {
        "ijt-resize-handle--active": n.isActive,
        "ijt-resize-handle--visible": n.isActive
      }]),
      onMousedown: a
    }, [...v[0] || (v[0] = [
      Nt('<div class="ijt-resize-handle__separator"></div><div class="ijt-resize-handle__grip"><div class="ijt-resize-handle__grip-dots"><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div></div></div>', 2)
    ])], 34));
  }
}, rn = { class: "ijt-toggle-filter" }, un = { class: "ijt-toggle-filter__switch" }, cn = ["checked"], at = {
  __name: "ToggleFilter",
  props: {
    filter: {
      type: Object,
      required: !0
    },
    onFilterChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    return (u, a) => (o(), f("div", rn, [
      t("label", un, [
        t("input", {
          type: "checkbox",
          checked: n.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (d) => n.onFilterChange(n.filter.key, d.target.checked ? "1" : "0"))
        }, null, 40, cn),
        t("div", {
          class: P(["ijt-toggle-filter__track", {
            "ijt-toggle-filter__track--on": n.filter.value === "1" || n.filter.value === 1 || n.filter.value === !0,
            "ijt-toggle-filter__track--off": n.filter.value === "0" || n.filter.value === 0 || n.filter.value === !1,
            "ijt-toggle-filter__track--disabled": n.filter.value === null
          }])
        }, null, 2)
      ]),
      t("button", {
        class: "ijt-toggle-filter__reset",
        onClick: a[1] || (a[1] = R((d) => n.onFilterChange(n.filter.key, null), ["prevent"]))
      }, [...a[2] || (a[2] = [
        t("span", { class: "ijt-sr-only" }, "Remove search", -1),
        t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-toggle-filter__reset-icon",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          t("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])])
    ]));
  }
};
const ze = (n, u) => {
  const a = n.__vccOpts || n;
  for (const [d, v] of u)
    a[d] = v;
  return a;
}, dn = {
  name: "SimpleMultiRange",
  props: {
    max: {
      required: !0,
      type: Number
    },
    modelValue: {
      required: !0,
      type: Array
    },
    min: {
      required: !1,
      type: Number,
      default: 0
    },
    prefix: {
      required: !1,
      type: String,
      default: ""
    },
    suffix: {
      required: !1,
      type: String,
      default: ""
    },
    step: {
      required: !1,
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      rangePositions: null,
      moveMin: !1,
      moveMax: !1,
      hasOverlap: !1,
      internalValue: this.modelValue ? [...this.modelValue] : null
    };
  },
  computed: {
    currentMinValue() {
      try {
        if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
          let n = Number(Math.min(...this.internalValue));
          if (Number.isNaN(n))
            throw !0;
          return this.checkedValue(n);
        } else
          throw !0;
      } catch {
        return console.error("Malformed model value. You need to have an array of 2 number"), Number(this.min);
      }
    },
    currentMaxValue() {
      try {
        if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
          let n = Number(Math.max(...this.internalValue));
          if (Number.isNaN(n))
            throw !0;
          return this.checkedValue(n);
        } else
          throw !0;
      } catch {
        return console.error("Malformed model value. You need to have an array of 2 number"), Number(this.max);
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
      return (this.currentMinValueInPercent + this.currentMaxValueInPercent) / 2 > 50;
    }
  },
  watch: {
    internalValue() {
      this.detectIfOverlap();
    }
  },
  mounted() {
    this.detectIfOverlap();
  },
  methods: {
    getMarginTop(n) {
      let a = 4;
      return n ? `margin-top: ${(a - 4 + 12) * 0.25}rem` : `margin-top: -${((a - 4) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(n) {
      return n < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : n > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : n;
    },
    detectIfOverlap() {
      let n = this.$refs.popover_min.getClientRects()[0], u = this.$refs.popover_max.getClientRects()[0];
      n && u && (this.hasOverlap = n.right > u.left);
    },
    handleMouseDown(n, u) {
      this.moveMin = u, this.moveMax = !u, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(n) {
      let d = (n.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), v = Number(Math.round(d / this.step) * this.step).toFixed(2);
      v >= this.min && v <= this.max && (this.moveMin && v !== this.currentMinValue && v <= this.currentMaxValue && (this.internalValue = [v, this.currentMaxValue]), this.moveMax && v !== this.currentMaxValue && v >= this.currentMinValue && (this.internalValue = [this.currentMinValue, v])), this.detectIfOverlap();
    },
    handleMouseUp(n) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    }
  }
}, vn = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, hn = { class: "ijt-range-filter__container" }, fn = { class: "ijt-range-filter__track" }, mn = { style: { "z-index": "40" } }, pn = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, gn = { key: 0 }, _n = { key: 1 }, bn = { style: { "z-index": "40" } }, yn = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, kn = { key: 0 }, wn = { key: 1 }, xn = { draggable: "true" }, jn = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, Cn = { key: 0 }, $n = { key: 1 }, Sn = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, Mn = { key: 0 }, qn = { key: 1 };
function In(n, u, a, d, v, e) {
  var c, p, y, h;
  return o(), f("div", vn, [
    t("div", hn, [
      t("div", fn, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: Z(`width: ${e.rangeWidth}% !important; left: ${e.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: Z(`left: ${e.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (r) => e.handleMouseDown(r, !0))
        }, [
          t("div", mn, [
            t("div", pn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: Z(e.getMarginTop(v.hasOverlap && e.displayFirstDown))
              }, [
                a.prefix ? (o(), f("span", gn, _(a.prefix), 1)) : b("", !0),
                ne(" " + _((c = e.currentMinValue) != null ? c : 0) + " ", 1),
                a.suffix ? (o(), f("span", _n, _(a.suffix), 1)) : b("", !0)
              ], 4),
              (o(), f("svg", {
                class: P(["ijt-range-filter__popover-arrow", [v.hasOverlap && e.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, [...u[2] || (u[2] = [
                t("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ])], 2))
            ], 512)
          ])
        ], 36),
        t("div", {
          class: "ijt-range-filter__handle",
          style: Z(`left: ${e.currentMaxValueInPercent}%;`),
          onMousedown: u[1] || (u[1] = (r) => e.handleMouseDown(r, !1))
        }, [
          t("div", bn, [
            t("div", yn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: Z(e.getMarginTop(v.hasOverlap && !e.displayFirstDown))
              }, [
                a.prefix ? (o(), f("span", kn, _(a.prefix), 1)) : b("", !0),
                ne(" " + _((p = e.currentMaxValue) != null ? p : 0) + " ", 1),
                a.suffix ? (o(), f("span", wn, _(a.suffix), 1)) : b("", !0)
              ], 4),
              t("div", xn, [
                (o(), f("svg", {
                  class: P(["ijt-range-filter__popover-arrow", [v.hasOverlap && !e.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, [...u[3] || (u[3] = [
                  t("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ])], 2))
              ])
            ], 512)
          ])
        ], 36),
        t("div", jn, [
          a.prefix ? (o(), f("span", Cn, _(a.prefix), 1)) : b("", !0),
          ne(" " + _((y = a.min) != null ? y : 0) + " ", 1),
          a.suffix ? (o(), f("span", $n, _(a.suffix), 1)) : b("", !0)
        ]),
        t("div", Sn, [
          a.prefix ? (o(), f("span", Mn, _(a.prefix), 1)) : b("", !0),
          ne(" " + _((h = a.max) != null ? h : 0) + " ", 1),
          a.suffix ? (o(), f("span", qn, _(a.suffix), 1)) : b("", !0)
        ])
      ])
    ])
  ], 512);
}
const st = /* @__PURE__ */ ze(dn, [["render", In], ["__scopeId", "data-v-b8d9c6c5"]]), Fe = {
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
    filter_type: "Filter type",
    no_filter: "No filter",
    exact_date: "Exact date",
    before_date: "Before",
    after_date: "After",
    date_range: "Date range",
    start_date: "Start date",
    end_date: "End date",
    reset_filter: "Reset filter",
    exact_number: "Exact value",
    less_than: "Less than",
    greater_than: "Greater than",
    less_than_or_equal: "Less than or equal",
    greater_than_or_equal: "Greater than or equal",
    number_range: "Between",
    start_number: "Start value",
    end_number: "End value",
    export_csv: "Export CSV",
    add_search_fields: "Add search field",
    show_hide_columns: "Show / Hide columns",
    grouped_reset: "Reset",
    sort_by: "Sort by",
    default_sort: "Default order",
    ascending: "Ascending",
    descending: "Descending",
    select_row: "Select row"
  }
};
function le() {
  return Fe.translations;
}
function eo(n, u) {
  Fe.translations[n] = u;
}
function to(n) {
  Fe.translations = n;
}
const Nn = { class: "ijt-number-filter" }, zn = { class: "ijt-number-filter__label" }, Fn = { value: "" }, Vn = { value: "exact" }, Pn = { value: "less_than" }, Bn = { value: "greater_than" }, En = { value: "less_than_or_equal" }, Ln = { value: "greater_than_or_equal" }, On = { value: "between" }, Rn = { key: 0 }, Tn = { key: 0 }, An = { class: "ijt-number-filter__label" }, Dn = { class: "ijt-number-filter__input-wrapper" }, Wn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Un = ["step"], Hn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Kn = { key: 1 }, Gn = { style: { "margin-bottom": "0.75rem" } }, Xn = { class: "ijt-number-filter__label" }, Qn = { class: "ijt-number-filter__input-wrapper" }, Yn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Jn = ["step"], Zn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, el = { class: "ijt-number-filter__label" }, tl = { class: "ijt-number-filter__input-wrapper" }, nl = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, ll = ["step"], al = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, sl = {
  key: 1,
  class: "ijt-number-filter__reset"
}, ol = { class: "ijt-sr-only" }, ot = {
  __name: "NumberFilter",
  props: {
    filter: {
      type: Object,
      required: !0
    },
    onFilterChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = le(), d = S(""), v = S(""), e = S(""), c = S(""), p = q(() => d.value !== "" && (d.value !== "between" && v.value !== "" && v.value !== null || d.value === "between" && e.value !== "" && e.value !== null && c.value !== "" && c.value !== null));
    function y() {
      switch (d.value) {
        case "exact":
          return a.exact_number;
        case "less_than":
          return a.less_than;
        case "greater_than":
          return a.greater_than;
        case "less_than_or_equal":
          return a.less_than_or_equal;
        case "greater_than_or_equal":
          return a.greater_than_or_equal;
        default:
          return "Number";
      }
    }
    function h() {
      v.value = "", e.value = "", c.value = "", d.value === "" ? k() : r();
    }
    function r() {
      if (d.value === "")
        return;
      let m = null;
      switch (d.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          v.value !== "" && v.value !== null && (m = {
            type: d.value,
            number: v.value
          });
          break;
        case "between":
          e.value !== "" && e.value !== null && c.value !== "" && c.value !== null && (m = {
            type: d.value,
            start_number: e.value,
            end_number: c.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, m);
    }
    function x() {
      d.value = "", v.value = "", e.value = "", c.value = "";
    }
    function k() {
      x(), u.onFilterChange(u.filter.key, null);
    }
    return ee(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "");
      }
    }), X(() => u.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "") : x();
    }, { deep: !0 }), (m, j) => (o(), f("div", Nn, [
      t("div", null, [
        t("label", zn, _(C(a).filter_type), 1),
        T(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", Fn, _(C(a).no_filter), 1),
          t("option", Vn, _(C(a).exact_number), 1),
          t("option", Pn, _(C(a).less_than), 1),
          t("option", Bn, _(C(a).greater_than), 1),
          t("option", En, _(C(a).less_than_or_equal), 1),
          t("option", Ln, _(C(a).greater_than_or_equal), 1),
          t("option", On, _(C(a).number_range), 1)
        ], 544), [
          [lt, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (o(), f("div", Rn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(d.value) ? (o(), f("div", Tn, [
          t("label", An, _(y()), 1),
          t("div", Dn, [
            n.filter.prefix ? (o(), f("span", Wn, _(n.filter.prefix), 1)) : b("", !0),
            T(t("input", {
              type: "number",
              "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
              step: n.filter.step || 1,
              class: "ijt-input",
              onInput: r,
              placeholder: "0"
            }, null, 40, Un), [
              [
                ce,
                v.value,
                void 0,
                { number: !0 }
              ]
            ]),
            n.filter.suffix ? (o(), f("span", Hn, _(n.filter.suffix), 1)) : b("", !0)
          ])
        ])) : b("", !0),
        d.value === "between" ? (o(), f("div", Kn, [
          t("div", Gn, [
            t("label", Xn, _(C(a).start_number), 1),
            t("div", Qn, [
              n.filter.prefix ? (o(), f("span", Yn, _(n.filter.prefix), 1)) : b("", !0),
              T(t("input", {
                type: "number",
                "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Jn), [
                [
                  ce,
                  e.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (o(), f("span", Zn, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ]),
          t("div", null, [
            t("label", el, _(C(a).end_number), 1),
            t("div", tl, [
              n.filter.prefix ? (o(), f("span", nl, _(n.filter.prefix), 1)) : b("", !0),
              T(t("input", {
                type: "number",
                "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, ll), [
                [
                  ce,
                  c.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (o(), f("span", al, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (o(), f("div", sl, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: k
        }, [
          t("span", ol, _(C(a).reset_filter), 1),
          j[4] || (j[4] = t("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "ijt-number-filter__reset-icon",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            t("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ])
      ])) : b("", !0)
    ]));
  }
}, rl = { class: "ijt-date-filter" }, il = { class: "ijt-date-filter__label" }, ul = { value: "" }, cl = { value: "exact" }, dl = { value: "before" }, vl = { value: "after" }, hl = { value: "between" }, fl = { key: 0 }, ml = { key: 0 }, pl = { class: "ijt-date-filter__label" }, gl = { key: 1 }, _l = { style: { "margin-bottom": "0.75rem" } }, bl = { class: "ijt-date-filter__label" }, yl = { class: "ijt-date-filter__label" }, kl = {
  key: 1,
  class: "ijt-date-filter__reset"
}, wl = { class: "ijt-sr-only" }, rt = {
  __name: "DateFilter",
  props: {
    filter: {
      type: Object,
      required: !0
    },
    onFilterChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = le(), d = S(""), v = S(""), e = S(""), c = S(""), p = q(() => d.value !== "" && (d.value !== "between" && v.value || d.value === "between" && e.value && c.value));
    function y() {
      switch (d.value) {
        case "exact":
          return a.exact_date;
        case "before":
          return a.before_date;
        case "after":
          return a.after_date;
        default:
          return "Date";
      }
    }
    function h() {
      v.value = "", e.value = "", c.value = "", d.value === "" ? k() : r();
    }
    function r() {
      if (d.value === "")
        return;
      let m = null;
      switch (d.value) {
        case "exact":
        case "before":
        case "after":
          v.value && (m = {
            type: d.value,
            date: v.value
          });
          break;
        case "between":
          e.value && c.value && (m = {
            type: d.value,
            start_date: e.value,
            end_date: c.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, m);
    }
    function x() {
      d.value = "", v.value = "", e.value = "", c.value = "";
    }
    function k() {
      x(), u.onFilterChange(u.filter.key, null);
    }
    return ee(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "");
      }
    }), X(() => u.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "") : x();
    }, { deep: !0 }), (m, j) => (o(), f("div", rl, [
      t("div", null, [
        t("label", il, _(C(a).filter_type), 1),
        T(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", ul, _(C(a).no_filter), 1),
          t("option", cl, _(C(a).exact_date), 1),
          t("option", dl, _(C(a).before_date), 1),
          t("option", vl, _(C(a).after_date), 1),
          t("option", hl, _(C(a).date_range), 1)
        ], 544), [
          [lt, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (o(), f("div", fl, [
        ["exact", "before", "after"].includes(d.value) ? (o(), f("div", ml, [
          t("label", pl, _(y()), 1),
          T(t("input", {
            type: "date",
            "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
            class: "ijt-input",
            onChange: r
          }, null, 544), [
            [ce, v.value]
          ])
        ])) : b("", !0),
        d.value === "between" ? (o(), f("div", gl, [
          t("div", _l, [
            t("label", bl, _(C(a).start_date), 1),
            T(t("input", {
              type: "date",
              "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ce, e.value]
            ])
          ]),
          t("div", null, [
            t("label", yl, _(C(a).end_date), 1),
            T(t("input", {
              type: "date",
              "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ce, c.value]
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (o(), f("div", kl, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: k
        }, [
          t("span", wl, _(C(a).reset_filter), 1),
          j[4] || (j[4] = t("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "ijt-date-filter__reset-icon",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            t("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ])
      ])) : b("", !0)
    ]));
  }
};
function it(n) {
  let u = S(null), a = S(null);
  return ee(() => {
    zt((d) => {
      if (!a.value || !u.value)
        return;
      let v = a.value.el || a.value, e = u.value.el || u.value;
      if (!(e instanceof HTMLElement) || !(v instanceof HTMLElement))
        return;
      let { destroy: c } = Ht(e, v, n);
      d(c);
    });
  }), [u, a];
}
const xl = { class: "ijt-filter" }, jl = ["dusk"], Cl = { class: "ijt-dropdown__header" }, $l = { class: "ijt-dropdown__content" }, Sl = ["name", "value", "onChange"], Ml = ["value"], ql = {
  key: 2,
  style: { "min-width": "300px" }
}, Il = {
  key: 3,
  style: { "min-width": "250px" }
}, Nl = {
  key: 4,
  style: { "min-width": "300px" }
}, zl = {
  __name: "ColumnFilter",
  props: {
    columnKey: {
      type: String,
      required: !0
    },
    filters: {
      type: Array,
      required: !0
    },
    onFilterChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = S(!1), [d, v] = it({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), e = q(() => u.filters.filter((m) => m.key === u.columnKey || m.key.startsWith(u.columnKey + "_") || m.key.includes(u.columnKey))), c = q(() => e.value.some((m) => !h(m)));
    function p() {
      e.value.length > 0 && (a.value = !a.value);
    }
    function y() {
      a.value = !1;
    }
    function h(m) {
      if (m.value === null)
        return !0;
      switch (m.type) {
        case "number_range":
          return Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min);
        case "select":
          return m.value === "";
        case "toggle":
          return !1;
        case "date":
          return !m.value || typeof m.value == "object" && !m.value.type;
        default:
          return !m.value;
      }
    }
    function r(m, j) {
      u.onFilterChange(m, j);
    }
    function x(m) {
      let j = m.value;
      m.value && (Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) ? j = null : Number(Math.min(...m.value)) === 0 && Number(Math.max(...m.value)) === 0 && (j = ["0", "0"])), u.onFilterChange(m.key, j);
    }
    function k(m) {
      v.value && !v.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && y();
    }
    return ee(() => {
      document.addEventListener("click", k);
    }), _e(() => {
      document.removeEventListener("click", k);
    }), (m, j) => (o(), f("div", xl, [
      t("button", {
        ref_key: "trigger",
        ref: d,
        onClick: p,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": c.value }]),
        dusk: `column-filter-${n.columnKey}`
      }, [...j[1] || (j[1] = [
        t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-filter__button-icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          t("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, jl),
      (o(), F(ge, { to: "body" }, [
        a.value ? (o(), f("div", {
          key: 0,
          ref_key: "container",
          ref: v,
          class: "ijt-filter__dropdown",
          style: { "z-index": "9999" },
          onClick: j[0] || (j[0] = R(() => {
          }, ["stop"]))
        }, [
          (o(!0), f(U, null, K(e.value, ($) => (o(), f("div", {
            key: $.key
          }, [
            t("h3", Cl, _($.label), 1),
            t("div", $l, [
              $.type === "select" ? (o(), f("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: "ijt-select",
                onChange: (N) => r($.key, N.target.value)
              }, [
                (o(!0), f(U, null, K($.options, (N, M) => (o(), f("option", {
                  key: M,
                  value: M
                }, _(N), 9, Ml))), 128))
              ], 40, Sl)) : b("", !0),
              $.type === "toggle" ? (o(), F(at, {
                key: 1,
                filter: $,
                "on-filter-change": r
              }, null, 8, ["filter"])) : b("", !0),
              $.type === "number" ? (o(), f("div", ql, [
                H(ot, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0),
              $.type === "number_range" ? (o(), f("div", Il, [
                H(st, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(N) => $.value = N, (N) => x($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              $.type === "date" ? (o(), f("div", Nl, [
                H(rt, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0)
            ])
          ]))), 128))
        ], 512)) : b("", !0)
      ])),
      (o(), F(ge, { to: "body" }, [
        a.value ? (o(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: y
        })) : b("", !0)
      ]))
    ]));
  }
}, Fl = { class: "ijt-filter" }, Vl = ["dusk"], Pl = { class: "ijt-column-search__header" }, Bl = { class: "ijt-column-search__content" }, El = ["value", "placeholder"], Ll = {
  key: 0,
  class: "ijt-column-search__reset"
}, Ol = { class: "ijt-sr-only" }, Rl = {
  __name: "ColumnSearch",
  props: {
    columnKey: {
      type: String,
      required: !0
    },
    columnLabel: {
      type: String,
      required: !0
    },
    searchInputs: {
      type: Array,
      required: !0
    },
    onSearchChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = le(), d = S(!1), v = S(null), [e, c] = it({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = q(() => u.searchInputs.find((N) => N.key === u.columnKey)), y = q(() => p.value && p.value.value || ""), h = S(y.value);
    X(y, (N) => {
      document.activeElement !== v.value && (h.value = N);
    });
    const r = q(() => y.value !== "");
    async function x() {
      p.value && (d.value = !d.value, d.value && (await Ne(), v.value && v.value.focus()));
    }
    function k() {
      d.value = !1;
    }
    function m(N) {
      j(N.target.value);
    }
    function j(N) {
      h.value = N, u.onSearchChange(u.columnKey, N);
    }
    function $(N) {
      c.value && !c.value.contains(N.target) && !N.target.closest(`[dusk="column-search-${u.columnKey}"]`) && k();
    }
    return ee(() => {
      document.addEventListener("click", $);
    }), _e(() => {
      document.removeEventListener("click", $);
    }), (N, M) => (o(), f("div", Fl, [
      t("button", {
        ref_key: "trigger",
        ref: e,
        onClick: x,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": r.value }]),
        dusk: `column-search-${n.columnKey}`
      }, [...M[2] || (M[2] = [
        t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-filter__button-icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          t("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, Vl),
      (o(), F(ge, { to: "body" }, [
        d.value ? (o(), f("div", {
          key: 0,
          ref_key: "container",
          ref: c,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: M[1] || (M[1] = R(() => {
          }, ["stop"]))
        }, [
          t("h3", Pl, _(C(a).search) + " " + _(n.columnLabel), 1),
          t("div", Bl, [
            t("input", {
              ref_key: "searchInput",
              ref: v,
              type: "text",
              value: h.value,
              class: "ijt-column-search__input",
              placeholder: `${C(a).search} ${n.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                Je(k, ["enter"]),
                Je(k, ["escape"])
              ]
            }, null, 40, El),
            h.value !== "" ? (o(), f("div", Ll, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: M[0] || (M[0] = (V) => j(""))
              }, [
                t("span", Ol, _(C(a).reset), 1),
                M[3] || (M[3] = t("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-search-row__remove-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  t("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  })
                ], -1))
              ])
            ])) : b("", !0)
          ])
        ], 512)) : b("", !0)
      ])),
      (o(), F(ge, { to: "body" }, [
        d.value ? (o(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: k
        })) : b("", !0)
      ]))
    ]));
  }
}, Tl = ["data-column-key"], Al = { class: "ijt-table__th-content" }, Dl = { class: "ijt-table__th-label" }, Wl = ["sorted"], Ul = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Hl = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Kl = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Gl = { class: "ijt-table__th-actions" }, Xl = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = Ft("columnResize", null), d = q(() => {
      if (!a)
        return "auto";
      const y = a.getColumnWidth(u.cell.key);
      return y === "auto" ? y : `${y}px`;
    }), v = q(() => (a == null ? void 0 : a.isResizing) || !1), e = q(() => (a == null ? void 0 : a.resizingColumn) || null);
    function c() {
      u.cell.sortable && u.cell.onSort(u.cell.key);
    }
    function p(y, h) {
      a && a.startResize(y, h);
    }
    return (y, h) => T((o(), f("th", {
      class: P(["ijt-table__th", n.cell.header_class]),
      style: Z({ width: d.value }),
      "data-column-key": n.cell.key
    }, [
      (o(), F(ue(n.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: n.cell.sortable ? `sort-${n.cell.key}` : null,
        onClick: R(c, ["prevent"])
      }, {
        default: L(() => [
          t("span", Al, [
            t("span", Dl, [
              z(y.$slots, "label", {}, () => [
                t("span", null, _(n.cell.label), 1)
              ]),
              z(y.$slots, "sort", {}, () => [
                n.cell.sortable ? (o(), f("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: P(["ijt-sort-icon", {
                    "ijt-sort-icon--active": n.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: n.cell.sorted
                }, [
                  n.cell.sorted ? b("", !0) : (o(), f("path", Ul)),
                  n.cell.sorted === "asc" ? (o(), f("path", Hl)) : b("", !0),
                  n.cell.sorted === "desc" ? (o(), f("path", Kl)) : b("", !0)
                ], 10, Wl)) : b("", !0)
              ])
            ]),
            t("span", Gl, [
              z(y.$slots, "search", {}, () => [
                n.cell.searchable && n.cell.searchInputs && n.cell.searchInputs.length > 0 ? (o(), F(Rl, {
                  key: 0,
                  "column-key": n.cell.key,
                  "column-label": n.cell.label,
                  "search-inputs": n.cell.searchInputs,
                  "on-search-change": n.cell.onSearchChange,
                  onClick: h[0] || (h[0] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : b("", !0)
              ]),
              z(y.$slots, "filter", {}, () => [
                n.cell.filters && n.cell.filters.length > 0 ? (o(), F(zl, {
                  key: 0,
                  "column-key": n.cell.key,
                  filters: n.cell.filters,
                  "on-filter-change": n.cell.onFilterChange,
                  onClick: h[1] || (h[1] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change"])) : b("", !0)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      n.cell.resizable !== !1 && C(a) ? (o(), F(on, {
        key: 0,
        "column-key": n.cell.key,
        "on-resize": p,
        "is-active": v.value && e.value === n.cell.key
      }, null, 8, ["column-key", "is-active"])) : b("", !0)
    ], 14, Tl)), [
      [oe, !n.cell.hidden]
    ]);
  }
}, Ql = ["dusk", "value"], Yl = ["value"], tt = {
  __name: "PerPageSelector",
  props: {
    dusk: {
      type: String,
      default: null,
      required: !1
    },
    value: {
      type: Number,
      default: 15,
      required: !1
    },
    options: {
      type: Array,
      default() {
        return [15, 30, 50, 100];
      },
      required: !1
    },
    onChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = le(), a = n, d = q(() => {
      let v = [...a.options];
      return v.push(parseInt(a.value)), Kt(v).sort((e, c) => e - c);
    });
    return (v, e) => (o(), f("select", {
      name: "per_page",
      dusk: n.dusk,
      value: n.value,
      class: "ijt-per-page",
      onChange: e[0] || (e[0] = (c) => n.onChange(c.target.value))
    }, [
      (o(!0), f(U, null, K(d.value, (c) => (o(), f("option", {
        key: c,
        value: c
      }, _(c) + " " + _(C(u).per_page), 9, Yl))), 128))
    ], 40, Ql));
  }
}, Jl = {
  key: 0,
  class: "ijt-pagination"
}, Zl = {
  key: 0,
  class: "ijt-no-results"
}, ea = { class: "ijt-sm-inline ijt-hidden" }, ta = { class: "ijt-sm-inline ijt-hidden" }, na = {
  key: 2,
  class: "ijt-pagination--full"
}, la = { class: "ijt-pagination__left" }, aa = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, sa = { class: "ijt-pagination__info-highlight" }, oa = { class: "ijt-pagination__info-highlight" }, ra = { class: "ijt-pagination__info-highlight" }, ia = { class: "ijt-pagination__right" }, ua = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, ca = { class: "ijt-sr-only" }, da = { class: "ijt-pagination__button-text" }, va = { class: "ijt-sr-only" }, ha = {
  __name: "Pagination",
  props: {
    onClick: {
      type: Function,
      required: !1
    },
    perPageOptions: {
      type: Array,
      default() {
        return () => [15, 30, 50, 100];
      },
      required: !1
    },
    onPerPageChange: {
      type: Function,
      default() {
        return () => {
        };
      },
      required: !1
    },
    hasData: {
      type: Boolean,
      required: !0
    },
    meta: {
      type: Object,
      required: !1
    },
    showExportButton: {
      type: Boolean,
      default: !1,
      required: !1
    },
    exportUrl: {
      type: String,
      required: !1
    }
  },
  setup(n) {
    const u = le(), a = n, d = q(() => "links" in e.value ? e.value.links.length > 0 : !1), v = q(() => Object.keys(e.value).length > 0), e = q(() => a.meta), c = q(() => "prev_page_url" in e.value ? e.value.prev_page_url : null), p = q(() => "next_page_url" in e.value ? e.value.next_page_url : null), y = q(() => parseInt(e.value.per_page));
    return (h, r) => v.value ? (o(), f("nav", Jl, [
      !n.hasData || e.value.total < 1 ? (o(), f("p", Zl, _(C(u).no_results_found), 1)) : b("", !0),
      n.hasData ? (o(), f("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": d.value }])
      }, [
        (o(), F(ue(c.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !c.value
            }
          ]),
          href: c.value,
          dusk: c.value ? "pagination-simple-previous" : null,
          onClick: r[0] || (r[0] = R((x) => n.onClick(c.value), ["prevent"]))
        }, {
          default: L(() => [
            r[4] || (r[4] = t("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "ijt-pagination__button-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              t("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M7 16l-4-4m0 0l4-4m-4 4h18"
              })
            ], -1)),
            t("span", ea, _(C(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        H(tt, {
          dusk: "per-page-mobile",
          value: y.value,
          options: n.perPageOptions,
          "on-change": n.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (o(), F(ue(p.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !p.value
            }
          ]),
          href: p.value,
          dusk: p.value ? "pagination-simple-next" : null,
          onClick: r[1] || (r[1] = R((x) => n.onClick(p.value), ["prevent"]))
        }, {
          default: L(() => [
            t("span", ta, _(C(u).next), 1),
            r[5] || (r[5] = t("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "ijt-pagination__button-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              t("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M17 8l4 4m0 0l-4 4m4-4H3"
              })
            ], -1))
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"]))
      ], 2)) : b("", !0),
      n.hasData && d.value ? (o(), f("div", na, [
        t("div", la, [
          H(tt, {
            dusk: "per-page-full",
            value: y.value,
            options: n.perPageOptions,
            "on-change": n.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", aa, [
            t("span", sa, _(e.value.from), 1),
            ne(" " + _(C(u).to) + " ", 1),
            t("span", oa, _(e.value.to), 1),
            ne(" " + _(C(u).of) + " ", 1),
            t("span", ra, _(e.value.total), 1),
            ne(" " + _(C(u).results), 1)
          ])
        ]),
        t("div", ia, [
          t("nav", ua, [
            (o(), F(ue(c.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--first",
                {
                  "ijt-pagination__button--disabled": !c.value
                }
              ]),
              href: c.value,
              dusk: c.value ? "pagination-previous" : null,
              onClick: r[2] || (r[2] = R((x) => n.onClick(c.value), ["prevent"]))
            }, {
              default: L(() => [
                t("span", ca, _(C(u).previous), 1),
                r[6] || (r[6] = t("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-pagination__button-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  t("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"])),
            (o(!0), f(U, null, K(e.value.links, (x, k) => (o(), f("div", { key: k }, [
              z(h.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (o(), F(ue(x.url ? "a" : "div"), {
                  key: 0,
                  href: x.url,
                  dusk: x.url ? `pagination-${x.label}` : null,
                  class: P(["ijt-pagination__button", {
                    "ijt-pagination__button--disabled": !x.url,
                    "ijt-pagination__button--active": x.active
                  }]),
                  onClick: R((m) => n.onClick(x.url), ["prevent"])
                }, {
                  default: L(() => [
                    t("span", da, _(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : b("", !0)
              ])
            ]))), 128)),
            (o(), F(ue(p.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--last",
                {
                  "ijt-pagination__button--disabled": !p.value
                }
              ]),
              href: p.value,
              dusk: p.value ? "pagination-next" : null,
              onClick: r[3] || (r[3] = R((x) => n.onClick(p.value), ["prevent"]))
            }, {
              default: L(() => [
                t("span", va, _(C(u).next), 1),
                r[7] || (r[7] = t("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-pagination__button-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  t("path", {
                    "fill-rule": "evenodd",
                    d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"]))
          ])
        ])
      ])) : b("", !0)
    ])) : b("", !0);
  }
}, fa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, ma = ["dusk", "onClick"], pa = {
  __name: "TableAddSearchRow",
  props: {
    searchInputs: {
      type: Object,
      required: !0
    },
    hasSearchInputsWithoutValue: {
      type: Boolean,
      required: !0
    },
    onAdd: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = S(null);
    function d(v) {
      u.onAdd(v), a.value.hide();
    }
    return (v, e) => (o(), F(be, {
      ref_key: "dropdown",
      ref: a,
      dusk: "add-search-row-dropdown",
      disabled: !n.hasSearchInputsWithoutValue,
      class: "ijt-dropdown--auto-width"
    }, {
      button: L(() => [...e[0] || (e[0] = [
        t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-button__icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          t("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])]),
      default: L(() => [
        t("div", fa, [
          (o(!0), f(U, null, K(n.searchInputs, (c, p) => (o(), f("button", {
            key: p,
            dusk: `add-search-row-${c.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((y) => d(c.key), ["prevent"])
          }, _(c.label), 9, ma))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, ga = ["data-column-key"], _a = { class: "ijt-column-manager__item-left" }, ba = ["onClick", "title"], ya = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, ka = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, wa = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], ut = {
  __name: "ColumnManager",
  props: {
    columns: {
      type: Array,
      required: !0
    },
    canSort: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["columns-changed"],
  setup(n, { emit: u }) {
    const a = n, d = u, v = S([...a.columns]), e = S(!1), c = S(!1);
    X(() => a.columns, (r) => {
      !e.value && !c.value && (v.value = [...r]), c.value && setTimeout(() => {
        c.value = !1;
      }, 100);
    }, { deep: !0 });
    function p(r, x) {
      const k = v.value.findIndex((m) => m.key === r);
      k !== -1 && (v.value[k].hidden = !x), d("columns-changed", v.value);
    }
    function y(r, x) {
      const k = v.value.findIndex((m) => m.key === r);
      k !== -1 && (v.value[k].pinned = !x), v.value.sort((m, j) => m.pinned && !j.pinned ? -1 : !m.pinned && j.pinned ? 1 : 0), d("columns-changed", v.value);
    }
    function h() {
      c.value = !0, d("columns-changed", v.value);
    }
    return (r, x) => (o(), F(C(Gt), {
      modelValue: v.value,
      "onUpdate:modelValue": x[0] || (x[0] = (k) => v.value = k),
      "item-key": "key",
      animation: 200,
      handle: ".ijt-column-manager__drag-handle",
      "ghost-class": "ijt-sortable-ghost",
      "chosen-class": "ijt-sortable-chosen",
      onChange: h,
      onStart: x[1] || (x[1] = (k) => e.value = !0),
      onEnd: x[2] || (x[2] = (k) => e.value = !1)
    }, {
      item: L(({ element: k }) => [
        t("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": k.key
        }, [
          t("div", _a, [
            x[5] || (x[5] = t("div", { class: "ijt-column-manager__drag-handle" }, [
              t("svg", {
                class: "ijt-column-manager__drag-handle-icon",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                t("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            k.can_be_pinned !== !1 ? (o(), f("button", {
              key: 0,
              type: "button",
              class: P(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": k.pinned }]),
              onClick: R((m) => y(k.key, k.pinned), ["prevent"]),
              title: k.pinned ? "Unpin column" : "Pin column"
            }, [
              k.pinned ? (o(), f("svg", ya, [...x[3] || (x[3] = [
                t("g", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5"
                }, [
                  t("path", { d: "M9.5 14.5L3 21" }),
                  t("path", {
                    fill: "currentColor",
                    d: "m5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                  })
                ], -1)
              ])])) : (o(), f("svg", ka, [...x[4] || (x[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, ba)) : b("", !0),
            t("p", {
              class: P(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": k.hidden,
                "ijt-column-manager__label--pinned": k.pinned
              }])
            }, _(k.label), 3)
          ]),
          k.can_be_hidden && !k.pinned ? (o(), f("button", {
            key: 0,
            type: "button",
            class: P(["ijt-toggle", {
              "ijt-toggle--on": !k.hidden,
              "ijt-toggle--off": k.hidden
            }]),
            "aria-pressed": !k.hidden,
            "aria-labelledby": `toggle-column-${k.key}`,
            "aria-describedby": `toggle-column-${k.key}`,
            dusk: `toggle-column-${k.key}`,
            onClick: R((m) => p(k.key, k.hidden), ["prevent"])
          }, [...x[6] || (x[6] = [
            t("span", { class: "ijt-sr-only" }, "Column status", -1),
            t("span", {
              "aria-hidden": "true",
              class: "ijt-toggle__handle"
            }, null, -1)
          ])], 10, wa)) : b("", !0)
        ], 8, ga)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, xa = {
  key: 0,
  class: "ijt-button__badge"
}, ja = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, Ca = {
  __name: "TableColumns",
  props: {
    columns: {
      type: Object,
      required: !0
    },
    hasHiddenColumns: {
      type: Boolean,
      required: !0
    },
    onChange: {
      type: Function,
      required: !0
    },
    tableName: {
      type: String,
      default: "default",
      required: !1
    }
  },
  setup(n) {
    const u = n, a = S([...u.columns]);
    X(() => u.columns, (e) => {
      a.value = [...e];
    }, { deep: !0, immediate: !0 });
    const d = q(() => a.value.filter((e) => e.hidden).length);
    function v(e) {
      a.value = [...e], u.onChange(e);
    }
    return (e, c) => (o(), F(be, {
      placement: "bottom-end",
      dusk: "columns-dropdown"
    }, {
      button: L(() => [
        c[0] || (c[0] = t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-button__icon",
          viewBox: "0 0 48 48"
        }, [
          t("path", {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "4",
            d: "m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
          })
        ], -1)),
        n.hasHiddenColumns ? (o(), f("span", xa, "(" + _(d.value) + ")", 1)) : b("", !0)
      ]),
      default: L(() => [
        t("div", ja, [
          H(ut, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: v
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, $a = {
  key: 0,
  class: "ijt-button__badge"
}, Sa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, Ma = { class: "ijt-dropdown__header" }, qa = { class: "ijt-dropdown__content" }, Ia = ["name", "value", "onChange"], Na = ["value"], za = {
  key: 2,
  style: { "min-width": "250px" }
}, Fa = {
  key: 3,
  style: { "min-width": "300px" }
}, Va = {
  key: 4,
  style: { "min-width": "300px" }
}, Pa = {
  __name: "TableFilter",
  props: {
    hasEnabledFilters: {
      type: Boolean,
      required: !0
    },
    filters: {
      type: Object,
      required: !0
    },
    onFilterChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = q(() => u.filters.filter((e) => !d(e)).length);
    function d(e) {
      if (e.value === null)
        return !0;
      switch (e.type) {
        case "number_range":
          return Number(Math.max(...e.value)) === Number(e.max) && Number(Math.min(...e.value)) === Number(e.min);
        case "select":
          return e.value === "";
        case "toggle":
          return !1;
        case "date":
          return !e.value || typeof e.value == "object" && !e.value.type;
        case "number":
          return !e.value || typeof e.value == "object" && !e.value.type;
        default:
          return !e.value;
      }
    }
    function v(e) {
      let c = e.value;
      e.value && (Number(Math.max(...e.value)) === Number(e.max) && Number(Math.min(...e.value)) === Number(e.min) ? c = null : Number(Math.min(...e.value)) === 0 && Number(Math.max(...e.value)) === 0 && (c = ["0", "0"])), u.onFilterChange(e.key, c);
    }
    return (e, c) => (o(), F(be, {
      placement: "bottom-end",
      dusk: "filters-dropdown"
    }, {
      button: L(() => [
        c[0] || (c[0] = t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-button__icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          t("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        n.hasEnabledFilters ? (o(), f("span", $a, "(" + _(a.value) + ")", 1)) : b("", !0)
      ]),
      default: L(() => [
        t("div", Sa, [
          (o(!0), f(U, null, K(n.filters, (p, y) => (o(), f("div", { key: y }, [
            t("h3", Ma, _(p.label), 1),
            t("div", qa, [
              p.type === "select" ? (o(), f("select", {
                key: 0,
                name: p.key,
                value: p.value,
                class: "ijt-select",
                onChange: (h) => n.onFilterChange(p.key, h.target.value)
              }, [
                (o(!0), f(U, null, K(p.options, (h, r) => (o(), f("option", {
                  key: r,
                  value: r
                }, _(h), 9, Na))), 128))
              ], 40, Ia)) : b("", !0),
              p.type === "toggle" ? (o(), F(at, {
                key: 1,
                filter: p,
                "on-filter-change": n.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : b("", !0),
              p.type === "number_range" ? (o(), f("div", za, [
                H(st, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(h) => p.value = h, (h) => v(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              p.type === "date" ? (o(), f("div", Fa, [
                H(rt, {
                  filter: p,
                  "on-filter-change": n.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0),
              p.type === "number" ? (o(), f("div", Va, [
                H(ot, {
                  filter: p,
                  "on-filter-change": n.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }));
  }
}, Ba = { class: "ijt-global-search" }, Ea = ["placeholder", "value"], La = {
  __name: "TableGlobalSearch",
  props: {
    label: {
      type: String,
      default: "Search...",
      required: !1
    },
    value: {
      type: String,
      default: "",
      required: !1
    },
    onChange: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    var e;
    const u = n, a = S(null), d = S((e = u.value) != null ? e : "");
    X(() => u.value, (c) => {
      document.activeElement !== a.value && (d.value = c != null ? c : "");
    });
    function v(c) {
      d.value = c.target.value, u.onChange(d.value);
    }
    return (c, p) => (o(), f("div", Ba, [
      t("input", {
        ref_key: "inputEl",
        ref: a,
        class: "ijt-global-search__input",
        placeholder: n.label,
        value: d.value,
        type: "text",
        name: "global",
        onInput: v
      }, null, 40, Ea),
      p[0] || (p[0] = t("div", { class: "ijt-global-search__icon" }, [
        t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          t("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ])
      ], -1))
    ]));
  }
}, Oa = { class: "ijt-search-row__container" }, Ra = ["for"], Ta = ["id", "name", "value", "onInput"], Aa = { class: "ijt-search-row__remove" }, Da = ["dusk", "onClick"], Wa = {
  __name: "TableSearchRows",
  props: {
    searchInputs: {
      type: Object,
      required: !0
    },
    forcedVisibleSearchInputs: {
      type: Array,
      required: !0
    },
    onChange: {
      type: Function,
      required: !0
    },
    onRemove: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = { el: S([]) };
    let a = q(() => u.el.value);
    const d = n;
    function v(e) {
      return d.forcedVisibleSearchInputs.includes(e);
    }
    return X(d.forcedVisibleSearchInputs, (e) => {
      const c = e.length > 0 ? e[e.length - 1] : null;
      !c || Ne().then(() => {
        const p = Xt(a.value, (y) => y.name === c);
        p && p.focus();
      });
    }, { immediate: !0 }), (e, c) => (o(!0), f(U, null, K(n.searchInputs, (p, y) => T((o(), f("div", {
      key: y,
      class: "ijt-search-row"
    }, [
      t("div", Oa, [
        t("label", {
          for: p.key,
          class: "ijt-search-row__label"
        }, [
          c[0] || (c[0] = t("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "ijt-search-row__label-icon",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, [
            t("path", {
              "fill-rule": "evenodd",
              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
              "clip-rule": "evenodd"
            })
          ], -1)),
          t("span", null, _(p.label), 1)
        ], 8, Ra),
        (o(), f("input", {
          id: p.key,
          ref_for: !0,
          ref: u.el,
          key: p.key,
          name: p.key,
          value: p.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (h) => n.onChange(p.key, h.target.value)
        }, null, 40, Ta)),
        t("div", Aa, [
          t("button", {
            class: "ijt-search-row__remove-button",
            dusk: `remove-search-row-${p.key}`,
            onClick: R((h) => n.onRemove(p.key), ["prevent"])
          }, [...c[1] || (c[1] = [
            t("span", { class: "ijt-sr-only" }, "Remove search", -1),
            t("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "ijt-search-row__remove-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              t("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M6 18L18 6M6 6l12 12"
              })
            ], -1)
          ])], 8, Da)
        ])
      ])
    ])), [
      [oe, p.value !== null || v(p.key)]
    ])), 128));
  }
}, Ua = ["aria-label"], Ha = { class: "ijt-reset__label" }, Ka = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = le();
    return (a, d) => {
      var v, e;
      return o(), f("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        "aria-label": (v = C(u).reset) != null ? v : "Reset",
        class: "ijt-reset",
        "aria-haspopup": "true",
        onClick: d[0] || (d[0] = R((...c) => n.onClick && n.onClick(...c), ["prevent"]))
      }, [
        d[1] || (d[1] = t("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-reset__icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          t("path", {
            "fill-rule": "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        t("span", Ha, _((e = C(u).reset) != null ? e : "Reset"), 1)
      ], 8, Ua);
    };
  }
}, Ga = {}, Xa = { class: "ijt-wrapper" }, Qa = { class: "ijt-wrapper__outer" }, Ya = { class: "ijt-wrapper__inner" }, Ja = { class: "ijt-wrapper__container" };
function Za(n, u) {
  return o(), f("div", Xa, [
    t("div", Qa, [
      t("div", Ya, [
        t("div", Ja, [
          z(n.$slots, "default")
        ])
      ])
    ])
  ]);
}
const es = /* @__PURE__ */ ze(Ga, [["render", Za]]), ts = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, ns = ["dusk", "onClick"], ls = { class: "ijt-dropdown__content" }, as = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const u = le(), a = n, d = S(!1), v = S(!1);
    function e() {
      d.value = v.value = !1;
    }
    function c(p) {
      var y, h;
      (y = a.actions.toggleColumns) != null && y.onReorder ? a.actions.toggleColumns.onReorder(p) : (h = a.actions.toggleColumns) != null && h.onChange && a.actions.toggleColumns.onChange(p);
    }
    return (p, y) => (o(), F(be, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: e
    }, {
      button: L(() => [...y[5] || (y[5] = [
        t("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "ijt-button__icon"
        }, [
          t("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: L(() => {
        var h, r, x, k, m;
        return [
          t("div", ts, [
            T(t("div", null, [
              "searchFields" in n.actions && n.actions.searchFields.show ? (o(), f("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: y[0] || (y[0] = (j) => v.value = !0)
              }, [
                y[6] || (y[6] = t("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  t("path", {
                    "fill-rule": "evenodd",
                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                t("span", null, _((h = C(u).add_search_fields) != null ? h : "Add search field"), 1)
              ])) : b("", !0),
              "toggleColumns" in n.actions && n.actions.toggleColumns.show ? (o(), f("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: y[1] || (y[1] = (j) => d.value = !0)
              }, [
                y[7] || (y[7] = t("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  t("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                  t("path", {
                    "fill-rule": "evenodd",
                    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                t("span", null, _((r = C(u).show_hide_columns) != null ? r : "Show / Hide columns"), 1)
              ])) : b("", !0),
              y[9] || (y[9] = t("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in n.actions ? (o(), f("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: y[2] || (y[2] = (...j) => {
                  var $, N;
                  return (($ = n.actions.reset) == null ? void 0 : $.onClick) && ((N = n.actions.reset) == null ? void 0 : N.onClick(...j));
                })
              }, [
                y[8] || (y[8] = t("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  t("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                t("span", null, _((x = C(u).grouped_reset) != null ? x : "Reset"), 1)
              ])) : b("", !0)
            ], 512), [
              [oe, !d.value && !v.value]
            ]),
            T(t("div", null, [
              t("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: y[3] || (y[3] = (j) => v.value = !1)
              }, [
                y[10] || (y[10] = t("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon"
                }, [
                  t("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                t("span", null, _((k = C(u).add_search_fields) != null ? k : "Add search field"), 1)
              ]),
              (o(!0), f(U, null, K(n.actions.searchFields.searchInputs, (j, $) => (o(), f("button", {
                key: $,
                dusk: `add-search-row-${j.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((N) => n.actions.searchFields.onClick(j.key), ["prevent"])
              }, _(j.label), 9, ns))), 128))
            ], 512), [
              [oe, v.value]
            ]),
            T(t("div", null, [
              t("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: y[4] || (y[4] = (j) => d.value = !1)
              }, [
                y[11] || (y[11] = t("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon"
                }, [
                  t("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                t("span", null, _((m = C(u).show_hide_columns) != null ? m : "Show / Hide columns"), 1)
              ]),
              t("div", ls, [
                H(ut, {
                  columns: n.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: c
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [oe, d.value]
            ]),
            T(t("div", null, [
              z(p.$slots, "default")
            ], 512), [
              [oe, !d.value && !v.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 512));
  }
};
function ss(n) {
  const u = S(!1), a = S(null), d = S(0), v = S(0), e = Vt({}), c = () => {
    const M = Pt(n) ? C(n) : n;
    return M ? `${M}-columnWidths` : null;
  }, p = () => {
    const M = c();
    if (!M)
      return;
    const V = localStorage.getItem(M);
    if (V)
      try {
        const O = JSON.parse(V);
        Object.assign(e, O);
      } catch (O) {
        console.warn("Unable to load column widths:", O);
      }
  }, y = () => {
    const M = c();
    !M || localStorage.setItem(M, JSON.stringify(e));
  }, h = (M, V) => {
    M.preventDefault(), M.stopPropagation(), u.value = !0, a.value = V, d.value = M.clientX;
    const O = M.target.closest("th");
    v.value = O.offsetWidth;
    const B = O.closest("table");
    B && B.querySelectorAll("thead th[data-column-key]").forEach((D) => {
      const W = D.getAttribute("data-column-key"), A = D.offsetWidth;
      e[W] || (e[W] = A), D.style.width = `${e[W]}px`;
      const Q = Array.from(D.parentNode.children).indexOf(D);
      B.querySelectorAll("tbody tr").forEach((ae) => {
        const se = ae.children[Q];
        se && (se.style.width = `${e[W]}px`);
      });
    }), document.addEventListener("mousemove", r), document.addEventListener("mouseup", x), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, r = (M) => {
    if (!u.value || !a.value)
      return;
    const V = M.clientX - d.value, O = Math.max(50, v.value + V);
    e[a.value] = O;
    const B = document.querySelector(`th[data-column-key="${a.value}"]`);
    if (B) {
      B.style.width = `${O}px`;
      const G = B.closest("table");
      if (G) {
        const D = Array.from(B.parentNode.children).indexOf(B);
        G.querySelectorAll("tbody tr").forEach((A) => {
          const Q = A.children[D];
          Q && (Q.style.width = `${O}px`);
        });
      }
    }
  }, x = () => {
    u.value && (u.value = !1, a.value = null, y(), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, k = (M) => e[M] || "auto", m = (M, V) => {
    e[M] = V, y();
  }, j = (M) => {
    if (!M)
      return;
    M.querySelectorAll("thead th[data-column-key]").forEach((O) => {
      const B = O.getAttribute("data-column-key");
      if (!e[B]) {
        const W = O.offsetWidth;
        e[B] = Math.max(W, 100);
      }
      O.style.width = `${e[B]}px`;
      const G = Array.from(O.parentNode.children).indexOf(O);
      M.querySelectorAll("tbody tr").forEach((W) => {
        const A = W.children[G];
        A && (A.style.width = `${e[B]}px`);
      });
    });
  }, $ = () => {
    Object.keys(e).forEach((V) => {
      delete e[V];
    });
    const M = c();
    M && localStorage.removeItem(M);
  }, N = () => {
    u.value && (document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return ee(() => {
    p();
  }), _e(() => {
    N();
  }), {
    isResizing: u,
    resizingColumn: a,
    columnWidths: e,
    startResize: h,
    getColumnWidth: k,
    setColumnWidth: m,
    resetColumnWidths: $,
    loadColumnWidths: p,
    saveColumnWidths: y,
    initializeColumnWidths: j
  };
}
const os = ["dusk"], rs = { class: "ijt-toolbar" }, is = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, us = { class: "ijt-toolbar__actions" }, cs = { key: 0 }, ds = {
  key: 4,
  class: "ijt-toolbar__mobile-sort"
}, vs = ["id", "value", "aria-label", "title"], hs = { value: "" }, fs = ["value"], ms = ["value"], ps = ["href"], gs = { class: "ijt-table-container" }, _s = { class: "ijt-table__thead" }, bs = { class: "ijt-table__tr" }, ys = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, ks = ["for"], ws = ["id", "aria-label"], xs = { class: "ijt-table__tbody" }, js = ["data-column-label"], Cs = { class: "ijt-sr-only" }, $s = { class: "ijt-table__td-content" }, Ss = ["for"], Ms = ["id", "onUpdate:modelValue", "aria-label"], qs = ["onClick", "data-column-key", "data-column-label", "data-column-hidden"], Is = { class: "ijt-table__td-label" }, Ns = { class: "ijt-table__td-content" }, zs = { class: "ijt-footer" }, Fs = {
  key: 0,
  class: "ijt-footer__selection-info"
}, Vs = {
  key: 1,
  class: "ijt-loading"
}, Ps = {
  __name: "Table",
  props: {
    inertia: {
      type: Object,
      default: () => ({}),
      required: !1
    },
    name: {
      type: String,
      default: "default",
      required: !1
    },
    striped: {
      type: Boolean,
      default: !1,
      required: !1
    },
    preventOverlappingRequests: {
      type: Boolean,
      default: !0,
      required: !1
    },
    inputDebounceMs: {
      type: Number,
      default: 350,
      required: !1
    },
    hasCheckboxes: {
      type: Boolean,
      default: !1,
      required: !1
    },
    preserveScroll: {
      type: [Boolean, String],
      default: !1,
      required: !1
    },
    resource: {
      type: Object,
      default: () => ({}),
      required: !1
    },
    meta: {
      type: Object,
      default: () => ({}),
      required: !1
    },
    data: {
      type: Object,
      default: () => ({}),
      required: !1
    },
    withGroupedMenu: {
      type: Boolean,
      default: !1,
      required: !1
    },
    withInfiniteScrolling: {
      type: Boolean,
      default: !1,
      required: !1
    },
    resizeableColumns: {
      type: Boolean,
      default: !0,
      required: !1
    },
    hideSearchInputsAboveTable: {
      type: Boolean,
      default: !1,
      required: !1
    },
    showExportButton: {
      type: Boolean,
      default: !1,
      required: !1
    },
    rowClass: {
      type: Function,
      default: null,
      required: !1
    },
    paginationClickCallback: {
      type: Function,
      default: null,
      required: !1
    },
    localStorageName: {
      type: String,
      default: null,
      required: !1
    }
  },
  emits: ["rowClicked", "selectionChanged"],
  setup(n, { emit: u }) {
    var Xe, Qe;
    const a = le(), d = Bt(), v = u, e = n, c = q(() => e.localStorageName ? e.localStorageName : e.name && e.name !== "default" ? `table-${e.name}` : null);
    Et();
    const p = e.resizeableColumns ? ss(c) : null;
    Lt("columnResize", p);
    const y = S(!1), h = q(() => et().props.queryBuilderProps ? { ...et().props.queryBuilderProps[e.name] } : {}), r = S(h.value), x = q(() => {
      const l = r.value.columns;
      return [
        ...l.filter((s) => !Me(s)),
        ...l.filter((s) => Me(s))
      ];
    }), k = q(() => x.value.filter((l) => !l.hidden)), m = q(() => k.value.filter((l) => l.sortable && !N(l))), j = q(() => k.value.some((l) => l.key === "actions")), $ = q(() => k.value.some((l) => qe(l.key)));
    function N(l) {
      const s = String(l.body_class || "").split(/\s+/);
      return s.includes("hidden") || s.includes("ijt-hidden");
    }
    const M = q(() => {
      const l = r.value.sort;
      return l && l !== h.value.defaultSort ? l : "";
    }), V = q(() => Boolean(e.withInfiniteScrolling || h.value.infiniteScrolling));
    function O() {
      var l, s, i, w, g, I, E, J, ie, he;
      return (he = (ie = (I = (i = (l = re.value) == null ? void 0 : l.next_page_url) != null ? i : (s = e.resource) == null ? void 0 : s.next_page_url) != null ? I : (g = (w = e.resource) == null ? void 0 : w.links) == null ? void 0 : g.next) != null ? ie : (J = (E = e.resource) == null ? void 0 : E.meta) == null ? void 0 : J.next_page_url) != null ? he : null;
    }
    const B = S([]), G = S(null), D = S(null), W = S(!1);
    let A;
    const Q = q(() => h.value.pageName), Y = S([]), ae = S(null), se = S(!1), ct = q(() => h.value.hasToggleableColumns || h.value.hasFilters || h.value.hasSearchInputs ? !1 : !h.value.globalSearch), fe = q(() => V.value ? B.value : Object.keys(e.resource).length === 0 ? e.data : "data" in e.resource ? e.resource.data : e.resource), re = q(() => Object.keys(e.resource).length === 0 ? e.meta : "links" in e.resource && "meta" in e.resource && Object.keys(e.resource.links).length === 4 && "next" in e.resource.links && "prev" in e.resource.links ? {
      ...e.resource.meta,
      next_page_url: e.resource.links.next,
      prev_page_url: e.resource.links.prev
    } : "meta" in e.resource ? e.resource.meta : e.resource), Ve = q(() => fe.value.length > 0 ? !0 : re.value.total > 0), Pe = S({
      reset: {
        onClick: ke
      },
      toggleColumns: {
        show: h.value.hasToggleableColumns,
        columns: h.value.columns,
        onChange: xe
      },
      searchFields: {
        show: h.value.hasSearchInputs && !e.hideSearchInputsAboveTable,
        searchInputs: h.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: h.value.hasSearchInputsWithoutValue,
        onClick: ye
      }
    });
    function dt(l) {
      Y.value = Y.value.filter((s) => s != l), de(l, null);
    }
    function ye(l) {
      Y.value.push(l);
    }
    const Be = q(() => {
      if (Y.value.length > 0)
        return !0;
      const l = Ie.parse(location.search.substring(1));
      if (l[Q.value] > 1)
        return !0;
      const i = e.name === "default" ? "" : e.name + "_";
      let w = !1;
      return te(["filter", "columns", "cursor", "sort"], (g) => {
        const I = l[i + g];
        g === "sort" && I === h.value.defaultSort || I !== void 0 && (w = !0);
      }), w;
    }), vt = (l, s) => {
      let i = [];
      if (e.striped && s % 2 && i.push("ijt-table__tr--striped"), e.rowClass && typeof e.rowClass == "function") {
        const w = e.rowClass(l);
        w && i.push(w);
      }
      return i.join(" ");
    }, Ee = q(() => {
      if (!e.showExportButton)
        return null;
      const l = new URL(window.location.href);
      l.search = "";
      const s = new URLSearchParams();
      if (h.value.page && h.value.page > 1 && s.set(Q.value, h.value.page), h.value.sort) {
        const g = e.name === "default" ? "sort" : `${e.name}_sort`;
        s.set(g, h.value.sort);
      }
      const i = {};
      if (r.value.filters.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (i[g.key] = g.value);
      }), r.value.searchInputs.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (i[g.key] = g.value);
      }), Object.keys(i).length > 0) {
        const g = e.name === "default" ? "filter" : `${e.name}_filter`;
        Object.keys(i).forEach((I) => {
          const E = i[I];
          Array.isArray(E) ? E.forEach((J, ie) => {
            s.set(`${g}[${I}][${ie}]`, J);
          }) : typeof E == "object" && E !== null ? Object.keys(E).forEach((J) => {
            s.set(`${g}[${I}][${J}]`, E[J]);
          }) : s.set(`${g}[${I}]`, E);
        });
      }
      const w = r.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (w.length !== r.value.columns.length) {
        const g = e.name === "default" ? "columns" : `${e.name}_columns`;
        w.forEach((I) => {
          s.append(`${g}[]`, I);
        });
      }
      if (h.value.perPageOptions && h.value.perPageOptions.length > 0) {
        const g = new URLSearchParams(window.location.search).get("perPage") || h.value.perPageOptions[0];
        g && g !== h.value.perPageOptions[0] && s.set("perPage", g);
      }
      return s.set("do_export", "1"), s.set("table", e.name || "default"), l.search = s.toString(), l.toString();
    });
    function ke() {
      ve.value = "", Y.value = [], te(r.value.filters, (l, s) => {
        r.value.filters[s].value = null;
      }), te(r.value.searchInputs, (l, s) => {
        r.value.searchInputs[s].value = null;
      }), te(r.value.columns, (l, s) => {
        r.value.columns[s].hidden = l.can_be_hidden ? !h.value.defaultVisibleToggleableColumns.includes(l.key) : !1, r.value.columns[s].pinned = !1;
      }), c.value && localStorage.removeItem(`${c.value}-columns`), e.resizeableColumns && p && p.resetColumnWidths(), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const Le = {};
    function de(l, s) {
      clearTimeout(Le[l]), Le[l] = setTimeout(() => {
        Ce.value && e.preventOverlappingRequests && Ce.value.cancel();
        const i = me("searchInputs", l);
        r.value.searchInputs[i].value = s, r.value.cursor = null, r.value.page = 1;
      }, e.inputDebounceMs);
    }
    const ve = S((Qe = (Xe = h.value.globalSearch) == null ? void 0 : Xe.value) != null ? Qe : "");
    X(() => {
      var l;
      return (l = h.value.globalSearch) == null ? void 0 : l.value;
    }, (l) => {
      var i;
      const s = document.activeElement;
      s && ((i = ae.value) == null ? void 0 : i.contains(s)) && ["INPUT", "TEXTAREA"].includes(s.tagName) || (ve.value = l != null ? l : "");
    });
    function Oe(l) {
      ve.value = l, de("global", l);
    }
    function we(l, s) {
      const i = me("filters", l);
      r.value.filters[i].value = s, r.value.cursor = null, r.value.page = 1;
    }
    function Re(l) {
      r.value.cursor = null, r.value.perPage = l, r.value.page = 1;
    }
    function me(l, s) {
      return Jt(r.value[l], (i) => i.key == s);
    }
    function xe(l) {
      r.value.columns = l, r.value.columns.sort((s, i) => s.pinned && !i.pinned ? -1 : !s.pinned && i.pinned ? 1 : 0), ht();
    }
    function ht() {
      if (!c.value)
        return;
      const l = r.value.columns.map((s, i) => ({
        key: s.key,
        hidden: s.hidden,
        pinned: s.pinned || !1,
        order: i
      }));
      localStorage.setItem(`${c.value}-columns`, JSON.stringify(l));
    }
    function ft() {
      let l = {};
      return te(r.value.searchInputs, (s) => {
        s.value !== null && (l[s.key] = s.value);
      }), te(r.value.filters, (s) => {
        let i = s.value;
        i !== null && (s.type === "number_range" && Number(Math.max(...s.value)) === Number(s.max) && Number(Math.min(...s.value)) === Number(s.min) && (i = null), l[s.key] = i);
      }), l;
    }
    function mt() {
      const l = r.value.columns;
      let s = Yt(l, (w) => !w.hidden), i = en(s, (w) => w.key).sort();
      return Zt(i, h.value.defaultVisibleToggleableColumns) ? {} : i;
    }
    function pt() {
      const l = ft(), s = mt(), i = {};
      Object.keys(l).length > 0 && (i.filter = l), Object.keys(s).length > 0 && (i.columns = s);
      const w = r.value.cursor, g = r.value.page, I = r.value.sort, E = r.value.perPage;
      return w && (i.cursor = w), g > 1 && (i.page = g), E > 1 && (i.perPage = E), I && (i.sort = I), i;
    }
    function Te(l) {
      if (!l)
        return null;
      if (e.paginationClickCallback && typeof e.paginationClickCallback == "function") {
        e.paginationClickCallback(l);
        return;
      }
      Ae(l);
    }
    function gt() {
      const l = Ie.parse(location.search.substring(1)), s = e.name === "default" ? "" : e.name + "_";
      te(["filter", "columns", "cursor", "sort"], (w) => {
        delete l[s + w];
      }), delete l[Q.value], te(pt(), (w, g) => {
        g === "page" ? l[Q.value] = w : g === "perPage" ? l.perPage = w : l[s + g] = w;
      });
      let i = Ie.stringify(l, {
        filter(w, g) {
          return typeof g == "object" && g !== null ? tn(g) : g;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!i || i === Q.value + "=1") && (i = ""), i;
    }
    const je = S(!1), Ce = S(null);
    function Ae(l) {
      !l || nn.get(
        l,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: e.preserveScroll !== !1,
          onBefore() {
            je.value = !0;
          },
          onCancelToken(s) {
            Ce.value = s;
          },
          onFinish() {
            je.value = !1;
          },
          onSuccess() {
            if (e.preserveScroll === "table-top") {
              const i = ae.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: i });
            }
          }
        }
      );
    }
    function _t(l, s, i) {
      var w;
      e.hasCheckboxes && ((w = l.target) == null ? void 0 : w.parentElement.cellIndex) === 0 || v("rowClicked", l, s, i);
    }
    async function bt() {
      var l, s, i, w, g;
      if (!(W.value || !G.value)) {
        W.value = !0;
        try {
          const I = await fetch(G.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!I.ok)
            throw new Error("Network response was not ok");
          const E = await I.json();
          B.value = [...B.value, ...E.data || []], G.value = (g = (w = (s = E.next_page_url) != null ? s : (l = E.links) == null ? void 0 : l.next) != null ? w : (i = E.meta) == null ? void 0 : i.next_page_url) != null ? g : null;
        } catch (I) {
          console.error("Error loading more data:", I);
        } finally {
          W.value = !1;
        }
      }
    }
    function $e() {
      !V.value || !D.value || (A && (A.disconnect(), A = null), e.resource && e.resource.data && B.value.length === 0 && (B.value = [...e.resource.data], G.value = O()), A = new IntersectionObserver(
        (l) => {
          l.forEach((s) => {
            s.isIntersecting && bt();
          });
        },
        {
          rootMargin: "0px 0px 500px 0px"
        }
      ), A.observe(D.value));
    }
    X(r, () => {
      V.value && (B.value = [], G.value = null), Ae(location.pathname + "?" + gt()), se.value = !1;
    }, { deep: !0 }), X(() => e.resource, () => {
      var l;
      if (!V.value && ((l = e.resource) == null ? void 0 : l.data)) {
        const s = e.resource.data.filter((i) => i.__itSelected);
        v("selectionChanged", s);
      }
    }, { deep: !0 }), X(() => h.value, (l) => {
      var i;
      if (!V.value)
        return;
      const s = ((i = e.resource) == null ? void 0 : i.data) || [];
      if (s.length > 0) {
        B.value = [...s], G.value = O();
        const w = s.filter((g) => g.__itSelected);
        v("selectionChanged", w), setTimeout(() => {
          D.value && $e();
        }, 100);
      }
    }, { deep: !0 });
    const De = () => {
      e.resizeableColumns && p && setTimeout(() => {
        var s;
        const l = (s = ae.value) == null ? void 0 : s.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), V.value && setTimeout(() => {
        D.value && $e();
      }, 100);
    };
    ee(() => {
      document.addEventListener("inertia:success", De), yt(), e.resizeableColumns && p && setTimeout(() => {
        var s;
        const l = (s = ae.value) == null ? void 0 : s.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), V.value && $e();
    });
    function yt() {
      if (!c.value)
        return;
      const l = localStorage.getItem(`${c.value}-columns`);
      if (!!l)
        try {
          const s = JSON.parse(l);
          if (s.length > 0 && "order" in s[0]) {
            const i = new Map(s.map((w) => [w.key, w]));
            r.value.columns.forEach((w, g) => {
              const I = i.get(w.key);
              I && (r.value.columns[g].hidden = I.hidden, r.value.columns[g].pinned = I.pinned || !1);
            }), r.value.columns.sort((w, g) => {
              var he, Ye;
              const I = i.get(w.key), E = i.get(g.key);
              if (w.pinned && !g.pinned)
                return -1;
              if (!w.pinned && g.pinned)
                return 1;
              const J = (he = I == null ? void 0 : I.order) != null ? he : 999, ie = (Ye = E == null ? void 0 : E.order) != null ? Ye : 999;
              return J - ie;
            });
          } else
            s.forEach((i, w) => {
              const g = r.value.columns.findIndex((I) => I.key === i.key);
              g !== -1 && (r.value.columns[g].hidden = i.hidden, r.value.columns[g].pinned = i.pinned || !1);
            });
        } catch (s) {
          console.warn("Error loading column order from localStorage:", s);
        }
    }
    _e(() => {
      document.removeEventListener("inertia:success", De), A && (A.disconnect(), A = null);
    });
    function We(l) {
      r.value.sort == l ? r.value.sort = `-${l}` : r.value.sort = l, r.value.cursor = null, r.value.page = 1;
    }
    function kt(l) {
      r.value.sort = l || null, r.value.cursor = null, r.value.page = 1;
    }
    function wt(l, s) {
      if (d[`cell(${s})`])
        return !1;
      const i = l[s];
      return i == null || typeof i == "string" && i.trim() === "";
    }
    function Se(l) {
      const s = me("columns", l);
      return !r.value.columns[s].hidden;
    }
    function pe(l) {
      const s = me("columns", l), i = Qt(r.value.columns[s]);
      i.onSort = We, i.filters = r.value.filters.filter(
        (g) => g.key === l || g.key.startsWith(l + "_") || g.key.includes(l)
      );
      const w = r.value.searchInputs.filter(
        (g) => g.key === l
      );
      return w.length > 0 ? (i.searchable = !0, i.searchInputs = w) : (i.searchable = !1, i.searchInputs = []), i.onFilterChange = we, i.onSearchChange = de, i;
    }
    function xt() {
      e.resource.data.forEach((l) => {
        l.__itSelected = se.value;
      });
    }
    function jt(l) {
      if (!e.resizeableColumns || !p)
        return "auto";
      const s = p.getColumnWidth(l);
      return s === "auto" ? s : `${s}px`;
    }
    function Ue(l) {
      if (!e.resizeableColumns || !p)
        return "0px";
      let s = 0;
      const i = r.value.columns.filter((w) => !w.hidden);
      e.hasCheckboxes && (s += 60);
      for (const w of i) {
        if (w.key === l)
          break;
        if (w.pinned) {
          const g = p.getColumnWidth(w.key);
          s += g === "auto" ? 150 : g;
        }
      }
      return `${s}px`;
    }
    function He(l) {
      const s = r.value.columns.find((i) => i.key === l);
      return s && s.pinned;
    }
    function Me(l) {
      return Boolean(l && l.sticky_right && !l.pinned);
    }
    function qe(l) {
      return Me(r.value.columns.find((s) => s.key === l));
    }
    function Ct(l) {
      return He(l) ? {
        position: "sticky",
        left: Ue(l),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function $t(l) {
      return He(l) ? {
        position: "sticky",
        left: Ue(l),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const St = q(() => {
      if (!e.resizeableColumns || !p)
        return "100%";
      let l = 0, s = !1;
      return e.hasCheckboxes && (l += 60), h.value.columns.forEach((i) => {
        if (!Se(i.key))
          return;
        const w = p.getColumnWidth(i.key);
        w === "auto" ? s = !0 : l += w;
      }), !s && l > 0 ? `${l}px` : "max(100%, " + (l > 0 ? l + "px" : "800px") + ")";
    }), Ke = q(() => fe.value.filter((l) => l.__itSelected)), Ge = q(() => Ke.value.length), Mt = q(() => Ge.value === 0 ? a.noLineSelected : `${Ge.value} ${a.lineSelected}`);
    function qt() {
      e.resizeableColumns && (y.value = !0);
    }
    function It() {
      e.resizeableColumns && setTimeout(() => {
        y.value = !1;
      }, 100);
    }
    return (l, s) => (o(), F(Ot, null, {
      default: L(() => [
        (o(), f("fieldset", {
          ref_key: "tableFieldset",
          ref: ae,
          key: `table-${n.name}`,
          dusk: `table-${n.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": je.value }])
        }, [
          t("div", rs, [
            h.value.globalSearch ? (o(), f("div", is, [
              z(l.$slots, "tableGlobalSearch", {
                hasGlobalSearch: h.value.globalSearch,
                label: h.value.globalSearch ? h.value.globalSearch.label : null,
                value: ve.value,
                onChange: Oe
              }, () => [
                h.value.globalSearch ? (o(), F(La, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: h.value.globalSearch.label,
                  value: ve.value,
                  "on-change": Oe
                }, null, 8, ["label", "value"])) : b("", !0)
              ], !0)
            ])) : b("", !0),
            t("div", us, [
              t("div", null, [
                z(l.$slots, "tableFilter", {
                  hasFilters: h.value.hasFilters,
                  hasEnabledFilters: h.value.hasEnabledFilters,
                  filters: h.value.filters,
                  onFilterChange: we
                }, () => [
                  h.value.hasFilters ? (o(), F(Pa, {
                    key: 0,
                    "has-enabled-filters": h.value.hasEnabledFilters,
                    filters: h.value.filters,
                    "on-filter-change": we
                  }, null, 8, ["has-enabled-filters", "filters"])) : b("", !0)
                ], !0)
              ]),
              !n.withGroupedMenu && !n.hideSearchInputsAboveTable ? z(l.$slots, "tableAddSearchRow", {
                key: 0,
                hasSearchInputs: h.value.hasSearchInputs,
                hasSearchInputsWithoutValue: h.value.hasSearchInputsWithoutValue,
                searchInputs: h.value.searchInputsWithoutGlobal,
                onAdd: ye
              }, () => [
                h.value.hasSearchInputs ? (o(), F(pa, {
                  key: 0,
                  "search-inputs": h.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": h.value.hasSearchInputsWithoutValue,
                  "on-add": ye
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : b("", !0)
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : z(l.$slots, "tableColumns", {
                key: 1,
                hasColumns: h.value.hasToggleableColumns,
                columns: r.value.columns,
                hasHiddenColumns: h.value.hasHiddenColumns,
                onChange: xe
              }, () => [
                h.value.hasToggleableColumns ? (o(), F(Ca, {
                  key: 0,
                  columns: r.value.columns,
                  "has-hidden-columns": h.value.hasHiddenColumns,
                  "on-change": xe,
                  "table-name": n.name
                }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : b("", !0)
              ], !0),
              n.withGroupedMenu ? z(l.$slots, "groupedAction", {
                key: 2,
                actions: Pe.value
              }, () => [
                H(as, { actions: Pe.value }, {
                  default: L(() => [
                    z(l.$slots, "bulk-actions", {}, void 0, !0)
                  ]),
                  _: 3
                }, 8, ["actions"])
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : z(l.$slots, "tableReset", {
                key: 3,
                canBeReset: Be.value,
                onClick: ke
              }, () => [
                Be.value ? (o(), f("div", cs, [
                  H(Ka, { "on-click": ke })
                ])) : b("", !0)
              ], !0),
              m.value.length ? (o(), f("div", ds, [
                s[4] || (s[4] = t("svg", {
                  class: "ijt-toolbar__mobile-sort-icon",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "1em",
                  height: "1em",
                  viewBox: "0 0 1024 1024",
                  "aria-hidden": "true"
                }, [
                  t("path", {
                    fill: "currentColor",
                    d: "M839.6 433.8L749 150.5a9.24 9.24 0 0 0-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9c0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4c2.4-.8 4.3-2.4 5.5-4.6c1.1-2.2 1.3-4.7.6-7.1M663.3 325.5l32.8-116.9h6.3l32.1 116.9zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 0 0-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 0 0-9.2-9.3M416 702h-76V172c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v530h-76c-6.7 0-10.5 7.8-6.3 13l112 141.9a8 8 0 0 0 12.6 0l112-141.9c4.1-5.2.4-13-6.3-13"
                  })
                ], -1)),
                t("select", {
                  id: `table-${n.name}-mobile-sort`,
                  class: "ijt-toolbar__mobile-sort-select",
                  value: M.value,
                  "aria-label": C(a).sort_by,
                  title: C(a).sort_by,
                  onChange: s[0] || (s[0] = (i) => kt(i.target.value))
                }, [
                  t("option", hs, _(C(a).default_sort), 1),
                  (o(!0), f(U, null, K(m.value, (i) => (o(), f(U, {
                    key: i.key
                  }, [
                    t("option", {
                      value: i.key
                    }, _(i.label) + " (" + _(C(a).ascending) + ")", 9, fs),
                    t("option", {
                      value: `-${i.key}`
                    }, _(i.label) + " (" + _(C(a).descending) + ")", 9, ms)
                  ], 64))), 128))
                ], 40, vs)
              ])) : b("", !0),
              n.showExportButton ? z(l.$slots, "exportButton", {
                key: 5,
                exportUrl: Ee.value,
                translations: C(a)
              }, () => [
                t("a", {
                  href: Ee.value,
                  class: "ijt-export"
                }, [...s[5] || (s[5] = [
                  t("svg", {
                    class: "ijt-export__icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    t("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ], -1)
                ])], 8, ps)
              ], !0) : b("", !0)
            ])
          ]),
          n.hideSearchInputsAboveTable ? b("", !0) : z(l.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: h.value.hasSearchInputsWithValue,
            searchInputs: h.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: Y.value,
            onChange: de
          }, () => [
            h.value.hasSearchInputsWithValue || Y.value.length > 0 ? (o(), F(Wa, {
              key: 0,
              "search-inputs": h.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": Y.value,
              "on-change": de,
              "on-remove": dt
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : b("", !0)
          ], !0),
          z(l.$slots, "tableWrapper", { meta: re.value }, () => [
            H(es, {
              class: P({ "ijt-wrapper--mt": !ct.value })
            }, {
              default: L(() => [
                z(l.$slots, "table", {}, () => [
                  t("div", gs, [
                    t("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": n.resizeableColumns && y.value }]),
                      style: Z([{ "table-layout": "fixed", "min-width": "100%" }, { width: St.value }]),
                      onMouseenter: s[2] || (s[2] = (i) => n.resizeableColumns ? qt : null),
                      onMouseleave: s[3] || (s[3] = (i) => n.resizeableColumns ? It : null)
                    }, [
                      t("thead", _s, [
                        z(l.$slots, "head", {
                          show: Se,
                          sortBy: We,
                          header: pe
                        }, () => [
                          t("tr", bs, [
                            n.hasCheckboxes ? (o(), f("th", ys, [
                              t("label", {
                                for: `table-${n.name}-select-header`,
                                class: "ijt-sr-only"
                              }, _(C(a).select_row), 9, ks),
                              T(t("input", {
                                type: "checkbox",
                                id: `table-${n.name}-select-header`,
                                onChange: xt,
                                "onUpdate:modelValue": s[1] || (s[1] = (i) => se.value = i),
                                class: "ijt-table__checkbox",
                                "aria-label": C(a).select_row
                              }, null, 40, ws), [
                                [Ze, se.value]
                              ])
                            ])) : b("", !0),
                            (o(!0), f(U, null, K(x.value, (i) => (o(), F(Xl, {
                              cell: pe(i.key),
                              class: P({ "ijt-table__th--sticky-right": qe(i.key) }),
                              style: Z($t(i.key))
                            }, {
                              label: L(() => [
                                z(l.$slots, `header(${i.key})`, {
                                  label: pe(i.key).label,
                                  column: pe(i.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "class", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", xs, [
                        z(l.$slots, "body", { show: Se }, () => [
                          (o(!0), f(U, null, K(fe.value, (i, w) => (o(), f("tr", {
                            key: `table-${n.name}-row-${w}`,
                            class: P(["ijt-table__tr", [vt(i, w), {
                              "ijt-table__tr--has-actions": j.value,
                              "ijt-table__tr--has-checkboxes": n.hasCheckboxes,
                              "ijt-table__tr--has-card-controls": j.value || n.hasCheckboxes,
                              "ijt-table__tr--has-sticky-right": $.value
                            }]])
                          }, [
                            n.hasCheckboxes ? (o(), f("td", {
                              key: 0,
                              class: "ijt-table__td ijt-table__td--pinned-checkbox",
                              style: { width: "60px" },
                              "data-column-label": C(a).select_row
                            }, [
                              t("div", Cs, _(C(a).select_row), 1),
                              t("div", $s, [
                                t("label", {
                                  for: `table-${n.name}-select-${w}`,
                                  class: "ijt-sr-only"
                                }, _(C(a).select_row), 9, Ss),
                                T(t("input", {
                                  type: "checkbox",
                                  id: `table-${n.name}-select-${w}`,
                                  class: "ijt-table__checkbox",
                                  "onUpdate:modelValue": (g) => i.__itSelected = g,
                                  "aria-label": C(a).select_row
                                }, null, 8, Ms), [
                                  [Ze, i.__itSelected]
                                ])
                              ])
                            ], 8, js)) : b("", !0),
                            (o(!0), f(U, null, K(k.value, (g) => (o(), f("td", {
                              key: `table-${n.name}-row-${w}-column-${g.key}`,
                              onClick: (I) => _t(I, i, g.key),
                              class: P(["ijt-table__td", [g.body_class, {
                                "ijt-table__td--empty": wt(i, g.key),
                                "ijt-table__td--sticky-right": qe(g.key)
                              }]]),
                              "data-column-key": g.key,
                              "data-column-label": g.label || g.key,
                              "data-column-hidden": g.hidden ? "true" : "false",
                              style: Z({
                                width: jt(g.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...Ct(g.key)
                              })
                            }, [
                              t("div", Is, _(g.label || g.key), 1),
                              t("div", Ns, [
                                z(l.$slots, `cell(${g.key})`, { item: i }, () => [
                                  ne(_(i[g.key]), 1)
                                ], !0)
                              ])
                            ], 14, qs))), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                V.value ? b("", !0) : z(l.$slots, "pagination", {
                  key: 0,
                  onClick: Te,
                  hasData: Ve.value,
                  meta: re.value,
                  perPageOptions: h.value.perPageOptions,
                  onPerPageChange: Re,
                  showExportButton: n.showExportButton
                }, () => [
                  t("div", zs, [
                    n.hasCheckboxes ? (o(), f("span", Fs, _(Mt.value), 1)) : b("", !0),
                    H(ha, {
                      "on-click": Te,
                      "has-data": Ve.value,
                      meta: re.value,
                      "per-page-options": h.value.perPageOptions,
                      "on-per-page-change": Re,
                      "show-export-button": n.showExportButton
                    }, {
                      exportButton: L((i) => [
                        z(l.$slots, "exportButton", Rt(Tt(i)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                V.value && W.value ? (o(), f("div", Vs, [...s[6] || (s[6] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : b("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          V.value ? (o(), f("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: D,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : b("", !0),
          z(l.$slots, "tableSummary", {
            data: fe.value,
            meta: re.value,
            selectedItems: Ke.value
          }, void 0, !0)
        ], 10, os))
      ]),
      _: 3
    }));
  }
}, no = /* @__PURE__ */ ze(Ps, [["__scopeId", "data-v-901e3c9f"]]);
export {
  be as ButtonWithDropdown,
  Xl as HeaderCell,
  ln as OnClickOutside,
  ha as Pagination,
  no as Table,
  pa as TableAddSearchRow,
  Ca as TableColumns,
  Pa as TableFilter,
  La as TableGlobalSearch,
  Ka as TableReset,
  Wa as TableSearchRows,
  es as TableWrapper,
  le as getTranslations,
  eo as setTranslation,
  to as setTranslations
};
