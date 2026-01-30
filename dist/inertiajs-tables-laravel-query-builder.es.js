import { ref as $, onMounted as Q, onBeforeUnmount as ft, openBlock as r, createElementBlock as f, renderSlot as I, watch as X, createBlock as N, withCtx as P, createElementVNode as t, normalizeClass as V, withModifiers as O, withDirectives as E, vShow as ee, createStaticVNode as ht, normalizeStyle as G, toDisplayString as b, createCommentVNode as y, createTextVNode as te, computed as q, unref as S, vModelSelect as We, vModelText as se, watchEffect as mt, onUnmounted as ve, Teleport as de, Fragment as U, renderList as H, createVNode as A, withKeys as Ee, nextTick as De, inject as pt, resolveDynamicComponent as ae, reactive as gt, isRef as _t, getCurrentInstance as bt, provide as yt, Transition as kt, vModelCheckbox as Re, normalizeProps as wt, guardReactiveProps as xt } from "vue";
import { createPopper as jt } from "@popperjs/core/lib/popper-lite";
import Ct from "@popperjs/core/lib/modifiers/preventOverflow";
import $t from "@popperjs/core/lib/modifiers/flip";
import { createPopper as St } from "@popperjs/core";
import Mt from "lodash-es/uniq";
import qt from "vuedraggable";
import zt from "lodash-es/find";
import xe from "qs";
import It from "lodash-es/clone";
import Nt from "lodash-es/filter";
import Ft from "lodash-es/findKey";
import Z from "lodash-es/forEach";
import Vt from "lodash-es/isEqual";
import Pt from "lodash-es/map";
import Bt from "lodash-es/pickBy";
import { usePage as Te, router as Lt } from "@inertiajs/vue3";
const Ot = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const u = e, a = $(null), c = $(null);
    return Q(() => {
      a.value = (n) => {
        n.target === c.value || c.value.contains(n.target) || u.do();
      }, document.addEventListener("click", a.value), document.addEventListener("touchstart", a.value);
    }), ft(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (n, l) => (r(), f("div", {
      ref_key: "root",
      ref: c
    }, [
      I(n.$slots, "default")
    ], 512));
  }
}, Et = { class: "ijt-dropdown" }, Rt = ["dusk", "disabled"], fe = {
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
  setup(e, { expose: u, emit: a }) {
    const c = a, n = e, l = $(!1), d = $(null);
    function p() {
      l.value = !l.value;
    }
    function s() {
      l.value = !1;
    }
    X(l, () => {
      d.value.update(), l.value || c("closed"), l.value && c("opened");
    });
    const v = $(null), k = $(null);
    return Q(() => {
      d.value = jt(v.value, k.value, {
        placement: n.placement,
        modifiers: [$t, Ct]
      });
    }), u({ hide: s }), (w, m) => (r(), N(Ot, { do: s }, {
      default: P(() => [
        t("div", Et, [
          t("button", {
            ref_key: "button",
            ref: v,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: V(["ijt-dropdown__trigger", { "ijt-dropdown__trigger--disabled": e.disabled }]),
            "aria-haspopup": "true",
            onClick: O(p, ["prevent"])
          }, [
            I(w.$slots, "button")
          ], 10, Rt),
          E(t("div", {
            ref_key: "tooltip",
            ref: k,
            class: "ijt-dropdown__panel"
          }, [
            I(w.$slots, "default")
          ], 512), [
            [ee, l.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, Tt = {
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
  setup(e) {
    const u = e, a = (c) => {
      u.onResize(c, u.columnKey);
    };
    return (c, n) => (r(), f("div", {
      class: V(["ijt-resize-handle", {
        "ijt-resize-handle--active": e.isActive,
        "ijt-resize-handle--visible": e.isActive
      }]),
      onMousedown: a
    }, [...n[0] || (n[0] = [
      ht('<div class="ijt-resize-handle__separator"></div><div class="ijt-resize-handle__grip"><div class="ijt-resize-handle__grip-dots"><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div></div></div>', 2)
    ])], 34));
  }
}, At = { class: "ijt-toggle-filter" }, Wt = { class: "ijt-toggle-filter__switch" }, Dt = ["checked"], Ue = {
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
  setup(e) {
    return (u, a) => (r(), f("div", At, [
      t("label", Wt, [
        t("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (c) => e.onFilterChange(e.filter.key, c.target.checked ? "1" : "0"))
        }, null, 40, Dt),
        t("div", {
          class: V(["ijt-toggle-filter__track", {
            "ijt-toggle-filter__track--on": e.filter.value === "1" || e.filter.value === 1 || e.filter.value === !0,
            "ijt-toggle-filter__track--off": e.filter.value === "0" || e.filter.value === 0 || e.filter.value === !1,
            "ijt-toggle-filter__track--disabled": e.filter.value === null
          }])
        }, null, 2)
      ]),
      t("button", {
        class: "ijt-toggle-filter__reset",
        onClick: a[1] || (a[1] = O((c) => e.onFilterChange(e.filter.key, null), ["prevent"]))
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
const je = (e, u) => {
  const a = e.__vccOpts || e;
  for (const [c, n] of u)
    a[c] = n;
  return a;
}, Ut = {
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
          let e = Number(Math.min(...this.internalValue));
          if (Number.isNaN(e))
            throw !0;
          return this.checkedValue(e);
        } else
          throw !0;
      } catch {
        return console.error("Malformed model value. You need to have an array of 2 number"), Number(this.min);
      }
    },
    currentMaxValue() {
      try {
        if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
          let e = Number(Math.max(...this.internalValue));
          if (Number.isNaN(e))
            throw !0;
          return this.checkedValue(e);
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
    getMarginTop(e) {
      let a = 4;
      return e ? `margin-top: ${(a - 4 + 12) * 0.25}rem` : `margin-top: -${((a - 4) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(e) {
      return e < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : e > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : e;
    },
    detectIfOverlap() {
      let e = this.$refs.popover_min.getClientRects()[0], u = this.$refs.popover_max.getClientRects()[0];
      e && u && (this.hasOverlap = e.right > u.left);
    },
    handleMouseDown(e, u) {
      this.moveMin = u, this.moveMax = !u, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      let c = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), n = Number(Math.round(c / this.step) * this.step).toFixed(2);
      n >= this.min && n <= this.max && (this.moveMin && n !== this.currentMinValue && n <= this.currentMaxValue && (this.internalValue = [n, this.currentMaxValue]), this.moveMax && n !== this.currentMaxValue && n >= this.currentMinValue && (this.internalValue = [this.currentMinValue, n])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    }
  }
}, Ht = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, Kt = { class: "ijt-range-filter__container" }, Gt = { class: "ijt-range-filter__track" }, Xt = { style: { "z-index": "40" } }, Qt = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, Yt = { key: 0 }, Jt = { key: 1 }, Zt = { style: { "z-index": "40" } }, en = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, tn = { key: 0 }, nn = { key: 1 }, ln = { draggable: "true" }, an = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, sn = { key: 0 }, on = { key: 1 }, rn = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, un = { key: 0 }, cn = { key: 1 };
function dn(e, u, a, c, n, l) {
  var d, p, s, v;
  return r(), f("div", Ht, [
    t("div", Kt, [
      t("div", Gt, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: G(`width: ${l.rangeWidth}% !important; left: ${l.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: G(`left: ${l.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (k) => l.handleMouseDown(k, !0))
        }, [
          t("div", Xt, [
            t("div", Qt, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: G(l.getMarginTop(n.hasOverlap && l.displayFirstDown))
              }, [
                a.prefix ? (r(), f("span", Yt, b(a.prefix), 1)) : y("", !0),
                te(" " + b((d = l.currentMinValue) != null ? d : 0) + " ", 1),
                a.suffix ? (r(), f("span", Jt, b(a.suffix), 1)) : y("", !0)
              ], 4),
              (r(), f("svg", {
                class: V(["ijt-range-filter__popover-arrow", [n.hasOverlap && l.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
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
          style: G(`left: ${l.currentMaxValueInPercent}%;`),
          onMousedown: u[1] || (u[1] = (k) => l.handleMouseDown(k, !1))
        }, [
          t("div", Zt, [
            t("div", en, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: G(l.getMarginTop(n.hasOverlap && !l.displayFirstDown))
              }, [
                a.prefix ? (r(), f("span", tn, b(a.prefix), 1)) : y("", !0),
                te(" " + b((p = l.currentMaxValue) != null ? p : 0) + " ", 1),
                a.suffix ? (r(), f("span", nn, b(a.suffix), 1)) : y("", !0)
              ], 4),
              t("div", ln, [
                (r(), f("svg", {
                  class: V(["ijt-range-filter__popover-arrow", [n.hasOverlap && !l.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
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
        t("div", an, [
          a.prefix ? (r(), f("span", sn, b(a.prefix), 1)) : y("", !0),
          te(" " + b((s = a.min) != null ? s : 0) + " ", 1),
          a.suffix ? (r(), f("span", on, b(a.suffix), 1)) : y("", !0)
        ]),
        t("div", rn, [
          a.prefix ? (r(), f("span", un, b(a.prefix), 1)) : y("", !0),
          te(" " + b((v = a.max) != null ? v : 0) + " ", 1),
          a.suffix ? (r(), f("span", cn, b(a.suffix), 1)) : y("", !0)
        ])
      ])
    ])
  ], 512);
}
const He = /* @__PURE__ */ je(Ut, [["render", dn], ["__scopeId", "data-v-b8d9c6c5"]]), Ce = {
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
    grouped_reset: "Reset"
  }
};
function ne() {
  return Ce.translations;
}
function ys(e, u) {
  Ce.translations[e] = u;
}
function ks(e) {
  Ce.translations = e;
}
const vn = { class: "ijt-number-filter" }, fn = { class: "ijt-number-filter__label" }, hn = { value: "" }, mn = { value: "exact" }, pn = { value: "less_than" }, gn = { value: "greater_than" }, _n = { value: "less_than_or_equal" }, bn = { value: "greater_than_or_equal" }, yn = { value: "between" }, kn = { key: 0 }, wn = { key: 0 }, xn = { class: "ijt-number-filter__label" }, jn = { class: "ijt-number-filter__input-wrapper" }, Cn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, $n = ["step"], Sn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Mn = { key: 1 }, qn = { style: { "margin-bottom": "0.75rem" } }, zn = { class: "ijt-number-filter__label" }, In = { class: "ijt-number-filter__input-wrapper" }, Nn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Fn = ["step"], Vn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Pn = { class: "ijt-number-filter__label" }, Bn = { class: "ijt-number-filter__input-wrapper" }, Ln = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, On = ["step"], En = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Rn = {
  key: 1,
  class: "ijt-number-filter__reset"
}, Tn = { class: "ijt-sr-only" }, Ke = {
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
  setup(e) {
    const u = e, a = ne(), c = $(""), n = $(""), l = $(""), d = $(""), p = q(() => c.value !== "" && (c.value !== "between" && n.value !== "" && n.value !== null || c.value === "between" && l.value !== "" && l.value !== null && d.value !== "" && d.value !== null));
    function s() {
      switch (c.value) {
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
    function v() {
      n.value = "", l.value = "", d.value = "", c.value === "" ? w() : k();
    }
    function k() {
      if (c.value === "")
        return;
      let m = null;
      switch (c.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          n.value !== "" && n.value !== null && (m = {
            type: c.value,
            number: n.value
          });
          break;
        case "between":
          l.value !== "" && l.value !== null && d.value !== "" && d.value !== null && (m = {
            type: c.value,
            start_number: l.value,
            end_number: d.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, m);
    }
    function w() {
      c.value = "", n.value = "", l.value = "", d.value = "", u.onFilterChange(u.filter.key, null);
    }
    return Q(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_number || "", d.value = m.end_number || "") : n.value = m.number || "");
      }
    }), X(() => u.filter.value, (m) => {
      m ? m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_number || "", d.value = m.end_number || "") : n.value = m.number || "") : w();
    }, { deep: !0 }), (m, g) => (r(), f("div", vn, [
      t("div", null, [
        t("label", fn, b(S(a).filter_type), 1),
        E(t("select", {
          "onUpdate:modelValue": g[0] || (g[0] = (j) => c.value = j),
          class: "ijt-select",
          onChange: v
        }, [
          t("option", hn, b(S(a).no_filter), 1),
          t("option", mn, b(S(a).exact_number), 1),
          t("option", pn, b(S(a).less_than), 1),
          t("option", gn, b(S(a).greater_than), 1),
          t("option", _n, b(S(a).less_than_or_equal), 1),
          t("option", bn, b(S(a).greater_than_or_equal), 1),
          t("option", yn, b(S(a).number_range), 1)
        ], 544), [
          [We, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (r(), f("div", kn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(c.value) ? (r(), f("div", wn, [
          t("label", xn, b(s()), 1),
          t("div", jn, [
            e.filter.prefix ? (r(), f("span", Cn, b(e.filter.prefix), 1)) : y("", !0),
            E(t("input", {
              type: "number",
              "onUpdate:modelValue": g[1] || (g[1] = (j) => n.value = j),
              step: e.filter.step || 1,
              class: "ijt-input",
              onInput: k,
              placeholder: "0"
            }, null, 40, $n), [
              [
                se,
                n.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (r(), f("span", Sn, b(e.filter.suffix), 1)) : y("", !0)
          ])
        ])) : y("", !0),
        c.value === "between" ? (r(), f("div", Mn, [
          t("div", qn, [
            t("label", zn, b(S(a).start_number), 1),
            t("div", In, [
              e.filter.prefix ? (r(), f("span", Nn, b(e.filter.prefix), 1)) : y("", !0),
              E(t("input", {
                type: "number",
                "onUpdate:modelValue": g[2] || (g[2] = (j) => l.value = j),
                step: e.filter.step || 1,
                class: "ijt-input",
                onInput: k,
                placeholder: "0"
              }, null, 40, Fn), [
                [
                  se,
                  l.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (r(), f("span", Vn, b(e.filter.suffix), 1)) : y("", !0)
            ])
          ]),
          t("div", null, [
            t("label", Pn, b(S(a).end_number), 1),
            t("div", Bn, [
              e.filter.prefix ? (r(), f("span", Ln, b(e.filter.prefix), 1)) : y("", !0),
              E(t("input", {
                type: "number",
                "onUpdate:modelValue": g[3] || (g[3] = (j) => d.value = j),
                step: e.filter.step || 1,
                class: "ijt-input",
                onInput: k,
                placeholder: "0"
              }, null, 40, On), [
                [
                  se,
                  d.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (r(), f("span", En, b(e.filter.suffix), 1)) : y("", !0)
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      p.value ? (r(), f("div", Rn, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          t("span", Tn, b(S(a).reset_filter), 1),
          g[4] || (g[4] = t("svg", {
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
      ])) : y("", !0)
    ]));
  }
}, An = { class: "ijt-date-filter" }, Wn = { class: "ijt-date-filter__label" }, Dn = { value: "" }, Un = { value: "exact" }, Hn = { value: "before" }, Kn = { value: "after" }, Gn = { value: "between" }, Xn = { key: 0 }, Qn = { key: 0 }, Yn = { class: "ijt-date-filter__label" }, Jn = { key: 1 }, Zn = { style: { "margin-bottom": "0.75rem" } }, el = { class: "ijt-date-filter__label" }, tl = { class: "ijt-date-filter__label" }, nl = {
  key: 1,
  class: "ijt-date-filter__reset"
}, ll = { class: "ijt-sr-only" }, Ge = {
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
  setup(e) {
    const u = e, a = ne(), c = $(""), n = $(""), l = $(""), d = $(""), p = q(() => c.value !== "" && (c.value !== "between" && n.value || c.value === "between" && l.value && d.value));
    function s() {
      switch (c.value) {
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
    function v() {
      n.value = "", l.value = "", d.value = "", c.value === "" ? w() : k();
    }
    function k() {
      if (c.value === "")
        return;
      let m = null;
      switch (c.value) {
        case "exact":
        case "before":
        case "after":
          n.value && (m = {
            type: c.value,
            date: n.value
          });
          break;
        case "between":
          l.value && d.value && (m = {
            type: c.value,
            start_date: l.value,
            end_date: d.value
          });
          break;
      }
      u.onFilterChange(u.filter.key, m);
    }
    function w() {
      c.value = "", n.value = "", l.value = "", d.value = "", u.onFilterChange(u.filter.key, null);
    }
    return Q(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_date || "", d.value = m.end_date || "") : n.value = m.date || "");
      }
    }), X(() => u.filter.value, (m) => {
      m ? m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_date || "", d.value = m.end_date || "") : n.value = m.date || "") : w();
    }, { deep: !0 }), (m, g) => (r(), f("div", An, [
      t("div", null, [
        t("label", Wn, b(S(a).filter_type), 1),
        E(t("select", {
          "onUpdate:modelValue": g[0] || (g[0] = (j) => c.value = j),
          class: "ijt-select",
          onChange: v
        }, [
          t("option", Dn, b(S(a).no_filter), 1),
          t("option", Un, b(S(a).exact_date), 1),
          t("option", Hn, b(S(a).before_date), 1),
          t("option", Kn, b(S(a).after_date), 1),
          t("option", Gn, b(S(a).date_range), 1)
        ], 544), [
          [We, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (r(), f("div", Xn, [
        ["exact", "before", "after"].includes(c.value) ? (r(), f("div", Qn, [
          t("label", Yn, b(s()), 1),
          E(t("input", {
            type: "date",
            "onUpdate:modelValue": g[1] || (g[1] = (j) => n.value = j),
            class: "ijt-input",
            onChange: k
          }, null, 544), [
            [se, n.value]
          ])
        ])) : y("", !0),
        c.value === "between" ? (r(), f("div", Jn, [
          t("div", Zn, [
            t("label", el, b(S(a).start_date), 1),
            E(t("input", {
              type: "date",
              "onUpdate:modelValue": g[2] || (g[2] = (j) => l.value = j),
              class: "ijt-input",
              onChange: k
            }, null, 544), [
              [se, l.value]
            ])
          ]),
          t("div", null, [
            t("label", tl, b(S(a).end_date), 1),
            E(t("input", {
              type: "date",
              "onUpdate:modelValue": g[3] || (g[3] = (j) => d.value = j),
              class: "ijt-input",
              onChange: k
            }, null, 544), [
              [se, d.value]
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      p.value ? (r(), f("div", nl, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          t("span", ll, b(S(a).reset_filter), 1),
          g[4] || (g[4] = t("svg", {
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
      ])) : y("", !0)
    ]));
  }
};
function Xe(e) {
  let u = $(null), a = $(null);
  return Q(() => {
    mt((c) => {
      if (!a.value || !u.value)
        return;
      let n = a.value.el || a.value, l = u.value.el || u.value;
      if (!(l instanceof HTMLElement) || !(n instanceof HTMLElement))
        return;
      let { destroy: d } = St(l, n, e);
      c(d);
    });
  }), [u, a];
}
const al = { class: "ijt-filter" }, sl = ["dusk"], ol = { class: "ijt-dropdown__header" }, rl = { class: "ijt-dropdown__content" }, il = ["name", "value", "onChange"], ul = ["value"], cl = {
  key: 2,
  style: { "min-width": "300px" }
}, dl = {
  key: 3,
  style: { "min-width": "250px" }
}, vl = {
  key: 4,
  style: { "min-width": "300px" }
}, fl = {
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
  setup(e) {
    const u = e, a = $(!1), [c, n] = Xe({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), l = q(() => u.filters.filter((g) => g.key === u.columnKey || g.key.startsWith(u.columnKey + "_") || g.key.includes(u.columnKey))), d = q(() => l.value.some((g) => !v(g)));
    function p() {
      l.value.length > 0 && (a.value = !a.value);
    }
    function s() {
      a.value = !1;
    }
    function v(g) {
      if (g.value === null)
        return !0;
      switch (g.type) {
        case "number_range":
          return Number(Math.max(...g.value)) === Number(g.max) && Number(Math.min(...g.value)) === Number(g.min);
        case "select":
          return g.value === "";
        case "toggle":
          return !1;
        case "date":
          return !g.value || typeof g.value == "object" && !g.value.type;
        default:
          return !g.value;
      }
    }
    function k(g, j) {
      u.onFilterChange(g, j);
    }
    function w(g) {
      let j = g.value;
      g.value && (Number(Math.max(...g.value)) === Number(g.max) && Number(Math.min(...g.value)) === Number(g.min) ? j = null : Number(Math.min(...g.value)) === 0 && Number(Math.max(...g.value)) === 0 && (j = ["0", "0"])), u.onFilterChange(g.key, j);
    }
    function m(g) {
      n.value && !n.value.contains(g.target) && !g.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && s();
    }
    return Q(() => {
      document.addEventListener("click", m);
    }), ve(() => {
      document.removeEventListener("click", m);
    }), (g, j) => (r(), f("div", al, [
      t("button", {
        ref_key: "trigger",
        ref: c,
        onClick: p,
        class: V(["ijt-filter__button", { "ijt-filter__button--active": d.value }]),
        dusk: `column-filter-${e.columnKey}`
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
      ])], 10, sl),
      (r(), N(de, { to: "body" }, [
        a.value ? (r(), f("div", {
          key: 0,
          ref_key: "container",
          ref: n,
          class: "ijt-filter__dropdown",
          style: { "z-index": "9999" },
          onClick: j[0] || (j[0] = O(() => {
          }, ["stop"]))
        }, [
          (r(!0), f(U, null, H(l.value, (C) => (r(), f("div", {
            key: C.key
          }, [
            t("h3", ol, b(C.label), 1),
            t("div", rl, [
              C.type === "select" ? (r(), f("select", {
                key: 0,
                name: C.key,
                value: C.value,
                class: "ijt-select",
                onChange: (z) => k(C.key, z.target.value)
              }, [
                (r(!0), f(U, null, H(C.options, (z, M) => (r(), f("option", {
                  key: M,
                  value: M
                }, b(z), 9, ul))), 128))
              ], 40, il)) : y("", !0),
              C.type === "toggle" ? (r(), N(Ue, {
                key: 1,
                filter: C,
                "on-filter-change": k
              }, null, 8, ["filter"])) : y("", !0),
              C.type === "number" ? (r(), f("div", cl, [
                A(Ke, {
                  filter: C,
                  "on-filter-change": k
                }, null, 8, ["filter"])
              ])) : y("", !0),
              C.type === "number_range" ? (r(), f("div", dl, [
                A(He, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [(z) => C.value = z, (z) => w(C)],
                  max: C.max,
                  min: C.min,
                  prefix: C.prefix,
                  suffix: C.suffix,
                  step: C.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              C.type === "date" ? (r(), f("div", vl, [
                A(Ge, {
                  filter: C,
                  "on-filter-change": k
                }, null, 8, ["filter"])
              ])) : y("", !0)
            ])
          ]))), 128))
        ], 512)) : y("", !0)
      ])),
      (r(), N(de, { to: "body" }, [
        a.value ? (r(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: s
        })) : y("", !0)
      ]))
    ]));
  }
}, hl = { class: "ijt-filter" }, ml = ["dusk"], pl = { class: "ijt-column-search__header" }, gl = { class: "ijt-column-search__content" }, _l = ["value", "placeholder"], bl = {
  key: 0,
  class: "ijt-column-search__reset"
}, yl = { class: "ijt-sr-only" }, kl = {
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
  setup(e) {
    const u = e, a = ne(), c = $(!1), n = $(null), [l, d] = Xe({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = q(() => u.searchInputs.find((C) => C.key === u.columnKey)), s = q(() => p.value && p.value.value || ""), v = q(() => s.value !== "");
    async function k() {
      p.value && (c.value = !c.value, c.value && (await De(), n.value && n.value.focus()));
    }
    function w() {
      c.value = !1;
    }
    function m(C) {
      const z = C.target.value;
      g(z);
    }
    function g(C) {
      u.onSearchChange(u.columnKey, C);
    }
    function j(C) {
      d.value && !d.value.contains(C.target) && !C.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Q(() => {
      document.addEventListener("click", j);
    }), ve(() => {
      document.removeEventListener("click", j);
    }), (C, z) => (r(), f("div", hl, [
      t("button", {
        ref_key: "trigger",
        ref: l,
        onClick: k,
        class: V(["ijt-filter__button", { "ijt-filter__button--active": v.value }]),
        dusk: `column-search-${e.columnKey}`
      }, [...z[2] || (z[2] = [
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
      ])], 10, ml),
      (r(), N(de, { to: "body" }, [
        c.value ? (r(), f("div", {
          key: 0,
          ref_key: "container",
          ref: d,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: z[1] || (z[1] = O(() => {
          }, ["stop"]))
        }, [
          t("h3", pl, b(S(a).search) + " " + b(e.columnLabel), 1),
          t("div", gl, [
            t("input", {
              ref_key: "searchInput",
              ref: n,
              type: "text",
              value: s.value,
              class: "ijt-column-search__input",
              placeholder: `${S(a).search} ${e.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                Ee(w, ["enter"]),
                Ee(w, ["escape"])
              ]
            }, null, 40, _l),
            s.value && s.value !== "" ? (r(), f("div", bl, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: z[0] || (z[0] = (M) => g(""))
              }, [
                t("span", yl, b(S(a).reset), 1),
                z[3] || (z[3] = t("svg", {
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
            ])) : y("", !0)
          ])
        ], 512)) : y("", !0)
      ])),
      (r(), N(de, { to: "body" }, [
        c.value ? (r(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: w
        })) : y("", !0)
      ]))
    ]));
  }
}, wl = ["data-column-key"], xl = { class: "ijt-table__th-content" }, jl = { class: "ijt-table__th-label" }, Cl = ["sorted"], $l = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Sl = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Ml = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, ql = { class: "ijt-table__th-actions" }, zl = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const u = e, a = pt("columnResize", null), c = q(() => {
      if (!a)
        return "auto";
      const s = a.getColumnWidth(u.cell.key);
      return s === "auto" ? s : `${s}px`;
    }), n = q(() => (a == null ? void 0 : a.isResizing) || !1), l = q(() => (a == null ? void 0 : a.resizingColumn) || null);
    function d() {
      u.cell.sortable && u.cell.onSort(u.cell.key);
    }
    function p(s, v) {
      a && a.startResize(s, v);
    }
    return (s, v) => E((r(), f("th", {
      class: V(["ijt-table__th", e.cell.header_class]),
      style: G({ width: c.value }),
      "data-column-key": e.cell.key
    }, [
      (r(), N(ae(e.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: O(d, ["prevent"])
      }, {
        default: P(() => [
          t("span", xl, [
            t("span", jl, [
              I(s.$slots, "label", {}, () => [
                t("span", null, b(e.cell.label), 1)
              ]),
              I(s.$slots, "sort", {}, () => [
                e.cell.sortable ? (r(), f("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: V(["ijt-sort-icon", {
                    "ijt-sort-icon--active": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? y("", !0) : (r(), f("path", $l)),
                  e.cell.sorted === "asc" ? (r(), f("path", Sl)) : y("", !0),
                  e.cell.sorted === "desc" ? (r(), f("path", Ml)) : y("", !0)
                ], 10, Cl)) : y("", !0)
              ])
            ]),
            t("span", ql, [
              I(s.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (r(), N(kl, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  onClick: v[0] || (v[0] = O(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : y("", !0)
              ]),
              I(s.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (r(), N(fl, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  onClick: v[1] || (v[1] = O(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change"])) : y("", !0)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && S(a) ? (r(), N(Tt, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": p,
        "is-active": n.value && l.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : y("", !0)
    ], 14, wl)), [
      [ee, !e.cell.hidden]
    ]);
  }
}, Il = ["dusk", "value"], Nl = ["value"], Ae = {
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
  setup(e) {
    const u = ne(), a = e, c = q(() => {
      let n = [...a.options];
      return n.push(parseInt(a.value)), Mt(n).sort((l, d) => l - d);
    });
    return (n, l) => (r(), f("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: "ijt-per-page",
      onChange: l[0] || (l[0] = (d) => e.onChange(d.target.value))
    }, [
      (r(!0), f(U, null, H(c.value, (d) => (r(), f("option", {
        key: d,
        value: d
      }, b(d) + " " + b(S(u).per_page), 9, Nl))), 128))
    ], 40, Il));
  }
}, Fl = {
  key: 0,
  class: "ijt-pagination"
}, Vl = {
  key: 0,
  class: "ijt-no-results"
}, Pl = { class: "ijt-sm-inline ijt-hidden" }, Bl = { class: "ijt-sm-inline ijt-hidden" }, Ll = {
  key: 2,
  class: "ijt-pagination--full"
}, Ol = { class: "ijt-pagination__left" }, El = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, Rl = { class: "ijt-pagination__info-highlight" }, Tl = { class: "ijt-pagination__info-highlight" }, Al = { class: "ijt-pagination__info-highlight" }, Wl = { class: "ijt-pagination__right" }, Dl = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, Ul = { class: "ijt-sr-only" }, Hl = { class: "ijt-pagination__button-text" }, Kl = { class: "ijt-sr-only" }, Gl = {
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
  setup(e) {
    const u = ne(), a = e, c = q(() => "links" in l.value ? l.value.links.length > 0 : !1), n = q(() => Object.keys(l.value).length > 0), l = q(() => a.meta), d = q(() => "prev_page_url" in l.value ? l.value.prev_page_url : null), p = q(() => "next_page_url" in l.value ? l.value.next_page_url : null), s = q(() => parseInt(l.value.per_page));
    return (v, k) => n.value ? (r(), f("nav", Fl, [
      !e.hasData || l.value.total < 1 ? (r(), f("p", Vl, b(S(u).no_results_found), 1)) : y("", !0),
      e.hasData ? (r(), f("div", {
        key: 1,
        class: V(["ijt-pagination--simple", { "ijt-pagination--has-links": c.value }])
      }, [
        (r(), N(ae(d.value ? "a" : "div"), {
          class: V([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !d.value
            }
          ]),
          href: d.value,
          dusk: d.value ? "pagination-simple-previous" : null,
          onClick: k[0] || (k[0] = O((w) => e.onClick(d.value), ["prevent"]))
        }, {
          default: P(() => [
            k[4] || (k[4] = t("svg", {
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
            t("span", Pl, b(S(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        A(Ae, {
          dusk: "per-page-mobile",
          value: s.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (r(), N(ae(p.value ? "a" : "div"), {
          class: V([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !p.value
            }
          ]),
          href: p.value,
          dusk: p.value ? "pagination-simple-next" : null,
          onClick: k[1] || (k[1] = O((w) => e.onClick(p.value), ["prevent"]))
        }, {
          default: P(() => [
            t("span", Bl, b(S(u).next), 1),
            k[5] || (k[5] = t("svg", {
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
      ], 2)) : y("", !0),
      e.hasData && c.value ? (r(), f("div", Ll, [
        t("div", Ol, [
          A(Ae, {
            dusk: "per-page-full",
            value: s.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", El, [
            t("span", Rl, b(l.value.from), 1),
            te(" " + b(S(u).to) + " ", 1),
            t("span", Tl, b(l.value.to), 1),
            te(" " + b(S(u).of) + " ", 1),
            t("span", Al, b(l.value.total), 1),
            te(" " + b(S(u).results), 1)
          ])
        ]),
        t("div", Wl, [
          t("nav", Dl, [
            (r(), N(ae(d.value ? "a" : "div"), {
              class: V([
                "ijt-pagination__button",
                "ijt-pagination__button--first",
                {
                  "ijt-pagination__button--disabled": !d.value
                }
              ]),
              href: d.value,
              dusk: d.value ? "pagination-previous" : null,
              onClick: k[2] || (k[2] = O((w) => e.onClick(d.value), ["prevent"]))
            }, {
              default: P(() => [
                t("span", Ul, b(S(u).previous), 1),
                k[6] || (k[6] = t("svg", {
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
            (r(!0), f(U, null, H(l.value.links, (w, m) => (r(), f("div", { key: m }, [
              I(v.$slots, "link", {}, () => [
                !isNaN(w.label) || w.label === "..." ? (r(), N(ae(w.url ? "a" : "div"), {
                  key: 0,
                  href: w.url,
                  dusk: w.url ? `pagination-${w.label}` : null,
                  class: V(["ijt-pagination__button", {
                    "ijt-pagination__button--disabled": !w.url,
                    "ijt-pagination__button--active": w.active
                  }]),
                  onClick: O((g) => e.onClick(w.url), ["prevent"])
                }, {
                  default: P(() => [
                    t("span", Hl, b(w.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : y("", !0)
              ])
            ]))), 128)),
            (r(), N(ae(p.value ? "a" : "div"), {
              class: V([
                "ijt-pagination__button",
                "ijt-pagination__button--last",
                {
                  "ijt-pagination__button--disabled": !p.value
                }
              ]),
              href: p.value,
              dusk: p.value ? "pagination-next" : null,
              onClick: k[3] || (k[3] = O((w) => e.onClick(p.value), ["prevent"]))
            }, {
              default: P(() => [
                t("span", Kl, b(S(u).next), 1),
                k[7] || (k[7] = t("svg", {
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
      ])) : y("", !0)
    ])) : y("", !0);
  }
}, Xl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, Ql = ["dusk", "onClick"], Yl = {
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
  setup(e) {
    const u = e, a = $(null);
    function c(n) {
      u.onAdd(n), a.value.hide();
    }
    return (n, l) => (r(), N(fe, {
      ref_key: "dropdown",
      ref: a,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "ijt-dropdown--auto-width"
    }, {
      button: P(() => [...l[0] || (l[0] = [
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
      default: P(() => [
        t("div", Xl, [
          (r(!0), f(U, null, H(e.searchInputs, (d, p) => (r(), f("button", {
            key: p,
            dusk: `add-search-row-${d.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: O((s) => c(d.key), ["prevent"])
          }, b(d.label), 9, Ql))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, Jl = ["data-column-key"], Zl = { class: "ijt-column-manager__item-left" }, ea = ["onClick", "title"], ta = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, na = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, la = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Qe = {
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
  setup(e, { emit: u }) {
    const a = e, c = u, n = $([...a.columns]), l = $(!1), d = $(!1);
    X(() => a.columns, (k) => {
      !l.value && !d.value && (n.value = [...k]), d.value && setTimeout(() => {
        d.value = !1;
      }, 100);
    }, { deep: !0 });
    function p(k, w) {
      const m = n.value.findIndex((g) => g.key === k);
      m !== -1 && (n.value[m].hidden = !w), c("columns-changed", n.value);
    }
    function s(k, w) {
      const m = n.value.findIndex((g) => g.key === k);
      m !== -1 && (n.value[m].pinned = !w), n.value.sort((g, j) => g.pinned && !j.pinned ? -1 : !g.pinned && j.pinned ? 1 : 0), c("columns-changed", n.value);
    }
    function v() {
      d.value = !0, c("columns-changed", n.value);
    }
    return (k, w) => (r(), N(S(qt), {
      modelValue: n.value,
      "onUpdate:modelValue": w[0] || (w[0] = (m) => n.value = m),
      "item-key": "key",
      animation: 200,
      handle: ".ijt-column-manager__drag-handle",
      "ghost-class": "ijt-sortable-ghost",
      "chosen-class": "ijt-sortable-chosen",
      onChange: v,
      onStart: w[1] || (w[1] = (m) => l.value = !0),
      onEnd: w[2] || (w[2] = (m) => l.value = !1)
    }, {
      item: P(({ element: m }) => [
        t("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": m.key
        }, [
          t("div", Zl, [
            w[5] || (w[5] = t("div", { class: "ijt-column-manager__drag-handle" }, [
              t("svg", {
                class: "ijt-column-manager__drag-handle-icon",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                t("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            m.can_be_pinned !== !1 ? (r(), f("button", {
              key: 0,
              type: "button",
              class: V(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": m.pinned }]),
              onClick: O((g) => s(m.key, m.pinned), ["prevent"]),
              title: m.pinned ? "Unpin column" : "Pin column"
            }, [
              m.pinned ? (r(), f("svg", ta, [...w[3] || (w[3] = [
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
              ])])) : (r(), f("svg", na, [...w[4] || (w[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, ea)) : y("", !0),
            t("p", {
              class: V(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": m.hidden,
                "ijt-column-manager__label--pinned": m.pinned
              }])
            }, b(m.label), 3)
          ]),
          m.can_be_hidden && !m.pinned ? (r(), f("button", {
            key: 0,
            type: "button",
            class: V(["ijt-toggle", {
              "ijt-toggle--on": !m.hidden,
              "ijt-toggle--off": m.hidden
            }]),
            "aria-pressed": !m.hidden,
            "aria-labelledby": `toggle-column-${m.key}`,
            "aria-describedby": `toggle-column-${m.key}`,
            dusk: `toggle-column-${m.key}`,
            onClick: O((g) => p(m.key, m.hidden), ["prevent"])
          }, [...w[6] || (w[6] = [
            t("span", { class: "ijt-sr-only" }, "Column status", -1),
            t("span", {
              "aria-hidden": "true",
              class: "ijt-toggle__handle"
            }, null, -1)
          ])], 10, la)) : y("", !0)
        ], 8, Jl)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, aa = {
  key: 0,
  class: "ijt-button__badge"
}, sa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, oa = {
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
  setup(e) {
    const u = e, a = $([...u.columns]);
    X(() => u.columns, (l) => {
      a.value = [...l];
    }, { deep: !0, immediate: !0 });
    const c = q(() => a.value.filter((l) => l.hidden).length);
    function n(l) {
      a.value = [...l], u.onChange(l);
    }
    return (l, d) => (r(), N(fe, {
      placement: "bottom-end",
      dusk: "columns-dropdown"
    }, {
      button: P(() => [
        d[0] || (d[0] = t("svg", {
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
        e.hasHiddenColumns ? (r(), f("span", aa, "(" + b(c.value) + ")", 1)) : y("", !0)
      ]),
      default: P(() => [
        t("div", sa, [
          A(Qe, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: n
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, ra = {
  key: 0,
  class: "ijt-button__badge"
}, ia = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, ua = { class: "ijt-dropdown__header" }, ca = { class: "ijt-dropdown__content" }, da = ["name", "value", "onChange"], va = ["value"], fa = {
  key: 2,
  style: { "min-width": "250px" }
}, ha = {
  key: 3,
  style: { "min-width": "300px" }
}, ma = {
  key: 4,
  style: { "min-width": "300px" }
}, pa = {
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
  setup(e) {
    const u = e, a = q(() => u.filters.filter((l) => !c(l)).length);
    function c(l) {
      if (l.value === null)
        return !0;
      switch (l.type) {
        case "number_range":
          return Number(Math.max(...l.value)) === Number(l.max) && Number(Math.min(...l.value)) === Number(l.min);
        case "select":
          return l.value === "";
        case "toggle":
          return !1;
        case "date":
          return !l.value || typeof l.value == "object" && !l.value.type;
        case "number":
          return !l.value || typeof l.value == "object" && !l.value.type;
        default:
          return !l.value;
      }
    }
    function n(l) {
      let d = l.value;
      l.value && (Number(Math.max(...l.value)) === Number(l.max) && Number(Math.min(...l.value)) === Number(l.min) ? d = null : Number(Math.min(...l.value)) === 0 && Number(Math.max(...l.value)) === 0 && (d = ["0", "0"])), u.onFilterChange(l.key, d);
    }
    return (l, d) => (r(), N(fe, {
      placement: "bottom-end",
      dusk: "filters-dropdown"
    }, {
      button: P(() => [
        d[0] || (d[0] = t("svg", {
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
        e.hasEnabledFilters ? (r(), f("span", ra, "(" + b(a.value) + ")", 1)) : y("", !0)
      ]),
      default: P(() => [
        t("div", ia, [
          (r(!0), f(U, null, H(e.filters, (p, s) => (r(), f("div", { key: s }, [
            t("h3", ua, b(p.label), 1),
            t("div", ca, [
              p.type === "select" ? (r(), f("select", {
                key: 0,
                name: p.key,
                value: p.value,
                class: "ijt-select",
                onChange: (v) => e.onFilterChange(p.key, v.target.value)
              }, [
                (r(!0), f(U, null, H(p.options, (v, k) => (r(), f("option", {
                  key: k,
                  value: k
                }, b(v), 9, va))), 128))
              ], 40, da)) : y("", !0),
              p.type === "toggle" ? (r(), N(Ue, {
                key: 1,
                filter: p,
                "on-filter-change": e.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : y("", !0),
              p.type === "number_range" ? (r(), f("div", fa, [
                A(He, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(v) => p.value = v, (v) => n(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              p.type === "date" ? (r(), f("div", ha, [
                A(Ge, {
                  filter: p,
                  "on-filter-change": e.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : y("", !0),
              p.type === "number" ? (r(), f("div", ma, [
                A(Ke, {
                  filter: p,
                  "on-filter-change": e.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : y("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }));
  }
}, ga = { class: "ijt-global-search" }, _a = ["placeholder", "value"], ba = {
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
  setup(e) {
    return (u, a) => (r(), f("div", ga, [
      t("input", {
        class: "ijt-global-search__input",
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: a[0] || (a[0] = (c) => e.onChange(c.target.value))
      }, null, 40, _a),
      a[1] || (a[1] = t("div", { class: "ijt-global-search__icon" }, [
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
}, ya = { class: "ijt-search-row__container" }, ka = ["for"], wa = ["id", "name", "value", "onInput"], xa = { class: "ijt-search-row__remove" }, ja = ["dusk", "onClick"], Ca = {
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
  setup(e) {
    const u = { el: $([]) };
    let a = q(() => u.el.value);
    const c = e;
    function n(l) {
      return c.forcedVisibleSearchInputs.includes(l);
    }
    return X(c.forcedVisibleSearchInputs, (l) => {
      const d = l.length > 0 ? l[l.length - 1] : null;
      !d || De().then(() => {
        const p = zt(a.value, (s) => s.name === d);
        p && p.focus();
      });
    }, { immediate: !0 }), (l, d) => (r(!0), f(U, null, H(e.searchInputs, (p, s) => E((r(), f("div", {
      key: s,
      class: "ijt-search-row"
    }, [
      t("div", ya, [
        t("label", {
          for: p.key,
          class: "ijt-search-row__label"
        }, [
          d[0] || (d[0] = t("svg", {
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
          t("span", null, b(p.label), 1)
        ], 8, ka),
        (r(), f("input", {
          id: p.key,
          ref_for: !0,
          ref: u.el,
          key: p.key,
          name: p.key,
          value: p.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (v) => e.onChange(p.key, v.target.value)
        }, null, 40, wa)),
        t("div", xa, [
          t("button", {
            class: "ijt-search-row__remove-button",
            dusk: `remove-search-row-${p.key}`,
            onClick: O((v) => e.onRemove(p.key), ["prevent"])
          }, [...d[1] || (d[1] = [
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
          ])], 8, ja)
        ])
      ])
    ])), [
      [ee, p.value !== null || n(p.key)]
    ])), 128));
  }
}, $a = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const u = ne();
    return (a, c) => {
      var n;
      return r(), f("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: "ijt-reset",
        "aria-haspopup": "true",
        onClick: c[0] || (c[0] = O((...l) => e.onClick && e.onClick(...l), ["prevent"]))
      }, [
        c[1] || (c[1] = t("svg", {
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
        t("span", null, b((n = S(u).reset) != null ? n : "Reset"), 1)
      ], 512);
    };
  }
}, Sa = {}, Ma = { class: "ijt-wrapper" }, qa = { class: "ijt-wrapper__outer" }, za = { class: "ijt-wrapper__inner" }, Ia = { class: "ijt-wrapper__container" };
function Na(e, u) {
  return r(), f("div", Ma, [
    t("div", qa, [
      t("div", za, [
        t("div", Ia, [
          I(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Fa = /* @__PURE__ */ je(Sa, [["render", Na]]), Va = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, Pa = ["dusk", "onClick"], Ba = { class: "ijt-dropdown__content" }, La = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const u = ne(), a = e, c = $(!1), n = $(!1);
    function l() {
      c.value = n.value = !1;
    }
    function d(p) {
      var s, v;
      (s = a.actions.toggleColumns) != null && s.onReorder ? a.actions.toggleColumns.onReorder(p) : (v = a.actions.toggleColumns) != null && v.onChange && a.actions.toggleColumns.onChange(p);
    }
    return (p, s) => (r(), N(fe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: l
    }, {
      button: P(() => [...s[5] || (s[5] = [
        t("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "ijt-button__icon"
        }, [
          t("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: P(() => {
        var v, k, w, m, g;
        return [
          t("div", Va, [
            E(t("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (r(), f("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: s[0] || (s[0] = (j) => n.value = !0)
              }, [
                s[6] || (s[6] = t("svg", {
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
                t("span", null, b((v = S(u).add_search_fields) != null ? v : "Add search field"), 1)
              ])) : y("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (r(), f("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: s[1] || (s[1] = (j) => c.value = !0)
              }, [
                s[7] || (s[7] = t("svg", {
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
                t("span", null, b((k = S(u).show_hide_columns) != null ? k : "Show / Hide columns"), 1)
              ])) : y("", !0),
              s[9] || (s[9] = t("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in e.actions ? (r(), f("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: s[2] || (s[2] = (...j) => {
                  var C, z;
                  return ((C = e.actions.reset) == null ? void 0 : C.onClick) && ((z = e.actions.reset) == null ? void 0 : z.onClick(...j));
                })
              }, [
                s[8] || (s[8] = t("svg", {
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
                t("span", null, b((w = S(u).grouped_reset) != null ? w : "Reset"), 1)
              ])) : y("", !0)
            ], 512), [
              [ee, !c.value && !n.value]
            ]),
            E(t("div", null, [
              t("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: s[3] || (s[3] = (j) => n.value = !1)
              }, [
                s[10] || (s[10] = t("svg", {
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
                t("span", null, b((m = S(u).add_search_fields) != null ? m : "Add search field"), 1)
              ]),
              (r(!0), f(U, null, H(e.actions.searchFields.searchInputs, (j, C) => (r(), f("button", {
                key: C,
                dusk: `add-search-row-${j.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: O((z) => e.actions.searchFields.onClick(j.key), ["prevent"])
              }, b(j.label), 9, Pa))), 128))
            ], 512), [
              [ee, n.value]
            ]),
            E(t("div", null, [
              t("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: s[4] || (s[4] = (j) => c.value = !1)
              }, [
                s[11] || (s[11] = t("svg", {
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
                t("span", null, b((g = S(u).show_hide_columns) != null ? g : "Show / Hide columns"), 1)
              ]),
              t("div", Ba, [
                A(Qe, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: d
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ee, c.value]
            ]),
            E(t("div", null, [
              I(p.$slots, "default")
            ], 512), [
              [ee, !c.value && !n.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 512));
  }
};
function Oa(e) {
  const u = $(!1), a = $(null), c = $(0), n = $(0), l = gt({}), d = () => {
    const M = _t(e) ? S(e) : e;
    return M ? `${M}-columnWidths` : null;
  }, p = () => {
    const M = d();
    if (!M)
      return;
    const R = localStorage.getItem(M);
    if (R)
      try {
        const L = JSON.parse(R);
        Object.assign(l, L);
      } catch (L) {
        console.warn("Unable to load column widths:", L);
      }
  }, s = () => {
    const M = d();
    !M || localStorage.setItem(M, JSON.stringify(l));
  }, v = (M, R) => {
    M.preventDefault(), M.stopPropagation(), u.value = !0, a.value = R, c.value = M.clientX;
    const L = M.target.closest("th");
    n.value = L.offsetWidth;
    const B = L.closest("table");
    B && B.querySelectorAll("thead th[data-column-key]").forEach((K) => {
      const D = K.getAttribute("data-column-key"), Y = K.offsetWidth;
      l[D] || (l[D] = Y), K.style.width = `${l[D]}px`;
      const J = Array.from(K.parentNode.children).indexOf(K);
      B.querySelectorAll("tbody tr").forEach((me) => {
        const oe = me.children[J];
        oe && (oe.style.width = `${l[D]}px`);
      });
    }), document.addEventListener("mousemove", k), document.addEventListener("mouseup", w), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, k = (M) => {
    if (!u.value || !a.value)
      return;
    const R = M.clientX - c.value, L = Math.max(50, n.value + R);
    l[a.value] = L;
    const B = document.querySelector(`th[data-column-key="${a.value}"]`);
    if (B) {
      B.style.width = `${L}px`;
      const W = B.closest("table");
      if (W) {
        const K = Array.from(B.parentNode.children).indexOf(B);
        W.querySelectorAll("tbody tr").forEach((Y) => {
          const J = Y.children[K];
          J && (J.style.width = `${L}px`);
        });
      }
    }
  }, w = () => {
    u.value && (u.value = !1, a.value = null, s(), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, m = (M) => l[M] || "auto", g = (M, R) => {
    l[M] = R, s();
  }, j = (M) => {
    if (!M)
      return;
    M.querySelectorAll("thead th[data-column-key]").forEach((L) => {
      const B = L.getAttribute("data-column-key");
      if (!l[B]) {
        const D = L.offsetWidth;
        l[B] = Math.max(D, 100);
      }
      L.style.width = `${l[B]}px`;
      const W = Array.from(L.parentNode.children).indexOf(L);
      M.querySelectorAll("tbody tr").forEach((D) => {
        const Y = D.children[W];
        Y && (Y.style.width = `${l[B]}px`);
      });
    });
  }, C = () => {
    Object.keys(l).forEach((R) => {
      delete l[R];
    });
    const M = d();
    M && localStorage.removeItem(M);
  }, z = () => {
    u.value && (document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Q(() => {
    p();
  }), ve(() => {
    z();
  }), {
    isResizing: u,
    resizingColumn: a,
    columnWidths: l,
    startResize: v,
    getColumnWidth: m,
    setColumnWidth: g,
    resetColumnWidths: C,
    loadColumnWidths: p,
    saveColumnWidths: s,
    initializeColumnWidths: j
  };
}
const Ea = ["dusk"], Ra = { class: "ijt-toolbar" }, Ta = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, Aa = { key: 0 }, Wa = ["href"], Da = { class: "ijt-table-container" }, Ua = { class: "ijt-table__thead" }, Ha = { class: "ijt-table__tr" }, Ka = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, Ga = ["id"], Xa = { class: "ijt-table__tbody" }, Qa = {
  key: 0,
  class: "ijt-table__td ijt-table__td--pinned-checkbox",
  style: { width: "60px" }
}, Ya = ["id", "onUpdate:modelValue"], Ja = ["onClick", "data-column-key"], Za = { class: "ijt-footer" }, es = {
  key: 0,
  class: "ijt-footer__selection-info"
}, ts = {
  key: 1,
  class: "ijt-loading"
}, ns = {
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
  setup(e, { emit: u }) {
    const a = ne(), c = u, n = e, l = q(() => n.localStorageName ? n.localStorageName : n.name && n.name !== "default" ? `table-${n.name}` : null);
    bt();
    const d = n.resizeableColumns ? Oa(l) : null;
    yt("columnResize", d);
    const p = $(!1), s = q(() => Te().props.queryBuilderProps ? { ...Te().props.queryBuilderProps[n.name] } : {}), v = $(s.value), k = $([]), w = $(null), m = $(null), g = $(!1);
    let j;
    const C = q(() => s.value.pageName), z = $([]), M = $(null), R = $(!1), L = q(() => s.value.hasToggleableColumns || s.value.hasFilters || s.value.hasSearchInputs ? !1 : !s.value.globalSearch), B = q(() => s.value.infiniteScrolling ? k.value : Object.keys(n.resource).length === 0 ? n.data : "data" in n.resource ? n.resource.data : n.resource), W = q(() => Object.keys(n.resource).length === 0 ? n.meta : "links" in n.resource && "meta" in n.resource && Object.keys(n.resource.links).length === 4 && "next" in n.resource.links && "prev" in n.resource.links ? {
      ...n.resource.meta,
      next_page_url: n.resource.links.next,
      prev_page_url: n.resource.links.prev
    } : "meta" in n.resource ? n.resource.meta : n.resource), K = q(() => B.value.length > 0 ? !0 : W.value.total > 0), D = $({
      reset: {
        onClick: pe
      },
      toggleColumns: {
        show: s.value.hasToggleableColumns,
        columns: s.value.columns,
        onChange: _e
      },
      searchFields: {
        show: s.value.hasSearchInputs && !n.hideSearchInputsAboveTable,
        searchInputs: s.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
        onClick: J
      }
    });
    function Y(o) {
      z.value = z.value.filter((i) => i != o), re(o, null);
    }
    function J(o) {
      z.value.push(o);
    }
    const he = q(() => {
      if (z.value.length > 0)
        return !0;
      const o = xe.parse(location.search.substring(1));
      if (o[C.value] > 1)
        return !0;
      const h = n.name === "default" ? "" : n.name + "_";
      let x = !1;
      return Z(["filter", "columns", "cursor", "sort"], (_) => {
        const F = o[h + _];
        _ === "sort" && F === s.value.defaultSort || F !== void 0 && (x = !0);
      }), x;
    }), me = (o, i) => {
      let h = [];
      if (n.striped && i % 2 && h.push("ijt-table__tr--striped"), n.rowClass && typeof n.rowClass == "function") {
        const x = n.rowClass(o);
        x && h.push(x);
      }
      return h.join(" ");
    }, oe = q(() => {
      if (!n.showExportButton)
        return null;
      const o = new URL(window.location.href);
      o.search = "";
      const i = new URLSearchParams();
      if (s.value.page && s.value.page > 1 && i.set(C.value, s.value.page), s.value.sort) {
        const _ = n.name === "default" ? "sort" : `${n.name}_sort`;
        i.set(_, s.value.sort);
      }
      const h = {};
      if (v.value.filters.forEach((_) => {
        _.value !== null && _.value !== void 0 && _.value !== "" && (h[_.key] = _.value);
      }), v.value.searchInputs.forEach((_) => {
        _.value !== null && _.value !== void 0 && _.value !== "" && (h[_.key] = _.value);
      }), Object.keys(h).length > 0) {
        const _ = n.name === "default" ? "filter" : `${n.name}_filter`;
        Object.keys(h).forEach((F) => {
          const T = h[F];
          Array.isArray(T) ? T.forEach((le, we) => {
            i.set(`${_}[${F}][${we}]`, le);
          }) : typeof T == "object" && T !== null ? Object.keys(T).forEach((le) => {
            i.set(`${_}[${F}][${le}]`, T[le]);
          }) : i.set(`${_}[${F}]`, T);
        });
      }
      const x = v.value.columns.filter((_) => !_.hidden).map((_) => _.key);
      if (x.length !== v.value.columns.length) {
        const _ = n.name === "default" ? "columns" : `${n.name}_columns`;
        x.forEach((F) => {
          i.append(`${_}[]`, F);
        });
      }
      if (s.value.perPageOptions && s.value.perPageOptions.length > 0) {
        const _ = new URLSearchParams(window.location.search).get("perPage") || s.value.perPageOptions[0];
        _ && _ !== s.value.perPageOptions[0] && i.set("perPage", _);
      }
      return i.set("do_export", "1"), i.set("table", n.name || "default"), o.search = i.toString(), o.toString();
    });
    function pe() {
      z.value = [], Z(v.value.filters, (o, i) => {
        v.value.filters[i].value = null;
      }), Z(v.value.searchInputs, (o, i) => {
        v.value.searchInputs[i].value = null;
      }), Z(v.value.columns, (o, i) => {
        v.value.columns[i].hidden = o.can_be_hidden ? !s.value.defaultVisibleToggleableColumns.includes(o.key) : !1, v.value.columns[i].pinned = !1;
      }), l.value && localStorage.removeItem(`${l.value}-columns`), n.resizeableColumns && d && d.resetColumnWidths(), v.value.sort = null, v.value.cursor = null, v.value.page = 1;
    }
    const $e = {};
    function re(o, i) {
      clearTimeout($e[o]), $e[o] = setTimeout(() => {
        ye.value && n.preventOverlappingRequests && ye.value.cancel();
        const h = ie("searchInputs", o);
        v.value.searchInputs[h].value = i, v.value.cursor = null, v.value.page = 1;
      }, n.inputDebounceMs);
    }
    function Se(o) {
      re("global", o);
    }
    function ge(o, i) {
      const h = ie("filters", o);
      v.value.filters[h].value = i, v.value.cursor = null, v.value.page = 1;
    }
    function Me(o) {
      v.value.cursor = null, v.value.perPage = o, v.value.page = 1;
    }
    function ie(o, i) {
      return Ft(v.value[o], (h) => h.key == i);
    }
    function _e(o) {
      v.value.columns = o, v.value.columns.sort((i, h) => i.pinned && !h.pinned ? -1 : !i.pinned && h.pinned ? 1 : 0), Ye();
    }
    function Ye() {
      if (!l.value)
        return;
      const o = v.value.columns.map((i, h) => ({
        key: i.key,
        hidden: i.hidden,
        pinned: i.pinned || !1,
        order: h
      }));
      localStorage.setItem(`${l.value}-columns`, JSON.stringify(o));
    }
    function Je() {
      let o = {};
      return Z(v.value.searchInputs, (i) => {
        i.value !== null && (o[i.key] = i.value);
      }), Z(v.value.filters, (i) => {
        let h = i.value;
        h !== null && (i.type === "number_range" && Number(Math.max(...i.value)) === Number(i.max) && Number(Math.min(...i.value)) === Number(i.min) && (h = null), o[i.key] = h);
      }), o;
    }
    function Ze() {
      const o = v.value.columns;
      let i = Nt(o, (x) => !x.hidden), h = Pt(i, (x) => x.key).sort();
      return Vt(h, s.value.defaultVisibleToggleableColumns) ? {} : h;
    }
    function et() {
      const o = Je(), i = Ze(), h = {};
      Object.keys(o).length > 0 && (h.filter = o), Object.keys(i).length > 0 && (h.columns = i);
      const x = v.value.cursor, _ = v.value.page, F = v.value.sort, T = v.value.perPage;
      return x && (h.cursor = x), _ > 1 && (h.page = _), T > 1 && (h.perPage = T), F && (h.sort = F), h;
    }
    function qe(o) {
      if (!o)
        return null;
      if (n.paginationClickCallback && typeof n.paginationClickCallback == "function") {
        n.paginationClickCallback(o);
        return;
      }
      ze(o);
    }
    function tt() {
      const o = xe.parse(location.search.substring(1)), i = n.name === "default" ? "" : n.name + "_";
      Z(["filter", "columns", "cursor", "sort"], (x) => {
        delete o[i + x];
      }), delete o[C.value], Z(et(), (x, _) => {
        _ === "page" ? o[C.value] = x : _ === "perPage" ? o.perPage = x : o[i + _] = x;
      });
      let h = xe.stringify(o, {
        filter(x, _) {
          return typeof _ == "object" && _ !== null ? Bt(_) : _;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!h || h === C.value + "=1") && (h = ""), h;
    }
    const be = $(!1), ye = $(null);
    function ze(o) {
      !o || Lt.get(
        o,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: n.preserveScroll !== !1,
          onBefore() {
            be.value = !0;
          },
          onCancelToken(i) {
            ye.value = i;
          },
          onFinish() {
            be.value = !1;
          },
          onSuccess() {
            if (n.preserveScroll === "table-top") {
              const h = M.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: h });
            }
          }
        }
      );
    }
    function nt(o, i, h) {
      var x;
      n.hasCheckboxes && ((x = o.target) == null ? void 0 : x.parentElement.cellIndex) === 0 || c("rowClicked", o, i, h);
    }
    async function lt() {
      if (!(g.value || !w.value)) {
        g.value = !0;
        try {
          const o = await fetch(w.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!o.ok)
            throw new Error("Network response was not ok");
          const i = await o.json();
          k.value = [...k.value, ...i.data], w.value = i.next_page_url;
        } catch (o) {
          console.error("Error loading more data:", o);
        } finally {
          g.value = !1;
        }
      }
    }
    function ke() {
      !s.value.infiniteScrolling || !m.value || (j && (j.disconnect(), j = null), n.resource && n.resource.data && k.value.length === 0 && (k.value = [...n.resource.data], w.value = W.value.next_page_url || null), j = new IntersectionObserver(
        (o) => {
          o.forEach((i) => {
            i.isIntersecting && lt();
          });
        },
        {
          rootMargin: "0px 0px 100px 0px",
          threshold: 0.1
        }
      ), j.observe(m.value));
    }
    X(v, () => {
      s.value.infiniteScrolling && (k.value = [], w.value = null), ze(location.pathname + "?" + tt()), R.value = !1;
    }, { deep: !0 }), X(() => n.resource, () => {
      var o;
      if (!s.value.infiniteScrolling && ((o = n.resource) == null ? void 0 : o.data)) {
        const i = n.resource.data.filter((h) => h.__itSelected);
        c("selectionChanged", i);
      }
    }, { deep: !0 }), X(() => s.value, (o) => {
      var h;
      if (!s.value.infiniteScrolling)
        return;
      const i = ((h = n.resource) == null ? void 0 : h.data) || [];
      if (i.length > 0) {
        k.value = [...i], w.value = W.value.next_page_url || null;
        const x = i.filter((_) => _.__itSelected);
        c("selectionChanged", x), setTimeout(() => {
          m.value && ke();
        }, 100);
      }
    }, { deep: !0 });
    const Ie = () => {
      n.resizeableColumns && d && setTimeout(() => {
        var i;
        const o = (i = M.value) == null ? void 0 : i.querySelector("table");
        o && d.initializeColumnWidths(o);
      }, 0), s.value.infiniteScrolling && setTimeout(() => {
        m.value && ke();
      }, 100);
    };
    Q(() => {
      document.addEventListener("inertia:success", Ie), at(), n.resizeableColumns && d && setTimeout(() => {
        var i;
        const o = (i = M.value) == null ? void 0 : i.querySelector("table");
        o && d.initializeColumnWidths(o);
      }, 0), s.value.infiniteScrolling && ke();
    });
    function at() {
      if (!l.value)
        return;
      const o = localStorage.getItem(`${l.value}-columns`);
      if (!!o)
        try {
          const i = JSON.parse(o);
          if (i.length > 0 && "order" in i[0]) {
            const h = new Map(i.map((x) => [x.key, x]));
            v.value.columns.forEach((x, _) => {
              const F = h.get(x.key);
              F && (v.value.columns[_].hidden = F.hidden, v.value.columns[_].pinned = F.pinned || !1);
            }), v.value.columns.sort((x, _) => {
              var Le, Oe;
              const F = h.get(x.key), T = h.get(_.key);
              if (x.pinned && !_.pinned)
                return -1;
              if (!x.pinned && _.pinned)
                return 1;
              const le = (Le = F == null ? void 0 : F.order) != null ? Le : 999, we = (Oe = T == null ? void 0 : T.order) != null ? Oe : 999;
              return le - we;
            });
          } else
            i.forEach((h, x) => {
              const _ = v.value.columns.findIndex((F) => F.key === h.key);
              _ !== -1 && (v.value.columns[_].hidden = h.hidden, v.value.columns[_].pinned = h.pinned || !1);
            });
        } catch (i) {
          console.warn("Error loading column order from localStorage:", i);
        }
    }
    ve(() => {
      document.removeEventListener("inertia:success", Ie), j && (j.disconnect(), j = null);
    });
    function Ne(o) {
      v.value.sort == o ? v.value.sort = `-${o}` : v.value.sort = o, v.value.cursor = null, v.value.page = 1;
    }
    function ue(o) {
      const i = ie("columns", o);
      return !v.value.columns[i].hidden;
    }
    function ce(o) {
      const i = ie("columns", o), h = It(v.value.columns[i]);
      h.onSort = Ne, h.filters = v.value.filters.filter(
        (_) => _.key === o || _.key.startsWith(o + "_") || _.key.includes(o)
      );
      const x = v.value.searchInputs.filter(
        (_) => _.key === o
      );
      return x.length > 0 ? (h.searchable = !0, h.searchInputs = x) : (h.searchable = !1, h.searchInputs = []), h.onFilterChange = ge, h.onSearchChange = re, h;
    }
    function st() {
      n.resource.data.forEach((o) => {
        o.__itSelected = R.value;
      });
    }
    function ot(o) {
      if (!n.resizeableColumns || !d)
        return "auto";
      const i = d.getColumnWidth(o);
      return i === "auto" ? i : `${i}px`;
    }
    function Fe(o) {
      if (!n.resizeableColumns || !d)
        return "0px";
      let i = 0;
      const h = v.value.columns.filter((x) => !x.hidden);
      n.hasCheckboxes && (i += 60);
      for (const x of h) {
        if (x.key === o)
          break;
        if (x.pinned) {
          const _ = d.getColumnWidth(x.key);
          i += _ === "auto" ? 150 : _;
        }
      }
      return `${i}px`;
    }
    function Ve(o) {
      const i = v.value.columns.find((h) => h.key === o);
      return i && i.pinned;
    }
    function rt(o) {
      return Ve(o) ? {
        position: "sticky",
        left: Fe(o),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function it(o) {
      return Ve(o) ? {
        position: "sticky",
        left: Fe(o),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const ut = q(() => {
      if (!n.resizeableColumns || !d)
        return "100%";
      let o = 0, i = !1;
      return n.hasCheckboxes && (o += 60), s.value.columns.forEach((h) => {
        if (!ue(h.key))
          return;
        const x = d.getColumnWidth(h.key);
        x === "auto" ? i = !0 : o += x;
      }), !i && o > 0 ? `${o}px` : "max(100%, " + (o > 0 ? o + "px" : "800px") + ")";
    }), Pe = q(() => B.value.filter((o) => o.__itSelected)), Be = q(() => Pe.value.length), ct = q(() => Be.value === 0 ? a.noLineSelected : `${Be.value} ${a.lineSelected}`);
    function dt() {
      n.resizeableColumns && (p.value = !0);
    }
    function vt() {
      n.resizeableColumns && setTimeout(() => {
        p.value = !1;
      }, 100);
    }
    return (o, i) => (r(), N(kt, null, {
      default: P(() => [
        (r(), f("fieldset", {
          ref_key: "tableFieldset",
          ref: M,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: V(["ijt-table-fieldset", { "ijt-table-fieldset--loading": be.value }])
        }, [
          t("div", Ra, [
            s.value.globalSearch ? (r(), f("div", Ta, [
              I(o.$slots, "tableGlobalSearch", {
                hasGlobalSearch: s.value.globalSearch,
                label: s.value.globalSearch ? s.value.globalSearch.label : null,
                value: s.value.globalSearch ? s.value.globalSearch.value : null,
                onChange: Se
              }, () => [
                s.value.globalSearch ? (r(), N(ba, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: s.value.globalSearch.label,
                  value: s.value.globalSearch.value,
                  "on-change": Se
                }, null, 8, ["label", "value"])) : y("", !0)
              ], !0)
            ])) : y("", !0),
            t("div", null, [
              I(o.$slots, "tableFilter", {
                hasFilters: s.value.hasFilters,
                hasEnabledFilters: s.value.hasEnabledFilters,
                filters: s.value.filters,
                onFilterChange: ge
              }, () => [
                s.value.hasFilters ? (r(), N(pa, {
                  key: 0,
                  "has-enabled-filters": s.value.hasEnabledFilters,
                  filters: s.value.filters,
                  "on-filter-change": ge
                }, null, 8, ["has-enabled-filters", "filters"])) : y("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? I(o.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: s.value.hasSearchInputs,
              hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
              searchInputs: s.value.searchInputsWithoutGlobal,
              onAdd: J
            }, () => [
              s.value.hasSearchInputs ? (r(), N(Yl, {
                key: 0,
                "search-inputs": s.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": s.value.hasSearchInputsWithoutValue,
                "on-add": J
              }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : y("", !0)
            ], !0) : y("", !0),
            e.withGroupedMenu ? y("", !0) : I(o.$slots, "tableColumns", {
              key: 2,
              hasColumns: s.value.hasToggleableColumns,
              columns: v.value.columns,
              hasHiddenColumns: s.value.hasHiddenColumns,
              onChange: _e
            }, () => [
              s.value.hasToggleableColumns ? (r(), N(oa, {
                key: 0,
                columns: v.value.columns,
                "has-hidden-columns": s.value.hasHiddenColumns,
                "on-change": _e,
                "table-name": e.name
              }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : y("", !0)
            ], !0),
            e.withGroupedMenu ? I(o.$slots, "groupedAction", {
              key: 3,
              actions: D.value
            }, () => [
              A(La, { actions: D.value }, {
                default: P(() => [
                  I(o.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["actions"])
            ], !0) : y("", !0),
            e.withGroupedMenu ? y("", !0) : I(o.$slots, "tableReset", {
              key: 4,
              canBeReset: he.value,
              onClick: pe
            }, () => [
              he.value ? (r(), f("div", Aa, [
                A($a, { "on-click": pe })
              ])) : y("", !0)
            ], !0),
            e.showExportButton ? I(o.$slots, "exportButton", {
              key: 5,
              exportUrl: oe.value,
              translations: S(a)
            }, () => [
              t("a", {
                href: oe.value,
                class: "ijt-export"
              }, [...i[3] || (i[3] = [
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
              ])], 8, Wa)
            ], !0) : y("", !0)
          ]),
          e.hideSearchInputsAboveTable ? y("", !0) : I(o.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: s.value.hasSearchInputsWithValue,
            searchInputs: s.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: z.value,
            onChange: re
          }, () => [
            s.value.hasSearchInputsWithValue || z.value.length > 0 ? (r(), N(Ca, {
              key: 0,
              "search-inputs": s.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": z.value,
              "on-change": re,
              "on-remove": Y
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : y("", !0)
          ], !0),
          I(o.$slots, "tableWrapper", { meta: W.value }, () => [
            A(Fa, {
              class: V({ "ijt-wrapper--mt": !L.value })
            }, {
              default: P(() => [
                I(o.$slots, "table", {}, () => [
                  t("div", Da, [
                    t("table", {
                      class: V(["ijt-table", { "ijt-table--show-resize-indicators": e.resizeableColumns && p.value }]),
                      style: G([{ "table-layout": "fixed", "min-width": "100%" }, { width: ut.value }]),
                      onMouseenter: i[1] || (i[1] = (h) => e.resizeableColumns ? dt : null),
                      onMouseleave: i[2] || (i[2] = (h) => e.resizeableColumns ? vt : null)
                    }, [
                      t("thead", Ua, [
                        I(o.$slots, "head", {
                          show: ue,
                          sortBy: Ne,
                          header: ce
                        }, () => [
                          t("tr", Ha, [
                            e.hasCheckboxes ? (r(), f("th", Ka, [
                              E(t("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: st,
                                "onUpdate:modelValue": i[0] || (i[0] = (h) => R.value = h),
                                class: "ijt-table__checkbox"
                              }, null, 40, Ga), [
                                [Re, R.value]
                              ])
                            ])) : y("", !0),
                            (r(!0), f(U, null, H(v.value.columns, (h) => (r(), N(zl, {
                              cell: ce(h.key),
                              style: G(it(h.key))
                            }, {
                              label: P(() => [
                                I(o.$slots, `header(${h.key})`, {
                                  label: ce(h.key).label,
                                  column: ce(h.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", Xa, [
                        I(o.$slots, "body", { show: ue }, () => [
                          (r(!0), f(U, null, H(B.value, (h, x) => (r(), f("tr", {
                            key: `table-${e.name}-row-${x}`,
                            class: V(["ijt-table__tr", me(h, x)])
                          }, [
                            e.hasCheckboxes ? (r(), f("td", Qa, [
                              E(t("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${x}`,
                                class: "ijt-table__checkbox",
                                "onUpdate:modelValue": (_) => h.__itSelected = _
                              }, null, 8, Ya), [
                                [Re, h.__itSelected]
                              ])
                            ])) : y("", !0),
                            (r(!0), f(U, null, H(v.value.columns, (_, F) => E((r(), f("td", {
                              key: `table-${e.name}-row-${x}-column-${_.key}`,
                              onClick: (T) => nt(T, h, _.key),
                              class: V(["ijt-table__td", _.body_class]),
                              "data-column-key": _.key,
                              style: G({
                                width: ot(_.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...rt(_.key)
                              })
                            }, [
                              I(o.$slots, `cell(${_.key})`, { item: h }, () => [
                                te(b(h[_.key]), 1)
                              ], !0)
                            ], 14, Ja)), [
                              [ee, ue(_.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                t("div", {
                  ref_key: "intersectElement",
                  ref: m,
                  style: { height: "1px", width: "100%" }
                }, null, 512),
                s.value.infiniteScrolling ? y("", !0) : I(o.$slots, "pagination", {
                  key: 0,
                  onClick: qe,
                  hasData: K.value,
                  meta: W.value,
                  perPageOptions: s.value.perPageOptions,
                  onPerPageChange: Me,
                  showExportButton: e.showExportButton
                }, () => [
                  t("div", Za, [
                    e.hasCheckboxes ? (r(), f("span", es, b(ct.value), 1)) : y("", !0),
                    A(Gl, {
                      "on-click": qe,
                      "has-data": K.value,
                      meta: W.value,
                      "per-page-options": s.value.perPageOptions,
                      "on-per-page-change": Me,
                      "show-export-button": e.showExportButton
                    }, {
                      exportButton: P((h) => [
                        I(o.$slots, "exportButton", wt(xt(h)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                s.value.infiniteScrolling && g.value ? (r(), f("div", ts, [...i[4] || (i[4] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : y("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          I(o.$slots, "tableSummary", {
            data: B.value,
            meta: W.value,
            selectedItems: Pe.value
          }, void 0, !0)
        ], 10, Ea))
      ]),
      _: 3
    }));
  }
}, ws = /* @__PURE__ */ je(ns, [["__scopeId", "data-v-09d0bb29"]]);
export {
  fe as ButtonWithDropdown,
  zl as HeaderCell,
  Ot as OnClickOutside,
  Gl as Pagination,
  ws as Table,
  Yl as TableAddSearchRow,
  oa as TableColumns,
  pa as TableFilter,
  ba as TableGlobalSearch,
  $a as TableReset,
  Ca as TableSearchRows,
  Fa as TableWrapper,
  ne as getTranslations,
  ys as setTranslation,
  ks as setTranslations
};
