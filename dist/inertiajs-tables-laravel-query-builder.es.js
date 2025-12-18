import { ref as N, onMounted as ge, onBeforeUnmount as Xt, openBlock as f, createElementBlock as v, renderSlot as B, watch as he, inject as ae, createBlock as E, withCtx as H, createElementVNode as a, normalizeClass as O, withModifiers as X, withDirectives as Y, vShow as xe, createStaticVNode as Yt, normalizeStyle as fe, toDisplayString as k, createCommentVNode as C, createTextVNode as me, computed as A, unref as R, vModelSelect as xt, vModelText as Fe, watchEffect as Qt, onUnmounted as Ye, Teleport as Ke, Fragment as le, renderList as se, createVNode as te, withKeys as dt, nextTick as wt, resolveDynamicComponent as Oe, reactive as Jt, getCurrentInstance as Zt, provide as er, Transition as tr, vModelCheckbox as ft, normalizeProps as rr, guardReactiveProps as or } from "vue";
import { createPopper as nr } from "@popperjs/core/lib/popper-lite";
import lr from "@popperjs/core/lib/modifiers/preventOverflow";
import sr from "@popperjs/core/lib/modifiers/flip";
import { createPopper as ar } from "@popperjs/core";
import ir from "lodash-es/uniq";
import ur from "vuedraggable";
import cr from "lodash-es/find";
import Ze from "qs";
import dr from "lodash-es/clone";
import fr from "lodash-es/filter";
import mr from "lodash-es/findKey";
import be from "lodash-es/forEach";
import hr from "lodash-es/isEqual";
import gr from "lodash-es/map";
import pr from "lodash-es/pickBy";
import { usePage as mt, router as vr } from "@inertiajs/vue3";
const br = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const n = e, o = N(null), s = N(null);
    return ge(() => {
      o.value = (t) => {
        t.target === s.value || s.value.contains(t.target) || n.do();
      }, document.addEventListener("click", o.value), document.addEventListener("touchstart", o.value);
    }), Xt(() => {
      document.removeEventListener("click", o.value), document.removeEventListener("touchstart", o.value);
    }), (t, l) => (f(), v("div", {
      ref_key: "root",
      ref: s
    }, [
      B(t.$slots, "default")
    ], 512));
  }
}, yr = (e, n) => {
  const o = new Array(e.length + n.length);
  for (let s = 0; s < e.length; s++)
    o[s] = e[s];
  for (let s = 0; s < n.length; s++)
    o[e.length + s] = n[s];
  return o;
}, xr = (e, n) => ({
  classGroupId: e,
  validator: n
}), kt = (e = /* @__PURE__ */ new Map(), n = null, o) => ({
  nextPart: e,
  validators: n,
  classGroupId: o
}), Xe = "-", ht = [], wr = "arbitrary..", kr = (e) => {
  const n = _r(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (u) => {
      if (u.startsWith("[") && u.endsWith("]"))
        return Cr(u);
      const i = u.split(Xe), r = i[0] === "" && i.length > 1 ? 1 : 0;
      return Ct(i, r, n);
    },
    getConflictingClassGroupIds: (u, i) => {
      if (i) {
        const r = s[u], g = o[u];
        return r ? g ? yr(g, r) : r : g || ht;
      }
      return o[u] || ht;
    }
  };
}, Ct = (e, n, o) => {
  if (e.length - n === 0)
    return o.classGroupId;
  const t = e[n], l = o.nextPart.get(t);
  if (l) {
    const g = Ct(e, n + 1, l);
    if (g)
      return g;
  }
  const u = o.validators;
  if (u === null)
    return;
  const i = n === 0 ? e.join(Xe) : e.slice(n).join(Xe), r = u.length;
  for (let g = 0; g < r; g++) {
    const d = u[g];
    if (d.validator(i))
      return d.classGroupId;
  }
}, Cr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const n = e.slice(1, -1), o = n.indexOf(":"), s = n.slice(0, o);
  return s ? wr + s : void 0;
})(), _r = (e) => {
  const {
    theme: n,
    classGroups: o
  } = e;
  return $r(o, n);
}, $r = (e, n) => {
  const o = kt();
  for (const s in e) {
    const t = e[s];
    ot(t, o, s, n);
  }
  return o;
}, ot = (e, n, o, s) => {
  const t = e.length;
  for (let l = 0; l < t; l++) {
    const u = e[l];
    Sr(u, n, o, s);
  }
}, Sr = (e, n, o, s) => {
  if (typeof e == "string") {
    Mr(e, n, o);
    return;
  }
  if (typeof e == "function") {
    zr(e, n, o, s);
    return;
  }
  qr(e, n, o, s);
}, Mr = (e, n, o) => {
  const s = e === "" ? n : _t(n, e);
  s.classGroupId = o;
}, zr = (e, n, o, s) => {
  if (Ir(e)) {
    ot(e(s), n, o, s);
    return;
  }
  n.validators === null && (n.validators = []), n.validators.push(xr(o, e));
}, qr = (e, n, o, s) => {
  const t = Object.entries(e), l = t.length;
  for (let u = 0; u < l; u++) {
    const [i, r] = t[u];
    ot(r, _t(n, i), o, s);
  }
}, _t = (e, n) => {
  let o = e;
  const s = n.split(Xe), t = s.length;
  for (let l = 0; l < t; l++) {
    const u = s[l];
    let i = o.nextPart.get(u);
    i || (i = kt(), o.nextPart.set(u, i)), o = i;
  }
  return o;
}, Ir = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Tr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, o = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const t = (l, u) => {
    o[l] = u, n++, n > e && (n = 0, s = o, o = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(l) {
      let u = o[l];
      if (u !== void 0)
        return u;
      if ((u = s[l]) !== void 0)
        return t(l, u), u;
    },
    set(l, u) {
      l in o ? o[l] = u : t(l, u);
    }
  };
}, rt = "!", gt = ":", Pr = [], pt = (e, n, o, s, t) => ({
  modifiers: e,
  hasImportantModifier: n,
  baseClassName: o,
  maybePostfixModifierPosition: s,
  isExternal: t
}), Or = (e) => {
  const {
    prefix: n,
    experimentalParseClassName: o
  } = e;
  let s = (t) => {
    const l = [];
    let u = 0, i = 0, r = 0, g;
    const d = t.length;
    for (let b = 0; b < d; b++) {
      const m = t[b];
      if (u === 0 && i === 0) {
        if (m === gt) {
          l.push(t.slice(r, b)), r = b + 1;
          continue;
        }
        if (m === "/") {
          g = b;
          continue;
        }
      }
      m === "[" ? u++ : m === "]" ? u-- : m === "(" ? i++ : m === ")" && i--;
    }
    const x = l.length === 0 ? t : t.slice(r);
    let y = x, z = !1;
    x.endsWith(rt) ? (y = x.slice(0, -1), z = !0) : x.startsWith(rt) && (y = x.slice(1), z = !0);
    const T = g && g > r ? g - r : void 0;
    return pt(l, z, y, T);
  };
  if (n) {
    const t = n + gt, l = s;
    s = (u) => u.startsWith(t) ? l(u.slice(t.length)) : pt(Pr, !1, u, void 0, !0);
  }
  if (o) {
    const t = s;
    s = (l) => o({
      className: l,
      parseClassName: t
    });
  }
  return s;
}, Fr = (e) => {
  const n = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((o, s) => {
    n.set(o, 1e6 + s);
  }), (o) => {
    const s = [];
    let t = [];
    for (let l = 0; l < o.length; l++) {
      const u = o[l], i = u[0] === "[", r = n.has(u);
      i || r ? (t.length > 0 && (t.sort(), s.push(...t), t = []), s.push(u)) : t.push(u);
    }
    return t.length > 0 && (t.sort(), s.push(...t)), s;
  };
}, Nr = (e) => ({
  cache: Tr(e.cacheSize),
  parseClassName: Or(e),
  sortModifiers: Fr(e),
  ...kr(e)
}), Rr = /\s+/, jr = (e, n) => {
  const {
    parseClassName: o,
    getClassGroupId: s,
    getConflictingClassGroupIds: t,
    sortModifiers: l
  } = n, u = [], i = e.trim().split(Rr);
  let r = "";
  for (let g = i.length - 1; g >= 0; g -= 1) {
    const d = i[g], {
      isExternal: x,
      modifiers: y,
      hasImportantModifier: z,
      baseClassName: T,
      maybePostfixModifierPosition: b
    } = o(d);
    if (x) {
      r = d + (r.length > 0 ? " " + r : r);
      continue;
    }
    let m = !!b, _ = s(m ? T.substring(0, b) : T);
    if (!_) {
      if (!m) {
        r = d + (r.length > 0 ? " " + r : r);
        continue;
      }
      if (_ = s(T), !_) {
        r = d + (r.length > 0 ? " " + r : r);
        continue;
      }
      m = !1;
    }
    const $ = y.length === 0 ? "" : y.length === 1 ? y[0] : l(y).join(":"), I = z ? $ + rt : $, L = I + _;
    if (u.indexOf(L) > -1)
      continue;
    u.push(L);
    const U = t(_, m);
    for (let W = 0; W < U.length; ++W) {
      const ee = U[W];
      u.push(I + ee);
    }
    r = d + (r.length > 0 ? " " + r : r);
  }
  return r;
}, Ar = (...e) => {
  let n = 0, o, s, t = "";
  for (; n < e.length; )
    (o = e[n++]) && (s = $t(o)) && (t && (t += " "), t += s);
  return t;
}, $t = (e) => {
  if (typeof e == "string")
    return e;
  let n, o = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (n = $t(e[s])) && (o && (o += " "), o += n);
  return o;
}, Lr = (e, ...n) => {
  let o, s, t, l;
  const u = (r) => {
    const g = n.reduce((d, x) => x(d), e());
    return o = Nr(g), s = o.cache.get, t = o.cache.set, l = i, i(r);
  }, i = (r) => {
    const g = s(r);
    if (g)
      return g;
    const d = jr(r, o);
    return t(r, d), d;
  };
  return l = u, (...r) => l(Ar(...r));
}, Er = [], K = (e) => {
  const n = (o) => o[e] || Er;
  return n.isThemeGetter = !0, n;
}, St = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Mt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Br = /^\d+\/\d+$/, Vr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Wr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Dr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Gr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ur = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Pe = (e) => Br.test(e), j = (e) => !!e && !Number.isNaN(Number(e)), ye = (e) => !!e && Number.isInteger(Number(e)), et = (e) => e.endsWith("%") && j(e.slice(0, -1)), de = (e) => Vr.test(e), Hr = () => !0, Kr = (e) => Wr.test(e) && !Dr.test(e), zt = () => !1, Xr = (e) => Gr.test(e), Yr = (e) => Ur.test(e), Qr = (e) => !S(e) && !M(e), Jr = (e) => Ne(e, Tt, zt), S = (e) => St.test(e), _e = (e) => Ne(e, Pt, Kr), tt = (e) => Ne(e, oo, j), vt = (e) => Ne(e, qt, zt), Zr = (e) => Ne(e, It, Yr), Ue = (e) => Ne(e, Ot, Xr), M = (e) => Mt.test(e), Be = (e) => Re(e, Pt), eo = (e) => Re(e, no), bt = (e) => Re(e, qt), to = (e) => Re(e, Tt), ro = (e) => Re(e, It), He = (e) => Re(e, Ot, !0), Ne = (e, n, o) => {
  const s = St.exec(e);
  return s ? s[1] ? n(s[1]) : o(s[2]) : !1;
}, Re = (e, n, o = !1) => {
  const s = Mt.exec(e);
  return s ? s[1] ? n(s[1]) : o : !1;
}, qt = (e) => e === "position" || e === "percentage", It = (e) => e === "image" || e === "url", Tt = (e) => e === "length" || e === "size" || e === "bg-size", Pt = (e) => e === "length", oo = (e) => e === "number", no = (e) => e === "family-name", Ot = (e) => e === "shadow", lo = () => {
  const e = K("color"), n = K("font"), o = K("text"), s = K("font-weight"), t = K("tracking"), l = K("leading"), u = K("breakpoint"), i = K("container"), r = K("spacing"), g = K("radius"), d = K("shadow"), x = K("inset-shadow"), y = K("text-shadow"), z = K("drop-shadow"), T = K("blur"), b = K("perspective"), m = K("aspect"), _ = K("ease"), $ = K("animate"), I = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "left-top",
    "top-right",
    "right-top",
    "bottom-right",
    "right-bottom",
    "bottom-left",
    "left-bottom"
  ], U = () => [...L(), M, S], W = () => ["auto", "hidden", "clip", "visible", "scroll"], ee = () => ["auto", "contain", "none"], F = () => [M, S, r], re = () => [Pe, "full", "auto", ...F()], $e = () => [ye, "none", "subgrid", M, S], pe = () => ["auto", {
    span: ["full", ye, M, S]
  }, ye, M, S], ve = () => [ye, "auto", M, S], Ae = () => ["auto", "min", "max", "fr", M, S], ue = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ce = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], oe = () => ["auto", ...F()], ie = () => [Pe, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...F()], P = () => [e, M, S], Se = () => [...L(), bt, vt, {
    position: [M, S]
  }], Ve = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], We = () => ["auto", "cover", "contain", to, Jr, {
    size: [M, S]
  }], Le = () => [et, Be, _e], Q = () => [
    "",
    "none",
    "full",
    g,
    M,
    S
  ], J = () => ["", j, Be, _e], Me = () => ["solid", "dashed", "dotted", "double"], ze = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], G = () => [j, et, bt, vt], Ee = () => [
    "",
    "none",
    T,
    M,
    S
  ], qe = () => ["none", j, M, S], Ie = () => ["none", j, M, S], ke = () => [j, M, S], Ce = () => [Pe, "full", ...F()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [de],
      breakpoint: [de],
      color: [Hr],
      container: [de],
      "drop-shadow": [de],
      ease: ["in", "out", "in-out"],
      font: [Qr],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [de],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [de],
      shadow: [de],
      spacing: ["px", j],
      text: [de],
      "text-shadow": [de],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", Pe, S, M, m]
      }],
      container: ["container"],
      columns: [{
        columns: [j, S, M, i]
      }],
      "break-after": [{
        "break-after": I()
      }],
      "break-before": [{
        "break-before": I()
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
      sr: ["sr-only", "not-sr-only"],
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
        object: U()
      }],
      overflow: [{
        overflow: W()
      }],
      "overflow-x": [{
        "overflow-x": W()
      }],
      "overflow-y": [{
        "overflow-y": W()
      }],
      overscroll: [{
        overscroll: ee()
      }],
      "overscroll-x": [{
        "overscroll-x": ee()
      }],
      "overscroll-y": [{
        "overscroll-y": ee()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: re()
      }],
      "inset-x": [{
        "inset-x": re()
      }],
      "inset-y": [{
        "inset-y": re()
      }],
      start: [{
        start: re()
      }],
      end: [{
        end: re()
      }],
      top: [{
        top: re()
      }],
      right: [{
        right: re()
      }],
      bottom: [{
        bottom: re()
      }],
      left: [{
        left: re()
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: [ye, "auto", M, S]
      }],
      basis: [{
        basis: [Pe, "full", "auto", i, ...F()]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      flex: [{
        flex: [j, Pe, "auto", "initial", "none", S]
      }],
      grow: [{
        grow: ["", j, M, S]
      }],
      shrink: [{
        shrink: ["", j, M, S]
      }],
      order: [{
        order: [ye, "first", "last", "none", M, S]
      }],
      "grid-cols": [{
        "grid-cols": $e()
      }],
      "col-start-end": [{
        col: pe()
      }],
      "col-start": [{
        "col-start": ve()
      }],
      "col-end": [{
        "col-end": ve()
      }],
      "grid-rows": [{
        "grid-rows": $e()
      }],
      "row-start-end": [{
        row: pe()
      }],
      "row-start": [{
        "row-start": ve()
      }],
      "row-end": [{
        "row-end": ve()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": Ae()
      }],
      "auto-rows": [{
        "auto-rows": Ae()
      }],
      gap: [{
        gap: F()
      }],
      "gap-x": [{
        "gap-x": F()
      }],
      "gap-y": [{
        "gap-y": F()
      }],
      "justify-content": [{
        justify: [...ue(), "normal"]
      }],
      "justify-items": [{
        "justify-items": [...ce(), "normal"]
      }],
      "justify-self": [{
        "justify-self": ["auto", ...ce()]
      }],
      "align-content": [{
        content: ["normal", ...ue()]
      }],
      "align-items": [{
        items: [...ce(), {
          baseline: ["", "last"]
        }]
      }],
      "align-self": [{
        self: ["auto", ...ce(), {
          baseline: ["", "last"]
        }]
      }],
      "place-content": [{
        "place-content": ue()
      }],
      "place-items": [{
        "place-items": [...ce(), "baseline"]
      }],
      "place-self": [{
        "place-self": ["auto", ...ce()]
      }],
      p: [{
        p: F()
      }],
      px: [{
        px: F()
      }],
      py: [{
        py: F()
      }],
      ps: [{
        ps: F()
      }],
      pe: [{
        pe: F()
      }],
      pt: [{
        pt: F()
      }],
      pr: [{
        pr: F()
      }],
      pb: [{
        pb: F()
      }],
      pl: [{
        pl: F()
      }],
      m: [{
        m: oe()
      }],
      mx: [{
        mx: oe()
      }],
      my: [{
        my: oe()
      }],
      ms: [{
        ms: oe()
      }],
      me: [{
        me: oe()
      }],
      mt: [{
        mt: oe()
      }],
      mr: [{
        mr: oe()
      }],
      mb: [{
        mb: oe()
      }],
      ml: [{
        ml: oe()
      }],
      "space-x": [{
        "space-x": F()
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": F()
      }],
      "space-y-reverse": ["space-y-reverse"],
      size: [{
        size: ie()
      }],
      w: [{
        w: [i, "screen", ...ie()]
      }],
      "min-w": [{
        "min-w": [
          i,
          "screen",
          "none",
          ...ie()
        ]
      }],
      "max-w": [{
        "max-w": [
          i,
          "screen",
          "none",
          "prose",
          {
            screen: [u]
          },
          ...ie()
        ]
      }],
      h: [{
        h: ["screen", "lh", ...ie()]
      }],
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...ie()]
      }],
      "max-h": [{
        "max-h": ["screen", "lh", ...ie()]
      }],
      "font-size": [{
        text: ["base", o, Be, _e]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: [s, M, tt]
      }],
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", et, S]
      }],
      "font-family": [{
        font: [eo, S, n]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: [t, M, S]
      }],
      "line-clamp": [{
        "line-clamp": [j, "none", M, tt]
      }],
      leading: [{
        leading: [
          l,
          ...F()
        ]
      }],
      "list-image": [{
        "list-image": ["none", M, S]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "list-style-type": [{
        list: ["disc", "decimal", "none", M, S]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "placeholder-color": [{
        placeholder: P()
      }],
      "text-color": [{
        text: P()
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...Me(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: [j, "from-font", "auto", M, _e]
      }],
      "text-decoration-color": [{
        decoration: P()
      }],
      "underline-offset": [{
        "underline-offset": [j, "auto", M, S]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: F()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", M, S]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      content: [{
        content: ["none", M, S]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: Se()
      }],
      "bg-repeat": [{
        bg: Ve()
      }],
      "bg-size": [{
        bg: We()
      }],
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ye, M, S],
          radial: ["", M, S],
          conic: [ye, M, S]
        }, ro, Zr]
      }],
      "bg-color": [{
        bg: P()
      }],
      "gradient-from-pos": [{
        from: Le()
      }],
      "gradient-via-pos": [{
        via: Le()
      }],
      "gradient-to-pos": [{
        to: Le()
      }],
      "gradient-from": [{
        from: P()
      }],
      "gradient-via": [{
        via: P()
      }],
      "gradient-to": [{
        to: P()
      }],
      rounded: [{
        rounded: Q()
      }],
      "rounded-s": [{
        "rounded-s": Q()
      }],
      "rounded-e": [{
        "rounded-e": Q()
      }],
      "rounded-t": [{
        "rounded-t": Q()
      }],
      "rounded-r": [{
        "rounded-r": Q()
      }],
      "rounded-b": [{
        "rounded-b": Q()
      }],
      "rounded-l": [{
        "rounded-l": Q()
      }],
      "rounded-ss": [{
        "rounded-ss": Q()
      }],
      "rounded-se": [{
        "rounded-se": Q()
      }],
      "rounded-ee": [{
        "rounded-ee": Q()
      }],
      "rounded-es": [{
        "rounded-es": Q()
      }],
      "rounded-tl": [{
        "rounded-tl": Q()
      }],
      "rounded-tr": [{
        "rounded-tr": Q()
      }],
      "rounded-br": [{
        "rounded-br": Q()
      }],
      "rounded-bl": [{
        "rounded-bl": Q()
      }],
      "border-w": [{
        border: J()
      }],
      "border-w-x": [{
        "border-x": J()
      }],
      "border-w-y": [{
        "border-y": J()
      }],
      "border-w-s": [{
        "border-s": J()
      }],
      "border-w-e": [{
        "border-e": J()
      }],
      "border-w-t": [{
        "border-t": J()
      }],
      "border-w-r": [{
        "border-r": J()
      }],
      "border-w-b": [{
        "border-b": J()
      }],
      "border-w-l": [{
        "border-l": J()
      }],
      "divide-x": [{
        "divide-x": J()
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": J()
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "border-style": [{
        border: [...Me(), "hidden", "none"]
      }],
      "divide-style": [{
        divide: [...Me(), "hidden", "none"]
      }],
      "border-color": [{
        border: P()
      }],
      "border-color-x": [{
        "border-x": P()
      }],
      "border-color-y": [{
        "border-y": P()
      }],
      "border-color-s": [{
        "border-s": P()
      }],
      "border-color-e": [{
        "border-e": P()
      }],
      "border-color-t": [{
        "border-t": P()
      }],
      "border-color-r": [{
        "border-r": P()
      }],
      "border-color-b": [{
        "border-b": P()
      }],
      "border-color-l": [{
        "border-l": P()
      }],
      "divide-color": [{
        divide: P()
      }],
      "outline-style": [{
        outline: [...Me(), "none", "hidden"]
      }],
      "outline-offset": [{
        "outline-offset": [j, M, S]
      }],
      "outline-w": [{
        outline: ["", j, Be, _e]
      }],
      "outline-color": [{
        outline: P()
      }],
      shadow: [{
        shadow: [
          "",
          "none",
          d,
          He,
          Ue
        ]
      }],
      "shadow-color": [{
        shadow: P()
      }],
      "inset-shadow": [{
        "inset-shadow": ["none", x, He, Ue]
      }],
      "inset-shadow-color": [{
        "inset-shadow": P()
      }],
      "ring-w": [{
        ring: J()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: P()
      }],
      "ring-offset-w": [{
        "ring-offset": [j, _e]
      }],
      "ring-offset-color": [{
        "ring-offset": P()
      }],
      "inset-ring-w": [{
        "inset-ring": J()
      }],
      "inset-ring-color": [{
        "inset-ring": P()
      }],
      "text-shadow": [{
        "text-shadow": ["none", y, He, Ue]
      }],
      "text-shadow-color": [{
        "text-shadow": P()
      }],
      opacity: [{
        opacity: [j, M, S]
      }],
      "mix-blend": [{
        "mix-blend": [...ze(), "plus-darker", "plus-lighter"]
      }],
      "bg-blend": [{
        "bg-blend": ze()
      }],
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      "mask-image-linear-pos": [{
        "mask-linear": [j]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": G()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": G()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": G()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": G()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": G()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": G()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": G()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": G()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": G()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": G()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": G()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": G()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": G()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": G()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [M, S]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": G()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": G()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": L()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [j]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": G()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": G()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": P()
      }],
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      "mask-position": [{
        mask: Se()
      }],
      "mask-repeat": [{
        mask: Ve()
      }],
      "mask-size": [{
        mask: We()
      }],
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      "mask-image": [{
        mask: ["none", M, S]
      }],
      filter: [{
        filter: [
          "",
          "none",
          M,
          S
        ]
      }],
      blur: [{
        blur: Ee()
      }],
      brightness: [{
        brightness: [j, M, S]
      }],
      contrast: [{
        contrast: [j, M, S]
      }],
      "drop-shadow": [{
        "drop-shadow": [
          "",
          "none",
          z,
          He,
          Ue
        ]
      }],
      "drop-shadow-color": [{
        "drop-shadow": P()
      }],
      grayscale: [{
        grayscale: ["", j, M, S]
      }],
      "hue-rotate": [{
        "hue-rotate": [j, M, S]
      }],
      invert: [{
        invert: ["", j, M, S]
      }],
      saturate: [{
        saturate: [j, M, S]
      }],
      sepia: [{
        sepia: ["", j, M, S]
      }],
      "backdrop-filter": [{
        "backdrop-filter": [
          "",
          "none",
          M,
          S
        ]
      }],
      "backdrop-blur": [{
        "backdrop-blur": Ee()
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [j, M, S]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [j, M, S]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", j, M, S]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [j, M, S]
      }],
      "backdrop-invert": [{
        "backdrop-invert": ["", j, M, S]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [j, M, S]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [j, M, S]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": ["", j, M, S]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": F()
      }],
      "border-spacing-x": [{
        "border-spacing-x": F()
      }],
      "border-spacing-y": [{
        "border-spacing-y": F()
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", M, S]
      }],
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      duration: [{
        duration: [j, "initial", M, S]
      }],
      ease: [{
        ease: ["linear", "initial", _, M, S]
      }],
      delay: [{
        delay: [j, M, S]
      }],
      animate: [{
        animate: ["none", $, M, S]
      }],
      backface: [{
        backface: ["hidden", "visible"]
      }],
      perspective: [{
        perspective: [b, M, S]
      }],
      "perspective-origin": [{
        "perspective-origin": U()
      }],
      rotate: [{
        rotate: qe()
      }],
      "rotate-x": [{
        "rotate-x": qe()
      }],
      "rotate-y": [{
        "rotate-y": qe()
      }],
      "rotate-z": [{
        "rotate-z": qe()
      }],
      scale: [{
        scale: Ie()
      }],
      "scale-x": [{
        "scale-x": Ie()
      }],
      "scale-y": [{
        "scale-y": Ie()
      }],
      "scale-z": [{
        "scale-z": Ie()
      }],
      "scale-3d": ["scale-3d"],
      skew: [{
        skew: ke()
      }],
      "skew-x": [{
        "skew-x": ke()
      }],
      "skew-y": [{
        "skew-y": ke()
      }],
      transform: [{
        transform: [M, S, "", "none", "gpu", "cpu"]
      }],
      "transform-origin": [{
        origin: U()
      }],
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      translate: [{
        translate: Ce()
      }],
      "translate-x": [{
        "translate-x": Ce()
      }],
      "translate-y": [{
        "translate-y": Ce()
      }],
      "translate-z": [{
        "translate-z": Ce()
      }],
      "translate-none": ["translate-none"],
      accent: [{
        accent: P()
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      "caret-color": [{
        caret: P()
      }],
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", M, S]
      }],
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scroll-m": [{
        "scroll-m": F()
      }],
      "scroll-mx": [{
        "scroll-mx": F()
      }],
      "scroll-my": [{
        "scroll-my": F()
      }],
      "scroll-ms": [{
        "scroll-ms": F()
      }],
      "scroll-me": [{
        "scroll-me": F()
      }],
      "scroll-mt": [{
        "scroll-mt": F()
      }],
      "scroll-mr": [{
        "scroll-mr": F()
      }],
      "scroll-mb": [{
        "scroll-mb": F()
      }],
      "scroll-ml": [{
        "scroll-ml": F()
      }],
      "scroll-p": [{
        "scroll-p": F()
      }],
      "scroll-px": [{
        "scroll-px": F()
      }],
      "scroll-py": [{
        "scroll-py": F()
      }],
      "scroll-ps": [{
        "scroll-ps": F()
      }],
      "scroll-pe": [{
        "scroll-pe": F()
      }],
      "scroll-pt": [{
        "scroll-pt": F()
      }],
      "scroll-pr": [{
        "scroll-pr": F()
      }],
      "scroll-pb": [{
        "scroll-pb": F()
      }],
      "scroll-pl": [{
        "scroll-pl": F()
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
        "will-change": ["auto", "scroll", "contents", "transform", M, S]
      }],
      fill: [{
        fill: ["none", ...P()]
      }],
      "stroke-w": [{
        stroke: [j, Be, _e, tt]
      }],
      stroke: [{
        stroke: ["none", ...P()]
      }],
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
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
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
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, ne = /* @__PURE__ */ Lr(lo);
function V(e, n, o, s) {
  let t = n ? { ...n } : {}, l = null, u = o ? { ...o } : {}, i = null, r = s ? { ...s } : {}, g = null;
  for (const d of e)
    l === null && d in t && (t = t[d], typeof t == "string" && (l = t)), i === null && d in u && (u = u[d], typeof u == "string" && (i = u)), g === null && d in r && (r = r[d], typeof r == "string" && (g = r));
  return ne(l, i, g);
}
const so = { class: "relative" }, ao = ["dusk", "disabled"], io = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, Qe = {
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
  setup(e, { expose: n, emit: o }) {
    const s = o, t = e, l = N(!1), u = N(null);
    function i() {
      l.value = !l.value;
    }
    function r() {
      l.value = !1;
    }
    he(l, () => {
      u.value.update(), l.value || s("closed"), l.value && s("opened");
    });
    const g = N(null), d = N(null);
    ge(() => {
      u.value = nr(g.value, d.value, {
        placement: t.placement,
        modifiers: [sr, lr]
      });
    }), n({ hide: r });
    const x = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, y = ae("themeVariables"), z = (T) => {
      var m, _;
      let b = "";
      return T === "button" && t.disabled && (b = "cursor-not-allowed"), ne(
        b,
        V([T, "base"], x, (m = y == null ? void 0 : y.inertia_table) == null ? void 0 : m.button_with_dropdown, t.ui),
        V([T, "color", t.color], x, (_ = y == null ? void 0 : y.inertia_table) == null ? void 0 : _.button_with_dropdown, t.ui)
      );
    };
    return (T, b) => (f(), E(br, { do: r }, {
      default: H(() => [
        a("div", so, [
          a("button", {
            ref_key: "button",
            ref: g,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: O(z("button")),
            "aria-haspopup": "true",
            onClick: X(i, ["prevent"])
          }, [
            B(T.$slots, "button")
          ], 10, ao),
          Y(a("div", {
            ref_key: "tooltip",
            ref: d,
            class: "absolute z-50"
          }, [
            a("div", io, [
              B(T.$slots, "default")
            ])
          ], 512), [
            [xe, l.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const je = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [s, t] of n)
    o[s] = t;
  return o;
}, uo = {
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
    const n = e, o = (s) => {
      n.onResize(s, n.columnKey);
    };
    return (s, t) => (f(), v("div", {
      class: O(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: o
    }, [...t[0] || (t[0] = [
      Yt('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ])], 34));
  }
}, co = /* @__PURE__ */ je(uo, [["__scopeId", "data-v-672a9339"]]), fo = { class: "w-full flex gap-2 justify-between items-center" }, mo = { class: "relative inline-flex items-center cursor-pointer" }, ho = ["checked"], Ft = {
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
    const n = e, o = {
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
    }, s = ae("themeVariables"), t = (l) => {
      var i, r, g, d;
      let u = n.color;
      return l === "toggle" && n.filter.value === null && (u = "disabled"), ne(
        V([l, "base"], o, (r = (i = s == null ? void 0 : s.inertia_table) == null ? void 0 : i.table_filter) == null ? void 0 : r.toggle_filter, n.ui),
        V([l, "color", u], o, (d = (g = s == null ? void 0 : s.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : d.toggle_filter, n.ui)
      );
    };
    return (l, u) => (f(), v("div", fo, [
      a("label", mo, [
        a("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: u[0] || (u[0] = (i) => e.onFilterChange(e.filter.key, i.target.checked ? "1" : "0"))
        }, null, 40, ho),
        a("div", {
          class: O(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", t("toggle")])
        }, null, 2)
      ]),
      a("button", {
        class: O(t("reset_button")),
        onClick: u[1] || (u[1] = X((i) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, [...u[2] || (u[2] = [
        a("span", { class: "sr-only" }, "Remove search", -1),
        a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          a("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])], 2)
    ]));
  }
}, go = {
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
      const n = this.getTheme("button"), o = /h-(\d+)/, s = n.match(o), t = 4;
      let l = null;
      return s && 1 in s ? l = s[1] : l = t, e ? `margin-top: ${(l - t + 12) * 0.25}rem` : `margin-top: -${((l - t) / 2 + 9) * 0.25}rem`;
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
      let s = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), t = Number(Math.round(s / this.step) * this.step).toFixed(2);
      t >= this.min && t <= this.max && (this.moveMin && t !== this.currentMinValue && t <= this.currentMaxValue && (this.internalValue = [t, this.currentMaxValue]), this.moveMax && t !== this.currentMaxValue && t >= this.currentMinValue && (this.internalValue = [this.currentMinValue, t])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var n, o, s, t, l, u;
      return ne(
        V([e, "base"], this.fallbackTheme, (s = (o = (n = this.themeVariables) == null ? void 0 : n.inertia_table) == null ? void 0 : o.table_filter) == null ? void 0 : s.number_range_filter, this.ui),
        V([e, "color", this.color], this.fallbackTheme, (u = (l = (t = this.themeVariables) == null ? void 0 : t.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : u.number_range_filter, this.ui)
      );
    }
  }
}, po = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, vo = { class: "py-1 relative min-w-full" }, bo = { class: "z-40" }, yo = {
  ref: "popover_min",
  class: "relative shadow-md"
}, xo = { key: 0 }, wo = { key: 1 }, ko = { class: "z-40" }, Co = {
  ref: "popover_max",
  class: "relative shadow-md"
}, _o = { key: 0 }, $o = { key: 1 }, So = { draggable: "true" }, Mo = { key: 0 }, zo = { key: 1 }, qo = { key: 0 }, Io = { key: 1 };
function To(e, n, o, s, t, l) {
  var u, i, r, g;
  return f(), v("div", po, [
    a("div", vo, [
      a("div", {
        class: O(l.getTheme("main_bar"))
      }, [
        a("div", {
          class: O(["absolute", l.getTheme("selected_bar")]),
          style: fe(`width: ${l.rangeWidth}% !important; left: ${l.currentMinValueInPercent}% !important;`)
        }, null, 6),
        a("div", {
          class: O([l.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: fe(`left: ${l.currentMinValueInPercent}%;`),
          onMousedown: n[0] || (n[0] = (d) => l.handleMouseDown(d, !0))
        }, [
          a("div", bo, [
            a("div", yo, [
              a("div", {
                class: O(l.getTheme("popover")),
                style: fe(l.getMarginTop(t.hasOverlap && l.displayFirstDown))
              }, [
                o.prefix ? (f(), v("span", xo, k(o.prefix), 1)) : C("", !0),
                me(" " + k((u = l.currentMinValue) != null ? u : 0) + " ", 1),
                o.suffix ? (f(), v("span", wo, k(o.suffix), 1)) : C("", !0)
              ], 6),
              (f(), v("svg", {
                class: O(["absolute w-full h-2 left-0", [t.hasOverlap && l.displayFirstDown ? "bottom-6 rotate-180" : "top-100", l.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, [...n[2] || (n[2] = [
                a("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ])], 2))
            ], 512)
          ])
        ], 38),
        a("div", {
          class: O([l.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: fe(`left: ${l.currentMaxValueInPercent}%;`),
          onMousedown: n[1] || (n[1] = (d) => l.handleMouseDown(d, !1))
        }, [
          a("div", ko, [
            a("div", Co, [
              a("div", {
                class: O(l.getTheme("popover")),
                style: fe(l.getMarginTop(t.hasOverlap && !l.displayFirstDown))
              }, [
                o.prefix ? (f(), v("span", _o, k(o.prefix), 1)) : C("", !0),
                me(" " + k((i = l.currentMaxValue) != null ? i : 0) + " ", 1),
                o.suffix ? (f(), v("span", $o, k(o.suffix), 1)) : C("", !0)
              ], 6),
              a("div", So, [
                (f(), v("svg", {
                  class: O(["absolute w-full h-2 left-0 top-100", [t.hasOverlap && !l.displayFirstDown ? "bottom-6 rotate-180" : "top-100", l.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, [...n[3] || (n[3] = [
                  a("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ])], 2))
              ])
            ], 512)
          ])
        ], 38),
        a("div", {
          class: O(["absolute -ml-1 bottom-0 left-0 -mb-6", l.getTheme("text")])
        }, [
          o.prefix ? (f(), v("span", Mo, k(o.prefix), 1)) : C("", !0),
          me(" " + k((r = o.min) != null ? r : 0) + " ", 1),
          o.suffix ? (f(), v("span", zo, k(o.suffix), 1)) : C("", !0)
        ], 2),
        a("div", {
          class: O(["absolute -mr-1 bottom-0 right-0 -mb-6", l.getTheme("text")])
        }, [
          o.prefix ? (f(), v("span", qo, k(o.prefix), 1)) : C("", !0),
          me(" " + k((g = o.max) != null ? g : 0) + " ", 1),
          o.suffix ? (f(), v("span", Io, k(o.suffix), 1)) : C("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const Nt = /* @__PURE__ */ je(go, [["render", To]]), nt = {
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
function we() {
  return nt.translations;
}
function Bs(e, n) {
  nt.translations[e] = n;
}
function Vs(e) {
  nt.translations = e;
}
const Po = { class: "space-y-4" }, Oo = { class: "block text-sm font-medium text-gray-700 mb-2" }, Fo = { value: "" }, No = { value: "exact" }, Ro = { value: "less_than" }, jo = { value: "greater_than" }, Ao = { value: "less_than_or_equal" }, Lo = { value: "greater_than_or_equal" }, Eo = { value: "between" }, Bo = {
  key: 0,
  class: "space-y-3"
}, Vo = { key: 0 }, Wo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Do = { class: "flex items-center" }, Go = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, Uo = ["step"], Ho = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Ko = {
  key: 1,
  class: "space-y-3"
}, Xo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Yo = { class: "flex items-center" }, Qo = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, Jo = ["step"], Zo = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, en = { class: "block text-sm font-medium text-gray-700 mb-1" }, tn = { class: "flex items-center" }, rn = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, on = ["step"], nn = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, ln = {
  key: 1,
  class: "flex justify-end"
}, sn = { class: "sr-only" }, Rt = {
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
    const n = e, o = we(), s = N(""), t = N(""), l = N(""), u = N(""), i = A(() => s.value !== "" && (s.value !== "between" && t.value !== "" && t.value !== null || s.value === "between" && l.value !== "" && l.value !== null && u.value !== "" && u.value !== null));
    function r() {
      switch (s.value) {
        case "exact":
          return o.exact_number;
        case "less_than":
          return o.less_than;
        case "greater_than":
          return o.greater_than;
        case "less_than_or_equal":
          return o.less_than_or_equal;
        case "greater_than_or_equal":
          return o.greater_than_or_equal;
        default:
          return "Number";
      }
    }
    function g() {
      t.value = "", l.value = "", u.value = "", s.value === "" ? x() : d();
    }
    function d() {
      if (s.value === "")
        return;
      let b = null;
      switch (s.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          t.value !== "" && t.value !== null && (b = {
            type: s.value,
            number: t.value
          });
          break;
        case "between":
          l.value !== "" && l.value !== null && u.value !== "" && u.value !== null && (b = {
            type: s.value,
            start_number: l.value,
            end_number: u.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, b);
    }
    function x() {
      s.value = "", t.value = "", l.value = "", u.value = "", n.onFilterChange(n.filter.key, null);
    }
    ge(() => {
      if (n.filter.value) {
        const b = n.filter.value;
        b.type && (s.value = b.type, b.type === "between" ? (l.value = b.start_number || "", u.value = b.end_number || "") : t.value = b.number || "");
      }
    }), he(() => n.filter.value, (b) => {
      b ? b.type && (s.value = b.type, b.type === "between" ? (l.value = b.start_number || "", u.value = b.end_number || "") : t.value = b.number || "") : x();
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
    }, z = ae("themeVariables"), T = (b) => {
      var m, _, $, I;
      return ne(
        V([b, "base"], y, (_ = (m = z == null ? void 0 : z.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : _.number_filter, n.ui),
        V([b, "color", n.color], y, (I = ($ = z == null ? void 0 : z.inertia_table) == null ? void 0 : $.table_filter) == null ? void 0 : I.number_filter, n.ui)
      );
    };
    return (b, m) => (f(), v("div", Po, [
      a("div", null, [
        a("label", Oo, k(R(o).filter_type), 1),
        Y(a("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (_) => s.value = _),
          class: O(T("select")),
          onChange: g
        }, [
          a("option", Fo, k(R(o).no_filter), 1),
          a("option", No, k(R(o).exact_number), 1),
          a("option", Ro, k(R(o).less_than), 1),
          a("option", jo, k(R(o).greater_than), 1),
          a("option", Ao, k(R(o).less_than_or_equal), 1),
          a("option", Lo, k(R(o).greater_than_or_equal), 1),
          a("option", Eo, k(R(o).number_range), 1)
        ], 34), [
          [xt, s.value]
        ])
      ]),
      s.value && s.value !== "" ? (f(), v("div", Bo, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(s.value) ? (f(), v("div", Vo, [
          a("label", Wo, k(r()), 1),
          a("div", Do, [
            e.filter.prefix ? (f(), v("span", Go, k(e.filter.prefix), 1)) : C("", !0),
            Y(a("input", {
              type: "number",
              "onUpdate:modelValue": m[1] || (m[1] = (_) => t.value = _),
              step: e.filter.step || 1,
              class: O(T("input")),
              onInput: d,
              placeholder: "0"
            }, null, 42, Uo), [
              [
                Fe,
                t.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (f(), v("span", Ho, k(e.filter.suffix), 1)) : C("", !0)
          ])
        ])) : C("", !0),
        s.value === "between" ? (f(), v("div", Ko, [
          a("div", null, [
            a("label", Xo, k(R(o).start_number), 1),
            a("div", Yo, [
              e.filter.prefix ? (f(), v("span", Qo, k(e.filter.prefix), 1)) : C("", !0),
              Y(a("input", {
                type: "number",
                "onUpdate:modelValue": m[2] || (m[2] = (_) => l.value = _),
                step: e.filter.step || 1,
                class: O(T("input")),
                onInput: d,
                placeholder: "0"
              }, null, 42, Jo), [
                [
                  Fe,
                  l.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (f(), v("span", Zo, k(e.filter.suffix), 1)) : C("", !0)
            ])
          ]),
          a("div", null, [
            a("label", en, k(R(o).end_number), 1),
            a("div", tn, [
              e.filter.prefix ? (f(), v("span", rn, k(e.filter.prefix), 1)) : C("", !0),
              Y(a("input", {
                type: "number",
                "onUpdate:modelValue": m[3] || (m[3] = (_) => u.value = _),
                step: e.filter.step || 1,
                class: O(T("input")),
                onInput: d,
                placeholder: "0"
              }, null, 42, on), [
                [
                  Fe,
                  u.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (f(), v("span", nn, k(e.filter.suffix), 1)) : C("", !0)
            ])
          ])
        ])) : C("", !0)
      ])) : C("", !0),
      i.value ? (f(), v("div", ln, [
        a("button", {
          type: "button",
          class: O(T("reset_button")),
          onClick: x
        }, [
          a("span", sn, k(R(o).reset_filter), 1),
          m[4] || (m[4] = a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            a("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ], 2)
      ])) : C("", !0)
    ]));
  }
}, an = { class: "space-y-2" }, un = { class: "block text-sm font-medium text-gray-700 mb-2" }, cn = { value: "" }, dn = { value: "exact" }, fn = { value: "before" }, mn = { value: "after" }, hn = { value: "between" }, gn = {
  key: 0,
  class: "space-y-3"
}, pn = { key: 0 }, vn = { class: "block text-sm font-medium text-gray-700 mb-1" }, bn = {
  key: 1,
  class: "space-y-3"
}, yn = { class: "block text-sm font-medium text-gray-700 mb-1" }, xn = { class: "block text-sm font-medium text-gray-700 mb-1" }, wn = {
  key: 1,
  class: "flex justify-end"
}, kn = { class: "sr-only" }, jt = {
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
    const n = e, o = we(), s = N(""), t = N(""), l = N(""), u = N(""), i = A(() => s.value !== "" && (s.value !== "between" && t.value || s.value === "between" && l.value && u.value));
    function r() {
      switch (s.value) {
        case "exact":
          return o.exact_date;
        case "before":
          return o.before_date;
        case "after":
          return o.after_date;
        default:
          return "Date";
      }
    }
    function g() {
      t.value = "", l.value = "", u.value = "", s.value === "" ? x() : d();
    }
    function d() {
      if (s.value === "")
        return;
      let b = null;
      switch (s.value) {
        case "exact":
        case "before":
        case "after":
          t.value && (b = {
            type: s.value,
            date: t.value
          });
          break;
        case "between":
          l.value && u.value && (b = {
            type: s.value,
            start_date: l.value,
            end_date: u.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, b);
    }
    function x() {
      s.value = "", t.value = "", l.value = "", u.value = "", n.onFilterChange(n.filter.key, null);
    }
    ge(() => {
      if (n.filter.value) {
        const b = n.filter.value;
        b.type && (s.value = b.type, b.type === "between" ? (l.value = b.start_date || "", u.value = b.end_date || "") : t.value = b.date || "");
      }
    }), he(() => n.filter.value, (b) => {
      b ? b.type && (s.value = b.type, b.type === "between" ? (l.value = b.start_date || "", u.value = b.end_date || "") : t.value = b.date || "") : x();
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
    }, z = ae("themeVariables"), T = (b) => {
      var m, _, $, I;
      return ne(
        V([b, "base"], y, (_ = (m = z == null ? void 0 : z.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : _.date_filter, n.ui),
        V([b, "color", n.color], y, (I = ($ = z == null ? void 0 : z.inertia_table) == null ? void 0 : $.table_filter) == null ? void 0 : I.date_filter, n.ui)
      );
    };
    return (b, m) => (f(), v("div", an, [
      a("div", null, [
        a("label", un, k(R(o).filter_type), 1),
        Y(a("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (_) => s.value = _),
          class: O(T("select")),
          onChange: g
        }, [
          a("option", cn, k(R(o).no_filter), 1),
          a("option", dn, k(R(o).exact_date), 1),
          a("option", fn, k(R(o).before_date), 1),
          a("option", mn, k(R(o).after_date), 1),
          a("option", hn, k(R(o).date_range), 1)
        ], 34), [
          [xt, s.value]
        ])
      ]),
      s.value && s.value !== "" ? (f(), v("div", gn, [
        ["exact", "before", "after"].includes(s.value) ? (f(), v("div", pn, [
          a("label", vn, k(r()), 1),
          Y(a("input", {
            type: "date",
            "onUpdate:modelValue": m[1] || (m[1] = (_) => t.value = _),
            class: O(T("input")),
            onChange: d
          }, null, 34), [
            [Fe, t.value]
          ])
        ])) : C("", !0),
        s.value === "between" ? (f(), v("div", bn, [
          a("div", null, [
            a("label", yn, k(R(o).start_date), 1),
            Y(a("input", {
              type: "date",
              "onUpdate:modelValue": m[2] || (m[2] = (_) => l.value = _),
              class: O(T("input")),
              onChange: d
            }, null, 34), [
              [Fe, l.value]
            ])
          ]),
          a("div", null, [
            a("label", xn, k(R(o).end_date), 1),
            Y(a("input", {
              type: "date",
              "onUpdate:modelValue": m[3] || (m[3] = (_) => u.value = _),
              class: O(T("input")),
              onChange: d
            }, null, 34), [
              [Fe, u.value]
            ])
          ])
        ])) : C("", !0)
      ])) : C("", !0),
      i.value ? (f(), v("div", wn, [
        a("button", {
          type: "button",
          class: O(T("reset_button")),
          onClick: x
        }, [
          a("span", kn, k(R(o).reset_filter), 1),
          m[4] || (m[4] = a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            a("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ], 2)
      ])) : C("", !0)
    ]));
  }
};
function At(e) {
  let n = N(null), o = N(null);
  return ge(() => {
    Qt((s) => {
      if (!o.value || !n.value)
        return;
      let t = o.value.el || o.value, l = n.value.el || n.value;
      if (!(l instanceof HTMLElement) || !(t instanceof HTMLElement))
        return;
      let { destroy: u } = ar(l, t, e);
      s(u);
    });
  }), [n, o];
}
const Cn = { class: "relative inline-block" }, _n = ["dusk"], $n = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Sn = { class: "p-2" }, Mn = ["name", "value", "onChange"], zn = ["value"], qn = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, In = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Tn = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Pn = {
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
    const n = e, o = N(!1);
    N(null);
    const [s, t] = At({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), l = A(() => n.filters.filter((m) => m.key === n.columnKey || m.key.startsWith(n.columnKey + "_") || m.key.includes(n.columnKey))), u = A(() => l.value.some((m) => !g(m)));
    function i() {
      l.value.length > 0 && (o.value = !o.value);
    }
    function r() {
      o.value = !1;
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
    function d(m, _) {
      n.onFilterChange(m, _);
    }
    function x(m) {
      let _ = m.value;
      m.value && (Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) ? _ = null : Number(Math.min(...m.value)) === 0 && Number(Math.max(...m.value)) === 0 && (_ = ["0", "0"])), n.onFilterChange(m.key, _);
    }
    const y = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, z = ae("themeVariables"), T = (m) => {
      var _, $, I, L;
      return ne(
        V([m, "base"], y, ($ = (_ = z == null ? void 0 : z.inertia_table) == null ? void 0 : _.table_filter) == null ? void 0 : $.select_filter, n.ui),
        V([m, "color", n.color], y, (L = (I = z == null ? void 0 : z.inertia_table) == null ? void 0 : I.table_filter) == null ? void 0 : L.select_filter, n.ui)
      );
    };
    function b(m) {
      t.value && !t.value.contains(m.target) && !m.target.closest(`[dusk="column-filter-${n.columnKey}"]`) && r();
    }
    return ge(() => {
      document.addEventListener("click", b);
    }), Ye(() => {
      document.removeEventListener("click", b);
    }), (m, _) => (f(), v("div", Cn, [
      a("button", {
        ref_key: "trigger",
        ref: s,
        onClick: i,
        class: O([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": u.value,
            "text-gray-400 hover:text-gray-600": !u.value
          }
        ]),
        dusk: `column-filter-${e.columnKey}`
      }, [..._[1] || (_[1] = [
        a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          a("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, _n),
      (f(), E(Ke, { to: "body" }, [
        o.value ? (f(), v("div", {
          key: 0,
          ref_key: "container",
          ref: t,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: _[0] || (_[0] = X(() => {
          }, ["stop"]))
        }, [
          (f(!0), v(le, null, se(l.value, ($) => (f(), v("div", {
            key: $.key
          }, [
            a("h3", $n, k($.label), 1),
            a("div", Sn, [
              $.type === "select" ? (f(), v("select", {
                key: 0,
                name: $.key,
                value: $.value,
                class: O(T("select")),
                onChange: (I) => d($.key, I.target.value)
              }, [
                (f(!0), v(le, null, se($.options, (I, L) => (f(), v("option", {
                  key: L,
                  value: L
                }, k(I), 9, zn))), 128))
              ], 42, Mn)) : C("", !0),
              $.type === "toggle" ? (f(), E(Ft, {
                key: 1,
                filter: $,
                "on-filter-change": d,
                color: e.color
              }, null, 8, ["filter", "color"])) : C("", !0),
              $.type === "number" ? (f(), v("div", qn, [
                te(Rt, {
                  filter: $,
                  "on-filter-change": d,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : C("", !0),
              $.type === "number_range" ? (f(), v("div", In, [
                te(Nt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [(I) => $.value = I, (I) => x($)],
                  max: $.max,
                  min: $.min,
                  prefix: $.prefix,
                  suffix: $.suffix,
                  step: $.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : C("", !0),
              $.type === "date" ? (f(), v("div", Tn, [
                te(jt, {
                  filter: $,
                  "on-filter-change": d,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : C("", !0)
            ])
          ]))), 128))
        ], 512)) : C("", !0)
      ])),
      (f(), E(Ke, { to: "body" }, [
        o.value ? (f(), v("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: r
        })) : C("", !0)
      ]))
    ]));
  }
}, On = { class: "relative inline-block" }, Fn = ["dusk"], Nn = { class: "p-3" }, Rn = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, jn = { class: "space-y-2" }, An = ["value", "placeholder"], Ln = {
  key: 0,
  class: "flex justify-end"
}, En = { class: "sr-only" }, Bn = {
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
    const n = e, o = we(), s = N(!1), t = N(null), [l, u] = At({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), i = A(() => n.searchInputs.find(($) => $.key === n.columnKey)), r = A(() => i.value && i.value.value || ""), g = A(() => r.value !== "");
    async function d() {
      i.value && (s.value = !s.value, s.value && (await wt(), t.value && t.value.focus()));
    }
    function x() {
      s.value = !1;
    }
    function y($) {
      const I = $.target.value;
      z(I);
    }
    function z($) {
      n.onSearchChange(n.columnKey, $);
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
    }, b = ae("themeVariables"), m = ($) => {
      var I, L, U, W;
      return ne(
        V([$, "base"], T, (L = (I = b == null ? void 0 : b.inertia_table) == null ? void 0 : I.table_search) == null ? void 0 : L.column_search, n.ui),
        V([$, "color", n.color], T, (W = (U = b == null ? void 0 : b.inertia_table) == null ? void 0 : U.table_search) == null ? void 0 : W.column_search, n.ui)
      );
    };
    function _($) {
      u.value && !u.value.contains($.target) && !$.target.closest(`[dusk="column-search-${n.columnKey}"]`) && x();
    }
    return ge(() => {
      document.addEventListener("click", _);
    }), Ye(() => {
      document.removeEventListener("click", _);
    }), ($, I) => (f(), v("div", On, [
      a("button", {
        ref_key: "trigger",
        ref: l,
        onClick: d,
        class: O([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": g.value,
            "text-gray-400 hover:text-gray-600": !g.value
          }
        ]),
        dusk: `column-search-${e.columnKey}`
      }, [...I[2] || (I[2] = [
        a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          a("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, Fn),
      (f(), E(Ke, { to: "body" }, [
        s.value ? (f(), v("div", {
          key: 0,
          ref_key: "container",
          ref: u,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: I[1] || (I[1] = X(() => {
          }, ["stop"]))
        }, [
          a("div", Nn, [
            a("h3", Rn, k(R(o).search) + " " + k(e.columnLabel), 1),
            a("div", jn, [
              a("input", {
                ref_key: "searchInput",
                ref: t,
                type: "text",
                value: r.value,
                class: O(m("input")),
                placeholder: `${R(o).search} ${e.columnLabel.toLowerCase()}...`,
                onInput: y,
                onKeydown: [
                  dt(x, ["enter"]),
                  dt(x, ["escape"])
                ]
              }, null, 42, An),
              r.value && r.value !== "" ? (f(), v("div", Ln, [
                a("button", {
                  type: "button",
                  class: O(m("reset_button")),
                  onClick: I[0] || (I[0] = (L) => z(""))
                }, [
                  a("span", En, k(R(o).reset), 1),
                  I[3] || (I[3] = a("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1))
                ], 2)
              ])) : C("", !0)
            ])
          ])
        ], 512)) : C("", !0)
      ])),
      (f(), E(Ke, { to: "body" }, [
        s.value ? (f(), v("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: x
        })) : C("", !0)
      ]))
    ]));
  }
};
const Vn = ["data-column-key"], Wn = { class: "flex flex-row items-center justify-between w-full" }, Dn = { class: "flex flex-row items-center" }, Gn = { class: "uppercase" }, Un = ["sorted"], Hn = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Kn = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Xn = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Yn = { class: "flex items-center space-x-1" }, Qn = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const n = e, o = ae("columnResize", null), s = A(() => {
      if (!o)
        return "auto";
      const r = o.getColumnWidth(n.cell.key);
      return r === "auto" ? r : `${r}px`;
    }), t = A(() => (o == null ? void 0 : o.isResizing) || !1), l = A(() => (o == null ? void 0 : o.resizingColumn) || null);
    function u() {
      n.cell.sortable && n.cell.onSort(n.cell.key);
    }
    function i(r, g) {
      o && o.startResize(r, g);
    }
    return (r, g) => Y((f(), v("th", {
      class: O(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: fe({ width: s.value }),
      "data-column-key": e.cell.key
    }, [
      (f(), E(Oe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: X(u, ["prevent"])
      }, {
        default: H(() => [
          a("span", Wn, [
            a("span", Dn, [
              B(r.$slots, "label", {}, () => [
                a("span", Gn, k(e.cell.label), 1)
              ], !0),
              B(r.$slots, "sort", {}, () => [
                e.cell.sortable ? (f(), v("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: O(["w-3 h-3 ml-2", {
                    "text-gray-400": !e.cell.sorted,
                    "text-green-500": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? C("", !0) : (f(), v("path", Hn)),
                  e.cell.sorted === "asc" ? (f(), v("path", Kn)) : C("", !0),
                  e.cell.sorted === "desc" ? (f(), v("path", Xn)) : C("", !0)
                ], 10, Un)) : C("", !0)
              ], !0)
            ]),
            a("span", Yn, [
              B(r.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (f(), E(Bn, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  color: e.cell.color,
                  onClick: g[0] || (g[0] = X(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : C("", !0)
              ], !0),
              B(r.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (f(), E(Pn, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  color: e.cell.color,
                  onClick: g[1] || (g[1] = X(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : C("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && R(o) ? (f(), E(co, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": i,
        "is-active": t.value && l.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : C("", !0)
    ], 14, Vn)), [
      [xe, !e.cell.hidden]
    ]);
  }
}, Jn = /* @__PURE__ */ je(Qn, [["__scopeId", "data-v-8684dc95"]]), Zn = ["dusk", "value"], el = ["value"], yt = {
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
    const n = we(), o = e, s = A(() => {
      let i = [...o.options];
      return i.push(parseInt(o.value)), ir(i).sort((r, g) => r - g);
    }), t = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, l = ae("themeVariables"), u = (i) => {
      var r, g;
      return ne(
        V([i, "base"], t, (r = l == null ? void 0 : l.inertia_table) == null ? void 0 : r.per_page_selector, o.ui),
        V([i, "color", o.color], t, (g = l == null ? void 0 : l.inertia_table) == null ? void 0 : g.per_page_selector, o.ui)
      );
    };
    return (i, r) => (f(), v("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: O(u("select")),
      onChange: r[0] || (r[0] = (g) => e.onChange(g.target.value))
    }, [
      (f(!0), v(le, null, se(s.value, (g) => (f(), v("option", {
        key: g,
        value: g
      }, k(g) + " " + k(R(n).per_page), 9, el))), 128))
    ], 42, Zn));
  }
}, tl = {
  key: 0,
  class: "bg-white flex items-center"
}, rl = { key: 0 }, ol = { class: "hidden sm:inline ml-2" }, nl = { class: "hidden sm:inline mr-2" }, ll = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, sl = { class: "flex flex-row space-x-4 items-center grow" }, al = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, il = { class: "font-medium" }, ul = { class: "font-medium" }, cl = { class: "font-medium" }, dl = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, fl = { class: "sr-only" }, ml = { class: "sr-only" }, hl = {
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
    const n = we(), o = e, s = A(() => "links" in l.value ? l.value.links.length > 0 : !1), t = A(() => Object.keys(l.value).length > 0), l = A(() => o.meta), u = A(() => "prev_page_url" in l.value ? l.value.prev_page_url : null), i = A(() => "next_page_url" in l.value ? l.value.next_page_url : null), r = A(() => parseInt(l.value.per_page));
    return (g, d) => t.value ? (f(), v("nav", tl, [
      !e.hasData || l.value.total < 1 ? (f(), v("p", rl, k(R(n).no_results_found), 1)) : C("", !0),
      e.hasData ? (f(), v("div", {
        key: 1,
        class: O(["flex-1 flex justify-between", { "sm:hidden": s.value }])
      }, [
        (f(), E(Oe(u.value ? "a" : "div"), {
          class: O([{
            "cursor-not-allowed text-gray-400": !u.value,
            "text-gray-700 hover:text-gray-500": u.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: u.value,
          dusk: u.value ? "pagination-simple-previous" : null,
          onClick: d[0] || (d[0] = X((x) => e.onClick(u.value), ["prevent"]))
        }, {
          default: H(() => [
            d[4] || (d[4] = a("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              a("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M7 16l-4-4m0 0l4-4m-4 4h18"
              })
            ], -1)),
            a("span", ol, k(R(n).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        te(yt, {
          dusk: "per-page-mobile",
          value: r.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (f(), E(Oe(i.value ? "a" : "div"), {
          class: O([{
            "cursor-not-allowed text-gray-400": !i.value,
            "text-gray-700 hover:text-gray-500": i.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: i.value,
          dusk: i.value ? "pagination-simple-next" : null,
          onClick: d[1] || (d[1] = X((x) => e.onClick(i.value), ["prevent"]))
        }, {
          default: H(() => [
            a("span", nl, k(R(n).next), 1),
            d[5] || (d[5] = a("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              a("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M17 8l4 4m0 0l-4 4m4-4H3"
              })
            ], -1))
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"]))
      ], 2)) : C("", !0),
      e.hasData && s.value ? (f(), v("div", ll, [
        a("div", sl, [
          te(yt, {
            dusk: "per-page-full",
            value: r.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          a("p", al, [
            a("span", il, k(l.value.from), 1),
            me(" " + k(R(n).to) + " ", 1),
            a("span", ul, k(l.value.to), 1),
            me(" " + k(R(n).of) + " ", 1),
            a("span", cl, k(l.value.total), 1),
            me(" " + k(R(n).results), 1)
          ])
        ]),
        a("div", null, [
          a("nav", dl, [
            (f(), E(Oe(u.value ? "a" : "div"), {
              class: O([{
                "cursor-not-allowed text-gray-400": !u.value,
                "text-gray-500 hover:bg-gray-50": u.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: u.value,
              dusk: u.value ? "pagination-previous" : null,
              onClick: d[2] || (d[2] = X((x) => e.onClick(u.value), ["prevent"]))
            }, {
              default: H(() => [
                a("span", fl, k(R(n).previous), 1),
                d[6] || (d[6] = a("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  a("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"])),
            (f(!0), v(le, null, se(l.value.links, (x, y) => (f(), v("div", { key: y }, [
              B(g.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (f(), E(Oe(x.url ? "a" : "div"), {
                  key: 0,
                  href: x.url,
                  dusk: x.url ? `pagination-${x.label}` : null,
                  class: O(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !x.url,
                    "hover:bg-gray-50": x.url,
                    "bg-white": !x.active,
                    "bg-gray-100": x.active
                  }]),
                  onClick: X((z) => e.onClick(x.url), ["prevent"])
                }, {
                  default: H(() => [
                    me(k(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : C("", !0)
              ])
            ]))), 128)),
            (f(), E(Oe(i.value ? "a" : "div"), {
              class: O([{
                "cursor-not-allowed text-gray-400": !i.value,
                "text-gray-500 hover:bg-gray-50": i.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: i.value,
              dusk: i.value ? "pagination-next" : null,
              onClick: d[3] || (d[3] = X((x) => e.onClick(i.value), ["prevent"]))
            }, {
              default: H(() => [
                a("span", ml, k(R(n).next), 1),
                d[7] || (d[7] = a("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  a("path", {
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
      ])) : C("", !0)
    ])) : C("", !0);
  }
}, gl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, pl = ["dusk", "onClick"], vl = {
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
    const n = e, o = N(null);
    function s(t) {
      n.onAdd(t), o.value.hide();
    }
    return (t, l) => (f(), E(Qe, {
      ref_key: "dropdown",
      ref: o,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: H(() => [...l[0] || (l[0] = [
        a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          a("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])]),
      default: H(() => [
        a("div", gl, [
          (f(!0), v(le, null, se(e.searchInputs, (u, i) => (f(), v("button", {
            key: i,
            dusk: `add-search-row-${u.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: X((r) => s(u.key), ["prevent"])
          }, k(u.label), 9, pl))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, bl = ["data-column-key"], yl = { class: "flex items-center" }, xl = ["onClick", "title"], wl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, kl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, Cl = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Lt = {
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
  setup(e, { emit: n }) {
    const o = e, s = n, t = N([...o.columns]), l = N(!1), u = N(!1);
    he(() => o.columns, (d) => {
      !l.value && !u.value && (t.value = [...d]), u.value && setTimeout(() => {
        u.value = !1;
      }, 100);
    }, { deep: !0 });
    function i(d, x) {
      const y = t.value.findIndex((z) => z.key === d);
      y !== -1 && (t.value[y].hidden = !x), s("columns-changed", t.value);
    }
    function r(d, x) {
      const y = t.value.findIndex((z) => z.key === d);
      y !== -1 && (t.value[y].pinned = !x), t.value.sort((z, T) => z.pinned && !T.pinned ? -1 : !z.pinned && T.pinned ? 1 : 0), s("columns-changed", t.value);
    }
    function g() {
      u.value = !0, s("columns-changed", t.value);
    }
    return (d, x) => (f(), E(R(ur), {
      modelValue: t.value,
      "onUpdate:modelValue": x[0] || (x[0] = (y) => t.value = y),
      "item-key": "key",
      animation: 200,
      handle: ".drag-handle",
      onChange: g,
      onStart: x[1] || (x[1] = (y) => l.value = !0),
      onEnd: x[2] || (x[2] = (y) => l.value = !1)
    }, {
      item: H(({ element: y }) => [
        a("div", {
          class: "py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0",
          "data-test": "column-item",
          "data-column-key": y.key
        }, [
          a("div", yl, [
            x[5] || (x[5] = a("div", { class: "drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600" }, [
              a("svg", {
                class: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                a("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            y.can_be_pinned !== !1 ? (f(), v("button", {
              key: 0,
              type: "button",
              class: O(["mr-2 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600", { "text-blue-500": y.pinned }]),
              onClick: X((z) => r(y.key, y.pinned), ["prevent"]),
              title: y.pinned ? "D\xE9s\xE9pingler la colonne" : "\xC9pingler la colonne"
            }, [
              y.pinned ? (f(), v("svg", wl, [...x[3] || (x[3] = [
                a("g", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5"
                }, [
                  a("path", { d: "M9.5 14.5L3 21" }),
                  a("path", {
                    fill: "currentColor",
                    d: "m5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                  })
                ], -1)
              ])])) : (f(), v("svg", kl, [...x[4] || (x[4] = [
                a("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, xl)) : C("", !0),
            a("p", {
              class: O(["text-sm text-gray-900", { "text-gray-400": y.hidden, "font-semibold": y.pinned }])
            }, k(y.label), 3)
          ]),
          y.can_be_hidden && !y.pinned ? (f(), v("button", {
            key: 0,
            type: "button",
            class: O(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
              "bg-green-500": !y.hidden,
              "bg-gray-200": y.hidden
            }]),
            "aria-pressed": !y.hidden,
            "aria-labelledby": `toggle-column-${y.key}`,
            "aria-describedby": `toggle-column-${y.key}`,
            dusk: `toggle-column-${y.key}`,
            onClick: X((z) => i(y.key, y.hidden), ["prevent"])
          }, [
            x[6] || (x[6] = a("span", { class: "sr-only" }, "Column status", -1)),
            a("span", {
              "aria-hidden": "true",
              class: O([{
                "translate-x-5": !y.hidden,
                "translate-x-0": y.hidden
              }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
            }, null, 2)
          ], 10, Cl)) : C("", !0)
        ], 8, bl)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
};
const _l = {
  key: 0,
  class: "ml-1"
}, $l = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, Sl = { class: "px-2" }, Ml = {
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
    const n = e, o = N([...n.columns]);
    he(() => n.columns, (l) => {
      o.value = [...l];
    }, { deep: !0, immediate: !0 });
    const s = A(() => o.value.filter((l) => l.hidden).length);
    function t(l) {
      o.value = [...l], n.onChange(l);
    }
    return (l, u) => (f(), E(Qe, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: H(() => [
        u[0] || (u[0] = a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5",
          viewBox: "0 0 48 48"
        }, [
          a("path", {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "4",
            d: "m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
          })
        ], -1)),
        e.hasHiddenColumns ? (f(), v("span", _l, "(" + k(s.value) + ")", 1)) : C("", !0)
      ]),
      default: H(() => [
        a("div", $l, [
          a("div", Sl, [
            te(Lt, {
              columns: o.value,
              "can-sort": !0,
              onColumnsChanged: t
            }, null, 8, ["columns"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, zl = /* @__PURE__ */ je(Ml, [["__scopeId", "data-v-eadc618a"]]), ql = {
  key: 0,
  class: "ml-1"
}, Il = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, Tl = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Pl = { class: "p-2" }, Ol = ["name", "value", "onChange"], Fl = ["value"], Nl = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Rl = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, jl = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Al = {
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
    N(null);
    const o = A(() => n.filters.filter((r) => !s(r)).length);
    function s(r) {
      if (r.value === null)
        return !0;
      switch (r.type) {
        case "number_range":
          return Number(Math.max(...r.value)) === Number(r.max) && Number(Math.min(...r.value)) === Number(r.min);
        case "select":
          return r.value === "";
        case "toggle":
          return !1;
        case "date":
          return !r.value || typeof r.value == "object" && !r.value.type;
        case "number":
          return !r.value || typeof r.value == "object" && !r.value.type;
        default:
          return !r.value;
      }
    }
    function t(r) {
      let g = r.value;
      r.value && (Number(Math.max(...r.value)) === Number(r.max) && Number(Math.min(...r.value)) === Number(r.min) ? g = null : Number(Math.min(...r.value)) === 0 && Number(Math.max(...r.value)) === 0 && (g = ["0", "0"])), n.onFilterChange(r.key, g);
    }
    const l = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, u = ae("themeVariables"), i = (r) => {
      var g, d, x, y;
      return ne(
        V([r, "base"], l, (d = (g = u == null ? void 0 : u.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : d.select_filter, n.ui),
        V([r, "color", n.color], l, (y = (x = u == null ? void 0 : u.inertia_table) == null ? void 0 : x.table_filter) == null ? void 0 : y.select_filter, n.ui)
      );
    };
    return (r, g) => (f(), E(Qe, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: H(() => [
        g[0] || (g[0] = a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          a("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        e.hasEnabledFilters ? (f(), v("span", ql, "(" + k(o.value) + ")", 1)) : C("", !0)
      ]),
      default: H(() => [
        a("div", Il, [
          (f(!0), v(le, null, se(e.filters, (d, x) => (f(), v("div", { key: x }, [
            a("h3", Tl, k(d.label), 1),
            a("div", Pl, [
              d.type === "select" ? (f(), v("select", {
                key: 0,
                name: d.key,
                value: d.value,
                class: O(i("select", e.color)),
                onChange: (y) => e.onFilterChange(d.key, y.target.value)
              }, [
                (f(!0), v(le, null, se(d.options, (y, z) => (f(), v("option", {
                  key: z,
                  value: z
                }, k(y), 9, Fl))), 128))
              ], 42, Ol)) : C("", !0),
              d.type === "toggle" ? (f(), E(Ft, {
                key: 1,
                filter: d,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : C("", !0),
              d.type === "number_range" ? (f(), v("div", Nl, [
                te(Nt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [(y) => d.value = y, (y) => t(d)],
                  max: d.max,
                  min: d.min,
                  prefix: d.prefix,
                  suffix: d.suffix,
                  step: d.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : C("", !0),
              d.type === "date" ? (f(), v("div", Rl, [
                te(jt, {
                  filter: d,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : C("", !0),
              d.type === "number" ? (f(), v("div", jl, [
                te(Rt, {
                  filter: d,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : C("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, Ll = { class: "relative" }, El = ["placeholder", "value"], Bl = {
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
    const n = e, o = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, s = ae("themeVariables"), t = (l) => {
      var u, i;
      return ne(
        V([l, "base"], o, (u = s == null ? void 0 : s.inertia_table) == null ? void 0 : u.global_search, n.ui),
        V([l, "color", n.color], o, (i = s == null ? void 0 : s.inertia_table) == null ? void 0 : i.global_search, n.ui)
      );
    };
    return (l, u) => (f(), v("div", Ll, [
      a("input", {
        class: O(t("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: u[0] || (u[0] = (i) => e.onChange(i.target.value))
      }, null, 42, El),
      u[1] || (u[1] = a("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
        a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          a("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ])
      ], -1))
    ]));
  }
}, Vl = { class: "flex rounded-md shadow-sm relative mt-3" }, Wl = ["for"], Dl = ["id", "name", "value", "onInput"], Gl = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Ul = ["dusk", "onClick"], Hl = {
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
    const n = { el: N([]) };
    let o = A(() => n.el.value);
    const s = e;
    function t(r) {
      return s.forcedVisibleSearchInputs.includes(r);
    }
    he(s.forcedVisibleSearchInputs, (r) => {
      const g = r.length > 0 ? r[r.length - 1] : null;
      !g || wt().then(() => {
        const d = cr(o.value, (x) => x.name === g);
        d && d.focus();
      });
    }, { immediate: !0 });
    const l = {
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
    }, u = ae("themeVariables"), i = (r) => {
      var g, d;
      return ne(
        V([r, "base"], l, (g = u == null ? void 0 : u.inertia_table) == null ? void 0 : g.table_search_rows, s.ui),
        V([r, "color", s.color], l, (d = u == null ? void 0 : u.inertia_table) == null ? void 0 : d.table_search_rows, s.ui)
      );
    };
    return (r, g) => (f(!0), v(le, null, se(e.searchInputs, (d, x) => Y((f(), v("div", {
      key: x,
      class: "px-4 sm:px-0"
    }, [
      a("div", Vl, [
        a("label", {
          for: d.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          g[0] || (g[0] = a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-5 w-5 mr-2 text-gray-400",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, [
            a("path", {
              "fill-rule": "evenodd",
              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
              "clip-rule": "evenodd"
            })
          ], -1)),
          a("span", null, k(d.label), 1)
        ], 8, Wl),
        (f(), v("input", {
          id: d.key,
          ref_for: !0,
          ref: n.el,
          key: d.key,
          name: d.key,
          value: d.value,
          type: "text",
          class: O(i("input")),
          onInput: (y) => e.onChange(d.key, y.target.value)
        }, null, 42, Dl)),
        a("div", Gl, [
          a("button", {
            class: O(i("remove_button")),
            dusk: `remove-search-row-${d.key}`,
            onClick: X((y) => e.onRemove(d.key), ["prevent"])
          }, [...g[1] || (g[1] = [
            a("span", { class: "sr-only" }, "Remove search", -1),
            a("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              a("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M6 18L18 6M6 6l12 12"
              })
            ], -1)
          ])], 10, Ul)
        ])
      ])
    ])), [
      [xe, d.value !== null || t(d.key)]
    ])), 128));
  }
}, Kl = {
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
    const n = we(), o = e, s = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, t = ae("themeVariables"), l = (u) => {
      var i, r;
      return ne(
        V([u, "base"], s, (i = t == null ? void 0 : t.inertia_table) == null ? void 0 : i.reset_button, o.ui),
        V([u, "color", o.color], s, (r = t == null ? void 0 : t.inertia_table) == null ? void 0 : r.reset_button, o.ui)
      );
    };
    return (u, i) => {
      var r;
      return f(), v("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: O(l("button")),
        "aria-haspopup": "true",
        onClick: i[0] || (i[0] = X((...g) => e.onClick && e.onClick(...g), ["prevent"]))
      }, [
        i[1] || (i[1] = a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 mr-2 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          a("path", {
            "fill-rule": "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        a("span", null, k((r = R(n).reset) != null ? r : "Reset"), 1)
      ], 2);
    };
  }
}, Xl = {}, Yl = { class: "flow-root" }, Ql = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, Jl = { class: "inline-block min-w-full w-full max-w-full py-2 align-middle sm:px-6 lg:px-8" }, Zl = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function es(e, n) {
  return f(), v("div", Yl, [
    a("div", Ql, [
      a("div", Jl, [
        a("div", Zl, [
          B(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const ts = /* @__PURE__ */ je(Xl, [["render", es]]), rs = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, os = ["dusk", "onClick"], ns = { class: "px-2" }, ls = {
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
    const n = we(), o = e, s = N(!1), t = N(!1);
    function l() {
      s.value = t.value = !1;
    }
    function u(i) {
      var r, g;
      (r = o.actions.toggleColumns) != null && r.onReorder ? o.actions.toggleColumns.onReorder(i) : (g = o.actions.toggleColumns) != null && g.onChange && o.actions.toggleColumns.onChange(i);
    }
    return (i, r) => (f(), E(Qe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: l
    }, {
      button: H(() => [...r[5] || (r[5] = [
        a("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          a("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: H(() => {
        var g, d, x, y, z;
        return [
          a("div", rs, [
            Y(a("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (f(), v("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[0] || (r[0] = (T) => t.value = !0)
              }, [
                r[6] || (r[6] = a("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  a("path", {
                    "fill-rule": "evenodd",
                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                a("span", null, k((g = R(n).add_search_fields) != null ? g : "Add search field"), 1)
              ])) : C("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (f(), v("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[1] || (r[1] = (T) => s.value = !0)
              }, [
                r[7] || (r[7] = a("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  a("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                  a("path", {
                    "fill-rule": "evenodd",
                    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                a("span", null, k((d = R(n).show_hide_columns) != null ? d : "Show / Hide columns"), 1)
              ])) : C("", !0),
              r[9] || (r[9] = a("hr", null, null, -1)),
              "reset" in e.actions ? (f(), v("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[2] || (r[2] = (...T) => {
                  var b, m;
                  return ((b = e.actions.reset) == null ? void 0 : b.onClick) && ((m = e.actions.reset) == null ? void 0 : m.onClick(...T));
                })
              }, [
                r[8] || (r[8] = a("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  a("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                a("span", null, k((x = R(n).grouped_reset) != null ? x : "Reset"), 1)
              ])) : C("", !0)
            ], 512), [
              [xe, !s.value && !t.value]
            ]),
            Y(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[3] || (r[3] = (T) => t.value = !1)
              }, [
                r[10] || (r[10] = a("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  a("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                a("span", null, k((y = R(n).add_search_fields) != null ? y : "Add search field"), 1)
              ]),
              (f(!0), v(le, null, se(e.actions.searchFields.searchInputs, (T, b) => (f(), v("button", {
                key: b,
                dusk: `add-search-row-${T.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: X((m) => e.actions.searchFields.onClick(T.key), ["prevent"])
              }, k(T.label), 9, os))), 128))
            ], 512), [
              [xe, t.value]
            ]),
            Y(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[4] || (r[4] = (T) => s.value = !1)
              }, [
                r[11] || (r[11] = a("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  a("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                a("span", null, k((z = R(n).show_hide_columns) != null ? z : "Show / Hide columns"), 1)
              ]),
              a("div", ns, [
                te(Lt, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: u
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [xe, s.value]
            ]),
            Y(a("div", null, [
              B(i.$slots, "default")
            ], 512), [
              [xe, !s.value && !t.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function ss(e) {
  const n = N(!1), o = N(null), s = N(0), t = N(0), l = Jt({}), u = () => {
    if (e === "default")
      return;
    const m = localStorage.getItem(`table-column-widths-${e}`);
    if (m)
      try {
        const _ = JSON.parse(m);
        Object.assign(l, _);
      } catch (_) {
        console.warn("Unable to load column widths:", _);
      }
  }, i = () => {
    e !== "default" && localStorage.setItem(`table-column-widths-${e}`, JSON.stringify(l));
  }, r = (m, _) => {
    m.preventDefault(), m.stopPropagation(), n.value = !0, o.value = _, s.value = m.clientX;
    const $ = m.target.closest("th");
    t.value = $.offsetWidth;
    const I = $.closest("table");
    I && I.querySelectorAll("thead th[data-column-key]").forEach((U) => {
      const W = U.getAttribute("data-column-key"), ee = U.offsetWidth;
      l[W] || (l[W] = ee), U.style.width = `${l[W]}px`;
      const F = Array.from(U.parentNode.children).indexOf(U);
      I.querySelectorAll("tbody tr").forEach(($e) => {
        const pe = $e.children[F];
        pe && (pe.style.width = `${l[W]}px`);
      });
    }), document.addEventListener("mousemove", g), document.addEventListener("mouseup", d), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, g = (m) => {
    if (!n.value || !o.value)
      return;
    const _ = m.clientX - s.value, $ = Math.max(50, t.value + _);
    l[o.value] = $;
    const I = document.querySelector(`th[data-column-key="${o.value}"]`);
    if (I) {
      I.style.width = `${$}px`;
      const L = I.closest("table");
      if (L) {
        const U = Array.from(I.parentNode.children).indexOf(I);
        L.querySelectorAll("tbody tr").forEach((ee) => {
          const F = ee.children[U];
          F && (F.style.width = `${$}px`);
        });
      }
    }
  }, d = () => {
    n.value && (n.value = !1, o.value = null, i(), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", d), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, x = (m) => l[m] || "auto", y = (m, _) => {
    l[m] = _, i();
  }, z = (m) => {
    if (!m)
      return;
    m.querySelectorAll("thead th[data-column-key]").forEach(($) => {
      const I = $.getAttribute("data-column-key");
      if (!l[I]) {
        const W = $.offsetWidth;
        l[I] = Math.max(W, 100);
      }
      $.style.width = `${l[I]}px`;
      const L = Array.from($.parentNode.children).indexOf($);
      m.querySelectorAll("tbody tr").forEach((W) => {
        const ee = W.children[L];
        ee && (ee.style.width = `${l[I]}px`);
      });
    });
  }, T = () => {
    Object.keys(l).forEach((m) => {
      delete l[m];
    }), e !== "default" && localStorage.removeItem(`table-column-widths-${e}`);
  }, b = () => {
    n.value && (document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", d), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return ge(() => {
    u();
  }), Ye(() => {
    b();
  }), {
    isResizing: n,
    resizingColumn: o,
    columnWidths: l,
    startResize: r,
    getColumnWidth: x,
    setColumnWidth: y,
    resetColumnWidths: T,
    loadColumnWidths: u,
    saveColumnWidths: i,
    initializeColumnWidths: z
  };
}
const as = ["dusk"], is = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0 space-x-2" }, us = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0"
}, cs = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, ds = ["href"], fs = { class: "overflow-x-auto" }, ms = { class: "bg-gray-50" }, hs = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border pinned-checkbox-header",
  style: { width: "60px" }
}, gs = ["id"], ps = { class: "divide-y divide-gray-200 bg-white" }, vs = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500 pinned-checkbox",
  style: { width: "60px" }
}, bs = ["id", "onUpdate:modelValue"], ys = ["onClick", "data-column-key"], xs = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, ws = {
  key: 0,
  class: "italic text-sm px-2"
}, ks = {
  key: 1,
  class: "flex justify-center py-4"
}, Cs = {
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
  setup(e, { emit: n }) {
    const o = we(), s = n, t = e;
    Zt();
    const l = t.resizeableColumns ? ss(t.name) : null;
    er("columnResize", l);
    const u = N(!1), i = A(() => mt().props.queryBuilderProps ? { ...mt().props.queryBuilderProps[t.name] } : {}), r = N(i.value), g = N([]), d = N(null), x = N(null), y = N(!1);
    let z;
    const T = A(() => i.value.pageName), b = N([]), m = N(null), _ = N(!1), $ = A(() => i.value.hasToggleableColumns || i.value.hasFilters || i.value.hasSearchInputs ? !1 : !i.value.globalSearch), I = A(() => i.value.infiniteScrolling ? g.value : Object.keys(t.resource).length === 0 ? t.data : "data" in t.resource ? t.resource.data : t.resource), L = A(() => Object.keys(t.resource).length === 0 ? t.meta : "links" in t.resource && "meta" in t.resource && Object.keys(t.resource.links).length === 4 && "next" in t.resource.links && "prev" in t.resource.links ? {
      ...t.resource.meta,
      next_page_url: t.resource.links.next,
      prev_page_url: t.resource.links.prev
    } : "meta" in t.resource ? t.resource.meta : t.resource), U = A(() => I.value.length > 0 ? !0 : L.value.total > 0), W = N({
      reset: {
        onClick: ve
      },
      toggleColumns: {
        show: i.value.hasToggleableColumns,
        columns: i.value.columns,
        onChange: Se
      },
      searchFields: {
        show: i.value.hasSearchInputs && !t.hideSearchInputsAboveTable,
        searchInputs: i.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: i.value.hasSearchInputsWithoutValue,
        onClick: F
      }
    });
    function ee(c) {
      b.value = b.value.filter((h) => h != c), ue(c, null);
    }
    function F(c) {
      b.value.push(c);
    }
    const re = A(() => {
      if (b.value.length > 0)
        return !0;
      const c = Ze.parse(location.search.substring(1));
      if (c[T.value] > 1)
        return !0;
      const p = t.name === "default" ? "" : t.name + "_";
      let q = !1;
      return be(["filter", "columns", "cursor", "sort"], (w) => {
        const D = c[p + w];
        w === "sort" && D === i.value.defaultSort || D !== void 0 && (q = !0);
      }), q;
    }), $e = (c, h) => {
      let p = [];
      if (t.striped && h % 2 && p.push("bg-gray-50"), t.striped ? p.push("hover:bg-gray-100") : p.push("hover:bg-gray-50"), t.rowClass && typeof t.rowClass == "function") {
        const q = t.rowClass(c);
        q && p.push(q);
      }
      return p.join(" ");
    }, pe = A(() => {
      if (!t.showExportButton)
        return null;
      const c = new URL(window.location.href);
      c.search = "";
      const h = new URLSearchParams();
      if (i.value.page && i.value.page > 1 && h.set(T.value, i.value.page), i.value.sort) {
        const w = t.name === "default" ? "sort" : `${t.name}_sort`;
        h.set(w, i.value.sort);
      }
      const p = {};
      if (r.value.filters.forEach((w) => {
        w.value !== null && w.value !== void 0 && w.value !== "" && (p[w.key] = w.value);
      }), r.value.searchInputs.forEach((w) => {
        w.value !== null && w.value !== void 0 && w.value !== "" && (p[w.key] = w.value);
      }), Object.keys(p).length > 0) {
        const w = t.name === "default" ? "filter" : `${t.name}_filter`;
        Object.keys(p).forEach((D) => {
          const Z = p[D];
          Array.isArray(Z) ? Z.forEach((Te, Je) => {
            h.set(`${w}[${D}][${Je}]`, Te);
          }) : typeof Z == "object" && Z !== null ? Object.keys(Z).forEach((Te) => {
            h.set(`${w}[${D}][${Te}]`, Z[Te]);
          }) : h.set(`${w}[${D}]`, Z);
        });
      }
      const q = r.value.columns.filter((w) => !w.hidden).map((w) => w.key);
      if (q.length !== r.value.columns.length) {
        const w = t.name === "default" ? "columns" : `${t.name}_columns`;
        q.forEach((D) => {
          h.append(`${w}[]`, D);
        });
      }
      if (i.value.perPageOptions && i.value.perPageOptions.length > 0) {
        const w = new URLSearchParams(window.location.search).get("perPage") || i.value.perPageOptions[0];
        w && w !== i.value.perPageOptions[0] && h.set("perPage", w);
      }
      return h.set("do_export", "1"), h.set("table", t.name || "default"), c.search = h.toString(), c.toString();
    });
    function ve() {
      b.value = [], be(r.value.filters, (c, h) => {
        r.value.filters[h].value = null;
      }), be(r.value.searchInputs, (c, h) => {
        r.value.searchInputs[h].value = null;
      }), be(r.value.columns, (c, h) => {
        r.value.columns[h].hidden = c.can_be_hidden ? !i.value.defaultVisibleToggleableColumns.includes(c.key) : !1, r.value.columns[h].pinned = !1;
      }), localStorage.removeItem(`columns-${t.name}`), t.resizeableColumns && l && l.resetColumnWidths(), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const Ae = {};
    function ue(c, h) {
      clearTimeout(Ae[c]), Ae[c] = setTimeout(() => {
        G.value && t.preventOverlappingRequests && G.value.cancel();
        const p = P("searchInputs", c);
        r.value.searchInputs[p].value = h, r.value.cursor = null, r.value.page = 1;
      }, t.inputDebounceMs);
    }
    function ce(c) {
      ue("global", c);
    }
    function oe(c, h) {
      const p = P("filters", c);
      r.value.filters[p].value = h, r.value.cursor = null, r.value.page = 1;
    }
    function ie(c) {
      r.value.cursor = null, r.value.perPage = c, r.value.page = 1;
    }
    function P(c, h) {
      return mr(r.value[c], (p) => p.key == h);
    }
    function Se(c) {
      r.value.columns = c, r.value.columns.sort((h, p) => h.pinned && !p.pinned ? -1 : !h.pinned && p.pinned ? 1 : 0), Ve();
    }
    function Ve() {
      if (t.name && t.name !== "default") {
        const c = r.value.columns.map((h, p) => ({
          key: h.key,
          hidden: h.hidden,
          pinned: h.pinned || !1,
          order: p
        }));
        localStorage.setItem(`columns-${t.name}`, JSON.stringify(c));
      }
    }
    function We() {
      let c = {};
      return be(r.value.searchInputs, (h) => {
        h.value !== null && (c[h.key] = h.value);
      }), be(r.value.filters, (h) => {
        let p = h.value;
        p !== null && (h.type === "number_range" && Number(Math.max(...h.value)) === Number(h.max) && Number(Math.min(...h.value)) === Number(h.min) && (p = null), c[h.key] = p);
      }), c;
    }
    function Le() {
      const c = r.value.columns;
      let h = fr(c, (q) => !q.hidden), p = gr(h, (q) => q.key).sort();
      return hr(p, i.value.defaultVisibleToggleableColumns) ? {} : p;
    }
    function Q() {
      const c = We(), h = Le(), p = {};
      Object.keys(c).length > 0 && (p.filter = c), Object.keys(h).length > 0 && (p.columns = h);
      const q = r.value.cursor, w = r.value.page, D = r.value.sort, Z = r.value.perPage;
      return q && (p.cursor = q), w > 1 && (p.page = w), Z > 1 && (p.perPage = Z), D && (p.sort = D), p;
    }
    function J(c) {
      if (!c)
        return null;
      if (t.paginationClickCallback && typeof t.paginationClickCallback == "function") {
        t.paginationClickCallback(c);
        return;
      }
      Ee(c);
    }
    function Me() {
      const c = Ze.parse(location.search.substring(1)), h = t.name === "default" ? "" : t.name + "_";
      be(["filter", "columns", "cursor", "sort"], (q) => {
        delete c[h + q];
      }), delete c[T.value], be(Q(), (q, w) => {
        w === "page" ? c[T.value] = q : w === "perPage" ? c.perPage = q : c[h + w] = q;
      });
      let p = Ze.stringify(c, {
        filter(q, w) {
          return typeof w == "object" && w !== null ? pr(w) : w;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!p || p === T.value + "=1") && (p = ""), p;
    }
    const ze = N(!1), G = N(null);
    function Ee(c) {
      !c || vr.get(
        c,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: t.preserveScroll !== !1,
          onBefore() {
            ze.value = !0;
          },
          onCancelToken(h) {
            G.value = h;
          },
          onFinish() {
            ze.value = !1;
          },
          onSuccess() {
            if (t.preserveScroll === "table-top") {
              const p = m.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: p });
            }
          }
        }
      );
    }
    function qe(c, h, p) {
      var q;
      t.hasCheckboxes && ((q = c.target) == null ? void 0 : q.parentElement.cellIndex) === 0 || s("rowClicked", c, h, p);
    }
    async function Ie() {
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
          const h = await c.json();
          g.value = [...g.value, ...h.data], d.value = h.next_page_url;
        } catch (c) {
          console.error("Error loading more data:", c);
        } finally {
          y.value = !1;
        }
      }
    }
    function ke() {
      !i.value.infiniteScrolling || !x.value || (z && (z.disconnect(), z = null), t.resource && t.resource.data && g.value.length === 0 && (g.value = [...t.resource.data], d.value = L.value.next_page_url || null), z = new IntersectionObserver(
        (c) => {
          c.forEach((h) => {
            h.isIntersecting && Ie();
          });
        },
        {
          rootMargin: "0px 0px 100px 0px",
          threshold: 0.1
        }
      ), z.observe(x.value));
    }
    he(r, () => {
      i.value.infiniteScrolling && (g.value = [], d.value = null), Ee(location.pathname + "?" + Me()), _.value = !1;
    }, { deep: !0 }), he(() => t.resource, () => {
      var c;
      if (!i.value.infiniteScrolling && ((c = t.resource) == null ? void 0 : c.data)) {
        const h = t.resource.data.filter((p) => p.__itSelected);
        s("selectionChanged", h);
      }
    }, { deep: !0 }), he(() => i.value, (c) => {
      var p;
      if (!i.value.infiniteScrolling)
        return;
      const h = ((p = t.resource) == null ? void 0 : p.data) || [];
      if (h.length > 0) {
        g.value = [...h], d.value = L.value.next_page_url || null;
        const q = h.filter((w) => w.__itSelected);
        s("selectionChanged", q), setTimeout(() => {
          x.value && ke();
        }, 100);
      }
    }, { deep: !0 });
    const Ce = () => {
      t.resizeableColumns && l && setTimeout(() => {
        var h;
        const c = (h = m.value) == null ? void 0 : h.querySelector("table");
        c && l.initializeColumnWidths(c);
      }, 0), i.value.infiniteScrolling && setTimeout(() => {
        x.value && ke();
      }, 100);
    };
    ge(() => {
      document.addEventListener("inertia:success", Ce), Et(), t.resizeableColumns && l && setTimeout(() => {
        var h;
        const c = (h = m.value) == null ? void 0 : h.querySelector("table");
        c && l.initializeColumnWidths(c);
      }, 0), i.value.infiniteScrolling && ke();
    });
    function Et() {
      if (!t.name || t.name === "default")
        return;
      const c = localStorage.getItem(`columns-${t.name}`);
      if (!!c)
        try {
          const h = JSON.parse(c);
          if (h.length > 0 && "order" in h[0]) {
            const p = new Map(h.map((q) => [q.key, q]));
            r.value.columns.forEach((q, w) => {
              const D = p.get(q.key);
              D && (r.value.columns[w].hidden = D.hidden, r.value.columns[w].pinned = D.pinned || !1);
            }), r.value.columns.sort((q, w) => {
              var ut, ct;
              const D = p.get(q.key), Z = p.get(w.key);
              if (q.pinned && !w.pinned)
                return -1;
              if (!q.pinned && w.pinned)
                return 1;
              const Te = (ut = D == null ? void 0 : D.order) != null ? ut : 999, Je = (ct = Z == null ? void 0 : Z.order) != null ? ct : 999;
              return Te - Je;
            });
          } else
            h.forEach((p, q) => {
              const w = r.value.columns.findIndex((D) => D.key === p.key);
              w !== -1 && (r.value.columns[w].hidden = p.hidden, r.value.columns[w].pinned = p.pinned || !1);
            });
        } catch (h) {
          console.warn("Error loading column order from localStorage:", h);
        }
    }
    Ye(() => {
      document.removeEventListener("inertia:success", Ce), z && (z.disconnect(), z = null);
    });
    function lt(c) {
      r.value.sort == c ? r.value.sort = `-${c}` : r.value.sort = c, r.value.cursor = null, r.value.page = 1;
    }
    function De(c) {
      const h = P("columns", c);
      return !r.value.columns[h].hidden;
    }
    function Ge(c) {
      const h = P("columns", c), p = dr(r.value.columns[h]);
      p.onSort = lt, p.filters = r.value.filters.filter(
        (w) => w.key === c || w.key.startsWith(c + "_") || w.key.includes(c)
      );
      const q = r.value.searchInputs.filter(
        (w) => w.key === c
      );
      return q.length > 0 ? (p.searchable = !0, p.searchInputs = q) : (p.searchable = !1, p.searchInputs = []), p.onFilterChange = oe, p.onSearchChange = ue, p.color = t.color, p;
    }
    function Bt() {
      t.resource.data.forEach((c) => {
        c.__itSelected = _.value;
      });
    }
    function Vt(c) {
      if (!t.resizeableColumns || !l)
        return "auto";
      const h = l.getColumnWidth(c);
      return h === "auto" ? h : `${h}px`;
    }
    function st(c) {
      if (!t.resizeableColumns || !l)
        return "0px";
      let h = 0;
      const p = r.value.columns.filter((q) => !q.hidden);
      t.hasCheckboxes && (h += 60);
      for (const q of p) {
        if (q.key === c)
          break;
        if (q.pinned) {
          const w = l.getColumnWidth(q.key);
          h += w === "auto" ? 150 : w;
        }
      }
      return `${h}px`;
    }
    function at(c) {
      const h = r.value.columns.find((p) => p.key === c);
      return h && h.pinned;
    }
    function Wt(c) {
      return at(c) ? {
        position: "sticky",
        left: st(c),
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function Dt(c) {
      return at(c) ? {
        position: "sticky",
        left: st(c),
        zIndex: 11,
        backgroundColor: "#f9fafb",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const Gt = A(() => {
      if (!t.resizeableColumns || !l)
        return "100%";
      let c = 0, h = !1;
      return t.hasCheckboxes && (c += 60), i.value.columns.forEach((p) => {
        if (!De(p.key))
          return;
        const q = l.getColumnWidth(p.key);
        q === "auto" ? h = !0 : c += q;
      }), !h && c > 0 ? `${c}px` : "max(100%, " + (c > 0 ? c + "px" : "800px") + ")";
    }), it = A(() => t.resource.data.filter((c) => c.__itSelected).length), Ut = A(() => it.value === 0 ? o.noLineSelected : `${it.value} ${o.lineSelected}`);
    function Ht() {
      t.resizeableColumns && (u.value = !0);
    }
    function Kt() {
      t.resizeableColumns && setTimeout(() => {
        u.value = !1;
      }, 100);
    }
    return (c, h) => (f(), E(tr, null, {
      default: H(() => [
        (f(), v("fieldset", {
          ref_key: "tableFieldset",
          ref: m,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: O(["min-w-0", { "opacity-75": ze.value }])
        }, [
          a("div", is, [
            i.value.globalSearch ? (f(), v("div", us, [
              B(c.$slots, "tableGlobalSearch", {
                hasGlobalSearch: i.value.globalSearch,
                label: i.value.globalSearch ? i.value.globalSearch.label : null,
                value: i.value.globalSearch ? i.value.globalSearch.value : null,
                onChange: ce
              }, () => [
                i.value.globalSearch ? (f(), E(Bl, {
                  key: 0,
                  class: "grow",
                  label: i.value.globalSearch.label,
                  value: i.value.globalSearch.value,
                  "on-change": ce,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : C("", !0)
              ], !0)
            ])) : C("", !0),
            a("div", null, [
              B(c.$slots, "tableFilter", {
                hasFilters: i.value.hasFilters,
                hasEnabledFilters: i.value.hasEnabledFilters,
                filters: i.value.filters,
                onFilterChange: oe
              }, () => [
                i.value.hasFilters ? (f(), E(Al, {
                  key: 0,
                  "has-enabled-filters": i.value.hasEnabledFilters,
                  filters: i.value.filters,
                  "on-filter-change": oe,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : C("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? B(c.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: i.value.hasSearchInputs,
              hasSearchInputsWithoutValue: i.value.hasSearchInputsWithoutValue,
              searchInputs: i.value.searchInputsWithoutGlobal,
              onAdd: F
            }, () => [
              i.value.hasSearchInputs ? (f(), E(vl, {
                key: 0,
                "search-inputs": i.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": i.value.hasSearchInputsWithoutValue,
                "on-add": F,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : C("", !0)
            ], !0) : C("", !0),
            e.withGroupedMenu ? C("", !0) : B(c.$slots, "tableColumns", {
              key: 2,
              hasColumns: i.value.hasToggleableColumns,
              columns: r.value.columns,
              hasHiddenColumns: i.value.hasHiddenColumns,
              onChange: Se
            }, () => [
              i.value.hasToggleableColumns ? (f(), E(zl, {
                key: 0,
                columns: r.value.columns,
                "has-hidden-columns": i.value.hasHiddenColumns,
                "on-change": Se,
                "table-name": e.name,
                color: e.color
              }, null, 8, ["columns", "has-hidden-columns", "table-name", "color"])) : C("", !0)
            ], !0),
            e.withGroupedMenu ? B(c.$slots, "groupedAction", {
              key: 3,
              actions: W.value
            }, () => [
              te(ls, {
                color: e.color,
                actions: W.value
              }, {
                default: H(() => [
                  B(c.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : C("", !0),
            e.withGroupedMenu ? C("", !0) : B(c.$slots, "tableReset", {
              key: 4,
              canBeReset: re.value,
              onClick: ve
            }, () => [
              re.value ? (f(), v("div", cs, [
                te(Kl, {
                  "on-click": ve,
                  color: e.color
                }, null, 8, ["color"])
              ])) : C("", !0)
            ], !0),
            e.showExportButton ? B(c.$slots, "exportButton", {
              key: 5,
              exportUrl: pe.value,
              translations: R(o)
            }, () => [
              a("a", {
                href: pe.value,
                class: "relative flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              }, [...h[3] || (h[3] = [
                a("svg", {
                  class: "h-5 w-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1)
              ])], 8, ds)
            ], !0) : C("", !0)
          ]),
          e.hideSearchInputsAboveTable ? C("", !0) : B(c.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: i.value.hasSearchInputsWithValue,
            searchInputs: i.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: b.value,
            onChange: ue
          }, () => [
            i.value.hasSearchInputsWithValue || b.value.length > 0 ? (f(), E(Hl, {
              key: 0,
              "search-inputs": i.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": b.value,
              "on-change": ue,
              "on-remove": ee,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : C("", !0)
          ], !0),
          B(c.$slots, "tableWrapper", { meta: L.value }, () => [
            te(ts, {
              class: O({ "mt-3": !$.value })
            }, {
              default: H(() => [
                B(c.$slots, "table", {}, () => [
                  a("div", fs, [
                    a("table", {
                      class: O(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && u.value }]),
                      style: fe([{ "table-layout": "fixed", "min-width": "100%" }, { width: Gt.value }]),
                      onMouseenter: h[1] || (h[1] = (p) => e.resizeableColumns ? Ht : null),
                      onMouseleave: h[2] || (h[2] = (p) => e.resizeableColumns ? Kt : null)
                    }, [
                      a("thead", ms, [
                        B(c.$slots, "head", {
                          show: De,
                          sortBy: lt,
                          header: Ge
                        }, () => [
                          a("tr", null, [
                            e.hasCheckboxes ? (f(), v("th", hs, [
                              Y(a("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: Bt,
                                "onUpdate:modelValue": h[0] || (h[0] = (p) => _.value = p),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, gs), [
                                [ft, _.value]
                              ])
                            ])) : C("", !0),
                            (f(!0), v(le, null, se(r.value.columns, (p) => (f(), E(Jn, {
                              cell: Ge(p.key),
                              style: fe(Dt(p.key))
                            }, {
                              label: H(() => [
                                B(c.$slots, `header(${p.key})`, {
                                  label: Ge(p.key).label,
                                  column: Ge(p.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      a("tbody", ps, [
                        B(c.$slots, "body", { show: De }, () => [
                          (f(!0), v(le, null, se(I.value, (p, q) => (f(), v("tr", {
                            key: `table-${e.name}-row-${q}`,
                            class: O($e(p, q))
                          }, [
                            e.hasCheckboxes ? (f(), v("td", vs, [
                              Y(a("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${q}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (w) => p.__itSelected = w
                              }, null, 8, bs), [
                                [ft, p.__itSelected]
                              ])
                            ])) : C("", !0),
                            (f(!0), v(le, null, se(r.value.columns, (w, D) => Y((f(), v("td", {
                              key: `table-${e.name}-row-${q}-column-${w.key}`,
                              onClick: (Z) => qe(Z, p, w.key),
                              class: O(w.body_class),
                              "data-column-key": w.key,
                              style: fe({
                                width: Vt(w.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...Wt(w.key)
                              })
                            }, [
                              B(c.$slots, `cell(${w.key})`, { item: p }, () => [
                                me(k(p[w.key]), 1)
                              ], !0)
                            ], 14, ys)), [
                              [xe, De(w.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                a("div", {
                  ref_key: "intersectElement",
                  ref: x,
                  style: { height: "1px", width: "100%" }
                }, null, 512),
                i.value.infiniteScrolling ? C("", !0) : B(c.$slots, "pagination", {
                  key: 0,
                  onClick: J,
                  hasData: U.value,
                  meta: L.value,
                  perPageOptions: i.value.perPageOptions,
                  onPerPageChange: ie,
                  showExportButton: e.showExportButton
                }, () => [
                  a("div", xs, [
                    e.hasCheckboxes ? (f(), v("span", ws, k(Ut.value), 1)) : C("", !0),
                    te(hl, {
                      "on-click": J,
                      "has-data": U.value,
                      meta: L.value,
                      "per-page-options": i.value.perPageOptions,
                      "on-per-page-change": ie,
                      color: e.color,
                      "show-export-button": e.showExportButton
                    }, {
                      exportButton: H((p) => [
                        B(c.$slots, "exportButton", rr(or(p)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button"])
                  ])
                ], !0),
                i.value.infiniteScrolling && y.value ? (f(), v("div", ks, [...h[4] || (h[4] = [
                  a("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" }, null, -1)
                ])])) : C("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, as))
      ]),
      _: 3
    }));
  }
}, Ws = /* @__PURE__ */ je(Cs, [["__scopeId", "data-v-9cfb7fe6"]]);
export {
  Qe as ButtonWithDropdown,
  Jn as HeaderCell,
  br as OnClickOutside,
  hl as Pagination,
  Ws as Table,
  vl as TableAddSearchRow,
  zl as TableColumns,
  Al as TableFilter,
  Bl as TableGlobalSearch,
  Kl as TableReset,
  Hl as TableSearchRows,
  ts as TableWrapper,
  we as getTranslations,
  Bs as setTranslation,
  Vs as setTranslations
};
