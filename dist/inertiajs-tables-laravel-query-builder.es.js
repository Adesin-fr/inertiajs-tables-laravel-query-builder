import { ref as F, onMounted as ge, onBeforeUnmount as pt, openBlock as d, createElementBlock as m, renderSlot as B, watch as Ce, inject as te, createBlock as V, withCtx as U, createElementVNode as n, normalizeClass as M, withModifiers as K, withDirectives as D, vShow as ne, createStaticVNode as vt, normalizeStyle as se, toDisplayString as b, createCommentVNode as w, createTextVNode as ae, computed as O, unref as N, vModelSelect as Je, vModelText as we, onUnmounted as je, Teleport as Pe, Fragment as H, renderList as X, createVNode as re, withKeys as De, nextTick as Ze, resolveDynamicComponent as xe, reactive as bt, getCurrentInstance as yt, provide as xt, Transition as wt, vModelCheckbox as Ke, normalizeProps as kt, guardReactiveProps as Ct } from "vue";
import { createPopper as _t } from "@popperjs/core/lib/popper-lite";
import $t from "@popperjs/core/lib/modifiers/preventOverflow";
import St from "@popperjs/core/lib/modifiers/flip";
import Mt from "lodash-es/uniq";
import { usePage as He, router as zt } from "@inertiajs/vue3";
import qt from "lodash-es/find";
import Ae from "qs";
import Tt from "lodash-es/clone";
import It from "lodash-es/filter";
import Nt from "lodash-es/findKey";
import ie from "lodash-es/forEach";
import Ft from "lodash-es/isEqual";
import Pt from "lodash-es/map";
import jt from "lodash-es/pickBy";
const Ot = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const o = e, r = F(null), i = F(null);
    return ge(() => {
      r.value = (l) => {
        l.target === i.value || i.value.contains(l.target) || o.do();
      }, document.addEventListener("click", r.value), document.addEventListener("touchstart", r.value);
    }), pt(() => {
      document.removeEventListener("click", r.value), document.removeEventListener("touchstart", r.value);
    }), (l, t) => (d(), m("div", {
      ref_key: "root",
      ref: i
    }, [
      B(l.$slots, "default")
    ], 512));
  }
}, Ve = "-", Rt = (e) => {
  const o = Lt(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (a) => {
      const c = a.split(Ve);
      return c[0] === "" && c.length !== 1 && c.shift(), et(c, o) || At(a);
    },
    getConflictingClassGroupIds: (a, c) => {
      const s = r[a] || [];
      return c && i[a] ? [...s, ...i[a]] : s;
    }
  };
}, et = (e, o) => {
  var a;
  if (e.length === 0)
    return o.classGroupId;
  const r = e[0], i = o.nextPart.get(r), l = i ? et(e.slice(1), i) : void 0;
  if (l)
    return l;
  if (o.validators.length === 0)
    return;
  const t = e.join(Ve);
  return (a = o.validators.find(({
    validator: c
  }) => c(t))) == null ? void 0 : a.classGroupId;
}, Xe = /^\[(.+)\]$/, At = (e) => {
  if (Xe.test(e)) {
    const o = Xe.exec(e)[1], r = o == null ? void 0 : o.substring(0, o.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, Lt = (e) => {
  const {
    theme: o,
    prefix: r
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Vt(Object.entries(e.classGroups), r).forEach(([t, a]) => {
    Be(a, i, t, o);
  }), i;
}, Be = (e, o, r, i) => {
  e.forEach((l) => {
    if (typeof l == "string") {
      const t = l === "" ? o : Qe(o, l);
      t.classGroupId = r;
      return;
    }
    if (typeof l == "function") {
      if (Bt(l)) {
        Be(l(i), o, r, i);
        return;
      }
      o.validators.push({
        validator: l,
        classGroupId: r
      });
      return;
    }
    Object.entries(l).forEach(([t, a]) => {
      Be(a, Qe(o, t), r, i);
    });
  });
}, Qe = (e, o) => {
  let r = e;
  return o.split(Ve).forEach((i) => {
    r.nextPart.has(i) || r.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(i);
  }), r;
}, Bt = (e) => e.isThemeGetter, Vt = (e, o) => o ? e.map(([r, i]) => {
  const l = i.map((t) => typeof t == "string" ? o + t : typeof t == "object" ? Object.fromEntries(Object.entries(t).map(([a, c]) => [o + a, c])) : t);
  return [r, l];
}) : e, Et = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const l = (t, a) => {
    r.set(t, a), o++, o > e && (o = 0, i = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(t) {
      let a = r.get(t);
      if (a !== void 0)
        return a;
      if ((a = i.get(t)) !== void 0)
        return l(t, a), a;
    },
    set(t, a) {
      r.has(t) ? r.set(t, a) : l(t, a);
    }
  };
}, tt = "!", Wt = (e) => {
  const {
    separator: o,
    experimentalParseClassName: r
  } = e, i = o.length === 1, l = o[0], t = o.length, a = (c) => {
    const s = [];
    let u = 0, f = 0, k;
    for (let p = 0; p < c.length; p++) {
      let q = c[p];
      if (u === 0) {
        if (q === l && (i || c.slice(p, p + t) === o)) {
          s.push(c.slice(f, p)), f = p + t;
          continue;
        }
        if (q === "/") {
          k = p;
          continue;
        }
      }
      q === "[" ? u++ : q === "]" && u--;
    }
    const g = s.length === 0 ? c : c.substring(f), z = g.startsWith(tt), y = z ? g.substring(1) : g, $ = k && k > f ? k - f : void 0;
    return {
      modifiers: s,
      hasImportantModifier: z,
      baseClassName: y,
      maybePostfixModifierPosition: $
    };
  };
  return r ? (c) => r({
    className: c,
    parseClassName: a
  }) : a;
}, Gt = (e) => {
  if (e.length <= 1)
    return e;
  const o = [];
  let r = [];
  return e.forEach((i) => {
    i[0] === "[" ? (o.push(...r.sort(), i), r = []) : r.push(i);
  }), o.push(...r.sort()), o;
}, Ut = (e) => ({
  cache: Et(e.cacheSize),
  parseClassName: Wt(e),
  ...Rt(e)
}), Dt = /\s+/, Kt = (e, o) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: l
  } = o, t = [], a = e.trim().split(Dt);
  let c = "";
  for (let s = a.length - 1; s >= 0; s -= 1) {
    const u = a[s], {
      modifiers: f,
      hasImportantModifier: k,
      baseClassName: g,
      maybePostfixModifierPosition: z
    } = r(u);
    let y = Boolean(z), $ = i(y ? g.substring(0, z) : g);
    if (!$) {
      if (!y) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if ($ = i(g), !$) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const p = Gt(f).join(":"), q = k ? p + tt : p, P = q + $;
    if (t.includes(P))
      continue;
    t.push(P);
    const C = l($, y);
    for (let T = 0; T < C.length; ++T) {
      const S = C[T];
      t.push(q + S);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Ht() {
  let e = 0, o, r, i = "";
  for (; e < arguments.length; )
    (o = arguments[e++]) && (r = rt(o)) && (i && (i += " "), i += r);
  return i;
}
const rt = (e) => {
  if (typeof e == "string")
    return e;
  let o, r = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (o = rt(e[i])) && (r && (r += " "), r += o);
  return r;
};
function Xt(e, ...o) {
  let r, i, l, t = a;
  function a(s) {
    const u = o.reduce((f, k) => k(f), e());
    return r = Ut(u), i = r.cache.get, l = r.cache.set, t = c, c(s);
  }
  function c(s) {
    const u = i(s);
    if (u)
      return u;
    const f = Kt(s, r);
    return l(s, f), f;
  }
  return function() {
    return t(Ht.apply(null, arguments));
  };
}
const E = (e) => {
  const o = (r) => r[e] || [];
  return o.isThemeGetter = !0, o;
}, ot = /^\[(?:([a-z-]+):)?(.+)\]$/i, Qt = /^\d+\/\d+$/, Yt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Jt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Zt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, er = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, tr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, rr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ue = (e) => ke(e) || Yt.has(e) || Qt.test(e), he = (e) => _e(e, "length", cr), ke = (e) => Boolean(e) && !Number.isNaN(Number(e)), Le = (e) => _e(e, "number", ke), $e = (e) => Boolean(e) && Number.isInteger(Number(e)), or = (e) => e.endsWith("%") && ke(e.slice(0, -1)), I = (e) => ot.test(e), me = (e) => Jt.test(e), lr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), nr = (e) => _e(e, lr, lt), sr = (e) => _e(e, "position", lt), ar = /* @__PURE__ */ new Set(["image", "url"]), ir = (e) => _e(e, ar, fr), ur = (e) => _e(e, "", dr), Se = () => !0, _e = (e, o, r) => {
  const i = ot.exec(e);
  return i ? i[1] ? typeof o == "string" ? i[1] === o : o.has(i[1]) : r(i[2]) : !1;
}, cr = (e) => Zt.test(e) && !er.test(e), lt = () => !1, dr = (e) => tr.test(e), fr = (e) => rr.test(e), hr = () => {
  const e = E("colors"), o = E("spacing"), r = E("blur"), i = E("brightness"), l = E("borderColor"), t = E("borderRadius"), a = E("borderSpacing"), c = E("borderWidth"), s = E("contrast"), u = E("grayscale"), f = E("hueRotate"), k = E("invert"), g = E("gap"), z = E("gradientColorStops"), y = E("gradientColorStopPositions"), $ = E("inset"), p = E("margin"), q = E("opacity"), P = E("padding"), C = E("saturate"), T = E("scale"), S = E("sepia"), A = E("skew"), G = E("space"), Q = E("translate"), oe = () => ["auto", "contain", "none"], ce = () => ["auto", "hidden", "clip", "visible", "scroll"], le = () => ["auto", I, o], L = () => [I, o], de = () => ["", ue, he], fe = () => ["auto", ke, I], qe = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], ve = () => ["solid", "dashed", "dotted", "double", "none"], Te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], be = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], pe = () => ["", "0", I], ye = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Y = () => [ke, I];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Se],
      spacing: [ue, he],
      blur: ["none", "", me, I],
      brightness: Y(),
      borderColor: [e],
      borderRadius: ["none", "", "full", me, I],
      borderSpacing: L(),
      borderWidth: de(),
      contrast: Y(),
      grayscale: pe(),
      hueRotate: Y(),
      invert: pe(),
      gap: L(),
      gradientColorStops: [e],
      gradientColorStopPositions: [or, he],
      inset: le(),
      margin: le(),
      opacity: Y(),
      padding: L(),
      saturate: Y(),
      scale: Y(),
      sepia: pe(),
      skew: Y(),
      space: L(),
      translate: L()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", I]
      }],
      container: ["container"],
      columns: [{
        columns: [me]
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
        object: [...qe(), I]
      }],
      overflow: [{
        overflow: ce()
      }],
      "overflow-x": [{
        "overflow-x": ce()
      }],
      "overflow-y": [{
        "overflow-y": ce()
      }],
      overscroll: [{
        overscroll: oe()
      }],
      "overscroll-x": [{
        "overscroll-x": oe()
      }],
      "overscroll-y": [{
        "overscroll-y": oe()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [$]
      }],
      "inset-x": [{
        "inset-x": [$]
      }],
      "inset-y": [{
        "inset-y": [$]
      }],
      start: [{
        start: [$]
      }],
      end: [{
        end: [$]
      }],
      top: [{
        top: [$]
      }],
      right: [{
        right: [$]
      }],
      bottom: [{
        bottom: [$]
      }],
      left: [{
        left: [$]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", $e, I]
      }],
      basis: [{
        basis: le()
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
        "col-start": fe()
      }],
      "col-end": [{
        "col-end": fe()
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
        "row-start": fe()
      }],
      "row-end": [{
        "row-end": fe()
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
        gap: [g]
      }],
      "gap-x": [{
        "gap-x": [g]
      }],
      "gap-y": [{
        "gap-y": [g]
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
        p: [P]
      }],
      px: [{
        px: [P]
      }],
      py: [{
        py: [P]
      }],
      ps: [{
        ps: [P]
      }],
      pe: [{
        pe: [P]
      }],
      pt: [{
        pt: [P]
      }],
      pr: [{
        pr: [P]
      }],
      pb: [{
        pb: [P]
      }],
      pl: [{
        pl: [P]
      }],
      m: [{
        m: [p]
      }],
      mx: [{
        mx: [p]
      }],
      my: [{
        my: [p]
      }],
      ms: [{
        ms: [p]
      }],
      me: [{
        me: [p]
      }],
      mt: [{
        mt: [p]
      }],
      mr: [{
        mr: [p]
      }],
      mb: [{
        mb: [p]
      }],
      ml: [{
        ml: [p]
      }],
      "space-x": [{
        "space-x": [G]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [G]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", I, o]
      }],
      "min-w": [{
        "min-w": [I, o, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [I, o, "none", "full", "min", "max", "fit", "prose", {
          screen: [me]
        }, me]
      }],
      h: [{
        h: [I, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [I, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [I, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [I, o, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", me, he]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Le]
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
        "line-clamp": ["none", ke, Le]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ue, I]
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
        "placeholder-opacity": [q]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [q]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...ve(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ue, he]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", ue, I]
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
        "bg-opacity": [q]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...qe(), sr]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", nr]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ir]
      }],
      "bg-color": [{
        bg: [e]
      }],
      "gradient-from-pos": [{
        from: [y]
      }],
      "gradient-via-pos": [{
        via: [y]
      }],
      "gradient-to-pos": [{
        to: [y]
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
        "border-opacity": [q]
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
        "divide-opacity": [q]
      }],
      "divide-style": [{
        divide: ve()
      }],
      "border-color": [{
        border: [l]
      }],
      "border-color-x": [{
        "border-x": [l]
      }],
      "border-color-y": [{
        "border-y": [l]
      }],
      "border-color-t": [{
        "border-t": [l]
      }],
      "border-color-r": [{
        "border-r": [l]
      }],
      "border-color-b": [{
        "border-b": [l]
      }],
      "border-color-l": [{
        "border-l": [l]
      }],
      "divide-color": [{
        divide: [l]
      }],
      "outline-style": [{
        outline: ["", ...ve()]
      }],
      "outline-offset": [{
        "outline-offset": [ue, I]
      }],
      "outline-w": [{
        outline: [ue, he]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: de()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [q]
      }],
      "ring-offset-w": [{
        "ring-offset": [ue, he]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", me, ur]
      }],
      "shadow-color": [{
        shadow: [Se]
      }],
      opacity: [{
        opacity: [q]
      }],
      "mix-blend": [{
        "mix-blend": [...Te(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": Te()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [r]
      }],
      brightness: [{
        brightness: [i]
      }],
      contrast: [{
        contrast: [s]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", me, I]
      }],
      grayscale: [{
        grayscale: [u]
      }],
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      invert: [{
        invert: [k]
      }],
      saturate: [{
        saturate: [C]
      }],
      sepia: [{
        sepia: [S]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [r]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [i]
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
        "backdrop-invert": [k]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [q]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [C]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [a]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [a]
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
        scale: [T]
      }],
      "scale-x": [{
        "scale-x": [T]
      }],
      "scale-y": [{
        "scale-y": [T]
      }],
      rotate: [{
        rotate: [$e, I]
      }],
      "translate-x": [{
        "translate-x": [Q]
      }],
      "translate-y": [{
        "translate-y": [Q]
      }],
      "skew-x": [{
        "skew-x": [A]
      }],
      "skew-y": [{
        "skew-y": [A]
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
        "will-change": ["auto", "scroll", "contents", "transform", I]
      }],
      fill: [{
        fill: [e, "none"]
      }],
      "stroke-w": [{
        stroke: [ue, he, Le]
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
}, Z = /* @__PURE__ */ Xt(hr);
function W(e, o, r, i) {
  let l = o ? { ...o } : {}, t = null, a = r ? { ...r } : {}, c = null, s = i ? { ...i } : {}, u = null;
  for (const f of e)
    t === null && f in l && (l = l[f], typeof l == "string" && (t = l)), c === null && f in a && (a = a[f], typeof a == "string" && (c = a)), u === null && f in s && (s = s[f], typeof s == "string" && (u = s));
  return Z(t, c, u);
}
const mr = { class: "relative" }, gr = ["dusk", "disabled"], pr = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, Oe = {
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
  setup(e, { expose: o, emit: r }) {
    const i = r, l = e, t = F(!1), a = F(null);
    function c() {
      t.value = !t.value;
    }
    function s() {
      t.value = !1;
    }
    Ce(t, () => {
      a.value.update(), t.value || i("closed"), t.value && i("opened");
    });
    const u = F(null), f = F(null);
    ge(() => {
      a.value = _t(u.value, f.value, {
        placement: l.placement,
        modifiers: [St, $t]
      });
    }), o({ hide: s });
    const k = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, g = te("themeVariables"), z = (y) => {
      var p, q;
      let $ = "";
      return y === "button" && l.disabled && ($ = "cursor-not-allowed"), Z(
        $,
        W([y, "base"], k, (p = g == null ? void 0 : g.inertia_table) == null ? void 0 : p.button_with_dropdown, l.ui),
        W([y, "color", l.color], k, (q = g == null ? void 0 : g.inertia_table) == null ? void 0 : q.button_with_dropdown, l.ui)
      );
    };
    return (y, $) => (d(), V(Ot, { do: s }, {
      default: U(() => [
        n("div", mr, [
          n("button", {
            ref_key: "button",
            ref: u,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: M(z("button")),
            "aria-haspopup": "true",
            onClick: K(c, ["prevent"])
          }, [
            B(y.$slots, "button")
          ], 10, gr),
          D(n("div", {
            ref_key: "tooltip",
            ref: f,
            class: "absolute z-10"
          }, [
            n("div", pr, [
              B(y.$slots, "default")
            ])
          ], 512), [
            [ne, t.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const Me = (e, o) => {
  const r = e.__vccOpts || e;
  for (const [i, l] of o)
    r[i] = l;
  return r;
}, vr = {
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
    const o = e, r = (i) => {
      o.onResize(i, o.columnKey);
    };
    return (i, l) => (d(), m("div", {
      class: M(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: r
    }, l[0] || (l[0] = [
      vt('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ]), 34));
  }
}, br = /* @__PURE__ */ Me(vr, [["__scopeId", "data-v-672a9339"]]), yr = { class: "w-full flex gap-2 justify-between items-center" }, xr = { class: "relative inline-flex items-center cursor-pointer" }, wr = ["checked"], nt = {
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
    const o = e, r = {
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
    }, i = te("themeVariables"), l = (t) => {
      var c, s, u, f;
      let a = o.color;
      return t === "toggle" && o.filter.value === null && (a = "disabled"), Z(
        W([t, "base"], r, (s = (c = i == null ? void 0 : i.inertia_table) == null ? void 0 : c.table_filter) == null ? void 0 : s.toggle_filter, o.ui),
        W([t, "color", a], r, (f = (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : f.toggle_filter, o.ui)
      );
    };
    return (t, a) => (d(), m("div", yr, [
      n("label", xr, [
        n("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: a[0] || (a[0] = (c) => e.onFilterChange(e.filter.key, c.target.checked ? "1" : "0"))
        }, null, 40, wr),
        n("div", {
          class: M(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", l("toggle")])
        }, null, 2)
      ]),
      n("button", {
        class: M(l("reset_button")),
        onClick: a[1] || (a[1] = K((c) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, a[2] || (a[2] = [
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
}, kr = {
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
      const o = this.getTheme("button"), r = /h-(\d+)/, i = o.match(r), l = 4;
      let t = null;
      return i && 1 in i ? t = i[1] : t = l, e ? `margin-top: ${(t - l + 12) * 0.25}rem` : `margin-top: -${((t - l) / 2 + 9) * 0.25}rem`;
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
      let i = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), l = Number(Math.round(i / this.step) * this.step).toFixed(2);
      l >= this.min && l <= this.max && (this.moveMin && l !== this.currentMinValue && l <= this.currentMaxValue && (this.internalValue = [l, this.currentMaxValue]), this.moveMax && l !== this.currentMaxValue && l >= this.currentMinValue && (this.internalValue = [this.currentMinValue, l])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var o, r, i, l, t, a;
      return Z(
        W([e, "base"], this.fallbackTheme, (i = (r = (o = this.themeVariables) == null ? void 0 : o.inertia_table) == null ? void 0 : r.table_filter) == null ? void 0 : i.number_range_filter, this.ui),
        W([e, "color", this.color], this.fallbackTheme, (a = (t = (l = this.themeVariables) == null ? void 0 : l.inertia_table) == null ? void 0 : t.table_filter) == null ? void 0 : a.number_range_filter, this.ui)
      );
    }
  }
}, Cr = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, _r = { class: "py-1 relative min-w-full" }, $r = { class: "z-40" }, Sr = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Mr = { key: 0 }, zr = { key: 1 }, qr = { class: "z-40" }, Tr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Ir = { key: 0 }, Nr = { key: 1 }, Fr = { draggable: "true" }, Pr = { key: 0 }, jr = { key: 1 }, Or = { key: 0 }, Rr = { key: 1 };
function Ar(e, o, r, i, l, t) {
  var a, c, s, u;
  return d(), m("div", Cr, [
    n("div", _r, [
      n("div", {
        class: M(t.getTheme("main_bar"))
      }, [
        n("div", {
          class: M(["absolute", t.getTheme("selected_bar")]),
          style: se(`width: ${t.rangeWidth}% !important; left: ${t.currentMinValueInPercent}% !important;`)
        }, null, 6),
        n("div", {
          class: M([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: se(`left: ${t.currentMinValueInPercent}%;`),
          onMousedown: o[0] || (o[0] = (f) => t.handleMouseDown(f, !0))
        }, [
          n("div", $r, [
            n("div", Sr, [
              n("div", {
                class: M(t.getTheme("popover")),
                style: se(t.getMarginTop(l.hasOverlap && t.displayFirstDown))
              }, [
                r.prefix ? (d(), m("span", Mr, b(r.prefix), 1)) : w("", !0),
                ae(" " + b((a = t.currentMinValue) != null ? a : 0) + " ", 1),
                r.suffix ? (d(), m("span", zr, b(r.suffix), 1)) : w("", !0)
              ], 6),
              (d(), m("svg", {
                class: M(["absolute w-full h-2 left-0", [l.hasOverlap && t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, o[2] || (o[2] = [
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
          style: se(`left: ${t.currentMaxValueInPercent}%;`),
          onMousedown: o[1] || (o[1] = (f) => t.handleMouseDown(f, !1))
        }, [
          n("div", qr, [
            n("div", Tr, [
              n("div", {
                class: M(t.getTheme("popover")),
                style: se(t.getMarginTop(l.hasOverlap && !t.displayFirstDown))
              }, [
                r.prefix ? (d(), m("span", Ir, b(r.prefix), 1)) : w("", !0),
                ae(" " + b((c = t.currentMaxValue) != null ? c : 0) + " ", 1),
                r.suffix ? (d(), m("span", Nr, b(r.suffix), 1)) : w("", !0)
              ], 6),
              n("div", Fr, [
                (d(), m("svg", {
                  class: M(["absolute w-full h-2 left-0 top-100", [l.hasOverlap && !t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, o[3] || (o[3] = [
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
          r.prefix ? (d(), m("span", Pr, b(r.prefix), 1)) : w("", !0),
          ae(" " + b((s = r.min) != null ? s : 0) + " ", 1),
          r.suffix ? (d(), m("span", jr, b(r.suffix), 1)) : w("", !0)
        ], 2),
        n("div", {
          class: M(["absolute -mr-1 bottom-0 right-0 -mb-6", t.getTheme("text")])
        }, [
          r.prefix ? (d(), m("span", Or, b(r.prefix), 1)) : w("", !0),
          ae(" " + b((u = r.max) != null ? u : 0) + " ", 1),
          r.suffix ? (d(), m("span", Rr, b(r.suffix), 1)) : w("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const st = /* @__PURE__ */ Me(kr, [["render", Ar]]), Re = {
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
}, R = Re.translations;
function ze() {
  return Re.translations;
}
function Kn(e, o) {
  Re.translations[e] = o;
}
function Hn(e) {
  Re.translations = e;
}
const Lr = { class: "space-y-2" }, Br = { class: "block text-sm font-medium text-gray-700 mb-2" }, Vr = { value: "" }, Er = { value: "exact" }, Wr = { value: "before" }, Gr = { value: "after" }, Ur = { value: "between" }, Dr = {
  key: 0,
  class: "space-y-3"
}, Kr = { key: 0 }, Hr = { class: "block text-sm font-medium text-gray-700 mb-1" }, Xr = {
  key: 1,
  class: "space-y-3"
}, Qr = { class: "block text-sm font-medium text-gray-700 mb-1" }, Yr = { class: "block text-sm font-medium text-gray-700 mb-1" }, Jr = {
  key: 1,
  class: "flex justify-end"
}, Zr = { class: "sr-only" }, at = {
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
    const o = e, r = F(""), i = F(""), l = F(""), t = F(""), a = O(() => r.value !== "" && (r.value !== "between" && i.value || r.value === "between" && l.value && t.value));
    function c() {
      switch (r.value) {
        case "exact":
          return R.exact_date;
        case "before":
          return R.before_date;
        case "after":
          return R.after_date;
        default:
          return "Date";
      }
    }
    function s() {
      i.value = "", l.value = "", t.value = "", r.value === "" ? f() : u();
    }
    function u() {
      if (r.value === "")
        return;
      let y = null;
      switch (r.value) {
        case "exact":
        case "before":
        case "after":
          i.value && (y = {
            type: r.value,
            date: i.value
          });
          break;
        case "between":
          l.value && t.value && (y = {
            type: r.value,
            start_date: l.value,
            end_date: t.value
          });
          break;
      }
      o.onFilterChange(o.filter.key, y);
    }
    function f() {
      r.value = "", i.value = "", l.value = "", t.value = "", o.onFilterChange(o.filter.key, null);
    }
    ge(() => {
      if (o.filter.value) {
        const y = o.filter.value;
        y.type && (r.value = y.type, y.type === "between" ? (l.value = y.start_date || "", t.value = y.end_date || "") : i.value = y.date || "");
      }
    }), Ce(() => o.filter.value, (y) => {
      y ? y.type && (r.value = y.type, y.type === "between" ? (l.value = y.start_date || "", t.value = y.end_date || "") : i.value = y.date || "") : f();
    }, { deep: !0 });
    const k = {
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
    }, g = te("themeVariables"), z = (y) => {
      var $, p, q, P;
      return Z(
        W([y, "base"], k, (p = ($ = g == null ? void 0 : g.inertia_table) == null ? void 0 : $.table_filter) == null ? void 0 : p.date_filter, o.ui),
        W([y, "color", o.color], k, (P = (q = g == null ? void 0 : g.inertia_table) == null ? void 0 : q.table_filter) == null ? void 0 : P.date_filter, o.ui)
      );
    };
    return (y, $) => (d(), m("div", Lr, [
      n("div", null, [
        n("label", Br, b(N(R).filter_type), 1),
        D(n("select", {
          "onUpdate:modelValue": $[0] || ($[0] = (p) => r.value = p),
          class: M(z("select")),
          onChange: s
        }, [
          n("option", Vr, b(N(R).no_filter), 1),
          n("option", Er, b(N(R).exact_date), 1),
          n("option", Wr, b(N(R).before_date), 1),
          n("option", Gr, b(N(R).after_date), 1),
          n("option", Ur, b(N(R).date_range), 1)
        ], 34), [
          [Je, r.value]
        ])
      ]),
      r.value && r.value !== "" ? (d(), m("div", Dr, [
        ["exact", "before", "after"].includes(r.value) ? (d(), m("div", Kr, [
          n("label", Hr, b(c()), 1),
          D(n("input", {
            type: "date",
            "onUpdate:modelValue": $[1] || ($[1] = (p) => i.value = p),
            class: M(z("input")),
            onChange: u
          }, null, 34), [
            [we, i.value]
          ])
        ])) : w("", !0),
        r.value === "between" ? (d(), m("div", Xr, [
          n("div", null, [
            n("label", Qr, b(N(R).start_date), 1),
            D(n("input", {
              type: "date",
              "onUpdate:modelValue": $[2] || ($[2] = (p) => l.value = p),
              class: M(z("input")),
              onChange: u
            }, null, 34), [
              [we, l.value]
            ])
          ]),
          n("div", null, [
            n("label", Yr, b(N(R).end_date), 1),
            D(n("input", {
              type: "date",
              "onUpdate:modelValue": $[3] || ($[3] = (p) => t.value = p),
              class: M(z("input")),
              onChange: u
            }, null, 34), [
              [we, t.value]
            ])
          ])
        ])) : w("", !0)
      ])) : w("", !0),
      a.value ? (d(), m("div", Jr, [
        n("button", {
          type: "button",
          class: M(z("reset_button")),
          onClick: f
        }, [
          n("span", Zr, b(N(R).reset_filter), 1),
          $[4] || ($[4] = n("svg", {
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
      ])) : w("", !0)
    ]));
  }
}, eo = { class: "relative inline-block" }, to = ["dusk"], ro = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, oo = { class: "p-2" }, lo = ["name", "value", "onChange"], no = ["value"], so = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, ao = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, io = {
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
    const o = e, r = F(!1), i = F(null), l = F(null), t = F({ top: 0, left: 0 }), a = O(() => o.filters.filter((C) => C.key === o.columnKey || C.key.startsWith(o.columnKey + "_") || C.key.includes(o.columnKey))), c = O(() => a.value.some((C) => !g(C))), s = O(() => ({
      top: t.value.top + "px",
      left: t.value.left + "px"
    }));
    function u() {
      a.value.length > 0 && (r.value || f(), r.value = !r.value);
    }
    function f() {
      if (l.value) {
        const C = l.value.getBoundingClientRect();
        t.value = {
          top: C.bottom + window.scrollY + 4,
          left: C.right + window.scrollX - 300
        };
      }
    }
    function k() {
      r.value = !1;
    }
    function g(C) {
      if (C.value === null)
        return !0;
      switch (C.type) {
        case "number_range":
          return Number(Math.max(...C.value)) === Number(C.max) && Number(Math.min(...C.value)) === Number(C.min);
        case "select":
          return C.value === "";
        case "toggle":
          return !1;
        case "date":
          return !C.value || typeof C.value == "object" && !C.value.type;
        default:
          return !C.value;
      }
    }
    function z(C, T) {
      o.onFilterChange(C, T);
    }
    function y(C) {
      let T = C.value;
      C.value && (Number(Math.max(...C.value)) === Number(C.max) && Number(Math.min(...C.value)) === Number(C.min) ? T = null : Number(Math.min(...C.value)) === 0 && Number(Math.max(...C.value)) === 0 && (T = ["0", "0"])), o.onFilterChange(C.key, T);
    }
    const $ = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, p = te("themeVariables"), q = (C) => {
      var T, S, A, G;
      return Z(
        W([C, "base"], $, (S = (T = p == null ? void 0 : p.inertia_table) == null ? void 0 : T.table_filter) == null ? void 0 : S.select_filter, o.ui),
        W([C, "color", o.color], $, (G = (A = p == null ? void 0 : p.inertia_table) == null ? void 0 : A.table_filter) == null ? void 0 : G.select_filter, o.ui)
      );
    };
    function P(C) {
      i.value && !i.value.contains(C.target) && !C.target.closest(`[dusk="column-filter-${o.columnKey}"]`) && k();
    }
    return ge(() => {
      document.addEventListener("click", P);
    }), je(() => {
      document.removeEventListener("click", P);
    }), (C, T) => (d(), m("div", eo, [
      n("button", {
        ref_key: "buttonRef",
        ref: l,
        onClick: u,
        class: M([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": c.value,
            "text-gray-400 hover:text-gray-600": !c.value
          }
        ]),
        dusk: `column-filter-${e.columnKey}`
      }, T[1] || (T[1] = [
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
      ]), 10, to),
      (d(), V(Pe, { to: "body" }, [
        r.value ? (d(), m("div", {
          key: 0,
          ref_key: "dropdown",
          ref: i,
          class: "fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          style: se(s.value),
          onClick: T[0] || (T[0] = K(() => {
          }, ["stop"]))
        }, [
          (d(!0), m(H, null, X(a.value, (S) => (d(), m("div", {
            key: S.key
          }, [
            n("h3", ro, b(S.label), 1),
            n("div", oo, [
              S.type === "select" ? (d(), m("select", {
                key: 0,
                name: S.key,
                value: S.value,
                class: M(q("select")),
                onChange: (A) => z(S.key, A.target.value)
              }, [
                (d(!0), m(H, null, X(S.options, (A, G) => (d(), m("option", {
                  key: G,
                  value: G
                }, b(A), 9, no))), 128))
              ], 42, lo)) : w("", !0),
              S.type === "toggle" ? (d(), V(nt, {
                key: 1,
                filter: S,
                "on-filter-change": z,
                color: e.color
              }, null, 8, ["filter", "color"])) : w("", !0),
              S.type === "number_range" ? (d(), m("div", so, [
                re(st, {
                  modelValue: S.value,
                  "onUpdate:modelValue": [(A) => S.value = A, (A) => y(S)],
                  max: S.max,
                  min: S.min,
                  prefix: S.prefix,
                  suffix: S.suffix,
                  step: S.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : w("", !0),
              S.type === "date" ? (d(), m("div", ao, [
                re(at, {
                  filter: S,
                  "on-filter-change": z,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : w("", !0)
            ])
          ]))), 128))
        ], 4)) : w("", !0)
      ])),
      (d(), V(Pe, { to: "body" }, [
        r.value ? (d(), m("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: k
        })) : w("", !0)
      ]))
    ]));
  }
}, uo = { class: "relative inline-block" }, co = ["dusk"], fo = { class: "p-3" }, ho = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, mo = { class: "space-y-2" }, go = ["value", "placeholder"], po = {
  key: 0,
  class: "flex justify-end"
}, vo = { class: "sr-only" }, bo = {
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
    const o = e, r = F(!1), i = F(null), l = F(null), t = F(null), a = F({ top: 0, left: 0 }), c = O(() => o.searchInputs.find((T) => T.key === o.columnKey)), s = O(() => c.value && c.value.value || ""), u = O(() => s.value !== ""), f = O(() => ({
      top: a.value.top + "px",
      left: a.value.left + "px"
    }));
    async function k() {
      c.value && (r.value || g(), r.value = !r.value, r.value && (await Ze(), t.value && t.value.focus()));
    }
    function g() {
      if (l.value) {
        const T = l.value.getBoundingClientRect();
        a.value = {
          top: T.bottom + window.scrollY + 4,
          left: T.right + window.scrollX - 250
        };
      }
    }
    function z() {
      r.value = !1;
    }
    function y(T) {
      const S = T.target.value;
      $(S);
    }
    function $(T) {
      o.onSearchChange(o.columnKey, T);
    }
    const p = {
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
    }, q = te("themeVariables"), P = (T) => {
      var S, A, G, Q;
      return Z(
        W([T, "base"], p, (A = (S = q == null ? void 0 : q.inertia_table) == null ? void 0 : S.table_search) == null ? void 0 : A.column_search, o.ui),
        W([T, "color", o.color], p, (Q = (G = q == null ? void 0 : q.inertia_table) == null ? void 0 : G.table_search) == null ? void 0 : Q.column_search, o.ui)
      );
    };
    function C(T) {
      i.value && !i.value.contains(T.target) && !T.target.closest(`[dusk="column-search-${o.columnKey}"]`) && z();
    }
    return ge(() => {
      document.addEventListener("click", C);
    }), je(() => {
      document.removeEventListener("click", C);
    }), (T, S) => (d(), m("div", uo, [
      n("button", {
        ref_key: "buttonRef",
        ref: l,
        onClick: k,
        class: M([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": u.value,
            "text-gray-400 hover:text-gray-600": !u.value
          }
        ]),
        dusk: `column-search-${e.columnKey}`
      }, S[2] || (S[2] = [
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
      ]), 10, co),
      (d(), V(Pe, { to: "body" }, [
        r.value ? (d(), m("div", {
          key: 0,
          ref_key: "dropdown",
          ref: i,
          class: "fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          style: se(f.value),
          onClick: S[1] || (S[1] = K(() => {
          }, ["stop"]))
        }, [
          n("div", fo, [
            n("h3", ho, b(N(R).search) + " " + b(e.columnLabel), 1),
            n("div", mo, [
              n("input", {
                ref_key: "searchInput",
                ref: t,
                type: "text",
                value: s.value,
                class: M(P("input")),
                placeholder: `${N(R).search} ${e.columnLabel.toLowerCase()}...`,
                onInput: y,
                onKeydown: [
                  De(z, ["enter"]),
                  De(z, ["escape"])
                ]
              }, null, 42, go),
              s.value && s.value !== "" ? (d(), m("div", po, [
                n("button", {
                  type: "button",
                  class: M(P("reset_button")),
                  onClick: S[0] || (S[0] = (A) => $(""))
                }, [
                  n("span", vo, b(N(R).reset_search), 1),
                  S[3] || (S[3] = n("svg", {
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
              ])) : w("", !0)
            ])
          ])
        ], 4)) : w("", !0)
      ])),
      (d(), V(Pe, { to: "body" }, [
        r.value ? (d(), m("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: z
        })) : w("", !0)
      ]))
    ]));
  }
};
const yo = ["data-column-key"], xo = { class: "flex flex-row items-center justify-between w-full" }, wo = { class: "flex flex-row items-center" }, ko = { class: "uppercase" }, Co = ["sorted"], _o = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, $o = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, So = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Mo = { class: "flex items-center space-x-1" }, zo = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const o = e, r = te("columnResize", null), i = O(() => {
      if (!r)
        return "auto";
      const s = r.getColumnWidth(o.cell.key);
      return s === "auto" ? s : `${s}px`;
    }), l = O(() => (r == null ? void 0 : r.isResizing) || !1), t = O(() => (r == null ? void 0 : r.resizingColumn) || null);
    function a() {
      o.cell.sortable && o.cell.onSort(o.cell.key);
    }
    function c(s, u) {
      r && r.startResize(s, u);
    }
    return (s, u) => D((d(), m("th", {
      class: M(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: se({ width: i.value }),
      "data-column-key": e.cell.key
    }, [
      (d(), V(xe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: K(a, ["prevent"])
      }, {
        default: U(() => [
          n("span", xo, [
            n("span", wo, [
              B(s.$slots, "label", {}, () => [
                n("span", ko, b(e.cell.label), 1)
              ], !0),
              B(s.$slots, "sort", {}, () => [
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
                  e.cell.sorted ? w("", !0) : (d(), m("path", _o)),
                  e.cell.sorted === "asc" ? (d(), m("path", $o)) : w("", !0),
                  e.cell.sorted === "desc" ? (d(), m("path", So)) : w("", !0)
                ], 10, Co)) : w("", !0)
              ], !0)
            ]),
            n("span", Mo, [
              B(s.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (d(), V(bo, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  color: e.cell.color,
                  onClick: u[0] || (u[0] = K(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : w("", !0)
              ], !0),
              B(s.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (d(), V(io, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  color: e.cell.color,
                  onClick: u[1] || (u[1] = K(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : w("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && N(r) ? (d(), V(br, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": c,
        "is-active": l.value && t.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : w("", !0)
    ], 14, yo)), [
      [ne, !e.cell.hidden]
    ]);
  }
}, qo = /* @__PURE__ */ Me(zo, [["__scopeId", "data-v-8684dc95"]]), To = ["dusk", "value"], Io = ["value"], Ye = {
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
    const o = ze(), r = e, i = O(() => {
      let c = [...r.options];
      return c.push(parseInt(r.value)), Mt(c).sort((s, u) => s - u);
    }), l = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, t = te("themeVariables"), a = (c) => {
      var s, u;
      return Z(
        W([c, "base"], l, (s = t == null ? void 0 : t.inertia_table) == null ? void 0 : s.per_page_selector, r.ui),
        W([c, "color", r.color], l, (u = t == null ? void 0 : t.inertia_table) == null ? void 0 : u.per_page_selector, r.ui)
      );
    };
    return (c, s) => (d(), m("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: M(a("select")),
      onChange: s[0] || (s[0] = (u) => e.onChange(u.target.value))
    }, [
      (d(!0), m(H, null, X(i.value, (u) => (d(), m("option", {
        key: u,
        value: u
      }, b(u) + " " + b(N(o).per_page), 9, Io))), 128))
    ], 42, To));
  }
}, No = {
  key: 0,
  class: "bg-white flex items-center"
}, Fo = { key: 0 }, Po = { class: "hidden sm:inline ml-2" }, jo = { class: "hidden sm:inline mr-2" }, Oo = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, Ro = { class: "flex flex-row space-x-4 items-center grow" }, Ao = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, Lo = { class: "font-medium" }, Bo = { class: "font-medium" }, Vo = { class: "font-medium" }, Eo = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, Wo = { class: "sr-only" }, Go = { class: "sr-only" }, Uo = {
  key: 0,
  class: "ml-4"
}, Do = ["href"], Ko = {
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
    const o = ze(), r = e, i = O(() => "links" in t.value ? t.value.links.length > 0 : !1), l = O(() => Object.keys(t.value).length > 0), t = O(() => r.meta), a = O(() => "prev_page_url" in t.value ? t.value.prev_page_url : null), c = O(() => "next_page_url" in t.value ? t.value.next_page_url : null), s = O(() => parseInt(t.value.per_page));
    return (u, f) => l.value ? (d(), m("nav", No, [
      !e.hasData || t.value.total < 1 ? (d(), m("p", Fo, b(N(o).no_results_found), 1)) : w("", !0),
      e.hasData ? (d(), m("div", {
        key: 1,
        class: M(["flex-1 flex justify-between", { "sm:hidden": i.value }])
      }, [
        (d(), V(xe(a.value ? "a" : "div"), {
          class: M([{
            "cursor-not-allowed text-gray-400": !a.value,
            "text-gray-700 hover:text-gray-500": a.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: a.value,
          dusk: a.value ? "pagination-simple-previous" : null,
          onClick: f[0] || (f[0] = K((k) => e.onClick(a.value), ["prevent"]))
        }, {
          default: U(() => [
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
            n("span", Po, b(N(o).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        re(Ye, {
          dusk: "per-page-mobile",
          value: s.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (d(), V(xe(c.value ? "a" : "div"), {
          class: M([{
            "cursor-not-allowed text-gray-400": !c.value,
            "text-gray-700 hover:text-gray-500": c.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: c.value,
          dusk: c.value ? "pagination-simple-next" : null,
          onClick: f[1] || (f[1] = K((k) => e.onClick(c.value), ["prevent"]))
        }, {
          default: U(() => [
            n("span", jo, b(N(o).next), 1),
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
      ], 2)) : w("", !0),
      e.hasData && i.value ? (d(), m("div", Oo, [
        n("div", Ro, [
          re(Ye, {
            dusk: "per-page-full",
            value: s.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          n("p", Ao, [
            n("span", Lo, b(t.value.from), 1),
            ae(" " + b(N(o).to) + " ", 1),
            n("span", Bo, b(t.value.to), 1),
            ae(" " + b(N(o).of) + " ", 1),
            n("span", Vo, b(t.value.total), 1),
            ae(" " + b(N(o).results), 1)
          ])
        ]),
        n("div", null, [
          n("nav", Eo, [
            (d(), V(xe(a.value ? "a" : "div"), {
              class: M([{
                "cursor-not-allowed text-gray-400": !a.value,
                "text-gray-500 hover:bg-gray-50": a.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: a.value,
              dusk: a.value ? "pagination-previous" : null,
              onClick: f[2] || (f[2] = K((k) => e.onClick(a.value), ["prevent"]))
            }, {
              default: U(() => [
                n("span", Wo, b(N(o).previous), 1),
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
            (d(!0), m(H, null, X(t.value.links, (k, g) => (d(), m("div", { key: g }, [
              B(u.$slots, "link", {}, () => [
                !isNaN(k.label) || k.label === "..." ? (d(), V(xe(k.url ? "a" : "div"), {
                  key: 0,
                  href: k.url,
                  dusk: k.url ? `pagination-${k.label}` : null,
                  class: M(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !k.url,
                    "hover:bg-gray-50": k.url,
                    "bg-white": !k.active,
                    "bg-gray-100": k.active
                  }]),
                  onClick: K((z) => e.onClick(k.url), ["prevent"])
                }, {
                  default: U(() => [
                    ae(b(k.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : w("", !0)
              ])
            ]))), 128)),
            (d(), V(xe(c.value ? "a" : "div"), {
              class: M([{
                "cursor-not-allowed text-gray-400": !c.value,
                "text-gray-500 hover:bg-gray-50": c.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: c.value,
              dusk: c.value ? "pagination-next" : null,
              onClick: f[3] || (f[3] = K((k) => e.onClick(c.value), ["prevent"]))
            }, {
              default: U(() => [
                n("span", Go, b(N(o).next), 1),
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
        e.showExportButton ? (d(), m("div", Uo, [
          B(u.$slots, "exportButton", {
            exportUrl: e.exportUrl,
            translations: N(o)
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
              ae(" " + b(N(o).export_csv), 1)
            ], 8, Do)
          ])
        ])) : w("", !0)
      ])) : w("", !0)
    ])) : w("", !0);
  }
}, Ho = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, Xo = ["dusk", "onClick"], Qo = {
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
    const o = e, r = F(null);
    function i(l) {
      o.onAdd(l), r.value.hide();
    }
    return (l, t) => (d(), V(Oe, {
      ref_key: "dropdown",
      ref: r,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: U(() => t[0] || (t[0] = [
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
      default: U(() => [
        n("div", Ho, [
          (d(!0), m(H, null, X(e.searchInputs, (a, c) => (d(), m("button", {
            key: c,
            dusk: `add-search-row-${a.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: K((s) => i(a.key), ["prevent"])
          }, b(a.label), 9, Xo))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, Yo = {
  key: 0,
  class: "ml-1"
}, Jo = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, Zo = { class: "px-2" }, el = { class: "divide-y divide-gray-200" }, tl = { class: "text-sm text-gray-900" }, rl = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], ol = {
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
    const o = e, r = O(() => o.columns.filter((i) => i.hidden).length);
    return (i, l) => (d(), V(Oe, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: U(() => [
        l[0] || (l[0] = n("svg", {
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
        e.hasHiddenColumns ? (d(), m("span", Yo, "(" + b(r.value) + ")", 1)) : w("", !0)
      ]),
      default: U(() => [
        n("div", Jo, [
          n("div", Zo, [
            n("ul", el, [
              (d(!0), m(H, null, X(o.columns, (t, a) => D((d(), m("li", {
                key: a,
                class: "py-2 flex items-center justify-between"
              }, [
                n("p", tl, b(t.label), 1),
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
                  onClick: K((c) => e.onChange(t.key, t.hidden), ["prevent"])
                }, [
                  l[1] || (l[1] = n("span", { class: "sr-only" }, "Column status", -1)),
                  n("span", {
                    "aria-hidden": "true",
                    class: M([{
                      "translate-x-5": !t.hidden,
                      "translate-x-0": t.hidden
                    }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                  }, null, 2)
                ], 10, rl)
              ])), [
                [ne, t.can_be_hidden]
              ])), 128))
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, ll = { class: "space-y-4" }, nl = { class: "block text-sm font-medium text-gray-700 mb-2" }, sl = { value: "" }, al = { value: "exact" }, il = { value: "less_than" }, ul = { value: "greater_than" }, cl = { value: "less_than_or_equal" }, dl = { value: "greater_than_or_equal" }, fl = { value: "between" }, hl = {
  key: 0,
  class: "space-y-3"
}, ml = { key: 0 }, gl = { class: "block text-sm font-medium text-gray-700 mb-1" }, pl = { class: "flex items-center" }, vl = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, bl = ["step"], yl = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, xl = {
  key: 1,
  class: "space-y-3"
}, wl = { class: "block text-sm font-medium text-gray-700 mb-1" }, kl = { class: "flex items-center" }, Cl = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, _l = ["step"], $l = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Sl = { class: "block text-sm font-medium text-gray-700 mb-1" }, Ml = { class: "flex items-center" }, zl = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, ql = ["step"], Tl = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Il = {
  key: 1,
  class: "flex justify-end"
}, Nl = { class: "sr-only" }, Fl = {
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
    const o = e, r = F(""), i = F(""), l = F(""), t = F(""), a = O(() => r.value !== "" && (r.value !== "between" && i.value !== "" && i.value !== null || r.value === "between" && l.value !== "" && l.value !== null && t.value !== "" && t.value !== null));
    function c() {
      switch (r.value) {
        case "exact":
          return R.exact_number;
        case "less_than":
          return R.less_than;
        case "greater_than":
          return R.greater_than;
        case "less_than_or_equal":
          return R.less_than_or_equal;
        case "greater_than_or_equal":
          return R.greater_than_or_equal;
        default:
          return "Number";
      }
    }
    function s() {
      i.value = "", l.value = "", t.value = "", r.value === "" ? f() : u();
    }
    function u() {
      if (r.value === "")
        return;
      let y = null;
      switch (r.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          i.value !== "" && i.value !== null && (y = {
            type: r.value,
            number: i.value
          });
          break;
        case "between":
          l.value !== "" && l.value !== null && t.value !== "" && t.value !== null && (y = {
            type: r.value,
            start_number: l.value,
            end_number: t.value
          });
          break;
      }
      o.onFilterChange(o.filter.key, y);
    }
    function f() {
      r.value = "", i.value = "", l.value = "", t.value = "", o.onFilterChange(o.filter.key, null);
    }
    ge(() => {
      if (o.filter.value) {
        const y = o.filter.value;
        y.type && (r.value = y.type, y.type === "between" ? (l.value = y.start_number || "", t.value = y.end_number || "") : i.value = y.number || "");
      }
    }), Ce(() => o.filter.value, (y) => {
      y ? y.type && (r.value = y.type, y.type === "between" ? (l.value = y.start_number || "", t.value = y.end_number || "") : i.value = y.number || "") : f();
    }, { deep: !0 });
    const k = {
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
    }, g = te("themeVariables"), z = (y) => {
      var $, p, q, P;
      return Z(
        W([y, "base"], k, (p = ($ = g == null ? void 0 : g.inertia_table) == null ? void 0 : $.table_filter) == null ? void 0 : p.number_filter, o.ui),
        W([y, "color", o.color], k, (P = (q = g == null ? void 0 : g.inertia_table) == null ? void 0 : q.table_filter) == null ? void 0 : P.number_filter, o.ui)
      );
    };
    return (y, $) => (d(), m("div", ll, [
      n("div", null, [
        n("label", nl, b(N(R).filter_type), 1),
        D(n("select", {
          "onUpdate:modelValue": $[0] || ($[0] = (p) => r.value = p),
          class: M(z("select")),
          onChange: s
        }, [
          n("option", sl, b(N(R).no_filter), 1),
          n("option", al, b(N(R).exact_number), 1),
          n("option", il, b(N(R).less_than), 1),
          n("option", ul, b(N(R).greater_than), 1),
          n("option", cl, b(N(R).less_than_or_equal), 1),
          n("option", dl, b(N(R).greater_than_or_equal), 1),
          n("option", fl, b(N(R).number_range), 1)
        ], 34), [
          [Je, r.value]
        ])
      ]),
      r.value && r.value !== "" ? (d(), m("div", hl, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(r.value) ? (d(), m("div", ml, [
          n("label", gl, b(c()), 1),
          n("div", pl, [
            e.filter.prefix ? (d(), m("span", vl, b(e.filter.prefix), 1)) : w("", !0),
            D(n("input", {
              type: "number",
              "onUpdate:modelValue": $[1] || ($[1] = (p) => i.value = p),
              step: e.filter.step || 1,
              class: M(z("input")),
              onInput: u,
              placeholder: "0"
            }, null, 42, bl), [
              [
                we,
                i.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (d(), m("span", yl, b(e.filter.suffix), 1)) : w("", !0)
          ])
        ])) : w("", !0),
        r.value === "between" ? (d(), m("div", xl, [
          n("div", null, [
            n("label", wl, b(N(R).start_number), 1),
            n("div", kl, [
              e.filter.prefix ? (d(), m("span", Cl, b(e.filter.prefix), 1)) : w("", !0),
              D(n("input", {
                type: "number",
                "onUpdate:modelValue": $[2] || ($[2] = (p) => l.value = p),
                step: e.filter.step || 1,
                class: M(z("input")),
                onInput: u,
                placeholder: "0"
              }, null, 42, _l), [
                [
                  we,
                  l.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (d(), m("span", $l, b(e.filter.suffix), 1)) : w("", !0)
            ])
          ]),
          n("div", null, [
            n("label", Sl, b(N(R).end_number), 1),
            n("div", Ml, [
              e.filter.prefix ? (d(), m("span", zl, b(e.filter.prefix), 1)) : w("", !0),
              D(n("input", {
                type: "number",
                "onUpdate:modelValue": $[3] || ($[3] = (p) => t.value = p),
                step: e.filter.step || 1,
                class: M(z("input")),
                onInput: u,
                placeholder: "0"
              }, null, 42, ql), [
                [
                  we,
                  t.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (d(), m("span", Tl, b(e.filter.suffix), 1)) : w("", !0)
            ])
          ])
        ])) : w("", !0)
      ])) : w("", !0),
      a.value ? (d(), m("div", Il, [
        n("button", {
          type: "button",
          class: M(z("reset_button")),
          onClick: f
        }, [
          n("span", Nl, b(N(R).reset_filter), 1),
          $[4] || ($[4] = n("svg", {
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
      ])) : w("", !0)
    ]));
  }
}, Pl = {
  key: 0,
  class: "ml-1"
}, jl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, Ol = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Rl = { class: "p-2" }, Al = ["name", "value", "onChange"], Ll = ["value"], Bl = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Vl = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, El = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Wl = {
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
    F(null);
    const r = O(() => o.filters.filter((s) => !i(s)).length);
    function i(s) {
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
    function l(s) {
      let u = s.value;
      s.value && (Number(Math.max(...s.value)) === Number(s.max) && Number(Math.min(...s.value)) === Number(s.min) ? u = null : Number(Math.min(...s.value)) === 0 && Number(Math.max(...s.value)) === 0 && (u = ["0", "0"])), o.onFilterChange(s.key, u);
    }
    const t = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, a = te("themeVariables"), c = (s) => {
      var u, f, k, g;
      return Z(
        W([s, "base"], t, (f = (u = a == null ? void 0 : a.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : f.select_filter, o.ui),
        W([s, "color", o.color], t, (g = (k = a == null ? void 0 : a.inertia_table) == null ? void 0 : k.table_filter) == null ? void 0 : g.select_filter, o.ui)
      );
    };
    return (s, u) => (d(), V(Oe, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: U(() => [
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
        e.hasEnabledFilters ? (d(), m("span", Pl, "(" + b(r.value) + ")", 1)) : w("", !0)
      ]),
      default: U(() => [
        n("div", jl, [
          (d(!0), m(H, null, X(e.filters, (f, k) => (d(), m("div", { key: k }, [
            n("h3", Ol, b(f.label), 1),
            n("div", Rl, [
              f.type === "select" ? (d(), m("select", {
                key: 0,
                name: f.key,
                value: f.value,
                class: M(c("select", e.color)),
                onChange: (g) => e.onFilterChange(f.key, g.target.value)
              }, [
                (d(!0), m(H, null, X(f.options, (g, z) => (d(), m("option", {
                  key: z,
                  value: z
                }, b(g), 9, Ll))), 128))
              ], 42, Al)) : w("", !0),
              f.type === "toggle" ? (d(), V(nt, {
                key: 1,
                filter: f,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : w("", !0),
              f.type === "number_range" ? (d(), m("div", Bl, [
                re(st, {
                  modelValue: f.value,
                  "onUpdate:modelValue": [(g) => f.value = g, (g) => l(f)],
                  max: f.max,
                  min: f.min,
                  prefix: f.prefix,
                  suffix: f.suffix,
                  step: f.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : w("", !0),
              f.type === "date" ? (d(), m("div", Vl, [
                re(at, {
                  filter: f,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : w("", !0),
              f.type === "number" ? (d(), m("div", El, [
                re(Fl, {
                  filter: f,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : w("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, Gl = { class: "relative" }, Ul = ["placeholder", "value"], Dl = {
  __name: "TableGlobalSearch",
  props: {
    label: {
      type: String,
      default: R.search,
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
    const o = e, r = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, i = te("themeVariables"), l = (t) => {
      var a, c;
      return Z(
        W([t, "base"], r, (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.global_search, o.ui),
        W([t, "color", o.color], r, (c = i == null ? void 0 : i.inertia_table) == null ? void 0 : c.global_search, o.ui)
      );
    };
    return (t, a) => (d(), m("div", Gl, [
      n("input", {
        class: M(l("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: a[0] || (a[0] = (c) => e.onChange(c.target.value))
      }, null, 42, Ul),
      a[1] || (a[1] = n("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
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
}, Kl = { class: "flex rounded-md shadow-sm relative mt-3" }, Hl = ["for"], Xl = ["id", "name", "value", "onInput"], Ql = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Yl = ["dusk", "onClick"], Jl = {
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
    const o = { el: F([]) };
    let r = O(() => o.el.value);
    const i = e;
    function l(s) {
      return i.forcedVisibleSearchInputs.includes(s);
    }
    Ce(i.forcedVisibleSearchInputs, (s) => {
      const u = s.length > 0 ? s[s.length - 1] : null;
      !u || Ze().then(() => {
        const f = qt(r.value, (k) => k.name === u);
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
    }, a = te("themeVariables"), c = (s) => {
      var u, f;
      return Z(
        W([s, "base"], t, (u = a == null ? void 0 : a.inertia_table) == null ? void 0 : u.table_search_rows, i.ui),
        W([s, "color", i.color], t, (f = a == null ? void 0 : a.inertia_table) == null ? void 0 : f.table_search_rows, i.ui)
      );
    };
    return (s, u) => (d(!0), m(H, null, X(e.searchInputs, (f, k) => D((d(), m("div", {
      key: k,
      class: "px-4 sm:px-0"
    }, [
      n("div", Kl, [
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
          n("span", null, b(f.label), 1)
        ], 8, Hl),
        (d(), m("input", {
          id: f.key,
          ref_for: !0,
          ref: o.el,
          key: f.key,
          name: f.key,
          value: f.value,
          type: "text",
          class: M(c("input")),
          onInput: (g) => e.onChange(f.key, g.target.value)
        }, null, 42, Xl)),
        n("div", Ql, [
          n("button", {
            class: M(c("remove_button")),
            dusk: `remove-search-row-${f.key}`,
            onClick: K((g) => e.onRemove(f.key), ["prevent"])
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
          ]), 10, Yl)
        ])
      ])
    ])), [
      [ne, f.value !== null || l(f.key)]
    ])), 128));
  }
}, Zl = {
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
    const o = ze(), r = e, i = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, l = te("themeVariables"), t = (a) => {
      var c, s;
      return Z(
        W([a, "base"], i, (c = l == null ? void 0 : l.inertia_table) == null ? void 0 : c.reset_button, r.ui),
        W([a, "color", r.color], i, (s = l == null ? void 0 : l.inertia_table) == null ? void 0 : s.reset_button, r.ui)
      );
    };
    return (a, c) => {
      var s;
      return d(), m("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: M(t("button")),
        "aria-haspopup": "true",
        onClick: c[0] || (c[0] = K((...u) => e.onClick && e.onClick(...u), ["prevent"]))
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
        n("span", null, b((s = N(o).reset) != null ? s : "Reset"), 1)
      ], 2);
    };
  }
}, en = {}, tn = { class: "flow-root" }, rn = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, on = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, ln = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function nn(e, o) {
  return d(), m("div", tn, [
    n("div", rn, [
      n("div", on, [
        n("div", ln, [
          B(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const sn = /* @__PURE__ */ Me(en, [["render", nn]]), an = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, un = ["dusk", "onClick"], cn = { class: "px-2" }, dn = { class: "divide-y divide-gray-200" }, fn = { class: "text-sm text-gray-900" }, hn = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], mn = {
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
    const o = ze(), r = F(!1), i = F(!1);
    function l() {
      r.value = i.value = !1;
    }
    return (t, a) => (d(), V(Oe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: l
    }, {
      button: U(() => a[5] || (a[5] = [
        n("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          n("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])),
      default: U(() => {
        var c, s, u, f, k;
        return [
          n("div", an, [
            D(n("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (d(), m("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: a[0] || (a[0] = (g) => i.value = !0)
              }, [
                a[6] || (a[6] = n("svg", {
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
                n("span", null, b((c = N(o).add_search_fields) != null ? c : "Add search field"), 1)
              ])) : w("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (d(), m("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: a[1] || (a[1] = (g) => r.value = !0)
              }, [
                a[7] || (a[7] = n("svg", {
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
                n("span", null, b((s = N(o).show_hide_columns) != null ? s : "Show / Hide columns"), 1)
              ])) : w("", !0),
              a[9] || (a[9] = n("hr", null, null, -1)),
              "reset" in e.actions ? (d(), m("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: a[2] || (a[2] = (...g) => {
                  var z, y;
                  return ((z = e.actions.reset) == null ? void 0 : z.onClick) && ((y = e.actions.reset) == null ? void 0 : y.onClick(...g));
                })
              }, [
                a[8] || (a[8] = n("svg", {
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
                n("span", null, b((u = N(o).grouped_reset) != null ? u : "Reset"), 1)
              ])) : w("", !0)
            ], 512), [
              [ne, !r.value && !i.value]
            ]),
            D(n("div", null, [
              n("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: a[3] || (a[3] = (g) => i.value = !1)
              }, [
                a[10] || (a[10] = n("svg", {
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
                n("span", null, b((f = N(o).add_search_fields) != null ? f : "Add search field"), 1)
              ]),
              (d(!0), m(H, null, X(e.actions.searchFields.searchInputs, (g, z) => (d(), m("button", {
                key: z,
                dusk: `add-search-row-${g.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: K((y) => e.actions.searchFields.onClick(g.key), ["prevent"])
              }, b(g.label), 9, un))), 128))
            ], 512), [
              [ne, i.value]
            ]),
            D(n("div", null, [
              n("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: a[4] || (a[4] = (g) => r.value = !1)
              }, [
                a[11] || (a[11] = n("svg", {
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
                n("span", null, b((k = N(o).show_hide_columns) != null ? k : "Show / Hide columns"), 1)
              ]),
              n("div", cn, [
                n("ul", dn, [
                  (d(!0), m(H, null, X(e.actions.toggleColumns.columns, (g, z) => D((d(), m("li", {
                    key: z,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    n("p", fn, b(g.label), 1),
                    n("button", {
                      type: "button",
                      class: M(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !g.hidden,
                        "bg-gray-200": g.hidden
                      }]),
                      "aria-pressed": !g.hidden,
                      "aria-labelledby": `toggle-column-${g.key}`,
                      "aria-describedby": `toggle-column-${g.key}`,
                      dusk: `toggle-column-${g.key}`,
                      onClick: K((y) => e.actions.toggleColumns.onChange(g.key, g.hidden), ["prevent"])
                    }, [
                      a[12] || (a[12] = n("span", { class: "sr-only" }, "Column status", -1)),
                      n("span", {
                        "aria-hidden": "true",
                        class: M([{
                          "translate-x-5": !g.hidden,
                          "translate-x-0": g.hidden
                        }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                      }, null, 2)
                    ], 10, hn)
                  ])), [
                    [ne, g.can_be_hidden]
                  ])), 128))
                ])
              ])
            ], 512), [
              [ne, r.value]
            ]),
            D(n("div", null, [
              B(t.$slots, "default")
            ], 512), [
              [ne, !r.value && !i.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function gn(e) {
  const o = F(!1), r = F(null), i = F(0), l = F(0), t = bt({}), a = () => {
    if (e === "default")
      return;
    const p = localStorage.getItem(`table-column-widths-${e}`);
    if (p)
      try {
        const q = JSON.parse(p);
        Object.assign(t, q);
      } catch (q) {
        console.warn("Unable to load column widths:", q);
      }
  }, c = () => {
    e !== "default" && localStorage.setItem(`table-column-widths-${e}`, JSON.stringify(t));
  }, s = (p, q) => {
    p.preventDefault(), p.stopPropagation(), o.value = !0, r.value = q, i.value = p.clientX;
    const P = p.target.closest("th");
    l.value = P.offsetWidth;
    const C = P.closest("table");
    C && C.querySelectorAll("thead th[data-column-key]").forEach((S) => {
      const A = S.getAttribute("data-column-key"), G = S.offsetWidth;
      t[A] || (t[A] = G), S.style.width = `${t[A]}px`;
      const Q = Array.from(S.parentNode.children).indexOf(S);
      C.querySelectorAll("tbody tr").forEach((ce) => {
        const le = ce.children[Q];
        le && (le.style.width = `${t[A]}px`);
      });
    }), document.addEventListener("mousemove", u), document.addEventListener("mouseup", f), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, u = (p) => {
    if (!o.value || !r.value)
      return;
    const q = p.clientX - i.value, P = Math.max(50, l.value + q);
    t[r.value] = P;
    const C = document.querySelector(`th[data-column-key="${r.value}"]`);
    if (C) {
      C.style.width = `${P}px`;
      const T = C.closest("table");
      if (T) {
        const S = Array.from(C.parentNode.children).indexOf(C);
        T.querySelectorAll("tbody tr").forEach((G) => {
          const Q = G.children[S];
          Q && (Q.style.width = `${P}px`);
        });
      }
    }
  }, f = () => {
    o.value && (o.value = !1, r.value = null, c(), document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", f), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, k = (p) => t[p] || "auto", g = (p, q) => {
    t[p] = q, c();
  }, z = (p) => {
    if (!p)
      return;
    p.querySelectorAll("thead th[data-column-key]").forEach((P) => {
      const C = P.getAttribute("data-column-key");
      if (!t[C]) {
        const A = P.offsetWidth;
        t[C] = Math.max(A, 100);
      }
      P.style.width = `${t[C]}px`;
      const T = Array.from(P.parentNode.children).indexOf(P);
      p.querySelectorAll("tbody tr").forEach((A) => {
        const G = A.children[T];
        G && (G.style.width = `${t[C]}px`);
      });
    });
  }, y = () => {
    Object.keys(t).forEach((p) => {
      delete t[p];
    }), e !== "default" && localStorage.removeItem(`table-column-widths-${e}`);
  }, $ = () => {
    o.value && (document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", f), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return ge(() => {
    a();
  }), je(() => {
    $();
  }), {
    isResizing: o,
    resizingColumn: r,
    columnWidths: t,
    startResize: s,
    getColumnWidth: k,
    setColumnWidth: g,
    resetColumnWidths: y,
    loadColumnWidths: a,
    saveColumnWidths: c,
    initializeColumnWidths: z
  };
}
const pn = ["dusk"], vn = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, bn = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, yn = { class: "mr-2 sm:mr-4" }, xn = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, wn = { class: "overflow-x-auto" }, kn = { class: "bg-gray-50" }, Cn = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border",
  style: { width: "60px" }
}, _n = ["id"], $n = { class: "divide-y divide-gray-200 bg-white" }, Sn = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500",
  style: { width: "60px" }
}, Mn = ["id", "onUpdate:modelValue"], zn = ["onClick", "data-column-key"], qn = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, Tn = {
  key: 0,
  class: "italic text-sm px-2"
}, In = {
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
  setup(e, { emit: o }) {
    const r = ze(), i = o, l = e;
    yt();
    const t = l.resizeableColumns ? gn(l.name) : null;
    xt("columnResize", t);
    const a = F(!1), c = F(0), s = O(() => {
      let h = He().props.queryBuilderProps ? { ...He().props.queryBuilderProps[l.name] } : {};
      return h._updates = c.value, h;
    }), u = F(s.value), f = O(() => s.value.pageName), k = F([]), g = F(null), z = F(!1), y = O(() => s.value.hasToggleableColumns || s.value.hasFilters || s.value.hasSearchInputs ? !1 : !s.value.globalSearch), $ = O(() => Object.keys(l.resource).length === 0 ? l.data : "data" in l.resource ? l.resource.data : l.resource), p = O(() => Object.keys(l.resource).length === 0 ? l.meta : "links" in l.resource && "meta" in l.resource && Object.keys(l.resource.links).length === 4 && "next" in l.resource.links && "prev" in l.resource.links ? {
      ...l.resource.meta,
      next_page_url: l.resource.links.next,
      prev_page_url: l.resource.links.prev
    } : "meta" in l.resource ? l.resource.meta : l.resource), q = O(() => $.value.length > 0 ? !0 : p.value.total > 0), P = F({
      reset: {
        onClick: G
      },
      toggleColumns: {
        show: s.value.hasToggleableColumns,
        columns: s.value.columns,
        onChange: fe
      },
      searchFields: {
        show: s.value.hasSearchInputs && !l.hideSearchInputsAboveTable,
        searchInputs: s.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
        onClick: T
      }
    });
    function C(h) {
      k.value = k.value.filter((v) => v != h), oe(h, null);
    }
    function T(h) {
      k.value.push(h);
    }
    const S = O(() => {
      if (k.value.length > 0)
        return !0;
      const h = Ae.parse(location.search.substring(1));
      if (h[f.value] > 1)
        return !0;
      const x = l.name === "default" ? "" : l.name + "_";
      let j = !1;
      return ie(["filter", "columns", "cursor", "sort"], (_) => {
        const J = h[x + _];
        _ === "sort" && J === s.value.defaultSort || J !== void 0 && (j = !0);
      }), j;
    }), A = O(() => {
      if (!l.showExportButton)
        return null;
      const h = new URL(window.location.href);
      h.search = "";
      const v = new URLSearchParams();
      if (s.value.page && s.value.page > 1 && v.set(f.value, s.value.page), s.value.sort) {
        const _ = l.name === "default" ? "sort" : `${l.name}_sort`;
        v.set(_, s.value.sort);
      }
      const x = {};
      if (u.value.filters.forEach((_) => {
        _.value !== null && _.value !== void 0 && _.value !== "" && (x[_.key] = _.value);
      }), u.value.searchInputs.forEach((_) => {
        _.value !== null && _.value !== void 0 && _.value !== "" && (x[_.key] = _.value);
      }), Object.keys(x).length > 0) {
        const _ = l.name === "default" ? "filter" : `${l.name}_filter`;
        Object.keys(x).forEach((J) => {
          const ee = x[J];
          Array.isArray(ee) ? ee.forEach((Fe, gt) => {
            v.set(`${_}[${J}][${gt}]`, Fe);
          }) : typeof ee == "object" && ee !== null ? Object.keys(ee).forEach((Fe) => {
            v.set(`${_}[${J}][${Fe}]`, ee[Fe]);
          }) : v.set(`${_}[${J}]`, ee);
        });
      }
      const j = u.value.columns.filter((_) => !_.hidden).map((_) => _.key);
      if (j.length !== u.value.columns.length) {
        const _ = l.name === "default" ? "columns" : `${l.name}_columns`;
        j.forEach((J) => {
          v.append(`${_}[]`, J);
        });
      }
      if (s.value.perPageOptions && s.value.perPageOptions.length > 0) {
        const _ = new URLSearchParams(window.location.search).get("perPage") || s.value.perPageOptions[0];
        _ && _ !== s.value.perPageOptions[0] && v.set("perPage", _);
      }
      return v.set("do_export", "1"), v.set("table", l.name || "default"), h.search = v.toString(), h.toString();
    });
    function G() {
      k.value = [], ie(u.value.filters, (h, v) => {
        u.value.filters[v].value = null;
      }), ie(u.value.searchInputs, (h, v) => {
        u.value.searchInputs[v].value = null;
      }), ie(u.value.columns, (h, v) => {
        u.value.columns[v].hidden = h.can_be_hidden ? !s.value.defaultVisibleToggleableColumns.includes(h.key) : !1;
      }), localStorage.removeItem(`columns-${l.name}`), l.resizeableColumns && t && t.resetColumnWidths(), u.value.sort = null, u.value.cursor = null, u.value.page = 1;
    }
    const Q = {};
    function oe(h, v) {
      clearTimeout(Q[h]), Q[h] = setTimeout(() => {
        Y.value && l.preventOverlappingRequests && Y.value.cancel();
        const x = de("searchInputs", h);
        u.value.searchInputs[x].value = v, u.value.cursor = null, u.value.page = 1;
      }, l.inputDebounceMs);
    }
    function ce(h) {
      oe("global", h);
    }
    function le(h, v) {
      const x = de("filters", h);
      u.value.filters[x].value = v, u.value.cursor = null, u.value.page = 1;
    }
    function L(h) {
      u.value.cursor = null, u.value.perPage = h, u.value.page = 1;
    }
    function de(h, v) {
      return Nt(u.value[h], (x) => x.key == v);
    }
    function fe(h, v) {
      const x = de("columns", h);
      u.value.columns[x].hidden = !v;
      const j = u.value.columns.map((_) => ({
        key: _.key,
        hidden: _.hidden
      }));
      localStorage.setItem(`columns-${l.name}`, JSON.stringify(j));
    }
    function qe() {
      let h = {};
      return ie(u.value.searchInputs, (v) => {
        v.value !== null && (h[v.key] = v.value);
      }), ie(u.value.filters, (v) => {
        let x = v.value;
        x !== null && (v.type === "number_range" && Number(Math.max(...v.value)) === Number(v.max) && Number(Math.min(...v.value)) === Number(v.min) && (x = null), h[v.key] = x);
      }), h;
    }
    function ve() {
      const h = u.value.columns;
      let v = It(h, (j) => !j.hidden), x = Pt(v, (j) => j.key).sort();
      return Ft(x, s.value.defaultVisibleToggleableColumns) ? {} : x;
    }
    function Te() {
      const h = qe(), v = ve(), x = {};
      Object.keys(h).length > 0 && (x.filter = h), Object.keys(v).length > 0 && (x.columns = v);
      const j = u.value.cursor, _ = u.value.page, J = u.value.sort, ee = u.value.perPage;
      return j && (x.cursor = j), _ > 1 && (x.page = _), ee > 1 && (x.perPage = ee), J && (x.sort = J), x;
    }
    function be(h) {
      if (!h)
        return null;
      Ee(h);
    }
    function pe() {
      const h = Ae.parse(location.search.substring(1)), v = l.name === "default" ? "" : l.name + "_";
      ie(["filter", "columns", "cursor", "sort"], (j) => {
        delete h[v + j];
      }), delete h[f.value], ie(Te(), (j, _) => {
        _ === "page" ? h[f.value] = j : _ === "perPage" ? h.perPage = j : h[v + _] = j;
      });
      let x = Ae.stringify(h, {
        filter(j, _) {
          return typeof _ == "object" && _ !== null ? jt(_) : _;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!x || x === f.value + "=1") && (x = ""), x;
    }
    const ye = F(!1), Y = F(null);
    function Ee(h) {
      !h || zt.get(
        h,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: l.preserveScroll !== !1,
          onBefore() {
            ye.value = !0;
          },
          onCancelToken(v) {
            Y.value = v;
          },
          onFinish() {
            ye.value = !1;
          },
          onSuccess() {
            if (l.preserveScroll === "table-top") {
              const x = g.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: x });
            }
            c.value++;
          }
        }
      );
    }
    function it(h, v, x) {
      var j;
      l.hasCheckboxes && ((j = h.target) == null ? void 0 : j.parentElement.cellIndex) === 0 || i("rowClicked", h, v, x);
    }
    Ce(u, () => {
      Ee(location.pathname + "?" + pe()), z.value = !1;
    }, { deep: !0 }), Ce(l.resource, () => {
      const h = l.resource.data.filter((v) => v.__itSelected);
      i("selectionChanged", h);
    }, { deep: !0 });
    const We = () => {
      c.value++, l.resizeableColumns && t && setTimeout(() => {
        var v;
        const h = (v = g.value) == null ? void 0 : v.querySelector("table");
        h && t.initializeColumnWidths(h);
      }, 0);
    };
    ge(() => {
      document.addEventListener("inertia:success", We);
      const h = localStorage.getItem(`columns-${l.name}`);
      if (h) {
        const v = JSON.parse(h);
        ie(u.value.columns, (x, j) => {
          u.value.columns[j].hidden = v[j].hidden;
        });
      }
      l.resizeableColumns && t && setTimeout(() => {
        var x;
        const v = (x = g.value) == null ? void 0 : x.querySelector("table");
        v && t.initializeColumnWidths(v);
      }, 0);
    }), je(() => {
      document.removeEventListener("inertia:success", We);
    });
    function Ge(h) {
      u.value.sort == h ? u.value.sort = `-${h}` : u.value.sort = h, u.value.cursor = null, u.value.page = 1;
    }
    function Ie(h) {
      const v = de("columns", h);
      return !u.value.columns[v].hidden;
    }
    function Ne(h) {
      const v = de("columns", h), x = Tt(s.value.columns[v]);
      x.onSort = Ge, x.filters = s.value.filters.filter(
        (_) => _.key === h || _.key.startsWith(h + "_") || _.key.includes(h)
      );
      const j = s.value.searchInputs.filter(
        (_) => _.key === h
      );
      return j.length > 0 ? (x.searchable = !0, x.searchInputs = j) : (x.searchable = !1, x.searchInputs = []), x.onFilterChange = le, x.onSearchChange = oe, x.color = l.color, x;
    }
    function ut() {
      l.resource.data.forEach((h) => {
        h.__itSelected = z.value;
      });
    }
    function ct(h) {
      if (!l.resizeableColumns || !t)
        return "auto";
      const v = t.getColumnWidth(h);
      return v === "auto" ? v : `${v}px`;
    }
    const dt = O(() => {
      if (!l.resizeableColumns || !t)
        return "100%";
      let h = 0, v = !1;
      return l.hasCheckboxes && (h += 60), s.value.columns.forEach((x) => {
        if (!Ie(x.key))
          return;
        const j = t.getColumnWidth(x.key);
        j === "auto" ? v = !0 : h += j;
      }), !v && h > 0 ? `${h}px` : "max(100%, " + (h > 0 ? h + "px" : "800px") + ")";
    }), Ue = O(() => l.resource.data.filter((h) => h.__itSelected).length), ft = O(() => Ue.value === 0 ? r.noLineSelected : `${Ue.value} ${r.lineSelected}`);
    function ht() {
      l.resizeableColumns && (a.value = !0);
    }
    function mt() {
      l.resizeableColumns && setTimeout(() => {
        a.value = !1;
      }, 100);
    }
    return (h, v) => (d(), V(wt, null, {
      default: U(() => [
        (d(), m("fieldset", {
          ref_key: "tableFieldset",
          ref: g,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: M(["min-w-0", { "opacity-75": ye.value }])
        }, [
          n("div", vn, [
            s.value.globalSearch ? (d(), m("div", bn, [
              B(h.$slots, "tableGlobalSearch", {
                hasGlobalSearch: s.value.globalSearch,
                label: s.value.globalSearch ? s.value.globalSearch.label : null,
                value: s.value.globalSearch ? s.value.globalSearch.value : null,
                onChange: ce
              }, () => [
                s.value.globalSearch ? (d(), V(Dl, {
                  key: 0,
                  class: "grow",
                  label: s.value.globalSearch.label,
                  value: s.value.globalSearch.value,
                  "on-change": ce,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : w("", !0)
              ], !0)
            ])) : w("", !0),
            n("div", yn, [
              B(h.$slots, "tableFilter", {
                hasFilters: s.value.hasFilters,
                hasEnabledFilters: s.value.hasEnabledFilters,
                filters: s.value.filters,
                onFilterChange: le
              }, () => [
                s.value.hasFilters ? (d(), V(Wl, {
                  key: 0,
                  "has-enabled-filters": s.value.hasEnabledFilters,
                  filters: s.value.filters,
                  "on-filter-change": le,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : w("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? B(h.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: s.value.hasSearchInputs,
              hasSearchInputsWithoutValue: s.value.hasSearchInputsWithoutValue,
              searchInputs: s.value.searchInputsWithoutGlobal,
              onAdd: T
            }, () => [
              s.value.hasSearchInputs ? (d(), V(Qo, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": s.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": s.value.hasSearchInputsWithoutValue,
                "on-add": T,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : w("", !0)
            ], !0) : w("", !0),
            e.withGroupedMenu ? w("", !0) : B(h.$slots, "tableColumns", {
              key: 2,
              hasColumns: s.value.hasToggleableColumns,
              columns: s.value.columns,
              hasHiddenColumns: s.value.hasHiddenColumns,
              onChange: fe
            }, () => [
              s.value.hasToggleableColumns ? (d(), V(ol, {
                key: 0,
                class: M({ "mr-2 sm:mr-4": S.value }),
                columns: s.value.columns,
                "has-hidden-columns": s.value.hasHiddenColumns,
                "on-change": fe,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "color"])) : w("", !0)
            ], !0),
            e.withGroupedMenu ? B(h.$slots, "groupedAction", {
              key: 3,
              actions: P.value
            }, () => [
              re(mn, {
                color: e.color,
                actions: P.value
              }, {
                default: U(() => [
                  B(h.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : w("", !0),
            e.withGroupedMenu ? w("", !0) : B(h.$slots, "tableReset", {
              key: 4,
              canBeReset: S.value,
              onClick: G
            }, () => [
              S.value ? (d(), m("div", xn, [
                re(Zl, {
                  "on-click": G,
                  color: e.color
                }, null, 8, ["color"])
              ])) : w("", !0)
            ], !0)
          ]),
          e.hideSearchInputsAboveTable ? w("", !0) : B(h.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: s.value.hasSearchInputsWithValue,
            searchInputs: s.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: k.value,
            onChange: oe
          }, () => [
            s.value.hasSearchInputsWithValue || k.value.length > 0 ? (d(), V(Jl, {
              key: 0,
              "search-inputs": s.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": k.value,
              "on-change": oe,
              "on-remove": C,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : w("", !0)
          ], !0),
          B(h.$slots, "tableWrapper", { meta: p.value }, () => [
            re(sn, {
              class: M({ "mt-3": !y.value })
            }, {
              default: U(() => [
                B(h.$slots, "table", {}, () => [
                  n("div", wn, [
                    n("table", {
                      class: M(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && a.value }]),
                      style: se([{ "table-layout": "fixed", "min-width": "100%" }, { width: dt.value }]),
                      onMouseenter: v[1] || (v[1] = (x) => e.resizeableColumns ? ht : null),
                      onMouseleave: v[2] || (v[2] = (x) => e.resizeableColumns ? mt : null)
                    }, [
                      n("thead", kn, [
                        B(h.$slots, "head", {
                          show: Ie,
                          sortBy: Ge,
                          header: Ne
                        }, () => [
                          n("tr", null, [
                            e.hasCheckboxes ? (d(), m("th", Cn, [
                              D(n("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: ut,
                                "onUpdate:modelValue": v[0] || (v[0] = (x) => z.value = x),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, _n), [
                                [Ke, z.value]
                              ])
                            ])) : w("", !0),
                            (d(!0), m(H, null, X(s.value.columns, (x) => (d(), V(qo, {
                              key: `table-${e.name}-header-${x.key}`,
                              cell: Ne(x.key)
                            }, {
                              label: U(() => [
                                B(h.$slots, `header(${x.key})`, {
                                  label: Ne(x.key).label,
                                  column: Ne(x.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell"]))), 128))
                          ])
                        ], !0)
                      ]),
                      n("tbody", $n, [
                        B(h.$slots, "body", { show: Ie }, () => [
                          (d(!0), m(H, null, X($.value, (x, j) => (d(), m("tr", {
                            key: `table-${e.name}-row-${j}`,
                            class: M(["", {
                              "bg-gray-50": e.striped && j % 2,
                              "hover:bg-gray-100": e.striped,
                              "hover:bg-gray-50": !e.striped
                            }])
                          }, [
                            e.hasCheckboxes ? (d(), m("td", Sn, [
                              D(n("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${j}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (_) => x.__itSelected = _
                              }, null, 8, Mn), [
                                [Ke, x.__itSelected]
                              ])
                            ])) : w("", !0),
                            (d(!0), m(H, null, X(s.value.columns, (_, J) => D((d(), m("td", {
                              key: `table-${e.name}-row-${j}-column-${_.key}`,
                              onClick: (ee) => it(ee, x, j),
                              class: M(_.body_class),
                              "data-column-key": _.key,
                              style: se({
                                width: ct(_.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              })
                            }, [
                              B(h.$slots, `cell(${_.key})`, { item: x }, () => [
                                ae(b(x[_.key]), 1)
                              ], !0)
                            ], 14, zn)), [
                              [ne, Ie(_.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                B(h.$slots, "pagination", {
                  onClick: be,
                  hasData: q.value,
                  meta: p.value,
                  perPageOptions: s.value.perPageOptions,
                  onPerPageChange: L,
                  showExportButton: e.showExportButton,
                  exportUrl: A.value
                }, () => [
                  n("div", qn, [
                    e.hasCheckboxes ? (d(), m("span", Tn, b(ft.value), 1)) : w("", !0),
                    re(Ko, {
                      "on-click": be,
                      "has-data": q.value,
                      meta: p.value,
                      "per-page-options": s.value.perPageOptions,
                      "on-per-page-change": L,
                      color: e.color,
                      "show-export-button": e.showExportButton,
                      "export-url": A.value
                    }, {
                      exportButton: U((x) => [
                        B(h.$slots, "exportButton", kt(Ct(x)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button", "export-url"])
                  ])
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, pn))
      ]),
      _: 3
    }));
  }
}, Xn = /* @__PURE__ */ Me(In, [["__scopeId", "data-v-423767ec"]]);
export {
  Oe as ButtonWithDropdown,
  qo as HeaderCell,
  Ot as OnClickOutside,
  Ko as Pagination,
  Xn as Table,
  Qo as TableAddSearchRow,
  ol as TableColumns,
  Wl as TableFilter,
  Dl as TableGlobalSearch,
  Zl as TableReset,
  Jl as TableSearchRows,
  sn as TableWrapper,
  ze as getTranslations,
  Kn as setTranslation,
  Hn as setTranslations
};
