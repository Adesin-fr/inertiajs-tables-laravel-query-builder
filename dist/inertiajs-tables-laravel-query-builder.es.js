import { ref as $, onMounted as Q, onBeforeUnmount as De, openBlock as r, createElementBlock as f, renderSlot as I, watch as X, nextTick as je, createBlock as N, withCtx as P, createElementVNode as t, normalizeClass as V, withModifiers as E, withDirectives as R, vShow as ee, createStaticVNode as ht, normalizeStyle as G, toDisplayString as b, createCommentVNode as y, createTextVNode as te, computed as z, unref as S, vModelSelect as Ue, vModelText as oe, watchEffect as mt, onUnmounted as ve, Teleport as de, Fragment as U, renderList as H, createVNode as A, withKeys as Re, inject as pt, resolveDynamicComponent as ae, reactive as gt, isRef as _t, getCurrentInstance as bt, provide as yt, Transition as kt, vModelCheckbox as Te, normalizeProps as wt, guardReactiveProps as xt } from "vue";
import { createPopper as jt } from "@popperjs/core/lib/popper-lite";
import Ct from "@popperjs/core/lib/modifiers/preventOverflow";
import $t from "@popperjs/core/lib/modifiers/flip";
import St from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as Mt } from "@popperjs/core";
import qt from "lodash-es/uniq";
import zt from "vuedraggable";
import It from "lodash-es/find";
import xe from "qs";
import Nt from "lodash-es/clone";
import Ft from "lodash-es/filter";
import Vt from "lodash-es/findKey";
import Z from "lodash-es/forEach";
import Pt from "lodash-es/isEqual";
import Bt from "lodash-es/map";
import Lt from "lodash-es/pickBy";
import { usePage as Ae, router as Ot } from "@inertiajs/vue3";
const Et = {
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
    }), De(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (n, l) => (r(), f("div", {
      ref_key: "root",
      ref: c
    }, [
      I(n.$slots, "default")
    ], 512));
  }
}, Rt = { class: "ijt-dropdown" }, Tt = ["dusk", "disabled"], fe = {
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
    const c = a, n = e, l = $(!1), d = $(null), g = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: m }) {
        const p = m.elements.popper;
        if (!p)
          return;
        const x = 12, C = p.getBoundingClientRect(), q = m.placement || "bottom";
        let M;
        q.startsWith("top") ? M = C.bottom - x : M = window.innerHeight - C.top - x;
        const L = Math.max(M, 160);
        p.style.maxHeight = `${L}px`, p.style.overflowY = "auto", p.style.overscrollBehavior = "contain", p.style.webkitOverflowScrolling = "touch";
      }
    };
    function o() {
      l.value = !l.value;
    }
    function v() {
      l.value = !1;
    }
    X(l, () => {
      l.value && d.value && je(() => d.value.update()), l.value || c("closed"), l.value && c("opened");
    });
    const k = $(null), w = $(null);
    return Q(() => {
      d.value = jt(k.value, w.value, {
        placement: n.placement,
        modifiers: [St, $t, Ct, g]
      });
    }), De(() => {
      d.value && (d.value.destroy(), d.value = null);
    }), u({ hide: v }), (m, p) => (r(), N(Et, { do: v }, {
      default: P(() => [
        t("div", Rt, [
          t("button", {
            ref_key: "button",
            ref: k,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: V(["ijt-dropdown__trigger", { "ijt-dropdown__trigger--disabled": e.disabled }]),
            "aria-haspopup": "true",
            onClick: E(o, ["prevent"])
          }, [
            I(m.$slots, "button")
          ], 10, Tt),
          R(t("div", {
            ref_key: "tooltip",
            ref: w,
            class: "ijt-dropdown__panel"
          }, [
            I(m.$slots, "default")
          ], 512), [
            [ee, l.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, At = {
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
}, Wt = { class: "ijt-toggle-filter" }, Dt = { class: "ijt-toggle-filter__switch" }, Ut = ["checked"], He = {
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
    return (u, a) => (r(), f("div", Wt, [
      t("label", Dt, [
        t("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (c) => e.onFilterChange(e.filter.key, c.target.checked ? "1" : "0"))
        }, null, 40, Ut),
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
        onClick: a[1] || (a[1] = E((c) => e.onFilterChange(e.filter.key, null), ["prevent"]))
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
const Ce = (e, u) => {
  const a = e.__vccOpts || e;
  for (const [c, n] of u)
    a[c] = n;
  return a;
}, Ht = {
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
}, Kt = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, Gt = { class: "ijt-range-filter__container" }, Xt = { class: "ijt-range-filter__track" }, Qt = { style: { "z-index": "40" } }, Yt = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, Jt = { key: 0 }, Zt = { key: 1 }, en = { style: { "z-index": "40" } }, tn = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, nn = { key: 0 }, ln = { key: 1 }, an = { draggable: "true" }, on = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, sn = { key: 0 }, rn = { key: 1 }, un = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, cn = { key: 0 }, dn = { key: 1 };
function vn(e, u, a, c, n, l) {
  var d, g, o, v;
  return r(), f("div", Kt, [
    t("div", Gt, [
      t("div", Xt, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: G(`width: ${l.rangeWidth}% !important; left: ${l.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: G(`left: ${l.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (k) => l.handleMouseDown(k, !0))
        }, [
          t("div", Qt, [
            t("div", Yt, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: G(l.getMarginTop(n.hasOverlap && l.displayFirstDown))
              }, [
                a.prefix ? (r(), f("span", Jt, b(a.prefix), 1)) : y("", !0),
                te(" " + b((d = l.currentMinValue) != null ? d : 0) + " ", 1),
                a.suffix ? (r(), f("span", Zt, b(a.suffix), 1)) : y("", !0)
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
          t("div", en, [
            t("div", tn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: G(l.getMarginTop(n.hasOverlap && !l.displayFirstDown))
              }, [
                a.prefix ? (r(), f("span", nn, b(a.prefix), 1)) : y("", !0),
                te(" " + b((g = l.currentMaxValue) != null ? g : 0) + " ", 1),
                a.suffix ? (r(), f("span", ln, b(a.suffix), 1)) : y("", !0)
              ], 4),
              t("div", an, [
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
        t("div", on, [
          a.prefix ? (r(), f("span", sn, b(a.prefix), 1)) : y("", !0),
          te(" " + b((o = a.min) != null ? o : 0) + " ", 1),
          a.suffix ? (r(), f("span", rn, b(a.suffix), 1)) : y("", !0)
        ]),
        t("div", un, [
          a.prefix ? (r(), f("span", cn, b(a.prefix), 1)) : y("", !0),
          te(" " + b((v = a.max) != null ? v : 0) + " ", 1),
          a.suffix ? (r(), f("span", dn, b(a.suffix), 1)) : y("", !0)
        ])
      ])
    ])
  ], 512);
}
const Ke = /* @__PURE__ */ Ce(Ht, [["render", vn], ["__scopeId", "data-v-b8d9c6c5"]]), $e = {
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
  return $e.translations;
}
function xo(e, u) {
  $e.translations[e] = u;
}
function jo(e) {
  $e.translations = e;
}
const fn = { class: "ijt-number-filter" }, hn = { class: "ijt-number-filter__label" }, mn = { value: "" }, pn = { value: "exact" }, gn = { value: "less_than" }, _n = { value: "greater_than" }, bn = { value: "less_than_or_equal" }, yn = { value: "greater_than_or_equal" }, kn = { value: "between" }, wn = { key: 0 }, xn = { key: 0 }, jn = { class: "ijt-number-filter__label" }, Cn = { class: "ijt-number-filter__input-wrapper" }, $n = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Sn = ["step"], Mn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, qn = { key: 1 }, zn = { style: { "margin-bottom": "0.75rem" } }, In = { class: "ijt-number-filter__label" }, Nn = { class: "ijt-number-filter__input-wrapper" }, Fn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Vn = ["step"], Pn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Bn = { class: "ijt-number-filter__label" }, Ln = { class: "ijt-number-filter__input-wrapper" }, On = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, En = ["step"], Rn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Tn = {
  key: 1,
  class: "ijt-number-filter__reset"
}, An = { class: "ijt-sr-only" }, Ge = {
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
    const u = e, a = ne(), c = $(""), n = $(""), l = $(""), d = $(""), g = z(() => c.value !== "" && (c.value !== "between" && n.value !== "" && n.value !== null || c.value === "between" && l.value !== "" && l.value !== null && d.value !== "" && d.value !== null));
    function o() {
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
    }, { deep: !0 }), (m, p) => (r(), f("div", fn, [
      t("div", null, [
        t("label", hn, b(S(a).filter_type), 1),
        R(t("select", {
          "onUpdate:modelValue": p[0] || (p[0] = (x) => c.value = x),
          class: "ijt-select",
          onChange: v
        }, [
          t("option", mn, b(S(a).no_filter), 1),
          t("option", pn, b(S(a).exact_number), 1),
          t("option", gn, b(S(a).less_than), 1),
          t("option", _n, b(S(a).greater_than), 1),
          t("option", bn, b(S(a).less_than_or_equal), 1),
          t("option", yn, b(S(a).greater_than_or_equal), 1),
          t("option", kn, b(S(a).number_range), 1)
        ], 544), [
          [Ue, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (r(), f("div", wn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(c.value) ? (r(), f("div", xn, [
          t("label", jn, b(o()), 1),
          t("div", Cn, [
            e.filter.prefix ? (r(), f("span", $n, b(e.filter.prefix), 1)) : y("", !0),
            R(t("input", {
              type: "number",
              "onUpdate:modelValue": p[1] || (p[1] = (x) => n.value = x),
              step: e.filter.step || 1,
              class: "ijt-input",
              onInput: k,
              placeholder: "0"
            }, null, 40, Sn), [
              [
                oe,
                n.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (r(), f("span", Mn, b(e.filter.suffix), 1)) : y("", !0)
          ])
        ])) : y("", !0),
        c.value === "between" ? (r(), f("div", qn, [
          t("div", zn, [
            t("label", In, b(S(a).start_number), 1),
            t("div", Nn, [
              e.filter.prefix ? (r(), f("span", Fn, b(e.filter.prefix), 1)) : y("", !0),
              R(t("input", {
                type: "number",
                "onUpdate:modelValue": p[2] || (p[2] = (x) => l.value = x),
                step: e.filter.step || 1,
                class: "ijt-input",
                onInput: k,
                placeholder: "0"
              }, null, 40, Vn), [
                [
                  oe,
                  l.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (r(), f("span", Pn, b(e.filter.suffix), 1)) : y("", !0)
            ])
          ]),
          t("div", null, [
            t("label", Bn, b(S(a).end_number), 1),
            t("div", Ln, [
              e.filter.prefix ? (r(), f("span", On, b(e.filter.prefix), 1)) : y("", !0),
              R(t("input", {
                type: "number",
                "onUpdate:modelValue": p[3] || (p[3] = (x) => d.value = x),
                step: e.filter.step || 1,
                class: "ijt-input",
                onInput: k,
                placeholder: "0"
              }, null, 40, En), [
                [
                  oe,
                  d.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (r(), f("span", Rn, b(e.filter.suffix), 1)) : y("", !0)
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      g.value ? (r(), f("div", Tn, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          t("span", An, b(S(a).reset_filter), 1),
          p[4] || (p[4] = t("svg", {
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
}, Wn = { class: "ijt-date-filter" }, Dn = { class: "ijt-date-filter__label" }, Un = { value: "" }, Hn = { value: "exact" }, Kn = { value: "before" }, Gn = { value: "after" }, Xn = { value: "between" }, Qn = { key: 0 }, Yn = { key: 0 }, Jn = { class: "ijt-date-filter__label" }, Zn = { key: 1 }, el = { style: { "margin-bottom": "0.75rem" } }, tl = { class: "ijt-date-filter__label" }, nl = { class: "ijt-date-filter__label" }, ll = {
  key: 1,
  class: "ijt-date-filter__reset"
}, al = { class: "ijt-sr-only" }, Xe = {
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
    const u = e, a = ne(), c = $(""), n = $(""), l = $(""), d = $(""), g = z(() => c.value !== "" && (c.value !== "between" && n.value || c.value === "between" && l.value && d.value));
    function o() {
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
    }, { deep: !0 }), (m, p) => (r(), f("div", Wn, [
      t("div", null, [
        t("label", Dn, b(S(a).filter_type), 1),
        R(t("select", {
          "onUpdate:modelValue": p[0] || (p[0] = (x) => c.value = x),
          class: "ijt-select",
          onChange: v
        }, [
          t("option", Un, b(S(a).no_filter), 1),
          t("option", Hn, b(S(a).exact_date), 1),
          t("option", Kn, b(S(a).before_date), 1),
          t("option", Gn, b(S(a).after_date), 1),
          t("option", Xn, b(S(a).date_range), 1)
        ], 544), [
          [Ue, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (r(), f("div", Qn, [
        ["exact", "before", "after"].includes(c.value) ? (r(), f("div", Yn, [
          t("label", Jn, b(o()), 1),
          R(t("input", {
            type: "date",
            "onUpdate:modelValue": p[1] || (p[1] = (x) => n.value = x),
            class: "ijt-input",
            onChange: k
          }, null, 544), [
            [oe, n.value]
          ])
        ])) : y("", !0),
        c.value === "between" ? (r(), f("div", Zn, [
          t("div", el, [
            t("label", tl, b(S(a).start_date), 1),
            R(t("input", {
              type: "date",
              "onUpdate:modelValue": p[2] || (p[2] = (x) => l.value = x),
              class: "ijt-input",
              onChange: k
            }, null, 544), [
              [oe, l.value]
            ])
          ]),
          t("div", null, [
            t("label", nl, b(S(a).end_date), 1),
            R(t("input", {
              type: "date",
              "onUpdate:modelValue": p[3] || (p[3] = (x) => d.value = x),
              class: "ijt-input",
              onChange: k
            }, null, 544), [
              [oe, d.value]
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      g.value ? (r(), f("div", ll, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          t("span", al, b(S(a).reset_filter), 1),
          p[4] || (p[4] = t("svg", {
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
function Qe(e) {
  let u = $(null), a = $(null);
  return Q(() => {
    mt((c) => {
      if (!a.value || !u.value)
        return;
      let n = a.value.el || a.value, l = u.value.el || u.value;
      if (!(l instanceof HTMLElement) || !(n instanceof HTMLElement))
        return;
      let { destroy: d } = Mt(l, n, e);
      c(d);
    });
  }), [u, a];
}
const ol = { class: "ijt-filter" }, sl = ["dusk"], rl = { class: "ijt-dropdown__header" }, il = { class: "ijt-dropdown__content" }, ul = ["name", "value", "onChange"], cl = ["value"], dl = {
  key: 2,
  style: { "min-width": "300px" }
}, vl = {
  key: 3,
  style: { "min-width": "250px" }
}, fl = {
  key: 4,
  style: { "min-width": "300px" }
}, hl = {
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
    const u = e, a = $(!1), [c, n] = Qe({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), l = z(() => u.filters.filter((p) => p.key === u.columnKey || p.key.startsWith(u.columnKey + "_") || p.key.includes(u.columnKey))), d = z(() => l.value.some((p) => !v(p)));
    function g() {
      l.value.length > 0 && (a.value = !a.value);
    }
    function o() {
      a.value = !1;
    }
    function v(p) {
      if (p.value === null)
        return !0;
      switch (p.type) {
        case "number_range":
          return Number(Math.max(...p.value)) === Number(p.max) && Number(Math.min(...p.value)) === Number(p.min);
        case "select":
          return p.value === "";
        case "toggle":
          return !1;
        case "date":
          return !p.value || typeof p.value == "object" && !p.value.type;
        default:
          return !p.value;
      }
    }
    function k(p, x) {
      u.onFilterChange(p, x);
    }
    function w(p) {
      let x = p.value;
      p.value && (Number(Math.max(...p.value)) === Number(p.max) && Number(Math.min(...p.value)) === Number(p.min) ? x = null : Number(Math.min(...p.value)) === 0 && Number(Math.max(...p.value)) === 0 && (x = ["0", "0"])), u.onFilterChange(p.key, x);
    }
    function m(p) {
      n.value && !n.value.contains(p.target) && !p.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && o();
    }
    return Q(() => {
      document.addEventListener("click", m);
    }), ve(() => {
      document.removeEventListener("click", m);
    }), (p, x) => (r(), f("div", ol, [
      t("button", {
        ref_key: "trigger",
        ref: c,
        onClick: g,
        class: V(["ijt-filter__button", { "ijt-filter__button--active": d.value }]),
        dusk: `column-filter-${e.columnKey}`
      }, [...x[1] || (x[1] = [
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
          onClick: x[0] || (x[0] = E(() => {
          }, ["stop"]))
        }, [
          (r(!0), f(U, null, H(l.value, (C) => (r(), f("div", {
            key: C.key
          }, [
            t("h3", rl, b(C.label), 1),
            t("div", il, [
              C.type === "select" ? (r(), f("select", {
                key: 0,
                name: C.key,
                value: C.value,
                class: "ijt-select",
                onChange: (q) => k(C.key, q.target.value)
              }, [
                (r(!0), f(U, null, H(C.options, (q, M) => (r(), f("option", {
                  key: M,
                  value: M
                }, b(q), 9, cl))), 128))
              ], 40, ul)) : y("", !0),
              C.type === "toggle" ? (r(), N(He, {
                key: 1,
                filter: C,
                "on-filter-change": k
              }, null, 8, ["filter"])) : y("", !0),
              C.type === "number" ? (r(), f("div", dl, [
                A(Ge, {
                  filter: C,
                  "on-filter-change": k
                }, null, 8, ["filter"])
              ])) : y("", !0),
              C.type === "number_range" ? (r(), f("div", vl, [
                A(Ke, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [(q) => C.value = q, (q) => w(C)],
                  max: C.max,
                  min: C.min,
                  prefix: C.prefix,
                  suffix: C.suffix,
                  step: C.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              C.type === "date" ? (r(), f("div", fl, [
                A(Xe, {
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
          onClick: o
        })) : y("", !0)
      ]))
    ]));
  }
}, ml = { class: "ijt-filter" }, pl = ["dusk"], gl = { class: "ijt-column-search__header" }, _l = { class: "ijt-column-search__content" }, bl = ["value", "placeholder"], yl = {
  key: 0,
  class: "ijt-column-search__reset"
}, kl = { class: "ijt-sr-only" }, wl = {
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
    const u = e, a = ne(), c = $(!1), n = $(null), [l, d] = Qe({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), g = z(() => u.searchInputs.find((C) => C.key === u.columnKey)), o = z(() => g.value && g.value.value || ""), v = z(() => o.value !== "");
    async function k() {
      g.value && (c.value = !c.value, c.value && (await je(), n.value && n.value.focus()));
    }
    function w() {
      c.value = !1;
    }
    function m(C) {
      const q = C.target.value;
      p(q);
    }
    function p(C) {
      u.onSearchChange(u.columnKey, C);
    }
    function x(C) {
      d.value && !d.value.contains(C.target) && !C.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Q(() => {
      document.addEventListener("click", x);
    }), ve(() => {
      document.removeEventListener("click", x);
    }), (C, q) => (r(), f("div", ml, [
      t("button", {
        ref_key: "trigger",
        ref: l,
        onClick: k,
        class: V(["ijt-filter__button", { "ijt-filter__button--active": v.value }]),
        dusk: `column-search-${e.columnKey}`
      }, [...q[2] || (q[2] = [
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
      ])], 10, pl),
      (r(), N(de, { to: "body" }, [
        c.value ? (r(), f("div", {
          key: 0,
          ref_key: "container",
          ref: d,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: q[1] || (q[1] = E(() => {
          }, ["stop"]))
        }, [
          t("h3", gl, b(S(a).search) + " " + b(e.columnLabel), 1),
          t("div", _l, [
            t("input", {
              ref_key: "searchInput",
              ref: n,
              type: "text",
              value: o.value,
              class: "ijt-column-search__input",
              placeholder: `${S(a).search} ${e.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                Re(w, ["enter"]),
                Re(w, ["escape"])
              ]
            }, null, 40, bl),
            o.value && o.value !== "" ? (r(), f("div", yl, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: q[0] || (q[0] = (M) => p(""))
              }, [
                t("span", kl, b(S(a).reset), 1),
                q[3] || (q[3] = t("svg", {
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
}, xl = ["data-column-key"], jl = { class: "ijt-table__th-content" }, Cl = { class: "ijt-table__th-label" }, $l = ["sorted"], Sl = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Ml = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, ql = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, zl = { class: "ijt-table__th-actions" }, Il = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const u = e, a = pt("columnResize", null), c = z(() => {
      if (!a)
        return "auto";
      const o = a.getColumnWidth(u.cell.key);
      return o === "auto" ? o : `${o}px`;
    }), n = z(() => (a == null ? void 0 : a.isResizing) || !1), l = z(() => (a == null ? void 0 : a.resizingColumn) || null);
    function d() {
      u.cell.sortable && u.cell.onSort(u.cell.key);
    }
    function g(o, v) {
      a && a.startResize(o, v);
    }
    return (o, v) => R((r(), f("th", {
      class: V(["ijt-table__th", e.cell.header_class]),
      style: G({ width: c.value }),
      "data-column-key": e.cell.key
    }, [
      (r(), N(ae(e.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: E(d, ["prevent"])
      }, {
        default: P(() => [
          t("span", jl, [
            t("span", Cl, [
              I(o.$slots, "label", {}, () => [
                t("span", null, b(e.cell.label), 1)
              ]),
              I(o.$slots, "sort", {}, () => [
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
                  e.cell.sorted ? y("", !0) : (r(), f("path", Sl)),
                  e.cell.sorted === "asc" ? (r(), f("path", Ml)) : y("", !0),
                  e.cell.sorted === "desc" ? (r(), f("path", ql)) : y("", !0)
                ], 10, $l)) : y("", !0)
              ])
            ]),
            t("span", zl, [
              I(o.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (r(), N(wl, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  onClick: v[0] || (v[0] = E(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : y("", !0)
              ]),
              I(o.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (r(), N(hl, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  onClick: v[1] || (v[1] = E(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change"])) : y("", !0)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && S(a) ? (r(), N(At, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": g,
        "is-active": n.value && l.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : y("", !0)
    ], 14, xl)), [
      [ee, !e.cell.hidden]
    ]);
  }
}, Nl = ["dusk", "value"], Fl = ["value"], We = {
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
    const u = ne(), a = e, c = z(() => {
      let n = [...a.options];
      return n.push(parseInt(a.value)), qt(n).sort((l, d) => l - d);
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
      }, b(d) + " " + b(S(u).per_page), 9, Fl))), 128))
    ], 40, Nl));
  }
}, Vl = {
  key: 0,
  class: "ijt-pagination"
}, Pl = {
  key: 0,
  class: "ijt-no-results"
}, Bl = { class: "ijt-sm-inline ijt-hidden" }, Ll = { class: "ijt-sm-inline ijt-hidden" }, Ol = {
  key: 2,
  class: "ijt-pagination--full"
}, El = { class: "ijt-pagination__left" }, Rl = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, Tl = { class: "ijt-pagination__info-highlight" }, Al = { class: "ijt-pagination__info-highlight" }, Wl = { class: "ijt-pagination__info-highlight" }, Dl = { class: "ijt-pagination__right" }, Ul = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, Hl = { class: "ijt-sr-only" }, Kl = { class: "ijt-pagination__button-text" }, Gl = { class: "ijt-sr-only" }, Xl = {
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
    const u = ne(), a = e, c = z(() => "links" in l.value ? l.value.links.length > 0 : !1), n = z(() => Object.keys(l.value).length > 0), l = z(() => a.meta), d = z(() => "prev_page_url" in l.value ? l.value.prev_page_url : null), g = z(() => "next_page_url" in l.value ? l.value.next_page_url : null), o = z(() => parseInt(l.value.per_page));
    return (v, k) => n.value ? (r(), f("nav", Vl, [
      !e.hasData || l.value.total < 1 ? (r(), f("p", Pl, b(S(u).no_results_found), 1)) : y("", !0),
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
          onClick: k[0] || (k[0] = E((w) => e.onClick(d.value), ["prevent"]))
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
            t("span", Bl, b(S(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        A(We, {
          dusk: "per-page-mobile",
          value: o.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (r(), N(ae(g.value ? "a" : "div"), {
          class: V([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !g.value
            }
          ]),
          href: g.value,
          dusk: g.value ? "pagination-simple-next" : null,
          onClick: k[1] || (k[1] = E((w) => e.onClick(g.value), ["prevent"]))
        }, {
          default: P(() => [
            t("span", Ll, b(S(u).next), 1),
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
      e.hasData && c.value ? (r(), f("div", Ol, [
        t("div", El, [
          A(We, {
            dusk: "per-page-full",
            value: o.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", Rl, [
            t("span", Tl, b(l.value.from), 1),
            te(" " + b(S(u).to) + " ", 1),
            t("span", Al, b(l.value.to), 1),
            te(" " + b(S(u).of) + " ", 1),
            t("span", Wl, b(l.value.total), 1),
            te(" " + b(S(u).results), 1)
          ])
        ]),
        t("div", Dl, [
          t("nav", Ul, [
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
              onClick: k[2] || (k[2] = E((w) => e.onClick(d.value), ["prevent"]))
            }, {
              default: P(() => [
                t("span", Hl, b(S(u).previous), 1),
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
                  onClick: E((p) => e.onClick(w.url), ["prevent"])
                }, {
                  default: P(() => [
                    t("span", Kl, b(w.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : y("", !0)
              ])
            ]))), 128)),
            (r(), N(ae(g.value ? "a" : "div"), {
              class: V([
                "ijt-pagination__button",
                "ijt-pagination__button--last",
                {
                  "ijt-pagination__button--disabled": !g.value
                }
              ]),
              href: g.value,
              dusk: g.value ? "pagination-next" : null,
              onClick: k[3] || (k[3] = E((w) => e.onClick(g.value), ["prevent"]))
            }, {
              default: P(() => [
                t("span", Gl, b(S(u).next), 1),
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
}, Ql = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, Yl = ["dusk", "onClick"], Jl = {
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
        t("div", Ql, [
          (r(!0), f(U, null, H(e.searchInputs, (d, g) => (r(), f("button", {
            key: g,
            dusk: `add-search-row-${d.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: E((o) => c(d.key), ["prevent"])
          }, b(d.label), 9, Yl))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, Zl = ["data-column-key"], ea = { class: "ijt-column-manager__item-left" }, ta = ["onClick", "title"], na = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, la = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, aa = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Ye = {
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
    function g(k, w) {
      const m = n.value.findIndex((p) => p.key === k);
      m !== -1 && (n.value[m].hidden = !w), c("columns-changed", n.value);
    }
    function o(k, w) {
      const m = n.value.findIndex((p) => p.key === k);
      m !== -1 && (n.value[m].pinned = !w), n.value.sort((p, x) => p.pinned && !x.pinned ? -1 : !p.pinned && x.pinned ? 1 : 0), c("columns-changed", n.value);
    }
    function v() {
      d.value = !0, c("columns-changed", n.value);
    }
    return (k, w) => (r(), N(S(zt), {
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
          t("div", ea, [
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
              onClick: E((p) => o(m.key, m.pinned), ["prevent"]),
              title: m.pinned ? "Unpin column" : "Pin column"
            }, [
              m.pinned ? (r(), f("svg", na, [...w[3] || (w[3] = [
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
              ])])) : (r(), f("svg", la, [...w[4] || (w[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, ta)) : y("", !0),
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
            onClick: E((p) => g(m.key, m.hidden), ["prevent"])
          }, [...w[6] || (w[6] = [
            t("span", { class: "ijt-sr-only" }, "Column status", -1),
            t("span", {
              "aria-hidden": "true",
              class: "ijt-toggle__handle"
            }, null, -1)
          ])], 10, aa)) : y("", !0)
        ], 8, Zl)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, oa = {
  key: 0,
  class: "ijt-button__badge"
}, sa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, ra = {
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
    const c = z(() => a.value.filter((l) => l.hidden).length);
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
        e.hasHiddenColumns ? (r(), f("span", oa, "(" + b(c.value) + ")", 1)) : y("", !0)
      ]),
      default: P(() => [
        t("div", sa, [
          A(Ye, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: n
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, ia = {
  key: 0,
  class: "ijt-button__badge"
}, ua = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, ca = { class: "ijt-dropdown__header" }, da = { class: "ijt-dropdown__content" }, va = ["name", "value", "onChange"], fa = ["value"], ha = {
  key: 2,
  style: { "min-width": "250px" }
}, ma = {
  key: 3,
  style: { "min-width": "300px" }
}, pa = {
  key: 4,
  style: { "min-width": "300px" }
}, ga = {
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
    const u = e, a = z(() => u.filters.filter((l) => !c(l)).length);
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
        e.hasEnabledFilters ? (r(), f("span", ia, "(" + b(a.value) + ")", 1)) : y("", !0)
      ]),
      default: P(() => [
        t("div", ua, [
          (r(!0), f(U, null, H(e.filters, (g, o) => (r(), f("div", { key: o }, [
            t("h3", ca, b(g.label), 1),
            t("div", da, [
              g.type === "select" ? (r(), f("select", {
                key: 0,
                name: g.key,
                value: g.value,
                class: "ijt-select",
                onChange: (v) => e.onFilterChange(g.key, v.target.value)
              }, [
                (r(!0), f(U, null, H(g.options, (v, k) => (r(), f("option", {
                  key: k,
                  value: k
                }, b(v), 9, fa))), 128))
              ], 40, va)) : y("", !0),
              g.type === "toggle" ? (r(), N(He, {
                key: 1,
                filter: g,
                "on-filter-change": e.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : y("", !0),
              g.type === "number_range" ? (r(), f("div", ha, [
                A(Ke, {
                  modelValue: g.value,
                  "onUpdate:modelValue": [(v) => g.value = v, (v) => n(g)],
                  max: g.max,
                  min: g.min,
                  prefix: g.prefix,
                  suffix: g.suffix,
                  step: g.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              g.type === "date" ? (r(), f("div", ma, [
                A(Xe, {
                  filter: g,
                  "on-filter-change": e.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : y("", !0),
              g.type === "number" ? (r(), f("div", pa, [
                A(Ge, {
                  filter: g,
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
}, _a = { class: "ijt-global-search" }, ba = ["placeholder", "value"], ya = {
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
    return (u, a) => (r(), f("div", _a, [
      t("input", {
        class: "ijt-global-search__input",
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: a[0] || (a[0] = (c) => e.onChange(c.target.value))
      }, null, 40, ba),
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
}, ka = { class: "ijt-search-row__container" }, wa = ["for"], xa = ["id", "name", "value", "onInput"], ja = { class: "ijt-search-row__remove" }, Ca = ["dusk", "onClick"], $a = {
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
    let a = z(() => u.el.value);
    const c = e;
    function n(l) {
      return c.forcedVisibleSearchInputs.includes(l);
    }
    return X(c.forcedVisibleSearchInputs, (l) => {
      const d = l.length > 0 ? l[l.length - 1] : null;
      !d || je().then(() => {
        const g = It(a.value, (o) => o.name === d);
        g && g.focus();
      });
    }, { immediate: !0 }), (l, d) => (r(!0), f(U, null, H(e.searchInputs, (g, o) => R((r(), f("div", {
      key: o,
      class: "ijt-search-row"
    }, [
      t("div", ka, [
        t("label", {
          for: g.key,
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
          t("span", null, b(g.label), 1)
        ], 8, wa),
        (r(), f("input", {
          id: g.key,
          ref_for: !0,
          ref: u.el,
          key: g.key,
          name: g.key,
          value: g.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (v) => e.onChange(g.key, v.target.value)
        }, null, 40, xa)),
        t("div", ja, [
          t("button", {
            class: "ijt-search-row__remove-button",
            dusk: `remove-search-row-${g.key}`,
            onClick: E((v) => e.onRemove(g.key), ["prevent"])
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
          ])], 8, Ca)
        ])
      ])
    ])), [
      [ee, g.value !== null || n(g.key)]
    ])), 128));
  }
}, Sa = {
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
        onClick: c[0] || (c[0] = E((...l) => e.onClick && e.onClick(...l), ["prevent"]))
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
}, Ma = {}, qa = { class: "ijt-wrapper" }, za = { class: "ijt-wrapper__outer" }, Ia = { class: "ijt-wrapper__inner" }, Na = { class: "ijt-wrapper__container" };
function Fa(e, u) {
  return r(), f("div", qa, [
    t("div", za, [
      t("div", Ia, [
        t("div", Na, [
          I(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Va = /* @__PURE__ */ Ce(Ma, [["render", Fa]]), Pa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, Ba = ["dusk", "onClick"], La = { class: "ijt-dropdown__content" }, Oa = {
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
    function d(g) {
      var o, v;
      (o = a.actions.toggleColumns) != null && o.onReorder ? a.actions.toggleColumns.onReorder(g) : (v = a.actions.toggleColumns) != null && v.onChange && a.actions.toggleColumns.onChange(g);
    }
    return (g, o) => (r(), N(fe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: l
    }, {
      button: P(() => [...o[5] || (o[5] = [
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
        var v, k, w, m, p;
        return [
          t("div", Pa, [
            R(t("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (r(), f("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: o[0] || (o[0] = (x) => n.value = !0)
              }, [
                o[6] || (o[6] = t("svg", {
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
                onClick: o[1] || (o[1] = (x) => c.value = !0)
              }, [
                o[7] || (o[7] = t("svg", {
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
              o[9] || (o[9] = t("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in e.actions ? (r(), f("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: o[2] || (o[2] = (...x) => {
                  var C, q;
                  return ((C = e.actions.reset) == null ? void 0 : C.onClick) && ((q = e.actions.reset) == null ? void 0 : q.onClick(...x));
                })
              }, [
                o[8] || (o[8] = t("svg", {
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
            R(t("div", null, [
              t("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: o[3] || (o[3] = (x) => n.value = !1)
              }, [
                o[10] || (o[10] = t("svg", {
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
              (r(!0), f(U, null, H(e.actions.searchFields.searchInputs, (x, C) => (r(), f("button", {
                key: C,
                dusk: `add-search-row-${x.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: E((q) => e.actions.searchFields.onClick(x.key), ["prevent"])
              }, b(x.label), 9, Ba))), 128))
            ], 512), [
              [ee, n.value]
            ]),
            R(t("div", null, [
              t("button", {
                type: "button",
                class: "ijt-dropdown__item",
                onClick: o[4] || (o[4] = (x) => c.value = !1)
              }, [
                o[11] || (o[11] = t("svg", {
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
                t("span", null, b((p = S(u).show_hide_columns) != null ? p : "Show / Hide columns"), 1)
              ]),
              t("div", La, [
                A(Ye, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: d
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ee, c.value]
            ]),
            R(t("div", null, [
              I(g.$slots, "default")
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
function Ea(e) {
  const u = $(!1), a = $(null), c = $(0), n = $(0), l = gt({}), d = () => {
    const M = _t(e) ? S(e) : e;
    return M ? `${M}-columnWidths` : null;
  }, g = () => {
    const M = d();
    if (!M)
      return;
    const L = localStorage.getItem(M);
    if (L)
      try {
        const O = JSON.parse(L);
        Object.assign(l, O);
      } catch (O) {
        console.warn("Unable to load column widths:", O);
      }
  }, o = () => {
    const M = d();
    !M || localStorage.setItem(M, JSON.stringify(l));
  }, v = (M, L) => {
    M.preventDefault(), M.stopPropagation(), u.value = !0, a.value = L, c.value = M.clientX;
    const O = M.target.closest("th");
    n.value = O.offsetWidth;
    const B = O.closest("table");
    B && B.querySelectorAll("thead th[data-column-key]").forEach((K) => {
      const D = K.getAttribute("data-column-key"), Y = K.offsetWidth;
      l[D] || (l[D] = Y), K.style.width = `${l[D]}px`;
      const J = Array.from(K.parentNode.children).indexOf(K);
      B.querySelectorAll("tbody tr").forEach((me) => {
        const se = me.children[J];
        se && (se.style.width = `${l[D]}px`);
      });
    }), document.addEventListener("mousemove", k), document.addEventListener("mouseup", w), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, k = (M) => {
    if (!u.value || !a.value)
      return;
    const L = M.clientX - c.value, O = Math.max(50, n.value + L);
    l[a.value] = O;
    const B = document.querySelector(`th[data-column-key="${a.value}"]`);
    if (B) {
      B.style.width = `${O}px`;
      const W = B.closest("table");
      if (W) {
        const K = Array.from(B.parentNode.children).indexOf(B);
        W.querySelectorAll("tbody tr").forEach((Y) => {
          const J = Y.children[K];
          J && (J.style.width = `${O}px`);
        });
      }
    }
  }, w = () => {
    u.value && (u.value = !1, a.value = null, o(), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, m = (M) => l[M] || "auto", p = (M, L) => {
    l[M] = L, o();
  }, x = (M) => {
    if (!M)
      return;
    M.querySelectorAll("thead th[data-column-key]").forEach((O) => {
      const B = O.getAttribute("data-column-key");
      if (!l[B]) {
        const D = O.offsetWidth;
        l[B] = Math.max(D, 100);
      }
      O.style.width = `${l[B]}px`;
      const W = Array.from(O.parentNode.children).indexOf(O);
      M.querySelectorAll("tbody tr").forEach((D) => {
        const Y = D.children[W];
        Y && (Y.style.width = `${l[B]}px`);
      });
    });
  }, C = () => {
    Object.keys(l).forEach((L) => {
      delete l[L];
    });
    const M = d();
    M && localStorage.removeItem(M);
  }, q = () => {
    u.value && (document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Q(() => {
    g();
  }), ve(() => {
    q();
  }), {
    isResizing: u,
    resizingColumn: a,
    columnWidths: l,
    startResize: v,
    getColumnWidth: m,
    setColumnWidth: p,
    resetColumnWidths: C,
    loadColumnWidths: g,
    saveColumnWidths: o,
    initializeColumnWidths: x
  };
}
const Ra = ["dusk"], Ta = { class: "ijt-toolbar" }, Aa = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, Wa = { key: 0 }, Da = ["href"], Ua = { class: "ijt-table-container" }, Ha = { class: "ijt-table__thead" }, Ka = { class: "ijt-table__tr" }, Ga = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, Xa = ["id"], Qa = { class: "ijt-table__tbody" }, Ya = {
  key: 0,
  class: "ijt-table__td ijt-table__td--pinned-checkbox",
  style: { width: "60px" }
}, Ja = ["id", "onUpdate:modelValue"], Za = ["onClick", "data-column-key"], eo = { class: "ijt-footer" }, to = {
  key: 0,
  class: "ijt-footer__selection-info"
}, no = {
  key: 1,
  class: "ijt-loading"
}, lo = {
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
    const a = ne(), c = u, n = e, l = z(() => n.localStorageName ? n.localStorageName : n.name && n.name !== "default" ? `table-${n.name}` : null);
    bt();
    const d = n.resizeableColumns ? Ea(l) : null;
    yt("columnResize", d);
    const g = $(!1), o = z(() => Ae().props.queryBuilderProps ? { ...Ae().props.queryBuilderProps[n.name] } : {}), v = $(o.value), k = $([]), w = $(null), m = $(null), p = $(!1);
    let x;
    const C = z(() => o.value.pageName), q = $([]), M = $(null), L = $(!1), O = z(() => o.value.hasToggleableColumns || o.value.hasFilters || o.value.hasSearchInputs ? !1 : !o.value.globalSearch), B = z(() => o.value.infiniteScrolling ? k.value : Object.keys(n.resource).length === 0 ? n.data : "data" in n.resource ? n.resource.data : n.resource), W = z(() => Object.keys(n.resource).length === 0 ? n.meta : "links" in n.resource && "meta" in n.resource && Object.keys(n.resource.links).length === 4 && "next" in n.resource.links && "prev" in n.resource.links ? {
      ...n.resource.meta,
      next_page_url: n.resource.links.next,
      prev_page_url: n.resource.links.prev
    } : "meta" in n.resource ? n.resource.meta : n.resource), K = z(() => B.value.length > 0 ? !0 : W.value.total > 0), D = $({
      reset: {
        onClick: pe
      },
      toggleColumns: {
        show: o.value.hasToggleableColumns,
        columns: o.value.columns,
        onChange: _e
      },
      searchFields: {
        show: o.value.hasSearchInputs && !n.hideSearchInputsAboveTable,
        searchInputs: o.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: o.value.hasSearchInputsWithoutValue,
        onClick: J
      }
    });
    function Y(s) {
      q.value = q.value.filter((i) => i != s), re(s, null);
    }
    function J(s) {
      q.value.push(s);
    }
    const he = z(() => {
      if (q.value.length > 0)
        return !0;
      const s = xe.parse(location.search.substring(1));
      if (s[C.value] > 1)
        return !0;
      const h = n.name === "default" ? "" : n.name + "_";
      let j = !1;
      return Z(["filter", "columns", "cursor", "sort"], (_) => {
        const F = s[h + _];
        _ === "sort" && F === o.value.defaultSort || F !== void 0 && (j = !0);
      }), j;
    }), me = (s, i) => {
      let h = [];
      if (n.striped && i % 2 && h.push("ijt-table__tr--striped"), n.rowClass && typeof n.rowClass == "function") {
        const j = n.rowClass(s);
        j && h.push(j);
      }
      return h.join(" ");
    }, se = z(() => {
      if (!n.showExportButton)
        return null;
      const s = new URL(window.location.href);
      s.search = "";
      const i = new URLSearchParams();
      if (o.value.page && o.value.page > 1 && i.set(C.value, o.value.page), o.value.sort) {
        const _ = n.name === "default" ? "sort" : `${n.name}_sort`;
        i.set(_, o.value.sort);
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
      const j = v.value.columns.filter((_) => !_.hidden).map((_) => _.key);
      if (j.length !== v.value.columns.length) {
        const _ = n.name === "default" ? "columns" : `${n.name}_columns`;
        j.forEach((F) => {
          i.append(`${_}[]`, F);
        });
      }
      if (o.value.perPageOptions && o.value.perPageOptions.length > 0) {
        const _ = new URLSearchParams(window.location.search).get("perPage") || o.value.perPageOptions[0];
        _ && _ !== o.value.perPageOptions[0] && i.set("perPage", _);
      }
      return i.set("do_export", "1"), i.set("table", n.name || "default"), s.search = i.toString(), s.toString();
    });
    function pe() {
      q.value = [], Z(v.value.filters, (s, i) => {
        v.value.filters[i].value = null;
      }), Z(v.value.searchInputs, (s, i) => {
        v.value.searchInputs[i].value = null;
      }), Z(v.value.columns, (s, i) => {
        v.value.columns[i].hidden = s.can_be_hidden ? !o.value.defaultVisibleToggleableColumns.includes(s.key) : !1, v.value.columns[i].pinned = !1;
      }), l.value && localStorage.removeItem(`${l.value}-columns`), n.resizeableColumns && d && d.resetColumnWidths(), v.value.sort = null, v.value.cursor = null, v.value.page = 1;
    }
    const Se = {};
    function re(s, i) {
      clearTimeout(Se[s]), Se[s] = setTimeout(() => {
        ye.value && n.preventOverlappingRequests && ye.value.cancel();
        const h = ie("searchInputs", s);
        v.value.searchInputs[h].value = i, v.value.cursor = null, v.value.page = 1;
      }, n.inputDebounceMs);
    }
    function Me(s) {
      re("global", s);
    }
    function ge(s, i) {
      const h = ie("filters", s);
      v.value.filters[h].value = i, v.value.cursor = null, v.value.page = 1;
    }
    function qe(s) {
      v.value.cursor = null, v.value.perPage = s, v.value.page = 1;
    }
    function ie(s, i) {
      return Vt(v.value[s], (h) => h.key == i);
    }
    function _e(s) {
      v.value.columns = s, v.value.columns.sort((i, h) => i.pinned && !h.pinned ? -1 : !i.pinned && h.pinned ? 1 : 0), Je();
    }
    function Je() {
      if (!l.value)
        return;
      const s = v.value.columns.map((i, h) => ({
        key: i.key,
        hidden: i.hidden,
        pinned: i.pinned || !1,
        order: h
      }));
      localStorage.setItem(`${l.value}-columns`, JSON.stringify(s));
    }
    function Ze() {
      let s = {};
      return Z(v.value.searchInputs, (i) => {
        i.value !== null && (s[i.key] = i.value);
      }), Z(v.value.filters, (i) => {
        let h = i.value;
        h !== null && (i.type === "number_range" && Number(Math.max(...i.value)) === Number(i.max) && Number(Math.min(...i.value)) === Number(i.min) && (h = null), s[i.key] = h);
      }), s;
    }
    function et() {
      const s = v.value.columns;
      let i = Ft(s, (j) => !j.hidden), h = Bt(i, (j) => j.key).sort();
      return Pt(h, o.value.defaultVisibleToggleableColumns) ? {} : h;
    }
    function tt() {
      const s = Ze(), i = et(), h = {};
      Object.keys(s).length > 0 && (h.filter = s), Object.keys(i).length > 0 && (h.columns = i);
      const j = v.value.cursor, _ = v.value.page, F = v.value.sort, T = v.value.perPage;
      return j && (h.cursor = j), _ > 1 && (h.page = _), T > 1 && (h.perPage = T), F && (h.sort = F), h;
    }
    function ze(s) {
      if (!s)
        return null;
      if (n.paginationClickCallback && typeof n.paginationClickCallback == "function") {
        n.paginationClickCallback(s);
        return;
      }
      Ie(s);
    }
    function nt() {
      const s = xe.parse(location.search.substring(1)), i = n.name === "default" ? "" : n.name + "_";
      Z(["filter", "columns", "cursor", "sort"], (j) => {
        delete s[i + j];
      }), delete s[C.value], Z(tt(), (j, _) => {
        _ === "page" ? s[C.value] = j : _ === "perPage" ? s.perPage = j : s[i + _] = j;
      });
      let h = xe.stringify(s, {
        filter(j, _) {
          return typeof _ == "object" && _ !== null ? Lt(_) : _;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!h || h === C.value + "=1") && (h = ""), h;
    }
    const be = $(!1), ye = $(null);
    function Ie(s) {
      !s || Ot.get(
        s,
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
    function lt(s, i, h) {
      var j;
      n.hasCheckboxes && ((j = s.target) == null ? void 0 : j.parentElement.cellIndex) === 0 || c("rowClicked", s, i, h);
    }
    async function at() {
      if (!(p.value || !w.value)) {
        p.value = !0;
        try {
          const s = await fetch(w.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!s.ok)
            throw new Error("Network response was not ok");
          const i = await s.json();
          k.value = [...k.value, ...i.data], w.value = i.next_page_url;
        } catch (s) {
          console.error("Error loading more data:", s);
        } finally {
          p.value = !1;
        }
      }
    }
    function ke() {
      !o.value.infiniteScrolling || !m.value || (x && (x.disconnect(), x = null), n.resource && n.resource.data && k.value.length === 0 && (k.value = [...n.resource.data], w.value = W.value.next_page_url || null), x = new IntersectionObserver(
        (s) => {
          s.forEach((i) => {
            i.isIntersecting && at();
          });
        },
        {
          rootMargin: "0px 0px 100px 0px",
          threshold: 0.1
        }
      ), x.observe(m.value));
    }
    X(v, () => {
      o.value.infiniteScrolling && (k.value = [], w.value = null), Ie(location.pathname + "?" + nt()), L.value = !1;
    }, { deep: !0 }), X(() => n.resource, () => {
      var s;
      if (!o.value.infiniteScrolling && ((s = n.resource) == null ? void 0 : s.data)) {
        const i = n.resource.data.filter((h) => h.__itSelected);
        c("selectionChanged", i);
      }
    }, { deep: !0 }), X(() => o.value, (s) => {
      var h;
      if (!o.value.infiniteScrolling)
        return;
      const i = ((h = n.resource) == null ? void 0 : h.data) || [];
      if (i.length > 0) {
        k.value = [...i], w.value = W.value.next_page_url || null;
        const j = i.filter((_) => _.__itSelected);
        c("selectionChanged", j), setTimeout(() => {
          m.value && ke();
        }, 100);
      }
    }, { deep: !0 });
    const Ne = () => {
      n.resizeableColumns && d && setTimeout(() => {
        var i;
        const s = (i = M.value) == null ? void 0 : i.querySelector("table");
        s && d.initializeColumnWidths(s);
      }, 0), o.value.infiniteScrolling && setTimeout(() => {
        m.value && ke();
      }, 100);
    };
    Q(() => {
      document.addEventListener("inertia:success", Ne), ot(), n.resizeableColumns && d && setTimeout(() => {
        var i;
        const s = (i = M.value) == null ? void 0 : i.querySelector("table");
        s && d.initializeColumnWidths(s);
      }, 0), o.value.infiniteScrolling && ke();
    });
    function ot() {
      if (!l.value)
        return;
      const s = localStorage.getItem(`${l.value}-columns`);
      if (!!s)
        try {
          const i = JSON.parse(s);
          if (i.length > 0 && "order" in i[0]) {
            const h = new Map(i.map((j) => [j.key, j]));
            v.value.columns.forEach((j, _) => {
              const F = h.get(j.key);
              F && (v.value.columns[_].hidden = F.hidden, v.value.columns[_].pinned = F.pinned || !1);
            }), v.value.columns.sort((j, _) => {
              var Oe, Ee;
              const F = h.get(j.key), T = h.get(_.key);
              if (j.pinned && !_.pinned)
                return -1;
              if (!j.pinned && _.pinned)
                return 1;
              const le = (Oe = F == null ? void 0 : F.order) != null ? Oe : 999, we = (Ee = T == null ? void 0 : T.order) != null ? Ee : 999;
              return le - we;
            });
          } else
            i.forEach((h, j) => {
              const _ = v.value.columns.findIndex((F) => F.key === h.key);
              _ !== -1 && (v.value.columns[_].hidden = h.hidden, v.value.columns[_].pinned = h.pinned || !1);
            });
        } catch (i) {
          console.warn("Error loading column order from localStorage:", i);
        }
    }
    ve(() => {
      document.removeEventListener("inertia:success", Ne), x && (x.disconnect(), x = null);
    });
    function Fe(s) {
      v.value.sort == s ? v.value.sort = `-${s}` : v.value.sort = s, v.value.cursor = null, v.value.page = 1;
    }
    function ue(s) {
      const i = ie("columns", s);
      return !v.value.columns[i].hidden;
    }
    function ce(s) {
      const i = ie("columns", s), h = Nt(v.value.columns[i]);
      h.onSort = Fe, h.filters = v.value.filters.filter(
        (_) => _.key === s || _.key.startsWith(s + "_") || _.key.includes(s)
      );
      const j = v.value.searchInputs.filter(
        (_) => _.key === s
      );
      return j.length > 0 ? (h.searchable = !0, h.searchInputs = j) : (h.searchable = !1, h.searchInputs = []), h.onFilterChange = ge, h.onSearchChange = re, h;
    }
    function st() {
      n.resource.data.forEach((s) => {
        s.__itSelected = L.value;
      });
    }
    function rt(s) {
      if (!n.resizeableColumns || !d)
        return "auto";
      const i = d.getColumnWidth(s);
      return i === "auto" ? i : `${i}px`;
    }
    function Ve(s) {
      if (!n.resizeableColumns || !d)
        return "0px";
      let i = 0;
      const h = v.value.columns.filter((j) => !j.hidden);
      n.hasCheckboxes && (i += 60);
      for (const j of h) {
        if (j.key === s)
          break;
        if (j.pinned) {
          const _ = d.getColumnWidth(j.key);
          i += _ === "auto" ? 150 : _;
        }
      }
      return `${i}px`;
    }
    function Pe(s) {
      const i = v.value.columns.find((h) => h.key === s);
      return i && i.pinned;
    }
    function it(s) {
      return Pe(s) ? {
        position: "sticky",
        left: Ve(s),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function ut(s) {
      return Pe(s) ? {
        position: "sticky",
        left: Ve(s),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const ct = z(() => {
      if (!n.resizeableColumns || !d)
        return "100%";
      let s = 0, i = !1;
      return n.hasCheckboxes && (s += 60), o.value.columns.forEach((h) => {
        if (!ue(h.key))
          return;
        const j = d.getColumnWidth(h.key);
        j === "auto" ? i = !0 : s += j;
      }), !i && s > 0 ? `${s}px` : "max(100%, " + (s > 0 ? s + "px" : "800px") + ")";
    }), Be = z(() => B.value.filter((s) => s.__itSelected)), Le = z(() => Be.value.length), dt = z(() => Le.value === 0 ? a.noLineSelected : `${Le.value} ${a.lineSelected}`);
    function vt() {
      n.resizeableColumns && (g.value = !0);
    }
    function ft() {
      n.resizeableColumns && setTimeout(() => {
        g.value = !1;
      }, 100);
    }
    return (s, i) => (r(), N(kt, null, {
      default: P(() => [
        (r(), f("fieldset", {
          ref_key: "tableFieldset",
          ref: M,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: V(["ijt-table-fieldset", { "ijt-table-fieldset--loading": be.value }])
        }, [
          t("div", Ta, [
            o.value.globalSearch ? (r(), f("div", Aa, [
              I(s.$slots, "tableGlobalSearch", {
                hasGlobalSearch: o.value.globalSearch,
                label: o.value.globalSearch ? o.value.globalSearch.label : null,
                value: o.value.globalSearch ? o.value.globalSearch.value : null,
                onChange: Me
              }, () => [
                o.value.globalSearch ? (r(), N(ya, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: o.value.globalSearch.label,
                  value: o.value.globalSearch.value,
                  "on-change": Me
                }, null, 8, ["label", "value"])) : y("", !0)
              ], !0)
            ])) : y("", !0),
            t("div", null, [
              I(s.$slots, "tableFilter", {
                hasFilters: o.value.hasFilters,
                hasEnabledFilters: o.value.hasEnabledFilters,
                filters: o.value.filters,
                onFilterChange: ge
              }, () => [
                o.value.hasFilters ? (r(), N(ga, {
                  key: 0,
                  "has-enabled-filters": o.value.hasEnabledFilters,
                  filters: o.value.filters,
                  "on-filter-change": ge
                }, null, 8, ["has-enabled-filters", "filters"])) : y("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? I(s.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: o.value.hasSearchInputs,
              hasSearchInputsWithoutValue: o.value.hasSearchInputsWithoutValue,
              searchInputs: o.value.searchInputsWithoutGlobal,
              onAdd: J
            }, () => [
              o.value.hasSearchInputs ? (r(), N(Jl, {
                key: 0,
                "search-inputs": o.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": o.value.hasSearchInputsWithoutValue,
                "on-add": J
              }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : y("", !0)
            ], !0) : y("", !0),
            e.withGroupedMenu ? y("", !0) : I(s.$slots, "tableColumns", {
              key: 2,
              hasColumns: o.value.hasToggleableColumns,
              columns: v.value.columns,
              hasHiddenColumns: o.value.hasHiddenColumns,
              onChange: _e
            }, () => [
              o.value.hasToggleableColumns ? (r(), N(ra, {
                key: 0,
                columns: v.value.columns,
                "has-hidden-columns": o.value.hasHiddenColumns,
                "on-change": _e,
                "table-name": e.name
              }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : y("", !0)
            ], !0),
            e.withGroupedMenu ? I(s.$slots, "groupedAction", {
              key: 3,
              actions: D.value
            }, () => [
              A(Oa, { actions: D.value }, {
                default: P(() => [
                  I(s.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["actions"])
            ], !0) : y("", !0),
            e.withGroupedMenu ? y("", !0) : I(s.$slots, "tableReset", {
              key: 4,
              canBeReset: he.value,
              onClick: pe
            }, () => [
              he.value ? (r(), f("div", Wa, [
                A(Sa, { "on-click": pe })
              ])) : y("", !0)
            ], !0),
            e.showExportButton ? I(s.$slots, "exportButton", {
              key: 5,
              exportUrl: se.value,
              translations: S(a)
            }, () => [
              t("a", {
                href: se.value,
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
              ])], 8, Da)
            ], !0) : y("", !0)
          ]),
          e.hideSearchInputsAboveTable ? y("", !0) : I(s.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: o.value.hasSearchInputsWithValue,
            searchInputs: o.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: q.value,
            onChange: re
          }, () => [
            o.value.hasSearchInputsWithValue || q.value.length > 0 ? (r(), N($a, {
              key: 0,
              "search-inputs": o.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": q.value,
              "on-change": re,
              "on-remove": Y
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : y("", !0)
          ], !0),
          I(s.$slots, "tableWrapper", { meta: W.value }, () => [
            A(Va, {
              class: V({ "ijt-wrapper--mt": !O.value })
            }, {
              default: P(() => [
                I(s.$slots, "table", {}, () => [
                  t("div", Ua, [
                    t("table", {
                      class: V(["ijt-table", { "ijt-table--show-resize-indicators": e.resizeableColumns && g.value }]),
                      style: G([{ "table-layout": "fixed", "min-width": "100%" }, { width: ct.value }]),
                      onMouseenter: i[1] || (i[1] = (h) => e.resizeableColumns ? vt : null),
                      onMouseleave: i[2] || (i[2] = (h) => e.resizeableColumns ? ft : null)
                    }, [
                      t("thead", Ha, [
                        I(s.$slots, "head", {
                          show: ue,
                          sortBy: Fe,
                          header: ce
                        }, () => [
                          t("tr", Ka, [
                            e.hasCheckboxes ? (r(), f("th", Ga, [
                              R(t("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: st,
                                "onUpdate:modelValue": i[0] || (i[0] = (h) => L.value = h),
                                class: "ijt-table__checkbox"
                              }, null, 40, Xa), [
                                [Te, L.value]
                              ])
                            ])) : y("", !0),
                            (r(!0), f(U, null, H(v.value.columns, (h) => (r(), N(Il, {
                              cell: ce(h.key),
                              style: G(ut(h.key))
                            }, {
                              label: P(() => [
                                I(s.$slots, `header(${h.key})`, {
                                  label: ce(h.key).label,
                                  column: ce(h.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", Qa, [
                        I(s.$slots, "body", { show: ue }, () => [
                          (r(!0), f(U, null, H(B.value, (h, j) => (r(), f("tr", {
                            key: `table-${e.name}-row-${j}`,
                            class: V(["ijt-table__tr", me(h, j)])
                          }, [
                            e.hasCheckboxes ? (r(), f("td", Ya, [
                              R(t("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${j}`,
                                class: "ijt-table__checkbox",
                                "onUpdate:modelValue": (_) => h.__itSelected = _
                              }, null, 8, Ja), [
                                [Te, h.__itSelected]
                              ])
                            ])) : y("", !0),
                            (r(!0), f(U, null, H(v.value.columns, (_, F) => R((r(), f("td", {
                              key: `table-${e.name}-row-${j}-column-${_.key}`,
                              onClick: (T) => lt(T, h, _.key),
                              class: V(["ijt-table__td", _.body_class]),
                              "data-column-key": _.key,
                              style: G({
                                width: rt(_.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...it(_.key)
                              })
                            }, [
                              I(s.$slots, `cell(${_.key})`, { item: h }, () => [
                                te(b(h[_.key]), 1)
                              ], !0)
                            ], 14, Za)), [
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
                o.value.infiniteScrolling ? y("", !0) : I(s.$slots, "pagination", {
                  key: 0,
                  onClick: ze,
                  hasData: K.value,
                  meta: W.value,
                  perPageOptions: o.value.perPageOptions,
                  onPerPageChange: qe,
                  showExportButton: e.showExportButton
                }, () => [
                  t("div", eo, [
                    e.hasCheckboxes ? (r(), f("span", to, b(dt.value), 1)) : y("", !0),
                    A(Xl, {
                      "on-click": ze,
                      "has-data": K.value,
                      meta: W.value,
                      "per-page-options": o.value.perPageOptions,
                      "on-per-page-change": qe,
                      "show-export-button": e.showExportButton
                    }, {
                      exportButton: P((h) => [
                        I(s.$slots, "exportButton", wt(xt(h)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                o.value.infiniteScrolling && p.value ? (r(), f("div", no, [...i[4] || (i[4] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : y("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          I(s.$slots, "tableSummary", {
            data: B.value,
            meta: W.value,
            selectedItems: Be.value
          }, void 0, !0)
        ], 10, Ra))
      ]),
      _: 3
    }));
  }
}, Co = /* @__PURE__ */ Ce(lo, [["__scopeId", "data-v-09d0bb29"]]);
export {
  fe as ButtonWithDropdown,
  Il as HeaderCell,
  Et as OnClickOutside,
  Xl as Pagination,
  Co as Table,
  Jl as TableAddSearchRow,
  ra as TableColumns,
  ga as TableFilter,
  ya as TableGlobalSearch,
  Sa as TableReset,
  $a as TableSearchRows,
  Va as TableWrapper,
  ne as getTranslations,
  xo as setTranslation,
  jo as setTranslations
};
