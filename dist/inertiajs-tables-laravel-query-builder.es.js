import { ref as T, onMounted as ue, onBeforeUnmount as Pt, openBlock as f, createElementBlock as v, renderSlot as R, watch as ie, inject as Y, createBlock as L, withCtx as V, createElementVNode as s, normalizeClass as I, withModifiers as D, withDirectives as U, vShow as ge, createStaticVNode as Ft, normalizeStyle as se, toDisplayString as k, createCommentVNode as _, createTextVNode as ae, computed as F, unref as P, vModelSelect as st, vModelText as we, watchEffect as jt, onUnmounted as Fe, Teleport as Pe, Fragment as Q, renderList as J, createVNode as K, withKeys as et, nextTick as at, resolveDynamicComponent as xe, reactive as Ot, getCurrentInstance as Lt, provide as Rt, Transition as At, vModelCheckbox as tt, normalizeProps as Et, guardReactiveProps as Bt } from "vue";
import { createPopper as Vt } from "@popperjs/core/lib/popper-lite";
import Wt from "@popperjs/core/lib/modifiers/preventOverflow";
import Gt from "@popperjs/core/lib/modifiers/flip";
import { createPopper as Dt } from "@popperjs/core";
import Ut from "lodash-es/uniq";
import Ht from "vuedraggable";
import Kt from "lodash-es/find";
import Ee from "qs";
import Xt from "lodash-es/clone";
import Qt from "lodash-es/filter";
import Jt from "lodash-es/findKey";
import fe from "lodash-es/forEach";
import Yt from "lodash-es/isEqual";
import Zt from "lodash-es/map";
import er from "lodash-es/pickBy";
import { usePage as rt, router as tr } from "@inertiajs/vue3";
const rr = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const o = e, l = T(null), i = T(null);
    return ue(() => {
      l.value = (t) => {
        t.target === i.value || i.value.contains(t.target) || o.do();
      }, document.addEventListener("click", l.value), document.addEventListener("touchstart", l.value);
    }), Pt(() => {
      document.removeEventListener("click", l.value), document.removeEventListener("touchstart", l.value);
    }), (t, r) => (f(), v("div", {
      ref_key: "root",
      ref: i
    }, [
      R(t.$slots, "default")
    ], 512));
  }
}, We = "-", or = (e) => {
  const o = lr(e), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (u) => {
      const a = u.split(We);
      return a[0] === "" && a.length !== 1 && a.shift(), it(a, o) || nr(u);
    },
    getConflictingClassGroupIds: (u, a) => {
      const n = l[u] || [];
      return a && i[u] ? [...n, ...i[u]] : n;
    }
  };
}, it = (e, o) => {
  var u;
  if (e.length === 0)
    return o.classGroupId;
  const l = e[0], i = o.nextPart.get(l), t = i ? it(e.slice(1), i) : void 0;
  if (t)
    return t;
  if (o.validators.length === 0)
    return;
  const r = e.join(We);
  return (u = o.validators.find(({
    validator: a
  }) => a(r))) == null ? void 0 : u.classGroupId;
}, ot = /^\[(.+)\]$/, nr = (e) => {
  if (ot.test(e)) {
    const o = ot.exec(e)[1], l = o == null ? void 0 : o.substring(0, o.indexOf(":"));
    if (l)
      return "arbitrary.." + l;
  }
}, lr = (e) => {
  const {
    theme: o,
    prefix: l
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ar(Object.entries(e.classGroups), l).forEach(([r, u]) => {
    Ve(u, i, r, o);
  }), i;
}, Ve = (e, o, l, i) => {
  e.forEach((t) => {
    if (typeof t == "string") {
      const r = t === "" ? o : nt(o, t);
      r.classGroupId = l;
      return;
    }
    if (typeof t == "function") {
      if (sr(t)) {
        Ve(t(i), o, l, i);
        return;
      }
      o.validators.push({
        validator: t,
        classGroupId: l
      });
      return;
    }
    Object.entries(t).forEach(([r, u]) => {
      Ve(u, nt(o, r), l, i);
    });
  });
}, nt = (e, o) => {
  let l = e;
  return o.split(We).forEach((i) => {
    l.nextPart.has(i) || l.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), l = l.nextPart.get(i);
  }), l;
}, sr = (e) => e.isThemeGetter, ar = (e, o) => o ? e.map(([l, i]) => {
  const t = i.map((r) => typeof r == "string" ? o + r : typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([u, a]) => [o + u, a])) : r);
  return [l, t];
}) : e, ir = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const t = (r, u) => {
    l.set(r, u), o++, o > e && (o = 0, i = l, l = /* @__PURE__ */ new Map());
  };
  return {
    get(r) {
      let u = l.get(r);
      if (u !== void 0)
        return u;
      if ((u = i.get(r)) !== void 0)
        return t(r, u), u;
    },
    set(r, u) {
      l.has(r) ? l.set(r, u) : t(r, u);
    }
  };
}, ut = "!", ur = (e) => {
  const {
    separator: o,
    experimentalParseClassName: l
  } = e, i = o.length === 1, t = o[0], r = o.length, u = (a) => {
    const n = [];
    let g = 0, d = 0, x;
    for (let m = 0; m < a.length; m++) {
      let C = a[m];
      if (g === 0) {
        if (C === t && (i || a.slice(m, m + r) === o)) {
          n.push(a.slice(d, m)), d = m + r;
          continue;
        }
        if (C === "/") {
          x = m;
          continue;
        }
      }
      C === "[" ? g++ : C === "]" && g--;
    }
    const y = n.length === 0 ? a : a.substring(d), S = y.startsWith(ut), M = S ? y.substring(1) : y, b = x && x > d ? x - d : void 0;
    return {
      modifiers: n,
      hasImportantModifier: S,
      baseClassName: M,
      maybePostfixModifierPosition: b
    };
  };
  return l ? (a) => l({
    className: a,
    parseClassName: u
  }) : u;
}, cr = (e) => {
  if (e.length <= 1)
    return e;
  const o = [];
  let l = [];
  return e.forEach((i) => {
    i[0] === "[" ? (o.push(...l.sort(), i), l = []) : l.push(i);
  }), o.push(...l.sort()), o;
}, dr = (e) => ({
  cache: ir(e.cacheSize),
  parseClassName: ur(e),
  ...or(e)
}), fr = /\s+/, mr = (e, o) => {
  const {
    parseClassName: l,
    getClassGroupId: i,
    getConflictingClassGroupIds: t
  } = o, r = [], u = e.trim().split(fr);
  let a = "";
  for (let n = u.length - 1; n >= 0; n -= 1) {
    const g = u[n], {
      modifiers: d,
      hasImportantModifier: x,
      baseClassName: y,
      maybePostfixModifierPosition: S
    } = l(g);
    let M = Boolean(S), b = i(M ? y.substring(0, S) : y);
    if (!b) {
      if (!M) {
        a = g + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (b = i(y), !b) {
        a = g + (a.length > 0 ? " " + a : a);
        continue;
      }
      M = !1;
    }
    const m = cr(d).join(":"), C = x ? m + ut : m, $ = C + b;
    if (r.includes($))
      continue;
    r.push($);
    const z = t(b, M);
    for (let j = 0; j < z.length; ++j) {
      const W = z[j];
      r.push(C + W);
    }
    a = g + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function pr() {
  let e = 0, o, l, i = "";
  for (; e < arguments.length; )
    (o = arguments[e++]) && (l = ct(o)) && (i && (i += " "), i += l);
  return i;
}
const ct = (e) => {
  if (typeof e == "string")
    return e;
  let o, l = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (o = ct(e[i])) && (l && (l += " "), l += o);
  return l;
};
function gr(e, ...o) {
  let l, i, t, r = u;
  function u(n) {
    const g = o.reduce((d, x) => x(d), e());
    return l = dr(g), i = l.cache.get, t = l.cache.set, r = a, a(n);
  }
  function a(n) {
    const g = i(n);
    if (g)
      return g;
    const d = mr(n, l);
    return t(n, d), d;
  }
  return function() {
    return r(pr.apply(null, arguments));
  };
}
const A = (e) => {
  const o = (l) => l[e] || [];
  return o.isThemeGetter = !0, o;
}, dt = /^\[(?:([a-z-]+):)?(.+)\]$/i, hr = /^\d+\/\d+$/, vr = /* @__PURE__ */ new Set(["px", "full", "screen"]), br = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, yr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, xr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, wr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, kr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, le = (e) => ke(e) || vr.has(e) || hr.test(e), me = (e) => Ce(e, "length", Ir), ke = (e) => Boolean(e) && !Number.isNaN(Number(e)), Be = (e) => Ce(e, "number", ke), qe = (e) => Boolean(e) && Number.isInteger(Number(e)), Cr = (e) => e.endsWith("%") && ke(e.slice(0, -1)), N = (e) => dt.test(e), pe = (e) => br.test(e), _r = /* @__PURE__ */ new Set(["length", "size", "percentage"]), $r = (e) => Ce(e, _r, ft), Sr = (e) => Ce(e, "position", ft), Mr = /* @__PURE__ */ new Set(["image", "url"]), qr = (e) => Ce(e, Mr, Nr), zr = (e) => Ce(e, "", Tr), ze = () => !0, Ce = (e, o, l) => {
  const i = dt.exec(e);
  return i ? i[1] ? typeof o == "string" ? i[1] === o : o.has(i[1]) : l(i[2]) : !1;
}, Ir = (e) => yr.test(e) && !xr.test(e), ft = () => !1, Tr = (e) => wr.test(e), Nr = (e) => kr.test(e), Pr = () => {
  const e = A("colors"), o = A("spacing"), l = A("blur"), i = A("brightness"), t = A("borderColor"), r = A("borderRadius"), u = A("borderSpacing"), a = A("borderWidth"), n = A("contrast"), g = A("grayscale"), d = A("hueRotate"), x = A("invert"), y = A("gap"), S = A("gradientColorStops"), M = A("gradientColorStopPositions"), b = A("inset"), m = A("margin"), C = A("opacity"), $ = A("padding"), z = A("saturate"), j = A("scale"), W = A("sepia"), G = A("skew"), Z = A("space"), ee = A("translate"), ve = () => ["auto", "contain", "none"], be = () => ["auto", "hidden", "clip", "visible", "scroll"], oe = () => ["auto", N, o], O = () => [N, o], $e = () => ["", le, me], re = () => ["auto", ke, N], Se = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], ce = () => ["solid", "dashed", "dotted", "double", "none"], Me = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], de = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], ne = () => ["", "0", N], Ie = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], te = () => [ke, N];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ze],
      spacing: [le, me],
      blur: ["none", "", pe, N],
      brightness: te(),
      borderColor: [e],
      borderRadius: ["none", "", "full", pe, N],
      borderSpacing: O(),
      borderWidth: $e(),
      contrast: te(),
      grayscale: ne(),
      hueRotate: te(),
      invert: ne(),
      gap: O(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Cr, me],
      inset: oe(),
      margin: oe(),
      opacity: te(),
      padding: O(),
      saturate: te(),
      scale: te(),
      sepia: ne(),
      skew: te(),
      space: O(),
      translate: O()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", N]
      }],
      container: ["container"],
      columns: [{
        columns: [pe]
      }],
      "break-after": [{
        "break-after": Ie()
      }],
      "break-before": [{
        "break-before": Ie()
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
        object: [...Se(), N]
      }],
      overflow: [{
        overflow: be()
      }],
      "overflow-x": [{
        "overflow-x": be()
      }],
      "overflow-y": [{
        "overflow-y": be()
      }],
      overscroll: [{
        overscroll: ve()
      }],
      "overscroll-x": [{
        "overscroll-x": ve()
      }],
      "overscroll-y": [{
        "overscroll-y": ve()
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
        z: ["auto", qe, N]
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
        flex: ["1", "auto", "initial", "none", N]
      }],
      grow: [{
        grow: ne()
      }],
      shrink: [{
        shrink: ne()
      }],
      order: [{
        order: ["first", "last", "none", qe, N]
      }],
      "grid-cols": [{
        "grid-cols": [ze]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", qe, N]
        }, N]
      }],
      "col-start": [{
        "col-start": re()
      }],
      "col-end": [{
        "col-end": re()
      }],
      "grid-rows": [{
        "grid-rows": [ze]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [qe, N]
        }, N]
      }],
      "row-start": [{
        "row-start": re()
      }],
      "row-end": [{
        "row-end": re()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", N]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", N]
      }],
      gap: [{
        gap: [y]
      }],
      "gap-x": [{
        "gap-x": [y]
      }],
      "gap-y": [{
        "gap-y": [y]
      }],
      "justify-content": [{
        justify: ["normal", ...de()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...de(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...de(), "baseline"]
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [$]
      }],
      px: [{
        px: [$]
      }],
      py: [{
        py: [$]
      }],
      ps: [{
        ps: [$]
      }],
      pe: [{
        pe: [$]
      }],
      pt: [{
        pt: [$]
      }],
      pr: [{
        pr: [$]
      }],
      pb: [{
        pb: [$]
      }],
      pl: [{
        pl: [$]
      }],
      m: [{
        m: [m]
      }],
      mx: [{
        mx: [m]
      }],
      my: [{
        my: [m]
      }],
      ms: [{
        ms: [m]
      }],
      me: [{
        me: [m]
      }],
      mt: [{
        mt: [m]
      }],
      mr: [{
        mr: [m]
      }],
      mb: [{
        mb: [m]
      }],
      ml: [{
        ml: [m]
      }],
      "space-x": [{
        "space-x": [Z]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [Z]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", N, o]
      }],
      "min-w": [{
        "min-w": [N, o, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [N, o, "none", "full", "min", "max", "fit", "prose", {
          screen: [pe]
        }, pe]
      }],
      h: [{
        h: [N, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [N, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [N, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [N, o, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", pe, me]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Be]
      }],
      "font-family": [{
        font: [ze]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", N]
      }],
      "line-clamp": [{
        "line-clamp": ["none", ke, Be]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", le, N]
      }],
      "list-image": [{
        "list-image": ["none", N]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", N]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [e]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [C]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [C]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...ce(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", le, me]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", le, N]
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
        indent: O()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", N]
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
        content: ["none", N]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [C]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...Se(), Sr]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", $r]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, qr]
      }],
      "bg-color": [{
        bg: [e]
      }],
      "gradient-from-pos": [{
        from: [M]
      }],
      "gradient-via-pos": [{
        via: [M]
      }],
      "gradient-to-pos": [{
        to: [M]
      }],
      "gradient-from": [{
        from: [S]
      }],
      "gradient-via": [{
        via: [S]
      }],
      "gradient-to": [{
        to: [S]
      }],
      rounded: [{
        rounded: [r]
      }],
      "rounded-s": [{
        "rounded-s": [r]
      }],
      "rounded-e": [{
        "rounded-e": [r]
      }],
      "rounded-t": [{
        "rounded-t": [r]
      }],
      "rounded-r": [{
        "rounded-r": [r]
      }],
      "rounded-b": [{
        "rounded-b": [r]
      }],
      "rounded-l": [{
        "rounded-l": [r]
      }],
      "rounded-ss": [{
        "rounded-ss": [r]
      }],
      "rounded-se": [{
        "rounded-se": [r]
      }],
      "rounded-ee": [{
        "rounded-ee": [r]
      }],
      "rounded-es": [{
        "rounded-es": [r]
      }],
      "rounded-tl": [{
        "rounded-tl": [r]
      }],
      "rounded-tr": [{
        "rounded-tr": [r]
      }],
      "rounded-br": [{
        "rounded-br": [r]
      }],
      "rounded-bl": [{
        "rounded-bl": [r]
      }],
      "border-w": [{
        border: [a]
      }],
      "border-w-x": [{
        "border-x": [a]
      }],
      "border-w-y": [{
        "border-y": [a]
      }],
      "border-w-s": [{
        "border-s": [a]
      }],
      "border-w-e": [{
        "border-e": [a]
      }],
      "border-w-t": [{
        "border-t": [a]
      }],
      "border-w-r": [{
        "border-r": [a]
      }],
      "border-w-b": [{
        "border-b": [a]
      }],
      "border-w-l": [{
        "border-l": [a]
      }],
      "border-opacity": [{
        "border-opacity": [C]
      }],
      "border-style": [{
        border: [...ce(), "hidden"]
      }],
      "divide-x": [{
        "divide-x": [a]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [a]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [C]
      }],
      "divide-style": [{
        divide: ce()
      }],
      "border-color": [{
        border: [t]
      }],
      "border-color-x": [{
        "border-x": [t]
      }],
      "border-color-y": [{
        "border-y": [t]
      }],
      "border-color-s": [{
        "border-s": [t]
      }],
      "border-color-e": [{
        "border-e": [t]
      }],
      "border-color-t": [{
        "border-t": [t]
      }],
      "border-color-r": [{
        "border-r": [t]
      }],
      "border-color-b": [{
        "border-b": [t]
      }],
      "border-color-l": [{
        "border-l": [t]
      }],
      "divide-color": [{
        divide: [t]
      }],
      "outline-style": [{
        outline: ["", ...ce()]
      }],
      "outline-offset": [{
        "outline-offset": [le, N]
      }],
      "outline-w": [{
        outline: [le, me]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: $e()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [C]
      }],
      "ring-offset-w": [{
        "ring-offset": [le, me]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", pe, zr]
      }],
      "shadow-color": [{
        shadow: [ze]
      }],
      opacity: [{
        opacity: [C]
      }],
      "mix-blend": [{
        "mix-blend": [...Me(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": Me()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [l]
      }],
      brightness: [{
        brightness: [i]
      }],
      contrast: [{
        contrast: [n]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", pe, N]
      }],
      grayscale: [{
        grayscale: [g]
      }],
      "hue-rotate": [{
        "hue-rotate": [d]
      }],
      invert: [{
        invert: [x]
      }],
      saturate: [{
        saturate: [z]
      }],
      sepia: [{
        sepia: [W]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [l]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [i]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [n]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [g]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [d]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [x]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [C]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [z]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [W]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [u]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [u]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [u]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", N]
      }],
      duration: [{
        duration: te()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", N]
      }],
      delay: [{
        delay: te()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", N]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [j]
      }],
      "scale-x": [{
        "scale-x": [j]
      }],
      "scale-y": [{
        "scale-y": [j]
      }],
      rotate: [{
        rotate: [qe, N]
      }],
      "translate-x": [{
        "translate-x": [ee]
      }],
      "translate-y": [{
        "translate-y": [ee]
      }],
      "skew-x": [{
        "skew-x": [G]
      }],
      "skew-y": [{
        "skew-y": [G]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", N]
      }],
      accent: [{
        accent: ["auto", e]
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", N]
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
        "scroll-m": O()
      }],
      "scroll-mx": [{
        "scroll-mx": O()
      }],
      "scroll-my": [{
        "scroll-my": O()
      }],
      "scroll-ms": [{
        "scroll-ms": O()
      }],
      "scroll-me": [{
        "scroll-me": O()
      }],
      "scroll-mt": [{
        "scroll-mt": O()
      }],
      "scroll-mr": [{
        "scroll-mr": O()
      }],
      "scroll-mb": [{
        "scroll-mb": O()
      }],
      "scroll-ml": [{
        "scroll-ml": O()
      }],
      "scroll-p": [{
        "scroll-p": O()
      }],
      "scroll-px": [{
        "scroll-px": O()
      }],
      "scroll-py": [{
        "scroll-py": O()
      }],
      "scroll-ps": [{
        "scroll-ps": O()
      }],
      "scroll-pe": [{
        "scroll-pe": O()
      }],
      "scroll-pt": [{
        "scroll-pt": O()
      }],
      "scroll-pr": [{
        "scroll-pr": O()
      }],
      "scroll-pb": [{
        "scroll-pb": O()
      }],
      "scroll-pl": [{
        "scroll-pl": O()
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
        "will-change": ["auto", "scroll", "contents", "transform", N]
      }],
      fill: [{
        fill: [e, "none"]
      }],
      "stroke-w": [{
        stroke: [le, me, Be]
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
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
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
}, X = /* @__PURE__ */ gr(Pr);
function E(e, o, l, i) {
  let t = o ? { ...o } : {}, r = null, u = l ? { ...l } : {}, a = null, n = i ? { ...i } : {}, g = null;
  for (const d of e)
    r === null && d in t && (t = t[d], typeof t == "string" && (r = t)), a === null && d in u && (u = u[d], typeof u == "string" && (a = u)), g === null && d in n && (n = n[d], typeof n == "string" && (g = n));
  return X(r, a, g);
}
const Fr = { class: "relative" }, jr = ["dusk", "disabled"], Or = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, je = {
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
  setup(e, { expose: o, emit: l }) {
    const i = l, t = e, r = T(!1), u = T(null);
    function a() {
      r.value = !r.value;
    }
    function n() {
      r.value = !1;
    }
    ie(r, () => {
      u.value.update(), r.value || i("closed"), r.value && i("opened");
    });
    const g = T(null), d = T(null);
    ue(() => {
      u.value = Vt(g.value, d.value, {
        placement: t.placement,
        modifiers: [Gt, Wt]
      });
    }), o({ hide: n });
    const x = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, y = Y("themeVariables"), S = (M) => {
      var m, C;
      let b = "";
      return M === "button" && t.disabled && (b = "cursor-not-allowed"), X(
        b,
        E([M, "base"], x, (m = y == null ? void 0 : y.inertia_table) == null ? void 0 : m.button_with_dropdown, t.ui),
        E([M, "color", t.color], x, (C = y == null ? void 0 : y.inertia_table) == null ? void 0 : C.button_with_dropdown, t.ui)
      );
    };
    return (M, b) => (f(), L(rr, { do: n }, {
      default: V(() => [
        s("div", Fr, [
          s("button", {
            ref_key: "button",
            ref: g,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: I(S("button")),
            "aria-haspopup": "true",
            onClick: D(a, ["prevent"])
          }, [
            R(M.$slots, "button")
          ], 10, jr),
          U(s("div", {
            ref_key: "tooltip",
            ref: d,
            class: "absolute z-50"
          }, [
            s("div", Or, [
              R(M.$slots, "default")
            ])
          ], 512), [
            [ge, r.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const _e = (e, o) => {
  const l = e.__vccOpts || e;
  for (const [i, t] of o)
    l[i] = t;
  return l;
}, Lr = {
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
    const o = e, l = (i) => {
      o.onResize(i, o.columnKey);
    };
    return (i, t) => (f(), v("div", {
      class: I(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: l
    }, [...t[0] || (t[0] = [
      Ft('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ])], 34));
  }
}, Rr = /* @__PURE__ */ _e(Lr, [["__scopeId", "data-v-672a9339"]]), Ar = { class: "w-full flex gap-2 justify-between items-center" }, Er = { class: "relative inline-flex items-center cursor-pointer" }, Br = ["checked"], mt = {
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
    const o = e, l = {
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
    }, i = Y("themeVariables"), t = (r) => {
      var a, n, g, d;
      let u = o.color;
      return r === "toggle" && o.filter.value === null && (u = "disabled"), X(
        E([r, "base"], l, (n = (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.table_filter) == null ? void 0 : n.toggle_filter, o.ui),
        E([r, "color", u], l, (d = (g = i == null ? void 0 : i.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : d.toggle_filter, o.ui)
      );
    };
    return (r, u) => (f(), v("div", Ar, [
      s("label", Er, [
        s("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: u[0] || (u[0] = (a) => e.onFilterChange(e.filter.key, a.target.checked ? "1" : "0"))
        }, null, 40, Br),
        s("div", {
          class: I(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", t("toggle")])
        }, null, 2)
      ]),
      s("button", {
        class: I(t("reset_button")),
        onClick: u[1] || (u[1] = D((a) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, [...u[2] || (u[2] = [
        s("span", { class: "sr-only" }, "Remove search", -1),
        s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          s("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])], 2)
    ]));
  }
}, Vr = {
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
      const o = this.getTheme("button"), l = /h-(\d+)/, i = o.match(l), t = 4;
      let r = null;
      return i && 1 in i ? r = i[1] : r = t, e ? `margin-top: ${(r - t + 12) * 0.25}rem` : `margin-top: -${((r - t) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(e) {
      return e < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : e > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : e;
    },
    detectIfOverlap() {
      let e = this.$refs.popover_min.getClientRects()[0], o = this.$refs.popover_max.getClientRects()[0];
      e && o && (this.hasOverlap = e.right > o.left);
    },
    handleMouseDown(e, o) {
      this.moveMin = o, this.moveMax = !o, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      let i = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), t = Number(Math.round(i / this.step) * this.step).toFixed(2);
      t >= this.min && t <= this.max && (this.moveMin && t !== this.currentMinValue && t <= this.currentMaxValue && (this.internalValue = [t, this.currentMaxValue]), this.moveMax && t !== this.currentMaxValue && t >= this.currentMinValue && (this.internalValue = [this.currentMinValue, t])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var o, l, i, t, r, u;
      return X(
        E([e, "base"], this.fallbackTheme, (i = (l = (o = this.themeVariables) == null ? void 0 : o.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : i.number_range_filter, this.ui),
        E([e, "color", this.color], this.fallbackTheme, (u = (r = (t = this.themeVariables) == null ? void 0 : t.inertia_table) == null ? void 0 : r.table_filter) == null ? void 0 : u.number_range_filter, this.ui)
      );
    }
  }
}, Wr = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, Gr = { class: "py-1 relative min-w-full" }, Dr = { class: "z-40" }, Ur = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Hr = { key: 0 }, Kr = { key: 1 }, Xr = { class: "z-40" }, Qr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Jr = { key: 0 }, Yr = { key: 1 }, Zr = { draggable: "true" }, eo = { key: 0 }, to = { key: 1 }, ro = { key: 0 }, oo = { key: 1 };
function no(e, o, l, i, t, r) {
  var u, a, n, g;
  return f(), v("div", Wr, [
    s("div", Gr, [
      s("div", {
        class: I(r.getTheme("main_bar"))
      }, [
        s("div", {
          class: I(["absolute", r.getTheme("selected_bar")]),
          style: se(`width: ${r.rangeWidth}% !important; left: ${r.currentMinValueInPercent}% !important;`)
        }, null, 6),
        s("div", {
          class: I([r.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: se(`left: ${r.currentMinValueInPercent}%;`),
          onMousedown: o[0] || (o[0] = (d) => r.handleMouseDown(d, !0))
        }, [
          s("div", Dr, [
            s("div", Ur, [
              s("div", {
                class: I(r.getTheme("popover")),
                style: se(r.getMarginTop(t.hasOverlap && r.displayFirstDown))
              }, [
                l.prefix ? (f(), v("span", Hr, k(l.prefix), 1)) : _("", !0),
                ae(" " + k((u = r.currentMinValue) != null ? u : 0) + " ", 1),
                l.suffix ? (f(), v("span", Kr, k(l.suffix), 1)) : _("", !0)
              ], 6),
              (f(), v("svg", {
                class: I(["absolute w-full h-2 left-0", [t.hasOverlap && r.displayFirstDown ? "bottom-6 rotate-180" : "top-100", r.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, [...o[2] || (o[2] = [
                s("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ])], 2))
            ], 512)
          ])
        ], 38),
        s("div", {
          class: I([r.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: se(`left: ${r.currentMaxValueInPercent}%;`),
          onMousedown: o[1] || (o[1] = (d) => r.handleMouseDown(d, !1))
        }, [
          s("div", Xr, [
            s("div", Qr, [
              s("div", {
                class: I(r.getTheme("popover")),
                style: se(r.getMarginTop(t.hasOverlap && !r.displayFirstDown))
              }, [
                l.prefix ? (f(), v("span", Jr, k(l.prefix), 1)) : _("", !0),
                ae(" " + k((a = r.currentMaxValue) != null ? a : 0) + " ", 1),
                l.suffix ? (f(), v("span", Yr, k(l.suffix), 1)) : _("", !0)
              ], 6),
              s("div", Zr, [
                (f(), v("svg", {
                  class: I(["absolute w-full h-2 left-0 top-100", [t.hasOverlap && !r.displayFirstDown ? "bottom-6 rotate-180" : "top-100", r.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, [...o[3] || (o[3] = [
                  s("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ])], 2))
              ])
            ], 512)
          ])
        ], 38),
        s("div", {
          class: I(["absolute -ml-1 bottom-0 left-0 -mb-6", r.getTheme("text")])
        }, [
          l.prefix ? (f(), v("span", eo, k(l.prefix), 1)) : _("", !0),
          ae(" " + k((n = l.min) != null ? n : 0) + " ", 1),
          l.suffix ? (f(), v("span", to, k(l.suffix), 1)) : _("", !0)
        ], 2),
        s("div", {
          class: I(["absolute -mr-1 bottom-0 right-0 -mb-6", r.getTheme("text")])
        }, [
          l.prefix ? (f(), v("span", ro, k(l.prefix), 1)) : _("", !0),
          ae(" " + k((g = l.max) != null ? g : 0) + " ", 1),
          l.suffix ? (f(), v("span", oo, k(l.suffix), 1)) : _("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const pt = /* @__PURE__ */ _e(Vr, [["render", no]]), Ge = {
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
function he() {
  return Ge.translations;
}
function gs(e, o) {
  Ge.translations[e] = o;
}
function hs(e) {
  Ge.translations = e;
}
const lo = { class: "space-y-4" }, so = { class: "block text-sm font-medium text-gray-700 mb-2" }, ao = { value: "" }, io = { value: "exact" }, uo = { value: "less_than" }, co = { value: "greater_than" }, fo = { value: "less_than_or_equal" }, mo = { value: "greater_than_or_equal" }, po = { value: "between" }, go = {
  key: 0,
  class: "space-y-3"
}, ho = { key: 0 }, vo = { class: "block text-sm font-medium text-gray-700 mb-1" }, bo = { class: "flex items-center" }, yo = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, xo = ["step"], wo = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, ko = {
  key: 1,
  class: "space-y-3"
}, Co = { class: "block text-sm font-medium text-gray-700 mb-1" }, _o = { class: "flex items-center" }, $o = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, So = ["step"], Mo = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, qo = { class: "block text-sm font-medium text-gray-700 mb-1" }, zo = { class: "flex items-center" }, Io = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, To = ["step"], No = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Po = {
  key: 1,
  class: "flex justify-end"
}, Fo = { class: "sr-only" }, gt = {
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
    const o = e, l = he(), i = T(""), t = T(""), r = T(""), u = T(""), a = F(() => i.value !== "" && (i.value !== "between" && t.value !== "" && t.value !== null || i.value === "between" && r.value !== "" && r.value !== null && u.value !== "" && u.value !== null));
    function n() {
      switch (i.value) {
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
    function g() {
      t.value = "", r.value = "", u.value = "", i.value === "" ? x() : d();
    }
    function d() {
      if (i.value === "")
        return;
      let b = null;
      switch (i.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          t.value !== "" && t.value !== null && (b = {
            type: i.value,
            number: t.value
          });
          break;
        case "between":
          r.value !== "" && r.value !== null && u.value !== "" && u.value !== null && (b = {
            type: i.value,
            start_number: r.value,
            end_number: u.value
          });
          break;
      }
      o.onFilterChange(o.filter.key, b);
    }
    function x() {
      i.value = "", t.value = "", r.value = "", u.value = "", o.onFilterChange(o.filter.key, null);
    }
    ue(() => {
      if (o.filter.value) {
        const b = o.filter.value;
        b.type && (i.value = b.type, b.type === "between" ? (r.value = b.start_number || "", u.value = b.end_number || "") : t.value = b.number || "");
      }
    }), ie(() => o.filter.value, (b) => {
      b ? b.type && (i.value = b.type, b.type === "between" ? (r.value = b.start_number || "", u.value = b.end_number || "") : t.value = b.number || "") : x();
    }, { deep: !0 });
    const y = {
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
    }, S = Y("themeVariables"), M = (b) => {
      var m, C, $, z;
      return X(
        E([b, "base"], y, (C = (m = S == null ? void 0 : S.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : C.number_filter, o.ui),
        E([b, "color", o.color], y, (z = ($ = S == null ? void 0 : S.inertia_table) == null ? void 0 : $.table_filter) == null ? void 0 : z.number_filter, o.ui)
      );
    };
    return (b, m) => (f(), v("div", lo, [
      s("div", null, [
        s("label", so, k(P(l).filter_type), 1),
        U(s("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (C) => i.value = C),
          class: I(M("select")),
          onChange: g
        }, [
          s("option", ao, k(P(l).no_filter), 1),
          s("option", io, k(P(l).exact_number), 1),
          s("option", uo, k(P(l).less_than), 1),
          s("option", co, k(P(l).greater_than), 1),
          s("option", fo, k(P(l).less_than_or_equal), 1),
          s("option", mo, k(P(l).greater_than_or_equal), 1),
          s("option", po, k(P(l).number_range), 1)
        ], 34), [
          [st, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (f(), v("div", go, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(i.value) ? (f(), v("div", ho, [
          s("label", vo, k(n()), 1),
          s("div", bo, [
            e.filter.prefix ? (f(), v("span", yo, k(e.filter.prefix), 1)) : _("", !0),
            U(s("input", {
              type: "number",
              "onUpdate:modelValue": m[1] || (m[1] = (C) => t.value = C),
              step: e.filter.step || 1,
              class: I(M("input")),
              onInput: d,
              placeholder: "0"
            }, null, 42, xo), [
              [
                we,
                t.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (f(), v("span", wo, k(e.filter.suffix), 1)) : _("", !0)
          ])
        ])) : _("", !0),
        i.value === "between" ? (f(), v("div", ko, [
          s("div", null, [
            s("label", Co, k(P(l).start_number), 1),
            s("div", _o, [
              e.filter.prefix ? (f(), v("span", $o, k(e.filter.prefix), 1)) : _("", !0),
              U(s("input", {
                type: "number",
                "onUpdate:modelValue": m[2] || (m[2] = (C) => r.value = C),
                step: e.filter.step || 1,
                class: I(M("input")),
                onInput: d,
                placeholder: "0"
              }, null, 42, So), [
                [
                  we,
                  r.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (f(), v("span", Mo, k(e.filter.suffix), 1)) : _("", !0)
            ])
          ]),
          s("div", null, [
            s("label", qo, k(P(l).end_number), 1),
            s("div", zo, [
              e.filter.prefix ? (f(), v("span", Io, k(e.filter.prefix), 1)) : _("", !0),
              U(s("input", {
                type: "number",
                "onUpdate:modelValue": m[3] || (m[3] = (C) => u.value = C),
                step: e.filter.step || 1,
                class: I(M("input")),
                onInput: d,
                placeholder: "0"
              }, null, 42, To), [
                [
                  we,
                  u.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (f(), v("span", No, k(e.filter.suffix), 1)) : _("", !0)
            ])
          ])
        ])) : _("", !0)
      ])) : _("", !0),
      a.value ? (f(), v("div", Po, [
        s("button", {
          type: "button",
          class: I(M("reset_button")),
          onClick: x
        }, [
          s("span", Fo, k(P(l).reset_filter), 1),
          m[4] || (m[4] = s("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ], 2)
      ])) : _("", !0)
    ]));
  }
}, jo = { class: "space-y-2" }, Oo = { class: "block text-sm font-medium text-gray-700 mb-2" }, Lo = { value: "" }, Ro = { value: "exact" }, Ao = { value: "before" }, Eo = { value: "after" }, Bo = { value: "between" }, Vo = {
  key: 0,
  class: "space-y-3"
}, Wo = { key: 0 }, Go = { class: "block text-sm font-medium text-gray-700 mb-1" }, Do = {
  key: 1,
  class: "space-y-3"
}, Uo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Ho = { class: "block text-sm font-medium text-gray-700 mb-1" }, Ko = {
  key: 1,
  class: "flex justify-end"
}, Xo = { class: "sr-only" }, ht = {
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
    const o = e, l = he(), i = T(""), t = T(""), r = T(""), u = T(""), a = F(() => i.value !== "" && (i.value !== "between" && t.value || i.value === "between" && r.value && u.value));
    function n() {
      switch (i.value) {
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
    function g() {
      t.value = "", r.value = "", u.value = "", i.value === "" ? x() : d();
    }
    function d() {
      if (i.value === "")
        return;
      let b = null;
      switch (i.value) {
        case "exact":
        case "before":
        case "after":
          t.value && (b = {
            type: i.value,
            date: t.value
          });
          break;
        case "between":
          r.value && u.value && (b = {
            type: i.value,
            start_date: r.value,
            end_date: u.value
          });
          break;
      }
      o.onFilterChange(o.filter.key, b);
    }
    function x() {
      i.value = "", t.value = "", r.value = "", u.value = "", o.onFilterChange(o.filter.key, null);
    }
    ue(() => {
      if (o.filter.value) {
        const b = o.filter.value;
        b.type && (i.value = b.type, b.type === "between" ? (r.value = b.start_date || "", u.value = b.end_date || "") : t.value = b.date || "");
      }
    }), ie(() => o.filter.value, (b) => {
      b ? b.type && (i.value = b.type, b.type === "between" ? (r.value = b.start_date || "", u.value = b.end_date || "") : t.value = b.date || "") : x();
    }, { deep: !0 });
    const y = {
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
    }, S = Y("themeVariables"), M = (b) => {
      var m, C, $, z;
      return X(
        E([b, "base"], y, (C = (m = S == null ? void 0 : S.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : C.date_filter, o.ui),
        E([b, "color", o.color], y, (z = ($ = S == null ? void 0 : S.inertia_table) == null ? void 0 : $.table_filter) == null ? void 0 : z.date_filter, o.ui)
      );
    };
    return (b, m) => (f(), v("div", jo, [
      s("div", null, [
        s("label", Oo, k(P(l).filter_type), 1),
        U(s("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (C) => i.value = C),
          class: I(M("select")),
          onChange: g
        }, [
          s("option", Lo, k(P(l).no_filter), 1),
          s("option", Ro, k(P(l).exact_date), 1),
          s("option", Ao, k(P(l).before_date), 1),
          s("option", Eo, k(P(l).after_date), 1),
          s("option", Bo, k(P(l).date_range), 1)
        ], 34), [
          [st, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (f(), v("div", Vo, [
        ["exact", "before", "after"].includes(i.value) ? (f(), v("div", Wo, [
          s("label", Go, k(n()), 1),
          U(s("input", {
            type: "date",
            "onUpdate:modelValue": m[1] || (m[1] = (C) => t.value = C),
            class: I(M("input")),
            onChange: d
          }, null, 34), [
            [we, t.value]
          ])
        ])) : _("", !0),
        i.value === "between" ? (f(), v("div", Do, [
          s("div", null, [
            s("label", Uo, k(P(l).start_date), 1),
            U(s("input", {
              type: "date",
              "onUpdate:modelValue": m[2] || (m[2] = (C) => r.value = C),
              class: I(M("input")),
              onChange: d
            }, null, 34), [
              [we, r.value]
            ])
          ]),
          s("div", null, [
            s("label", Ho, k(P(l).end_date), 1),
            U(s("input", {
              type: "date",
              "onUpdate:modelValue": m[3] || (m[3] = (C) => u.value = C),
              class: I(M("input")),
              onChange: d
            }, null, 34), [
              [we, u.value]
            ])
          ])
        ])) : _("", !0)
      ])) : _("", !0),
      a.value ? (f(), v("div", Ko, [
        s("button", {
          type: "button",
          class: I(M("reset_button")),
          onClick: x
        }, [
          s("span", Xo, k(P(l).reset_filter), 1),
          m[4] || (m[4] = s("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ], 2)
      ])) : _("", !0)
    ]));
  }
};
function vt(e) {
  let o = T(null), l = T(null);
  return ue(() => {
    jt((i) => {
      if (!l.value || !o.value)
        return;
      let t = l.value.el || l.value, r = o.value.el || o.value;
      if (!(r instanceof HTMLElement) || !(t instanceof HTMLElement))
        return;
      let { destroy: u } = Dt(r, t, e);
      i(u);
    });
  }), [o, l];
}
const Qo = { class: "relative inline-block" }, Jo = ["dusk"], Yo = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Zo = { class: "p-2" }, en = ["name", "value", "onChange"], tn = ["value"], rn = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, on = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, nn = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, ln = {
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
    const o = e, l = T(!1);
    T(null);
    const [i, t] = vt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), r = F(() => o.filters.filter((m) => m.key === o.columnKey || m.key.startsWith(o.columnKey + "_") || m.key.includes(o.columnKey))), u = F(() => r.value.some((m) => !g(m)));
    function a() {
      r.value.length > 0 && (l.value = !l.value);
    }
    function n() {
      l.value = !1;
    }
    function g(m) {
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
    function d(m, C) {
      o.onFilterChange(m, C);
    }
    function x(m) {
      let C = m.value;
      m.value && (Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) ? C = null : Number(Math.min(...m.value)) === 0 && Number(Math.max(...m.value)) === 0 && (C = ["0", "0"])), o.onFilterChange(m.key, C);
    }
    const y = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, S = Y("themeVariables"), M = (m) => {
      var C, $, z, j;
      return X(
        E([m, "base"], y, ($ = (C = S == null ? void 0 : S.inertia_table) == null ? void 0 : C.table_filter) == null ? void 0 : $.select_filter, o.ui),
        E([m, "color", o.color], y, (j = (z = S == null ? void 0 : S.inertia_table) == null ? void 0 : z.table_filter) == null ? void 0 : j.select_filter, o.ui)
      );
    };
    function b(m) {
      t.value && !t.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${o.columnKey}"]`) && n();
    }
    return ue(() => {
      document.addEventListener("click", b);
    }), Fe(() => {
      document.removeEventListener("click", b);
    }), (m, C) => (f(), v("div", Qo, [
      s("button", {
        ref_key: "trigger",
        ref: i,
        onClick: a,
        class: I([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": u.value,
            "text-gray-400 hover:text-gray-600": !u.value
          }
        ]),
        dusk: `column-filter-${e.columnKey}`
      }, [...C[1] || (C[1] = [
        s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          s("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, Jo),
      (f(), L(Pe, { to: "body" }, [
        l.value ? (f(), v("div", {
          key: 0,
          ref_key: "container",
          ref: t,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: C[0] || (C[0] = D(() => {
          }, ["stop"]))
        }, [
          (f(!0), v(Q, null, J(r.value, ($) => (f(), v("div", {
            key: $.key
          }, [
            s("h3", Yo, k($.label), 1),
            s("div", Zo, [
              $.type === "select" ? (f(), v("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: I(M("select")),
                onChange: (z) => d($.key, z.target.value)
              }, [
                (f(!0), v(Q, null, J($.options, (z, j) => (f(), v("option", {
                  key: j,
                  value: j
                }, k(z), 9, tn))), 128))
              ], 42, en)) : _("", !0),
              $.type === "toggle" ? (f(), L(mt, {
                key: 1,
                filter: $,
                "on-filter-change": d,
                color: e.color
              }, null, 8, ["filter", "color"])) : _("", !0),
              $.type === "number" ? (f(), v("div", rn, [
                K(gt, {
                  filter: $,
                  "on-filter-change": d,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : _("", !0),
              $.type === "number_range" ? (f(), v("div", on, [
                K(pt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(z) => $.value = z, (z) => x($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : _("", !0),
              $.type === "date" ? (f(), v("div", nn, [
                K(ht, {
                  filter: $,
                  "on-filter-change": d,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : _("", !0)
            ])
          ]))), 128))
        ], 512)) : _("", !0)
      ])),
      (f(), L(Pe, { to: "body" }, [
        l.value ? (f(), v("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: n
        })) : _("", !0)
      ]))
    ]));
  }
}, sn = { class: "relative inline-block" }, an = ["dusk"], un = { class: "p-3" }, cn = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, dn = { class: "space-y-2" }, fn = ["value", "placeholder"], mn = {
  key: 0,
  class: "flex justify-end"
}, pn = { class: "sr-only" }, gn = {
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
    const o = e, l = he(), i = T(!1), t = T(null), [r, u] = vt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), a = F(() => o.searchInputs.find(($) => $.key === o.columnKey)), n = F(() => a.value && a.value.value || ""), g = F(() => n.value !== "");
    async function d() {
      a.value && (i.value = !i.value, i.value && (await at(), t.value && t.value.focus()));
    }
    function x() {
      i.value = !1;
    }
    function y($) {
      const z = $.target.value;
      S(z);
    }
    function S($) {
      o.onSearchChange(o.columnKey, $);
    }
    const M = {
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
    }, b = Y("themeVariables"), m = ($) => {
      var z, j, W, G;
      return X(
        E([$, "base"], M, (j = (z = b == null ? void 0 : b.inertia_table) == null ? void 0 : z.table_search) == null ? void 0 : j.column_search, o.ui),
        E([$, "color", o.color], M, (G = (W = b == null ? void 0 : b.inertia_table) == null ? void 0 : W.table_search) == null ? void 0 : G.column_search, o.ui)
      );
    };
    function C($) {
      u.value && !u.value.contains($.target) && !$.target.closest(`[dusk="column-search-${o.columnKey}"]`) && x();
    }
    return ue(() => {
      document.addEventListener("click", C);
    }), Fe(() => {
      document.removeEventListener("click", C);
    }), ($, z) => (f(), v("div", sn, [
      s("button", {
        ref_key: "trigger",
        ref: r,
        onClick: d,
        class: I([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": g.value,
            "text-gray-400 hover:text-gray-600": !g.value
          }
        ]),
        dusk: `column-search-${e.columnKey}`
      }, [...z[2] || (z[2] = [
        s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          s("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, an),
      (f(), L(Pe, { to: "body" }, [
        i.value ? (f(), v("div", {
          key: 0,
          ref_key: "container",
          ref: u,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: z[1] || (z[1] = D(() => {
          }, ["stop"]))
        }, [
          s("div", un, [
            s("h3", cn, k(P(l).search) + " " + k(e.columnLabel), 1),
            s("div", dn, [
              s("input", {
                ref_key: "searchInput",
                ref: t,
                type: "text",
                value: n.value,
                class: I(m("input")),
                placeholder: `${P(l).search} ${e.columnLabel.toLowerCase()}...`,
                onInput: y,
                onKeydown: [
                  et(x, ["enter"]),
                  et(x, ["escape"])
                ]
              }, null, 42, fn),
              n.value && n.value !== "" ? (f(), v("div", mn, [
                s("button", {
                  type: "button",
                  class: I(m("reset_button")),
                  onClick: z[0] || (z[0] = (j) => S(""))
                }, [
                  s("span", pn, k(P(l).reset), 1),
                  z[3] || (z[3] = s("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1))
                ], 2)
              ])) : _("", !0)
            ])
          ])
        ], 512)) : _("", !0)
      ])),
      (f(), L(Pe, { to: "body" }, [
        i.value ? (f(), v("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: x
        })) : _("", !0)
      ]))
    ]));
  }
};
const hn = ["data-column-key"], vn = { class: "flex flex-row items-center justify-between w-full" }, bn = { class: "flex flex-row items-center" }, yn = { class: "uppercase" }, xn = ["sorted"], wn = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, kn = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Cn = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, _n = { class: "flex items-center space-x-1" }, $n = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const o = e, l = Y("columnResize", null), i = F(() => {
      if (!l)
        return "auto";
      const n = l.getColumnWidth(o.cell.key);
      return n === "auto" ? n : `${n}px`;
    }), t = F(() => (l == null ? void 0 : l.isResizing) || !1), r = F(() => (l == null ? void 0 : l.resizingColumn) || null);
    function u() {
      o.cell.sortable && o.cell.onSort(o.cell.key);
    }
    function a(n, g) {
      l && l.startResize(n, g);
    }
    return (n, g) => U((f(), v("th", {
      class: I(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: se({ width: i.value }),
      "data-column-key": e.cell.key
    }, [
      (f(), L(xe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: D(u, ["prevent"])
      }, {
        default: V(() => [
          s("span", vn, [
            s("span", bn, [
              R(n.$slots, "label", {}, () => [
                s("span", yn, k(e.cell.label), 1)
              ], !0),
              R(n.$slots, "sort", {}, () => [
                e.cell.sortable ? (f(), v("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: I(["w-3 h-3 ml-2", {
                    "text-gray-400": !e.cell.sorted,
                    "text-green-500": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? _("", !0) : (f(), v("path", wn)),
                  e.cell.sorted === "asc" ? (f(), v("path", kn)) : _("", !0),
                  e.cell.sorted === "desc" ? (f(), v("path", Cn)) : _("", !0)
                ], 10, xn)) : _("", !0)
              ], !0)
            ]),
            s("span", _n, [
              R(n.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (f(), L(gn, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  color: e.cell.color,
                  onClick: g[0] || (g[0] = D(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : _("", !0)
              ], !0),
              R(n.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (f(), L(ln, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  color: e.cell.color,
                  onClick: g[1] || (g[1] = D(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : _("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && P(l) ? (f(), L(Rr, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": a,
        "is-active": t.value && r.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : _("", !0)
    ], 14, hn)), [
      [ge, !e.cell.hidden]
    ]);
  }
}, Sn = /* @__PURE__ */ _e($n, [["__scopeId", "data-v-8684dc95"]]), Mn = ["dusk", "value"], qn = ["value"], lt = {
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
    const o = he(), l = e, i = F(() => {
      let a = [...l.options];
      return a.push(parseInt(l.value)), Ut(a).sort((n, g) => n - g);
    }), t = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, r = Y("themeVariables"), u = (a) => {
      var n, g;
      return X(
        E([a, "base"], t, (n = r == null ? void 0 : r.inertia_table) == null ? void 0 : n.per_page_selector, l.ui),
        E([a, "color", l.color], t, (g = r == null ? void 0 : r.inertia_table) == null ? void 0 : g.per_page_selector, l.ui)
      );
    };
    return (a, n) => (f(), v("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: I(u("select")),
      onChange: n[0] || (n[0] = (g) => e.onChange(g.target.value))
    }, [
      (f(!0), v(Q, null, J(i.value, (g) => (f(), v("option", {
        key: g,
        value: g
      }, k(g) + " " + k(P(o).per_page), 9, qn))), 128))
    ], 42, Mn));
  }
}, zn = {
  key: 0,
  class: "bg-white flex items-center"
}, In = { key: 0 }, Tn = { class: "hidden sm:inline ml-2" }, Nn = { class: "hidden sm:inline mr-2" }, Pn = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, Fn = { class: "flex flex-row space-x-4 items-center grow" }, jn = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, On = { class: "font-medium" }, Ln = { class: "font-medium" }, Rn = { class: "font-medium" }, An = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, En = { class: "sr-only" }, Bn = { class: "sr-only" }, Vn = {
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
    const o = he(), l = e, i = F(() => "links" in r.value ? r.value.links.length > 0 : !1), t = F(() => Object.keys(r.value).length > 0), r = F(() => l.meta), u = F(() => "prev_page_url" in r.value ? r.value.prev_page_url : null), a = F(() => "next_page_url" in r.value ? r.value.next_page_url : null), n = F(() => parseInt(r.value.per_page));
    return (g, d) => t.value ? (f(), v("nav", zn, [
      !e.hasData || r.value.total < 1 ? (f(), v("p", In, k(P(o).no_results_found), 1)) : _("", !0),
      e.hasData ? (f(), v("div", {
        key: 1,
        class: I(["flex-1 flex justify-between", { "sm:hidden": i.value }])
      }, [
        (f(), L(xe(u.value ? "a" : "div"), {
          class: I([{
            "cursor-not-allowed text-gray-400": !u.value,
            "text-gray-700 hover:text-gray-500": u.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: u.value,
          dusk: u.value ? "pagination-simple-previous" : null,
          onClick: d[0] || (d[0] = D((x) => e.onClick(u.value), ["prevent"]))
        }, {
          default: V(() => [
            d[4] || (d[4] = s("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              s("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M7 16l-4-4m0 0l4-4m-4 4h18"
              })
            ], -1)),
            s("span", Tn, k(P(o).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        K(lt, {
          dusk: "per-page-mobile",
          value: n.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (f(), L(xe(a.value ? "a" : "div"), {
          class: I([{
            "cursor-not-allowed text-gray-400": !a.value,
            "text-gray-700 hover:text-gray-500": a.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: a.value,
          dusk: a.value ? "pagination-simple-next" : null,
          onClick: d[1] || (d[1] = D((x) => e.onClick(a.value), ["prevent"]))
        }, {
          default: V(() => [
            s("span", Nn, k(P(o).next), 1),
            d[5] || (d[5] = s("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              s("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M17 8l4 4m0 0l-4 4m4-4H3"
              })
            ], -1))
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"]))
      ], 2)) : _("", !0),
      e.hasData && i.value ? (f(), v("div", Pn, [
        s("div", Fn, [
          K(lt, {
            dusk: "per-page-full",
            value: n.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          s("p", jn, [
            s("span", On, k(r.value.from), 1),
            ae(" " + k(P(o).to) + " ", 1),
            s("span", Ln, k(r.value.to), 1),
            ae(" " + k(P(o).of) + " ", 1),
            s("span", Rn, k(r.value.total), 1),
            ae(" " + k(P(o).results), 1)
          ])
        ]),
        s("div", null, [
          s("nav", An, [
            (f(), L(xe(u.value ? "a" : "div"), {
              class: I([{
                "cursor-not-allowed text-gray-400": !u.value,
                "text-gray-500 hover:bg-gray-50": u.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: u.value,
              dusk: u.value ? "pagination-previous" : null,
              onClick: d[2] || (d[2] = D((x) => e.onClick(u.value), ["prevent"]))
            }, {
              default: V(() => [
                s("span", En, k(P(o).previous), 1),
                d[6] || (d[6] = s("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  s("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"])),
            (f(!0), v(Q, null, J(r.value.links, (x, y) => (f(), v("div", { key: y }, [
              R(g.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (f(), L(xe(x.url ? "a" : "div"), {
                  key: 0,
                  href: x.url,
                  dusk: x.url ? `pagination-${x.label}` : null,
                  class: I(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !x.url,
                    "hover:bg-gray-50": x.url,
                    "bg-white": !x.active,
                    "bg-gray-100": x.active
                  }]),
                  onClick: D((S) => e.onClick(x.url), ["prevent"])
                }, {
                  default: V(() => [
                    ae(k(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : _("", !0)
              ])
            ]))), 128)),
            (f(), L(xe(a.value ? "a" : "div"), {
              class: I([{
                "cursor-not-allowed text-gray-400": !a.value,
                "text-gray-500 hover:bg-gray-50": a.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: a.value,
              dusk: a.value ? "pagination-next" : null,
              onClick: d[3] || (d[3] = D((x) => e.onClick(a.value), ["prevent"]))
            }, {
              default: V(() => [
                s("span", Bn, k(P(o).next), 1),
                d[7] || (d[7] = s("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  s("path", {
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
      ])) : _("", !0)
    ])) : _("", !0);
  }
}, Wn = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, Gn = ["dusk", "onClick"], Dn = {
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
    const o = e, l = T(null);
    function i(t) {
      o.onAdd(t), l.value.hide();
    }
    return (t, r) => (f(), L(je, {
      ref_key: "dropdown",
      ref: l,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: V(() => [...r[0] || (r[0] = [
        s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          s("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])]),
      default: V(() => [
        s("div", Wn, [
          (f(!0), v(Q, null, J(e.searchInputs, (u, a) => (f(), v("button", {
            key: a,
            dusk: `add-search-row-${u.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: D((n) => i(u.key), ["prevent"])
          }, k(u.label), 9, Gn))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, Un = ["data-column-key"], Hn = { class: "flex items-center" }, Kn = ["onClick", "title"], Xn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, Qn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, Jn = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], bt = {
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
  setup(e, { emit: o }) {
    const l = e, i = o, t = T([...l.columns]), r = T(!1), u = T(!1);
    ie(() => l.columns, (d) => {
      !r.value && !u.value && (t.value = [...d]), u.value && setTimeout(() => {
        u.value = !1;
      }, 100);
    }, { deep: !0 });
    function a(d, x) {
      const y = t.value.findIndex((S) => S.key === d);
      y !== -1 && (t.value[y].hidden = !x), i("columns-changed", t.value);
    }
    function n(d, x) {
      const y = t.value.findIndex((S) => S.key === d);
      y !== -1 && (t.value[y].pinned = !x), t.value.sort((S, M) => S.pinned && !M.pinned ? -1 : !S.pinned && M.pinned ? 1 : 0), i("columns-changed", t.value);
    }
    function g() {
      u.value = !0, i("columns-changed", t.value);
    }
    return (d, x) => (f(), L(P(Ht), {
      modelValue: t.value,
      "onUpdate:modelValue": x[0] || (x[0] = (y) => t.value = y),
      "item-key": "key",
      animation: 200,
      handle: ".drag-handle",
      onChange: g,
      onStart: x[1] || (x[1] = (y) => r.value = !0),
      onEnd: x[2] || (x[2] = (y) => r.value = !1)
    }, {
      item: V(({ element: y }) => [
        s("div", {
          class: "py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0",
          "data-test": "column-item",
          "data-column-key": y.key
        }, [
          s("div", Hn, [
            x[5] || (x[5] = s("div", { class: "drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600" }, [
              s("svg", {
                class: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                s("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            y.can_be_pinned !== !1 ? (f(), v("button", {
              key: 0,
              type: "button",
              class: I(["mr-2 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600", { "text-blue-500": y.pinned }]),
              onClick: D((S) => n(y.key, y.pinned), ["prevent"]),
              title: y.pinned ? "D\xE9s\xE9pingler la colonne" : "\xC9pingler la colonne"
            }, [
              y.pinned ? (f(), v("svg", Xn, [...x[3] || (x[3] = [
                s("g", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5"
                }, [
                  s("path", { d: "M9.5 14.5L3 21" }),
                  s("path", {
                    fill: "currentColor",
                    d: "m5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                  })
                ], -1)
              ])])) : (f(), v("svg", Qn, [...x[4] || (x[4] = [
                s("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, Kn)) : _("", !0),
            s("p", {
              class: I(["text-sm text-gray-900", { "text-gray-400": y.hidden, "font-semibold": y.pinned }])
            }, k(y.label), 3)
          ]),
          y.can_be_hidden && !y.pinned ? (f(), v("button", {
            key: 0,
            type: "button",
            class: I(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
              "bg-green-500": !y.hidden,
              "bg-gray-200": y.hidden
            }]),
            "aria-pressed": !y.hidden,
            "aria-labelledby": `toggle-column-${y.key}`,
            "aria-describedby": `toggle-column-${y.key}`,
            dusk: `toggle-column-${y.key}`,
            onClick: D((S) => a(y.key, y.hidden), ["prevent"])
          }, [
            x[6] || (x[6] = s("span", { class: "sr-only" }, "Column status", -1)),
            s("span", {
              "aria-hidden": "true",
              class: I([{
                "translate-x-5": !y.hidden,
                "translate-x-0": y.hidden
              }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
            }, null, 2)
          ], 10, Jn)) : _("", !0)
        ], 8, Un)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
};
const Yn = {
  key: 0,
  class: "ml-1"
}, Zn = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, el = { class: "px-2" }, tl = {
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
    },
    color: {
      type: String,
      default: "primary",
      required: !1
    }
  },
  setup(e) {
    const o = e, l = T([...o.columns]);
    ie(() => o.columns, (r) => {
      l.value = [...r];
    }, { deep: !0, immediate: !0 });
    const i = F(() => l.value.filter((r) => r.hidden).length);
    function t(r) {
      l.value = [...r], o.onChange(r);
    }
    return (r, u) => (f(), L(je, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: V(() => [
        u[0] || (u[0] = s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5",
          viewBox: "0 0 48 48"
        }, [
          s("path", {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "4",
            d: "m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
          })
        ], -1)),
        e.hasHiddenColumns ? (f(), v("span", Yn, "(" + k(i.value) + ")", 1)) : _("", !0)
      ]),
      default: V(() => [
        s("div", Zn, [
          s("div", el, [
            K(bt, {
              columns: l.value,
              "can-sort": !0,
              onColumnsChanged: t
            }, null, 8, ["columns"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, rl = /* @__PURE__ */ _e(tl, [["__scopeId", "data-v-eadc618a"]]), ol = {
  key: 0,
  class: "ml-1"
}, nl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, ll = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, sl = { class: "p-2" }, al = ["name", "value", "onChange"], il = ["value"], ul = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, cl = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, dl = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, fl = {
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
    const o = e;
    T(null);
    const l = F(() => o.filters.filter((n) => !i(n)).length);
    function i(n) {
      if (n.value === null)
        return !0;
      switch (n.type) {
        case "number_range":
          return Number(Math.max(...n.value)) === Number(n.max) && Number(Math.min(...n.value)) === Number(n.min);
        case "select":
          return n.value === "";
        case "toggle":
          return !1;
        case "date":
          return !n.value || typeof n.value == "object" && !n.value.type;
        case "number":
          return !n.value || typeof n.value == "object" && !n.value.type;
        default:
          return !n.value;
      }
    }
    function t(n) {
      let g = n.value;
      n.value && (Number(Math.max(...n.value)) === Number(n.max) && Number(Math.min(...n.value)) === Number(n.min) ? g = null : Number(Math.min(...n.value)) === 0 && Number(Math.max(...n.value)) === 0 && (g = ["0", "0"])), o.onFilterChange(n.key, g);
    }
    const r = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, u = Y("themeVariables"), a = (n) => {
      var g, d, x, y;
      return X(
        E([n, "base"], r, (d = (g = u == null ? void 0 : u.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : d.select_filter, o.ui),
        E([n, "color", o.color], r, (y = (x = u == null ? void 0 : u.inertia_table) == null ? void 0 : x.table_filter) == null ? void 0 : y.select_filter, o.ui)
      );
    };
    return (n, g) => (f(), L(je, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: V(() => [
        g[0] || (g[0] = s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          s("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        e.hasEnabledFilters ? (f(), v("span", ol, "(" + k(l.value) + ")", 1)) : _("", !0)
      ]),
      default: V(() => [
        s("div", nl, [
          (f(!0), v(Q, null, J(e.filters, (d, x) => (f(), v("div", { key: x }, [
            s("h3", ll, k(d.label), 1),
            s("div", sl, [
              d.type === "select" ? (f(), v("select", {
                key: 0,
                name: d.key,
                value: d.value,
                class: I(a("select", e.color)),
                onChange: (y) => e.onFilterChange(d.key, y.target.value)
              }, [
                (f(!0), v(Q, null, J(d.options, (y, S) => (f(), v("option", {
                  key: S,
                  value: S
                }, k(y), 9, il))), 128))
              ], 42, al)) : _("", !0),
              d.type === "toggle" ? (f(), L(mt, {
                key: 1,
                filter: d,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : _("", !0),
              d.type === "number_range" ? (f(), v("div", ul, [
                K(pt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [(y) => d.value = y, (y) => t(d)],
                  max: d.max,
                  min: d.min,
                  prefix: d.prefix,
                  suffix: d.suffix,
                  step: d.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : _("", !0),
              d.type === "date" ? (f(), v("div", cl, [
                K(ht, {
                  filter: d,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : _("", !0),
              d.type === "number" ? (f(), v("div", dl, [
                K(gt, {
                  filter: d,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : _("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, ml = { class: "relative" }, pl = ["placeholder", "value"], gl = {
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
    const o = e, l = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, i = Y("themeVariables"), t = (r) => {
      var u, a;
      return X(
        E([r, "base"], l, (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.global_search, o.ui),
        E([r, "color", o.color], l, (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.global_search, o.ui)
      );
    };
    return (r, u) => (f(), v("div", ml, [
      s("input", {
        class: I(t("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: u[0] || (u[0] = (a) => e.onChange(a.target.value))
      }, null, 42, pl),
      u[1] || (u[1] = s("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
        s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          s("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ])
      ], -1))
    ]));
  }
}, hl = { class: "flex rounded-md shadow-sm relative mt-3" }, vl = ["for"], bl = ["id", "name", "value", "onInput"], yl = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, xl = ["dusk", "onClick"], wl = {
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
    const o = { el: T([]) };
    let l = F(() => o.el.value);
    const i = e;
    function t(n) {
      return i.forcedVisibleSearchInputs.includes(n);
    }
    ie(i.forcedVisibleSearchInputs, (n) => {
      const g = n.length > 0 ? n[n.length - 1] : null;
      !g || at().then(() => {
        const d = Kt(l.value, (x) => x.name === g);
        d && d.focus();
      });
    }, { immediate: !0 });
    const r = {
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
    }, u = Y("themeVariables"), a = (n) => {
      var g, d;
      return X(
        E([n, "base"], r, (g = u == null ? void 0 : u.inertia_table) == null ? void 0 : g.table_search_rows, i.ui),
        E([n, "color", i.color], r, (d = u == null ? void 0 : u.inertia_table) == null ? void 0 : d.table_search_rows, i.ui)
      );
    };
    return (n, g) => (f(!0), v(Q, null, J(e.searchInputs, (d, x) => U((f(), v("div", {
      key: x,
      class: "px-4 sm:px-0"
    }, [
      s("div", hl, [
        s("label", {
          for: d.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          g[0] || (g[0] = s("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-5 w-5 mr-2 text-gray-400",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, [
            s("path", {
              "fill-rule": "evenodd",
              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
              "clip-rule": "evenodd"
            })
          ], -1)),
          s("span", null, k(d.label), 1)
        ], 8, vl),
        (f(), v("input", {
          id: d.key,
          ref_for: !0,
          ref: o.el,
          key: d.key,
          name: d.key,
          value: d.value,
          type: "text",
          class: I(a("input")),
          onInput: (y) => e.onChange(d.key, y.target.value)
        }, null, 42, bl)),
        s("div", yl, [
          s("button", {
            class: I(a("remove_button")),
            dusk: `remove-search-row-${d.key}`,
            onClick: D((y) => e.onRemove(d.key), ["prevent"])
          }, [...g[1] || (g[1] = [
            s("span", { class: "sr-only" }, "Remove search", -1),
            s("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              s("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M6 18L18 6M6 6l12 12"
              })
            ], -1)
          ])], 10, xl)
        ])
      ])
    ])), [
      [ge, d.value !== null || t(d.key)]
    ])), 128));
  }
}, kl = {
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
    const o = he(), l = e, i = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, t = Y("themeVariables"), r = (u) => {
      var a, n;
      return X(
        E([u, "base"], i, (a = t == null ? void 0 : t.inertia_table) == null ? void 0 : a.reset_button, l.ui),
        E([u, "color", l.color], i, (n = t == null ? void 0 : t.inertia_table) == null ? void 0 : n.reset_button, l.ui)
      );
    };
    return (u, a) => {
      var n;
      return f(), v("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: I(r("button")),
        "aria-haspopup": "true",
        onClick: a[0] || (a[0] = D((...g) => e.onClick && e.onClick(...g), ["prevent"]))
      }, [
        a[1] || (a[1] = s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 mr-2 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          s("path", {
            "fill-rule": "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        s("span", null, k((n = P(o).reset) != null ? n : "Reset"), 1)
      ], 2);
    };
  }
}, Cl = {}, _l = { class: "flow-root" }, $l = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, Sl = { class: "inline-block min-w-full w-full max-w-full py-2 align-middle sm:px-6 lg:px-8" }, Ml = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function ql(e, o) {
  return f(), v("div", _l, [
    s("div", $l, [
      s("div", Sl, [
        s("div", Ml, [
          R(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const zl = /* @__PURE__ */ _e(Cl, [["render", ql]]), Il = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Tl = ["dusk", "onClick"], Nl = { class: "px-2" }, Pl = {
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
    const o = he(), l = e, i = T(!1), t = T(!1);
    function r() {
      i.value = t.value = !1;
    }
    function u(a) {
      var n, g;
      (n = l.actions.toggleColumns) != null && n.onReorder ? l.actions.toggleColumns.onReorder(a) : (g = l.actions.toggleColumns) != null && g.onChange && l.actions.toggleColumns.onChange(a);
    }
    return (a, n) => (f(), L(je, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: r
    }, {
      button: V(() => [...n[5] || (n[5] = [
        s("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          s("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: V(() => {
        var g, d, x, y, S;
        return [
          s("div", Il, [
            U(s("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (f(), v("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: n[0] || (n[0] = (M) => t.value = !0)
              }, [
                n[6] || (n[6] = s("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  s("path", {
                    "fill-rule": "evenodd",
                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                s("span", null, k((g = P(o).add_search_fields) != null ? g : "Add search field"), 1)
              ])) : _("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (f(), v("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: n[1] || (n[1] = (M) => i.value = !0)
              }, [
                n[7] || (n[7] = s("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  s("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                  s("path", {
                    "fill-rule": "evenodd",
                    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                s("span", null, k((d = P(o).show_hide_columns) != null ? d : "Show / Hide columns"), 1)
              ])) : _("", !0),
              n[9] || (n[9] = s("hr", null, null, -1)),
              "reset" in e.actions ? (f(), v("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: n[2] || (n[2] = (...M) => {
                  var b, m;
                  return ((b = e.actions.reset) == null ? void 0 : b.onClick) && ((m = e.actions.reset) == null ? void 0 : m.onClick(...M));
                })
              }, [
                n[8] || (n[8] = s("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  s("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                s("span", null, k((x = P(o).grouped_reset) != null ? x : "Reset"), 1)
              ])) : _("", !0)
            ], 512), [
              [ge, !i.value && !t.value]
            ]),
            U(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: n[3] || (n[3] = (M) => t.value = !1)
              }, [
                n[10] || (n[10] = s("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  s("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                s("span", null, k((y = P(o).add_search_fields) != null ? y : "Add search field"), 1)
              ]),
              (f(!0), v(Q, null, J(e.actions.searchFields.searchInputs, (M, b) => (f(), v("button", {
                key: b,
                dusk: `add-search-row-${M.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: D((m) => e.actions.searchFields.onClick(M.key), ["prevent"])
              }, k(M.label), 9, Tl))), 128))
            ], 512), [
              [ge, t.value]
            ]),
            U(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: n[4] || (n[4] = (M) => i.value = !1)
              }, [
                n[11] || (n[11] = s("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  s("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                s("span", null, k((S = P(o).show_hide_columns) != null ? S : "Show / Hide columns"), 1)
              ]),
              s("div", Nl, [
                K(bt, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: u
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ge, i.value]
            ]),
            U(s("div", null, [
              R(a.$slots, "default")
            ], 512), [
              [ge, !i.value && !t.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function Fl(e) {
  const o = T(!1), l = T(null), i = T(0), t = T(0), r = Ot({}), u = () => {
    if (e === "default")
      return;
    const m = localStorage.getItem(`table-column-widths-${e}`);
    if (m)
      try {
        const C = JSON.parse(m);
        Object.assign(r, C);
      } catch (C) {
        console.warn("Unable to load column widths:", C);
      }
  }, a = () => {
    e !== "default" && localStorage.setItem(`table-column-widths-${e}`, JSON.stringify(r));
  }, n = (m, C) => {
    m.preventDefault(), m.stopPropagation(), o.value = !0, l.value = C, i.value = m.clientX;
    const $ = m.target.closest("th");
    t.value = $.offsetWidth;
    const z = $.closest("table");
    z && z.querySelectorAll("thead th[data-column-key]").forEach((W) => {
      const G = W.getAttribute("data-column-key"), Z = W.offsetWidth;
      r[G] || (r[G] = Z), W.style.width = `${r[G]}px`;
      const ee = Array.from(W.parentNode.children).indexOf(W);
      z.querySelectorAll("tbody tr").forEach((be) => {
        const oe = be.children[ee];
        oe && (oe.style.width = `${r[G]}px`);
      });
    }), document.addEventListener("mousemove", g), document.addEventListener("mouseup", d), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, g = (m) => {
    if (!o.value || !l.value)
      return;
    const C = m.clientX - i.value, $ = Math.max(50, t.value + C);
    r[l.value] = $;
    const z = document.querySelector(`th[data-column-key="${l.value}"]`);
    if (z) {
      z.style.width = `${$}px`;
      const j = z.closest("table");
      if (j) {
        const W = Array.from(z.parentNode.children).indexOf(z);
        j.querySelectorAll("tbody tr").forEach((Z) => {
          const ee = Z.children[W];
          ee && (ee.style.width = `${$}px`);
        });
      }
    }
  }, d = () => {
    o.value && (o.value = !1, l.value = null, a(), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", d), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, x = (m) => r[m] || "auto", y = (m, C) => {
    r[m] = C, a();
  }, S = (m) => {
    if (!m)
      return;
    m.querySelectorAll("thead th[data-column-key]").forEach(($) => {
      const z = $.getAttribute("data-column-key");
      if (!r[z]) {
        const G = $.offsetWidth;
        r[z] = Math.max(G, 100);
      }
      $.style.width = `${r[z]}px`;
      const j = Array.from($.parentNode.children).indexOf($);
      m.querySelectorAll("tbody tr").forEach((G) => {
        const Z = G.children[j];
        Z && (Z.style.width = `${r[z]}px`);
      });
    });
  }, M = () => {
    Object.keys(r).forEach((m) => {
      delete r[m];
    }), e !== "default" && localStorage.removeItem(`table-column-widths-${e}`);
  }, b = () => {
    o.value && (document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", d), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return ue(() => {
    u();
  }), Fe(() => {
    b();
  }), {
    isResizing: o,
    resizingColumn: l,
    columnWidths: r,
    startResize: n,
    getColumnWidth: x,
    setColumnWidth: y,
    resetColumnWidths: M,
    loadColumnWidths: u,
    saveColumnWidths: a,
    initializeColumnWidths: S
  };
}
const jl = ["dusk"], Ol = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0 space-x-2" }, Ll = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0"
}, Rl = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, Al = ["href"], El = { class: "overflow-x-auto" }, Bl = { class: "bg-gray-50" }, Vl = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border pinned-checkbox-header",
  style: { width: "60px" }
}, Wl = ["id"], Gl = { class: "divide-y divide-gray-200 bg-white" }, Dl = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500 pinned-checkbox",
  style: { width: "60px" }
}, Ul = ["id", "onUpdate:modelValue"], Hl = ["onClick", "data-column-key"], Kl = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, Xl = {
  key: 0,
  class: "italic text-sm px-2"
}, Ql = {
  key: 1,
  class: "flex justify-center py-4"
}, Jl = {
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
    }
  },
  emits: ["rowClicked", "selectionChanged"],
  setup(e, { emit: o }) {
    const l = he(), i = o, t = e;
    Lt();
    const r = t.resizeableColumns ? Fl(t.name) : null;
    Rt("columnResize", r);
    const u = T(!1), a = F(() => rt().props.queryBuilderProps ? { ...rt().props.queryBuilderProps[t.name] } : {}), n = T(a.value), g = T([]), d = T(null), x = T(null), y = T(!1);
    let S;
    const M = F(() => a.value.pageName), b = T([]), m = T(null), C = T(!1), $ = F(() => a.value.hasToggleableColumns || a.value.hasFilters || a.value.hasSearchInputs ? !1 : !a.value.globalSearch), z = F(() => a.value.infiniteScrolling ? g.value : Object.keys(t.resource).length === 0 ? t.data : "data" in t.resource ? t.resource.data : t.resource), j = F(() => Object.keys(t.resource).length === 0 ? t.meta : "links" in t.resource && "meta" in t.resource && Object.keys(t.resource.links).length === 4 && "next" in t.resource.links && "prev" in t.resource.links ? {
      ...t.resource.meta,
      next_page_url: t.resource.links.next,
      prev_page_url: t.resource.links.prev
    } : "meta" in t.resource ? t.resource.meta : t.resource), W = F(() => z.value.length > 0 ? !0 : j.value.total > 0), G = T({
      reset: {
        onClick: O
      },
      toggleColumns: {
        show: a.value.hasToggleableColumns,
        columns: a.value.columns,
        onChange: ne
      },
      searchFields: {
        show: a.value.hasSearchInputs && !t.hideSearchInputsAboveTable,
        searchInputs: a.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: a.value.hasSearchInputsWithoutValue,
        onClick: ee
      }
    });
    function Z(c) {
      b.value = b.value.filter((p) => p != c), re(c, null);
    }
    function ee(c) {
      b.value.push(c);
    }
    const ve = F(() => {
      if (b.value.length > 0)
        return !0;
      const c = Ee.parse(location.search.substring(1));
      if (c[M.value] > 1)
        return !0;
      const h = t.name === "default" ? "" : t.name + "_";
      let q = !1;
      return fe(["filter", "columns", "cursor", "sort"], (w) => {
        const B = c[h + w];
        w === "sort" && B === a.value.defaultSort || B !== void 0 && (q = !0);
      }), q;
    }), be = (c, p) => {
      let h = [];
      if (t.striped && p % 2 && h.push("bg-gray-50"), t.striped ? h.push("hover:bg-gray-100") : h.push("hover:bg-gray-50"), t.rowClass && typeof t.rowClass == "function") {
        const q = t.rowClass(c);
        q && h.push(q);
      }
      return h.join(" ");
    }, oe = F(() => {
      if (!t.showExportButton)
        return null;
      const c = new URL(window.location.href);
      c.search = "";
      const p = new URLSearchParams();
      if (a.value.page && a.value.page > 1 && p.set(M.value, a.value.page), a.value.sort) {
        const w = t.name === "default" ? "sort" : `${t.name}_sort`;
        p.set(w, a.value.sort);
      }
      const h = {};
      if (n.value.filters.forEach((w) => {
        w.value !== null && w.value !== void 0 && w.value !== "" && (h[w.key] = w.value);
      }), n.value.searchInputs.forEach((w) => {
        w.value !== null && w.value !== void 0 && w.value !== "" && (h[w.key] = w.value);
      }), Object.keys(h).length > 0) {
        const w = t.name === "default" ? "filter" : `${t.name}_filter`;
        Object.keys(h).forEach((B) => {
          const H = h[B];
          Array.isArray(H) ? H.forEach((ye, Ae) => {
            p.set(`${w}[${B}][${Ae}]`, ye);
          }) : typeof H == "object" && H !== null ? Object.keys(H).forEach((ye) => {
            p.set(`${w}[${B}][${ye}]`, H[ye]);
          }) : p.set(`${w}[${B}]`, H);
        });
      }
      const q = n.value.columns.filter((w) => !w.hidden).map((w) => w.key);
      if (q.length !== n.value.columns.length) {
        const w = t.name === "default" ? "columns" : `${t.name}_columns`;
        q.forEach((B) => {
          p.append(`${w}[]`, B);
        });
      }
      if (a.value.perPageOptions && a.value.perPageOptions.length > 0) {
        const w = new URLSearchParams(window.location.search).get("perPage") || a.value.perPageOptions[0];
        w && w !== a.value.perPageOptions[0] && p.set("perPage", w);
      }
      return p.set("do_export", "1"), p.set("table", t.name || "default"), c.search = p.toString(), c.toString();
    });
    function O() {
      b.value = [], fe(n.value.filters, (c, p) => {
        n.value.filters[p].value = null;
      }), fe(n.value.searchInputs, (c, p) => {
        n.value.searchInputs[p].value = null;
      }), fe(n.value.columns, (c, p) => {
        n.value.columns[p].hidden = c.can_be_hidden ? !a.value.defaultVisibleToggleableColumns.includes(c.key) : !1, n.value.columns[p].pinned = !1;
      }), localStorage.removeItem(`columns-${t.name}`), t.resizeableColumns && r && r.resetColumnWidths(), n.value.sort = null, n.value.cursor = null, n.value.page = 1;
    }
    const $e = {};
    function re(c, p) {
      clearTimeout($e[c]), $e[c] = setTimeout(() => {
        Le.value && t.preventOverlappingRequests && Le.value.cancel();
        const h = de("searchInputs", c);
        n.value.searchInputs[h].value = p, n.value.cursor = null, n.value.page = 1;
      }, t.inputDebounceMs);
    }
    function Se(c) {
      re("global", c);
    }
    function ce(c, p) {
      const h = de("filters", c);
      n.value.filters[h].value = p, n.value.cursor = null, n.value.page = 1;
    }
    function Me(c) {
      n.value.cursor = null, n.value.perPage = c, n.value.page = 1;
    }
    function de(c, p) {
      return Jt(n.value[c], (h) => h.key == p);
    }
    function ne(c) {
      n.value.columns = c, n.value.columns.sort((p, h) => p.pinned && !h.pinned ? -1 : !p.pinned && h.pinned ? 1 : 0), Ie();
    }
    function Ie() {
      if (t.name && t.name !== "default") {
        const c = n.value.columns.map((p, h) => ({
          key: p.key,
          hidden: p.hidden,
          pinned: p.pinned || !1,
          order: h
        }));
        localStorage.setItem(`columns-${t.name}`, JSON.stringify(c));
      }
    }
    function te() {
      let c = {};
      return fe(n.value.searchInputs, (p) => {
        p.value !== null && (c[p.key] = p.value);
      }), fe(n.value.filters, (p) => {
        let h = p.value;
        h !== null && (p.type === "number_range" && Number(Math.max(...p.value)) === Number(p.max) && Number(Math.min(...p.value)) === Number(p.min) && (h = null), c[p.key] = h);
      }), c;
    }
    function yt() {
      const c = n.value.columns;
      let p = Qt(c, (q) => !q.hidden), h = Zt(p, (q) => q.key).sort();
      return Yt(h, a.value.defaultVisibleToggleableColumns) ? {} : h;
    }
    function xt() {
      const c = te(), p = yt(), h = {};
      Object.keys(c).length > 0 && (h.filter = c), Object.keys(p).length > 0 && (h.columns = p);
      const q = n.value.cursor, w = n.value.page, B = n.value.sort, H = n.value.perPage;
      return q && (h.cursor = q), w > 1 && (h.page = w), H > 1 && (h.perPage = H), B && (h.sort = B), h;
    }
    function De(c) {
      if (!c)
        return null;
      if (t.paginationClickCallback && typeof t.paginationClickCallback == "function") {
        t.paginationClickCallback(c);
        return;
      }
      Ue(c);
    }
    function wt() {
      const c = Ee.parse(location.search.substring(1)), p = t.name === "default" ? "" : t.name + "_";
      fe(["filter", "columns", "cursor", "sort"], (q) => {
        delete c[p + q];
      }), delete c[M.value], fe(xt(), (q, w) => {
        w === "page" ? c[M.value] = q : w === "perPage" ? c.perPage = q : c[p + w] = q;
      });
      let h = Ee.stringify(c, {
        filter(q, w) {
          return typeof w == "object" && w !== null ? er(w) : w;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!h || h === M.value + "=1") && (h = ""), h;
    }
    const Oe = T(!1), Le = T(null);
    function Ue(c) {
      !c || tr.get(
        c,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: t.preserveScroll !== !1,
          onBefore() {
            Oe.value = !0;
          },
          onCancelToken(p) {
            Le.value = p;
          },
          onFinish() {
            Oe.value = !1;
          },
          onSuccess() {
            if (t.preserveScroll === "table-top") {
              const h = m.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: h });
            }
          }
        }
      );
    }
    function kt(c, p, h) {
      var q;
      t.hasCheckboxes && ((q = c.target) == null ? void 0 : q.parentElement.cellIndex) === 0 || i("rowClicked", c, p, h);
    }
    async function Ct() {
      if (!(y.value || !d.value)) {
        y.value = !0;
        try {
          const c = await fetch(d.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!c.ok)
            throw new Error("Network response was not ok");
          const p = await c.json();
          g.value = [...g.value, ...p.data], d.value = p.next_page_url;
        } catch (c) {
          console.error("Error loading more data:", c);
        } finally {
          y.value = !1;
        }
      }
    }
    function Re() {
      !a.value.infiniteScrolling || !x.value || (S && (S.disconnect(), S = null), t.resource && t.resource.data && g.value.length === 0 && (g.value = [...t.resource.data], d.value = j.value.next_page_url || null), S = new IntersectionObserver(
        (c) => {
          c.forEach((p) => {
            p.isIntersecting && Ct();
          });
        },
        {
          rootMargin: "0px 0px 10px 0px"
        }
      ), S.observe(x.value));
    }
    ie(n, () => {
      a.value.infiniteScrolling && (g.value = [], d.value = null), Ue(location.pathname + "?" + wt()), C.value = !1;
    }, { deep: !0 }), ie(() => t.resource, () => {
      var c;
      if (!a.value.infiniteScrolling && ((c = t.resource) == null ? void 0 : c.data)) {
        const p = t.resource.data.filter((h) => h.__itSelected);
        i("selectionChanged", p);
      }
    }, { deep: !0 }), ie(() => a.value, (c) => {
      var h;
      if (!a.value.infiniteScrolling)
        return;
      const p = ((h = t.resource) == null ? void 0 : h.data) || [];
      if (p.length > 0) {
        g.value = [...p], d.value = j.value.next_page_url || null;
        const q = p.filter((w) => w.__itSelected);
        i("selectionChanged", q), setTimeout(() => {
          x.value && Re();
        }, 100);
      }
    }, { deep: !0 });
    const He = () => {
      t.resizeableColumns && r && setTimeout(() => {
        var p;
        const c = (p = m.value) == null ? void 0 : p.querySelector("table");
        c && r.initializeColumnWidths(c);
      }, 0), a.value.infiniteScrolling && setTimeout(() => {
        x.value && Re();
      }, 100);
    };
    ue(() => {
      document.addEventListener("inertia:success", He), _t(), t.resizeableColumns && r && setTimeout(() => {
        var p;
        const c = (p = m.value) == null ? void 0 : p.querySelector("table");
        c && r.initializeColumnWidths(c);
      }, 0), a.value.infiniteScrolling && Re();
    });
    function _t() {
      if (!t.name || t.name === "default")
        return;
      const c = localStorage.getItem(`columns-${t.name}`);
      if (!!c)
        try {
          const p = JSON.parse(c);
          if (p.length > 0 && "order" in p[0]) {
            const h = new Map(p.map((q) => [q.key, q]));
            n.value.columns.forEach((q, w) => {
              const B = h.get(q.key);
              B && (n.value.columns[w].hidden = B.hidden, n.value.columns[w].pinned = B.pinned || !1);
            }), n.value.columns.sort((q, w) => {
              var Ye, Ze;
              const B = h.get(q.key), H = h.get(w.key);
              if (q.pinned && !w.pinned)
                return -1;
              if (!q.pinned && w.pinned)
                return 1;
              const ye = (Ye = B == null ? void 0 : B.order) != null ? Ye : 999, Ae = (Ze = H == null ? void 0 : H.order) != null ? Ze : 999;
              return ye - Ae;
            });
          } else
            p.forEach((h, q) => {
              const w = n.value.columns.findIndex((B) => B.key === h.key);
              w !== -1 && (n.value.columns[w].hidden = h.hidden, n.value.columns[w].pinned = h.pinned || !1);
            });
        } catch (p) {
          console.warn("Error loading column order from localStorage:", p);
        }
    }
    Fe(() => {
      document.removeEventListener("inertia:success", He), S && (S.disconnect(), S = null);
    });
    function Ke(c) {
      n.value.sort == c ? n.value.sort = `-${c}` : n.value.sort = c, n.value.cursor = null, n.value.page = 1;
    }
    function Te(c) {
      const p = de("columns", c);
      return !n.value.columns[p].hidden;
    }
    function Ne(c) {
      const p = de("columns", c), h = Xt(n.value.columns[p]);
      h.onSort = Ke, h.filters = n.value.filters.filter(
        (w) => w.key === c || w.key.startsWith(c + "_") || w.key.includes(c)
      );
      const q = n.value.searchInputs.filter(
        (w) => w.key === c
      );
      return q.length > 0 ? (h.searchable = !0, h.searchInputs = q) : (h.searchable = !1, h.searchInputs = []), h.onFilterChange = ce, h.onSearchChange = re, h.color = t.color, h;
    }
    function $t() {
      t.resource.data.forEach((c) => {
        c.__itSelected = C.value;
      });
    }
    function St(c) {
      if (!t.resizeableColumns || !r)
        return "auto";
      const p = r.getColumnWidth(c);
      return p === "auto" ? p : `${p}px`;
    }
    function Xe(c) {
      if (!t.resizeableColumns || !r)
        return "0px";
      let p = 0;
      const h = n.value.columns.filter((q) => !q.hidden);
      t.hasCheckboxes && (p += 60);
      for (const q of h) {
        if (q.key === c)
          break;
        if (q.pinned) {
          const w = r.getColumnWidth(q.key);
          p += w === "auto" ? 150 : w;
        }
      }
      return `${p}px`;
    }
    function Qe(c) {
      const p = n.value.columns.find((h) => h.key === c);
      return p && p.pinned;
    }
    function Mt(c) {
      return Qe(c) ? {
        position: "sticky",
        left: Xe(c),
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function qt(c) {
      return Qe(c) ? {
        position: "sticky",
        left: Xe(c),
        zIndex: 11,
        backgroundColor: "#f9fafb",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const zt = F(() => {
      if (!t.resizeableColumns || !r)
        return "100%";
      let c = 0, p = !1;
      return t.hasCheckboxes && (c += 60), a.value.columns.forEach((h) => {
        if (!Te(h.key))
          return;
        const q = r.getColumnWidth(h.key);
        q === "auto" ? p = !0 : c += q;
      }), !p && c > 0 ? `${c}px` : "max(100%, " + (c > 0 ? c + "px" : "800px") + ")";
    }), Je = F(() => t.resource.data.filter((c) => c.__itSelected).length), It = F(() => Je.value === 0 ? l.noLineSelected : `${Je.value} ${l.lineSelected}`);
    function Tt() {
      t.resizeableColumns && (u.value = !0);
    }
    function Nt() {
      t.resizeableColumns && setTimeout(() => {
        u.value = !1;
      }, 100);
    }
    return (c, p) => (f(), L(At, null, {
      default: V(() => [
        (f(), v("fieldset", {
          ref_key: "tableFieldset",
          ref: m,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: I(["min-w-0", { "opacity-75": Oe.value }])
        }, [
          s("div", Ol, [
            a.value.globalSearch ? (f(), v("div", Ll, [
              R(c.$slots, "tableGlobalSearch", {
                hasGlobalSearch: a.value.globalSearch,
                label: a.value.globalSearch ? a.value.globalSearch.label : null,
                value: a.value.globalSearch ? a.value.globalSearch.value : null,
                onChange: Se
              }, () => [
                a.value.globalSearch ? (f(), L(gl, {
                  key: 0,
                  class: "grow",
                  label: a.value.globalSearch.label,
                  value: a.value.globalSearch.value,
                  "on-change": Se,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : _("", !0)
              ], !0)
            ])) : _("", !0),
            s("div", null, [
              R(c.$slots, "tableFilter", {
                hasFilters: a.value.hasFilters,
                hasEnabledFilters: a.value.hasEnabledFilters,
                filters: a.value.filters,
                onFilterChange: ce
              }, () => [
                a.value.hasFilters ? (f(), L(fl, {
                  key: 0,
                  "has-enabled-filters": a.value.hasEnabledFilters,
                  filters: a.value.filters,
                  "on-filter-change": ce,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : _("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? R(c.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: a.value.hasSearchInputs,
              hasSearchInputsWithoutValue: a.value.hasSearchInputsWithoutValue,
              searchInputs: a.value.searchInputsWithoutGlobal,
              onAdd: ee
            }, () => [
              a.value.hasSearchInputs ? (f(), L(Dn, {
                key: 0,
                "search-inputs": a.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": a.value.hasSearchInputsWithoutValue,
                "on-add": ee,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : _("", !0)
            ], !0) : _("", !0),
            e.withGroupedMenu ? _("", !0) : R(c.$slots, "tableColumns", {
              key: 2,
              hasColumns: a.value.hasToggleableColumns,
              columns: n.value.columns,
              hasHiddenColumns: a.value.hasHiddenColumns,
              onChange: ne
            }, () => [
              a.value.hasToggleableColumns ? (f(), L(rl, {
                key: 0,
                columns: n.value.columns,
                "has-hidden-columns": a.value.hasHiddenColumns,
                "on-change": ne,
                "table-name": e.name,
                color: e.color
              }, null, 8, ["columns", "has-hidden-columns", "table-name", "color"])) : _("", !0)
            ], !0),
            e.withGroupedMenu ? R(c.$slots, "groupedAction", {
              key: 3,
              actions: G.value
            }, () => [
              K(Pl, {
                color: e.color,
                actions: G.value
              }, {
                default: V(() => [
                  R(c.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : _("", !0),
            e.withGroupedMenu ? _("", !0) : R(c.$slots, "tableReset", {
              key: 4,
              canBeReset: ve.value,
              onClick: O
            }, () => [
              ve.value ? (f(), v("div", Rl, [
                K(kl, {
                  "on-click": O,
                  color: e.color
                }, null, 8, ["color"])
              ])) : _("", !0)
            ], !0),
            e.showExportButton ? R(c.$slots, "exportButton", {
              key: 5,
              exportUrl: oe.value,
              translations: P(l)
            }, () => [
              s("a", {
                href: oe.value,
                class: "relative flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              }, [...p[3] || (p[3] = [
                s("svg", {
                  class: "h-5 w-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1)
              ])], 8, Al)
            ], !0) : _("", !0)
          ]),
          e.hideSearchInputsAboveTable ? _("", !0) : R(c.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: a.value.hasSearchInputsWithValue,
            searchInputs: a.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: b.value,
            onChange: re
          }, () => [
            a.value.hasSearchInputsWithValue || b.value.length > 0 ? (f(), L(wl, {
              key: 0,
              "search-inputs": a.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": b.value,
              "on-change": re,
              "on-remove": Z,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : _("", !0)
          ], !0),
          R(c.$slots, "tableWrapper", { meta: j.value }, () => [
            K(zl, {
              class: I({ "mt-3": !$.value })
            }, {
              default: V(() => [
                R(c.$slots, "table", {}, () => [
                  s("div", El, [
                    s("table", {
                      class: I(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && u.value }]),
                      style: se([{ "table-layout": "fixed", "min-width": "100%" }, { width: zt.value }]),
                      onMouseenter: p[1] || (p[1] = (h) => e.resizeableColumns ? Tt : null),
                      onMouseleave: p[2] || (p[2] = (h) => e.resizeableColumns ? Nt : null)
                    }, [
                      s("thead", Bl, [
                        R(c.$slots, "head", {
                          show: Te,
                          sortBy: Ke,
                          header: Ne
                        }, () => [
                          s("tr", null, [
                            e.hasCheckboxes ? (f(), v("th", Vl, [
                              U(s("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: $t,
                                "onUpdate:modelValue": p[0] || (p[0] = (h) => C.value = h),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, Wl), [
                                [tt, C.value]
                              ])
                            ])) : _("", !0),
                            (f(!0), v(Q, null, J(n.value.columns, (h) => (f(), L(Sn, {
                              cell: Ne(h.key),
                              style: se(qt(h.key))
                            }, {
                              label: V(() => [
                                R(c.$slots, `header(${h.key})`, {
                                  label: Ne(h.key).label,
                                  column: Ne(h.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      s("tbody", Gl, [
                        R(c.$slots, "body", { show: Te }, () => [
                          (f(!0), v(Q, null, J(z.value, (h, q) => (f(), v("tr", {
                            key: `table-${e.name}-row-${q}`,
                            class: I(be(h, q))
                          }, [
                            e.hasCheckboxes ? (f(), v("td", Dl, [
                              U(s("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${q}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (w) => h.__itSelected = w
                              }, null, 8, Ul), [
                                [tt, h.__itSelected]
                              ])
                            ])) : _("", !0),
                            (f(!0), v(Q, null, J(n.value.columns, (w, B) => U((f(), v("td", {
                              key: `table-${e.name}-row-${q}-column-${w.key}`,
                              onClick: (H) => kt(H, h, w.key),
                              class: I(w.body_class),
                              "data-column-key": w.key,
                              style: se({
                                width: St(w.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...Mt(w.key)
                              })
                            }, [
                              R(c.$slots, `cell(${w.key})`, { item: h }, () => [
                                ae(k(h[w.key]), 1)
                              ], !0)
                            ], 14, Hl)), [
                              [ge, Te(w.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                s("div", {
                  ref_key: "intersectElement",
                  ref: x
                }, null, 512),
                a.value.infiniteScrolling ? _("", !0) : R(c.$slots, "pagination", {
                  key: 0,
                  onClick: De,
                  hasData: W.value,
                  meta: j.value,
                  perPageOptions: a.value.perPageOptions,
                  onPerPageChange: Me,
                  showExportButton: e.showExportButton
                }, () => [
                  s("div", Kl, [
                    e.hasCheckboxes ? (f(), v("span", Xl, k(It.value), 1)) : _("", !0),
                    K(Vn, {
                      "on-click": De,
                      "has-data": W.value,
                      meta: j.value,
                      "per-page-options": a.value.perPageOptions,
                      "on-per-page-change": Me,
                      color: e.color,
                      "show-export-button": e.showExportButton
                    }, {
                      exportButton: V((h) => [
                        R(c.$slots, "exportButton", Et(Bt(h)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button"])
                  ])
                ], !0),
                a.value.infiniteScrolling && y.value ? (f(), v("div", Ql, [...p[4] || (p[4] = [
                  s("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" }, null, -1)
                ])])) : _("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, jl))
      ]),
      _: 3
    }));
  }
}, vs = /* @__PURE__ */ _e(Jl, [["__scopeId", "data-v-d6c9d05b"]]);
export {
  je as ButtonWithDropdown,
  Sn as HeaderCell,
  rr as OnClickOutside,
  Vn as Pagination,
  vs as Table,
  Dn as TableAddSearchRow,
  rl as TableColumns,
  fl as TableFilter,
  gl as TableGlobalSearch,
  kl as TableReset,
  wl as TableSearchRows,
  zl as TableWrapper,
  he as getTranslations,
  gs as setTranslation,
  hs as setTranslations
};
