import { ref as V, onMounted as Ce, onBeforeUnmount as st, openBlock as m, createElementBlock as g, renderSlot as R, watch as Ne, inject as se, createBlock as A, withCtx as O, createElementVNode as a, normalizeClass as M, withModifiers as G, withDirectives as Q, vShow as J, createStaticVNode as at, normalizeStyle as ue, toDisplayString as C, createCommentVNode as k, createTextVNode as ne, computed as P, onUnmounted as Ae, Fragment as D, renderList as U, createVNode as ce, resolveDynamicComponent as pe, unref as E, nextTick as it, reactive as ut, getCurrentInstance as ct, provide as dt, Transition as ft, vModelCheckbox as We } from "vue";
import { createPopper as mt } from "@popperjs/core/lib/popper-lite";
import gt from "@popperjs/core/lib/modifiers/preventOverflow";
import ht from "@popperjs/core/lib/modifiers/flip";
import pt from "lodash-es/uniq";
import { usePage as Ve, router as bt } from "@inertiajs/vue3";
import vt from "lodash-es/find";
import Fe from "qs";
import yt from "lodash-es/clone";
import xt from "lodash-es/filter";
import wt from "lodash-es/findKey";
import oe from "lodash-es/forEach";
import kt from "lodash-es/isEqual";
import Ct from "lodash-es/map";
import $t from "lodash-es/pickBy";
const St = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const r = e, l = V(null), i = V(null);
    return Ce(() => {
      l.value = (o) => {
        o.target === i.value || i.value.contains(o.target) || r.do();
      }, document.addEventListener("click", l.value), document.addEventListener("touchstart", l.value);
    }), st(() => {
      document.removeEventListener("click", l.value), document.removeEventListener("touchstart", l.value);
    }), (o, t) => (m(), g("div", {
      ref_key: "root",
      ref: i
    }, [
      R(o.$slots, "default")
    ], 512));
  }
}, Oe = "-", Mt = (e) => {
  const r = zt(e), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (s) => {
      const u = s.split(Oe);
      return u[0] === "" && u.length !== 1 && u.shift(), Ue(u, r) || _t(s);
    },
    getConflictingClassGroupIds: (s, u) => {
      const n = l[s] || [];
      return u && i[s] ? [...n, ...i[s]] : n;
    }
  };
}, Ue = (e, r) => {
  var s;
  if (e.length === 0)
    return r.classGroupId;
  const l = e[0], i = r.nextPart.get(l), o = i ? Ue(e.slice(1), i) : void 0;
  if (o)
    return o;
  if (r.validators.length === 0)
    return;
  const t = e.join(Oe);
  return (s = r.validators.find(({
    validator: u
  }) => u(t))) == null ? void 0 : s.classGroupId;
}, Ee = /^\[(.+)\]$/, _t = (e) => {
  if (Ee.test(e)) {
    const r = Ee.exec(e)[1], l = r == null ? void 0 : r.substring(0, r.indexOf(":"));
    if (l)
      return "arbitrary.." + l;
  }
}, zt = (e) => {
  const {
    theme: r,
    prefix: l
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Nt(Object.entries(e.classGroups), l).forEach(([t, s]) => {
    Re(s, i, t, r);
  }), i;
}, Re = (e, r, l, i) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const t = o === "" ? r : Ge(r, o);
      t.classGroupId = l;
      return;
    }
    if (typeof o == "function") {
      if (qt(o)) {
        Re(o(i), r, l, i);
        return;
      }
      r.validators.push({
        validator: o,
        classGroupId: l
      });
      return;
    }
    Object.entries(o).forEach(([t, s]) => {
      Re(s, Ge(r, t), l, i);
    });
  });
}, Ge = (e, r) => {
  let l = e;
  return r.split(Oe).forEach((i) => {
    l.nextPart.has(i) || l.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), l = l.nextPart.get(i);
  }), l;
}, qt = (e) => e.isThemeGetter, Nt = (e, r) => r ? e.map(([l, i]) => {
  const o = i.map((t) => typeof t == "string" ? r + t : typeof t == "object" ? Object.fromEntries(Object.entries(t).map(([s, u]) => [r + s, u])) : t);
  return [l, o];
}) : e, Tt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const o = (t, s) => {
    l.set(t, s), r++, r > e && (r = 0, i = l, l = /* @__PURE__ */ new Map());
  };
  return {
    get(t) {
      let s = l.get(t);
      if (s !== void 0)
        return s;
      if ((s = i.get(t)) !== void 0)
        return o(t, s), s;
    },
    set(t, s) {
      l.has(t) ? l.set(t, s) : o(t, s);
    }
  };
}, He = "!", It = (e) => {
  const {
    separator: r,
    experimentalParseClassName: l
  } = e, i = r.length === 1, o = r[0], t = r.length, s = (u) => {
    const n = [];
    let c = 0, f = 0, x;
    for (let v = 0; v < u.length; v++) {
      let w = u[v];
      if (c === 0) {
        if (w === o && (i || u.slice(v, v + t) === r)) {
          n.push(u.slice(f, v)), f = v + t;
          continue;
        }
        if (w === "/") {
          x = v;
          continue;
        }
      }
      w === "[" ? c++ : w === "]" && c--;
    }
    const p = n.length === 0 ? u : u.substring(f), z = p.startsWith(He), T = z ? p.substring(1) : p, y = x && x > f ? x - f : void 0;
    return {
      modifiers: n,
      hasImportantModifier: z,
      baseClassName: T,
      maybePostfixModifierPosition: y
    };
  };
  return l ? (u) => l({
    className: u,
    parseClassName: s
  }) : s;
}, Vt = (e) => {
  if (e.length <= 1)
    return e;
  const r = [];
  let l = [];
  return e.forEach((i) => {
    i[0] === "[" ? (r.push(...l.sort(), i), l = []) : l.push(i);
  }), r.push(...l.sort()), r;
}, Ft = (e) => ({
  cache: Tt(e.cacheSize),
  parseClassName: It(e),
  ...Mt(e)
}), Pt = /\s+/, Rt = (e, r) => {
  const {
    parseClassName: l,
    getClassGroupId: i,
    getConflictingClassGroupIds: o
  } = r, t = [], s = e.trim().split(Pt);
  let u = "";
  for (let n = s.length - 1; n >= 0; n -= 1) {
    const c = s[n], {
      modifiers: f,
      hasImportantModifier: x,
      baseClassName: p,
      maybePostfixModifierPosition: z
    } = l(c);
    let T = Boolean(z), y = i(T ? p.substring(0, z) : p);
    if (!y) {
      if (!T) {
        u = c + (u.length > 0 ? " " + u : u);
        continue;
      }
      if (y = i(p), !y) {
        u = c + (u.length > 0 ? " " + u : u);
        continue;
      }
      T = !1;
    }
    const v = Vt(f).join(":"), w = x ? v + He : v, _ = w + y;
    if (t.includes(_))
      continue;
    t.push(_);
    const I = o(y, T);
    for (let L = 0; L < I.length; ++L) {
      const B = I[L];
      t.push(w + B);
    }
    u = c + (u.length > 0 ? " " + u : u);
  }
  return u;
};
function At() {
  let e = 0, r, l, i = "";
  for (; e < arguments.length; )
    (r = arguments[e++]) && (l = Ke(r)) && (i && (i += " "), i += l);
  return i;
}
const Ke = (e) => {
  if (typeof e == "string")
    return e;
  let r, l = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (r = Ke(e[i])) && (l && (l += " "), l += r);
  return l;
};
function Ot(e, ...r) {
  let l, i, o, t = s;
  function s(n) {
    const c = r.reduce((f, x) => x(f), e());
    return l = Ft(c), i = l.cache.get, o = l.cache.set, t = u, u(n);
  }
  function u(n) {
    const c = i(n);
    if (c)
      return c;
    const f = Rt(n, l);
    return o(n, f), f;
  }
  return function() {
    return t(At.apply(null, arguments));
  };
}
const F = (e) => {
  const r = (l) => l[e] || [];
  return r.isThemeGetter = !0, r;
}, Xe = /^\[(?:([a-z-]+):)?(.+)\]$/i, jt = /^\d+\/\d+$/, Lt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Bt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Wt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Et = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Gt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Dt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, le = (e) => be(e) || Lt.has(e) || jt.test(e), ae = (e) => ve(e, "length", Zt), be = (e) => Boolean(e) && !Number.isNaN(Number(e)), Pe = (e) => ve(e, "number", be), we = (e) => Boolean(e) && Number.isInteger(Number(e)), Ut = (e) => e.endsWith("%") && be(e.slice(0, -1)), $ = (e) => Xe.test(e), ie = (e) => Bt.test(e), Ht = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Kt = (e) => ve(e, Ht, Qe), Xt = (e) => ve(e, "position", Qe), Qt = /* @__PURE__ */ new Set(["image", "url"]), Jt = (e) => ve(e, Qt, tr), Yt = (e) => ve(e, "", er), ke = () => !0, ve = (e, r, l) => {
  const i = Xe.exec(e);
  return i ? i[1] ? typeof r == "string" ? i[1] === r : r.has(i[1]) : l(i[2]) : !1;
}, Zt = (e) => Wt.test(e) && !Et.test(e), Qe = () => !1, er = (e) => Gt.test(e), tr = (e) => Dt.test(e), rr = () => {
  const e = F("colors"), r = F("spacing"), l = F("blur"), i = F("brightness"), o = F("borderColor"), t = F("borderRadius"), s = F("borderSpacing"), u = F("borderWidth"), n = F("contrast"), c = F("grayscale"), f = F("hueRotate"), x = F("invert"), p = F("gap"), z = F("gradientColorStops"), T = F("gradientColorStopPositions"), y = F("inset"), v = F("margin"), w = F("opacity"), _ = F("padding"), I = F("saturate"), L = F("scale"), B = F("sepia"), W = F("skew"), H = F("space"), K = F("translate"), de = () => ["auto", "contain", "none"], Z = () => ["auto", "hidden", "clip", "visible", "scroll"], ee = () => ["auto", $, r], q = () => [$, r], fe = () => ["", le, ae], me = () => ["auto", be, $], Me = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], ge = () => ["solid", "dashed", "dotted", "double", "none"], ye = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], xe = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], te = () => ["", "0", $], he = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], X = () => [be, $];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ke],
      spacing: [le, ae],
      blur: ["none", "", ie, $],
      brightness: X(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ie, $],
      borderSpacing: q(),
      borderWidth: fe(),
      contrast: X(),
      grayscale: te(),
      hueRotate: X(),
      invert: te(),
      gap: q(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ut, ae],
      inset: ee(),
      margin: ee(),
      opacity: X(),
      padding: q(),
      saturate: X(),
      scale: X(),
      sepia: te(),
      skew: X(),
      space: q(),
      translate: q()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", $]
      }],
      container: ["container"],
      columns: [{
        columns: [ie]
      }],
      "break-after": [{
        "break-after": he()
      }],
      "break-before": [{
        "break-before": he()
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
        object: [...Me(), $]
      }],
      overflow: [{
        overflow: Z()
      }],
      "overflow-x": [{
        "overflow-x": Z()
      }],
      "overflow-y": [{
        "overflow-y": Z()
      }],
      overscroll: [{
        overscroll: de()
      }],
      "overscroll-x": [{
        "overscroll-x": de()
      }],
      "overscroll-y": [{
        "overscroll-y": de()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [y]
      }],
      "inset-x": [{
        "inset-x": [y]
      }],
      "inset-y": [{
        "inset-y": [y]
      }],
      start: [{
        start: [y]
      }],
      end: [{
        end: [y]
      }],
      top: [{
        top: [y]
      }],
      right: [{
        right: [y]
      }],
      bottom: [{
        bottom: [y]
      }],
      left: [{
        left: [y]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", we, $]
      }],
      basis: [{
        basis: ee()
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      flex: [{
        flex: ["1", "auto", "initial", "none", $]
      }],
      grow: [{
        grow: te()
      }],
      shrink: [{
        shrink: te()
      }],
      order: [{
        order: ["first", "last", "none", we, $]
      }],
      "grid-cols": [{
        "grid-cols": [ke]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", we, $]
        }, $]
      }],
      "col-start": [{
        "col-start": me()
      }],
      "col-end": [{
        "col-end": me()
      }],
      "grid-rows": [{
        "grid-rows": [ke]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [we, $]
        }, $]
      }],
      "row-start": [{
        "row-start": me()
      }],
      "row-end": [{
        "row-end": me()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", $]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", $]
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
        justify: ["normal", ...xe()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...xe(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...xe(), "baseline"]
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
        m: [v]
      }],
      mx: [{
        mx: [v]
      }],
      my: [{
        my: [v]
      }],
      ms: [{
        ms: [v]
      }],
      me: [{
        me: [v]
      }],
      mt: [{
        mt: [v]
      }],
      mr: [{
        mr: [v]
      }],
      mb: [{
        mb: [v]
      }],
      ml: [{
        ml: [v]
      }],
      "space-x": [{
        "space-x": [H]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [H]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", $, r]
      }],
      "min-w": [{
        "min-w": [$, r, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [$, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [ie]
        }, ie]
      }],
      h: [{
        h: [$, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [$, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [$, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [$, r, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", ie, ae]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Pe]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", $]
      }],
      "line-clamp": [{
        "line-clamp": ["none", be, Pe]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", le, $]
      }],
      "list-image": [{
        "list-image": ["none", $]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", $]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [e]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [w]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [w]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...ge(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", le, ae]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", le, $]
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
        indent: q()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", $]
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
        content: ["none", $]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [w]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...Me(), Xt]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", Kt]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Jt]
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
        "border-opacity": [w]
      }],
      "border-style": [{
        border: [...ge(), "hidden"]
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
        "divide-opacity": [w]
      }],
      "divide-style": [{
        divide: ge()
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
        outline: ["", ...ge()]
      }],
      "outline-offset": [{
        "outline-offset": [le, $]
      }],
      "outline-w": [{
        outline: [le, ae]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: fe()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [w]
      }],
      "ring-offset-w": [{
        "ring-offset": [le, ae]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", ie, Yt]
      }],
      "shadow-color": [{
        shadow: [ke]
      }],
      opacity: [{
        opacity: [w]
      }],
      "mix-blend": [{
        "mix-blend": [...ye(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": ye()
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
        "drop-shadow": ["", "none", ie, $]
      }],
      grayscale: [{
        grayscale: [c]
      }],
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      invert: [{
        invert: [x]
      }],
      saturate: [{
        saturate: [I]
      }],
      sepia: [{
        sepia: [B]
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
        "backdrop-grayscale": [c]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [x]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [w]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [I]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [B]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [s]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [s]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", $]
      }],
      duration: [{
        duration: X()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", $]
      }],
      delay: [{
        delay: X()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", $]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [L]
      }],
      "scale-x": [{
        "scale-x": [L]
      }],
      "scale-y": [{
        "scale-y": [L]
      }],
      rotate: [{
        rotate: [we, $]
      }],
      "translate-x": [{
        "translate-x": [K]
      }],
      "translate-y": [{
        "translate-y": [K]
      }],
      "skew-x": [{
        "skew-x": [W]
      }],
      "skew-y": [{
        "skew-y": [W]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", $]
      }],
      accent: [{
        accent: ["auto", e]
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", $]
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
        "scroll-m": q()
      }],
      "scroll-mx": [{
        "scroll-mx": q()
      }],
      "scroll-my": [{
        "scroll-my": q()
      }],
      "scroll-ms": [{
        "scroll-ms": q()
      }],
      "scroll-me": [{
        "scroll-me": q()
      }],
      "scroll-mt": [{
        "scroll-mt": q()
      }],
      "scroll-mr": [{
        "scroll-mr": q()
      }],
      "scroll-mb": [{
        "scroll-mb": q()
      }],
      "scroll-ml": [{
        "scroll-ml": q()
      }],
      "scroll-p": [{
        "scroll-p": q()
      }],
      "scroll-px": [{
        "scroll-px": q()
      }],
      "scroll-py": [{
        "scroll-py": q()
      }],
      "scroll-ps": [{
        "scroll-ps": q()
      }],
      "scroll-pe": [{
        "scroll-pe": q()
      }],
      "scroll-pt": [{
        "scroll-pt": q()
      }],
      "scroll-pr": [{
        "scroll-pr": q()
      }],
      "scroll-pb": [{
        "scroll-pb": q()
      }],
      "scroll-pl": [{
        "scroll-pl": q()
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
        "will-change": ["auto", "scroll", "contents", "transform", $]
      }],
      fill: [{
        fill: [e, "none"]
      }],
      "stroke-w": [{
        stroke: [le, ae, Pe]
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
}, Y = /* @__PURE__ */ Ot(rr);
function j(e, r, l, i) {
  let o = { ...r }, t = null, s = { ...l }, u = null, n = { ...i }, c = null;
  for (const f of e)
    t === null && f in o && (o = o[f], typeof o == "string" && (t = o)), u === null && f in s && (s = s[f], typeof s == "string" && (u = s)), c === null && f in n && (n = n[f], typeof n == "string" && (c = n));
  return Y(t, u, c);
}
const or = { class: "relative" }, lr = ["dusk", "disabled"], nr = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, Te = {
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
    const i = l, o = e, t = V(!1), s = V(null);
    function u() {
      t.value = !t.value;
    }
    function n() {
      t.value = !1;
    }
    Ne(t, () => {
      s.value.update(), t.value || i("closed"), t.value && i("opened");
    });
    const c = V(null), f = V(null);
    Ce(() => {
      s.value = mt(c.value, f.value, {
        placement: o.placement,
        modifiers: [ht, gt]
      });
    }), r({ hide: n });
    const x = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, p = se("themeVariables"), z = (T) => {
      var v, w;
      let y = "";
      return T === "button" && o.disabled && (y = "cursor-not-allowed"), Y(
        y,
        j([T, "base"], x, (v = p == null ? void 0 : p.inertia_table) == null ? void 0 : v.button_with_dropdown, o.ui),
        j([T, "color", o.color], x, (w = p == null ? void 0 : p.inertia_table) == null ? void 0 : w.button_with_dropdown, o.ui)
      );
    };
    return (T, y) => (m(), A(St, { do: n }, {
      default: O(() => [
        a("div", or, [
          a("button", {
            ref_key: "button",
            ref: c,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: M(z("button")),
            "aria-haspopup": "true",
            onClick: G(u, ["prevent"])
          }, [
            R(T.$slots, "button")
          ], 10, lr),
          Q(a("div", {
            ref_key: "tooltip",
            ref: f,
            class: "absolute z-10"
          }, [
            a("div", nr, [
              R(T.$slots, "default")
            ])
          ], 512), [
            [J, t.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const $e = (e, r) => {
  const l = e.__vccOpts || e;
  for (const [i, o] of r)
    l[i] = o;
  return l;
}, sr = {
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
    const r = e, l = (i) => {
      r.onResize(i, r.columnKey);
    };
    return (i, o) => (m(), g("div", {
      class: M(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: l
    }, o[0] || (o[0] = [
      at('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ]), 34));
  }
}, ar = /* @__PURE__ */ $e(sr, [["__scopeId", "data-v-672a9339"]]), ir = { class: "w-full flex gap-2 justify-between items-center" }, ur = { class: "relative inline-flex items-center cursor-pointer" }, cr = ["checked"], Je = {
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
    }, i = se("themeVariables"), o = (t) => {
      var u, n, c, f;
      let s = r.color;
      return t === "toggle" && r.filter.value === null && (s = "disabled"), Y(
        j([t, "base"], l, (n = (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : n.toggle_filter, r.ui),
        j([t, "color", s], l, (f = (c = i == null ? void 0 : i.inertia_table) == null ? void 0 : c.table_filter) == null ? void 0 : f.toggle_filter, r.ui)
      );
    };
    return (t, s) => (m(), g("div", ir, [
      a("label", ur, [
        a("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: s[0] || (s[0] = (u) => e.onFilterChange(e.filter.key, u.target.checked ? "1" : "0"))
        }, null, 40, cr),
        a("div", {
          class: M(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", o("toggle")])
        }, null, 2)
      ]),
      a("button", {
        class: M(o("reset_button")),
        onClick: s[1] || (s[1] = G((u) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, s[2] || (s[2] = [
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
      ]), 2)
    ]));
  }
}, dr = {
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
      const r = this.getTheme("button"), l = /h-(\d+)/, i = r.match(l), o = 4;
      let t = null;
      return i && 1 in i ? t = i[1] : t = o, e ? `margin-top: ${(t - o + 12) * 0.25}rem` : `margin-top: -${((t - o) / 2 + 9) * 0.25}rem`;
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
      let i = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), o = Number(Math.round(i / this.step) * this.step).toFixed(2);
      o >= this.min && o <= this.max && (this.moveMin && o !== this.currentMinValue && o <= this.currentMaxValue && (this.internalValue = [o, this.currentMaxValue]), this.moveMax && o !== this.currentMaxValue && o >= this.currentMinValue && (this.internalValue = [this.currentMinValue, o])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var r, l, i, o, t, s;
      return Y(
        j([e, "base"], this.fallbackTheme, (i = (l = (r = this.themeVariables) == null ? void 0 : r.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : i.number_range_filter, this.ui),
        j([e, "color", this.color], this.fallbackTheme, (s = (t = (o = this.themeVariables) == null ? void 0 : o.inertia_table) == null ? void 0 : t.table_filter) == null ? void 0 : s.number_range_filter, this.ui)
      );
    }
  }
}, fr = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, mr = { class: "py-1 relative min-w-full" }, gr = { class: "z-40" }, hr = {
  ref: "popover_min",
  class: "relative shadow-md"
}, pr = { key: 0 }, br = { key: 1 }, vr = { class: "z-40" }, yr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, xr = { key: 0 }, wr = { key: 1 }, kr = { draggable: "true" }, Cr = { key: 0 }, $r = { key: 1 }, Sr = { key: 0 }, Mr = { key: 1 };
function _r(e, r, l, i, o, t) {
  var s, u, n, c;
  return m(), g("div", fr, [
    a("div", mr, [
      a("div", {
        class: M(t.getTheme("main_bar"))
      }, [
        a("div", {
          class: M(["absolute", t.getTheme("selected_bar")]),
          style: ue(`width: ${t.rangeWidth}% !important; left: ${t.currentMinValueInPercent}% !important;`)
        }, null, 6),
        a("div", {
          class: M([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ue(`left: ${t.currentMinValueInPercent}%;`),
          onMousedown: r[0] || (r[0] = (f) => t.handleMouseDown(f, !0))
        }, [
          a("div", gr, [
            a("div", hr, [
              a("div", {
                class: M(t.getTheme("popover")),
                style: ue(t.getMarginTop(o.hasOverlap && t.displayFirstDown))
              }, [
                l.prefix ? (m(), g("span", pr, C(l.prefix), 1)) : k("", !0),
                ne(" " + C((s = t.currentMinValue) != null ? s : 0) + " ", 1),
                l.suffix ? (m(), g("span", br, C(l.suffix), 1)) : k("", !0)
              ], 6),
              (m(), g("svg", {
                class: M(["absolute w-full h-2 left-0", [o.hasOverlap && t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, r[2] || (r[2] = [
                a("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ]), 2))
            ], 512)
          ])
        ], 38),
        a("div", {
          class: M([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ue(`left: ${t.currentMaxValueInPercent}%;`),
          onMousedown: r[1] || (r[1] = (f) => t.handleMouseDown(f, !1))
        }, [
          a("div", vr, [
            a("div", yr, [
              a("div", {
                class: M(t.getTheme("popover")),
                style: ue(t.getMarginTop(o.hasOverlap && !t.displayFirstDown))
              }, [
                l.prefix ? (m(), g("span", xr, C(l.prefix), 1)) : k("", !0),
                ne(" " + C((u = t.currentMaxValue) != null ? u : 0) + " ", 1),
                l.suffix ? (m(), g("span", wr, C(l.suffix), 1)) : k("", !0)
              ], 6),
              a("div", kr, [
                (m(), g("svg", {
                  class: M(["absolute w-full h-2 left-0 top-100", [o.hasOverlap && !t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, r[3] || (r[3] = [
                  a("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ]), 2))
              ])
            ], 512)
          ])
        ], 38),
        a("div", {
          class: M(["absolute -ml-1 bottom-0 left-0 -mb-6", t.getTheme("text")])
        }, [
          l.prefix ? (m(), g("span", Cr, C(l.prefix), 1)) : k("", !0),
          ne(" " + C((n = l.min) != null ? n : 0) + " ", 1),
          l.suffix ? (m(), g("span", $r, C(l.suffix), 1)) : k("", !0)
        ], 2),
        a("div", {
          class: M(["absolute -mr-1 bottom-0 right-0 -mb-6", t.getTheme("text")])
        }, [
          l.prefix ? (m(), g("span", Sr, C(l.prefix), 1)) : k("", !0),
          ne(" " + C((c = l.max) != null ? c : 0) + " ", 1),
          l.suffix ? (m(), g("span", Mr, C(l.suffix), 1)) : k("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const Ye = /* @__PURE__ */ $e(dr, [["render", _r]]), zr = { class: "relative inline-block" }, qr = ["dusk"], Nr = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Tr = { class: "p-2" }, Ir = ["name", "value", "onChange"], Vr = ["value"], Fr = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Pr = {
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
    const r = e, l = V(!1), i = V(null), o = P(() => r.filters.filter((y) => y.key === r.columnKey || y.key.startsWith(r.columnKey + "_") || y.key.includes(r.columnKey))), t = P(() => o.value.some((y) => !n(y)));
    function s() {
      o.value.length > 0 && (l.value = !l.value);
    }
    function u() {
      l.value = !1;
    }
    function n(y) {
      if (y.value === null)
        return !0;
      switch (y.type) {
        case "number_range":
          return Number(Math.max(...y.value)) === Number(y.max) && Number(Math.min(...y.value)) === Number(y.min);
        case "select":
          return y.value === "";
        case "toggle":
          return !1;
        default:
          return !y.value;
      }
    }
    function c(y, v) {
      r.onFilterChange(y, v);
    }
    function f(y) {
      let v = y.value;
      y.value && (Number(Math.max(...y.value)) === Number(y.max) && Number(Math.min(...y.value)) === Number(y.min) ? v = null : Number(Math.min(...y.value)) === 0 && Number(Math.max(...y.value)) === 0 && (v = ["0", "0"])), r.onFilterChange(y.key, v);
    }
    const x = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, p = se("themeVariables"), z = (y) => {
      var v, w, _, I;
      return Y(
        j([y, "base"], x, (w = (v = p == null ? void 0 : p.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : w.select_filter, r.ui),
        j([y, "color", r.color], x, (I = (_ = p == null ? void 0 : p.inertia_table) == null ? void 0 : _.table_filter) == null ? void 0 : I.select_filter, r.ui)
      );
    };
    function T(y) {
      i.value && !i.value.contains(y.target) && !y.target.closest(`[dusk="column-filter-${r.columnKey}"]`) && u();
    }
    return Ce(() => {
      document.addEventListener("click", T);
    }), Ae(() => {
      document.removeEventListener("click", T);
    }), (y, v) => (m(), g("div", zr, [
      a("button", {
        onClick: s,
        class: M([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": t.value,
            "text-gray-400 hover:text-gray-600": !t.value
          }
        ]),
        dusk: `column-filter-${e.columnKey}`
      }, v[1] || (v[1] = [
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
      ]), 10, qr),
      l.value ? (m(), g("div", {
        key: 0,
        ref_key: "dropdown",
        ref: i,
        class: "absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-max",
        onClick: v[0] || (v[0] = G(() => {
        }, ["stop"]))
      }, [
        (m(!0), g(D, null, U(o.value, (w) => (m(), g("div", {
          key: w.key
        }, [
          a("h3", Nr, C(w.label), 1),
          a("div", Tr, [
            w.type === "select" ? (m(), g("select", {
              key: 0,
              name: w.key,
              value: w.value,
              class: M(z("select")),
              onChange: (_) => c(w.key, _.target.value)
            }, [
              (m(!0), g(D, null, U(w.options, (_, I) => (m(), g("option", {
                key: I,
                value: I
              }, C(_), 9, Vr))), 128))
            ], 42, Ir)) : k("", !0),
            w.type === "toggle" ? (m(), A(Je, {
              key: 1,
              filter: w,
              "on-filter-change": c,
              color: e.color
            }, null, 8, ["filter", "color"])) : k("", !0),
            w.type === "number_range" ? (m(), g("div", Fr, [
              ce(Ye, {
                modelValue: w.value,
                "onUpdate:modelValue": [(_) => w.value = _, (_) => f(w)],
                max: w.max,
                min: w.min,
                prefix: w.prefix,
                suffix: w.suffix,
                step: w.step,
                color: e.color
              }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
            ])) : k("", !0)
          ])
        ]))), 128))
      ], 512)) : k("", !0),
      l.value ? (m(), g("div", {
        key: 1,
        class: "fixed inset-0 z-40",
        onClick: u
      })) : k("", !0)
    ]));
  }
};
const Rr = ["data-column-key"], Ar = { class: "flex flex-row items-center justify-between w-full" }, Or = { class: "flex flex-row items-center" }, jr = { class: "uppercase" }, Lr = ["sorted"], Br = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Wr = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Er = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Gr = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const r = e, l = se("columnResize", null), i = P(() => {
      if (!l)
        return "auto";
      const n = l.getColumnWidth(r.cell.key);
      return n === "auto" ? n : `${n}px`;
    }), o = P(() => (l == null ? void 0 : l.isResizing) || !1), t = P(() => (l == null ? void 0 : l.resizingColumn) || null);
    function s() {
      r.cell.sortable && r.cell.onSort(r.cell.key);
    }
    function u(n, c) {
      l && l.startResize(n, c);
    }
    return (n, c) => Q((m(), g("th", {
      class: M(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: ue({ width: i.value }),
      "data-column-key": e.cell.key
    }, [
      (m(), A(pe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: G(s, ["prevent"])
      }, {
        default: O(() => [
          a("span", Ar, [
            a("span", Or, [
              R(n.$slots, "label", {}, () => [
                a("span", jr, C(e.cell.label), 1)
              ], !0),
              R(n.$slots, "sort", {}, () => [
                e.cell.sortable ? (m(), g("svg", {
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
                  e.cell.sorted ? k("", !0) : (m(), g("path", Br)),
                  e.cell.sorted === "asc" ? (m(), g("path", Wr)) : k("", !0),
                  e.cell.sorted === "desc" ? (m(), g("path", Er)) : k("", !0)
                ], 10, Lr)) : k("", !0)
              ], !0)
            ]),
            R(n.$slots, "filter", {}, () => [
              e.cell.filters && e.cell.filters.length > 0 ? (m(), A(Pr, {
                key: 0,
                "column-key": e.cell.key,
                filters: e.cell.filters,
                "on-filter-change": e.cell.onFilterChange,
                color: e.cell.color,
                onClick: c[0] || (c[0] = G(() => {
                }, ["stop"]))
              }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : k("", !0)
            ], !0)
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && E(l) ? (m(), A(ar, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": u,
        "is-active": o.value && t.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : k("", !0)
    ], 14, Rr)), [
      [J, !e.cell.hidden]
    ]);
  }
}, Dr = /* @__PURE__ */ $e(Gr, [["__scopeId", "data-v-e56b9cbf"]]), Ie = {
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
    lineSelected: "line(s) selected"
  }
}, Ur = Ie.translations;
function Se() {
  return Ie.translations;
}
function Nl(e, r) {
  Ie.translations[e] = r;
}
function Tl(e) {
  Ie.translations = e;
}
const Hr = ["dusk", "value"], Kr = ["value"], De = {
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
    const r = Se(), l = e, i = P(() => {
      let u = [...l.options];
      return u.push(parseInt(l.value)), pt(u).sort((n, c) => n - c);
    }), o = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, t = se("themeVariables"), s = (u) => {
      var n, c;
      return Y(
        j([u, "base"], o, (n = t == null ? void 0 : t.inertia_table) == null ? void 0 : n.per_page_selector, l.ui),
        j([u, "color", l.color], o, (c = t == null ? void 0 : t.inertia_table) == null ? void 0 : c.per_page_selector, l.ui)
      );
    };
    return (u, n) => (m(), g("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: M(s("select")),
      onChange: n[0] || (n[0] = (c) => e.onChange(c.target.value))
    }, [
      (m(!0), g(D, null, U(i.value, (c) => (m(), g("option", {
        key: c,
        value: c
      }, C(c) + " " + C(E(r).per_page), 9, Kr))), 128))
    ], 42, Hr));
  }
}, Xr = {
  key: 0,
  class: "bg-white flex items-center"
}, Qr = { key: 0 }, Jr = { class: "hidden sm:inline ml-2" }, Yr = { class: "hidden sm:inline mr-2" }, Zr = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, eo = { class: "flex flex-row space-x-4 items-center grow" }, to = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, ro = { class: "font-medium" }, oo = { class: "font-medium" }, lo = { class: "font-medium" }, no = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, so = { class: "sr-only" }, ao = { class: "sr-only" }, io = {
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
    const r = Se(), l = e, i = P(() => "links" in t.value ? t.value.links.length > 0 : !1), o = P(() => Object.keys(t.value).length > 0), t = P(() => l.meta), s = P(() => "prev_page_url" in t.value ? t.value.prev_page_url : null), u = P(() => "next_page_url" in t.value ? t.value.next_page_url : null), n = P(() => parseInt(t.value.per_page));
    return (c, f) => o.value ? (m(), g("nav", Xr, [
      !e.hasData || t.value.total < 1 ? (m(), g("p", Qr, C(E(r).no_results_found), 1)) : k("", !0),
      e.hasData ? (m(), g("div", {
        key: 1,
        class: M(["flex-1 flex justify-between", { "sm:hidden": i.value }])
      }, [
        (m(), A(pe(s.value ? "a" : "div"), {
          class: M([{
            "cursor-not-allowed text-gray-400": !s.value,
            "text-gray-700 hover:text-gray-500": s.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: s.value,
          dusk: s.value ? "pagination-simple-previous" : null,
          onClick: f[0] || (f[0] = G((x) => e.onClick(s.value), ["prevent"]))
        }, {
          default: O(() => [
            f[4] || (f[4] = a("svg", {
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
            a("span", Jr, C(E(r).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        ce(De, {
          dusk: "per-page-mobile",
          value: n.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (m(), A(pe(u.value ? "a" : "div"), {
          class: M([{
            "cursor-not-allowed text-gray-400": !u.value,
            "text-gray-700 hover:text-gray-500": u.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: u.value,
          dusk: u.value ? "pagination-simple-next" : null,
          onClick: f[1] || (f[1] = G((x) => e.onClick(u.value), ["prevent"]))
        }, {
          default: O(() => [
            a("span", Yr, C(E(r).next), 1),
            f[5] || (f[5] = a("svg", {
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
      ], 2)) : k("", !0),
      e.hasData && i.value ? (m(), g("div", Zr, [
        a("div", eo, [
          ce(De, {
            dusk: "per-page-full",
            value: n.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          a("p", to, [
            a("span", ro, C(t.value.from), 1),
            ne(" " + C(E(r).to) + " ", 1),
            a("span", oo, C(t.value.to), 1),
            ne(" " + C(E(r).of) + " ", 1),
            a("span", lo, C(t.value.total), 1),
            ne(" " + C(E(r).results), 1)
          ])
        ]),
        a("div", null, [
          a("nav", no, [
            (m(), A(pe(s.value ? "a" : "div"), {
              class: M([{
                "cursor-not-allowed text-gray-400": !s.value,
                "text-gray-500 hover:bg-gray-50": s.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: s.value,
              dusk: s.value ? "pagination-previous" : null,
              onClick: f[2] || (f[2] = G((x) => e.onClick(s.value), ["prevent"]))
            }, {
              default: O(() => [
                a("span", so, C(E(r).previous), 1),
                f[6] || (f[6] = a("svg", {
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
            (m(!0), g(D, null, U(t.value.links, (x, p) => (m(), g("div", { key: p }, [
              R(c.$slots, "link", {}, () => [
                !isNaN(x.label) || x.label === "..." ? (m(), A(pe(x.url ? "a" : "div"), {
                  key: 0,
                  href: x.url,
                  dusk: x.url ? `pagination-${x.label}` : null,
                  class: M(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !x.url,
                    "hover:bg-gray-50": x.url,
                    "bg-white": !x.active,
                    "bg-gray-100": x.active
                  }]),
                  onClick: G((z) => e.onClick(x.url), ["prevent"])
                }, {
                  default: O(() => [
                    ne(C(x.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : k("", !0)
              ])
            ]))), 128)),
            (m(), A(pe(u.value ? "a" : "div"), {
              class: M([{
                "cursor-not-allowed text-gray-400": !u.value,
                "text-gray-500 hover:bg-gray-50": u.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: u.value,
              dusk: u.value ? "pagination-next" : null,
              onClick: f[3] || (f[3] = G((x) => e.onClick(u.value), ["prevent"]))
            }, {
              default: O(() => [
                a("span", ao, C(E(r).next), 1),
                f[7] || (f[7] = a("svg", {
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
      ])) : k("", !0)
    ])) : k("", !0);
  }
}, uo = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, co = ["dusk", "onClick"], fo = {
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
    const r = e, l = V(null);
    function i(o) {
      r.onAdd(o), l.value.hide();
    }
    return (o, t) => (m(), A(Te, {
      ref_key: "dropdown",
      ref: l,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: O(() => t[0] || (t[0] = [
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
      ])),
      default: O(() => [
        a("div", uo, [
          (m(!0), g(D, null, U(e.searchInputs, (s, u) => (m(), g("button", {
            key: u,
            dusk: `add-search-row-${s.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: G((n) => i(s.key), ["prevent"])
          }, C(s.label), 9, co))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, mo = {
  key: 0,
  class: "ml-1"
}, go = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, ho = { class: "px-2" }, po = { class: "divide-y divide-gray-200" }, bo = { class: "text-sm text-gray-900" }, vo = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], yo = {
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
    const r = e, l = P(() => r.columns.filter((i) => i.hidden).length);
    return (i, o) => (m(), A(Te, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: O(() => [
        o[0] || (o[0] = a("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
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
        e.hasHiddenColumns ? (m(), g("span", mo, "(" + C(l.value) + ")", 1)) : k("", !0)
      ]),
      default: O(() => [
        a("div", go, [
          a("div", ho, [
            a("ul", po, [
              (m(!0), g(D, null, U(r.columns, (t, s) => Q((m(), g("li", {
                key: s,
                class: "py-2 flex items-center justify-between"
              }, [
                a("p", bo, C(t.label), 1),
                a("button", {
                  type: "button",
                  class: M(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                    "bg-green-500": !t.hidden,
                    "bg-gray-200": t.hidden
                  }]),
                  "aria-pressed": !t.hidden,
                  "aria-labelledby": `toggle-column-${t.key}`,
                  "aria-describedby": `toggle-column-${t.key}`,
                  dusk: `toggle-column-${t.key}`,
                  onClick: G((u) => e.onChange(t.key, t.hidden), ["prevent"])
                }, [
                  o[1] || (o[1] = a("span", { class: "sr-only" }, "Column status", -1)),
                  a("span", {
                    "aria-hidden": "true",
                    class: M([{
                      "translate-x-5": !t.hidden,
                      "translate-x-0": t.hidden
                    }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                  }, null, 2)
                ], 10, vo)
              ])), [
                [J, t.can_be_hidden]
              ])), 128))
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, xo = {
  key: 0,
  class: "ml-1"
}, wo = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, ko = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Co = { class: "p-2" }, $o = ["name", "value", "onChange"], So = ["value"], Mo = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, _o = {
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
    V(null);
    const l = P(() => r.filters.filter((n) => !i(n)).length);
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
        default:
          return !n.value;
      }
    }
    function o(n) {
      let c = n.value;
      n.value && (Number(Math.max(...n.value)) === Number(n.max) && Number(Math.min(...n.value)) === Number(n.min) ? c = null : Number(Math.min(...n.value)) === 0 && Number(Math.max(...n.value)) === 0 && (c = ["0", "0"])), r.onFilterChange(n.key, c);
    }
    const t = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, s = se("themeVariables"), u = (n) => {
      var c, f, x, p;
      return Y(
        j([n, "base"], t, (f = (c = s == null ? void 0 : s.inertia_table) == null ? void 0 : c.table_filter) == null ? void 0 : f.select_filter, r.ui),
        j([n, "color", r.color], t, (p = (x = s == null ? void 0 : s.inertia_table) == null ? void 0 : x.table_filter) == null ? void 0 : p.select_filter, r.ui)
      );
    };
    return (n, c) => (m(), A(Te, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: O(() => [
        c[0] || (c[0] = a("svg", {
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
        e.hasEnabledFilters ? (m(), g("span", xo, "(" + C(l.value) + ")", 1)) : k("", !0)
      ]),
      default: O(() => [
        a("div", wo, [
          (m(!0), g(D, null, U(e.filters, (f, x) => (m(), g("div", { key: x }, [
            a("h3", ko, C(f.label), 1),
            a("div", Co, [
              f.type === "select" ? (m(), g("select", {
                key: 0,
                name: f.key,
                value: f.value,
                class: M(u("select", e.color)),
                onChange: (p) => e.onFilterChange(f.key, p.target.value)
              }, [
                (m(!0), g(D, null, U(f.options, (p, z) => (m(), g("option", {
                  key: z,
                  value: z
                }, C(p), 9, So))), 128))
              ], 42, $o)) : k("", !0),
              f.type === "toggle" ? (m(), A(Je, {
                key: 1,
                filter: f,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : k("", !0),
              f.type === "number_range" ? (m(), g("div", Mo, [
                ce(Ye, {
                  modelValue: f.value,
                  "onUpdate:modelValue": [(p) => f.value = p, (p) => o(f)],
                  max: f.max,
                  min: f.min,
                  prefix: f.prefix,
                  suffix: f.suffix,
                  step: f.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : k("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, zo = { class: "relative" }, qo = ["placeholder", "value"], No = {
  __name: "TableGlobalSearch",
  props: {
    label: {
      type: String,
      default: Ur.search,
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
    }, i = se("themeVariables"), o = (t) => {
      var s, u;
      return Y(
        j([t, "base"], l, (s = i == null ? void 0 : i.inertia_table) == null ? void 0 : s.global_search, r.ui),
        j([t, "color", r.color], l, (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.global_search, r.ui)
      );
    };
    return (t, s) => (m(), g("div", zo, [
      a("input", {
        class: M(o("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: s[0] || (s[0] = (u) => e.onChange(u.target.value))
      }, null, 42, qo),
      s[1] || (s[1] = a("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
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
}, To = { class: "flex rounded-md shadow-sm relative mt-3" }, Io = ["for"], Vo = ["id", "name", "value", "onInput"], Fo = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Po = ["dusk", "onClick"], Ro = {
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
    const r = { el: V([]) };
    let l = P(() => r.el.value);
    const i = e;
    function o(n) {
      return i.forcedVisibleSearchInputs.includes(n);
    }
    Ne(i.forcedVisibleSearchInputs, (n) => {
      const c = n.length > 0 ? n[n.length - 1] : null;
      !c || it().then(() => {
        const f = vt(l.value, (x) => x.name === c);
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
    }, s = se("themeVariables"), u = (n) => {
      var c, f;
      return Y(
        j([n, "base"], t, (c = s == null ? void 0 : s.inertia_table) == null ? void 0 : c.table_search_rows, i.ui),
        j([n, "color", i.color], t, (f = s == null ? void 0 : s.inertia_table) == null ? void 0 : f.table_search_rows, i.ui)
      );
    };
    return (n, c) => (m(!0), g(D, null, U(e.searchInputs, (f, x) => Q((m(), g("div", {
      key: x,
      class: "px-4 sm:px-0"
    }, [
      a("div", To, [
        a("label", {
          for: f.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          c[0] || (c[0] = a("svg", {
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
          a("span", null, C(f.label), 1)
        ], 8, Io),
        (m(), g("input", {
          id: f.key,
          ref_for: !0,
          ref: r.el,
          key: f.key,
          name: f.key,
          value: f.value,
          type: "text",
          class: M(u("input")),
          onInput: (p) => e.onChange(f.key, p.target.value)
        }, null, 42, Vo)),
        a("div", Fo, [
          a("button", {
            class: M(u("remove_button")),
            dusk: `remove-search-row-${f.key}`,
            onClick: G((p) => e.onRemove(f.key), ["prevent"])
          }, c[1] || (c[1] = [
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
          ]), 10, Po)
        ])
      ])
    ])), [
      [J, f.value !== null || o(f.key)]
    ])), 128));
  }
}, Ao = {
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
    const r = Se(), l = e, i = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, o = se("themeVariables"), t = (s) => {
      var u, n;
      return Y(
        j([s, "base"], i, (u = o == null ? void 0 : o.inertia_table) == null ? void 0 : u.reset_button, l.ui),
        j([s, "color", l.color], i, (n = o == null ? void 0 : o.inertia_table) == null ? void 0 : n.reset_button, l.ui)
      );
    };
    return (s, u) => {
      var n;
      return m(), g("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: M(t("button")),
        "aria-haspopup": "true",
        onClick: u[0] || (u[0] = G((...c) => e.onClick && e.onClick(...c), ["prevent"]))
      }, [
        u[1] || (u[1] = a("svg", {
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
        a("span", null, C((n = E(r).reset) != null ? n : "Reset"), 1)
      ], 2);
    };
  }
}, Oo = {}, jo = { class: "flow-root" }, Lo = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, Bo = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, Wo = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function Eo(e, r) {
  return m(), g("div", jo, [
    a("div", Lo, [
      a("div", Bo, [
        a("div", Wo, [
          R(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Go = /* @__PURE__ */ $e(Oo, [["render", Eo]]), Do = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Uo = ["dusk", "onClick"], Ho = { class: "px-2" }, Ko = { class: "divide-y divide-gray-200" }, Xo = { class: "text-sm text-gray-900" }, Qo = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Jo = {
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
    const r = Se(), l = V(!1), i = V(!1);
    function o() {
      l.value = i.value = !1;
    }
    return (t, s) => (m(), A(Te, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: o
    }, {
      button: O(() => s[5] || (s[5] = [
        a("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          a("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])),
      default: O(() => {
        var u, n, c, f, x;
        return [
          a("div", Do, [
            Q(a("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (m(), g("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: s[0] || (s[0] = (p) => i.value = !0)
              }, [
                s[6] || (s[6] = a("svg", {
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
                a("span", null, C((u = E(r).add_search_fields) != null ? u : "Add search field"), 1)
              ])) : k("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (m(), g("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: s[1] || (s[1] = (p) => l.value = !0)
              }, [
                s[7] || (s[7] = a("svg", {
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
                a("span", null, C((n = E(r).show_hide_columns) != null ? n : "Show / Hide columns"), 1)
              ])) : k("", !0),
              s[9] || (s[9] = a("hr", null, null, -1)),
              "reset" in e.actions ? (m(), g("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: s[2] || (s[2] = (...p) => {
                  var z, T;
                  return ((z = e.actions.reset) == null ? void 0 : z.onClick) && ((T = e.actions.reset) == null ? void 0 : T.onClick(...p));
                })
              }, [
                s[8] || (s[8] = a("svg", {
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
                a("span", null, C((c = E(r).grouped_reset) != null ? c : "Reset"), 1)
              ])) : k("", !0)
            ], 512), [
              [J, !l.value && !i.value]
            ]),
            Q(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: s[3] || (s[3] = (p) => i.value = !1)
              }, [
                s[10] || (s[10] = a("svg", {
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
                a("span", null, C((f = E(r).add_search_fields) != null ? f : "Add search field"), 1)
              ]),
              (m(!0), g(D, null, U(e.actions.searchFields.searchInputs, (p, z) => (m(), g("button", {
                key: z,
                dusk: `add-search-row-${p.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: G((T) => e.actions.searchFields.onClick(p.key), ["prevent"])
              }, C(p.label), 9, Uo))), 128))
            ], 512), [
              [J, i.value]
            ]),
            Q(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: s[4] || (s[4] = (p) => l.value = !1)
              }, [
                s[11] || (s[11] = a("svg", {
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
                a("span", null, C((x = E(r).show_hide_columns) != null ? x : "Show / Hide columns"), 1)
              ]),
              a("div", Ho, [
                a("ul", Ko, [
                  (m(!0), g(D, null, U(e.actions.toggleColumns.columns, (p, z) => Q((m(), g("li", {
                    key: z,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    a("p", Xo, C(p.label), 1),
                    a("button", {
                      type: "button",
                      class: M(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !p.hidden,
                        "bg-gray-200": p.hidden
                      }]),
                      "aria-pressed": !p.hidden,
                      "aria-labelledby": `toggle-column-${p.key}`,
                      "aria-describedby": `toggle-column-${p.key}`,
                      dusk: `toggle-column-${p.key}`,
                      onClick: G((T) => e.actions.toggleColumns.onChange(p.key, p.hidden), ["prevent"])
                    }, [
                      s[12] || (s[12] = a("span", { class: "sr-only" }, "Column status", -1)),
                      a("span", {
                        "aria-hidden": "true",
                        class: M([{
                          "translate-x-5": !p.hidden,
                          "translate-x-0": p.hidden
                        }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                      }, null, 2)
                    ], 10, Qo)
                  ])), [
                    [J, p.can_be_hidden]
                  ])), 128))
                ])
              ])
            ], 512), [
              [J, l.value]
            ]),
            Q(a("div", null, [
              R(t.$slots, "default")
            ], 512), [
              [J, !l.value && !i.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function Yo(e) {
  const r = V(!1), l = V(null), i = V(0), o = V(0), t = ut({}), s = () => {
    if (e === "default")
      return;
    const v = localStorage.getItem(`table-column-widths-${e}`);
    if (v)
      try {
        const w = JSON.parse(v);
        Object.assign(t, w);
      } catch (w) {
        console.warn("Unable to load column widths:", w);
      }
  }, u = () => {
    e !== "default" && localStorage.setItem(`table-column-widths-${e}`, JSON.stringify(t));
  }, n = (v, w) => {
    v.preventDefault(), v.stopPropagation(), r.value = !0, l.value = w, i.value = v.clientX;
    const _ = v.target.closest("th");
    o.value = _.offsetWidth;
    const I = _.closest("table");
    I && I.querySelectorAll("thead th[data-column-key]").forEach((B) => {
      const W = B.getAttribute("data-column-key"), H = B.offsetWidth;
      t[W] || (t[W] = H), B.style.width = `${t[W]}px`;
      const K = Array.from(B.parentNode.children).indexOf(B);
      I.querySelectorAll("tbody tr").forEach((Z) => {
        const ee = Z.children[K];
        ee && (ee.style.width = `${t[W]}px`);
      });
    }), document.addEventListener("mousemove", c), document.addEventListener("mouseup", f), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, c = (v) => {
    if (!r.value || !l.value)
      return;
    const w = v.clientX - i.value, _ = Math.max(50, o.value + w);
    t[l.value] = _;
    const I = document.querySelector(`th[data-column-key="${l.value}"]`);
    if (I) {
      I.style.width = `${_}px`;
      const L = I.closest("table");
      if (L) {
        const B = Array.from(I.parentNode.children).indexOf(I);
        L.querySelectorAll("tbody tr").forEach((H) => {
          const K = H.children[B];
          K && (K.style.width = `${_}px`);
        });
      }
    }
  }, f = () => {
    r.value && (r.value = !1, l.value = null, u(), document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", f), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, x = (v) => t[v] || "auto", p = (v, w) => {
    t[v] = w, u();
  }, z = (v) => {
    if (!v)
      return;
    v.querySelectorAll("thead th[data-column-key]").forEach((_) => {
      const I = _.getAttribute("data-column-key");
      if (!t[I]) {
        const W = _.offsetWidth;
        t[I] = Math.max(W, 100);
      }
      _.style.width = `${t[I]}px`;
      const L = Array.from(_.parentNode.children).indexOf(_);
      v.querySelectorAll("tbody tr").forEach((W) => {
        const H = W.children[L];
        H && (H.style.width = `${t[I]}px`);
      });
    });
  }, T = () => {
    Object.keys(t).forEach((v) => {
      delete t[v];
    }), e !== "default" && localStorage.removeItem(`table-column-widths-${e}`);
  }, y = () => {
    r.value && (document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", f), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Ce(() => {
    s();
  }), Ae(() => {
    y();
  }), {
    isResizing: r,
    resizingColumn: l,
    columnWidths: t,
    startResize: n,
    getColumnWidth: x,
    setColumnWidth: p,
    resetColumnWidths: T,
    loadColumnWidths: s,
    saveColumnWidths: u,
    initializeColumnWidths: z
  };
}
const Zo = ["dusk"], el = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, tl = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, rl = { class: "mr-2 sm:mr-4" }, ol = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, ll = { class: "overflow-x-auto" }, nl = { class: "bg-gray-50" }, sl = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border",
  style: { width: "60px" }
}, al = ["id"], il = { class: "divide-y divide-gray-200 bg-white" }, ul = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500",
  style: { width: "60px" }
}, cl = ["id", "onUpdate:modelValue"], dl = ["onClick", "data-column-key"], fl = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, ml = {
  key: 0,
  class: "italic text-sm px-2"
}, gl = {
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
    }
  },
  emits: ["rowClicked", "selectionChanged"],
  setup(e, { emit: r }) {
    const l = Se(), i = r, o = e;
    ct();
    const t = o.resizeableColumns ? Yo(o.name) : null;
    dt("columnResize", t);
    const s = V(!1), u = V(0), n = P(() => {
      let d = Ve().props.queryBuilderProps ? { ...Ve().props.queryBuilderProps[o.name] } : {};
      return d._updates = u.value, d;
    }), c = V(n.value), f = P(() => n.value.pageName), x = V([]), p = V(null), z = V(!1), T = P(() => n.value.hasToggleableColumns || n.value.hasFilters || n.value.hasSearchInputs ? !1 : !n.value.globalSearch), y = P(() => Object.keys(o.resource).length === 0 ? o.data : "data" in o.resource ? o.resource.data : o.resource), v = P(() => Object.keys(o.resource).length === 0 ? o.meta : "links" in o.resource && "meta" in o.resource && Object.keys(o.resource.links).length === 4 && "next" in o.resource.links && "prev" in o.resource.links ? {
      ...o.resource.meta,
      next_page_url: o.resource.links.next,
      prev_page_url: o.resource.links.prev
    } : "meta" in o.resource ? o.resource.meta : o.resource), w = P(() => y.value.length > 0 ? !0 : v.value.total > 0), _ = V({
      reset: {
        onClick: W
      },
      toggleColumns: {
        show: n.value.hasToggleableColumns,
        columns: n.value.columns,
        onChange: fe
      },
      searchFields: {
        show: n.value.hasSearchInputs,
        searchInputs: n.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: n.value.hasSearchInputsWithoutValue,
        onClick: L
      }
    });
    function I(d) {
      x.value = x.value.filter((h) => h != d), K(d, null);
    }
    function L(d) {
      x.value.push(d);
    }
    const B = P(() => {
      if (x.value.length > 0)
        return !0;
      const d = Fe.parse(location.search.substring(1));
      if (d[f.value] > 1)
        return !0;
      const b = o.name === "default" ? "" : o.name + "_";
      let S = !1;
      return oe(["filter", "columns", "cursor", "sort"], (N) => {
        const re = d[b + N];
        N === "sort" && re === n.value.defaultSort || re !== void 0 && (S = !0);
      }), S;
    });
    function W() {
      x.value = [], oe(c.value.filters, (d, h) => {
        c.value.filters[h].value = null;
      }), oe(c.value.searchInputs, (d, h) => {
        c.value.searchInputs[h].value = null;
      }), oe(c.value.columns, (d, h) => {
        c.value.columns[h].hidden = d.can_be_hidden ? !n.value.defaultVisibleToggleableColumns.includes(d.key) : !1;
      }), localStorage.removeItem(`columns-${o.name}`), o.resizeableColumns && t && t.resetColumnWidths(), c.value.sort = null, c.value.cursor = null, c.value.page = 1;
    }
    const H = {};
    function K(d, h) {
      clearTimeout(H[d]), H[d] = setTimeout(() => {
        he.value && o.preventOverlappingRequests && he.value.cancel();
        const b = q("searchInputs", d);
        c.value.searchInputs[b].value = h, c.value.cursor = null, c.value.page = 1;
      }, o.inputDebounceMs);
    }
    function de(d) {
      K("global", d);
    }
    function Z(d, h) {
      const b = q("filters", d);
      c.value.filters[b].value = h, c.value.cursor = null, c.value.page = 1;
    }
    function ee(d) {
      c.value.cursor = null, c.value.perPage = d, c.value.page = 1;
    }
    function q(d, h) {
      return wt(c.value[d], (b) => b.key == h);
    }
    function fe(d, h) {
      const b = q("columns", d);
      c.value.columns[b].hidden = !h;
      const S = c.value.columns.map((N) => ({
        key: N.key,
        hidden: N.hidden
      }));
      localStorage.setItem(`columns-${o.name}`, JSON.stringify(S));
    }
    function me() {
      let d = {};
      return oe(c.value.searchInputs, (h) => {
        h.value !== null && (d[h.key] = h.value);
      }), oe(c.value.filters, (h) => {
        let b = h.value;
        b !== null && (h.type === "number_range" && Number(Math.max(...h.value)) === Number(h.max) && Number(Math.min(...h.value)) === Number(h.min) && (b = null), d[h.key] = b);
      }), d;
    }
    function Me() {
      const d = c.value.columns;
      let h = xt(d, (S) => !S.hidden), b = Ct(h, (S) => S.key).sort();
      return kt(b, n.value.defaultVisibleToggleableColumns) ? {} : b;
    }
    function ge() {
      const d = me(), h = Me(), b = {};
      Object.keys(d).length > 0 && (b.filter = d), Object.keys(h).length > 0 && (b.columns = h);
      const S = c.value.cursor, N = c.value.page, re = c.value.sort, qe = c.value.perPage;
      return S && (b.cursor = S), N > 1 && (b.page = N), qe > 1 && (b.perPage = qe), re && (b.sort = re), b;
    }
    function ye(d) {
      var S, N, re;
      if (!d)
        return null;
      const h = (S = Ve().props.queryBuilderProps[o.name].pageName) != null ? S : "page", b = (re = (N = new URL(d)) == null ? void 0 : N.searchParams) == null ? void 0 : re.get(h);
      b !== null ? c.value.page = b : X(d);
    }
    function xe() {
      const d = Fe.parse(location.search.substring(1)), h = o.name === "default" ? "" : o.name + "_";
      oe(["filter", "columns", "cursor", "sort"], (S) => {
        delete d[h + S];
      }), delete d[f.value], oe(ge(), (S, N) => {
        N === "page" ? d[f.value] = S : N === "perPage" ? d.perPage = S : d[h + N] = S;
      });
      let b = Fe.stringify(d, {
        filter(S, N) {
          return typeof N == "object" && N !== null ? $t(N) : N;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!b || b === f.value + "=1") && (b = ""), b;
    }
    const te = V(!1), he = V(null);
    function X(d) {
      !d || bt.get(
        d,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: o.preserveScroll !== !1,
          onBefore() {
            te.value = !0;
          },
          onCancelToken(h) {
            he.value = h;
          },
          onFinish() {
            te.value = !1;
          },
          onSuccess() {
            if (o.preserveScroll === "table-top") {
              const b = p.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: b });
            }
            u.value++;
          }
        }
      );
    }
    function Ze(d, h, b) {
      var S;
      o.hasCheckboxes && ((S = d.target) == null ? void 0 : S.parentElement.cellIndex) === 0 || i("rowClicked", d, h, b);
    }
    Ne(c, () => {
      X(location.pathname + "?" + xe()), z.value = !1;
    }, { deep: !0 }), Ne(o.resource, () => {
      const d = o.resource.data.filter((h) => h.__itSelected);
      i("selectionChanged", d);
    }, { deep: !0 });
    const je = () => {
      u.value++, o.resizeableColumns && t && setTimeout(() => {
        var h;
        const d = (h = p.value) == null ? void 0 : h.querySelector("table");
        d && t.initializeColumnWidths(d);
      }, 0);
    };
    Ce(() => {
      document.addEventListener("inertia:success", je);
      const d = localStorage.getItem(`columns-${o.name}`);
      if (d) {
        const h = JSON.parse(d);
        oe(c.value.columns, (b, S) => {
          c.value.columns[S].hidden = h[S].hidden;
        });
      }
      o.resizeableColumns && t && setTimeout(() => {
        var b;
        const h = (b = p.value) == null ? void 0 : b.querySelector("table");
        h && t.initializeColumnWidths(h);
      }, 0);
    }), Ae(() => {
      document.removeEventListener("inertia:success", je);
    });
    function Le(d) {
      c.value.sort == d ? c.value.sort = `-${d}` : c.value.sort = d, c.value.cursor = null, c.value.page = 1;
    }
    function _e(d) {
      const h = q("columns", d);
      return !c.value.columns[h].hidden;
    }
    function ze(d) {
      const h = q("columns", d), b = yt(n.value.columns[h]);
      return b.onSort = Le, b.filters = n.value.filters.filter(
        (S) => S.key === d || S.key.startsWith(d + "_") || S.key.includes(d)
      ), b.onFilterChange = Z, b.color = o.color, b;
    }
    function et() {
      o.resource.data.forEach((d) => {
        d.__itSelected = z.value;
      });
    }
    function tt(d) {
      if (!o.resizeableColumns || !t)
        return "auto";
      const h = t.getColumnWidth(d);
      return h === "auto" ? h : `${h}px`;
    }
    const rt = P(() => {
      if (!o.resizeableColumns || !t)
        return "100%";
      let d = 0, h = !1;
      return o.hasCheckboxes && (d += 60), n.value.columns.forEach((b) => {
        if (!_e(b.key))
          return;
        const S = t.getColumnWidth(b.key);
        S === "auto" ? h = !0 : d += S;
      }), !h && d > 0 ? `${d}px` : "max(100%, " + (d > 0 ? d + "px" : "800px") + ")";
    }), Be = P(() => o.resource.data.filter((d) => d.__itSelected).length), ot = P(() => Be.value === 0 ? l.noLineSelected : `${Be.value} ${l.lineSelected}`);
    function lt() {
      o.resizeableColumns && (s.value = !0);
    }
    function nt() {
      o.resizeableColumns && setTimeout(() => {
        s.value = !1;
      }, 100);
    }
    return (d, h) => (m(), A(ft, null, {
      default: O(() => [
        (m(), g("fieldset", {
          ref_key: "tableFieldset",
          ref: p,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: M(["min-w-0", { "opacity-75": te.value }])
        }, [
          a("div", el, [
            n.value.globalSearch ? (m(), g("div", tl, [
              R(d.$slots, "tableGlobalSearch", {
                hasGlobalSearch: n.value.globalSearch,
                label: n.value.globalSearch ? n.value.globalSearch.label : null,
                value: n.value.globalSearch ? n.value.globalSearch.value : null,
                onChange: de
              }, () => [
                n.value.globalSearch ? (m(), A(No, {
                  key: 0,
                  class: "grow",
                  label: n.value.globalSearch.label,
                  value: n.value.globalSearch.value,
                  "on-change": de,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : k("", !0)
              ], !0)
            ])) : k("", !0),
            a("div", rl, [
              R(d.$slots, "tableFilter", {
                hasFilters: n.value.hasFilters,
                hasEnabledFilters: n.value.hasEnabledFilters,
                filters: n.value.filters,
                onFilterChange: Z
              }, () => [
                n.value.hasFilters ? (m(), A(_o, {
                  key: 0,
                  "has-enabled-filters": n.value.hasEnabledFilters,
                  filters: n.value.filters,
                  "on-filter-change": Z,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : k("", !0)
              ], !0)
            ]),
            e.withGroupedMenu ? k("", !0) : R(d.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: n.value.hasSearchInputs,
              hasSearchInputsWithoutValue: n.value.hasSearchInputsWithoutValue,
              searchInputs: n.value.searchInputsWithoutGlobal,
              onAdd: L
            }, () => [
              n.value.hasSearchInputs ? (m(), A(fo, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": n.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": n.value.hasSearchInputsWithoutValue,
                "on-add": L,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : k("", !0)
            ], !0),
            e.withGroupedMenu ? k("", !0) : R(d.$slots, "tableColumns", {
              key: 2,
              hasColumns: n.value.hasToggleableColumns,
              columns: n.value.columns,
              hasHiddenColumns: n.value.hasHiddenColumns,
              onChange: fe
            }, () => [
              n.value.hasToggleableColumns ? (m(), A(yo, {
                key: 0,
                class: M({ "mr-2 sm:mr-4": B.value }),
                columns: n.value.columns,
                "has-hidden-columns": n.value.hasHiddenColumns,
                "on-change": fe,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "color"])) : k("", !0)
            ], !0),
            e.withGroupedMenu ? R(d.$slots, "groupedAction", {
              key: 3,
              actions: _.value
            }, () => [
              ce(Jo, {
                color: e.color,
                actions: _.value
              }, {
                default: O(() => [
                  R(d.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : k("", !0),
            e.withGroupedMenu ? k("", !0) : R(d.$slots, "tableReset", {
              key: 4,
              canBeReset: B.value,
              onClick: W
            }, () => [
              B.value ? (m(), g("div", ol, [
                ce(Ao, {
                  "on-click": W,
                  color: e.color
                }, null, 8, ["color"])
              ])) : k("", !0)
            ], !0)
          ]),
          R(d.$slots, "tableSearchRows", {
            hasSearchRowsWithValue: n.value.hasSearchInputsWithValue,
            searchInputs: n.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: x.value,
            onChange: K
          }, () => [
            n.value.hasSearchInputsWithValue || x.value.length > 0 ? (m(), A(Ro, {
              key: 0,
              "search-inputs": n.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": x.value,
              "on-change": K,
              "on-remove": I,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : k("", !0)
          ], !0),
          R(d.$slots, "tableWrapper", { meta: v.value }, () => [
            ce(Go, {
              class: M({ "mt-3": !T.value })
            }, {
              default: O(() => [
                R(d.$slots, "table", {}, () => [
                  a("div", ll, [
                    a("table", {
                      class: M(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && s.value }]),
                      style: ue([{ "table-layout": "fixed", "min-width": "100%" }, { width: rt.value }]),
                      onMouseenter: h[1] || (h[1] = (b) => e.resizeableColumns ? lt : null),
                      onMouseleave: h[2] || (h[2] = (b) => e.resizeableColumns ? nt : null)
                    }, [
                      a("thead", nl, [
                        R(d.$slots, "head", {
                          show: _e,
                          sortBy: Le,
                          header: ze
                        }, () => [
                          a("tr", null, [
                            e.hasCheckboxes ? (m(), g("th", sl, [
                              Q(a("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: et,
                                "onUpdate:modelValue": h[0] || (h[0] = (b) => z.value = b),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, al), [
                                [We, z.value]
                              ])
                            ])) : k("", !0),
                            (m(!0), g(D, null, U(n.value.columns, (b) => (m(), A(Dr, {
                              key: `table-${e.name}-header-${b.key}`,
                              cell: ze(b.key)
                            }, {
                              label: O(() => [
                                R(d.$slots, `header(${b.key})`, {
                                  label: ze(b.key).label,
                                  column: ze(b.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell"]))), 128))
                          ])
                        ], !0)
                      ]),
                      a("tbody", il, [
                        R(d.$slots, "body", { show: _e }, () => [
                          (m(!0), g(D, null, U(y.value, (b, S) => (m(), g("tr", {
                            key: `table-${e.name}-row-${S}`,
                            class: M(["", {
                              "bg-gray-50": e.striped && S % 2,
                              "hover:bg-gray-100": e.striped,
                              "hover:bg-gray-50": !e.striped
                            }])
                          }, [
                            e.hasCheckboxes ? (m(), g("td", ul, [
                              Q(a("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${S}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (N) => b.__itSelected = N
                              }, null, 8, cl), [
                                [We, b.__itSelected]
                              ])
                            ])) : k("", !0),
                            (m(!0), g(D, null, U(n.value.columns, (N, re) => Q((m(), g("td", {
                              key: `table-${e.name}-row-${S}-column-${N.key}`,
                              onClick: (qe) => Ze(qe, b, S),
                              class: M(N.body_class),
                              "data-column-key": N.key,
                              style: ue({
                                width: tt(N.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              })
                            }, [
                              R(d.$slots, `cell(${N.key})`, { item: b }, () => [
                                ne(C(b[N.key]), 1)
                              ], !0)
                            ], 14, dl)), [
                              [J, _e(N.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                R(d.$slots, "pagination", {
                  onClick: ye,
                  hasData: w.value,
                  meta: v.value,
                  perPageOptions: n.value.perPageOptions,
                  onPerPageChange: ee
                }, () => [
                  a("div", fl, [
                    e.hasCheckboxes ? (m(), g("span", ml, C(ot.value), 1)) : k("", !0),
                    ce(io, {
                      "on-click": ye,
                      "has-data": w.value,
                      meta: v.value,
                      "per-page-options": n.value.perPageOptions,
                      "on-per-page-change": ee,
                      color: e.color
                    }, null, 8, ["has-data", "meta", "per-page-options", "color"])
                  ])
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, Zo))
      ]),
      _: 3
    }));
  }
}, Il = /* @__PURE__ */ $e(gl, [["__scopeId", "data-v-131ad978"]]);
export {
  Te as ButtonWithDropdown,
  Dr as HeaderCell,
  St as OnClickOutside,
  io as Pagination,
  Il as Table,
  fo as TableAddSearchRow,
  yo as TableColumns,
  _o as TableFilter,
  No as TableGlobalSearch,
  Ao as TableReset,
  Ro as TableSearchRows,
  Go as TableWrapper,
  Se as getTranslations,
  Nl as setTranslation,
  Tl as setTranslations
};
