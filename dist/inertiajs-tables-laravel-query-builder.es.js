import { ref as S, onMounted as Z, onBeforeUnmount as Ze, openBlock as o, createElementBlock as f, renderSlot as z, watch as G, nextTick as Me, createBlock as F, withCtx as L, createElementVNode as t, normalizeClass as P, withModifiers as R, withDirectives as A, vShow as ae, createStaticVNode as St, normalizeStyle as J, toDisplayString as _, createCommentVNode as b, createTextVNode as te, computed as I, unref as C, vModelSelect as et, vModelText as ie, watchEffect as Mt, onUnmounted as pe, Teleport as me, Fragment as U, renderList as K, createVNode as H, withKeys as Xe, inject as qt, resolveDynamicComponent as re, reactive as It, isRef as Nt, useSlots as zt, getCurrentInstance as Ft, provide as Vt, Transition as Pt, vModelCheckbox as Qe, normalizeProps as Bt, guardReactiveProps as Et } from "vue";
import { createPopper as Lt } from "@popperjs/core/lib/popper-lite";
import Ot from "@popperjs/core/lib/modifiers/preventOverflow";
import Rt from "@popperjs/core/lib/modifiers/flip";
import Tt from "@popperjs/core/lib/modifiers/eventListeners";
import { createPopper as At } from "@popperjs/core";
import Dt from "lodash-es/uniq";
import Wt from "vuedraggable";
import Ut from "lodash-es/find";
import Se from "qs";
import Ht from "lodash-es/clone";
import Kt from "lodash-es/filter";
import Gt from "lodash-es/findKey";
import ee from "lodash-es/forEach";
import Xt from "lodash-es/isEqual";
import Qt from "lodash-es/map";
import Yt from "lodash-es/pickBy";
import { usePage as Ye, router as Jt } from "@inertiajs/vue3";
const Zt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = S(null), d = S(null);
    return Z(() => {
      a.value = (v) => {
        v.target === d.value || d.value.contains(v.target) || u.do();
      }, document.addEventListener("click", a.value), document.addEventListener("touchstart", a.value);
    }), Ze(() => {
      document.removeEventListener("click", a.value), document.removeEventListener("touchstart", a.value);
    }), (v, e) => (o(), f("div", {
      ref_key: "root",
      ref: d
    }, [
      z(v.$slots, "default")
    ], 512));
  }
}, en = { class: "ijt-dropdown" }, tn = ["dusk", "disabled"], ge = {
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
      e.value && c.value && Me(() => c.value.update()), e.value || d("closed"), e.value && d("opened");
    });
    const r = S(null), x = S(null);
    return Z(() => {
      c.value = Lt(r.value, x.value, {
        placement: v.placement,
        modifiers: [Tt, Rt, Ot, p]
      });
    }), Ze(() => {
      c.value && (c.value.destroy(), c.value = null);
    }), u({ hide: h }), (w, m) => (o(), F(Zt, { do: h }, {
      default: L(() => [
        t("div", en, [
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
            z(w.$slots, "button")
          ], 10, tn),
          A(t("div", {
            ref_key: "tooltip",
            ref: x,
            class: "ijt-dropdown__panel"
          }, [
            z(w.$slots, "default")
          ], 512), [
            [ae, e.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, nn = {
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
      St('<div class="ijt-resize-handle__separator"></div><div class="ijt-resize-handle__grip"><div class="ijt-resize-handle__grip-dots"><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div><div class="ijt-resize-handle__grip-dot"></div></div></div>', 2)
    ])], 34));
  }
}, ln = { class: "ijt-toggle-filter" }, an = { class: "ijt-toggle-filter__switch" }, sn = ["checked"], tt = {
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
    return (u, a) => (o(), f("div", ln, [
      t("label", an, [
        t("input", {
          type: "checkbox",
          checked: n.filter.value,
          class: "ijt-toggle-filter__input",
          onChange: a[0] || (a[0] = (d) => n.onFilterChange(n.filter.key, d.target.checked ? "1" : "0"))
        }, null, 40, sn),
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
const qe = (n, u) => {
  const a = n.__vccOpts || n;
  for (const [d, v] of u)
    a[d] = v;
  return a;
}, on = {
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
}, rn = {
  ref: "range",
  class: "ijt-range-filter",
  unselectable: "on",
  onselectstart: "return false;"
}, un = { class: "ijt-range-filter__container" }, cn = { class: "ijt-range-filter__track" }, dn = { style: { "z-index": "40" } }, vn = {
  ref: "popover_min",
  class: "ijt-range-filter__popover"
}, hn = { key: 0 }, fn = { key: 1 }, mn = { style: { "z-index": "40" } }, pn = {
  ref: "popover_max",
  class: "ijt-range-filter__popover"
}, gn = { key: 0 }, _n = { key: 1 }, bn = { draggable: "true" }, yn = { class: "ijt-range-filter__label ijt-range-filter__label--min" }, kn = { key: 0 }, wn = { key: 1 }, xn = { class: "ijt-range-filter__label ijt-range-filter__label--max" }, jn = { key: 0 }, Cn = { key: 1 };
function $n(n, u, a, d, v, e) {
  var c, p, y, h;
  return o(), f("div", rn, [
    t("div", un, [
      t("div", cn, [
        t("div", {
          class: "ijt-range-filter__selected",
          style: J(`width: ${e.rangeWidth}% !important; left: ${e.currentMinValueInPercent}% !important;`)
        }, null, 4),
        t("div", {
          class: "ijt-range-filter__handle",
          style: J(`left: ${e.currentMinValueInPercent}%;`),
          onMousedown: u[0] || (u[0] = (r) => e.handleMouseDown(r, !0))
        }, [
          t("div", dn, [
            t("div", vn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: J(e.getMarginTop(v.hasOverlap && e.displayFirstDown))
              }, [
                a.prefix ? (o(), f("span", hn, _(a.prefix), 1)) : b("", !0),
                te(" " + _((c = e.currentMinValue) != null ? c : 0) + " ", 1),
                a.suffix ? (o(), f("span", fn, _(a.suffix), 1)) : b("", !0)
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
          onMousedown: u[1] || (u[1] = (r) => e.handleMouseDown(r, !1))
        }, [
          t("div", mn, [
            t("div", pn, [
              t("div", {
                class: "ijt-range-filter__popover-content",
                style: J(e.getMarginTop(v.hasOverlap && !e.displayFirstDown))
              }, [
                a.prefix ? (o(), f("span", gn, _(a.prefix), 1)) : b("", !0),
                te(" " + _((p = e.currentMaxValue) != null ? p : 0) + " ", 1),
                a.suffix ? (o(), f("span", _n, _(a.suffix), 1)) : b("", !0)
              ], 4),
              t("div", bn, [
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
        t("div", yn, [
          a.prefix ? (o(), f("span", kn, _(a.prefix), 1)) : b("", !0),
          te(" " + _((y = a.min) != null ? y : 0) + " ", 1),
          a.suffix ? (o(), f("span", wn, _(a.suffix), 1)) : b("", !0)
        ]),
        t("div", xn, [
          a.prefix ? (o(), f("span", jn, _(a.prefix), 1)) : b("", !0),
          te(" " + _((h = a.max) != null ? h : 0) + " ", 1),
          a.suffix ? (o(), f("span", Cn, _(a.suffix), 1)) : b("", !0)
        ])
      ])
    ])
  ], 512);
}
const nt = /* @__PURE__ */ qe(on, [["render", $n], ["__scopeId", "data-v-b8d9c6c5"]]), Ie = {
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
  return Ie.translations;
}
function Qs(n, u) {
  Ie.translations[n] = u;
}
function Ys(n) {
  Ie.translations = n;
}
const Sn = { class: "ijt-number-filter" }, Mn = { class: "ijt-number-filter__label" }, qn = { value: "" }, In = { value: "exact" }, Nn = { value: "less_than" }, zn = { value: "greater_than" }, Fn = { value: "less_than_or_equal" }, Vn = { value: "greater_than_or_equal" }, Pn = { value: "between" }, Bn = { key: 0 }, En = { key: 0 }, Ln = { class: "ijt-number-filter__label" }, On = { class: "ijt-number-filter__input-wrapper" }, Rn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Tn = ["step"], An = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Dn = { key: 1 }, Wn = { style: { "margin-bottom": "0.75rem" } }, Un = { class: "ijt-number-filter__label" }, Hn = { class: "ijt-number-filter__input-wrapper" }, Kn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Gn = ["step"], Xn = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, Qn = { class: "ijt-number-filter__label" }, Yn = { class: "ijt-number-filter__input-wrapper" }, Jn = {
  key: 0,
  class: "ijt-number-filter__prefix"
}, Zn = ["step"], el = {
  key: 1,
  class: "ijt-number-filter__suffix"
}, tl = {
  key: 1,
  class: "ijt-number-filter__reset"
}, nl = { class: "ijt-sr-only" }, lt = {
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
    const u = n, a = ne(), d = S(""), v = S(""), e = S(""), c = S(""), p = I(() => d.value !== "" && (d.value !== "between" && v.value !== "" && v.value !== null || d.value === "between" && e.value !== "" && e.value !== null && c.value !== "" && c.value !== null));
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
    }), G(() => u.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_number || "", c.value = m.end_number || "") : v.value = m.number || "") : x();
    }, { deep: !0 }), (m, j) => (o(), f("div", Sn, [
      t("div", null, [
        t("label", Mn, _(C(a).filter_type), 1),
        A(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", qn, _(C(a).no_filter), 1),
          t("option", In, _(C(a).exact_number), 1),
          t("option", Nn, _(C(a).less_than), 1),
          t("option", zn, _(C(a).greater_than), 1),
          t("option", Fn, _(C(a).less_than_or_equal), 1),
          t("option", Vn, _(C(a).greater_than_or_equal), 1),
          t("option", Pn, _(C(a).number_range), 1)
        ], 544), [
          [et, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (o(), f("div", Bn, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(d.value) ? (o(), f("div", En, [
          t("label", Ln, _(y()), 1),
          t("div", On, [
            n.filter.prefix ? (o(), f("span", Rn, _(n.filter.prefix), 1)) : b("", !0),
            A(t("input", {
              type: "number",
              "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
              step: n.filter.step || 1,
              class: "ijt-input",
              onInput: r,
              placeholder: "0"
            }, null, 40, Tn), [
              [
                ie,
                v.value,
                void 0,
                { number: !0 }
              ]
            ]),
            n.filter.suffix ? (o(), f("span", An, _(n.filter.suffix), 1)) : b("", !0)
          ])
        ])) : b("", !0),
        d.value === "between" ? (o(), f("div", Dn, [
          t("div", Wn, [
            t("label", Un, _(C(a).start_number), 1),
            t("div", Hn, [
              n.filter.prefix ? (o(), f("span", Kn, _(n.filter.prefix), 1)) : b("", !0),
              A(t("input", {
                type: "number",
                "onUpdate:modelValue": j[2] || (j[2] = ($) => e.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Gn), [
                [
                  ie,
                  e.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (o(), f("span", Xn, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ]),
          t("div", null, [
            t("label", Qn, _(C(a).end_number), 1),
            t("div", Yn, [
              n.filter.prefix ? (o(), f("span", Jn, _(n.filter.prefix), 1)) : b("", !0),
              A(t("input", {
                type: "number",
                "onUpdate:modelValue": j[3] || (j[3] = ($) => c.value = $),
                step: n.filter.step || 1,
                class: "ijt-input",
                onInput: r,
                placeholder: "0"
              }, null, 40, Zn), [
                [
                  ie,
                  c.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              n.filter.suffix ? (o(), f("span", el, _(n.filter.suffix), 1)) : b("", !0)
            ])
          ])
        ])) : b("", !0)
      ])) : b("", !0),
      p.value ? (o(), f("div", tl, [
        t("button", {
          type: "button",
          class: "ijt-number-filter__reset-button",
          onClick: w
        }, [
          t("span", nl, _(C(a).reset_filter), 1),
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
}, ll = { class: "ijt-date-filter" }, al = { class: "ijt-date-filter__label" }, sl = { value: "" }, ol = { value: "exact" }, rl = { value: "before" }, il = { value: "after" }, ul = { value: "between" }, cl = { key: 0 }, dl = { key: 0 }, vl = { class: "ijt-date-filter__label" }, hl = { key: 1 }, fl = { style: { "margin-bottom": "0.75rem" } }, ml = { class: "ijt-date-filter__label" }, pl = { class: "ijt-date-filter__label" }, gl = {
  key: 1,
  class: "ijt-date-filter__reset"
}, _l = { class: "ijt-sr-only" }, at = {
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
    const u = n, a = ne(), d = S(""), v = S(""), e = S(""), c = S(""), p = I(() => d.value !== "" && (d.value !== "between" && v.value || d.value === "between" && e.value && c.value));
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
    }), G(() => u.filter.value, (m) => {
      m ? m.type && (d.value = m.type, m.type === "between" ? (e.value = m.start_date || "", c.value = m.end_date || "") : v.value = m.date || "") : x();
    }, { deep: !0 }), (m, j) => (o(), f("div", ll, [
      t("div", null, [
        t("label", al, _(C(a).filter_type), 1),
        A(t("select", {
          "onUpdate:modelValue": j[0] || (j[0] = ($) => d.value = $),
          class: "ijt-select",
          onChange: h
        }, [
          t("option", sl, _(C(a).no_filter), 1),
          t("option", ol, _(C(a).exact_date), 1),
          t("option", rl, _(C(a).before_date), 1),
          t("option", il, _(C(a).after_date), 1),
          t("option", ul, _(C(a).date_range), 1)
        ], 544), [
          [et, d.value]
        ])
      ]),
      d.value && d.value !== "" ? (o(), f("div", cl, [
        ["exact", "before", "after"].includes(d.value) ? (o(), f("div", dl, [
          t("label", vl, _(y()), 1),
          A(t("input", {
            type: "date",
            "onUpdate:modelValue": j[1] || (j[1] = ($) => v.value = $),
            class: "ijt-input",
            onChange: r
          }, null, 544), [
            [ie, v.value]
          ])
        ])) : b("", !0),
        d.value === "between" ? (o(), f("div", hl, [
          t("div", fl, [
            t("label", ml, _(C(a).start_date), 1),
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
            t("label", pl, _(C(a).end_date), 1),
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
      p.value ? (o(), f("div", gl, [
        t("button", {
          type: "button",
          class: "ijt-date-filter__reset-button",
          onClick: w
        }, [
          t("span", _l, _(C(a).reset_filter), 1),
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
function st(n) {
  let u = S(null), a = S(null);
  return Z(() => {
    Mt((d) => {
      if (!a.value || !u.value)
        return;
      let v = a.value.el || a.value, e = u.value.el || u.value;
      if (!(e instanceof HTMLElement) || !(v instanceof HTMLElement))
        return;
      let { destroy: c } = At(e, v, n);
      d(c);
    });
  }), [u, a];
}
const bl = { class: "ijt-filter" }, yl = ["dusk"], kl = { class: "ijt-dropdown__header" }, wl = { class: "ijt-dropdown__content" }, xl = ["name", "value", "onChange"], jl = ["value"], Cl = {
  key: 2,
  style: { "min-width": "300px" }
}, $l = {
  key: 3,
  style: { "min-width": "250px" }
}, Sl = {
  key: 4,
  style: { "min-width": "300px" }
}, Ml = {
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
    const u = n, a = S(!1), [d, v] = st({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), e = I(() => u.filters.filter((m) => m.key === u.columnKey || m.key.startsWith(u.columnKey + "_") || m.key.includes(u.columnKey))), c = I(() => e.value.some((m) => !h(m)));
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
    function w(m) {
      v.value && !v.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${u.columnKey}"]`) && y();
    }
    return Z(() => {
      document.addEventListener("click", w);
    }), pe(() => {
      document.removeEventListener("click", w);
    }), (m, j) => (o(), f("div", bl, [
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
      ])], 10, yl),
      (o(), F(me, { to: "body" }, [
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
            t("h3", kl, _($.label), 1),
            t("div", wl, [
              $.type === "select" ? (o(), f("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: "ijt-select",
                onChange: (q) => r($.key, q.target.value)
              }, [
                (o(!0), f(U, null, K($.options, (q, M) => (o(), f("option", {
                  key: M,
                  value: M
                }, _(q), 9, jl))), 128))
              ], 40, xl)) : b("", !0),
              $.type === "toggle" ? (o(), F(tt, {
                key: 1,
                filter: $,
                "on-filter-change": r
              }, null, 8, ["filter"])) : b("", !0),
              $.type === "number" ? (o(), f("div", Cl, [
                H(lt, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0),
              $.type === "number_range" ? (o(), f("div", $l, [
                H(nt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(q) => $.value = q, (q) => x($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              $.type === "date" ? (o(), f("div", Sl, [
                H(at, {
                  filter: $,
                  "on-filter-change": r
                }, null, 8, ["filter"])
              ])) : b("", !0)
            ])
          ]))), 128))
        ], 512)) : b("", !0)
      ])),
      (o(), F(me, { to: "body" }, [
        a.value ? (o(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: y
        })) : b("", !0)
      ]))
    ]));
  }
}, ql = { class: "ijt-filter" }, Il = ["dusk"], Nl = { class: "ijt-column-search__header" }, zl = { class: "ijt-column-search__content" }, Fl = ["value", "placeholder"], Vl = {
  key: 0,
  class: "ijt-column-search__reset"
}, Pl = { class: "ijt-sr-only" }, Bl = {
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
    const u = n, a = ne(), d = S(!1), v = S(null), [e, c] = st({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), p = I(() => u.searchInputs.find((q) => q.key === u.columnKey)), y = I(() => p.value && p.value.value || ""), h = S(y.value);
    G(y, (q) => {
      document.activeElement !== v.value && (h.value = q);
    });
    const r = I(() => y.value !== "");
    async function x() {
      p.value && (d.value = !d.value, d.value && (await Me(), v.value && v.value.focus()));
    }
    function w() {
      d.value = !1;
    }
    function m(q) {
      j(q.target.value);
    }
    function j(q) {
      h.value = q, u.onSearchChange(u.columnKey, q);
    }
    function $(q) {
      c.value && !c.value.contains(q.target) && !q.target.closest(`[dusk="column-search-${u.columnKey}"]`) && w();
    }
    return Z(() => {
      document.addEventListener("click", $);
    }), pe(() => {
      document.removeEventListener("click", $);
    }), (q, M) => (o(), f("div", ql, [
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
      ])], 10, Il),
      (o(), F(me, { to: "body" }, [
        d.value ? (o(), f("div", {
          key: 0,
          ref_key: "container",
          ref: c,
          class: "ijt-filter__dropdown ijt-column-search",
          style: { "z-index": "9999" },
          onClick: M[1] || (M[1] = R(() => {
          }, ["stop"]))
        }, [
          t("h3", Nl, _(C(a).search) + " " + _(n.columnLabel), 1),
          t("div", zl, [
            t("input", {
              ref_key: "searchInput",
              ref: v,
              type: "text",
              value: h.value,
              class: "ijt-column-search__input",
              placeholder: `${C(a).search} ${n.columnLabel.toLowerCase()}...`,
              onInput: m,
              onKeydown: [
                Xe(w, ["enter"]),
                Xe(w, ["escape"])
              ]
            }, null, 40, Fl),
            h.value !== "" ? (o(), f("div", Vl, [
              t("button", {
                type: "button",
                class: "ijt-search-row__remove-button",
                onClick: M[0] || (M[0] = (B) => j(""))
              }, [
                t("span", Pl, _(C(a).reset), 1),
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
      (o(), F(me, { to: "body" }, [
        d.value ? (o(), f("div", {
          key: 0,
          class: "ijt-filter__backdrop",
          style: { "z-index": "9998" },
          onClick: w
        })) : b("", !0)
      ]))
    ]));
  }
}, El = ["data-column-key"], Ll = { class: "ijt-table__th-content" }, Ol = { class: "ijt-table__th-label" }, Rl = ["sorted"], Tl = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Al = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Dl = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Wl = { class: "ijt-table__th-actions" }, Ul = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const u = n, a = qt("columnResize", null), d = I(() => {
      if (!a)
        return "auto";
      const y = a.getColumnWidth(u.cell.key);
      return y === "auto" ? y : `${y}px`;
    }), v = I(() => (a == null ? void 0 : a.isResizing) || !1), e = I(() => (a == null ? void 0 : a.resizingColumn) || null);
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
      (o(), F(re(n.cell.sortable ? "button" : "div"), {
        class: "ijt-table__th-button",
        dusk: n.cell.sortable ? `sort-${n.cell.key}` : null,
        onClick: R(c, ["prevent"])
      }, {
        default: L(() => [
          t("span", Ll, [
            t("span", Ol, [
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
                  n.cell.sorted ? b("", !0) : (o(), f("path", Tl)),
                  n.cell.sorted === "asc" ? (o(), f("path", Al)) : b("", !0),
                  n.cell.sorted === "desc" ? (o(), f("path", Dl)) : b("", !0)
                ], 10, Rl)) : b("", !0)
              ])
            ]),
            t("span", Wl, [
              z(y.$slots, "search", {}, () => [
                n.cell.searchable && n.cell.searchInputs && n.cell.searchInputs.length > 0 ? (o(), F(Bl, {
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
                n.cell.filters && n.cell.filters.length > 0 ? (o(), F(Ml, {
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
      n.cell.resizable !== !1 && C(a) ? (o(), F(nn, {
        key: 0,
        "column-key": n.cell.key,
        "on-resize": p,
        "is-active": v.value && e.value === n.cell.key
      }, null, 8, ["column-key", "is-active"])) : b("", !0)
    ], 14, El)), [
      [ae, !n.cell.hidden]
    ]);
  }
}, Hl = ["dusk", "value"], Kl = ["value"], Je = {
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
    const u = ne(), a = n, d = I(() => {
      let v = [...a.options];
      return v.push(parseInt(a.value)), Dt(v).sort((e, c) => e - c);
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
      }, _(c) + " " + _(C(u).per_page), 9, Kl))), 128))
    ], 40, Hl));
  }
}, Gl = {
  key: 0,
  class: "ijt-pagination"
}, Xl = {
  key: 0,
  class: "ijt-no-results"
}, Ql = { class: "ijt-sm-inline ijt-hidden" }, Yl = { class: "ijt-sm-inline ijt-hidden" }, Jl = {
  key: 2,
  class: "ijt-pagination--full"
}, Zl = { class: "ijt-pagination__left" }, ea = { class: "ijt-pagination__info ijt-lg-block ijt-hidden" }, ta = { class: "ijt-pagination__info-highlight" }, na = { class: "ijt-pagination__info-highlight" }, la = { class: "ijt-pagination__info-highlight" }, aa = { class: "ijt-pagination__right" }, sa = {
  class: "ijt-pagination__nav",
  "aria-label": "Pagination"
}, oa = { class: "ijt-sr-only" }, ra = { class: "ijt-pagination__button-text" }, ia = { class: "ijt-sr-only" }, ua = {
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
    const u = ne(), a = n, d = I(() => "links" in e.value ? e.value.links.length > 0 : !1), v = I(() => Object.keys(e.value).length > 0), e = I(() => a.meta), c = I(() => "prev_page_url" in e.value ? e.value.prev_page_url : null), p = I(() => "next_page_url" in e.value ? e.value.next_page_url : null), y = I(() => parseInt(e.value.per_page));
    return (h, r) => v.value ? (o(), f("nav", Gl, [
      !n.hasData || e.value.total < 1 ? (o(), f("p", Xl, _(C(u).no_results_found), 1)) : b("", !0),
      n.hasData ? (o(), f("div", {
        key: 1,
        class: P(["ijt-pagination--simple", { "ijt-pagination--has-links": d.value }])
      }, [
        (o(), F(re(c.value ? "a" : "div"), {
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
            t("span", Ql, _(C(u).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        H(Je, {
          dusk: "per-page-mobile",
          value: y.value,
          options: n.perPageOptions,
          "on-change": n.onPerPageChange
        }, null, 8, ["value", "options", "on-change"]),
        (o(), F(re(p.value ? "a" : "div"), {
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
            t("span", Yl, _(C(u).next), 1),
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
      n.hasData && d.value ? (o(), f("div", Jl, [
        t("div", Zl, [
          H(Je, {
            dusk: "per-page-full",
            value: y.value,
            options: n.perPageOptions,
            "on-change": n.onPerPageChange
          }, null, 8, ["value", "options", "on-change"]),
          t("p", ea, [
            t("span", ta, _(e.value.from), 1),
            te(" " + _(C(u).to) + " ", 1),
            t("span", na, _(e.value.to), 1),
            te(" " + _(C(u).of) + " ", 1),
            t("span", la, _(e.value.total), 1),
            te(" " + _(C(u).results), 1)
          ])
        ]),
        t("div", aa, [
          t("nav", sa, [
            (o(), F(re(c.value ? "a" : "div"), {
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
                t("span", oa, _(C(u).previous), 1),
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
            (o(!0), f(U, null, K(e.value.links, (x, w) => (o(), f("div", { key: w }, [
              z(h.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (o(), F(re(x.url ? "a" : "div"), {
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
                    t("span", ra, _(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : b("", !0)
              ])
            ]))), 128)),
            (o(), F(re(p.value ? "a" : "div"), {
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
                t("span", ia, _(C(u).next), 1),
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
}, ca = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "ijt-dropdown__content"
}, da = ["dusk", "onClick"], va = {
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
    return (v, e) => (o(), F(ge, {
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
        t("div", ca, [
          (o(!0), f(U, null, K(n.searchInputs, (c, p) => (o(), f("button", {
            key: p,
            dusk: `add-search-row-${c.key}`,
            class: "ijt-dropdown__item",
            role: "menuitem",
            onClick: R((y) => d(c.key), ["prevent"])
          }, _(c.label), 9, da))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled"]));
  }
}, ha = ["data-column-key"], fa = { class: "ijt-column-manager__item-left" }, ma = ["onClick", "title"], pa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, ga = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "ijt-column-manager__pin-icon",
  viewBox: "0 0 24 24"
}, _a = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], ot = {
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
    return (r, x) => (o(), F(C(Wt), {
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
          t("div", fa, [
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
              w.pinned ? (o(), f("svg", pa, [...x[3] || (x[3] = [
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
              ])])) : (o(), f("svg", ga, [...x[4] || (x[4] = [
                t("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, ma)) : b("", !0),
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
          ])], 10, _a)) : b("", !0)
        ], 8, ha)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}, ba = {
  key: 0,
  class: "ijt-button__badge"
}, ya = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "ijt-dropdown__content"
}, ka = {
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
    G(() => u.columns, (e) => {
      a.value = [...e];
    }, { deep: !0, immediate: !0 });
    const d = I(() => a.value.filter((e) => e.hidden).length);
    function v(e) {
      a.value = [...e], u.onChange(e);
    }
    return (e, c) => (o(), F(ge, {
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
        n.hasHiddenColumns ? (o(), f("span", ba, "(" + _(d.value) + ")", 1)) : b("", !0)
      ]),
      default: L(() => [
        t("div", ya, [
          H(ot, {
            columns: a.value,
            "can-sort": !0,
            onColumnsChanged: v
          }, null, 8, ["columns"])
        ])
      ]),
      _: 1
    }));
  }
}, wa = {
  key: 0,
  class: "ijt-button__badge"
}, xa = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "ijt-dropdown__content"
}, ja = { class: "ijt-dropdown__header" }, Ca = { class: "ijt-dropdown__content" }, $a = ["name", "value", "onChange"], Sa = ["value"], Ma = {
  key: 2,
  style: { "min-width": "250px" }
}, qa = {
  key: 3,
  style: { "min-width": "300px" }
}, Ia = {
  key: 4,
  style: { "min-width": "300px" }
}, Na = {
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
    const u = n, a = I(() => u.filters.filter((e) => !d(e)).length);
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
    return (e, c) => (o(), F(ge, {
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
        n.hasEnabledFilters ? (o(), f("span", wa, "(" + _(a.value) + ")", 1)) : b("", !0)
      ]),
      default: L(() => [
        t("div", xa, [
          (o(!0), f(U, null, K(n.filters, (p, y) => (o(), f("div", { key: y }, [
            t("h3", ja, _(p.label), 1),
            t("div", Ca, [
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
                }, _(h), 9, Sa))), 128))
              ], 40, $a)) : b("", !0),
              p.type === "toggle" ? (o(), F(tt, {
                key: 1,
                filter: p,
                "on-filter-change": n.onFilterChange
              }, null, 8, ["filter", "on-filter-change"])) : b("", !0),
              p.type === "number_range" ? (o(), f("div", Ma, [
                H(nt, {
                  modelValue: p.value,
                  "onUpdate:modelValue": [(h) => p.value = h, (h) => v(p)],
                  max: p.max,
                  min: p.min,
                  prefix: p.prefix,
                  suffix: p.suffix,
                  step: p.step
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step"])
              ])) : b("", !0),
              p.type === "date" ? (o(), f("div", qa, [
                H(at, {
                  filter: p,
                  "on-filter-change": n.onFilterChange
                }, null, 8, ["filter", "on-filter-change"])
              ])) : b("", !0),
              p.type === "number" ? (o(), f("div", Ia, [
                H(lt, {
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
}, za = { class: "ijt-global-search" }, Fa = ["placeholder", "value"], Va = {
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
    G(() => u.value, (c) => {
      document.activeElement !== a.value && (d.value = c != null ? c : "");
    });
    function v(c) {
      d.value = c.target.value, u.onChange(d.value);
    }
    return (c, p) => (o(), f("div", za, [
      t("input", {
        ref_key: "inputEl",
        ref: a,
        class: "ijt-global-search__input",
        placeholder: n.label,
        value: d.value,
        type: "text",
        name: "global",
        onInput: v
      }, null, 40, Fa),
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
}, Pa = { class: "ijt-search-row__container" }, Ba = ["for"], Ea = ["id", "name", "value", "onInput"], La = { class: "ijt-search-row__remove" }, Oa = ["dusk", "onClick"], Ra = {
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
    let a = I(() => u.el.value);
    const d = n;
    function v(e) {
      return d.forcedVisibleSearchInputs.includes(e);
    }
    return G(d.forcedVisibleSearchInputs, (e) => {
      const c = e.length > 0 ? e[e.length - 1] : null;
      !c || Me().then(() => {
        const p = Ut(a.value, (y) => y.name === c);
        p && p.focus();
      });
    }, { immediate: !0 }), (e, c) => (o(!0), f(U, null, K(n.searchInputs, (p, y) => A((o(), f("div", {
      key: y,
      class: "ijt-search-row"
    }, [
      t("div", Pa, [
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
        ], 8, Ba),
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
        }, null, 40, Ea)),
        t("div", La, [
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
          ])], 8, Oa)
        ])
      ])
    ])), [
      [ae, p.value !== null || v(p.key)]
    ])), 128));
  }
}, Ta = ["aria-label"], Aa = { class: "ijt-reset__label" }, Da = {
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
        t("span", Aa, _((e = C(u).reset) != null ? e : "Reset"), 1)
      ], 8, Ta);
    };
  }
}, Wa = {}, Ua = { class: "ijt-wrapper" }, Ha = { class: "ijt-wrapper__outer" }, Ka = { class: "ijt-wrapper__inner" }, Ga = { class: "ijt-wrapper__container" };
function Xa(n, u) {
  return o(), f("div", Ua, [
    t("div", Ha, [
      t("div", Ka, [
        t("div", Ga, [
          z(n.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Qa = /* @__PURE__ */ qe(Wa, [["render", Xa]]), Ya = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "ijt-dropdown__content",
  style: { "min-width": "14rem" }
}, Ja = ["dusk", "onClick"], Za = { class: "ijt-dropdown__content" }, es = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const u = ne(), a = n, d = S(!1), v = S(!1);
    function e() {
      d.value = v.value = !1;
    }
    function c(p) {
      var y, h;
      (y = a.actions.toggleColumns) != null && y.onReorder ? a.actions.toggleColumns.onReorder(p) : (h = a.actions.toggleColumns) != null && h.onChange && a.actions.toggleColumns.onChange(p);
    }
    return (p, y) => (o(), F(ge, {
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
        var h, r, x, w, m;
        return [
          t("div", Ya, [
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
                t("span", null, _((r = C(u).show_hide_columns) != null ? r : "Show / Hide columns"), 1)
              ])) : b("", !0),
              y[9] || (y[9] = t("div", { class: "ijt-dropdown__divider" }, null, -1)),
              "reset" in n.actions ? (o(), f("button", {
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
                t("span", null, _((x = C(u).grouped_reset) != null ? x : "Reset"), 1)
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
                t("span", null, _((w = C(u).add_search_fields) != null ? w : "Add search field"), 1)
              ]),
              (o(!0), f(U, null, K(n.actions.searchFields.searchInputs, (j, $) => (o(), f("button", {
                key: $,
                dusk: `add-search-row-${j.key}`,
                class: "ijt-dropdown__item",
                role: "menuitem",
                onClick: R((q) => n.actions.searchFields.onClick(j.key), ["prevent"])
              }, _(j.label), 9, Ja))), 128))
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
                t("span", null, _((m = C(u).show_hide_columns) != null ? m : "Show / Hide columns"), 1)
              ]),
              t("div", Za, [
                H(ot, {
                  columns: n.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: c
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ae, d.value]
            ]),
            A(t("div", null, [
              z(p.$slots, "default")
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
function ts(n) {
  const u = S(!1), a = S(null), d = S(0), v = S(0), e = It({}), c = () => {
    const M = Nt(n) ? C(n) : n;
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
    M.preventDefault(), M.stopPropagation(), u.value = !0, a.value = B, d.value = M.clientX;
    const V = M.target.closest("th");
    v.value = V.offsetWidth;
    const O = V.closest("table");
    O && O.querySelectorAll("thead th[data-column-key]").forEach((T) => {
      const D = T.getAttribute("data-column-key"), W = T.offsetWidth;
      e[D] || (e[D] = W), T.style.width = `${e[D]}px`;
      const Q = Array.from(T.parentNode.children).indexOf(T);
      O.querySelectorAll("tbody tr").forEach((_e) => {
        const le = _e.children[Q];
        le && (le.style.width = `${e[D]}px`);
      });
    }), document.addEventListener("mousemove", r), document.addEventListener("mouseup", x), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, r = (M) => {
    if (!u.value || !a.value)
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
    u.value && (u.value = !1, a.value = null, y(), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
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
    u.value && (document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", x), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Z(() => {
    p();
  }), pe(() => {
    q();
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
const ns = ["dusk"], ls = { class: "ijt-toolbar" }, as = {
  key: 0,
  class: "ijt-toolbar__section ijt-toolbar__section--grow ijt-toolbar__section--mb"
}, ss = { class: "ijt-toolbar__actions" }, os = { key: 0 }, rs = {
  key: 4,
  class: "ijt-toolbar__mobile-sort"
}, is = ["id", "value", "aria-label", "title"], us = { value: "" }, cs = ["value"], ds = ["value"], vs = ["href"], hs = { class: "ijt-table-container" }, fs = { class: "ijt-table__thead" }, ms = { class: "ijt-table__tr" }, ps = {
  key: 0,
  class: "ijt-table__th ijt-table__th--pinned-checkbox",
  style: { width: "60px" }
}, gs = ["for"], _s = ["id", "aria-label"], bs = { class: "ijt-table__tbody" }, ys = ["data-column-label"], ks = { class: "ijt-sr-only" }, ws = { class: "ijt-table__td-content" }, xs = ["for"], js = ["id", "onUpdate:modelValue", "aria-label"], Cs = ["onClick", "data-column-key", "data-column-label", "data-column-hidden"], $s = { class: "ijt-table__td-label" }, Ss = { class: "ijt-table__td-content" }, Ms = { class: "ijt-footer" }, qs = {
  key: 0,
  class: "ijt-footer__selection-info"
}, Is = {
  key: 1,
  class: "ijt-loading"
}, Ns = {
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
    var He, Ke;
    const a = ne(), d = zt(), v = u, e = n, c = I(() => e.localStorageName ? e.localStorageName : e.name && e.name !== "default" ? `table-${e.name}` : null);
    Ft();
    const p = e.resizeableColumns ? ts(c) : null;
    Vt("columnResize", p);
    const y = S(!1), h = I(() => Ye().props.queryBuilderProps ? { ...Ye().props.queryBuilderProps[e.name] } : {}), r = S(h.value), x = I(() => r.value.columns.filter((l) => !l.hidden)), w = I(() => x.value.filter((l) => l.sortable && !j(l))), m = I(() => x.value.some((l) => l.key === "actions"));
    function j(l) {
      const s = String(l.body_class || "").split(/\s+/);
      return s.includes("hidden") || s.includes("ijt-hidden");
    }
    const $ = I(() => {
      const l = r.value.sort;
      return l && l !== h.value.defaultSort ? l : "";
    }), q = I(() => Boolean(e.withInfiniteScrolling || h.value.infiniteScrolling));
    function M() {
      var l, s, i, k, g, N, E, Y, oe, ve;
      return (ve = (oe = (N = (i = (l = se.value) == null ? void 0 : l.next_page_url) != null ? i : (s = e.resource) == null ? void 0 : s.next_page_url) != null ? N : (g = (k = e.resource) == null ? void 0 : k.links) == null ? void 0 : g.next) != null ? oe : (Y = (E = e.resource) == null ? void 0 : E.meta) == null ? void 0 : Y.next_page_url) != null ? ve : null;
    }
    const B = S([]), V = S(null), O = S(null), X = S(!1);
    let T;
    const D = I(() => h.value.pageName), W = S([]), Q = S(null), ue = S(!1), _e = I(() => h.value.hasToggleableColumns || h.value.hasFilters || h.value.hasSearchInputs ? !1 : !h.value.globalSearch), le = I(() => q.value ? B.value : Object.keys(e.resource).length === 0 ? e.data : "data" in e.resource ? e.resource.data : e.resource), se = I(() => Object.keys(e.resource).length === 0 ? e.meta : "links" in e.resource && "meta" in e.resource && Object.keys(e.resource.links).length === 4 && "next" in e.resource.links && "prev" in e.resource.links ? {
      ...e.resource.meta,
      next_page_url: e.resource.links.next,
      prev_page_url: e.resource.links.prev
    } : "meta" in e.resource ? e.resource.meta : e.resource), Ne = I(() => le.value.length > 0 ? !0 : se.value.total > 0), ze = S({
      reset: {
        onClick: ye
      },
      toggleColumns: {
        show: h.value.hasToggleableColumns,
        columns: h.value.columns,
        onChange: we
      },
      searchFields: {
        show: h.value.hasSearchInputs && !e.hideSearchInputsAboveTable,
        searchInputs: h.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: h.value.hasSearchInputsWithoutValue,
        onClick: be
      }
    });
    function rt(l) {
      W.value = W.value.filter((s) => s != l), ce(l, null);
    }
    function be(l) {
      W.value.push(l);
    }
    const Fe = I(() => {
      if (W.value.length > 0)
        return !0;
      const l = Se.parse(location.search.substring(1));
      if (l[D.value] > 1)
        return !0;
      const i = e.name === "default" ? "" : e.name + "_";
      let k = !1;
      return ee(["filter", "columns", "cursor", "sort"], (g) => {
        const N = l[i + g];
        g === "sort" && N === h.value.defaultSort || N !== void 0 && (k = !0);
      }), k;
    }), it = (l, s) => {
      let i = [];
      if (e.striped && s % 2 && i.push("ijt-table__tr--striped"), e.rowClass && typeof e.rowClass == "function") {
        const k = e.rowClass(l);
        k && i.push(k);
      }
      return i.join(" ");
    }, Ve = I(() => {
      if (!e.showExportButton)
        return null;
      const l = new URL(window.location.href);
      l.search = "";
      const s = new URLSearchParams();
      if (h.value.page && h.value.page > 1 && s.set(D.value, h.value.page), h.value.sort) {
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
        Object.keys(i).forEach((N) => {
          const E = i[N];
          Array.isArray(E) ? E.forEach((Y, oe) => {
            s.set(`${g}[${N}][${oe}]`, Y);
          }) : typeof E == "object" && E !== null ? Object.keys(E).forEach((Y) => {
            s.set(`${g}[${N}][${Y}]`, E[Y]);
          }) : s.set(`${g}[${N}]`, E);
        });
      }
      const k = r.value.columns.filter((g) => !g.hidden).map((g) => g.key);
      if (k.length !== r.value.columns.length) {
        const g = e.name === "default" ? "columns" : `${e.name}_columns`;
        k.forEach((N) => {
          s.append(`${g}[]`, N);
        });
      }
      if (h.value.perPageOptions && h.value.perPageOptions.length > 0) {
        const g = new URLSearchParams(window.location.search).get("perPage") || h.value.perPageOptions[0];
        g && g !== h.value.perPageOptions[0] && s.set("perPage", g);
      }
      return s.set("do_export", "1"), s.set("table", e.name || "default"), l.search = s.toString(), l.toString();
    });
    function ye() {
      de.value = "", W.value = [], ee(r.value.filters, (l, s) => {
        r.value.filters[s].value = null;
      }), ee(r.value.searchInputs, (l, s) => {
        r.value.searchInputs[s].value = null;
      }), ee(r.value.columns, (l, s) => {
        r.value.columns[s].hidden = l.can_be_hidden ? !h.value.defaultVisibleToggleableColumns.includes(l.key) : !1, r.value.columns[s].pinned = !1;
      }), c.value && localStorage.removeItem(`${c.value}-columns`), e.resizeableColumns && p && p.resetColumnWidths(), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const Pe = {};
    function ce(l, s) {
      clearTimeout(Pe[l]), Pe[l] = setTimeout(() => {
        je.value && e.preventOverlappingRequests && je.value.cancel();
        const i = he("searchInputs", l);
        r.value.searchInputs[i].value = s, r.value.cursor = null, r.value.page = 1;
      }, e.inputDebounceMs);
    }
    const de = S((Ke = (He = h.value.globalSearch) == null ? void 0 : He.value) != null ? Ke : "");
    G(() => {
      var l;
      return (l = h.value.globalSearch) == null ? void 0 : l.value;
    }, (l) => {
      var i;
      const s = document.activeElement;
      s && ((i = Q.value) == null ? void 0 : i.contains(s)) && ["INPUT", "TEXTAREA"].includes(s.tagName) || (de.value = l != null ? l : "");
    });
    function Be(l) {
      de.value = l, ce("global", l);
    }
    function ke(l, s) {
      const i = he("filters", l);
      r.value.filters[i].value = s, r.value.cursor = null, r.value.page = 1;
    }
    function Ee(l) {
      r.value.cursor = null, r.value.perPage = l, r.value.page = 1;
    }
    function he(l, s) {
      return Gt(r.value[l], (i) => i.key == s);
    }
    function we(l) {
      r.value.columns = l, r.value.columns.sort((s, i) => s.pinned && !i.pinned ? -1 : !s.pinned && i.pinned ? 1 : 0), ut();
    }
    function ut() {
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
    function ct() {
      let l = {};
      return ee(r.value.searchInputs, (s) => {
        s.value !== null && (l[s.key] = s.value);
      }), ee(r.value.filters, (s) => {
        let i = s.value;
        i !== null && (s.type === "number_range" && Number(Math.max(...s.value)) === Number(s.max) && Number(Math.min(...s.value)) === Number(s.min) && (i = null), l[s.key] = i);
      }), l;
    }
    function dt() {
      const l = r.value.columns;
      let s = Kt(l, (k) => !k.hidden), i = Qt(s, (k) => k.key).sort();
      return Xt(i, h.value.defaultVisibleToggleableColumns) ? {} : i;
    }
    function vt() {
      const l = ct(), s = dt(), i = {};
      Object.keys(l).length > 0 && (i.filter = l), Object.keys(s).length > 0 && (i.columns = s);
      const k = r.value.cursor, g = r.value.page, N = r.value.sort, E = r.value.perPage;
      return k && (i.cursor = k), g > 1 && (i.page = g), E > 1 && (i.perPage = E), N && (i.sort = N), i;
    }
    function Le(l) {
      if (!l)
        return null;
      if (e.paginationClickCallback && typeof e.paginationClickCallback == "function") {
        e.paginationClickCallback(l);
        return;
      }
      Oe(l);
    }
    function ht() {
      const l = Se.parse(location.search.substring(1)), s = e.name === "default" ? "" : e.name + "_";
      ee(["filter", "columns", "cursor", "sort"], (k) => {
        delete l[s + k];
      }), delete l[D.value], ee(vt(), (k, g) => {
        g === "page" ? l[D.value] = k : g === "perPage" ? l.perPage = k : l[s + g] = k;
      });
      let i = Se.stringify(l, {
        filter(k, g) {
          return typeof g == "object" && g !== null ? Yt(g) : g;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!i || i === D.value + "=1") && (i = ""), i;
    }
    const xe = S(!1), je = S(null);
    function Oe(l) {
      !l || Jt.get(
        l,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: e.preserveScroll !== !1,
          onBefore() {
            xe.value = !0;
          },
          onCancelToken(s) {
            je.value = s;
          },
          onFinish() {
            xe.value = !1;
          },
          onSuccess() {
            if (e.preserveScroll === "table-top") {
              const i = Q.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: i });
            }
          }
        }
      );
    }
    function ft(l, s, i) {
      var k;
      e.hasCheckboxes && ((k = l.target) == null ? void 0 : k.parentElement.cellIndex) === 0 || v("rowClicked", l, s, i);
    }
    async function mt() {
      var l, s, i, k, g;
      if (!(X.value || !V.value)) {
        X.value = !0;
        try {
          const N = await fetch(V.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!N.ok)
            throw new Error("Network response was not ok");
          const E = await N.json();
          B.value = [...B.value, ...E.data || []], V.value = (g = (k = (s = E.next_page_url) != null ? s : (l = E.links) == null ? void 0 : l.next) != null ? k : (i = E.meta) == null ? void 0 : i.next_page_url) != null ? g : null;
        } catch (N) {
          console.error("Error loading more data:", N);
        } finally {
          X.value = !1;
        }
      }
    }
    function Ce() {
      !q.value || !O.value || (T && (T.disconnect(), T = null), e.resource && e.resource.data && B.value.length === 0 && (B.value = [...e.resource.data], V.value = M()), T = new IntersectionObserver(
        (l) => {
          l.forEach((s) => {
            s.isIntersecting && mt();
          });
        },
        {
          rootMargin: "0px 0px 500px 0px"
        }
      ), T.observe(O.value));
    }
    G(r, () => {
      q.value && (B.value = [], V.value = null), Oe(location.pathname + "?" + ht()), ue.value = !1;
    }, { deep: !0 }), G(() => e.resource, () => {
      var l;
      if (!q.value && ((l = e.resource) == null ? void 0 : l.data)) {
        const s = e.resource.data.filter((i) => i.__itSelected);
        v("selectionChanged", s);
      }
    }, { deep: !0 }), G(() => h.value, (l) => {
      var i;
      if (!q.value)
        return;
      const s = ((i = e.resource) == null ? void 0 : i.data) || [];
      if (s.length > 0) {
        B.value = [...s], V.value = M();
        const k = s.filter((g) => g.__itSelected);
        v("selectionChanged", k), setTimeout(() => {
          O.value && Ce();
        }, 100);
      }
    }, { deep: !0 });
    const Re = () => {
      e.resizeableColumns && p && setTimeout(() => {
        var s;
        const l = (s = Q.value) == null ? void 0 : s.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), q.value && setTimeout(() => {
        O.value && Ce();
      }, 100);
    };
    Z(() => {
      document.addEventListener("inertia:success", Re), pt(), e.resizeableColumns && p && setTimeout(() => {
        var s;
        const l = (s = Q.value) == null ? void 0 : s.querySelector("table");
        l && p.initializeColumnWidths(l);
      }, 0), q.value && Ce();
    });
    function pt() {
      if (!c.value)
        return;
      const l = localStorage.getItem(`${c.value}-columns`);
      if (!!l)
        try {
          const s = JSON.parse(l);
          if (s.length > 0 && "order" in s[0]) {
            const i = new Map(s.map((k) => [k.key, k]));
            r.value.columns.forEach((k, g) => {
              const N = i.get(k.key);
              N && (r.value.columns[g].hidden = N.hidden, r.value.columns[g].pinned = N.pinned || !1);
            }), r.value.columns.sort((k, g) => {
              var ve, Ge;
              const N = i.get(k.key), E = i.get(g.key);
              if (k.pinned && !g.pinned)
                return -1;
              if (!k.pinned && g.pinned)
                return 1;
              const Y = (ve = N == null ? void 0 : N.order) != null ? ve : 999, oe = (Ge = E == null ? void 0 : E.order) != null ? Ge : 999;
              return Y - oe;
            });
          } else
            s.forEach((i, k) => {
              const g = r.value.columns.findIndex((N) => N.key === i.key);
              g !== -1 && (r.value.columns[g].hidden = i.hidden, r.value.columns[g].pinned = i.pinned || !1);
            });
        } catch (s) {
          console.warn("Error loading column order from localStorage:", s);
        }
    }
    pe(() => {
      document.removeEventListener("inertia:success", Re), T && (T.disconnect(), T = null);
    });
    function Te(l) {
      r.value.sort == l ? r.value.sort = `-${l}` : r.value.sort = l, r.value.cursor = null, r.value.page = 1;
    }
    function gt(l) {
      r.value.sort = l || null, r.value.cursor = null, r.value.page = 1;
    }
    function _t(l, s) {
      if (d[`cell(${s})`])
        return !1;
      const i = l[s];
      return i == null || typeof i == "string" && i.trim() === "";
    }
    function $e(l) {
      const s = he("columns", l);
      return !r.value.columns[s].hidden;
    }
    function fe(l) {
      const s = he("columns", l), i = Ht(r.value.columns[s]);
      i.onSort = Te, i.filters = r.value.filters.filter(
        (g) => g.key === l || g.key.startsWith(l + "_") || g.key.includes(l)
      );
      const k = r.value.searchInputs.filter(
        (g) => g.key === l
      );
      return k.length > 0 ? (i.searchable = !0, i.searchInputs = k) : (i.searchable = !1, i.searchInputs = []), i.onFilterChange = ke, i.onSearchChange = ce, i;
    }
    function bt() {
      e.resource.data.forEach((l) => {
        l.__itSelected = ue.value;
      });
    }
    function yt(l) {
      if (!e.resizeableColumns || !p)
        return "auto";
      const s = p.getColumnWidth(l);
      return s === "auto" ? s : `${s}px`;
    }
    function Ae(l) {
      if (!e.resizeableColumns || !p)
        return "0px";
      let s = 0;
      const i = r.value.columns.filter((k) => !k.hidden);
      e.hasCheckboxes && (s += 60);
      for (const k of i) {
        if (k.key === l)
          break;
        if (k.pinned) {
          const g = p.getColumnWidth(k.key);
          s += g === "auto" ? 150 : g;
        }
      }
      return `${s}px`;
    }
    function De(l) {
      const s = r.value.columns.find((i) => i.key === l);
      return s && s.pinned;
    }
    function kt(l) {
      return De(l) ? {
        position: "sticky",
        left: Ae(l),
        zIndex: 10,
        backgroundColor: "var(--ijt-color-bg, white)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function wt(l) {
      return De(l) ? {
        position: "sticky",
        left: Ae(l),
        zIndex: 11,
        backgroundColor: "var(--ijt-color-bg-secondary, #f9fafb)",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const xt = I(() => {
      if (!e.resizeableColumns || !p)
        return "100%";
      let l = 0, s = !1;
      return e.hasCheckboxes && (l += 60), h.value.columns.forEach((i) => {
        if (!$e(i.key))
          return;
        const k = p.getColumnWidth(i.key);
        k === "auto" ? s = !0 : l += k;
      }), !s && l > 0 ? `${l}px` : "max(100%, " + (l > 0 ? l + "px" : "800px") + ")";
    }), We = I(() => le.value.filter((l) => l.__itSelected)), Ue = I(() => We.value.length), jt = I(() => Ue.value === 0 ? a.noLineSelected : `${Ue.value} ${a.lineSelected}`);
    function Ct() {
      e.resizeableColumns && (y.value = !0);
    }
    function $t() {
      e.resizeableColumns && setTimeout(() => {
        y.value = !1;
      }, 100);
    }
    return (l, s) => (o(), F(Pt, null, {
      default: L(() => [
        (o(), f("fieldset", {
          ref_key: "tableFieldset",
          ref: Q,
          key: `table-${n.name}`,
          dusk: `table-${n.name}`,
          class: P(["ijt-table-fieldset", { "ijt-table-fieldset--loading": xe.value }])
        }, [
          t("div", ls, [
            h.value.globalSearch ? (o(), f("div", as, [
              z(l.$slots, "tableGlobalSearch", {
                hasGlobalSearch: h.value.globalSearch,
                label: h.value.globalSearch ? h.value.globalSearch.label : null,
                value: de.value,
                onChange: Be
              }, () => [
                h.value.globalSearch ? (o(), F(Va, {
                  key: 0,
                  class: "ijt-global-search--grow",
                  label: h.value.globalSearch.label,
                  value: de.value,
                  "on-change": Be
                }, null, 8, ["label", "value"])) : b("", !0)
              ], !0)
            ])) : b("", !0),
            t("div", ss, [
              t("div", null, [
                z(l.$slots, "tableFilter", {
                  hasFilters: h.value.hasFilters,
                  hasEnabledFilters: h.value.hasEnabledFilters,
                  filters: h.value.filters,
                  onFilterChange: ke
                }, () => [
                  h.value.hasFilters ? (o(), F(Na, {
                    key: 0,
                    "has-enabled-filters": h.value.hasEnabledFilters,
                    filters: h.value.filters,
                    "on-filter-change": ke
                  }, null, 8, ["has-enabled-filters", "filters"])) : b("", !0)
                ], !0)
              ]),
              !n.withGroupedMenu && !n.hideSearchInputsAboveTable ? z(l.$slots, "tableAddSearchRow", {
                key: 0,
                hasSearchInputs: h.value.hasSearchInputs,
                hasSearchInputsWithoutValue: h.value.hasSearchInputsWithoutValue,
                searchInputs: h.value.searchInputsWithoutGlobal,
                onAdd: be
              }, () => [
                h.value.hasSearchInputs ? (o(), F(va, {
                  key: 0,
                  "search-inputs": h.value.searchInputsWithoutGlobal,
                  "has-search-inputs-without-value": h.value.hasSearchInputsWithoutValue,
                  "on-add": be
                }, null, 8, ["search-inputs", "has-search-inputs-without-value"])) : b("", !0)
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : z(l.$slots, "tableColumns", {
                key: 1,
                hasColumns: h.value.hasToggleableColumns,
                columns: r.value.columns,
                hasHiddenColumns: h.value.hasHiddenColumns,
                onChange: we
              }, () => [
                h.value.hasToggleableColumns ? (o(), F(ka, {
                  key: 0,
                  columns: r.value.columns,
                  "has-hidden-columns": h.value.hasHiddenColumns,
                  "on-change": we,
                  "table-name": n.name
                }, null, 8, ["columns", "has-hidden-columns", "table-name"])) : b("", !0)
              ], !0),
              n.withGroupedMenu ? z(l.$slots, "groupedAction", {
                key: 2,
                actions: ze.value
              }, () => [
                H(es, { actions: ze.value }, {
                  default: L(() => [
                    z(l.$slots, "bulk-actions", {}, void 0, !0)
                  ]),
                  _: 3
                }, 8, ["actions"])
              ], !0) : b("", !0),
              n.withGroupedMenu ? b("", !0) : z(l.$slots, "tableReset", {
                key: 3,
                canBeReset: Fe.value,
                onClick: ye
              }, () => [
                Fe.value ? (o(), f("div", os, [
                  H(Da, { "on-click": ye })
                ])) : b("", !0)
              ], !0),
              w.value.length ? (o(), f("div", rs, [
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
                  value: $.value,
                  "aria-label": C(a).sort_by,
                  title: C(a).sort_by,
                  onChange: s[0] || (s[0] = (i) => gt(i.target.value))
                }, [
                  t("option", us, _(C(a).default_sort), 1),
                  (o(!0), f(U, null, K(w.value, (i) => (o(), f(U, {
                    key: i.key
                  }, [
                    t("option", {
                      value: i.key
                    }, _(i.label) + " (" + _(C(a).ascending) + ")", 9, cs),
                    t("option", {
                      value: `-${i.key}`
                    }, _(i.label) + " (" + _(C(a).descending) + ")", 9, ds)
                  ], 64))), 128))
                ], 40, is)
              ])) : b("", !0),
              n.showExportButton ? z(l.$slots, "exportButton", {
                key: 5,
                exportUrl: Ve.value,
                translations: C(a)
              }, () => [
                t("a", {
                  href: Ve.value,
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
                ])], 8, vs)
              ], !0) : b("", !0)
            ])
          ]),
          n.hideSearchInputsAboveTable ? b("", !0) : z(l.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: h.value.hasSearchInputsWithValue,
            searchInputs: h.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: W.value,
            onChange: ce
          }, () => [
            h.value.hasSearchInputsWithValue || W.value.length > 0 ? (o(), F(Ra, {
              key: 0,
              "search-inputs": h.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": W.value,
              "on-change": ce,
              "on-remove": rt
            }, null, 8, ["search-inputs", "forced-visible-search-inputs"])) : b("", !0)
          ], !0),
          z(l.$slots, "tableWrapper", { meta: se.value }, () => [
            H(Qa, {
              class: P({ "ijt-wrapper--mt": !_e.value })
            }, {
              default: L(() => [
                z(l.$slots, "table", {}, () => [
                  t("div", hs, [
                    t("table", {
                      class: P(["ijt-table", { "ijt-table--show-resize-indicators": n.resizeableColumns && y.value }]),
                      style: J([{ "table-layout": "fixed", "min-width": "100%" }, { width: xt.value }]),
                      onMouseenter: s[2] || (s[2] = (i) => n.resizeableColumns ? Ct : null),
                      onMouseleave: s[3] || (s[3] = (i) => n.resizeableColumns ? $t : null)
                    }, [
                      t("thead", fs, [
                        z(l.$slots, "head", {
                          show: $e,
                          sortBy: Te,
                          header: fe
                        }, () => [
                          t("tr", ms, [
                            n.hasCheckboxes ? (o(), f("th", ps, [
                              t("label", {
                                for: `table-${n.name}-select-header`,
                                class: "ijt-sr-only"
                              }, _(C(a).select_row), 9, gs),
                              A(t("input", {
                                type: "checkbox",
                                id: `table-${n.name}-select-header`,
                                onChange: bt,
                                "onUpdate:modelValue": s[1] || (s[1] = (i) => ue.value = i),
                                class: "ijt-table__checkbox",
                                "aria-label": C(a).select_row
                              }, null, 40, _s), [
                                [Qe, ue.value]
                              ])
                            ])) : b("", !0),
                            (o(!0), f(U, null, K(r.value.columns, (i) => (o(), F(Ul, {
                              cell: fe(i.key),
                              style: J(wt(i.key))
                            }, {
                              label: L(() => [
                                z(l.$slots, `header(${i.key})`, {
                                  label: fe(i.key).label,
                                  column: fe(i.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      t("tbody", bs, [
                        z(l.$slots, "body", { show: $e }, () => [
                          (o(!0), f(U, null, K(le.value, (i, k) => (o(), f("tr", {
                            key: `table-${n.name}-row-${k}`,
                            class: P(["ijt-table__tr", [it(i, k), {
                              "ijt-table__tr--has-actions": m.value,
                              "ijt-table__tr--has-checkboxes": n.hasCheckboxes,
                              "ijt-table__tr--has-card-controls": m.value || n.hasCheckboxes
                            }]])
                          }, [
                            n.hasCheckboxes ? (o(), f("td", {
                              key: 0,
                              class: "ijt-table__td ijt-table__td--pinned-checkbox",
                              style: { width: "60px" },
                              "data-column-label": C(a).select_row
                            }, [
                              t("div", ks, _(C(a).select_row), 1),
                              t("div", ws, [
                                t("label", {
                                  for: `table-${n.name}-select-${k}`,
                                  class: "ijt-sr-only"
                                }, _(C(a).select_row), 9, xs),
                                A(t("input", {
                                  type: "checkbox",
                                  id: `table-${n.name}-select-${k}`,
                                  class: "ijt-table__checkbox",
                                  "onUpdate:modelValue": (g) => i.__itSelected = g,
                                  "aria-label": C(a).select_row
                                }, null, 8, js), [
                                  [Qe, i.__itSelected]
                                ])
                              ])
                            ], 8, ys)) : b("", !0),
                            (o(!0), f(U, null, K(x.value, (g) => (o(), f("td", {
                              key: `table-${n.name}-row-${k}-column-${g.key}`,
                              onClick: (N) => ft(N, i, g.key),
                              class: P(["ijt-table__td", [g.body_class, {
                                "ijt-table__td--empty": _t(i, g.key)
                              }]]),
                              "data-column-key": g.key,
                              "data-column-label": g.label || g.key,
                              "data-column-hidden": g.hidden ? "true" : "false",
                              style: J({
                                width: yt(g.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...kt(g.key)
                              })
                            }, [
                              t("div", $s, _(g.label || g.key), 1),
                              t("div", Ss, [
                                z(l.$slots, `cell(${g.key})`, { item: i }, () => [
                                  te(_(i[g.key]), 1)
                                ], !0)
                              ])
                            ], 14, Cs))), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                q.value ? b("", !0) : z(l.$slots, "pagination", {
                  key: 0,
                  onClick: Le,
                  hasData: Ne.value,
                  meta: se.value,
                  perPageOptions: h.value.perPageOptions,
                  onPerPageChange: Ee,
                  showExportButton: n.showExportButton
                }, () => [
                  t("div", Ms, [
                    n.hasCheckboxes ? (o(), f("span", qs, _(jt.value), 1)) : b("", !0),
                    H(ua, {
                      "on-click": Le,
                      "has-data": Ne.value,
                      meta: se.value,
                      "per-page-options": h.value.perPageOptions,
                      "on-per-page-change": Ee,
                      "show-export-button": n.showExportButton
                    }, {
                      exportButton: L((i) => [
                        z(l.$slots, "exportButton", Bt(Et(i)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "show-export-button"])
                  ])
                ], !0),
                q.value && X.value ? (o(), f("div", Is, [...s[6] || (s[6] = [
                  t("div", { class: "ijt-loading__spinner" }, null, -1)
                ])])) : b("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          q.value ? (o(), f("div", {
            key: 1,
            ref_key: "intersectElement",
            ref: O,
            style: { height: "20px", width: "100%" }
          }, null, 512)) : b("", !0),
          z(l.$slots, "tableSummary", {
            data: le.value,
            meta: se.value,
            selectedItems: We.value
          }, void 0, !0)
        ], 10, ns))
      ]),
      _: 3
    }));
  }
}, Js = /* @__PURE__ */ qe(Ns, [["__scopeId", "data-v-6df3ab1b"]]);
export {
  ge as ButtonWithDropdown,
  Ul as HeaderCell,
  Zt as OnClickOutside,
  ua as Pagination,
  Js as Table,
  va as TableAddSearchRow,
  ka as TableColumns,
  Na as TableFilter,
  Va as TableGlobalSearch,
  Da as TableReset,
  Ra as TableSearchRows,
  Qa as TableWrapper,
  ne as getTranslations,
  Qs as setTranslation,
  Ys as setTranslations
};
