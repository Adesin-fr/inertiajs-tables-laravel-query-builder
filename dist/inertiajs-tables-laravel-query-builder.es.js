import { ref as M, onMounted as Z, onBeforeUnmount as tt, openBlock as o, createElementBlock as f, renderSlot as z, watch as X, nextTick as Ie, createBlock as F, withCtx as L, createElementVNode as t, normalizeClass as P, withModifiers as R, withDirectives as A, vShow as le, createStaticVNode as qt, normalizeStyle as J, toDisplayString as _, createCommentVNode as b, createTextVNode as te, computed as q, unref as C, vModelSelect as nt, vModelText as ue, watchEffect as It, onUnmounted as _e, Teleport as ge, Fragment as D, renderList as K, createVNode as W, withKeys as Ye, inject as Nt, resolveDynamicComponent as ie, reactive as zt, isRef as Ft, useSlots as Vt, getCurrentInstance as Pt, provide as Bt, Transition as Et, vModelCheckbox as Je, normalizeProps as Lt, guardReactiveProps as Ot } from "vue";
import { createPopper as Rt } from "@popperjs/core/lib/popper-lite";
import Tt from "@popperjs/core/lib/modifiers/preventOverflow";
import At from "@popperjs/core/lib/modifiers/flip";
import Dt from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as Wt } from "@popperjs/core";
import Ut from "lodash-es/uniq";
import Ht from "vuedraggable";
import Kt from "lodash-es/find";
import qe from "qs";
import Gt from "lodash-es/clone";
import Xt from "lodash-es/filter";
import Qt from "lodash-es/findKey";
import ee from "lodash-es/forEach";
import Yt from "lodash-es/isEqual";
import Jt from "lodash-es/map";
import Zt from "lodash-es/pickBy";
import { usePage as Ze, router as en } from "@inertiajs/vue3";
const tn = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = M(null), d = M(null);
    return Z(() => {
      a.value = (v) => {
        v.target === d.value || d.value.contains(v.target) || u.do();
      }, document.addEventListener("click", a.value), document.addEventListener("touchstart", a.value);
    }), tt(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (v, e) => (o(), f("div", {
      ref_key: "root",
      ref: d
    }, [
      z(v.$slots, "default")
    ], 512));
  }
}, nn = { class: "ijt-dropdown" }, ln = ["dusk", "disabled"], be = {
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
    const d = a, v = n, e = M(!1), c = M(null), p = {
      name: "setDropdownMaxHeight",
      enabled: !0,
      phase: "write",
      fn({ state: w }) {
        const m = w.elements.popper;
        if (!m)
          return;
        const j = 12, $ = m.getBoundingClientRect(), N = w.placement || "bottom";
        let S;
        N.startsWith("top") ? S = $.bottom - j : S = window.innerHeight - $.top - j;
        const T = Math.max(S, 160);
        m.style.maxHeight = `${T}px`, m.style.overflowY = "auto", m.style.overscrollBehavior = "contain", m.style.webkitOverflowScrolling = "touch";
      }
    };
    function y() {
      e.value = !e.value;
    }
    function h() {
      e.value = !1;
    }
    X(e, () => {
      e.value && c.value && Ie(() => c.value.update()), e.value || d("closed"), e.value && d("opened");
    });
    const i = M(null), x = M(null);
    return Z(() => {
      c.value = Rt(i.value, x.value, {
        placement: v.placement,
        modifiers: [Dt, At, Tt, p]
      });
    }), tt(() => {
      c.value && (c.value.destroy(), c.value = null);
    }), u({ hide: h }), (w, m) => (o(), F(tn, { do: h }, {
      default: L(() => [
        t("div", nn, [
          t("button", {
            ref_key: "button",
            ref: i,
            type: "button",
            dusk: n.dusk,
            disabled: n.disabled,
            class: P(["ijt-dropdown__trigger", { "ijt-dropdown__trigger--disabled": n.disabled }]),
            "aria-haspopup": "true",
            onClick: R(y, ["prevent"])
          }, [
            z(w.$slots, "button")
          ], 10, ln),
          A(t("div", {
            ref_key: "tooltip",
            ref: x,
            class: "ijt-dropdown__panel"
          }, [
            z(w.$slots, "default")
          ], 512), [
            [le, e.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, an = {
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
      qt('<div class="ijt-resize-handle__separator"></div><div class="ijt-resize-handle__grip"><div class="ijt-resize-handle__grip-dots"><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div></div></div>', 2)
    ])], 34));
  }
}, sn = { class: "ijt-toggle-filter" }, on = { class: "ijt-toggle-filter__switch" }, rn = ["checked"], lt = {
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
    return (u, a) => (o(), f("div", sn, [
      t("label", on, [
        t("input", {
          type: "checkbox",
          checked: n.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (d) => n.onFilterChange(n.filter.key, d.target.checked ? "1" : "0"))
        }, null, 40, rn),
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
const Ne = (n, u) => {
  const a = n.__vccOpts || n;
  for (const [d, v] of u)
    a[d] = v;
  return a;
}, un = {
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
}, cn = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, dn = { class: "ijt-range-filter__container" }, vn = { class: "ijt-range-filter__track" }, hn = { style: { "z-index": "40" } }, fn = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, mn = { key: 0 }, pn = { key: 1 }, gn = { style: { "z-index": "40" } }, _n = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, bn = { key: 0 }, yn = { key: 1 }, kn = { draggable: "true" }, wn = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, xn = { key: 0 }, jn = { key: 1 }, Cn = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, $n = { key: 0 }, Sn = { key: 1 };
function Mn(n, u, a, d, v, e) {
  var c, p, y, h;
  return o(), f("div", cn, [
    t("div", dn, [
      t("div", vn, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: J(`width: ${e.rangeWidth}% !important; left: ${e.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: J(`left: ${e.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (i) => e.handleMouseDown(i, !0))
        }, [
          t("div", hn, [
            t("div", fn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: J(e.getMarginTop(v.hasOverlap && e.displayFirstDown))
              }, [
                a.prefix ? (o(), f("span", mn, _(a.prefix), 1)) : b("", !0),
                te(" " + _((c = e.currentMinValue) != null ? c : 0) + " ", 1),
                a.suffix ? (o(), f("span", pn, _(a.suffix), 1)) : b("", !0)
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
          style: J(`left: ${e.currentMaxValueInPercent}%;`),
          onMousedown: u[1] || (u[1] = (i) => e.handleMouseDown(i, !1))
        }, [
          t("div", gn, [
            t("div", _n, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: J(e.getMarginTop(v.hasOverlap && !e.displayFirstDown))
              }, [
                a.prefix ? (o(), f("span", bn, _(a.prefix), 1)) : b("", !0),
                te(" " + _((p = e.currentMaxValue) != null ? p : 0) + " ", 1),
                a.suffix ? (o(), f("span", yn, _(a.suffix), 1)) : b("", !0)
              ], 4),
              t("div", kn, [
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
        t("div", wn, [
          a.prefix ? (o(), f("span", xn, _(a.prefix), 1)) : b("", !0),
          te(" " + _((y = a.min) != null ? y : 0) + " ", 1),
          a.suffix ? (o(), f("span", jn, _(a.suffix), 1)) : b("", !0)
        ]),
        t("div", Cn, [
          a.prefix ? (o(), f("span", $n, _(a.prefix), 1)) : b("", !0),
          te(" " + _((h = a.max) != null ? h : 0) + " ", 1),
          a.suffix ? (o(), f("span", Sn, _(a.suffix), 1)) : b("", !0)
        ])
      ])
    ])
  ], 512);
}
const at = /* @__PURE__ */ Ne(un, [["render", Mn], ["__scopeId", "data-v-b8d9c6c5"]]), ze = {
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
  return ze.translations;
}
function Js(n, u) {
  ze.translations[n] = u;
}
function Zs(n) {
  ze.translations = n;
}
const qn = { class: "ijt-number-filter" }, In = { class: "ijt-number-filter__label" }, Nn = { value: "" }, zn = { value: "exact" }, Fn = { value: "less_than" }, Vn = { value: "greater_than" }, Pn = { value: "less_than_or_equal" }, Bn = { value: "greater_than_or_equal" }, En = { value: "between" }, Ln = { key: 0 }, On = { key: 0 }, Rn = { class: "ijt-number-filter__label" }, Tn = { class: "ijt-number-filter__input-wrapper" }, An = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Dn = ["step"], Wn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Un = { key: 1 }, Hn = { style: { "margin-bottom": "0.75rem" } }, Kn = { class: "ijt-number-filter__label" }, Gn = { class: "ijt-number-filter__input-wrapper" }, Xn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Qn = ["step"], Yn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Jn = { class: "ijt-number-filter__label" }, Zn = { class: "ijt-number-filter__input-wrapper" }, el = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, tl = ["step"], nl = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, ll = {
  key: 1,
  class: "ijt-number-filter__reset"
}, al = { class: "ijt-sr-only" }, st = {
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
    const u = n, a = ne(), d = M(""), v = M(""), e = M(""), c = M(""), p = q(() => d.value !== "" && (d.value !== "between" && v.value !== "" && v.value !== null || d.value === "between" && e.value !== "" && e.value !== null && c.value !== "" && c.value !== null));
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
      v.value = "", e.value = "", c.value = "", d.value === "" ? w() : i();
    }
    function i() {
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
    function w() {
      x(), u.onFilterChange(u.filter.key, null);
    }
    return Z(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "");
      }
    }), X(() => u.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "") : x();
    }, { deep: !0 }), (m, j) => (o(), f("div", qn, [
      t("div", null, [
        t("label", In, _(C(a).filter_type), 1),
        A(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", Nn, _(C(a).no_filter), 1),
          t("option", zn, _(C(a).exact_number), 1),
          t("option", Fn, _(C(a).less_than), 1),
          t("option", Vn, _(C(a).greater_than), 1),
          t("option", Pn, _(C(a).less_than_or_equal), 1),
          t("option", Bn, _(C(a).greater_than_or_equal), 1),
          t("option", En, _(C(a).number_range), 1)
        ], 544), [
          [nt, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (o(), f("div", Ln, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(d.value) ? (o(), f("div", On, [
          t("label", Rn, _(y()), 1),
          t("div", Tn, [
            n.filter.prefix ? (o(), f("span", An, _(n.filter.prefix), 1)) : b("", !0),
            A(t("input", {
              type: "number",
              "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
              step: n.filter.step || 1,
              class: "ijt-input",
              onInput: i,
              placeholder: "0"
            }, null, 40, Dn), [
              [
                ue,
                v.value,
                void 0,
                { number: !0 }
              ]
            ]),
            n.filter.suffix ? (o(), f("span", Wn, _(n.filter.suffix), 1)) : b("", !0)
          ])
        ])) : b("", !0),
        d.value === "between" ? (o(), f("div", Un, [
          t("div", Hn, [
            t("label", Kn, _(C(a).start_number), 1),
            t("div", Gn, [
              n.filter.prefix ? (o(), f("span", Xn, _(n.filter.prefix), 1)) : b("", !0),
              A(t("input", {
                type: "number",
                "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: i,
                placeholder: "0"
              }, null, 40, Qn), [
                [
                  ue,
                  e.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (o(), f("span", Yn, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ]),
          t("div", null, [
            t("label", Jn, _(C(a).end_number), 1),
            t("div", Zn, [
              n.filter.prefix ? (o(), f("span", el, _(n.filter.prefix), 1)) : b("", !0),
              A(t("input", {
                type: "number",
                "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: i,
                placeholder: "0"
              }, null, 40, tl), [
                [
                  ue,
                  c.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (o(), f("span", nl, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (o(), f("div", ll, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          t("span", al, _(C(a).reset_filter), 1),
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
}, sl = { class: "ijt-date-filter" }, ol = { class: "ijt-date-filter__label" }, rl = { value: "" }, il = { value: "exact" }, ul = { value: "before" }, cl = { value: "after" }, dl = { value: "between" }, vl = { key: 0 }, hl = { key: 0 }, fl = { class: "ijt-date-filter__label" }, ml = { key: 1 }, pl = { style: { "margin-bottom": "0.75rem" } }, gl = { class: "ijt-date-filter__label" }, _l = { class: "ijt-date-filter__label" }, bl = {
  key: 1,
  class: "ijt-date-filter__reset"
}, yl = { class: "ijt-sr-only" }, ot = {
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
    const u = n, a = ne(), d = M(""), v = M(""), e = M(""), c = M(""), p = q(() => d.value !== "" && (d.value !== "between" && v.value || d.value === "between" && e.value && c.value));
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
      v.value = "", e.value = "", c.value = "", d.value === "" ? w() : i();
    }
    function i() {
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
    function w() {
      x(), u.onFilterChange(u.filter.key, null);
    }
    return Z(() => {
      if (u.filter.value) {
        const m = u.filter.value;
        m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "");
      }
    }), X(() => u.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "") : x();
    }, { deep: !0 }), (m, j) => (o(), f("div", sl, [
      t("div", null, [
        t("label", ol, _(C(a).filter_type), 1),
        A(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", rl, _(C(a).no_filter), 1),
          t("option", il, _(C(a).exact_date), 1),
          t("option", ul, _(C(a).before_date), 1),
          t("option", cl, _(C(a).after_date), 1),
          t("option", dl, _(C(a).date_range), 1)
        ], 544), [
          [nt, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (o(), f("div", vl, [
        ["exact", "before", "after"].includes(d.value) ? (o(), f("div", hl, [
          t("label", fl, _(y()), 1),
          A(t("input", {
            type: "date",
            "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
            class: "ijt-input",
            onChange: i
          }, null, 544), [
            [ue, v.value]
          ])
        ])) : b("", !0),
        d.value === "between" ? (o(), f("div", ml, [
          t("div", pl, [
            t("label", gl, _(C(a).start_date), 1),
            A(t("input", {
              type: "date",
              "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
              class: "ijt-input",
              onChange: i
            }, null, 544), [
              [ue, e.value]
            ])
          ]),
          t("div", null, [
            t("label", _l, _(C(a).end_date), 1),
            A(t("input", {
              type: "date",
              "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
              class: "ijt-input",
              onChange: i
            }, null, 544), [
              [ue, c.value]
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (o(), f("div", bl, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          t("span", yl, _(C(a).reset_filter), 1),
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
function rt(n) {
  let u = M(null), a = M(null);
  return Z(() => {
    It((d) => {
      if (!a.value || !u.value)
        return;
      let v = a.value.el || a.value, e = u.value.el || u.value;
      if (!(e instanceof HTMLElement) || !(v instanceof HTMLElement))
        return;
      let { destroy: c } = Wt(e, v, n);
      d(c);
    });
  }), [u, a];
}
const kl = { class: "ijt-filter" }, wl = ["dusk"], xl = { class: "ijt-dropdown__header" }, jl = { class: "ijt-dropdown__content" }, Cl = ["name", "value", "onChange"], $l = ["value"], Sl = {
  key: 2,
  style: { "min-width": "300px" }
}, Ml = {
  key: 3,
  style: { "min-width": "250px" }
}, ql = {
  key: 4,
  style: { "min-width": "300px" }
}, Il = {
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
    const u = n, a = M(!1), [d, v] = rt({
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
    function i(m, j) {
      u.onFilterChange(m, j);
    }
    function x(m) {
      let j = m.value;
      m.value && (Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) ? j = null : Number(Math.min(...m.value)) === 0 && Number(Math.max(...m.value)) === 0 && (j = ["0", "0"])), u.onFilterChange(m.key, j);
    }
    function w(m) {
      v.value && !v.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && y();
    }
    return Z(() => {
      document.addEventListener("click", w);
    }), _e(() => {
      document.removeEventListener("click", w);
    }), (m, j) => (o(), f("div", kl, [
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
      ])], 10, wl),
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
          (o(!0), f(D, null, K(e.value, ($) => (o(), f("div", {
            key: $.key
          }, [
            t("h3", xl, _($.label), 1),
            t("div", jl, [
              $.type === "select" ? (o(), f("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: "ijt-select",
                onChange: (N) => i($.key, N.target.value)
              }, [
                (o(!0), f(D, null, K($.options, (N, S) => (o(), f("option", {
                  key: S,
                  value: S
                }, _(N), 9, $l))), 128))
              ], 40, Cl)) : b("", !0),
              $.type === "toggle" ? (o(), F(lt, {
                key: 1,
                filter: $,
                "on-filter-change": i
              }, null, 8, ["filter"])) : b("", !0),
              $.type === "number" ? (o(), f("div", Sl, [
                W(st, {
                  filter: $,
                  "on-filter-change": i
                }, null, 8, ["filter"])
              ])) : b("", !0),
              $.type === "number_range" ? (o(), f("div", Ml, [
                W(at, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(N) => $.value = N, (N) => x($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              $.type === "date" ? (o(), f("div", ql, [
                W(ot, {
                  filter: $,
                  "on-filter-change": i
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
}, Nl = { class: "ijt-filter" }, zl = ["dusk"], Fl = { class: "ijt-column-search__header" }, Vl = { class: "ijt-column-search__content" }, Pl = ["value", "placeholder"], Bl = {
  key: 0,
  class: "ijt-column-search__reset"
}, El = { class: "ijt-sr-only" }, Ll = {
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
    const u = n, a = ne(), d = M(!1), v = M(null), [e, c] = rt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = q(() => u.searchInputs.find((N) => N.key === u.columnKey)), y = q(() => p.value && p.value.value || ""), h = M(y.value);
    X(y, (N) => {
      document.activeElement !== v.value && (h.value = N);
    });
    const i = q(() => y.value !== "");
    async function x() {
      p.value && (d.value = !d.value, d.value && (await Ie(), v.value && v.value.focus()));
    }
    function w() {
      d.value = !1;
    }
    function m(N) {
      j(N.target.value);
    }
    function j(N) {
      h.value = N, u.onSearchChange(u.columnKey, N);
    }
    function $(N) {
      c.value && !c.value.contains(N.target) && !N.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Z(() => {
      document.addEventListener("click", $);
    }), _e(() => {
      document.removeEventListener("click", $);
    }), (N, S) => (o(), f("div", Nl, [
      t("button", {
        ref_key: "trigger",
        ref: e,
        onClick: x,
        class: P(["ijt-filter__button", { "ijt-filter__button--active": i.value }]),
        dusk: `column-search-${n.columnKey}`
      }, [...S[2] || (S[2] = [
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
      ])], 10, zl),
      (o(), F(ge, { to: "body" }, [
        d.value ? (o(), f("div", {
          key: 0,
          ref_key: "container",
          ref: c,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: S[1] || (S[1] = R(() => {
          }, ["stop"]))
        }, [
          t("h3", Fl, _(C(a).search) + " " + _(n.columnLabel), 1),
          t("div", Vl, [
            t("input", {
              ref_key: "searchInput",
              ref: v,
              type: "text",
              value: h.value,
              class: "ijt-column-search__input",
              placeholder: `${C(a).search} ${n.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                Ye(w, ["enter"]),
                Ye(w, ["escape"])
              ]
            }, null, 40, Pl),
            h.value !== "" ? (o(), f("div", Bl, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: S[0] || (S[0] = (T) => j(""))
              }, [
                t("span", El, _(C(a).reset), 1),
                S[3] || (S[3] = t("svg", {
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
          onClick: w
        })) : b("", !0)
      ]))
    ]));
  }
}, Ol = ["data-column-key"], Rl = { class: "ijt-table__th-content" }, Tl = { class: "ijt-table__th-label" }, Al = ["sorted"], Dl = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Wl = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Ul = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Hl = { class: "ijt-table__th-actions" }, Kl = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = Nt("columnResize", null), d = q(() => {
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
    return (y, h) => A((o(), f("th", {
      class: P(["ijt-table__th", n.cell.header_class]),
      style: J({ width: d.value }),
      "data-column-key": n.cell.key
    }, [
      (o(), F(ie(n.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: n.cell.sortable ? `sort-${n.cell.key}` : null,
        onClick: R(c, ["prevent"])
      }, {
        default: L(() => [
          t("span", Rl, [
            t("span", Tl, [
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
                  n.cell.sorted ? b("", !0) : (o(), f("path", Dl)),
                  n.cell.sorted === "asc" ? (o(), f("path", Wl)) : b("", !0),
                  n.cell.sorted === "desc" ? (o(), f("path", Ul)) : b("", !0)
                ], 10, Al)) : b("", !0)
              ])
            ]),
            t("span", Hl, [
              z(y.$slots, "search", {}, () => [
                n.cell.searchable && n.cell.searchInputs && n.cell.searchInputs.length > 0 ? (o(), F(Ll, {
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
                n.cell.filters && n.cell.filters.length > 0 ? (o(), F(Il, {
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
      n.cell.resizable !== !1 && C(a) ? (o(), F(an, {
        key: 0,
        "column-key": n.cell.key,
        "on-resize": p,
        "is-active": v.value && e.value === n.cell.key
      }, null, 8, ["column-key", "is-active"])) : b("", !0)
    ], 14, Ol)), [
      [le, !n.cell.hidden]
    ]);
  }
}, Gl = ["dusk", "value"], Xl = ["value"], et = {
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
    const u = ne(), a = n, d = q(() => {
      let v = [...a.options];
      return v.push(parseInt(a.value)), Ut(v).sort((e, c) => e - c);
    });
    return (v, e) => (o(), f("select", {
      name: "per_page",
      dusk: n.dusk,
      value: n.value,
      class: "ijt-per-page",
      onChange: e[0] || (e[0] = (c) => n.onChange(c.target.value))
    }, [
      (o(!0), f(D, null, K(d.value, (c) => (o(), f("option", {
        key: c,
        value: c
      }, _(c) + " " + _(C(u).per_page), 9, Xl))), 128))
    ], 40, Gl));
  }
}, Ql = {
  key: 0,
  class: "ijt-pagination"
}, Yl = {
  key: 0,
  class: "ijt-no-results"
}, Jl = { class: "ijt-sm-inline ijt-hidden" }, Zl = { class: "ijt-sm-inline ijt-hidden" }, ea = {
  key: 2,
  class: "ijt-pagination--full"
}, ta = { class: "ijt-pagination__left" }, na = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, la = { class: "ijt-pagination__info-highlight" }, aa = { class: "ijt-pagination__info-highlight" }, sa = { class: "ijt-pagination__info-highlight" }, oa = { class: "ijt-pagination__right" }, ra = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, ia = { class: "ijt-sr-only" }, ua = { class: "ijt-pagination__button-text" }, ca = { class: "ijt-sr-only" }, da = {
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
    const u = ne(), a = n, d = q(() => "links" in e.value ? e.value.links.length > 0 : !1), v = q(() => Object.keys(e.value).length > 0), e = q(() => a.meta), c = q(() => "prev_page_url" in e.value ? e.value.prev_page_url : null), p = q(() => "next_page_url" in e.value ? e.value.next_page_url : null), y = q(() => parseInt(e.value.per_page));
    return (h, i) => v.value ? (o(), f("nav", Ql, [
      !n.hasData || e.value.total < 1 ? (o(), f("p", Yl, _(C(u).no_results_found), 1)) : b("", !0),
      n.hasData ? (o(), f("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": d.value }])
      }, [
        (o(), F(ie(c.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !c.value
            }
          ]),
          href: c.value,
          dusk: c.value ? "pagination-simple-previous" : null,
          onClick: i[0] || (i[0] = R((x) => n.onClick(c.value), ["prevent"]))
        }, {
          default: L(() => [
            i[4] || (i[4] = t("svg", {
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
            t("span", Jl, _(C(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        W(et, {
          dusk: "per-page-mobile",
          value: y.value,
          options: n.perPageOptions,
          "on-change": n.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (o(), F(ie(p.value ? "a" : "div"), {
          class: P([
            "ijt-pagination__button",
            {
              "ijt-pagination__button--disabled": !p.value
            }
          ]),
          href: p.value,
          dusk: p.value ? "pagination-simple-next" : null,
          onClick: i[1] || (i[1] = R((x) => n.onClick(p.value), ["prevent"]))
        }, {
          default: L(() => [
            t("span", Zl, _(C(u).next), 1),
            i[5] || (i[5] = t("svg", {
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
      n.hasData && d.value ? (o(), f("div", ea, [
        t("div", ta, [
          W(et, {
            dusk: "per-page-full",
            value: y.value,
            options: n.perPageOptions,
            "on-change": n.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", na, [
            t("span", la, _(e.value.from), 1),
            te(" " + _(C(u).to) + " ", 1),
            t("span", aa, _(e.value.to), 1),
            te(" " + _(C(u).of) + " ", 1),
            t("span", sa, _(e.value.total), 1),
            te(" " + _(C(u).results), 1)
          ])
        ]),
        t("div", oa, [
          t("nav", ra, [
            (o(), F(ie(c.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--first",
                {
                  "ijt-pagination__button--disabled": !c.value
                }
              ]),
              href: c.value,
              dusk: c.value ? "pagination-previous" : null,
              onClick: i[2] || (i[2] = R((x) => n.onClick(c.value), ["prevent"]))
            }, {
              default: L(() => [
                t("span", ia, _(C(u).previous), 1),
                i[6] || (i[6] = t("svg", {
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
            (o(!0), f(D, null, K(e.value.links, (x, w) => (o(), f("div", { key: w }, [
              z(h.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (o(), F(ie(x.url ? "a" : "div"), {
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
                    t("span", ua, _(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : b("", !0)
              ])
            ]))), 128)),
            (o(), F(ie(p.value ? "a" : "div"), {
              class: P([
                "ijt-pagination__button",
                "ijt-pagination__button--last",
                {
                  "ijt-pagination__button--disabled": !p.value
                }
              ]),
              href: p.value,
              dusk: p.value ? "pagination-next" : null,
              onClick: i[3] || (i[3] = R((x) => n.onClick(p.value), ["prevent"]))
            }, {
              default: L(() => [
                t("span", ca, _(C(u).next), 1),
                i[7] || (i[7] = t("svg", {
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
}, va = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, ha = ["dusk", "onClick"], fa = {
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
    const u = n, a = M(null);
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
        t("div", va, [
          (o(!0), f(D, null, K(n.searchInputs, (c, p) => (o(), f("button", {
            key: p,
            dusk: `add-search-row-${c.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((y) => d(c.key), ["prevent"])
          }, _(c.label), 9, ha))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, ma = ["data-column-key"], pa = { class: "ijt-column-manager__item-left" }, ga = ["onClick", "title"], _a = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, ba = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, ya = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], it = {
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
    const a = n, d = u, v = M([...a.columns]), e = M(!1), c = M(!1);
    X(() => a.columns, (i) => {
      !e.value && !c.value && (v.value = [...i]), c.value && setTimeout(() => {
        c.value = !1;
      }, 100);
    }, { deep: !0 });
    function p(i, x) {
      const w = v.value.findIndex((m) => m.key === i);
      w !== -1 && (v.value[w].hidden = !x), d("columns-changed", v.value);
    }
    function y(i, x) {
      const w = v.value.findIndex((m) => m.key === i);
      w !== -1 && (v.value[w].pinned = !x), v.value.sort((m, j) => m.pinned && !j.pinned ? -1 : !m.pinned && j.pinned ? 1 : 0), d("columns-changed", v.value);
    }
    function h() {
      c.value = !0, d("columns-changed", v.value);
    }
    return (i, x) => (o(), F(C(Ht), {
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
      item: L(({ element: w }) => [
        t("div", {
          class: "ijt-column-manager__item",
          "data-test": "column-item",
          "data-column-key": w.key
        }, [
          t("div", pa, [
            x[5] || (x[5] = t("div", { class: "ijt-column-manager__drag-handle" }, [
              t("svg", {
                class: "ijt-column-manager__drag-handle-icon",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                t("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            w.can_be_pinned !== !1 ? (o(), f("button", {
              key: 0,
              type: "button",
              class: P(["ijt-column-manager__pin-button", { "ijt-column-manager__pin-button--active": w.pinned }]),
              onClick: R((m) => y(w.key, w.pinned), ["prevent"]),
              title: w.pinned ? "Unpin column" : "Pin column"
            }, [
              w.pinned ? (o(), f("svg", _a, [...x[3] || (x[3] = [
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
              ])])) : (o(), f("svg", ba, [...x[4] || (x[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, ga)) : b("", !0),
            t("p", {
              class: P(["ijt-column-manager__label", {
                "ijt-column-manager__label--hidden": w.hidden,
                "ijt-column-manager__label--pinned": w.pinned
              }])
            }, _(w.label), 3)
          ]),
          w.can_be_hidden && !w.pinned ? (o(), f("button", {
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
          ])], 10, ya)) : b("", !0)
        ], 8, ma)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, ka = {
  key: 0,
  class: "ijt-button__badge"
}, wa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, xa = {
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
    const u = n, a = M([...u.columns]);
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
        n.hasHiddenColumns ? (o(), f("span", ka, "(" + _(d.value) + ")", 1)) : b("", !0)
      ]),
      default: L(() => [
        t("div", wa, [
          W(it, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: v
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, ja = {
  key: 0,
  class: "ijt-button__badge"
}, Ca = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, $a = { class: "ijt-dropdown__header" }, Sa = { class: "ijt-dropdown__content" }, Ma = ["name", "value", "onChange"], qa = ["value"], Ia = {
  key: 2,
  style: { "min-width": "250px" }
}, Na = {
  key: 3,
  style: { "min-width": "300px" }
}, za = {
  key: 4,
  style: { "min-width": "300px" }
}, Fa = {
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
        n.hasEnabledFilters ? (o(), f("span", ja, "(" + _(a.value) + ")", 1)) : b("", !0)
      ]),
      default: L(() => [
        t("div", Ca, [
          (o(!0), f(D, null, K(n.filters, (p, y) => (o(), f("div", { key: y }, [
            t("h3", $a, _(p.label), 1),
            t("div", Sa, [
              p.type === "select" ? (o(), f("select", {
                key: 0,
                name: p.key,
                value: p.value,
                class: "ijt-select",
                onChange: (h) => n.onFilterChange(p.key, h.target.value)
              }, [
                (o(!0), f(D, null, K(p.options, (h, i) => (o(), f("option", {
                  key: i,
                  value: i
                }, _(h), 9, qa))), 128))
              ], 40, Ma)) : b("", !0),
              p.type === "toggle" ? (o(), F(lt, {
                key: 1,
                filter: p,
                "on-filter-change": n.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : b("", !0),
              p.type === "number_range" ? (o(), f("div", Ia, [
                W(at, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(h) => p.value = h, (h) => v(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              p.type === "date" ? (o(), f("div", Na, [
                W(ot, {
                  filter: p,
                  "on-filter-change": n.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0),
              p.type === "number" ? (o(), f("div", za, [
                W(st, {
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
}, Va = { class: "ijt-global-search" }, Pa = ["placeholder", "value"], Ba = {
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
    const u = n, a = M(null), d = M((e = u.value) != null ? e : "");
    X(() => u.value, (c) => {
      document.activeElement !== a.value && (d.value = c != null ? c : "");
    });
    function v(c) {
      d.value = c.target.value, u.onChange(d.value);
    }
    return (c, p) => (o(), f("div", Va, [
      t("input", {
        ref_key: "inputEl",
        ref: a,
        class: "ijt-global-search__input",
        placeholder: n.label,
        value: d.value,
        type: "text",
        name: "global",
        onInput: v
      }, null, 40, Pa),
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
}, Ea = { class: "ijt-search-row__container" }, La = ["for"], Oa = ["id", "name", "value", "onInput"], Ra = { class: "ijt-search-row__remove" }, Ta = ["dusk", "onClick"], Aa = {
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
    const u = { el: M([]) };
    let a = q(() => u.el.value);
    const d = n;
    function v(e) {
      return d.forcedVisibleSearchInputs.includes(e);
    }
    return X(d.forcedVisibleSearchInputs, (e) => {
      const c = e.length > 0 ? e[e.length - 1] : null;
      !c || Ie().then(() => {
        const p = Kt(a.value, (y) => y.name === c);
        p && p.focus();
      });
    }, { immediate: !0 }), (e, c) => (o(!0), f(D, null, K(n.searchInputs, (p, y) => A((o(), f("div", {
      key: y,
      class: "ijt-search-row"
    }, [
      t("div", Ea, [
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
        ], 8, La),
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
        }, null, 40, Oa)),
        t("div", Ra, [
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
          ])], 8, Ta)
        ])
      ])
    ])), [
      [le, p.value !== null || v(p.key)]
    ])), 128));
  }
}, Da = ["aria-label"], Wa = { class: "ijt-reset__label" }, Ua = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = ne();
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
        t("span", Wa, _((e = C(u).reset) != null ? e : "Reset"), 1)
      ], 8, Da);
    };
  }
}, Ha = {}, Ka = { class: "ijt-wrapper" }, Ga = { class: "ijt-wrapper__outer" }, Xa = { class: "ijt-wrapper__inner" }, Qa = { class: "ijt-wrapper__container" };
function Ya(n, u) {
  return o(), f("div", Ka, [
    t("div", Ga, [
      t("div", Xa, [
        t("div", Qa, [
          z(n.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Ja = /* @__PURE__ */ Ne(Ha, [["render", Ya]]), Za = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, es = ["dusk", "onClick"], ts = { class: "ijt-dropdown__content" }, ns = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const u = ne(), a = n, d = M(!1), v = M(!1);
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
        var h, i, x, w, m;
        return [
          t("div", Za, [
            A(t("div", null, [
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
                t("span", null, _((i = C(u).show_hide_columns) != null ? i : "Show / Hide columns"), 1)
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
              [le, !d.value && !v.value]
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
                t("span", null, _((w = C(u).add_search_fields) != null ? w : "Add search field"), 1)
              ]),
              (o(!0), f(D, null, K(n.actions.searchFields.searchInputs, (j, $) => (o(), f("button", {
                key: $,
                dusk: `add-search-row-${j.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((N) => n.actions.searchFields.onClick(j.key), ["prevent"])
              }, _(j.label), 9, es))), 128))
            ], 512), [
              [le, v.value]
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
                t("span", null, _((m = C(u).show_hide_columns) != null ? m : "Show / Hide columns"), 1)
              ]),
              t("div", ts, [
                W(it, {
                  columns: n.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: c
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [le, d.value]
            ]),
            A(t("div", null, [
              z(p.$slots, "default")
            ], 512), [
              [le, !d.value && !v.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 512));
  }
};
function ls(n) {
  const u = M(!1), a = M(null), d = M(0), v = M(0), e = zt({}), c = () => {
    const S = Ft(n) ? C(n) : n;
    return S ? `${S}-columnWidths` : null;
  }, p = () => {
    const S = c();
    if (!S)
      return;
    const T = localStorage.getItem(S);
    if (T)
      try {
        const V = JSON.parse(T);
        Object.assign(e, V);
      } catch (V) {
        console.warn("Unable to load column widths:", V);
      }
  }, y = () => {
    const S = c();
    !S || localStorage.setItem(S, JSON.stringify(e));
  }, h = (S, T) => {
    S.preventDefault(), S.stopPropagation(), u.value = !0, a.value = T, d.value = S.clientX;
    const V = S.target.closest("th");
    v.value = V.offsetWidth;
    const E = V.closest("table");
    E && E.querySelectorAll("thead th[data-column-key]").forEach((U) => {
      const O = U.getAttribute("data-column-key"), G = U.offsetWidth;
      e[O] || (e[O] = G), U.style.width = `${e[O]}px`;
      const H = Array.from(U.parentNode.children).indexOf(U);
      E.querySelectorAll("tbody tr").forEach((se) => {
        const he = se.children[H];
        he && (he.style.width = `${e[O]}px`);
      });
    }), document.addEventListener("mousemove", i), document.addEventListener("mouseup", x), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, i = (S) => {
    if (!u.value || !a.value)
      return;
    const T = S.clientX - d.value, V = Math.max(50, v.value + T);
    e[a.value] = V;
    const E = document.querySelector(`th[data-column-key="${a.value}"]`);
    if (E) {
      E.style.width = `${V}px`;
      const Q = E.closest("table");
      if (Q) {
        const U = Array.from(E.parentNode.children).indexOf(E);
        Q.querySelectorAll("tbody tr").forEach((G) => {
          const H = G.children[U];
          H && (H.style.width = `${V}px`);
        });
      }
    }
  }, x = () => {
    u.value && (u.value = !1, a.value = null, y(), document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, w = (S) => e[S] || "auto", m = (S, T) => {
    e[S] = T, y();
  }, j = (S) => {
    if (!S)
      return;
    S.querySelectorAll("thead th[data-column-key]").forEach((V) => {
      const E = V.getAttribute("data-column-key");
      if (!e[E]) {
        const O = V.offsetWidth;
        e[E] = Math.max(O, 100);
      }
      V.style.width = `${e[E]}px`;
      const Q = Array.from(V.parentNode.children).indexOf(V);
      S.querySelectorAll("tbody tr").forEach((O) => {
        const G = O.children[Q];
        G && (G.style.width = `${e[E]}px`);
      });
    });
  }, $ = () => {
    Object.keys(e).forEach((T) => {
      delete e[T];
    });
    const S = c();
    S && localStorage.removeItem(S);
  }, N = () => {
    u.value && (document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Z(() => {
    p();
  }), _e(() => {
    N();
  }), {
    isResizing: u,
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
const as = ["dusk"], ss = { class: "ijt-toolbar" }, os = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, rs = { class: "ijt-toolbar__actions" }, is = { key: 0 }, us = {
  key: 4,
  class: "ijt-toolbar__mobile-sort"
}, cs = ["id", "value", "aria-label", "title"], ds = { value: "" }, vs = ["value"], hs = ["value"], fs = ["href"], ms = { class: "ijt-table-container" }, ps = { class: "ijt-table__thead" }, gs = { class: "ijt-table__tr" }, _s = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, bs = ["for"], ys = ["id", "aria-label"], ks = { class: "ijt-table__tbody" }, ws = ["data-column-label"], xs = { class: "ijt-sr-only" }, js = { class: "ijt-table__td-content" }, Cs = ["for"], $s = ["id", "onUpdate:modelValue", "aria-label"], Ss = ["onClick", "data-column-key", "data-column-label", "data-column-hidden"], Ms = { class: "ijt-table__td-label" }, qs = { class: "ijt-table__td-content" }, Is = { class: "ijt-footer" }, Ns = {
  key: 0,
  class: "ijt-footer__selection-info"
}, zs = {
  key: 1,
  class: "ijt-loading"
}, Fs = {
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
    var Ge, Xe;
    const a = ne(), d = Vt(), v = u, e = n, c = q(() => e.localStorageName ? e.localStorageName : e.name && e.name !== "default" ? `table-${e.name}` : null);
    Pt();
    const p = e.resizeableColumns ? ls(c) : null;
    Bt("columnResize", p);
    const y = M(!1), h = q(() => Ze().props.queryBuilderProps ? { ...Ze().props.queryBuilderProps[e.name] } : {}), i = M(h.value), x = q(() => i.value.columns.filter((l) => !l.hidden)), w = q(() => x.value.filter((l) => l.sortable && !$(l))), m = q(() => x.value.some((l) => l.key === "actions")), j = q(() => x.value.some((l) => Me(l.key)));
    function $(l) {
      const s = String(l.body_class || "").split(/\s+/);
      return s.includes("hidden") || s.includes("ijt-hidden");
    }
    const N = q(() => {
      const l = i.value.sort;
      return l && l !== h.value.defaultSort ? l : "";
    }), S = q(() => Boolean(e.withInfiniteScrolling || h.value.infiniteScrolling));
    function T() {
      var l, s, r, k, g, I, B, Y, re, ve;
      return (ve = (re = (I = (r = (l = oe.value) == null ? void 0 : l.next_page_url) != null ? r : (s = e.resource) == null ? void 0 : s.next_page_url) != null ? I : (g = (k = e.resource) == null ? void 0 : k.links) == null ? void 0 : g.next) != null ? re : (Y = (B = e.resource) == null ? void 0 : B.meta) == null ? void 0 : Y.next_page_url) != null ? ve : null;
    }
    const V = M([]), E = M(null), Q = M(null), U = M(!1);
    let O;
    const G = q(() => h.value.pageName), H = M([]), ae = M(null), se = M(!1), he = q(() => h.value.hasToggleableColumns || h.value.hasFilters || h.value.hasSearchInputs ? !1 : !h.value.globalSearch), fe = q(() => S.value ? V.value : Object.keys(e.resource).length === 0 ? e.data : "data" in e.resource ? e.resource.data : e.resource), oe = q(() => Object.keys(e.resource).length === 0 ? e.meta : "links" in e.resource && "meta" in e.resource && Object.keys(e.resource.links).length === 4 && "next" in e.resource.links && "prev" in e.resource.links ? {
      ...e.resource.meta,
      next_page_url: e.resource.links.next,
      prev_page_url: e.resource.links.prev
    } : "meta" in e.resource ? e.resource.meta : e.resource), Fe = q(() => fe.value.length > 0 ? !0 : oe.value.total > 0), Ve = M({
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
    function ut(l) {
      H.value = H.value.filter((s) => s != l), ce(l, null);
    }
    function ye(l) {
      H.value.push(l);
    }
    const Pe = q(() => {
      if (H.value.length > 0)
        return !0;
      const l = qe.parse(location.search.substring(1));
      if (l[G.value] > 1)
        return !0;
      const r = e.name === "default" ? "" : e.name + "_";
      let k = !1;
      return ee(["filter", "columns", "cursor", "sort"], (g) => {
        const I = l[r + g];
        g === "sort" && I === h.value.defaultSort || I !== void 0 && (k = !0);
      }), k;
    }), ct = (l, s) => {
      let r = [];
      if (e.striped && s % 2 && r.push("ijt-table__tr--striped"), e.rowClass && typeof e.rowClass == "function") {
        const k = e.rowClass(l);
        k && r.push(k);
      }
      return r.join(" ");
    }, Be = q(() => {
      if (!e.showExportButton)
        return null;
      const l = new URL(window.location.href);
      l.search = "";
      const s = new URLSearchParams();
      if (h.value.page && h.value.page > 1 && s.set(G.value, h.value.page), h.value.sort) {
        const g = e.name === "default" ? "sort" : `${e.name}_sort`;
        s.set(g, h.value.sort);
      }
      const r = {};
      if (i.value.filters.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (r[g.key] = g.value);
      }), i.value.searchInputs.forEach((g) => {
        g.value !== null && g.value !== void 0 && g.value !== "" && (r[g.key] = g.value);
      }), Object.keys(r).length > 0) {
        const g = e.name === "default" ? "filter" : `${e.name}_filter`;
        Object.keys(r).forEach((I) => {
          const B = r[I];
          Array.isArray(B) ? B.forEach((Y, re) => {
            s.set(`${g}[${I}][${re}]`, Y);
          }) : typeof B == "object" && B !== null ? Object.keys(B).forEach((Y) => {
            s.set(`${g}[${I}][${Y}]`, B[Y]);
          }) : s.set(`${g}[${I}]`, B);
        });
      }
      const k = i.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (k.length !== i.value.columns.length) {
        const g = e.name === "default" ? "columns" : `${e.name}_columns`;
        k.forEach((I) => {
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
      de.value = "", H.value = [], ee(i.value.filters, (l, s) => {
        i.value.filters[s].value = null;
      }), ee(i.value.searchInputs, (l, s) => {
        i.value.searchInputs[s].value = null;
      }), ee(i.value.columns, (l, s) => {
        i.value.columns[s].hidden = l.can_be_hidden ? !h.value.defaultVisibleToggleableColumns.includes(l.key) : !1, i.value.columns[s].pinned = !1;
      }), c.value && localStorage.removeItem(`${c.value}-columns`), e.resizeableColumns && p && p.resetColumnWidths(), i.value.sort = null, i.value.cursor = null, i.value.page = 1;
    }
    const Ee = {};
    function ce(l, s) {
      clearTimeout(Ee[l]), Ee[l] = setTimeout(() => {
        Ce.value && e.preventOverlappingRequests && Ce.value.cancel();
        const r = me("searchInputs", l);
        i.value.searchInputs[r].value = s, i.value.cursor = null, i.value.page = 1;
      }, e.inputDebounceMs);
    }
    const de = M((Xe = (Ge = h.value.globalSearch) == null ? void 0 : Ge.value) != null ? Xe : "");
    X(() => {
      var l;
      return (l = h.value.globalSearch) == null ? void 0 : l.value;
    }, (l) => {
      var r;
      const s = document.activeElement;
      s && ((r = ae.value) == null ? void 0 : r.contains(s)) && ["INPUT", "TEXTAREA"].includes(s.tagName) || (de.value = l != null ? l : "");
    });
    function Le(l) {
      de.value = l, ce("global", l);
    }
    function we(l, s) {
      const r = me("filters", l);
      i.value.filters[r].value = s, i.value.cursor = null, i.value.page = 1;
    }
    function Oe(l) {
      i.value.cursor = null, i.value.perPage = l, i.value.page = 1;
    }
    function me(l, s) {
      return Qt(i.value[l], (r) => r.key == s);
    }
    function xe(l) {
      i.value.columns = l, i.value.columns.sort((s, r) => s.pinned && !r.pinned ? -1 : !s.pinned && r.pinned ? 1 : 0), dt();
    }
    function dt() {
      if (!c.value)
        return;
      const l = i.value.columns.map((s, r) => ({
        key: s.key,
        hidden: s.hidden,
        pinned: s.pinned || !1,
        order: r
      }));
      localStorage.setItem(`${c.value}-columns`, JSON.stringify(l));
    }
    function vt() {
      let l = {};
      return ee(i.value.searchInputs, (s) => {
        s.value !== null && (l[s.key] = s.value);
      }), ee(i.value.filters, (s) => {
        let r = s.value;
        r !== null && (s.type === "number_range" && Number(Math.max(...s.value)) === Number(s.max) && Number(Math.min(...s.value)) === Number(s.min) && (r = null), l[s.key] = r);
      }), l;
    }
    function ht() {
      const l = i.value.columns;
      let s = Xt(l, (k) => !k.hidden), r = Jt(s, (k) => k.key).sort();
      return Yt(r, h.value.defaultVisibleToggleableColumns) ? {} : r;
    }
    function ft() {
      const l = vt(), s = ht(), r = {};
      Object.keys(l).length > 0 && (r.filter = l), Object.keys(s).length > 0 && (r.columns = s);
      const k = i.value.cursor, g = i.value.page, I = i.value.sort, B = i.value.perPage;
      return k && (r.cursor = k), g > 1 && (r.page = g), B > 1 && (r.perPage = B), I && (r.sort = I), r;
    }
    function Re(l) {
      if (!l)
        return null;
      if (e.paginationClickCallback && typeof e.paginationClickCallback == "function") {
        e.paginationClickCallback(l);
        return;
      }
      Te(l);
    }
    function mt() {
      const l = qe.parse(location.search.substring(1)), s = e.name === "default" ? "" : e.name + "_";
      ee(["filter", "columns", "cursor", "sort"], (k) => {
        delete l[s + k];
      }), delete l[G.value], ee(ft(), (k, g) => {
        g === "page" ? l[G.value] = k : g === "perPage" ? l.perPage = k : l[s + g] = k;
      });
      let r = qe.stringify(l, {
        filter(k, g) {
          return typeof g == "object" && g !== null ? Zt(g) : g;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!r || r === G.value + "=1") && (r = ""), r;
    }
    const je = M(!1), Ce = M(null);
    function Te(l) {
      !l || en.get(
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
              const r = ae.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: r });
            }
          }
        }
      );
    }
    function pt(l, s, r) {
      var k;
      e.hasCheckboxes && ((k = l.target) == null ? void 0 : k.parentElement.cellIndex) === 0 || v("rowClicked", l, s, r);
    }
    async function gt() {
      var l, s, r, k, g;
      if (!(U.value || !E.value)) {
        U.value = !0;
        try {
          const I = await fetch(E.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!I.ok)
            throw new Error("Network response was not ok");
          const B = await I.json();
          V.value = [...V.value, ...B.data || []], E.value = (g = (k = (s = B.next_page_url) != null ? s : (l = B.links) == null ? void 0 : l.next) != null ? k : (r = B.meta) == null ? void 0 : r.next_page_url) != null ? g : null;
        } catch (I) {
          console.error("Error loading more data:", I);
        } finally {
          U.value = !1;
        }
      }
    }
    function $e() {
      !S.value || !Q.value || (O && (O.disconnect(), O = null), e.resource && e.resource.data && V.value.length === 0 && (V.value = [...e.resource.data], E.value = T()), O = new IntersectionObserver(
        (l) => {
          l.forEach((s) => {
            s.isIntersecting && gt();
          });
        },
        {
          rootMargin: "0px 0px 500px 0px"
        }
      ), O.observe(Q.value));
    }
    X(i, () => {
      S.value && (V.value = [], E.value = null), Te(location.pathname + "?" + mt()), se.value = !1;
    }, { deep: !0 }), X(() => e.resource, () => {
      var l;
      if (!S.value && ((l = e.resource) == null ? void 0 : l.data)) {
        const s = e.resource.data.filter((r) => r.__itSelected);
        v("selectionChanged", s);
      }
    }, { deep: !0 }), X(() => h.value, (l) => {
      var r;
      if (!S.value)
        return;
      const s = ((r = e.resource) == null ? void 0 : r.data) || [];
      if (s.length > 0) {
        V.value = [...s], E.value = T();
        const k = s.filter((g) => g.__itSelected);
        v("selectionChanged", k), setTimeout(() => {
          Q.value && $e();
        }, 100);
      }
    }, { deep: !0 });
    const Ae = () => {
      e.resizeableColumns && p && setTimeout(() => {
        var s;
        const l = (s = ae.value) == null ? void 0 : s.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), S.value && setTimeout(() => {
        Q.value && $e();
      }, 100);
    };
    Z(() => {
      document.addEventListener("inertia:success", Ae), _t(), e.resizeableColumns && p && setTimeout(() => {
        var s;
        const l = (s = ae.value) == null ? void 0 : s.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), S.value && $e();
    });
    function _t() {
      if (!c.value)
        return;
      const l = localStorage.getItem(`${c.value}-columns`);
      if (!!l)
        try {
          const s = JSON.parse(l);
          if (s.length > 0 && "order" in s[0]) {
            const r = new Map(s.map((k) => [k.key, k]));
            i.value.columns.forEach((k, g) => {
              const I = r.get(k.key);
              I && (i.value.columns[g].hidden = I.hidden, i.value.columns[g].pinned = I.pinned || !1);
            }), i.value.columns.sort((k, g) => {
              var ve, Qe;
              const I = r.get(k.key), B = r.get(g.key);
              if (k.pinned && !g.pinned)
                return -1;
              if (!k.pinned && g.pinned)
                return 1;
              const Y = (ve = I == null ? void 0 : I.order) != null ? ve : 999, re = (Qe = B == null ? void 0 : B.order) != null ? Qe : 999;
              return Y - re;
            });
          } else
            s.forEach((r, k) => {
              const g = i.value.columns.findIndex((I) => I.key === r.key);
              g !== -1 && (i.value.columns[g].hidden = r.hidden, i.value.columns[g].pinned = r.pinned || !1);
            });
        } catch (s) {
          console.warn("Error loading column order from localStorage:", s);
        }
    }
    _e(() => {
      document.removeEventListener("inertia:success", Ae), O && (O.disconnect(), O = null);
    });
    function De(l) {
      i.value.sort == l ? i.value.sort = `-${l}` : i.value.sort = l, i.value.cursor = null, i.value.page = 1;
    }
    function bt(l) {
      i.value.sort = l || null, i.value.cursor = null, i.value.page = 1;
    }
    function yt(l, s) {
      if (d[`cell(${s})`])
        return !1;
      const r = l[s];
      return r == null || typeof r == "string" && r.trim() === "";
    }
    function Se(l) {
      const s = me("columns", l);
      return !i.value.columns[s].hidden;
    }
    function pe(l) {
      const s = me("columns", l), r = Gt(i.value.columns[s]);
      r.onSort = De, r.filters = i.value.filters.filter(
        (g) => g.key === l || g.key.startsWith(l + "_") || g.key.includes(l)
      );
      const k = i.value.searchInputs.filter(
        (g) => g.key === l
      );
      return k.length > 0 ? (r.searchable = !0, r.searchInputs = k) : (r.searchable = !1, r.searchInputs = []), r.onFilterChange = we, r.onSearchChange = ce, r;
    }
    function kt() {
      e.resource.data.forEach((l) => {
        l.__itSelected = se.value;
      });
    }
    function wt(l) {
      if (!e.resizeableColumns || !p)
        return "auto";
      const s = p.getColumnWidth(l);
      return s === "auto" ? s : `${s}px`;
    }
    function We(l) {
      if (!e.resizeableColumns || !p)
        return "0px";
      let s = 0;
      const r = i.value.columns.filter((k) => !k.hidden);
      e.hasCheckboxes && (s += 60);
      for (const k of r) {
        if (k.key === l)
          break;
        if (k.pinned) {
          const g = p.getColumnWidth(k.key);
          s += g === "auto" ? 150 : g;
        }
      }
      return `${s}px`;
    }
    function Ue(l) {
      const s = i.value.columns.find((r) => r.key === l);
      return s && s.pinned;
    }
    function Me(l) {
      const s = i.value.columns.find((r) => r.key === l);
      return Boolean(s && s.sticky_right && !s.pinned);
    }
    function xt(l) {
      return Ue(l) ? {
        position: "sticky",
        left: We(l),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function jt(l) {
      return Ue(l) ? {
        position: "sticky",
        left: We(l),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const Ct = q(() => {
      if (!e.resizeableColumns || !p)
        return "100%";
      let l = 0, s = !1;
      return e.hasCheckboxes && (l += 60), h.value.columns.forEach((r) => {
        if (!Se(r.key))
          return;
        const k = p.getColumnWidth(r.key);
        k === "auto" ? s = !0 : l += k;
      }), !s && l > 0 ? `${l}px` : "max(100%, " + (l > 0 ? l + "px" : "800px") + ")";
    }), He = q(() => fe.value.filter((l) => l.__itSelected)), Ke = q(() => He.value.length), $t = q(() => Ke.value === 0 ? a.noLineSelected : `${Ke.value} ${a.lineSelected}`);
    function St() {
      e.resizeableColumns && (y.value = !0);
    }
    function Mt() {
      e.resizeableColumns && setTimeout(() => {
        y.value = !1;
      }, 100);
    }
    return (l, s) => (o(), F(Et, null, {
      default: L(() => [
        (o(), f("fieldset", {
          ref_key: "tableFieldset",
          ref: ae,
          key: `table-${n.name}`,
          dusk: `table-${n.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": je.value }])
        }, [
          t("div", ss, [
            h.value.globalSearch ? (o(), f("div", os, [
              z(l.$slots, "tableGlobalSearch", {
                hasGlobalSearch: h.value.globalSearch,
                label: h.value.globalSearch ? h.value.globalSearch.label : null,
                value: de.value,
                onChange: Le
              }, () => [
                h.value.globalSearch ? (o(), F(Ba, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: h.value.globalSearch.label,
                  value: de.value,
                  "on-change": Le
                }, null, 8, ["label", "value"])) : b("", !0)
              ], !0)
            ])) : b("", !0),
            t("div", rs, [
              t("div", null, [
                z(l.$slots, "tableFilter", {
                  hasFilters: h.value.hasFilters,
                  hasEnabledFilters: h.value.hasEnabledFilters,
                  filters: h.value.filters,
                  onFilterChange: we
                }, () => [
                  h.value.hasFilters ? (o(), F(Fa, {
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
                h.value.hasSearchInputs ? (o(), F(fa, {
                  key: 0,
                  "search-inputs": h.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": h.value.hasSearchInputsWithoutValue,
                  "on-add": ye
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : b("", !0)
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : z(l.$slots, "tableColumns", {
                key: 1,
                hasColumns: h.value.hasToggleableColumns,
                columns: i.value.columns,
                hasHiddenColumns: h.value.hasHiddenColumns,
                onChange: xe
              }, () => [
                h.value.hasToggleableColumns ? (o(), F(xa, {
                  key: 0,
                  columns: i.value.columns,
                  "has-hidden-columns": h.value.hasHiddenColumns,
                  "on-change": xe,
                  "table-name": n.name
                }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : b("", !0)
              ], !0),
              n.withGroupedMenu ? z(l.$slots, "groupedAction", {
                key: 2,
                actions: Ve.value
              }, () => [
                W(ns, { actions: Ve.value }, {
                  default: L(() => [
                    z(l.$slots, "bulk-actions", {}, void 0, !0)
                  ]),
                  _: 3
                }, 8, ["actions"])
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : z(l.$slots, "tableReset", {
                key: 3,
                canBeReset: Pe.value,
                onClick: ke
              }, () => [
                Pe.value ? (o(), f("div", is, [
                  W(Ua, { "on-click": ke })
                ])) : b("", !0)
              ], !0),
              w.value.length ? (o(), f("div", us, [
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
                  value: N.value,
                  "aria-label": C(a).sort_by,
                  title: C(a).sort_by,
                  onChange: s[0] || (s[0] = (r) => bt(r.target.value))
                }, [
                  t("option", ds, _(C(a).default_sort), 1),
                  (o(!0), f(D, null, K(w.value, (r) => (o(), f(D, {
                    key: r.key
                  }, [
                    t("option", {
                      value: r.key
                    }, _(r.label) + " (" + _(C(a).ascending) + ")", 9, vs),
                    t("option", {
                      value: `-${r.key}`
                    }, _(r.label) + " (" + _(C(a).descending) + ")", 9, hs)
                  ], 64))), 128))
                ], 40, cs)
              ])) : b("", !0),
              n.showExportButton ? z(l.$slots, "exportButton", {
                key: 5,
                exportUrl: Be.value,
                translations: C(a)
              }, () => [
                t("a", {
                  href: Be.value,
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
                ])], 8, fs)
              ], !0) : b("", !0)
            ])
          ]),
          n.hideSearchInputsAboveTable ? b("", !0) : z(l.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: h.value.hasSearchInputsWithValue,
            searchInputs: h.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: H.value,
            onChange: ce
          }, () => [
            h.value.hasSearchInputsWithValue || H.value.length > 0 ? (o(), F(Aa, {
              key: 0,
              "search-inputs": h.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": H.value,
              "on-change": ce,
              "on-remove": ut
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : b("", !0)
          ], !0),
          z(l.$slots, "tableWrapper", { meta: oe.value }, () => [
            W(Ja, {
              class: P({ "ijt-wrapper--mt": !he.value })
            }, {
              default: L(() => [
                z(l.$slots, "table", {}, () => [
                  t("div", ms, [
                    t("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": n.resizeableColumns && y.value }]),
                      style: J([{ "table-layout": "fixed", "min-width": "100%" }, { width: Ct.value }]),
                      onMouseenter: s[2] || (s[2] = (r) => n.resizeableColumns ? St : null),
                      onMouseleave: s[3] || (s[3] = (r) => n.resizeableColumns ? Mt : null)
                    }, [
                      t("thead", ps, [
                        z(l.$slots, "head", {
                          show: Se,
                          sortBy: De,
                          header: pe
                        }, () => [
                          t("tr", gs, [
                            n.hasCheckboxes ? (o(), f("th", _s, [
                              t("label", {
                                for: `table-${n.name}-select-header`,
                                class: "ijt-sr-only"
                              }, _(C(a).select_row), 9, bs),
                              A(t("input", {
                                type: "checkbox",
                                id: `table-${n.name}-select-header`,
                                onChange: kt,
                                "onUpdate:modelValue": s[1] || (s[1] = (r) => se.value = r),
                                class: "ijt-table__checkbox",
                                "aria-label": C(a).select_row
                              }, null, 40, ys), [
                                [Je, se.value]
                              ])
                            ])) : b("", !0),
                            (o(!0), f(D, null, K(i.value.columns, (r) => (o(), F(Kl, {
                              cell: pe(r.key),
                              class: P({ "ijt-table__th--sticky-right": Me(r.key) }),
                              style: J(jt(r.key))
                            }, {
                              label: L(() => [
                                z(l.$slots, `header(${r.key})`, {
                                  label: pe(r.key).label,
                                  column: pe(r.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "class", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", ks, [
                        z(l.$slots, "body", { show: Se }, () => [
                          (o(!0), f(D, null, K(fe.value, (r, k) => (o(), f("tr", {
                            key: `table-${n.name}-row-${k}`,
                            class: P(["ijt-table__tr", [ct(r, k), {
                              "ijt-table__tr--has-actions": m.value,
                              "ijt-table__tr--has-checkboxes": n.hasCheckboxes,
                              "ijt-table__tr--has-card-controls": m.value || n.hasCheckboxes,
                              "ijt-table__tr--has-sticky-right": j.value
                            }]])
                          }, [
                            n.hasCheckboxes ? (o(), f("td", {
                              key: 0,
                              class: "ijt-table__td ijt-table__td--pinned-checkbox",
                              style: { width: "60px" },
                              "data-column-label": C(a).select_row
                            }, [
                              t("div", xs, _(C(a).select_row), 1),
                              t("div", js, [
                                t("label", {
                                  for: `table-${n.name}-select-${k}`,
                                  class: "ijt-sr-only"
                                }, _(C(a).select_row), 9, Cs),
                                A(t("input", {
                                  type: "checkbox",
                                  id: `table-${n.name}-select-${k}`,
                                  class: "ijt-table__checkbox",
                                  "onUpdate:modelValue": (g) => r.__itSelected = g,
                                  "aria-label": C(a).select_row
                                }, null, 8, $s), [
                                  [Je, r.__itSelected]
                                ])
                              ])
                            ], 8, ws)) : b("", !0),
                            (o(!0), f(D, null, K(x.value, (g) => (o(), f("td", {
                              key: `table-${n.name}-row-${k}-column-${g.key}`,
                              onClick: (I) => pt(I, r, g.key),
                              class: P(["ijt-table__td", [g.body_class, {
                                "ijt-table__td--empty": yt(r, g.key),
                                "ijt-table__td--sticky-right": Me(g.key)
                              }]]),
                              "data-column-key": g.key,
                              "data-column-label": g.label || g.key,
                              "data-column-hidden": g.hidden ? "true" : "false",
                              style: J({
                                width: wt(g.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...xt(g.key)
                              })
                            }, [
                              t("div", Ms, _(g.label || g.key), 1),
                              t("div", qs, [
                                z(l.$slots, `cell(${g.key})`, { item: r }, () => [
                                  te(_(r[g.key]), 1)
                                ], !0)
                              ])
                            ], 14, Ss))), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                S.value ? b("", !0) : z(l.$slots, "pagination", {
                  key: 0,
                  onClick: Re,
                  hasData: Fe.value,
                  meta: oe.value,
                  perPageOptions: h.value.perPageOptions,
                  onPerPageChange: Oe,
                  showExportButton: n.showExportButton
                }, () => [
                  t("div", Is, [
                    n.hasCheckboxes ? (o(), f("span", Ns, _($t.value), 1)) : b("", !0),
                    W(da, {
                      "on-click": Re,
                      "has-data": Fe.value,
                      meta: oe.value,
                      "per-page-options": h.value.perPageOptions,
                      "on-per-page-change": Oe,
                      "show-export-button": n.showExportButton
                    }, {
                      exportButton: L((r) => [
                        z(l.$slots, "exportButton", Lt(Ot(r)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                S.value && U.value ? (o(), f("div", zs, [...s[6] || (s[6] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : b("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          S.value ? (o(), f("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: Q,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : b("", !0),
          z(l.$slots, "tableSummary", {
            data: fe.value,
            meta: oe.value,
            selectedItems: He.value
          }, void 0, !0)
        ], 10, as))
      ]),
      _: 3
    }));
  }
}, eo = /* @__PURE__ */ Ne(Fs, [["__scopeId", "data-v-790c53ae"]]);
export {
  be as ButtonWithDropdown,
  Kl as HeaderCell,
  tn as OnClickOutside,
  da as Pagination,
  eo as Table,
  fa as TableAddSearchRow,
  xa as TableColumns,
  Fa as TableFilter,
  Ba as TableGlobalSearch,
  Ua as TableReset,
  Aa as TableSearchRows,
  Ja as TableWrapper,
  ne as getTranslations,
  Js as setTranslation,
  Zs as setTranslations
};
