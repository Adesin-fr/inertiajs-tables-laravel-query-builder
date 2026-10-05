import { ref as S, onMounted as Z, onBeforeUnmount as Qe, openBlock as s, createElementBlock as h, renderSlot as z, watch as J, nextTick as Se, createBlock as F, withCtx as O, createElementVNode as n, normalizeClass as P, withModifiers as R, withDirectives as A, vShow as ae, createStaticVNode as jt, normalizeStyle as Y, toDisplayString as _, createCommentVNode as b, createTextVNode as te, computed as M, unref as $, vModelSelect as Ye, vModelText as ie, watchEffect as Ct, onUnmounted as me, Teleport as fe, Fragment as U, renderList as K, createVNode as H, withKeys as He, inject as $t, resolveDynamicComponent as re, reactive as St, isRef as Mt, useSlots as qt, getCurrentInstance as It, provide as Nt, Transition as zt, vModelCheckbox as Ke, normalizeProps as Ft, guardReactiveProps as Vt } from "vue";
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
    }), (d, e) => (s(), h("div", {
      ref_key: "root",
      ref: c
    }, [
      z(d.$slots, "default")
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
    const c = l, d = t, e = S(!1), f = S(null), p = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: j }) {
        const v = j.elements.popper;
        if (!v)
          return;
        const C = 12, x = v.getBoundingClientRect(), I = j.placement || "bottom";
        let q;
        I.startsWith("top") ? q = x.bottom - C : q = window.innerHeight - x.top - C;
        const L = Math.max(q, 160);
        v.style.maxHeight = `${L}px`, v.style.overflowY = "auto", v.style.overscrollBehavior = "contain", v.style.webkitOverflowScrolling = "touch";
      }
    };
    function y() {
      e.value = !e.value;
    }
    function m() {
      e.value = !1;
    }
    J(e, () => {
      e.value && f.value && Se(() => f.value.update()), e.value || c("closed"), e.value && c("opened");
    });
    const r = S(null), w = S(null);
    return Z(() => {
      f.value = Pt(r.value, w.value, {
        placement: d.placement,
        modifiers: [Ot, Lt, Bt, p]
      });
    }), Qe(() => {
      f.value && (f.value.destroy(), f.value = null);
    }), u({ hide: m }), (j, v) => (s(), F(Qt, { do: m }, {
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
            onClick: R(y, ["prevent"])
          }, [
            z(j.$slots, "button")
          ], 10, Jt),
          A(n("div", {
            ref_key: "tooltip",
            ref: w,
            class: "ijt-dropdown__panel"
          }, [
            z(j.$slots, "default")
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
    return (c, d) => (s(), h("div", {
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
    return (u, l) => (s(), h("div", en, [
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
  var f, p, y, m;
  return s(), h("div", an, [
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
                l.prefix ? (s(), h("span", cn, _(l.prefix), 1)) : b("", !0),
                te(" " + _((f = e.currentMinValue) != null ? f : 0) + " ", 1),
                l.suffix ? (s(), h("span", dn, _(l.suffix), 1)) : b("", !0)
              ], 4),
              (s(), h("svg", {
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
                l.prefix ? (s(), h("span", fn, _(l.prefix), 1)) : b("", !0),
                te(" " + _((p = e.currentMaxValue) != null ? p : 0) + " ", 1),
                l.suffix ? (s(), h("span", mn, _(l.suffix), 1)) : b("", !0)
              ], 4),
              n("div", pn, [
                (s(), h("svg", {
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
          l.prefix ? (s(), h("span", _n, _(l.prefix), 1)) : b("", !0),
          te(" " + _((y = l.min) != null ? y : 0) + " ", 1),
          l.suffix ? (s(), h("span", bn, _(l.suffix), 1)) : b("", !0)
        ]),
        n("div", yn, [
          l.prefix ? (s(), h("span", kn, _(l.prefix), 1)) : b("", !0),
          te(" " + _((m = l.max) != null ? m : 0) + " ", 1),
          l.suffix ? (s(), h("span", wn, _(l.suffix), 1)) : b("", !0)
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
const jn = { class: "ijt-number-filter" }, Cn = { class: "ijt-number-filter__label" }, $n = { value: "" }, Sn = { value: "exact" }, Mn = { value: "less_than" }, qn = { value: "greater_than" }, In = { value: "less_than_or_equal" }, Nn = { value: "greater_than_or_equal" }, zn = { value: "between" }, Fn = { key: 0 }, Vn = { key: 0 }, Pn = { class: "ijt-number-filter__label" }, Bn = { class: "ijt-number-filter__input-wrapper" }, Ln = {
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
    const u = t, l = ne(), c = S(""), d = S(""), e = S(""), f = S(""), p = M(() => c.value !== "" && (c.value !== "between" && d.value !== "" && d.value !== null || c.value === "between" && e.value !== "" && e.value !== null && f.value !== "" && f.value !== null));
    function y() {
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
    function m() {
      d.value = "", e.value = "", f.value = "", c.value === "" ? j() : r();
    }
    function r() {
      if (c.value === "")
        return;
      let v = null;
      switch (c.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          d.value !== "" && d.value !== null && (v = {
            type: c.value,
            number: d.value
          });
          break;
        case "between":
          e.value !== "" && e.value !== null && f.value !== "" && f.value !== null && (v = {
            type: c.value,
            start_number: e.value,
            end_number: f.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, v);
    }
    function w() {
      c.value = "", d.value = "", e.value = "", f.value = "";
    }
    function j() {
      w(), u.onFilterChange(u.filter.key, null);
    }
    return Z(() => {
      if (u.filter.value) {
        const v = u.filter.value;
        v.type && (c.value = v.type, v.type === "between" ? (e.value = v.start_number || "", f.value = v.end_number || "") : d.value = v.number || "");
      }
    }), J(() => u.filter.value, (v) => {
      v ? v.type && (c.value = v.type, v.type === "between" ? (e.value = v.start_number || "", f.value = v.end_number || "") : d.value = v.number || "") : w();
    }, { deep: !0 }), (v, C) => (s(), h("div", jn, [
      n("div", null, [
        n("label", Cn, _($(l).filter_type), 1),
        A(n("select", {
          "onUpdate:modelValue": C[0] || (C[0] = (x) => c.value = x),
          class: "ijt-select",
          onChange: m
        }, [
          n("option", $n, _($(l).no_filter), 1),
          n("option", Sn, _($(l).exact_number), 1),
          n("option", Mn, _($(l).less_than), 1),
          n("option", qn, _($(l).greater_than), 1),
          n("option", In, _($(l).less_than_or_equal), 1),
          n("option", Nn, _($(l).greater_than_or_equal), 1),
          n("option", zn, _($(l).number_range), 1)
        ], 544), [
          [Ye, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (s(), h("div", Fn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(c.value) ? (s(), h("div", Vn, [
          n("label", Pn, _(y()), 1),
          n("div", Bn, [
            t.filter.prefix ? (s(), h("span", Ln, _(t.filter.prefix), 1)) : b("", !0),
            A(n("input", {
              type: "number",
              "onUpdate:modelValue": C[1] || (C[1] = (x) => d.value = x),
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
            t.filter.suffix ? (s(), h("span", En, _(t.filter.suffix), 1)) : b("", !0)
          ])
        ])) : b("", !0),
        c.value === "between" ? (s(), h("div", Rn, [
          n("div", Tn, [
            n("label", An, _($(l).start_number), 1),
            n("div", Dn, [
              t.filter.prefix ? (s(), h("span", Wn, _(t.filter.prefix), 1)) : b("", !0),
              A(n("input", {
                type: "number",
                "onUpdate:modelValue": C[2] || (C[2] = (x) => e.value = x),
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
              t.filter.suffix ? (s(), h("span", Hn, _(t.filter.suffix), 1)) : b("", !0)
            ])
          ]),
          n("div", null, [
            n("label", Kn, _($(l).end_number), 1),
            n("div", Gn, [
              t.filter.prefix ? (s(), h("span", Xn, _(t.filter.prefix), 1)) : b("", !0),
              A(n("input", {
                type: "number",
                "onUpdate:modelValue": C[3] || (C[3] = (x) => f.value = x),
                step: t.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Qn), [
                [
                  ie,
                  f.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              t.filter.suffix ? (s(), h("span", Yn, _(t.filter.suffix), 1)) : b("", !0)
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (s(), h("div", Jn, [
        n("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: j
        }, [
          n("span", Zn, _($(l).reset_filter), 1),
          C[4] || (C[4] = n("svg", {
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
  setup(t) {
    const u = t, l = ne(), c = S(""), d = S(""), e = S(""), f = S(""), p = M(() => c.value !== "" && (c.value !== "between" && d.value || c.value === "between" && e.value && f.value));
    function y() {
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
    function m() {
      d.value = "", e.value = "", f.value = "", c.value === "" ? j() : r();
    }
    function r() {
      if (c.value === "")
        return;
      let v = null;
      switch (c.value) {
        case "exact":
        case "before":
        case "after":
          d.value && (v = {
            type: c.value,
            date: d.value
          });
          break;
        case "between":
          e.value && f.value && (v = {
            type: c.value,
            start_date: e.value,
            end_date: f.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, v);
    }
    function w() {
      c.value = "", d.value = "", e.value = "", f.value = "";
    }
    function j() {
      w(), u.onFilterChange(u.filter.key, null);
    }
    return Z(() => {
      if (u.filter.value) {
        const v = u.filter.value;
        v.type && (c.value = v.type, v.type === "between" ? (e.value = v.start_date || "", f.value = v.end_date || "") : d.value = v.date || "");
      }
    }), J(() => u.filter.value, (v) => {
      v ? v.type && (c.value = v.type, v.type === "between" ? (e.value = v.start_date || "", f.value = v.end_date || "") : d.value = v.date || "") : w();
    }, { deep: !0 }), (v, C) => (s(), h("div", el, [
      n("div", null, [
        n("label", tl, _($(l).filter_type), 1),
        A(n("select", {
          "onUpdate:modelValue": C[0] || (C[0] = (x) => c.value = x),
          class: "ijt-select",
          onChange: m
        }, [
          n("option", nl, _($(l).no_filter), 1),
          n("option", ll, _($(l).exact_date), 1),
          n("option", al, _($(l).before_date), 1),
          n("option", sl, _($(l).after_date), 1),
          n("option", ol, _($(l).date_range), 1)
        ], 544), [
          [Ye, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (s(), h("div", rl, [
        ["exact", "before", "after"].includes(c.value) ? (s(), h("div", il, [
          n("label", ul, _(y()), 1),
          A(n("input", {
            type: "date",
            "onUpdate:modelValue": C[1] || (C[1] = (x) => d.value = x),
            class: "ijt-input",
            onChange: r
          }, null, 544), [
            [ie, d.value]
          ])
        ])) : b("", !0),
        c.value === "between" ? (s(), h("div", cl, [
          n("div", dl, [
            n("label", vl, _($(l).start_date), 1),
            A(n("input", {
              type: "date",
              "onUpdate:modelValue": C[2] || (C[2] = (x) => e.value = x),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ie, e.value]
            ])
          ]),
          n("div", null, [
            n("label", hl, _($(l).end_date), 1),
            A(n("input", {
              type: "date",
              "onUpdate:modelValue": C[3] || (C[3] = (x) => f.value = x),
              class: "ijt-input",
              onChange: r
            }, null, 544), [
              [ie, f.value]
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (s(), h("div", fl, [
        n("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: j
        }, [
          n("span", ml, _($(l).reset_filter), 1),
          C[4] || (C[4] = n("svg", {
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
      ])) : b("", !0)
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
      let { destroy: f } = Et(e, d, t);
      c(f);
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
    }), e = M(() => u.filters.filter((v) => v.key === u.columnKey || v.key.startsWith(u.columnKey + "_") || v.key.includes(u.columnKey))), f = M(() => e.value.some((v) => !m(v)));
    function p() {
      e.value.length > 0 && (l.value = !l.value);
    }
    function y() {
      l.value = !1;
    }
    function m(v) {
      if (v.value === null)
        return !0;
      switch (v.type) {
        case "number_range":
          return Number(Math.max(...v.value)) === Number(v.max) && Number(Math.min(...v.value)) === Number(v.min);
        case "select":
          return v.value === "";
        case "toggle":
          return !1;
        case "date":
          return !v.value || typeof v.value == "object" && !v.value.type;
        default:
          return !v.value;
      }
    }
    function r(v, C) {
      u.onFilterChange(v, C);
    }
    function w(v) {
      let C = v.value;
      v.value && (Number(Math.max(...v.value)) === Number(v.max) && Number(Math.min(...v.value)) === Number(v.min) ? C = null : Number(Math.min(...v.value)) === 0 && Number(Math.max(...v.value)) === 0 && (C = ["0", "0"])), u.onFilterChange(v.key, C);
    }
    function j(v) {
      d.value && !d.value.contains(v.target) && !v.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && y();
    }
    return Z(() => {
      document.addEventListener("click", j);
    }), me(() => {
      document.removeEventListener("click", j);
    }), (v, C) => (s(), h("div", pl, [
      n("button", {
        ref_key: "trigger",
        ref: c,
        onClick: p,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": f.value }]),
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
        l.value ? (s(), h("div", {
          key: 0,
          ref_key: "container",
          ref: d,
          class: "ijt-filter__dropdown",
          style: { "z-index": "9999" },
          onClick: C[0] || (C[0] = R(() => {
          }, ["stop"]))
        }, [
          (s(!0), h(U, null, K(e.value, (x) => (s(), h("div", {
            key: x.key
          }, [
            n("h3", _l, _(x.label), 1),
            n("div", bl, [
              x.type === "select" ? (s(), h("select", {
                key: 0,
                name: x.key,
                value: x.value,
                class: "ijt-select",
                onChange: (I) => r(x.key, I.target.value)
              }, [
                (s(!0), h(U, null, K(x.options, (I, q) => (s(), h("option", {
                  key: q,
                  value: q
                }, _(I), 9, kl))), 128))
              ], 40, yl)) : b("", !0),
              x.type === "toggle" ? (s(), F(Je, {
                key: 1,
                filter: x,
                "on-filter-change": r
              }, null, 8, ["filter"])) : b("", !0),
              x.type === "number" ? (s(), h("div", wl, [
                H(et, {
                  filter: x,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0),
              x.type === "number_range" ? (s(), h("div", xl, [
                H(Ze, {
                  modelValue: x.value,
                  "onUpdate:modelValue": [(I) => x.value = I, (I) => w(x)],
                  max: x.max,
                  min: x.min,
                  prefix: x.prefix,
                  suffix: x.suffix,
                  step: x.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              x.type === "date" ? (s(), h("div", jl, [
                H(tt, {
                  filter: x,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0)
            ])
          ]))), 128))
        ], 512)) : b("", !0)
      ])),
      (s(), F(fe, { to: "body" }, [
        l.value ? (s(), h("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: y
        })) : b("", !0)
      ]))
    ]));
  }
}, $l = { class: "ijt-filter" }, Sl = ["dusk"], Ml = { class: "ijt-column-search__header" }, ql = { class: "ijt-column-search__content" }, Il = ["value", "placeholder"], Nl = {
  key: 0,
  class: "ijt-column-search__reset"
}, zl = { class: "ijt-sr-only" }, Fl = {
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
    const u = t, l = ne(), c = S(!1), d = S(null), [e, f] = nt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = M(() => u.searchInputs.find((x) => x.key === u.columnKey)), y = M(() => p.value && p.value.value || ""), m = M(() => y.value !== "");
    async function r() {
      p.value && (c.value = !c.value, c.value && (await Se(), d.value && d.value.focus()));
    }
    function w() {
      c.value = !1;
    }
    function j(x) {
      const I = x.target.value;
      v(I);
    }
    function v(x) {
      u.onSearchChange(u.columnKey, x);
    }
    function C(x) {
      f.value && !f.value.contains(x.target) && !x.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Z(() => {
      document.addEventListener("click", C);
    }), me(() => {
      document.removeEventListener("click", C);
    }), (x, I) => (s(), h("div", $l, [
      n("button", {
        ref_key: "trigger",
        ref: e,
        onClick: r,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": m.value }]),
        dusk: `column-search-${t.columnKey}`
      }, [...I[2] || (I[2] = [
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
        c.value ? (s(), h("div", {
          key: 0,
          ref_key: "container",
          ref: f,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: I[1] || (I[1] = R(() => {
          }, ["stop"]))
        }, [
          n("h3", Ml, _($(l).search) + " " + _(t.columnLabel), 1),
          n("div", ql, [
            n("input", {
              ref_key: "searchInput",
              ref: d,
              type: "text",
              value: y.value,
              class: "ijt-column-search__input",
              placeholder: `${$(l).search} ${t.columnLabel.toLowerCase()}...`,
              onInput: j,
              onKeydown: [
                He(w, ["enter"]),
                He(w, ["escape"])
              ]
            }, null, 40, Il),
            y.value && y.value !== "" ? (s(), h("div", Nl, [
              n("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: I[0] || (I[0] = (q) => v(""))
              }, [
                n("span", zl, _($(l).reset), 1),
                I[3] || (I[3] = n("svg", {
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
            ])) : b("", !0)
          ])
        ], 512)) : b("", !0)
      ])),
      (s(), F(fe, { to: "body" }, [
        c.value ? (s(), h("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: w
        })) : b("", !0)
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
      const y = l.getColumnWidth(u.cell.key);
      return y === "auto" ? y : `${y}px`;
    }), d = M(() => (l == null ? void 0 : l.isResizing) || !1), e = M(() => (l == null ? void 0 : l.resizingColumn) || null);
    function f() {
      u.cell.sortable && u.cell.onSort(u.cell.key);
    }
    function p(y, m) {
      l && l.startResize(y, m);
    }
    return (y, m) => A((s(), h("th", {
      class: P(["ijt-table__th", t.cell.header_class]),
      style: Y({ width: c.value }),
      "data-column-key": t.cell.key
    }, [
      (s(), F(re(t.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: t.cell.sortable ? `sort-${t.cell.key}` : null,
        onClick: R(f, ["prevent"])
      }, {
        default: O(() => [
          n("span", Pl, [
            n("span", Bl, [
              z(y.$slots, "label", {}, () => [
                n("span", null, _(t.cell.label), 1)
              ]),
              z(y.$slots, "sort", {}, () => [
                t.cell.sortable ? (s(), h("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: P(["ijt-sort-icon", {
                    "ijt-sort-icon--active": t.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: t.cell.sorted
                }, [
                  t.cell.sorted ? b("", !0) : (s(), h("path", Ol)),
                  t.cell.sorted === "asc" ? (s(), h("path", El)) : b("", !0),
                  t.cell.sorted === "desc" ? (s(), h("path", Rl)) : b("", !0)
                ], 10, Ll)) : b("", !0)
              ])
            ]),
            n("span", Tl, [
              z(y.$slots, "search", {}, () => [
                t.cell.searchable && t.cell.searchInputs && t.cell.searchInputs.length > 0 ? (s(), F(Fl, {
                  key: 0,
                  "column-key": t.cell.key,
                  "column-label": t.cell.label,
                  "search-inputs": t.cell.searchInputs,
                  "on-search-change": t.cell.onSearchChange,
                  onClick: m[0] || (m[0] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : b("", !0)
              ]),
              z(y.$slots, "filter", {}, () => [
                t.cell.filters && t.cell.filters.length > 0 ? (s(), F(Cl, {
                  key: 0,
                  "column-key": t.cell.key,
                  filters: t.cell.filters,
                  "on-filter-change": t.cell.onFilterChange,
                  onClick: m[1] || (m[1] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change"])) : b("", !0)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      t.cell.resizable !== !1 && $(l) ? (s(), F(Zt, {
        key: 0,
        "column-key": t.cell.key,
        "on-resize": p,
        "is-active": d.value && e.value === t.cell.key
      }, null, 8, ["column-key", "is-active"])) : b("", !0)
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
      return d.push(parseInt(l.value)), Rt(d).sort((e, f) => e - f);
    });
    return (d, e) => (s(), h("select", {
      name: "per_page",
      dusk: t.dusk,
      value: t.value,
      class: "ijt-per-page",
      onChange: e[0] || (e[0] = (f) => t.onChange(f.target.value))
    }, [
      (s(!0), h(U, null, K(c.value, (f) => (s(), h("option", {
        key: f,
        value: f
      }, _(f) + " " + _($(u).per_page), 9, Wl))), 128))
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
    const u = ne(), l = t, c = M(() => "links" in e.value ? e.value.links.length > 0 : !1), d = M(() => Object.keys(e.value).length > 0), e = M(() => l.meta), f = M(() => "prev_page_url" in e.value ? e.value.prev_page_url : null), p = M(() => "next_page_url" in e.value ? e.value.next_page_url : null), y = M(() => parseInt(e.value.per_page));
    return (m, r) => d.value ? (s(), h("nav", Ul, [
      !t.hasData || e.value.total < 1 ? (s(), h("p", Hl, _($(u).no_results_found), 1)) : b("", !0),
      t.hasData ? (s(), h("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": c.value }])
      }, [
        (s(), F(re(f.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !f.value
            }
          ]),
          href: f.value,
          dusk: f.value ? "pagination-simple-previous" : null,
          onClick: r[0] || (r[0] = R((w) => t.onClick(f.value), ["prevent"]))
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
            n("span", Kl, _($(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        H(Xe, {
          dusk: "per-page-mobile",
          value: y.value,
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
            n("span", Gl, _($(u).next), 1),
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
      ], 2)) : b("", !0),
      t.hasData && c.value ? (s(), h("div", Xl, [
        n("div", Ql, [
          H(Xe, {
            dusk: "per-page-full",
            value: y.value,
            options: t.perPageOptions,
            "on-change": t.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          n("p", Yl, [
            n("span", Jl, _(e.value.from), 1),
            te(" " + _($(u).to) + " ", 1),
            n("span", Zl, _(e.value.to), 1),
            te(" " + _($(u).of) + " ", 1),
            n("span", ea, _(e.value.total), 1),
            te(" " + _($(u).results), 1)
          ])
        ]),
        n("div", ta, [
          n("nav", na, [
            (s(), F(re(f.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--first",
                {
                  "ijt-pagination__button--disabled": !f.value
                }
              ]),
              href: f.value,
              dusk: f.value ? "pagination-previous" : null,
              onClick: r[2] || (r[2] = R((w) => t.onClick(f.value), ["prevent"]))
            }, {
              default: O(() => [
                n("span", la, _($(u).previous), 1),
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
            (s(!0), h(U, null, K(e.value.links, (w, j) => (s(), h("div", { key: j }, [
              z(m.$slots, "link", {}, () => [
                !isNaN(w.label) || w.label === "..." ? (s(), F(re(w.url ? "a" : "div"), {
                  key: 0,
                  href: w.url,
                  dusk: w.url ? `pagination-${w.label}` : null,
                  class: P(["ijt-pagination__button", {
                    "ijt-pagination__button--disabled": !w.url,
                    "ijt-pagination__button--active": w.active
                  }]),
                  onClick: R((v) => t.onClick(w.url), ["prevent"])
                }, {
                  default: O(() => [
                    n("span", aa, _(w.label), 1)
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
              onClick: r[3] || (r[3] = R((w) => t.onClick(p.value), ["prevent"]))
            }, {
              default: O(() => [
                n("span", sa, _($(u).next), 1),
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
          (s(!0), h(U, null, K(t.searchInputs, (f, p) => (s(), h("button", {
            key: p,
            dusk: `add-search-row-${f.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((y) => c(f.key), ["prevent"])
          }, _(f.label), 9, ia))), 128))
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
    const l = t, c = u, d = S([...l.columns]), e = S(!1), f = S(!1);
    J(() => l.columns, (r) => {
      !e.value && !f.value && (d.value = [...r]), f.value && setTimeout(() => {
        f.value = !1;
      }, 100);
    }, { deep: !0 });
    function p(r, w) {
      const j = d.value.findIndex((v) => v.key === r);
      j !== -1 && (d.value[j].hidden = !w), c("columns-changed", d.value);
    }
    function y(r, w) {
      const j = d.value.findIndex((v) => v.key === r);
      j !== -1 && (d.value[j].pinned = !w), d.value.sort((v, C) => v.pinned && !C.pinned ? -1 : !v.pinned && C.pinned ? 1 : 0), c("columns-changed", d.value);
    }
    function m() {
      f.value = !0, c("columns-changed", d.value);
    }
    return (r, w) => (s(), F($(Tt), {
      modelValue: d.value,
      "onUpdate:modelValue": w[0] || (w[0] = (j) => d.value = j),
      "item-key": "key",
      animation: 200,
      handle: ".ijt-column-manager__drag-handle",
      "ghost-class": "ijt-sortable-ghost",
      "chosen-class": "ijt-sortable-chosen",
      onChange: m,
      onStart: w[1] || (w[1] = (j) => e.value = !0),
      onEnd: w[2] || (w[2] = (j) => e.value = !1)
    }, {
      item: O(({ element: j }) => [
        n("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": j.key
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
            j.can_be_pinned !== !1 ? (s(), h("button", {
              key: 0,
              type: "button",
              class: P(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": j.pinned }]),
              onClick: R((v) => y(j.key, j.pinned), ["prevent"]),
              title: j.pinned ? "Unpin column" : "Pin column"
            }, [
              j.pinned ? (s(), h("svg", ha, [...w[3] || (w[3] = [
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
              ])])) : (s(), h("svg", fa, [...w[4] || (w[4] = [
                n("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, va)) : b("", !0),
            n("p", {
              class: P(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": j.hidden,
                "ijt-column-manager__label--pinned": j.pinned
              }])
            }, _(j.label), 3)
          ]),
          j.can_be_hidden && !j.pinned ? (s(), h("button", {
            key: 0,
            type: "button",
            class: P(["ijt-toggle", {
              "ijt-toggle--on": !j.hidden,
              "ijt-toggle--off": j.hidden
            }]),
            "aria-pressed": !j.hidden,
            "aria-labelledby": `toggle-column-${j.key}`,
            "aria-describedby": `toggle-column-${j.key}`,
            dusk: `toggle-column-${j.key}`,
            onClick: R((v) => p(j.key, j.hidden), ["prevent"])
          }, [...w[6] || (w[6] = [
            n("span", { class: "ijt-sr-only" }, "Column status", -1),
            n("span", {
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
  setup(t) {
    const u = t, l = S([...u.columns]);
    J(() => u.columns, (e) => {
      l.value = [...e];
    }, { deep: !0, immediate: !0 });
    const c = M(() => l.value.filter((e) => e.hidden).length);
    function d(e) {
      l.value = [...e], u.onChange(e);
    }
    return (e, f) => (s(), F(pe, {
      placement: "bottom-end",
      dusk: "columns-dropdown"
    }, {
      button: O(() => [
        f[0] || (f[0] = n("svg", {
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
        t.hasHiddenColumns ? (s(), h("span", pa, "(" + _(c.value) + ")", 1)) : b("", !0)
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
      let f = e.value;
      e.value && (Number(Math.max(...e.value)) === Number(e.max) && Number(Math.min(...e.value)) === Number(e.min) ? f = null : Number(Math.min(...e.value)) === 0 && Number(Math.max(...e.value)) === 0 && (f = ["0", "0"])), u.onFilterChange(e.key, f);
    }
    return (e, f) => (s(), F(pe, {
      placement: "bottom-end",
      dusk: "filters-dropdown"
    }, {
      button: O(() => [
        f[0] || (f[0] = n("svg", {
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
        t.hasEnabledFilters ? (s(), h("span", ba, "(" + _(l.value) + ")", 1)) : b("", !0)
      ]),
      default: O(() => [
        n("div", ya, [
          (s(!0), h(U, null, K(t.filters, (p, y) => (s(), h("div", { key: y }, [
            n("h3", ka, _(p.label), 1),
            n("div", wa, [
              p.type === "select" ? (s(), h("select", {
                key: 0,
                name: p.key,
                value: p.value,
                class: "ijt-select",
                onChange: (m) => t.onFilterChange(p.key, m.target.value)
              }, [
                (s(!0), h(U, null, K(p.options, (m, r) => (s(), h("option", {
                  key: r,
                  value: r
                }, _(m), 9, ja))), 128))
              ], 40, xa)) : b("", !0),
              p.type === "toggle" ? (s(), F(Je, {
                key: 1,
                filter: p,
                "on-filter-change": t.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : b("", !0),
              p.type === "number_range" ? (s(), h("div", Ca, [
                H(Ze, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(m) => p.value = m, (m) => d(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              p.type === "date" ? (s(), h("div", $a, [
                H(tt, {
                  filter: p,
                  "on-filter-change": t.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0),
              p.type === "number" ? (s(), h("div", Sa, [
                H(et, {
                  filter: p,
                  "on-filter-change": t.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }));
  }
}, qa = { class: "ijt-global-search" }, Ia = ["placeholder", "value"], Na = {
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
    return (u, l) => (s(), h("div", qa, [
      n("input", {
        class: "ijt-global-search__input",
        placeholder: t.label,
        value: t.value,
        type: "text",
        name: "global",
        onInput: l[0] || (l[0] = (c) => t.onChange(c.target.value))
      }, null, 40, Ia),
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
}, za = { class: "ijt-search-row__container" }, Fa = ["for"], Va = ["id", "name", "value", "onInput"], Pa = { class: "ijt-search-row__remove" }, Ba = ["dusk", "onClick"], La = {
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
      const f = e.length > 0 ? e[e.length - 1] : null;
      !f || Se().then(() => {
        const p = At(l.value, (y) => y.name === f);
        p && p.focus();
      });
    }, { immediate: !0 }), (e, f) => (s(!0), h(U, null, K(t.searchInputs, (p, y) => A((s(), h("div", {
      key: y,
      class: "ijt-search-row"
    }, [
      n("div", za, [
        n("label", {
          for: p.key,
          class: "ijt-search-row__label"
        }, [
          f[0] || (f[0] = n("svg", {
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
        (s(), h("input", {
          id: p.key,
          ref_for: !0,
          ref: u.el,
          key: p.key,
          name: p.key,
          value: p.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (m) => t.onChange(p.key, m.target.value)
        }, null, 40, Va)),
        n("div", Pa, [
          n("button", {
            class: "ijt-search-row__remove-button",
            dusk: `remove-search-row-${p.key}`,
            onClick: R((m) => t.onRemove(p.key), ["prevent"])
          }, [...f[1] || (f[1] = [
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
      return s(), h("button", {
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
        n("span", null, _((d = $(u).reset) != null ? d : "Reset"), 1)
      ], 512);
    };
  }
}, Ea = {}, Ra = { class: "ijt-wrapper" }, Ta = { class: "ijt-wrapper__outer" }, Aa = { class: "ijt-wrapper__inner" }, Da = { class: "ijt-wrapper__container" };
function Wa(t, u) {
  return s(), h("div", Ra, [
    n("div", Ta, [
      n("div", Aa, [
        n("div", Da, [
          z(t.$slots, "default")
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
    function f(p) {
      var y, m;
      (y = l.actions.toggleColumns) != null && y.onReorder ? l.actions.toggleColumns.onReorder(p) : (m = l.actions.toggleColumns) != null && m.onChange && l.actions.toggleColumns.onChange(p);
    }
    return (p, y) => (s(), F(pe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: e
    }, {
      button: O(() => [...y[5] || (y[5] = [
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
        var m, r, w, j, v;
        return [
          n("div", Ha, [
            A(n("div", null, [
              "searchFields" in t.actions && t.actions.searchFields.show ? (s(), h("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: y[0] || (y[0] = (C) => d.value = !0)
              }, [
                y[6] || (y[6] = n("svg", {
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
                n("span", null, _((m = $(u).add_search_fields) != null ? m : "Add search field"), 1)
              ])) : b("", !0),
              "toggleColumns" in t.actions && t.actions.toggleColumns.show ? (s(), h("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: y[1] || (y[1] = (C) => c.value = !0)
              }, [
                y[7] || (y[7] = n("svg", {
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
                n("span", null, _((r = $(u).show_hide_columns) != null ? r : "Show / Hide columns"), 1)
              ])) : b("", !0),
              y[9] || (y[9] = n("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in t.actions ? (s(), h("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: y[2] || (y[2] = (...C) => {
                  var x, I;
                  return ((x = t.actions.reset) == null ? void 0 : x.onClick) && ((I = t.actions.reset) == null ? void 0 : I.onClick(...C));
                })
              }, [
                y[8] || (y[8] = n("svg", {
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
                n("span", null, _((w = $(u).grouped_reset) != null ? w : "Reset"), 1)
              ])) : b("", !0)
            ], 512), [
              [ae, !c.value && !d.value]
            ]),
            A(n("div", null, [
              n("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: y[3] || (y[3] = (C) => d.value = !1)
              }, [
                y[10] || (y[10] = n("svg", {
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
                n("span", null, _((j = $(u).add_search_fields) != null ? j : "Add search field"), 1)
              ]),
              (s(!0), h(U, null, K(t.actions.searchFields.searchInputs, (C, x) => (s(), h("button", {
                key: x,
                dusk: `add-search-row-${C.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((I) => t.actions.searchFields.onClick(C.key), ["prevent"])
              }, _(C.label), 9, Ka))), 128))
            ], 512), [
              [ae, d.value]
            ]),
            A(n("div", null, [
              n("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: y[4] || (y[4] = (C) => c.value = !1)
              }, [
                y[11] || (y[11] = n("svg", {
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
                n("span", null, _((v = $(u).show_hide_columns) != null ? v : "Show / Hide columns"), 1)
              ]),
              n("div", Ga, [
                H(lt, {
                  columns: t.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: f
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ae, c.value]
            ]),
            A(n("div", null, [
              z(p.$slots, "default")
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
  const u = S(!1), l = S(null), c = S(0), d = S(0), e = St({}), f = () => {
    const q = Mt(t) ? $(t) : t;
    return q ? `${q}-columnWidths` : null;
  }, p = () => {
    const q = f();
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
  }, y = () => {
    const q = f();
    !q || localStorage.setItem(q, JSON.stringify(e));
  }, m = (q, L) => {
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
    u.value && (u.value = !1, l.value = null, y(), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, j = (q) => e[q] || "auto", v = (q, L) => {
    e[q] = L, y();
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
  }, x = () => {
    Object.keys(e).forEach((L) => {
      delete e[L];
    });
    const q = f();
    q && localStorage.removeItem(q);
  }, I = () => {
    u.value && (document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Z(() => {
    p();
  }), me(() => {
    I();
  }), {
    isResizing: u,
    resizingColumn: l,
    columnWidths: e,
    startResize: m,
    getColumnWidth: j,
    setColumnWidth: v,
    resetColumnWidths: x,
    loadColumnWidths: p,
    saveColumnWidths: y,
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
    const l = ne(), c = qt(), d = u, e = t, f = M(() => e.localStorageName ? e.localStorageName : e.name && e.name !== "default" ? `table-${e.name}` : null);
    It();
    const p = e.resizeableColumns ? Qa(f) : null;
    Nt("columnResize", p);
    const y = S(!1), m = M(() => Ge().props.queryBuilderProps ? { ...Ge().props.queryBuilderProps[e.name] } : {}), r = S(m.value), w = M(() => r.value.columns.filter((a) => !a.hidden)), j = M(() => w.value.filter((a) => a.sortable && !C(a))), v = M(() => w.value.some((a) => a.key === "actions"));
    function C(a) {
      const o = String(a.body_class || "").split(/\s+/);
      return o.includes("hidden") || o.includes("ijt-hidden");
    }
    const x = M(() => {
      const a = r.value.sort;
      return a && a !== m.value.defaultSort ? a : "";
    }), I = M(() => Boolean(e.withInfiniteScrolling || m.value.infiniteScrolling));
    function q() {
      var a, o, i, k, g, N, B, Q, oe, de;
      return (de = (oe = (N = (i = (a = se.value) == null ? void 0 : a.next_page_url) != null ? i : (o = e.resource) == null ? void 0 : o.next_page_url) != null ? N : (g = (k = e.resource) == null ? void 0 : k.links) == null ? void 0 : g.next) != null ? oe : (Q = (B = e.resource) == null ? void 0 : B.meta) == null ? void 0 : Q.next_page_url) != null ? de : null;
    }
    const L = S([]), V = S(null), E = S(null), G = S(!1);
    let T;
    const D = M(() => m.value.pageName), W = S([]), X = S(null), ue = S(!1), ge = M(() => m.value.hasToggleableColumns || m.value.hasFilters || m.value.hasSearchInputs ? !1 : !m.value.globalSearch), le = M(() => I.value ? L.value : Object.keys(e.resource).length === 0 ? e.data : "data" in e.resource ? e.resource.data : e.resource), se = M(() => Object.keys(e.resource).length === 0 ? e.meta : "links" in e.resource && "meta" in e.resource && Object.keys(e.resource.links).length === 4 && "next" in e.resource.links && "prev" in e.resource.links ? {
      ...e.resource.meta,
      next_page_url: e.resource.links.next,
      prev_page_url: e.resource.links.prev
    } : "meta" in e.resource ? e.resource.meta : e.resource), Ie = M(() => le.value.length > 0 ? !0 : se.value.total > 0), Ne = S({
      reset: {
        onClick: be
      },
      toggleColumns: {
        show: m.value.hasToggleableColumns,
        columns: m.value.columns,
        onChange: ke
      },
      searchFields: {
        show: m.value.hasSearchInputs && !e.hideSearchInputsAboveTable,
        searchInputs: m.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: m.value.hasSearchInputsWithoutValue,
        onClick: _e
      }
    });
    function at(a) {
      W.value = W.value.filter((o) => o != a), ce(a, null);
    }
    function _e(a) {
      W.value.push(a);
    }
    const ze = M(() => {
      if (W.value.length > 0)
        return !0;
      const a = $e.parse(location.search.substring(1));
      if (a[D.value] > 1)
        return !0;
      const i = e.name === "default" ? "" : e.name + "_";
      let k = !1;
      return ee(["filter", "columns", "cursor", "sort"], (g) => {
        const N = a[i + g];
        g === "sort" && N === m.value.defaultSort || N !== void 0 && (k = !0);
      }), k;
    }), st = (a, o) => {
      let i = [];
      if (e.striped && o % 2 && i.push("ijt-table__tr--striped"), e.rowClass && typeof e.rowClass == "function") {
        const k = e.rowClass(a);
        k && i.push(k);
      }
      return i.join(" ");
    }, Fe = M(() => {
      if (!e.showExportButton)
        return null;
      const a = new URL(window.location.href);
      a.search = "";
      const o = new URLSearchParams();
      if (m.value.page && m.value.page > 1 && o.set(D.value, m.value.page), m.value.sort) {
        const g = e.name === "default" ? "sort" : `${e.name}_sort`;
        o.set(g, m.value.sort);
      }
      const i = {};
      if (r.value.filters.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (i[g.key] = g.value);
      }), r.value.searchInputs.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (i[g.key] = g.value);
      }), Object.keys(i).length > 0) {
        const g = e.name === "default" ? "filter" : `${e.name}_filter`;
        Object.keys(i).forEach((N) => {
          const B = i[N];
          Array.isArray(B) ? B.forEach((Q, oe) => {
            o.set(`${g}[${N}][${oe}]`, Q);
          }) : typeof B == "object" && B !== null ? Object.keys(B).forEach((Q) => {
            o.set(`${g}[${N}][${Q}]`, B[Q]);
          }) : o.set(`${g}[${N}]`, B);
        });
      }
      const k = r.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (k.length !== r.value.columns.length) {
        const g = e.name === "default" ? "columns" : `${e.name}_columns`;
        k.forEach((N) => {
          o.append(`${g}[]`, N);
        });
      }
      if (m.value.perPageOptions && m.value.perPageOptions.length > 0) {
        const g = new URLSearchParams(window.location.search).get("perPage") || m.value.perPageOptions[0];
        g && g !== m.value.perPageOptions[0] && o.set("perPage", g);
      }
      return o.set("do_export", "1"), o.set("table", e.name || "default"), a.search = o.toString(), a.toString();
    });
    function be() {
      W.value = [], ee(r.value.filters, (a, o) => {
        r.value.filters[o].value = null;
      }), ee(r.value.searchInputs, (a, o) => {
        r.value.searchInputs[o].value = null;
      }), ee(r.value.columns, (a, o) => {
        r.value.columns[o].hidden = a.can_be_hidden ? !m.value.defaultVisibleToggleableColumns.includes(a.key) : !1, r.value.columns[o].pinned = !1;
      }), f.value && localStorage.removeItem(`${f.value}-columns`), e.resizeableColumns && p && p.resetColumnWidths(), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
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
      if (!f.value)
        return;
      const a = r.value.columns.map((o, i) => ({
        key: o.key,
        hidden: o.hidden,
        pinned: o.pinned || !1,
        order: i
      }));
      localStorage.setItem(`${f.value}-columns`, JSON.stringify(a));
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
      let o = Wt(a, (k) => !k.hidden), i = Kt(o, (k) => k.key).sort();
      return Ht(i, m.value.defaultVisibleToggleableColumns) ? {} : i;
    }
    function ut() {
      const a = rt(), o = it(), i = {};
      Object.keys(a).length > 0 && (i.filter = a), Object.keys(o).length > 0 && (i.columns = o);
      const k = r.value.cursor, g = r.value.page, N = r.value.sort, B = r.value.perPage;
      return k && (i.cursor = k), g > 1 && (i.page = g), B > 1 && (i.perPage = B), N && (i.sort = N), i;
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
      ee(["filter", "columns", "cursor", "sort"], (k) => {
        delete a[o + k];
      }), delete a[D.value], ee(ut(), (k, g) => {
        g === "page" ? a[D.value] = k : g === "perPage" ? a.perPage = k : a[o + g] = k;
      });
      let i = $e.stringify(a, {
        filter(k, g) {
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
      var k;
      e.hasCheckboxes && ((k = a.target) == null ? void 0 : k.parentElement.cellIndex) === 0 || d("rowClicked", a, o, i);
    }
    async function vt() {
      var a, o, i, k, g;
      if (!(G.value || !V.value)) {
        G.value = !0;
        try {
          const N = await fetch(V.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!N.ok)
            throw new Error("Network response was not ok");
          const B = await N.json();
          L.value = [...L.value, ...B.data || []], V.value = (g = (k = (o = B.next_page_url) != null ? o : (a = B.links) == null ? void 0 : a.next) != null ? k : (i = B.meta) == null ? void 0 : i.next_page_url) != null ? g : null;
        } catch (N) {
          console.error("Error loading more data:", N);
        } finally {
          G.value = !1;
        }
      }
    }
    function je() {
      !I.value || !E.value || (T && (T.disconnect(), T = null), e.resource && e.resource.data && L.value.length === 0 && (L.value = [...e.resource.data], V.value = q()), T = new IntersectionObserver(
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
      I.value && (L.value = [], V.value = null), Oe(location.pathname + "?" + ct()), ue.value = !1;
    }, { deep: !0 }), J(() => e.resource, () => {
      var a;
      if (!I.value && ((a = e.resource) == null ? void 0 : a.data)) {
        const o = e.resource.data.filter((i) => i.__itSelected);
        d("selectionChanged", o);
      }
    }, { deep: !0 }), J(() => m.value, (a) => {
      var i;
      if (!I.value)
        return;
      const o = ((i = e.resource) == null ? void 0 : i.data) || [];
      if (o.length > 0) {
        L.value = [...o], V.value = q();
        const k = o.filter((g) => g.__itSelected);
        d("selectionChanged", k), setTimeout(() => {
          E.value && je();
        }, 100);
      }
    }, { deep: !0 });
    const Ee = () => {
      e.resizeableColumns && p && setTimeout(() => {
        var o;
        const a = (o = X.value) == null ? void 0 : o.querySelector("table");
        a && p.initializeColumnWidths(a);
      }, 0), I.value && setTimeout(() => {
        E.value && je();
      }, 100);
    };
    Z(() => {
      document.addEventListener("inertia:success", Ee), ht(), e.resizeableColumns && p && setTimeout(() => {
        var o;
        const a = (o = X.value) == null ? void 0 : o.querySelector("table");
        a && p.initializeColumnWidths(a);
      }, 0), I.value && je();
    });
    function ht() {
      if (!f.value)
        return;
      const a = localStorage.getItem(`${f.value}-columns`);
      if (!!a)
        try {
          const o = JSON.parse(a);
          if (o.length > 0 && "order" in o[0]) {
            const i = new Map(o.map((k) => [k.key, k]));
            r.value.columns.forEach((k, g) => {
              const N = i.get(k.key);
              N && (r.value.columns[g].hidden = N.hidden, r.value.columns[g].pinned = N.pinned || !1);
            }), r.value.columns.sort((k, g) => {
              var de, Ue;
              const N = i.get(k.key), B = i.get(g.key);
              if (k.pinned && !g.pinned)
                return -1;
              if (!k.pinned && g.pinned)
                return 1;
              const Q = (de = N == null ? void 0 : N.order) != null ? de : 999, oe = (Ue = B == null ? void 0 : B.order) != null ? Ue : 999;
              return Q - oe;
            });
          } else
            o.forEach((i, k) => {
              const g = r.value.columns.findIndex((N) => N.key === i.key);
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
      const k = r.value.searchInputs.filter(
        (g) => g.key === a
      );
      return k.length > 0 ? (i.searchable = !0, i.searchInputs = k) : (i.searchable = !1, i.searchInputs = []), i.onFilterChange = ye, i.onSearchChange = ce, i;
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
      const i = r.value.columns.filter((k) => !k.hidden);
      e.hasCheckboxes && (o += 60);
      for (const k of i) {
        if (k.key === a)
          break;
        if (k.pinned) {
          const g = p.getColumnWidth(k.key);
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
      return e.hasCheckboxes && (a += 60), m.value.columns.forEach((i) => {
        if (!Ce(i.key))
          return;
        const k = p.getColumnWidth(i.key);
        k === "auto" ? o = !0 : a += k;
      }), !o && a > 0 ? `${a}px` : "max(100%, " + (a > 0 ? a + "px" : "800px") + ")";
    }), De = M(() => le.value.filter((a) => a.__itSelected)), We = M(() => De.value.length), kt = M(() => We.value === 0 ? l.noLineSelected : `${We.value} ${l.lineSelected}`);
    function wt() {
      e.resizeableColumns && (y.value = !0);
    }
    function xt() {
      e.resizeableColumns && setTimeout(() => {
        y.value = !1;
      }, 100);
    }
    return (a, o) => (s(), F(zt, null, {
      default: O(() => [
        (s(), h("fieldset", {
          ref_key: "tableFieldset",
          ref: X,
          key: `table-${t.name}`,
          dusk: `table-${t.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": we.value }])
        }, [
          n("div", Ja, [
            m.value.globalSearch ? (s(), h("div", Za, [
              z(a.$slots, "tableGlobalSearch", {
                hasGlobalSearch: m.value.globalSearch,
                label: m.value.globalSearch ? m.value.globalSearch.label : null,
                value: m.value.globalSearch ? m.value.globalSearch.value : null,
                onChange: Pe
              }, () => [
                m.value.globalSearch ? (s(), F(Na, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: m.value.globalSearch.label,
                  value: m.value.globalSearch.value,
                  "on-change": Pe
                }, null, 8, ["label", "value"])) : b("", !0)
              ], !0)
            ])) : b("", !0),
            j.value.length ? (s(), h("div", es, [
              n("label", {
                for: `table-${t.name}-mobile-sort`,
                class: "ijt-toolbar__mobile-sort-label"
              }, _($(l).sort_by), 9, ts),
              n("select", {
                id: `table-${t.name}-mobile-sort`,
                class: "ijt-toolbar__mobile-sort-select",
                value: x.value,
                "aria-label": $(l).sort_by,
                onChange: o[0] || (o[0] = (i) => ft(i.target.value))
              }, [
                n("option", ls, _($(l).default_sort), 1),
                (s(!0), h(U, null, K(j.value, (i) => (s(), h(U, {
                  key: i.key
                }, [
                  n("option", {
                    value: i.key
                  }, _(i.label) + " (" + _($(l).ascending) + ")", 9, as),
                  n("option", {
                    value: `-${i.key}`
                  }, _(i.label) + " (" + _($(l).descending) + ")", 9, ss)
                ], 64))), 128))
              ], 40, ns)
            ])) : b("", !0),
            n("div", os, [
              n("div", null, [
                z(a.$slots, "tableFilter", {
                  hasFilters: m.value.hasFilters,
                  hasEnabledFilters: m.value.hasEnabledFilters,
                  filters: m.value.filters,
                  onFilterChange: ye
                }, () => [
                  m.value.hasFilters ? (s(), F(Ma, {
                    key: 0,
                    "has-enabled-filters": m.value.hasEnabledFilters,
                    filters: m.value.filters,
                    "on-filter-change": ye
                  }, null, 8, ["has-enabled-filters", "filters"])) : b("", !0)
                ], !0)
              ]),
              !t.withGroupedMenu && !t.hideSearchInputsAboveTable ? z(a.$slots, "tableAddSearchRow", {
                key: 0,
                hasSearchInputs: m.value.hasSearchInputs,
                hasSearchInputsWithoutValue: m.value.hasSearchInputsWithoutValue,
                searchInputs: m.value.searchInputsWithoutGlobal,
                onAdd: _e
              }, () => [
                m.value.hasSearchInputs ? (s(), F(ua, {
                  key: 0,
                  "search-inputs": m.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": m.value.hasSearchInputsWithoutValue,
                  "on-add": _e
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : b("", !0)
              ], !0) : b("", !0),
              t.withGroupedMenu ? b("", !0) : z(a.$slots, "tableColumns", {
                key: 1,
                hasColumns: m.value.hasToggleableColumns,
                columns: r.value.columns,
                hasHiddenColumns: m.value.hasHiddenColumns,
                onChange: ke
              }, () => [
                m.value.hasToggleableColumns ? (s(), F(_a, {
                  key: 0,
                  columns: r.value.columns,
                  "has-hidden-columns": m.value.hasHiddenColumns,
                  "on-change": ke,
                  "table-name": t.name
                }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : b("", !0)
              ], !0),
              t.withGroupedMenu ? z(a.$slots, "groupedAction", {
                key: 2,
                actions: Ne.value
              }, () => [
                H(Xa, { actions: Ne.value }, {
                  default: O(() => [
                    z(a.$slots, "bulk-actions", {}, void 0, !0)
                  ]),
                  _: 3
                }, 8, ["actions"])
              ], !0) : b("", !0),
              t.withGroupedMenu ? b("", !0) : z(a.$slots, "tableReset", {
                key: 3,
                canBeReset: ze.value,
                onClick: be
              }, () => [
                ze.value ? (s(), h("div", rs, [
                  H(Oa, { "on-click": be })
                ])) : b("", !0)
              ], !0),
              t.showExportButton ? z(a.$slots, "exportButton", {
                key: 4,
                exportUrl: Fe.value,
                translations: $(l)
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
              ], !0) : b("", !0)
            ])
          ]),
          t.hideSearchInputsAboveTable ? b("", !0) : z(a.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: m.value.hasSearchInputsWithValue,
            searchInputs: m.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: W.value,
            onChange: ce
          }, () => [
            m.value.hasSearchInputsWithValue || W.value.length > 0 ? (s(), F(La, {
              key: 0,
              "search-inputs": m.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": W.value,
              "on-change": ce,
              "on-remove": at
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : b("", !0)
          ], !0),
          z(a.$slots, "tableWrapper", { meta: se.value }, () => [
            H(Ua, {
              class: P({ "ijt-wrapper--mt": !ge.value })
            }, {
              default: O(() => [
                z(a.$slots, "table", {}, () => [
                  n("div", us, [
                    n("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": t.resizeableColumns && y.value }]),
                      style: Y([{ "table-layout": "fixed", "min-width": "100%" }, { width: yt.value }]),
                      onMouseenter: o[2] || (o[2] = (i) => t.resizeableColumns ? wt : null),
                      onMouseleave: o[3] || (o[3] = (i) => t.resizeableColumns ? xt : null)
                    }, [
                      n("thead", cs, [
                        z(a.$slots, "head", {
                          show: Ce,
                          sortBy: Re,
                          header: he
                        }, () => [
                          n("tr", ds, [
                            t.hasCheckboxes ? (s(), h("th", vs, [
                              n("label", {
                                for: `table-${t.name}-select-header`,
                                class: "ijt-sr-only"
                              }, _($(l).select_row), 9, hs),
                              A(n("input", {
                                type: "checkbox",
                                id: `table-${t.name}-select-header`,
                                onChange: pt,
                                "onUpdate:modelValue": o[1] || (o[1] = (i) => ue.value = i),
                                class: "ijt-table__checkbox",
                                "aria-label": $(l).select_row
                              }, null, 40, fs), [
                                [Ke, ue.value]
                              ])
                            ])) : b("", !0),
                            (s(!0), h(U, null, K(r.value.columns, (i) => (s(), F(Al, {
                              cell: he(i.key),
                              style: Y(bt(i.key))
                            }, {
                              label: O(() => [
                                z(a.$slots, `header(${i.key})`, {
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
                        z(a.$slots, "body", { show: Ce }, () => [
                          (s(!0), h(U, null, K(le.value, (i, k) => (s(), h("tr", {
                            key: `table-${t.name}-row-${k}`,
                            class: P(["ijt-table__tr", [st(i, k), {
                              "ijt-table__tr--has-actions": v.value,
                              "ijt-table__tr--has-checkboxes": t.hasCheckboxes,
                              "ijt-table__tr--has-card-controls": v.value || t.hasCheckboxes
                            }]])
                          }, [
                            t.hasCheckboxes ? (s(), h("td", {
                              key: 0,
                              class: "ijt-table__td ijt-table__td--pinned-checkbox",
                              style: { width: "60px" },
                              "data-column-label": $(l).select_row
                            }, [
                              n("div", gs, _($(l).select_row), 1),
                              n("div", _s, [
                                n("label", {
                                  for: `table-${t.name}-select-${k}`,
                                  class: "ijt-sr-only"
                                }, _($(l).select_row), 9, bs),
                                A(n("input", {
                                  type: "checkbox",
                                  id: `table-${t.name}-select-${k}`,
                                  class: "ijt-table__checkbox",
                                  "onUpdate:modelValue": (g) => i.__itSelected = g,
                                  "aria-label": $(l).select_row
                                }, null, 8, ys), [
                                  [Ke, i.__itSelected]
                                ])
                              ])
                            ], 8, ps)) : b("", !0),
                            (s(!0), h(U, null, K(w.value, (g) => (s(), h("td", {
                              key: `table-${t.name}-row-${k}-column-${g.key}`,
                              onClick: (N) => dt(N, i, g.key),
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
                                z(a.$slots, `cell(${g.key})`, { item: i }, () => [
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
                I.value ? b("", !0) : z(a.$slots, "pagination", {
                  key: 0,
                  onClick: Le,
                  hasData: Ie.value,
                  meta: se.value,
                  perPageOptions: m.value.perPageOptions,
                  onPerPageChange: Be,
                  showExportButton: t.showExportButton
                }, () => [
                  n("div", js, [
                    t.hasCheckboxes ? (s(), h("span", Cs, _(kt.value), 1)) : b("", !0),
                    H(oa, {
                      "on-click": Le,
                      "has-data": Ie.value,
                      meta: se.value,
                      "per-page-options": m.value.perPageOptions,
                      "on-per-page-change": Be,
                      "show-export-button": t.showExportButton
                    }, {
                      exportButton: O((i) => [
                        z(a.$slots, "exportButton", Ft(Vt(i)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                I.value && G.value ? (s(), h("div", $s, [...o[5] || (o[5] = [
                  n("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : b("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          I.value ? (s(), h("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: E,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : b("", !0),
          z(a.$slots, "tableSummary", {
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
  Na as TableGlobalSearch,
  Oa as TableReset,
  La as TableSearchRows,
  Ua as TableWrapper,
  ne as getTranslations,
  Hs as setTranslation,
  Ks as setTranslations
};
