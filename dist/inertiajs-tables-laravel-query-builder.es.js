import { ref as $, onMounted as Y, onBeforeUnmount as Ue, openBlock as r, createElementBlock as h, renderSlot as z, watch as Q, nextTick as je, createBlock as F, withCtx as O, createElementVNode as t, normalizeClass as P, withModifiers as R, withDirectives as T, vShow as Z, createStaticVNode as pt, normalizeStyle as X, toDisplayString as b, createCommentVNode as y, createTextVNode as ee, computed as I, unref as S, vModelSelect as He, vModelText as se, watchEffect as gt, onUnmounted as me, Teleport as he, Fragment as U, renderList as H, createVNode as W, withKeys as Te, inject as _t, resolveDynamicComponent as oe, reactive as bt, isRef as yt, getCurrentInstance as kt, provide as wt, Transition as xt, vModelCheckbox as Ae, normalizeProps as jt, guardReactiveProps as Ct } from "vue";
import { createPopper as $t } from "@popperjs/core/lib/popper-lite";
import St from "@popperjs/core/lib/modifiers/preventOverflow";
import Mt from "@popperjs/core/lib/modifiers/flip";
import qt from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as It } from "@popperjs/core";
import Nt from "lodash-es/uniq";
import zt from "vuedraggable";
import Ft from "lodash-es/find";
import xe from "qs";
import Vt from "lodash-es/clone";
import Pt from "lodash-es/filter";
import Bt from "lodash-es/findKey";
import J from "lodash-es/forEach";
import Lt from "lodash-es/isEqual";
import Ot from "lodash-es/map";
import Et from "lodash-es/pickBy";
import { usePage as We, router as Rt } from "@inertiajs/vue3";
const Tt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const u = e, a = $(null), c = $(null);
    return Y(() => {
      a.value = (n) => {
        n.target === c.value || c.value.contains(n.target) || u.do();
      }, document.addEventListener("click", a.value), document.addEventListener("touchstart", a.value);
    }), Ue(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (n, l) => (r(), h("div", {
      ref_key: "root",
      ref: c
    }, [
      z(n.$slots, "default")
    ], 512));
  }
}, At = { class: "ijt-dropdown" }, Wt = ["dusk", "disabled"], pe = {
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
    const c = a, n = e, l = $(!1), d = $(null), _ = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: m }) {
        const p = m.elements.popper;
        if (!p)
          return;
        const j = 12, C = p.getBoundingClientRect(), q = m.placement || "bottom";
        let M;
        q.startsWith("top") ? M = C.bottom - j : M = window.innerHeight - C.top - j;
        const B = Math.max(M, 160);
        p.style.maxHeight = `${B}px`, p.style.overflowY = "auto", p.style.overscrollBehavior = "contain", p.style.webkitOverflowScrolling = "touch";
      }
    };
    function s() {
      l.value = !l.value;
    }
    function f() {
      l.value = !1;
    }
    Q(l, () => {
      l.value && d.value && je(() => d.value.update()), l.value || c("closed"), l.value && c("opened");
    });
    const k = $(null), w = $(null);
    return Y(() => {
      d.value = $t(k.value, w.value, {
        placement: n.placement,
        modifiers: [qt, Mt, St, _]
      });
    }), Ue(() => {
      d.value && (d.value.destroy(), d.value = null);
    }), u({ hide: f }), (m, p) => (r(), F(Tt, { do: f }, {
      default: O(() => [
        t("div", At, [
          t("button", {
            ref_key: "button",
            ref: k,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: P(["ijt-dropdown__trigger", { "ijt-dropdown__trigger--disabled": e.disabled }]),
            "aria-haspopup": "true",
            onClick: R(s, ["prevent"])
          }, [
            z(m.$slots, "button")
          ], 10, Wt),
          T(t("div", {
            ref_key: "tooltip",
            ref: w,
            class: "ijt-dropdown__panel"
          }, [
            z(m.$slots, "default")
          ], 512), [
            [Z, l.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, Dt = {
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
    return (c, n) => (r(), h("div", {
      class: P(["ijt-resize-handle", {
        "ijt-resize-handle--active": e.isActive,
        "ijt-resize-handle--visible": e.isActive
      }]),
      onMousedown: a
    }, [...n[0] || (n[0] = [
      pt('<div class="ijt-resize-handle__separator"></div><div class="ijt-resize-handle__grip"><div class="ijt-resize-handle__grip-dots"><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div></div></div>', 2)
    ])], 34));
  }
}, Ut = { class: "ijt-toggle-filter" }, Ht = { class: "ijt-toggle-filter__switch" }, Kt = ["checked"], Ke = {
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
    return (u, a) => (r(), h("div", Ut, [
      t("label", Ht, [
        t("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (c) => e.onFilterChange(e.filter.key, c.target.checked ? "1" : "0"))
        }, null, 40, Kt),
        t("div", {
          class: P(["ijt-toggle-filter__track", {
            "ijt-toggle-filter__track--on": e.filter.value === "1" || e.filter.value === 1 || e.filter.value === !0,
            "ijt-toggle-filter__track--off": e.filter.value === "0" || e.filter.value === 0 || e.filter.value === !1,
            "ijt-toggle-filter__track--disabled": e.filter.value === null
          }])
        }, null, 2)
      ]),
      t("button", {
        class: "ijt-toggle-filter__reset",
        onClick: a[1] || (a[1] = R((c) => e.onFilterChange(e.filter.key, null), ["prevent"]))
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
}, Gt = {
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
}, Xt = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, Qt = { class: "ijt-range-filter__container" }, Yt = { class: "ijt-range-filter__track" }, Jt = { style: { "z-index": "40" } }, Zt = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, en = { key: 0 }, tn = { key: 1 }, nn = { style: { "z-index": "40" } }, ln = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, an = { key: 0 }, on = { key: 1 }, sn = { draggable: "true" }, rn = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, un = { key: 0 }, cn = { key: 1 }, dn = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, vn = { key: 0 }, fn = { key: 1 };
function hn(e, u, a, c, n, l) {
  var d, _, s, f;
  return r(), h("div", Xt, [
    t("div", Qt, [
      t("div", Yt, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: X(`width: ${l.rangeWidth}% !important; left: ${l.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: X(`left: ${l.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (k) => l.handleMouseDown(k, !0))
        }, [
          t("div", Jt, [
            t("div", Zt, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: X(l.getMarginTop(n.hasOverlap && l.displayFirstDown))
              }, [
                a.prefix ? (r(), h("span", en, b(a.prefix), 1)) : y("", !0),
                ee(" " + b((d = l.currentMinValue) != null ? d : 0) + " ", 1),
                a.suffix ? (r(), h("span", tn, b(a.suffix), 1)) : y("", !0)
              ], 4),
              (r(), h("svg", {
                class: P(["ijt-range-filter__popover-arrow", [n.hasOverlap && l.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
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
          style: X(`left: ${l.currentMaxValueInPercent}%;`),
          onMousedown: u[1] || (u[1] = (k) => l.handleMouseDown(k, !1))
        }, [
          t("div", nn, [
            t("div", ln, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: X(l.getMarginTop(n.hasOverlap && !l.displayFirstDown))
              }, [
                a.prefix ? (r(), h("span", an, b(a.prefix), 1)) : y("", !0),
                ee(" " + b((_ = l.currentMaxValue) != null ? _ : 0) + " ", 1),
                a.suffix ? (r(), h("span", on, b(a.suffix), 1)) : y("", !0)
              ], 4),
              t("div", sn, [
                (r(), h("svg", {
                  class: P(["ijt-range-filter__popover-arrow", [n.hasOverlap && !l.displayFirstDown ? "bottom-6 rotate-180" : "top-100"]]),
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
        t("div", rn, [
          a.prefix ? (r(), h("span", un, b(a.prefix), 1)) : y("", !0),
          ee(" " + b((s = a.min) != null ? s : 0) + " ", 1),
          a.suffix ? (r(), h("span", cn, b(a.suffix), 1)) : y("", !0)
        ]),
        t("div", dn, [
          a.prefix ? (r(), h("span", vn, b(a.prefix), 1)) : y("", !0),
          ee(" " + b((f = a.max) != null ? f : 0) + " ", 1),
          a.suffix ? (r(), h("span", fn, b(a.suffix), 1)) : y("", !0)
        ])
      ])
    ])
  ], 512);
}
const Ge = /* @__PURE__ */ Ce(Gt, [["render", hn], ["__scopeId", "data-v-b8d9c6c5"]]), $e = {
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
function te() {
  return $e.translations;
}
function Co(e, u) {
  $e.translations[e] = u;
}
function $o(e) {
  $e.translations = e;
}
const mn = { class: "ijt-number-filter" }, pn = { class: "ijt-number-filter__label" }, gn = { value: "" }, _n = { value: "exact" }, bn = { value: "less_than" }, yn = { value: "greater_than" }, kn = { value: "less_than_or_equal" }, wn = { value: "greater_than_or_equal" }, xn = { value: "between" }, jn = { key: 0 }, Cn = { key: 0 }, $n = { class: "ijt-number-filter__label" }, Sn = { class: "ijt-number-filter__input-wrapper" }, Mn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, qn = ["step"], In = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Nn = { key: 1 }, zn = { style: { "margin-bottom": "0.75rem" } }, Fn = { class: "ijt-number-filter__label" }, Vn = { class: "ijt-number-filter__input-wrapper" }, Pn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Bn = ["step"], Ln = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, On = { class: "ijt-number-filter__label" }, En = { class: "ijt-number-filter__input-wrapper" }, Rn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Tn = ["step"], An = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Wn = {
  key: 1,
  class: "ijt-number-filter__reset"
}, Dn = { class: "ijt-sr-only" }, Xe = {
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
    const u = e, a = te(), c = $(""), n = $(""), l = $(""), d = $(""), _ = I(() => c.value !== "" && (c.value !== "between" && n.value !== "" && n.value !== null || c.value === "between" && l.value !== "" && l.value !== null && d.value !== "" && d.value !== null));
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
    function f() {
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
    return Y(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_number || "", d.value = m.end_number || "") : n.value = m.number || "");
      }
    }), Q(() => u.filter.value, (m) => {
      m ? m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_number || "", d.value = m.end_number || "") : n.value = m.number || "") : w();
    }, { deep: !0 }), (m, p) => (r(), h("div", mn, [
      t("div", null, [
        t("label", pn, b(S(a).filter_type), 1),
        T(t("select", {
          "onUpdate:modelValue": p[0] || (p[0] = (j) => c.value = j),
          class: "ijt-select",
          onChange: f
        }, [
          t("option", gn, b(S(a).no_filter), 1),
          t("option", _n, b(S(a).exact_number), 1),
          t("option", bn, b(S(a).less_than), 1),
          t("option", yn, b(S(a).greater_than), 1),
          t("option", kn, b(S(a).less_than_or_equal), 1),
          t("option", wn, b(S(a).greater_than_or_equal), 1),
          t("option", xn, b(S(a).number_range), 1)
        ], 544), [
          [He, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (r(), h("div", jn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(c.value) ? (r(), h("div", Cn, [
          t("label", $n, b(s()), 1),
          t("div", Sn, [
            e.filter.prefix ? (r(), h("span", Mn, b(e.filter.prefix), 1)) : y("", !0),
            T(t("input", {
              type: "number",
              "onUpdate:modelValue": p[1] || (p[1] = (j) => n.value = j),
              step: e.filter.step || 1,
              class: "ijt-input",
              onInput: k,
              placeholder: "0"
            }, null, 40, qn), [
              [
                se,
                n.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (r(), h("span", In, b(e.filter.suffix), 1)) : y("", !0)
          ])
        ])) : y("", !0),
        c.value === "between" ? (r(), h("div", Nn, [
          t("div", zn, [
            t("label", Fn, b(S(a).start_number), 1),
            t("div", Vn, [
              e.filter.prefix ? (r(), h("span", Pn, b(e.filter.prefix), 1)) : y("", !0),
              T(t("input", {
                type: "number",
                "onUpdate:modelValue": p[2] || (p[2] = (j) => l.value = j),
                step: e.filter.step || 1,
                class: "ijt-input",
                onInput: k,
                placeholder: "0"
              }, null, 40, Bn), [
                [
                  se,
                  l.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (r(), h("span", Ln, b(e.filter.suffix), 1)) : y("", !0)
            ])
          ]),
          t("div", null, [
            t("label", On, b(S(a).end_number), 1),
            t("div", En, [
              e.filter.prefix ? (r(), h("span", Rn, b(e.filter.prefix), 1)) : y("", !0),
              T(t("input", {
                type: "number",
                "onUpdate:modelValue": p[3] || (p[3] = (j) => d.value = j),
                step: e.filter.step || 1,
                class: "ijt-input",
                onInput: k,
                placeholder: "0"
              }, null, 40, Tn), [
                [
                  se,
                  d.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (r(), h("span", An, b(e.filter.suffix), 1)) : y("", !0)
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      _.value ? (r(), h("div", Wn, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          t("span", Dn, b(S(a).reset_filter), 1),
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
}, Un = { class: "ijt-date-filter" }, Hn = { class: "ijt-date-filter__label" }, Kn = { value: "" }, Gn = { value: "exact" }, Xn = { value: "before" }, Qn = { value: "after" }, Yn = { value: "between" }, Jn = { key: 0 }, Zn = { key: 0 }, el = { class: "ijt-date-filter__label" }, tl = { key: 1 }, nl = { style: { "margin-bottom": "0.75rem" } }, ll = { class: "ijt-date-filter__label" }, al = { class: "ijt-date-filter__label" }, ol = {
  key: 1,
  class: "ijt-date-filter__reset"
}, sl = { class: "ijt-sr-only" }, Qe = {
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
    const u = e, a = te(), c = $(""), n = $(""), l = $(""), d = $(""), _ = I(() => c.value !== "" && (c.value !== "between" && n.value || c.value === "between" && l.value && d.value));
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
    function f() {
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
    return Y(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_date || "", d.value = m.end_date || "") : n.value = m.date || "");
      }
    }), Q(() => u.filter.value, (m) => {
      m ? m.type && (c.value = m.type, m.type === "between" ? (l.value = m.start_date || "", d.value = m.end_date || "") : n.value = m.date || "") : w();
    }, { deep: !0 }), (m, p) => (r(), h("div", Un, [
      t("div", null, [
        t("label", Hn, b(S(a).filter_type), 1),
        T(t("select", {
          "onUpdate:modelValue": p[0] || (p[0] = (j) => c.value = j),
          class: "ijt-select",
          onChange: f
        }, [
          t("option", Kn, b(S(a).no_filter), 1),
          t("option", Gn, b(S(a).exact_date), 1),
          t("option", Xn, b(S(a).before_date), 1),
          t("option", Qn, b(S(a).after_date), 1),
          t("option", Yn, b(S(a).date_range), 1)
        ], 544), [
          [He, c.value]
        ])
      ]),
      c.value && c.value !== "" ? (r(), h("div", Jn, [
        ["exact", "before", "after"].includes(c.value) ? (r(), h("div", Zn, [
          t("label", el, b(s()), 1),
          T(t("input", {
            type: "date",
            "onUpdate:modelValue": p[1] || (p[1] = (j) => n.value = j),
            class: "ijt-input",
            onChange: k
          }, null, 544), [
            [se, n.value]
          ])
        ])) : y("", !0),
        c.value === "between" ? (r(), h("div", tl, [
          t("div", nl, [
            t("label", ll, b(S(a).start_date), 1),
            T(t("input", {
              type: "date",
              "onUpdate:modelValue": p[2] || (p[2] = (j) => l.value = j),
              class: "ijt-input",
              onChange: k
            }, null, 544), [
              [se, l.value]
            ])
          ]),
          t("div", null, [
            t("label", al, b(S(a).end_date), 1),
            T(t("input", {
              type: "date",
              "onUpdate:modelValue": p[3] || (p[3] = (j) => d.value = j),
              class: "ijt-input",
              onChange: k
            }, null, 544), [
              [se, d.value]
            ])
          ])
        ])) : y("", !0)
      ])) : y("", !0),
      _.value ? (r(), h("div", ol, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          t("span", sl, b(S(a).reset_filter), 1),
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
function Ye(e) {
  let u = $(null), a = $(null);
  return Y(() => {
    gt((c) => {
      if (!a.value || !u.value)
        return;
      let n = a.value.el || a.value, l = u.value.el || u.value;
      if (!(l instanceof HTMLElement) || !(n instanceof HTMLElement))
        return;
      let { destroy: d } = It(l, n, e);
      c(d);
    });
  }), [u, a];
}
const rl = { class: "ijt-filter" }, il = ["dusk"], ul = { class: "ijt-dropdown__header" }, cl = { class: "ijt-dropdown__content" }, dl = ["name", "value", "onChange"], vl = ["value"], fl = {
  key: 2,
  style: { "min-width": "300px" }
}, hl = {
  key: 3,
  style: { "min-width": "250px" }
}, ml = {
  key: 4,
  style: { "min-width": "300px" }
}, pl = {
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
    const u = e, a = $(!1), [c, n] = Ye({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), l = I(() => u.filters.filter((p) => p.key === u.columnKey || p.key.startsWith(u.columnKey + "_") || p.key.includes(u.columnKey))), d = I(() => l.value.some((p) => !f(p)));
    function _() {
      l.value.length > 0 && (a.value = !a.value);
    }
    function s() {
      a.value = !1;
    }
    function f(p) {
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
    function k(p, j) {
      u.onFilterChange(p, j);
    }
    function w(p) {
      let j = p.value;
      p.value && (Number(Math.max(...p.value)) === Number(p.max) && Number(Math.min(...p.value)) === Number(p.min) ? j = null : Number(Math.min(...p.value)) === 0 && Number(Math.max(...p.value)) === 0 && (j = ["0", "0"])), u.onFilterChange(p.key, j);
    }
    function m(p) {
      n.value && !n.value.contains(p.target) && !p.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && s();
    }
    return Y(() => {
      document.addEventListener("click", m);
    }), me(() => {
      document.removeEventListener("click", m);
    }), (p, j) => (r(), h("div", rl, [
      t("button", {
        ref_key: "trigger",
        ref: c,
        onClick: _,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": d.value }]),
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
      ])], 10, il),
      (r(), F(he, { to: "body" }, [
        a.value ? (r(), h("div", {
          key: 0,
          ref_key: "container",
          ref: n,
          class: "ijt-filter__dropdown",
          style: { "z-index": "9999" },
          onClick: j[0] || (j[0] = R(() => {
          }, ["stop"]))
        }, [
          (r(!0), h(U, null, H(l.value, (C) => (r(), h("div", {
            key: C.key
          }, [
            t("h3", ul, b(C.label), 1),
            t("div", cl, [
              C.type === "select" ? (r(), h("select", {
                key: 0,
                name: C.key,
                value: C.value,
                class: "ijt-select",
                onChange: (q) => k(C.key, q.target.value)
              }, [
                (r(!0), h(U, null, H(C.options, (q, M) => (r(), h("option", {
                  key: M,
                  value: M
                }, b(q), 9, vl))), 128))
              ], 40, dl)) : y("", !0),
              C.type === "toggle" ? (r(), F(Ke, {
                key: 1,
                filter: C,
                "on-filter-change": k
              }, null, 8, ["filter"])) : y("", !0),
              C.type === "number" ? (r(), h("div", fl, [
                W(Xe, {
                  filter: C,
                  "on-filter-change": k
                }, null, 8, ["filter"])
              ])) : y("", !0),
              C.type === "number_range" ? (r(), h("div", hl, [
                W(Ge, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [(q) => C.value = q, (q) => w(C)],
                  max: C.max,
                  min: C.min,
                  prefix: C.prefix,
                  suffix: C.suffix,
                  step: C.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              C.type === "date" ? (r(), h("div", ml, [
                W(Qe, {
                  filter: C,
                  "on-filter-change": k
                }, null, 8, ["filter"])
              ])) : y("", !0)
            ])
          ]))), 128))
        ], 512)) : y("", !0)
      ])),
      (r(), F(he, { to: "body" }, [
        a.value ? (r(), h("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: s
        })) : y("", !0)
      ]))
    ]));
  }
}, gl = { class: "ijt-filter" }, _l = ["dusk"], bl = { class: "ijt-column-search__header" }, yl = { class: "ijt-column-search__content" }, kl = ["value", "placeholder"], wl = {
  key: 0,
  class: "ijt-column-search__reset"
}, xl = { class: "ijt-sr-only" }, jl = {
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
    const u = e, a = te(), c = $(!1), n = $(null), [l, d] = Ye({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), _ = I(() => u.searchInputs.find((C) => C.key === u.columnKey)), s = I(() => _.value && _.value.value || ""), f = I(() => s.value !== "");
    async function k() {
      _.value && (c.value = !c.value, c.value && (await je(), n.value && n.value.focus()));
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
    function j(C) {
      d.value && !d.value.contains(C.target) && !C.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Y(() => {
      document.addEventListener("click", j);
    }), me(() => {
      document.removeEventListener("click", j);
    }), (C, q) => (r(), h("div", gl, [
      t("button", {
        ref_key: "trigger",
        ref: l,
        onClick: k,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": f.value }]),
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
      ])], 10, _l),
      (r(), F(he, { to: "body" }, [
        c.value ? (r(), h("div", {
          key: 0,
          ref_key: "container",
          ref: d,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: q[1] || (q[1] = R(() => {
          }, ["stop"]))
        }, [
          t("h3", bl, b(S(a).search) + " " + b(e.columnLabel), 1),
          t("div", yl, [
            t("input", {
              ref_key: "searchInput",
              ref: n,
              type: "text",
              value: s.value,
              class: "ijt-column-search__input",
              placeholder: `${S(a).search} ${e.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                Te(w, ["enter"]),
                Te(w, ["escape"])
              ]
            }, null, 40, kl),
            s.value && s.value !== "" ? (r(), h("div", wl, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: q[0] || (q[0] = (M) => p(""))
              }, [
                t("span", xl, b(S(a).reset), 1),
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
      (r(), F(he, { to: "body" }, [
        c.value ? (r(), h("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: w
        })) : y("", !0)
      ]))
    ]));
  }
}, Cl = ["data-column-key"], $l = { class: "ijt-table__th-content" }, Sl = { class: "ijt-table__th-label" }, Ml = ["sorted"], ql = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Il = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Nl = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, zl = { class: "ijt-table__th-actions" }, Fl = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const u = e, a = _t("columnResize", null), c = I(() => {
      if (!a)
        return "auto";
      const s = a.getColumnWidth(u.cell.key);
      return s === "auto" ? s : `${s}px`;
    }), n = I(() => (a == null ? void 0 : a.isResizing) || !1), l = I(() => (a == null ? void 0 : a.resizingColumn) || null);
    function d() {
      u.cell.sortable && u.cell.onSort(u.cell.key);
    }
    function _(s, f) {
      a && a.startResize(s, f);
    }
    return (s, f) => T((r(), h("th", {
      class: P(["ijt-table__th", e.cell.header_class]),
      style: X({ width: c.value }),
      "data-column-key": e.cell.key
    }, [
      (r(), F(oe(e.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: R(d, ["prevent"])
      }, {
        default: O(() => [
          t("span", $l, [
            t("span", Sl, [
              z(s.$slots, "label", {}, () => [
                t("span", null, b(e.cell.label), 1)
              ]),
              z(s.$slots, "sort", {}, () => [
                e.cell.sortable ? (r(), h("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: P(["ijt-sort-icon", {
                    "ijt-sort-icon--active": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? y("", !0) : (r(), h("path", ql)),
                  e.cell.sorted === "asc" ? (r(), h("path", Il)) : y("", !0),
                  e.cell.sorted === "desc" ? (r(), h("path", Nl)) : y("", !0)
                ], 10, Ml)) : y("", !0)
              ])
            ]),
            t("span", zl, [
              z(s.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (r(), F(jl, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  onClick: f[0] || (f[0] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change"])) : y("", !0)
              ]),
              z(s.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (r(), F(pl, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  onClick: f[1] || (f[1] = R(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change"])) : y("", !0)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && S(a) ? (r(), F(Dt, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": _,
        "is-active": n.value && l.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : y("", !0)
    ], 14, Cl)), [
      [Z, !e.cell.hidden]
    ]);
  }
}, Vl = ["dusk", "value"], Pl = ["value"], De = {
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
    const u = te(), a = e, c = I(() => {
      let n = [...a.options];
      return n.push(parseInt(a.value)), Nt(n).sort((l, d) => l - d);
    });
    return (n, l) => (r(), h("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: "ijt-per-page",
      onChange: l[0] || (l[0] = (d) => e.onChange(d.target.value))
    }, [
      (r(!0), h(U, null, H(c.value, (d) => (r(), h("option", {
        key: d,
        value: d
      }, b(d) + " " + b(S(u).per_page), 9, Pl))), 128))
    ], 40, Vl));
  }
}, Bl = {
  key: 0,
  class: "ijt-pagination"
}, Ll = {
  key: 0,
  class: "ijt-no-results"
}, Ol = { class: "ijt-sm-inline ijt-hidden" }, El = { class: "ijt-sm-inline ijt-hidden" }, Rl = {
  key: 2,
  class: "ijt-pagination--full"
}, Tl = { class: "ijt-pagination__left" }, Al = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, Wl = { class: "ijt-pagination__info-highlight" }, Dl = { class: "ijt-pagination__info-highlight" }, Ul = { class: "ijt-pagination__info-highlight" }, Hl = { class: "ijt-pagination__right" }, Kl = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, Gl = { class: "ijt-sr-only" }, Xl = { class: "ijt-pagination__button-text" }, Ql = { class: "ijt-sr-only" }, Yl = {
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
    const u = te(), a = e, c = I(() => "links" in l.value ? l.value.links.length > 0 : !1), n = I(() => Object.keys(l.value).length > 0), l = I(() => a.meta), d = I(() => "prev_page_url" in l.value ? l.value.prev_page_url : null), _ = I(() => "next_page_url" in l.value ? l.value.next_page_url : null), s = I(() => parseInt(l.value.per_page));
    return (f, k) => n.value ? (r(), h("nav", Bl, [
      !e.hasData || l.value.total < 1 ? (r(), h("p", Ll, b(S(u).no_results_found), 1)) : y("", !0),
      e.hasData ? (r(), h("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": c.value }])
      }, [
        (r(), F(oe(d.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !d.value
            }
          ]),
          href: d.value,
          dusk: d.value ? "pagination-simple-previous" : null,
          onClick: k[0] || (k[0] = R((w) => e.onClick(d.value), ["prevent"]))
        }, {
          default: O(() => [
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
            t("span", Ol, b(S(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        W(De, {
          dusk: "per-page-mobile",
          value: s.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (r(), F(oe(_.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !_.value
            }
          ]),
          href: _.value,
          dusk: _.value ? "pagination-simple-next" : null,
          onClick: k[1] || (k[1] = R((w) => e.onClick(_.value), ["prevent"]))
        }, {
          default: O(() => [
            t("span", El, b(S(u).next), 1),
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
      e.hasData && c.value ? (r(), h("div", Rl, [
        t("div", Tl, [
          W(De, {
            dusk: "per-page-full",
            value: s.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", Al, [
            t("span", Wl, b(l.value.from), 1),
            ee(" " + b(S(u).to) + " ", 1),
            t("span", Dl, b(l.value.to), 1),
            ee(" " + b(S(u).of) + " ", 1),
            t("span", Ul, b(l.value.total), 1),
            ee(" " + b(S(u).results), 1)
          ])
        ]),
        t("div", Hl, [
          t("nav", Kl, [
            (r(), F(oe(d.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--first",
                {
                  "ijt-pagination__button--disabled": !d.value
                }
              ]),
              href: d.value,
              dusk: d.value ? "pagination-previous" : null,
              onClick: k[2] || (k[2] = R((w) => e.onClick(d.value), ["prevent"]))
            }, {
              default: O(() => [
                t("span", Gl, b(S(u).previous), 1),
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
            (r(!0), h(U, null, H(l.value.links, (w, m) => (r(), h("div", { key: m }, [
              z(f.$slots, "link", {}, () => [
                !isNaN(w.label) || w.label === "..." ? (r(), F(oe(w.url ? "a" : "div"), {
                  key: 0,
                  href: w.url,
                  dusk: w.url ? `pagination-${w.label}` : null,
                  class: P(["ijt-pagination__button", {
                    "ijt-pagination__button--disabled": !w.url,
                    "ijt-pagination__button--active": w.active
                  }]),
                  onClick: R((p) => e.onClick(w.url), ["prevent"])
                }, {
                  default: O(() => [
                    t("span", Xl, b(w.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : y("", !0)
              ])
            ]))), 128)),
            (r(), F(oe(_.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--last",
                {
                  "ijt-pagination__button--disabled": !_.value
                }
              ]),
              href: _.value,
              dusk: _.value ? "pagination-next" : null,
              onClick: k[3] || (k[3] = R((w) => e.onClick(_.value), ["prevent"]))
            }, {
              default: O(() => [
                t("span", Ql, b(S(u).next), 1),
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
}, Jl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, Zl = ["dusk", "onClick"], ea = {
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
    return (n, l) => (r(), F(pe, {
      ref_key: "dropdown",
      ref: a,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "ijt-dropdown--auto-width"
    }, {
      button: O(() => [...l[0] || (l[0] = [
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
      default: O(() => [
        t("div", Jl, [
          (r(!0), h(U, null, H(e.searchInputs, (d, _) => (r(), h("button", {
            key: _,
            dusk: `add-search-row-${d.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((s) => c(d.key), ["prevent"])
          }, b(d.label), 9, Zl))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, ta = ["data-column-key"], na = { class: "ijt-column-manager__item-left" }, la = ["onClick", "title"], aa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, oa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, sa = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Je = {
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
    Q(() => a.columns, (k) => {
      !l.value && !d.value && (n.value = [...k]), d.value && setTimeout(() => {
        d.value = !1;
      }, 100);
    }, { deep: !0 });
    function _(k, w) {
      const m = n.value.findIndex((p) => p.key === k);
      m !== -1 && (n.value[m].hidden = !w), c("columns-changed", n.value);
    }
    function s(k, w) {
      const m = n.value.findIndex((p) => p.key === k);
      m !== -1 && (n.value[m].pinned = !w), n.value.sort((p, j) => p.pinned && !j.pinned ? -1 : !p.pinned && j.pinned ? 1 : 0), c("columns-changed", n.value);
    }
    function f() {
      d.value = !0, c("columns-changed", n.value);
    }
    return (k, w) => (r(), F(S(zt), {
      modelValue: n.value,
      "onUpdate:modelValue": w[0] || (w[0] = (m) => n.value = m),
      "item-key": "key",
      animation: 200,
      handle: ".ijt-column-manager__drag-handle",
      "ghost-class": "ijt-sortable-ghost",
      "chosen-class": "ijt-sortable-chosen",
      onChange: f,
      onStart: w[1] || (w[1] = (m) => l.value = !0),
      onEnd: w[2] || (w[2] = (m) => l.value = !1)
    }, {
      item: O(({ element: m }) => [
        t("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": m.key
        }, [
          t("div", na, [
            w[5] || (w[5] = t("div", { class: "ijt-column-manager__drag-handle" }, [
              t("svg", {
                class: "ijt-column-manager__drag-handle-icon",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                t("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            m.can_be_pinned !== !1 ? (r(), h("button", {
              key: 0,
              type: "button",
              class: P(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": m.pinned }]),
              onClick: R((p) => s(m.key, m.pinned), ["prevent"]),
              title: m.pinned ? "Unpin column" : "Pin column"
            }, [
              m.pinned ? (r(), h("svg", aa, [...w[3] || (w[3] = [
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
              ])])) : (r(), h("svg", oa, [...w[4] || (w[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, la)) : y("", !0),
            t("p", {
              class: P(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": m.hidden,
                "ijt-column-manager__label--pinned": m.pinned
              }])
            }, b(m.label), 3)
          ]),
          m.can_be_hidden && !m.pinned ? (r(), h("button", {
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
            onClick: R((p) => _(m.key, m.hidden), ["prevent"])
          }, [...w[6] || (w[6] = [
            t("span", { class: "ijt-sr-only" }, "Column status", -1),
            t("span", {
              "aria-hidden": "true",
              class: "ijt-toggle__handle"
            }, null, -1)
          ])], 10, sa)) : y("", !0)
        ], 8, ta)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, ra = {
  key: 0,
  class: "ijt-button__badge"
}, ia = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, ua = {
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
    Q(() => u.columns, (l) => {
      a.value = [...l];
    }, { deep: !0, immediate: !0 });
    const c = I(() => a.value.filter((l) => l.hidden).length);
    function n(l) {
      a.value = [...l], u.onChange(l);
    }
    return (l, d) => (r(), F(pe, {
      placement: "bottom-end",
      dusk: "columns-dropdown"
    }, {
      button: O(() => [
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
        e.hasHiddenColumns ? (r(), h("span", ra, "(" + b(c.value) + ")", 1)) : y("", !0)
      ]),
      default: O(() => [
        t("div", ia, [
          W(Je, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: n
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, ca = {
  key: 0,
  class: "ijt-button__badge"
}, da = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, va = { class: "ijt-dropdown__header" }, fa = { class: "ijt-dropdown__content" }, ha = ["name", "value", "onChange"], ma = ["value"], pa = {
  key: 2,
  style: { "min-width": "250px" }
}, ga = {
  key: 3,
  style: { "min-width": "300px" }
}, _a = {
  key: 4,
  style: { "min-width": "300px" }
}, ba = {
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
    const u = e, a = I(() => u.filters.filter((l) => !c(l)).length);
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
    return (l, d) => (r(), F(pe, {
      placement: "bottom-end",
      dusk: "filters-dropdown"
    }, {
      button: O(() => [
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
        e.hasEnabledFilters ? (r(), h("span", ca, "(" + b(a.value) + ")", 1)) : y("", !0)
      ]),
      default: O(() => [
        t("div", da, [
          (r(!0), h(U, null, H(e.filters, (_, s) => (r(), h("div", { key: s }, [
            t("h3", va, b(_.label), 1),
            t("div", fa, [
              _.type === "select" ? (r(), h("select", {
                key: 0,
                name: _.key,
                value: _.value,
                class: "ijt-select",
                onChange: (f) => e.onFilterChange(_.key, f.target.value)
              }, [
                (r(!0), h(U, null, H(_.options, (f, k) => (r(), h("option", {
                  key: k,
                  value: k
                }, b(f), 9, ma))), 128))
              ], 40, ha)) : y("", !0),
              _.type === "toggle" ? (r(), F(Ke, {
                key: 1,
                filter: _,
                "on-filter-change": e.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : y("", !0),
              _.type === "number_range" ? (r(), h("div", pa, [
                W(Ge, {
                  modelValue: _.value,
                  "onUpdate:modelValue": [(f) => _.value = f, (f) => n(_)],
                  max: _.max,
                  min: _.min,
                  prefix: _.prefix,
                  suffix: _.suffix,
                  step: _.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : y("", !0),
              _.type === "date" ? (r(), h("div", ga, [
                W(Qe, {
                  filter: _,
                  "on-filter-change": e.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : y("", !0),
              _.type === "number" ? (r(), h("div", _a, [
                W(Xe, {
                  filter: _,
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
}, ya = { class: "ijt-global-search" }, ka = ["placeholder", "value"], wa = {
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
    return (u, a) => (r(), h("div", ya, [
      t("input", {
        class: "ijt-global-search__input",
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: a[0] || (a[0] = (c) => e.onChange(c.target.value))
      }, null, 40, ka),
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
}, xa = { class: "ijt-search-row__container" }, ja = ["for"], Ca = ["id", "name", "value", "onInput"], $a = { class: "ijt-search-row__remove" }, Sa = ["dusk", "onClick"], Ma = {
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
    let a = I(() => u.el.value);
    const c = e;
    function n(l) {
      return c.forcedVisibleSearchInputs.includes(l);
    }
    return Q(c.forcedVisibleSearchInputs, (l) => {
      const d = l.length > 0 ? l[l.length - 1] : null;
      !d || je().then(() => {
        const _ = Ft(a.value, (s) => s.name === d);
        _ && _.focus();
      });
    }, { immediate: !0 }), (l, d) => (r(!0), h(U, null, H(e.searchInputs, (_, s) => T((r(), h("div", {
      key: s,
      class: "ijt-search-row"
    }, [
      t("div", xa, [
        t("label", {
          for: _.key,
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
          t("span", null, b(_.label), 1)
        ], 8, ja),
        (r(), h("input", {
          id: _.key,
          ref_for: !0,
          ref: u.el,
          key: _.key,
          name: _.key,
          value: _.value,
          type: "text",
          class: "ijt-search-row__input",
          onInput: (f) => e.onChange(_.key, f.target.value)
        }, null, 40, Ca)),
        t("div", $a, [
          t("button", {
            class: "ijt-search-row__remove-button",
            dusk: `remove-search-row-${_.key}`,
            onClick: R((f) => e.onRemove(_.key), ["prevent"])
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
          ])], 8, Sa)
        ])
      ])
    ])), [
      [Z, _.value !== null || n(_.key)]
    ])), 128));
  }
}, qa = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const u = te();
    return (a, c) => {
      var n;
      return r(), h("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: "ijt-reset",
        "aria-haspopup": "true",
        onClick: c[0] || (c[0] = R((...l) => e.onClick && e.onClick(...l), ["prevent"]))
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
}, Ia = {}, Na = { class: "ijt-wrapper" }, za = { class: "ijt-wrapper__outer" }, Fa = { class: "ijt-wrapper__inner" }, Va = { class: "ijt-wrapper__container" };
function Pa(e, u) {
  return r(), h("div", Na, [
    t("div", za, [
      t("div", Fa, [
        t("div", Va, [
          z(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Ba = /* @__PURE__ */ Ce(Ia, [["render", Pa]]), La = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, Oa = ["dusk", "onClick"], Ea = { class: "ijt-dropdown__content" }, Ra = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const u = te(), a = e, c = $(!1), n = $(!1);
    function l() {
      c.value = n.value = !1;
    }
    function d(_) {
      var s, f;
      (s = a.actions.toggleColumns) != null && s.onReorder ? a.actions.toggleColumns.onReorder(_) : (f = a.actions.toggleColumns) != null && f.onChange && a.actions.toggleColumns.onChange(_);
    }
    return (_, s) => (r(), F(pe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      onClosed: l
    }, {
      button: O(() => [...s[5] || (s[5] = [
        t("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "ijt-button__icon"
        }, [
          t("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: O(() => {
        var f, k, w, m, p;
        return [
          t("div", La, [
            T(t("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (r(), h("button", {
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
                t("span", null, b((f = S(u).add_search_fields) != null ? f : "Add search field"), 1)
              ])) : y("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (r(), h("button", {
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
              "reset" in e.actions ? (r(), h("button", {
                key: 2,
                dusk: "reset-button",
                class: "ijt-dropdown__item ijt-dropdown__item--danger",
                role: "menuitem",
                onClick: s[2] || (s[2] = (...j) => {
                  var C, q;
                  return ((C = e.actions.reset) == null ? void 0 : C.onClick) && ((q = e.actions.reset) == null ? void 0 : q.onClick(...j));
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
              [Z, !c.value && !n.value]
            ]),
            T(t("div", null, [
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
              (r(!0), h(U, null, H(e.actions.searchFields.searchInputs, (j, C) => (r(), h("button", {
                key: C,
                dusk: `add-search-row-${j.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((q) => e.actions.searchFields.onClick(j.key), ["prevent"])
              }, b(j.label), 9, Oa))), 128))
            ], 512), [
              [Z, n.value]
            ]),
            T(t("div", null, [
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
                t("span", null, b((p = S(u).show_hide_columns) != null ? p : "Show / Hide columns"), 1)
              ]),
              t("div", Ea, [
                W(Je, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: d
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [Z, c.value]
            ]),
            T(t("div", null, [
              z(_.$slots, "default")
            ], 512), [
              [Z, !c.value && !n.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 512));
  }
};
function Ta(e) {
  const u = $(!1), a = $(null), c = $(0), n = $(0), l = bt({}), d = () => {
    const M = yt(e) ? S(e) : e;
    return M ? `${M}-columnWidths` : null;
  }, _ = () => {
    const M = d();
    if (!M)
      return;
    const B = localStorage.getItem(M);
    if (B)
      try {
        const L = JSON.parse(B);
        Object.assign(l, L);
      } catch (L) {
        console.warn("Unable to load column widths:", L);
      }
  }, s = () => {
    const M = d();
    !M || localStorage.setItem(M, JSON.stringify(l));
  }, f = (M, B) => {
    M.preventDefault(), M.stopPropagation(), u.value = !0, a.value = B, c.value = M.clientX;
    const L = M.target.closest("th");
    n.value = L.offsetWidth;
    const E = L.closest("table");
    E && E.querySelectorAll("thead th[data-column-key]").forEach((D) => {
      const A = D.getAttribute("data-column-key"), K = D.offsetWidth;
      l[A] || (l[A] = K), D.style.width = `${l[A]}px`;
      const le = Array.from(D.parentNode.children).indexOf(D);
      E.querySelectorAll("tbody tr").forEach((re) => {
        const ie = re.children[le];
        ie && (ie.style.width = `${l[A]}px`);
      });
    }), document.addEventListener("mousemove", k), document.addEventListener("mouseup", w), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, k = (M) => {
    if (!u.value || !a.value)
      return;
    const B = M.clientX - c.value, L = Math.max(50, n.value + B);
    l[a.value] = L;
    const E = document.querySelector(`th[data-column-key="${a.value}"]`);
    if (E) {
      E.style.width = `${L}px`;
      const ne = E.closest("table");
      if (ne) {
        const D = Array.from(E.parentNode.children).indexOf(E);
        ne.querySelectorAll("tbody tr").forEach((K) => {
          const le = K.children[D];
          le && (le.style.width = `${L}px`);
        });
      }
    }
  }, w = () => {
    u.value && (u.value = !1, a.value = null, s(), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, m = (M) => l[M] || "auto", p = (M, B) => {
    l[M] = B, s();
  }, j = (M) => {
    if (!M)
      return;
    M.querySelectorAll("thead th[data-column-key]").forEach((L) => {
      const E = L.getAttribute("data-column-key");
      if (!l[E]) {
        const A = L.offsetWidth;
        l[E] = Math.max(A, 100);
      }
      L.style.width = `${l[E]}px`;
      const ne = Array.from(L.parentNode.children).indexOf(L);
      M.querySelectorAll("tbody tr").forEach((A) => {
        const K = A.children[ne];
        K && (K.style.width = `${l[E]}px`);
      });
    });
  }, C = () => {
    Object.keys(l).forEach((B) => {
      delete l[B];
    });
    const M = d();
    M && localStorage.removeItem(M);
  }, q = () => {
    u.value && (document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", w), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Y(() => {
    _();
  }), me(() => {
    q();
  }), {
    isResizing: u,
    resizingColumn: a,
    columnWidths: l,
    startResize: f,
    getColumnWidth: m,
    setColumnWidth: p,
    resetColumnWidths: C,
    loadColumnWidths: _,
    saveColumnWidths: s,
    initializeColumnWidths: j
  };
}
const Aa = ["dusk"], Wa = { class: "ijt-toolbar" }, Da = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, Ua = { key: 0 }, Ha = ["href"], Ka = { class: "ijt-table-container" }, Ga = { class: "ijt-table__thead" }, Xa = { class: "ijt-table__tr" }, Qa = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, Ya = ["id"], Ja = { class: "ijt-table__tbody" }, Za = {
  key: 0,
  class: "ijt-table__td ijt-table__td--pinned-checkbox",
  style: { width: "60px" }
}, eo = ["id", "onUpdate:modelValue"], to = ["onClick", "data-column-key"], no = { class: "ijt-footer" }, lo = {
  key: 0,
  class: "ijt-footer__selection-info"
}, ao = {
  key: 1,
  class: "ijt-loading"
}, oo = {
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
    const a = te(), c = u, n = e, l = I(() => n.localStorageName ? n.localStorageName : n.name && n.name !== "default" ? `table-${n.name}` : null);
    kt();
    const d = n.resizeableColumns ? Ta(l) : null;
    wt("columnResize", d);
    const _ = $(!1), s = I(() => We().props.queryBuilderProps ? { ...We().props.queryBuilderProps[n.name] } : {}), f = $(s.value), k = I(() => Boolean(n.withInfiniteScrolling || s.value.infiniteScrolling));
    function w() {
      var o, i, v, x, g, N, V, G, ae, ce;
      return (ce = (ae = (N = (v = (o = A.value) == null ? void 0 : o.next_page_url) != null ? v : (i = n.resource) == null ? void 0 : i.next_page_url) != null ? N : (g = (x = n.resource) == null ? void 0 : x.links) == null ? void 0 : g.next) != null ? ae : (G = (V = n.resource) == null ? void 0 : V.meta) == null ? void 0 : G.next_page_url) != null ? ce : null;
    }
    const m = $([]), p = $(null), j = $(null), C = $(!1);
    let q;
    const M = I(() => s.value.pageName), B = $([]), L = $(null), E = $(!1), ne = I(() => s.value.hasToggleableColumns || s.value.hasFilters || s.value.hasSearchInputs ? !1 : !s.value.globalSearch), D = I(() => k.value ? m.value : Object.keys(n.resource).length === 0 ? n.data : "data" in n.resource ? n.resource.data : n.resource), A = I(() => Object.keys(n.resource).length === 0 ? n.meta : "links" in n.resource && "meta" in n.resource && Object.keys(n.resource.links).length === 4 && "next" in n.resource.links && "prev" in n.resource.links ? {
      ...n.resource.meta,
      next_page_url: n.resource.links.next,
      prev_page_url: n.resource.links.prev
    } : "meta" in n.resource ? n.resource.meta : n.resource), K = I(() => D.value.length > 0 ? !0 : A.value.total > 0), le = $({
      reset: {
        onClick: ge
      },
      toggleColumns: {
        show: s.value.hasToggleableColumns,
        columns: s.value.columns,
        onChange: be
      },
      searchFields: {
        show: s.value.hasSearchInputs && !n.hideSearchInputsAboveTable,
        searchInputs: s.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
        onClick: re
      }
    });
    function Se(o) {
      B.value = B.value.filter((i) => i != o), ue(o, null);
    }
    function re(o) {
      B.value.push(o);
    }
    const ie = I(() => {
      if (B.value.length > 0)
        return !0;
      const o = xe.parse(location.search.substring(1));
      if (o[M.value] > 1)
        return !0;
      const v = n.name === "default" ? "" : n.name + "_";
      let x = !1;
      return J(["filter", "columns", "cursor", "sort"], (g) => {
        const N = o[v + g];
        g === "sort" && N === s.value.defaultSort || N !== void 0 && (x = !0);
      }), x;
    }), Ze = (o, i) => {
      let v = [];
      if (n.striped && i % 2 && v.push("ijt-table__tr--striped"), n.rowClass && typeof n.rowClass == "function") {
        const x = n.rowClass(o);
        x && v.push(x);
      }
      return v.join(" ");
    }, Me = I(() => {
      if (!n.showExportButton)
        return null;
      const o = new URL(window.location.href);
      o.search = "";
      const i = new URLSearchParams();
      if (s.value.page && s.value.page > 1 && i.set(M.value, s.value.page), s.value.sort) {
        const g = n.name === "default" ? "sort" : `${n.name}_sort`;
        i.set(g, s.value.sort);
      }
      const v = {};
      if (f.value.filters.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (v[g.key] = g.value);
      }), f.value.searchInputs.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (v[g.key] = g.value);
      }), Object.keys(v).length > 0) {
        const g = n.name === "default" ? "filter" : `${n.name}_filter`;
        Object.keys(v).forEach((N) => {
          const V = v[N];
          Array.isArray(V) ? V.forEach((G, ae) => {
            i.set(`${g}[${N}][${ae}]`, G);
          }) : typeof V == "object" && V !== null ? Object.keys(V).forEach((G) => {
            i.set(`${g}[${N}][${G}]`, V[G]);
          }) : i.set(`${g}[${N}]`, V);
        });
      }
      const x = f.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (x.length !== f.value.columns.length) {
        const g = n.name === "default" ? "columns" : `${n.name}_columns`;
        x.forEach((N) => {
          i.append(`${g}[]`, N);
        });
      }
      if (s.value.perPageOptions && s.value.perPageOptions.length > 0) {
        const g = new URLSearchParams(window.location.search).get("perPage") || s.value.perPageOptions[0];
        g && g !== s.value.perPageOptions[0] && i.set("perPage", g);
      }
      return i.set("do_export", "1"), i.set("table", n.name || "default"), o.search = i.toString(), o.toString();
    });
    function ge() {
      B.value = [], J(f.value.filters, (o, i) => {
        f.value.filters[i].value = null;
      }), J(f.value.searchInputs, (o, i) => {
        f.value.searchInputs[i].value = null;
      }), J(f.value.columns, (o, i) => {
        f.value.columns[i].hidden = o.can_be_hidden ? !s.value.defaultVisibleToggleableColumns.includes(o.key) : !1, f.value.columns[i].pinned = !1;
      }), l.value && localStorage.removeItem(`${l.value}-columns`), n.resizeableColumns && d && d.resetColumnWidths(), f.value.sort = null, f.value.cursor = null, f.value.page = 1;
    }
    const qe = {};
    function ue(o, i) {
      clearTimeout(qe[o]), qe[o] = setTimeout(() => {
        ke.value && n.preventOverlappingRequests && ke.value.cancel();
        const v = de("searchInputs", o);
        f.value.searchInputs[v].value = i, f.value.cursor = null, f.value.page = 1;
      }, n.inputDebounceMs);
    }
    function Ie(o) {
      ue("global", o);
    }
    function _e(o, i) {
      const v = de("filters", o);
      f.value.filters[v].value = i, f.value.cursor = null, f.value.page = 1;
    }
    function Ne(o) {
      f.value.cursor = null, f.value.perPage = o, f.value.page = 1;
    }
    function de(o, i) {
      return Bt(f.value[o], (v) => v.key == i);
    }
    function be(o) {
      f.value.columns = o, f.value.columns.sort((i, v) => i.pinned && !v.pinned ? -1 : !i.pinned && v.pinned ? 1 : 0), et();
    }
    function et() {
      if (!l.value)
        return;
      const o = f.value.columns.map((i, v) => ({
        key: i.key,
        hidden: i.hidden,
        pinned: i.pinned || !1,
        order: v
      }));
      localStorage.setItem(`${l.value}-columns`, JSON.stringify(o));
    }
    function tt() {
      let o = {};
      return J(f.value.searchInputs, (i) => {
        i.value !== null && (o[i.key] = i.value);
      }), J(f.value.filters, (i) => {
        let v = i.value;
        v !== null && (i.type === "number_range" && Number(Math.max(...i.value)) === Number(i.max) && Number(Math.min(...i.value)) === Number(i.min) && (v = null), o[i.key] = v);
      }), o;
    }
    function nt() {
      const o = f.value.columns;
      let i = Pt(o, (x) => !x.hidden), v = Ot(i, (x) => x.key).sort();
      return Lt(v, s.value.defaultVisibleToggleableColumns) ? {} : v;
    }
    function lt() {
      const o = tt(), i = nt(), v = {};
      Object.keys(o).length > 0 && (v.filter = o), Object.keys(i).length > 0 && (v.columns = i);
      const x = f.value.cursor, g = f.value.page, N = f.value.sort, V = f.value.perPage;
      return x && (v.cursor = x), g > 1 && (v.page = g), V > 1 && (v.perPage = V), N && (v.sort = N), v;
    }
    function ze(o) {
      if (!o)
        return null;
      if (n.paginationClickCallback && typeof n.paginationClickCallback == "function") {
        n.paginationClickCallback(o);
        return;
      }
      Fe(o);
    }
    function at() {
      const o = xe.parse(location.search.substring(1)), i = n.name === "default" ? "" : n.name + "_";
      J(["filter", "columns", "cursor", "sort"], (x) => {
        delete o[i + x];
      }), delete o[M.value], J(lt(), (x, g) => {
        g === "page" ? o[M.value] = x : g === "perPage" ? o.perPage = x : o[i + g] = x;
      });
      let v = xe.stringify(o, {
        filter(x, g) {
          return typeof g == "object" && g !== null ? Et(g) : g;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!v || v === M.value + "=1") && (v = ""), v;
    }
    const ye = $(!1), ke = $(null);
    function Fe(o) {
      !o || Rt.get(
        o,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: n.preserveScroll !== !1,
          onBefore() {
            ye.value = !0;
          },
          onCancelToken(i) {
            ke.value = i;
          },
          onFinish() {
            ye.value = !1;
          },
          onSuccess() {
            if (n.preserveScroll === "table-top") {
              const v = L.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: v });
            }
          }
        }
      );
    }
    function ot(o, i, v) {
      var x;
      n.hasCheckboxes && ((x = o.target) == null ? void 0 : x.parentElement.cellIndex) === 0 || c("rowClicked", o, i, v);
    }
    async function st() {
      var o, i, v, x, g;
      if (!(C.value || !p.value)) {
        C.value = !0;
        try {
          const N = await fetch(p.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!N.ok)
            throw new Error("Network response was not ok");
          const V = await N.json();
          m.value = [...m.value, ...V.data || []], p.value = (g = (x = (i = V.next_page_url) != null ? i : (o = V.links) == null ? void 0 : o.next) != null ? x : (v = V.meta) == null ? void 0 : v.next_page_url) != null ? g : null;
        } catch (N) {
          console.error("Error loading more data:", N);
        } finally {
          C.value = !1;
        }
      }
    }
    function we() {
      !k.value || !j.value || (q && (q.disconnect(), q = null), n.resource && n.resource.data && m.value.length === 0 && (m.value = [...n.resource.data], p.value = w()), q = new IntersectionObserver(
        (o) => {
          o.forEach((i) => {
            i.isIntersecting && st();
          });
        },
        {
          rootMargin: "0px 0px 500px 0px"
        }
      ), q.observe(j.value));
    }
    Q(f, () => {
      k.value && (m.value = [], p.value = null), Fe(location.pathname + "?" + at()), E.value = !1;
    }, { deep: !0 }), Q(() => n.resource, () => {
      var o;
      if (!k.value && ((o = n.resource) == null ? void 0 : o.data)) {
        const i = n.resource.data.filter((v) => v.__itSelected);
        c("selectionChanged", i);
      }
    }, { deep: !0 }), Q(() => s.value, (o) => {
      var v;
      if (!k.value)
        return;
      const i = ((v = n.resource) == null ? void 0 : v.data) || [];
      if (i.length > 0) {
        m.value = [...i], p.value = w();
        const x = i.filter((g) => g.__itSelected);
        c("selectionChanged", x), setTimeout(() => {
          j.value && we();
        }, 100);
      }
    }, { deep: !0 });
    const Ve = () => {
      n.resizeableColumns && d && setTimeout(() => {
        var i;
        const o = (i = L.value) == null ? void 0 : i.querySelector("table");
        o && d.initializeColumnWidths(o);
      }, 0), k.value && setTimeout(() => {
        j.value && we();
      }, 100);
    };
    Y(() => {
      document.addEventListener("inertia:success", Ve), rt(), n.resizeableColumns && d && setTimeout(() => {
        var i;
        const o = (i = L.value) == null ? void 0 : i.querySelector("table");
        o && d.initializeColumnWidths(o);
      }, 0), k.value && we();
    });
    function rt() {
      if (!l.value)
        return;
      const o = localStorage.getItem(`${l.value}-columns`);
      if (!!o)
        try {
          const i = JSON.parse(o);
          if (i.length > 0 && "order" in i[0]) {
            const v = new Map(i.map((x) => [x.key, x]));
            f.value.columns.forEach((x, g) => {
              const N = v.get(x.key);
              N && (f.value.columns[g].hidden = N.hidden, f.value.columns[g].pinned = N.pinned || !1);
            }), f.value.columns.sort((x, g) => {
              var ce, Re;
              const N = v.get(x.key), V = v.get(g.key);
              if (x.pinned && !g.pinned)
                return -1;
              if (!x.pinned && g.pinned)
                return 1;
              const G = (ce = N == null ? void 0 : N.order) != null ? ce : 999, ae = (Re = V == null ? void 0 : V.order) != null ? Re : 999;
              return G - ae;
            });
          } else
            i.forEach((v, x) => {
              const g = f.value.columns.findIndex((N) => N.key === v.key);
              g !== -1 && (f.value.columns[g].hidden = v.hidden, f.value.columns[g].pinned = v.pinned || !1);
            });
        } catch (i) {
          console.warn("Error loading column order from localStorage:", i);
        }
    }
    me(() => {
      document.removeEventListener("inertia:success", Ve), q && (q.disconnect(), q = null);
    });
    function Pe(o) {
      f.value.sort == o ? f.value.sort = `-${o}` : f.value.sort = o, f.value.cursor = null, f.value.page = 1;
    }
    function ve(o) {
      const i = de("columns", o);
      return !f.value.columns[i].hidden;
    }
    function fe(o) {
      const i = de("columns", o), v = Vt(f.value.columns[i]);
      v.onSort = Pe, v.filters = f.value.filters.filter(
        (g) => g.key === o || g.key.startsWith(o + "_") || g.key.includes(o)
      );
      const x = f.value.searchInputs.filter(
        (g) => g.key === o
      );
      return x.length > 0 ? (v.searchable = !0, v.searchInputs = x) : (v.searchable = !1, v.searchInputs = []), v.onFilterChange = _e, v.onSearchChange = ue, v;
    }
    function it() {
      n.resource.data.forEach((o) => {
        o.__itSelected = E.value;
      });
    }
    function ut(o) {
      if (!n.resizeableColumns || !d)
        return "auto";
      const i = d.getColumnWidth(o);
      return i === "auto" ? i : `${i}px`;
    }
    function Be(o) {
      if (!n.resizeableColumns || !d)
        return "0px";
      let i = 0;
      const v = f.value.columns.filter((x) => !x.hidden);
      n.hasCheckboxes && (i += 60);
      for (const x of v) {
        if (x.key === o)
          break;
        if (x.pinned) {
          const g = d.getColumnWidth(x.key);
          i += g === "auto" ? 150 : g;
        }
      }
      return `${i}px`;
    }
    function Le(o) {
      const i = f.value.columns.find((v) => v.key === o);
      return i && i.pinned;
    }
    function ct(o) {
      return Le(o) ? {
        position: "sticky",
        left: Be(o),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function dt(o) {
      return Le(o) ? {
        position: "sticky",
        left: Be(o),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const vt = I(() => {
      if (!n.resizeableColumns || !d)
        return "100%";
      let o = 0, i = !1;
      return n.hasCheckboxes && (o += 60), s.value.columns.forEach((v) => {
        if (!ve(v.key))
          return;
        const x = d.getColumnWidth(v.key);
        x === "auto" ? i = !0 : o += x;
      }), !i && o > 0 ? `${o}px` : "max(100%, " + (o > 0 ? o + "px" : "800px") + ")";
    }), Oe = I(() => D.value.filter((o) => o.__itSelected)), Ee = I(() => Oe.value.length), ft = I(() => Ee.value === 0 ? a.noLineSelected : `${Ee.value} ${a.lineSelected}`);
    function ht() {
      n.resizeableColumns && (_.value = !0);
    }
    function mt() {
      n.resizeableColumns && setTimeout(() => {
        _.value = !1;
      }, 100);
    }
    return (o, i) => (r(), F(xt, null, {
      default: O(() => [
        (r(), h("fieldset", {
          ref_key: "tableFieldset",
          ref: L,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": ye.value }])
        }, [
          t("div", Wa, [
            s.value.globalSearch ? (r(), h("div", Da, [
              z(o.$slots, "tableGlobalSearch", {
                hasGlobalSearch: s.value.globalSearch,
                label: s.value.globalSearch ? s.value.globalSearch.label : null,
                value: s.value.globalSearch ? s.value.globalSearch.value : null,
                onChange: Ie
              }, () => [
                s.value.globalSearch ? (r(), F(wa, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: s.value.globalSearch.label,
                  value: s.value.globalSearch.value,
                  "on-change": Ie
                }, null, 8, ["label", "value"])) : y("", !0)
              ], !0)
            ])) : y("", !0),
            t("div", null, [
              z(o.$slots, "tableFilter", {
                hasFilters: s.value.hasFilters,
                hasEnabledFilters: s.value.hasEnabledFilters,
                filters: s.value.filters,
                onFilterChange: _e
              }, () => [
                s.value.hasFilters ? (r(), F(ba, {
                  key: 0,
                  "has-enabled-filters": s.value.hasEnabledFilters,
                  filters: s.value.filters,
                  "on-filter-change": _e
                }, null, 8, ["has-enabled-filters", "filters"])) : y("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? z(o.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: s.value.hasSearchInputs,
              hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
              searchInputs: s.value.searchInputsWithoutGlobal,
              onAdd: re
            }, () => [
              s.value.hasSearchInputs ? (r(), F(ea, {
                key: 0,
                "search-inputs": s.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": s.value.hasSearchInputsWithoutValue,
                "on-add": re
              }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : y("", !0)
            ], !0) : y("", !0),
            e.withGroupedMenu ? y("", !0) : z(o.$slots, "tableColumns", {
              key: 2,
              hasColumns: s.value.hasToggleableColumns,
              columns: f.value.columns,
              hasHiddenColumns: s.value.hasHiddenColumns,
              onChange: be
            }, () => [
              s.value.hasToggleableColumns ? (r(), F(ua, {
                key: 0,
                columns: f.value.columns,
                "has-hidden-columns": s.value.hasHiddenColumns,
                "on-change": be,
                "table-name": e.name
              }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : y("", !0)
            ], !0),
            e.withGroupedMenu ? z(o.$slots, "groupedAction", {
              key: 3,
              actions: le.value
            }, () => [
              W(Ra, { actions: le.value }, {
                default: O(() => [
                  z(o.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["actions"])
            ], !0) : y("", !0),
            e.withGroupedMenu ? y("", !0) : z(o.$slots, "tableReset", {
              key: 4,
              canBeReset: ie.value,
              onClick: ge
            }, () => [
              ie.value ? (r(), h("div", Ua, [
                W(qa, { "on-click": ge })
              ])) : y("", !0)
            ], !0),
            e.showExportButton ? z(o.$slots, "exportButton", {
              key: 5,
              exportUrl: Me.value,
              translations: S(a)
            }, () => [
              t("a", {
                href: Me.value,
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
              ])], 8, Ha)
            ], !0) : y("", !0)
          ]),
          e.hideSearchInputsAboveTable ? y("", !0) : z(o.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: s.value.hasSearchInputsWithValue,
            searchInputs: s.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: B.value,
            onChange: ue
          }, () => [
            s.value.hasSearchInputsWithValue || B.value.length > 0 ? (r(), F(Ma, {
              key: 0,
              "search-inputs": s.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": B.value,
              "on-change": ue,
              "on-remove": Se
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : y("", !0)
          ], !0),
          z(o.$slots, "tableWrapper", { meta: A.value }, () => [
            W(Ba, {
              class: P({ "ijt-wrapper--mt": !ne.value })
            }, {
              default: O(() => [
                z(o.$slots, "table", {}, () => [
                  t("div", Ka, [
                    t("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": e.resizeableColumns && _.value }]),
                      style: X([{ "table-layout": "fixed", "min-width": "100%" }, { width: vt.value }]),
                      onMouseenter: i[1] || (i[1] = (v) => e.resizeableColumns ? ht : null),
                      onMouseleave: i[2] || (i[2] = (v) => e.resizeableColumns ? mt : null)
                    }, [
                      t("thead", Ga, [
                        z(o.$slots, "head", {
                          show: ve,
                          sortBy: Pe,
                          header: fe
                        }, () => [
                          t("tr", Xa, [
                            e.hasCheckboxes ? (r(), h("th", Qa, [
                              T(t("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: it,
                                "onUpdate:modelValue": i[0] || (i[0] = (v) => E.value = v),
                                class: "ijt-table__checkbox"
                              }, null, 40, Ya), [
                                [Ae, E.value]
                              ])
                            ])) : y("", !0),
                            (r(!0), h(U, null, H(f.value.columns, (v) => (r(), F(Fl, {
                              cell: fe(v.key),
                              style: X(dt(v.key))
                            }, {
                              label: O(() => [
                                z(o.$slots, `header(${v.key})`, {
                                  label: fe(v.key).label,
                                  column: fe(v.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", Ja, [
                        z(o.$slots, "body", { show: ve }, () => [
                          (r(!0), h(U, null, H(D.value, (v, x) => (r(), h("tr", {
                            key: `table-${e.name}-row-${x}`,
                            class: P(["ijt-table__tr", Ze(v, x)])
                          }, [
                            e.hasCheckboxes ? (r(), h("td", Za, [
                              T(t("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${x}`,
                                class: "ijt-table__checkbox",
                                "onUpdate:modelValue": (g) => v.__itSelected = g
                              }, null, 8, eo), [
                                [Ae, v.__itSelected]
                              ])
                            ])) : y("", !0),
                            (r(!0), h(U, null, H(f.value.columns, (g, N) => T((r(), h("td", {
                              key: `table-${e.name}-row-${x}-column-${g.key}`,
                              onClick: (V) => ot(V, v, g.key),
                              class: P(["ijt-table__td", g.body_class]),
                              "data-column-key": g.key,
                              style: X({
                                width: ut(g.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...ct(g.key)
                              })
                            }, [
                              z(o.$slots, `cell(${g.key})`, { item: v }, () => [
                                ee(b(v[g.key]), 1)
                              ], !0)
                            ], 14, to)), [
                              [Z, ve(g.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                k.value ? y("", !0) : z(o.$slots, "pagination", {
                  key: 0,
                  onClick: ze,
                  hasData: K.value,
                  meta: A.value,
                  perPageOptions: s.value.perPageOptions,
                  onPerPageChange: Ne,
                  showExportButton: e.showExportButton
                }, () => [
                  t("div", no, [
                    e.hasCheckboxes ? (r(), h("span", lo, b(ft.value), 1)) : y("", !0),
                    W(Yl, {
                      "on-click": ze,
                      "has-data": K.value,
                      meta: A.value,
                      "per-page-options": s.value.perPageOptions,
                      "on-per-page-change": Ne,
                      "show-export-button": e.showExportButton
                    }, {
                      exportButton: O((v) => [
                        z(o.$slots, "exportButton", jt(Ct(v)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                k.value && C.value ? (r(), h("div", ao, [...i[4] || (i[4] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : y("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          k.value ? (r(), h("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: j,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : y("", !0),
          z(o.$slots, "tableSummary", {
            data: D.value,
            meta: A.value,
            selectedItems: Oe.value
          }, void 0, !0)
        ], 10, Aa))
      ]),
      _: 3
    }));
  }
}, So = /* @__PURE__ */ Ce(oo, [["__scopeId", "data-v-5290937e"]]);
export {
  pe as ButtonWithDropdown,
  Fl as HeaderCell,
  Tt as OnClickOutside,
  Yl as Pagination,
  So as Table,
  ea as TableAddSearchRow,
  ua as TableColumns,
  ba as TableFilter,
  wa as TableGlobalSearch,
  qa as TableReset,
  Ma as TableSearchRows,
  Ba as TableWrapper,
  te as getTranslations,
  Co as setTranslation,
  $o as setTranslations
};
