import { ref as I, onMounted as je, onBeforeUnmount as Ye, openBlock as f, createElementBlock as g, renderSlot as q, watch as qe, inject as ie, createBlock as N, withCtx as F, createElementVNode as s, normalizeClass as k, withModifiers as B, withDirectives as L, vShow as W, resolveDynamicComponent as he, toDisplayString as y, createCommentVNode as w, computed as P, Fragment as E, renderList as G, unref as A, createVNode as se, createTextVNode as Q, normalizeStyle as xe, nextTick as Xe, getCurrentInstance as Je, onUnmounted as Ze, Transition as et, vModelCheckbox as Ae } from "vue";
import { createPopper as tt } from "@popperjs/core/lib/popper-lite";
import rt from "@popperjs/core/lib/modifiers/preventOverflow";
import ot from "@popperjs/core/lib/modifiers/flip";
import nt from "lodash-es/uniq";
import { usePage as Ie, router as lt } from "@inertiajs/vue3";
import st from "lodash-es/find";
import Ne from "qs";
import at from "lodash-es/clone";
import it from "lodash-es/filter";
import ut from "lodash-es/findKey";
import H from "lodash-es/forEach";
import ct from "lodash-es/isEqual";
import dt from "lodash-es/map";
import ft from "lodash-es/pickBy";
const ht = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const n = e, l = I(null), o = I(null);
    return je(() => {
      l.value = (a) => {
        a.target === o.value || o.value.contains(a.target) || n.do();
      }, document.addEventListener("click", l.value), document.addEventListener("touchstart", l.value);
    }), Ye(() => {
      document.removeEventListener("click", l.value), document.removeEventListener("touchstart", l.value);
    }), (a, t) => (f(), g("div", {
      ref_key: "root",
      ref: o
    }, [
      q(a.$slots, "default")
    ], 512));
  }
}, Oe = "-";
function gt(e) {
  const n = mt(e), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: o
  } = e;
  function a(r) {
    const u = r.split(Oe);
    return u[0] === "" && u.length !== 1 && u.shift(), Ee(u, n) || pt(r);
  }
  function t(r, u) {
    const i = l[r] || [];
    return u && o[r] ? [...i, ...o[r]] : i;
  }
  return {
    getClassGroupId: a,
    getConflictingClassGroupIds: t
  };
}
function Ee(e, n) {
  var r;
  if (e.length === 0)
    return n.classGroupId;
  const l = e[0], o = n.nextPart.get(l), a = o ? Ee(e.slice(1), o) : void 0;
  if (a)
    return a;
  if (n.validators.length === 0)
    return;
  const t = e.join(Oe);
  return (r = n.validators.find(({
    validator: u
  }) => u(t))) == null ? void 0 : r.classGroupId;
}
const Be = /^\[(.+)\]$/;
function pt(e) {
  if (Be.test(e)) {
    const n = Be.exec(e)[1], l = n == null ? void 0 : n.substring(0, n.indexOf(":"));
    if (l)
      return "arbitrary.." + l;
  }
}
function mt(e) {
  const {
    theme: n,
    prefix: l
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return vt(Object.entries(e.classGroups), l).forEach(([t, r]) => {
    Fe(r, o, t, n);
  }), o;
}
function Fe(e, n, l, o) {
  e.forEach((a) => {
    if (typeof a == "string") {
      const t = a === "" ? n : Re(n, a);
      t.classGroupId = l;
      return;
    }
    if (typeof a == "function") {
      if (bt(a)) {
        Fe(a(o), n, l, o);
        return;
      }
      n.validators.push({
        validator: a,
        classGroupId: l
      });
      return;
    }
    Object.entries(a).forEach(([t, r]) => {
      Fe(r, Re(n, t), l, o);
    });
  });
}
function Re(e, n) {
  let l = e;
  return n.split(Oe).forEach((o) => {
    l.nextPart.has(o) || l.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), l = l.nextPart.get(o);
  }), l;
}
function bt(e) {
  return e.isThemeGetter;
}
function vt(e, n) {
  return n ? e.map(([l, o]) => {
    const a = o.map((t) => typeof t == "string" ? n + t : typeof t == "object" ? Object.fromEntries(Object.entries(t).map(([r, u]) => [n + r, u])) : t);
    return [l, a];
  }) : e;
}
function yt(e) {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, l = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  function a(t, r) {
    l.set(t, r), n++, n > e && (n = 0, o = l, l = /* @__PURE__ */ new Map());
  }
  return {
    get(t) {
      let r = l.get(t);
      if (r !== void 0)
        return r;
      if ((r = o.get(t)) !== void 0)
        return a(t, r), r;
    },
    set(t, r) {
      l.has(t) ? l.set(t, r) : a(t, r);
    }
  };
}
const Ge = "!";
function xt(e) {
  const n = e.separator, l = n.length === 1, o = n[0], a = n.length;
  return function(r) {
    const u = [];
    let i = 0, h = 0, c;
    for (let S = 0; S < r.length; S++) {
      let V = r[S];
      if (i === 0) {
        if (V === o && (l || r.slice(S, S + a) === n)) {
          u.push(r.slice(h, S)), h = S + a;
          continue;
        }
        if (V === "/") {
          c = S;
          continue;
        }
      }
      V === "[" ? i++ : V === "]" && i--;
    }
    const v = u.length === 0 ? r : r.substring(h), p = v.startsWith(Ge), $ = p ? v.substring(1) : v, z = c && c > h ? c - h : void 0;
    return {
      modifiers: u,
      hasImportantModifier: p,
      baseClassName: $,
      maybePostfixModifierPosition: z
    };
  };
}
function wt(e) {
  if (e.length <= 1)
    return e;
  const n = [];
  let l = [];
  return e.forEach((o) => {
    o[0] === "[" ? (n.push(...l.sort(), o), l = []) : l.push(o);
  }), n.push(...l.sort()), n;
}
function kt(e) {
  return {
    cache: yt(e.cacheSize),
    splitModifiers: xt(e),
    ...gt(e)
  };
}
const _t = /\s+/;
function Ct(e, n) {
  const {
    splitModifiers: l,
    getClassGroupId: o,
    getConflictingClassGroupIds: a
  } = n, t = /* @__PURE__ */ new Set();
  return e.trim().split(_t).map((r) => {
    const {
      modifiers: u,
      hasImportantModifier: i,
      baseClassName: h,
      maybePostfixModifierPosition: c
    } = l(r);
    let v = o(c ? h.substring(0, c) : h), p = Boolean(c);
    if (!v) {
      if (!c)
        return {
          isTailwindClass: !1,
          originalClassName: r
        };
      if (v = o(h), !v)
        return {
          isTailwindClass: !1,
          originalClassName: r
        };
      p = !1;
    }
    const $ = wt(u).join(":");
    return {
      isTailwindClass: !0,
      modifierId: i ? $ + Ge : $,
      classGroupId: v,
      originalClassName: r,
      hasPostfixModifier: p
    };
  }).reverse().filter((r) => {
    if (!r.isTailwindClass)
      return !0;
    const {
      modifierId: u,
      classGroupId: i,
      hasPostfixModifier: h
    } = r, c = u + i;
    return t.has(c) ? !1 : (t.add(c), a(i, h).forEach((v) => t.add(u + v)), !0);
  }).reverse().map((r) => r.originalClassName).join(" ");
}
function $t() {
  let e = 0, n, l, o = "";
  for (; e < arguments.length; )
    (n = arguments[e++]) && (l = We(n)) && (o && (o += " "), o += l);
  return o;
}
function We(e) {
  if (typeof e == "string")
    return e;
  let n, l = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (n = We(e[o])) && (l && (l += " "), l += n);
  return l;
}
function Mt(e, ...n) {
  let l, o, a, t = r;
  function r(i) {
    const h = n.reduce((c, v) => v(c), e());
    return l = kt(h), o = l.cache.get, a = l.cache.set, t = u, u(i);
  }
  function u(i) {
    const h = o(i);
    if (h)
      return h;
    const c = Ct(i, l);
    return a(i, c), c;
  }
  return function() {
    return t($t.apply(null, arguments));
  };
}
function T(e) {
  const n = (l) => l[e] || [];
  return n.isThemeGetter = !0, n;
}
const De = /^\[(?:([a-z-]+):)?(.+)\]$/i, St = /^\d+\/\d+$/, Tt = /* @__PURE__ */ new Set(["px", "full", "screen"]), qt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, zt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Vt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Pt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, It = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function K(e) {
  return ae(e) || Tt.has(e) || St.test(e);
}
function ee(e) {
  return ge(e, "length", Lt);
}
function ae(e) {
  return Boolean(e) && !Number.isNaN(Number(e));
}
function Te(e) {
  return ge(e, "number", ae);
}
function we(e) {
  return Boolean(e) && Number.isInteger(Number(e));
}
function Nt(e) {
  return e.endsWith("%") && ae(e.slice(0, -1));
}
function x(e) {
  return De.test(e);
}
function te(e) {
  return qt.test(e);
}
const Ft = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
function jt(e) {
  return ge(e, Ft, Ue);
}
function Ot(e) {
  return ge(e, "position", Ue);
}
const At = /* @__PURE__ */ new Set(["image", "url"]);
function Bt(e) {
  return ge(e, At, Gt);
}
function Rt(e) {
  return ge(e, "", Et);
}
function ke() {
  return !0;
}
function ge(e, n, l) {
  const o = De.exec(e);
  return o ? o[1] ? typeof n == "string" ? o[1] === n : n.has(o[1]) : l(o[2]) : !1;
}
function Lt(e) {
  return zt.test(e) && !Vt.test(e);
}
function Ue() {
  return !1;
}
function Et(e) {
  return Pt.test(e);
}
function Gt(e) {
  return It.test(e);
}
function Wt() {
  const e = T("colors"), n = T("spacing"), l = T("blur"), o = T("brightness"), a = T("borderColor"), t = T("borderRadius"), r = T("borderSpacing"), u = T("borderWidth"), i = T("contrast"), h = T("grayscale"), c = T("hueRotate"), v = T("invert"), p = T("gap"), $ = T("gradientColorStops"), z = T("gradientColorStopPositions"), S = T("inset"), V = T("margin"), O = T("opacity"), R = T("padding"), ue = T("saturate"), ce = T("scale"), re = T("sepia"), pe = T("skew"), me = T("space"), be = T("translate"), D = () => ["auto", "contain", "none"], oe = () => ["auto", "hidden", "clip", "visible", "scroll"], ve = () => ["auto", x, n], M = () => [x, n], _e = () => ["", K, ee], ne = () => ["auto", ae, x], Ce = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], X = () => ["solid", "dashed", "dotted", "double", "none"], de = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], fe = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], le = () => ["", "0", x], ye = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], J = () => [ae, Te], Z = () => [ae, x];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ke],
      spacing: [K, ee],
      blur: ["none", "", te, x],
      brightness: J(),
      borderColor: [e],
      borderRadius: ["none", "", "full", te, x],
      borderSpacing: M(),
      borderWidth: _e(),
      contrast: J(),
      grayscale: le(),
      hueRotate: Z(),
      invert: le(),
      gap: M(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Nt, ee],
      inset: ve(),
      margin: ve(),
      opacity: J(),
      padding: M(),
      saturate: J(),
      scale: J(),
      sepia: le(),
      skew: Z(),
      space: M(),
      translate: M()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", x]
      }],
      container: ["container"],
      columns: [{
        columns: [te]
      }],
      "break-after": [{
        "break-after": ye()
      }],
      "break-before": [{
        "break-before": ye()
      }],
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      box: [{
        box: ["border", "content"]
      }],
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      "object-position": [{
        object: [...Ce(), x]
      }],
      overflow: [{
        overflow: oe()
      }],
      "overflow-x": [{
        "overflow-x": oe()
      }],
      "overflow-y": [{
        "overflow-y": oe()
      }],
      overscroll: [{
        overscroll: D()
      }],
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      "overscroll-y": [{
        "overscroll-y": D()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [S]
      }],
      "inset-x": [{
        "inset-x": [S]
      }],
      "inset-y": [{
        "inset-y": [S]
      }],
      start: [{
        start: [S]
      }],
      end: [{
        end: [S]
      }],
      top: [{
        top: [S]
      }],
      right: [{
        right: [S]
      }],
      bottom: [{
        bottom: [S]
      }],
      left: [{
        left: [S]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", we, x]
      }],
      basis: [{
        basis: ve()
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      flex: [{
        flex: ["1", "auto", "initial", "none", x]
      }],
      grow: [{
        grow: le()
      }],
      shrink: [{
        shrink: le()
      }],
      order: [{
        order: ["first", "last", "none", we, x]
      }],
      "grid-cols": [{
        "grid-cols": [ke]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", we, x]
        }, x]
      }],
      "col-start": [{
        "col-start": ne()
      }],
      "col-end": [{
        "col-end": ne()
      }],
      "grid-rows": [{
        "grid-rows": [ke]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [we, x]
        }, x]
      }],
      "row-start": [{
        "row-start": ne()
      }],
      "row-end": [{
        "row-end": ne()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", x]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", x]
      }],
      gap: [{
        gap: [p]
      }],
      "gap-x": [{
        "gap-x": [p]
      }],
      "gap-y": [{
        "gap-y": [p]
      }],
      "justify-content": [{
        justify: ["normal", ...fe()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...fe(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...fe(), "baseline"]
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [R]
      }],
      px: [{
        px: [R]
      }],
      py: [{
        py: [R]
      }],
      ps: [{
        ps: [R]
      }],
      pe: [{
        pe: [R]
      }],
      pt: [{
        pt: [R]
      }],
      pr: [{
        pr: [R]
      }],
      pb: [{
        pb: [R]
      }],
      pl: [{
        pl: [R]
      }],
      m: [{
        m: [V]
      }],
      mx: [{
        mx: [V]
      }],
      my: [{
        my: [V]
      }],
      ms: [{
        ms: [V]
      }],
      me: [{
        me: [V]
      }],
      mt: [{
        mt: [V]
      }],
      mr: [{
        mr: [V]
      }],
      mb: [{
        mb: [V]
      }],
      ml: [{
        ml: [V]
      }],
      "space-x": [{
        "space-x": [me]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [me]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", x, n]
      }],
      "min-w": [{
        "min-w": [x, n, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [x, n, "none", "full", "min", "max", "fit", "prose", {
          screen: [te]
        }, te]
      }],
      h: [{
        h: [x, n, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [x, n, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [x, n, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [x, n, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", te, ee]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Te]
      }],
      "font-family": [{
        font: [ke]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", x]
      }],
      "line-clamp": [{
        "line-clamp": ["none", ae, Te]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", K, x]
      }],
      "list-image": [{
        "list-image": ["none", x]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", x]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [e]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [O]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [O]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...X(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", K, ee]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", K, x]
      }],
      "text-decoration-color": [{
        decoration: [e]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: M()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", x]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      content: [{
        content: ["none", x]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [O]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...Ce(), Ot]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", jt]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Bt]
      }],
      "bg-color": [{
        bg: [e]
      }],
      "gradient-from-pos": [{
        from: [z]
      }],
      "gradient-via-pos": [{
        via: [z]
      }],
      "gradient-to-pos": [{
        to: [z]
      }],
      "gradient-from": [{
        from: [$]
      }],
      "gradient-via": [{
        via: [$]
      }],
      "gradient-to": [{
        to: [$]
      }],
      rounded: [{
        rounded: [t]
      }],
      "rounded-s": [{
        "rounded-s": [t]
      }],
      "rounded-e": [{
        "rounded-e": [t]
      }],
      "rounded-t": [{
        "rounded-t": [t]
      }],
      "rounded-r": [{
        "rounded-r": [t]
      }],
      "rounded-b": [{
        "rounded-b": [t]
      }],
      "rounded-l": [{
        "rounded-l": [t]
      }],
      "rounded-ss": [{
        "rounded-ss": [t]
      }],
      "rounded-se": [{
        "rounded-se": [t]
      }],
      "rounded-ee": [{
        "rounded-ee": [t]
      }],
      "rounded-es": [{
        "rounded-es": [t]
      }],
      "rounded-tl": [{
        "rounded-tl": [t]
      }],
      "rounded-tr": [{
        "rounded-tr": [t]
      }],
      "rounded-br": [{
        "rounded-br": [t]
      }],
      "rounded-bl": [{
        "rounded-bl": [t]
      }],
      "border-w": [{
        border: [u]
      }],
      "border-w-x": [{
        "border-x": [u]
      }],
      "border-w-y": [{
        "border-y": [u]
      }],
      "border-w-s": [{
        "border-s": [u]
      }],
      "border-w-e": [{
        "border-e": [u]
      }],
      "border-w-t": [{
        "border-t": [u]
      }],
      "border-w-r": [{
        "border-r": [u]
      }],
      "border-w-b": [{
        "border-b": [u]
      }],
      "border-w-l": [{
        "border-l": [u]
      }],
      "border-opacity": [{
        "border-opacity": [O]
      }],
      "border-style": [{
        border: [...X(), "hidden"]
      }],
      "divide-x": [{
        "divide-x": [u]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [u]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [O]
      }],
      "divide-style": [{
        divide: X()
      }],
      "border-color": [{
        border: [a]
      }],
      "border-color-x": [{
        "border-x": [a]
      }],
      "border-color-y": [{
        "border-y": [a]
      }],
      "border-color-t": [{
        "border-t": [a]
      }],
      "border-color-r": [{
        "border-r": [a]
      }],
      "border-color-b": [{
        "border-b": [a]
      }],
      "border-color-l": [{
        "border-l": [a]
      }],
      "divide-color": [{
        divide: [a]
      }],
      "outline-style": [{
        outline: ["", ...X()]
      }],
      "outline-offset": [{
        "outline-offset": [K, x]
      }],
      "outline-w": [{
        outline: [K, ee]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: _e()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [O]
      }],
      "ring-offset-w": [{
        "ring-offset": [K, ee]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", te, Rt]
      }],
      "shadow-color": [{
        shadow: [ke]
      }],
      opacity: [{
        opacity: [O]
      }],
      "mix-blend": [{
        "mix-blend": [...de(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": de()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [l]
      }],
      brightness: [{
        brightness: [o]
      }],
      contrast: [{
        contrast: [i]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", te, x]
      }],
      grayscale: [{
        grayscale: [h]
      }],
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      invert: [{
        invert: [v]
      }],
      saturate: [{
        saturate: [ue]
      }],
      sepia: [{
        sepia: [re]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [l]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [i]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [h]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [v]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [O]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [ue]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [re]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [r]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [r]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [r]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", x]
      }],
      duration: [{
        duration: Z()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", x]
      }],
      delay: [{
        delay: Z()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", x]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [ce]
      }],
      "scale-x": [{
        "scale-x": [ce]
      }],
      "scale-y": [{
        "scale-y": [ce]
      }],
      rotate: [{
        rotate: [we, x]
      }],
      "translate-x": [{
        "translate-x": [be]
      }],
      "translate-y": [{
        "translate-y": [be]
      }],
      "skew-x": [{
        "skew-x": [pe]
      }],
      "skew-y": [{
        "skew-y": [pe]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", x]
      }],
      accent: [{
        accent: ["auto", e]
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", x]
      }],
      "caret-color": [{
        caret: [e]
      }],
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scroll-m": [{
        "scroll-m": M()
      }],
      "scroll-mx": [{
        "scroll-mx": M()
      }],
      "scroll-my": [{
        "scroll-my": M()
      }],
      "scroll-ms": [{
        "scroll-ms": M()
      }],
      "scroll-me": [{
        "scroll-me": M()
      }],
      "scroll-mt": [{
        "scroll-mt": M()
      }],
      "scroll-mr": [{
        "scroll-mr": M()
      }],
      "scroll-mb": [{
        "scroll-mb": M()
      }],
      "scroll-ml": [{
        "scroll-ml": M()
      }],
      "scroll-p": [{
        "scroll-p": M()
      }],
      "scroll-px": [{
        "scroll-px": M()
      }],
      "scroll-py": [{
        "scroll-py": M()
      }],
      "scroll-ps": [{
        "scroll-ps": M()
      }],
      "scroll-pe": [{
        "scroll-pe": M()
      }],
      "scroll-pt": [{
        "scroll-pt": M()
      }],
      "scroll-pr": [{
        "scroll-pr": M()
      }],
      "scroll-pb": [{
        "scroll-pb": M()
      }],
      "scroll-pl": [{
        "scroll-pl": M()
      }],
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", x]
      }],
      fill: [{
        fill: [e, "none"]
      }],
      "stroke-w": [{
        stroke: [K, ee, Te]
      }],
      stroke: [{
        stroke: [e, "none"]
      }],
      sr: ["sr-only", "not-sr-only"],
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
const Y = /* @__PURE__ */ Mt(Wt);
function j(e, n, l, o) {
  let a = { ...n }, t = null, r = { ...l }, u = null, i = { ...o }, h = null;
  for (const c of e)
    t === null && c in a && (a = a[c], typeof a == "string" && (t = a)), u === null && c in r && (r = r[c], typeof r == "string" && (u = r)), h === null && c in i && (i = i[c], typeof i == "string" && (h = i));
  return Y(t, u, h);
}
const Dt = { class: "relative" }, Ut = ["dusk", "disabled"], Ht = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, ze = {
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  emits: ["closed", "opened"],
  setup(e, { expose: n, emit: l }) {
    const o = l, a = e, t = I(!1), r = I(null);
    function u() {
      t.value = !t.value;
    }
    function i() {
      t.value = !1;
    }
    qe(t, () => {
      r.value.update(), t.value || o("closed"), t.value && o("opened");
    });
    const h = I(null), c = I(null);
    je(() => {
      r.value = tt(h.value, c.value, {
        placement: a.placement,
        modifiers: [ot, rt]
      });
    }), n({ hide: i });
    const v = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, p = ie("themeVariables"), $ = (z) => {
      var V, O;
      let S = "";
      return z === "button" && a.disabled && (S = "cursor-not-allowed"), Y(
        S,
        j([z, "base"], v, (V = p == null ? void 0 : p.inertia_table) == null ? void 0 : V.button_with_dropdown, a.ui),
        j([z, "color", a.color], v, (O = p == null ? void 0 : p.inertia_table) == null ? void 0 : O.button_with_dropdown, a.ui)
      );
    };
    return (z, S) => (f(), N(ht, { do: i }, {
      default: F(() => [
        s("div", Dt, [
          s("button", {
            ref_key: "button",
            ref: h,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: k($("button")),
            "aria-haspopup": "true",
            onClick: B(u, ["prevent"])
          }, [
            q(z.$slots, "button")
          ], 10, Ut),
          L(s("div", {
            ref_key: "tooltip",
            ref: c,
            class: "absolute z-10"
          }, [
            s("div", Ht, [
              q(z.$slots, "default")
            ])
          ], 512), [
            [W, t.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, Kt = { class: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900" }, Qt = { class: "flex flex-row items-center" }, Yt = { class: "uppercase" }, Xt = ["sorted"], Jt = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Zt = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, er = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, tr = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const n = e;
    function l() {
      n.cell.sortable && n.cell.onSort(n.cell.key);
    }
    return (o, a) => L((f(), g("th", Kt, [
      (f(), N(he(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: B(l, ["prevent"])
      }, {
        default: F(() => [
          s("span", Qt, [
            q(o.$slots, "label", {}, () => [
              s("span", Yt, y(e.cell.label), 1)
            ]),
            q(o.$slots, "sort", {}, () => [
              e.cell.sortable ? (f(), g("svg", {
                key: 0,
                "aria-hidden": "true",
                class: k(["w-3 h-3 ml-2", {
                  "text-gray-400": !e.cell.sorted,
                  "text-green-500": e.cell.sorted
                }]),
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 320 512",
                sorted: e.cell.sorted
              }, [
                e.cell.sorted ? w("", !0) : (f(), g("path", Jt)),
                e.cell.sorted === "asc" ? (f(), g("path", Zt)) : w("", !0),
                e.cell.sorted === "desc" ? (f(), g("path", er)) : w("", !0)
              ], 10, Xt)) : w("", !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"]))
    ], 512)), [
      [W, !e.cell.hidden]
    ]);
  }
}, Ve = {
  translations: {
    next: "Next",
    no_results_found: "No results found",
    of: "of",
    per_page: "per page",
    previous: "Previous",
    results: "results",
    to: "to",
    reset: "Reset",
    search: "Search..."
  }
}, rr = Ve.translations;
function Pe() {
  return Ve.translations;
}
function jn(e, n) {
  Ve.translations[e] = n;
}
function On(e) {
  Ve.translations = e;
}
const or = ["dusk", "value"], nr = ["value"], Le = {
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  setup(e) {
    const n = Pe(), l = e, o = P(() => {
      let u = [...l.options];
      return u.push(parseInt(l.value)), nt(u).sort((i, h) => i - h);
    }), a = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, t = ie("themeVariables"), r = (u) => {
      var i, h;
      return Y(
        j([u, "base"], a, (i = t == null ? void 0 : t.inertia_table) == null ? void 0 : i.per_page_selector, l.ui),
        j([u, "color", l.color], a, (h = t == null ? void 0 : t.inertia_table) == null ? void 0 : h.per_page_selector, l.ui)
      );
    };
    return (u, i) => (f(), g("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: k(r("select")),
      onChange: i[0] || (i[0] = (h) => e.onChange(h.target.value))
    }, [
      (f(!0), g(E, null, G(o.value, (h) => (f(), g("option", {
        key: h,
        value: h
      }, y(h) + " " + y(A(n).per_page), 9, nr))), 128))
    ], 42, or));
  }
}, lr = {
  key: 0,
  class: "bg-white flex items-center"
}, sr = { key: 0 }, ar = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 16l-4-4m0 0l4-4m-4 4h18"
  })
], -1), ir = { class: "hidden sm:inline ml-2" }, ur = { class: "hidden sm:inline mr-2" }, cr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M17 8l4 4m0 0l-4 4m4-4H3"
  })
], -1), dr = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, fr = { class: "flex flex-row space-x-4 items-center grow" }, hr = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, gr = { class: "font-medium" }, pr = { class: "font-medium" }, mr = { class: "font-medium" }, br = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, vr = { class: "sr-only" }, yr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
    "clip-rule": "evenodd"
  })
], -1), xr = { class: "sr-only" }, wr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
    "clip-rule": "evenodd"
  })
], -1), kr = {
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
    color: {
      type: String,
      default: "primary",
      required: !1
    }
  },
  setup(e) {
    const n = Pe(), l = e, o = P(() => "links" in t.value ? t.value.links.length > 0 : !1), a = P(() => Object.keys(t.value).length > 0), t = P(() => l.meta), r = P(() => "prev_page_url" in t.value ? t.value.prev_page_url : null), u = P(() => "next_page_url" in t.value ? t.value.next_page_url : null), i = P(() => parseInt(t.value.per_page));
    return (h, c) => a.value ? (f(), g("nav", lr, [
      !e.hasData || t.value.total < 1 ? (f(), g("p", sr, y(A(n).no_results_found), 1)) : w("", !0),
      e.hasData ? (f(), g("div", {
        key: 1,
        class: k(["flex-1 flex justify-between", { "sm:hidden": o.value }])
      }, [
        (f(), N(he(r.value ? "a" : "div"), {
          class: k([{
            "cursor-not-allowed text-gray-400": !r.value,
            "text-gray-700 hover:text-gray-500": r.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: r.value,
          dusk: r.value ? "pagination-simple-previous" : null,
          onClick: c[0] || (c[0] = B((v) => e.onClick(r.value), ["prevent"]))
        }, {
          default: F(() => [
            ar,
            s("span", ir, y(A(n).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        se(Le, {
          dusk: "per-page-mobile",
          value: i.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (f(), N(he(u.value ? "a" : "div"), {
          class: k([{
            "cursor-not-allowed text-gray-400": !u.value,
            "text-gray-700 hover:text-gray-500": u.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: u.value,
          dusk: u.value ? "pagination-simple-next" : null,
          onClick: c[1] || (c[1] = B((v) => e.onClick(u.value), ["prevent"]))
        }, {
          default: F(() => [
            s("span", ur, y(A(n).next), 1),
            cr
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"]))
      ], 2)) : w("", !0),
      e.hasData && o.value ? (f(), g("div", dr, [
        s("div", fr, [
          se(Le, {
            dusk: "per-page-full",
            value: i.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          s("p", hr, [
            s("span", gr, y(t.value.from), 1),
            Q(" " + y(A(n).to) + " ", 1),
            s("span", pr, y(t.value.to), 1),
            Q(" " + y(A(n).of) + " ", 1),
            s("span", mr, y(t.value.total), 1),
            Q(" " + y(A(n).results), 1)
          ])
        ]),
        s("div", null, [
          s("nav", br, [
            (f(), N(he(r.value ? "a" : "div"), {
              class: k([{
                "cursor-not-allowed text-gray-400": !r.value,
                "text-gray-500 hover:bg-gray-50": r.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: r.value,
              dusk: r.value ? "pagination-previous" : null,
              onClick: c[2] || (c[2] = B((v) => e.onClick(r.value), ["prevent"]))
            }, {
              default: F(() => [
                s("span", vr, y(A(n).previous), 1),
                yr
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"])),
            (f(!0), g(E, null, G(t.value.links, (v, p) => (f(), g("div", { key: p }, [
              q(h.$slots, "link", {}, () => [
                !isNaN(v.label) || v.label === "..." ? (f(), N(he(v.url ? "a" : "div"), {
                  key: 0,
                  href: v.url,
                  dusk: v.url ? `pagination-${v.label}` : null,
                  class: k(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !v.url,
                    "hover:bg-gray-50": v.url,
                    "bg-white": !v.active,
                    "bg-gray-100": v.active
                  }]),
                  onClick: B(($) => e.onClick(v.url), ["prevent"])
                }, {
                  default: F(() => [
                    Q(y(v.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : w("", !0)
              ])
            ]))), 128)),
            (f(), N(he(u.value ? "a" : "div"), {
              class: k([{
                "cursor-not-allowed text-gray-400": !u.value,
                "text-gray-500 hover:bg-gray-50": u.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: u.value,
              dusk: u.value ? "pagination-next" : null,
              onClick: c[3] || (c[3] = B((v) => e.onClick(u.value), ["prevent"]))
            }, {
              default: F(() => [
                s("span", xr, y(A(n).next), 1),
                wr
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"]))
          ])
        ])
      ])) : w("", !0)
    ])) : w("", !0);
  }
}, _r = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    "clip-rule": "evenodd"
  })
], -1), Cr = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, $r = ["dusk", "onClick"], Mr = {
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    }
  },
  setup(e) {
    const n = e, l = I(null);
    function o(a) {
      n.onAdd(a), l.value.hide();
    }
    return (a, t) => (f(), N(ze, {
      ref_key: "dropdown",
      ref: l,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: F(() => [
        _r
      ]),
      default: F(() => [
        s("div", Cr, [
          (f(!0), g(E, null, G(e.searchInputs, (r, u) => (f(), g("button", {
            key: u,
            dusk: `add-search-row-${r.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: B((i) => o(r.key), ["prevent"])
          }, y(r.label), 9, $r))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, Sr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
    "clip-rule": "evenodd"
  })
], -1), Tr = {
  key: 0,
  class: "ml-1"
}, qr = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, zr = { class: "px-2" }, Vr = { class: "divide-y divide-gray-200" }, Pr = { class: "text-sm text-gray-900" }, Ir = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Nr = /* @__PURE__ */ s("span", { class: "sr-only" }, "Column status", -1), Fr = {
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
    color: {
      type: String,
      default: "primary",
      required: !1
    }
  },
  setup(e) {
    const n = e, l = P(() => n.columns.filter((o) => o.hidden).length);
    return (o, a) => (f(), N(ze, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: F(() => [
        Sr,
        e.hasHiddenColumns ? (f(), g("span", Tr, "(" + y(l.value) + ")", 1)) : w("", !0)
      ]),
      default: F(() => [
        s("div", qr, [
          s("div", zr, [
            s("ul", Vr, [
              (f(!0), g(E, null, G(n.columns, (t, r) => L((f(), g("li", {
                key: r,
                class: "py-2 flex items-center justify-between"
              }, [
                s("p", Pr, y(t.label), 1),
                s("button", {
                  type: "button",
                  class: k(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                    "bg-green-500": !t.hidden,
                    "bg-gray-200": t.hidden
                  }]),
                  "aria-pressed": !t.hidden,
                  "aria-labelledby": `toggle-column-${t.key}`,
                  "aria-describedby": `toggle-column-${t.key}`,
                  dusk: `toggle-column-${t.key}`,
                  onClick: B((u) => e.onChange(t.key, t.hidden), ["prevent"])
                }, [
                  Nr,
                  s("span", {
                    "aria-hidden": "true",
                    class: k([{
                      "translate-x-5": !t.hidden,
                      "translate-x-0": t.hidden
                    }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                  }, null, 2)
                ], 10, Ir)
              ])), [
                [W, t.can_be_hidden]
              ])), 128))
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, jr = { class: "w-full flex gap-2 justify-between items-center" }, Or = { class: "relative inline-flex items-center cursor-pointer" }, Ar = ["checked"], Br = /* @__PURE__ */ s("span", { class: "sr-only" }, "Remove search", -1), Rr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Lr = [
  Br,
  Rr
], Er = {
  __name: "ToggleFilter",
  props: {
    filter: {
      type: Object,
      required: !0
    },
    onFilterChange: {
      type: Function,
      required: !0
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  setup(e) {
    const n = e, l = {
      toggle: {
        base: "w-11 h-6 rounded-full after:border after:rounded-full after:h-5 after:w-5",
        color: {
          primary: "after:bg-white after:border-white peer-checked:bg-indigo-500 bg-red-500",
          dootix: "after:bg-white after:border-white peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-600 bg-red-500",
          disabled: "after:bg-white after:border-white bg-gray-200"
        }
      },
      reset_button: {
        base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
          dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500"
        }
      }
    }, o = ie("themeVariables"), a = (t) => {
      var u, i, h, c;
      let r = n.color;
      return t === "toggle" && n.filter.value === null && (r = "disabled"), Y(
        j([t, "base"], l, (i = (u = o == null ? void 0 : o.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : i.toggle_filter, n.ui),
        j([t, "color", r], l, (c = (h = o == null ? void 0 : o.inertia_table) == null ? void 0 : h.table_filter) == null ? void 0 : c.toggle_filter, n.ui)
      );
    };
    return (t, r) => (f(), g("div", jr, [
      s("label", Or, [
        s("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: r[0] || (r[0] = (u) => e.onFilterChange(e.filter.key, u.target.checked ? "1" : "0"))
        }, null, 40, Ar),
        s("div", {
          class: k(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", a("toggle")])
        }, null, 2)
      ]),
      s("button", {
        class: k(a("reset_button")),
        onClick: r[1] || (r[1] = B((u) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, Lr, 2)
    ]));
  }
}, He = (e, n) => {
  const l = e.__vccOpts || e;
  for (const [o, a] of n)
    l[o] = a;
  return l;
}, Gr = {
  name: "SimpleMultiRange",
  inject: ["themeVariables"],
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
    },
    color: {
      required: !1,
      type: String,
      default: "primary"
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      rangePositions: null,
      moveMin: !1,
      moveMax: !1,
      hasOverlap: !1,
      internalValue: this.modelValue ? [...this.modelValue] : null,
      fallbackTheme: null
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
  beforeMount() {
    this.fallbackTheme = {
      main_bar: {
        base: "h-2 rounded-full",
        color: {
          primary: "bg-gray-200",
          dootix: "bg-gray-200"
        }
      },
      selected_bar: {
        base: "h-2 rounded-full",
        color: {
          primary: "bg-indigo-600",
          dootix: "bg-gradient-to-r from-cyan-500 to-blue-600"
        }
      },
      button: {
        base: "h-4 w-4 rounded-full shadow border",
        color: {
          primary: "bg-white border-gray-300",
          dootix: "bg-white border-gray-300"
        }
      },
      popover: {
        base: "truncate text-xs rounded py-1 px-4",
        color: {
          primary: "bg-gray-600 text-white",
          dootix: "bg-gray-600 text-white"
        }
      },
      popover_arrow: {
        color: {
          primary: "text-gray-600",
          dootix: "text-gray-600"
        }
      },
      text: {
        color: {
          primary: "text-gray-700",
          dootix: "text-gray-700"
        }
      }
    };
  },
  methods: {
    getMarginTop(e) {
      const n = this.getTheme("button"), l = /h-(\d+)/, o = n.match(l), a = 4;
      let t = null;
      return o && 1 in o ? t = o[1] : t = a, e ? `margin-top: ${(t - a + 12) * 0.25}rem` : `margin-top: -${((t - a) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(e) {
      return e < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : e > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : e;
    },
    detectIfOverlap() {
      let e = this.$refs.popover_min.getClientRects()[0], n = this.$refs.popover_max.getClientRects()[0];
      e && n && (this.hasOverlap = e.right > n.left);
    },
    handleMouseDown(e, n) {
      this.moveMin = n, this.moveMax = !n, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      let o = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), a = Number(Math.round(o / this.step) * this.step).toFixed(2);
      a >= this.min && a <= this.max && (this.moveMin && a !== this.currentMinValue && a <= this.currentMaxValue && (this.internalValue = [a, this.currentMaxValue]), this.moveMax && a !== this.currentMaxValue && a >= this.currentMinValue && (this.internalValue = [this.currentMinValue, a])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var n, l, o, a, t, r;
      return Y(
        j([e, "base"], this.fallbackTheme, (o = (l = (n = this.themeVariables) == null ? void 0 : n.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : o.number_range_filter, this.ui),
        j([e, "color", this.color], this.fallbackTheme, (r = (t = (a = this.themeVariables) == null ? void 0 : a.inertia_table) == null ? void 0 : t.table_filter) == null ? void 0 : r.number_range_filter, this.ui)
      );
    }
  }
}, Wr = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, Dr = { class: "py-1 relative min-w-full" }, Ur = { class: "z-40" }, Hr = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Kr = { key: 0 }, Qr = { key: 1 }, Yr = /* @__PURE__ */ s("polygon", {
  class: "fill-current",
  points: "0,0 127.5,127.5 255,0"
}, null, -1), Xr = [
  Yr
], Jr = { class: "z-40" }, Zr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, eo = { key: 0 }, to = { key: 1 }, ro = { draggable: "true" }, oo = /* @__PURE__ */ s("polygon", {
  class: "fill-current",
  points: "0,0 127.5,127.5 255,0"
}, null, -1), no = [
  oo
], lo = { key: 0 }, so = { key: 1 }, ao = { key: 0 }, io = { key: 1 };
function uo(e, n, l, o, a, t) {
  var r, u, i, h;
  return f(), g("div", Wr, [
    s("div", Dr, [
      s("div", {
        class: k(t.getTheme("main_bar"))
      }, [
        s("div", {
          class: k(["absolute", t.getTheme("selected_bar")]),
          style: xe(`width: ${t.rangeWidth}% !important; left: ${t.currentMinValueInPercent}% !important;`)
        }, null, 6),
        s("div", {
          class: k([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: xe(`left: ${t.currentMinValueInPercent}%;`),
          onMousedown: n[0] || (n[0] = (c) => t.handleMouseDown(c, !0))
        }, [
          s("div", Ur, [
            s("div", Hr, [
              s("div", {
                class: k(t.getTheme("popover")),
                style: xe(t.getMarginTop(a.hasOverlap && t.displayFirstDown))
              }, [
                l.prefix ? (f(), g("span", Kr, y(l.prefix), 1)) : w("", !0),
                Q(" " + y((r = t.currentMinValue) != null ? r : 0) + " ", 1),
                l.suffix ? (f(), g("span", Qr, y(l.suffix), 1)) : w("", !0)
              ], 6),
              (f(), g("svg", {
                class: k(["absolute w-full h-2 left-0", [a.hasOverlap && t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, Xr, 2))
            ], 512)
          ])
        ], 38),
        s("div", {
          class: k([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: xe(`left: ${t.currentMaxValueInPercent}%;`),
          onMousedown: n[1] || (n[1] = (c) => t.handleMouseDown(c, !1))
        }, [
          s("div", Jr, [
            s("div", Zr, [
              s("div", {
                class: k(t.getTheme("popover")),
                style: xe(t.getMarginTop(a.hasOverlap && !t.displayFirstDown))
              }, [
                l.prefix ? (f(), g("span", eo, y(l.prefix), 1)) : w("", !0),
                Q(" " + y((u = t.currentMaxValue) != null ? u : 0) + " ", 1),
                l.suffix ? (f(), g("span", to, y(l.suffix), 1)) : w("", !0)
              ], 6),
              s("div", ro, [
                (f(), g("svg", {
                  class: k(["absolute w-full h-2 left-0 top-100", [a.hasOverlap && !t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, no, 2))
              ])
            ], 512)
          ])
        ], 38),
        s("div", {
          class: k(["absolute -ml-1 bottom-0 left-0 -mb-6", t.getTheme("text")])
        }, [
          l.prefix ? (f(), g("span", lo, y(l.prefix), 1)) : w("", !0),
          Q(" " + y((i = l.min) != null ? i : 0) + " ", 1),
          l.suffix ? (f(), g("span", so, y(l.suffix), 1)) : w("", !0)
        ], 2),
        s("div", {
          class: k(["absolute -mr-1 bottom-0 right-0 -mb-6", t.getTheme("text")])
        }, [
          l.prefix ? (f(), g("span", ao, y(l.prefix), 1)) : w("", !0),
          Q(" " + y((h = l.max) != null ? h : 0) + " ", 1),
          l.suffix ? (f(), g("span", io, y(l.suffix), 1)) : w("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const co = /* @__PURE__ */ He(Gr, [["render", uo]]), fo = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), ho = {
  key: 0,
  class: "ml-1"
}, go = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, po = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, mo = { class: "p-2" }, bo = ["name", "value", "onChange"], vo = ["value"], yo = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, xo = {
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  setup(e) {
    const n = e;
    I(null);
    const l = P(() => n.filters.filter((i) => !o(i)).length);
    function o(i) {
      if (i.value === null)
        return !0;
      switch (i.type) {
        case "number_range":
          return Number(Math.max(...i.value)) === Number(i.max) && Number(Math.min(...i.value)) === Number(i.min);
        case "select":
          return i.value === "";
        case "toggle":
          return !1;
        default:
          return !i.value;
      }
    }
    function a(i) {
      let h = i.value;
      i.value && (Number(Math.max(...i.value)) === Number(i.max) && Number(Math.min(...i.value)) === Number(i.min) ? h = null : Number(Math.min(...i.value)) === 0 && Number(Math.max(...i.value)) === 0 && (h = ["0", "0"])), n.onFilterChange(i.key, h);
    }
    const t = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, r = ie("themeVariables"), u = (i) => {
      var h, c, v, p;
      return Y(
        j([i, "base"], t, (c = (h = r == null ? void 0 : r.inertia_table) == null ? void 0 : h.table_filter) == null ? void 0 : c.select_filter, n.ui),
        j([i, "color", n.color], t, (p = (v = r == null ? void 0 : r.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : p.select_filter, n.ui)
      );
    };
    return (i, h) => (f(), N(ze, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: F(() => [
        fo,
        e.hasEnabledFilters ? (f(), g("span", ho, "(" + y(l.value) + ")", 1)) : w("", !0)
      ]),
      default: F(() => [
        s("div", go, [
          (f(!0), g(E, null, G(e.filters, (c, v) => (f(), g("div", { key: v }, [
            s("h3", po, y(c.label), 1),
            s("div", mo, [
              c.type === "select" ? (f(), g("select", {
                key: 0,
                name: c.key,
                value: c.value,
                class: k(u("select", e.color)),
                onChange: (p) => e.onFilterChange(c.key, p.target.value)
              }, [
                (f(!0), g(E, null, G(c.options, (p, $) => (f(), g("option", {
                  key: $,
                  value: $
                }, y(p), 9, vo))), 128))
              ], 42, bo)) : w("", !0),
              c.type === "toggle" ? (f(), N(Er, {
                key: 1,
                filter: c,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : w("", !0),
              c.type === "number_range" ? (f(), g("div", yo, [
                se(co, {
                  modelValue: c.value,
                  "onUpdate:modelValue": [(p) => c.value = p, (p) => a(c)],
                  max: c.max,
                  min: c.min,
                  prefix: c.prefix,
                  suffix: c.suffix,
                  step: c.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : w("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, wo = { class: "relative" }, ko = ["placeholder", "value"], _o = /* @__PURE__ */ s("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5 text-gray-400",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ s("path", {
      "fill-rule": "evenodd",
      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
      "clip-rule": "evenodd"
    })
  ])
], -1), Co = {
  __name: "TableGlobalSearch",
  props: {
    label: {
      type: String,
      default: rr.search,
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  setup(e) {
    const n = e, l = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, o = ie("themeVariables"), a = (t) => {
      var r, u;
      return Y(
        j([t, "base"], l, (r = o == null ? void 0 : o.inertia_table) == null ? void 0 : r.global_search, n.ui),
        j([t, "color", n.color], l, (u = o == null ? void 0 : o.inertia_table) == null ? void 0 : u.global_search, n.ui)
      );
    };
    return (t, r) => (f(), g("div", wo, [
      s("input", {
        class: k(a("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: r[0] || (r[0] = (u) => e.onChange(u.target.value))
      }, null, 42, ko),
      _o
    ]));
  }
}, $o = { class: "flex rounded-md shadow-sm relative mt-3" }, Mo = ["for"], So = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 mr-2 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    "clip-rule": "evenodd"
  })
], -1), To = ["id", "name", "value", "onInput"], qo = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, zo = ["dusk", "onClick"], Vo = /* @__PURE__ */ s("span", { class: "sr-only" }, "Remove search", -1), Po = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Io = [
  Vo,
  Po
], No = {
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  setup(e) {
    const n = { el: I([]) };
    let l = P(() => n.el.value);
    const o = e;
    function a(i) {
      return o.forcedVisibleSearchInputs.includes(i);
    }
    qe(o.forcedVisibleSearchInputs, (i) => {
      const h = i.length > 0 ? i[i.length - 1] : null;
      !h || Xe().then(() => {
        const c = st(l.value, (v) => v.name === h);
        c && c.focus();
      });
    }, { immediate: !0 });
    const t = {
      input: {
        base: "flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md text-sm",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      },
      remove_button: {
        base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
          dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500"
        }
      }
    }, r = ie("themeVariables"), u = (i) => {
      var h, c;
      return Y(
        j([i, "base"], t, (h = r == null ? void 0 : r.inertia_table) == null ? void 0 : h.table_search_rows, o.ui),
        j([i, "color", o.color], t, (c = r == null ? void 0 : r.inertia_table) == null ? void 0 : c.table_search_rows, o.ui)
      );
    };
    return (i, h) => (f(!0), g(E, null, G(e.searchInputs, (c, v) => L((f(), g("div", {
      key: v,
      class: "px-4 sm:px-0"
    }, [
      s("div", $o, [
        s("label", {
          for: c.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          So,
          s("span", null, y(c.label), 1)
        ], 8, Mo),
        (f(), g("input", {
          id: c.key,
          ref_for: !0,
          ref: n.el,
          key: c.key,
          name: c.key,
          value: c.value,
          type: "text",
          class: k(u("input")),
          onInput: (p) => e.onChange(c.key, p.target.value)
        }, null, 42, To)),
        s("div", qo, [
          s("button", {
            class: k(u("remove_button")),
            dusk: `remove-search-row-${c.key}`,
            onClick: B((p) => e.onRemove(c.key), ["prevent"])
          }, Io, 10, zo)
        ])
      ])
    ])), [
      [W, c.value !== null || a(c.key)]
    ])), 128));
  }
}, Fo = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 mr-2 text-gray-400",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    "clip-rule": "evenodd"
  })
], -1), jo = {
  __name: "TableReset",
  props: {
    onClick: {
      type: Function,
      required: !0
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    },
    ui: {
      required: !1,
      type: Object,
      default: {}
    }
  },
  setup(e) {
    const n = Pe(), l = e, o = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, a = ie("themeVariables"), t = (r) => {
      var u, i;
      return Y(
        j([r, "base"], o, (u = a == null ? void 0 : a.inertia_table) == null ? void 0 : u.reset_button, l.ui),
        j([r, "color", l.color], o, (i = a == null ? void 0 : a.inertia_table) == null ? void 0 : i.reset_button, l.ui)
      );
    };
    return (r, u) => {
      var i;
      return f(), g("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: k(t("button")),
        "aria-haspopup": "true",
        onClick: u[0] || (u[0] = B((...h) => e.onClick && e.onClick(...h), ["prevent"]))
      }, [
        Fo,
        s("span", null, y((i = A(n).reset) != null ? i : "Reset"), 1)
      ], 2);
    };
  }
}, Oo = {}, Ao = { class: "flow-root" }, Bo = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, Ro = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, Lo = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function Eo(e, n) {
  return f(), g("div", Ao, [
    s("div", Bo, [
      s("div", Ro, [
        s("div", Lo, [
          q(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Go = /* @__PURE__ */ He(Oo, [["render", Eo]]), Wo = /* @__PURE__ */ s("svg", {
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5 text-gray-400"
}, [
  /* @__PURE__ */ s("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
], -1), Do = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Uo = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    "clip-rule": "evenodd"
  })
], -1), Ho = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
    "clip-rule": "evenodd"
  })
], -1), Ko = /* @__PURE__ */ s("hr", null, null, -1), Qo = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    "clip-rule": "evenodd"
  })
], -1), Yo = /* @__PURE__ */ s("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4"
}, [
  /* @__PURE__ */ s("path", {
    d: "M5 12H19M5 12L11 6M5 12L11 18",
    stroke: "#000000",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Xo = ["dusk", "onClick"], Jo = /* @__PURE__ */ s("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4"
}, [
  /* @__PURE__ */ s("path", {
    d: "M5 12H19M5 12L11 6M5 12L11 18",
    stroke: "#000000",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Zo = { class: "px-2" }, en = { class: "divide-y divide-gray-200" }, tn = { class: "text-sm text-gray-900" }, rn = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], on = /* @__PURE__ */ s("span", { class: "sr-only" }, "Column status", -1), nn = {
  __name: "GroupedActions",
  props: {
    actions: {
      type: Object,
      required: !0
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    }
  },
  setup(e) {
    const n = Pe(), l = I(!1), o = I(!1);
    function a() {
      l.value = o.value = !1;
    }
    return (t, r) => (f(), N(ze, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: a
    }, {
      button: F(() => [
        Wo
      ]),
      default: F(() => {
        var u, i, h, c, v;
        return [
          s("div", Do, [
            L(s("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (f(), g("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[0] || (r[0] = (p) => o.value = !0)
              }, [
                Uo,
                s("span", null, y((u = A(n).add_search_fields) != null ? u : "Add search field"), 1)
              ])) : w("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (f(), g("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[1] || (r[1] = (p) => l.value = !0)
              }, [
                Ho,
                s("span", null, y((i = A(n).show_hide_columns) != null ? i : "Show / Hide columns"), 1)
              ])) : w("", !0),
              Ko,
              "reset" in e.actions ? (f(), g("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[2] || (r[2] = (...p) => {
                  var $, z;
                  return (($ = e.actions.reset) == null ? void 0 : $.onClick) && ((z = e.actions.reset) == null ? void 0 : z.onClick(...p));
                })
              }, [
                Qo,
                s("span", null, y((h = A(n).grouped_reset) != null ? h : "Reset"), 1)
              ])) : w("", !0)
            ], 512), [
              [W, !l.value && !o.value]
            ]),
            L(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[3] || (r[3] = (p) => o.value = !1)
              }, [
                Yo,
                s("span", null, y((c = A(n).add_search_fields) != null ? c : "Add search field"), 1)
              ]),
              (f(!0), g(E, null, G(e.actions.searchFields.searchInputs, (p, $) => (f(), g("button", {
                key: $,
                dusk: `add-search-row-${p.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: B((z) => e.actions.searchFields.onClick(p.key), ["prevent"])
              }, y(p.label), 9, Xo))), 128))
            ], 512), [
              [W, o.value]
            ]),
            L(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[4] || (r[4] = (p) => l.value = !1)
              }, [
                Jo,
                s("span", null, y((v = A(n).show_hide_columns) != null ? v : "Show / Hide columns"), 1)
              ]),
              s("div", Zo, [
                s("ul", en, [
                  (f(!0), g(E, null, G(e.actions.toggleColumns.columns, (p, $) => L((f(), g("li", {
                    key: $,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    s("p", tn, y(p.label), 1),
                    s("button", {
                      type: "button",
                      class: k(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !p.hidden,
                        "bg-gray-200": p.hidden
                      }]),
                      "aria-pressed": !p.hidden,
                      "aria-labelledby": `toggle-column-${p.key}`,
                      "aria-describedby": `toggle-column-${p.key}`,
                      dusk: `toggle-column-${p.key}`,
                      onClick: B((z) => e.actions.toggleColumns.onChange(p.key, p.hidden), ["prevent"])
                    }, [
                      on,
                      s("span", {
                        "aria-hidden": "true",
                        class: k([{
                          "translate-x-5": !p.hidden,
                          "translate-x-0": p.hidden
                        }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                      }, null, 2)
                    ], 10, rn)
                  ])), [
                    [W, p.can_be_hidden]
                  ])), 128))
                ])
              ])
            ], 512), [
              [W, l.value]
            ]),
            L(s("div", null, [
              q(t.$slots, "default")
            ], 512), [
              [W, !l.value && !o.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
}, ln = ["dusk"], sn = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, an = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, un = { class: "mr-2 sm:mr-4" }, cn = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, dn = { class: "min-w-full divide-y divide-gray-300" }, fn = { class: "bg-gray-50" }, hn = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900"
}, gn = ["id"], pn = { class: "divide-y divide-gray-200 bg-white" }, mn = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500"
}, bn = ["id", "onUpdate:modelValue"], vn = ["onClick"], yn = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, xn = { class: "italic text-sm px-2" }, An = {
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
    color: {
      type: String,
      default: "primary",
      required: !1
    }
  },
  emits: ["rowClicked", "selectionChanged"],
  setup(e, { emit: n }) {
    const l = n, o = e;
    Je();
    const a = I(0), t = P(() => {
      let d = Ie().props.queryBuilderProps ? { ...Ie().props.queryBuilderProps[o.name] } : {};
      return d._updates = a.value, d;
    }), r = I(t.value), u = P(() => t.value.pageName), i = I([]), h = I(null), c = I(!1), v = P(() => t.value.hasToggleableColumns || t.value.hasFilters || t.value.hasSearchInputs ? !1 : !t.value.globalSearch), p = P(() => Object.keys(o.resource).length === 0 ? o.data : "data" in o.resource ? o.resource.data : o.resource), $ = P(() => Object.keys(o.resource).length === 0 ? o.meta : "links" in o.resource && "meta" in o.resource && Object.keys(o.resource.links).length === 4 && "next" in o.resource.links && "prev" in o.resource.links ? {
      ...o.resource.meta,
      next_page_url: o.resource.links.next,
      prev_page_url: o.resource.links.prev
    } : "meta" in o.resource ? o.resource.meta : o.resource), z = P(() => p.value.length > 0 ? !0 : $.value.total > 0), S = I({
      reset: {
        onClick: ue
      },
      toggleColumns: {
        show: t.value.hasToggleableColumns,
        columns: t.value.columns,
        onChange: oe
      },
      searchFields: {
        show: t.value.hasSearchInputs,
        searchInputs: t.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: t.value.hasSearchInputsWithoutValue,
        onClick: O
      }
    });
    function V(d) {
      i.value = i.value.filter((m) => m != d), re(d, null);
    }
    function O(d) {
      i.value.push(d);
    }
    const R = P(() => {
      if (i.value.length > 0)
        return !0;
      const d = Ne.parse(location.search.substring(1));
      if (d[u.value] > 1)
        return !0;
      const b = o.name === "default" ? "" : o.name + "_";
      let _ = !1;
      return H(["filter", "columns", "cursor", "sort"], (C) => {
        const U = d[b + C];
        C === "sort" && U === t.value.defaultSort || U !== void 0 && (_ = !0);
      }), _;
    });
    function ue() {
      i.value = [], H(r.value.filters, (d, m) => {
        r.value.filters[m].value = null;
      }), H(r.value.searchInputs, (d, m) => {
        r.value.searchInputs[m].value = null;
      }), H(r.value.columns, (d, m) => {
        r.value.columns[m].hidden = d.can_be_hidden ? !t.value.defaultVisibleToggleableColumns.includes(d.key) : !1;
      }), localStorage.removeItem(`columns-${name}`), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const ce = {};
    function re(d, m) {
      clearTimeout(ce[d]), ce[d] = setTimeout(() => {
        de.value && o.preventOverlappingRequests && de.value.cancel();
        const b = D("searchInputs", d);
        r.value.searchInputs[b].value = m, r.value.cursor = null, r.value.page = 1;
      }, o.inputDebounceMs);
    }
    function pe(d) {
      re("global", d);
    }
    function me(d, m) {
      const b = D("filters", d);
      r.value.filters[b].value = m, r.value.cursor = null, r.value.page = 1;
    }
    function be(d) {
      r.value.cursor = null, r.value.perPage = d, r.value.page = 1;
    }
    function D(d, m) {
      return ut(r.value[d], (b) => b.key == m);
    }
    function oe(d, m) {
      const b = D("columns", d);
      r.value.columns[b].hidden = !m;
      const _ = r.value.columns.map((C) => ({
        key: C.key,
        hidden: C.hidden
      }));
      localStorage.setItem(`columns-${name}`, JSON.stringify(_));
    }
    function ve() {
      let d = {};
      return H(r.value.searchInputs, (m) => {
        m.value !== null && (d[m.key] = m.value);
      }), H(r.value.filters, (m) => {
        let b = m.value;
        b !== null && (m.type === "number_range" && Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) && (b = null), d[m.key] = b);
      }), d;
    }
    function M() {
      const d = r.value.columns;
      let m = it(d, (_) => !_.hidden), b = dt(m, (_) => _.key).sort();
      return ct(b, t.value.defaultVisibleToggleableColumns) ? {} : b;
    }
    function _e() {
      const d = ve(), m = M(), b = {};
      Object.keys(d).length > 0 && (b.filter = d), Object.keys(m).length > 0 && (b.columns = m);
      const _ = r.value.cursor, C = r.value.page, U = r.value.sort, Se = r.value.perPage;
      return _ && (b.cursor = _), C > 1 && (b.page = C), Se > 1 && (b.perPage = Se), U && (b.sort = U), b;
    }
    function ne(d) {
      var _, C, U;
      if (!d)
        return null;
      const m = (_ = Ie().props.queryBuilderProps[o.name].pageName) != null ? _ : "page", b = (U = (C = new URL(d)) == null ? void 0 : C.searchParams) == null ? void 0 : U.get(m);
      b !== null ? r.value.page = b : fe(d);
    }
    function Ce() {
      const d = Ne.parse(location.search.substring(1)), m = o.name === "default" ? "" : o.name + "_";
      H(["filter", "columns", "cursor", "sort"], (_) => {
        delete d[m + _];
      }), delete d[u.value], H(_e(), (_, C) => {
        C === "page" ? d[u.value] = _ : C === "perPage" ? d.perPage = _ : d[m + C] = _;
      });
      let b = Ne.stringify(d, {
        filter(_, C) {
          return typeof C == "object" && C !== null ? ft(C) : C;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!b || b === u.value + "=1") && (b = ""), b;
    }
    const X = I(!1), de = I(null);
    function fe(d) {
      !d || lt.get(
        d,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: o.preserveScroll !== !1,
          onBefore() {
            X.value = !0;
          },
          onCancelToken(m) {
            de.value = m;
          },
          onFinish() {
            X.value = !1;
          },
          onSuccess() {
            if (o.preserveScroll === "table-top") {
              const b = h.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: b });
            }
            a.value++;
          }
        }
      );
    }
    function le(d, m, b) {
      var _;
      o.hasCheckboxes && ((_ = d.target) == null ? void 0 : _.parentElement.cellIndex) === 0 || l("rowClicked", d, m, b);
    }
    qe(r, () => {
      fe(location.pathname + "?" + Ce()), c.value = !1;
    }, { deep: !0 }), qe(o.resource, () => {
      const d = o.resource.data.filter((m) => m.__itSelected);
      l("selectionChanged", d);
    }, { deep: !0 });
    const ye = () => {
      a.value++;
    };
    je(() => {
      document.addEventListener("inertia:success", ye);
      const d = localStorage.getItem(`columns-${name}`);
      if (d) {
        const m = JSON.parse(d);
        H(r.value.columns, (b, _) => {
          r.value.columns[_].hidden = m[_].hidden;
        });
      }
    }), Ze(() => {
      document.removeEventListener("inertia:success", ye);
    });
    function J(d) {
      r.value.sort == d ? r.value.sort = `-${d}` : r.value.sort = d, r.value.cursor = null, r.value.page = 1;
    }
    function Z(d) {
      const m = D("columns", d);
      return !r.value.columns[m].hidden;
    }
    function $e(d) {
      const m = D("columns", d), b = at(t.value.columns[m]);
      return b.onSort = J, b;
    }
    function Ke() {
      o.resource.data.forEach((d) => {
        d.__itSelected = c.value;
      });
    }
    const Me = P(() => o.resource.data.filter((d) => d.__itSelected).length), Qe = P(() => Me.value === 0 ? "Aucune s\xE9lection" : `${Me.value} \xE9l\xE9ment${Me.value > 1 ? "s" : ""} s\xE9lectionn\xE9${Me.value > 1 ? "s" : ""}`);
    return (d, m) => (f(), N(et, null, {
      default: F(() => [
        (f(), g("fieldset", {
          ref_key: "tableFieldset",
          ref: h,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: k(["min-w-0", { "opacity-75": X.value }])
        }, [
          s("div", sn, [
            t.value.globalSearch ? (f(), g("div", an, [
              q(d.$slots, "tableGlobalSearch", {
                hasGlobalSearch: t.value.globalSearch,
                label: t.value.globalSearch ? t.value.globalSearch.label : null,
                value: t.value.globalSearch ? t.value.globalSearch.value : null,
                onChange: pe
              }, () => [
                t.value.globalSearch ? (f(), N(Co, {
                  key: 0,
                  class: "grow",
                  label: t.value.globalSearch.label,
                  value: t.value.globalSearch.value,
                  "on-change": pe,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : w("", !0)
              ])
            ])) : w("", !0),
            s("div", un, [
              q(d.$slots, "tableFilter", {
                hasFilters: t.value.hasFilters,
                hasEnabledFilters: t.value.hasEnabledFilters,
                filters: t.value.filters,
                onFilterChange: me
              }, () => [
                t.value.hasFilters ? (f(), N(xo, {
                  key: 0,
                  "has-enabled-filters": t.value.hasEnabledFilters,
                  filters: t.value.filters,
                  "on-filter-change": me,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : w("", !0)
              ])
            ]),
            e.withGroupedMenu ? w("", !0) : q(d.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: t.value.hasSearchInputs,
              hasSearchInputsWithoutValue: t.value.hasSearchInputsWithoutValue,
              searchInputs: t.value.searchInputsWithoutGlobal,
              onAdd: O
            }, () => [
              t.value.hasSearchInputs ? (f(), N(Mr, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": t.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": t.value.hasSearchInputsWithoutValue,
                "on-add": O,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : w("", !0)
            ]),
            e.withGroupedMenu ? w("", !0) : q(d.$slots, "tableColumns", {
              key: 2,
              hasColumns: t.value.hasToggleableColumns,
              columns: t.value.columns,
              hasHiddenColumns: t.value.hasHiddenColumns,
              onChange: oe
            }, () => [
              t.value.hasToggleableColumns ? (f(), N(Fr, {
                key: 0,
                class: k({ "mr-2 sm:mr-4": R.value }),
                columns: t.value.columns,
                "has-hidden-columns": t.value.hasHiddenColumns,
                "on-change": oe,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "color"])) : w("", !0)
            ]),
            e.withGroupedMenu ? q(d.$slots, "groupedAction", {
              key: 3,
              actions: S.value
            }, () => [
              se(nn, {
                color: e.color,
                actions: S.value
              }, {
                default: F(() => [
                  q(d.$slots, "bulk-actions")
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ]) : w("", !0),
            e.withGroupedMenu ? w("", !0) : q(d.$slots, "tableReset", {
              key: 4,
              canBeReset: R.value,
              onClick: ue
            }, () => [
              R.value ? (f(), g("div", cn, [
                se(jo, {
                  "on-click": ue,
                  color: e.color
                }, null, 8, ["color"])
              ])) : w("", !0)
            ])
          ]),
          q(d.$slots, "tableSearchRows", {
            hasSearchRowsWithValue: t.value.hasSearchInputsWithValue,
            searchInputs: t.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: i.value,
            onChange: re
          }, () => [
            t.value.hasSearchInputsWithValue || i.value.length > 0 ? (f(), N(No, {
              key: 0,
              "search-inputs": t.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": i.value,
              "on-change": re,
              "on-remove": V,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : w("", !0)
          ]),
          q(d.$slots, "tableWrapper", { meta: $.value }, () => [
            se(Go, {
              class: k({ "mt-3": !v.value })
            }, {
              default: F(() => [
                q(d.$slots, "table", {}, () => [
                  s("table", dn, [
                    s("thead", fn, [
                      q(d.$slots, "head", {
                        show: Z,
                        sortBy: J,
                        header: $e
                      }, () => [
                        s("tr", null, [
                          e.hasCheckboxes ? (f(), g("th", hn, [
                            L(s("input", {
                              type: "checkbox",
                              id: `table-${e.name}-select-header`,
                              onChange: Ke,
                              "onUpdate:modelValue": m[0] || (m[0] = (b) => c.value = b),
                              class: "rounded-sm mr-1 border-gray-300 m-1"
                            }, null, 40, gn), [
                              [Ae, c.value]
                            ])
                          ])) : w("", !0),
                          (f(!0), g(E, null, G(t.value.columns, (b) => (f(), N(tr, {
                            key: `table-${e.name}-header-${b.key}`,
                            cell: $e(b.key)
                          }, {
                            label: F(() => [
                              q(d.$slots, `header(${b.key})`, {
                                label: $e(b.key).label,
                                column: $e(b.key)
                              })
                            ]),
                            _: 2
                          }, 1032, ["cell"]))), 128))
                        ])
                      ])
                    ]),
                    s("tbody", pn, [
                      q(d.$slots, "body", { show: Z }, () => [
                        (f(!0), g(E, null, G(p.value, (b, _) => (f(), g("tr", {
                          key: `table-${e.name}-row-${_}`,
                          class: k(["", {
                            "bg-gray-50": e.striped && _ % 2,
                            "hover:bg-gray-100": e.striped,
                            "hover:bg-gray-50": !e.striped
                          }])
                        }, [
                          e.hasCheckboxes ? (f(), g("td", mn, [
                            L(s("input", {
                              type: "checkbox",
                              id: `table-${e.name}-select-${_}`,
                              class: "rounded-sm m-1 border-gray-300",
                              "onUpdate:modelValue": (C) => b.__itSelected = C
                            }, null, 8, bn), [
                              [Ae, b.__itSelected]
                            ])
                          ])) : w("", !0),
                          (f(!0), g(E, null, G(t.value.columns, (C, U) => L((f(), g("td", {
                            key: `table-${e.name}-row-${_}-column-${C.key}`,
                            onClick: (Se) => le(Se, b, _),
                            class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          }, [
                            q(d.$slots, `cell(${C.key})`, { item: b }, () => [
                              Q(y(b[C.key]), 1)
                            ])
                          ], 8, vn)), [
                            [W, Z(C.key)]
                          ])), 128))
                        ], 2))), 128))
                      ])
                    ])
                  ])
                ]),
                q(d.$slots, "pagination", {
                  onClick: ne,
                  hasData: z.value,
                  meta: $.value,
                  perPageOptions: t.value.perPageOptions,
                  onPerPageChange: be
                }, () => [
                  s("div", yn, [
                    s("span", xn, y(Qe.value), 1),
                    se(kr, {
                      "on-click": ne,
                      "has-data": z.value,
                      meta: $.value,
                      "per-page-options": t.value.perPageOptions,
                      "on-per-page-change": be,
                      color: e.color
                    }, null, 8, ["has-data", "meta", "per-page-options", "color"])
                  ])
                ])
              ]),
              _: 3
            }, 8, ["class"])
          ])
        ], 10, ln))
      ]),
      _: 3
    }));
  }
};
export {
  ze as ButtonWithDropdown,
  tr as HeaderCell,
  ht as OnClickOutside,
  kr as Pagination,
  An as Table,
  Mr as TableAddSearchRow,
  Fr as TableColumns,
  xo as TableFilter,
  Co as TableGlobalSearch,
  jo as TableReset,
  No as TableSearchRows,
  Go as TableWrapper,
  Pe as getTranslations,
  jn as setTranslation,
  On as setTranslations
};
