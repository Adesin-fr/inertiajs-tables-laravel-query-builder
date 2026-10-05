import { ref as S, onMounted as Z, onBeforeUnmount as Qe, openBlock as s, createElementBlock as v, renderSlot as I, watch as J, nextTick as Se, createBlock as F, withCtx as O, createElementVNode as n, normalizeClass as P, withModifiers as R, withDirectives as A, vShow as ae, createStaticVNode as jt, normalizeStyle as Y, toDisplayString as _, createCommentVNode as y, createTextVNode as te, computed as M, unref as j, vModelSelect as Ye, vModelText as ie, watchEffect as Ct, onUnmounted as me, Teleport as fe, Fragment as U, renderList as K, createVNode as H, withKeys as He, inject as $t, resolveDynamicComponent as re, reactive as St, isRef as Mt, useSlots as qt, getCurrentInstance as Nt, provide as zt, Transition as It, vModelCheckbox as Ke, normalizeProps as Ft, guardReactiveProps as Vt } from "vue";
import { createPopper as Pt } from "@popperjs/core/lib/popper-lite";
import Bt from "@popperjs/core/lib/modifiers/preventOverflow";
import Lt from "@popperjs/core/lib/modifiers/flip";
import Ot from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as Et } from "@popperjs/core";
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
  setup(t) {
    const u = t, l = S(null), c = S(null);
    return Z(() => {
      l.value = (d) => {
        d.target === c.value || c.value.contains(d.target) || u.do();
      }, document.addEventListener("click", l.value), document.addEventListener("touchstart", l.value);
    }), Qe(() => {
      document.removeEventListener("click", l.value), document.removeEventListener("touchstart", l.value);
    }), (d, e) => (s(), v("div", {
      ref_key: "root",
      ref: c
    }, [
      I(d.$slots, "default")
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
  setup(t, { expose: u, emit: l }) {
    const c = l, d = t, e = S(!1), h = S(null), p = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: m }) {
        const b = m.elements.popper;
        if (!b)
          return;
        const C = 12, $ = b.getBoundingClientRect(), N = m.placement || "bottom";
        let q;
        N.startsWith("top") ? q = $.bottom - C : q = window.innerHeight - $.top - C;
        const L = Math.max(q, 160);
        b.style.maxHeight = `${L}px`, b.style.overflowY = "auto", b.style.overscrollBehavior = "contain", b.style.webkitOverflowScrolling = "touch";
      }
    };
    function k() {
      e.value = !e.value;
    }
    function f() {
      e.value = !1;
    }
    J(e, () => {
      e.value && h.value && Se(() => h.value.update()), e.value || c("closed"), e.value && c("opened");
    });
    const r = S(null), w = S(null);
    return Z(() => {
      h.value = Pt(r.value, w.value, {
        placement: d.placement,
        modifiers: [Ot, Lt, Bt, p]
      });
    }), Qe(() => {
      h.value && (h.value.destroy(), h.value = null);
    }), u({ hide: f }), (m, b) => (s(), F(Qt, { do: f }, {
      default: O(() => [
        n("div", Yt, [
          n("button", {
            ref_key: "button",
            ref: r,
            type: "button",
            dusk: t.dusk,
            disabled: t.disabled,
            class: P(["ijt-dropdown__trigger", { "ijt-dropdown__trigger--disabled": t.disabled }]),
            "aria-haspopup": "true",
            onClick: R(k, ["prevent"])
          }, [
            I(m.$slots, "button")
          ], 10, Jt),
          A(n("div", {
            ref_key: "tooltip",
            ref: w,
            class: "ijt-dropdown__panel"
          }, [
            I(m.$slots, "default")
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
  setup(t) {
    const u = t, l = (c) => {
      u.onResize(c, u.columnKey);
    };
    return (c, d) => (s(), v("div", {
      class: P(["ijt-resize-handle", {
        "ijt-resize-handle--active": t.isActive,
        "ijt-resize-handle--visible": t.isActive
      }]),
      onMousedown: l
    }, [...d[0] || (d[0] = [
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
  setup(t) {
    return (u, l) => (s(), v("div", en, [
      n("label", tn, [
        n("input", {
          type: "checkbox",
          checked: t.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: l[0] || (l[0] = (c) => t.onFilterChange(t.filter.key, c.target.checked ? "1" : "0"))
        }, null, 40, nn),
        n("div", {
          class: P(["ijt-toggle-filter__track", {
            "ijt-toggle-filter__track--on": t.filter.value === "1" || t.filter.value === 1 || t.filter.value === !0,
            "ijt-toggle-filter__track--off": t.filter.value === "0" || t.filter.value === 0 || t.filter.value === !1,
            "ijt-toggle-filter__track--disabled": t.filter.value === null
          }])
        }, null, 2)
      ]),
      n("button", {
        class: "ijt-toggle-filter__reset",
        onClick: l[1] || (l[1] = R((c) => t.onFilterChange(t.filter.key, null), ["prevent"]))
      }, [...l[2] || (l[2] = [
        n("span", { class: "ijt-sr-only" }, "Remove search", -1),
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-toggle-filter__reset-icon",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          n("path", {
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
const Me = (t, u) => {
  const l = t.__vccOpts || t;
  for (const [c, d] of u)
    l[c] = d;
  return l;
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
          let t = Number(Math.min(...this.internalValue));
          if (Number.isNaN(t))
            throw !0;
          return this.checkedValue(t);
        } else
          throw !0;
      } catch {
        return console.error("Malformed model value. You need to have an array of 2 number"), Number(this.min);
      }
    },
    currentMaxValue() {
      try {
        if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
          let t = Number(Math.max(...this.internalValue));
          if (Number.isNaN(t))
            throw !0;
          return this.checkedValue(t);
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
    getMarginTop(t) {
      let l = 4;
      return t ? `margin-top: ${(l - 4 + 12) * 0.25}rem` : `margin-top: -${((l - 4) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(t) {
      return t < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : t > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : t;
    },
    detectIfOverlap() {
      let t = this.$refs.popover_min.getClientRects()[0], u = this.$refs.popover_max.getClientRects()[0];
      t && u && (this.hasOverlap = t.right > u.left);
    },
    handleMouseDown(t, u) {
      this.moveMin = u, this.moveMax = !u, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(t) {
      let c = (t.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), d = Number(Math.round(c / this.step) * this.step).toFixed(2);
      d >= this.min && d <= this.max && (this.moveMin && d !== this.currentMinValue && d <= this.currentMaxValue && (this.internalValue = [d, this.currentMaxValue]), this.moveMax && d !== this.currentMaxValue && d >= this.currentMinValue && (this.internalValue = [this.currentMinValue, d])), this.detectIfOverlap();
    },
    handleMouseUp(t) {
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
function xn(t, u, l, c, d, e) {
  var h, p, k, f;
  return s(), v("div", an, [
    n("div", sn, [
      n("div", on, [
        n("div", {
          class: "ijt-range-filter__selected",
          style: Y(`width: ${e.rangeWidth}% !important; left: ${e.currentMinValueInPercent}% !important;`)
        }, null, 4),
        n("div", {
          class: "ijt-range-filter__handle",
          style: Y(`left: ${e.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (r) => e.handleMouseDown(r, !0))
        }, [
          n("div", rn, [
            n("div", un, [
              n("div", {
                class: "ijt-range-filter__popover-content",
                style: Y(e.getMarginTop(d.hasOverlap && e.displayFirstDown))
              }, [
                l.prefix ? (s(), v("span", cn, _(l.prefix), 1)) : y("", !0),
                te(" " + _((h = e.currentMinValue) != null ? h : 0) + " ", 1),
                l.suffix ? (s(), v("span", dn, _(l.suffix), 1)) : y("", !0)
              ], 4),
              (s(), v("svg", {
                class: P(["ijt-range-filter__popover-arrow", [d.hasOverlap && e.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, [...u[2] || (u[2] = [
                n("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ])], 2))
            ], 512)
          ])
        ], 36),
        n("div", {
          class: "ijt-range-filter__handle",
          style: Y(`left: ${e.currentMaxValueInPercent}%;`),
          onMousedown: u[1] || (u[1] = (r) => e.handleMouseDown(r, !1))
        }, [
          n("div", vn, [
            n("div", hn, [
              n("div", {
                class: "ijt-range-filter__popover-content",
                style: Y(e.getMarginTop(d.hasOverlap && !e.displayFirstDown))
              }, [
                l.prefix ? (s(), v("span", fn, _(l.prefix), 1)) : y("", !0),
                te(" " + _((p = e.currentMaxValue) != null ? p : 0) + " ", 1),
                l.suffix ? (s(), v("span", mn, _(l.suffix), 1)) : y("", !0)
              ], 4),
              n("div", pn, [
                (s(), v("svg", {
                  class: P(["ijt-range-filter__popover-arrow", [d.hasOverlap && !e.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, [...u[3] || (u[3] = [
                  n("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ])], 2))
              ])
            ], 512)
          ])
        ], 36),
        n("div", gn, [
          l.prefix ? (s(), v("span", _n, _(l.prefix), 1)) : y("", !0),
          te(" " + _((k = l.min) != null ? k : 0) + " ", 1),
          l.suffix ? (s(), v("span", bn, _(l.suffix), 1)) : y("", !0)
        ]),
        n("div", yn, [
          l.prefix ? (s(), v("span", kn, _(l.prefix), 1)) : y("", !0),
          te(" " + _((f = l.max) != null ? f : 0) + " ", 1),
          l.suffix ? (s(), v("span", wn, _(l.suffix), 1)) : y("", !0)
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
function Hs(t, u) {
  qe.translations[t] = u;
}
function Ks(t) {
  qe.translations = t;
}
const jn = { class: "ijt-number-filter" }, Cn = { class: "ijt-number-filter__label" }, $n = { value: "" }, Sn = { value: "exact" }, Mn = { value: "less_than" }, qn = { value: "greater_than" }, Nn = { value: "less_than_or_equal" }, zn = { value: "greater_than_or_equal" }, In = { value: "between" }, Fn = { key: 0 }, Vn = { key: 0 }, Pn = { class: "ijt-number-filter__label" }, Bn = { class: "ijt-number-filter__input-wrapper" }, Ln = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, On = ["step"], En = {
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
  setup(t) {
    const u = t, l = ne(), c = S(""), d = S(""), e = S(""), h = S(""), p = M(() => c.value !== "" && (c.value !== "between" && d.value !== "" && d.value !== null || c.value === "between" && e.value !== "" && e.value !== null && h.value !== "" && h.value !== null));
    function k() {
      switch (c.value) {
        case "exact":
          return l.exact_number;
        case "less_than":
          return l.less_than;
        case "greater_than":
          return l.greater_than;
        case "less_than_or_equal":
          return l.less_than_or_equal;
        case "greater_than_or_equal":
          return l.greater_than_or_equal;
        default:
          return "Number";
      }
    }
    function f() {
      d.value = "", e.value = "", h.value = "", c.value === "" ? w() : r();
    }
    function r() {
      if (c.value === "")
        return;
      let m = null;
      switch (c.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          d.value !== "" && d.value !== null && (m = {
            type: c.value,
            number: d.value
          });
          break;
        case "between":
          e.value !== "" && e.value !== null && h.value !== "" && h.value !== null && (m = {
            type: c.value,
            start_number: e.value,
            end_number: h.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, m);
    }
    function w() {
      c.value = "", d.value = "", e.value = "", h.value = "", u.onFilterChange(u.filter.key, null);
    }
    return Z(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (c.value = m.type, m.type === "between" ? (e.value = m.start_number || "", h.value = m.end_number || "") : d.value = m.number || "");
      }
    }), J(() => u.filter.value, (m) => {
      m ? m.type && (c.value = m.type, m.type === "between" ? (e.value = m.start_number || "", h.value = m.end_number || "") : d.value = m.number || "") : w();
    }, { deep: !0 }), (m, b) => (s(), v("div", jn, [
      n("div", null, [
        n("label", Cn, _(j(l).filter_type), 1),
        A(n("select", {
          "onUpdate:modelValue": b[0] || (b[0] = (C) => c.value = C),
          class: "ijt-select",
          onChange: f
        }, [
          n("option", $n, _(j(l).no_filter), 1),
          n("option", Sn, _(j(l).exact_number), 1),
          n("option", Mn, _(j(l).less_than), 1),
          n("option", qn, _(j(l).greater_than), 1),
          n("option", Nn, _(j(l).less_than_or_equal), 1),
          n("option", zn, _(j(l).greater_than_or_equal), 1),
          n("option", In, _(j(l).number_range), 1)
        ], 544), [
          [Ye, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (s(), v("div", Fn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(c.value) ? (s(), v("div", Vn, [
          n("label", Pn, _(k()), 1),
          n("div", Bn, [
            t.filter.prefix ? (s(), v("span", Ln, _(t.filter.prefix), 1)) : y("", !0),
            A(n("input", {
              type: "number",
              "onUpdate:modelValue": b[1] || (b[1] = (C) => d.value = C),
              step: t.filter.step || 1,
              class: "ijt-input",
              onInput: r,
              placeholder: "0"
            }, null, 40, On), [
              [
                ie,
                d.value,
                void 0,
                { number: !0 }
              ]
            ]),
            t.filter.suffix ? (s(), v("span", En, _(t.filter.suffix), 1)) : y("", !0)
          ])
        ])) : y("", !0),
        c.value === "between" ? (s(), v("div", Rn, [
          n("div", Tn, [
            n("label", An, _(j(l).start_number), 1),
            n("div", Dn, [
              t.filter.prefix ? (s(), v("span", Wn, _(t.filter.prefix), 1)) : y("", !0),
              A(n("input", {
                type: "number",
                "onUpdate:modelValue": b[2] || (b[2] = (C) => e.value = C),
                step: t.filter.step || 1,
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
              t.filter.suffix ? (s(), v("span", Hn, _(t.filter.suffix), 1)) : y("", !0)
            ])
          ]),
          n("div", null, [
            n("label", Kn, _(j(l).end_number), 1),
            n("div", Gn, [
              t.filter.prefix ? (s(), v("span", Xn, _(t.filter.prefix), 1)) : y("", !0),
              A(n("input", {
                type: "number",
                "onUpdate:modelValue": b[3] || (b[3] = (C) => h.value = C),
                step: t.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Qn), [
                [
                  ie,
                  h.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              t.filter.suffix ? (s(), v("span", Yn, _(t.filter.suffix), 1)) : y("", !0)
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      p.value ? (s(), v("div", Jn, [
        n("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          n("span", Zn, _(j(l).reset_filter), 1),
          b[4] || (b[4] = n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "ijt-number-filter__reset-icon",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            n("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ])
      ])) : y("", !0)
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
  setup(t) {
    const u = t, l = ne(), c = S(""), d = S(""), e = S(""), h = S(""), p = M(() => c.value !== "" && (c.value !== "between" && d.value || c.value === "between" && e.value && h.value));
    function k() {
      switch (c.value) {
        case "exact":
          return l.exact_date;
        case "before":
          return l.before_date;
        case "after":
          return l.after_date;
        default:
          return "Date";
      }
    }
    function f() {
      d.value = "", e.value = "", h.value = "", c.value === "" ? w() : r();
    }
    function r() {
      if (c.value === "")
        return;
      let m = null;
      switch (c.value) {
        case "exact":
        case "before":
        case "after":
          d.value && (m = {
            type: c.value,
            date: d.value
          });
          break;
        case "between":
          e.value && h.value && (m = {
            type: c.value,
            start_date: e.value,
            end_date: h.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, m);
    }
    function w() {
      c.value = "", d.value = "", e.value = "", h.value = "", u.onFilterChange(u.filter.key, null);
    }
    return Z(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (c.value = m.type, m.type === "between" ? (e.value = m.start_date || "", h.value = m.end_date || "") : d.value = m.date || "");
      }
    }), J(() => u.filter.value, (m) => {
      m ? m.type && (c.value = m.type, m.type === "between" ? (e.value = m.start_date || "", h.value = m.end_date || "") : d.value = m.date || "") : w();
    }, { deep: !0 }), (m, b) => (s(), v("div", el, [
      n("div", null, [
        n("label", tl, _(j(l).filter_type), 1),
        A(n("select", {
          "onUpdate:modelValue": b[0] || (b[0] = (C) => c.value = C),
          class: "ijt-select",
          onChange: f
        }, [
          n("option", nl, _(j(l).no_filter), 1),
          n("option", ll, _(j(l).exact_date), 1),
          n("option", al, _(j(l).before_date), 1),
          n("option", sl, _(j(l).after_date), 1),
          n("option", ol, _(j(l).date_range), 1)
        ], 544), [
          [Ye, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (s(), v("div", rl, [
        ["exact", "before", "after"].includes(c.value) ? (s(), v("div", il, [
          n("label", ul, _(k()), 1),
          A(n("input", {
            type: "date",
            "onUpdate:modelValue": b[1] || (b[1] = (C) => d.value = C),
            class: "ijt-input",
            onChange: r
          }, null, 544), [
            [ie, d.value]
          ])
        ])) : y("", !0),
        c.value === "between" ? (s(), v("div", cl, [
          n("div", dl, [
            n("label", vl, _(j(l).start_date), 1),
            A(n("input", {
              type: "date",
              "onUpdate:modelValue": b[2] || (b[2] = (C) => e.value = C),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ie, e.value]
            ])
          ]),
          n("div", null, [
            n("label", hl, _(j(l).end_date), 1),
            A(n("input", {
              type: "date",
              "onUpdate:modelValue": b[3] || (b[3] = (C) => h.value = C),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ie, h.value]
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      p.value ? (s(), v("div", fl, [
        n("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          n("span", ml, _(j(l).reset_filter), 1),
          b[4] || (b[4] = n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "ijt-date-filter__reset-icon",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            n("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ])
      ])) : y("", !0)
    ]));
  }
};
function nt(t) {
  let u = S(null), l = S(null);
  return Z(() => {
    Ct((c) => {
      if (!l.value || !u.value)
        return;
      let d = l.value.el || l.value, e = u.value.el || u.value;
      if (!(e instanceof HTMLElement) || !(d instanceof HTMLElement))
        return;
      let { destroy: h } = Et(e, d, t);
      c(h);
    });
  }), [u, l];
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
  setup(t) {
    const u = t, l = S(!1), [c, d] = nt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), e = M(() => u.filters.filter((b) => b.key === u.columnKey || b.key.startsWith(u.columnKey + "_") || b.key.includes(u.columnKey))), h = M(() => e.value.some((b) => !f(b)));
    function p() {
      e.value.length > 0 && (l.value = !l.value);
    }
    function k() {
      l.value = !1;
    }
    function f(b) {
      if (b.value === null)
        return !0;
      switch (b.type) {
        case "number_range":
          return Number(Math.max(...b.value)) === Number(b.max) && Number(Math.min(...b.value)) === Number(b.min);
        case "select":
          return b.value === "";
        case "toggle":
          return !1;
        case "date":
          return !b.value || typeof b.value == "object" && !b.value.type;
        default:
          return !b.value;
      }
    }
    function r(b, C) {
      u.onFilterChange(b, C);
    }
    function w(b) {
      let C = b.value;
      b.value && (Number(Math.max(...b.value)) === Number(b.max) && Number(Math.min(...b.value)) === Number(b.min) ? C = null : Number(Math.min(...b.value)) === 0 && Number(Math.max(...b.value)) === 0 && (C = ["0", "0"])), u.onFilterChange(b.key, C);
    }
    function m(b) {
      d.value && !d.value.contains(b.target) && !b.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && k();
    }
    return Z(() => {
      document.addEventListener("click", m);
    }), me(() => {
      document.removeEventListener("click", m);
    }), (b, C) => (s(), v("div", pl, [
      n("button", {
        ref_key: "trigger",
        ref: c,
        onClick: p,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": h.value }]),
        dusk: `column-filter-${t.columnKey}`
      }, [...C[1] || (C[1] = [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-filter__button-icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, gl),
      (s(), F(fe, { to: "body" }, [
        l.value ? (s(), v("div", {
          key: 0,
          ref_key: "container",
          ref: d,
          class: "ijt-filter__dropdown",
          style: { "z-index": "9999" },
          onClick: C[0] || (C[0] = R(() => {
          }, ["stop"]))
        }, [
          (s(!0), v(U, null, K(e.value, ($) => (s(), v("div", {
            key: $.key
          }, [
            n("h3", _l, _($.label), 1),
            n("div", bl, [
              $.type === "select" ? (s(), v("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: "ijt-select",
                onChange: (N) => r($.key, N.target.value)
              }, [
                (s(!0), v(U, null, K($.options, (N, q) => (s(), v("option", {
                  key: q,
                  value: q
                }, _(N), 9, kl))), 128))
              ], 40, yl)) : y("", !0),
              $.type === "toggle" ? (s(), F(Je, {
                key: 1,
                filter: $,
                "on-filter-change": r
              }, null, 8, ["filter"])) : y("", !0),
              $.type === "number" ? (s(), v("div", wl, [
                H(et, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : y("", !0),
              $.type === "number_range" ? (s(), v("div", xl, [
                H(Ze, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(N) => $.value = N, (N) => w($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              $.type === "date" ? (s(), v("div", jl, [
                H(tt, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : y("", !0)
            ])
          ]))), 128))
        ], 512)) : y("", !0)
      ])),
      (s(), F(fe, { to: "body" }, [
        l.value ? (s(), v("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: k
        })) : y("", !0)
      ]))
    ]));
  }
}, $l = { class: "ijt-filter" }, Sl = ["dusk"], Ml = { class: "ijt-column-search__header" }, ql = { class: "ijt-column-search__content" }, Nl = ["value", "placeholder"], zl = {
  key: 0,
  class: "ijt-column-search__reset"
}, Il = { class: "ijt-sr-only" }, Fl = {
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
  setup(t) {
    const u = t, l = ne(), c = S(!1), d = S(null), [e, h] = nt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = M(() => u.searchInputs.find(($) => $.key === u.columnKey)), k = M(() => p.value && p.value.value || ""), f = M(() => k.value !== "");
    async function r() {
      p.value && (c.value = !c.value, c.value && (await Se(), d.value && d.value.focus()));
    }
    function w() {
      c.value = !1;
    }
    function m($) {
      const N = $.target.value;
      b(N);
    }
    function b($) {
      u.onSearchChange(u.columnKey, $);
    }
    function C($) {
      h.value && !h.value.contains($.target) && !$.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Z(() => {
      document.addEventListener("click", C);
    }), me(() => {
      document.removeEventListener("click", C);
    }), ($, N) => (s(), v("div", $l, [
      n("button", {
        ref_key: "trigger",
        ref: e,
        onClick: r,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": f.value }]),
        dusk: `column-search-${t.columnKey}`
      }, [...N[2] || (N[2] = [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-filter__button-icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, Sl),
      (s(), F(fe, { to: "body" }, [
        c.value ? (s(), v("div", {
          key: 0,
          ref_key: "container",
          ref: h,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: N[1] || (N[1] = R(() => {
          }, ["stop"]))
        }, [
          n("h3", Ml, _(j(l).search) + " " + _(t.columnLabel), 1),
          n("div", ql, [
            n("input", {
              ref_key: "searchInput",
              ref: d,
              type: "text",
              value: k.value,
              class: "ijt-column-search__input",
              placeholder: `${j(l).search} ${t.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                He(w, ["enter"]),
                He(w, ["escape"])
              ]
            }, null, 40, Nl),
            k.value && k.value !== "" ? (s(), v("div", zl, [
              n("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: N[0] || (N[0] = (q) => b(""))
              }, [
                n("span", Il, _(j(l).reset), 1),
                N[3] || (N[3] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-search-row__remove-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  })
                ], -1))
              ])
            ])) : y("", !0)
          ])
        ], 512)) : y("", !0)
      ])),
      (s(), F(fe, { to: "body" }, [
        c.value ? (s(), v("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: w
        })) : y("", !0)
      ]))
    ]));
  }
}, Vl = ["data-column-key"], Pl = { class: "ijt-table__th-content" }, Bl = { class: "ijt-table__th-label" }, Ll = ["sorted"], Ol = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, El = {
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
  setup(t) {
    const u = t, l = $t("columnResize", null), c = M(() => {
      if (!l)
        return "auto";
      const k = l.getColumnWidth(u.cell.key);
      return k === "auto" ? k : `${k}px`;
    }), d = M(() => (l == null ? void 0 : l.isResizing) || !1), e = M(() => (l == null ? void 0 : l.resizingColumn) || null);
    function h() {
      u.cell.sortable && u.cell.onSort(u.cell.key);
    }
    function p(k, f) {
      l && l.startResize(k, f);
    }
    return (k, f) => A((s(), v("th", {
      class: P(["ijt-table__th", t.cell.header_class]),
      style: Y({ width: c.value }),
      "data-column-key": t.cell.key
    }, [
      (s(), F(re(t.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: t.cell.sortable ? `sort-${t.cell.key}` : null,
        onClick: R(h, ["prevent"])
      }, {
        default: O(() => [
          n("span", Pl, [
            n("span", Bl, [
              I(k.$slots, "label", {}, () => [
                n("span", null, _(t.cell.label), 1)
              ]),
              I(k.$slots, "sort", {}, () => [
                t.cell.sortable ? (s(), v("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: P(["ijt-sort-icon", {
                    "ijt-sort-icon--active": t.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: t.cell.sorted
                }, [
                  t.cell.sorted ? y("", !0) : (s(), v("path", Ol)),
                  t.cell.sorted === "asc" ? (s(), v("path", El)) : y("", !0),
                  t.cell.sorted === "desc" ? (s(), v("path", Rl)) : y("", !0)
                ], 10, Ll)) : y("", !0)
              ])
            ]),
            n("span", Tl, [
              I(k.$slots, "search", {}, () => [
                t.cell.searchable && t.cell.searchInputs && t.cell.searchInputs.length > 0 ? (s(), F(Fl, {
                  key: 0,
                  "column-key": t.cell.key,
                  "column-label": t.cell.label,
                  "search-inputs": t.cell.searchInputs,
                  "on-search-change": t.cell.onSearchChange,
                  onClick: f[0] || (f[0] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : y("", !0)
              ]),
              I(k.$slots, "filter", {}, () => [
                t.cell.filters && t.cell.filters.length > 0 ? (s(), F(Cl, {
                  key: 0,
                  "column-key": t.cell.key,
                  filters: t.cell.filters,
                  "on-filter-change": t.cell.onFilterChange,
                  onClick: f[1] || (f[1] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change"])) : y("", !0)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      t.cell.resizable !== !1 && j(l) ? (s(), F(Zt, {
        key: 0,
        "column-key": t.cell.key,
        "on-resize": p,
        "is-active": d.value && e.value === t.cell.key
      }, null, 8, ["column-key", "is-active"])) : y("", !0)
    ], 14, Vl)), [
      [ae, !t.cell.hidden]
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
  setup(t) {
    const u = ne(), l = t, c = M(() => {
      let d = [...l.options];
      return d.push(parseInt(l.value)), Rt(d).sort((e, h) => e - h);
    });
    return (d, e) => (s(), v("select", {
      name: "per_page",
      dusk: t.dusk,
      value: t.value,
      class: "ijt-per-page",
      onChange: e[0] || (e[0] = (h) => t.onChange(h.target.value))
    }, [
      (s(!0), v(U, null, K(c.value, (h) => (s(), v("option", {
        key: h,
        value: h
      }, _(h) + " " + _(j(u).per_page), 9, Wl))), 128))
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
  setup(t) {
    const u = ne(), l = t, c = M(() => "links" in e.value ? e.value.links.length > 0 : !1), d = M(() => Object.keys(e.value).length > 0), e = M(() => l.meta), h = M(() => "prev_page_url" in e.value ? e.value.prev_page_url : null), p = M(() => "next_page_url" in e.value ? e.value.next_page_url : null), k = M(() => parseInt(e.value.per_page));
    return (f, r) => d.value ? (s(), v("nav", Ul, [
      !t.hasData || e.value.total < 1 ? (s(), v("p", Hl, _(j(u).no_results_found), 1)) : y("", !0),
      t.hasData ? (s(), v("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": c.value }])
      }, [
        (s(), F(re(h.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !h.value
            }
          ]),
          href: h.value,
          dusk: h.value ? "pagination-simple-previous" : null,
          onClick: r[0] || (r[0] = R((w) => t.onClick(h.value), ["prevent"]))
        }, {
          default: O(() => [
            r[4] || (r[4] = n("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "ijt-pagination__button-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              n("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M7 16l-4-4m0 0l4-4m-4 4h18"
              })
            ], -1)),
            n("span", Kl, _(j(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        H(Xe, {
          dusk: "per-page-mobile",
          value: k.value,
          options: t.perPageOptions,
          "on-change": t.onPerPageChange
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
          onClick: r[1] || (r[1] = R((w) => t.onClick(p.value), ["prevent"]))
        }, {
          default: O(() => [
            n("span", Gl, _(j(u).next), 1),
            r[5] || (r[5] = n("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "ijt-pagination__button-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              n("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M17 8l4 4m0 0l-4 4m4-4H3"
              })
            ], -1))
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"]))
      ], 2)) : y("", !0),
      t.hasData && c.value ? (s(), v("div", Xl, [
        n("div", Ql, [
          H(Xe, {
            dusk: "per-page-full",
            value: k.value,
            options: t.perPageOptions,
            "on-change": t.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          n("p", Yl, [
            n("span", Jl, _(e.value.from), 1),
            te(" " + _(j(u).to) + " ", 1),
            n("span", Zl, _(e.value.to), 1),
            te(" " + _(j(u).of) + " ", 1),
            n("span", ea, _(e.value.total), 1),
            te(" " + _(j(u).results), 1)
          ])
        ]),
        n("div", ta, [
          n("nav", na, [
            (s(), F(re(h.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--first",
                {
                  "ijt-pagination__button--disabled": !h.value
                }
              ]),
              href: h.value,
              dusk: h.value ? "pagination-previous" : null,
              onClick: r[2] || (r[2] = R((w) => t.onClick(h.value), ["prevent"]))
            }, {
              default: O(() => [
                n("span", la, _(j(u).previous), 1),
                r[6] || (r[6] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-pagination__button-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"])),
            (s(!0), v(U, null, K(e.value.links, (w, m) => (s(), v("div", { key: m }, [
              I(f.$slots, "link", {}, () => [
                !isNaN(w.label) || w.label === "..." ? (s(), F(re(w.url ? "a" : "div"), {
                  key: 0,
                  href: w.url,
                  dusk: w.url ? `pagination-${w.label}` : null,
                  class: P(["ijt-pagination__button", {
                    "ijt-pagination__button--disabled": !w.url,
                    "ijt-pagination__button--active": w.active
                  }]),
                  onClick: R((b) => t.onClick(w.url), ["prevent"])
                }, {
                  default: O(() => [
                    n("span", aa, _(w.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : y("", !0)
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
              onClick: r[3] || (r[3] = R((w) => t.onClick(p.value), ["prevent"]))
            }, {
              default: O(() => [
                n("span", sa, _(j(u).next), 1),
                r[7] || (r[7] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-pagination__button-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", {
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
      ])) : y("", !0)
    ])) : y("", !0);
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
  setup(t) {
    const u = t, l = S(null);
    function c(d) {
      u.onAdd(d), l.value.hide();
    }
    return (d, e) => (s(), F(pe, {
      ref_key: "dropdown",
      ref: l,
      dusk: "add-search-row-dropdown",
      disabled: !t.hasSearchInputsWithoutValue,
      class: "ijt-dropdown--auto-width"
    }, {
      button: O(() => [...e[0] || (e[0] = [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-button__icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])]),
      default: O(() => [
        n("div", ra, [
          (s(!0), v(U, null, K(t.searchInputs, (h, p) => (s(), v("button", {
            key: p,
            dusk: `add-search-row-${h.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((k) => c(h.key), ["prevent"])
          }, _(h.label), 9, ia))), 128))
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
  setup(t, { emit: u }) {
    const l = t, c = u, d = S([...l.columns]), e = S(!1), h = S(!1);
    J(() => l.columns, (r) => {
      !e.value && !h.value && (d.value = [...r]), h.value && setTimeout(() => {
        h.value = !1;
      }, 100);
    }, { deep: !0 });
    function p(r, w) {
      const m = d.value.findIndex((b) => b.key === r);
      m !== -1 && (d.value[m].hidden = !w), c("columns-changed", d.value);
    }
    function k(r, w) {
      const m = d.value.findIndex((b) => b.key === r);
      m !== -1 && (d.value[m].pinned = !w), d.value.sort((b, C) => b.pinned && !C.pinned ? -1 : !b.pinned && C.pinned ? 1 : 0), c("columns-changed", d.value);
    }
    function f() {
      h.value = !0, c("columns-changed", d.value);
    }
    return (r, w) => (s(), F(j(Tt), {
      modelValue: d.value,
      "onUpdate:modelValue": w[0] || (w[0] = (m) => d.value = m),
      "item-key": "key",
      animation: 200,
      handle: ".ijt-column-manager__drag-handle",
      "ghost-class": "ijt-sortable-ghost",
      "chosen-class": "ijt-sortable-chosen",
      onChange: f,
      onStart: w[1] || (w[1] = (m) => e.value = !0),
      onEnd: w[2] || (w[2] = (m) => e.value = !1)
    }, {
      item: O(({ element: m }) => [
        n("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": m.key
        }, [
          n("div", da, [
            w[5] || (w[5] = n("div", { class: "ijt-column-manager__drag-handle" }, [
              n("svg", {
                class: "ijt-column-manager__drag-handle-icon",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                n("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            m.can_be_pinned !== !1 ? (s(), v("button", {
              key: 0,
              type: "button",
              class: P(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": m.pinned }]),
              onClick: R((b) => k(m.key, m.pinned), ["prevent"]),
              title: m.pinned ? "Unpin column" : "Pin column"
            }, [
              m.pinned ? (s(), v("svg", ha, [...w[3] || (w[3] = [
                n("g", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5"
                }, [
                  n("path", { d: "M9.5 14.5L3 21" }),
                  n("path", {
                    fill: "currentColor",
                    d: "m5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                  })
                ], -1)
              ])])) : (s(), v("svg", fa, [...w[4] || (w[4] = [
                n("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, va)) : y("", !0),
            n("p", {
              class: P(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": m.hidden,
                "ijt-column-manager__label--pinned": m.pinned
              }])
            }, _(m.label), 3)
          ]),
          m.can_be_hidden && !m.pinned ? (s(), v("button", {
            key: 0,
            type: "button",
            class: P(["ijt-toggle", {
              "ijt-toggle--on": !m.hidden,
              "ijt-toggle--off": m.hidden
            }]),
            "aria-pressed": !m.hidden,
            "aria-labelledby": `toggle-column-${m.key}`,
            "aria-describedby": `toggle-column-${m.key}`,
            dusk: `toggle-column-${m.key}`,
            onClick: R((b) => p(m.key, m.hidden), ["prevent"])
          }, [...w[6] || (w[6] = [
            n("span", { class: "ijt-sr-only" }, "Column status", -1),
            n("span", {
              "aria-hidden": "true",
              class: "ijt-toggle__handle"
            }, null, -1)
          ])], 10, ma)) : y("", !0)
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
  setup(t) {
    const u = t, l = S([...u.columns]);
    J(() => u.columns, (e) => {
      l.value = [...e];
    }, { deep: !0, immediate: !0 });
    const c = M(() => l.value.filter((e) => e.hidden).length);
    function d(e) {
      l.value = [...e], u.onChange(e);
    }
    return (e, h) => (s(), F(pe, {
      placement: "bottom-end",
      dusk: "columns-dropdown"
    }, {
      button: O(() => [
        h[0] || (h[0] = n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-button__icon",
          viewBox: "0 0 48 48"
        }, [
          n("path", {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "4",
            d: "m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
          })
        ], -1)),
        t.hasHiddenColumns ? (s(), v("span", pa, "(" + _(c.value) + ")", 1)) : y("", !0)
      ]),
      default: O(() => [
        n("div", ga, [
          H(lt, {
            columns: l.value,
            "can-sort": !0,
            onColumnsChanged: d
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
  setup(t) {
    const u = t, l = M(() => u.filters.filter((e) => !c(e)).length);
    function c(e) {
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
    function d(e) {
      let h = e.value;
      e.value && (Number(Math.max(...e.value)) === Number(e.max) && Number(Math.min(...e.value)) === Number(e.min) ? h = null : Number(Math.min(...e.value)) === 0 && Number(Math.max(...e.value)) === 0 && (h = ["0", "0"])), u.onFilterChange(e.key, h);
    }
    return (e, h) => (s(), F(pe, {
      placement: "bottom-end",
      dusk: "filters-dropdown"
    }, {
      button: O(() => [
        h[0] || (h[0] = n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-button__icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        t.hasEnabledFilters ? (s(), v("span", ba, "(" + _(l.value) + ")", 1)) : y("", !0)
      ]),
      default: O(() => [
        n("div", ya, [
          (s(!0), v(U, null, K(t.filters, (p, k) => (s(), v("div", { key: k }, [
            n("h3", ka, _(p.label), 1),
            n("div", wa, [
              p.type === "select" ? (s(), v("select", {
                key: 0,
                name: p.key,
                value: p.value,
                class: "ijt-select",
                onChange: (f) => t.onFilterChange(p.key, f.target.value)
              }, [
                (s(!0), v(U, null, K(p.options, (f, r) => (s(), v("option", {
                  key: r,
                  value: r
                }, _(f), 9, ja))), 128))
              ], 40, xa)) : y("", !0),
              p.type === "toggle" ? (s(), F(Je, {
                key: 1,
                filter: p,
                "on-filter-change": t.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : y("", !0),
              p.type === "number_range" ? (s(), v("div", Ca, [
                H(Ze, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(f) => p.value = f, (f) => d(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              p.type === "date" ? (s(), v("div", $a, [
                H(tt, {
                  filter: p,
                  "on-filter-change": t.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : y("", !0),
              p.type === "number" ? (s(), v("div", Sa, [
                H(et, {
                  filter: p,
                  "on-filter-change": t.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : y("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }));
  }
}, qa = { class: "ijt-global-search" }, Na = ["placeholder", "value"], za = {
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
  setup(t) {
    return (u, l) => (s(), v("div", qa, [
      n("input", {
        class: "ijt-global-search__input",
        placeholder: t.label,
        value: t.value,
        type: "text",
        name: "global",
        onInput: l[0] || (l[0] = (c) => t.onChange(c.target.value))
      }, null, 40, Na),
      l[1] || (l[1] = n("div", { class: "ijt-global-search__icon" }, [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ])
      ], -1))
    ]));
  }
}, Ia = { class: "ijt-search-row__container" }, Fa = ["for"], Va = ["id", "name", "value", "onInput"], Pa = { class: "ijt-search-row__remove" }, Ba = ["dusk", "onClick"], La = {
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
  setup(t) {
    const u = { el: S([]) };
    let l = M(() => u.el.value);
    const c = t;
    function d(e) {
      return c.forcedVisibleSearchInputs.includes(e);
    }
    return J(c.forcedVisibleSearchInputs, (e) => {
      const h = e.length > 0 ? e[e.length - 1] : null;
      !h || Se().then(() => {
        const p = At(l.value, (k) => k.name === h);
        p && p.focus();
      });
    }, { immediate: !0 }), (e, h) => (s(!0), v(U, null, K(t.searchInputs, (p, k) => A((s(), v("div", {
      key: k,
      class: "ijt-search-row"
    }, [
      n("div", Ia, [
        n("label", {
          for: p.key,
          class: "ijt-search-row__label"
        }, [
          h[0] || (h[0] = n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "ijt-search-row__label-icon",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, [
            n("path", {
              "fill-rule": "evenodd",
              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
              "clip-rule": "evenodd"
            })
          ], -1)),
          n("span", null, _(p.label), 1)
        ], 8, Fa),
        (s(), v("input", {
          id: p.key,
          ref_for: !0,
          ref: u.el,
          key: p.key,
          name: p.key,
          value: p.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (f) => t.onChange(p.key, f.target.value)
        }, null, 40, Va)),
        n("div", Pa, [
          n("button", {
            class: "ijt-search-row__remove-button",
            dusk: `remove-search-row-${p.key}`,
            onClick: R((f) => t.onRemove(p.key), ["prevent"])
          }, [...h[1] || (h[1] = [
            n("span", { class: "ijt-sr-only" }, "Remove search", -1),
            n("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "ijt-search-row__remove-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              n("path", {
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
      [ae, p.value !== null || d(p.key)]
    ])), 128));
  }
}, Oa = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    }
  },
  setup(t) {
    const u = ne();
    return (l, c) => {
      var d;
      return s(), v("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: "ijt-reset",
        "aria-haspopup": "true",
        onClick: c[0] || (c[0] = R((...e) => t.onClick && t.onClick(...e), ["prevent"]))
      }, [
        c[1] || (c[1] = n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "ijt-reset__icon",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        n("span", null, _((d = j(u).reset) != null ? d : "Reset"), 1)
      ], 512);
    };
  }
}, Ea = {}, Ra = { class: "ijt-wrapper" }, Ta = { class: "ijt-wrapper__outer" }, Aa = { class: "ijt-wrapper__inner" }, Da = { class: "ijt-wrapper__container" };
function Wa(t, u) {
  return s(), v("div", Ra, [
    n("div", Ta, [
      n("div", Aa, [
        n("div", Da, [
          I(t.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Ua = /* @__PURE__ */ Me(Ea, [["render", Wa]]), Ha = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, Ka = ["dusk", "onClick"], Ga = { class: "ijt-dropdown__content" }, Xa = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    const u = ne(), l = t, c = S(!1), d = S(!1);
    function e() {
      c.value = d.value = !1;
    }
    function h(p) {
      var k, f;
      (k = l.actions.toggleColumns) != null && k.onReorder ? l.actions.toggleColumns.onReorder(p) : (f = l.actions.toggleColumns) != null && f.onChange && l.actions.toggleColumns.onChange(p);
    }
    return (p, k) => (s(), F(pe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: e
    }, {
      button: O(() => [...k[5] || (k[5] = [
        n("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "ijt-button__icon"
        }, [
          n("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: O(() => {
        var f, r, w, m, b;
        return [
          n("div", Ha, [
            A(n("div", null, [
              "searchFields" in t.actions && t.actions.searchFields.show ? (s(), v("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: k[0] || (k[0] = (C) => d.value = !0)
              }, [
                k[6] || (k[6] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", {
                    "fill-rule": "evenodd",
                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                n("span", null, _((f = j(u).add_search_fields) != null ? f : "Add search field"), 1)
              ])) : y("", !0),
              "toggleColumns" in t.actions && t.actions.toggleColumns.show ? (s(), v("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: k[1] || (k[1] = (C) => c.value = !0)
              }, [
                k[7] || (k[7] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                  n("path", {
                    "fill-rule": "evenodd",
                    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                n("span", null, _((r = j(u).show_hide_columns) != null ? r : "Show / Hide columns"), 1)
              ])) : y("", !0),
              k[9] || (k[9] = n("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in t.actions ? (s(), v("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: k[2] || (k[2] = (...C) => {
                  var $, N;
                  return (($ = t.actions.reset) == null ? void 0 : $.onClick) && ((N = t.actions.reset) == null ? void 0 : N.onClick(...C));
                })
              }, [
                k[8] || (k[8] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                n("span", null, _((w = j(u).grouped_reset) != null ? w : "Reset"), 1)
              ])) : y("", !0)
            ], 512), [
              [ae, !c.value && !d.value]
            ]),
            A(n("div", null, [
              n("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: k[3] || (k[3] = (C) => d.value = !1)
              }, [
                k[10] || (k[10] = n("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon"
                }, [
                  n("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                n("span", null, _((m = j(u).add_search_fields) != null ? m : "Add search field"), 1)
              ]),
              (s(!0), v(U, null, K(t.actions.searchFields.searchInputs, (C, $) => (s(), v("button", {
                key: $,
                dusk: `add-search-row-${C.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((N) => t.actions.searchFields.onClick(C.key), ["prevent"])
              }, _(C.label), 9, Ka))), 128))
            ], 512), [
              [ae, d.value]
            ]),
            A(n("div", null, [
              n("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: k[4] || (k[4] = (C) => c.value = !1)
              }, [
                k[11] || (k[11] = n("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "ijt-dropdown__item-icon"
                }, [
                  n("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                n("span", null, _((b = j(u).show_hide_columns) != null ? b : "Show / Hide columns"), 1)
              ]),
              n("div", Ga, [
                H(lt, {
                  columns: t.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: h
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ae, c.value]
            ]),
            A(n("div", null, [
              I(p.$slots, "default")
            ], 512), [
              [ae, !c.value && !d.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 512));
  }
};
function Qa(t) {
  const u = S(!1), l = S(null), c = S(0), d = S(0), e = St({}), h = () => {
    const q = Mt(t) ? j(t) : t;
    return q ? `${q}-columnWidths` : null;
  }, p = () => {
    const q = h();
    if (!q)
      return;
    const L = localStorage.getItem(q);
    if (L)
      try {
        const V = JSON.parse(L);
        Object.assign(e, V);
      } catch (V) {
        console.warn("Unable to load column widths:", V);
      }
  }, k = () => {
    const q = h();
    !q || localStorage.setItem(q, JSON.stringify(e));
  }, f = (q, L) => {
    q.preventDefault(), q.stopPropagation(), u.value = !0, l.value = L, c.value = q.clientX;
    const V = q.target.closest("th");
    d.value = V.offsetWidth;
    const E = V.closest("table");
    E && E.querySelectorAll("thead th[data-column-key]").forEach((T) => {
      const D = T.getAttribute("data-column-key"), W = T.offsetWidth;
      e[D] || (e[D] = W), T.style.width = `${e[D]}px`;
      const X = Array.from(T.parentNode.children).indexOf(T);
      E.querySelectorAll("tbody tr").forEach((ge) => {
        const le = ge.children[X];
        le && (le.style.width = `${e[D]}px`);
      });
    }), document.addEventListener("mousemove", r), document.addEventListener("mouseup", w), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, r = (q) => {
    if (!u.value || !l.value)
      return;
    const L = q.clientX - c.value, V = Math.max(50, d.value + L);
    e[l.value] = V;
    const E = document.querySelector(`th[data-column-key="${l.value}"]`);
    if (E) {
      E.style.width = `${V}px`;
      const G = E.closest("table");
      if (G) {
        const T = Array.from(E.parentNode.children).indexOf(E);
        G.querySelectorAll("tbody tr").forEach((W) => {
          const X = W.children[T];
          X && (X.style.width = `${V}px`);
        });
      }
    }
  }, w = () => {
    u.value && (u.value = !1, l.value = null, k(), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, m = (q) => e[q] || "auto", b = (q, L) => {
    e[q] = L, k();
  }, C = (q) => {
    if (!q)
      return;
    q.querySelectorAll("thead th[data-column-key]").forEach((V) => {
      const E = V.getAttribute("data-column-key");
      if (!e[E]) {
        const D = V.offsetWidth;
        e[E] = Math.max(D, 100);
      }
      V.style.width = `${e[E]}px`;
      const G = Array.from(V.parentNode.children).indexOf(V);
      q.querySelectorAll("tbody tr").forEach((D) => {
        const W = D.children[G];
        W && (W.style.width = `${e[E]}px`);
      });
    });
  }, $ = () => {
    Object.keys(e).forEach((L) => {
      delete e[L];
    });
    const q = h();
    q && localStorage.removeItem(q);
  }, N = () => {
    u.value && (document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Z(() => {
    p();
  }), me(() => {
    N();
  }), {
    isResizing: u,
    resizingColumn: l,
    columnWidths: e,
    startResize: f,
    getColumnWidth: m,
    setColumnWidth: b,
    resetColumnWidths: $,
    loadColumnWidths: p,
    saveColumnWidths: k,
    initializeColumnWidths: C
  };
}
const Ya = ["dusk"], Ja = { class: "ijt-toolbar" }, Za = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, es = {
  key: 1,
  class: "ijt-toolbar__mobile-sort"
}, ts = ["for"], ns = ["id", "value", "aria-label"], ls = { value: "" }, as = ["value"], ss = ["value"], os = { class: "ijt-toolbar__actions" }, rs = { key: 0 }, is = ["href"], us = { class: "ijt-table-container" }, cs = { class: "ijt-table__thead" }, ds = { class: "ijt-table__tr" }, vs = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, hs = ["for"], fs = ["id", "aria-label"], ms = { class: "ijt-table__tbody" }, ps = ["data-column-label"], gs = { class: "ijt-sr-only" }, _s = { class: "ijt-table__td-content" }, bs = ["for"], ys = ["id", "onUpdate:modelValue", "aria-label"], ks = ["onClick", "data-column-key", "data-column-label", "data-column-hidden"], ws = { class: "ijt-table__td-label" }, xs = { class: "ijt-table__td-content" }, js = { class: "ijt-footer" }, Cs = {
  key: 0,
  class: "ijt-footer__selection-info"
}, $s = {
  key: 1,
  class: "ijt-loading"
}, Ss = {
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
  setup(t, { emit: u }) {
    const l = ne(), c = qt(), d = u, e = t, h = M(() => e.localStorageName ? e.localStorageName : e.name && e.name !== "default" ? `table-${e.name}` : null);
    Nt();
    const p = e.resizeableColumns ? Qa(h) : null;
    zt("columnResize", p);
    const k = S(!1), f = M(() => Ge().props.queryBuilderProps ? { ...Ge().props.queryBuilderProps[e.name] } : {}), r = S(f.value), w = M(() => r.value.columns.filter((a) => !a.hidden)), m = M(() => w.value.filter((a) => a.sortable && !C(a))), b = M(() => w.value.some((a) => a.key === "actions"));
    function C(a) {
      const o = String(a.body_class || "").split(/\s+/);
      return o.includes("hidden") || o.includes("ijt-hidden");
    }
    const $ = M(() => {
      const a = r.value.sort;
      return a && a !== f.value.defaultSort ? a : "";
    }), N = M(() => Boolean(e.withInfiniteScrolling || f.value.infiniteScrolling));
    function q() {
      var a, o, i, x, g, z, B, Q, oe, de;
      return (de = (oe = (z = (i = (a = se.value) == null ? void 0 : a.next_page_url) != null ? i : (o = e.resource) == null ? void 0 : o.next_page_url) != null ? z : (g = (x = e.resource) == null ? void 0 : x.links) == null ? void 0 : g.next) != null ? oe : (Q = (B = e.resource) == null ? void 0 : B.meta) == null ? void 0 : Q.next_page_url) != null ? de : null;
    }
    const L = S([]), V = S(null), E = S(null), G = S(!1);
    let T;
    const D = M(() => f.value.pageName), W = S([]), X = S(null), ue = S(!1), ge = M(() => f.value.hasToggleableColumns || f.value.hasFilters || f.value.hasSearchInputs ? !1 : !f.value.globalSearch), le = M(() => N.value ? L.value : Object.keys(e.resource).length === 0 ? e.data : "data" in e.resource ? e.resource.data : e.resource), se = M(() => Object.keys(e.resource).length === 0 ? e.meta : "links" in e.resource && "meta" in e.resource && Object.keys(e.resource.links).length === 4 && "next" in e.resource.links && "prev" in e.resource.links ? {
      ...e.resource.meta,
      next_page_url: e.resource.links.next,
      prev_page_url: e.resource.links.prev
    } : "meta" in e.resource ? e.resource.meta : e.resource), Ne = M(() => le.value.length > 0 ? !0 : se.value.total > 0), ze = S({
      reset: {
        onClick: be
      },
      toggleColumns: {
        show: f.value.hasToggleableColumns,
        columns: f.value.columns,
        onChange: ke
      },
      searchFields: {
        show: f.value.hasSearchInputs && !e.hideSearchInputsAboveTable,
        searchInputs: f.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: f.value.hasSearchInputsWithoutValue,
        onClick: _e
      }
    });
    function at(a) {
      W.value = W.value.filter((o) => o != a), ce(a, null);
    }
    function _e(a) {
      W.value.push(a);
    }
    const Ie = M(() => {
      if (W.value.length > 0)
        return !0;
      const a = $e.parse(location.search.substring(1));
      if (a[D.value] > 1)
        return !0;
      const i = e.name === "default" ? "" : e.name + "_";
      let x = !1;
      return ee(["filter", "columns", "cursor", "sort"], (g) => {
        const z = a[i + g];
        g === "sort" && z === f.value.defaultSort || z !== void 0 && (x = !0);
      }), x;
    }), st = (a, o) => {
      let i = [];
      if (e.striped && o % 2 && i.push("ijt-table__tr--striped"), e.rowClass && typeof e.rowClass == "function") {
        const x = e.rowClass(a);
        x && i.push(x);
      }
      return i.join(" ");
    }, Fe = M(() => {
      if (!e.showExportButton)
        return null;
      const a = new URL(window.location.href);
      a.search = "";
      const o = new URLSearchParams();
      if (f.value.page && f.value.page > 1 && o.set(D.value, f.value.page), f.value.sort) {
        const g = e.name === "default" ? "sort" : `${e.name}_sort`;
        o.set(g, f.value.sort);
      }
      const i = {};
      if (r.value.filters.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (i[g.key] = g.value);
      }), r.value.searchInputs.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (i[g.key] = g.value);
      }), Object.keys(i).length > 0) {
        const g = e.name === "default" ? "filter" : `${e.name}_filter`;
        Object.keys(i).forEach((z) => {
          const B = i[z];
          Array.isArray(B) ? B.forEach((Q, oe) => {
            o.set(`${g}[${z}][${oe}]`, Q);
          }) : typeof B == "object" && B !== null ? Object.keys(B).forEach((Q) => {
            o.set(`${g}[${z}][${Q}]`, B[Q]);
          }) : o.set(`${g}[${z}]`, B);
        });
      }
      const x = r.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (x.length !== r.value.columns.length) {
        const g = e.name === "default" ? "columns" : `${e.name}_columns`;
        x.forEach((z) => {
          o.append(`${g}[]`, z);
        });
      }
      if (f.value.perPageOptions && f.value.perPageOptions.length > 0) {
        const g = new URLSearchParams(window.location.search).get("perPage") || f.value.perPageOptions[0];
        g && g !== f.value.perPageOptions[0] && o.set("perPage", g);
      }
      return o.set("do_export", "1"), o.set("table", e.name || "default"), a.search = o.toString(), a.toString();
    });
    function be() {
      W.value = [], ee(r.value.filters, (a, o) => {
        r.value.filters[o].value = null;
      }), ee(r.value.searchInputs, (a, o) => {
        r.value.searchInputs[o].value = null;
      }), ee(r.value.columns, (a, o) => {
        r.value.columns[o].hidden = a.can_be_hidden ? !f.value.defaultVisibleToggleableColumns.includes(a.key) : !1, r.value.columns[o].pinned = !1;
      }), h.value && localStorage.removeItem(`${h.value}-columns`), e.resizeableColumns && p && p.resetColumnWidths(), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const Ve = {};
    function ce(a, o) {
      clearTimeout(Ve[a]), Ve[a] = setTimeout(() => {
        xe.value && e.preventOverlappingRequests && xe.value.cancel();
        const i = ve("searchInputs", a);
        r.value.searchInputs[i].value = o, r.value.cursor = null, r.value.page = 1;
      }, e.inputDebounceMs);
    }
    function Pe(a) {
      ce("global", a);
    }
    function ye(a, o) {
      const i = ve("filters", a);
      r.value.filters[i].value = o, r.value.cursor = null, r.value.page = 1;
    }
    function Be(a) {
      r.value.cursor = null, r.value.perPage = a, r.value.page = 1;
    }
    function ve(a, o) {
      return Ut(r.value[a], (i) => i.key == o);
    }
    function ke(a) {
      r.value.columns = a, r.value.columns.sort((o, i) => o.pinned && !i.pinned ? -1 : !o.pinned && i.pinned ? 1 : 0), ot();
    }
    function ot() {
      if (!h.value)
        return;
      const a = r.value.columns.map((o, i) => ({
        key: o.key,
        hidden: o.hidden,
        pinned: o.pinned || !1,
        order: i
      }));
      localStorage.setItem(`${h.value}-columns`, JSON.stringify(a));
    }
    function rt() {
      let a = {};
      return ee(r.value.searchInputs, (o) => {
        o.value !== null && (a[o.key] = o.value);
      }), ee(r.value.filters, (o) => {
        let i = o.value;
        i !== null && (o.type === "number_range" && Number(Math.max(...o.value)) === Number(o.max) && Number(Math.min(...o.value)) === Number(o.min) && (i = null), a[o.key] = i);
      }), a;
    }
    function it() {
      const a = r.value.columns;
      let o = Wt(a, (x) => !x.hidden), i = Kt(o, (x) => x.key).sort();
      return Ht(i, f.value.defaultVisibleToggleableColumns) ? {} : i;
    }
    function ut() {
      const a = rt(), o = it(), i = {};
      Object.keys(a).length > 0 && (i.filter = a), Object.keys(o).length > 0 && (i.columns = o);
      const x = r.value.cursor, g = r.value.page, z = r.value.sort, B = r.value.perPage;
      return x && (i.cursor = x), g > 1 && (i.page = g), B > 1 && (i.perPage = B), z && (i.sort = z), i;
    }
    function Le(a) {
      if (!a)
        return null;
      if (e.paginationClickCallback && typeof e.paginationClickCallback == "function") {
        e.paginationClickCallback(a);
        return;
      }
      Oe(a);
    }
    function ct() {
      const a = $e.parse(location.search.substring(1)), o = e.name === "default" ? "" : e.name + "_";
      ee(["filter", "columns", "cursor", "sort"], (x) => {
        delete a[o + x];
      }), delete a[D.value], ee(ut(), (x, g) => {
        g === "page" ? a[D.value] = x : g === "perPage" ? a.perPage = x : a[o + g] = x;
      });
      let i = $e.stringify(a, {
        filter(x, g) {
          return typeof g == "object" && g !== null ? Gt(g) : g;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!i || i === D.value + "=1") && (i = ""), i;
    }
    const we = S(!1), xe = S(null);
    function Oe(a) {
      !a || Xt.get(
        a,
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
              const i = X.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: i });
            }
          }
        }
      );
    }
    function dt(a, o, i) {
      var x;
      e.hasCheckboxes && ((x = a.target) == null ? void 0 : x.parentElement.cellIndex) === 0 || d("rowClicked", a, o, i);
    }
    async function vt() {
      var a, o, i, x, g;
      if (!(G.value || !V.value)) {
        G.value = !0;
        try {
          const z = await fetch(V.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!z.ok)
            throw new Error("Network response was not ok");
          const B = await z.json();
          L.value = [...L.value, ...B.data || []], V.value = (g = (x = (o = B.next_page_url) != null ? o : (a = B.links) == null ? void 0 : a.next) != null ? x : (i = B.meta) == null ? void 0 : i.next_page_url) != null ? g : null;
        } catch (z) {
          console.error("Error loading more data:", z);
        } finally {
          G.value = !1;
        }
      }
    }
    function je() {
      !N.value || !E.value || (T && (T.disconnect(), T = null), e.resource && e.resource.data && L.value.length === 0 && (L.value = [...e.resource.data], V.value = q()), T = new IntersectionObserver(
        (a) => {
          a.forEach((o) => {
            o.isIntersecting && vt();
          });
        },
        {
          rootMargin: "0px 0px 500px 0px"
        }
      ), T.observe(E.value));
    }
    J(r, () => {
      N.value && (L.value = [], V.value = null), Oe(location.pathname + "?" + ct()), ue.value = !1;
    }, { deep: !0 }), J(() => e.resource, () => {
      var a;
      if (!N.value && ((a = e.resource) == null ? void 0 : a.data)) {
        const o = e.resource.data.filter((i) => i.__itSelected);
        d("selectionChanged", o);
      }
    }, { deep: !0 }), J(() => f.value, (a) => {
      var i;
      if (!N.value)
        return;
      const o = ((i = e.resource) == null ? void 0 : i.data) || [];
      if (o.length > 0) {
        L.value = [...o], V.value = q();
        const x = o.filter((g) => g.__itSelected);
        d("selectionChanged", x), setTimeout(() => {
          E.value && je();
        }, 100);
      }
    }, { deep: !0 });
    const Ee = () => {
      e.resizeableColumns && p && setTimeout(() => {
        var o;
        const a = (o = X.value) == null ? void 0 : o.querySelector("table");
        a && p.initializeColumnWidths(a);
      }, 0), N.value && setTimeout(() => {
        E.value && je();
      }, 100);
    };
    Z(() => {
      document.addEventListener("inertia:success", Ee), ht(), e.resizeableColumns && p && setTimeout(() => {
        var o;
        const a = (o = X.value) == null ? void 0 : o.querySelector("table");
        a && p.initializeColumnWidths(a);
      }, 0), N.value && je();
    });
    function ht() {
      if (!h.value)
        return;
      const a = localStorage.getItem(`${h.value}-columns`);
      if (!!a)
        try {
          const o = JSON.parse(a);
          if (o.length > 0 && "order" in o[0]) {
            const i = new Map(o.map((x) => [x.key, x]));
            r.value.columns.forEach((x, g) => {
              const z = i.get(x.key);
              z && (r.value.columns[g].hidden = z.hidden, r.value.columns[g].pinned = z.pinned || !1);
            }), r.value.columns.sort((x, g) => {
              var de, Ue;
              const z = i.get(x.key), B = i.get(g.key);
              if (x.pinned && !g.pinned)
                return -1;
              if (!x.pinned && g.pinned)
                return 1;
              const Q = (de = z == null ? void 0 : z.order) != null ? de : 999, oe = (Ue = B == null ? void 0 : B.order) != null ? Ue : 999;
              return Q - oe;
            });
          } else
            o.forEach((i, x) => {
              const g = r.value.columns.findIndex((z) => z.key === i.key);
              g !== -1 && (r.value.columns[g].hidden = i.hidden, r.value.columns[g].pinned = i.pinned || !1);
            });
        } catch (o) {
          console.warn("Error loading column order from localStorage:", o);
        }
    }
    me(() => {
      document.removeEventListener("inertia:success", Ee), T && (T.disconnect(), T = null);
    });
    function Re(a) {
      r.value.sort == a ? r.value.sort = `-${a}` : r.value.sort = a, r.value.cursor = null, r.value.page = 1;
    }
    function ft(a) {
      r.value.sort = a || null, r.value.cursor = null, r.value.page = 1;
    }
    function mt(a, o) {
      if (c[`cell(${o})`])
        return !1;
      const i = a[o];
      return i == null || typeof i == "string" && i.trim() === "";
    }
    function Ce(a) {
      const o = ve("columns", a);
      return !r.value.columns[o].hidden;
    }
    function he(a) {
      const o = ve("columns", a), i = Dt(r.value.columns[o]);
      i.onSort = Re, i.filters = r.value.filters.filter(
        (g) => g.key === a || g.key.startsWith(a + "_") || g.key.includes(a)
      );
      const x = r.value.searchInputs.filter(
        (g) => g.key === a
      );
      return x.length > 0 ? (i.searchable = !0, i.searchInputs = x) : (i.searchable = !1, i.searchInputs = []), i.onFilterChange = ye, i.onSearchChange = ce, i;
    }
    function pt() {
      e.resource.data.forEach((a) => {
        a.__itSelected = ue.value;
      });
    }
    function gt(a) {
      if (!e.resizeableColumns || !p)
        return "auto";
      const o = p.getColumnWidth(a);
      return o === "auto" ? o : `${o}px`;
    }
    function Te(a) {
      if (!e.resizeableColumns || !p)
        return "0px";
      let o = 0;
      const i = r.value.columns.filter((x) => !x.hidden);
      e.hasCheckboxes && (o += 60);
      for (const x of i) {
        if (x.key === a)
          break;
        if (x.pinned) {
          const g = p.getColumnWidth(x.key);
          o += g === "auto" ? 150 : g;
        }
      }
      return `${o}px`;
    }
    function Ae(a) {
      const o = r.value.columns.find((i) => i.key === a);
      return o && o.pinned;
    }
    function _t(a) {
      return Ae(a) ? {
        position: "sticky",
        left: Te(a),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function bt(a) {
      return Ae(a) ? {
        position: "sticky",
        left: Te(a),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const yt = M(() => {
      if (!e.resizeableColumns || !p)
        return "100%";
      let a = 0, o = !1;
      return e.hasCheckboxes && (a += 60), f.value.columns.forEach((i) => {
        if (!Ce(i.key))
          return;
        const x = p.getColumnWidth(i.key);
        x === "auto" ? o = !0 : a += x;
      }), !o && a > 0 ? `${a}px` : "max(100%, " + (a > 0 ? a + "px" : "800px") + ")";
    }), De = M(() => le.value.filter((a) => a.__itSelected)), We = M(() => De.value.length), kt = M(() => We.value === 0 ? l.noLineSelected : `${We.value} ${l.lineSelected}`);
    function wt() {
      e.resizeableColumns && (k.value = !0);
    }
    function xt() {
      e.resizeableColumns && setTimeout(() => {
        k.value = !1;
      }, 100);
    }
    return (a, o) => (s(), F(It, null, {
      default: O(() => [
        (s(), v("fieldset", {
          ref_key: "tableFieldset",
          ref: X,
          key: `table-${t.name}`,
          dusk: `table-${t.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": we.value }])
        }, [
          n("div", Ja, [
            f.value.globalSearch ? (s(), v("div", Za, [
              I(a.$slots, "tableGlobalSearch", {
                hasGlobalSearch: f.value.globalSearch,
                label: f.value.globalSearch ? f.value.globalSearch.label : null,
                value: f.value.globalSearch ? f.value.globalSearch.value : null,
                onChange: Pe
              }, () => [
                f.value.globalSearch ? (s(), F(za, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: f.value.globalSearch.label,
                  value: f.value.globalSearch.value,
                  "on-change": Pe
                }, null, 8, ["label", "value"])) : y("", !0)
              ], !0)
            ])) : y("", !0),
            m.value.length ? (s(), v("div", es, [
              n("label", {
                for: `table-${t.name}-mobile-sort`,
                class: "ijt-toolbar__mobile-sort-label"
              }, _(j(l).sort_by), 9, ts),
              n("select", {
                id: `table-${t.name}-mobile-sort`,
                class: "ijt-toolbar__mobile-sort-select",
                value: $.value,
                "aria-label": j(l).sort_by,
                onChange: o[0] || (o[0] = (i) => ft(i.target.value))
              }, [
                n("option", ls, _(j(l).default_sort), 1),
                (s(!0), v(U, null, K(m.value, (i) => (s(), v(U, {
                  key: i.key
                }, [
                  n("option", {
                    value: i.key
                  }, _(i.label) + " (" + _(j(l).ascending) + ")", 9, as),
                  n("option", {
                    value: `-${i.key}`
                  }, _(i.label) + " (" + _(j(l).descending) + ")", 9, ss)
                ], 64))), 128))
              ], 40, ns)
            ])) : y("", !0),
            n("div", os, [
              n("div", null, [
                I(a.$slots, "tableFilter", {
                  hasFilters: f.value.hasFilters,
                  hasEnabledFilters: f.value.hasEnabledFilters,
                  filters: f.value.filters,
                  onFilterChange: ye
                }, () => [
                  f.value.hasFilters ? (s(), F(Ma, {
                    key: 0,
                    "has-enabled-filters": f.value.hasEnabledFilters,
                    filters: f.value.filters,
                    "on-filter-change": ye
                  }, null, 8, ["has-enabled-filters", "filters"])) : y("", !0)
                ], !0)
              ]),
              !t.withGroupedMenu && !t.hideSearchInputsAboveTable ? I(a.$slots, "tableAddSearchRow", {
                key: 0,
                hasSearchInputs: f.value.hasSearchInputs,
                hasSearchInputsWithoutValue: f.value.hasSearchInputsWithoutValue,
                searchInputs: f.value.searchInputsWithoutGlobal,
                onAdd: _e
              }, () => [
                f.value.hasSearchInputs ? (s(), F(ua, {
                  key: 0,
                  "search-inputs": f.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": f.value.hasSearchInputsWithoutValue,
                  "on-add": _e
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : y("", !0)
              ], !0) : y("", !0),
              t.withGroupedMenu ? y("", !0) : I(a.$slots, "tableColumns", {
                key: 1,
                hasColumns: f.value.hasToggleableColumns,
                columns: r.value.columns,
                hasHiddenColumns: f.value.hasHiddenColumns,
                onChange: ke
              }, () => [
                f.value.hasToggleableColumns ? (s(), F(_a, {
                  key: 0,
                  columns: r.value.columns,
                  "has-hidden-columns": f.value.hasHiddenColumns,
                  "on-change": ke,
                  "table-name": t.name
                }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : y("", !0)
              ], !0),
              t.withGroupedMenu ? I(a.$slots, "groupedAction", {
                key: 2,
                actions: ze.value
              }, () => [
                H(Xa, { actions: ze.value }, {
                  default: O(() => [
                    I(a.$slots, "bulk-actions", {}, void 0, !0)
                  ]),
                  _: 3
                }, 8, ["actions"])
              ], !0) : y("", !0),
              t.withGroupedMenu ? y("", !0) : I(a.$slots, "tableReset", {
                key: 3,
                canBeReset: Ie.value,
                onClick: be
              }, () => [
                Ie.value ? (s(), v("div", rs, [
                  H(Oa, { "on-click": be })
                ])) : y("", !0)
              ], !0),
              t.showExportButton ? I(a.$slots, "exportButton", {
                key: 4,
                exportUrl: Fe.value,
                translations: j(l)
              }, () => [
                n("a", {
                  href: Fe.value,
                  class: "ijt-export"
                }, [...o[4] || (o[4] = [
                  n("svg", {
                    class: "ijt-export__icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ], -1)
                ])], 8, is)
              ], !0) : y("", !0)
            ])
          ]),
          t.hideSearchInputsAboveTable ? y("", !0) : I(a.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: f.value.hasSearchInputsWithValue,
            searchInputs: f.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: W.value,
            onChange: ce
          }, () => [
            f.value.hasSearchInputsWithValue || W.value.length > 0 ? (s(), F(La, {
              key: 0,
              "search-inputs": f.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": W.value,
              "on-change": ce,
              "on-remove": at
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : y("", !0)
          ], !0),
          I(a.$slots, "tableWrapper", { meta: se.value }, () => [
            H(Ua, {
              class: P({ "ijt-wrapper--mt": !ge.value })
            }, {
              default: O(() => [
                I(a.$slots, "table", {}, () => [
                  n("div", us, [
                    n("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": t.resizeableColumns && k.value }]),
                      style: Y([{ "table-layout": "fixed", "min-width": "100%" }, { width: yt.value }]),
                      onMouseenter: o[2] || (o[2] = (i) => t.resizeableColumns ? wt : null),
                      onMouseleave: o[3] || (o[3] = (i) => t.resizeableColumns ? xt : null)
                    }, [
                      n("thead", cs, [
                        I(a.$slots, "head", {
                          show: Ce,
                          sortBy: Re,
                          header: he
                        }, () => [
                          n("tr", ds, [
                            t.hasCheckboxes ? (s(), v("th", vs, [
                              n("label", {
                                for: `table-${t.name}-select-header`,
                                class: "ijt-sr-only"
                              }, _(j(l).select_row), 9, hs),
                              A(n("input", {
                                type: "checkbox",
                                id: `table-${t.name}-select-header`,
                                onChange: pt,
                                "onUpdate:modelValue": o[1] || (o[1] = (i) => ue.value = i),
                                class: "ijt-table__checkbox",
                                "aria-label": j(l).select_row
                              }, null, 40, fs), [
                                [Ke, ue.value]
                              ])
                            ])) : y("", !0),
                            (s(!0), v(U, null, K(r.value.columns, (i) => (s(), F(Al, {
                              cell: he(i.key),
                              style: Y(bt(i.key))
                            }, {
                              label: O(() => [
                                I(a.$slots, `header(${i.key})`, {
                                  label: he(i.key).label,
                                  column: he(i.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      n("tbody", ms, [
                        I(a.$slots, "body", { show: Ce }, () => [
                          (s(!0), v(U, null, K(le.value, (i, x) => (s(), v("tr", {
                            key: `table-${t.name}-row-${x}`,
                            class: P(["ijt-table__tr", [st(i, x), {
                              "ijt-table__tr--has-actions": b.value,
                              "ijt-table__tr--has-checkboxes": t.hasCheckboxes,
                              "ijt-table__tr--has-card-controls": b.value || t.hasCheckboxes
                            }]])
                          }, [
                            t.hasCheckboxes ? (s(), v("td", {
                              key: 0,
                              class: "ijt-table__td ijt-table__td--pinned-checkbox",
                              style: { width: "60px" },
                              "data-column-label": j(l).select_row
                            }, [
                              n("div", gs, _(j(l).select_row), 1),
                              n("div", _s, [
                                n("label", {
                                  for: `table-${t.name}-select-${x}`,
                                  class: "ijt-sr-only"
                                }, _(j(l).select_row), 9, bs),
                                A(n("input", {
                                  type: "checkbox",
                                  id: `table-${t.name}-select-${x}`,
                                  class: "ijt-table__checkbox",
                                  "onUpdate:modelValue": (g) => i.__itSelected = g,
                                  "aria-label": j(l).select_row
                                }, null, 8, ys), [
                                  [Ke, i.__itSelected]
                                ])
                              ])
                            ], 8, ps)) : y("", !0),
                            (s(!0), v(U, null, K(w.value, (g) => (s(), v("td", {
                              key: `table-${t.name}-row-${x}-column-${g.key}`,
                              onClick: (z) => dt(z, i, g.key),
                              class: P(["ijt-table__td", [g.body_class, {
                                "ijt-table__td--empty": mt(i, g.key)
                              }]]),
                              "data-column-key": g.key,
                              "data-column-label": g.label || g.key,
                              "data-column-hidden": g.hidden ? "true" : "false",
                              style: Y({
                                width: gt(g.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ..._t(g.key)
                              })
                            }, [
                              n("div", ws, _(g.label || g.key), 1),
                              n("div", xs, [
                                I(a.$slots, `cell(${g.key})`, { item: i }, () => [
                                  te(_(i[g.key]), 1)
                                ], !0)
                              ])
                            ], 14, ks))), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                N.value ? y("", !0) : I(a.$slots, "pagination", {
                  key: 0,
                  onClick: Le,
                  hasData: Ne.value,
                  meta: se.value,
                  perPageOptions: f.value.perPageOptions,
                  onPerPageChange: Be,
                  showExportButton: t.showExportButton
                }, () => [
                  n("div", js, [
                    t.hasCheckboxes ? (s(), v("span", Cs, _(kt.value), 1)) : y("", !0),
                    H(oa, {
                      "on-click": Le,
                      "has-data": Ne.value,
                      meta: se.value,
                      "per-page-options": f.value.perPageOptions,
                      "on-per-page-change": Be,
                      "show-export-button": t.showExportButton
                    }, {
                      exportButton: O((i) => [
                        I(a.$slots, "exportButton", Ft(Vt(i)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                N.value && G.value ? (s(), v("div", $s, [...o[5] || (o[5] = [
                  n("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : y("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          N.value ? (s(), v("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: E,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : y("", !0),
          I(a.$slots, "tableSummary", {
            data: le.value,
            meta: se.value,
            selectedItems: De.value
          }, void 0, !0)
        ], 10, Ya))
      ]),
      _: 3
    }));
  }
}, Gs = /* @__PURE__ */ Me(Ss, [["__scopeId", "data-v-4b329704"]]);
export {
  pe as ButtonWithDropdown,
  Al as HeaderCell,
  Qt as OnClickOutside,
  oa as Pagination,
  Gs as Table,
  ua as TableAddSearchRow,
  _a as TableColumns,
  Ma as TableFilter,
  za as TableGlobalSearch,
  Oa as TableReset,
  La as TableSearchRows,
  Ua as TableWrapper,
  ne as getTranslations,
  Hs as setTranslation,
  Ks as setTranslations
};
