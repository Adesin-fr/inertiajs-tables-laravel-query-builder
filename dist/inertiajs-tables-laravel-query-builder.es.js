import { ref as S, onMounted as Z, onBeforeUnmount as Qe, openBlock as s, createElementBlock as f, renderSlot as N, watch as G, nextTick as Se, createBlock as F, withCtx as E, createElementVNode as t, normalizeClass as P, withModifiers as R, withDirectives as A, vShow as ae, createStaticVNode as jt, normalizeStyle as J, toDisplayString as _, createCommentVNode as b, createTextVNode as te, computed as I, unref as C, vModelSelect as Ye, vModelText as ie, watchEffect as Ct, onUnmounted as me, Teleport as fe, Fragment as U, renderList as K, createVNode as H, withKeys as He, inject as $t, resolveDynamicComponent as re, reactive as St, isRef as Mt, useSlots as qt, getCurrentInstance as It, provide as zt, Transition as Nt, vModelCheckbox as Ke, normalizeProps as Ft, guardReactiveProps as Vt } from "vue";
import { createPopper as Pt } from "@popperjs/core/lib/popper-lite";
import Bt from "@popperjs/core/lib/modifiers/preventOverflow";
import Lt from "@popperjs/core/lib/modifiers/flip";
import Et from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as Ot } from "@popperjs/core";
import Rt from "lodash-es/uniq";
import Tt from "vuedraggable";
import At from "lodash-es/find";
import $e from "qs";
import Dt from "lodash-es/clone";
import Wt from "lodash-es/filter";
import Ut from "lodash-es/findKey";
import ee from "lodash-es/forEach";
import Ht from "lodash-es/isEqual";
import Kt from "lodash-es/map";
import Gt from "lodash-es/pickBy";
import { usePage as Ge, router as Xt } from "@inertiajs/vue3";
const Qt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const i = n, a = S(null), d = S(null);
    return Z(() => {
      a.value = (v) => {
        v.target === d.value || d.value.contains(v.target) || i.do();
      }, document.addEventListener("click", a.value), document.addEventListener("touchstart", a.value);
    }), Qe(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (v, e) => (s(), f("div", {
      ref_key: "root",
      ref: d
    }, [
      N(v.$slots, "default")
    ], 512));
  }
}, Yt = { class: "ijt-dropdown" }, Jt = ["dusk", "disabled"], pe = {
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
  setup(n, { expose: i, emit: a }) {
    const d = a, v = n, e = S(!1), c = S(null), p = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: w }) {
        const m = w.elements.popper;
        if (!m)
          return;
        const j = 12, $ = m.getBoundingClientRect(), q = w.placement || "bottom";
        let M;
        q.startsWith("top") ? M = $.bottom - j : M = window.innerHeight - $.top - j;
        const B = Math.max(M, 160);
        m.style.maxHeight = `${B}px`, m.style.overflowY = "auto", m.style.overscrollBehavior = "contain", m.style.webkitOverflowScrolling = "touch";
      }
    };
    function y() {
      e.value = !e.value;
    }
    function h() {
      e.value = !1;
    }
    G(e, () => {
      e.value && c.value && Se(() => c.value.update()), e.value || d("closed"), e.value && d("opened");
    });
    const r = S(null), x = S(null);
    return Z(() => {
      c.value = Pt(r.value, x.value, {
        placement: v.placement,
        modifiers: [Et, Lt, Bt, p]
      });
    }), Qe(() => {
      c.value && (c.value.destroy(), c.value = null);
    }), i({ hide: h }), (w, m) => (s(), F(Qt, { do: h }, {
      default: E(() => [
        t("div", Yt, [
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
            N(w.$slots, "button")
          ], 10, Jt),
          A(t("div", {
            ref_key: "tooltip",
            ref: x,
            class: "ijt-dropdown__panel"
          }, [
            N(w.$slots, "default")
          ], 512), [
            [ae, e.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, Zt = {
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
    const i = n, a = (d) => {
      i.onResize(d, i.columnKey);
    };
    return (d, v) => (s(), f("div", {
      class: P(["ijt-resize-handle", {
        "ijt-resize-handle--active": n.isActive,
        "ijt-resize-handle--visible": n.isActive
      }]),
      onMousedown: a
    }, [...v[0] || (v[0] = [
      jt('<div class="ijt-resize-handle__separator"></div><div class="ijt-resize-handle__grip"><div class="ijt-resize-handle__grip-dots"><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div></div></div>', 2)
    ])], 34));
  }
}, en = { class: "ijt-toggle-filter" }, tn = { class: "ijt-toggle-filter__switch" }, nn = ["checked"], Je = {
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
    return (i, a) => (s(), f("div", en, [
      t("label", tn, [
        t("input", {
          type: "checkbox",
          checked: n.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (d) => n.onFilterChange(n.filter.key, d.target.checked ? "1" : "0"))
        }, null, 40, nn),
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
const Me = (n, i) => {
  const a = n.__vccOpts || n;
  for (const [d, v] of i)
    a[d] = v;
  return a;
}, ln = {
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
      let n = this.$refs.popover_min.getClientRects()[0], i = this.$refs.popover_max.getClientRects()[0];
      n && i && (this.hasOverlap = n.right > i.left);
    },
    handleMouseDown(n, i) {
      this.moveMin = i, this.moveMax = !i, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(n) {
      let d = (n.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), v = Number(Math.round(d / this.step) * this.step).toFixed(2);
      v >= this.min && v <= this.max && (this.moveMin && v !== this.currentMinValue && v <= this.currentMaxValue && (this.internalValue = [v, this.currentMaxValue]), this.moveMax && v !== this.currentMaxValue && v >= this.currentMinValue && (this.internalValue = [this.currentMinValue, v])), this.detectIfOverlap();
    },
    handleMouseUp(n) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    }
  }
}, an = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, sn = { class: "ijt-range-filter__container" }, on = { class: "ijt-range-filter__track" }, rn = { style: { "z-index": "40" } }, un = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, cn = { key: 0 }, dn = { key: 1 }, vn = { style: { "z-index": "40" } }, hn = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, fn = { key: 0 }, mn = { key: 1 }, pn = { draggable: "true" }, gn = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, _n = { key: 0 }, bn = { key: 1 }, yn = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, kn = { key: 0 }, wn = { key: 1 };
function xn(n, i, a, d, v, e) {
  var c, p, y, h;
  return s(), f("div", an, [
    t("div", sn, [
      t("div", on, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: J(`width: ${e.rangeWidth}% !important; left: ${e.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: J(`left: ${e.currentMinValueInPercent}%;`),
          onMousedown: i[0] || (i[0] = (r) => e.handleMouseDown(r, !0))
        }, [
          t("div", rn, [
            t("div", un, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: J(e.getMarginTop(v.hasOverlap && e.displayFirstDown))
              }, [
                a.prefix ? (s(), f("span", cn, _(a.prefix), 1)) : b("", !0),
                te(" " + _((c = e.currentMinValue) != null ? c : 0) + " ", 1),
                a.suffix ? (s(), f("span", dn, _(a.suffix), 1)) : b("", !0)
              ], 4),
              (s(), f("svg", {
                class: P(["ijt-range-filter__popover-arrow", [v.hasOverlap && e.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, [...i[2] || (i[2] = [
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
          style: J(`left: ${e.currentMaxValueInPercent}%;`),
          onMousedown: i[1] || (i[1] = (r) => e.handleMouseDown(r, !1))
        }, [
          t("div", vn, [
            t("div", hn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: J(e.getMarginTop(v.hasOverlap && !e.displayFirstDown))
              }, [
                a.prefix ? (s(), f("span", fn, _(a.prefix), 1)) : b("", !0),
                te(" " + _((p = e.currentMaxValue) != null ? p : 0) + " ", 1),
                a.suffix ? (s(), f("span", mn, _(a.suffix), 1)) : b("", !0)
              ], 4),
              t("div", pn, [
                (s(), f("svg", {
                  class: P(["ijt-range-filter__popover-arrow", [v.hasOverlap && !e.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, [...i[3] || (i[3] = [
                  t("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ])], 2))
              ])
            ], 512)
          ])
        ], 36),
        t("div", gn, [
          a.prefix ? (s(), f("span", _n, _(a.prefix), 1)) : b("", !0),
          te(" " + _((y = a.min) != null ? y : 0) + " ", 1),
          a.suffix ? (s(), f("span", bn, _(a.suffix), 1)) : b("", !0)
        ]),
        t("div", yn, [
          a.prefix ? (s(), f("span", kn, _(a.prefix), 1)) : b("", !0),
          te(" " + _((h = a.max) != null ? h : 0) + " ", 1),
          a.suffix ? (s(), f("span", wn, _(a.suffix), 1)) : b("", !0)
        ])
      ])
    ])
  ], 512);
}
const Ze = /* @__PURE__ */ Me(ln, [["render", xn], ["__scopeId", "data-v-b8d9c6c5"]]), qe = {
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
function ne() {
  return qe.translations;
}
function Ks(n, i) {
  qe.translations[n] = i;
}
function Gs(n) {
  qe.translations = n;
}
const jn = { class: "ijt-number-filter" }, Cn = { class: "ijt-number-filter__label" }, $n = { value: "" }, Sn = { value: "exact" }, Mn = { value: "less_than" }, qn = { value: "greater_than" }, In = { value: "less_than_or_equal" }, zn = { value: "greater_than_or_equal" }, Nn = { value: "between" }, Fn = { key: 0 }, Vn = { key: 0 }, Pn = { class: "ijt-number-filter__label" }, Bn = { class: "ijt-number-filter__input-wrapper" }, Ln = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, En = ["step"], On = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Rn = { key: 1 }, Tn = { style: { "margin-bottom": "0.75rem" } }, An = { class: "ijt-number-filter__label" }, Dn = { class: "ijt-number-filter__input-wrapper" }, Wn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Un = ["step"], Hn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Kn = { class: "ijt-number-filter__label" }, Gn = { class: "ijt-number-filter__input-wrapper" }, Xn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Qn = ["step"], Yn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Jn = {
  key: 1,
  class: "ijt-number-filter__reset"
}, Zn = { class: "ijt-sr-only" }, et = {
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
    const i = n, a = ne(), d = S(""), v = S(""), e = S(""), c = S(""), p = I(() => d.value !== "" && (d.value !== "between" && v.value !== "" && v.value !== null || d.value === "between" && e.value !== "" && e.value !== null && c.value !== "" && c.value !== null));
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
      v.value = "", e.value = "", c.value = "", d.value === "" ? w() : r();
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
      i.onFilterChange(i.filter.key, m);
    }
    function x() {
      d.value = "", v.value = "", e.value = "", c.value = "";
    }
    function w() {
      x(), i.onFilterChange(i.filter.key, null);
    }
    return Z(() => {
      if (i.filter.value) {
        const m = i.filter.value;
        m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "");
      }
    }), G(() => i.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "") : x();
    }, { deep: !0 }), (m, j) => (s(), f("div", jn, [
      t("div", null, [
        t("label", Cn, _(C(a).filter_type), 1),
        A(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", $n, _(C(a).no_filter), 1),
          t("option", Sn, _(C(a).exact_number), 1),
          t("option", Mn, _(C(a).less_than), 1),
          t("option", qn, _(C(a).greater_than), 1),
          t("option", In, _(C(a).less_than_or_equal), 1),
          t("option", zn, _(C(a).greater_than_or_equal), 1),
          t("option", Nn, _(C(a).number_range), 1)
        ], 544), [
          [Ye, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (s(), f("div", Fn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(d.value) ? (s(), f("div", Vn, [
          t("label", Pn, _(y()), 1),
          t("div", Bn, [
            n.filter.prefix ? (s(), f("span", Ln, _(n.filter.prefix), 1)) : b("", !0),
            A(t("input", {
              type: "number",
              "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
              step: n.filter.step || 1,
              class: "ijt-input",
              onInput: r,
              placeholder: "0"
            }, null, 40, En), [
              [
                ie,
                v.value,
                void 0,
                { number: !0 }
              ]
            ]),
            n.filter.suffix ? (s(), f("span", On, _(n.filter.suffix), 1)) : b("", !0)
          ])
        ])) : b("", !0),
        d.value === "between" ? (s(), f("div", Rn, [
          t("div", Tn, [
            t("label", An, _(C(a).start_number), 1),
            t("div", Dn, [
              n.filter.prefix ? (s(), f("span", Wn, _(n.filter.prefix), 1)) : b("", !0),
              A(t("input", {
                type: "number",
                "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Un), [
                [
                  ie,
                  e.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (s(), f("span", Hn, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ]),
          t("div", null, [
            t("label", Kn, _(C(a).end_number), 1),
            t("div", Gn, [
              n.filter.prefix ? (s(), f("span", Xn, _(n.filter.prefix), 1)) : b("", !0),
              A(t("input", {
                type: "number",
                "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Qn), [
                [
                  ie,
                  c.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (s(), f("span", Yn, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (s(), f("div", Jn, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          t("span", Zn, _(C(a).reset_filter), 1),
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
}, el = { class: "ijt-date-filter" }, tl = { class: "ijt-date-filter__label" }, nl = { value: "" }, ll = { value: "exact" }, al = { value: "before" }, sl = { value: "after" }, ol = { value: "between" }, rl = { key: 0 }, il = { key: 0 }, ul = { class: "ijt-date-filter__label" }, cl = { key: 1 }, dl = { style: { "margin-bottom": "0.75rem" } }, vl = { class: "ijt-date-filter__label" }, hl = { class: "ijt-date-filter__label" }, fl = {
  key: 1,
  class: "ijt-date-filter__reset"
}, ml = { class: "ijt-sr-only" }, tt = {
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
    const i = n, a = ne(), d = S(""), v = S(""), e = S(""), c = S(""), p = I(() => d.value !== "" && (d.value !== "between" && v.value || d.value === "between" && e.value && c.value));
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
      v.value = "", e.value = "", c.value = "", d.value === "" ? w() : r();
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
      i.onFilterChange(i.filter.key, m);
    }
    function x() {
      d.value = "", v.value = "", e.value = "", c.value = "";
    }
    function w() {
      x(), i.onFilterChange(i.filter.key, null);
    }
    return Z(() => {
      if (i.filter.value) {
        const m = i.filter.value;
        m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "");
      }
    }), G(() => i.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "") : x();
    }, { deep: !0 }), (m, j) => (s(), f("div", el, [
      t("div", null, [
        t("label", tl, _(C(a).filter_type), 1),
        A(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", nl, _(C(a).no_filter), 1),
          t("option", ll, _(C(a).exact_date), 1),
          t("option", al, _(C(a).before_date), 1),
          t("option", sl, _(C(a).after_date), 1),
          t("option", ol, _(C(a).date_range), 1)
        ], 544), [
          [Ye, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (s(), f("div", rl, [
        ["exact", "before", "after"].includes(d.value) ? (s(), f("div", il, [
          t("label", ul, _(y()), 1),
          A(t("input", {
            type: "date",
            "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
            class: "ijt-input",
            onChange: r
          }, null, 544), [
            [ie, v.value]
          ])
        ])) : b("", !0),
        d.value === "between" ? (s(), f("div", cl, [
          t("div", dl, [
            t("label", vl, _(C(a).start_date), 1),
            A(t("input", {
              type: "date",
              "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ie, e.value]
            ])
          ]),
          t("div", null, [
            t("label", hl, _(C(a).end_date), 1),
            A(t("input", {
              type: "date",
              "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ie, c.value]
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (s(), f("div", fl, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          t("span", ml, _(C(a).reset_filter), 1),
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
function nt(n) {
  let i = S(null), a = S(null);
  return Z(() => {
    Ct((d) => {
      if (!a.value || !i.value)
        return;
      let v = a.value.el || a.value, e = i.value.el || i.value;
      if (!(e instanceof HTMLElement) || !(v instanceof HTMLElement))
        return;
      let { destroy: c } = Ot(e, v, n);
      d(c);
    });
  }), [i, a];
}
const pl = { class: "ijt-filter" }, gl = ["dusk"], _l = { class: "ijt-dropdown__header" }, bl = { class: "ijt-dropdown__content" }, yl = ["name", "value", "onChange"], kl = ["value"], wl = {
  key: 2,
  style: { "min-width": "300px" }
}, xl = {
  key: 3,
  style: { "min-width": "250px" }
}, jl = {
  key: 4,
  style: { "min-width": "300px" }
}, Cl = {
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
    const i = n, a = S(!1), [d, v] = nt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), e = I(() => i.filters.filter((m) => m.key === i.columnKey || m.key.startsWith(i.columnKey + "_") || m.key.includes(i.columnKey))), c = I(() => e.value.some((m) => !h(m)));
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
      i.onFilterChange(m, j);
    }
    function x(m) {
      let j = m.value;
      m.value && (Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) ? j = null : Number(Math.min(...m.value)) === 0 && Number(Math.max(...m.value)) === 0 && (j = ["0", "0"])), i.onFilterChange(m.key, j);
    }
    function w(m) {
      v.value && !v.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${i.columnKey}"]`) && y();
    }
    return Z(() => {
      document.addEventListener("click", w);
    }), me(() => {
      document.removeEventListener("click", w);
    }), (m, j) => (s(), f("div", pl, [
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
      ])], 10, gl),
      (s(), F(fe, { to: "body" }, [
        a.value ? (s(), f("div", {
          key: 0,
          ref_key: "container",
          ref: v,
          class: "ijt-filter__dropdown",
          style: { "z-index": "9999" },
          onClick: j[0] || (j[0] = R(() => {
          }, ["stop"]))
        }, [
          (s(!0), f(U, null, K(e.value, ($) => (s(), f("div", {
            key: $.key
          }, [
            t("h3", _l, _($.label), 1),
            t("div", bl, [
              $.type === "select" ? (s(), f("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: "ijt-select",
                onChange: (q) => r($.key, q.target.value)
              }, [
                (s(!0), f(U, null, K($.options, (q, M) => (s(), f("option", {
                  key: M,
                  value: M
                }, _(q), 9, kl))), 128))
              ], 40, yl)) : b("", !0),
              $.type === "toggle" ? (s(), F(Je, {
                key: 1,
                filter: $,
                "on-filter-change": r
              }, null, 8, ["filter"])) : b("", !0),
              $.type === "number" ? (s(), f("div", wl, [
                H(et, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0),
              $.type === "number_range" ? (s(), f("div", xl, [
                H(Ze, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(q) => $.value = q, (q) => x($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              $.type === "date" ? (s(), f("div", jl, [
                H(tt, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0)
            ])
          ]))), 128))
        ], 512)) : b("", !0)
      ])),
      (s(), F(fe, { to: "body" }, [
        a.value ? (s(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: y
        })) : b("", !0)
      ]))
    ]));
  }
}, $l = { class: "ijt-filter" }, Sl = ["dusk"], Ml = { class: "ijt-column-search__header" }, ql = { class: "ijt-column-search__content" }, Il = ["value", "placeholder"], zl = {
  key: 0,
  class: "ijt-column-search__reset"
}, Nl = { class: "ijt-sr-only" }, Fl = {
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
    const i = n, a = ne(), d = S(!1), v = S(null), [e, c] = nt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = I(() => i.searchInputs.find((q) => q.key === i.columnKey)), y = I(() => p.value && p.value.value || ""), h = S(y.value);
    G(y, (q) => {
      document.activeElement !== v.value && (h.value = q);
    });
    const r = I(() => y.value !== "");
    async function x() {
      p.value && (d.value = !d.value, d.value && (await Se(), v.value && v.value.focus()));
    }
    function w() {
      d.value = !1;
    }
    function m(q) {
      j(q.target.value);
    }
    function j(q) {
      h.value = q, i.onSearchChange(i.columnKey, q);
    }
    function $(q) {
      c.value && !c.value.contains(q.target) && !q.target.closest(`[dusk="column-search-${i.columnKey}"]`) && w();
    }
    return Z(() => {
      document.addEventListener("click", $);
    }), me(() => {
      document.removeEventListener("click", $);
    }), (q, M) => (s(), f("div", $l, [
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
      ])], 10, Sl),
      (s(), F(fe, { to: "body" }, [
        d.value ? (s(), f("div", {
          key: 0,
          ref_key: "container",
          ref: c,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: M[1] || (M[1] = R(() => {
          }, ["stop"]))
        }, [
          t("h3", Ml, _(C(a).search) + " " + _(n.columnLabel), 1),
          t("div", ql, [
            t("input", {
              ref_key: "searchInput",
              ref: v,
              type: "text",
              value: h.value,
              class: "ijt-column-search__input",
              placeholder: `${C(a).search} ${n.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                He(w, ["enter"]),
                He(w, ["escape"])
              ]
            }, null, 40, Il),
            h.value !== "" ? (s(), f("div", zl, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: M[0] || (M[0] = (B) => j(""))
              }, [
                t("span", Nl, _(C(a).reset), 1),
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
      (s(), F(fe, { to: "body" }, [
        d.value ? (s(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: w
        })) : b("", !0)
      ]))
    ]));
  }
}, Vl = ["data-column-key"], Pl = { class: "ijt-table__th-content" }, Bl = { class: "ijt-table__th-label" }, Ll = ["sorted"], El = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Ol = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Rl = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Tl = { class: "ijt-table__th-actions" }, Al = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const i = n, a = $t("columnResize", null), d = I(() => {
      if (!a)
        return "auto";
      const y = a.getColumnWidth(i.cell.key);
      return y === "auto" ? y : `${y}px`;
    }), v = I(() => (a == null ? void 0 : a.isResizing) || !1), e = I(() => (a == null ? void 0 : a.resizingColumn) || null);
    function c() {
      i.cell.sortable && i.cell.onSort(i.cell.key);
    }
    function p(y, h) {
      a && a.startResize(y, h);
    }
    return (y, h) => A((s(), f("th", {
      class: P(["ijt-table__th", n.cell.header_class]),
      style: J({ width: d.value }),
      "data-column-key": n.cell.key
    }, [
      (s(), F(re(n.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: n.cell.sortable ? `sort-${n.cell.key}` : null,
        onClick: R(c, ["prevent"])
      }, {
        default: E(() => [
          t("span", Pl, [
            t("span", Bl, [
              N(y.$slots, "label", {}, () => [
                t("span", null, _(n.cell.label), 1)
              ]),
              N(y.$slots, "sort", {}, () => [
                n.cell.sortable ? (s(), f("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: P(["ijt-sort-icon", {
                    "ijt-sort-icon--active": n.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: n.cell.sorted
                }, [
                  n.cell.sorted ? b("", !0) : (s(), f("path", El)),
                  n.cell.sorted === "asc" ? (s(), f("path", Ol)) : b("", !0),
                  n.cell.sorted === "desc" ? (s(), f("path", Rl)) : b("", !0)
                ], 10, Ll)) : b("", !0)
              ])
            ]),
            t("span", Tl, [
              N(y.$slots, "search", {}, () => [
                n.cell.searchable && n.cell.searchInputs && n.cell.searchInputs.length > 0 ? (s(), F(Fl, {
                  key: 0,
                  "column-key": n.cell.key,
                  "column-label": n.cell.label,
                  "search-inputs": n.cell.searchInputs,
                  "on-search-change": n.cell.onSearchChange,
                  onClick: h[0] || (h[0] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : b("", !0)
              ]),
              N(y.$slots, "filter", {}, () => [
                n.cell.filters && n.cell.filters.length > 0 ? (s(), F(Cl, {
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
      n.cell.resizable !== !1 && C(a) ? (s(), F(Zt, {
        key: 0,
        "column-key": n.cell.key,
        "on-resize": p,
        "is-active": v.value && e.value === n.cell.key
      }, null, 8, ["column-key", "is-active"])) : b("", !0)
    ], 14, Vl)), [
      [ae, !n.cell.hidden]
    ]);
  }
}, Dl = ["dusk", "value"], Wl = ["value"], Xe = {
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
    const i = ne(), a = n, d = I(() => {
      let v = [...a.options];
      return v.push(parseInt(a.value)), Rt(v).sort((e, c) => e - c);
    });
    return (v, e) => (s(), f("select", {
      name: "per_page",
      dusk: n.dusk,
      value: n.value,
      class: "ijt-per-page",
      onChange: e[0] || (e[0] = (c) => n.onChange(c.target.value))
    }, [
      (s(!0), f(U, null, K(d.value, (c) => (s(), f("option", {
        key: c,
        value: c
      }, _(c) + " " + _(C(i).per_page), 9, Wl))), 128))
    ], 40, Dl));
  }
}, Ul = {
  key: 0,
  class: "ijt-pagination"
}, Hl = {
  key: 0,
  class: "ijt-no-results"
}, Kl = { class: "ijt-sm-inline ijt-hidden" }, Gl = { class: "ijt-sm-inline ijt-hidden" }, Xl = {
  key: 2,
  class: "ijt-pagination--full"
}, Ql = { class: "ijt-pagination__left" }, Yl = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, Jl = { class: "ijt-pagination__info-highlight" }, Zl = { class: "ijt-pagination__info-highlight" }, ea = { class: "ijt-pagination__info-highlight" }, ta = { class: "ijt-pagination__right" }, na = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, la = { class: "ijt-sr-only" }, aa = { class: "ijt-pagination__button-text" }, sa = { class: "ijt-sr-only" }, oa = {
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
    const i = ne(), a = n, d = I(() => "links" in e.value ? e.value.links.length > 0 : !1), v = I(() => Object.keys(e.value).length > 0), e = I(() => a.meta), c = I(() => "prev_page_url" in e.value ? e.value.prev_page_url : null), p = I(() => "next_page_url" in e.value ? e.value.next_page_url : null), y = I(() => parseInt(e.value.per_page));
    return (h, r) => v.value ? (s(), f("nav", Ul, [
      !n.hasData || e.value.total < 1 ? (s(), f("p", Hl, _(C(i).no_results_found), 1)) : b("", !0),
      n.hasData ? (s(), f("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": d.value }])
      }, [
        (s(), F(re(c.value ? "a" : "div"), {
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
          default: E(() => [
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
            t("span", Kl, _(C(i).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        H(Xe, {
          dusk: "per-page-mobile",
          value: y.value,
          options: n.perPageOptions,
          "on-change": n.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (s(), F(re(p.value ? "a" : "div"), {
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
          default: E(() => [
            t("span", Gl, _(C(i).next), 1),
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
      n.hasData && d.value ? (s(), f("div", Xl, [
        t("div", Ql, [
          H(Xe, {
            dusk: "per-page-full",
            value: y.value,
            options: n.perPageOptions,
            "on-change": n.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", Yl, [
            t("span", Jl, _(e.value.from), 1),
            te(" " + _(C(i).to) + " ", 1),
            t("span", Zl, _(e.value.to), 1),
            te(" " + _(C(i).of) + " ", 1),
            t("span", ea, _(e.value.total), 1),
            te(" " + _(C(i).results), 1)
          ])
        ]),
        t("div", ta, [
          t("nav", na, [
            (s(), F(re(c.value ? "a" : "div"), {
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
              default: E(() => [
                t("span", la, _(C(i).previous), 1),
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
            (s(!0), f(U, null, K(e.value.links, (x, w) => (s(), f("div", { key: w }, [
              N(h.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (s(), F(re(x.url ? "a" : "div"), {
                  key: 0,
                  href: x.url,
                  dusk: x.url ? `pagination-${x.label}` : null,
                  class: P(["ijt-pagination__button", {
                    "ijt-pagination__button--disabled": !x.url,
                    "ijt-pagination__button--active": x.active
                  }]),
                  onClick: R((m) => n.onClick(x.url), ["prevent"])
                }, {
                  default: E(() => [
                    t("span", aa, _(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : b("", !0)
              ])
            ]))), 128)),
            (s(), F(re(p.value ? "a" : "div"), {
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
              default: E(() => [
                t("span", sa, _(C(i).next), 1),
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
}, ra = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, ia = ["dusk", "onClick"], ua = {
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
    const i = n, a = S(null);
    function d(v) {
      i.onAdd(v), a.value.hide();
    }
    return (v, e) => (s(), F(pe, {
      ref_key: "dropdown",
      ref: a,
      dusk: "add-search-row-dropdown",
      disabled: !n.hasSearchInputsWithoutValue,
      class: "ijt-dropdown--auto-width"
    }, {
      button: E(() => [...e[0] || (e[0] = [
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
      default: E(() => [
        t("div", ra, [
          (s(!0), f(U, null, K(n.searchInputs, (c, p) => (s(), f("button", {
            key: p,
            dusk: `add-search-row-${c.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((y) => d(c.key), ["prevent"])
          }, _(c.label), 9, ia))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, ca = ["data-column-key"], da = { class: "ijt-column-manager__item-left" }, va = ["onClick", "title"], ha = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, fa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, ma = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], lt = {
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
  setup(n, { emit: i }) {
    const a = n, d = i, v = S([...a.columns]), e = S(!1), c = S(!1);
    G(() => a.columns, (r) => {
      !e.value && !c.value && (v.value = [...r]), c.value && setTimeout(() => {
        c.value = !1;
      }, 100);
    }, { deep: !0 });
    function p(r, x) {
      const w = v.value.findIndex((m) => m.key === r);
      w !== -1 && (v.value[w].hidden = !x), d("columns-changed", v.value);
    }
    function y(r, x) {
      const w = v.value.findIndex((m) => m.key === r);
      w !== -1 && (v.value[w].pinned = !x), v.value.sort((m, j) => m.pinned && !j.pinned ? -1 : !m.pinned && j.pinned ? 1 : 0), d("columns-changed", v.value);
    }
    function h() {
      c.value = !0, d("columns-changed", v.value);
    }
    return (r, x) => (s(), F(C(Tt), {
      modelValue: v.value,
      "onUpdate:modelValue": x[0] || (x[0] = (w) => v.value = w),
      "item-key": "key",
      animation: 200,
      handle: ".ijt-column-manager__drag-handle",
      "ghost-class": "ijt-sortable-ghost",
      "chosen-class": "ijt-sortable-chosen",
      onChange: h,
      onStart: x[1] || (x[1] = (w) => e.value = !0),
      onEnd: x[2] || (x[2] = (w) => e.value = !1)
    }, {
      item: E(({ element: w }) => [
        t("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": w.key
        }, [
          t("div", da, [
            x[5] || (x[5] = t("div", { class: "ijt-column-manager__drag-handle" }, [
              t("svg", {
                class: "ijt-column-manager__drag-handle-icon",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                t("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            w.can_be_pinned !== !1 ? (s(), f("button", {
              key: 0,
              type: "button",
              class: P(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": w.pinned }]),
              onClick: R((m) => y(w.key, w.pinned), ["prevent"]),
              title: w.pinned ? "Unpin column" : "Pin column"
            }, [
              w.pinned ? (s(), f("svg", ha, [...x[3] || (x[3] = [
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
              ])])) : (s(), f("svg", fa, [...x[4] || (x[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, va)) : b("", !0),
            t("p", {
              class: P(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": w.hidden,
                "ijt-column-manager__label--pinned": w.pinned
              }])
            }, _(w.label), 3)
          ]),
          w.can_be_hidden && !w.pinned ? (s(), f("button", {
            key: 0,
            type: "button",
            class: P(["ijt-toggle", {
              "ijt-toggle--on": !w.hidden,
              "ijt-toggle--off": w.hidden
            }]),
            "aria-pressed": !w.hidden,
            "aria-labelledby": `toggle-column-${w.key}`,
            "aria-describedby": `toggle-column-${w.key}`,
            dusk: `toggle-column-${w.key}`,
            onClick: R((m) => p(w.key, w.hidden), ["prevent"])
          }, [...x[6] || (x[6] = [
            t("span", { class: "ijt-sr-only" }, "Column status", -1),
            t("span", {
              "aria-hidden": "true",
              class: "ijt-toggle__handle"
            }, null, -1)
          ])], 10, ma)) : b("", !0)
        ], 8, ca)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, pa = {
  key: 0,
  class: "ijt-button__badge"
}, ga = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, _a = {
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
    const i = n, a = S([...i.columns]);
    G(() => i.columns, (e) => {
      a.value = [...e];
    }, { deep: !0, immediate: !0 });
    const d = I(() => a.value.filter((e) => e.hidden).length);
    function v(e) {
      a.value = [...e], i.onChange(e);
    }
    return (e, c) => (s(), F(pe, {
      placement: "bottom-end",
      dusk: "columns-dropdown"
    }, {
      button: E(() => [
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
        n.hasHiddenColumns ? (s(), f("span", pa, "(" + _(d.value) + ")", 1)) : b("", !0)
      ]),
      default: E(() => [
        t("div", ga, [
          H(lt, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: v
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, ba = {
  key: 0,
  class: "ijt-button__badge"
}, ya = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, ka = { class: "ijt-dropdown__header" }, wa = { class: "ijt-dropdown__content" }, xa = ["name", "value", "onChange"], ja = ["value"], Ca = {
  key: 2,
  style: { "min-width": "250px" }
}, $a = {
  key: 3,
  style: { "min-width": "300px" }
}, Sa = {
  key: 4,
  style: { "min-width": "300px" }
}, Ma = {
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
    const i = n, a = I(() => i.filters.filter((e) => !d(e)).length);
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
      e.value && (Number(Math.max(...e.value)) === Number(e.max) && Number(Math.min(...e.value)) === Number(e.min) ? c = null : Number(Math.min(...e.value)) === 0 && Number(Math.max(...e.value)) === 0 && (c = ["0", "0"])), i.onFilterChange(e.key, c);
    }
    return (e, c) => (s(), F(pe, {
      placement: "bottom-end",
      dusk: "filters-dropdown"
    }, {
      button: E(() => [
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
        n.hasEnabledFilters ? (s(), f("span", ba, "(" + _(a.value) + ")", 1)) : b("", !0)
      ]),
      default: E(() => [
        t("div", ya, [
          (s(!0), f(U, null, K(n.filters, (p, y) => (s(), f("div", { key: y }, [
            t("h3", ka, _(p.label), 1),
            t("div", wa, [
              p.type === "select" ? (s(), f("select", {
                key: 0,
                name: p.key,
                value: p.value,
                class: "ijt-select",
                onChange: (h) => n.onFilterChange(p.key, h.target.value)
              }, [
                (s(!0), f(U, null, K(p.options, (h, r) => (s(), f("option", {
                  key: r,
                  value: r
                }, _(h), 9, ja))), 128))
              ], 40, xa)) : b("", !0),
              p.type === "toggle" ? (s(), F(Je, {
                key: 1,
                filter: p,
                "on-filter-change": n.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : b("", !0),
              p.type === "number_range" ? (s(), f("div", Ca, [
                H(Ze, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(h) => p.value = h, (h) => v(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              p.type === "date" ? (s(), f("div", $a, [
                H(tt, {
                  filter: p,
                  "on-filter-change": n.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0),
              p.type === "number" ? (s(), f("div", Sa, [
                H(et, {
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
}, qa = { class: "ijt-global-search" }, Ia = ["placeholder", "value"], za = {
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
    const i = n, a = S(null), d = S((e = i.value) != null ? e : "");
    G(() => i.value, (c) => {
      document.activeElement !== a.value && (d.value = c != null ? c : "");
    });
    function v(c) {
      d.value = c.target.value, i.onChange(d.value);
    }
    return (c, p) => (s(), f("div", qa, [
      t("input", {
        ref_key: "inputEl",
        ref: a,
        class: "ijt-global-search__input",
        placeholder: n.label,
        value: d.value,
        type: "text",
        name: "global",
        onInput: v
      }, null, 40, Ia),
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
}, Na = { class: "ijt-search-row__container" }, Fa = ["for"], Va = ["id", "name", "value", "onInput"], Pa = { class: "ijt-search-row__remove" }, Ba = ["dusk", "onClick"], La = {
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
    const i = { el: S([]) };
    let a = I(() => i.el.value);
    const d = n;
    function v(e) {
      return d.forcedVisibleSearchInputs.includes(e);
    }
    return G(d.forcedVisibleSearchInputs, (e) => {
      const c = e.length > 0 ? e[e.length - 1] : null;
      !c || Se().then(() => {
        const p = At(a.value, (y) => y.name === c);
        p && p.focus();
      });
    }, { immediate: !0 }), (e, c) => (s(!0), f(U, null, K(n.searchInputs, (p, y) => A((s(), f("div", {
      key: y,
      class: "ijt-search-row"
    }, [
      t("div", Na, [
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
        ], 8, Fa),
        (s(), f("input", {
          id: p.key,
          ref_for: !0,
          ref: i.el,
          key: p.key,
          name: p.key,
          value: p.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (h) => n.onChange(p.key, h.target.value)
        }, null, 40, Va)),
        t("div", Pa, [
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
          ])], 8, Ba)
        ])
      ])
    ])), [
      [ae, p.value !== null || v(p.key)]
    ])), 128));
  }
}, Ea = ["aria-label"], Oa = { class: "ijt-reset__label" }, Ra = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const i = ne();
    return (a, d) => {
      var v, e;
      return s(), f("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        "aria-label": (v = C(i).reset) != null ? v : "Reset",
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
        t("span", Oa, _((e = C(i).reset) != null ? e : "Reset"), 1)
      ], 8, Ea);
    };
  }
}, Ta = {}, Aa = { class: "ijt-wrapper" }, Da = { class: "ijt-wrapper__outer" }, Wa = { class: "ijt-wrapper__inner" }, Ua = { class: "ijt-wrapper__container" };
function Ha(n, i) {
  return s(), f("div", Aa, [
    t("div", Da, [
      t("div", Wa, [
        t("div", Ua, [
          N(n.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Ka = /* @__PURE__ */ Me(Ta, [["render", Ha]]), Ga = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, Xa = ["dusk", "onClick"], Qa = { class: "ijt-dropdown__content" }, Ya = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const i = ne(), a = n, d = S(!1), v = S(!1);
    function e() {
      d.value = v.value = !1;
    }
    function c(p) {
      var y, h;
      (y = a.actions.toggleColumns) != null && y.onReorder ? a.actions.toggleColumns.onReorder(p) : (h = a.actions.toggleColumns) != null && h.onChange && a.actions.toggleColumns.onChange(p);
    }
    return (p, y) => (s(), F(pe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: e
    }, {
      button: E(() => [...y[5] || (y[5] = [
        t("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "ijt-button__icon"
        }, [
          t("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: E(() => {
        var h, r, x, w, m;
        return [
          t("div", Ga, [
            A(t("div", null, [
              "searchFields" in n.actions && n.actions.searchFields.show ? (s(), f("button", {
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
                t("span", null, _((h = C(i).add_search_fields) != null ? h : "Add search field"), 1)
              ])) : b("", !0),
              "toggleColumns" in n.actions && n.actions.toggleColumns.show ? (s(), f("button", {
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
                t("span", null, _((r = C(i).show_hide_columns) != null ? r : "Show / Hide columns"), 1)
              ])) : b("", !0),
              y[9] || (y[9] = t("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in n.actions ? (s(), f("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: y[2] || (y[2] = (...j) => {
                  var $, q;
                  return (($ = n.actions.reset) == null ? void 0 : $.onClick) && ((q = n.actions.reset) == null ? void 0 : q.onClick(...j));
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
                t("span", null, _((x = C(i).grouped_reset) != null ? x : "Reset"), 1)
              ])) : b("", !0)
            ], 512), [
              [ae, !d.value && !v.value]
            ]),
            A(t("div", null, [
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
                t("span", null, _((w = C(i).add_search_fields) != null ? w : "Add search field"), 1)
              ]),
              (s(!0), f(U, null, K(n.actions.searchFields.searchInputs, (j, $) => (s(), f("button", {
                key: $,
                dusk: `add-search-row-${j.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((q) => n.actions.searchFields.onClick(j.key), ["prevent"])
              }, _(j.label), 9, Xa))), 128))
            ], 512), [
              [ae, v.value]
            ]),
            A(t("div", null, [
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
                t("span", null, _((m = C(i).show_hide_columns) != null ? m : "Show / Hide columns"), 1)
              ]),
              t("div", Qa, [
                H(lt, {
                  columns: n.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: c
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ae, d.value]
            ]),
            A(t("div", null, [
              N(p.$slots, "default")
            ], 512), [
              [ae, !d.value && !v.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 512));
  }
};
function Ja(n) {
  const i = S(!1), a = S(null), d = S(0), v = S(0), e = St({}), c = () => {
    const M = Mt(n) ? C(n) : n;
    return M ? `${M}-columnWidths` : null;
  }, p = () => {
    const M = c();
    if (!M)
      return;
    const B = localStorage.getItem(M);
    if (B)
      try {
        const V = JSON.parse(B);
        Object.assign(e, V);
      } catch (V) {
        console.warn("Unable to load column widths:", V);
      }
  }, y = () => {
    const M = c();
    !M || localStorage.setItem(M, JSON.stringify(e));
  }, h = (M, B) => {
    M.preventDefault(), M.stopPropagation(), i.value = !0, a.value = B, d.value = M.clientX;
    const V = M.target.closest("th");
    v.value = V.offsetWidth;
    const O = V.closest("table");
    O && O.querySelectorAll("thead th[data-column-key]").forEach((T) => {
      const D = T.getAttribute("data-column-key"), W = T.offsetWidth;
      e[D] || (e[D] = W), T.style.width = `${e[D]}px`;
      const Q = Array.from(T.parentNode.children).indexOf(T);
      O.querySelectorAll("tbody tr").forEach((ge) => {
        const le = ge.children[Q];
        le && (le.style.width = `${e[D]}px`);
      });
    }), document.addEventListener("mousemove", r), document.addEventListener("mouseup", x), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, r = (M) => {
    if (!i.value || !a.value)
      return;
    const B = M.clientX - d.value, V = Math.max(50, v.value + B);
    e[a.value] = V;
    const O = document.querySelector(`th[data-column-key="${a.value}"]`);
    if (O) {
      O.style.width = `${V}px`;
      const X = O.closest("table");
      if (X) {
        const T = Array.from(O.parentNode.children).indexOf(O);
        X.querySelectorAll("tbody tr").forEach((W) => {
          const Q = W.children[T];
          Q && (Q.style.width = `${V}px`);
        });
      }
    }
  }, x = () => {
    i.value && (i.value = !1, a.value = null, y(), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, w = (M) => e[M] || "auto", m = (M, B) => {
    e[M] = B, y();
  }, j = (M) => {
    if (!M)
      return;
    M.querySelectorAll("thead th[data-column-key]").forEach((V) => {
      const O = V.getAttribute("data-column-key");
      if (!e[O]) {
        const D = V.offsetWidth;
        e[O] = Math.max(D, 100);
      }
      V.style.width = `${e[O]}px`;
      const X = Array.from(V.parentNode.children).indexOf(V);
      M.querySelectorAll("tbody tr").forEach((D) => {
        const W = D.children[X];
        W && (W.style.width = `${e[O]}px`);
      });
    });
  }, $ = () => {
    Object.keys(e).forEach((B) => {
      delete e[B];
    });
    const M = c();
    M && localStorage.removeItem(M);
  }, q = () => {
    i.value && (document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Z(() => {
    p();
  }), me(() => {
    q();
  }), {
    isResizing: i,
    resizingColumn: a,
    columnWidths: e,
    startResize: h,
    getColumnWidth: w,
    setColumnWidth: m,
    resetColumnWidths: $,
    loadColumnWidths: p,
    saveColumnWidths: y,
    initializeColumnWidths: j
  };
}
const Za = ["dusk"], es = { class: "ijt-toolbar" }, ts = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, ns = { class: "ijt-toolbar__actions" }, ls = { key: 0 }, as = {
  key: 4,
  class: "ijt-toolbar__mobile-sort"
}, ss = ["id", "value", "aria-label", "title"], os = { value: "" }, rs = ["value"], is = ["value"], us = ["href"], cs = { class: "ijt-table-container" }, ds = { class: "ijt-table__thead" }, vs = { class: "ijt-table__tr" }, hs = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, fs = ["for"], ms = ["id", "aria-label"], ps = { class: "ijt-table__tbody" }, gs = ["data-column-label"], _s = { class: "ijt-sr-only" }, bs = { class: "ijt-table__td-content" }, ys = ["for"], ks = ["id", "onUpdate:modelValue", "aria-label"], ws = ["onClick", "data-column-key", "data-column-label", "data-column-hidden"], xs = { class: "ijt-table__td-label" }, js = { class: "ijt-table__td-content" }, Cs = { class: "ijt-footer" }, $s = {
  key: 0,
  class: "ijt-footer__selection-info"
}, Ss = {
  key: 1,
  class: "ijt-loading"
}, Ms = {
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
  setup(n, { emit: i }) {
    const a = ne(), d = qt(), v = i, e = n, c = I(() => e.localStorageName ? e.localStorageName : e.name && e.name !== "default" ? `table-${e.name}` : null);
    It();
    const p = e.resizeableColumns ? Ja(c) : null;
    zt("columnResize", p);
    const y = S(!1), h = I(() => Ge().props.queryBuilderProps ? { ...Ge().props.queryBuilderProps[e.name] } : {}), r = S(h.value), x = I(() => r.value.columns.filter((l) => !l.hidden)), w = I(() => x.value.filter((l) => l.sortable && !j(l))), m = I(() => x.value.some((l) => l.key === "actions"));
    function j(l) {
      const o = String(l.body_class || "").split(/\s+/);
      return o.includes("hidden") || o.includes("ijt-hidden");
    }
    const $ = I(() => {
      const l = r.value.sort;
      return l && l !== h.value.defaultSort ? l : "";
    }), q = I(() => Boolean(e.withInfiniteScrolling || h.value.infiniteScrolling));
    function M() {
      var l, o, u, k, g, z, L, Y, oe, de;
      return (de = (oe = (z = (u = (l = se.value) == null ? void 0 : l.next_page_url) != null ? u : (o = e.resource) == null ? void 0 : o.next_page_url) != null ? z : (g = (k = e.resource) == null ? void 0 : k.links) == null ? void 0 : g.next) != null ? oe : (Y = (L = e.resource) == null ? void 0 : L.meta) == null ? void 0 : Y.next_page_url) != null ? de : null;
    }
    const B = S([]), V = S(null), O = S(null), X = S(!1);
    let T;
    const D = I(() => h.value.pageName), W = S([]), Q = S(null), ue = S(!1), ge = I(() => h.value.hasToggleableColumns || h.value.hasFilters || h.value.hasSearchInputs ? !1 : !h.value.globalSearch), le = I(() => q.value ? B.value : Object.keys(e.resource).length === 0 ? e.data : "data" in e.resource ? e.resource.data : e.resource), se = I(() => Object.keys(e.resource).length === 0 ? e.meta : "links" in e.resource && "meta" in e.resource && Object.keys(e.resource.links).length === 4 && "next" in e.resource.links && "prev" in e.resource.links ? {
      ...e.resource.meta,
      next_page_url: e.resource.links.next,
      prev_page_url: e.resource.links.prev
    } : "meta" in e.resource ? e.resource.meta : e.resource), Ie = I(() => le.value.length > 0 ? !0 : se.value.total > 0), ze = S({
      reset: {
        onClick: be
      },
      toggleColumns: {
        show: h.value.hasToggleableColumns,
        columns: h.value.columns,
        onChange: ke
      },
      searchFields: {
        show: h.value.hasSearchInputs && !e.hideSearchInputsAboveTable,
        searchInputs: h.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: h.value.hasSearchInputsWithoutValue,
        onClick: _e
      }
    });
    function at(l) {
      W.value = W.value.filter((o) => o != l), ce(l, null);
    }
    function _e(l) {
      W.value.push(l);
    }
    const Ne = I(() => {
      if (W.value.length > 0)
        return !0;
      const l = $e.parse(location.search.substring(1));
      if (l[D.value] > 1)
        return !0;
      const u = e.name === "default" ? "" : e.name + "_";
      let k = !1;
      return ee(["filter", "columns", "cursor", "sort"], (g) => {
        const z = l[u + g];
        g === "sort" && z === h.value.defaultSort || z !== void 0 && (k = !0);
      }), k;
    }), st = (l, o) => {
      let u = [];
      if (e.striped && o % 2 && u.push("ijt-table__tr--striped"), e.rowClass && typeof e.rowClass == "function") {
        const k = e.rowClass(l);
        k && u.push(k);
      }
      return u.join(" ");
    }, Fe = I(() => {
      if (!e.showExportButton)
        return null;
      const l = new URL(window.location.href);
      l.search = "";
      const o = new URLSearchParams();
      if (h.value.page && h.value.page > 1 && o.set(D.value, h.value.page), h.value.sort) {
        const g = e.name === "default" ? "sort" : `${e.name}_sort`;
        o.set(g, h.value.sort);
      }
      const u = {};
      if (r.value.filters.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (u[g.key] = g.value);
      }), r.value.searchInputs.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (u[g.key] = g.value);
      }), Object.keys(u).length > 0) {
        const g = e.name === "default" ? "filter" : `${e.name}_filter`;
        Object.keys(u).forEach((z) => {
          const L = u[z];
          Array.isArray(L) ? L.forEach((Y, oe) => {
            o.set(`${g}[${z}][${oe}]`, Y);
          }) : typeof L == "object" && L !== null ? Object.keys(L).forEach((Y) => {
            o.set(`${g}[${z}][${Y}]`, L[Y]);
          }) : o.set(`${g}[${z}]`, L);
        });
      }
      const k = r.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (k.length !== r.value.columns.length) {
        const g = e.name === "default" ? "columns" : `${e.name}_columns`;
        k.forEach((z) => {
          o.append(`${g}[]`, z);
        });
      }
      if (h.value.perPageOptions && h.value.perPageOptions.length > 0) {
        const g = new URLSearchParams(window.location.search).get("perPage") || h.value.perPageOptions[0];
        g && g !== h.value.perPageOptions[0] && o.set("perPage", g);
      }
      return o.set("do_export", "1"), o.set("table", e.name || "default"), l.search = o.toString(), l.toString();
    });
    function be() {
      W.value = [], ee(r.value.filters, (l, o) => {
        r.value.filters[o].value = null;
      }), ee(r.value.searchInputs, (l, o) => {
        r.value.searchInputs[o].value = null;
      }), ee(r.value.columns, (l, o) => {
        r.value.columns[o].hidden = l.can_be_hidden ? !h.value.defaultVisibleToggleableColumns.includes(l.key) : !1, r.value.columns[o].pinned = !1;
      }), c.value && localStorage.removeItem(`${c.value}-columns`), e.resizeableColumns && p && p.resetColumnWidths(), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const Ve = {};
    function ce(l, o) {
      clearTimeout(Ve[l]), Ve[l] = setTimeout(() => {
        xe.value && e.preventOverlappingRequests && xe.value.cancel();
        const u = ve("searchInputs", l);
        r.value.searchInputs[u].value = o, r.value.cursor = null, r.value.page = 1;
      }, e.inputDebounceMs);
    }
    function Pe(l) {
      ce("global", l);
    }
    function ye(l, o) {
      const u = ve("filters", l);
      r.value.filters[u].value = o, r.value.cursor = null, r.value.page = 1;
    }
    function Be(l) {
      r.value.cursor = null, r.value.perPage = l, r.value.page = 1;
    }
    function ve(l, o) {
      return Ut(r.value[l], (u) => u.key == o);
    }
    function ke(l) {
      r.value.columns = l, r.value.columns.sort((o, u) => o.pinned && !u.pinned ? -1 : !o.pinned && u.pinned ? 1 : 0), ot();
    }
    function ot() {
      if (!c.value)
        return;
      const l = r.value.columns.map((o, u) => ({
        key: o.key,
        hidden: o.hidden,
        pinned: o.pinned || !1,
        order: u
      }));
      localStorage.setItem(`${c.value}-columns`, JSON.stringify(l));
    }
    function rt() {
      let l = {};
      return ee(r.value.searchInputs, (o) => {
        o.value !== null && (l[o.key] = o.value);
      }), ee(r.value.filters, (o) => {
        let u = o.value;
        u !== null && (o.type === "number_range" && Number(Math.max(...o.value)) === Number(o.max) && Number(Math.min(...o.value)) === Number(o.min) && (u = null), l[o.key] = u);
      }), l;
    }
    function it() {
      const l = r.value.columns;
      let o = Wt(l, (k) => !k.hidden), u = Kt(o, (k) => k.key).sort();
      return Ht(u, h.value.defaultVisibleToggleableColumns) ? {} : u;
    }
    function ut() {
      const l = rt(), o = it(), u = {};
      Object.keys(l).length > 0 && (u.filter = l), Object.keys(o).length > 0 && (u.columns = o);
      const k = r.value.cursor, g = r.value.page, z = r.value.sort, L = r.value.perPage;
      return k && (u.cursor = k), g > 1 && (u.page = g), L > 1 && (u.perPage = L), z && (u.sort = z), u;
    }
    function Le(l) {
      if (!l)
        return null;
      if (e.paginationClickCallback && typeof e.paginationClickCallback == "function") {
        e.paginationClickCallback(l);
        return;
      }
      Ee(l);
    }
    function ct() {
      const l = $e.parse(location.search.substring(1)), o = e.name === "default" ? "" : e.name + "_";
      ee(["filter", "columns", "cursor", "sort"], (k) => {
        delete l[o + k];
      }), delete l[D.value], ee(ut(), (k, g) => {
        g === "page" ? l[D.value] = k : g === "perPage" ? l.perPage = k : l[o + g] = k;
      });
      let u = $e.stringify(l, {
        filter(k, g) {
          return typeof g == "object" && g !== null ? Gt(g) : g;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!u || u === D.value + "=1") && (u = ""), u;
    }
    const we = S(!1), xe = S(null);
    function Ee(l) {
      !l || Xt.get(
        l,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: e.preserveScroll !== !1,
          onBefore() {
            we.value = !0;
          },
          onCancelToken(o) {
            xe.value = o;
          },
          onFinish() {
            we.value = !1;
          },
          onSuccess() {
            if (e.preserveScroll === "table-top") {
              const u = Q.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: u });
            }
          }
        }
      );
    }
    function dt(l, o, u) {
      var k;
      e.hasCheckboxes && ((k = l.target) == null ? void 0 : k.parentElement.cellIndex) === 0 || v("rowClicked", l, o, u);
    }
    async function vt() {
      var l, o, u, k, g;
      if (!(X.value || !V.value)) {
        X.value = !0;
        try {
          const z = await fetch(V.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!z.ok)
            throw new Error("Network response was not ok");
          const L = await z.json();
          B.value = [...B.value, ...L.data || []], V.value = (g = (k = (o = L.next_page_url) != null ? o : (l = L.links) == null ? void 0 : l.next) != null ? k : (u = L.meta) == null ? void 0 : u.next_page_url) != null ? g : null;
        } catch (z) {
          console.error("Error loading more data:", z);
        } finally {
          X.value = !1;
        }
      }
    }
    function je() {
      !q.value || !O.value || (T && (T.disconnect(), T = null), e.resource && e.resource.data && B.value.length === 0 && (B.value = [...e.resource.data], V.value = M()), T = new IntersectionObserver(
        (l) => {
          l.forEach((o) => {
            o.isIntersecting && vt();
          });
        },
        {
          rootMargin: "0px 0px 500px 0px"
        }
      ), T.observe(O.value));
    }
    G(r, () => {
      q.value && (B.value = [], V.value = null), Ee(location.pathname + "?" + ct()), ue.value = !1;
    }, { deep: !0 }), G(() => e.resource, () => {
      var l;
      if (!q.value && ((l = e.resource) == null ? void 0 : l.data)) {
        const o = e.resource.data.filter((u) => u.__itSelected);
        v("selectionChanged", o);
      }
    }, { deep: !0 }), G(() => h.value, (l) => {
      var u;
      if (!q.value)
        return;
      const o = ((u = e.resource) == null ? void 0 : u.data) || [];
      if (o.length > 0) {
        B.value = [...o], V.value = M();
        const k = o.filter((g) => g.__itSelected);
        v("selectionChanged", k), setTimeout(() => {
          O.value && je();
        }, 100);
      }
    }, { deep: !0 });
    const Oe = () => {
      e.resizeableColumns && p && setTimeout(() => {
        var o;
        const l = (o = Q.value) == null ? void 0 : o.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), q.value && setTimeout(() => {
        O.value && je();
      }, 100);
    };
    Z(() => {
      document.addEventListener("inertia:success", Oe), ht(), e.resizeableColumns && p && setTimeout(() => {
        var o;
        const l = (o = Q.value) == null ? void 0 : o.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), q.value && je();
    });
    function ht() {
      if (!c.value)
        return;
      const l = localStorage.getItem(`${c.value}-columns`);
      if (!!l)
        try {
          const o = JSON.parse(l);
          if (o.length > 0 && "order" in o[0]) {
            const u = new Map(o.map((k) => [k.key, k]));
            r.value.columns.forEach((k, g) => {
              const z = u.get(k.key);
              z && (r.value.columns[g].hidden = z.hidden, r.value.columns[g].pinned = z.pinned || !1);
            }), r.value.columns.sort((k, g) => {
              var de, Ue;
              const z = u.get(k.key), L = u.get(g.key);
              if (k.pinned && !g.pinned)
                return -1;
              if (!k.pinned && g.pinned)
                return 1;
              const Y = (de = z == null ? void 0 : z.order) != null ? de : 999, oe = (Ue = L == null ? void 0 : L.order) != null ? Ue : 999;
              return Y - oe;
            });
          } else
            o.forEach((u, k) => {
              const g = r.value.columns.findIndex((z) => z.key === u.key);
              g !== -1 && (r.value.columns[g].hidden = u.hidden, r.value.columns[g].pinned = u.pinned || !1);
            });
        } catch (o) {
          console.warn("Error loading column order from localStorage:", o);
        }
    }
    me(() => {
      document.removeEventListener("inertia:success", Oe), T && (T.disconnect(), T = null);
    });
    function Re(l) {
      r.value.sort == l ? r.value.sort = `-${l}` : r.value.sort = l, r.value.cursor = null, r.value.page = 1;
    }
    function ft(l) {
      r.value.sort = l || null, r.value.cursor = null, r.value.page = 1;
    }
    function mt(l, o) {
      if (d[`cell(${o})`])
        return !1;
      const u = l[o];
      return u == null || typeof u == "string" && u.trim() === "";
    }
    function Ce(l) {
      const o = ve("columns", l);
      return !r.value.columns[o].hidden;
    }
    function he(l) {
      const o = ve("columns", l), u = Dt(r.value.columns[o]);
      u.onSort = Re, u.filters = r.value.filters.filter(
        (g) => g.key === l || g.key.startsWith(l + "_") || g.key.includes(l)
      );
      const k = r.value.searchInputs.filter(
        (g) => g.key === l
      );
      return k.length > 0 ? (u.searchable = !0, u.searchInputs = k) : (u.searchable = !1, u.searchInputs = []), u.onFilterChange = ye, u.onSearchChange = ce, u;
    }
    function pt() {
      e.resource.data.forEach((l) => {
        l.__itSelected = ue.value;
      });
    }
    function gt(l) {
      if (!e.resizeableColumns || !p)
        return "auto";
      const o = p.getColumnWidth(l);
      return o === "auto" ? o : `${o}px`;
    }
    function Te(l) {
      if (!e.resizeableColumns || !p)
        return "0px";
      let o = 0;
      const u = r.value.columns.filter((k) => !k.hidden);
      e.hasCheckboxes && (o += 60);
      for (const k of u) {
        if (k.key === l)
          break;
        if (k.pinned) {
          const g = p.getColumnWidth(k.key);
          o += g === "auto" ? 150 : g;
        }
      }
      return `${o}px`;
    }
    function Ae(l) {
      const o = r.value.columns.find((u) => u.key === l);
      return o && o.pinned;
    }
    function _t(l) {
      return Ae(l) ? {
        position: "sticky",
        left: Te(l),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function bt(l) {
      return Ae(l) ? {
        position: "sticky",
        left: Te(l),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const yt = I(() => {
      if (!e.resizeableColumns || !p)
        return "100%";
      let l = 0, o = !1;
      return e.hasCheckboxes && (l += 60), h.value.columns.forEach((u) => {
        if (!Ce(u.key))
          return;
        const k = p.getColumnWidth(u.key);
        k === "auto" ? o = !0 : l += k;
      }), !o && l > 0 ? `${l}px` : "max(100%, " + (l > 0 ? l + "px" : "800px") + ")";
    }), De = I(() => le.value.filter((l) => l.__itSelected)), We = I(() => De.value.length), kt = I(() => We.value === 0 ? a.noLineSelected : `${We.value} ${a.lineSelected}`);
    function wt() {
      e.resizeableColumns && (y.value = !0);
    }
    function xt() {
      e.resizeableColumns && setTimeout(() => {
        y.value = !1;
      }, 100);
    }
    return (l, o) => (s(), F(Nt, null, {
      default: E(() => [
        (s(), f("fieldset", {
          ref_key: "tableFieldset",
          ref: Q,
          key: `table-${n.name}`,
          dusk: `table-${n.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": we.value }])
        }, [
          t("div", es, [
            h.value.globalSearch ? (s(), f("div", ts, [
              N(l.$slots, "tableGlobalSearch", {
                hasGlobalSearch: h.value.globalSearch,
                label: h.value.globalSearch ? h.value.globalSearch.label : null,
                value: h.value.globalSearch ? h.value.globalSearch.value : null,
                onChange: Pe
              }, () => [
                h.value.globalSearch ? (s(), F(za, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: h.value.globalSearch.label,
                  value: h.value.globalSearch.value,
                  "on-change": Pe
                }, null, 8, ["label", "value"])) : b("", !0)
              ], !0)
            ])) : b("", !0),
            t("div", ns, [
              t("div", null, [
                N(l.$slots, "tableFilter", {
                  hasFilters: h.value.hasFilters,
                  hasEnabledFilters: h.value.hasEnabledFilters,
                  filters: h.value.filters,
                  onFilterChange: ye
                }, () => [
                  h.value.hasFilters ? (s(), F(Ma, {
                    key: 0,
                    "has-enabled-filters": h.value.hasEnabledFilters,
                    filters: h.value.filters,
                    "on-filter-change": ye
                  }, null, 8, ["has-enabled-filters", "filters"])) : b("", !0)
                ], !0)
              ]),
              !n.withGroupedMenu && !n.hideSearchInputsAboveTable ? N(l.$slots, "tableAddSearchRow", {
                key: 0,
                hasSearchInputs: h.value.hasSearchInputs,
                hasSearchInputsWithoutValue: h.value.hasSearchInputsWithoutValue,
                searchInputs: h.value.searchInputsWithoutGlobal,
                onAdd: _e
              }, () => [
                h.value.hasSearchInputs ? (s(), F(ua, {
                  key: 0,
                  "search-inputs": h.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": h.value.hasSearchInputsWithoutValue,
                  "on-add": _e
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : b("", !0)
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : N(l.$slots, "tableColumns", {
                key: 1,
                hasColumns: h.value.hasToggleableColumns,
                columns: r.value.columns,
                hasHiddenColumns: h.value.hasHiddenColumns,
                onChange: ke
              }, () => [
                h.value.hasToggleableColumns ? (s(), F(_a, {
                  key: 0,
                  columns: r.value.columns,
                  "has-hidden-columns": h.value.hasHiddenColumns,
                  "on-change": ke,
                  "table-name": n.name
                }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : b("", !0)
              ], !0),
              n.withGroupedMenu ? N(l.$slots, "groupedAction", {
                key: 2,
                actions: ze.value
              }, () => [
                H(Ya, { actions: ze.value }, {
                  default: E(() => [
                    N(l.$slots, "bulk-actions", {}, void 0, !0)
                  ]),
                  _: 3
                }, 8, ["actions"])
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : N(l.$slots, "tableReset", {
                key: 3,
                canBeReset: Ne.value,
                onClick: be
              }, () => [
                Ne.value ? (s(), f("div", ls, [
                  H(Ra, { "on-click": be })
                ])) : b("", !0)
              ], !0),
              w.value.length ? (s(), f("div", as, [
                o[4] || (o[4] = t("svg", {
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
                  value: $.value,
                  "aria-label": C(a).sort_by,
                  title: C(a).sort_by,
                  onChange: o[0] || (o[0] = (u) => ft(u.target.value))
                }, [
                  t("option", os, _(C(a).default_sort), 1),
                  (s(!0), f(U, null, K(w.value, (u) => (s(), f(U, {
                    key: u.key
                  }, [
                    t("option", {
                      value: u.key
                    }, _(u.label) + " (" + _(C(a).ascending) + ")", 9, rs),
                    t("option", {
                      value: `-${u.key}`
                    }, _(u.label) + " (" + _(C(a).descending) + ")", 9, is)
                  ], 64))), 128))
                ], 40, ss)
              ])) : b("", !0),
              n.showExportButton ? N(l.$slots, "exportButton", {
                key: 5,
                exportUrl: Fe.value,
                translations: C(a)
              }, () => [
                t("a", {
                  href: Fe.value,
                  class: "ijt-export"
                }, [...o[5] || (o[5] = [
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
                ])], 8, us)
              ], !0) : b("", !0)
            ])
          ]),
          n.hideSearchInputsAboveTable ? b("", !0) : N(l.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: h.value.hasSearchInputsWithValue,
            searchInputs: h.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: W.value,
            onChange: ce
          }, () => [
            h.value.hasSearchInputsWithValue || W.value.length > 0 ? (s(), F(La, {
              key: 0,
              "search-inputs": h.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": W.value,
              "on-change": ce,
              "on-remove": at
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : b("", !0)
          ], !0),
          N(l.$slots, "tableWrapper", { meta: se.value }, () => [
            H(Ka, {
              class: P({ "ijt-wrapper--mt": !ge.value })
            }, {
              default: E(() => [
                N(l.$slots, "table", {}, () => [
                  t("div", cs, [
                    t("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": n.resizeableColumns && y.value }]),
                      style: J([{ "table-layout": "fixed", "min-width": "100%" }, { width: yt.value }]),
                      onMouseenter: o[2] || (o[2] = (u) => n.resizeableColumns ? wt : null),
                      onMouseleave: o[3] || (o[3] = (u) => n.resizeableColumns ? xt : null)
                    }, [
                      t("thead", ds, [
                        N(l.$slots, "head", {
                          show: Ce,
                          sortBy: Re,
                          header: he
                        }, () => [
                          t("tr", vs, [
                            n.hasCheckboxes ? (s(), f("th", hs, [
                              t("label", {
                                for: `table-${n.name}-select-header`,
                                class: "ijt-sr-only"
                              }, _(C(a).select_row), 9, fs),
                              A(t("input", {
                                type: "checkbox",
                                id: `table-${n.name}-select-header`,
                                onChange: pt,
                                "onUpdate:modelValue": o[1] || (o[1] = (u) => ue.value = u),
                                class: "ijt-table__checkbox",
                                "aria-label": C(a).select_row
                              }, null, 40, ms), [
                                [Ke, ue.value]
                              ])
                            ])) : b("", !0),
                            (s(!0), f(U, null, K(r.value.columns, (u) => (s(), F(Al, {
                              cell: he(u.key),
                              style: J(bt(u.key))
                            }, {
                              label: E(() => [
                                N(l.$slots, `header(${u.key})`, {
                                  label: he(u.key).label,
                                  column: he(u.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", ps, [
                        N(l.$slots, "body", { show: Ce }, () => [
                          (s(!0), f(U, null, K(le.value, (u, k) => (s(), f("tr", {
                            key: `table-${n.name}-row-${k}`,
                            class: P(["ijt-table__tr", [st(u, k), {
                              "ijt-table__tr--has-actions": m.value,
                              "ijt-table__tr--has-checkboxes": n.hasCheckboxes,
                              "ijt-table__tr--has-card-controls": m.value || n.hasCheckboxes
                            }]])
                          }, [
                            n.hasCheckboxes ? (s(), f("td", {
                              key: 0,
                              class: "ijt-table__td ijt-table__td--pinned-checkbox",
                              style: { width: "60px" },
                              "data-column-label": C(a).select_row
                            }, [
                              t("div", _s, _(C(a).select_row), 1),
                              t("div", bs, [
                                t("label", {
                                  for: `table-${n.name}-select-${k}`,
                                  class: "ijt-sr-only"
                                }, _(C(a).select_row), 9, ys),
                                A(t("input", {
                                  type: "checkbox",
                                  id: `table-${n.name}-select-${k}`,
                                  class: "ijt-table__checkbox",
                                  "onUpdate:modelValue": (g) => u.__itSelected = g,
                                  "aria-label": C(a).select_row
                                }, null, 8, ks), [
                                  [Ke, u.__itSelected]
                                ])
                              ])
                            ], 8, gs)) : b("", !0),
                            (s(!0), f(U, null, K(x.value, (g) => (s(), f("td", {
                              key: `table-${n.name}-row-${k}-column-${g.key}`,
                              onClick: (z) => dt(z, u, g.key),
                              class: P(["ijt-table__td", [g.body_class, {
                                "ijt-table__td--empty": mt(u, g.key)
                              }]]),
                              "data-column-key": g.key,
                              "data-column-label": g.label || g.key,
                              "data-column-hidden": g.hidden ? "true" : "false",
                              style: J({
                                width: gt(g.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ..._t(g.key)
                              })
                            }, [
                              t("div", xs, _(g.label || g.key), 1),
                              t("div", js, [
                                N(l.$slots, `cell(${g.key})`, { item: u }, () => [
                                  te(_(u[g.key]), 1)
                                ], !0)
                              ])
                            ], 14, ws))), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                q.value ? b("", !0) : N(l.$slots, "pagination", {
                  key: 0,
                  onClick: Le,
                  hasData: Ie.value,
                  meta: se.value,
                  perPageOptions: h.value.perPageOptions,
                  onPerPageChange: Be,
                  showExportButton: n.showExportButton
                }, () => [
                  t("div", Cs, [
                    n.hasCheckboxes ? (s(), f("span", $s, _(kt.value), 1)) : b("", !0),
                    H(oa, {
                      "on-click": Le,
                      "has-data": Ie.value,
                      meta: se.value,
                      "per-page-options": h.value.perPageOptions,
                      "on-per-page-change": Be,
                      "show-export-button": n.showExportButton
                    }, {
                      exportButton: E((u) => [
                        N(l.$slots, "exportButton", Ft(Vt(u)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                q.value && X.value ? (s(), f("div", Ss, [...o[6] || (o[6] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : b("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          q.value ? (s(), f("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: O,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : b("", !0),
          N(l.$slots, "tableSummary", {
            data: le.value,
            meta: se.value,
            selectedItems: De.value
          }, void 0, !0)
        ], 10, Za))
      ]),
      _: 3
    }));
  }
}, Xs = /* @__PURE__ */ Me(Ms, [["__scopeId", "data-v-ee0bf632"]]);
export {
  pe as ButtonWithDropdown,
  Al as HeaderCell,
  Qt as OnClickOutside,
  oa as Pagination,
  Xs as Table,
  ua as TableAddSearchRow,
  _a as TableColumns,
  Ma as TableFilter,
  za as TableGlobalSearch,
  Ra as TableReset,
  La as TableSearchRows,
  Ka as TableWrapper,
  ne as getTranslations,
  Ks as setTranslation,
  Gs as setTranslations
};
