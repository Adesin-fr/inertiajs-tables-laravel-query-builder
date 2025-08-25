import { ref as F, onMounted as me, onBeforeUnmount as gt, openBlock as d, createElementBlock as m, renderSlot as L, watch as Ce, inject as te, createBlock as B, withCtx as G, createElementVNode as n, normalizeClass as M, withModifiers as D, withDirectives as U, vShow as le, createStaticVNode as pt, normalizeStyle as ne, toDisplayString as v, createCommentVNode as k, createTextVNode as se, computed as R, unref as N, vModelSelect as Ye, vModelText as we, onUnmounted as Pe, Teleport as Fe, Fragment as K, renderList as H, createVNode as re, withKeys as Ue, nextTick as Je, resolveDynamicComponent as xe, reactive as vt, getCurrentInstance as bt, provide as yt, Transition as xt, vModelCheckbox as De, normalizeProps as wt, guardReactiveProps as kt } from "vue";
import { createPopper as Ct } from "@popperjs/core/lib/popper-lite";
import _t from "@popperjs/core/lib/modifiers/preventOverflow";
import $t from "@popperjs/core/lib/modifiers/flip";
import St from "lodash-es/uniq";
import { usePage as Ke, router as Mt } from "@inertiajs/vue3";
import zt from "lodash-es/find";
import Oe from "qs";
import qt from "lodash-es/clone";
import Tt from "lodash-es/filter";
import It from "lodash-es/findKey";
import ae from "lodash-es/forEach";
import Nt from "lodash-es/isEqual";
import Ft from "lodash-es/map";
import Pt from "lodash-es/pickBy";
const jt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const r = e, l = F(null), a = F(null);
    return me(() => {
      l.value = (o) => {
        o.target === a.value || a.value.contains(o.target) || r.do();
      }, document.addEventListener("click", l.value), document.addEventListener("touchstart", l.value);
    }), gt(() => {
      document.removeEventListener("click", l.value), document.removeEventListener("touchstart", l.value);
    }), (o, t) => (d(), m("div", {
      ref_key: "root",
      ref: a
    }, [
      L(o.$slots, "default")
    ], 512));
  }
}, Le = "-", Ot = (e) => {
  const r = At(e), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: a
  } = e;
  return {
    getClassGroupId: (i) => {
      const c = i.split(Le);
      return c[0] === "" && c.length !== 1 && c.shift(), Ze(c, r) || Rt(i);
    },
    getConflictingClassGroupIds: (i, c) => {
      const s = l[i] || [];
      return c && a[i] ? [...s, ...a[i]] : s;
    }
  };
}, Ze = (e, r) => {
  var i;
  if (e.length === 0)
    return r.classGroupId;
  const l = e[0], a = r.nextPart.get(l), o = a ? Ze(e.slice(1), a) : void 0;
  if (o)
    return o;
  if (r.validators.length === 0)
    return;
  const t = e.join(Le);
  return (i = r.validators.find(({
    validator: c
  }) => c(t))) == null ? void 0 : i.classGroupId;
}, He = /^\[(.+)\]$/, Rt = (e) => {
  if (He.test(e)) {
    const r = He.exec(e)[1], l = r == null ? void 0 : r.substring(0, r.indexOf(":"));
    if (l)
      return "arbitrary.." + l;
  }
}, At = (e) => {
  const {
    theme: r,
    prefix: l
  } = e, a = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Bt(Object.entries(e.classGroups), l).forEach(([t, i]) => {
    Ae(i, a, t, r);
  }), a;
}, Ae = (e, r, l, a) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const t = o === "" ? r : Xe(r, o);
      t.classGroupId = l;
      return;
    }
    if (typeof o == "function") {
      if (Lt(o)) {
        Ae(o(a), r, l, a);
        return;
      }
      r.validators.push({
        validator: o,
        classGroupId: l
      });
      return;
    }
    Object.entries(o).forEach(([t, i]) => {
      Ae(i, Xe(r, t), l, a);
    });
  });
}, Xe = (e, r) => {
  let l = e;
  return r.split(Le).forEach((a) => {
    l.nextPart.has(a) || l.nextPart.set(a, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), l = l.nextPart.get(a);
  }), l;
}, Lt = (e) => e.isThemeGetter, Bt = (e, r) => r ? e.map(([l, a]) => {
  const o = a.map((t) => typeof t == "string" ? r + t : typeof t == "object" ? Object.fromEntries(Object.entries(t).map(([i, c]) => [r + i, c])) : t);
  return [l, o];
}) : e, Vt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  const o = (t, i) => {
    l.set(t, i), r++, r > e && (r = 0, a = l, l = /* @__PURE__ */ new Map());
  };
  return {
    get(t) {
      let i = l.get(t);
      if (i !== void 0)
        return i;
      if ((i = a.get(t)) !== void 0)
        return o(t, i), i;
    },
    set(t, i) {
      l.has(t) ? l.set(t, i) : o(t, i);
    }
  };
}, et = "!", Et = (e) => {
  const {
    separator: r,
    experimentalParseClassName: l
  } = e, a = r.length === 1, o = r[0], t = r.length, i = (c) => {
    const s = [];
    let u = 0, f = 0, C;
    for (let g = 0; g < c.length; g++) {
      let $ = c[g];
      if (u === 0) {
        if ($ === o && (a || c.slice(g, g + t) === r)) {
          s.push(c.slice(f, g)), f = g + t;
          continue;
        }
        if ($ === "/") {
          C = g;
          continue;
        }
      }
      $ === "[" ? u++ : $ === "]" && u--;
    }
    const x = s.length === 0 ? c : c.substring(f), z = x.startsWith(et), q = z ? x.substring(1) : x, b = C && C > f ? C - f : void 0;
    return {
      modifiers: s,
      hasImportantModifier: z,
      baseClassName: q,
      maybePostfixModifierPosition: b
    };
  };
  return l ? (c) => l({
    className: c,
    parseClassName: i
  }) : i;
}, Wt = (e) => {
  if (e.length <= 1)
    return e;
  const r = [];
  let l = [];
  return e.forEach((a) => {
    a[0] === "[" ? (r.push(...l.sort(), a), l = []) : l.push(a);
  }), r.push(...l.sort()), r;
}, Gt = (e) => ({
  cache: Vt(e.cacheSize),
  parseClassName: Et(e),
  ...Ot(e)
}), Ut = /\s+/, Dt = (e, r) => {
  const {
    parseClassName: l,
    getClassGroupId: a,
    getConflictingClassGroupIds: o
  } = r, t = [], i = e.trim().split(Ut);
  let c = "";
  for (let s = i.length - 1; s >= 0; s -= 1) {
    const u = i[s], {
      modifiers: f,
      hasImportantModifier: C,
      baseClassName: x,
      maybePostfixModifierPosition: z
    } = l(u);
    let q = Boolean(z), b = a(q ? x.substring(0, z) : x);
    if (!b) {
      if (!q) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (b = a(x), !b) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      q = !1;
    }
    const g = Wt(f).join(":"), $ = C ? g + et : g, T = $ + b;
    if (t.includes(T))
      continue;
    t.push(T);
    const w = o(b, q);
    for (let O = 0; O < w.length; ++O) {
      const S = w[O];
      t.push($ + S);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Kt() {
  let e = 0, r, l, a = "";
  for (; e < arguments.length; )
    (r = arguments[e++]) && (l = tt(r)) && (a && (a += " "), a += l);
  return a;
}
const tt = (e) => {
  if (typeof e == "string")
    return e;
  let r, l = "";
  for (let a = 0; a < e.length; a++)
    e[a] && (r = tt(e[a])) && (l && (l += " "), l += r);
  return l;
};
function Ht(e, ...r) {
  let l, a, o, t = i;
  function i(s) {
    const u = r.reduce((f, C) => C(f), e());
    return l = Gt(u), a = l.cache.get, o = l.cache.set, t = c, c(s);
  }
  function c(s) {
    const u = a(s);
    if (u)
      return u;
    const f = Dt(s, l);
    return o(s, f), f;
  }
  return function() {
    return t(Kt.apply(null, arguments));
  };
}
const V = (e) => {
  const r = (l) => l[e] || [];
  return r.isThemeGetter = !0, r;
}, rt = /^\[(?:([a-z-]+):)?(.+)\]$/i, Xt = /^\d+\/\d+$/, Qt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Yt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Jt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Zt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, er = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, tr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ie = (e) => ke(e) || Qt.has(e) || Xt.test(e), fe = (e) => _e(e, "length", ur), ke = (e) => Boolean(e) && !Number.isNaN(Number(e)), Re = (e) => _e(e, "number", ke), $e = (e) => Boolean(e) && Number.isInteger(Number(e)), rr = (e) => e.endsWith("%") && ke(e.slice(0, -1)), I = (e) => rt.test(e), he = (e) => Yt.test(e), or = /* @__PURE__ */ new Set(["length", "size", "percentage"]), lr = (e) => _e(e, or, ot), nr = (e) => _e(e, "position", ot), sr = /* @__PURE__ */ new Set(["image", "url"]), ar = (e) => _e(e, sr, dr), ir = (e) => _e(e, "", cr), Se = () => !0, _e = (e, r, l) => {
  const a = rt.exec(e);
  return a ? a[1] ? typeof r == "string" ? a[1] === r : r.has(a[1]) : l(a[2]) : !1;
}, ur = (e) => Jt.test(e) && !Zt.test(e), ot = () => !1, cr = (e) => er.test(e), dr = (e) => tr.test(e), fr = () => {
  const e = V("colors"), r = V("spacing"), l = V("blur"), a = V("brightness"), o = V("borderColor"), t = V("borderRadius"), i = V("borderSpacing"), c = V("borderWidth"), s = V("contrast"), u = V("grayscale"), f = V("hueRotate"), C = V("invert"), x = V("gap"), z = V("gradientColorStops"), q = V("gradientColorStopPositions"), b = V("inset"), g = V("margin"), $ = V("opacity"), T = V("padding"), w = V("saturate"), O = V("scale"), S = V("sepia"), P = V("skew"), W = V("space"), X = V("translate"), Q = () => ["auto", "contain", "none"], ue = () => ["auto", "hidden", "clip", "visible", "scroll"], oe = () => ["auto", I, r], A = () => [I, r], ce = () => ["", ie, fe], de = () => ["auto", ke, I], ze = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], ve = () => ["solid", "dashed", "dotted", "double", "none"], qe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], be = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], pe = () => ["", "0", I], ye = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Y = () => [ke, I];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Se],
      spacing: [ie, fe],
      blur: ["none", "", he, I],
      brightness: Y(),
      borderColor: [e],
      borderRadius: ["none", "", "full", he, I],
      borderSpacing: A(),
      borderWidth: ce(),
      contrast: Y(),
      grayscale: pe(),
      hueRotate: Y(),
      invert: pe(),
      gap: A(),
      gradientColorStops: [e],
      gradientColorStopPositions: [rr, fe],
      inset: oe(),
      margin: oe(),
      opacity: Y(),
      padding: A(),
      saturate: Y(),
      scale: Y(),
      sepia: pe(),
      skew: Y(),
      space: A(),
      translate: A()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", I]
      }],
      container: ["container"],
      columns: [{
        columns: [he]
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
        object: [...ze(), I]
      }],
      overflow: [{
        overflow: ue()
      }],
      "overflow-x": [{
        "overflow-x": ue()
      }],
      "overflow-y": [{
        "overflow-y": ue()
      }],
      overscroll: [{
        overscroll: Q()
      }],
      "overscroll-x": [{
        "overscroll-x": Q()
      }],
      "overscroll-y": [{
        "overscroll-y": Q()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [b]
      }],
      "inset-x": [{
        "inset-x": [b]
      }],
      "inset-y": [{
        "inset-y": [b]
      }],
      start: [{
        start: [b]
      }],
      end: [{
        end: [b]
      }],
      top: [{
        top: [b]
      }],
      right: [{
        right: [b]
      }],
      bottom: [{
        bottom: [b]
      }],
      left: [{
        left: [b]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", $e, I]
      }],
      basis: [{
        basis: oe()
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      flex: [{
        flex: ["1", "auto", "initial", "none", I]
      }],
      grow: [{
        grow: pe()
      }],
      shrink: [{
        shrink: pe()
      }],
      order: [{
        order: ["first", "last", "none", $e, I]
      }],
      "grid-cols": [{
        "grid-cols": [Se]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", $e, I]
        }, I]
      }],
      "col-start": [{
        "col-start": de()
      }],
      "col-end": [{
        "col-end": de()
      }],
      "grid-rows": [{
        "grid-rows": [Se]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [$e, I]
        }, I]
      }],
      "row-start": [{
        "row-start": de()
      }],
      "row-end": [{
        "row-end": de()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", I]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", I]
      }],
      gap: [{
        gap: [x]
      }],
      "gap-x": [{
        "gap-x": [x]
      }],
      "gap-y": [{
        "gap-y": [x]
      }],
      "justify-content": [{
        justify: ["normal", ...be()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...be(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...be(), "baseline"]
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [T]
      }],
      px: [{
        px: [T]
      }],
      py: [{
        py: [T]
      }],
      ps: [{
        ps: [T]
      }],
      pe: [{
        pe: [T]
      }],
      pt: [{
        pt: [T]
      }],
      pr: [{
        pr: [T]
      }],
      pb: [{
        pb: [T]
      }],
      pl: [{
        pl: [T]
      }],
      m: [{
        m: [g]
      }],
      mx: [{
        mx: [g]
      }],
      my: [{
        my: [g]
      }],
      ms: [{
        ms: [g]
      }],
      me: [{
        me: [g]
      }],
      mt: [{
        mt: [g]
      }],
      mr: [{
        mr: [g]
      }],
      mb: [{
        mb: [g]
      }],
      ml: [{
        ml: [g]
      }],
      "space-x": [{
        "space-x": [W]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [W]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", I, r]
      }],
      "min-w": [{
        "min-w": [I, r, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [I, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [he]
        }, he]
      }],
      h: [{
        h: [I, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [I, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [I, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [I, r, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", he, fe]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Re]
      }],
      "font-family": [{
        font: [Se]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", I]
      }],
      "line-clamp": [{
        "line-clamp": ["none", ke, Re]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ie, I]
      }],
      "list-image": [{
        "list-image": ["none", I]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", I]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [e]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [$]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [$]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...ve(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ie, fe]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", ie, I]
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
        indent: A()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", I]
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
        content: ["none", I]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [$]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...ze(), nr]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", lr]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ar]
      }],
      "bg-color": [{
        bg: [e]
      }],
      "gradient-from-pos": [{
        from: [q]
      }],
      "gradient-via-pos": [{
        via: [q]
      }],
      "gradient-to-pos": [{
        to: [q]
      }],
      "gradient-from": [{
        from: [z]
      }],
      "gradient-via": [{
        via: [z]
      }],
      "gradient-to": [{
        to: [z]
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
        border: [c]
      }],
      "border-w-x": [{
        "border-x": [c]
      }],
      "border-w-y": [{
        "border-y": [c]
      }],
      "border-w-s": [{
        "border-s": [c]
      }],
      "border-w-e": [{
        "border-e": [c]
      }],
      "border-w-t": [{
        "border-t": [c]
      }],
      "border-w-r": [{
        "border-r": [c]
      }],
      "border-w-b": [{
        "border-b": [c]
      }],
      "border-w-l": [{
        "border-l": [c]
      }],
      "border-opacity": [{
        "border-opacity": [$]
      }],
      "border-style": [{
        border: [...ve(), "hidden"]
      }],
      "divide-x": [{
        "divide-x": [c]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [c]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [$]
      }],
      "divide-style": [{
        divide: ve()
      }],
      "border-color": [{
        border: [o]
      }],
      "border-color-x": [{
        "border-x": [o]
      }],
      "border-color-y": [{
        "border-y": [o]
      }],
      "border-color-t": [{
        "border-t": [o]
      }],
      "border-color-r": [{
        "border-r": [o]
      }],
      "border-color-b": [{
        "border-b": [o]
      }],
      "border-color-l": [{
        "border-l": [o]
      }],
      "divide-color": [{
        divide: [o]
      }],
      "outline-style": [{
        outline: ["", ...ve()]
      }],
      "outline-offset": [{
        "outline-offset": [ie, I]
      }],
      "outline-w": [{
        outline: [ie, fe]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: ce()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [$]
      }],
      "ring-offset-w": [{
        "ring-offset": [ie, fe]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", he, ir]
      }],
      "shadow-color": [{
        shadow: [Se]
      }],
      opacity: [{
        opacity: [$]
      }],
      "mix-blend": [{
        "mix-blend": [...qe(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": qe()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [l]
      }],
      brightness: [{
        brightness: [a]
      }],
      contrast: [{
        contrast: [s]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", he, I]
      }],
      grayscale: [{
        grayscale: [u]
      }],
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      invert: [{
        invert: [C]
      }],
      saturate: [{
        saturate: [w]
      }],
      sepia: [{
        sepia: [S]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [l]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [a]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [s]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [C]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [$]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [w]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [i]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [i]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", I]
      }],
      duration: [{
        duration: Y()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", I]
      }],
      delay: [{
        delay: Y()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", I]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [O]
      }],
      "scale-x": [{
        "scale-x": [O]
      }],
      "scale-y": [{
        "scale-y": [O]
      }],
      rotate: [{
        rotate: [$e, I]
      }],
      "translate-x": [{
        "translate-x": [X]
      }],
      "translate-y": [{
        "translate-y": [X]
      }],
      "skew-x": [{
        "skew-x": [P]
      }],
      "skew-y": [{
        "skew-y": [P]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", I]
      }],
      accent: [{
        accent: ["auto", e]
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", I]
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
        "scroll-m": A()
      }],
      "scroll-mx": [{
        "scroll-mx": A()
      }],
      "scroll-my": [{
        "scroll-my": A()
      }],
      "scroll-ms": [{
        "scroll-ms": A()
      }],
      "scroll-me": [{
        "scroll-me": A()
      }],
      "scroll-mt": [{
        "scroll-mt": A()
      }],
      "scroll-mr": [{
        "scroll-mr": A()
      }],
      "scroll-mb": [{
        "scroll-mb": A()
      }],
      "scroll-ml": [{
        "scroll-ml": A()
      }],
      "scroll-p": [{
        "scroll-p": A()
      }],
      "scroll-px": [{
        "scroll-px": A()
      }],
      "scroll-py": [{
        "scroll-py": A()
      }],
      "scroll-ps": [{
        "scroll-ps": A()
      }],
      "scroll-pe": [{
        "scroll-pe": A()
      }],
      "scroll-pt": [{
        "scroll-pt": A()
      }],
      "scroll-pr": [{
        "scroll-pr": A()
      }],
      "scroll-pb": [{
        "scroll-pb": A()
      }],
      "scroll-pl": [{
        "scroll-pl": A()
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
        "will-change": ["auto", "scroll", "contents", "transform", I]
      }],
      fill: [{
        fill: [e, "none"]
      }],
      "stroke-w": [{
        stroke: [ie, fe, Re]
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
}, Z = /* @__PURE__ */ Ht(fr);
function E(e, r, l, a) {
  let o = r ? { ...r } : {}, t = null, i = l ? { ...l } : {}, c = null, s = a ? { ...a } : {}, u = null;
  for (const f of e)
    t === null && f in o && (o = o[f], typeof o == "string" && (t = o)), c === null && f in i && (i = i[f], typeof i == "string" && (c = i)), u === null && f in s && (s = s[f], typeof s == "string" && (u = s));
  return Z(t, c, u);
}
const hr = { class: "relative" }, mr = ["dusk", "disabled"], gr = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, je = {
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
  setup(e, { expose: r, emit: l }) {
    const a = l, o = e, t = F(!1), i = F(null);
    function c() {
      t.value = !t.value;
    }
    function s() {
      t.value = !1;
    }
    Ce(t, () => {
      i.value.update(), t.value || a("closed"), t.value && a("opened");
    });
    const u = F(null), f = F(null);
    me(() => {
      i.value = Ct(u.value, f.value, {
        placement: o.placement,
        modifiers: [$t, _t]
      });
    }), r({ hide: s });
    const C = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, x = te("themeVariables"), z = (q) => {
      var g, $;
      let b = "";
      return q === "button" && o.disabled && (b = "cursor-not-allowed"), Z(
        b,
        E([q, "base"], C, (g = x == null ? void 0 : x.inertia_table) == null ? void 0 : g.button_with_dropdown, o.ui),
        E([q, "color", o.color], C, ($ = x == null ? void 0 : x.inertia_table) == null ? void 0 : $.button_with_dropdown, o.ui)
      );
    };
    return (q, b) => (d(), B(jt, { do: s }, {
      default: G(() => [
        n("div", hr, [
          n("button", {
            ref_key: "button",
            ref: u,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: M(z("button")),
            "aria-haspopup": "true",
            onClick: D(c, ["prevent"])
          }, [
            L(q.$slots, "button")
          ], 10, mr),
          U(n("div", {
            ref_key: "tooltip",
            ref: f,
            class: "absolute z-10"
          }, [
            n("div", gr, [
              L(q.$slots, "default")
            ])
          ], 512), [
            [le, t.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const Me = (e, r) => {
  const l = e.__vccOpts || e;
  for (const [a, o] of r)
    l[a] = o;
  return l;
}, pr = {
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
    const r = e, l = (a) => {
      r.onResize(a, r.columnKey);
    };
    return (a, o) => (d(), m("div", {
      class: M(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: l
    }, o[0] || (o[0] = [
      pt('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ]), 34));
  }
}, vr = /* @__PURE__ */ Me(pr, [["__scopeId", "data-v-672a9339"]]), br = { class: "w-full flex gap-2 justify-between items-center" }, yr = { class: "relative inline-flex items-center cursor-pointer" }, xr = ["checked"], lt = {
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
    const r = e, l = {
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
    }, a = te("themeVariables"), o = (t) => {
      var c, s, u, f;
      let i = r.color;
      return t === "toggle" && r.filter.value === null && (i = "disabled"), Z(
        E([t, "base"], l, (s = (c = a == null ? void 0 : a.inertia_table) == null ? void 0 : c.table_filter) == null ? void 0 : s.toggle_filter, r.ui),
        E([t, "color", i], l, (f = (u = a == null ? void 0 : a.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : f.toggle_filter, r.ui)
      );
    };
    return (t, i) => (d(), m("div", br, [
      n("label", yr, [
        n("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: i[0] || (i[0] = (c) => e.onFilterChange(e.filter.key, c.target.checked ? "1" : "0"))
        }, null, 40, xr),
        n("div", {
          class: M(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", o("toggle")])
        }, null, 2)
      ]),
      n("button", {
        class: M(o("reset_button")),
        onClick: i[1] || (i[1] = D((c) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, i[2] || (i[2] = [
        n("span", { class: "sr-only" }, "Remove search", -1),
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5",
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
      ]), 2)
    ]));
  }
}, wr = {
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
      const r = this.getTheme("button"), l = /h-(\d+)/, a = r.match(l), o = 4;
      let t = null;
      return a && 1 in a ? t = a[1] : t = o, e ? `margin-top: ${(t - o + 12) * 0.25}rem` : `margin-top: -${((t - o) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(e) {
      return e < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : e > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : e;
    },
    detectIfOverlap() {
      let e = this.$refs.popover_min.getClientRects()[0], r = this.$refs.popover_max.getClientRects()[0];
      e && r && (this.hasOverlap = e.right > r.left);
    },
    handleMouseDown(e, r) {
      this.moveMin = r, this.moveMax = !r, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      let a = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), o = Number(Math.round(a / this.step) * this.step).toFixed(2);
      o >= this.min && o <= this.max && (this.moveMin && o !== this.currentMinValue && o <= this.currentMaxValue && (this.internalValue = [o, this.currentMaxValue]), this.moveMax && o !== this.currentMaxValue && o >= this.currentMinValue && (this.internalValue = [this.currentMinValue, o])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var r, l, a, o, t, i;
      return Z(
        E([e, "base"], this.fallbackTheme, (a = (l = (r = this.themeVariables) == null ? void 0 : r.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : a.number_range_filter, this.ui),
        E([e, "color", this.color], this.fallbackTheme, (i = (t = (o = this.themeVariables) == null ? void 0 : o.inertia_table) == null ? void 0 : t.table_filter) == null ? void 0 : i.number_range_filter, this.ui)
      );
    }
  }
}, kr = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, Cr = { class: "py-1 relative min-w-full" }, _r = { class: "z-40" }, $r = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Sr = { key: 0 }, Mr = { key: 1 }, zr = { class: "z-40" }, qr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Tr = { key: 0 }, Ir = { key: 1 }, Nr = { draggable: "true" }, Fr = { key: 0 }, Pr = { key: 1 }, jr = { key: 0 }, Or = { key: 1 };
function Rr(e, r, l, a, o, t) {
  var i, c, s, u;
  return d(), m("div", kr, [
    n("div", Cr, [
      n("div", {
        class: M(t.getTheme("main_bar"))
      }, [
        n("div", {
          class: M(["absolute", t.getTheme("selected_bar")]),
          style: ne(`width: ${t.rangeWidth}% !important; left: ${t.currentMinValueInPercent}% !important;`)
        }, null, 6),
        n("div", {
          class: M([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ne(`left: ${t.currentMinValueInPercent}%;`),
          onMousedown: r[0] || (r[0] = (f) => t.handleMouseDown(f, !0))
        }, [
          n("div", _r, [
            n("div", $r, [
              n("div", {
                class: M(t.getTheme("popover")),
                style: ne(t.getMarginTop(o.hasOverlap && t.displayFirstDown))
              }, [
                l.prefix ? (d(), m("span", Sr, v(l.prefix), 1)) : k("", !0),
                se(" " + v((i = t.currentMinValue) != null ? i : 0) + " ", 1),
                l.suffix ? (d(), m("span", Mr, v(l.suffix), 1)) : k("", !0)
              ], 6),
              (d(), m("svg", {
                class: M(["absolute w-full h-2 left-0", [o.hasOverlap && t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, r[2] || (r[2] = [
                n("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ]), 2))
            ], 512)
          ])
        ], 38),
        n("div", {
          class: M([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ne(`left: ${t.currentMaxValueInPercent}%;`),
          onMousedown: r[1] || (r[1] = (f) => t.handleMouseDown(f, !1))
        }, [
          n("div", zr, [
            n("div", qr, [
              n("div", {
                class: M(t.getTheme("popover")),
                style: ne(t.getMarginTop(o.hasOverlap && !t.displayFirstDown))
              }, [
                l.prefix ? (d(), m("span", Tr, v(l.prefix), 1)) : k("", !0),
                se(" " + v((c = t.currentMaxValue) != null ? c : 0) + " ", 1),
                l.suffix ? (d(), m("span", Ir, v(l.suffix), 1)) : k("", !0)
              ], 6),
              n("div", Nr, [
                (d(), m("svg", {
                  class: M(["absolute w-full h-2 left-0 top-100", [o.hasOverlap && !t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, r[3] || (r[3] = [
                  n("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ]), 2))
              ])
            ], 512)
          ])
        ], 38),
        n("div", {
          class: M(["absolute -ml-1 bottom-0 left-0 -mb-6", t.getTheme("text")])
        }, [
          l.prefix ? (d(), m("span", Fr, v(l.prefix), 1)) : k("", !0),
          se(" " + v((s = l.min) != null ? s : 0) + " ", 1),
          l.suffix ? (d(), m("span", Pr, v(l.suffix), 1)) : k("", !0)
        ], 2),
        n("div", {
          class: M(["absolute -mr-1 bottom-0 right-0 -mb-6", t.getTheme("text")])
        }, [
          l.prefix ? (d(), m("span", jr, v(l.prefix), 1)) : k("", !0),
          se(" " + v((u = l.max) != null ? u : 0) + " ", 1),
          l.suffix ? (d(), m("span", Or, v(l.suffix), 1)) : k("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const nt = /* @__PURE__ */ Me(wr, [["render", Rr]]), Be = {
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
    reset_filter: "Reset filter"
  }
};
function ge() {
  return Be.translations;
}
function Dn(e, r) {
  Be.translations[e] = r;
}
function Kn(e) {
  Be.translations = e;
}
const Ar = { class: "space-y-2" }, Lr = { class: "block text-sm font-medium text-gray-700 mb-2" }, Br = { value: "" }, Vr = { value: "exact" }, Er = { value: "before" }, Wr = { value: "after" }, Gr = { value: "between" }, Ur = {
  key: 0,
  class: "space-y-3"
}, Dr = { key: 0 }, Kr = { class: "block text-sm font-medium text-gray-700 mb-1" }, Hr = {
  key: 1,
  class: "space-y-3"
}, Xr = { class: "block text-sm font-medium text-gray-700 mb-1" }, Qr = { class: "block text-sm font-medium text-gray-700 mb-1" }, Yr = {
  key: 1,
  class: "flex justify-end"
}, Jr = { class: "sr-only" }, st = {
  __name: "DateFilter",
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
    const r = e, l = ge(), a = F(""), o = F(""), t = F(""), i = F(""), c = R(() => a.value !== "" && (a.value !== "between" && o.value || a.value === "between" && t.value && i.value));
    function s() {
      switch (a.value) {
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
    function u() {
      o.value = "", t.value = "", i.value = "", a.value === "" ? C() : f();
    }
    function f() {
      if (a.value === "")
        return;
      let b = null;
      switch (a.value) {
        case "exact":
        case "before":
        case "after":
          o.value && (b = {
            type: a.value,
            date: o.value
          });
          break;
        case "between":
          t.value && i.value && (b = {
            type: a.value,
            start_date: t.value,
            end_date: i.value
          });
          break;
      }
      r.onFilterChange(r.filter.key, b);
    }
    function C() {
      a.value = "", o.value = "", t.value = "", i.value = "", r.onFilterChange(r.filter.key, null);
    }
    me(() => {
      if (r.filter.value) {
        const b = r.filter.value;
        b.type && (a.value = b.type, b.type === "between" ? (t.value = b.start_date || "", i.value = b.end_date || "") : o.value = b.date || "");
      }
    }), Ce(() => r.filter.value, (b) => {
      b ? b.type && (a.value = b.type, b.type === "between" ? (t.value = b.start_date || "", i.value = b.end_date || "") : o.value = b.date || "") : C();
    }, { deep: !0 });
    const x = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      },
      input: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      },
      reset_button: {
        base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
          dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500"
        }
      }
    }, z = te("themeVariables"), q = (b) => {
      var g, $, T, w;
      return Z(
        E([b, "base"], x, ($ = (g = z == null ? void 0 : z.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : $.date_filter, r.ui),
        E([b, "color", r.color], x, (w = (T = z == null ? void 0 : z.inertia_table) == null ? void 0 : T.table_filter) == null ? void 0 : w.date_filter, r.ui)
      );
    };
    return (b, g) => (d(), m("div", Ar, [
      n("div", null, [
        n("label", Lr, v(N(l).filter_type), 1),
        U(n("select", {
          "onUpdate:modelValue": g[0] || (g[0] = ($) => a.value = $),
          class: M(q("select")),
          onChange: u
        }, [
          n("option", Br, v(N(l).no_filter), 1),
          n("option", Vr, v(N(l).exact_date), 1),
          n("option", Er, v(N(l).before_date), 1),
          n("option", Wr, v(N(l).after_date), 1),
          n("option", Gr, v(N(l).date_range), 1)
        ], 34), [
          [Ye, a.value]
        ])
      ]),
      a.value && a.value !== "" ? (d(), m("div", Ur, [
        ["exact", "before", "after"].includes(a.value) ? (d(), m("div", Dr, [
          n("label", Kr, v(s()), 1),
          U(n("input", {
            type: "date",
            "onUpdate:modelValue": g[1] || (g[1] = ($) => o.value = $),
            class: M(q("input")),
            onChange: f
          }, null, 34), [
            [we, o.value]
          ])
        ])) : k("", !0),
        a.value === "between" ? (d(), m("div", Hr, [
          n("div", null, [
            n("label", Xr, v(N(l).start_date), 1),
            U(n("input", {
              type: "date",
              "onUpdate:modelValue": g[2] || (g[2] = ($) => t.value = $),
              class: M(q("input")),
              onChange: f
            }, null, 34), [
              [we, t.value]
            ])
          ]),
          n("div", null, [
            n("label", Qr, v(N(l).end_date), 1),
            U(n("input", {
              type: "date",
              "onUpdate:modelValue": g[3] || (g[3] = ($) => i.value = $),
              class: M(q("input")),
              onChange: f
            }, null, 34), [
              [we, i.value]
            ])
          ])
        ])) : k("", !0)
      ])) : k("", !0),
      c.value ? (d(), m("div", Yr, [
        n("button", {
          type: "button",
          class: M(q("reset_button")),
          onClick: C
        }, [
          n("span", Jr, v(N(l).reset_filter), 1),
          g[4] || (g[4] = n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
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
        ], 2)
      ])) : k("", !0)
    ]));
  }
}, Zr = { class: "relative inline-block" }, eo = ["dusk"], to = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, ro = { class: "p-2" }, oo = ["name", "value", "onChange"], lo = ["value"], no = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, so = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, ao = {
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
    const r = e, l = F(!1), a = F(null), o = F(null), t = F({ top: 0, left: 0 }), i = R(() => r.filters.filter((w) => w.key === r.columnKey || w.key.startsWith(r.columnKey + "_") || w.key.includes(r.columnKey))), c = R(() => i.value.some((w) => !x(w))), s = R(() => ({
      top: t.value.top + "px",
      left: t.value.left + "px"
    }));
    function u() {
      i.value.length > 0 && (l.value || f(), l.value = !l.value);
    }
    function f() {
      if (o.value) {
        const w = o.value.getBoundingClientRect();
        t.value = {
          top: w.bottom + window.scrollY + 4,
          left: w.right + window.scrollX - 300
        };
      }
    }
    function C() {
      l.value = !1;
    }
    function x(w) {
      if (w.value === null)
        return !0;
      switch (w.type) {
        case "number_range":
          return Number(Math.max(...w.value)) === Number(w.max) && Number(Math.min(...w.value)) === Number(w.min);
        case "select":
          return w.value === "";
        case "toggle":
          return !1;
        case "date":
          return !w.value || typeof w.value == "object" && !w.value.type;
        default:
          return !w.value;
      }
    }
    function z(w, O) {
      r.onFilterChange(w, O);
    }
    function q(w) {
      let O = w.value;
      w.value && (Number(Math.max(...w.value)) === Number(w.max) && Number(Math.min(...w.value)) === Number(w.min) ? O = null : Number(Math.min(...w.value)) === 0 && Number(Math.max(...w.value)) === 0 && (O = ["0", "0"])), r.onFilterChange(w.key, O);
    }
    const b = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, g = te("themeVariables"), $ = (w) => {
      var O, S, P, W;
      return Z(
        E([w, "base"], b, (S = (O = g == null ? void 0 : g.inertia_table) == null ? void 0 : O.table_filter) == null ? void 0 : S.select_filter, r.ui),
        E([w, "color", r.color], b, (W = (P = g == null ? void 0 : g.inertia_table) == null ? void 0 : P.table_filter) == null ? void 0 : W.select_filter, r.ui)
      );
    };
    function T(w) {
      a.value && !a.value.contains(w.target) && !w.target.closest(`[dusk="column-filter-${r.columnKey}"]`) && C();
    }
    return me(() => {
      document.addEventListener("click", T);
    }), Pe(() => {
      document.removeEventListener("click", T);
    }), (w, O) => (d(), m("div", Zr, [
      n("button", {
        ref_key: "buttonRef",
        ref: o,
        onClick: u,
        class: M([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": c.value,
            "text-gray-400 hover:text-gray-600": !c.value
          }
        ]),
        dusk: `column-filter-${e.columnKey}`
      }, O[1] || (O[1] = [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ]), 10, eo),
      (d(), B(Fe, { to: "body" }, [
        l.value ? (d(), m("div", {
          key: 0,
          ref_key: "dropdown",
          ref: a,
          class: "fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          style: ne(s.value),
          onClick: O[0] || (O[0] = D(() => {
          }, ["stop"]))
        }, [
          (d(!0), m(K, null, H(i.value, (S) => (d(), m("div", {
            key: S.key
          }, [
            n("h3", to, v(S.label), 1),
            n("div", ro, [
              S.type === "select" ? (d(), m("select", {
                key: 0,
                name: S.key,
                value: S.value,
                class: M($("select")),
                onChange: (P) => z(S.key, P.target.value)
              }, [
                (d(!0), m(K, null, H(S.options, (P, W) => (d(), m("option", {
                  key: W,
                  value: W
                }, v(P), 9, lo))), 128))
              ], 42, oo)) : k("", !0),
              S.type === "toggle" ? (d(), B(lt, {
                key: 1,
                filter: S,
                "on-filter-change": z,
                color: e.color
              }, null, 8, ["filter", "color"])) : k("", !0),
              S.type === "number_range" ? (d(), m("div", no, [
                re(nt, {
                  modelValue: S.value,
                  "onUpdate:modelValue": [(P) => S.value = P, (P) => q(S)],
                  max: S.max,
                  min: S.min,
                  prefix: S.prefix,
                  suffix: S.suffix,
                  step: S.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : k("", !0),
              S.type === "date" ? (d(), m("div", so, [
                re(st, {
                  filter: S,
                  "on-filter-change": z,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : k("", !0)
            ])
          ]))), 128))
        ], 4)) : k("", !0)
      ])),
      (d(), B(Fe, { to: "body" }, [
        l.value ? (d(), m("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: C
        })) : k("", !0)
      ]))
    ]));
  }
}, io = { class: "relative inline-block" }, uo = ["dusk"], co = { class: "p-3" }, fo = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, ho = { class: "space-y-2" }, mo = ["value", "placeholder"], go = {
  key: 0,
  class: "flex justify-end"
}, po = { class: "sr-only" }, vo = {
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
    const r = e, l = ge(), a = F(!1), o = F(null), t = F(null), i = F(null), c = F({ top: 0, left: 0 }), s = R(() => r.searchInputs.find((S) => S.key === r.columnKey)), u = R(() => s.value && s.value.value || ""), f = R(() => u.value !== ""), C = R(() => ({
      top: c.value.top + "px",
      left: c.value.left + "px"
    }));
    async function x() {
      s.value && (a.value || z(), a.value = !a.value, a.value && (await Je(), i.value && i.value.focus()));
    }
    function z() {
      if (t.value) {
        const S = t.value.getBoundingClientRect();
        c.value = {
          top: S.bottom + window.scrollY + 4,
          left: S.right + window.scrollX - 250
        };
      }
    }
    function q() {
      a.value = !1;
    }
    function b(S) {
      const P = S.target.value;
      g(P);
    }
    function g(S) {
      r.onSearchChange(r.columnKey, S);
    }
    const $ = {
      input: {
        base: "block w-full shadow-sm text-sm rounded-md min-w-[200px]",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      },
      reset_button: {
        base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
          dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500"
        }
      }
    }, T = te("themeVariables"), w = (S) => {
      var P, W, X, Q;
      return Z(
        E([S, "base"], $, (W = (P = T == null ? void 0 : T.inertia_table) == null ? void 0 : P.table_search) == null ? void 0 : W.column_search, r.ui),
        E([S, "color", r.color], $, (Q = (X = T == null ? void 0 : T.inertia_table) == null ? void 0 : X.table_search) == null ? void 0 : Q.column_search, r.ui)
      );
    };
    function O(S) {
      o.value && !o.value.contains(S.target) && !S.target.closest(`[dusk="column-search-${r.columnKey}"]`) && q();
    }
    return me(() => {
      document.addEventListener("click", O);
    }), Pe(() => {
      document.removeEventListener("click", O);
    }), (S, P) => (d(), m("div", io, [
      n("button", {
        ref_key: "buttonRef",
        ref: t,
        onClick: x,
        class: M([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": f.value,
            "text-gray-400 hover:text-gray-600": !f.value
          }
        ]),
        dusk: `column-search-${e.columnKey}`
      }, P[2] || (P[2] = [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ]), 10, uo),
      (d(), B(Fe, { to: "body" }, [
        a.value ? (d(), m("div", {
          key: 0,
          ref_key: "dropdown",
          ref: o,
          class: "fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          style: ne(C.value),
          onClick: P[1] || (P[1] = D(() => {
          }, ["stop"]))
        }, [
          n("div", co, [
            n("h3", fo, v(N(l).search) + " " + v(e.columnLabel), 1),
            n("div", ho, [
              n("input", {
                ref_key: "searchInput",
                ref: i,
                type: "text",
                value: u.value,
                class: M(w("input")),
                placeholder: `${N(l).search} ${e.columnLabel.toLowerCase()}...`,
                onInput: b,
                onKeydown: [
                  Ue(q, ["enter"]),
                  Ue(q, ["escape"])
                ]
              }, null, 42, mo),
              u.value && u.value !== "" ? (d(), m("div", go, [
                n("button", {
                  type: "button",
                  class: M(w("reset_button")),
                  onClick: P[0] || (P[0] = (W) => g(""))
                }, [
                  n("span", po, v(N(l).reset), 1),
                  P[3] || (P[3] = n("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
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
                ], 2)
              ])) : k("", !0)
            ])
          ])
        ], 4)) : k("", !0)
      ])),
      (d(), B(Fe, { to: "body" }, [
        a.value ? (d(), m("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: q
        })) : k("", !0)
      ]))
    ]));
  }
};
const bo = ["data-column-key"], yo = { class: "flex flex-row items-center justify-between w-full" }, xo = { class: "flex flex-row items-center" }, wo = { class: "uppercase" }, ko = ["sorted"], Co = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, _o = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, $o = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, So = { class: "flex items-center space-x-1" }, Mo = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const r = e, l = te("columnResize", null), a = R(() => {
      if (!l)
        return "auto";
      const s = l.getColumnWidth(r.cell.key);
      return s === "auto" ? s : `${s}px`;
    }), o = R(() => (l == null ? void 0 : l.isResizing) || !1), t = R(() => (l == null ? void 0 : l.resizingColumn) || null);
    function i() {
      r.cell.sortable && r.cell.onSort(r.cell.key);
    }
    function c(s, u) {
      l && l.startResize(s, u);
    }
    return (s, u) => U((d(), m("th", {
      class: M(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: ne({ width: a.value }),
      "data-column-key": e.cell.key
    }, [
      (d(), B(xe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: D(i, ["prevent"])
      }, {
        default: G(() => [
          n("span", yo, [
            n("span", xo, [
              L(s.$slots, "label", {}, () => [
                n("span", wo, v(e.cell.label), 1)
              ], !0),
              L(s.$slots, "sort", {}, () => [
                e.cell.sortable ? (d(), m("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: M(["w-3 h-3 ml-2", {
                    "text-gray-400": !e.cell.sorted,
                    "text-green-500": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? k("", !0) : (d(), m("path", Co)),
                  e.cell.sorted === "asc" ? (d(), m("path", _o)) : k("", !0),
                  e.cell.sorted === "desc" ? (d(), m("path", $o)) : k("", !0)
                ], 10, ko)) : k("", !0)
              ], !0)
            ]),
            n("span", So, [
              L(s.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (d(), B(vo, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  color: e.cell.color,
                  onClick: u[0] || (u[0] = D(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : k("", !0)
              ], !0),
              L(s.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (d(), B(ao, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  color: e.cell.color,
                  onClick: u[1] || (u[1] = D(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : k("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && N(l) ? (d(), B(vr, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": c,
        "is-active": o.value && t.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : k("", !0)
    ], 14, bo)), [
      [le, !e.cell.hidden]
    ]);
  }
}, zo = /* @__PURE__ */ Me(Mo, [["__scopeId", "data-v-8684dc95"]]), qo = ["dusk", "value"], To = ["value"], Qe = {
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
    const r = ge(), l = e, a = R(() => {
      let c = [...l.options];
      return c.push(parseInt(l.value)), St(c).sort((s, u) => s - u);
    }), o = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, t = te("themeVariables"), i = (c) => {
      var s, u;
      return Z(
        E([c, "base"], o, (s = t == null ? void 0 : t.inertia_table) == null ? void 0 : s.per_page_selector, l.ui),
        E([c, "color", l.color], o, (u = t == null ? void 0 : t.inertia_table) == null ? void 0 : u.per_page_selector, l.ui)
      );
    };
    return (c, s) => (d(), m("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: M(i("select")),
      onChange: s[0] || (s[0] = (u) => e.onChange(u.target.value))
    }, [
      (d(!0), m(K, null, H(a.value, (u) => (d(), m("option", {
        key: u,
        value: u
      }, v(u) + " " + v(N(r).per_page), 9, To))), 128))
    ], 42, qo));
  }
}, Io = {
  key: 0,
  class: "bg-white flex items-center"
}, No = { key: 0 }, Fo = { class: "hidden sm:inline ml-2" }, Po = { class: "hidden sm:inline mr-2" }, jo = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, Oo = { class: "flex flex-row space-x-4 items-center grow" }, Ro = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, Ao = { class: "font-medium" }, Lo = { class: "font-medium" }, Bo = { class: "font-medium" }, Vo = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, Eo = { class: "sr-only" }, Wo = { class: "sr-only" }, Go = {
  key: 0,
  class: "ml-4"
}, Uo = ["href"], Do = {
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
    const r = ge(), l = e, a = R(() => "links" in t.value ? t.value.links.length > 0 : !1), o = R(() => Object.keys(t.value).length > 0), t = R(() => l.meta), i = R(() => "prev_page_url" in t.value ? t.value.prev_page_url : null), c = R(() => "next_page_url" in t.value ? t.value.next_page_url : null), s = R(() => parseInt(t.value.per_page));
    return (u, f) => o.value ? (d(), m("nav", Io, [
      !e.hasData || t.value.total < 1 ? (d(), m("p", No, v(N(r).no_results_found), 1)) : k("", !0),
      e.hasData ? (d(), m("div", {
        key: 1,
        class: M(["flex-1 flex justify-between", { "sm:hidden": a.value }])
      }, [
        (d(), B(xe(i.value ? "a" : "div"), {
          class: M([{
            "cursor-not-allowed text-gray-400": !i.value,
            "text-gray-700 hover:text-gray-500": i.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: i.value,
          dusk: i.value ? "pagination-simple-previous" : null,
          onClick: f[0] || (f[0] = D((C) => e.onClick(i.value), ["prevent"]))
        }, {
          default: G(() => [
            f[4] || (f[4] = n("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
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
            n("span", Fo, v(N(r).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        re(Qe, {
          dusk: "per-page-mobile",
          value: s.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (d(), B(xe(c.value ? "a" : "div"), {
          class: M([{
            "cursor-not-allowed text-gray-400": !c.value,
            "text-gray-700 hover:text-gray-500": c.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: c.value,
          dusk: c.value ? "pagination-simple-next" : null,
          onClick: f[1] || (f[1] = D((C) => e.onClick(c.value), ["prevent"]))
        }, {
          default: G(() => [
            n("span", Po, v(N(r).next), 1),
            f[5] || (f[5] = n("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
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
      ], 2)) : k("", !0),
      e.hasData && a.value ? (d(), m("div", jo, [
        n("div", Oo, [
          re(Qe, {
            dusk: "per-page-full",
            value: s.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          n("p", Ro, [
            n("span", Ao, v(t.value.from), 1),
            se(" " + v(N(r).to) + " ", 1),
            n("span", Lo, v(t.value.to), 1),
            se(" " + v(N(r).of) + " ", 1),
            n("span", Bo, v(t.value.total), 1),
            se(" " + v(N(r).results), 1)
          ])
        ]),
        n("div", null, [
          n("nav", Vo, [
            (d(), B(xe(i.value ? "a" : "div"), {
              class: M([{
                "cursor-not-allowed text-gray-400": !i.value,
                "text-gray-500 hover:bg-gray-50": i.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: i.value,
              dusk: i.value ? "pagination-previous" : null,
              onClick: f[2] || (f[2] = D((C) => e.onClick(i.value), ["prevent"]))
            }, {
              default: G(() => [
                n("span", Eo, v(N(r).previous), 1),
                f[6] || (f[6] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
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
            (d(!0), m(K, null, H(t.value.links, (C, x) => (d(), m("div", { key: x }, [
              L(u.$slots, "link", {}, () => [
                !isNaN(C.label) || C.label === "..." ? (d(), B(xe(C.url ? "a" : "div"), {
                  key: 0,
                  href: C.url,
                  dusk: C.url ? `pagination-${C.label}` : null,
                  class: M(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !C.url,
                    "hover:bg-gray-50": C.url,
                    "bg-white": !C.active,
                    "bg-gray-100": C.active
                  }]),
                  onClick: D((z) => e.onClick(C.url), ["prevent"])
                }, {
                  default: G(() => [
                    se(v(C.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : k("", !0)
              ])
            ]))), 128)),
            (d(), B(xe(c.value ? "a" : "div"), {
              class: M([{
                "cursor-not-allowed text-gray-400": !c.value,
                "text-gray-500 hover:bg-gray-50": c.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: c.value,
              dusk: c.value ? "pagination-next" : null,
              onClick: f[3] || (f[3] = D((C) => e.onClick(c.value), ["prevent"]))
            }, {
              default: G(() => [
                n("span", Wo, v(N(r).next), 1),
                f[7] || (f[7] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
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
        ]),
        e.showExportButton ? (d(), m("div", Go, [
          L(u.$slots, "exportButton", {
            exportUrl: e.exportUrl,
            translations: N(r)
          }, () => [
            n("a", {
              href: e.exportUrl,
              class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, [
              f[8] || (f[8] = n("svg", {
                class: "h-4 w-4 mr-2",
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
              ], -1)),
              se(" " + v(N(r).export_csv), 1)
            ], 8, Uo)
          ])
        ])) : k("", !0)
      ])) : k("", !0)
    ])) : k("", !0);
  }
}, Ko = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, Ho = ["dusk", "onClick"], Xo = {
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
    const r = e, l = F(null);
    function a(o) {
      r.onAdd(o), l.value.hide();
    }
    return (o, t) => (d(), B(je, {
      ref_key: "dropdown",
      ref: l,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: G(() => t[0] || (t[0] = [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])),
      default: G(() => [
        n("div", Ko, [
          (d(!0), m(K, null, H(e.searchInputs, (i, c) => (d(), m("button", {
            key: c,
            dusk: `add-search-row-${i.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: D((s) => a(i.key), ["prevent"])
          }, v(i.label), 9, Ho))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, Qo = {
  key: 0,
  class: "ml-1"
}, Yo = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, Jo = { class: "px-2" }, Zo = { class: "divide-y divide-gray-200" }, el = { class: "text-sm text-gray-900" }, tl = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], rl = {
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
    const r = e, l = R(() => r.columns.filter((a) => a.hidden).length);
    return (a, o) => (d(), B(je, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: G(() => [
        o[0] || (o[0] = n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
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
        e.hasHiddenColumns ? (d(), m("span", Qo, "(" + v(l.value) + ")", 1)) : k("", !0)
      ]),
      default: G(() => [
        n("div", Yo, [
          n("div", Jo, [
            n("ul", Zo, [
              (d(!0), m(K, null, H(r.columns, (t, i) => U((d(), m("li", {
                key: i,
                class: "py-2 flex items-center justify-between"
              }, [
                n("p", el, v(t.label), 1),
                n("button", {
                  type: "button",
                  class: M(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                    "bg-green-500": !t.hidden,
                    "bg-gray-200": t.hidden
                  }]),
                  "aria-pressed": !t.hidden,
                  "aria-labelledby": `toggle-column-${t.key}`,
                  "aria-describedby": `toggle-column-${t.key}`,
                  dusk: `toggle-column-${t.key}`,
                  onClick: D((c) => e.onChange(t.key, t.hidden), ["prevent"])
                }, [
                  o[1] || (o[1] = n("span", { class: "sr-only" }, "Column status", -1)),
                  n("span", {
                    "aria-hidden": "true",
                    class: M([{
                      "translate-x-5": !t.hidden,
                      "translate-x-0": t.hidden
                    }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                  }, null, 2)
                ], 10, tl)
              ])), [
                [le, t.can_be_hidden]
              ])), 128))
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, ol = { class: "space-y-4" }, ll = { class: "block text-sm font-medium text-gray-700 mb-2" }, nl = { value: "" }, sl = { value: "exact" }, al = { value: "less_than" }, il = { value: "greater_than" }, ul = { value: "less_than_or_equal" }, cl = { value: "greater_than_or_equal" }, dl = { value: "between" }, fl = {
  key: 0,
  class: "space-y-3"
}, hl = { key: 0 }, ml = { class: "block text-sm font-medium text-gray-700 mb-1" }, gl = { class: "flex items-center" }, pl = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, vl = ["step"], bl = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, yl = {
  key: 1,
  class: "space-y-3"
}, xl = { class: "block text-sm font-medium text-gray-700 mb-1" }, wl = { class: "flex items-center" }, kl = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, Cl = ["step"], _l = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, $l = { class: "block text-sm font-medium text-gray-700 mb-1" }, Sl = { class: "flex items-center" }, Ml = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, zl = ["step"], ql = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Tl = {
  key: 1,
  class: "flex justify-end"
}, Il = { class: "sr-only" }, Nl = {
  __name: "NumberFilter",
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
    const r = e, l = ge(), a = F(""), o = F(""), t = F(""), i = F(""), c = R(() => a.value !== "" && (a.value !== "between" && o.value !== "" && o.value !== null || a.value === "between" && t.value !== "" && t.value !== null && i.value !== "" && i.value !== null));
    function s() {
      switch (a.value) {
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
    function u() {
      o.value = "", t.value = "", i.value = "", a.value === "" ? C() : f();
    }
    function f() {
      if (a.value === "")
        return;
      let b = null;
      switch (a.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          o.value !== "" && o.value !== null && (b = {
            type: a.value,
            number: o.value
          });
          break;
        case "between":
          t.value !== "" && t.value !== null && i.value !== "" && i.value !== null && (b = {
            type: a.value,
            start_number: t.value,
            end_number: i.value
          });
          break;
      }
      r.onFilterChange(r.filter.key, b);
    }
    function C() {
      a.value = "", o.value = "", t.value = "", i.value = "", r.onFilterChange(r.filter.key, null);
    }
    me(() => {
      if (r.filter.value) {
        const b = r.filter.value;
        b.type && (a.value = b.type, b.type === "between" ? (t.value = b.start_number || "", i.value = b.end_number || "") : o.value = b.number || "");
      }
    }), Ce(() => r.filter.value, (b) => {
      b ? b.type && (a.value = b.type, b.type === "between" ? (t.value = b.start_number || "", i.value = b.end_number || "") : o.value = b.number || "") : C();
    }, { deep: !0 });
    const x = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      },
      input: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      },
      reset_button: {
        base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
          dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500"
        }
      }
    }, z = te("themeVariables"), q = (b) => {
      var g, $, T, w;
      return Z(
        E([b, "base"], x, ($ = (g = z == null ? void 0 : z.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : $.number_filter, r.ui),
        E([b, "color", r.color], x, (w = (T = z == null ? void 0 : z.inertia_table) == null ? void 0 : T.table_filter) == null ? void 0 : w.number_filter, r.ui)
      );
    };
    return (b, g) => (d(), m("div", ol, [
      n("div", null, [
        n("label", ll, v(N(l).filter_type), 1),
        U(n("select", {
          "onUpdate:modelValue": g[0] || (g[0] = ($) => a.value = $),
          class: M(q("select")),
          onChange: u
        }, [
          n("option", nl, v(N(l).no_filter), 1),
          n("option", sl, v(N(l).exact_number), 1),
          n("option", al, v(N(l).less_than), 1),
          n("option", il, v(N(l).greater_than), 1),
          n("option", ul, v(N(l).less_than_or_equal), 1),
          n("option", cl, v(N(l).greater_than_or_equal), 1),
          n("option", dl, v(N(l).number_range), 1)
        ], 34), [
          [Ye, a.value]
        ])
      ]),
      a.value && a.value !== "" ? (d(), m("div", fl, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(a.value) ? (d(), m("div", hl, [
          n("label", ml, v(s()), 1),
          n("div", gl, [
            e.filter.prefix ? (d(), m("span", pl, v(e.filter.prefix), 1)) : k("", !0),
            U(n("input", {
              type: "number",
              "onUpdate:modelValue": g[1] || (g[1] = ($) => o.value = $),
              step: e.filter.step || 1,
              class: M(q("input")),
              onInput: f,
              placeholder: "0"
            }, null, 42, vl), [
              [
                we,
                o.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (d(), m("span", bl, v(e.filter.suffix), 1)) : k("", !0)
          ])
        ])) : k("", !0),
        a.value === "between" ? (d(), m("div", yl, [
          n("div", null, [
            n("label", xl, v(N(l).start_number), 1),
            n("div", wl, [
              e.filter.prefix ? (d(), m("span", kl, v(e.filter.prefix), 1)) : k("", !0),
              U(n("input", {
                type: "number",
                "onUpdate:modelValue": g[2] || (g[2] = ($) => t.value = $),
                step: e.filter.step || 1,
                class: M(q("input")),
                onInput: f,
                placeholder: "0"
              }, null, 42, Cl), [
                [
                  we,
                  t.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (d(), m("span", _l, v(e.filter.suffix), 1)) : k("", !0)
            ])
          ]),
          n("div", null, [
            n("label", $l, v(N(l).end_number), 1),
            n("div", Sl, [
              e.filter.prefix ? (d(), m("span", Ml, v(e.filter.prefix), 1)) : k("", !0),
              U(n("input", {
                type: "number",
                "onUpdate:modelValue": g[3] || (g[3] = ($) => i.value = $),
                step: e.filter.step || 1,
                class: M(q("input")),
                onInput: f,
                placeholder: "0"
              }, null, 42, zl), [
                [
                  we,
                  i.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (d(), m("span", ql, v(e.filter.suffix), 1)) : k("", !0)
            ])
          ])
        ])) : k("", !0)
      ])) : k("", !0),
      c.value ? (d(), m("div", Tl, [
        n("button", {
          type: "button",
          class: M(q("reset_button")),
          onClick: C
        }, [
          n("span", Il, v(N(l).reset_filter), 1),
          g[4] || (g[4] = n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
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
        ], 2)
      ])) : k("", !0)
    ]));
  }
}, Fl = {
  key: 0,
  class: "ml-1"
}, Pl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, jl = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Ol = { class: "p-2" }, Rl = ["name", "value", "onChange"], Al = ["value"], Ll = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Bl = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Vl = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, El = {
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
    const r = e;
    F(null);
    const l = R(() => r.filters.filter((s) => !a(s)).length);
    function a(s) {
      if (s.value === null)
        return !0;
      switch (s.type) {
        case "number_range":
          return Number(Math.max(...s.value)) === Number(s.max) && Number(Math.min(...s.value)) === Number(s.min);
        case "select":
          return s.value === "";
        case "toggle":
          return !1;
        case "date":
          return !s.value || typeof s.value == "object" && !s.value.type;
        case "number":
          return !s.value || typeof s.value == "object" && !s.value.type;
        default:
          return !s.value;
      }
    }
    function o(s) {
      let u = s.value;
      s.value && (Number(Math.max(...s.value)) === Number(s.max) && Number(Math.min(...s.value)) === Number(s.min) ? u = null : Number(Math.min(...s.value)) === 0 && Number(Math.max(...s.value)) === 0 && (u = ["0", "0"])), r.onFilterChange(s.key, u);
    }
    const t = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, i = te("themeVariables"), c = (s) => {
      var u, f, C, x;
      return Z(
        E([s, "base"], t, (f = (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : f.select_filter, r.ui),
        E([s, "color", r.color], t, (x = (C = i == null ? void 0 : i.inertia_table) == null ? void 0 : C.table_filter) == null ? void 0 : x.select_filter, r.ui)
      );
    };
    return (s, u) => (d(), B(je, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: G(() => [
        u[0] || (u[0] = n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        e.hasEnabledFilters ? (d(), m("span", Fl, "(" + v(l.value) + ")", 1)) : k("", !0)
      ]),
      default: G(() => [
        n("div", Pl, [
          (d(!0), m(K, null, H(e.filters, (f, C) => (d(), m("div", { key: C }, [
            n("h3", jl, v(f.label), 1),
            n("div", Ol, [
              f.type === "select" ? (d(), m("select", {
                key: 0,
                name: f.key,
                value: f.value,
                class: M(c("select", e.color)),
                onChange: (x) => e.onFilterChange(f.key, x.target.value)
              }, [
                (d(!0), m(K, null, H(f.options, (x, z) => (d(), m("option", {
                  key: z,
                  value: z
                }, v(x), 9, Al))), 128))
              ], 42, Rl)) : k("", !0),
              f.type === "toggle" ? (d(), B(lt, {
                key: 1,
                filter: f,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : k("", !0),
              f.type === "number_range" ? (d(), m("div", Ll, [
                re(nt, {
                  modelValue: f.value,
                  "onUpdate:modelValue": [(x) => f.value = x, (x) => o(f)],
                  max: f.max,
                  min: f.min,
                  prefix: f.prefix,
                  suffix: f.suffix,
                  step: f.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : k("", !0),
              f.type === "date" ? (d(), m("div", Bl, [
                re(st, {
                  filter: f,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : k("", !0),
              f.type === "number" ? (d(), m("div", Vl, [
                re(Nl, {
                  filter: f,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : k("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, Wl = { class: "relative" }, Gl = ["placeholder", "value"], Ul = {
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
    const r = e, l = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, a = te("themeVariables"), o = (t) => {
      var i, c;
      return Z(
        E([t, "base"], l, (i = a == null ? void 0 : a.inertia_table) == null ? void 0 : i.global_search, r.ui),
        E([t, "color", r.color], l, (c = a == null ? void 0 : a.inertia_table) == null ? void 0 : c.global_search, r.ui)
      );
    };
    return (t, i) => (d(), m("div", Wl, [
      n("input", {
        class: M(o("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: i[0] || (i[0] = (c) => e.onChange(c.target.value))
      }, null, 42, Gl),
      i[1] || (i[1] = n("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
        n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
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
}, Dl = { class: "flex rounded-md shadow-sm relative mt-3" }, Kl = ["for"], Hl = ["id", "name", "value", "onInput"], Xl = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Ql = ["dusk", "onClick"], Yl = {
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
    const r = { el: F([]) };
    let l = R(() => r.el.value);
    const a = e;
    function o(s) {
      return a.forcedVisibleSearchInputs.includes(s);
    }
    Ce(a.forcedVisibleSearchInputs, (s) => {
      const u = s.length > 0 ? s[s.length - 1] : null;
      !u || Je().then(() => {
        const f = zt(l.value, (C) => C.name === u);
        f && f.focus();
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
    }, i = te("themeVariables"), c = (s) => {
      var u, f;
      return Z(
        E([s, "base"], t, (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_search_rows, a.ui),
        E([s, "color", a.color], t, (f = i == null ? void 0 : i.inertia_table) == null ? void 0 : f.table_search_rows, a.ui)
      );
    };
    return (s, u) => (d(!0), m(K, null, H(e.searchInputs, (f, C) => U((d(), m("div", {
      key: C,
      class: "px-4 sm:px-0"
    }, [
      n("div", Dl, [
        n("label", {
          for: f.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          u[0] || (u[0] = n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-5 w-5 mr-2 text-gray-400",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, [
            n("path", {
              "fill-rule": "evenodd",
              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
              "clip-rule": "evenodd"
            })
          ], -1)),
          n("span", null, v(f.label), 1)
        ], 8, Kl),
        (d(), m("input", {
          id: f.key,
          ref_for: !0,
          ref: r.el,
          key: f.key,
          name: f.key,
          value: f.value,
          type: "text",
          class: M(c("input")),
          onInput: (x) => e.onChange(f.key, x.target.value)
        }, null, 42, Hl)),
        n("div", Xl, [
          n("button", {
            class: M(c("remove_button")),
            dusk: `remove-search-row-${f.key}`,
            onClick: D((x) => e.onRemove(f.key), ["prevent"])
          }, u[1] || (u[1] = [
            n("span", { class: "sr-only" }, "Remove search", -1),
            n("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5",
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
          ]), 10, Ql)
        ])
      ])
    ])), [
      [le, f.value !== null || o(f.key)]
    ])), 128));
  }
}, Jl = {
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
    const r = ge(), l = e, a = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, o = te("themeVariables"), t = (i) => {
      var c, s;
      return Z(
        E([i, "base"], a, (c = o == null ? void 0 : o.inertia_table) == null ? void 0 : c.reset_button, l.ui),
        E([i, "color", l.color], a, (s = o == null ? void 0 : o.inertia_table) == null ? void 0 : s.reset_button, l.ui)
      );
    };
    return (i, c) => {
      var s;
      return d(), m("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: M(t("button")),
        "aria-haspopup": "true",
        onClick: c[0] || (c[0] = D((...u) => e.onClick && e.onClick(...u), ["prevent"]))
      }, [
        c[1] || (c[1] = n("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 mr-2 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          n("path", {
            "fill-rule": "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        n("span", null, v((s = N(r).reset) != null ? s : "Reset"), 1)
      ], 2);
    };
  }
}, Zl = {}, en = { class: "flow-root" }, tn = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, rn = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, on = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function ln(e, r) {
  return d(), m("div", en, [
    n("div", tn, [
      n("div", rn, [
        n("div", on, [
          L(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const nn = /* @__PURE__ */ Me(Zl, [["render", ln]]), sn = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, an = ["dusk", "onClick"], un = { class: "px-2" }, cn = { class: "divide-y divide-gray-200" }, dn = { class: "text-sm text-gray-900" }, fn = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], hn = {
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
    const r = ge(), l = F(!1), a = F(!1);
    function o() {
      l.value = a.value = !1;
    }
    return (t, i) => (d(), B(je, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: o
    }, {
      button: G(() => i[5] || (i[5] = [
        n("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          n("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])),
      default: G(() => {
        var c, s, u, f, C;
        return [
          n("div", sn, [
            U(n("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (d(), m("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: i[0] || (i[0] = (x) => a.value = !0)
              }, [
                i[6] || (i[6] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", {
                    "fill-rule": "evenodd",
                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                n("span", null, v((c = N(r).add_search_fields) != null ? c : "Add search field"), 1)
              ])) : k("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (d(), m("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: i[1] || (i[1] = (x) => l.value = !0)
              }, [
                i[7] || (i[7] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
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
                n("span", null, v((s = N(r).show_hide_columns) != null ? s : "Show / Hide columns"), 1)
              ])) : k("", !0),
              i[9] || (i[9] = n("hr", null, null, -1)),
              "reset" in e.actions ? (d(), m("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: i[2] || (i[2] = (...x) => {
                  var z, q;
                  return ((z = e.actions.reset) == null ? void 0 : z.onClick) && ((q = e.actions.reset) == null ? void 0 : q.onClick(...x));
                })
              }, [
                i[8] || (i[8] = n("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  n("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                n("span", null, v((u = N(r).grouped_reset) != null ? u : "Reset"), 1)
              ])) : k("", !0)
            ], 512), [
              [le, !l.value && !a.value]
            ]),
            U(n("div", null, [
              n("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: i[3] || (i[3] = (x) => a.value = !1)
              }, [
                i[10] || (i[10] = n("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  n("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                n("span", null, v((f = N(r).add_search_fields) != null ? f : "Add search field"), 1)
              ]),
              (d(!0), m(K, null, H(e.actions.searchFields.searchInputs, (x, z) => (d(), m("button", {
                key: z,
                dusk: `add-search-row-${x.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: D((q) => e.actions.searchFields.onClick(x.key), ["prevent"])
              }, v(x.label), 9, an))), 128))
            ], 512), [
              [le, a.value]
            ]),
            U(n("div", null, [
              n("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: i[4] || (i[4] = (x) => l.value = !1)
              }, [
                i[11] || (i[11] = n("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  n("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                n("span", null, v((C = N(r).show_hide_columns) != null ? C : "Show / Hide columns"), 1)
              ]),
              n("div", un, [
                n("ul", cn, [
                  (d(!0), m(K, null, H(e.actions.toggleColumns.columns, (x, z) => U((d(), m("li", {
                    key: z,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    n("p", dn, v(x.label), 1),
                    n("button", {
                      type: "button",
                      class: M(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !x.hidden,
                        "bg-gray-200": x.hidden
                      }]),
                      "aria-pressed": !x.hidden,
                      "aria-labelledby": `toggle-column-${x.key}`,
                      "aria-describedby": `toggle-column-${x.key}`,
                      dusk: `toggle-column-${x.key}`,
                      onClick: D((q) => e.actions.toggleColumns.onChange(x.key, x.hidden), ["prevent"])
                    }, [
                      i[12] || (i[12] = n("span", { class: "sr-only" }, "Column status", -1)),
                      n("span", {
                        "aria-hidden": "true",
                        class: M([{
                          "translate-x-5": !x.hidden,
                          "translate-x-0": x.hidden
                        }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                      }, null, 2)
                    ], 10, fn)
                  ])), [
                    [le, x.can_be_hidden]
                  ])), 128))
                ])
              ])
            ], 512), [
              [le, l.value]
            ]),
            U(n("div", null, [
              L(t.$slots, "default")
            ], 512), [
              [le, !l.value && !a.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function mn(e) {
  const r = F(!1), l = F(null), a = F(0), o = F(0), t = vt({}), i = () => {
    if (e === "default")
      return;
    const g = localStorage.getItem(`table-column-widths-${e}`);
    if (g)
      try {
        const $ = JSON.parse(g);
        Object.assign(t, $);
      } catch ($) {
        console.warn("Unable to load column widths:", $);
      }
  }, c = () => {
    e !== "default" && localStorage.setItem(`table-column-widths-${e}`, JSON.stringify(t));
  }, s = (g, $) => {
    g.preventDefault(), g.stopPropagation(), r.value = !0, l.value = $, a.value = g.clientX;
    const T = g.target.closest("th");
    o.value = T.offsetWidth;
    const w = T.closest("table");
    w && w.querySelectorAll("thead th[data-column-key]").forEach((S) => {
      const P = S.getAttribute("data-column-key"), W = S.offsetWidth;
      t[P] || (t[P] = W), S.style.width = `${t[P]}px`;
      const X = Array.from(S.parentNode.children).indexOf(S);
      w.querySelectorAll("tbody tr").forEach((ue) => {
        const oe = ue.children[X];
        oe && (oe.style.width = `${t[P]}px`);
      });
    }), document.addEventListener("mousemove", u), document.addEventListener("mouseup", f), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, u = (g) => {
    if (!r.value || !l.value)
      return;
    const $ = g.clientX - a.value, T = Math.max(50, o.value + $);
    t[l.value] = T;
    const w = document.querySelector(`th[data-column-key="${l.value}"]`);
    if (w) {
      w.style.width = `${T}px`;
      const O = w.closest("table");
      if (O) {
        const S = Array.from(w.parentNode.children).indexOf(w);
        O.querySelectorAll("tbody tr").forEach((W) => {
          const X = W.children[S];
          X && (X.style.width = `${T}px`);
        });
      }
    }
  }, f = () => {
    r.value && (r.value = !1, l.value = null, c(), document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", f), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, C = (g) => t[g] || "auto", x = (g, $) => {
    t[g] = $, c();
  }, z = (g) => {
    if (!g)
      return;
    g.querySelectorAll("thead th[data-column-key]").forEach((T) => {
      const w = T.getAttribute("data-column-key");
      if (!t[w]) {
        const P = T.offsetWidth;
        t[w] = Math.max(P, 100);
      }
      T.style.width = `${t[w]}px`;
      const O = Array.from(T.parentNode.children).indexOf(T);
      g.querySelectorAll("tbody tr").forEach((P) => {
        const W = P.children[O];
        W && (W.style.width = `${t[w]}px`);
      });
    });
  }, q = () => {
    Object.keys(t).forEach((g) => {
      delete t[g];
    }), e !== "default" && localStorage.removeItem(`table-column-widths-${e}`);
  }, b = () => {
    r.value && (document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", f), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return me(() => {
    i();
  }), Pe(() => {
    b();
  }), {
    isResizing: r,
    resizingColumn: l,
    columnWidths: t,
    startResize: s,
    getColumnWidth: C,
    setColumnWidth: x,
    resetColumnWidths: q,
    loadColumnWidths: i,
    saveColumnWidths: c,
    initializeColumnWidths: z
  };
}
const gn = ["dusk"], pn = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, vn = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, bn = { class: "mr-2 sm:mr-4" }, yn = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, xn = { class: "overflow-x-auto" }, wn = { class: "bg-gray-50" }, kn = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border",
  style: { width: "60px" }
}, Cn = ["id"], _n = { class: "divide-y divide-gray-200 bg-white" }, $n = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500",
  style: { width: "60px" }
}, Sn = ["id", "onUpdate:modelValue"], Mn = ["onClick", "data-column-key"], zn = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, qn = {
  key: 0,
  class: "italic text-sm px-2"
}, Tn = {
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
    }
  },
  emits: ["rowClicked", "selectionChanged"],
  setup(e, { emit: r }) {
    const l = ge(), a = r, o = e;
    bt();
    const t = o.resizeableColumns ? mn(o.name) : null;
    yt("columnResize", t);
    const i = F(!1), c = F(0), s = R(() => {
      let h = Ke().props.queryBuilderProps ? { ...Ke().props.queryBuilderProps[o.name] } : {};
      return h._updates = c.value, h;
    }), u = F(s.value), f = R(() => s.value.pageName), C = F([]), x = F(null), z = F(!1), q = R(() => s.value.hasToggleableColumns || s.value.hasFilters || s.value.hasSearchInputs ? !1 : !s.value.globalSearch), b = R(() => Object.keys(o.resource).length === 0 ? o.data : "data" in o.resource ? o.resource.data : o.resource), g = R(() => Object.keys(o.resource).length === 0 ? o.meta : "links" in o.resource && "meta" in o.resource && Object.keys(o.resource.links).length === 4 && "next" in o.resource.links && "prev" in o.resource.links ? {
      ...o.resource.meta,
      next_page_url: o.resource.links.next,
      prev_page_url: o.resource.links.prev
    } : "meta" in o.resource ? o.resource.meta : o.resource), $ = R(() => b.value.length > 0 ? !0 : g.value.total > 0), T = F({
      reset: {
        onClick: W
      },
      toggleColumns: {
        show: s.value.hasToggleableColumns,
        columns: s.value.columns,
        onChange: de
      },
      searchFields: {
        show: s.value.hasSearchInputs && !o.hideSearchInputsAboveTable,
        searchInputs: s.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
        onClick: O
      }
    });
    function w(h) {
      C.value = C.value.filter((p) => p != h), Q(h, null);
    }
    function O(h) {
      C.value.push(h);
    }
    const S = R(() => {
      if (C.value.length > 0)
        return !0;
      const h = Oe.parse(location.search.substring(1));
      if (h[f.value] > 1)
        return !0;
      const y = o.name === "default" ? "" : o.name + "_";
      let j = !1;
      return ae(["filter", "columns", "cursor", "sort"], (_) => {
        const J = h[y + _];
        _ === "sort" && J === s.value.defaultSort || J !== void 0 && (j = !0);
      }), j;
    }), P = R(() => {
      if (!o.showExportButton)
        return null;
      const h = new URL(window.location.href);
      h.search = "";
      const p = new URLSearchParams();
      if (s.value.page && s.value.page > 1 && p.set(f.value, s.value.page), s.value.sort) {
        const _ = o.name === "default" ? "sort" : `${o.name}_sort`;
        p.set(_, s.value.sort);
      }
      const y = {};
      if (u.value.filters.forEach((_) => {
        _.value !== null && _.value !== void 0 && _.value !== "" && (y[_.key] = _.value);
      }), u.value.searchInputs.forEach((_) => {
        _.value !== null && _.value !== void 0 && _.value !== "" && (y[_.key] = _.value);
      }), Object.keys(y).length > 0) {
        const _ = o.name === "default" ? "filter" : `${o.name}_filter`;
        Object.keys(y).forEach((J) => {
          const ee = y[J];
          Array.isArray(ee) ? ee.forEach((Ne, mt) => {
            p.set(`${_}[${J}][${mt}]`, Ne);
          }) : typeof ee == "object" && ee !== null ? Object.keys(ee).forEach((Ne) => {
            p.set(`${_}[${J}][${Ne}]`, ee[Ne]);
          }) : p.set(`${_}[${J}]`, ee);
        });
      }
      const j = u.value.columns.filter((_) => !_.hidden).map((_) => _.key);
      if (j.length !== u.value.columns.length) {
        const _ = o.name === "default" ? "columns" : `${o.name}_columns`;
        j.forEach((J) => {
          p.append(`${_}[]`, J);
        });
      }
      if (s.value.perPageOptions && s.value.perPageOptions.length > 0) {
        const _ = new URLSearchParams(window.location.search).get("perPage") || s.value.perPageOptions[0];
        _ && _ !== s.value.perPageOptions[0] && p.set("perPage", _);
      }
      return p.set("do_export", "1"), p.set("table", o.name || "default"), h.search = p.toString(), h.toString();
    });
    function W() {
      C.value = [], ae(u.value.filters, (h, p) => {
        u.value.filters[p].value = null;
      }), ae(u.value.searchInputs, (h, p) => {
        u.value.searchInputs[p].value = null;
      }), ae(u.value.columns, (h, p) => {
        u.value.columns[p].hidden = h.can_be_hidden ? !s.value.defaultVisibleToggleableColumns.includes(h.key) : !1;
      }), localStorage.removeItem(`columns-${o.name}`), o.resizeableColumns && t && t.resetColumnWidths(), u.value.sort = null, u.value.cursor = null, u.value.page = 1;
    }
    const X = {};
    function Q(h, p) {
      clearTimeout(X[h]), X[h] = setTimeout(() => {
        Y.value && o.preventOverlappingRequests && Y.value.cancel();
        const y = ce("searchInputs", h);
        u.value.searchInputs[y].value = p, u.value.cursor = null, u.value.page = 1;
      }, o.inputDebounceMs);
    }
    function ue(h) {
      Q("global", h);
    }
    function oe(h, p) {
      const y = ce("filters", h);
      u.value.filters[y].value = p, u.value.cursor = null, u.value.page = 1;
    }
    function A(h) {
      u.value.cursor = null, u.value.perPage = h, u.value.page = 1;
    }
    function ce(h, p) {
      return It(u.value[h], (y) => y.key == p);
    }
    function de(h, p) {
      const y = ce("columns", h);
      u.value.columns[y].hidden = !p;
      const j = u.value.columns.map((_) => ({
        key: _.key,
        hidden: _.hidden
      }));
      localStorage.setItem(`columns-${o.name}`, JSON.stringify(j));
    }
    function ze() {
      let h = {};
      return ae(u.value.searchInputs, (p) => {
        p.value !== null && (h[p.key] = p.value);
      }), ae(u.value.filters, (p) => {
        let y = p.value;
        y !== null && (p.type === "number_range" && Number(Math.max(...p.value)) === Number(p.max) && Number(Math.min(...p.value)) === Number(p.min) && (y = null), h[p.key] = y);
      }), h;
    }
    function ve() {
      const h = u.value.columns;
      let p = Tt(h, (j) => !j.hidden), y = Ft(p, (j) => j.key).sort();
      return Nt(y, s.value.defaultVisibleToggleableColumns) ? {} : y;
    }
    function qe() {
      const h = ze(), p = ve(), y = {};
      Object.keys(h).length > 0 && (y.filter = h), Object.keys(p).length > 0 && (y.columns = p);
      const j = u.value.cursor, _ = u.value.page, J = u.value.sort, ee = u.value.perPage;
      return j && (y.cursor = j), _ > 1 && (y.page = _), ee > 1 && (y.perPage = ee), J && (y.sort = J), y;
    }
    function be(h) {
      if (!h)
        return null;
      Ve(h);
    }
    function pe() {
      const h = Oe.parse(location.search.substring(1)), p = o.name === "default" ? "" : o.name + "_";
      ae(["filter", "columns", "cursor", "sort"], (j) => {
        delete h[p + j];
      }), delete h[f.value], ae(qe(), (j, _) => {
        _ === "page" ? h[f.value] = j : _ === "perPage" ? h.perPage = j : h[p + _] = j;
      });
      let y = Oe.stringify(h, {
        filter(j, _) {
          return typeof _ == "object" && _ !== null ? Pt(_) : _;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!y || y === f.value + "=1") && (y = ""), y;
    }
    const ye = F(!1), Y = F(null);
    function Ve(h) {
      !h || Mt.get(
        h,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: o.preserveScroll !== !1,
          onBefore() {
            ye.value = !0;
          },
          onCancelToken(p) {
            Y.value = p;
          },
          onFinish() {
            ye.value = !1;
          },
          onSuccess() {
            if (o.preserveScroll === "table-top") {
              const y = x.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: y });
            }
            c.value++;
          }
        }
      );
    }
    function at(h, p, y) {
      var j;
      o.hasCheckboxes && ((j = h.target) == null ? void 0 : j.parentElement.cellIndex) === 0 || a("rowClicked", h, p, y);
    }
    Ce(u, () => {
      Ve(location.pathname + "?" + pe()), z.value = !1;
    }, { deep: !0 }), Ce(o.resource, () => {
      const h = o.resource.data.filter((p) => p.__itSelected);
      a("selectionChanged", h);
    }, { deep: !0 });
    const Ee = () => {
      c.value++, o.resizeableColumns && t && setTimeout(() => {
        var p;
        const h = (p = x.value) == null ? void 0 : p.querySelector("table");
        h && t.initializeColumnWidths(h);
      }, 0);
    };
    me(() => {
      document.addEventListener("inertia:success", Ee);
      const h = localStorage.getItem(`columns-${o.name}`);
      if (h) {
        const p = JSON.parse(h);
        ae(u.value.columns, (y, j) => {
          u.value.columns[j].hidden = p[j].hidden;
        });
      }
      o.resizeableColumns && t && setTimeout(() => {
        var y;
        const p = (y = x.value) == null ? void 0 : y.querySelector("table");
        p && t.initializeColumnWidths(p);
      }, 0);
    }), Pe(() => {
      document.removeEventListener("inertia:success", Ee);
    });
    function We(h) {
      u.value.sort == h ? u.value.sort = `-${h}` : u.value.sort = h, u.value.cursor = null, u.value.page = 1;
    }
    function Te(h) {
      const p = ce("columns", h);
      return !u.value.columns[p].hidden;
    }
    function Ie(h) {
      const p = ce("columns", h), y = qt(s.value.columns[p]);
      y.onSort = We, y.filters = s.value.filters.filter(
        (_) => _.key === h || _.key.startsWith(h + "_") || _.key.includes(h)
      );
      const j = s.value.searchInputs.filter(
        (_) => _.key === h
      );
      return j.length > 0 ? (y.searchable = !0, y.searchInputs = j) : (y.searchable = !1, y.searchInputs = []), y.onFilterChange = oe, y.onSearchChange = Q, y.color = o.color, y;
    }
    function it() {
      o.resource.data.forEach((h) => {
        h.__itSelected = z.value;
      });
    }
    function ut(h) {
      if (!o.resizeableColumns || !t)
        return "auto";
      const p = t.getColumnWidth(h);
      return p === "auto" ? p : `${p}px`;
    }
    const ct = R(() => {
      if (!o.resizeableColumns || !t)
        return "100%";
      let h = 0, p = !1;
      return o.hasCheckboxes && (h += 60), s.value.columns.forEach((y) => {
        if (!Te(y.key))
          return;
        const j = t.getColumnWidth(y.key);
        j === "auto" ? p = !0 : h += j;
      }), !p && h > 0 ? `${h}px` : "max(100%, " + (h > 0 ? h + "px" : "800px") + ")";
    }), Ge = R(() => o.resource.data.filter((h) => h.__itSelected).length), dt = R(() => Ge.value === 0 ? l.noLineSelected : `${Ge.value} ${l.lineSelected}`);
    function ft() {
      o.resizeableColumns && (i.value = !0);
    }
    function ht() {
      o.resizeableColumns && setTimeout(() => {
        i.value = !1;
      }, 100);
    }
    return (h, p) => (d(), B(xt, null, {
      default: G(() => [
        (d(), m("fieldset", {
          ref_key: "tableFieldset",
          ref: x,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: M(["min-w-0", { "opacity-75": ye.value }])
        }, [
          n("div", pn, [
            s.value.globalSearch ? (d(), m("div", vn, [
              L(h.$slots, "tableGlobalSearch", {
                hasGlobalSearch: s.value.globalSearch,
                label: s.value.globalSearch ? s.value.globalSearch.label : null,
                value: s.value.globalSearch ? s.value.globalSearch.value : null,
                onChange: ue
              }, () => [
                s.value.globalSearch ? (d(), B(Ul, {
                  key: 0,
                  class: "grow",
                  label: s.value.globalSearch.label,
                  value: s.value.globalSearch.value,
                  "on-change": ue,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : k("", !0)
              ], !0)
            ])) : k("", !0),
            n("div", bn, [
              L(h.$slots, "tableFilter", {
                hasFilters: s.value.hasFilters,
                hasEnabledFilters: s.value.hasEnabledFilters,
                filters: s.value.filters,
                onFilterChange: oe
              }, () => [
                s.value.hasFilters ? (d(), B(El, {
                  key: 0,
                  "has-enabled-filters": s.value.hasEnabledFilters,
                  filters: s.value.filters,
                  "on-filter-change": oe,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : k("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? L(h.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: s.value.hasSearchInputs,
              hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
              searchInputs: s.value.searchInputsWithoutGlobal,
              onAdd: O
            }, () => [
              s.value.hasSearchInputs ? (d(), B(Xo, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": s.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": s.value.hasSearchInputsWithoutValue,
                "on-add": O,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : k("", !0)
            ], !0) : k("", !0),
            e.withGroupedMenu ? k("", !0) : L(h.$slots, "tableColumns", {
              key: 2,
              hasColumns: s.value.hasToggleableColumns,
              columns: s.value.columns,
              hasHiddenColumns: s.value.hasHiddenColumns,
              onChange: de
            }, () => [
              s.value.hasToggleableColumns ? (d(), B(rl, {
                key: 0,
                class: M({ "mr-2 sm:mr-4": S.value }),
                columns: s.value.columns,
                "has-hidden-columns": s.value.hasHiddenColumns,
                "on-change": de,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "color"])) : k("", !0)
            ], !0),
            e.withGroupedMenu ? L(h.$slots, "groupedAction", {
              key: 3,
              actions: T.value
            }, () => [
              re(hn, {
                color: e.color,
                actions: T.value
              }, {
                default: G(() => [
                  L(h.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : k("", !0),
            e.withGroupedMenu ? k("", !0) : L(h.$slots, "tableReset", {
              key: 4,
              canBeReset: S.value,
              onClick: W
            }, () => [
              S.value ? (d(), m("div", yn, [
                re(Jl, {
                  "on-click": W,
                  color: e.color
                }, null, 8, ["color"])
              ])) : k("", !0)
            ], !0)
          ]),
          e.hideSearchInputsAboveTable ? k("", !0) : L(h.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: s.value.hasSearchInputsWithValue,
            searchInputs: s.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: C.value,
            onChange: Q
          }, () => [
            s.value.hasSearchInputsWithValue || C.value.length > 0 ? (d(), B(Yl, {
              key: 0,
              "search-inputs": s.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": C.value,
              "on-change": Q,
              "on-remove": w,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : k("", !0)
          ], !0),
          L(h.$slots, "tableWrapper", { meta: g.value }, () => [
            re(nn, {
              class: M({ "mt-3": !q.value })
            }, {
              default: G(() => [
                L(h.$slots, "table", {}, () => [
                  n("div", xn, [
                    n("table", {
                      class: M(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && i.value }]),
                      style: ne([{ "table-layout": "fixed", "min-width": "100%" }, { width: ct.value }]),
                      onMouseenter: p[1] || (p[1] = (y) => e.resizeableColumns ? ft : null),
                      onMouseleave: p[2] || (p[2] = (y) => e.resizeableColumns ? ht : null)
                    }, [
                      n("thead", wn, [
                        L(h.$slots, "head", {
                          show: Te,
                          sortBy: We,
                          header: Ie
                        }, () => [
                          n("tr", null, [
                            e.hasCheckboxes ? (d(), m("th", kn, [
                              U(n("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: it,
                                "onUpdate:modelValue": p[0] || (p[0] = (y) => z.value = y),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, Cn), [
                                [De, z.value]
                              ])
                            ])) : k("", !0),
                            (d(!0), m(K, null, H(s.value.columns, (y) => (d(), B(zo, {
                              key: `table-${e.name}-header-${y.key}`,
                              cell: Ie(y.key)
                            }, {
                              label: G(() => [
                                L(h.$slots, `header(${y.key})`, {
                                  label: Ie(y.key).label,
                                  column: Ie(y.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell"]))), 128))
                          ])
                        ], !0)
                      ]),
                      n("tbody", _n, [
                        L(h.$slots, "body", { show: Te }, () => [
                          (d(!0), m(K, null, H(b.value, (y, j) => (d(), m("tr", {
                            key: `table-${e.name}-row-${j}`,
                            class: M(["", {
                              "bg-gray-50": e.striped && j % 2,
                              "hover:bg-gray-100": e.striped,
                              "hover:bg-gray-50": !e.striped
                            }])
                          }, [
                            e.hasCheckboxes ? (d(), m("td", $n, [
                              U(n("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${j}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (_) => y.__itSelected = _
                              }, null, 8, Sn), [
                                [De, y.__itSelected]
                              ])
                            ])) : k("", !0),
                            (d(!0), m(K, null, H(s.value.columns, (_, J) => U((d(), m("td", {
                              key: `table-${e.name}-row-${j}-column-${_.key}`,
                              onClick: (ee) => at(ee, y, j),
                              class: M(_.body_class),
                              "data-column-key": _.key,
                              style: ne({
                                width: ut(_.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              })
                            }, [
                              L(h.$slots, `cell(${_.key})`, { item: y }, () => [
                                se(v(y[_.key]), 1)
                              ], !0)
                            ], 14, Mn)), [
                              [le, Te(_.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                L(h.$slots, "pagination", {
                  onClick: be,
                  hasData: $.value,
                  meta: g.value,
                  perPageOptions: s.value.perPageOptions,
                  onPerPageChange: A,
                  showExportButton: e.showExportButton,
                  exportUrl: P.value
                }, () => [
                  n("div", zn, [
                    e.hasCheckboxes ? (d(), m("span", qn, v(dt.value), 1)) : k("", !0),
                    re(Do, {
                      "on-click": be,
                      "has-data": $.value,
                      meta: g.value,
                      "per-page-options": s.value.perPageOptions,
                      "on-per-page-change": A,
                      color: e.color,
                      "show-export-button": e.showExportButton,
                      "export-url": P.value
                    }, {
                      exportButton: G((y) => [
                        L(h.$slots, "exportButton", wt(kt(y)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button", "export-url"])
                  ])
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, gn))
      ]),
      _: 3
    }));
  }
}, Hn = /* @__PURE__ */ Me(Tn, [["__scopeId", "data-v-423767ec"]]);
export {
  je as ButtonWithDropdown,
  zo as HeaderCell,
  jt as OnClickOutside,
  Do as Pagination,
  Hn as Table,
  Xo as TableAddSearchRow,
  rl as TableColumns,
  El as TableFilter,
  Ul as TableGlobalSearch,
  Jl as TableReset,
  Yl as TableSearchRows,
  nn as TableWrapper,
  ge as getTranslations,
  Dn as setTranslation,
  Kn as setTranslations
};
