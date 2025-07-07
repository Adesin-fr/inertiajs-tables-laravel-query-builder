import { ref as I, onMounted as Fe, onBeforeUnmount as Xe, openBlock as f, createElementBlock as p, renderSlot as N, watch as _e, inject as ie, createBlock as F, withCtx as j, createElementVNode as a, normalizeClass as k, withModifiers as L, withDirectives as G, vShow as U, resolveDynamicComponent as ge, toDisplayString as y, createCommentVNode as w, computed as P, Fragment as E, renderList as W, unref as B, createVNode as ae, createTextVNode as J, normalizeStyle as ye, nextTick as Je, getCurrentInstance as Ze, onUnmounted as et, Transition as tt, vModelCheckbox as Be } from "vue";
import { createPopper as rt } from "@popperjs/core/lib/popper-lite";
import ot from "@popperjs/core/lib/modifiers/preventOverflow";
import lt from "@popperjs/core/lib/modifiers/flip";
import nt from "lodash-es/uniq";
import { usePage as Ne, router as st } from "@inertiajs/vue3";
import at from "lodash-es/find";
import Ve from "qs";
import it from "lodash-es/clone";
import ut from "lodash-es/filter";
import ct from "lodash-es/findKey";
import Y from "lodash-es/forEach";
import dt from "lodash-es/isEqual";
import ft from "lodash-es/map";
import gt from "lodash-es/pickBy";
const pt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const l = e, s = I(null), i = I(null);
    return Fe(() => {
      s.value = (n) => {
        n.target === i.value || i.value.contains(n.target) || l.do();
      }, document.addEventListener("click", s.value), document.addEventListener("touchstart", s.value);
    }), Xe(() => {
      document.removeEventListener("click", s.value), document.removeEventListener("touchstart", s.value);
    }), (n, r) => (f(), p("div", {
      ref_key: "root",
      ref: i
    }, [
      N(n.$slots, "default")
    ], 512));
  }
}, je = "-", ht = (e) => {
  const l = bt(e), {
    conflictingClassGroups: s,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (t) => {
      const o = t.split(je);
      return o[0] === "" && o.length !== 1 && o.shift(), Ee(o, l) || mt(t);
    },
    getConflictingClassGroupIds: (t, o) => {
      const u = s[t] || [];
      return o && i[t] ? [...u, ...i[t]] : u;
    }
  };
}, Ee = (e, l) => {
  var t;
  if (e.length === 0)
    return l.classGroupId;
  const s = e[0], i = l.nextPart.get(s), n = i ? Ee(e.slice(1), i) : void 0;
  if (n)
    return n;
  if (l.validators.length === 0)
    return;
  const r = e.join(je);
  return (t = l.validators.find(({
    validator: o
  }) => o(r))) == null ? void 0 : t.classGroupId;
}, Le = /^\[(.+)\]$/, mt = (e) => {
  if (Le.test(e)) {
    const l = Le.exec(e)[1], s = l == null ? void 0 : l.substring(0, l.indexOf(":"));
    if (s)
      return "arbitrary.." + s;
  }
}, bt = (e) => {
  const {
    theme: l,
    prefix: s
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return yt(Object.entries(e.classGroups), s).forEach(([r, t]) => {
    Ie(t, i, r, l);
  }), i;
}, Ie = (e, l, s, i) => {
  e.forEach((n) => {
    if (typeof n == "string") {
      const r = n === "" ? l : Re(l, n);
      r.classGroupId = s;
      return;
    }
    if (typeof n == "function") {
      if (vt(n)) {
        Ie(n(i), l, s, i);
        return;
      }
      l.validators.push({
        validator: n,
        classGroupId: s
      });
      return;
    }
    Object.entries(n).forEach(([r, t]) => {
      Ie(t, Re(l, r), s, i);
    });
  });
}, Re = (e, l) => {
  let s = e;
  return l.split(je).forEach((i) => {
    s.nextPart.has(i) || s.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), s = s.nextPart.get(i);
  }), s;
}, vt = (e) => e.isThemeGetter, yt = (e, l) => l ? e.map(([s, i]) => {
  const n = i.map((r) => typeof r == "string" ? l + r : typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([t, o]) => [l + t, o])) : r);
  return [s, n];
}) : e, xt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let l = 0, s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const n = (r, t) => {
    s.set(r, t), l++, l > e && (l = 0, i = s, s = /* @__PURE__ */ new Map());
  };
  return {
    get(r) {
      let t = s.get(r);
      if (t !== void 0)
        return t;
      if ((t = i.get(r)) !== void 0)
        return n(r, t), t;
    },
    set(r, t) {
      s.has(r) ? s.set(r, t) : n(r, t);
    }
  };
}, We = "!", wt = (e) => {
  const {
    separator: l,
    experimentalParseClassName: s
  } = e, i = l.length === 1, n = l[0], r = l.length, t = (o) => {
    const u = [];
    let g = 0, c = 0, v;
    for (let $ = 0; $ < o.length; $++) {
      let V = o[$];
      if (g === 0) {
        if (V === n && (i || o.slice($, $ + r) === l)) {
          u.push(o.slice(c, $)), c = $ + r;
          continue;
        }
        if (V === "/") {
          v = $;
          continue;
        }
      }
      V === "[" ? g++ : V === "]" && g--;
    }
    const h = u.length === 0 ? o : o.substring(c), q = h.startsWith(We), M = q ? h.substring(1) : h, z = v && v > c ? v - c : void 0;
    return {
      modifiers: u,
      hasImportantModifier: q,
      baseClassName: M,
      maybePostfixModifierPosition: z
    };
  };
  return s ? (o) => s({
    className: o,
    parseClassName: t
  }) : t;
}, kt = (e) => {
  if (e.length <= 1)
    return e;
  const l = [];
  let s = [];
  return e.forEach((i) => {
    i[0] === "[" ? (l.push(...s.sort(), i), s = []) : s.push(i);
  }), l.push(...s.sort()), l;
}, Ct = (e) => ({
  cache: xt(e.cacheSize),
  parseClassName: wt(e),
  ...ht(e)
}), St = /\s+/, Mt = (e, l) => {
  const {
    parseClassName: s,
    getClassGroupId: i,
    getConflictingClassGroupIds: n
  } = l, r = [], t = e.trim().split(St);
  let o = "";
  for (let u = t.length - 1; u >= 0; u -= 1) {
    const g = t[u], {
      modifiers: c,
      hasImportantModifier: v,
      baseClassName: h,
      maybePostfixModifierPosition: q
    } = s(g);
    let M = Boolean(q), z = i(M ? h.substring(0, q) : h);
    if (!z) {
      if (!M) {
        o = g + (o.length > 0 ? " " + o : o);
        continue;
      }
      if (z = i(h), !z) {
        o = g + (o.length > 0 ? " " + o : o);
        continue;
      }
      M = !1;
    }
    const $ = kt(c).join(":"), V = v ? $ + We : $, O = V + z;
    if (r.includes(O))
      continue;
    r.push(O);
    const H = n(z, M);
    for (let D = 0; D < H.length; ++D) {
      const oe = H[D];
      r.push(V + oe);
    }
    o = g + (o.length > 0 ? " " + o : o);
  }
  return o;
};
function $t() {
  let e = 0, l, s, i = "";
  for (; e < arguments.length; )
    (l = arguments[e++]) && (s = De(l)) && (i && (i += " "), i += s);
  return i;
}
const De = (e) => {
  if (typeof e == "string")
    return e;
  let l, s = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (l = De(e[i])) && (s && (s += " "), s += l);
  return s;
};
function _t(e, ...l) {
  let s, i, n, r = t;
  function t(u) {
    const g = l.reduce((c, v) => v(c), e());
    return s = Ct(g), i = s.cache.get, n = s.cache.set, r = o, o(u);
  }
  function o(u) {
    const g = i(u);
    if (g)
      return g;
    const c = Mt(u, s);
    return n(u, c), c;
  }
  return function() {
    return r($t.apply(null, arguments));
  };
}
const T = (e) => {
  const l = (s) => s[e] || [];
  return l.isThemeGetter = !0, l;
}, Ue = /^\[(?:([a-z-]+):)?(.+)\]$/i, qt = /^\d+\/\d+$/, Tt = /* @__PURE__ */ new Set(["px", "full", "screen"]), zt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Nt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Vt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Pt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, It = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, X = (e) => pe(e) || Tt.has(e) || qt.test(e), te = (e) => he(e, "length", Gt), pe = (e) => Boolean(e) && !Number.isNaN(Number(e)), Pe = (e) => he(e, "number", pe), xe = (e) => Boolean(e) && Number.isInteger(Number(e)), Ft = (e) => e.endsWith("%") && pe(e.slice(0, -1)), x = (e) => Ue.test(e), re = (e) => zt.test(e), jt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ot = (e) => he(e, jt, He), At = (e) => he(e, "position", He), Bt = /* @__PURE__ */ new Set(["image", "url"]), Lt = (e) => he(e, Bt, Wt), Rt = (e) => he(e, "", Et), we = () => !0, he = (e, l, s) => {
  const i = Ue.exec(e);
  return i ? i[1] ? typeof l == "string" ? i[1] === l : l.has(i[1]) : s(i[2]) : !1;
}, Gt = (e) => Nt.test(e) && !Vt.test(e), He = () => !1, Et = (e) => Pt.test(e), Wt = (e) => It.test(e), Dt = () => {
  const e = T("colors"), l = T("spacing"), s = T("blur"), i = T("brightness"), n = T("borderColor"), r = T("borderRadius"), t = T("borderSpacing"), o = T("borderWidth"), u = T("contrast"), g = T("grayscale"), c = T("hueRotate"), v = T("invert"), h = T("gap"), q = T("gradientColorStops"), M = T("gradientColorStopPositions"), z = T("inset"), $ = T("margin"), V = T("opacity"), O = T("padding"), H = T("saturate"), D = T("scale"), oe = T("sepia"), le = T("skew"), me = T("space"), be = T("translate"), ue = () => ["auto", "contain", "none"], K = () => ["auto", "hidden", "clip", "visible", "scroll"], ne = () => ["auto", x, l], _ = () => [x, l], Ce = () => ["", X, te], ce = () => ["auto", pe, x], ve = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], de = () => ["solid", "dashed", "dotted", "double", "none"], fe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], se = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], ee = () => ["", "0", x], Se = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], R = () => [pe, x];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [we],
      spacing: [X, te],
      blur: ["none", "", re, x],
      brightness: R(),
      borderColor: [e],
      borderRadius: ["none", "", "full", re, x],
      borderSpacing: _(),
      borderWidth: Ce(),
      contrast: R(),
      grayscale: ee(),
      hueRotate: R(),
      invert: ee(),
      gap: _(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ft, te],
      inset: ne(),
      margin: ne(),
      opacity: R(),
      padding: _(),
      saturate: R(),
      scale: R(),
      sepia: ee(),
      skew: R(),
      space: _(),
      translate: _()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", x]
      }],
      container: ["container"],
      columns: [{
        columns: [re]
      }],
      "break-after": [{
        "break-after": Se()
      }],
      "break-before": [{
        "break-before": Se()
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
        object: [...ve(), x]
      }],
      overflow: [{
        overflow: K()
      }],
      "overflow-x": [{
        "overflow-x": K()
      }],
      "overflow-y": [{
        "overflow-y": K()
      }],
      overscroll: [{
        overscroll: ue()
      }],
      "overscroll-x": [{
        "overscroll-x": ue()
      }],
      "overscroll-y": [{
        "overscroll-y": ue()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [z]
      }],
      "inset-x": [{
        "inset-x": [z]
      }],
      "inset-y": [{
        "inset-y": [z]
      }],
      start: [{
        start: [z]
      }],
      end: [{
        end: [z]
      }],
      top: [{
        top: [z]
      }],
      right: [{
        right: [z]
      }],
      bottom: [{
        bottom: [z]
      }],
      left: [{
        left: [z]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", xe, x]
      }],
      basis: [{
        basis: ne()
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
        grow: ee()
      }],
      shrink: [{
        shrink: ee()
      }],
      order: [{
        order: ["first", "last", "none", xe, x]
      }],
      "grid-cols": [{
        "grid-cols": [we]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", xe, x]
        }, x]
      }],
      "col-start": [{
        "col-start": ce()
      }],
      "col-end": [{
        "col-end": ce()
      }],
      "grid-rows": [{
        "grid-rows": [we]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [xe, x]
        }, x]
      }],
      "row-start": [{
        "row-start": ce()
      }],
      "row-end": [{
        "row-end": ce()
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
        gap: [h]
      }],
      "gap-x": [{
        "gap-x": [h]
      }],
      "gap-y": [{
        "gap-y": [h]
      }],
      "justify-content": [{
        justify: ["normal", ...se()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...se(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...se(), "baseline"]
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [O]
      }],
      px: [{
        px: [O]
      }],
      py: [{
        py: [O]
      }],
      ps: [{
        ps: [O]
      }],
      pe: [{
        pe: [O]
      }],
      pt: [{
        pt: [O]
      }],
      pr: [{
        pr: [O]
      }],
      pb: [{
        pb: [O]
      }],
      pl: [{
        pl: [O]
      }],
      m: [{
        m: [$]
      }],
      mx: [{
        mx: [$]
      }],
      my: [{
        my: [$]
      }],
      ms: [{
        ms: [$]
      }],
      me: [{
        me: [$]
      }],
      mt: [{
        mt: [$]
      }],
      mr: [{
        mr: [$]
      }],
      mb: [{
        mb: [$]
      }],
      ml: [{
        ml: [$]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", x, l]
      }],
      "min-w": [{
        "min-w": [x, l, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [x, l, "none", "full", "min", "max", "fit", "prose", {
          screen: [re]
        }, re]
      }],
      h: [{
        h: [x, l, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [x, l, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [x, l, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [x, l, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", re, te]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Pe]
      }],
      "font-family": [{
        font: [we]
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
        "line-clamp": ["none", pe, Pe]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", X, x]
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
        "placeholder-opacity": [V]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [V]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...de(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", X, te]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", X, x]
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
        indent: _()
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
        "bg-opacity": [V]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...ve(), At]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ot]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Lt]
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
        from: [q]
      }],
      "gradient-via": [{
        via: [q]
      }],
      "gradient-to": [{
        to: [q]
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
        border: [o]
      }],
      "border-w-x": [{
        "border-x": [o]
      }],
      "border-w-y": [{
        "border-y": [o]
      }],
      "border-w-s": [{
        "border-s": [o]
      }],
      "border-w-e": [{
        "border-e": [o]
      }],
      "border-w-t": [{
        "border-t": [o]
      }],
      "border-w-r": [{
        "border-r": [o]
      }],
      "border-w-b": [{
        "border-b": [o]
      }],
      "border-w-l": [{
        "border-l": [o]
      }],
      "border-opacity": [{
        "border-opacity": [V]
      }],
      "border-style": [{
        border: [...de(), "hidden"]
      }],
      "divide-x": [{
        "divide-x": [o]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [o]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [V]
      }],
      "divide-style": [{
        divide: de()
      }],
      "border-color": [{
        border: [n]
      }],
      "border-color-x": [{
        "border-x": [n]
      }],
      "border-color-y": [{
        "border-y": [n]
      }],
      "border-color-t": [{
        "border-t": [n]
      }],
      "border-color-r": [{
        "border-r": [n]
      }],
      "border-color-b": [{
        "border-b": [n]
      }],
      "border-color-l": [{
        "border-l": [n]
      }],
      "divide-color": [{
        divide: [n]
      }],
      "outline-style": [{
        outline: ["", ...de()]
      }],
      "outline-offset": [{
        "outline-offset": [X, x]
      }],
      "outline-w": [{
        outline: [X, te]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: Ce()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [V]
      }],
      "ring-offset-w": [{
        "ring-offset": [X, te]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", re, Rt]
      }],
      "shadow-color": [{
        shadow: [we]
      }],
      opacity: [{
        opacity: [V]
      }],
      "mix-blend": [{
        "mix-blend": [...fe(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": fe()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [s]
      }],
      brightness: [{
        brightness: [i]
      }],
      contrast: [{
        contrast: [u]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", re, x]
      }],
      grayscale: [{
        grayscale: [g]
      }],
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      invert: [{
        invert: [v]
      }],
      saturate: [{
        saturate: [H]
      }],
      sepia: [{
        sepia: [oe]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [s]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [i]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [u]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [g]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [v]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [V]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [H]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [oe]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [t]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [t]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [t]
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
        duration: R()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", x]
      }],
      delay: [{
        delay: R()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", x]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [D]
      }],
      "scale-x": [{
        "scale-x": [D]
      }],
      "scale-y": [{
        "scale-y": [D]
      }],
      rotate: [{
        rotate: [xe, x]
      }],
      "translate-x": [{
        "translate-x": [be]
      }],
      "translate-y": [{
        "translate-y": [be]
      }],
      "skew-x": [{
        "skew-x": [le]
      }],
      "skew-y": [{
        "skew-y": [le]
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
        "scroll-m": _()
      }],
      "scroll-mx": [{
        "scroll-mx": _()
      }],
      "scroll-my": [{
        "scroll-my": _()
      }],
      "scroll-ms": [{
        "scroll-ms": _()
      }],
      "scroll-me": [{
        "scroll-me": _()
      }],
      "scroll-mt": [{
        "scroll-mt": _()
      }],
      "scroll-mr": [{
        "scroll-mr": _()
      }],
      "scroll-mb": [{
        "scroll-mb": _()
      }],
      "scroll-ml": [{
        "scroll-ml": _()
      }],
      "scroll-p": [{
        "scroll-p": _()
      }],
      "scroll-px": [{
        "scroll-px": _()
      }],
      "scroll-py": [{
        "scroll-py": _()
      }],
      "scroll-ps": [{
        "scroll-ps": _()
      }],
      "scroll-pe": [{
        "scroll-pe": _()
      }],
      "scroll-pt": [{
        "scroll-pt": _()
      }],
      "scroll-pr": [{
        "scroll-pr": _()
      }],
      "scroll-pb": [{
        "scroll-pb": _()
      }],
      "scroll-pl": [{
        "scroll-pl": _()
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
        stroke: [X, te, Pe]
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
}, Z = /* @__PURE__ */ _t(Dt);
function A(e, l, s, i) {
  let n = { ...l }, r = null, t = { ...s }, o = null, u = { ...i }, g = null;
  for (const c of e)
    r === null && c in n && (n = n[c], typeof n == "string" && (r = n)), o === null && c in t && (t = t[c], typeof t == "string" && (o = t)), g === null && c in u && (u = u[c], typeof u == "string" && (g = u));
  return Z(r, o, g);
}
const Ut = { class: "relative" }, Ht = ["dusk", "disabled"], Kt = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, qe = {
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
  setup(e, { expose: l, emit: s }) {
    const i = s, n = e, r = I(!1), t = I(null);
    function o() {
      r.value = !r.value;
    }
    function u() {
      r.value = !1;
    }
    _e(r, () => {
      t.value.update(), r.value || i("closed"), r.value && i("opened");
    });
    const g = I(null), c = I(null);
    Fe(() => {
      t.value = rt(g.value, c.value, {
        placement: n.placement,
        modifiers: [lt, ot]
      });
    }), l({ hide: u });
    const v = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, h = ie("themeVariables"), q = (M) => {
      var $, V;
      let z = "";
      return M === "button" && n.disabled && (z = "cursor-not-allowed"), Z(
        z,
        A([M, "base"], v, ($ = h == null ? void 0 : h.inertia_table) == null ? void 0 : $.button_with_dropdown, n.ui),
        A([M, "color", n.color], v, (V = h == null ? void 0 : h.inertia_table) == null ? void 0 : V.button_with_dropdown, n.ui)
      );
    };
    return (M, z) => (f(), F(pt, { do: u }, {
      default: j(() => [
        a("div", Ut, [
          a("button", {
            ref_key: "button",
            ref: g,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: k(q("button")),
            "aria-haspopup": "true",
            onClick: L(o, ["prevent"])
          }, [
            N(M.$slots, "button")
          ], 10, Ht),
          G(a("div", {
            ref_key: "tooltip",
            ref: c,
            class: "absolute z-10"
          }, [
            a("div", Kt, [
              N(M.$slots, "default")
            ])
          ], 512), [
            [U, r.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
}, Qt = { class: "flex flex-row items-center" }, Yt = { class: "uppercase" }, Xt = ["sorted"], Jt = {
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
    const l = e;
    function s() {
      l.cell.sortable && l.cell.onSort(l.cell.key);
    }
    return (i, n) => G((f(), p("th", {
      class: k(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900", e.cell.header_class])
    }, [
      (f(), F(ge(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: L(s, ["prevent"])
      }, {
        default: j(() => [
          a("span", Qt, [
            N(i.$slots, "label", {}, () => [
              a("span", Yt, y(e.cell.label), 1)
            ]),
            N(i.$slots, "sort", {}, () => [
              e.cell.sortable ? (f(), p("svg", {
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
                e.cell.sorted ? w("", !0) : (f(), p("path", Jt)),
                e.cell.sorted === "asc" ? (f(), p("path", Zt)) : w("", !0),
                e.cell.sorted === "desc" ? (f(), p("path", er)) : w("", !0)
              ], 10, Xt)) : w("", !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"]))
    ], 2)), [
      [U, !e.cell.hidden]
    ]);
  }
}, Te = {
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
}, rr = Te.translations;
function ke() {
  return Te.translations;
}
function sl(e, l) {
  Te.translations[e] = l;
}
function al(e) {
  Te.translations = e;
}
const or = ["dusk", "value"], lr = ["value"], Ge = {
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
    const l = ke(), s = e, i = P(() => {
      let o = [...s.options];
      return o.push(parseInt(s.value)), nt(o).sort((u, g) => u - g);
    }), n = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, r = ie("themeVariables"), t = (o) => {
      var u, g;
      return Z(
        A([o, "base"], n, (u = r == null ? void 0 : r.inertia_table) == null ? void 0 : u.per_page_selector, s.ui),
        A([o, "color", s.color], n, (g = r == null ? void 0 : r.inertia_table) == null ? void 0 : g.per_page_selector, s.ui)
      );
    };
    return (o, u) => (f(), p("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: k(t("select")),
      onChange: u[0] || (u[0] = (g) => e.onChange(g.target.value))
    }, [
      (f(!0), p(E, null, W(i.value, (g) => (f(), p("option", {
        key: g,
        value: g
      }, y(g) + " " + y(B(l).per_page), 9, lr))), 128))
    ], 42, or));
  }
}, nr = {
  key: 0,
  class: "bg-white flex items-center"
}, sr = { key: 0 }, ar = { class: "hidden sm:inline ml-2" }, ir = { class: "hidden sm:inline mr-2" }, ur = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, cr = { class: "flex flex-row space-x-4 items-center grow" }, dr = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, fr = { class: "font-medium" }, gr = { class: "font-medium" }, pr = { class: "font-medium" }, hr = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, mr = { class: "sr-only" }, br = { class: "sr-only" }, vr = {
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
    const l = ke(), s = e, i = P(() => "links" in r.value ? r.value.links.length > 0 : !1), n = P(() => Object.keys(r.value).length > 0), r = P(() => s.meta), t = P(() => "prev_page_url" in r.value ? r.value.prev_page_url : null), o = P(() => "next_page_url" in r.value ? r.value.next_page_url : null), u = P(() => parseInt(r.value.per_page));
    return (g, c) => n.value ? (f(), p("nav", nr, [
      !e.hasData || r.value.total < 1 ? (f(), p("p", sr, y(B(l).no_results_found), 1)) : w("", !0),
      e.hasData ? (f(), p("div", {
        key: 1,
        class: k(["flex-1 flex justify-between", { "sm:hidden": i.value }])
      }, [
        (f(), F(ge(t.value ? "a" : "div"), {
          class: k([{
            "cursor-not-allowed text-gray-400": !t.value,
            "text-gray-700 hover:text-gray-500": t.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: t.value,
          dusk: t.value ? "pagination-simple-previous" : null,
          onClick: c[0] || (c[0] = L((v) => e.onClick(t.value), ["prevent"]))
        }, {
          default: j(() => [
            c[4] || (c[4] = a("svg", {
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
            a("span", ar, y(B(l).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        ae(Ge, {
          dusk: "per-page-mobile",
          value: u.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (f(), F(ge(o.value ? "a" : "div"), {
          class: k([{
            "cursor-not-allowed text-gray-400": !o.value,
            "text-gray-700 hover:text-gray-500": o.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: o.value,
          dusk: o.value ? "pagination-simple-next" : null,
          onClick: c[1] || (c[1] = L((v) => e.onClick(o.value), ["prevent"]))
        }, {
          default: j(() => [
            a("span", ir, y(B(l).next), 1),
            c[5] || (c[5] = a("svg", {
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
      ], 2)) : w("", !0),
      e.hasData && i.value ? (f(), p("div", ur, [
        a("div", cr, [
          ae(Ge, {
            dusk: "per-page-full",
            value: u.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          a("p", dr, [
            a("span", fr, y(r.value.from), 1),
            J(" " + y(B(l).to) + " ", 1),
            a("span", gr, y(r.value.to), 1),
            J(" " + y(B(l).of) + " ", 1),
            a("span", pr, y(r.value.total), 1),
            J(" " + y(B(l).results), 1)
          ])
        ]),
        a("div", null, [
          a("nav", hr, [
            (f(), F(ge(t.value ? "a" : "div"), {
              class: k([{
                "cursor-not-allowed text-gray-400": !t.value,
                "text-gray-500 hover:bg-gray-50": t.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: t.value,
              dusk: t.value ? "pagination-previous" : null,
              onClick: c[2] || (c[2] = L((v) => e.onClick(t.value), ["prevent"]))
            }, {
              default: j(() => [
                a("span", mr, y(B(l).previous), 1),
                c[6] || (c[6] = a("svg", {
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
            (f(!0), p(E, null, W(r.value.links, (v, h) => (f(), p("div", { key: h }, [
              N(g.$slots, "link", {}, () => [
                !isNaN(v.label) || v.label === "..." ? (f(), F(ge(v.url ? "a" : "div"), {
                  key: 0,
                  href: v.url,
                  dusk: v.url ? `pagination-${v.label}` : null,
                  class: k(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !v.url,
                    "hover:bg-gray-50": v.url,
                    "bg-white": !v.active,
                    "bg-gray-100": v.active
                  }]),
                  onClick: L((q) => e.onClick(v.url), ["prevent"])
                }, {
                  default: j(() => [
                    J(y(v.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : w("", !0)
              ])
            ]))), 128)),
            (f(), F(ge(o.value ? "a" : "div"), {
              class: k([{
                "cursor-not-allowed text-gray-400": !o.value,
                "text-gray-500 hover:bg-gray-50": o.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: o.value,
              dusk: o.value ? "pagination-next" : null,
              onClick: c[3] || (c[3] = L((v) => e.onClick(o.value), ["prevent"]))
            }, {
              default: j(() => [
                a("span", br, y(B(l).next), 1),
                c[7] || (c[7] = a("svg", {
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
      ])) : w("", !0)
    ])) : w("", !0);
  }
}, yr = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, xr = ["dusk", "onClick"], wr = {
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
    const l = e, s = I(null);
    function i(n) {
      l.onAdd(n), s.value.hide();
    }
    return (n, r) => (f(), F(qe, {
      ref_key: "dropdown",
      ref: s,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: j(() => r[0] || (r[0] = [
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
      default: j(() => [
        a("div", yr, [
          (f(!0), p(E, null, W(e.searchInputs, (t, o) => (f(), p("button", {
            key: o,
            dusk: `add-search-row-${t.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: L((u) => i(t.key), ["prevent"])
          }, y(t.label), 9, xr))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, kr = {
  key: 0,
  class: "ml-1"
}, Cr = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, Sr = { class: "px-2" }, Mr = { class: "divide-y divide-gray-200" }, $r = { class: "text-sm text-gray-900" }, _r = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], qr = {
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
    const l = e, s = P(() => l.columns.filter((i) => i.hidden).length);
    return (i, n) => (f(), F(qe, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: j(() => [
        n[0] || (n[0] = a("svg", {
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
        e.hasHiddenColumns ? (f(), p("span", kr, "(" + y(s.value) + ")", 1)) : w("", !0)
      ]),
      default: j(() => [
        a("div", Cr, [
          a("div", Sr, [
            a("ul", Mr, [
              (f(!0), p(E, null, W(l.columns, (r, t) => G((f(), p("li", {
                key: t,
                class: "py-2 flex items-center justify-between"
              }, [
                a("p", $r, y(r.label), 1),
                a("button", {
                  type: "button",
                  class: k(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                    "bg-green-500": !r.hidden,
                    "bg-gray-200": r.hidden
                  }]),
                  "aria-pressed": !r.hidden,
                  "aria-labelledby": `toggle-column-${r.key}`,
                  "aria-describedby": `toggle-column-${r.key}`,
                  dusk: `toggle-column-${r.key}`,
                  onClick: L((o) => e.onChange(r.key, r.hidden), ["prevent"])
                }, [
                  n[1] || (n[1] = a("span", { class: "sr-only" }, "Column status", -1)),
                  a("span", {
                    "aria-hidden": "true",
                    class: k([{
                      "translate-x-5": !r.hidden,
                      "translate-x-0": r.hidden
                    }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                  }, null, 2)
                ], 10, _r)
              ])), [
                [U, r.can_be_hidden]
              ])), 128))
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, Tr = { class: "w-full flex gap-2 justify-between items-center" }, zr = { class: "relative inline-flex items-center cursor-pointer" }, Nr = ["checked"], Vr = {
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
    const l = e, s = {
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
    }, i = ie("themeVariables"), n = (r) => {
      var o, u, g, c;
      let t = l.color;
      return r === "toggle" && l.filter.value === null && (t = "disabled"), Z(
        A([r, "base"], s, (u = (o = i == null ? void 0 : i.inertia_table) == null ? void 0 : o.table_filter) == null ? void 0 : u.toggle_filter, l.ui),
        A([r, "color", t], s, (c = (g = i == null ? void 0 : i.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : c.toggle_filter, l.ui)
      );
    };
    return (r, t) => (f(), p("div", Tr, [
      a("label", zr, [
        a("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: t[0] || (t[0] = (o) => e.onFilterChange(e.filter.key, o.target.checked ? "1" : "0"))
        }, null, 40, Nr),
        a("div", {
          class: k(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", n("toggle")])
        }, null, 2)
      ]),
      a("button", {
        class: k(n("reset_button")),
        onClick: t[1] || (t[1] = L((o) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, t[2] || (t[2] = [
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
}, Ke = (e, l) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of l)
    s[i] = n;
  return s;
}, Pr = {
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
      const l = this.getTheme("button"), s = /h-(\d+)/, i = l.match(s), n = 4;
      let r = null;
      return i && 1 in i ? r = i[1] : r = n, e ? `margin-top: ${(r - n + 12) * 0.25}rem` : `margin-top: -${((r - n) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(e) {
      return e < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : e > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : e;
    },
    detectIfOverlap() {
      let e = this.$refs.popover_min.getClientRects()[0], l = this.$refs.popover_max.getClientRects()[0];
      e && l && (this.hasOverlap = e.right > l.left);
    },
    handleMouseDown(e, l) {
      this.moveMin = l, this.moveMax = !l, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      let i = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), n = Number(Math.round(i / this.step) * this.step).toFixed(2);
      n >= this.min && n <= this.max && (this.moveMin && n !== this.currentMinValue && n <= this.currentMaxValue && (this.internalValue = [n, this.currentMaxValue]), this.moveMax && n !== this.currentMaxValue && n >= this.currentMinValue && (this.internalValue = [this.currentMinValue, n])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var l, s, i, n, r, t;
      return Z(
        A([e, "base"], this.fallbackTheme, (i = (s = (l = this.themeVariables) == null ? void 0 : l.inertia_table) == null ? void 0 : s.table_filter) == null ? void 0 : i.number_range_filter, this.ui),
        A([e, "color", this.color], this.fallbackTheme, (t = (r = (n = this.themeVariables) == null ? void 0 : n.inertia_table) == null ? void 0 : r.table_filter) == null ? void 0 : t.number_range_filter, this.ui)
      );
    }
  }
}, Ir = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, Fr = { class: "py-1 relative min-w-full" }, jr = { class: "z-40" }, Or = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Ar = { key: 0 }, Br = { key: 1 }, Lr = { class: "z-40" }, Rr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Gr = { key: 0 }, Er = { key: 1 }, Wr = { draggable: "true" }, Dr = { key: 0 }, Ur = { key: 1 }, Hr = { key: 0 }, Kr = { key: 1 };
function Qr(e, l, s, i, n, r) {
  var t, o, u, g;
  return f(), p("div", Ir, [
    a("div", Fr, [
      a("div", {
        class: k(r.getTheme("main_bar"))
      }, [
        a("div", {
          class: k(["absolute", r.getTheme("selected_bar")]),
          style: ye(`width: ${r.rangeWidth}% !important; left: ${r.currentMinValueInPercent}% !important;`)
        }, null, 6),
        a("div", {
          class: k([r.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ye(`left: ${r.currentMinValueInPercent}%;`),
          onMousedown: l[0] || (l[0] = (c) => r.handleMouseDown(c, !0))
        }, [
          a("div", jr, [
            a("div", Or, [
              a("div", {
                class: k(r.getTheme("popover")),
                style: ye(r.getMarginTop(n.hasOverlap && r.displayFirstDown))
              }, [
                s.prefix ? (f(), p("span", Ar, y(s.prefix), 1)) : w("", !0),
                J(" " + y((t = r.currentMinValue) != null ? t : 0) + " ", 1),
                s.suffix ? (f(), p("span", Br, y(s.suffix), 1)) : w("", !0)
              ], 6),
              (f(), p("svg", {
                class: k(["absolute w-full h-2 left-0", [n.hasOverlap && r.displayFirstDown ? "bottom-6 rotate-180" : "top-100", r.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, l[2] || (l[2] = [
                a("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ]), 2))
            ], 512)
          ])
        ], 38),
        a("div", {
          class: k([r.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ye(`left: ${r.currentMaxValueInPercent}%;`),
          onMousedown: l[1] || (l[1] = (c) => r.handleMouseDown(c, !1))
        }, [
          a("div", Lr, [
            a("div", Rr, [
              a("div", {
                class: k(r.getTheme("popover")),
                style: ye(r.getMarginTop(n.hasOverlap && !r.displayFirstDown))
              }, [
                s.prefix ? (f(), p("span", Gr, y(s.prefix), 1)) : w("", !0),
                J(" " + y((o = r.currentMaxValue) != null ? o : 0) + " ", 1),
                s.suffix ? (f(), p("span", Er, y(s.suffix), 1)) : w("", !0)
              ], 6),
              a("div", Wr, [
                (f(), p("svg", {
                  class: k(["absolute w-full h-2 left-0 top-100", [n.hasOverlap && !r.displayFirstDown ? "bottom-6 rotate-180" : "top-100", r.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, l[3] || (l[3] = [
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
          class: k(["absolute -ml-1 bottom-0 left-0 -mb-6", r.getTheme("text")])
        }, [
          s.prefix ? (f(), p("span", Dr, y(s.prefix), 1)) : w("", !0),
          J(" " + y((u = s.min) != null ? u : 0) + " ", 1),
          s.suffix ? (f(), p("span", Ur, y(s.suffix), 1)) : w("", !0)
        ], 2),
        a("div", {
          class: k(["absolute -mr-1 bottom-0 right-0 -mb-6", r.getTheme("text")])
        }, [
          s.prefix ? (f(), p("span", Hr, y(s.prefix), 1)) : w("", !0),
          J(" " + y((g = s.max) != null ? g : 0) + " ", 1),
          s.suffix ? (f(), p("span", Kr, y(s.suffix), 1)) : w("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const Yr = /* @__PURE__ */ Ke(Pr, [["render", Qr]]), Xr = {
  key: 0,
  class: "ml-1"
}, Jr = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, Zr = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, eo = { class: "p-2" }, to = ["name", "value", "onChange"], ro = ["value"], oo = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, lo = {
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
    const l = e;
    I(null);
    const s = P(() => l.filters.filter((u) => !i(u)).length);
    function i(u) {
      if (u.value === null)
        return !0;
      switch (u.type) {
        case "number_range":
          return Number(Math.max(...u.value)) === Number(u.max) && Number(Math.min(...u.value)) === Number(u.min);
        case "select":
          return u.value === "";
        case "toggle":
          return !1;
        default:
          return !u.value;
      }
    }
    function n(u) {
      let g = u.value;
      u.value && (Number(Math.max(...u.value)) === Number(u.max) && Number(Math.min(...u.value)) === Number(u.min) ? g = null : Number(Math.min(...u.value)) === 0 && Number(Math.max(...u.value)) === 0 && (g = ["0", "0"])), l.onFilterChange(u.key, g);
    }
    const r = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, t = ie("themeVariables"), o = (u) => {
      var g, c, v, h;
      return Z(
        A([u, "base"], r, (c = (g = t == null ? void 0 : t.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : c.select_filter, l.ui),
        A([u, "color", l.color], r, (h = (v = t == null ? void 0 : t.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : h.select_filter, l.ui)
      );
    };
    return (u, g) => (f(), F(qe, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: j(() => [
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
        e.hasEnabledFilters ? (f(), p("span", Xr, "(" + y(s.value) + ")", 1)) : w("", !0)
      ]),
      default: j(() => [
        a("div", Jr, [
          (f(!0), p(E, null, W(e.filters, (c, v) => (f(), p("div", { key: v }, [
            a("h3", Zr, y(c.label), 1),
            a("div", eo, [
              c.type === "select" ? (f(), p("select", {
                key: 0,
                name: c.key,
                value: c.value,
                class: k(o("select", e.color)),
                onChange: (h) => e.onFilterChange(c.key, h.target.value)
              }, [
                (f(!0), p(E, null, W(c.options, (h, q) => (f(), p("option", {
                  key: q,
                  value: q
                }, y(h), 9, ro))), 128))
              ], 42, to)) : w("", !0),
              c.type === "toggle" ? (f(), F(Vr, {
                key: 1,
                filter: c,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : w("", !0),
              c.type === "number_range" ? (f(), p("div", oo, [
                ae(Yr, {
                  modelValue: c.value,
                  "onUpdate:modelValue": [(h) => c.value = h, (h) => n(c)],
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
}, no = { class: "relative" }, so = ["placeholder", "value"], ao = {
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
    const l = e, s = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, i = ie("themeVariables"), n = (r) => {
      var t, o;
      return Z(
        A([r, "base"], s, (t = i == null ? void 0 : i.inertia_table) == null ? void 0 : t.global_search, l.ui),
        A([r, "color", l.color], s, (o = i == null ? void 0 : i.inertia_table) == null ? void 0 : o.global_search, l.ui)
      );
    };
    return (r, t) => (f(), p("div", no, [
      a("input", {
        class: k(n("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: t[0] || (t[0] = (o) => e.onChange(o.target.value))
      }, null, 42, so),
      t[1] || (t[1] = a("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
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
}, io = { class: "flex rounded-md shadow-sm relative mt-3" }, uo = ["for"], co = ["id", "name", "value", "onInput"], fo = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, go = ["dusk", "onClick"], po = {
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
    const l = { el: I([]) };
    let s = P(() => l.el.value);
    const i = e;
    function n(u) {
      return i.forcedVisibleSearchInputs.includes(u);
    }
    _e(i.forcedVisibleSearchInputs, (u) => {
      const g = u.length > 0 ? u[u.length - 1] : null;
      !g || Je().then(() => {
        const c = at(s.value, (v) => v.name === g);
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
    }, t = ie("themeVariables"), o = (u) => {
      var g, c;
      return Z(
        A([u, "base"], r, (g = t == null ? void 0 : t.inertia_table) == null ? void 0 : g.table_search_rows, i.ui),
        A([u, "color", i.color], r, (c = t == null ? void 0 : t.inertia_table) == null ? void 0 : c.table_search_rows, i.ui)
      );
    };
    return (u, g) => (f(!0), p(E, null, W(e.searchInputs, (c, v) => G((f(), p("div", {
      key: v,
      class: "px-4 sm:px-0"
    }, [
      a("div", io, [
        a("label", {
          for: c.key,
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
          a("span", null, y(c.label), 1)
        ], 8, uo),
        (f(), p("input", {
          id: c.key,
          ref_for: !0,
          ref: l.el,
          key: c.key,
          name: c.key,
          value: c.value,
          type: "text",
          class: k(o("input")),
          onInput: (h) => e.onChange(c.key, h.target.value)
        }, null, 42, co)),
        a("div", fo, [
          a("button", {
            class: k(o("remove_button")),
            dusk: `remove-search-row-${c.key}`,
            onClick: L((h) => e.onRemove(c.key), ["prevent"])
          }, g[1] || (g[1] = [
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
          ]), 10, go)
        ])
      ])
    ])), [
      [U, c.value !== null || n(c.key)]
    ])), 128));
  }
}, ho = {
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
    const l = ke(), s = e, i = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, n = ie("themeVariables"), r = (t) => {
      var o, u;
      return Z(
        A([t, "base"], i, (o = n == null ? void 0 : n.inertia_table) == null ? void 0 : o.reset_button, s.ui),
        A([t, "color", s.color], i, (u = n == null ? void 0 : n.inertia_table) == null ? void 0 : u.reset_button, s.ui)
      );
    };
    return (t, o) => {
      var u;
      return f(), p("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: k(r("button")),
        "aria-haspopup": "true",
        onClick: o[0] || (o[0] = L((...g) => e.onClick && e.onClick(...g), ["prevent"]))
      }, [
        o[1] || (o[1] = a("svg", {
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
        a("span", null, y((u = B(l).reset) != null ? u : "Reset"), 1)
      ], 2);
    };
  }
}, mo = {}, bo = { class: "flow-root" }, vo = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, yo = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, xo = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function wo(e, l) {
  return f(), p("div", bo, [
    a("div", vo, [
      a("div", yo, [
        a("div", xo, [
          N(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const ko = /* @__PURE__ */ Ke(mo, [["render", wo]]), Co = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, So = ["dusk", "onClick"], Mo = { class: "px-2" }, $o = { class: "divide-y divide-gray-200" }, _o = { class: "text-sm text-gray-900" }, qo = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], To = {
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
    const l = ke(), s = I(!1), i = I(!1);
    function n() {
      s.value = i.value = !1;
    }
    return (r, t) => (f(), F(qe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: n
    }, {
      button: j(() => t[5] || (t[5] = [
        a("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          a("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])),
      default: j(() => {
        var o, u, g, c, v;
        return [
          a("div", Co, [
            G(a("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (f(), p("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: t[0] || (t[0] = (h) => i.value = !0)
              }, [
                t[6] || (t[6] = a("svg", {
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
                a("span", null, y((o = B(l).add_search_fields) != null ? o : "Add search field"), 1)
              ])) : w("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (f(), p("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: t[1] || (t[1] = (h) => s.value = !0)
              }, [
                t[7] || (t[7] = a("svg", {
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
                a("span", null, y((u = B(l).show_hide_columns) != null ? u : "Show / Hide columns"), 1)
              ])) : w("", !0),
              t[9] || (t[9] = a("hr", null, null, -1)),
              "reset" in e.actions ? (f(), p("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: t[2] || (t[2] = (...h) => {
                  var q, M;
                  return ((q = e.actions.reset) == null ? void 0 : q.onClick) && ((M = e.actions.reset) == null ? void 0 : M.onClick(...h));
                })
              }, [
                t[8] || (t[8] = a("svg", {
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
                a("span", null, y((g = B(l).grouped_reset) != null ? g : "Reset"), 1)
              ])) : w("", !0)
            ], 512), [
              [U, !s.value && !i.value]
            ]),
            G(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: t[3] || (t[3] = (h) => i.value = !1)
              }, [
                t[10] || (t[10] = a("svg", {
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
                a("span", null, y((c = B(l).add_search_fields) != null ? c : "Add search field"), 1)
              ]),
              (f(!0), p(E, null, W(e.actions.searchFields.searchInputs, (h, q) => (f(), p("button", {
                key: q,
                dusk: `add-search-row-${h.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: L((M) => e.actions.searchFields.onClick(h.key), ["prevent"])
              }, y(h.label), 9, So))), 128))
            ], 512), [
              [U, i.value]
            ]),
            G(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: t[4] || (t[4] = (h) => s.value = !1)
              }, [
                t[11] || (t[11] = a("svg", {
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
                a("span", null, y((v = B(l).show_hide_columns) != null ? v : "Show / Hide columns"), 1)
              ]),
              a("div", Mo, [
                a("ul", $o, [
                  (f(!0), p(E, null, W(e.actions.toggleColumns.columns, (h, q) => G((f(), p("li", {
                    key: q,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    a("p", _o, y(h.label), 1),
                    a("button", {
                      type: "button",
                      class: k(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !h.hidden,
                        "bg-gray-200": h.hidden
                      }]),
                      "aria-pressed": !h.hidden,
                      "aria-labelledby": `toggle-column-${h.key}`,
                      "aria-describedby": `toggle-column-${h.key}`,
                      dusk: `toggle-column-${h.key}`,
                      onClick: L((M) => e.actions.toggleColumns.onChange(h.key, h.hidden), ["prevent"])
                    }, [
                      t[12] || (t[12] = a("span", { class: "sr-only" }, "Column status", -1)),
                      a("span", {
                        "aria-hidden": "true",
                        class: k([{
                          "translate-x-5": !h.hidden,
                          "translate-x-0": h.hidden
                        }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                      }, null, 2)
                    ], 10, qo)
                  ])), [
                    [U, h.can_be_hidden]
                  ])), 128))
                ])
              ])
            ], 512), [
              [U, s.value]
            ]),
            G(a("div", null, [
              N(r.$slots, "default")
            ], 512), [
              [U, !s.value && !i.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
}, zo = ["dusk"], No = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, Vo = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, Po = { class: "mr-2 sm:mr-4" }, Io = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, Fo = { class: "min-w-full divide-y divide-gray-300" }, jo = { class: "bg-gray-50" }, Oo = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900"
}, Ao = ["id"], Bo = { class: "divide-y divide-gray-200 bg-white" }, Lo = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500"
}, Ro = ["id", "onUpdate:modelValue"], Go = ["onClick"], Eo = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, Wo = {
  key: 0,
  class: "italic text-sm px-2"
}, il = {
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
  setup(e, { emit: l }) {
    const s = ke(), i = l, n = e;
    Ze();
    const r = I(0), t = P(() => {
      let d = Ne().props.queryBuilderProps ? { ...Ne().props.queryBuilderProps[n.name] } : {};
      return d._updates = r.value, d;
    }), o = I(t.value), u = P(() => t.value.pageName), g = I([]), c = I(null), v = I(!1), h = P(() => t.value.hasToggleableColumns || t.value.hasFilters || t.value.hasSearchInputs ? !1 : !t.value.globalSearch), q = P(() => Object.keys(n.resource).length === 0 ? n.data : "data" in n.resource ? n.resource.data : n.resource), M = P(() => Object.keys(n.resource).length === 0 ? n.meta : "links" in n.resource && "meta" in n.resource && Object.keys(n.resource.links).length === 4 && "next" in n.resource.links && "prev" in n.resource.links ? {
      ...n.resource.meta,
      next_page_url: n.resource.links.next,
      prev_page_url: n.resource.links.prev
    } : "meta" in n.resource ? n.resource.meta : n.resource), z = P(() => q.value.length > 0 ? !0 : M.value.total > 0), $ = I({
      reset: {
        onClick: D
      },
      toggleColumns: {
        show: t.value.hasToggleableColumns,
        columns: t.value.columns,
        onChange: ne
      },
      searchFields: {
        show: t.value.hasSearchInputs,
        searchInputs: t.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: t.value.hasSearchInputsWithoutValue,
        onClick: O
      }
    });
    function V(d) {
      g.value = g.value.filter((m) => m != d), le(d, null);
    }
    function O(d) {
      g.value.push(d);
    }
    const H = P(() => {
      if (g.value.length > 0)
        return !0;
      const d = Ve.parse(location.search.substring(1));
      if (d[u.value] > 1)
        return !0;
      const b = n.name === "default" ? "" : n.name + "_";
      let C = !1;
      return Y(["filter", "columns", "cursor", "sort"], (S) => {
        const Q = d[b + S];
        S === "sort" && Q === t.value.defaultSort || Q !== void 0 && (C = !0);
      }), C;
    });
    function D() {
      g.value = [], Y(o.value.filters, (d, m) => {
        o.value.filters[m].value = null;
      }), Y(o.value.searchInputs, (d, m) => {
        o.value.searchInputs[m].value = null;
      }), Y(o.value.columns, (d, m) => {
        o.value.columns[m].hidden = d.can_be_hidden ? !t.value.defaultVisibleToggleableColumns.includes(d.key) : !1;
      }), localStorage.removeItem(`columns-${n.name}`), o.value.sort = null, o.value.cursor = null, o.value.page = 1;
    }
    const oe = {};
    function le(d, m) {
      clearTimeout(oe[d]), oe[d] = setTimeout(() => {
        se.value && n.preventOverlappingRequests && se.value.cancel();
        const b = K("searchInputs", d);
        o.value.searchInputs[b].value = m, o.value.cursor = null, o.value.page = 1;
      }, n.inputDebounceMs);
    }
    function me(d) {
      le("global", d);
    }
    function be(d, m) {
      const b = K("filters", d);
      o.value.filters[b].value = m, o.value.cursor = null, o.value.page = 1;
    }
    function ue(d) {
      o.value.cursor = null, o.value.perPage = d, o.value.page = 1;
    }
    function K(d, m) {
      return ct(o.value[d], (b) => b.key == m);
    }
    function ne(d, m) {
      const b = K("columns", d);
      o.value.columns[b].hidden = !m;
      const C = o.value.columns.map((S) => ({
        key: S.key,
        hidden: S.hidden
      }));
      localStorage.setItem(`columns-${n.name}`, JSON.stringify(C));
    }
    function _() {
      let d = {};
      return Y(o.value.searchInputs, (m) => {
        m.value !== null && (d[m.key] = m.value);
      }), Y(o.value.filters, (m) => {
        let b = m.value;
        b !== null && (m.type === "number_range" && Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) && (b = null), d[m.key] = b);
      }), d;
    }
    function Ce() {
      const d = o.value.columns;
      let m = ut(d, (C) => !C.hidden), b = ft(m, (C) => C.key).sort();
      return dt(b, t.value.defaultVisibleToggleableColumns) ? {} : b;
    }
    function ce() {
      const d = _(), m = Ce(), b = {};
      Object.keys(d).length > 0 && (b.filter = d), Object.keys(m).length > 0 && (b.columns = m);
      const C = o.value.cursor, S = o.value.page, Q = o.value.sort, $e = o.value.perPage;
      return C && (b.cursor = C), S > 1 && (b.page = S), $e > 1 && (b.perPage = $e), Q && (b.sort = Q), b;
    }
    function ve(d) {
      var C, S, Q;
      if (!d)
        return null;
      const m = (C = Ne().props.queryBuilderProps[n.name].pageName) != null ? C : "page", b = (Q = (S = new URL(d)) == null ? void 0 : S.searchParams) == null ? void 0 : Q.get(m);
      b !== null ? o.value.page = b : ee(d);
    }
    function de() {
      const d = Ve.parse(location.search.substring(1)), m = n.name === "default" ? "" : n.name + "_";
      Y(["filter", "columns", "cursor", "sort"], (C) => {
        delete d[m + C];
      }), delete d[u.value], Y(ce(), (C, S) => {
        S === "page" ? d[u.value] = C : S === "perPage" ? d.perPage = C : d[m + S] = C;
      });
      let b = Ve.stringify(d, {
        filter(C, S) {
          return typeof S == "object" && S !== null ? gt(S) : S;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!b || b === u.value + "=1") && (b = ""), b;
    }
    const fe = I(!1), se = I(null);
    function ee(d) {
      !d || st.get(
        d,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: n.preserveScroll !== !1,
          onBefore() {
            fe.value = !0;
          },
          onCancelToken(m) {
            se.value = m;
          },
          onFinish() {
            fe.value = !1;
          },
          onSuccess() {
            if (n.preserveScroll === "table-top") {
              const b = c.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: b });
            }
            r.value++;
          }
        }
      );
    }
    function Se(d, m, b) {
      var C;
      n.hasCheckboxes && ((C = d.target) == null ? void 0 : C.parentElement.cellIndex) === 0 || i("rowClicked", d, m, b);
    }
    _e(o, () => {
      ee(location.pathname + "?" + de()), v.value = !1;
    }, { deep: !0 }), _e(n.resource, () => {
      const d = n.resource.data.filter((m) => m.__itSelected);
      i("selectionChanged", d);
    }, { deep: !0 });
    const R = () => {
      r.value++;
    };
    Fe(() => {
      document.addEventListener("inertia:success", R);
      const d = localStorage.getItem(`columns-${n.name}`);
      if (d) {
        const m = JSON.parse(d);
        Y(o.value.columns, (b, C) => {
          o.value.columns[C].hidden = m[C].hidden;
        });
      }
    }), et(() => {
      document.removeEventListener("inertia:success", R);
    });
    function Oe(d) {
      o.value.sort == d ? o.value.sort = `-${d}` : o.value.sort = d, o.value.cursor = null, o.value.page = 1;
    }
    function ze(d) {
      const m = K("columns", d);
      return !o.value.columns[m].hidden;
    }
    function Me(d) {
      const m = K("columns", d), b = it(t.value.columns[m]);
      return b.onSort = Oe, b;
    }
    function Qe() {
      n.resource.data.forEach((d) => {
        d.__itSelected = v.value;
      });
    }
    const Ae = P(() => n.resource.data.filter((d) => d.__itSelected).length), Ye = P(() => Ae.value === 0 ? s.noLineSelected : `${Ae.value} ${s.lineSelected}`);
    return (d, m) => (f(), F(tt, null, {
      default: j(() => [
        (f(), p("fieldset", {
          ref_key: "tableFieldset",
          ref: c,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: k(["min-w-0", { "opacity-75": fe.value }])
        }, [
          a("div", No, [
            t.value.globalSearch ? (f(), p("div", Vo, [
              N(d.$slots, "tableGlobalSearch", {
                hasGlobalSearch: t.value.globalSearch,
                label: t.value.globalSearch ? t.value.globalSearch.label : null,
                value: t.value.globalSearch ? t.value.globalSearch.value : null,
                onChange: me
              }, () => [
                t.value.globalSearch ? (f(), F(ao, {
                  key: 0,
                  class: "grow",
                  label: t.value.globalSearch.label,
                  value: t.value.globalSearch.value,
                  "on-change": me,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : w("", !0)
              ])
            ])) : w("", !0),
            a("div", Po, [
              N(d.$slots, "tableFilter", {
                hasFilters: t.value.hasFilters,
                hasEnabledFilters: t.value.hasEnabledFilters,
                filters: t.value.filters,
                onFilterChange: be
              }, () => [
                t.value.hasFilters ? (f(), F(lo, {
                  key: 0,
                  "has-enabled-filters": t.value.hasEnabledFilters,
                  filters: t.value.filters,
                  "on-filter-change": be,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : w("", !0)
              ])
            ]),
            e.withGroupedMenu ? w("", !0) : N(d.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: t.value.hasSearchInputs,
              hasSearchInputsWithoutValue: t.value.hasSearchInputsWithoutValue,
              searchInputs: t.value.searchInputsWithoutGlobal,
              onAdd: O
            }, () => [
              t.value.hasSearchInputs ? (f(), F(wr, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": t.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": t.value.hasSearchInputsWithoutValue,
                "on-add": O,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : w("", !0)
            ]),
            e.withGroupedMenu ? w("", !0) : N(d.$slots, "tableColumns", {
              key: 2,
              hasColumns: t.value.hasToggleableColumns,
              columns: t.value.columns,
              hasHiddenColumns: t.value.hasHiddenColumns,
              onChange: ne
            }, () => [
              t.value.hasToggleableColumns ? (f(), F(qr, {
                key: 0,
                class: k({ "mr-2 sm:mr-4": H.value }),
                columns: t.value.columns,
                "has-hidden-columns": t.value.hasHiddenColumns,
                "on-change": ne,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "color"])) : w("", !0)
            ]),
            e.withGroupedMenu ? N(d.$slots, "groupedAction", {
              key: 3,
              actions: $.value
            }, () => [
              ae(To, {
                color: e.color,
                actions: $.value
              }, {
                default: j(() => [
                  N(d.$slots, "bulk-actions")
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ]) : w("", !0),
            e.withGroupedMenu ? w("", !0) : N(d.$slots, "tableReset", {
              key: 4,
              canBeReset: H.value,
              onClick: D
            }, () => [
              H.value ? (f(), p("div", Io, [
                ae(ho, {
                  "on-click": D,
                  color: e.color
                }, null, 8, ["color"])
              ])) : w("", !0)
            ])
          ]),
          N(d.$slots, "tableSearchRows", {
            hasSearchRowsWithValue: t.value.hasSearchInputsWithValue,
            searchInputs: t.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: g.value,
            onChange: le
          }, () => [
            t.value.hasSearchInputsWithValue || g.value.length > 0 ? (f(), F(po, {
              key: 0,
              "search-inputs": t.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": g.value,
              "on-change": le,
              "on-remove": V,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : w("", !0)
          ]),
          N(d.$slots, "tableWrapper", { meta: M.value }, () => [
            ae(ko, {
              class: k({ "mt-3": !h.value })
            }, {
              default: j(() => [
                N(d.$slots, "table", {}, () => [
                  a("table", Fo, [
                    a("thead", jo, [
                      N(d.$slots, "head", {
                        show: ze,
                        sortBy: Oe,
                        header: Me
                      }, () => [
                        a("tr", null, [
                          e.hasCheckboxes ? (f(), p("th", Oo, [
                            G(a("input", {
                              type: "checkbox",
                              id: `table-${e.name}-select-header`,
                              onChange: Qe,
                              "onUpdate:modelValue": m[0] || (m[0] = (b) => v.value = b),
                              class: "rounded-sm mr-1 border-gray-300 m-1"
                            }, null, 40, Ao), [
                              [Be, v.value]
                            ])
                          ])) : w("", !0),
                          (f(!0), p(E, null, W(t.value.columns, (b) => (f(), F(tr, {
                            key: `table-${e.name}-header-${b.key}`,
                            cell: Me(b.key)
                          }, {
                            label: j(() => [
                              N(d.$slots, `header(${b.key})`, {
                                label: Me(b.key).label,
                                column: Me(b.key)
                              })
                            ]),
                            _: 2
                          }, 1032, ["cell"]))), 128))
                        ])
                      ])
                    ]),
                    a("tbody", Bo, [
                      N(d.$slots, "body", { show: ze }, () => [
                        (f(!0), p(E, null, W(q.value, (b, C) => (f(), p("tr", {
                          key: `table-${e.name}-row-${C}`,
                          class: k(["", {
                            "bg-gray-50": e.striped && C % 2,
                            "hover:bg-gray-100": e.striped,
                            "hover:bg-gray-50": !e.striped
                          }])
                        }, [
                          e.hasCheckboxes ? (f(), p("td", Lo, [
                            G(a("input", {
                              type: "checkbox",
                              id: `table-${e.name}-select-${C}`,
                              class: "rounded-sm m-1 border-gray-300",
                              "onUpdate:modelValue": (S) => b.__itSelected = S
                            }, null, 8, Ro), [
                              [Be, b.__itSelected]
                            ])
                          ])) : w("", !0),
                          (f(!0), p(E, null, W(t.value.columns, (S, Q) => G((f(), p("td", {
                            key: `table-${e.name}-row-${C}-column-${S.key}`,
                            onClick: ($e) => Se($e, b, C),
                            class: k(S.body_class)
                          }, [
                            N(d.$slots, `cell(${S.key})`, { item: b }, () => [
                              J(y(b[S.key]), 1)
                            ])
                          ], 10, Go)), [
                            [U, ze(S.key)]
                          ])), 128))
                        ], 2))), 128))
                      ])
                    ])
                  ])
                ]),
                N(d.$slots, "pagination", {
                  onClick: ve,
                  hasData: z.value,
                  meta: M.value,
                  perPageOptions: t.value.perPageOptions,
                  onPerPageChange: ue
                }, () => [
                  a("div", Eo, [
                    e.hasCheckboxes ? (f(), p("span", Wo, y(Ye.value), 1)) : w("", !0),
                    ae(vr, {
                      "on-click": ve,
                      "has-data": z.value,
                      meta: M.value,
                      "per-page-options": t.value.perPageOptions,
                      "on-per-page-change": ue,
                      color: e.color
                    }, null, 8, ["has-data", "meta", "per-page-options", "color"])
                  ])
                ])
              ]),
              _: 3
            }, 8, ["class"])
          ])
        ], 10, zo))
      ]),
      _: 3
    }));
  }
};
export {
  qe as ButtonWithDropdown,
  tr as HeaderCell,
  pt as OnClickOutside,
  vr as Pagination,
  il as Table,
  wr as TableAddSearchRow,
  qr as TableColumns,
  lo as TableFilter,
  ao as TableGlobalSearch,
  ho as TableReset,
  po as TableSearchRows,
  ko as TableWrapper,
  ke as getTranslations,
  sl as setTranslation,
  al as setTranslations
};
