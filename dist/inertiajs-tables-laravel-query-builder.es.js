import { ref as P, onMounted as ae, onBeforeUnmount as St, openBlock as d, createElementBlock as h, renderSlot as A, watch as ge, inject as ee, createBlock as O, withCtx as V, createElementVNode as s, normalizeClass as q, withModifiers as U, withDirectives as D, vShow as pe, createStaticVNode as Mt, normalizeStyle as se, toDisplayString as w, createCommentVNode as $, createTextVNode as ne, computed as F, unref as I, vModelSelect as ot, vModelText as we, watchEffect as zt, onUnmounted as Fe, Teleport as Pe, Fragment as Y, renderList as Z, createVNode as K, withKeys as Je, nextTick as nt, resolveDynamicComponent as xe, reactive as qt, getCurrentInstance as Tt, provide as It, Transition as Nt, vModelCheckbox as Ye, normalizeProps as Pt, guardReactiveProps as Ft } from "vue";
import { createPopper as Ot } from "@popperjs/core/lib/popper-lite";
import jt from "@popperjs/core/lib/modifiers/preventOverflow";
import Lt from "@popperjs/core/lib/modifiers/flip";
import { createPopper as At } from "@popperjs/core";
import Rt from "lodash-es/uniq";
import Bt from "vuedraggable";
import Et from "lodash-es/find";
import Ae from "qs";
import Vt from "lodash-es/clone";
import Wt from "lodash-es/filter";
import Gt from "lodash-es/findKey";
import de from "lodash-es/forEach";
import Ut from "lodash-es/isEqual";
import Dt from "lodash-es/map";
import Ht from "lodash-es/pickBy";
import { usePage as Ze, router as Kt } from "@inertiajs/vue3";
const Xt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const o = e, l = P(null), i = P(null);
    return ae(() => {
      l.value = (t) => {
        t.target === i.value || i.value.contains(t.target) || o.do();
      }, document.addEventListener("click", l.value), document.addEventListener("touchstart", l.value);
    }), St(() => {
      document.removeEventListener("click", l.value), document.removeEventListener("touchstart", l.value);
    }), (t, r) => (d(), h("div", {
      ref_key: "root",
      ref: i
    }, [
      A(t.$slots, "default")
    ], 512));
  }
}, Ee = "-", Qt = (e) => {
  const o = Yt(e), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (u) => {
      const a = u.split(Ee);
      return a[0] === "" && a.length !== 1 && a.shift(), lt(a, o) || Jt(u);
    },
    getConflictingClassGroupIds: (u, a) => {
      const n = l[u] || [];
      return a && i[u] ? [...n, ...i[u]] : n;
    }
  };
}, lt = (e, o) => {
  var u;
  if (e.length === 0)
    return o.classGroupId;
  const l = e[0], i = o.nextPart.get(l), t = i ? lt(e.slice(1), i) : void 0;
  if (t)
    return t;
  if (o.validators.length === 0)
    return;
  const r = e.join(Ee);
  return (u = o.validators.find(({
    validator: a
  }) => a(r))) == null ? void 0 : u.classGroupId;
}, et = /^\[(.+)\]$/, Jt = (e) => {
  if (et.test(e)) {
    const o = et.exec(e)[1], l = o == null ? void 0 : o.substring(0, o.indexOf(":"));
    if (l)
      return "arbitrary.." + l;
  }
}, Yt = (e) => {
  const {
    theme: o,
    prefix: l
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return er(Object.entries(e.classGroups), l).forEach(([r, u]) => {
    Be(u, i, r, o);
  }), i;
}, Be = (e, o, l, i) => {
  e.forEach((t) => {
    if (typeof t == "string") {
      const r = t === "" ? o : tt(o, t);
      r.classGroupId = l;
      return;
    }
    if (typeof t == "function") {
      if (Zt(t)) {
        Be(t(i), o, l, i);
        return;
      }
      o.validators.push({
        validator: t,
        classGroupId: l
      });
      return;
    }
    Object.entries(t).forEach(([r, u]) => {
      Be(u, tt(o, r), l, i);
    });
  });
}, tt = (e, o) => {
  let l = e;
  return o.split(Ee).forEach((i) => {
    l.nextPart.has(i) || l.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), l = l.nextPart.get(i);
  }), l;
}, Zt = (e) => e.isThemeGetter, er = (e, o) => o ? e.map(([l, i]) => {
  const t = i.map((r) => typeof r == "string" ? o + r : typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([u, a]) => [o + u, a])) : r);
  return [l, t];
}) : e, tr = (e) => {
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
}, st = "!", rr = (e) => {
  const {
    separator: o,
    experimentalParseClassName: l
  } = e, i = o.length === 1, t = o[0], r = o.length, u = (a) => {
    const n = [];
    let p = 0, c = 0, x;
    for (let m = 0; m < a.length; m++) {
      let C = a[m];
      if (p === 0) {
        if (C === t && (i || a.slice(m, m + r) === o)) {
          n.push(a.slice(c, m)), c = m + r;
          continue;
        }
        if (C === "/") {
          x = m;
          continue;
        }
      }
      C === "[" ? p++ : C === "]" && p--;
    }
    const y = n.length === 0 ? a : a.substring(c), S = y.startsWith(st), T = S ? y.substring(1) : y, b = x && x > c ? x - c : void 0;
    return {
      modifiers: n,
      hasImportantModifier: S,
      baseClassName: T,
      maybePostfixModifierPosition: b
    };
  };
  return l ? (a) => l({
    className: a,
    parseClassName: u
  }) : u;
}, or = (e) => {
  if (e.length <= 1)
    return e;
  const o = [];
  let l = [];
  return e.forEach((i) => {
    i[0] === "[" ? (o.push(...l.sort(), i), l = []) : l.push(i);
  }), o.push(...l.sort()), o;
}, nr = (e) => ({
  cache: tr(e.cacheSize),
  parseClassName: rr(e),
  ...Qt(e)
}), lr = /\s+/, sr = (e, o) => {
  const {
    parseClassName: l,
    getClassGroupId: i,
    getConflictingClassGroupIds: t
  } = o, r = [], u = e.trim().split(lr);
  let a = "";
  for (let n = u.length - 1; n >= 0; n -= 1) {
    const p = u[n], {
      modifiers: c,
      hasImportantModifier: x,
      baseClassName: y,
      maybePostfixModifierPosition: S
    } = l(p);
    let T = Boolean(S), b = i(T ? y.substring(0, S) : y);
    if (!b) {
      if (!T) {
        a = p + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (b = i(y), !b) {
        a = p + (a.length > 0 ? " " + a : a);
        continue;
      }
      T = !1;
    }
    const m = or(c).join(":"), C = x ? m + st : m, _ = C + b;
    if (r.includes(_))
      continue;
    r.push(_);
    const M = t(b, T);
    for (let j = 0; j < M.length; ++j) {
      const W = M[j];
      r.push(C + W);
    }
    a = p + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function ar() {
  let e = 0, o, l, i = "";
  for (; e < arguments.length; )
    (o = arguments[e++]) && (l = at(o)) && (i && (i += " "), i += l);
  return i;
}
const at = (e) => {
  if (typeof e == "string")
    return e;
  let o, l = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (o = at(e[i])) && (l && (l += " "), l += o);
  return l;
};
function ir(e, ...o) {
  let l, i, t, r = u;
  function u(n) {
    const p = o.reduce((c, x) => x(c), e());
    return l = nr(p), i = l.cache.get, t = l.cache.set, r = a, a(n);
  }
  function a(n) {
    const p = i(n);
    if (p)
      return p;
    const c = sr(n, l);
    return t(n, c), c;
  }
  return function() {
    return r(ar.apply(null, arguments));
  };
}
const R = (e) => {
  const o = (l) => l[e] || [];
  return o.isThemeGetter = !0, o;
}, it = /^\[(?:([a-z-]+):)?(.+)\]$/i, ur = /^\d+\/\d+$/, cr = /* @__PURE__ */ new Set(["px", "full", "screen"]), dr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, fr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, mr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, pr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, gr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, le = (e) => ke(e) || cr.has(e) || ur.test(e), fe = (e) => Ce(e, "length", Cr), ke = (e) => Boolean(e) && !Number.isNaN(Number(e)), Re = (e) => Ce(e, "number", ke), Se = (e) => Boolean(e) && Number.isInteger(Number(e)), hr = (e) => e.endsWith("%") && ke(e.slice(0, -1)), N = (e) => it.test(e), me = (e) => dr.test(e), vr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), br = (e) => Ce(e, vr, ut), yr = (e) => Ce(e, "position", ut), xr = /* @__PURE__ */ new Set(["image", "url"]), wr = (e) => Ce(e, xr, $r), kr = (e) => Ce(e, "", _r), Me = () => !0, Ce = (e, o, l) => {
  const i = it.exec(e);
  return i ? i[1] ? typeof o == "string" ? i[1] === o : o.has(i[1]) : l(i[2]) : !1;
}, Cr = (e) => fr.test(e) && !mr.test(e), ut = () => !1, _r = (e) => pr.test(e), $r = (e) => gr.test(e), Sr = () => {
  const e = R("colors"), o = R("spacing"), l = R("blur"), i = R("brightness"), t = R("borderColor"), r = R("borderRadius"), u = R("borderSpacing"), a = R("borderWidth"), n = R("contrast"), p = R("grayscale"), c = R("hueRotate"), x = R("invert"), y = R("gap"), S = R("gradientColorStops"), T = R("gradientColorStopPositions"), b = R("inset"), m = R("margin"), C = R("opacity"), _ = R("padding"), M = R("saturate"), j = R("scale"), W = R("sepia"), G = R("skew"), X = R("space"), te = R("translate"), re = () => ["auto", "contain", "none"], ie = () => ["auto", "hidden", "clip", "visible", "scroll"], oe = () => ["auto", N, o], L = () => [N, o], ve = () => ["", le, fe], ue = () => ["auto", ke, N], ze = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], be = () => ["solid", "dashed", "dotted", "double", "none"], qe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], $e = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], ce = () => ["", "0", N], Te = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Q = () => [ke, N];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Me],
      spacing: [le, fe],
      blur: ["none", "", me, N],
      brightness: Q(),
      borderColor: [e],
      borderRadius: ["none", "", "full", me, N],
      borderSpacing: L(),
      borderWidth: ve(),
      contrast: Q(),
      grayscale: ce(),
      hueRotate: Q(),
      invert: ce(),
      gap: L(),
      gradientColorStops: [e],
      gradientColorStopPositions: [hr, fe],
      inset: oe(),
      margin: oe(),
      opacity: Q(),
      padding: L(),
      saturate: Q(),
      scale: Q(),
      sepia: ce(),
      skew: Q(),
      space: L(),
      translate: L()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", N]
      }],
      container: ["container"],
      columns: [{
        columns: [me]
      }],
      "break-after": [{
        "break-after": Te()
      }],
      "break-before": [{
        "break-before": Te()
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
        object: [...ze(), N]
      }],
      overflow: [{
        overflow: ie()
      }],
      "overflow-x": [{
        "overflow-x": ie()
      }],
      "overflow-y": [{
        "overflow-y": ie()
      }],
      overscroll: [{
        overscroll: re()
      }],
      "overscroll-x": [{
        "overscroll-x": re()
      }],
      "overscroll-y": [{
        "overscroll-y": re()
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
        z: ["auto", Se, N]
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
        grow: ce()
      }],
      shrink: [{
        shrink: ce()
      }],
      order: [{
        order: ["first", "last", "none", Se, N]
      }],
      "grid-cols": [{
        "grid-cols": [Me]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Se, N]
        }, N]
      }],
      "col-start": [{
        "col-start": ue()
      }],
      "col-end": [{
        "col-end": ue()
      }],
      "grid-rows": [{
        "grid-rows": [Me]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [Se, N]
        }, N]
      }],
      "row-start": [{
        "row-start": ue()
      }],
      "row-end": [{
        "row-end": ue()
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
        justify: ["normal", ...$e()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...$e(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...$e(), "baseline"]
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [_]
      }],
      px: [{
        px: [_]
      }],
      py: [{
        py: [_]
      }],
      ps: [{
        ps: [_]
      }],
      pe: [{
        pe: [_]
      }],
      pt: [{
        pt: [_]
      }],
      pr: [{
        pr: [_]
      }],
      pb: [{
        pb: [_]
      }],
      pl: [{
        pl: [_]
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
        "space-x": [X]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [X]
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
          screen: [me]
        }, me]
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
        text: ["base", me, fe]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Re]
      }],
      "font-family": [{
        font: [Me]
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
        "line-clamp": ["none", ke, Re]
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
        decoration: [...be(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", le, fe]
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
        indent: L()
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
        bg: [...ze(), yr]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", br]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, wr]
      }],
      "bg-color": [{
        bg: [e]
      }],
      "gradient-from-pos": [{
        from: [T]
      }],
      "gradient-via-pos": [{
        via: [T]
      }],
      "gradient-to-pos": [{
        to: [T]
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
        border: [...be(), "hidden"]
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
        divide: be()
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
        outline: ["", ...be()]
      }],
      "outline-offset": [{
        "outline-offset": [le, N]
      }],
      "outline-w": [{
        outline: [le, fe]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: ve()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [C]
      }],
      "ring-offset-w": [{
        "ring-offset": [le, fe]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", me, kr]
      }],
      "shadow-color": [{
        shadow: [Me]
      }],
      opacity: [{
        opacity: [C]
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
        brightness: [i]
      }],
      contrast: [{
        contrast: [n]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", me, N]
      }],
      grayscale: [{
        grayscale: [p]
      }],
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      invert: [{
        invert: [x]
      }],
      saturate: [{
        saturate: [M]
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
        "backdrop-grayscale": [p]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [x]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [C]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [M]
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
        duration: Q()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", N]
      }],
      delay: [{
        delay: Q()
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
        rotate: [Se, N]
      }],
      "translate-x": [{
        "translate-x": [te]
      }],
      "translate-y": [{
        "translate-y": [te]
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
        "scroll-m": L()
      }],
      "scroll-mx": [{
        "scroll-mx": L()
      }],
      "scroll-my": [{
        "scroll-my": L()
      }],
      "scroll-ms": [{
        "scroll-ms": L()
      }],
      "scroll-me": [{
        "scroll-me": L()
      }],
      "scroll-mt": [{
        "scroll-mt": L()
      }],
      "scroll-mr": [{
        "scroll-mr": L()
      }],
      "scroll-mb": [{
        "scroll-mb": L()
      }],
      "scroll-ml": [{
        "scroll-ml": L()
      }],
      "scroll-p": [{
        "scroll-p": L()
      }],
      "scroll-px": [{
        "scroll-px": L()
      }],
      "scroll-py": [{
        "scroll-py": L()
      }],
      "scroll-ps": [{
        "scroll-ps": L()
      }],
      "scroll-pe": [{
        "scroll-pe": L()
      }],
      "scroll-pt": [{
        "scroll-pt": L()
      }],
      "scroll-pr": [{
        "scroll-pr": L()
      }],
      "scroll-pb": [{
        "scroll-pb": L()
      }],
      "scroll-pl": [{
        "scroll-pl": L()
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
        stroke: [le, fe, Re]
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
}, J = /* @__PURE__ */ ir(Sr);
function B(e, o, l, i) {
  let t = o ? { ...o } : {}, r = null, u = l ? { ...l } : {}, a = null, n = i ? { ...i } : {}, p = null;
  for (const c of e)
    r === null && c in t && (t = t[c], typeof t == "string" && (r = t)), a === null && c in u && (u = u[c], typeof u == "string" && (a = u)), p === null && c in n && (n = n[c], typeof n == "string" && (p = n));
  return J(r, a, p);
}
const Mr = { class: "relative" }, zr = ["dusk", "disabled"], qr = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, Oe = {
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
    const i = l, t = e, r = P(!1), u = P(null);
    function a() {
      r.value = !r.value;
    }
    function n() {
      r.value = !1;
    }
    ge(r, () => {
      u.value.update(), r.value || i("closed"), r.value && i("opened");
    });
    const p = P(null), c = P(null);
    ae(() => {
      u.value = Ot(p.value, c.value, {
        placement: t.placement,
        modifiers: [Lt, jt]
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
    }, y = ee("themeVariables"), S = (T) => {
      var m, C;
      let b = "";
      return T === "button" && t.disabled && (b = "cursor-not-allowed"), J(
        b,
        B([T, "base"], x, (m = y == null ? void 0 : y.inertia_table) == null ? void 0 : m.button_with_dropdown, t.ui),
        B([T, "color", t.color], x, (C = y == null ? void 0 : y.inertia_table) == null ? void 0 : C.button_with_dropdown, t.ui)
      );
    };
    return (T, b) => (d(), O(Xt, { do: n }, {
      default: V(() => [
        s("div", Mr, [
          s("button", {
            ref_key: "button",
            ref: p,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: q(S("button")),
            "aria-haspopup": "true",
            onClick: U(a, ["prevent"])
          }, [
            A(T.$slots, "button")
          ], 10, zr),
          D(s("div", {
            ref_key: "tooltip",
            ref: c,
            class: "absolute z-50"
          }, [
            s("div", qr, [
              A(T.$slots, "default")
            ])
          ], 512), [
            [pe, r.value]
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
}, Tr = {
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
    return (i, t) => (d(), h("div", {
      class: q(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: l
    }, [...t[0] || (t[0] = [
      Mt('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ])], 34));
  }
}, Ir = /* @__PURE__ */ _e(Tr, [["__scopeId", "data-v-672a9339"]]), Nr = { class: "w-full flex gap-2 justify-between items-center" }, Pr = { class: "relative inline-flex items-center cursor-pointer" }, Fr = ["checked"], ct = {
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
    }, i = ee("themeVariables"), t = (r) => {
      var a, n, p, c;
      let u = o.color;
      return r === "toggle" && o.filter.value === null && (u = "disabled"), J(
        B([r, "base"], l, (n = (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.table_filter) == null ? void 0 : n.toggle_filter, o.ui),
        B([r, "color", u], l, (c = (p = i == null ? void 0 : i.inertia_table) == null ? void 0 : p.table_filter) == null ? void 0 : c.toggle_filter, o.ui)
      );
    };
    return (r, u) => (d(), h("div", Nr, [
      s("label", Pr, [
        s("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: u[0] || (u[0] = (a) => e.onFilterChange(e.filter.key, a.target.checked ? "1" : "0"))
        }, null, 40, Fr),
        s("div", {
          class: q(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", t("toggle")])
        }, null, 2)
      ]),
      s("button", {
        class: q(t("reset_button")),
        onClick: u[1] || (u[1] = U((a) => e.onFilterChange(e.filter.key, null), ["prevent"]))
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
}, Or = {
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
      return J(
        B([e, "base"], this.fallbackTheme, (i = (l = (o = this.themeVariables) == null ? void 0 : o.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : i.number_range_filter, this.ui),
        B([e, "color", this.color], this.fallbackTheme, (u = (r = (t = this.themeVariables) == null ? void 0 : t.inertia_table) == null ? void 0 : r.table_filter) == null ? void 0 : u.number_range_filter, this.ui)
      );
    }
  }
}, jr = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, Lr = { class: "py-1 relative min-w-full" }, Ar = { class: "z-40" }, Rr = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Br = { key: 0 }, Er = { key: 1 }, Vr = { class: "z-40" }, Wr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Gr = { key: 0 }, Ur = { key: 1 }, Dr = { draggable: "true" }, Hr = { key: 0 }, Kr = { key: 1 }, Xr = { key: 0 }, Qr = { key: 1 };
function Jr(e, o, l, i, t, r) {
  var u, a, n, p;
  return d(), h("div", jr, [
    s("div", Lr, [
      s("div", {
        class: q(r.getTheme("main_bar"))
      }, [
        s("div", {
          class: q(["absolute", r.getTheme("selected_bar")]),
          style: se(`width: ${r.rangeWidth}% !important; left: ${r.currentMinValueInPercent}% !important;`)
        }, null, 6),
        s("div", {
          class: q([r.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: se(`left: ${r.currentMinValueInPercent}%;`),
          onMousedown: o[0] || (o[0] = (c) => r.handleMouseDown(c, !0))
        }, [
          s("div", Ar, [
            s("div", Rr, [
              s("div", {
                class: q(r.getTheme("popover")),
                style: se(r.getMarginTop(t.hasOverlap && r.displayFirstDown))
              }, [
                l.prefix ? (d(), h("span", Br, w(l.prefix), 1)) : $("", !0),
                ne(" " + w((u = r.currentMinValue) != null ? u : 0) + " ", 1),
                l.suffix ? (d(), h("span", Er, w(l.suffix), 1)) : $("", !0)
              ], 6),
              (d(), h("svg", {
                class: q(["absolute w-full h-2 left-0", [t.hasOverlap && r.displayFirstDown ? "bottom-6 rotate-180" : "top-100", r.getTheme("popover_arrow")]]),
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
          class: q([r.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: se(`left: ${r.currentMaxValueInPercent}%;`),
          onMousedown: o[1] || (o[1] = (c) => r.handleMouseDown(c, !1))
        }, [
          s("div", Vr, [
            s("div", Wr, [
              s("div", {
                class: q(r.getTheme("popover")),
                style: se(r.getMarginTop(t.hasOverlap && !r.displayFirstDown))
              }, [
                l.prefix ? (d(), h("span", Gr, w(l.prefix), 1)) : $("", !0),
                ne(" " + w((a = r.currentMaxValue) != null ? a : 0) + " ", 1),
                l.suffix ? (d(), h("span", Ur, w(l.suffix), 1)) : $("", !0)
              ], 6),
              s("div", Dr, [
                (d(), h("svg", {
                  class: q(["absolute w-full h-2 left-0 top-100", [t.hasOverlap && !r.displayFirstDown ? "bottom-6 rotate-180" : "top-100", r.getTheme("popover_arrow")]]),
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
          class: q(["absolute -ml-1 bottom-0 left-0 -mb-6", r.getTheme("text")])
        }, [
          l.prefix ? (d(), h("span", Hr, w(l.prefix), 1)) : $("", !0),
          ne(" " + w((n = l.min) != null ? n : 0) + " ", 1),
          l.suffix ? (d(), h("span", Kr, w(l.suffix), 1)) : $("", !0)
        ], 2),
        s("div", {
          class: q(["absolute -mr-1 bottom-0 right-0 -mb-6", r.getTheme("text")])
        }, [
          l.prefix ? (d(), h("span", Xr, w(l.prefix), 1)) : $("", !0),
          ne(" " + w((p = l.max) != null ? p : 0) + " ", 1),
          l.suffix ? (d(), h("span", Qr, w(l.suffix), 1)) : $("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const dt = /* @__PURE__ */ _e(Or, [["render", Jr]]), Ve = {
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
  return Ve.translations;
}
function us(e, o) {
  Ve.translations[e] = o;
}
function cs(e) {
  Ve.translations = e;
}
const Yr = { class: "space-y-4" }, Zr = { class: "block text-sm font-medium text-gray-700 mb-2" }, eo = { value: "" }, to = { value: "exact" }, ro = { value: "less_than" }, oo = { value: "greater_than" }, no = { value: "less_than_or_equal" }, lo = { value: "greater_than_or_equal" }, so = { value: "between" }, ao = {
  key: 0,
  class: "space-y-3"
}, io = { key: 0 }, uo = { class: "block text-sm font-medium text-gray-700 mb-1" }, co = { class: "flex items-center" }, fo = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, mo = ["step"], po = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, go = {
  key: 1,
  class: "space-y-3"
}, ho = { class: "block text-sm font-medium text-gray-700 mb-1" }, vo = { class: "flex items-center" }, bo = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, yo = ["step"], xo = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, wo = { class: "block text-sm font-medium text-gray-700 mb-1" }, ko = { class: "flex items-center" }, Co = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, _o = ["step"], $o = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, So = {
  key: 1,
  class: "flex justify-end"
}, Mo = { class: "sr-only" }, ft = {
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
    const o = e, l = he(), i = P(""), t = P(""), r = P(""), u = P(""), a = F(() => i.value !== "" && (i.value !== "between" && t.value !== "" && t.value !== null || i.value === "between" && r.value !== "" && r.value !== null && u.value !== "" && u.value !== null));
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
    function p() {
      t.value = "", r.value = "", u.value = "", i.value === "" ? x() : c();
    }
    function c() {
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
    ae(() => {
      if (o.filter.value) {
        const b = o.filter.value;
        b.type && (i.value = b.type, b.type === "between" ? (r.value = b.start_number || "", u.value = b.end_number || "") : t.value = b.number || "");
      }
    }), ge(() => o.filter.value, (b) => {
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
    }, S = ee("themeVariables"), T = (b) => {
      var m, C, _, M;
      return J(
        B([b, "base"], y, (C = (m = S == null ? void 0 : S.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : C.number_filter, o.ui),
        B([b, "color", o.color], y, (M = (_ = S == null ? void 0 : S.inertia_table) == null ? void 0 : _.table_filter) == null ? void 0 : M.number_filter, o.ui)
      );
    };
    return (b, m) => (d(), h("div", Yr, [
      s("div", null, [
        s("label", Zr, w(I(l).filter_type), 1),
        D(s("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (C) => i.value = C),
          class: q(T("select")),
          onChange: p
        }, [
          s("option", eo, w(I(l).no_filter), 1),
          s("option", to, w(I(l).exact_number), 1),
          s("option", ro, w(I(l).less_than), 1),
          s("option", oo, w(I(l).greater_than), 1),
          s("option", no, w(I(l).less_than_or_equal), 1),
          s("option", lo, w(I(l).greater_than_or_equal), 1),
          s("option", so, w(I(l).number_range), 1)
        ], 34), [
          [ot, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (d(), h("div", ao, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(i.value) ? (d(), h("div", io, [
          s("label", uo, w(n()), 1),
          s("div", co, [
            e.filter.prefix ? (d(), h("span", fo, w(e.filter.prefix), 1)) : $("", !0),
            D(s("input", {
              type: "number",
              "onUpdate:modelValue": m[1] || (m[1] = (C) => t.value = C),
              step: e.filter.step || 1,
              class: q(T("input")),
              onInput: c,
              placeholder: "0"
            }, null, 42, mo), [
              [
                we,
                t.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (d(), h("span", po, w(e.filter.suffix), 1)) : $("", !0)
          ])
        ])) : $("", !0),
        i.value === "between" ? (d(), h("div", go, [
          s("div", null, [
            s("label", ho, w(I(l).start_number), 1),
            s("div", vo, [
              e.filter.prefix ? (d(), h("span", bo, w(e.filter.prefix), 1)) : $("", !0),
              D(s("input", {
                type: "number",
                "onUpdate:modelValue": m[2] || (m[2] = (C) => r.value = C),
                step: e.filter.step || 1,
                class: q(T("input")),
                onInput: c,
                placeholder: "0"
              }, null, 42, yo), [
                [
                  we,
                  r.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (d(), h("span", xo, w(e.filter.suffix), 1)) : $("", !0)
            ])
          ]),
          s("div", null, [
            s("label", wo, w(I(l).end_number), 1),
            s("div", ko, [
              e.filter.prefix ? (d(), h("span", Co, w(e.filter.prefix), 1)) : $("", !0),
              D(s("input", {
                type: "number",
                "onUpdate:modelValue": m[3] || (m[3] = (C) => u.value = C),
                step: e.filter.step || 1,
                class: q(T("input")),
                onInput: c,
                placeholder: "0"
              }, null, 42, _o), [
                [
                  we,
                  u.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (d(), h("span", $o, w(e.filter.suffix), 1)) : $("", !0)
            ])
          ])
        ])) : $("", !0)
      ])) : $("", !0),
      a.value ? (d(), h("div", So, [
        s("button", {
          type: "button",
          class: q(T("reset_button")),
          onClick: x
        }, [
          s("span", Mo, w(I(l).reset_filter), 1),
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
      ])) : $("", !0)
    ]));
  }
}, zo = { class: "space-y-2" }, qo = { class: "block text-sm font-medium text-gray-700 mb-2" }, To = { value: "" }, Io = { value: "exact" }, No = { value: "before" }, Po = { value: "after" }, Fo = { value: "between" }, Oo = {
  key: 0,
  class: "space-y-3"
}, jo = { key: 0 }, Lo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Ao = {
  key: 1,
  class: "space-y-3"
}, Ro = { class: "block text-sm font-medium text-gray-700 mb-1" }, Bo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Eo = {
  key: 1,
  class: "flex justify-end"
}, Vo = { class: "sr-only" }, mt = {
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
    const o = e, l = he(), i = P(""), t = P(""), r = P(""), u = P(""), a = F(() => i.value !== "" && (i.value !== "between" && t.value || i.value === "between" && r.value && u.value));
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
    function p() {
      t.value = "", r.value = "", u.value = "", i.value === "" ? x() : c();
    }
    function c() {
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
    ae(() => {
      if (o.filter.value) {
        const b = o.filter.value;
        b.type && (i.value = b.type, b.type === "between" ? (r.value = b.start_date || "", u.value = b.end_date || "") : t.value = b.date || "");
      }
    }), ge(() => o.filter.value, (b) => {
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
    }, S = ee("themeVariables"), T = (b) => {
      var m, C, _, M;
      return J(
        B([b, "base"], y, (C = (m = S == null ? void 0 : S.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : C.date_filter, o.ui),
        B([b, "color", o.color], y, (M = (_ = S == null ? void 0 : S.inertia_table) == null ? void 0 : _.table_filter) == null ? void 0 : M.date_filter, o.ui)
      );
    };
    return (b, m) => (d(), h("div", zo, [
      s("div", null, [
        s("label", qo, w(I(l).filter_type), 1),
        D(s("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (C) => i.value = C),
          class: q(T("select")),
          onChange: p
        }, [
          s("option", To, w(I(l).no_filter), 1),
          s("option", Io, w(I(l).exact_date), 1),
          s("option", No, w(I(l).before_date), 1),
          s("option", Po, w(I(l).after_date), 1),
          s("option", Fo, w(I(l).date_range), 1)
        ], 34), [
          [ot, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (d(), h("div", Oo, [
        ["exact", "before", "after"].includes(i.value) ? (d(), h("div", jo, [
          s("label", Lo, w(n()), 1),
          D(s("input", {
            type: "date",
            "onUpdate:modelValue": m[1] || (m[1] = (C) => t.value = C),
            class: q(T("input")),
            onChange: c
          }, null, 34), [
            [we, t.value]
          ])
        ])) : $("", !0),
        i.value === "between" ? (d(), h("div", Ao, [
          s("div", null, [
            s("label", Ro, w(I(l).start_date), 1),
            D(s("input", {
              type: "date",
              "onUpdate:modelValue": m[2] || (m[2] = (C) => r.value = C),
              class: q(T("input")),
              onChange: c
            }, null, 34), [
              [we, r.value]
            ])
          ]),
          s("div", null, [
            s("label", Bo, w(I(l).end_date), 1),
            D(s("input", {
              type: "date",
              "onUpdate:modelValue": m[3] || (m[3] = (C) => u.value = C),
              class: q(T("input")),
              onChange: c
            }, null, 34), [
              [we, u.value]
            ])
          ])
        ])) : $("", !0)
      ])) : $("", !0),
      a.value ? (d(), h("div", Eo, [
        s("button", {
          type: "button",
          class: q(T("reset_button")),
          onClick: x
        }, [
          s("span", Vo, w(I(l).reset_filter), 1),
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
      ])) : $("", !0)
    ]));
  }
};
function pt(e) {
  let o = P(null), l = P(null);
  return ae(() => {
    zt((i) => {
      if (!l.value || !o.value)
        return;
      let t = l.value.el || l.value, r = o.value.el || o.value;
      if (!(r instanceof HTMLElement) || !(t instanceof HTMLElement))
        return;
      let { destroy: u } = At(r, t, e);
      i(u);
    });
  }), [o, l];
}
const Wo = { class: "relative inline-block" }, Go = ["dusk"], Uo = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Do = { class: "p-2" }, Ho = ["name", "value", "onChange"], Ko = ["value"], Xo = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Qo = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Jo = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Yo = {
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
    const o = e, l = P(!1);
    P(null);
    const [i, t] = pt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), r = F(() => o.filters.filter((m) => m.key === o.columnKey || m.key.startsWith(o.columnKey + "_") || m.key.includes(o.columnKey))), u = F(() => r.value.some((m) => !p(m)));
    function a() {
      r.value.length > 0 && (l.value = !l.value);
    }
    function n() {
      l.value = !1;
    }
    function p(m) {
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
    function c(m, C) {
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
    }, S = ee("themeVariables"), T = (m) => {
      var C, _, M, j;
      return J(
        B([m, "base"], y, (_ = (C = S == null ? void 0 : S.inertia_table) == null ? void 0 : C.table_filter) == null ? void 0 : _.select_filter, o.ui),
        B([m, "color", o.color], y, (j = (M = S == null ? void 0 : S.inertia_table) == null ? void 0 : M.table_filter) == null ? void 0 : j.select_filter, o.ui)
      );
    };
    function b(m) {
      t.value && !t.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${o.columnKey}"]`) && n();
    }
    return ae(() => {
      document.addEventListener("click", b);
    }), Fe(() => {
      document.removeEventListener("click", b);
    }), (m, C) => (d(), h("div", Wo, [
      s("button", {
        ref_key: "trigger",
        ref: i,
        onClick: a,
        class: q([
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
      ])], 10, Go),
      (d(), O(Pe, { to: "body" }, [
        l.value ? (d(), h("div", {
          key: 0,
          ref_key: "container",
          ref: t,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: C[0] || (C[0] = U(() => {
          }, ["stop"]))
        }, [
          (d(!0), h(Y, null, Z(r.value, (_) => (d(), h("div", {
            key: _.key
          }, [
            s("h3", Uo, w(_.label), 1),
            s("div", Do, [
              _.type === "select" ? (d(), h("select", {
                key: 0,
                name: _.key,
                value: _.value,
                class: q(T("select")),
                onChange: (M) => c(_.key, M.target.value)
              }, [
                (d(!0), h(Y, null, Z(_.options, (M, j) => (d(), h("option", {
                  key: j,
                  value: j
                }, w(M), 9, Ko))), 128))
              ], 42, Ho)) : $("", !0),
              _.type === "toggle" ? (d(), O(ct, {
                key: 1,
                filter: _,
                "on-filter-change": c,
                color: e.color
              }, null, 8, ["filter", "color"])) : $("", !0),
              _.type === "number" ? (d(), h("div", Xo, [
                K(ft, {
                  filter: _,
                  "on-filter-change": c,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : $("", !0),
              _.type === "number_range" ? (d(), h("div", Qo, [
                K(dt, {
                  modelValue: _.value,
                  "onUpdate:modelValue": [(M) => _.value = M, (M) => x(_)],
                  max: _.max,
                  min: _.min,
                  prefix: _.prefix,
                  suffix: _.suffix,
                  step: _.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : $("", !0),
              _.type === "date" ? (d(), h("div", Jo, [
                K(mt, {
                  filter: _,
                  "on-filter-change": c,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : $("", !0)
            ])
          ]))), 128))
        ], 512)) : $("", !0)
      ])),
      (d(), O(Pe, { to: "body" }, [
        l.value ? (d(), h("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: n
        })) : $("", !0)
      ]))
    ]));
  }
}, Zo = { class: "relative inline-block" }, en = ["dusk"], tn = { class: "p-3" }, rn = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, on = { class: "space-y-2" }, nn = ["value", "placeholder"], ln = {
  key: 0,
  class: "flex justify-end"
}, sn = { class: "sr-only" }, an = {
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
    const o = e, l = he(), i = P(!1), t = P(null), [r, u] = pt({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), a = F(() => o.searchInputs.find((_) => _.key === o.columnKey)), n = F(() => a.value && a.value.value || ""), p = F(() => n.value !== "");
    async function c() {
      a.value && (i.value = !i.value, i.value && (await nt(), t.value && t.value.focus()));
    }
    function x() {
      i.value = !1;
    }
    function y(_) {
      const M = _.target.value;
      S(M);
    }
    function S(_) {
      o.onSearchChange(o.columnKey, _);
    }
    const T = {
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
    }, b = ee("themeVariables"), m = (_) => {
      var M, j, W, G;
      return J(
        B([_, "base"], T, (j = (M = b == null ? void 0 : b.inertia_table) == null ? void 0 : M.table_search) == null ? void 0 : j.column_search, o.ui),
        B([_, "color", o.color], T, (G = (W = b == null ? void 0 : b.inertia_table) == null ? void 0 : W.table_search) == null ? void 0 : G.column_search, o.ui)
      );
    };
    function C(_) {
      u.value && !u.value.contains(_.target) && !_.target.closest(`[dusk="column-search-${o.columnKey}"]`) && x();
    }
    return ae(() => {
      document.addEventListener("click", C);
    }), Fe(() => {
      document.removeEventListener("click", C);
    }), (_, M) => (d(), h("div", Zo, [
      s("button", {
        ref_key: "trigger",
        ref: r,
        onClick: c,
        class: q([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": p.value,
            "text-gray-400 hover:text-gray-600": !p.value
          }
        ]),
        dusk: `column-search-${e.columnKey}`
      }, [...M[2] || (M[2] = [
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
      ])], 10, en),
      (d(), O(Pe, { to: "body" }, [
        i.value ? (d(), h("div", {
          key: 0,
          ref_key: "container",
          ref: u,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: M[1] || (M[1] = U(() => {
          }, ["stop"]))
        }, [
          s("div", tn, [
            s("h3", rn, w(I(l).search) + " " + w(e.columnLabel), 1),
            s("div", on, [
              s("input", {
                ref_key: "searchInput",
                ref: t,
                type: "text",
                value: n.value,
                class: q(m("input")),
                placeholder: `${I(l).search} ${e.columnLabel.toLowerCase()}...`,
                onInput: y,
                onKeydown: [
                  Je(x, ["enter"]),
                  Je(x, ["escape"])
                ]
              }, null, 42, nn),
              n.value && n.value !== "" ? (d(), h("div", ln, [
                s("button", {
                  type: "button",
                  class: q(m("reset_button")),
                  onClick: M[0] || (M[0] = (j) => S(""))
                }, [
                  s("span", sn, w(I(l).reset), 1),
                  M[3] || (M[3] = s("svg", {
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
              ])) : $("", !0)
            ])
          ])
        ], 512)) : $("", !0)
      ])),
      (d(), O(Pe, { to: "body" }, [
        i.value ? (d(), h("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: x
        })) : $("", !0)
      ]))
    ]));
  }
};
const un = ["data-column-key"], cn = { class: "flex flex-row items-center justify-between w-full" }, dn = { class: "flex flex-row items-center" }, fn = { class: "uppercase" }, mn = ["sorted"], pn = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, gn = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, hn = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, vn = { class: "flex items-center space-x-1" }, bn = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const o = e, l = ee("columnResize", null), i = F(() => {
      if (!l)
        return "auto";
      const n = l.getColumnWidth(o.cell.key);
      return n === "auto" ? n : `${n}px`;
    }), t = F(() => (l == null ? void 0 : l.isResizing) || !1), r = F(() => (l == null ? void 0 : l.resizingColumn) || null);
    function u() {
      o.cell.sortable && o.cell.onSort(o.cell.key);
    }
    function a(n, p) {
      l && l.startResize(n, p);
    }
    return (n, p) => D((d(), h("th", {
      class: q(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: se({ width: i.value }),
      "data-column-key": e.cell.key
    }, [
      (d(), O(xe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: U(u, ["prevent"])
      }, {
        default: V(() => [
          s("span", cn, [
            s("span", dn, [
              A(n.$slots, "label", {}, () => [
                s("span", fn, w(e.cell.label), 1)
              ], !0),
              A(n.$slots, "sort", {}, () => [
                e.cell.sortable ? (d(), h("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: q(["w-3 h-3 ml-2", {
                    "text-gray-400": !e.cell.sorted,
                    "text-green-500": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? $("", !0) : (d(), h("path", pn)),
                  e.cell.sorted === "asc" ? (d(), h("path", gn)) : $("", !0),
                  e.cell.sorted === "desc" ? (d(), h("path", hn)) : $("", !0)
                ], 10, mn)) : $("", !0)
              ], !0)
            ]),
            s("span", vn, [
              A(n.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (d(), O(an, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  color: e.cell.color,
                  onClick: p[0] || (p[0] = U(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : $("", !0)
              ], !0),
              A(n.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (d(), O(Yo, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  color: e.cell.color,
                  onClick: p[1] || (p[1] = U(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : $("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && I(l) ? (d(), O(Ir, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": a,
        "is-active": t.value && r.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : $("", !0)
    ], 14, un)), [
      [pe, !e.cell.hidden]
    ]);
  }
}, yn = /* @__PURE__ */ _e(bn, [["__scopeId", "data-v-8684dc95"]]), xn = ["dusk", "value"], wn = ["value"], rt = {
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
      return a.push(parseInt(l.value)), Rt(a).sort((n, p) => n - p);
    }), t = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, r = ee("themeVariables"), u = (a) => {
      var n, p;
      return J(
        B([a, "base"], t, (n = r == null ? void 0 : r.inertia_table) == null ? void 0 : n.per_page_selector, l.ui),
        B([a, "color", l.color], t, (p = r == null ? void 0 : r.inertia_table) == null ? void 0 : p.per_page_selector, l.ui)
      );
    };
    return (a, n) => (d(), h("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: q(u("select")),
      onChange: n[0] || (n[0] = (p) => e.onChange(p.target.value))
    }, [
      (d(!0), h(Y, null, Z(i.value, (p) => (d(), h("option", {
        key: p,
        value: p
      }, w(p) + " " + w(I(o).per_page), 9, wn))), 128))
    ], 42, xn));
  }
}, kn = {
  key: 0,
  class: "bg-white flex items-center"
}, Cn = { key: 0 }, _n = { class: "hidden sm:inline ml-2" }, $n = { class: "hidden sm:inline mr-2" }, Sn = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, Mn = { class: "flex flex-row space-x-4 items-center grow" }, zn = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, qn = { class: "font-medium" }, Tn = { class: "font-medium" }, In = { class: "font-medium" }, Nn = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, Pn = { class: "sr-only" }, Fn = { class: "sr-only" }, On = {
  key: 0,
  class: "ml-4"
}, jn = ["href"], Ln = {
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
    return (p, c) => t.value ? (d(), h("nav", kn, [
      !e.hasData || r.value.total < 1 ? (d(), h("p", Cn, w(I(o).no_results_found), 1)) : $("", !0),
      e.hasData ? (d(), h("div", {
        key: 1,
        class: q(["flex-1 flex justify-between", { "sm:hidden": i.value }])
      }, [
        (d(), O(xe(u.value ? "a" : "div"), {
          class: q([{
            "cursor-not-allowed text-gray-400": !u.value,
            "text-gray-700 hover:text-gray-500": u.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: u.value,
          dusk: u.value ? "pagination-simple-previous" : null,
          onClick: c[0] || (c[0] = U((x) => e.onClick(u.value), ["prevent"]))
        }, {
          default: V(() => [
            c[4] || (c[4] = s("svg", {
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
            s("span", _n, w(I(o).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        K(rt, {
          dusk: "per-page-mobile",
          value: n.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (d(), O(xe(a.value ? "a" : "div"), {
          class: q([{
            "cursor-not-allowed text-gray-400": !a.value,
            "text-gray-700 hover:text-gray-500": a.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: a.value,
          dusk: a.value ? "pagination-simple-next" : null,
          onClick: c[1] || (c[1] = U((x) => e.onClick(a.value), ["prevent"]))
        }, {
          default: V(() => [
            s("span", $n, w(I(o).next), 1),
            c[5] || (c[5] = s("svg", {
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
      ], 2)) : $("", !0),
      e.hasData && i.value ? (d(), h("div", Sn, [
        s("div", Mn, [
          K(rt, {
            dusk: "per-page-full",
            value: n.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          s("p", zn, [
            s("span", qn, w(r.value.from), 1),
            ne(" " + w(I(o).to) + " ", 1),
            s("span", Tn, w(r.value.to), 1),
            ne(" " + w(I(o).of) + " ", 1),
            s("span", In, w(r.value.total), 1),
            ne(" " + w(I(o).results), 1)
          ])
        ]),
        s("div", null, [
          s("nav", Nn, [
            (d(), O(xe(u.value ? "a" : "div"), {
              class: q([{
                "cursor-not-allowed text-gray-400": !u.value,
                "text-gray-500 hover:bg-gray-50": u.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: u.value,
              dusk: u.value ? "pagination-previous" : null,
              onClick: c[2] || (c[2] = U((x) => e.onClick(u.value), ["prevent"]))
            }, {
              default: V(() => [
                s("span", Pn, w(I(o).previous), 1),
                c[6] || (c[6] = s("svg", {
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
            (d(!0), h(Y, null, Z(r.value.links, (x, y) => (d(), h("div", { key: y }, [
              A(p.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (d(), O(xe(x.url ? "a" : "div"), {
                  key: 0,
                  href: x.url,
                  dusk: x.url ? `pagination-${x.label}` : null,
                  class: q(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !x.url,
                    "hover:bg-gray-50": x.url,
                    "bg-white": !x.active,
                    "bg-gray-100": x.active
                  }]),
                  onClick: U((S) => e.onClick(x.url), ["prevent"])
                }, {
                  default: V(() => [
                    ne(w(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : $("", !0)
              ])
            ]))), 128)),
            (d(), O(xe(a.value ? "a" : "div"), {
              class: q([{
                "cursor-not-allowed text-gray-400": !a.value,
                "text-gray-500 hover:bg-gray-50": a.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: a.value,
              dusk: a.value ? "pagination-next" : null,
              onClick: c[3] || (c[3] = U((x) => e.onClick(a.value), ["prevent"]))
            }, {
              default: V(() => [
                s("span", Fn, w(I(o).next), 1),
                c[7] || (c[7] = s("svg", {
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
        ]),
        e.showExportButton ? (d(), h("div", On, [
          A(p.$slots, "exportButton", {
            exportUrl: e.exportUrl,
            translations: I(o)
          }, () => [
            s("a", {
              href: e.exportUrl,
              class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, [
              c[8] || (c[8] = s("svg", {
                class: "h-4 w-4 mr-2",
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
              ], -1)),
              ne(" " + w(I(o).export_csv), 1)
            ], 8, jn)
          ])
        ])) : $("", !0)
      ])) : $("", !0)
    ])) : $("", !0);
  }
}, An = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, Rn = ["dusk", "onClick"], Bn = {
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
    const o = e, l = P(null);
    function i(t) {
      o.onAdd(t), l.value.hide();
    }
    return (t, r) => (d(), O(Oe, {
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
        s("div", An, [
          (d(!0), h(Y, null, Z(e.searchInputs, (u, a) => (d(), h("button", {
            key: a,
            dusk: `add-search-row-${u.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: U((n) => i(u.key), ["prevent"])
          }, w(u.label), 9, Rn))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, En = ["data-column-key"], Vn = { class: "flex items-center" }, Wn = ["onClick", "title"], Gn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, Un = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, Dn = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], gt = {
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
    const l = e, i = o, t = P([...l.columns]), r = P(!1), u = P(!1);
    ge(() => l.columns, (c) => {
      !r.value && !u.value && (t.value = [...c]), u.value && setTimeout(() => {
        u.value = !1;
      }, 100);
    }, { deep: !0 });
    function a(c, x) {
      const y = t.value.findIndex((S) => S.key === c);
      y !== -1 && (t.value[y].hidden = !x), i("columns-changed", t.value);
    }
    function n(c, x) {
      const y = t.value.findIndex((S) => S.key === c);
      y !== -1 && (t.value[y].pinned = !x), t.value.sort((S, T) => S.pinned && !T.pinned ? -1 : !S.pinned && T.pinned ? 1 : 0), i("columns-changed", t.value);
    }
    function p() {
      u.value = !0, i("columns-changed", t.value);
    }
    return (c, x) => (d(), O(I(Bt), {
      modelValue: t.value,
      "onUpdate:modelValue": x[0] || (x[0] = (y) => t.value = y),
      "item-key": "key",
      animation: 200,
      handle: ".drag-handle",
      onChange: p,
      onStart: x[1] || (x[1] = (y) => r.value = !0),
      onEnd: x[2] || (x[2] = (y) => r.value = !1)
    }, {
      item: V(({ element: y }) => [
        s("div", {
          class: "py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0",
          "data-test": "column-item",
          "data-column-key": y.key
        }, [
          s("div", Vn, [
            x[5] || (x[5] = s("div", { class: "drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600" }, [
              s("svg", {
                class: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                s("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            y.can_be_pinned !== !1 ? (d(), h("button", {
              key: 0,
              type: "button",
              class: q(["mr-2 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600", { "text-blue-500": y.pinned }]),
              onClick: U((S) => n(y.key, y.pinned), ["prevent"]),
              title: y.pinned ? "D\xE9s\xE9pingler la colonne" : "\xC9pingler la colonne"
            }, [
              y.pinned ? (d(), h("svg", Gn, [...x[3] || (x[3] = [
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
              ])])) : (d(), h("svg", Un, [...x[4] || (x[4] = [
                s("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, Wn)) : $("", !0),
            s("p", {
              class: q(["text-sm text-gray-900", { "text-gray-400": y.hidden, "font-semibold": y.pinned }])
            }, w(y.label), 3)
          ]),
          y.can_be_hidden && !y.pinned ? (d(), h("button", {
            key: 0,
            type: "button",
            class: q(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
              "bg-green-500": !y.hidden,
              "bg-gray-200": y.hidden
            }]),
            "aria-pressed": !y.hidden,
            "aria-labelledby": `toggle-column-${y.key}`,
            "aria-describedby": `toggle-column-${y.key}`,
            dusk: `toggle-column-${y.key}`,
            onClick: U((S) => a(y.key, y.hidden), ["prevent"])
          }, [
            x[6] || (x[6] = s("span", { class: "sr-only" }, "Column status", -1)),
            s("span", {
              "aria-hidden": "true",
              class: q([{
                "translate-x-5": !y.hidden,
                "translate-x-0": y.hidden
              }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
            }, null, 2)
          ], 10, Dn)) : $("", !0)
        ], 8, En)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
};
const Hn = {
  key: 0,
  class: "ml-1"
}, Kn = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, Xn = { class: "px-2" }, Qn = {
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
    const o = e, l = P([...o.columns]);
    ge(() => o.columns, (r) => {
      l.value = [...r];
    }, { deep: !0, immediate: !0 });
    const i = F(() => l.value.filter((r) => r.hidden).length);
    function t(r) {
      l.value = [...r], o.onChange(r);
    }
    return (r, u) => (d(), O(Oe, {
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
        e.hasHiddenColumns ? (d(), h("span", Hn, "(" + w(i.value) + ")", 1)) : $("", !0)
      ]),
      default: V(() => [
        s("div", Kn, [
          s("div", Xn, [
            K(gt, {
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
}, Jn = /* @__PURE__ */ _e(Qn, [["__scopeId", "data-v-eadc618a"]]), Yn = {
  key: 0,
  class: "ml-1"
}, Zn = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, el = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, tl = { class: "p-2" }, rl = ["name", "value", "onChange"], ol = ["value"], nl = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, ll = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, sl = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, al = {
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
    P(null);
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
      let p = n.value;
      n.value && (Number(Math.max(...n.value)) === Number(n.max) && Number(Math.min(...n.value)) === Number(n.min) ? p = null : Number(Math.min(...n.value)) === 0 && Number(Math.max(...n.value)) === 0 && (p = ["0", "0"])), o.onFilterChange(n.key, p);
    }
    const r = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, u = ee("themeVariables"), a = (n) => {
      var p, c, x, y;
      return J(
        B([n, "base"], r, (c = (p = u == null ? void 0 : u.inertia_table) == null ? void 0 : p.table_filter) == null ? void 0 : c.select_filter, o.ui),
        B([n, "color", o.color], r, (y = (x = u == null ? void 0 : u.inertia_table) == null ? void 0 : x.table_filter) == null ? void 0 : y.select_filter, o.ui)
      );
    };
    return (n, p) => (d(), O(Oe, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: V(() => [
        p[0] || (p[0] = s("svg", {
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
        e.hasEnabledFilters ? (d(), h("span", Yn, "(" + w(l.value) + ")", 1)) : $("", !0)
      ]),
      default: V(() => [
        s("div", Zn, [
          (d(!0), h(Y, null, Z(e.filters, (c, x) => (d(), h("div", { key: x }, [
            s("h3", el, w(c.label), 1),
            s("div", tl, [
              c.type === "select" ? (d(), h("select", {
                key: 0,
                name: c.key,
                value: c.value,
                class: q(a("select", e.color)),
                onChange: (y) => e.onFilterChange(c.key, y.target.value)
              }, [
                (d(!0), h(Y, null, Z(c.options, (y, S) => (d(), h("option", {
                  key: S,
                  value: S
                }, w(y), 9, ol))), 128))
              ], 42, rl)) : $("", !0),
              c.type === "toggle" ? (d(), O(ct, {
                key: 1,
                filter: c,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : $("", !0),
              c.type === "number_range" ? (d(), h("div", nl, [
                K(dt, {
                  modelValue: c.value,
                  "onUpdate:modelValue": [(y) => c.value = y, (y) => t(c)],
                  max: c.max,
                  min: c.min,
                  prefix: c.prefix,
                  suffix: c.suffix,
                  step: c.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : $("", !0),
              c.type === "date" ? (d(), h("div", ll, [
                K(mt, {
                  filter: c,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : $("", !0),
              c.type === "number" ? (d(), h("div", sl, [
                K(ft, {
                  filter: c,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : $("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, il = { class: "relative" }, ul = ["placeholder", "value"], cl = {
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
    }, i = ee("themeVariables"), t = (r) => {
      var u, a;
      return J(
        B([r, "base"], l, (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.global_search, o.ui),
        B([r, "color", o.color], l, (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.global_search, o.ui)
      );
    };
    return (r, u) => (d(), h("div", il, [
      s("input", {
        class: q(t("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: u[0] || (u[0] = (a) => e.onChange(a.target.value))
      }, null, 42, ul),
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
}, dl = { class: "flex rounded-md shadow-sm relative mt-3" }, fl = ["for"], ml = ["id", "name", "value", "onInput"], pl = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, gl = ["dusk", "onClick"], hl = {
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
    const o = { el: P([]) };
    let l = F(() => o.el.value);
    const i = e;
    function t(n) {
      return i.forcedVisibleSearchInputs.includes(n);
    }
    ge(i.forcedVisibleSearchInputs, (n) => {
      const p = n.length > 0 ? n[n.length - 1] : null;
      !p || nt().then(() => {
        const c = Et(l.value, (x) => x.name === p);
        c && c.focus();
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
    }, u = ee("themeVariables"), a = (n) => {
      var p, c;
      return J(
        B([n, "base"], r, (p = u == null ? void 0 : u.inertia_table) == null ? void 0 : p.table_search_rows, i.ui),
        B([n, "color", i.color], r, (c = u == null ? void 0 : u.inertia_table) == null ? void 0 : c.table_search_rows, i.ui)
      );
    };
    return (n, p) => (d(!0), h(Y, null, Z(e.searchInputs, (c, x) => D((d(), h("div", {
      key: x,
      class: "px-4 sm:px-0"
    }, [
      s("div", dl, [
        s("label", {
          for: c.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          p[0] || (p[0] = s("svg", {
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
          s("span", null, w(c.label), 1)
        ], 8, fl),
        (d(), h("input", {
          id: c.key,
          ref_for: !0,
          ref: o.el,
          key: c.key,
          name: c.key,
          value: c.value,
          type: "text",
          class: q(a("input")),
          onInput: (y) => e.onChange(c.key, y.target.value)
        }, null, 42, ml)),
        s("div", pl, [
          s("button", {
            class: q(a("remove_button")),
            dusk: `remove-search-row-${c.key}`,
            onClick: U((y) => e.onRemove(c.key), ["prevent"])
          }, [...p[1] || (p[1] = [
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
          ])], 10, gl)
        ])
      ])
    ])), [
      [pe, c.value !== null || t(c.key)]
    ])), 128));
  }
}, vl = {
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
    }, t = ee("themeVariables"), r = (u) => {
      var a, n;
      return J(
        B([u, "base"], i, (a = t == null ? void 0 : t.inertia_table) == null ? void 0 : a.reset_button, l.ui),
        B([u, "color", l.color], i, (n = t == null ? void 0 : t.inertia_table) == null ? void 0 : n.reset_button, l.ui)
      );
    };
    return (u, a) => {
      var n;
      return d(), h("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: q(r("button")),
        "aria-haspopup": "true",
        onClick: a[0] || (a[0] = U((...p) => e.onClick && e.onClick(...p), ["prevent"]))
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
        s("span", null, w((n = I(o).reset) != null ? n : "Reset"), 1)
      ], 2);
    };
  }
}, bl = {}, yl = { class: "flow-root" }, xl = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, wl = { class: "inline-block min-w-full w-full max-w-full py-2 align-middle sm:px-6 lg:px-8" }, kl = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function Cl(e, o) {
  return d(), h("div", yl, [
    s("div", xl, [
      s("div", wl, [
        s("div", kl, [
          A(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const _l = /* @__PURE__ */ _e(bl, [["render", Cl]]), $l = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Sl = ["dusk", "onClick"], Ml = { class: "px-2" }, zl = {
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
    const o = he(), l = e, i = P(!1), t = P(!1);
    function r() {
      i.value = t.value = !1;
    }
    function u(a) {
      var n, p;
      (n = l.actions.toggleColumns) != null && n.onReorder ? l.actions.toggleColumns.onReorder(a) : (p = l.actions.toggleColumns) != null && p.onChange && l.actions.toggleColumns.onChange(a);
    }
    return (a, n) => (d(), O(Oe, {
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
        var p, c, x, y, S;
        return [
          s("div", $l, [
            D(s("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (d(), h("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: n[0] || (n[0] = (T) => t.value = !0)
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
                s("span", null, w((p = I(o).add_search_fields) != null ? p : "Add search field"), 1)
              ])) : $("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (d(), h("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: n[1] || (n[1] = (T) => i.value = !0)
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
                s("span", null, w((c = I(o).show_hide_columns) != null ? c : "Show / Hide columns"), 1)
              ])) : $("", !0),
              n[9] || (n[9] = s("hr", null, null, -1)),
              "reset" in e.actions ? (d(), h("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: n[2] || (n[2] = (...T) => {
                  var b, m;
                  return ((b = e.actions.reset) == null ? void 0 : b.onClick) && ((m = e.actions.reset) == null ? void 0 : m.onClick(...T));
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
                s("span", null, w((x = I(o).grouped_reset) != null ? x : "Reset"), 1)
              ])) : $("", !0)
            ], 512), [
              [pe, !i.value && !t.value]
            ]),
            D(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: n[3] || (n[3] = (T) => t.value = !1)
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
                s("span", null, w((y = I(o).add_search_fields) != null ? y : "Add search field"), 1)
              ]),
              (d(!0), h(Y, null, Z(e.actions.searchFields.searchInputs, (T, b) => (d(), h("button", {
                key: b,
                dusk: `add-search-row-${T.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: U((m) => e.actions.searchFields.onClick(T.key), ["prevent"])
              }, w(T.label), 9, Sl))), 128))
            ], 512), [
              [pe, t.value]
            ]),
            D(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: n[4] || (n[4] = (T) => i.value = !1)
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
                s("span", null, w((S = I(o).show_hide_columns) != null ? S : "Show / Hide columns"), 1)
              ]),
              s("div", Ml, [
                K(gt, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: u
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [pe, i.value]
            ]),
            D(s("div", null, [
              A(a.$slots, "default")
            ], 512), [
              [pe, !i.value && !t.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function ql(e) {
  const o = P(!1), l = P(null), i = P(0), t = P(0), r = qt({}), u = () => {
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
    const _ = m.target.closest("th");
    t.value = _.offsetWidth;
    const M = _.closest("table");
    M && M.querySelectorAll("thead th[data-column-key]").forEach((W) => {
      const G = W.getAttribute("data-column-key"), X = W.offsetWidth;
      r[G] || (r[G] = X), W.style.width = `${r[G]}px`;
      const te = Array.from(W.parentNode.children).indexOf(W);
      M.querySelectorAll("tbody tr").forEach((ie) => {
        const oe = ie.children[te];
        oe && (oe.style.width = `${r[G]}px`);
      });
    }), document.addEventListener("mousemove", p), document.addEventListener("mouseup", c), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, p = (m) => {
    if (!o.value || !l.value)
      return;
    const C = m.clientX - i.value, _ = Math.max(50, t.value + C);
    r[l.value] = _;
    const M = document.querySelector(`th[data-column-key="${l.value}"]`);
    if (M) {
      M.style.width = `${_}px`;
      const j = M.closest("table");
      if (j) {
        const W = Array.from(M.parentNode.children).indexOf(M);
        j.querySelectorAll("tbody tr").forEach((X) => {
          const te = X.children[W];
          te && (te.style.width = `${_}px`);
        });
      }
    }
  }, c = () => {
    o.value && (o.value = !1, l.value = null, a(), document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, x = (m) => r[m] || "auto", y = (m, C) => {
    r[m] = C, a();
  }, S = (m) => {
    if (!m)
      return;
    m.querySelectorAll("thead th[data-column-key]").forEach((_) => {
      const M = _.getAttribute("data-column-key");
      if (!r[M]) {
        const G = _.offsetWidth;
        r[M] = Math.max(G, 100);
      }
      _.style.width = `${r[M]}px`;
      const j = Array.from(_.parentNode.children).indexOf(_);
      m.querySelectorAll("tbody tr").forEach((G) => {
        const X = G.children[j];
        X && (X.style.width = `${r[M]}px`);
      });
    });
  }, T = () => {
    Object.keys(r).forEach((m) => {
      delete r[m];
    }), e !== "default" && localStorage.removeItem(`table-column-widths-${e}`);
  }, b = () => {
    o.value && (document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return ae(() => {
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
    resetColumnWidths: T,
    loadColumnWidths: u,
    saveColumnWidths: a,
    initializeColumnWidths: S
  };
}
const Tl = ["dusk"], Il = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, Nl = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, Pl = { class: "mr-2 sm:mr-4" }, Fl = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, Ol = { class: "overflow-x-auto" }, jl = { class: "bg-gray-50" }, Ll = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border pinned-checkbox-header",
  style: { width: "60px" }
}, Al = ["id"], Rl = { class: "divide-y divide-gray-200 bg-white" }, Bl = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500 pinned-checkbox",
  style: { width: "60px" }
}, El = ["id", "onUpdate:modelValue"], Vl = ["onClick", "data-column-key"], Wl = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, Gl = {
  key: 0,
  class: "italic text-sm px-2"
}, Ul = {
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
    Tt();
    const r = t.resizeableColumns ? ql(t.name) : null;
    It("columnResize", r);
    const u = P(!1), a = F(() => Ze().props.queryBuilderProps ? { ...Ze().props.queryBuilderProps[t.name] } : {}), n = P(a.value), p = F(() => a.value.pageName), c = P([]), x = P(null), y = P(!1), S = F(() => a.value.hasToggleableColumns || a.value.hasFilters || a.value.hasSearchInputs ? !1 : !a.value.globalSearch), T = F(() => Object.keys(t.resource).length === 0 ? t.data : "data" in t.resource ? t.resource.data : t.resource), b = F(() => Object.keys(t.resource).length === 0 ? t.meta : "links" in t.resource && "meta" in t.resource && Object.keys(t.resource.links).length === 4 && "next" in t.resource.links && "prev" in t.resource.links ? {
      ...t.resource.meta,
      next_page_url: t.resource.links.next,
      prev_page_url: t.resource.links.prev
    } : "meta" in t.resource ? t.resource.meta : t.resource), m = F(() => T.value.length > 0 ? !0 : b.value.total > 0), C = P({
      reset: {
        onClick: X
      },
      toggleColumns: {
        show: a.value.hasToggleableColumns,
        columns: a.value.columns,
        onChange: ue
      },
      searchFields: {
        show: a.value.hasSearchInputs && !t.hideSearchInputsAboveTable,
        searchInputs: a.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: a.value.hasSearchInputsWithoutValue,
        onClick: M
      }
    });
    function _(f) {
      c.value = c.value.filter((g) => g != f), re(f, null);
    }
    function M(f) {
      c.value.push(f);
    }
    const j = F(() => {
      if (c.value.length > 0)
        return !0;
      const f = Ae.parse(location.search.substring(1));
      if (f[p.value] > 1)
        return !0;
      const v = t.name === "default" ? "" : t.name + "_";
      let z = !1;
      return de(["filter", "columns", "cursor", "sort"], (k) => {
        const E = f[v + k];
        k === "sort" && E === a.value.defaultSort || E !== void 0 && (z = !0);
      }), z;
    }), W = (f, g) => {
      let v = [];
      if (t.striped && g % 2 && v.push("bg-gray-50"), t.striped ? v.push("hover:bg-gray-100") : v.push("hover:bg-gray-50"), t.rowClass && typeof t.rowClass == "function") {
        const z = t.rowClass(f);
        z && v.push(z);
      }
      return v.join(" ");
    }, G = F(() => {
      if (!t.showExportButton)
        return null;
      const f = new URL(window.location.href);
      f.search = "";
      const g = new URLSearchParams();
      if (a.value.page && a.value.page > 1 && g.set(p.value, a.value.page), a.value.sort) {
        const k = t.name === "default" ? "sort" : `${t.name}_sort`;
        g.set(k, a.value.sort);
      }
      const v = {};
      if (n.value.filters.forEach((k) => {
        k.value !== null && k.value !== void 0 && k.value !== "" && (v[k.key] = k.value);
      }), n.value.searchInputs.forEach((k) => {
        k.value !== null && k.value !== void 0 && k.value !== "" && (v[k.key] = k.value);
      }), Object.keys(v).length > 0) {
        const k = t.name === "default" ? "filter" : `${t.name}_filter`;
        Object.keys(v).forEach((E) => {
          const H = v[E];
          Array.isArray(H) ? H.forEach((ye, Le) => {
            g.set(`${k}[${E}][${Le}]`, ye);
          }) : typeof H == "object" && H !== null ? Object.keys(H).forEach((ye) => {
            g.set(`${k}[${E}][${ye}]`, H[ye]);
          }) : g.set(`${k}[${E}]`, H);
        });
      }
      const z = n.value.columns.filter((k) => !k.hidden).map((k) => k.key);
      if (z.length !== n.value.columns.length) {
        const k = t.name === "default" ? "columns" : `${t.name}_columns`;
        z.forEach((E) => {
          g.append(`${k}[]`, E);
        });
      }
      if (a.value.perPageOptions && a.value.perPageOptions.length > 0) {
        const k = new URLSearchParams(window.location.search).get("perPage") || a.value.perPageOptions[0];
        k && k !== a.value.perPageOptions[0] && g.set("perPage", k);
      }
      return g.set("do_export", "1"), g.set("table", t.name || "default"), f.search = g.toString(), f.toString();
    });
    function X() {
      c.value = [], de(n.value.filters, (f, g) => {
        n.value.filters[g].value = null;
      }), de(n.value.searchInputs, (f, g) => {
        n.value.searchInputs[g].value = null;
      }), de(n.value.columns, (f, g) => {
        n.value.columns[g].hidden = f.can_be_hidden ? !a.value.defaultVisibleToggleableColumns.includes(f.key) : !1, n.value.columns[g].pinned = !1;
      }), localStorage.removeItem(`columns-${t.name}`), t.resizeableColumns && r && r.resetColumnWidths(), n.value.sort = null, n.value.cursor = null, n.value.page = 1;
    }
    const te = {};
    function re(f, g) {
      clearTimeout(te[f]), te[f] = setTimeout(() => {
        je.value && t.preventOverlappingRequests && je.value.cancel();
        const v = ve("searchInputs", f);
        n.value.searchInputs[v].value = g, n.value.cursor = null, n.value.page = 1;
      }, t.inputDebounceMs);
    }
    function ie(f) {
      re("global", f);
    }
    function oe(f, g) {
      const v = ve("filters", f);
      n.value.filters[v].value = g, n.value.cursor = null, n.value.page = 1;
    }
    function L(f) {
      n.value.cursor = null, n.value.perPage = f, n.value.page = 1;
    }
    function ve(f, g) {
      return Gt(n.value[f], (v) => v.key == g);
    }
    function ue(f) {
      n.value.columns = f, n.value.columns.sort((g, v) => g.pinned && !v.pinned ? -1 : !g.pinned && v.pinned ? 1 : 0), ze();
    }
    function ze() {
      if (t.name && t.name !== "default") {
        const f = n.value.columns.map((g, v) => ({
          key: g.key,
          hidden: g.hidden,
          pinned: g.pinned || !1,
          order: v
        }));
        localStorage.setItem(`columns-${t.name}`, JSON.stringify(f));
      }
    }
    function be() {
      let f = {};
      return de(n.value.searchInputs, (g) => {
        g.value !== null && (f[g.key] = g.value);
      }), de(n.value.filters, (g) => {
        let v = g.value;
        v !== null && (g.type === "number_range" && Number(Math.max(...g.value)) === Number(g.max) && Number(Math.min(...g.value)) === Number(g.min) && (v = null), f[g.key] = v);
      }), f;
    }
    function qe() {
      const f = n.value.columns;
      let g = Wt(f, (z) => !z.hidden), v = Dt(g, (z) => z.key).sort();
      return Ut(v, a.value.defaultVisibleToggleableColumns) ? {} : v;
    }
    function $e() {
      const f = be(), g = qe(), v = {};
      Object.keys(f).length > 0 && (v.filter = f), Object.keys(g).length > 0 && (v.columns = g);
      const z = n.value.cursor, k = n.value.page, E = n.value.sort, H = n.value.perPage;
      return z && (v.cursor = z), k > 1 && (v.page = k), H > 1 && (v.perPage = H), E && (v.sort = E), v;
    }
    function ce(f) {
      if (!f)
        return null;
      if (t.paginationClickCallback && typeof t.paginationClickCallback == "function") {
        t.paginationClickCallback(f);
        return;
      }
      We(f);
    }
    function Te() {
      const f = Ae.parse(location.search.substring(1)), g = t.name === "default" ? "" : t.name + "_";
      de(["filter", "columns", "cursor", "sort"], (z) => {
        delete f[g + z];
      }), delete f[p.value], de($e(), (z, k) => {
        k === "page" ? f[p.value] = z : k === "perPage" ? f.perPage = z : f[g + k] = z;
      });
      let v = Ae.stringify(f, {
        filter(z, k) {
          return typeof k == "object" && k !== null ? Ht(k) : k;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!v || v === p.value + "=1") && (v = ""), v;
    }
    const Q = P(!1), je = P(null);
    function We(f) {
      !f || Kt.get(
        f,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: t.preserveScroll !== !1,
          onBefore() {
            Q.value = !0;
          },
          onCancelToken(g) {
            je.value = g;
          },
          onFinish() {
            Q.value = !1;
          },
          onSuccess() {
            if (t.preserveScroll === "table-top") {
              const v = x.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: v });
            }
          }
        }
      );
    }
    function ht(f, g, v) {
      var z;
      t.hasCheckboxes && ((z = f.target) == null ? void 0 : z.parentElement.cellIndex) === 0 || i("rowClicked", f, g, v);
    }
    ge(n, () => {
      We(location.pathname + "?" + Te()), y.value = !1;
    }, { deep: !0 }), ge(t.resource, () => {
      const f = t.resource.data.filter((g) => g.__itSelected);
      i("selectionChanged", f);
    }, { deep: !0 });
    const Ge = () => {
      t.resizeableColumns && r && setTimeout(() => {
        var g;
        const f = (g = x.value) == null ? void 0 : g.querySelector("table");
        f && r.initializeColumnWidths(f);
      }, 0);
    };
    ae(() => {
      document.addEventListener("inertia:success", Ge), vt(), t.resizeableColumns && r && setTimeout(() => {
        var g;
        const f = (g = x.value) == null ? void 0 : g.querySelector("table");
        f && r.initializeColumnWidths(f);
      }, 0);
    });
    function vt() {
      if (!t.name || t.name === "default")
        return;
      console.log("Loading columns from storage for table:", t.name);
      const f = localStorage.getItem(`columns-${t.name}`);
      if (!!f)
        try {
          const g = JSON.parse(f);
          if (g.length > 0 && "order" in g[0]) {
            const v = new Map(g.map((z) => [z.key, z]));
            n.value.columns.forEach((z, k) => {
              const E = v.get(z.key);
              E && (n.value.columns[k].hidden = E.hidden, n.value.columns[k].pinned = E.pinned || !1);
            }), n.value.columns.sort((z, k) => {
              var Xe, Qe;
              const E = v.get(z.key), H = v.get(k.key);
              if (z.pinned && !k.pinned)
                return -1;
              if (!z.pinned && k.pinned)
                return 1;
              const ye = (Xe = E == null ? void 0 : E.order) != null ? Xe : 999, Le = (Qe = H == null ? void 0 : H.order) != null ? Qe : 999;
              return ye - Le;
            });
          } else
            g.forEach((v, z) => {
              const k = n.value.columns.findIndex((E) => E.key === v.key);
              k !== -1 && (n.value.columns[k].hidden = v.hidden, n.value.columns[k].pinned = v.pinned || !1);
            });
        } catch (g) {
          console.warn("Error loading column order from localStorage:", g);
        }
    }
    Fe(() => {
      document.removeEventListener("inertia:success", Ge);
    });
    function Ue(f) {
      n.value.sort == f ? n.value.sort = `-${f}` : n.value.sort = f, n.value.cursor = null, n.value.page = 1;
    }
    function Ie(f) {
      const g = ve("columns", f);
      return !n.value.columns[g].hidden;
    }
    function Ne(f) {
      const g = ve("columns", f), v = Vt(n.value.columns[g]);
      v.onSort = Ue, v.filters = n.value.filters.filter(
        (k) => k.key === f || k.key.startsWith(f + "_") || k.key.includes(f)
      );
      const z = n.value.searchInputs.filter(
        (k) => k.key === f
      );
      return z.length > 0 ? (v.searchable = !0, v.searchInputs = z) : (v.searchable = !1, v.searchInputs = []), v.onFilterChange = oe, v.onSearchChange = re, v.color = t.color, v;
    }
    function bt() {
      t.resource.data.forEach((f) => {
        f.__itSelected = y.value;
      });
    }
    function yt(f) {
      if (!t.resizeableColumns || !r)
        return "auto";
      const g = r.getColumnWidth(f);
      return g === "auto" ? g : `${g}px`;
    }
    function De(f) {
      if (!t.resizeableColumns || !r)
        return "0px";
      let g = 0;
      const v = n.value.columns.filter((z) => !z.hidden);
      t.hasCheckboxes && (g += 60);
      for (const z of v) {
        if (z.key === f)
          break;
        if (z.pinned) {
          const k = r.getColumnWidth(z.key);
          g += k === "auto" ? 150 : k;
        }
      }
      return `${g}px`;
    }
    function He(f) {
      const g = n.value.columns.find((v) => v.key === f);
      return g && g.pinned;
    }
    function xt(f) {
      return He(f) ? {
        position: "sticky",
        left: De(f),
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function wt(f) {
      return He(f) ? {
        position: "sticky",
        left: De(f),
        zIndex: 11,
        backgroundColor: "#f9fafb",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const kt = F(() => {
      if (!t.resizeableColumns || !r)
        return "100%";
      let f = 0, g = !1;
      return t.hasCheckboxes && (f += 60), a.value.columns.forEach((v) => {
        if (!Ie(v.key))
          return;
        const z = r.getColumnWidth(v.key);
        z === "auto" ? g = !0 : f += z;
      }), !g && f > 0 ? `${f}px` : "max(100%, " + (f > 0 ? f + "px" : "800px") + ")";
    }), Ke = F(() => t.resource.data.filter((f) => f.__itSelected).length), Ct = F(() => Ke.value === 0 ? l.noLineSelected : `${Ke.value} ${l.lineSelected}`);
    function _t() {
      t.resizeableColumns && (u.value = !0);
    }
    function $t() {
      t.resizeableColumns && setTimeout(() => {
        u.value = !1;
      }, 100);
    }
    return (f, g) => (d(), O(Nt, null, {
      default: V(() => [
        (d(), h("fieldset", {
          ref_key: "tableFieldset",
          ref: x,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: q(["min-w-0", { "opacity-75": Q.value }])
        }, [
          s("div", Il, [
            a.value.globalSearch ? (d(), h("div", Nl, [
              A(f.$slots, "tableGlobalSearch", {
                hasGlobalSearch: a.value.globalSearch,
                label: a.value.globalSearch ? a.value.globalSearch.label : null,
                value: a.value.globalSearch ? a.value.globalSearch.value : null,
                onChange: ie
              }, () => [
                a.value.globalSearch ? (d(), O(cl, {
                  key: 0,
                  class: "grow",
                  label: a.value.globalSearch.label,
                  value: a.value.globalSearch.value,
                  "on-change": ie,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : $("", !0)
              ], !0)
            ])) : $("", !0),
            s("div", Pl, [
              A(f.$slots, "tableFilter", {
                hasFilters: a.value.hasFilters,
                hasEnabledFilters: a.value.hasEnabledFilters,
                filters: a.value.filters,
                onFilterChange: oe
              }, () => [
                a.value.hasFilters ? (d(), O(al, {
                  key: 0,
                  "has-enabled-filters": a.value.hasEnabledFilters,
                  filters: a.value.filters,
                  "on-filter-change": oe,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : $("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? A(f.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: a.value.hasSearchInputs,
              hasSearchInputsWithoutValue: a.value.hasSearchInputsWithoutValue,
              searchInputs: a.value.searchInputsWithoutGlobal,
              onAdd: M
            }, () => [
              a.value.hasSearchInputs ? (d(), O(Bn, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": a.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": a.value.hasSearchInputsWithoutValue,
                "on-add": M,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : $("", !0)
            ], !0) : $("", !0),
            e.withGroupedMenu ? $("", !0) : A(f.$slots, "tableColumns", {
              key: 2,
              hasColumns: a.value.hasToggleableColumns,
              columns: n.value.columns,
              hasHiddenColumns: a.value.hasHiddenColumns,
              onChange: ue
            }, () => [
              a.value.hasToggleableColumns ? (d(), O(Jn, {
                key: 0,
                class: q({ "mr-2 sm:mr-4": j.value }),
                columns: n.value.columns,
                "has-hidden-columns": a.value.hasHiddenColumns,
                "on-change": ue,
                "table-name": e.name,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "table-name", "color"])) : $("", !0)
            ], !0),
            e.withGroupedMenu ? A(f.$slots, "groupedAction", {
              key: 3,
              actions: C.value
            }, () => [
              K(zl, {
                color: e.color,
                actions: C.value
              }, {
                default: V(() => [
                  A(f.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : $("", !0),
            e.withGroupedMenu ? $("", !0) : A(f.$slots, "tableReset", {
              key: 4,
              canBeReset: j.value,
              onClick: X
            }, () => [
              j.value ? (d(), h("div", Fl, [
                K(vl, {
                  "on-click": X,
                  color: e.color
                }, null, 8, ["color"])
              ])) : $("", !0)
            ], !0)
          ]),
          e.hideSearchInputsAboveTable ? $("", !0) : A(f.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: a.value.hasSearchInputsWithValue,
            searchInputs: a.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: c.value,
            onChange: re
          }, () => [
            a.value.hasSearchInputsWithValue || c.value.length > 0 ? (d(), O(hl, {
              key: 0,
              "search-inputs": a.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": c.value,
              "on-change": re,
              "on-remove": _,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : $("", !0)
          ], !0),
          A(f.$slots, "tableWrapper", { meta: b.value }, () => [
            K(_l, {
              class: q({ "mt-3": !S.value })
            }, {
              default: V(() => [
                A(f.$slots, "table", {}, () => [
                  s("div", Ol, [
                    s("table", {
                      class: q(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && u.value }]),
                      style: se([{ "table-layout": "fixed", "min-width": "100%" }, { width: kt.value }]),
                      onMouseenter: g[1] || (g[1] = (v) => e.resizeableColumns ? _t : null),
                      onMouseleave: g[2] || (g[2] = (v) => e.resizeableColumns ? $t : null)
                    }, [
                      s("thead", jl, [
                        A(f.$slots, "head", {
                          show: Ie,
                          sortBy: Ue,
                          header: Ne
                        }, () => [
                          s("tr", null, [
                            e.hasCheckboxes ? (d(), h("th", Ll, [
                              D(s("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: bt,
                                "onUpdate:modelValue": g[0] || (g[0] = (v) => y.value = v),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, Al), [
                                [Ye, y.value]
                              ])
                            ])) : $("", !0),
                            (d(!0), h(Y, null, Z(n.value.columns, (v) => (d(), O(yn, {
                              cell: Ne(v.key),
                              style: se(wt(v.key))
                            }, {
                              label: V(() => [
                                A(f.$slots, `header(${v.key})`, {
                                  label: Ne(v.key).label,
                                  column: Ne(v.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      s("tbody", Rl, [
                        A(f.$slots, "body", { show: Ie }, () => [
                          (d(!0), h(Y, null, Z(T.value, (v, z) => (d(), h("tr", {
                            key: `table-${e.name}-row-${z}`,
                            class: q(W(v, z))
                          }, [
                            e.hasCheckboxes ? (d(), h("td", Bl, [
                              D(s("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${z}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (k) => v.__itSelected = k
                              }, null, 8, El), [
                                [Ye, v.__itSelected]
                              ])
                            ])) : $("", !0),
                            (d(!0), h(Y, null, Z(n.value.columns, (k, E) => D((d(), h("td", {
                              key: `table-${e.name}-row-${z}-column-${k.key}`,
                              onClick: (H) => ht(H, v, z),
                              class: q(k.body_class),
                              "data-column-key": k.key,
                              style: se({
                                width: yt(k.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...xt(k.key)
                              })
                            }, [
                              A(f.$slots, `cell(${k.key})`, { item: v }, () => [
                                ne(w(v[k.key]), 1)
                              ], !0)
                            ], 14, Vl)), [
                              [pe, Ie(k.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                A(f.$slots, "pagination", {
                  onClick: ce,
                  hasData: m.value,
                  meta: b.value,
                  perPageOptions: a.value.perPageOptions,
                  onPerPageChange: L,
                  showExportButton: e.showExportButton,
                  exportUrl: G.value
                }, () => [
                  s("div", Wl, [
                    e.hasCheckboxes ? (d(), h("span", Gl, w(Ct.value), 1)) : $("", !0),
                    K(Ln, {
                      "on-click": ce,
                      "has-data": m.value,
                      meta: b.value,
                      "per-page-options": a.value.perPageOptions,
                      "on-per-page-change": L,
                      color: e.color,
                      "show-export-button": e.showExportButton,
                      "export-url": G.value
                    }, {
                      exportButton: V((v) => [
                        A(f.$slots, "exportButton", Pt(Ft(v)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button", "export-url"])
                  ])
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, Tl))
      ]),
      _: 3
    }));
  }
}, ds = /* @__PURE__ */ _e(Ul, [["__scopeId", "data-v-7f0c6493"]]);
export {
  Oe as ButtonWithDropdown,
  yn as HeaderCell,
  Xt as OnClickOutside,
  Ln as Pagination,
  ds as Table,
  Bn as TableAddSearchRow,
  Jn as TableColumns,
  al as TableFilter,
  cl as TableGlobalSearch,
  vl as TableReset,
  hl as TableSearchRows,
  _l as TableWrapper,
  he as getTranslations,
  us as setTranslation,
  cs as setTranslations
};
