import qn, { ref as se, onMounted as Tt, onBeforeUnmount as _n, openBlock as I, createElementBlock as $, renderSlot as xe, watch as kt, inject as ft, createBlock as be, withCtx as Le, createElementVNode as b, normalizeClass as Z, withModifiers as Ke, withDirectives as He, vShow as Rt, createStaticVNode as eo, normalizeStyle as Ct, toDisplayString as B, createCommentVNode as W, createTextVNode as yt, computed as me, unref as ae, vModelSelect as Tn, vModelText as Yt, watchEffect as to, onUnmounted as Nr, Teleport as Pr, Fragment as ut, renderList as ct, createVNode as et, withKeys as un, nextTick as In, resolveDynamicComponent as Kt, reactive as ro, getCurrentInstance as no, provide as oo, Transition as ao, vModelCheckbox as cn, normalizeProps as lo, guardReactiveProps as io } from "vue";
import { createPopper as so } from "@popperjs/core/lib/popper-lite";
import uo from "@popperjs/core/lib/modifiers/preventOverflow";
import co from "@popperjs/core/lib/modifiers/flip";
import { createPopper as fo } from "@popperjs/core";
import vo from "lodash-es/uniq";
import ho from "lodash-es/find";
import Lr from "qs";
import po from "lodash-es/clone";
import go from "lodash-es/filter";
import mo from "lodash-es/findKey";
import Pt from "lodash-es/forEach";
import yo from "lodash-es/isEqual";
import bo from "lodash-es/map";
import xo from "lodash-es/pickBy";
import { usePage as dn, router as So } from "@inertiajs/vue3";
const wo = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(t) {
    const n = t, o = se(null), i = se(null);
    return Tt(() => {
      o.value = (r) => {
        r.target === i.value || i.value.contains(r.target) || n.do();
      }, document.addEventListener("click", o.value), document.addEventListener("touchstart", o.value);
    }), _n(() => {
      document.removeEventListener("click", o.value), document.removeEventListener("touchstart", o.value);
    }), (r, s) => (I(), $("div", {
      ref_key: "root",
      ref: i
    }, [
      xe(r.$slots, "default")
    ], 512));
  }
}, rn = "-", Eo = (t) => {
  const n = Oo(t), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: i
  } = t;
  return {
    getClassGroupId: (e) => {
      const l = e.split(rn);
      return l[0] === "" && l.length !== 1 && l.shift(), Pn(l, n) || Co(e);
    },
    getConflictingClassGroupIds: (e, l) => {
      const a = o[e] || [];
      return l && i[e] ? [...a, ...i[e]] : a;
    }
  };
}, Pn = (t, n) => {
  var e;
  if (t.length === 0)
    return n.classGroupId;
  const o = t[0], i = n.nextPart.get(o), r = i ? Pn(t.slice(1), i) : void 0;
  if (r)
    return r;
  if (n.validators.length === 0)
    return;
  const s = t.join(rn);
  return (e = n.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : e.classGroupId;
}, fn = /^\[(.+)\]$/, Co = (t) => {
  if (fn.test(t)) {
    const n = fn.exec(t)[1], o = n == null ? void 0 : n.substring(0, n.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, Oo = (t) => {
  const {
    theme: n,
    prefix: o
  } = t, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Io(Object.entries(t.classGroups), o).forEach(([s, e]) => {
    Jr(e, i, s, n);
  }), i;
}, Jr = (t, n, o, i) => {
  t.forEach((r) => {
    if (typeof r == "string") {
      const s = r === "" ? n : vn(n, r);
      s.classGroupId = o;
      return;
    }
    if (typeof r == "function") {
      if (To(r)) {
        Jr(r(i), n, o, i);
        return;
      }
      n.validators.push({
        validator: r,
        classGroupId: o
      });
      return;
    }
    Object.entries(r).forEach(([s, e]) => {
      Jr(e, vn(n, s), o, i);
    });
  });
}, vn = (t, n) => {
  let o = t;
  return n.split(rn).forEach((i) => {
    o.nextPart.has(i) || o.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(i);
  }), o;
}, To = (t) => t.isThemeGetter, Io = (t, n) => n ? t.map(([o, i]) => {
  const r = i.map((s) => typeof s == "string" ? n + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([e, l]) => [n + e, l])) : s);
  return [o, r];
}) : t, Po = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const r = (s, e) => {
    o.set(s, e), n++, n > t && (n = 0, i = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let e = o.get(s);
      if (e !== void 0)
        return e;
      if ((e = i.get(s)) !== void 0)
        return r(s, e), e;
    },
    set(s, e) {
      o.has(s) ? o.set(s, e) : r(s, e);
    }
  };
}, An = "!", Ao = (t) => {
  const {
    separator: n,
    experimentalParseClassName: o
  } = t, i = n.length === 1, r = n[0], s = n.length, e = (l) => {
    const a = [];
    let u = 0, c = 0, d;
    for (let v = 0; v < l.length; v++) {
      let m = l[v];
      if (u === 0) {
        if (m === r && (i || l.slice(v, v + s) === n)) {
          a.push(l.slice(c, v)), c = v + s;
          continue;
        }
        if (m === "/") {
          d = v;
          continue;
        }
      }
      m === "[" ? u++ : m === "]" && u--;
    }
    const f = a.length === 0 ? l : l.substring(c), h = f.startsWith(An), g = h ? f.substring(1) : f, p = d && d > c ? d - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: p
    };
  };
  return o ? (l) => o({
    className: l,
    parseClassName: e
  }) : e;
}, Mo = (t) => {
  if (t.length <= 1)
    return t;
  const n = [];
  let o = [];
  return t.forEach((i) => {
    i[0] === "[" ? (n.push(...o.sort(), i), o = []) : o.push(i);
  }), n.push(...o.sort()), n;
}, Do = (t) => ({
  cache: Po(t.cacheSize),
  parseClassName: Ao(t),
  ...Eo(t)
}), $o = /\s+/, Ro = (t, n) => {
  const {
    parseClassName: o,
    getClassGroupId: i,
    getConflictingClassGroupIds: r
  } = n, s = [], e = t.trim().split($o);
  let l = "";
  for (let a = e.length - 1; a >= 0; a -= 1) {
    const u = e[a], {
      modifiers: c,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: h
    } = o(u);
    let g = Boolean(h), p = i(g ? f.substring(0, h) : f);
    if (!p) {
      if (!g) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (p = i(f), !p) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = !1;
    }
    const v = Mo(c).join(":"), m = d ? v + An : v, y = m + p;
    if (s.includes(y))
      continue;
    s.push(y);
    const x = r(p, g);
    for (let E = 0; E < x.length; ++E) {
      const P = x[E];
      s.push(m + P);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function No() {
  let t = 0, n, o, i = "";
  for (; t < arguments.length; )
    (n = arguments[t++]) && (o = Mn(n)) && (i && (i += " "), i += o);
  return i;
}
const Mn = (t) => {
  if (typeof t == "string")
    return t;
  let n, o = "";
  for (let i = 0; i < t.length; i++)
    t[i] && (n = Mn(t[i])) && (o && (o += " "), o += n);
  return o;
};
function ko(t, ...n) {
  let o, i, r, s = e;
  function e(a) {
    const u = n.reduce((c, d) => d(c), t());
    return o = Do(u), i = o.cache.get, r = o.cache.set, s = l, l(a);
  }
  function l(a) {
    const u = i(a);
    if (u)
      return u;
    const c = Ro(a, o);
    return r(a, c), c;
  }
  return function() {
    return s(No.apply(null, arguments));
  };
}
const Oe = (t) => {
  const n = (o) => o[t] || [];
  return n.isThemeGetter = !0, n;
}, Dn = /^\[(?:([a-z-]+):)?(.+)\]$/i, jo = /^\d+\/\d+$/, Fo = /* @__PURE__ */ new Set(["px", "full", "screen"]), Lo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, zo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Bo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Uo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Go = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Et = (t) => Qt(t) || Fo.has(t) || jo.test(t), At = (t) => Zt(t, "length", Jo), Qt = (t) => Boolean(t) && !Number.isNaN(Number(t)), zr = (t) => Zt(t, "number", Qt), er = (t) => Boolean(t) && Number.isInteger(Number(t)), Vo = (t) => t.endsWith("%") && Qt(t.slice(0, -1)), ie = (t) => Dn.test(t), Mt = (t) => Lo.test(t), Wo = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ko = (t) => Zt(t, Wo, $n), Ho = (t) => Zt(t, "position", $n), Xo = /* @__PURE__ */ new Set(["image", "url"]), Yo = (t) => Zt(t, Xo, qo), Qo = (t) => Zt(t, "", Zo), tr = () => !0, Zt = (t, n, o) => {
  const i = Dn.exec(t);
  return i ? i[1] ? typeof n == "string" ? i[1] === n : n.has(i[1]) : o(i[2]) : !1;
}, Jo = (t) => zo.test(t) && !Bo.test(t), $n = () => !1, Zo = (t) => Uo.test(t), qo = (t) => Go.test(t), _o = () => {
  const t = Oe("colors"), n = Oe("spacing"), o = Oe("blur"), i = Oe("brightness"), r = Oe("borderColor"), s = Oe("borderRadius"), e = Oe("borderSpacing"), l = Oe("borderWidth"), a = Oe("contrast"), u = Oe("grayscale"), c = Oe("hueRotate"), d = Oe("invert"), f = Oe("gap"), h = Oe("gradientColorStops"), g = Oe("gradientColorStopPositions"), p = Oe("inset"), v = Oe("margin"), m = Oe("opacity"), y = Oe("padding"), x = Oe("saturate"), E = Oe("scale"), P = Oe("sepia"), T = Oe("skew"), U = Oe("space"), K = Oe("translate"), A = () => ["auto", "contain", "none"], F = () => ["auto", "hidden", "clip", "visible", "scroll"], G = () => ["auto", ie, n], V = () => [ie, n], N = () => ["", Et, At], k = () => ["auto", Qt, ie], q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], z = () => ["solid", "dashed", "dotted", "double", "none"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ue = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], he = () => ["", "0", ie], De = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], de = () => [Qt, ie];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [tr],
      spacing: [Et, At],
      blur: ["none", "", Mt, ie],
      brightness: de(),
      borderColor: [t],
      borderRadius: ["none", "", "full", Mt, ie],
      borderSpacing: V(),
      borderWidth: N(),
      contrast: de(),
      grayscale: he(),
      hueRotate: de(),
      invert: he(),
      gap: V(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Vo, At],
      inset: G(),
      margin: G(),
      opacity: de(),
      padding: V(),
      saturate: de(),
      scale: de(),
      sepia: he(),
      skew: de(),
      space: V(),
      translate: V()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", ie]
      }],
      container: ["container"],
      columns: [{
        columns: [Mt]
      }],
      "break-after": [{
        "break-after": De()
      }],
      "break-before": [{
        "break-before": De()
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
        object: [...q(), ie]
      }],
      overflow: [{
        overflow: F()
      }],
      "overflow-x": [{
        "overflow-x": F()
      }],
      "overflow-y": [{
        "overflow-y": F()
      }],
      overscroll: [{
        overscroll: A()
      }],
      "overscroll-x": [{
        "overscroll-x": A()
      }],
      "overscroll-y": [{
        "overscroll-y": A()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [p]
      }],
      "inset-x": [{
        "inset-x": [p]
      }],
      "inset-y": [{
        "inset-y": [p]
      }],
      start: [{
        start: [p]
      }],
      end: [{
        end: [p]
      }],
      top: [{
        top: [p]
      }],
      right: [{
        right: [p]
      }],
      bottom: [{
        bottom: [p]
      }],
      left: [{
        left: [p]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", er, ie]
      }],
      basis: [{
        basis: G()
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      flex: [{
        flex: ["1", "auto", "initial", "none", ie]
      }],
      grow: [{
        grow: he()
      }],
      shrink: [{
        shrink: he()
      }],
      order: [{
        order: ["first", "last", "none", er, ie]
      }],
      "grid-cols": [{
        "grid-cols": [tr]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: ["full", er, ie]
        }, ie]
      }],
      "col-start": [{
        "col-start": k()
      }],
      "col-end": [{
        "col-end": k()
      }],
      "grid-rows": [{
        "grid-rows": [tr]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [er, ie]
        }, ie]
      }],
      "row-start": [{
        "row-start": k()
      }],
      "row-end": [{
        "row-end": k()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", ie]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", ie]
      }],
      gap: [{
        gap: [f]
      }],
      "gap-x": [{
        "gap-x": [f]
      }],
      "gap-y": [{
        "gap-y": [f]
      }],
      "justify-content": [{
        justify: ["normal", ...ue()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...ue(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...ue(), "baseline"]
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [y]
      }],
      px: [{
        px: [y]
      }],
      py: [{
        py: [y]
      }],
      ps: [{
        ps: [y]
      }],
      pe: [{
        pe: [y]
      }],
      pt: [{
        pt: [y]
      }],
      pr: [{
        pr: [y]
      }],
      pb: [{
        pb: [y]
      }],
      pl: [{
        pl: [y]
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
        "space-x": [U]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [U]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ie, n]
      }],
      "min-w": [{
        "min-w": [ie, n, "min", "max", "fit"]
      }],
      "max-w": [{
        "max-w": [ie, n, "none", "full", "min", "max", "fit", "prose", {
          screen: [Mt]
        }, Mt]
      }],
      h: [{
        h: [ie, n, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "min-h": [{
        "min-h": [ie, n, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      "max-h": [{
        "max-h": [ie, n, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      size: [{
        size: [ie, n, "auto", "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", Mt, At]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", zr]
      }],
      "font-family": [{
        font: [tr]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ie]
      }],
      "line-clamp": [{
        "line-clamp": ["none", Qt, zr]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Et, ie]
      }],
      "list-image": [{
        "list-image": ["none", ie]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", ie]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [t]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [m]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [t]
      }],
      "text-opacity": [{
        "text-opacity": [m]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...z(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Et, At]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", Et, ie]
      }],
      "text-decoration-color": [{
        decoration: [t]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: V()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ie]
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
        content: ["none", ie]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [m]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [...q(), Ho]
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ko]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Yo]
      }],
      "bg-color": [{
        bg: [t]
      }],
      "gradient-from-pos": [{
        from: [g]
      }],
      "gradient-via-pos": [{
        via: [g]
      }],
      "gradient-to-pos": [{
        to: [g]
      }],
      "gradient-from": [{
        from: [h]
      }],
      "gradient-via": [{
        via: [h]
      }],
      "gradient-to": [{
        to: [h]
      }],
      rounded: [{
        rounded: [s]
      }],
      "rounded-s": [{
        "rounded-s": [s]
      }],
      "rounded-e": [{
        "rounded-e": [s]
      }],
      "rounded-t": [{
        "rounded-t": [s]
      }],
      "rounded-r": [{
        "rounded-r": [s]
      }],
      "rounded-b": [{
        "rounded-b": [s]
      }],
      "rounded-l": [{
        "rounded-l": [s]
      }],
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      "rounded-se": [{
        "rounded-se": [s]
      }],
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      "rounded-es": [{
        "rounded-es": [s]
      }],
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      "rounded-br": [{
        "rounded-br": [s]
      }],
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      "border-w": [{
        border: [l]
      }],
      "border-w-x": [{
        "border-x": [l]
      }],
      "border-w-y": [{
        "border-y": [l]
      }],
      "border-w-s": [{
        "border-s": [l]
      }],
      "border-w-e": [{
        "border-e": [l]
      }],
      "border-w-t": [{
        "border-t": [l]
      }],
      "border-w-r": [{
        "border-r": [l]
      }],
      "border-w-b": [{
        "border-b": [l]
      }],
      "border-w-l": [{
        "border-l": [l]
      }],
      "border-opacity": [{
        "border-opacity": [m]
      }],
      "border-style": [{
        border: [...z(), "hidden"]
      }],
      "divide-x": [{
        "divide-x": [l]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [l]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [m]
      }],
      "divide-style": [{
        divide: z()
      }],
      "border-color": [{
        border: [r]
      }],
      "border-color-x": [{
        "border-x": [r]
      }],
      "border-color-y": [{
        "border-y": [r]
      }],
      "border-color-s": [{
        "border-s": [r]
      }],
      "border-color-e": [{
        "border-e": [r]
      }],
      "border-color-t": [{
        "border-t": [r]
      }],
      "border-color-r": [{
        "border-r": [r]
      }],
      "border-color-b": [{
        "border-b": [r]
      }],
      "border-color-l": [{
        "border-l": [r]
      }],
      "divide-color": [{
        divide: [r]
      }],
      "outline-style": [{
        outline: ["", ...z()]
      }],
      "outline-offset": [{
        "outline-offset": [Et, ie]
      }],
      "outline-w": [{
        outline: [Et, At]
      }],
      "outline-color": [{
        outline: [t]
      }],
      "ring-w": [{
        ring: N()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [t]
      }],
      "ring-opacity": [{
        "ring-opacity": [m]
      }],
      "ring-offset-w": [{
        "ring-offset": [Et, At]
      }],
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      shadow: [{
        shadow: ["", "inner", "none", Mt, Qo]
      }],
      "shadow-color": [{
        shadow: [tr]
      }],
      opacity: [{
        opacity: [m]
      }],
      "mix-blend": [{
        "mix-blend": [...J(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": J()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [o]
      }],
      brightness: [{
        brightness: [i]
      }],
      contrast: [{
        contrast: [a]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", Mt, ie]
      }],
      grayscale: [{
        grayscale: [u]
      }],
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      invert: [{
        invert: [d]
      }],
      saturate: [{
        saturate: [x]
      }],
      sepia: [{
        sepia: [P]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [o]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [i]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [a]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [m]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [x]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [P]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [e]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [e]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [e]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ie]
      }],
      duration: [{
        duration: de()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", ie]
      }],
      delay: [{
        delay: de()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", ie]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [E]
      }],
      "scale-x": [{
        "scale-x": [E]
      }],
      "scale-y": [{
        "scale-y": [E]
      }],
      rotate: [{
        rotate: [er, ie]
      }],
      "translate-x": [{
        "translate-x": [K]
      }],
      "translate-y": [{
        "translate-y": [K]
      }],
      "skew-x": [{
        "skew-x": [T]
      }],
      "skew-y": [{
        "skew-y": [T]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", ie]
      }],
      accent: [{
        accent: ["auto", t]
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ie]
      }],
      "caret-color": [{
        caret: [t]
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
        "scroll-m": V()
      }],
      "scroll-mx": [{
        "scroll-mx": V()
      }],
      "scroll-my": [{
        "scroll-my": V()
      }],
      "scroll-ms": [{
        "scroll-ms": V()
      }],
      "scroll-me": [{
        "scroll-me": V()
      }],
      "scroll-mt": [{
        "scroll-mt": V()
      }],
      "scroll-mr": [{
        "scroll-mr": V()
      }],
      "scroll-mb": [{
        "scroll-mb": V()
      }],
      "scroll-ml": [{
        "scroll-ml": V()
      }],
      "scroll-p": [{
        "scroll-p": V()
      }],
      "scroll-px": [{
        "scroll-px": V()
      }],
      "scroll-py": [{
        "scroll-py": V()
      }],
      "scroll-ps": [{
        "scroll-ps": V()
      }],
      "scroll-pe": [{
        "scroll-pe": V()
      }],
      "scroll-pt": [{
        "scroll-pt": V()
      }],
      "scroll-pr": [{
        "scroll-pr": V()
      }],
      "scroll-pb": [{
        "scroll-pb": V()
      }],
      "scroll-pl": [{
        "scroll-pl": V()
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
        "will-change": ["auto", "scroll", "contents", "transform", ie]
      }],
      fill: [{
        fill: [t, "none"]
      }],
      "stroke-w": [{
        stroke: [Et, At, zr]
      }],
      stroke: [{
        stroke: [t, "none"]
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
}, at = /* @__PURE__ */ ko(_o);
function Pe(t, n, o, i) {
  let r = n ? { ...n } : {}, s = null, e = o ? { ...o } : {}, l = null, a = i ? { ...i } : {}, u = null;
  for (const c of t)
    s === null && c in r && (r = r[c], typeof r == "string" && (s = r)), l === null && c in e && (e = e[c], typeof e == "string" && (l = e)), u === null && c in a && (a = a[c], typeof a == "string" && (u = a));
  return at(s, l, u);
}
const ea = { class: "relative" }, ta = ["dusk", "disabled"], ra = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, kr = {
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
  setup(t, { expose: n, emit: o }) {
    const i = o, r = t, s = se(!1), e = se(null);
    function l() {
      s.value = !s.value;
    }
    function a() {
      s.value = !1;
    }
    kt(s, () => {
      e.value.update(), s.value || i("closed"), s.value && i("opened");
    });
    const u = se(null), c = se(null);
    Tt(() => {
      e.value = so(u.value, c.value, {
        placement: r.placement,
        modifiers: [co, uo]
      });
    }), n({ hide: a });
    const d = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, f = ft("themeVariables"), h = (g) => {
      var v, m;
      let p = "";
      return g === "button" && r.disabled && (p = "cursor-not-allowed"), at(
        p,
        Pe([g, "base"], d, (v = f == null ? void 0 : f.inertia_table) == null ? void 0 : v.button_with_dropdown, r.ui),
        Pe([g, "color", r.color], d, (m = f == null ? void 0 : f.inertia_table) == null ? void 0 : m.button_with_dropdown, r.ui)
      );
    };
    return (g, p) => (I(), be(wo, { do: a }, {
      default: Le(() => [
        b("div", ea, [
          b("button", {
            ref_key: "button",
            ref: u,
            type: "button",
            dusk: t.dusk,
            disabled: t.disabled,
            class: Z(h("button")),
            "aria-haspopup": "true",
            onClick: Ke(l, ["prevent"])
          }, [
            xe(g.$slots, "button")
          ], 10, ta),
          He(b("div", {
            ref_key: "tooltip",
            ref: c,
            class: "absolute z-50"
          }, [
            b("div", ra, [
              xe(g.$slots, "default")
            ])
          ], 512), [
            [Rt, s.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const qt = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [i, r] of n)
    o[i] = r;
  return o;
}, na = {
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
  setup(t) {
    const n = t, o = (i) => {
      n.onResize(i, n.columnKey);
    };
    return (i, r) => (I(), $("div", {
      class: Z(["column-resize-handle", {
        resizing: t.isActive,
        visible: t.isActive
      }]),
      onMousedown: o
    }, [...r[0] || (r[0] = [
      eo('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ])], 34));
  }
}, oa = /* @__PURE__ */ qt(na, [["__scopeId", "data-v-672a9339"]]), aa = { class: "w-full flex gap-2 justify-between items-center" }, la = { class: "relative inline-flex items-center cursor-pointer" }, ia = ["checked"], Rn = {
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
  setup(t) {
    const n = t, o = {
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
    }, i = ft("themeVariables"), r = (s) => {
      var l, a, u, c;
      let e = n.color;
      return s === "toggle" && n.filter.value === null && (e = "disabled"), at(
        Pe([s, "base"], o, (a = (l = i == null ? void 0 : i.inertia_table) == null ? void 0 : l.table_filter) == null ? void 0 : a.toggle_filter, n.ui),
        Pe([s, "color", e], o, (c = (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : c.toggle_filter, n.ui)
      );
    };
    return (s, e) => (I(), $("div", aa, [
      b("label", la, [
        b("input", {
          type: "checkbox",
          checked: t.filter.value,
          class: "sr-only peer",
          onChange: e[0] || (e[0] = (l) => t.onFilterChange(t.filter.key, l.target.checked ? "1" : "0"))
        }, null, 40, ia),
        b("div", {
          class: Z(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", r("toggle")])
        }, null, 2)
      ]),
      b("button", {
        class: Z(r("reset_button")),
        onClick: e[1] || (e[1] = Ke((l) => t.onFilterChange(t.filter.key, null), ["prevent"]))
      }, [...e[2] || (e[2] = [
        b("span", { class: "sr-only" }, "Remove search", -1),
        b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          b("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])], 2)
    ]));
  }
}, sa = {
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
          let t = Number(Math.min(...this.internalValue));
          if (Number.isNaN(t))
            throw !0;
          return this.checkedValue(t);
        } else
          throw !0;
      } catch {
        return console.error("Malformed model value. You need to have an array of 2 number"), Number(this.min);
      }
    },
    currentMaxValue() {
      try {
        if (Array.isArray(this.internalValue) && this.internalValue.length === 2) {
          let t = Number(Math.max(...this.internalValue));
          if (Number.isNaN(t))
            throw !0;
          return this.checkedValue(t);
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
    getMarginTop(t) {
      const n = this.getTheme("button"), o = /h-(\d+)/, i = n.match(o), r = 4;
      let s = null;
      return i && 1 in i ? s = i[1] : s = r, t ? `margin-top: ${(s - r + 12) * 0.25}rem` : `margin-top: -${((s - r) / 2 + 9) * 0.25}rem`;
    },
    checkedValue(t) {
      return t < Number(this.min) ? (console.warn("SimpleMultiRange: Your value need to be gte than your min range"), Number(this.min)) : t > Number(this.max) ? (console.warn("SimpleMultiRange: Your value need to be lte than your max range"), Number(this.max)) : t;
    },
    detectIfOverlap() {
      let t = this.$refs.popover_min.getClientRects()[0], n = this.$refs.popover_max.getClientRects()[0];
      t && n && (this.hasOverlap = t.right > n.left);
    },
    handleMouseDown(t, n) {
      this.moveMin = n, this.moveMax = !n, this.rangePositions = this.$refs.range.getClientRects()[0], window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(t) {
      let i = (t.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), r = Number(Math.round(i / this.step) * this.step).toFixed(2);
      r >= this.min && r <= this.max && (this.moveMin && r !== this.currentMinValue && r <= this.currentMaxValue && (this.internalValue = [r, this.currentMaxValue]), this.moveMax && r !== this.currentMaxValue && r >= this.currentMinValue && (this.internalValue = [this.currentMinValue, r])), this.detectIfOverlap();
    },
    handleMouseUp(t) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(t) {
      var n, o, i, r, s, e;
      return at(
        Pe([t, "base"], this.fallbackTheme, (i = (o = (n = this.themeVariables) == null ? void 0 : n.inertia_table) == null ? void 0 : o.table_filter) == null ? void 0 : i.number_range_filter, this.ui),
        Pe([t, "color", this.color], this.fallbackTheme, (e = (s = (r = this.themeVariables) == null ? void 0 : r.inertia_table) == null ? void 0 : s.table_filter) == null ? void 0 : e.number_range_filter, this.ui)
      );
    }
  }
}, ua = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, ca = { class: "py-1 relative min-w-full" }, da = { class: "z-40" }, fa = {
  ref: "popover_min",
  class: "relative shadow-md"
}, va = { key: 0 }, ha = { key: 1 }, pa = { class: "z-40" }, ga = {
  ref: "popover_max",
  class: "relative shadow-md"
}, ma = { key: 0 }, ya = { key: 1 }, ba = { draggable: "true" }, xa = { key: 0 }, Sa = { key: 1 }, wa = { key: 0 }, Ea = { key: 1 };
function Ca(t, n, o, i, r, s) {
  var e, l, a, u;
  return I(), $("div", ua, [
    b("div", ca, [
      b("div", {
        class: Z(s.getTheme("main_bar"))
      }, [
        b("div", {
          class: Z(["absolute", s.getTheme("selected_bar")]),
          style: Ct(`width: ${s.rangeWidth}% !important; left: ${s.currentMinValueInPercent}% !important;`)
        }, null, 6),
        b("div", {
          class: Z([s.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: Ct(`left: ${s.currentMinValueInPercent}%;`),
          onMousedown: n[0] || (n[0] = (c) => s.handleMouseDown(c, !0))
        }, [
          b("div", da, [
            b("div", fa, [
              b("div", {
                class: Z(s.getTheme("popover")),
                style: Ct(s.getMarginTop(r.hasOverlap && s.displayFirstDown))
              }, [
                o.prefix ? (I(), $("span", va, B(o.prefix), 1)) : W("", !0),
                yt(" " + B((e = s.currentMinValue) != null ? e : 0) + " ", 1),
                o.suffix ? (I(), $("span", ha, B(o.suffix), 1)) : W("", !0)
              ], 6),
              (I(), $("svg", {
                class: Z(["absolute w-full h-2 left-0", [r.hasOverlap && s.displayFirstDown ? "bottom-6 rotate-180" : "top-100", s.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, [...n[2] || (n[2] = [
                b("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ])], 2))
            ], 512)
          ])
        ], 38),
        b("div", {
          class: Z([s.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: Ct(`left: ${s.currentMaxValueInPercent}%;`),
          onMousedown: n[1] || (n[1] = (c) => s.handleMouseDown(c, !1))
        }, [
          b("div", pa, [
            b("div", ga, [
              b("div", {
                class: Z(s.getTheme("popover")),
                style: Ct(s.getMarginTop(r.hasOverlap && !s.displayFirstDown))
              }, [
                o.prefix ? (I(), $("span", ma, B(o.prefix), 1)) : W("", !0),
                yt(" " + B((l = s.currentMaxValue) != null ? l : 0) + " ", 1),
                o.suffix ? (I(), $("span", ya, B(o.suffix), 1)) : W("", !0)
              ], 6),
              b("div", ba, [
                (I(), $("svg", {
                  class: Z(["absolute w-full h-2 left-0 top-100", [r.hasOverlap && !s.displayFirstDown ? "bottom-6 rotate-180" : "top-100", s.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, [...n[3] || (n[3] = [
                  b("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ])], 2))
              ])
            ], 512)
          ])
        ], 38),
        b("div", {
          class: Z(["absolute -ml-1 bottom-0 left-0 -mb-6", s.getTheme("text")])
        }, [
          o.prefix ? (I(), $("span", xa, B(o.prefix), 1)) : W("", !0),
          yt(" " + B((a = o.min) != null ? a : 0) + " ", 1),
          o.suffix ? (I(), $("span", Sa, B(o.suffix), 1)) : W("", !0)
        ], 2),
        b("div", {
          class: Z(["absolute -mr-1 bottom-0 right-0 -mb-6", s.getTheme("text")])
        }, [
          o.prefix ? (I(), $("span", wa, B(o.prefix), 1)) : W("", !0),
          yt(" " + B((u = o.max) != null ? u : 0) + " ", 1),
          o.suffix ? (I(), $("span", Ea, B(o.suffix), 1)) : W("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const Nn = /* @__PURE__ */ qt(sa, [["render", Ca]]), nn = {
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
function jt() {
  return nn.translations;
}
function xu(t, n) {
  nn.translations[t] = n;
}
function Su(t) {
  nn.translations = t;
}
const Oa = { class: "space-y-4" }, Ta = { class: "block text-sm font-medium text-gray-700 mb-2" }, Ia = { value: "" }, Pa = { value: "exact" }, Aa = { value: "less_than" }, Ma = { value: "greater_than" }, Da = { value: "less_than_or_equal" }, $a = { value: "greater_than_or_equal" }, Ra = { value: "between" }, Na = {
  key: 0,
  class: "space-y-3"
}, ka = { key: 0 }, ja = { class: "block text-sm font-medium text-gray-700 mb-1" }, Fa = { class: "flex items-center" }, La = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, za = ["step"], Ba = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Ua = {
  key: 1,
  class: "space-y-3"
}, Ga = { class: "block text-sm font-medium text-gray-700 mb-1" }, Va = { class: "flex items-center" }, Wa = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, Ka = ["step"], Ha = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Xa = { class: "block text-sm font-medium text-gray-700 mb-1" }, Ya = { class: "flex items-center" }, Qa = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, Ja = ["step"], Za = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, qa = {
  key: 1,
  class: "flex justify-end"
}, _a = { class: "sr-only" }, kn = {
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
  setup(t) {
    const n = t, o = jt(), i = se(""), r = se(""), s = se(""), e = se(""), l = me(() => i.value !== "" && (i.value !== "between" && r.value !== "" && r.value !== null || i.value === "between" && s.value !== "" && s.value !== null && e.value !== "" && e.value !== null));
    function a() {
      switch (i.value) {
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
    function u() {
      r.value = "", s.value = "", e.value = "", i.value === "" ? d() : c();
    }
    function c() {
      if (i.value === "")
        return;
      let p = null;
      switch (i.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          r.value !== "" && r.value !== null && (p = {
            type: i.value,
            number: r.value
          });
          break;
        case "between":
          s.value !== "" && s.value !== null && e.value !== "" && e.value !== null && (p = {
            type: i.value,
            start_number: s.value,
            end_number: e.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, p);
    }
    function d() {
      i.value = "", r.value = "", s.value = "", e.value = "", n.onFilterChange(n.filter.key, null);
    }
    Tt(() => {
      if (n.filter.value) {
        const p = n.filter.value;
        p.type && (i.value = p.type, p.type === "between" ? (s.value = p.start_number || "", e.value = p.end_number || "") : r.value = p.number || "");
      }
    }), kt(() => n.filter.value, (p) => {
      p ? p.type && (i.value = p.type, p.type === "between" ? (s.value = p.start_number || "", e.value = p.end_number || "") : r.value = p.number || "") : d();
    }, { deep: !0 });
    const f = {
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
    }, h = ft("themeVariables"), g = (p) => {
      var v, m, y, x;
      return at(
        Pe([p, "base"], f, (m = (v = h == null ? void 0 : h.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : m.number_filter, n.ui),
        Pe([p, "color", n.color], f, (x = (y = h == null ? void 0 : h.inertia_table) == null ? void 0 : y.table_filter) == null ? void 0 : x.number_filter, n.ui)
      );
    };
    return (p, v) => (I(), $("div", Oa, [
      b("div", null, [
        b("label", Ta, B(ae(o).filter_type), 1),
        He(b("select", {
          "onUpdate:modelValue": v[0] || (v[0] = (m) => i.value = m),
          class: Z(g("select")),
          onChange: u
        }, [
          b("option", Ia, B(ae(o).no_filter), 1),
          b("option", Pa, B(ae(o).exact_number), 1),
          b("option", Aa, B(ae(o).less_than), 1),
          b("option", Ma, B(ae(o).greater_than), 1),
          b("option", Da, B(ae(o).less_than_or_equal), 1),
          b("option", $a, B(ae(o).greater_than_or_equal), 1),
          b("option", Ra, B(ae(o).number_range), 1)
        ], 34), [
          [Tn, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (I(), $("div", Na, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(i.value) ? (I(), $("div", ka, [
          b("label", ja, B(a()), 1),
          b("div", Fa, [
            t.filter.prefix ? (I(), $("span", La, B(t.filter.prefix), 1)) : W("", !0),
            He(b("input", {
              type: "number",
              "onUpdate:modelValue": v[1] || (v[1] = (m) => r.value = m),
              step: t.filter.step || 1,
              class: Z(g("input")),
              onInput: c,
              placeholder: "0"
            }, null, 42, za), [
              [
                Yt,
                r.value,
                void 0,
                { number: !0 }
              ]
            ]),
            t.filter.suffix ? (I(), $("span", Ba, B(t.filter.suffix), 1)) : W("", !0)
          ])
        ])) : W("", !0),
        i.value === "between" ? (I(), $("div", Ua, [
          b("div", null, [
            b("label", Ga, B(ae(o).start_number), 1),
            b("div", Va, [
              t.filter.prefix ? (I(), $("span", Wa, B(t.filter.prefix), 1)) : W("", !0),
              He(b("input", {
                type: "number",
                "onUpdate:modelValue": v[2] || (v[2] = (m) => s.value = m),
                step: t.filter.step || 1,
                class: Z(g("input")),
                onInput: c,
                placeholder: "0"
              }, null, 42, Ka), [
                [
                  Yt,
                  s.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              t.filter.suffix ? (I(), $("span", Ha, B(t.filter.suffix), 1)) : W("", !0)
            ])
          ]),
          b("div", null, [
            b("label", Xa, B(ae(o).end_number), 1),
            b("div", Ya, [
              t.filter.prefix ? (I(), $("span", Qa, B(t.filter.prefix), 1)) : W("", !0),
              He(b("input", {
                type: "number",
                "onUpdate:modelValue": v[3] || (v[3] = (m) => e.value = m),
                step: t.filter.step || 1,
                class: Z(g("input")),
                onInput: c,
                placeholder: "0"
              }, null, 42, Ja), [
                [
                  Yt,
                  e.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              t.filter.suffix ? (I(), $("span", Za, B(t.filter.suffix), 1)) : W("", !0)
            ])
          ])
        ])) : W("", !0)
      ])) : W("", !0),
      l.value ? (I(), $("div", qa, [
        b("button", {
          type: "button",
          class: Z(g("reset_button")),
          onClick: d
        }, [
          b("span", _a, B(ae(o).reset_filter), 1),
          v[4] || (v[4] = b("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            b("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ], 2)
      ])) : W("", !0)
    ]));
  }
}, el = { class: "space-y-2" }, tl = { class: "block text-sm font-medium text-gray-700 mb-2" }, rl = { value: "" }, nl = { value: "exact" }, ol = { value: "before" }, al = { value: "after" }, ll = { value: "between" }, il = {
  key: 0,
  class: "space-y-3"
}, sl = { key: 0 }, ul = { class: "block text-sm font-medium text-gray-700 mb-1" }, cl = {
  key: 1,
  class: "space-y-3"
}, dl = { class: "block text-sm font-medium text-gray-700 mb-1" }, fl = { class: "block text-sm font-medium text-gray-700 mb-1" }, vl = {
  key: 1,
  class: "flex justify-end"
}, hl = { class: "sr-only" }, jn = {
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
  setup(t) {
    const n = t, o = jt(), i = se(""), r = se(""), s = se(""), e = se(""), l = me(() => i.value !== "" && (i.value !== "between" && r.value || i.value === "between" && s.value && e.value));
    function a() {
      switch (i.value) {
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
    function u() {
      r.value = "", s.value = "", e.value = "", i.value === "" ? d() : c();
    }
    function c() {
      if (i.value === "")
        return;
      let p = null;
      switch (i.value) {
        case "exact":
        case "before":
        case "after":
          r.value && (p = {
            type: i.value,
            date: r.value
          });
          break;
        case "between":
          s.value && e.value && (p = {
            type: i.value,
            start_date: s.value,
            end_date: e.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, p);
    }
    function d() {
      i.value = "", r.value = "", s.value = "", e.value = "", n.onFilterChange(n.filter.key, null);
    }
    Tt(() => {
      if (n.filter.value) {
        const p = n.filter.value;
        p.type && (i.value = p.type, p.type === "between" ? (s.value = p.start_date || "", e.value = p.end_date || "") : r.value = p.date || "");
      }
    }), kt(() => n.filter.value, (p) => {
      p ? p.type && (i.value = p.type, p.type === "between" ? (s.value = p.start_date || "", e.value = p.end_date || "") : r.value = p.date || "") : d();
    }, { deep: !0 });
    const f = {
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
    }, h = ft("themeVariables"), g = (p) => {
      var v, m, y, x;
      return at(
        Pe([p, "base"], f, (m = (v = h == null ? void 0 : h.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : m.date_filter, n.ui),
        Pe([p, "color", n.color], f, (x = (y = h == null ? void 0 : h.inertia_table) == null ? void 0 : y.table_filter) == null ? void 0 : x.date_filter, n.ui)
      );
    };
    return (p, v) => (I(), $("div", el, [
      b("div", null, [
        b("label", tl, B(ae(o).filter_type), 1),
        He(b("select", {
          "onUpdate:modelValue": v[0] || (v[0] = (m) => i.value = m),
          class: Z(g("select")),
          onChange: u
        }, [
          b("option", rl, B(ae(o).no_filter), 1),
          b("option", nl, B(ae(o).exact_date), 1),
          b("option", ol, B(ae(o).before_date), 1),
          b("option", al, B(ae(o).after_date), 1),
          b("option", ll, B(ae(o).date_range), 1)
        ], 34), [
          [Tn, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (I(), $("div", il, [
        ["exact", "before", "after"].includes(i.value) ? (I(), $("div", sl, [
          b("label", ul, B(a()), 1),
          He(b("input", {
            type: "date",
            "onUpdate:modelValue": v[1] || (v[1] = (m) => r.value = m),
            class: Z(g("input")),
            onChange: c
          }, null, 34), [
            [Yt, r.value]
          ])
        ])) : W("", !0),
        i.value === "between" ? (I(), $("div", cl, [
          b("div", null, [
            b("label", dl, B(ae(o).start_date), 1),
            He(b("input", {
              type: "date",
              "onUpdate:modelValue": v[2] || (v[2] = (m) => s.value = m),
              class: Z(g("input")),
              onChange: c
            }, null, 34), [
              [Yt, s.value]
            ])
          ]),
          b("div", null, [
            b("label", fl, B(ae(o).end_date), 1),
            He(b("input", {
              type: "date",
              "onUpdate:modelValue": v[3] || (v[3] = (m) => e.value = m),
              class: Z(g("input")),
              onChange: c
            }, null, 34), [
              [Yt, e.value]
            ])
          ])
        ])) : W("", !0)
      ])) : W("", !0),
      l.value ? (I(), $("div", vl, [
        b("button", {
          type: "button",
          class: Z(g("reset_button")),
          onClick: d
        }, [
          b("span", hl, B(ae(o).reset_filter), 1),
          v[4] || (v[4] = b("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }, [
            b("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1))
        ], 2)
      ])) : W("", !0)
    ]));
  }
};
function Fn(t) {
  let n = se(null), o = se(null);
  return Tt(() => {
    to((i) => {
      if (!o.value || !n.value)
        return;
      let r = o.value.el || o.value, s = n.value.el || n.value;
      if (!(s instanceof HTMLElement) || !(r instanceof HTMLElement))
        return;
      let { destroy: e } = fo(s, r, t);
      i(e);
    });
  }), [n, o];
}
const pl = { class: "relative inline-block" }, gl = ["dusk"], ml = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, yl = { class: "p-2" }, bl = ["name", "value", "onChange"], xl = ["value"], Sl = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, wl = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, El = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Cl = {
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
  setup(t) {
    const n = t, o = se(!1);
    se(null);
    const [i, r] = Fn({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), s = me(() => n.filters.filter((v) => v.key === n.columnKey || v.key.startsWith(n.columnKey + "_") || v.key.includes(n.columnKey))), e = me(() => s.value.some((v) => !u(v)));
    function l() {
      s.value.length > 0 && (o.value = !o.value);
    }
    function a() {
      o.value = !1;
    }
    function u(v) {
      if (v.value === null)
        return !0;
      switch (v.type) {
        case "number_range":
          return Number(Math.max(...v.value)) === Number(v.max) && Number(Math.min(...v.value)) === Number(v.min);
        case "select":
          return v.value === "";
        case "toggle":
          return !1;
        case "date":
          return !v.value || typeof v.value == "object" && !v.value.type;
        default:
          return !v.value;
      }
    }
    function c(v, m) {
      n.onFilterChange(v, m);
    }
    function d(v) {
      let m = v.value;
      v.value && (Number(Math.max(...v.value)) === Number(v.max) && Number(Math.min(...v.value)) === Number(v.min) ? m = null : Number(Math.min(...v.value)) === 0 && Number(Math.max(...v.value)) === 0 && (m = ["0", "0"])), n.onFilterChange(v.key, m);
    }
    const f = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, h = ft("themeVariables"), g = (v) => {
      var m, y, x, E;
      return at(
        Pe([v, "base"], f, (y = (m = h == null ? void 0 : h.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : y.select_filter, n.ui),
        Pe([v, "color", n.color], f, (E = (x = h == null ? void 0 : h.inertia_table) == null ? void 0 : x.table_filter) == null ? void 0 : E.select_filter, n.ui)
      );
    };
    function p(v) {
      r.value && !r.value.contains(v.target) && !v.target.closest(`[dusk="column-filter-${n.columnKey}"]`) && a();
    }
    return Tt(() => {
      document.addEventListener("click", p);
    }), Nr(() => {
      document.removeEventListener("click", p);
    }), (v, m) => (I(), $("div", pl, [
      b("button", {
        ref_key: "trigger",
        ref: i,
        onClick: l,
        class: Z([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": e.value,
            "text-gray-400 hover:text-gray-600": !e.value
          }
        ]),
        dusk: `column-filter-${t.columnKey}`
      }, [...m[1] || (m[1] = [
        b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          b("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, gl),
      (I(), be(Pr, { to: "body" }, [
        o.value ? (I(), $("div", {
          key: 0,
          ref_key: "container",
          ref: r,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: m[0] || (m[0] = Ke(() => {
          }, ["stop"]))
        }, [
          (I(!0), $(ut, null, ct(s.value, (y) => (I(), $("div", {
            key: y.key
          }, [
            b("h3", ml, B(y.label), 1),
            b("div", yl, [
              y.type === "select" ? (I(), $("select", {
                key: 0,
                name: y.key,
                value: y.value,
                class: Z(g("select")),
                onChange: (x) => c(y.key, x.target.value)
              }, [
                (I(!0), $(ut, null, ct(y.options, (x, E) => (I(), $("option", {
                  key: E,
                  value: E
                }, B(x), 9, xl))), 128))
              ], 42, bl)) : W("", !0),
              y.type === "toggle" ? (I(), be(Rn, {
                key: 1,
                filter: y,
                "on-filter-change": c,
                color: t.color
              }, null, 8, ["filter", "color"])) : W("", !0),
              y.type === "number" ? (I(), $("div", Sl, [
                et(kn, {
                  filter: y,
                  "on-filter-change": c,
                  color: t.color
                }, null, 8, ["filter", "color"])
              ])) : W("", !0),
              y.type === "number_range" ? (I(), $("div", wl, [
                et(Nn, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [(x) => y.value = x, (x) => d(y)],
                  max: y.max,
                  min: y.min,
                  prefix: y.prefix,
                  suffix: y.suffix,
                  step: y.step,
                  color: t.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : W("", !0),
              y.type === "date" ? (I(), $("div", El, [
                et(jn, {
                  filter: y,
                  "on-filter-change": c,
                  color: t.color
                }, null, 8, ["filter", "color"])
              ])) : W("", !0)
            ])
          ]))), 128))
        ], 512)) : W("", !0)
      ])),
      (I(), be(Pr, { to: "body" }, [
        o.value ? (I(), $("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: a
        })) : W("", !0)
      ]))
    ]));
  }
}, Ol = { class: "relative inline-block" }, Tl = ["dusk"], Il = { class: "p-3" }, Pl = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, Al = { class: "space-y-2" }, Ml = ["value", "placeholder"], Dl = {
  key: 0,
  class: "flex justify-end"
}, $l = { class: "sr-only" }, Rl = {
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
  setup(t) {
    const n = t, o = jt(), i = se(!1), r = se(null), [s, e] = Fn({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), l = me(() => n.searchInputs.find((y) => y.key === n.columnKey)), a = me(() => l.value && l.value.value || ""), u = me(() => a.value !== "");
    async function c() {
      l.value && (i.value = !i.value, i.value && (await In(), r.value && r.value.focus()));
    }
    function d() {
      i.value = !1;
    }
    function f(y) {
      const x = y.target.value;
      h(x);
    }
    function h(y) {
      n.onSearchChange(n.columnKey, y);
    }
    const g = {
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
    }, p = ft("themeVariables"), v = (y) => {
      var x, E, P, T;
      return at(
        Pe([y, "base"], g, (E = (x = p == null ? void 0 : p.inertia_table) == null ? void 0 : x.table_search) == null ? void 0 : E.column_search, n.ui),
        Pe([y, "color", n.color], g, (T = (P = p == null ? void 0 : p.inertia_table) == null ? void 0 : P.table_search) == null ? void 0 : T.column_search, n.ui)
      );
    };
    function m(y) {
      e.value && !e.value.contains(y.target) && !y.target.closest(`[dusk="column-search-${n.columnKey}"]`) && d();
    }
    return Tt(() => {
      document.addEventListener("click", m);
    }), Nr(() => {
      document.removeEventListener("click", m);
    }), (y, x) => (I(), $("div", Ol, [
      b("button", {
        ref_key: "trigger",
        ref: s,
        onClick: c,
        class: Z([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": u.value,
            "text-gray-400 hover:text-gray-600": !u.value
          }
        ]),
        dusk: `column-search-${t.columnKey}`
      }, [...x[2] || (x[2] = [
        b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-4 w-4",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          b("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])], 10, Tl),
      (I(), be(Pr, { to: "body" }, [
        i.value ? (I(), $("div", {
          key: 0,
          ref_key: "container",
          ref: e,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: x[1] || (x[1] = Ke(() => {
          }, ["stop"]))
        }, [
          b("div", Il, [
            b("h3", Pl, B(ae(o).search) + " " + B(t.columnLabel), 1),
            b("div", Al, [
              b("input", {
                ref_key: "searchInput",
                ref: r,
                type: "text",
                value: a.value,
                class: Z(v("input")),
                placeholder: `${ae(o).search} ${t.columnLabel.toLowerCase()}...`,
                onInput: f,
                onKeydown: [
                  un(d, ["enter"]),
                  un(d, ["escape"])
                ]
              }, null, 42, Ml),
              a.value && a.value !== "" ? (I(), $("div", Dl, [
                b("button", {
                  type: "button",
                  class: Z(v("reset_button")),
                  onClick: x[0] || (x[0] = (E) => h(""))
                }, [
                  b("span", $l, B(ae(o).reset), 1),
                  x[3] || (x[3] = b("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    b("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1))
                ], 2)
              ])) : W("", !0)
            ])
          ])
        ], 512)) : W("", !0)
      ])),
      (I(), be(Pr, { to: "body" }, [
        i.value ? (I(), $("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: d
        })) : W("", !0)
      ]))
    ]));
  }
};
const Nl = ["data-column-key"], kl = { class: "flex flex-row items-center justify-between w-full" }, jl = { class: "flex flex-row items-center" }, Fl = { class: "uppercase" }, Ll = ["sorted"], zl = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Bl = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Ul = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Gl = { class: "flex items-center space-x-1" }, Vl = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    const n = t, o = ft("columnResize", null), i = me(() => {
      if (!o)
        return "auto";
      const a = o.getColumnWidth(n.cell.key);
      return a === "auto" ? a : `${a}px`;
    }), r = me(() => (o == null ? void 0 : o.isResizing) || !1), s = me(() => (o == null ? void 0 : o.resizingColumn) || null);
    function e() {
      n.cell.sortable && n.cell.onSort(n.cell.key);
    }
    function l(a, u) {
      o && o.startResize(a, u);
    }
    return (a, u) => He((I(), $("th", {
      class: Z(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", t.cell.header_class]),
      style: Ct({ width: i.value }),
      "data-column-key": t.cell.key
    }, [
      (I(), be(Kt(t.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: t.cell.sortable ? `sort-${t.cell.key}` : null,
        onClick: Ke(e, ["prevent"])
      }, {
        default: Le(() => [
          b("span", kl, [
            b("span", jl, [
              xe(a.$slots, "label", {}, () => [
                b("span", Fl, B(t.cell.label), 1)
              ], !0),
              xe(a.$slots, "sort", {}, () => [
                t.cell.sortable ? (I(), $("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: Z(["w-3 h-3 ml-2", {
                    "text-gray-400": !t.cell.sorted,
                    "text-green-500": t.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: t.cell.sorted
                }, [
                  t.cell.sorted ? W("", !0) : (I(), $("path", zl)),
                  t.cell.sorted === "asc" ? (I(), $("path", Bl)) : W("", !0),
                  t.cell.sorted === "desc" ? (I(), $("path", Ul)) : W("", !0)
                ], 10, Ll)) : W("", !0)
              ], !0)
            ]),
            b("span", Gl, [
              xe(a.$slots, "search", {}, () => [
                t.cell.searchable && t.cell.searchInputs && t.cell.searchInputs.length > 0 ? (I(), be(Rl, {
                  key: 0,
                  "column-key": t.cell.key,
                  "column-label": t.cell.label,
                  "search-inputs": t.cell.searchInputs,
                  "on-search-change": t.cell.onSearchChange,
                  color: t.cell.color,
                  onClick: u[0] || (u[0] = Ke(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : W("", !0)
              ], !0),
              xe(a.$slots, "filter", {}, () => [
                t.cell.filters && t.cell.filters.length > 0 ? (I(), be(Cl, {
                  key: 0,
                  "column-key": t.cell.key,
                  filters: t.cell.filters,
                  "on-filter-change": t.cell.onFilterChange,
                  color: t.cell.color,
                  onClick: u[1] || (u[1] = Ke(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : W("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      t.cell.resizable !== !1 && ae(o) ? (I(), be(oa, {
        key: 0,
        "column-key": t.cell.key,
        "on-resize": l,
        "is-active": r.value && s.value === t.cell.key
      }, null, 8, ["column-key", "is-active"])) : W("", !0)
    ], 14, Nl)), [
      [Rt, !t.cell.hidden]
    ]);
  }
}, Wl = /* @__PURE__ */ qt(Vl, [["__scopeId", "data-v-8684dc95"]]), Kl = ["dusk", "value"], Hl = ["value"], hn = {
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
  setup(t) {
    const n = jt(), o = t, i = me(() => {
      let l = [...o.options];
      return l.push(parseInt(o.value)), vo(l).sort((a, u) => a - u);
    }), r = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, s = ft("themeVariables"), e = (l) => {
      var a, u;
      return at(
        Pe([l, "base"], r, (a = s == null ? void 0 : s.inertia_table) == null ? void 0 : a.per_page_selector, o.ui),
        Pe([l, "color", o.color], r, (u = s == null ? void 0 : s.inertia_table) == null ? void 0 : u.per_page_selector, o.ui)
      );
    };
    return (l, a) => (I(), $("select", {
      name: "per_page",
      dusk: t.dusk,
      value: t.value,
      class: Z(e("select")),
      onChange: a[0] || (a[0] = (u) => t.onChange(u.target.value))
    }, [
      (I(!0), $(ut, null, ct(i.value, (u) => (I(), $("option", {
        key: u,
        value: u
      }, B(u) + " " + B(ae(n).per_page), 9, Hl))), 128))
    ], 42, Kl));
  }
}, Xl = {
  key: 0,
  class: "bg-white flex items-center"
}, Yl = { key: 0 }, Ql = { class: "hidden sm:inline ml-2" }, Jl = { class: "hidden sm:inline mr-2" }, Zl = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, ql = { class: "flex flex-row space-x-4 items-center grow" }, _l = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, ei = { class: "font-medium" }, ti = { class: "font-medium" }, ri = { class: "font-medium" }, ni = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, oi = { class: "sr-only" }, ai = { class: "sr-only" }, li = {
  key: 0,
  class: "ml-4"
}, ii = ["href"], si = {
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
  setup(t) {
    const n = jt(), o = t, i = me(() => "links" in s.value ? s.value.links.length > 0 : !1), r = me(() => Object.keys(s.value).length > 0), s = me(() => o.meta), e = me(() => "prev_page_url" in s.value ? s.value.prev_page_url : null), l = me(() => "next_page_url" in s.value ? s.value.next_page_url : null), a = me(() => parseInt(s.value.per_page));
    return (u, c) => r.value ? (I(), $("nav", Xl, [
      !t.hasData || s.value.total < 1 ? (I(), $("p", Yl, B(ae(n).no_results_found), 1)) : W("", !0),
      t.hasData ? (I(), $("div", {
        key: 1,
        class: Z(["flex-1 flex justify-between", { "sm:hidden": i.value }])
      }, [
        (I(), be(Kt(e.value ? "a" : "div"), {
          class: Z([{
            "cursor-not-allowed text-gray-400": !e.value,
            "text-gray-700 hover:text-gray-500": e.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: e.value,
          dusk: e.value ? "pagination-simple-previous" : null,
          onClick: c[0] || (c[0] = Ke((d) => t.onClick(e.value), ["prevent"]))
        }, {
          default: Le(() => [
            c[4] || (c[4] = b("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              b("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M7 16l-4-4m0 0l4-4m-4 4h18"
              })
            ], -1)),
            b("span", Ql, B(ae(n).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        et(hn, {
          dusk: "per-page-mobile",
          value: a.value,
          options: t.perPageOptions,
          "on-change": t.onPerPageChange,
          color: t.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (I(), be(Kt(l.value ? "a" : "div"), {
          class: Z([{
            "cursor-not-allowed text-gray-400": !l.value,
            "text-gray-700 hover:text-gray-500": l.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: l.value,
          dusk: l.value ? "pagination-simple-next" : null,
          onClick: c[1] || (c[1] = Ke((d) => t.onClick(l.value), ["prevent"]))
        }, {
          default: Le(() => [
            b("span", Jl, B(ae(n).next), 1),
            c[5] || (c[5] = b("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5 text-gray-400",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              b("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M17 8l4 4m0 0l-4 4m4-4H3"
              })
            ], -1))
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"]))
      ], 2)) : W("", !0),
      t.hasData && i.value ? (I(), $("div", Zl, [
        b("div", ql, [
          et(hn, {
            dusk: "per-page-full",
            value: a.value,
            options: t.perPageOptions,
            "on-change": t.onPerPageChange,
            color: t.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          b("p", _l, [
            b("span", ei, B(s.value.from), 1),
            yt(" " + B(ae(n).to) + " ", 1),
            b("span", ti, B(s.value.to), 1),
            yt(" " + B(ae(n).of) + " ", 1),
            b("span", ri, B(s.value.total), 1),
            yt(" " + B(ae(n).results), 1)
          ])
        ]),
        b("div", null, [
          b("nav", ni, [
            (I(), be(Kt(e.value ? "a" : "div"), {
              class: Z([{
                "cursor-not-allowed text-gray-400": !e.value,
                "text-gray-500 hover:bg-gray-50": e.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: e.value,
              dusk: e.value ? "pagination-previous" : null,
              onClick: c[2] || (c[2] = Ke((d) => t.onClick(e.value), ["prevent"]))
            }, {
              default: Le(() => [
                b("span", oi, B(ae(n).previous), 1),
                c[6] || (c[6] = b("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  b("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ]),
              _: 1
            }, 8, ["class", "href", "dusk"])),
            (I(!0), $(ut, null, ct(s.value.links, (d, f) => (I(), $("div", { key: f }, [
              xe(u.$slots, "link", {}, () => [
                !isNaN(d.label) || d.label === "..." ? (I(), be(Kt(d.url ? "a" : "div"), {
                  key: 0,
                  href: d.url,
                  dusk: d.url ? `pagination-${d.label}` : null,
                  class: Z(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !d.url,
                    "hover:bg-gray-50": d.url,
                    "bg-white": !d.active,
                    "bg-gray-100": d.active
                  }]),
                  onClick: Ke((h) => t.onClick(d.url), ["prevent"])
                }, {
                  default: Le(() => [
                    yt(B(d.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : W("", !0)
              ])
            ]))), 128)),
            (I(), be(Kt(l.value ? "a" : "div"), {
              class: Z([{
                "cursor-not-allowed text-gray-400": !l.value,
                "text-gray-500 hover:bg-gray-50": l.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: l.value,
              dusk: l.value ? "pagination-next" : null,
              onClick: c[3] || (c[3] = Ke((d) => t.onClick(l.value), ["prevent"]))
            }, {
              default: Le(() => [
                b("span", ai, B(ae(n).next), 1),
                c[7] || (c[7] = b("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  b("path", {
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
        t.showExportButton ? (I(), $("div", li, [
          xe(u.$slots, "exportButton", {
            exportUrl: t.exportUrl,
            translations: ae(n)
          }, () => [
            b("a", {
              href: t.exportUrl,
              class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, [
              c[8] || (c[8] = b("svg", {
                class: "h-4 w-4 mr-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                b("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                })
              ], -1)),
              yt(" " + B(ae(n).export_csv), 1)
            ], 8, ii)
          ])
        ])) : W("", !0)
      ])) : W("", !0)
    ])) : W("", !0);
  }
}, ui = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, ci = ["dusk", "onClick"], di = {
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
  setup(t) {
    const n = t, o = se(null);
    function i(r) {
      n.onAdd(r), o.value.hide();
    }
    return (r, s) => (I(), be(kr, {
      ref_key: "dropdown",
      ref: o,
      dusk: "add-search-row-dropdown",
      disabled: !t.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: t.color
    }, {
      button: Le(() => [...s[0] || (s[0] = [
        b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          b("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])]),
      default: Le(() => [
        b("div", ui, [
          (I(!0), $(ut, null, ct(t.searchInputs, (e, l) => (I(), $("button", {
            key: l,
            dusk: `add-search-row-${e.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: Ke((a) => i(e.key), ["prevent"])
          }, B(e.label), 9, ci))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
};
var fi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function hi(t) {
  var n = t.default;
  if (typeof n == "function") {
    var o = function() {
      return n.apply(this, arguments);
    };
    o.prototype = n.prototype;
  } else
    o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(t).forEach(function(i) {
    var r = Object.getOwnPropertyDescriptor(t, i);
    Object.defineProperty(o, i, r.get ? r : {
      enumerable: !0,
      get: function() {
        return t[i];
      }
    });
  }), o;
}
var Ln = { exports: {} };
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function pn(t, n) {
  var o = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    n && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), o.push.apply(o, i);
  }
  return o;
}
function xt(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = arguments[n] != null ? arguments[n] : {};
    n % 2 ? pn(Object(o), !0).forEach(function(i) {
      pi(t, i, o[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : pn(Object(o)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(o, i));
    });
  }
  return t;
}
function Er(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Er = function(n) {
    return typeof n;
  } : Er = function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, Er(t);
}
function pi(t, n, o) {
  return n in t ? Object.defineProperty(t, n, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[n] = o, t;
}
function dt() {
  return dt = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
      var o = arguments[n];
      for (var i in o)
        Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
    }
    return t;
  }, dt.apply(this, arguments);
}
function gi(t, n) {
  if (t == null)
    return {};
  var o = {}, i = Object.keys(t), r, s;
  for (s = 0; s < i.length; s++)
    r = i[s], !(n.indexOf(r) >= 0) && (o[r] = t[r]);
  return o;
}
function mi(t, n) {
  if (t == null)
    return {};
  var o = gi(t, n), i, r;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    for (r = 0; r < s.length; r++)
      i = s[r], !(n.indexOf(i) >= 0) && (!Object.prototype.propertyIsEnumerable.call(t, i) || (o[i] = t[i]));
  }
  return o;
}
function yi(t) {
  return bi(t) || xi(t) || Si(t) || wi();
}
function bi(t) {
  if (Array.isArray(t))
    return Zr(t);
}
function xi(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function Si(t, n) {
  if (!!t) {
    if (typeof t == "string")
      return Zr(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if (o === "Object" && t.constructor && (o = t.constructor.name), o === "Map" || o === "Set")
      return Array.from(t);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return Zr(t, n);
  }
}
function Zr(t, n) {
  (n == null || n > t.length) && (n = t.length);
  for (var o = 0, i = new Array(n); o < n; o++)
    i[o] = t[o];
  return i;
}
function wi() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Ei = "1.14.0";
function Ot(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var It = Ot(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), hr = Ot(/Edge/i), gn = Ot(/firefox/i), ur = Ot(/safari/i) && !Ot(/chrome/i) && !Ot(/android/i), zn = Ot(/iP(ad|od|hone)/i), Ci = Ot(/chrome/i) && Ot(/android/i), Bn = {
  capture: !1,
  passive: !1
};
function fe(t, n, o) {
  t.addEventListener(n, o, !It && Bn);
}
function ce(t, n, o) {
  t.removeEventListener(n, o, !It && Bn);
}
function Ar(t, n) {
  if (!!n) {
    if (n[0] === ">" && (n = n.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(n);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(n);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(n);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Oi(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function mt(t, n, o, i) {
  if (t) {
    o = o || document;
    do {
      if (n != null && (n[0] === ">" ? t.parentNode === o && Ar(t, n) : Ar(t, n)) || i && t === o)
        return t;
      if (t === o)
        break;
    } while (t = Oi(t));
  }
  return null;
}
var mn = /\s+/g;
function Me(t, n, o) {
  if (t && n)
    if (t.classList)
      t.classList[o ? "add" : "remove"](n);
    else {
      var i = (" " + t.className + " ").replace(mn, " ").replace(" " + n + " ", " ");
      t.className = (i + (o ? " " + n : "")).replace(mn, " ");
    }
}
function X(t, n, o) {
  var i = t && t.style;
  if (i) {
    if (o === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? o = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (o = t.currentStyle), n === void 0 ? o : o[n];
    !(n in i) && n.indexOf("webkit") === -1 && (n = "-webkit-" + n), i[n] = o + (typeof o == "string" ? "" : "px");
  }
}
function Bt(t, n) {
  var o = "";
  if (typeof t == "string")
    o = t;
  else
    do {
      var i = X(t, "transform");
      i && i !== "none" && (o = i + " " + o);
    } while (!n && (t = t.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(o);
}
function Un(t, n, o) {
  if (t) {
    var i = t.getElementsByTagName(n), r = 0, s = i.length;
    if (o)
      for (; r < s; r++)
        o(i[r], r);
    return i;
  }
  return [];
}
function bt() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function Ie(t, n, o, i, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var s, e, l, a, u, c, d;
    if (t !== window && t.parentNode && t !== bt() ? (s = t.getBoundingClientRect(), e = s.top, l = s.left, a = s.bottom, u = s.right, c = s.height, d = s.width) : (e = 0, l = 0, a = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (n || o) && t !== window && (r = r || t.parentNode, !It))
      do
        if (r && r.getBoundingClientRect && (X(r, "transform") !== "none" || o && X(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          e -= f.top + parseInt(X(r, "border-top-width")), l -= f.left + parseInt(X(r, "border-left-width")), a = e + s.height, u = l + s.width;
          break;
        }
      while (r = r.parentNode);
    if (i && t !== window) {
      var h = Bt(r || t), g = h && h.a, p = h && h.d;
      h && (e /= p, l /= g, d /= g, c /= p, a = e + c, u = l + d);
    }
    return {
      top: e,
      left: l,
      bottom: a,
      right: u,
      width: d,
      height: c
    };
  }
}
function yn(t, n, o) {
  for (var i = Nt(t, !0), r = Ie(t)[n]; i; ) {
    var s = Ie(i)[o], e = void 0;
    if (o === "top" || o === "left" ? e = r >= s : e = r <= s, !e)
      return i;
    if (i === bt())
      break;
    i = Nt(i, !1);
  }
  return !1;
}
function Jt(t, n, o, i) {
  for (var r = 0, s = 0, e = t.children; s < e.length; ) {
    if (e[s].style.display !== "none" && e[s] !== ee.ghost && (i || e[s] !== ee.dragged) && mt(e[s], o.draggable, t, !1)) {
      if (r === n)
        return e[s];
      r++;
    }
    s++;
  }
  return null;
}
function on(t, n) {
  for (var o = t.lastElementChild; o && (o === ee.ghost || X(o, "display") === "none" || n && !Ar(o, n)); )
    o = o.previousElementSibling;
  return o || null;
}
function je(t, n) {
  var o = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== ee.clone && (!n || Ar(t, n)) && o++;
  return o;
}
function bn(t) {
  var n = 0, o = 0, i = bt();
  if (t)
    do {
      var r = Bt(t), s = r.a, e = r.d;
      n += t.scrollLeft * s, o += t.scrollTop * e;
    } while (t !== i && (t = t.parentNode));
  return [n, o];
}
function Ti(t, n) {
  for (var o in t)
    if (!!t.hasOwnProperty(o)) {
      for (var i in n)
        if (n.hasOwnProperty(i) && n[i] === t[o][i])
          return Number(o);
    }
  return -1;
}
function Nt(t, n) {
  if (!t || !t.getBoundingClientRect)
    return bt();
  var o = t, i = !1;
  do
    if (o.clientWidth < o.scrollWidth || o.clientHeight < o.scrollHeight) {
      var r = X(o);
      if (o.clientWidth < o.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || o.clientHeight < o.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!o.getBoundingClientRect || o === document.body)
          return bt();
        if (i || n)
          return o;
        i = !0;
      }
    }
  while (o = o.parentNode);
  return bt();
}
function Ii(t, n) {
  if (t && n)
    for (var o in n)
      n.hasOwnProperty(o) && (t[o] = n[o]);
  return t;
}
function Br(t, n) {
  return Math.round(t.top) === Math.round(n.top) && Math.round(t.left) === Math.round(n.left) && Math.round(t.height) === Math.round(n.height) && Math.round(t.width) === Math.round(n.width);
}
var cr;
function Gn(t, n) {
  return function() {
    if (!cr) {
      var o = arguments, i = this;
      o.length === 1 ? t.call(i, o[0]) : t.apply(i, o), cr = setTimeout(function() {
        cr = void 0;
      }, n);
    }
  };
}
function Pi() {
  clearTimeout(cr), cr = void 0;
}
function Vn(t, n, o) {
  t.scrollLeft += n, t.scrollTop += o;
}
function an(t) {
  var n = window.Polymer, o = window.jQuery || window.Zepto;
  return n && n.dom ? n.dom(t).cloneNode(!0) : o ? o(t).clone(!0)[0] : t.cloneNode(!0);
}
function xn(t, n) {
  X(t, "position", "absolute"), X(t, "top", n.top), X(t, "left", n.left), X(t, "width", n.width), X(t, "height", n.height);
}
function Ur(t) {
  X(t, "position", ""), X(t, "top", ""), X(t, "left", ""), X(t, "width", ""), X(t, "height", "");
}
var Qe = "Sortable" + new Date().getTime();
function Ai() {
  var t = [], n;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(r) {
          if (!(X(r, "display") === "none" || r === ee.ghost)) {
            t.push({
              target: r,
              rect: Ie(r)
            });
            var s = xt({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var e = Bt(r, !0);
              e && (s.top -= e.f, s.left -= e.e);
            }
            r.fromRect = s;
          }
        });
      }
    },
    addAnimationState: function(i) {
      t.push(i);
    },
    removeAnimationState: function(i) {
      t.splice(Ti(t, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(n), typeof i == "function" && i();
        return;
      }
      var s = !1, e = 0;
      t.forEach(function(l) {
        var a = 0, u = l.target, c = u.fromRect, d = Ie(u), f = u.prevFromRect, h = u.prevToRect, g = l.rect, p = Bt(u, !0);
        p && (d.top -= p.f, d.left -= p.e), u.toRect = d, u.thisAnimationDuration && Br(f, d) && !Br(c, d) && (g.top - d.top) / (g.left - d.left) === (c.top - d.top) / (c.left - d.left) && (a = Di(g, f, h, r.options)), Br(d, c) || (u.prevFromRect = c, u.prevToRect = d, a || (a = r.options.animation), r.animate(u, g, d, a)), a && (s = !0, e = Math.max(e, a), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, a), u.thisAnimationDuration = a);
      }), clearTimeout(n), s ? n = setTimeout(function() {
        typeof i == "function" && i();
      }, e) : typeof i == "function" && i(), t = [];
    },
    animate: function(i, r, s, e) {
      if (e) {
        X(i, "transition", ""), X(i, "transform", "");
        var l = Bt(this.el), a = l && l.a, u = l && l.d, c = (r.left - s.left) / (a || 1), d = (r.top - s.top) / (u || 1);
        i.animatingX = !!c, i.animatingY = !!d, X(i, "transform", "translate3d(" + c + "px," + d + "px,0)"), this.forRepaintDummy = Mi(i), X(i, "transition", "transform " + e + "ms" + (this.options.easing ? " " + this.options.easing : "")), X(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          X(i, "transition", ""), X(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, e);
      }
    }
  };
}
function Mi(t) {
  return t.offsetWidth;
}
function Di(t, n, o, i) {
  return Math.sqrt(Math.pow(n.top - t.top, 2) + Math.pow(n.left - t.left, 2)) / Math.sqrt(Math.pow(n.top - o.top, 2) + Math.pow(n.left - o.left, 2)) * i.animation;
}
var Gt = [], Gr = {
  initializeByDefault: !0
}, pr = {
  mount: function(n) {
    for (var o in Gr)
      Gr.hasOwnProperty(o) && !(o in n) && (n[o] = Gr[o]);
    Gt.forEach(function(i) {
      if (i.pluginName === n.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(n.pluginName, " more than once");
    }), Gt.push(n);
  },
  pluginEvent: function(n, o, i) {
    var r = this;
    this.eventCanceled = !1, i.cancel = function() {
      r.eventCanceled = !0;
    };
    var s = n + "Global";
    Gt.forEach(function(e) {
      !o[e.pluginName] || (o[e.pluginName][s] && o[e.pluginName][s](xt({
        sortable: o
      }, i)), o.options[e.pluginName] && o[e.pluginName][n] && o[e.pluginName][n](xt({
        sortable: o
      }, i)));
    });
  },
  initializePlugins: function(n, o, i, r) {
    Gt.forEach(function(l) {
      var a = l.pluginName;
      if (!(!n.options[a] && !l.initializeByDefault)) {
        var u = new l(n, o, n.options);
        u.sortable = n, u.options = n.options, n[a] = u, dt(i, u.defaults);
      }
    });
    for (var s in n.options)
      if (!!n.options.hasOwnProperty(s)) {
        var e = this.modifyOption(n, s, n.options[s]);
        typeof e < "u" && (n.options[s] = e);
      }
  },
  getEventProperties: function(n, o) {
    var i = {};
    return Gt.forEach(function(r) {
      typeof r.eventProperties == "function" && dt(i, r.eventProperties.call(o[r.pluginName], n));
    }), i;
  },
  modifyOption: function(n, o, i) {
    var r;
    return Gt.forEach(function(s) {
      !n[s.pluginName] || s.optionListeners && typeof s.optionListeners[o] == "function" && (r = s.optionListeners[o].call(n[s.pluginName], i));
    }), r;
  }
};
function ar(t) {
  var n = t.sortable, o = t.rootEl, i = t.name, r = t.targetEl, s = t.cloneEl, e = t.toEl, l = t.fromEl, a = t.oldIndex, u = t.newIndex, c = t.oldDraggableIndex, d = t.newDraggableIndex, f = t.originalEvent, h = t.putSortable, g = t.extraEventProperties;
  if (n = n || o && o[Qe], !!n) {
    var p, v = n.options, m = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !It && !hr ? p = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (p = document.createEvent("Event"), p.initEvent(i, !0, !0)), p.to = e || o, p.from = l || o, p.item = r || o, p.clone = s, p.oldIndex = a, p.newIndex = u, p.oldDraggableIndex = c, p.newDraggableIndex = d, p.originalEvent = f, p.pullMode = h ? h.lastPutMode : void 0;
    var y = xt(xt({}, g), pr.getEventProperties(i, n));
    for (var x in y)
      p[x] = y[x];
    o && o.dispatchEvent(p), v[m] && v[m].call(n, p);
  }
}
var $i = ["evt"], qe = function(n, o) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = i.evt, s = mi(i, $i);
  pr.pluginEvent.bind(ee)(n, o, xt({
    dragEl: j,
    parentEl: Ne,
    ghostEl: oe,
    rootEl: Te,
    nextEl: zt,
    lastDownEl: Cr,
    cloneEl: ke,
    cloneHidden: $t,
    dragStarted: lr,
    putSortable: Xe,
    activeSortable: ee.active,
    originalEvent: r,
    oldIndex: Xt,
    oldDraggableIndex: dr,
    newIndex: ot,
    newDraggableIndex: Dt,
    hideGhostForTarget: Xn,
    unhideGhostForTarget: Yn,
    cloneNowHidden: function() {
      $t = !0;
    },
    cloneNowShown: function() {
      $t = !1;
    },
    dispatchSortableEvent: function(l) {
      Je({
        sortable: o,
        name: l,
        originalEvent: r
      });
    }
  }, s));
};
function Je(t) {
  ar(xt({
    putSortable: Xe,
    cloneEl: ke,
    targetEl: j,
    rootEl: Te,
    oldIndex: Xt,
    oldDraggableIndex: dr,
    newIndex: ot,
    newDraggableIndex: Dt
  }, t));
}
var j, Ne, oe, Te, zt, Cr, ke, $t, Xt, ot, dr, Dt, mr, Xe, Ht = !1, Mr = !1, Dr = [], Ft, pt, Vr, Wr, Sn, wn, lr, Vt, fr, vr = !1, yr = !1, Or, Ye, Kr = [], qr = !1, $r = [], jr = typeof document < "u", br = zn, En = hr || It ? "cssFloat" : "float", Ri = jr && !Ci && !zn && "draggable" in document.createElement("div"), Wn = function() {
  if (!!jr) {
    if (It)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
}(), Kn = function(n, o) {
  var i = X(n), r = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), s = Jt(n, 0, o), e = Jt(n, 1, o), l = s && X(s), a = e && X(e), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Ie(s).width, c = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + Ie(e).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (s && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return e && (a.clear === "both" || a.clear === d) ? "vertical" : "horizontal";
  }
  return s && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= r && i[En] === "none" || e && i[En] === "none" && u + c > r) ? "vertical" : "horizontal";
}, Ni = function(n, o, i) {
  var r = i ? n.left : n.top, s = i ? n.right : n.bottom, e = i ? n.width : n.height, l = i ? o.left : o.top, a = i ? o.right : o.bottom, u = i ? o.width : o.height;
  return r === l || s === a || r + e / 2 === l + u / 2;
}, ki = function(n, o) {
  var i;
  return Dr.some(function(r) {
    var s = r[Qe].options.emptyInsertThreshold;
    if (!(!s || on(r))) {
      var e = Ie(r), l = n >= e.left - s && n <= e.right + s, a = o >= e.top - s && o <= e.bottom + s;
      if (l && a)
        return i = r;
    }
  }), i;
}, Hn = function(n) {
  function o(s, e) {
    return function(l, a, u, c) {
      var d = l.options.group.name && a.options.group.name && l.options.group.name === a.options.group.name;
      if (s == null && (e || d))
        return !0;
      if (s == null || s === !1)
        return !1;
      if (e && s === "clone")
        return s;
      if (typeof s == "function")
        return o(s(l, a, u, c), e)(l, a, u, c);
      var f = (e ? l : a).options.group.name;
      return s === !0 || typeof s == "string" && s === f || s.join && s.indexOf(f) > -1;
    };
  }
  var i = {}, r = n.group;
  (!r || Er(r) != "object") && (r = {
    name: r
  }), i.name = r.name, i.checkPull = o(r.pull, !0), i.checkPut = o(r.put), i.revertClone = r.revertClone, n.group = i;
}, Xn = function() {
  !Wn && oe && X(oe, "display", "none");
}, Yn = function() {
  !Wn && oe && X(oe, "display", "");
};
jr && document.addEventListener("click", function(t) {
  if (Mr)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), Mr = !1, !1;
}, !0);
var Lt = function(n) {
  if (j) {
    n = n.touches ? n.touches[0] : n;
    var o = ki(n.clientX, n.clientY);
    if (o) {
      var i = {};
      for (var r in n)
        n.hasOwnProperty(r) && (i[r] = n[r]);
      i.target = i.rootEl = o, i.preventDefault = void 0, i.stopPropagation = void 0, o[Qe]._onDragOver(i);
    }
  }
}, ji = function(n) {
  j && j.parentNode[Qe]._isOutsideThisEl(n.target);
};
function ee(t, n) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = n = dt({}, n), t[Qe] = this;
  var o = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    invertSwap: !1,
    invertedSwapThreshold: null,
    removeCloneOnHide: !0,
    direction: function() {
      return Kn(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(e, l) {
      e.setData("Text", l.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: ee.supportPointer !== !1 && "PointerEvent" in window && !ur,
    emptyInsertThreshold: 5
  };
  pr.initializePlugins(this, t, o);
  for (var i in o)
    !(i in n) && (n[i] = o[i]);
  Hn(n);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = n.forceFallback ? !1 : Ri, this.nativeDraggable && (this.options.touchStartThreshold = 1), n.supportPointer ? fe(t, "pointerdown", this._onTapStart) : (fe(t, "mousedown", this._onTapStart), fe(t, "touchstart", this._onTapStart)), this.nativeDraggable && (fe(t, "dragover", this), fe(t, "dragenter", this)), Dr.push(this.el), n.store && n.store.get && this.sort(n.store.get(this) || []), dt(this, Ai());
}
ee.prototype = {
  constructor: ee,
  _isOutsideThisEl: function(n) {
    !this.el.contains(n) && n !== this.el && (Vt = null);
  },
  _getDirection: function(n, o) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, n, o, j) : this.options.direction;
  },
  _onTapStart: function(n) {
    if (!!n.cancelable) {
      var o = this, i = this.el, r = this.options, s = r.preventOnFilter, e = n.type, l = n.touches && n.touches[0] || n.pointerType && n.pointerType === "touch" && n, a = (l || n).target, u = n.target.shadowRoot && (n.path && n.path[0] || n.composedPath && n.composedPath()[0]) || a, c = r.filter;
      if (Wi(i), !j && !(/mousedown|pointerdown/.test(e) && n.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && ur && a && a.tagName.toUpperCase() === "SELECT") && (a = mt(a, r.draggable, i, !1), !(a && a.animated) && Cr !== a)) {
        if (Xt = je(a), dr = je(a, r.draggable), typeof c == "function") {
          if (c.call(this, n, a, this)) {
            Je({
              sortable: o,
              rootEl: u,
              name: "filter",
              targetEl: a,
              toEl: i,
              fromEl: i
            }), qe("filter", o, {
              evt: n
            }), s && n.cancelable && n.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(d) {
          if (d = mt(u, d.trim(), i, !1), d)
            return Je({
              sortable: o,
              rootEl: d,
              name: "filter",
              targetEl: a,
              fromEl: i,
              toEl: i
            }), qe("filter", o, {
              evt: n
            }), !0;
        }), c)) {
          s && n.cancelable && n.preventDefault();
          return;
        }
        r.handle && !mt(u, r.handle, i, !1) || this._prepareDragStart(n, l, a);
      }
    }
  },
  _prepareDragStart: function(n, o, i) {
    var r = this, s = r.el, e = r.options, l = s.ownerDocument, a;
    if (i && !j && i.parentNode === s) {
      var u = Ie(i);
      if (Te = s, j = i, Ne = j.parentNode, zt = j.nextSibling, Cr = i, mr = e.group, ee.dragged = j, Ft = {
        target: j,
        clientX: (o || n).clientX,
        clientY: (o || n).clientY
      }, Sn = Ft.clientX - u.left, wn = Ft.clientY - u.top, this._lastX = (o || n).clientX, this._lastY = (o || n).clientY, j.style["will-change"] = "all", a = function() {
        if (qe("delayEnded", r, {
          evt: n
        }), ee.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !gn && r.nativeDraggable && (j.draggable = !0), r._triggerDragStart(n, o), Je({
          sortable: r,
          name: "choose",
          originalEvent: n
        }), Me(j, e.chosenClass, !0);
      }, e.ignore.split(",").forEach(function(c) {
        Un(j, c.trim(), Hr);
      }), fe(l, "dragover", Lt), fe(l, "mousemove", Lt), fe(l, "touchmove", Lt), fe(l, "mouseup", r._onDrop), fe(l, "touchend", r._onDrop), fe(l, "touchcancel", r._onDrop), gn && this.nativeDraggable && (this.options.touchStartThreshold = 4, j.draggable = !0), qe("delayStart", this, {
        evt: n
      }), e.delay && (!e.delayOnTouchOnly || o) && (!this.nativeDraggable || !(hr || It))) {
        if (ee.eventCanceled) {
          this._onDrop();
          return;
        }
        fe(l, "mouseup", r._disableDelayedDrag), fe(l, "touchend", r._disableDelayedDrag), fe(l, "touchcancel", r._disableDelayedDrag), fe(l, "mousemove", r._delayedDragTouchMoveHandler), fe(l, "touchmove", r._delayedDragTouchMoveHandler), e.supportPointer && fe(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(a, e.delay);
      } else
        a();
    }
  },
  _delayedDragTouchMoveHandler: function(n) {
    var o = n.touches ? n.touches[0] : n;
    Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    j && Hr(j), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var n = this.el.ownerDocument;
    ce(n, "mouseup", this._disableDelayedDrag), ce(n, "touchend", this._disableDelayedDrag), ce(n, "touchcancel", this._disableDelayedDrag), ce(n, "mousemove", this._delayedDragTouchMoveHandler), ce(n, "touchmove", this._delayedDragTouchMoveHandler), ce(n, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(n, o) {
    o = o || n.pointerType == "touch" && n, !this.nativeDraggable || o ? this.options.supportPointer ? fe(document, "pointermove", this._onTouchMove) : o ? fe(document, "touchmove", this._onTouchMove) : fe(document, "mousemove", this._onTouchMove) : (fe(j, "dragend", this), fe(Te, "dragstart", this._onDragStart));
    try {
      document.selection ? Tr(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(n, o) {
    if (Ht = !1, Te && j) {
      qe("dragStarted", this, {
        evt: o
      }), this.nativeDraggable && fe(document, "dragover", ji);
      var i = this.options;
      !n && Me(j, i.dragClass, !1), Me(j, i.ghostClass, !0), ee.active = this, n && this._appendGhost(), Je({
        sortable: this,
        name: "start",
        originalEvent: o
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (pt) {
      this._lastX = pt.clientX, this._lastY = pt.clientY, Xn();
      for (var n = document.elementFromPoint(pt.clientX, pt.clientY), o = n; n && n.shadowRoot && (n = n.shadowRoot.elementFromPoint(pt.clientX, pt.clientY), n !== o); )
        o = n;
      if (j.parentNode[Qe]._isOutsideThisEl(n), o)
        do {
          if (o[Qe]) {
            var i = void 0;
            if (i = o[Qe]._onDragOver({
              clientX: pt.clientX,
              clientY: pt.clientY,
              target: n,
              rootEl: o
            }), i && !this.options.dragoverBubble)
              break;
          }
          n = o;
        } while (o = o.parentNode);
      Yn();
    }
  },
  _onTouchMove: function(n) {
    if (Ft) {
      var o = this.options, i = o.fallbackTolerance, r = o.fallbackOffset, s = n.touches ? n.touches[0] : n, e = oe && Bt(oe, !0), l = oe && e && e.a, a = oe && e && e.d, u = br && Ye && bn(Ye), c = (s.clientX - Ft.clientX + r.x) / (l || 1) + (u ? u[0] - Kr[0] : 0) / (l || 1), d = (s.clientY - Ft.clientY + r.y) / (a || 1) + (u ? u[1] - Kr[1] : 0) / (a || 1);
      if (!ee.active && !Ht) {
        if (i && Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) < i)
          return;
        this._onDragStart(n, !0);
      }
      if (oe) {
        e ? (e.e += c - (Vr || 0), e.f += d - (Wr || 0)) : e = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f: d
        };
        var f = "matrix(".concat(e.a, ",").concat(e.b, ",").concat(e.c, ",").concat(e.d, ",").concat(e.e, ",").concat(e.f, ")");
        X(oe, "webkitTransform", f), X(oe, "mozTransform", f), X(oe, "msTransform", f), X(oe, "transform", f), Vr = c, Wr = d, pt = s;
      }
      n.cancelable && n.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!oe) {
      var n = this.options.fallbackOnBody ? document.body : Te, o = Ie(j, !0, br, !0, n), i = this.options;
      if (br) {
        for (Ye = n; X(Ye, "position") === "static" && X(Ye, "transform") === "none" && Ye !== document; )
          Ye = Ye.parentNode;
        Ye !== document.body && Ye !== document.documentElement ? (Ye === document && (Ye = bt()), o.top += Ye.scrollTop, o.left += Ye.scrollLeft) : Ye = bt(), Kr = bn(Ye);
      }
      oe = j.cloneNode(!0), Me(oe, i.ghostClass, !1), Me(oe, i.fallbackClass, !0), Me(oe, i.dragClass, !0), X(oe, "transition", ""), X(oe, "transform", ""), X(oe, "box-sizing", "border-box"), X(oe, "margin", 0), X(oe, "top", o.top), X(oe, "left", o.left), X(oe, "width", o.width), X(oe, "height", o.height), X(oe, "opacity", "0.8"), X(oe, "position", br ? "absolute" : "fixed"), X(oe, "zIndex", "100000"), X(oe, "pointerEvents", "none"), ee.ghost = oe, n.appendChild(oe), X(oe, "transform-origin", Sn / parseInt(oe.style.width) * 100 + "% " + wn / parseInt(oe.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(n, o) {
    var i = this, r = n.dataTransfer, s = i.options;
    if (qe("dragStart", this, {
      evt: n
    }), ee.eventCanceled) {
      this._onDrop();
      return;
    }
    qe("setupClone", this), ee.eventCanceled || (ke = an(j), ke.draggable = !1, ke.style["will-change"] = "", this._hideClone(), Me(ke, this.options.chosenClass, !1), ee.clone = ke), i.cloneId = Tr(function() {
      qe("clone", i), !ee.eventCanceled && (i.options.removeCloneOnHide || Te.insertBefore(ke, j), i._hideClone(), Je({
        sortable: i,
        name: "clone"
      }));
    }), !o && Me(j, s.dragClass, !0), o ? (Mr = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (ce(document, "mouseup", i._onDrop), ce(document, "touchend", i._onDrop), ce(document, "touchcancel", i._onDrop), r && (r.effectAllowed = "move", s.setData && s.setData.call(i, r, j)), fe(document, "drop", i), X(j, "transform", "translateZ(0)")), Ht = !0, i._dragStartId = Tr(i._dragStarted.bind(i, o, n)), fe(document, "selectstart", i), lr = !0, ur && X(document.body, "user-select", "none");
  },
  _onDragOver: function(n) {
    var o = this.el, i = n.target, r, s, e, l = this.options, a = l.group, u = ee.active, c = mr === a, d = l.sort, f = Xe || u, h, g = this, p = !1;
    if (qr)
      return;
    function v(ue, he) {
      qe(ue, g, xt({
        evt: n,
        isOwner: c,
        axis: h ? "vertical" : "horizontal",
        revert: e,
        dragRect: r,
        targetRect: s,
        canSort: d,
        fromSortable: f,
        target: i,
        completed: y,
        onMove: function(de, Se) {
          return xr(Te, o, j, r, de, Ie(de), n, Se);
        },
        changed: x
      }, he));
    }
    function m() {
      v("dragOverAnimationCapture"), g.captureAnimationState(), g !== f && f.captureAnimationState();
    }
    function y(ue) {
      return v("dragOverCompleted", {
        insertion: ue
      }), ue && (c ? u._hideClone() : u._showClone(g), g !== f && (Me(j, Xe ? Xe.options.ghostClass : u.options.ghostClass, !1), Me(j, l.ghostClass, !0)), Xe !== g && g !== ee.active ? Xe = g : g === ee.active && Xe && (Xe = null), f === g && (g._ignoreWhileAnimating = i), g.animateAll(function() {
        v("dragOverAnimationComplete"), g._ignoreWhileAnimating = null;
      }), g !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (i === j && !j.animated || i === o && !i.animated) && (Vt = null), !l.dragoverBubble && !n.rootEl && i !== document && (j.parentNode[Qe]._isOutsideThisEl(n.target), !ue && Lt(n)), !l.dragoverBubble && n.stopPropagation && n.stopPropagation(), p = !0;
    }
    function x() {
      ot = je(j), Dt = je(j, l.draggable), Je({
        sortable: g,
        name: "change",
        toEl: o,
        newIndex: ot,
        newDraggableIndex: Dt,
        originalEvent: n
      });
    }
    if (n.preventDefault !== void 0 && n.cancelable && n.preventDefault(), i = mt(i, l.draggable, o, !0), v("dragOver"), ee.eventCanceled)
      return p;
    if (j.contains(n.target) || i.animated && i.animatingX && i.animatingY || g._ignoreWhileAnimating === i)
      return y(!1);
    if (Mr = !1, u && !l.disabled && (c ? d || (e = Ne !== Te) : Xe === this || (this.lastPutMode = mr.checkPull(this, u, j, n)) && a.checkPut(this, u, j, n))) {
      if (h = this._getDirection(n, i) === "vertical", r = Ie(j), v("dragOverValid"), ee.eventCanceled)
        return p;
      if (e)
        return Ne = Te, m(), this._hideClone(), v("revert"), ee.eventCanceled || (zt ? Te.insertBefore(j, zt) : Te.appendChild(j)), y(!0);
      var E = on(o, l.draggable);
      if (!E || Bi(n, h, this) && !E.animated) {
        if (E === j)
          return y(!1);
        if (E && o === n.target && (i = E), i && (s = Ie(i)), xr(Te, o, j, r, i, s, n, !!i) !== !1)
          return m(), o.appendChild(j), Ne = o, x(), y(!0);
      } else if (E && zi(n, h, this)) {
        var P = Jt(o, 0, l, !0);
        if (P === j)
          return y(!1);
        if (i = P, s = Ie(i), xr(Te, o, j, r, i, s, n, !1) !== !1)
          return m(), o.insertBefore(j, P), Ne = o, x(), y(!0);
      } else if (i.parentNode === o) {
        s = Ie(i);
        var T = 0, U, K = j.parentNode !== o, A = !Ni(j.animated && j.toRect || r, i.animated && i.toRect || s, h), F = h ? "top" : "left", G = yn(i, "top", "top") || yn(j, "top", "top"), V = G ? G.scrollTop : void 0;
        Vt !== i && (U = s[F], vr = !1, yr = !A && l.invertSwap || K), T = Ui(n, i, s, h, A ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, yr, Vt === i);
        var N;
        if (T !== 0) {
          var k = je(j);
          do
            k -= T, N = Ne.children[k];
          while (N && (X(N, "display") === "none" || N === oe));
        }
        if (T === 0 || N === i)
          return y(!1);
        Vt = i, fr = T;
        var q = i.nextElementSibling, z = !1;
        z = T === 1;
        var J = xr(Te, o, j, r, i, s, n, z);
        if (J !== !1)
          return (J === 1 || J === -1) && (z = J === 1), qr = !0, setTimeout(Li, 30), m(), z && !q ? o.appendChild(j) : i.parentNode.insertBefore(j, z ? q : i), G && Vn(G, 0, V - G.scrollTop), Ne = j.parentNode, U !== void 0 && !yr && (Or = Math.abs(U - Ie(i)[F])), x(), y(!0);
      }
      if (o.contains(j))
        return y(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    ce(document, "mousemove", this._onTouchMove), ce(document, "touchmove", this._onTouchMove), ce(document, "pointermove", this._onTouchMove), ce(document, "dragover", Lt), ce(document, "mousemove", Lt), ce(document, "touchmove", Lt);
  },
  _offUpEvents: function() {
    var n = this.el.ownerDocument;
    ce(n, "mouseup", this._onDrop), ce(n, "touchend", this._onDrop), ce(n, "pointerup", this._onDrop), ce(n, "touchcancel", this._onDrop), ce(document, "selectstart", this);
  },
  _onDrop: function(n) {
    var o = this.el, i = this.options;
    if (ot = je(j), Dt = je(j, i.draggable), qe("drop", this, {
      evt: n
    }), Ne = j && j.parentNode, ot = je(j), Dt = je(j, i.draggable), ee.eventCanceled) {
      this._nulling();
      return;
    }
    Ht = !1, yr = !1, vr = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _r(this.cloneId), _r(this._dragStartId), this.nativeDraggable && (ce(document, "drop", this), ce(o, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ur && X(document.body, "user-select", ""), X(j, "transform", ""), n && (lr && (n.cancelable && n.preventDefault(), !i.dropBubble && n.stopPropagation()), oe && oe.parentNode && oe.parentNode.removeChild(oe), (Te === Ne || Xe && Xe.lastPutMode !== "clone") && ke && ke.parentNode && ke.parentNode.removeChild(ke), j && (this.nativeDraggable && ce(j, "dragend", this), Hr(j), j.style["will-change"] = "", lr && !Ht && Me(j, Xe ? Xe.options.ghostClass : this.options.ghostClass, !1), Me(j, this.options.chosenClass, !1), Je({
      sortable: this,
      name: "unchoose",
      toEl: Ne,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: n
    }), Te !== Ne ? (ot >= 0 && (Je({
      rootEl: Ne,
      name: "add",
      toEl: Ne,
      fromEl: Te,
      originalEvent: n
    }), Je({
      sortable: this,
      name: "remove",
      toEl: Ne,
      originalEvent: n
    }), Je({
      rootEl: Ne,
      name: "sort",
      toEl: Ne,
      fromEl: Te,
      originalEvent: n
    }), Je({
      sortable: this,
      name: "sort",
      toEl: Ne,
      originalEvent: n
    })), Xe && Xe.save()) : ot !== Xt && ot >= 0 && (Je({
      sortable: this,
      name: "update",
      toEl: Ne,
      originalEvent: n
    }), Je({
      sortable: this,
      name: "sort",
      toEl: Ne,
      originalEvent: n
    })), ee.active && ((ot == null || ot === -1) && (ot = Xt, Dt = dr), Je({
      sortable: this,
      name: "end",
      toEl: Ne,
      originalEvent: n
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    qe("nulling", this), Te = j = Ne = oe = zt = ke = Cr = $t = Ft = pt = lr = ot = Dt = Xt = dr = Vt = fr = Xe = mr = ee.dragged = ee.ghost = ee.clone = ee.active = null, $r.forEach(function(n) {
      n.checked = !0;
    }), $r.length = Vr = Wr = 0;
  },
  handleEvent: function(n) {
    switch (n.type) {
      case "drop":
      case "dragend":
        this._onDrop(n);
        break;
      case "dragenter":
      case "dragover":
        j && (this._onDragOver(n), Fi(n));
        break;
      case "selectstart":
        n.preventDefault();
        break;
    }
  },
  toArray: function() {
    for (var n = [], o, i = this.el.children, r = 0, s = i.length, e = this.options; r < s; r++)
      o = i[r], mt(o, e.draggable, this.el, !1) && n.push(o.getAttribute(e.dataIdAttr) || Vi(o));
    return n;
  },
  sort: function(n, o) {
    var i = {}, r = this.el;
    this.toArray().forEach(function(s, e) {
      var l = r.children[e];
      mt(l, this.options.draggable, r, !1) && (i[s] = l);
    }, this), o && this.captureAnimationState(), n.forEach(function(s) {
      i[s] && (r.removeChild(i[s]), r.appendChild(i[s]));
    }), o && this.animateAll();
  },
  save: function() {
    var n = this.options.store;
    n && n.set && n.set(this);
  },
  closest: function(n, o) {
    return mt(n, o || this.options.draggable, this.el, !1);
  },
  option: function(n, o) {
    var i = this.options;
    if (o === void 0)
      return i[n];
    var r = pr.modifyOption(this, n, o);
    typeof r < "u" ? i[n] = r : i[n] = o, n === "group" && Hn(i);
  },
  destroy: function() {
    qe("destroy", this);
    var n = this.el;
    n[Qe] = null, ce(n, "mousedown", this._onTapStart), ce(n, "touchstart", this._onTapStart), ce(n, "pointerdown", this._onTapStart), this.nativeDraggable && (ce(n, "dragover", this), ce(n, "dragenter", this)), Array.prototype.forEach.call(n.querySelectorAll("[draggable]"), function(o) {
      o.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Dr.splice(Dr.indexOf(this.el), 1), this.el = n = null;
  },
  _hideClone: function() {
    if (!$t) {
      if (qe("hideClone", this), ee.eventCanceled)
        return;
      X(ke, "display", "none"), this.options.removeCloneOnHide && ke.parentNode && ke.parentNode.removeChild(ke), $t = !0;
    }
  },
  _showClone: function(n) {
    if (n.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if ($t) {
      if (qe("showClone", this), ee.eventCanceled)
        return;
      j.parentNode == Te && !this.options.group.revertClone ? Te.insertBefore(ke, j) : zt ? Te.insertBefore(ke, zt) : Te.appendChild(ke), this.options.group.revertClone && this.animate(j, ke), X(ke, "display", ""), $t = !1;
    }
  }
};
function Fi(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function xr(t, n, o, i, r, s, e, l) {
  var a, u = t[Qe], c = u.options.onMove, d;
  return window.CustomEvent && !It && !hr ? a = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (a = document.createEvent("Event"), a.initEvent("move", !0, !0)), a.to = n, a.from = t, a.dragged = o, a.draggedRect = i, a.related = r || n, a.relatedRect = s || Ie(n), a.willInsertAfter = l, a.originalEvent = e, t.dispatchEvent(a), c && (d = c.call(u, a, e)), d;
}
function Hr(t) {
  t.draggable = !1;
}
function Li() {
  qr = !1;
}
function zi(t, n, o) {
  var i = Ie(Jt(o.el, 0, o.options, !0)), r = 10;
  return n ? t.clientX < i.left - r || t.clientY < i.top && t.clientX < i.right : t.clientY < i.top - r || t.clientY < i.bottom && t.clientX < i.left;
}
function Bi(t, n, o) {
  var i = Ie(on(o.el, o.options.draggable)), r = 10;
  return n ? t.clientX > i.right + r || t.clientX <= i.right && t.clientY > i.bottom && t.clientX >= i.left : t.clientX > i.right && t.clientY > i.top || t.clientX <= i.right && t.clientY > i.bottom + r;
}
function Ui(t, n, o, i, r, s, e, l) {
  var a = i ? t.clientY : t.clientX, u = i ? o.height : o.width, c = i ? o.top : o.left, d = i ? o.bottom : o.right, f = !1;
  if (!e) {
    if (l && Or < u * r) {
      if (!vr && (fr === 1 ? a > c + u * s / 2 : a < d - u * s / 2) && (vr = !0), vr)
        f = !0;
      else if (fr === 1 ? a < c + Or : a > d - Or)
        return -fr;
    } else if (a > c + u * (1 - r) / 2 && a < d - u * (1 - r) / 2)
      return Gi(n);
  }
  return f = f || e, f && (a < c + u * s / 2 || a > d - u * s / 2) ? a > c + u / 2 ? 1 : -1 : 0;
}
function Gi(t) {
  return je(j) < je(t) ? 1 : -1;
}
function Vi(t) {
  for (var n = t.tagName + t.className + t.src + t.href + t.textContent, o = n.length, i = 0; o--; )
    i += n.charCodeAt(o);
  return i.toString(36);
}
function Wi(t) {
  $r.length = 0;
  for (var n = t.getElementsByTagName("input"), o = n.length; o--; ) {
    var i = n[o];
    i.checked && $r.push(i);
  }
}
function Tr(t) {
  return setTimeout(t, 0);
}
function _r(t) {
  return clearTimeout(t);
}
jr && fe(document, "touchmove", function(t) {
  (ee.active || Ht) && t.cancelable && t.preventDefault();
});
ee.utils = {
  on: fe,
  off: ce,
  css: X,
  find: Un,
  is: function(n, o) {
    return !!mt(n, o, n, !1);
  },
  extend: Ii,
  throttle: Gn,
  closest: mt,
  toggleClass: Me,
  clone: an,
  index: je,
  nextTick: Tr,
  cancelNextTick: _r,
  detectDirection: Kn,
  getChild: Jt
};
ee.get = function(t) {
  return t[Qe];
};
ee.mount = function() {
  for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
    n[o] = arguments[o];
  n[0].constructor === Array && (n = n[0]), n.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (ee.utils = xt(xt({}, ee.utils), i.utils)), pr.mount(i);
  });
};
ee.create = function(t, n) {
  return new ee(t, n);
};
ee.version = Ei;
var Ge = [], ir, en, tn = !1, Xr, Yr, Rr, sr;
function Ki() {
  function t() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
  }
  return t.prototype = {
    dragStarted: function(o) {
      var i = o.originalEvent;
      this.sortable.nativeDraggable ? fe(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? fe(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? fe(document, "touchmove", this._handleFallbackAutoScroll) : fe(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(o) {
      var i = o.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? ce(document, "dragover", this._handleAutoScroll) : (ce(document, "pointermove", this._handleFallbackAutoScroll), ce(document, "touchmove", this._handleFallbackAutoScroll), ce(document, "mousemove", this._handleFallbackAutoScroll)), Cn(), Ir(), Pi();
    },
    nulling: function() {
      Rr = en = ir = tn = sr = Xr = Yr = null, Ge.length = 0;
    },
    _handleFallbackAutoScroll: function(o) {
      this._handleAutoScroll(o, !0);
    },
    _handleAutoScroll: function(o, i) {
      var r = this, s = (o.touches ? o.touches[0] : o).clientX, e = (o.touches ? o.touches[0] : o).clientY, l = document.elementFromPoint(s, e);
      if (Rr = o, i || this.options.forceAutoScrollFallback || hr || It || ur) {
        Qr(o, this.options, l, i);
        var a = Nt(l, !0);
        tn && (!sr || s !== Xr || e !== Yr) && (sr && Cn(), sr = setInterval(function() {
          var u = Nt(document.elementFromPoint(s, e), !0);
          u !== a && (a = u, Ir()), Qr(o, r.options, u, i);
        }, 10), Xr = s, Yr = e);
      } else {
        if (!this.options.bubbleScroll || Nt(l, !0) === bt()) {
          Ir();
          return;
        }
        Qr(o, this.options, Nt(l, !1), !1);
      }
    }
  }, dt(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ir() {
  Ge.forEach(function(t) {
    clearInterval(t.pid);
  }), Ge = [];
}
function Cn() {
  clearInterval(sr);
}
var Qr = Gn(function(t, n, o, i) {
  if (!!n.scroll) {
    var r = (t.touches ? t.touches[0] : t).clientX, s = (t.touches ? t.touches[0] : t).clientY, e = n.scrollSensitivity, l = n.scrollSpeed, a = bt(), u = !1, c;
    en !== o && (en = o, Ir(), ir = n.scroll, c = n.scrollFn, ir === !0 && (ir = Nt(o, !0)));
    var d = 0, f = ir;
    do {
      var h = f, g = Ie(h), p = g.top, v = g.bottom, m = g.left, y = g.right, x = g.width, E = g.height, P = void 0, T = void 0, U = h.scrollWidth, K = h.scrollHeight, A = X(h), F = h.scrollLeft, G = h.scrollTop;
      h === a ? (P = x < U && (A.overflowX === "auto" || A.overflowX === "scroll" || A.overflowX === "visible"), T = E < K && (A.overflowY === "auto" || A.overflowY === "scroll" || A.overflowY === "visible")) : (P = x < U && (A.overflowX === "auto" || A.overflowX === "scroll"), T = E < K && (A.overflowY === "auto" || A.overflowY === "scroll"));
      var V = P && (Math.abs(y - r) <= e && F + x < U) - (Math.abs(m - r) <= e && !!F), N = T && (Math.abs(v - s) <= e && G + E < K) - (Math.abs(p - s) <= e && !!G);
      if (!Ge[d])
        for (var k = 0; k <= d; k++)
          Ge[k] || (Ge[k] = {});
      (Ge[d].vx != V || Ge[d].vy != N || Ge[d].el !== h) && (Ge[d].el = h, Ge[d].vx = V, Ge[d].vy = N, clearInterval(Ge[d].pid), (V != 0 || N != 0) && (u = !0, Ge[d].pid = setInterval(function() {
        i && this.layer === 0 && ee.active._onTouchMove(Rr);
        var q = Ge[this.layer].vy ? Ge[this.layer].vy * l : 0, z = Ge[this.layer].vx ? Ge[this.layer].vx * l : 0;
        typeof c == "function" && c.call(ee.dragged.parentNode[Qe], z, q, t, Rr, Ge[this.layer].el) !== "continue" || Vn(Ge[this.layer].el, z, q);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (n.bubbleScroll && f !== a && (f = Nt(f, !1)));
    tn = u;
  }
}, 30), Qn = function(n) {
  var o = n.originalEvent, i = n.putSortable, r = n.dragEl, s = n.activeSortable, e = n.dispatchSortableEvent, l = n.hideGhostForTarget, a = n.unhideGhostForTarget;
  if (!!o) {
    var u = i || s;
    l();
    var c = o.changedTouches && o.changedTouches.length ? o.changedTouches[0] : o, d = document.elementFromPoint(c.clientX, c.clientY);
    a(), u && !u.el.contains(d) && (e("spill"), this.onSpill({
      dragEl: r,
      putSortable: i
    }));
  }
};
function ln() {
}
ln.prototype = {
  startIndex: null,
  dragStart: function(n) {
    var o = n.oldDraggableIndex;
    this.startIndex = o;
  },
  onSpill: function(n) {
    var o = n.dragEl, i = n.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var r = Jt(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(o, r) : this.sortable.el.appendChild(o), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Qn
};
dt(ln, {
  pluginName: "revertOnSpill"
});
function sn() {
}
sn.prototype = {
  onSpill: function(n) {
    var o = n.dragEl, i = n.putSortable, r = i || this.sortable;
    r.captureAnimationState(), o.parentNode && o.parentNode.removeChild(o), r.animateAll();
  },
  drop: Qn
};
dt(sn, {
  pluginName: "removeOnSpill"
});
var st;
function Hi() {
  function t() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return t.prototype = {
    dragStart: function(o) {
      var i = o.dragEl;
      st = i;
    },
    dragOverValid: function(o) {
      var i = o.completed, r = o.target, s = o.onMove, e = o.activeSortable, l = o.changed, a = o.cancel;
      if (!!e.options.swap) {
        var u = this.sortable.el, c = this.options;
        if (r && r !== u) {
          var d = st;
          s(r) !== !1 ? (Me(r, c.swapClass, !0), st = r) : st = null, d && d !== st && Me(d, c.swapClass, !1);
        }
        l(), i(!0), a();
      }
    },
    drop: function(o) {
      var i = o.activeSortable, r = o.putSortable, s = o.dragEl, e = r || this.sortable, l = this.options;
      st && Me(st, l.swapClass, !1), st && (l.swap || r && r.options.swap) && s !== st && (e.captureAnimationState(), e !== i && i.captureAnimationState(), Xi(s, st), e.animateAll(), e !== i && i.animateAll());
    },
    nulling: function() {
      st = null;
    }
  }, dt(t, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: st
      };
    }
  });
}
function Xi(t, n) {
  var o = t.parentNode, i = n.parentNode, r, s;
  !o || !i || o.isEqualNode(n) || i.isEqualNode(t) || (r = je(t), s = je(n), o.isEqualNode(i) && r < s && s++, o.insertBefore(n, o.children[r]), i.insertBefore(t, i.children[s]));
}
var ne = [], nt = [], rr, gt, nr = !1, _e = !1, Wt = !1, Ce, or, Sr;
function Yi() {
  function t(n) {
    for (var o in this)
      o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
    n.options.supportPointer ? fe(document, "pointerup", this._deselectMultiDrag) : (fe(document, "mouseup", this._deselectMultiDrag), fe(document, "touchend", this._deselectMultiDrag)), fe(document, "keydown", this._checkKeyDown), fe(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function(r, s) {
        var e = "";
        ne.length && gt === n ? ne.forEach(function(l, a) {
          e += (a ? ", " : "") + l.textContent;
        }) : e = s.textContent, r.setData("Text", e);
      }
    };
  }
  return t.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(o) {
      var i = o.dragEl;
      Ce = i;
    },
    delayEnded: function() {
      this.isMultiDrag = ~ne.indexOf(Ce);
    },
    setupClone: function(o) {
      var i = o.sortable, r = o.cancel;
      if (!!this.isMultiDrag) {
        for (var s = 0; s < ne.length; s++)
          nt.push(an(ne[s])), nt[s].sortableIndex = ne[s].sortableIndex, nt[s].draggable = !1, nt[s].style["will-change"] = "", Me(nt[s], this.options.selectedClass, !1), ne[s] === Ce && Me(nt[s], this.options.chosenClass, !1);
        i._hideClone(), r();
      }
    },
    clone: function(o) {
      var i = o.sortable, r = o.rootEl, s = o.dispatchSortableEvent, e = o.cancel;
      !this.isMultiDrag || this.options.removeCloneOnHide || ne.length && gt === i && (On(!0, r), s("clone"), e());
    },
    showClone: function(o) {
      var i = o.cloneNowShown, r = o.rootEl, s = o.cancel;
      !this.isMultiDrag || (On(!1, r), nt.forEach(function(e) {
        X(e, "display", "");
      }), i(), Sr = !1, s());
    },
    hideClone: function(o) {
      var i = this;
      o.sortable;
      var r = o.cloneNowHidden, s = o.cancel;
      !this.isMultiDrag || (nt.forEach(function(e) {
        X(e, "display", "none"), i.options.removeCloneOnHide && e.parentNode && e.parentNode.removeChild(e);
      }), r(), Sr = !0, s());
    },
    dragStartGlobal: function(o) {
      o.sortable, !this.isMultiDrag && gt && gt.multiDrag._deselectMultiDrag(), ne.forEach(function(i) {
        i.sortableIndex = je(i);
      }), ne = ne.sort(function(i, r) {
        return i.sortableIndex - r.sortableIndex;
      }), Wt = !0;
    },
    dragStarted: function(o) {
      var i = this, r = o.sortable;
      if (!!this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          ne.forEach(function(e) {
            e !== Ce && X(e, "position", "absolute");
          });
          var s = Ie(Ce, !1, !0, !0);
          ne.forEach(function(e) {
            e !== Ce && xn(e, s);
          }), _e = !0, nr = !0;
        }
        r.animateAll(function() {
          _e = !1, nr = !1, i.options.animation && ne.forEach(function(e) {
            Ur(e);
          }), i.options.sort && wr();
        });
      }
    },
    dragOver: function(o) {
      var i = o.target, r = o.completed, s = o.cancel;
      _e && ~ne.indexOf(i) && (r(!1), s());
    },
    revert: function(o) {
      var i = o.fromSortable, r = o.rootEl, s = o.sortable, e = o.dragRect;
      ne.length > 1 && (ne.forEach(function(l) {
        s.addAnimationState({
          target: l,
          rect: _e ? Ie(l) : e
        }), Ur(l), l.fromRect = e, i.removeAnimationState(l);
      }), _e = !1, Qi(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(o) {
      var i = o.sortable, r = o.isOwner, s = o.insertion, e = o.activeSortable, l = o.parentEl, a = o.putSortable, u = this.options;
      if (s) {
        if (r && e._hideClone(), nr = !1, u.animation && ne.length > 1 && (_e || !r && !e.options.sort && !a)) {
          var c = Ie(Ce, !1, !0, !0);
          ne.forEach(function(f) {
            f !== Ce && (xn(f, c), l.appendChild(f));
          }), _e = !0;
        }
        if (!r)
          if (_e || wr(), ne.length > 1) {
            var d = Sr;
            e._showClone(i), e.options.animation && !Sr && d && nt.forEach(function(f) {
              e.addAnimationState({
                target: f,
                rect: or
              }), f.fromRect = or, f.thisAnimationDuration = null;
            });
          } else
            e._showClone(i);
      }
    },
    dragOverAnimationCapture: function(o) {
      var i = o.dragRect, r = o.isOwner, s = o.activeSortable;
      if (ne.forEach(function(l) {
        l.thisAnimationDuration = null;
      }), s.options.animation && !r && s.multiDrag.isMultiDrag) {
        or = dt({}, i);
        var e = Bt(Ce, !0);
        or.top -= e.f, or.left -= e.e;
      }
    },
    dragOverAnimationComplete: function() {
      _e && (_e = !1, wr());
    },
    drop: function(o) {
      var i = o.originalEvent, r = o.rootEl, s = o.parentEl, e = o.sortable, l = o.dispatchSortableEvent, a = o.oldIndex, u = o.putSortable, c = u || this.sortable;
      if (!!i) {
        var d = this.options, f = s.children;
        if (!Wt)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), Me(Ce, d.selectedClass, !~ne.indexOf(Ce)), ~ne.indexOf(Ce))
            ne.splice(ne.indexOf(Ce), 1), rr = null, ar({
              sortable: e,
              rootEl: r,
              name: "deselect",
              targetEl: Ce,
              originalEvt: i
            });
          else {
            if (ne.push(Ce), ar({
              sortable: e,
              rootEl: r,
              name: "select",
              targetEl: Ce,
              originalEvt: i
            }), i.shiftKey && rr && e.el.contains(rr)) {
              var h = je(rr), g = je(Ce);
              if (~h && ~g && h !== g) {
                var p, v;
                for (g > h ? (v = h, p = g) : (v = g, p = h + 1); v < p; v++)
                  ~ne.indexOf(f[v]) || (Me(f[v], d.selectedClass, !0), ne.push(f[v]), ar({
                    sortable: e,
                    rootEl: r,
                    name: "select",
                    targetEl: f[v],
                    originalEvt: i
                  }));
              }
            } else
              rr = Ce;
            gt = c;
          }
        if (Wt && this.isMultiDrag) {
          if (_e = !1, (s[Qe].options.sort || s !== r) && ne.length > 1) {
            var m = Ie(Ce), y = je(Ce, ":not(." + this.options.selectedClass + ")");
            if (!nr && d.animation && (Ce.thisAnimationDuration = null), c.captureAnimationState(), !nr && (d.animation && (Ce.fromRect = m, ne.forEach(function(E) {
              if (E.thisAnimationDuration = null, E !== Ce) {
                var P = _e ? Ie(E) : m;
                E.fromRect = P, c.addAnimationState({
                  target: E,
                  rect: P
                });
              }
            })), wr(), ne.forEach(function(E) {
              f[y] ? s.insertBefore(E, f[y]) : s.appendChild(E), y++;
            }), a === je(Ce))) {
              var x = !1;
              ne.forEach(function(E) {
                if (E.sortableIndex !== je(E)) {
                  x = !0;
                  return;
                }
              }), x && l("update");
            }
            ne.forEach(function(E) {
              Ur(E);
            }), c.animateAll();
          }
          gt = c;
        }
        (r === s || u && u.lastPutMode !== "clone") && nt.forEach(function(E) {
          E.parentNode && E.parentNode.removeChild(E);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Wt = !1, nt.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), ce(document, "pointerup", this._deselectMultiDrag), ce(document, "mouseup", this._deselectMultiDrag), ce(document, "touchend", this._deselectMultiDrag), ce(document, "keydown", this._checkKeyDown), ce(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(o) {
      if (!(typeof Wt < "u" && Wt) && gt === this.sortable && !(o && mt(o.target, this.options.draggable, this.sortable.el, !1)) && !(o && o.button !== 0))
        for (; ne.length; ) {
          var i = ne[0];
          Me(i, this.options.selectedClass, !1), ne.shift(), ar({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: i,
            originalEvt: o
          });
        }
    },
    _checkKeyDown: function(o) {
      o.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
    },
    _checkKeyUp: function(o) {
      o.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
    }
  }, dt(t, {
    pluginName: "multiDrag",
    utils: {
      select: function(o) {
        var i = o.parentNode[Qe];
        !i || !i.options.multiDrag || ~ne.indexOf(o) || (gt && gt !== i && (gt.multiDrag._deselectMultiDrag(), gt = i), Me(o, i.options.selectedClass, !0), ne.push(o));
      },
      deselect: function(o) {
        var i = o.parentNode[Qe], r = ne.indexOf(o);
        !i || !i.options.multiDrag || !~r || (Me(o, i.options.selectedClass, !1), ne.splice(r, 1));
      }
    },
    eventProperties: function() {
      var o = this, i = [], r = [];
      return ne.forEach(function(s) {
        i.push({
          multiDragElement: s,
          index: s.sortableIndex
        });
        var e;
        _e && s !== Ce ? e = -1 : _e ? e = je(s, ":not(." + o.options.selectedClass + ")") : e = je(s), r.push({
          multiDragElement: s,
          index: e
        });
      }), {
        items: yi(ne),
        clones: [].concat(nt),
        oldIndicies: i,
        newIndicies: r
      };
    },
    optionListeners: {
      multiDragKey: function(o) {
        return o = o.toLowerCase(), o === "ctrl" ? o = "Control" : o.length > 1 && (o = o.charAt(0).toUpperCase() + o.substr(1)), o;
      }
    }
  });
}
function Qi(t, n) {
  ne.forEach(function(o, i) {
    var r = n.children[o.sortableIndex + (t ? Number(i) : 0)];
    r ? n.insertBefore(o, r) : n.appendChild(o);
  });
}
function On(t, n) {
  nt.forEach(function(o, i) {
    var r = n.children[o.sortableIndex + (t ? Number(i) : 0)];
    r ? n.insertBefore(o, r) : n.appendChild(o);
  });
}
function wr() {
  ne.forEach(function(t) {
    t !== Ce && t.parentNode && t.parentNode.removeChild(t);
  });
}
ee.mount(new Ki());
ee.mount(sn, ln);
const Ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ee,
  MultiDrag: Yi,
  Sortable: ee,
  Swap: Hi
}, Symbol.toStringTag, { value: "Module" })), Zi = /* @__PURE__ */ hi(Ji);
(function(t, n) {
  (function(i, r) {
    t.exports = r(qn, Zi);
  })(typeof self < "u" ? self : fi, function(o, i) {
    return function(r) {
      var s = {};
      function e(l) {
        if (s[l])
          return s[l].exports;
        var a = s[l] = {
          i: l,
          l: !1,
          exports: {}
        };
        return r[l].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
      }
      return e.m = r, e.c = s, e.d = function(l, a, u) {
        e.o(l, a) || Object.defineProperty(l, a, { enumerable: !0, get: u });
      }, e.r = function(l) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(l, "__esModule", { value: !0 });
      }, e.t = function(l, a) {
        if (a & 1 && (l = e(l)), a & 8 || a & 4 && typeof l == "object" && l && l.__esModule)
          return l;
        var u = /* @__PURE__ */ Object.create(null);
        if (e.r(u), Object.defineProperty(u, "default", { enumerable: !0, value: l }), a & 2 && typeof l != "string")
          for (var c in l)
            e.d(u, c, function(d) {
              return l[d];
            }.bind(null, c));
        return u;
      }, e.n = function(l) {
        var a = l && l.__esModule ? function() {
          return l.default;
        } : function() {
          return l;
        };
        return e.d(a, "a", a), a;
      }, e.o = function(l, a) {
        return Object.prototype.hasOwnProperty.call(l, a);
      }, e.p = "", e(e.s = "fb15");
    }({
      "00ee": function(r, s, e) {
        var l = e("b622"), a = l("toStringTag"), u = {};
        u[a] = "z", r.exports = String(u) === "[object z]";
      },
      "0366": function(r, s, e) {
        var l = e("1c0b");
        r.exports = function(a, u, c) {
          if (l(a), u === void 0)
            return a;
          switch (c) {
            case 0:
              return function() {
                return a.call(u);
              };
            case 1:
              return function(d) {
                return a.call(u, d);
              };
            case 2:
              return function(d, f) {
                return a.call(u, d, f);
              };
            case 3:
              return function(d, f, h) {
                return a.call(u, d, f, h);
              };
          }
          return function() {
            return a.apply(u, arguments);
          };
        };
      },
      "057f": function(r, s, e) {
        var l = e("fc6a"), a = e("241c").f, u = {}.toString, c = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], d = function(f) {
          try {
            return a(f);
          } catch {
            return c.slice();
          }
        };
        r.exports.f = function(h) {
          return c && u.call(h) == "[object Window]" ? d(h) : a(l(h));
        };
      },
      "06cf": function(r, s, e) {
        var l = e("83ab"), a = e("d1e7"), u = e("5c6c"), c = e("fc6a"), d = e("c04e"), f = e("5135"), h = e("0cfb"), g = Object.getOwnPropertyDescriptor;
        s.f = l ? g : function(v, m) {
          if (v = c(v), m = d(m, !0), h)
            try {
              return g(v, m);
            } catch {
            }
          if (f(v, m))
            return u(!a.f.call(v, m), v[m]);
        };
      },
      "0cfb": function(r, s, e) {
        var l = e("83ab"), a = e("d039"), u = e("cc12");
        r.exports = !l && !a(function() {
          return Object.defineProperty(u("div"), "a", {
            get: function() {
              return 7;
            }
          }).a != 7;
        });
      },
      "13d5": function(r, s, e) {
        var l = e("23e7"), a = e("d58f").left, u = e("a640"), c = e("ae40"), d = u("reduce"), f = c("reduce", { 1: 0 });
        l({ target: "Array", proto: !0, forced: !d || !f }, {
          reduce: function(g) {
            return a(this, g, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "14c3": function(r, s, e) {
        var l = e("c6b6"), a = e("9263");
        r.exports = function(u, c) {
          var d = u.exec;
          if (typeof d == "function") {
            var f = d.call(u, c);
            if (typeof f != "object")
              throw TypeError("RegExp exec method returned something other than an Object or null");
            return f;
          }
          if (l(u) !== "RegExp")
            throw TypeError("RegExp#exec called on incompatible receiver");
          return a.call(u, c);
        };
      },
      "159b": function(r, s, e) {
        var l = e("da84"), a = e("fdbc"), u = e("17c2"), c = e("9112");
        for (var d in a) {
          var f = l[d], h = f && f.prototype;
          if (h && h.forEach !== u)
            try {
              c(h, "forEach", u);
            } catch {
              h.forEach = u;
            }
        }
      },
      "17c2": function(r, s, e) {
        var l = e("b727").forEach, a = e("a640"), u = e("ae40"), c = a("forEach"), d = u("forEach");
        r.exports = !c || !d ? function(h) {
          return l(this, h, arguments.length > 1 ? arguments[1] : void 0);
        } : [].forEach;
      },
      "1be4": function(r, s, e) {
        var l = e("d066");
        r.exports = l("document", "documentElement");
      },
      "1c0b": function(r, s) {
        r.exports = function(e) {
          if (typeof e != "function")
            throw TypeError(String(e) + " is not a function");
          return e;
        };
      },
      "1c7e": function(r, s, e) {
        var l = e("b622"), a = l("iterator"), u = !1;
        try {
          var c = 0, d = {
            next: function() {
              return { done: !!c++ };
            },
            return: function() {
              u = !0;
            }
          };
          d[a] = function() {
            return this;
          }, Array.from(d, function() {
            throw 2;
          });
        } catch {
        }
        r.exports = function(f, h) {
          if (!h && !u)
            return !1;
          var g = !1;
          try {
            var p = {};
            p[a] = function() {
              return {
                next: function() {
                  return { done: g = !0 };
                }
              };
            }, f(p);
          } catch {
          }
          return g;
        };
      },
      "1d80": function(r, s) {
        r.exports = function(e) {
          if (e == null)
            throw TypeError("Can't call method on " + e);
          return e;
        };
      },
      "1dde": function(r, s, e) {
        var l = e("d039"), a = e("b622"), u = e("2d00"), c = a("species");
        r.exports = function(d) {
          return u >= 51 || !l(function() {
            var f = [], h = f.constructor = {};
            return h[c] = function() {
              return { foo: 1 };
            }, f[d](Boolean).foo !== 1;
          });
        };
      },
      "23cb": function(r, s, e) {
        var l = e("a691"), a = Math.max, u = Math.min;
        r.exports = function(c, d) {
          var f = l(c);
          return f < 0 ? a(f + d, 0) : u(f, d);
        };
      },
      "23e7": function(r, s, e) {
        var l = e("da84"), a = e("06cf").f, u = e("9112"), c = e("6eeb"), d = e("ce4e"), f = e("e893"), h = e("94ca");
        r.exports = function(g, p) {
          var v = g.target, m = g.global, y = g.stat, x, E, P, T, U, K;
          if (m ? E = l : y ? E = l[v] || d(v, {}) : E = (l[v] || {}).prototype, E)
            for (P in p) {
              if (U = p[P], g.noTargetGet ? (K = a(E, P), T = K && K.value) : T = E[P], x = h(m ? P : v + (y ? "." : "#") + P, g.forced), !x && T !== void 0) {
                if (typeof U == typeof T)
                  continue;
                f(U, T);
              }
              (g.sham || T && T.sham) && u(U, "sham", !0), c(E, P, U, g);
            }
        };
      },
      "241c": function(r, s, e) {
        var l = e("ca84"), a = e("7839"), u = a.concat("length", "prototype");
        s.f = Object.getOwnPropertyNames || function(d) {
          return l(d, u);
        };
      },
      "25f0": function(r, s, e) {
        var l = e("6eeb"), a = e("825a"), u = e("d039"), c = e("ad6d"), d = "toString", f = RegExp.prototype, h = f[d], g = u(function() {
          return h.call({ source: "a", flags: "b" }) != "/a/b";
        }), p = h.name != d;
        (g || p) && l(RegExp.prototype, d, function() {
          var m = a(this), y = String(m.source), x = m.flags, E = String(x === void 0 && m instanceof RegExp && !("flags" in f) ? c.call(m) : x);
          return "/" + y + "/" + E;
        }, { unsafe: !0 });
      },
      "2ca0": function(r, s, e) {
        var l = e("23e7"), a = e("06cf").f, u = e("50c4"), c = e("5a34"), d = e("1d80"), f = e("ab13"), h = e("c430"), g = "".startsWith, p = Math.min, v = f("startsWith"), m = !h && !v && !!function() {
          var y = a(String.prototype, "startsWith");
          return y && !y.writable;
        }();
        l({ target: "String", proto: !0, forced: !m && !v }, {
          startsWith: function(x) {
            var E = String(d(this));
            c(x);
            var P = u(p(arguments.length > 1 ? arguments[1] : void 0, E.length)), T = String(x);
            return g ? g.call(E, T, P) : E.slice(P, P + T.length) === T;
          }
        });
      },
      "2d00": function(r, s, e) {
        var l = e("da84"), a = e("342f"), u = l.process, c = u && u.versions, d = c && c.v8, f, h;
        d ? (f = d.split("."), h = f[0] + f[1]) : a && (f = a.match(/Edge\/(\d+)/), (!f || f[1] >= 74) && (f = a.match(/Chrome\/(\d+)/), f && (h = f[1]))), r.exports = h && +h;
      },
      "342f": function(r, s, e) {
        var l = e("d066");
        r.exports = l("navigator", "userAgent") || "";
      },
      "35a1": function(r, s, e) {
        var l = e("f5df"), a = e("3f8c"), u = e("b622"), c = u("iterator");
        r.exports = function(d) {
          if (d != null)
            return d[c] || d["@@iterator"] || a[l(d)];
        };
      },
      "37e8": function(r, s, e) {
        var l = e("83ab"), a = e("9bf2"), u = e("825a"), c = e("df75");
        r.exports = l ? Object.defineProperties : function(f, h) {
          u(f);
          for (var g = c(h), p = g.length, v = 0, m; p > v; )
            a.f(f, m = g[v++], h[m]);
          return f;
        };
      },
      "3bbe": function(r, s, e) {
        var l = e("861d");
        r.exports = function(a) {
          if (!l(a) && a !== null)
            throw TypeError("Can't set " + String(a) + " as a prototype");
          return a;
        };
      },
      "3ca3": function(r, s, e) {
        var l = e("6547").charAt, a = e("69f3"), u = e("7dd0"), c = "String Iterator", d = a.set, f = a.getterFor(c);
        u(String, "String", function(h) {
          d(this, {
            type: c,
            string: String(h),
            index: 0
          });
        }, function() {
          var g = f(this), p = g.string, v = g.index, m;
          return v >= p.length ? { value: void 0, done: !0 } : (m = l(p, v), g.index += m.length, { value: m, done: !1 });
        });
      },
      "3f8c": function(r, s) {
        r.exports = {};
      },
      4160: function(r, s, e) {
        var l = e("23e7"), a = e("17c2");
        l({ target: "Array", proto: !0, forced: [].forEach != a }, {
          forEach: a
        });
      },
      "428f": function(r, s, e) {
        var l = e("da84");
        r.exports = l;
      },
      "44ad": function(r, s, e) {
        var l = e("d039"), a = e("c6b6"), u = "".split;
        r.exports = l(function() {
          return !Object("z").propertyIsEnumerable(0);
        }) ? function(c) {
          return a(c) == "String" ? u.call(c, "") : Object(c);
        } : Object;
      },
      "44d2": function(r, s, e) {
        var l = e("b622"), a = e("7c73"), u = e("9bf2"), c = l("unscopables"), d = Array.prototype;
        d[c] == null && u.f(d, c, {
          configurable: !0,
          value: a(null)
        }), r.exports = function(f) {
          d[c][f] = !0;
        };
      },
      "44e7": function(r, s, e) {
        var l = e("861d"), a = e("c6b6"), u = e("b622"), c = u("match");
        r.exports = function(d) {
          var f;
          return l(d) && ((f = d[c]) !== void 0 ? !!f : a(d) == "RegExp");
        };
      },
      4930: function(r, s, e) {
        var l = e("d039");
        r.exports = !!Object.getOwnPropertySymbols && !l(function() {
          return !String(Symbol());
        });
      },
      "4d64": function(r, s, e) {
        var l = e("fc6a"), a = e("50c4"), u = e("23cb"), c = function(d) {
          return function(f, h, g) {
            var p = l(f), v = a(p.length), m = u(g, v), y;
            if (d && h != h) {
              for (; v > m; )
                if (y = p[m++], y != y)
                  return !0;
            } else
              for (; v > m; m++)
                if ((d || m in p) && p[m] === h)
                  return d || m || 0;
            return !d && -1;
          };
        };
        r.exports = {
          includes: c(!0),
          indexOf: c(!1)
        };
      },
      "4de4": function(r, s, e) {
        var l = e("23e7"), a = e("b727").filter, u = e("1dde"), c = e("ae40"), d = u("filter"), f = c("filter");
        l({ target: "Array", proto: !0, forced: !d || !f }, {
          filter: function(g) {
            return a(this, g, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "4df4": function(r, s, e) {
        var l = e("0366"), a = e("7b0b"), u = e("9bdd"), c = e("e95a"), d = e("50c4"), f = e("8418"), h = e("35a1");
        r.exports = function(p) {
          var v = a(p), m = typeof this == "function" ? this : Array, y = arguments.length, x = y > 1 ? arguments[1] : void 0, E = x !== void 0, P = h(v), T = 0, U, K, A, F, G, V;
          if (E && (x = l(x, y > 2 ? arguments[2] : void 0, 2)), P != null && !(m == Array && c(P)))
            for (F = P.call(v), G = F.next, K = new m(); !(A = G.call(F)).done; T++)
              V = E ? u(F, x, [A.value, T], !0) : A.value, f(K, T, V);
          else
            for (U = d(v.length), K = new m(U); U > T; T++)
              V = E ? x(v[T], T) : v[T], f(K, T, V);
          return K.length = T, K;
        };
      },
      "4fad": function(r, s, e) {
        var l = e("23e7"), a = e("6f53").entries;
        l({ target: "Object", stat: !0 }, {
          entries: function(c) {
            return a(c);
          }
        });
      },
      "50c4": function(r, s, e) {
        var l = e("a691"), a = Math.min;
        r.exports = function(u) {
          return u > 0 ? a(l(u), 9007199254740991) : 0;
        };
      },
      5135: function(r, s) {
        var e = {}.hasOwnProperty;
        r.exports = function(l, a) {
          return e.call(l, a);
        };
      },
      5319: function(r, s, e) {
        var l = e("d784"), a = e("825a"), u = e("7b0b"), c = e("50c4"), d = e("a691"), f = e("1d80"), h = e("8aa5"), g = e("14c3"), p = Math.max, v = Math.min, m = Math.floor, y = /\$([$&'`]|\d\d?|<[^>]*>)/g, x = /\$([$&'`]|\d\d?)/g, E = function(P) {
          return P === void 0 ? P : String(P);
        };
        l("replace", 2, function(P, T, U, K) {
          var A = K.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, F = K.REPLACE_KEEPS_$0, G = A ? "$" : "$0";
          return [
            function(k, q) {
              var z = f(this), J = k == null ? void 0 : k[P];
              return J !== void 0 ? J.call(k, z, q) : T.call(String(z), k, q);
            },
            function(N, k) {
              if (!A && F || typeof k == "string" && k.indexOf(G) === -1) {
                var q = U(T, N, this, k);
                if (q.done)
                  return q.value;
              }
              var z = a(N), J = String(this), ue = typeof k == "function";
              ue || (k = String(k));
              var he = z.global;
              if (he) {
                var De = z.unicode;
                z.lastIndex = 0;
              }
              for (var de = []; ; ) {
                var Se = g(z, J);
                if (Se === null || (de.push(Se), !he))
                  break;
                var $e = String(Se[0]);
                $e === "" && (z.lastIndex = h(J, c(z.lastIndex), De));
              }
              for (var ze = "", Ae = 0, we = 0; we < de.length; we++) {
                Se = de[we];
                for (var Ee = String(Se[0]), We = p(v(d(Se.index), J.length), 0), Be = [], vt = 1; vt < Se.length; vt++)
                  Be.push(E(Se[vt]));
                var St = Se.groups;
                if (ue) {
                  var ht = [Ee].concat(Be, We, J);
                  St !== void 0 && ht.push(St);
                  var Ue = String(k.apply(void 0, ht));
                } else
                  Ue = V(Ee, J, We, Be, St, k);
                We >= Ae && (ze += J.slice(Ae, We) + Ue, Ae = We + Ee.length);
              }
              return ze + J.slice(Ae);
            }
          ];
          function V(N, k, q, z, J, ue) {
            var he = q + N.length, De = z.length, de = x;
            return J !== void 0 && (J = u(J), de = y), T.call(ue, de, function(Se, $e) {
              var ze;
              switch ($e.charAt(0)) {
                case "$":
                  return "$";
                case "&":
                  return N;
                case "`":
                  return k.slice(0, q);
                case "'":
                  return k.slice(he);
                case "<":
                  ze = J[$e.slice(1, -1)];
                  break;
                default:
                  var Ae = +$e;
                  if (Ae === 0)
                    return Se;
                  if (Ae > De) {
                    var we = m(Ae / 10);
                    return we === 0 ? Se : we <= De ? z[we - 1] === void 0 ? $e.charAt(1) : z[we - 1] + $e.charAt(1) : Se;
                  }
                  ze = z[Ae - 1];
              }
              return ze === void 0 ? "" : ze;
            });
          }
        });
      },
      5692: function(r, s, e) {
        var l = e("c430"), a = e("c6cd");
        (r.exports = function(u, c) {
          return a[u] || (a[u] = c !== void 0 ? c : {});
        })("versions", []).push({
          version: "3.6.5",
          mode: l ? "pure" : "global",
          copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)"
        });
      },
      "56ef": function(r, s, e) {
        var l = e("d066"), a = e("241c"), u = e("7418"), c = e("825a");
        r.exports = l("Reflect", "ownKeys") || function(f) {
          var h = a.f(c(f)), g = u.f;
          return g ? h.concat(g(f)) : h;
        };
      },
      "5a34": function(r, s, e) {
        var l = e("44e7");
        r.exports = function(a) {
          if (l(a))
            throw TypeError("The method doesn't accept regular expressions");
          return a;
        };
      },
      "5c6c": function(r, s) {
        r.exports = function(e, l) {
          return {
            enumerable: !(e & 1),
            configurable: !(e & 2),
            writable: !(e & 4),
            value: l
          };
        };
      },
      "5db7": function(r, s, e) {
        var l = e("23e7"), a = e("a2bf"), u = e("7b0b"), c = e("50c4"), d = e("1c0b"), f = e("65f0");
        l({ target: "Array", proto: !0 }, {
          flatMap: function(g) {
            var p = u(this), v = c(p.length), m;
            return d(g), m = f(p, 0), m.length = a(m, p, p, v, 0, 1, g, arguments.length > 1 ? arguments[1] : void 0), m;
          }
        });
      },
      6547: function(r, s, e) {
        var l = e("a691"), a = e("1d80"), u = function(c) {
          return function(d, f) {
            var h = String(a(d)), g = l(f), p = h.length, v, m;
            return g < 0 || g >= p ? c ? "" : void 0 : (v = h.charCodeAt(g), v < 55296 || v > 56319 || g + 1 === p || (m = h.charCodeAt(g + 1)) < 56320 || m > 57343 ? c ? h.charAt(g) : v : c ? h.slice(g, g + 2) : (v - 55296 << 10) + (m - 56320) + 65536);
          };
        };
        r.exports = {
          codeAt: u(!1),
          charAt: u(!0)
        };
      },
      "65f0": function(r, s, e) {
        var l = e("861d"), a = e("e8b5"), u = e("b622"), c = u("species");
        r.exports = function(d, f) {
          var h;
          return a(d) && (h = d.constructor, typeof h == "function" && (h === Array || a(h.prototype)) ? h = void 0 : l(h) && (h = h[c], h === null && (h = void 0))), new (h === void 0 ? Array : h)(f === 0 ? 0 : f);
        };
      },
      "69f3": function(r, s, e) {
        var l = e("7f9a"), a = e("da84"), u = e("861d"), c = e("9112"), d = e("5135"), f = e("f772"), h = e("d012"), g = a.WeakMap, p, v, m, y = function(A) {
          return m(A) ? v(A) : p(A, {});
        }, x = function(A) {
          return function(F) {
            var G;
            if (!u(F) || (G = v(F)).type !== A)
              throw TypeError("Incompatible receiver, " + A + " required");
            return G;
          };
        };
        if (l) {
          var E = new g(), P = E.get, T = E.has, U = E.set;
          p = function(A, F) {
            return U.call(E, A, F), F;
          }, v = function(A) {
            return P.call(E, A) || {};
          }, m = function(A) {
            return T.call(E, A);
          };
        } else {
          var K = f("state");
          h[K] = !0, p = function(A, F) {
            return c(A, K, F), F;
          }, v = function(A) {
            return d(A, K) ? A[K] : {};
          }, m = function(A) {
            return d(A, K);
          };
        }
        r.exports = {
          set: p,
          get: v,
          has: m,
          enforce: y,
          getterFor: x
        };
      },
      "6eeb": function(r, s, e) {
        var l = e("da84"), a = e("9112"), u = e("5135"), c = e("ce4e"), d = e("8925"), f = e("69f3"), h = f.get, g = f.enforce, p = String(String).split("String");
        (r.exports = function(v, m, y, x) {
          var E = x ? !!x.unsafe : !1, P = x ? !!x.enumerable : !1, T = x ? !!x.noTargetGet : !1;
          if (typeof y == "function" && (typeof m == "string" && !u(y, "name") && a(y, "name", m), g(y).source = p.join(typeof m == "string" ? m : "")), v === l) {
            P ? v[m] = y : c(m, y);
            return;
          } else
            E ? !T && v[m] && (P = !0) : delete v[m];
          P ? v[m] = y : a(v, m, y);
        })(Function.prototype, "toString", function() {
          return typeof this == "function" && h(this).source || d(this);
        });
      },
      "6f53": function(r, s, e) {
        var l = e("83ab"), a = e("df75"), u = e("fc6a"), c = e("d1e7").f, d = function(f) {
          return function(h) {
            for (var g = u(h), p = a(g), v = p.length, m = 0, y = [], x; v > m; )
              x = p[m++], (!l || c.call(g, x)) && y.push(f ? [x, g[x]] : g[x]);
            return y;
          };
        };
        r.exports = {
          entries: d(!0),
          values: d(!1)
        };
      },
      "73d9": function(r, s, e) {
        var l = e("44d2");
        l("flatMap");
      },
      7418: function(r, s) {
        s.f = Object.getOwnPropertySymbols;
      },
      "746f": function(r, s, e) {
        var l = e("428f"), a = e("5135"), u = e("e538"), c = e("9bf2").f;
        r.exports = function(d) {
          var f = l.Symbol || (l.Symbol = {});
          a(f, d) || c(f, d, {
            value: u.f(d)
          });
        };
      },
      7839: function(r, s) {
        r.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf"
        ];
      },
      "7b0b": function(r, s, e) {
        var l = e("1d80");
        r.exports = function(a) {
          return Object(l(a));
        };
      },
      "7c73": function(r, s, e) {
        var l = e("825a"), a = e("37e8"), u = e("7839"), c = e("d012"), d = e("1be4"), f = e("cc12"), h = e("f772"), g = ">", p = "<", v = "prototype", m = "script", y = h("IE_PROTO"), x = function() {
        }, E = function(A) {
          return p + m + g + A + p + "/" + m + g;
        }, P = function(A) {
          A.write(E("")), A.close();
          var F = A.parentWindow.Object;
          return A = null, F;
        }, T = function() {
          var A = f("iframe"), F = "java" + m + ":", G;
          return A.style.display = "none", d.appendChild(A), A.src = String(F), G = A.contentWindow.document, G.open(), G.write(E("document.F=Object")), G.close(), G.F;
        }, U, K = function() {
          try {
            U = document.domain && new ActiveXObject("htmlfile");
          } catch {
          }
          K = U ? P(U) : T();
          for (var A = u.length; A--; )
            delete K[v][u[A]];
          return K();
        };
        c[y] = !0, r.exports = Object.create || function(F, G) {
          var V;
          return F !== null ? (x[v] = l(F), V = new x(), x[v] = null, V[y] = F) : V = K(), G === void 0 ? V : a(V, G);
        };
      },
      "7dd0": function(r, s, e) {
        var l = e("23e7"), a = e("9ed3"), u = e("e163"), c = e("d2bb"), d = e("d44e"), f = e("9112"), h = e("6eeb"), g = e("b622"), p = e("c430"), v = e("3f8c"), m = e("ae93"), y = m.IteratorPrototype, x = m.BUGGY_SAFARI_ITERATORS, E = g("iterator"), P = "keys", T = "values", U = "entries", K = function() {
          return this;
        };
        r.exports = function(A, F, G, V, N, k, q) {
          a(G, F, V);
          var z = function(we) {
            if (we === N && de)
              return de;
            if (!x && we in he)
              return he[we];
            switch (we) {
              case P:
                return function() {
                  return new G(this, we);
                };
              case T:
                return function() {
                  return new G(this, we);
                };
              case U:
                return function() {
                  return new G(this, we);
                };
            }
            return function() {
              return new G(this);
            };
          }, J = F + " Iterator", ue = !1, he = A.prototype, De = he[E] || he["@@iterator"] || N && he[N], de = !x && De || z(N), Se = F == "Array" && he.entries || De, $e, ze, Ae;
          if (Se && ($e = u(Se.call(new A())), y !== Object.prototype && $e.next && (!p && u($e) !== y && (c ? c($e, y) : typeof $e[E] != "function" && f($e, E, K)), d($e, J, !0, !0), p && (v[J] = K))), N == T && De && De.name !== T && (ue = !0, de = function() {
            return De.call(this);
          }), (!p || q) && he[E] !== de && f(he, E, de), v[F] = de, N)
            if (ze = {
              values: z(T),
              keys: k ? de : z(P),
              entries: z(U)
            }, q)
              for (Ae in ze)
                (x || ue || !(Ae in he)) && h(he, Ae, ze[Ae]);
            else
              l({ target: F, proto: !0, forced: x || ue }, ze);
          return ze;
        };
      },
      "7f9a": function(r, s, e) {
        var l = e("da84"), a = e("8925"), u = l.WeakMap;
        r.exports = typeof u == "function" && /native code/.test(a(u));
      },
      "825a": function(r, s, e) {
        var l = e("861d");
        r.exports = function(a) {
          if (!l(a))
            throw TypeError(String(a) + " is not an object");
          return a;
        };
      },
      "83ab": function(r, s, e) {
        var l = e("d039");
        r.exports = !l(function() {
          return Object.defineProperty({}, 1, { get: function() {
            return 7;
          } })[1] != 7;
        });
      },
      8418: function(r, s, e) {
        var l = e("c04e"), a = e("9bf2"), u = e("5c6c");
        r.exports = function(c, d, f) {
          var h = l(d);
          h in c ? a.f(c, h, u(0, f)) : c[h] = f;
        };
      },
      "861d": function(r, s) {
        r.exports = function(e) {
          return typeof e == "object" ? e !== null : typeof e == "function";
        };
      },
      8875: function(r, s, e) {
        var l, a, u;
        (function(c, d) {
          a = [], l = d, u = typeof l == "function" ? l.apply(s, a) : l, u !== void 0 && (r.exports = u);
        })(typeof self < "u" ? self : this, function() {
          function c() {
            var d = Object.getOwnPropertyDescriptor(document, "currentScript");
            if (!d && "currentScript" in document && document.currentScript || d && d.get !== c && document.currentScript)
              return document.currentScript;
            try {
              throw new Error();
            } catch (U) {
              var f = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, h = /@([^@]*):(\d+):(\d+)\s*$/ig, g = f.exec(U.stack) || h.exec(U.stack), p = g && g[1] || !1, v = g && g[2] || !1, m = document.location.href.replace(document.location.hash, ""), y, x, E, P = document.getElementsByTagName("script");
              p === m && (y = document.documentElement.outerHTML, x = new RegExp("(?:[^\\n]+?\\n){0," + (v - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), E = y.replace(x, "$1").trim());
              for (var T = 0; T < P.length; T++)
                if (P[T].readyState === "interactive" || P[T].src === p || p === m && P[T].innerHTML && P[T].innerHTML.trim() === E)
                  return P[T];
              return null;
            }
          }
          return c;
        });
      },
      8925: function(r, s, e) {
        var l = e("c6cd"), a = Function.toString;
        typeof l.inspectSource != "function" && (l.inspectSource = function(u) {
          return a.call(u);
        }), r.exports = l.inspectSource;
      },
      "8aa5": function(r, s, e) {
        var l = e("6547").charAt;
        r.exports = function(a, u, c) {
          return u + (c ? l(a, u).length : 1);
        };
      },
      "8bbf": function(r, s) {
        r.exports = o;
      },
      "90e3": function(r, s) {
        var e = 0, l = Math.random();
        r.exports = function(a) {
          return "Symbol(" + String(a === void 0 ? "" : a) + ")_" + (++e + l).toString(36);
        };
      },
      9112: function(r, s, e) {
        var l = e("83ab"), a = e("9bf2"), u = e("5c6c");
        r.exports = l ? function(c, d, f) {
          return a.f(c, d, u(1, f));
        } : function(c, d, f) {
          return c[d] = f, c;
        };
      },
      9263: function(r, s, e) {
        var l = e("ad6d"), a = e("9f7f"), u = RegExp.prototype.exec, c = String.prototype.replace, d = u, f = function() {
          var v = /a/, m = /b*/g;
          return u.call(v, "a"), u.call(m, "a"), v.lastIndex !== 0 || m.lastIndex !== 0;
        }(), h = a.UNSUPPORTED_Y || a.BROKEN_CARET, g = /()??/.exec("")[1] !== void 0, p = f || g || h;
        p && (d = function(m) {
          var y = this, x, E, P, T, U = h && y.sticky, K = l.call(y), A = y.source, F = 0, G = m;
          return U && (K = K.replace("y", ""), K.indexOf("g") === -1 && (K += "g"), G = String(m).slice(y.lastIndex), y.lastIndex > 0 && (!y.multiline || y.multiline && m[y.lastIndex - 1] !== `
`) && (A = "(?: " + A + ")", G = " " + G, F++), E = new RegExp("^(?:" + A + ")", K)), g && (E = new RegExp("^" + A + "$(?!\\s)", K)), f && (x = y.lastIndex), P = u.call(U ? E : y, G), U ? P ? (P.input = P.input.slice(F), P[0] = P[0].slice(F), P.index = y.lastIndex, y.lastIndex += P[0].length) : y.lastIndex = 0 : f && P && (y.lastIndex = y.global ? P.index + P[0].length : x), g && P && P.length > 1 && c.call(P[0], E, function() {
            for (T = 1; T < arguments.length - 2; T++)
              arguments[T] === void 0 && (P[T] = void 0);
          }), P;
        }), r.exports = d;
      },
      "94ca": function(r, s, e) {
        var l = e("d039"), a = /#|\.prototype\./, u = function(g, p) {
          var v = d[c(g)];
          return v == h ? !0 : v == f ? !1 : typeof p == "function" ? l(p) : !!p;
        }, c = u.normalize = function(g) {
          return String(g).replace(a, ".").toLowerCase();
        }, d = u.data = {}, f = u.NATIVE = "N", h = u.POLYFILL = "P";
        r.exports = u;
      },
      "99af": function(r, s, e) {
        var l = e("23e7"), a = e("d039"), u = e("e8b5"), c = e("861d"), d = e("7b0b"), f = e("50c4"), h = e("8418"), g = e("65f0"), p = e("1dde"), v = e("b622"), m = e("2d00"), y = v("isConcatSpreadable"), x = 9007199254740991, E = "Maximum allowed index exceeded", P = m >= 51 || !a(function() {
          var A = [];
          return A[y] = !1, A.concat()[0] !== A;
        }), T = p("concat"), U = function(A) {
          if (!c(A))
            return !1;
          var F = A[y];
          return F !== void 0 ? !!F : u(A);
        }, K = !P || !T;
        l({ target: "Array", proto: !0, forced: K }, {
          concat: function(F) {
            var G = d(this), V = g(G, 0), N = 0, k, q, z, J, ue;
            for (k = -1, z = arguments.length; k < z; k++)
              if (ue = k === -1 ? G : arguments[k], U(ue)) {
                if (J = f(ue.length), N + J > x)
                  throw TypeError(E);
                for (q = 0; q < J; q++, N++)
                  q in ue && h(V, N, ue[q]);
              } else {
                if (N >= x)
                  throw TypeError(E);
                h(V, N++, ue);
              }
            return V.length = N, V;
          }
        });
      },
      "9bdd": function(r, s, e) {
        var l = e("825a");
        r.exports = function(a, u, c, d) {
          try {
            return d ? u(l(c)[0], c[1]) : u(c);
          } catch (h) {
            var f = a.return;
            throw f !== void 0 && l(f.call(a)), h;
          }
        };
      },
      "9bf2": function(r, s, e) {
        var l = e("83ab"), a = e("0cfb"), u = e("825a"), c = e("c04e"), d = Object.defineProperty;
        s.f = l ? d : function(h, g, p) {
          if (u(h), g = c(g, !0), u(p), a)
            try {
              return d(h, g, p);
            } catch {
            }
          if ("get" in p || "set" in p)
            throw TypeError("Accessors not supported");
          return "value" in p && (h[g] = p.value), h;
        };
      },
      "9ed3": function(r, s, e) {
        var l = e("ae93").IteratorPrototype, a = e("7c73"), u = e("5c6c"), c = e("d44e"), d = e("3f8c"), f = function() {
          return this;
        };
        r.exports = function(h, g, p) {
          var v = g + " Iterator";
          return h.prototype = a(l, { next: u(1, p) }), c(h, v, !1, !0), d[v] = f, h;
        };
      },
      "9f7f": function(r, s, e) {
        var l = e("d039");
        function a(u, c) {
          return RegExp(u, c);
        }
        s.UNSUPPORTED_Y = l(function() {
          var u = a("a", "y");
          return u.lastIndex = 2, u.exec("abcd") != null;
        }), s.BROKEN_CARET = l(function() {
          var u = a("^r", "gy");
          return u.lastIndex = 2, u.exec("str") != null;
        });
      },
      a2bf: function(r, s, e) {
        var l = e("e8b5"), a = e("50c4"), u = e("0366"), c = function(d, f, h, g, p, v, m, y) {
          for (var x = p, E = 0, P = m ? u(m, y, 3) : !1, T; E < g; ) {
            if (E in h) {
              if (T = P ? P(h[E], E, f) : h[E], v > 0 && l(T))
                x = c(d, f, T, a(T.length), x, v - 1) - 1;
              else {
                if (x >= 9007199254740991)
                  throw TypeError("Exceed the acceptable array length");
                d[x] = T;
              }
              x++;
            }
            E++;
          }
          return x;
        };
        r.exports = c;
      },
      a352: function(r, s) {
        r.exports = i;
      },
      a434: function(r, s, e) {
        var l = e("23e7"), a = e("23cb"), u = e("a691"), c = e("50c4"), d = e("7b0b"), f = e("65f0"), h = e("8418"), g = e("1dde"), p = e("ae40"), v = g("splice"), m = p("splice", { ACCESSORS: !0, 0: 0, 1: 2 }), y = Math.max, x = Math.min, E = 9007199254740991, P = "Maximum allowed length exceeded";
        l({ target: "Array", proto: !0, forced: !v || !m }, {
          splice: function(U, K) {
            var A = d(this), F = c(A.length), G = a(U, F), V = arguments.length, N, k, q, z, J, ue;
            if (V === 0 ? N = k = 0 : V === 1 ? (N = 0, k = F - G) : (N = V - 2, k = x(y(u(K), 0), F - G)), F + N - k > E)
              throw TypeError(P);
            for (q = f(A, k), z = 0; z < k; z++)
              J = G + z, J in A && h(q, z, A[J]);
            if (q.length = k, N < k) {
              for (z = G; z < F - k; z++)
                J = z + k, ue = z + N, J in A ? A[ue] = A[J] : delete A[ue];
              for (z = F; z > F - k + N; z--)
                delete A[z - 1];
            } else if (N > k)
              for (z = F - k; z > G; z--)
                J = z + k - 1, ue = z + N - 1, J in A ? A[ue] = A[J] : delete A[ue];
            for (z = 0; z < N; z++)
              A[z + G] = arguments[z + 2];
            return A.length = F - k + N, q;
          }
        });
      },
      a4d3: function(r, s, e) {
        var l = e("23e7"), a = e("da84"), u = e("d066"), c = e("c430"), d = e("83ab"), f = e("4930"), h = e("fdbf"), g = e("d039"), p = e("5135"), v = e("e8b5"), m = e("861d"), y = e("825a"), x = e("7b0b"), E = e("fc6a"), P = e("c04e"), T = e("5c6c"), U = e("7c73"), K = e("df75"), A = e("241c"), F = e("057f"), G = e("7418"), V = e("06cf"), N = e("9bf2"), k = e("d1e7"), q = e("9112"), z = e("6eeb"), J = e("5692"), ue = e("f772"), he = e("d012"), De = e("90e3"), de = e("b622"), Se = e("e538"), $e = e("746f"), ze = e("d44e"), Ae = e("69f3"), we = e("b727").forEach, Ee = ue("hidden"), We = "Symbol", Be = "prototype", vt = de("toPrimitive"), St = Ae.set, ht = Ae.getterFor(We), Ue = Object[Be], Ve = a.Symbol, wt = u("JSON", "stringify"), lt = V.f, tt = N.f, Ut = F.f, _t = k.f, rt = J("symbols"), O = J("op-symbols"), M = J("string-to-symbol-registry"), D = J("symbol-to-string-registry"), Y = J("wks"), L = a.QObject, ye = !L || !L[Be] || !L[Be].findChild, Re = d && g(function() {
          return U(tt({}, "a", {
            get: function() {
              return tt(this, "a", { value: 7 }).a;
            }
          })).a != 7;
        }) ? function(re, Q, _) {
          var ve = lt(Ue, Q);
          ve && delete Ue[Q], tt(re, Q, _), ve && re !== Ue && tt(Ue, Q, ve);
        } : tt, it = function(re, Q) {
          var _ = rt[re] = U(Ve[Be]);
          return St(_, {
            type: We,
            tag: re,
            description: Q
          }), d || (_.description = Q), _;
        }, S = h ? function(re) {
          return typeof re == "symbol";
        } : function(re) {
          return Object(re) instanceof Ve;
        }, w = function(Q, _, ve) {
          Q === Ue && w(O, _, ve), y(Q);
          var pe = P(_, !0);
          return y(ve), p(rt, pe) ? (ve.enumerable ? (p(Q, Ee) && Q[Ee][pe] && (Q[Ee][pe] = !1), ve = U(ve, { enumerable: T(0, !1) })) : (p(Q, Ee) || tt(Q, Ee, T(1, {})), Q[Ee][pe] = !0), Re(Q, pe, ve)) : tt(Q, pe, ve);
        }, C = function(Q, _) {
          y(Q);
          var ve = E(_), pe = K(ve).concat(ge(ve));
          return we(pe, function(Ze) {
            (!d || H.call(ve, Ze)) && w(Q, Ze, ve[Ze]);
          }), Q;
        }, R = function(Q, _) {
          return _ === void 0 ? U(Q) : C(U(Q), _);
        }, H = function(Q) {
          var _ = P(Q, !0), ve = _t.call(this, _);
          return this === Ue && p(rt, _) && !p(O, _) ? !1 : ve || !p(this, _) || !p(rt, _) || p(this, Ee) && this[Ee][_] ? ve : !0;
        }, te = function(Q, _) {
          var ve = E(Q), pe = P(_, !0);
          if (!(ve === Ue && p(rt, pe) && !p(O, pe))) {
            var Ze = lt(ve, pe);
            return Ze && p(rt, pe) && !(p(ve, Ee) && ve[Ee][pe]) && (Ze.enumerable = !0), Ze;
          }
        }, le = function(Q) {
          var _ = Ut(E(Q)), ve = [];
          return we(_, function(pe) {
            !p(rt, pe) && !p(he, pe) && ve.push(pe);
          }), ve;
        }, ge = function(Q) {
          var _ = Q === Ue, ve = Ut(_ ? O : E(Q)), pe = [];
          return we(ve, function(Ze) {
            p(rt, Ze) && (!_ || p(Ue, Ze)) && pe.push(rt[Ze]);
          }), pe;
        };
        if (f || (Ve = function() {
          if (this instanceof Ve)
            throw TypeError("Symbol is not a constructor");
          var Q = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]), _ = De(Q), ve = function(pe) {
            this === Ue && ve.call(O, pe), p(this, Ee) && p(this[Ee], _) && (this[Ee][_] = !1), Re(this, _, T(1, pe));
          };
          return d && ye && Re(Ue, _, { configurable: !0, set: ve }), it(_, Q);
        }, z(Ve[Be], "toString", function() {
          return ht(this).tag;
        }), z(Ve, "withoutSetter", function(re) {
          return it(De(re), re);
        }), k.f = H, N.f = w, V.f = te, A.f = F.f = le, G.f = ge, Se.f = function(re) {
          return it(de(re), re);
        }, d && (tt(Ve[Be], "description", {
          configurable: !0,
          get: function() {
            return ht(this).description;
          }
        }), c || z(Ue, "propertyIsEnumerable", H, { unsafe: !0 }))), l({ global: !0, wrap: !0, forced: !f, sham: !f }, {
          Symbol: Ve
        }), we(K(Y), function(re) {
          $e(re);
        }), l({ target: We, stat: !0, forced: !f }, {
          for: function(re) {
            var Q = String(re);
            if (p(M, Q))
              return M[Q];
            var _ = Ve(Q);
            return M[Q] = _, D[_] = Q, _;
          },
          keyFor: function(Q) {
            if (!S(Q))
              throw TypeError(Q + " is not a symbol");
            if (p(D, Q))
              return D[Q];
          },
          useSetter: function() {
            ye = !0;
          },
          useSimple: function() {
            ye = !1;
          }
        }), l({ target: "Object", stat: !0, forced: !f, sham: !d }, {
          create: R,
          defineProperty: w,
          defineProperties: C,
          getOwnPropertyDescriptor: te
        }), l({ target: "Object", stat: !0, forced: !f }, {
          getOwnPropertyNames: le,
          getOwnPropertySymbols: ge
        }), l({ target: "Object", stat: !0, forced: g(function() {
          G.f(1);
        }) }, {
          getOwnPropertySymbols: function(Q) {
            return G.f(x(Q));
          }
        }), wt) {
          var Fe = !f || g(function() {
            var re = Ve();
            return wt([re]) != "[null]" || wt({ a: re }) != "{}" || wt(Object(re)) != "{}";
          });
          l({ target: "JSON", stat: !0, forced: Fe }, {
            stringify: function(Q, _, ve) {
              for (var pe = [Q], Ze = 1, Fr; arguments.length > Ze; )
                pe.push(arguments[Ze++]);
              if (Fr = _, !(!m(_) && Q === void 0 || S(Q)))
                return v(_) || (_ = function(Zn, gr) {
                  if (typeof Fr == "function" && (gr = Fr.call(this, Zn, gr)), !S(gr))
                    return gr;
                }), pe[1] = _, wt.apply(null, pe);
            }
          });
        }
        Ve[Be][vt] || q(Ve[Be], vt, Ve[Be].valueOf), ze(Ve, We), he[Ee] = !0;
      },
      a630: function(r, s, e) {
        var l = e("23e7"), a = e("4df4"), u = e("1c7e"), c = !u(function(d) {
          Array.from(d);
        });
        l({ target: "Array", stat: !0, forced: c }, {
          from: a
        });
      },
      a640: function(r, s, e) {
        var l = e("d039");
        r.exports = function(a, u) {
          var c = [][a];
          return !!c && l(function() {
            c.call(null, u || function() {
              throw 1;
            }, 1);
          });
        };
      },
      a691: function(r, s) {
        var e = Math.ceil, l = Math.floor;
        r.exports = function(a) {
          return isNaN(a = +a) ? 0 : (a > 0 ? l : e)(a);
        };
      },
      ab13: function(r, s, e) {
        var l = e("b622"), a = l("match");
        r.exports = function(u) {
          var c = /./;
          try {
            "/./"[u](c);
          } catch {
            try {
              return c[a] = !1, "/./"[u](c);
            } catch {
            }
          }
          return !1;
        };
      },
      ac1f: function(r, s, e) {
        var l = e("23e7"), a = e("9263");
        l({ target: "RegExp", proto: !0, forced: /./.exec !== a }, {
          exec: a
        });
      },
      ad6d: function(r, s, e) {
        var l = e("825a");
        r.exports = function() {
          var a = l(this), u = "";
          return a.global && (u += "g"), a.ignoreCase && (u += "i"), a.multiline && (u += "m"), a.dotAll && (u += "s"), a.unicode && (u += "u"), a.sticky && (u += "y"), u;
        };
      },
      ae40: function(r, s, e) {
        var l = e("83ab"), a = e("d039"), u = e("5135"), c = Object.defineProperty, d = {}, f = function(h) {
          throw h;
        };
        r.exports = function(h, g) {
          if (u(d, h))
            return d[h];
          g || (g = {});
          var p = [][h], v = u(g, "ACCESSORS") ? g.ACCESSORS : !1, m = u(g, 0) ? g[0] : f, y = u(g, 1) ? g[1] : void 0;
          return d[h] = !!p && !a(function() {
            if (v && !l)
              return !0;
            var x = { length: -1 };
            v ? c(x, 1, { enumerable: !0, get: f }) : x[1] = 1, p.call(x, m, y);
          });
        };
      },
      ae93: function(r, s, e) {
        var l = e("e163"), a = e("9112"), u = e("5135"), c = e("b622"), d = e("c430"), f = c("iterator"), h = !1, g = function() {
          return this;
        }, p, v, m;
        [].keys && (m = [].keys(), "next" in m ? (v = l(l(m)), v !== Object.prototype && (p = v)) : h = !0), p == null && (p = {}), !d && !u(p, f) && a(p, f, g), r.exports = {
          IteratorPrototype: p,
          BUGGY_SAFARI_ITERATORS: h
        };
      },
      b041: function(r, s, e) {
        var l = e("00ee"), a = e("f5df");
        r.exports = l ? {}.toString : function() {
          return "[object " + a(this) + "]";
        };
      },
      b0c0: function(r, s, e) {
        var l = e("83ab"), a = e("9bf2").f, u = Function.prototype, c = u.toString, d = /^\s*function ([^ (]*)/, f = "name";
        l && !(f in u) && a(u, f, {
          configurable: !0,
          get: function() {
            try {
              return c.call(this).match(d)[1];
            } catch {
              return "";
            }
          }
        });
      },
      b622: function(r, s, e) {
        var l = e("da84"), a = e("5692"), u = e("5135"), c = e("90e3"), d = e("4930"), f = e("fdbf"), h = a("wks"), g = l.Symbol, p = f ? g : g && g.withoutSetter || c;
        r.exports = function(v) {
          return u(h, v) || (d && u(g, v) ? h[v] = g[v] : h[v] = p("Symbol." + v)), h[v];
        };
      },
      b64b: function(r, s, e) {
        var l = e("23e7"), a = e("7b0b"), u = e("df75"), c = e("d039"), d = c(function() {
          u(1);
        });
        l({ target: "Object", stat: !0, forced: d }, {
          keys: function(h) {
            return u(a(h));
          }
        });
      },
      b727: function(r, s, e) {
        var l = e("0366"), a = e("44ad"), u = e("7b0b"), c = e("50c4"), d = e("65f0"), f = [].push, h = function(g) {
          var p = g == 1, v = g == 2, m = g == 3, y = g == 4, x = g == 6, E = g == 5 || x;
          return function(P, T, U, K) {
            for (var A = u(P), F = a(A), G = l(T, U, 3), V = c(F.length), N = 0, k = K || d, q = p ? k(P, V) : v ? k(P, 0) : void 0, z, J; V > N; N++)
              if ((E || N in F) && (z = F[N], J = G(z, N, A), g)) {
                if (p)
                  q[N] = J;
                else if (J)
                  switch (g) {
                    case 3:
                      return !0;
                    case 5:
                      return z;
                    case 6:
                      return N;
                    case 2:
                      f.call(q, z);
                  }
                else if (y)
                  return !1;
              }
            return x ? -1 : m || y ? y : q;
          };
        };
        r.exports = {
          forEach: h(0),
          map: h(1),
          filter: h(2),
          some: h(3),
          every: h(4),
          find: h(5),
          findIndex: h(6)
        };
      },
      c04e: function(r, s, e) {
        var l = e("861d");
        r.exports = function(a, u) {
          if (!l(a))
            return a;
          var c, d;
          if (u && typeof (c = a.toString) == "function" && !l(d = c.call(a)) || typeof (c = a.valueOf) == "function" && !l(d = c.call(a)) || !u && typeof (c = a.toString) == "function" && !l(d = c.call(a)))
            return d;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      c430: function(r, s) {
        r.exports = !1;
      },
      c6b6: function(r, s) {
        var e = {}.toString;
        r.exports = function(l) {
          return e.call(l).slice(8, -1);
        };
      },
      c6cd: function(r, s, e) {
        var l = e("da84"), a = e("ce4e"), u = "__core-js_shared__", c = l[u] || a(u, {});
        r.exports = c;
      },
      c740: function(r, s, e) {
        var l = e("23e7"), a = e("b727").findIndex, u = e("44d2"), c = e("ae40"), d = "findIndex", f = !0, h = c(d);
        d in [] && Array(1)[d](function() {
          f = !1;
        }), l({ target: "Array", proto: !0, forced: f || !h }, {
          findIndex: function(p) {
            return a(this, p, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), u(d);
      },
      c8ba: function(r, s) {
        var e;
        e = function() {
          return this;
        }();
        try {
          e = e || new Function("return this")();
        } catch {
          typeof window == "object" && (e = window);
        }
        r.exports = e;
      },
      c975: function(r, s, e) {
        var l = e("23e7"), a = e("4d64").indexOf, u = e("a640"), c = e("ae40"), d = [].indexOf, f = !!d && 1 / [1].indexOf(1, -0) < 0, h = u("indexOf"), g = c("indexOf", { ACCESSORS: !0, 1: 0 });
        l({ target: "Array", proto: !0, forced: f || !h || !g }, {
          indexOf: function(v) {
            return f ? d.apply(this, arguments) || 0 : a(this, v, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      ca84: function(r, s, e) {
        var l = e("5135"), a = e("fc6a"), u = e("4d64").indexOf, c = e("d012");
        r.exports = function(d, f) {
          var h = a(d), g = 0, p = [], v;
          for (v in h)
            !l(c, v) && l(h, v) && p.push(v);
          for (; f.length > g; )
            l(h, v = f[g++]) && (~u(p, v) || p.push(v));
          return p;
        };
      },
      caad: function(r, s, e) {
        var l = e("23e7"), a = e("4d64").includes, u = e("44d2"), c = e("ae40"), d = c("indexOf", { ACCESSORS: !0, 1: 0 });
        l({ target: "Array", proto: !0, forced: !d }, {
          includes: function(h) {
            return a(this, h, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), u("includes");
      },
      cc12: function(r, s, e) {
        var l = e("da84"), a = e("861d"), u = l.document, c = a(u) && a(u.createElement);
        r.exports = function(d) {
          return c ? u.createElement(d) : {};
        };
      },
      ce4e: function(r, s, e) {
        var l = e("da84"), a = e("9112");
        r.exports = function(u, c) {
          try {
            a(l, u, c);
          } catch {
            l[u] = c;
          }
          return c;
        };
      },
      d012: function(r, s) {
        r.exports = {};
      },
      d039: function(r, s) {
        r.exports = function(e) {
          try {
            return !!e();
          } catch {
            return !0;
          }
        };
      },
      d066: function(r, s, e) {
        var l = e("428f"), a = e("da84"), u = function(c) {
          return typeof c == "function" ? c : void 0;
        };
        r.exports = function(c, d) {
          return arguments.length < 2 ? u(l[c]) || u(a[c]) : l[c] && l[c][d] || a[c] && a[c][d];
        };
      },
      d1e7: function(r, s, e) {
        var l = {}.propertyIsEnumerable, a = Object.getOwnPropertyDescriptor, u = a && !l.call({ 1: 2 }, 1);
        s.f = u ? function(d) {
          var f = a(this, d);
          return !!f && f.enumerable;
        } : l;
      },
      d28b: function(r, s, e) {
        var l = e("746f");
        l("iterator");
      },
      d2bb: function(r, s, e) {
        var l = e("825a"), a = e("3bbe");
        r.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
          var u = !1, c = {}, d;
          try {
            d = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, d.call(c, []), u = c instanceof Array;
          } catch {
          }
          return function(h, g) {
            return l(h), a(g), u ? d.call(h, g) : h.__proto__ = g, h;
          };
        }() : void 0);
      },
      d3b7: function(r, s, e) {
        var l = e("00ee"), a = e("6eeb"), u = e("b041");
        l || a(Object.prototype, "toString", u, { unsafe: !0 });
      },
      d44e: function(r, s, e) {
        var l = e("9bf2").f, a = e("5135"), u = e("b622"), c = u("toStringTag");
        r.exports = function(d, f, h) {
          d && !a(d = h ? d : d.prototype, c) && l(d, c, { configurable: !0, value: f });
        };
      },
      d58f: function(r, s, e) {
        var l = e("1c0b"), a = e("7b0b"), u = e("44ad"), c = e("50c4"), d = function(f) {
          return function(h, g, p, v) {
            l(g);
            var m = a(h), y = u(m), x = c(m.length), E = f ? x - 1 : 0, P = f ? -1 : 1;
            if (p < 2)
              for (; ; ) {
                if (E in y) {
                  v = y[E], E += P;
                  break;
                }
                if (E += P, f ? E < 0 : x <= E)
                  throw TypeError("Reduce of empty array with no initial value");
              }
            for (; f ? E >= 0 : x > E; E += P)
              E in y && (v = g(v, y[E], E, m));
            return v;
          };
        };
        r.exports = {
          left: d(!1),
          right: d(!0)
        };
      },
      d784: function(r, s, e) {
        e("ac1f");
        var l = e("6eeb"), a = e("d039"), u = e("b622"), c = e("9263"), d = e("9112"), f = u("species"), h = !a(function() {
          var y = /./;
          return y.exec = function() {
            var x = [];
            return x.groups = { a: "7" }, x;
          }, "".replace(y, "$<a>") !== "7";
        }), g = function() {
          return "a".replace(/./, "$0") === "$0";
        }(), p = u("replace"), v = function() {
          return /./[p] ? /./[p]("a", "$0") === "" : !1;
        }(), m = !a(function() {
          var y = /(?:)/, x = y.exec;
          y.exec = function() {
            return x.apply(this, arguments);
          };
          var E = "ab".split(y);
          return E.length !== 2 || E[0] !== "a" || E[1] !== "b";
        });
        r.exports = function(y, x, E, P) {
          var T = u(y), U = !a(function() {
            var N = {};
            return N[T] = function() {
              return 7;
            }, ""[y](N) != 7;
          }), K = U && !a(function() {
            var N = !1, k = /a/;
            return y === "split" && (k = {}, k.constructor = {}, k.constructor[f] = function() {
              return k;
            }, k.flags = "", k[T] = /./[T]), k.exec = function() {
              return N = !0, null;
            }, k[T](""), !N;
          });
          if (!U || !K || y === "replace" && !(h && g && !v) || y === "split" && !m) {
            var A = /./[T], F = E(T, ""[y], function(N, k, q, z, J) {
              return k.exec === c ? U && !J ? { done: !0, value: A.call(k, q, z) } : { done: !0, value: N.call(q, k, z) } : { done: !1 };
            }, {
              REPLACE_KEEPS_$0: g,
              REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: v
            }), G = F[0], V = F[1];
            l(String.prototype, y, G), l(
              RegExp.prototype,
              T,
              x == 2 ? function(N, k) {
                return V.call(N, this, k);
              } : function(N) {
                return V.call(N, this);
              }
            );
          }
          P && d(RegExp.prototype[T], "sham", !0);
        };
      },
      d81d: function(r, s, e) {
        var l = e("23e7"), a = e("b727").map, u = e("1dde"), c = e("ae40"), d = u("map"), f = c("map");
        l({ target: "Array", proto: !0, forced: !d || !f }, {
          map: function(g) {
            return a(this, g, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      da84: function(r, s, e) {
        (function(l) {
          var a = function(u) {
            return u && u.Math == Math && u;
          };
          r.exports = a(typeof globalThis == "object" && globalThis) || a(typeof window == "object" && window) || a(typeof self == "object" && self) || a(typeof l == "object" && l) || Function("return this")();
        }).call(this, e("c8ba"));
      },
      dbb4: function(r, s, e) {
        var l = e("23e7"), a = e("83ab"), u = e("56ef"), c = e("fc6a"), d = e("06cf"), f = e("8418");
        l({ target: "Object", stat: !0, sham: !a }, {
          getOwnPropertyDescriptors: function(g) {
            for (var p = c(g), v = d.f, m = u(p), y = {}, x = 0, E, P; m.length > x; )
              P = v(p, E = m[x++]), P !== void 0 && f(y, E, P);
            return y;
          }
        });
      },
      dbf1: function(r, s, e) {
        (function(l) {
          e.d(s, "a", function() {
            return u;
          });
          function a() {
            return typeof window < "u" ? window.console : l.console;
          }
          var u = a();
        }).call(this, e("c8ba"));
      },
      ddb0: function(r, s, e) {
        var l = e("da84"), a = e("fdbc"), u = e("e260"), c = e("9112"), d = e("b622"), f = d("iterator"), h = d("toStringTag"), g = u.values;
        for (var p in a) {
          var v = l[p], m = v && v.prototype;
          if (m) {
            if (m[f] !== g)
              try {
                c(m, f, g);
              } catch {
                m[f] = g;
              }
            if (m[h] || c(m, h, p), a[p]) {
              for (var y in u)
                if (m[y] !== u[y])
                  try {
                    c(m, y, u[y]);
                  } catch {
                    m[y] = u[y];
                  }
            }
          }
        }
      },
      df75: function(r, s, e) {
        var l = e("ca84"), a = e("7839");
        r.exports = Object.keys || function(c) {
          return l(c, a);
        };
      },
      e01a: function(r, s, e) {
        var l = e("23e7"), a = e("83ab"), u = e("da84"), c = e("5135"), d = e("861d"), f = e("9bf2").f, h = e("e893"), g = u.Symbol;
        if (a && typeof g == "function" && (!("description" in g.prototype) || g().description !== void 0)) {
          var p = {}, v = function() {
            var T = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]), U = this instanceof v ? new g(T) : T === void 0 ? g() : g(T);
            return T === "" && (p[U] = !0), U;
          };
          h(v, g);
          var m = v.prototype = g.prototype;
          m.constructor = v;
          var y = m.toString, x = String(g("test")) == "Symbol(test)", E = /^Symbol\((.*)\)[^)]+$/;
          f(m, "description", {
            configurable: !0,
            get: function() {
              var T = d(this) ? this.valueOf() : this, U = y.call(T);
              if (c(p, T))
                return "";
              var K = x ? U.slice(7, -1) : U.replace(E, "$1");
              return K === "" ? void 0 : K;
            }
          }), l({ global: !0, forced: !0 }, {
            Symbol: v
          });
        }
      },
      e163: function(r, s, e) {
        var l = e("5135"), a = e("7b0b"), u = e("f772"), c = e("e177"), d = u("IE_PROTO"), f = Object.prototype;
        r.exports = c ? Object.getPrototypeOf : function(h) {
          return h = a(h), l(h, d) ? h[d] : typeof h.constructor == "function" && h instanceof h.constructor ? h.constructor.prototype : h instanceof Object ? f : null;
        };
      },
      e177: function(r, s, e) {
        var l = e("d039");
        r.exports = !l(function() {
          function a() {
          }
          return a.prototype.constructor = null, Object.getPrototypeOf(new a()) !== a.prototype;
        });
      },
      e260: function(r, s, e) {
        var l = e("fc6a"), a = e("44d2"), u = e("3f8c"), c = e("69f3"), d = e("7dd0"), f = "Array Iterator", h = c.set, g = c.getterFor(f);
        r.exports = d(Array, "Array", function(p, v) {
          h(this, {
            type: f,
            target: l(p),
            index: 0,
            kind: v
          });
        }, function() {
          var p = g(this), v = p.target, m = p.kind, y = p.index++;
          return !v || y >= v.length ? (p.target = void 0, { value: void 0, done: !0 }) : m == "keys" ? { value: y, done: !1 } : m == "values" ? { value: v[y], done: !1 } : { value: [y, v[y]], done: !1 };
        }, "values"), u.Arguments = u.Array, a("keys"), a("values"), a("entries");
      },
      e439: function(r, s, e) {
        var l = e("23e7"), a = e("d039"), u = e("fc6a"), c = e("06cf").f, d = e("83ab"), f = a(function() {
          c(1);
        }), h = !d || f;
        l({ target: "Object", stat: !0, forced: h, sham: !d }, {
          getOwnPropertyDescriptor: function(p, v) {
            return c(u(p), v);
          }
        });
      },
      e538: function(r, s, e) {
        var l = e("b622");
        s.f = l;
      },
      e893: function(r, s, e) {
        var l = e("5135"), a = e("56ef"), u = e("06cf"), c = e("9bf2");
        r.exports = function(d, f) {
          for (var h = a(f), g = c.f, p = u.f, v = 0; v < h.length; v++) {
            var m = h[v];
            l(d, m) || g(d, m, p(f, m));
          }
        };
      },
      e8b5: function(r, s, e) {
        var l = e("c6b6");
        r.exports = Array.isArray || function(u) {
          return l(u) == "Array";
        };
      },
      e95a: function(r, s, e) {
        var l = e("b622"), a = e("3f8c"), u = l("iterator"), c = Array.prototype;
        r.exports = function(d) {
          return d !== void 0 && (a.Array === d || c[u] === d);
        };
      },
      f5df: function(r, s, e) {
        var l = e("00ee"), a = e("c6b6"), u = e("b622"), c = u("toStringTag"), d = a(function() {
          return arguments;
        }()) == "Arguments", f = function(h, g) {
          try {
            return h[g];
          } catch {
          }
        };
        r.exports = l ? a : function(h) {
          var g, p, v;
          return h === void 0 ? "Undefined" : h === null ? "Null" : typeof (p = f(g = Object(h), c)) == "string" ? p : d ? a(g) : (v = a(g)) == "Object" && typeof g.callee == "function" ? "Arguments" : v;
        };
      },
      f772: function(r, s, e) {
        var l = e("5692"), a = e("90e3"), u = l("keys");
        r.exports = function(c) {
          return u[c] || (u[c] = a(c));
        };
      },
      fb15: function(r, s, e) {
        if (e.r(s), typeof window < "u") {
          var l = window.document.currentScript;
          {
            var a = e("8875");
            l = a(), "currentScript" in document || Object.defineProperty(document, "currentScript", { get: a });
          }
          var u = l && l.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
          u && (e.p = u[1]);
        }
        e("99af"), e("4de4"), e("4160"), e("c975"), e("d81d"), e("a434"), e("159b"), e("a4d3"), e("e439"), e("dbb4"), e("b64b");
        function c(S, w, C) {
          return w in S ? Object.defineProperty(S, w, {
            value: C,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : S[w] = C, S;
        }
        function d(S, w) {
          var C = Object.keys(S);
          if (Object.getOwnPropertySymbols) {
            var R = Object.getOwnPropertySymbols(S);
            w && (R = R.filter(function(H) {
              return Object.getOwnPropertyDescriptor(S, H).enumerable;
            })), C.push.apply(C, R);
          }
          return C;
        }
        function f(S) {
          for (var w = 1; w < arguments.length; w++) {
            var C = arguments[w] != null ? arguments[w] : {};
            w % 2 ? d(Object(C), !0).forEach(function(R) {
              c(S, R, C[R]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(S, Object.getOwnPropertyDescriptors(C)) : d(Object(C)).forEach(function(R) {
              Object.defineProperty(S, R, Object.getOwnPropertyDescriptor(C, R));
            });
          }
          return S;
        }
        function h(S) {
          if (Array.isArray(S))
            return S;
        }
        e("e01a"), e("d28b"), e("e260"), e("d3b7"), e("3ca3"), e("ddb0");
        function g(S, w) {
          if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(S)))) {
            var C = [], R = !0, H = !1, te = void 0;
            try {
              for (var le = S[Symbol.iterator](), ge; !(R = (ge = le.next()).done) && (C.push(ge.value), !(w && C.length === w)); R = !0)
                ;
            } catch (Fe) {
              H = !0, te = Fe;
            } finally {
              try {
                !R && le.return != null && le.return();
              } finally {
                if (H)
                  throw te;
              }
            }
            return C;
          }
        }
        e("a630"), e("fb6a"), e("b0c0"), e("25f0");
        function p(S, w) {
          (w == null || w > S.length) && (w = S.length);
          for (var C = 0, R = new Array(w); C < w; C++)
            R[C] = S[C];
          return R;
        }
        function v(S, w) {
          if (!!S) {
            if (typeof S == "string")
              return p(S, w);
            var C = Object.prototype.toString.call(S).slice(8, -1);
            if (C === "Object" && S.constructor && (C = S.constructor.name), C === "Map" || C === "Set")
              return Array.from(S);
            if (C === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(C))
              return p(S, w);
          }
        }
        function m() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function y(S, w) {
          return h(S) || g(S, w) || v(S, w) || m();
        }
        function x(S) {
          if (Array.isArray(S))
            return p(S);
        }
        function E(S) {
          if (typeof Symbol < "u" && Symbol.iterator in Object(S))
            return Array.from(S);
        }
        function P() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function T(S) {
          return x(S) || E(S) || v(S) || P();
        }
        var U = e("a352"), K = /* @__PURE__ */ e.n(U);
        function A(S) {
          S.parentElement !== null && S.parentElement.removeChild(S);
        }
        function F(S, w, C) {
          var R = C === 0 ? S.children[0] : S.children[C - 1].nextSibling;
          S.insertBefore(w, R);
        }
        var G = e("dbf1");
        e("13d5"), e("4fad"), e("ac1f"), e("5319");
        function V(S) {
          var w = /* @__PURE__ */ Object.create(null);
          return function(R) {
            var H = w[R];
            return H || (w[R] = S(R));
          };
        }
        var N = /-(\w)/g, k = V(function(S) {
          return S.replace(N, function(w, C) {
            return C.toUpperCase();
          });
        });
        e("5db7"), e("73d9");
        var q = ["Start", "Add", "Remove", "Update", "End"], z = ["Choose", "Unchoose", "Sort", "Filter", "Clone"], J = ["Move"], ue = [J, q, z].flatMap(function(S) {
          return S;
        }).map(function(S) {
          return "on".concat(S);
        }), he = {
          manage: J,
          manageAndEmit: q,
          emit: z
        };
        function De(S) {
          return ue.indexOf(S) !== -1;
        }
        e("caad"), e("2ca0");
        var de = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
        function Se(S) {
          return de.includes(S);
        }
        function $e(S) {
          return ["transition-group", "TransitionGroup"].includes(S);
        }
        function ze(S) {
          return ["id", "class", "role", "style"].includes(S) || S.startsWith("data-") || S.startsWith("aria-") || S.startsWith("on");
        }
        function Ae(S) {
          return S.reduce(function(w, C) {
            var R = y(C, 2), H = R[0], te = R[1];
            return w[H] = te, w;
          }, {});
        }
        function we(S) {
          var w = S.$attrs, C = S.componentData, R = C === void 0 ? {} : C, H = Ae(Object.entries(w).filter(function(te) {
            var le = y(te, 2), ge = le[0];
            return le[1], ze(ge);
          }));
          return f(f({}, H), R);
        }
        function Ee(S) {
          var w = S.$attrs, C = S.callBackBuilder, R = Ae(We(w));
          Object.entries(C).forEach(function(te) {
            var le = y(te, 2), ge = le[0], Fe = le[1];
            he[ge].forEach(function(re) {
              R["on".concat(re)] = Fe(re);
            });
          });
          var H = "[data-draggable]".concat(R.draggable || "");
          return f(f({}, R), {}, {
            draggable: H
          });
        }
        function We(S) {
          return Object.entries(S).filter(function(w) {
            var C = y(w, 2), R = C[0];
            return C[1], !ze(R);
          }).map(function(w) {
            var C = y(w, 2), R = C[0], H = C[1];
            return [k(R), H];
          }).filter(function(w) {
            var C = y(w, 2), R = C[0];
            return C[1], !De(R);
          });
        }
        e("c740");
        function Be(S, w) {
          if (!(S instanceof w))
            throw new TypeError("Cannot call a class as a function");
        }
        function vt(S, w) {
          for (var C = 0; C < w.length; C++) {
            var R = w[C];
            R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(S, R.key, R);
          }
        }
        function St(S, w, C) {
          return w && vt(S.prototype, w), C && vt(S, C), S;
        }
        var ht = function(w) {
          var C = w.el;
          return C;
        }, Ue = function(w, C) {
          return w.__draggable_context = C;
        }, Ve = function(w) {
          return w.__draggable_context;
        }, wt = /* @__PURE__ */ function() {
          function S(w) {
            var C = w.nodes, R = C.header, H = C.default, te = C.footer, le = w.root, ge = w.realList;
            Be(this, S), this.defaultNodes = H, this.children = [].concat(T(R), T(H), T(te)), this.externalComponent = le.externalComponent, this.rootTransition = le.transition, this.tag = le.tag, this.realList = ge;
          }
          return St(S, [{
            key: "render",
            value: function(C, R) {
              var H = this.tag, te = this.children, le = this._isRootComponent, ge = le ? {
                default: function() {
                  return te;
                }
              } : te;
              return C(H, R, ge);
            }
          }, {
            key: "updated",
            value: function() {
              var C = this.defaultNodes, R = this.realList;
              C.forEach(function(H, te) {
                Ue(ht(H), {
                  element: R[te],
                  index: te
                });
              });
            }
          }, {
            key: "getUnderlyingVm",
            value: function(C) {
              return Ve(C);
            }
          }, {
            key: "getVmIndexFromDomIndex",
            value: function(C, R) {
              var H = this.defaultNodes, te = H.length, le = R.children, ge = le.item(C);
              if (ge === null)
                return te;
              var Fe = Ve(ge);
              if (Fe)
                return Fe.index;
              if (te === 0)
                return 0;
              var re = ht(H[0]), Q = T(le).findIndex(function(_) {
                return _ === re;
              });
              return C < Q ? 0 : te;
            }
          }, {
            key: "_isRootComponent",
            get: function() {
              return this.externalComponent || this.rootTransition;
            }
          }]), S;
        }(), lt = e("8bbf");
        function tt(S, w) {
          var C = S[w];
          return C ? C() : [];
        }
        function Ut(S) {
          var w = S.$slots, C = S.realList, R = S.getKey, H = C || [], te = ["header", "footer"].map(function(_) {
            return tt(w, _);
          }), le = y(te, 2), ge = le[0], Fe = le[1], re = w.item;
          if (!re)
            throw new Error("draggable element must have an item slot");
          var Q = H.flatMap(function(_, ve) {
            return re({
              element: _,
              index: ve
            }).map(function(pe) {
              return pe.key = R(_), pe.props = f(f({}, pe.props || {}), {}, {
                "data-draggable": !0
              }), pe;
            });
          });
          if (Q.length !== H.length)
            throw new Error("Item slot must have only one child");
          return {
            header: ge,
            footer: Fe,
            default: Q
          };
        }
        function _t(S) {
          var w = $e(S), C = !Se(S) && !w;
          return {
            transition: w,
            externalComponent: C,
            tag: C ? Object(lt.resolveComponent)(S) : w ? lt.TransitionGroup : S
          };
        }
        function rt(S) {
          var w = S.$slots, C = S.tag, R = S.realList, H = S.getKey, te = Ut({
            $slots: w,
            realList: R,
            getKey: H
          }), le = _t(C);
          return new wt({
            nodes: te,
            root: le,
            realList: R
          });
        }
        function O(S, w) {
          var C = this;
          Object(lt.nextTick)(function() {
            return C.$emit(S.toLowerCase(), w);
          });
        }
        function M(S) {
          var w = this;
          return function(C, R) {
            if (w.realList !== null)
              return w["onDrag".concat(S)](C, R);
          };
        }
        function D(S) {
          var w = this, C = M.call(this, S);
          return function(R, H) {
            C.call(w, R, H), O.call(w, S, R);
          };
        }
        var Y = null, L = {
          list: {
            type: Array,
            required: !1,
            default: null
          },
          modelValue: {
            type: Array,
            required: !1,
            default: null
          },
          itemKey: {
            type: [String, Function],
            required: !0
          },
          clone: {
            type: Function,
            default: function(w) {
              return w;
            }
          },
          tag: {
            type: String,
            default: "div"
          },
          move: {
            type: Function,
            default: null
          },
          componentData: {
            type: Object,
            required: !1,
            default: null
          }
        }, ye = ["update:modelValue", "change"].concat(T([].concat(T(he.manageAndEmit), T(he.emit)).map(function(S) {
          return S.toLowerCase();
        }))), Re = Object(lt.defineComponent)({
          name: "draggable",
          inheritAttrs: !1,
          props: L,
          emits: ye,
          data: function() {
            return {
              error: !1
            };
          },
          render: function() {
            try {
              this.error = !1;
              var w = this.$slots, C = this.$attrs, R = this.tag, H = this.componentData, te = this.realList, le = this.getKey, ge = rt({
                $slots: w,
                tag: R,
                realList: te,
                getKey: le
              });
              this.componentStructure = ge;
              var Fe = we({
                $attrs: C,
                componentData: H
              });
              return ge.render(lt.h, Fe);
            } catch (re) {
              return this.error = !0, Object(lt.h)("pre", {
                style: {
                  color: "red"
                }
              }, re.stack);
            }
          },
          created: function() {
            this.list !== null && this.modelValue !== null && G.a.error("modelValue and list props are mutually exclusive! Please set one or another.");
          },
          mounted: function() {
            var w = this;
            if (!this.error) {
              var C = this.$attrs, R = this.$el, H = this.componentStructure;
              H.updated();
              var te = Ee({
                $attrs: C,
                callBackBuilder: {
                  manageAndEmit: function(Fe) {
                    return D.call(w, Fe);
                  },
                  emit: function(Fe) {
                    return O.bind(w, Fe);
                  },
                  manage: function(Fe) {
                    return M.call(w, Fe);
                  }
                }
              }), le = R.nodeType === 1 ? R : R.parentElement;
              this._sortable = new K.a(le, te), this.targetDomElement = le, le.__draggable_component__ = this;
            }
          },
          updated: function() {
            this.componentStructure.updated();
          },
          beforeUnmount: function() {
            this._sortable !== void 0 && this._sortable.destroy();
          },
          computed: {
            realList: function() {
              var w = this.list;
              return w || this.modelValue;
            },
            getKey: function() {
              var w = this.itemKey;
              return typeof w == "function" ? w : function(C) {
                return C[w];
              };
            }
          },
          watch: {
            $attrs: {
              handler: function(w) {
                var C = this._sortable;
                !C || We(w).forEach(function(R) {
                  var H = y(R, 2), te = H[0], le = H[1];
                  C.option(te, le);
                });
              },
              deep: !0
            }
          },
          methods: {
            getUnderlyingVm: function(w) {
              return this.componentStructure.getUnderlyingVm(w) || null;
            },
            getUnderlyingPotencialDraggableComponent: function(w) {
              return w.__draggable_component__;
            },
            emitChanges: function(w) {
              var C = this;
              Object(lt.nextTick)(function() {
                return C.$emit("change", w);
              });
            },
            alterList: function(w) {
              if (this.list) {
                w(this.list);
                return;
              }
              var C = T(this.modelValue);
              w(C), this.$emit("update:modelValue", C);
            },
            spliceList: function() {
              var w = arguments, C = function(H) {
                return H.splice.apply(H, T(w));
              };
              this.alterList(C);
            },
            updatePosition: function(w, C) {
              var R = function(te) {
                return te.splice(C, 0, te.splice(w, 1)[0]);
              };
              this.alterList(R);
            },
            getRelatedContextFromMoveEvent: function(w) {
              var C = w.to, R = w.related, H = this.getUnderlyingPotencialDraggableComponent(C);
              if (!H)
                return {
                  component: H
                };
              var te = H.realList, le = {
                list: te,
                component: H
              };
              if (C !== R && te) {
                var ge = H.getUnderlyingVm(R) || {};
                return f(f({}, ge), le);
              }
              return le;
            },
            getVmIndexFromDomIndex: function(w) {
              return this.componentStructure.getVmIndexFromDomIndex(w, this.targetDomElement);
            },
            onDragStart: function(w) {
              this.context = this.getUnderlyingVm(w.item), w.item._underlying_vm_ = this.clone(this.context.element), Y = w.item;
            },
            onDragAdd: function(w) {
              var C = w.item._underlying_vm_;
              if (C !== void 0) {
                A(w.item);
                var R = this.getVmIndexFromDomIndex(w.newIndex);
                this.spliceList(R, 0, C);
                var H = {
                  element: C,
                  newIndex: R
                };
                this.emitChanges({
                  added: H
                });
              }
            },
            onDragRemove: function(w) {
              if (F(this.$el, w.item, w.oldIndex), w.pullMode === "clone") {
                A(w.clone);
                return;
              }
              var C = this.context, R = C.index, H = C.element;
              this.spliceList(R, 1);
              var te = {
                element: H,
                oldIndex: R
              };
              this.emitChanges({
                removed: te
              });
            },
            onDragUpdate: function(w) {
              A(w.item), F(w.from, w.item, w.oldIndex);
              var C = this.context.index, R = this.getVmIndexFromDomIndex(w.newIndex);
              this.updatePosition(C, R);
              var H = {
                element: this.context.element,
                oldIndex: C,
                newIndex: R
              };
              this.emitChanges({
                moved: H
              });
            },
            computeFutureIndex: function(w, C) {
              if (!w.element)
                return 0;
              var R = T(C.to.children).filter(function(ge) {
                return ge.style.display !== "none";
              }), H = R.indexOf(C.related), te = w.component.getVmIndexFromDomIndex(H), le = R.indexOf(Y) !== -1;
              return le || !C.willInsertAfter ? te : te + 1;
            },
            onDragMove: function(w, C) {
              var R = this.move, H = this.realList;
              if (!R || !H)
                return !0;
              var te = this.getRelatedContextFromMoveEvent(w), le = this.computeFutureIndex(te, w), ge = f(f({}, this.context), {}, {
                futureIndex: le
              }), Fe = f(f({}, w), {}, {
                relatedContext: te,
                draggedContext: ge
              });
              return R(Fe, C);
            },
            onDragEnd: function() {
              Y = null;
            }
          }
        }), it = Re;
        s.default = it;
      },
      fb6a: function(r, s, e) {
        var l = e("23e7"), a = e("861d"), u = e("e8b5"), c = e("23cb"), d = e("50c4"), f = e("fc6a"), h = e("8418"), g = e("b622"), p = e("1dde"), v = e("ae40"), m = p("slice"), y = v("slice", { ACCESSORS: !0, 0: 0, 1: 2 }), x = g("species"), E = [].slice, P = Math.max;
        l({ target: "Array", proto: !0, forced: !m || !y }, {
          slice: function(U, K) {
            var A = f(this), F = d(A.length), G = c(U, F), V = c(K === void 0 ? F : K, F), N, k, q;
            if (u(A) && (N = A.constructor, typeof N == "function" && (N === Array || u(N.prototype)) ? N = void 0 : a(N) && (N = N[x], N === null && (N = void 0)), N === Array || N === void 0))
              return E.call(A, G, V);
            for (k = new (N === void 0 ? Array : N)(P(V - G, 0)), q = 0; G < V; G++, q++)
              G in A && h(k, q, A[G]);
            return k.length = q, k;
          }
        });
      },
      fc6a: function(r, s, e) {
        var l = e("44ad"), a = e("1d80");
        r.exports = function(u) {
          return l(a(u));
        };
      },
      fdbc: function(r, s) {
        r.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0
        };
      },
      fdbf: function(r, s, e) {
        var l = e("4930");
        r.exports = l && !Symbol.sham && typeof Symbol.iterator == "symbol";
      }
    }).default;
  });
})(Ln);
const qi = /* @__PURE__ */ vi(Ln.exports), _i = ["data-column-key"], es = { class: "flex items-center" }, ts = ["onClick", "title"], rs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, ns = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, os = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Jn = {
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
  setup(t, { emit: n }) {
    const o = t, i = n, r = se([...o.columns]), s = se(!1), e = se(!1);
    kt(() => o.columns, (c) => {
      !s.value && !e.value && (r.value = [...c]), e.value && setTimeout(() => {
        e.value = !1;
      }, 100);
    }, { deep: !0 });
    function l(c, d) {
      const f = r.value.findIndex((h) => h.key === c);
      f !== -1 && (r.value[f].hidden = !d), i("columns-changed", r.value);
    }
    function a(c, d) {
      const f = r.value.findIndex((h) => h.key === c);
      f !== -1 && (r.value[f].pinned = !d), r.value.sort((h, g) => h.pinned && !g.pinned ? -1 : !h.pinned && g.pinned ? 1 : 0), i("columns-changed", r.value);
    }
    function u() {
      e.value = !0, i("columns-changed", r.value);
    }
    return (c, d) => (I(), be(ae(qi), {
      modelValue: r.value,
      "onUpdate:modelValue": d[0] || (d[0] = (f) => r.value = f),
      "item-key": "key",
      animation: 200,
      handle: ".drag-handle",
      onChange: u,
      onStart: d[1] || (d[1] = (f) => s.value = !0),
      onEnd: d[2] || (d[2] = (f) => s.value = !1)
    }, {
      item: Le(({ element: f }) => [
        b("div", {
          class: "py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0",
          "data-test": "column-item",
          "data-column-key": f.key
        }, [
          b("div", es, [
            d[5] || (d[5] = b("div", { class: "drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600" }, [
              b("svg", {
                class: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                b("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            f.can_be_pinned !== !1 ? (I(), $("button", {
              key: 0,
              type: "button",
              class: Z(["mr-2 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600", { "text-blue-500": f.pinned }]),
              onClick: Ke((h) => a(f.key, f.pinned), ["prevent"]),
              title: f.pinned ? "D\xE9s\xE9pingler la colonne" : "\xC9pingler la colonne"
            }, [
              f.pinned ? (I(), $("svg", rs, [...d[3] || (d[3] = [
                b("g", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5"
                }, [
                  b("path", { d: "M9.5 14.5L3 21" }),
                  b("path", {
                    fill: "currentColor",
                    d: "m5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                  })
                ], -1)
              ])])) : (I(), $("svg", ns, [...d[4] || (d[4] = [
                b("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, ts)) : W("", !0),
            b("p", {
              class: Z(["text-sm text-gray-900", { "text-gray-400": f.hidden, "font-semibold": f.pinned }])
            }, B(f.label), 3)
          ]),
          f.can_be_hidden && !f.pinned ? (I(), $("button", {
            key: 0,
            type: "button",
            class: Z(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
              "bg-green-500": !f.hidden,
              "bg-gray-200": f.hidden
            }]),
            "aria-pressed": !f.hidden,
            "aria-labelledby": `toggle-column-${f.key}`,
            "aria-describedby": `toggle-column-${f.key}`,
            dusk: `toggle-column-${f.key}`,
            onClick: Ke((h) => l(f.key, f.hidden), ["prevent"])
          }, [
            d[6] || (d[6] = b("span", { class: "sr-only" }, "Column status", -1)),
            b("span", {
              "aria-hidden": "true",
              class: Z([{
                "translate-x-5": !f.hidden,
                "translate-x-0": f.hidden
              }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
            }, null, 2)
          ], 10, os)) : W("", !0)
        ], 8, _i)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
};
const as = {
  key: 0,
  class: "ml-1"
}, ls = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, is = { class: "px-2" }, ss = {
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
  setup(t) {
    const n = t, o = se([...n.columns]);
    kt(() => n.columns, (s) => {
      o.value = [...s];
    }, { deep: !0, immediate: !0 });
    const i = me(() => o.value.filter((s) => s.hidden).length);
    function r(s) {
      o.value = [...s], n.onChange(s);
    }
    return (s, e) => (I(), be(kr, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: t.color
    }, {
      button: Le(() => [
        e[0] || (e[0] = b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5",
          viewBox: "0 0 48 48"
        }, [
          b("path", {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "4",
            d: "m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
          })
        ], -1)),
        t.hasHiddenColumns ? (I(), $("span", as, "(" + B(i.value) + ")", 1)) : W("", !0)
      ]),
      default: Le(() => [
        b("div", ls, [
          b("div", is, [
            et(Jn, {
              columns: o.value,
              "can-sort": !0,
              onColumnsChanged: r
            }, null, 8, ["columns"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, us = /* @__PURE__ */ qt(ss, [["__scopeId", "data-v-eadc618a"]]), cs = {
  key: 0,
  class: "ml-1"
}, ds = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, fs = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, vs = { class: "p-2" }, hs = ["name", "value", "onChange"], ps = ["value"], gs = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, ms = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, ys = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, bs = {
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
  setup(t) {
    const n = t;
    se(null);
    const o = me(() => n.filters.filter((a) => !i(a)).length);
    function i(a) {
      if (a.value === null)
        return !0;
      switch (a.type) {
        case "number_range":
          return Number(Math.max(...a.value)) === Number(a.max) && Number(Math.min(...a.value)) === Number(a.min);
        case "select":
          return a.value === "";
        case "toggle":
          return !1;
        case "date":
          return !a.value || typeof a.value == "object" && !a.value.type;
        case "number":
          return !a.value || typeof a.value == "object" && !a.value.type;
        default:
          return !a.value;
      }
    }
    function r(a) {
      let u = a.value;
      a.value && (Number(Math.max(...a.value)) === Number(a.max) && Number(Math.min(...a.value)) === Number(a.min) ? u = null : Number(Math.min(...a.value)) === 0 && Number(Math.max(...a.value)) === 0 && (u = ["0", "0"])), n.onFilterChange(a.key, u);
    }
    const s = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, e = ft("themeVariables"), l = (a) => {
      var u, c, d, f;
      return at(
        Pe([a, "base"], s, (c = (u = e == null ? void 0 : e.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : c.select_filter, n.ui),
        Pe([a, "color", n.color], s, (f = (d = e == null ? void 0 : e.inertia_table) == null ? void 0 : d.table_filter) == null ? void 0 : f.select_filter, n.ui)
      );
    };
    return (a, u) => (I(), be(kr, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: t.color
    }, {
      button: Le(() => [
        u[0] || (u[0] = b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          b("path", {
            "fill-rule": "evenodd",
            d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        t.hasEnabledFilters ? (I(), $("span", cs, "(" + B(o.value) + ")", 1)) : W("", !0)
      ]),
      default: Le(() => [
        b("div", ds, [
          (I(!0), $(ut, null, ct(t.filters, (c, d) => (I(), $("div", { key: d }, [
            b("h3", fs, B(c.label), 1),
            b("div", vs, [
              c.type === "select" ? (I(), $("select", {
                key: 0,
                name: c.key,
                value: c.value,
                class: Z(l("select", t.color)),
                onChange: (f) => t.onFilterChange(c.key, f.target.value)
              }, [
                (I(!0), $(ut, null, ct(c.options, (f, h) => (I(), $("option", {
                  key: h,
                  value: h
                }, B(f), 9, ps))), 128))
              ], 42, hs)) : W("", !0),
              c.type === "toggle" ? (I(), be(Rn, {
                key: 1,
                filter: c,
                "on-filter-change": t.onFilterChange,
                color: t.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : W("", !0),
              c.type === "number_range" ? (I(), $("div", gs, [
                et(Nn, {
                  modelValue: c.value,
                  "onUpdate:modelValue": [(f) => c.value = f, (f) => r(c)],
                  max: c.max,
                  min: c.min,
                  prefix: c.prefix,
                  suffix: c.suffix,
                  step: c.step,
                  color: t.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : W("", !0),
              c.type === "date" ? (I(), $("div", ms, [
                et(jn, {
                  filter: c,
                  "on-filter-change": t.onFilterChange,
                  color: t.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : W("", !0),
              c.type === "number" ? (I(), $("div", ys, [
                et(kn, {
                  filter: c,
                  "on-filter-change": t.onFilterChange,
                  color: t.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : W("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, xs = { class: "relative" }, Ss = ["placeholder", "value"], ws = {
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
  setup(t) {
    const n = t, o = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, i = ft("themeVariables"), r = (s) => {
      var e, l;
      return at(
        Pe([s, "base"], o, (e = i == null ? void 0 : i.inertia_table) == null ? void 0 : e.global_search, n.ui),
        Pe([s, "color", n.color], o, (l = i == null ? void 0 : i.inertia_table) == null ? void 0 : l.global_search, n.ui)
      );
    };
    return (s, e) => (I(), $("div", xs, [
      b("input", {
        class: Z(r("input")),
        placeholder: t.label,
        value: t.value,
        type: "text",
        name: "global",
        onInput: e[0] || (e[0] = (l) => t.onChange(l.target.value))
      }, null, 42, Ss),
      e[1] || (e[1] = b("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
        b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          b("path", {
            "fill-rule": "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            "clip-rule": "evenodd"
          })
        ])
      ], -1))
    ]));
  }
}, Es = { class: "flex rounded-md shadow-sm relative mt-3" }, Cs = ["for"], Os = ["id", "name", "value", "onInput"], Ts = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Is = ["dusk", "onClick"], Ps = {
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
  setup(t) {
    const n = { el: se([]) };
    let o = me(() => n.el.value);
    const i = t;
    function r(a) {
      return i.forcedVisibleSearchInputs.includes(a);
    }
    kt(i.forcedVisibleSearchInputs, (a) => {
      const u = a.length > 0 ? a[a.length - 1] : null;
      !u || In().then(() => {
        const c = ho(o.value, (d) => d.name === u);
        c && c.focus();
      });
    }, { immediate: !0 });
    const s = {
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
    }, e = ft("themeVariables"), l = (a) => {
      var u, c;
      return at(
        Pe([a, "base"], s, (u = e == null ? void 0 : e.inertia_table) == null ? void 0 : u.table_search_rows, i.ui),
        Pe([a, "color", i.color], s, (c = e == null ? void 0 : e.inertia_table) == null ? void 0 : c.table_search_rows, i.ui)
      );
    };
    return (a, u) => (I(!0), $(ut, null, ct(t.searchInputs, (c, d) => He((I(), $("div", {
      key: d,
      class: "px-4 sm:px-0"
    }, [
      b("div", Es, [
        b("label", {
          for: c.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          u[0] || (u[0] = b("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "h-5 w-5 mr-2 text-gray-400",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, [
            b("path", {
              "fill-rule": "evenodd",
              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
              "clip-rule": "evenodd"
            })
          ], -1)),
          b("span", null, B(c.label), 1)
        ], 8, Cs),
        (I(), $("input", {
          id: c.key,
          ref_for: !0,
          ref: n.el,
          key: c.key,
          name: c.key,
          value: c.value,
          type: "text",
          class: Z(l("input")),
          onInput: (f) => t.onChange(c.key, f.target.value)
        }, null, 42, Os)),
        b("div", Ts, [
          b("button", {
            class: Z(l("remove_button")),
            dusk: `remove-search-row-${c.key}`,
            onClick: Ke((f) => t.onRemove(c.key), ["prevent"])
          }, [...u[1] || (u[1] = [
            b("span", { class: "sr-only" }, "Remove search", -1),
            b("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-5 w-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              b("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M6 18L18 6M6 6l12 12"
              })
            ], -1)
          ])], 10, Is)
        ])
      ])
    ])), [
      [Rt, c.value !== null || r(c.key)]
    ])), 128));
  }
}, As = {
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
  setup(t) {
    const n = jt(), o = t, i = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, r = ft("themeVariables"), s = (e) => {
      var l, a;
      return at(
        Pe([e, "base"], i, (l = r == null ? void 0 : r.inertia_table) == null ? void 0 : l.reset_button, o.ui),
        Pe([e, "color", o.color], i, (a = r == null ? void 0 : r.inertia_table) == null ? void 0 : a.reset_button, o.ui)
      );
    };
    return (e, l) => {
      var a;
      return I(), $("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: Z(s("button")),
        "aria-haspopup": "true",
        onClick: l[0] || (l[0] = Ke((...u) => t.onClick && t.onClick(...u), ["prevent"]))
      }, [
        l[1] || (l[1] = b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 mr-2 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          b("path", {
            "fill-rule": "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            "clip-rule": "evenodd"
          })
        ], -1)),
        b("span", null, B((a = ae(n).reset) != null ? a : "Reset"), 1)
      ], 2);
    };
  }
}, Ms = {}, Ds = { class: "flow-root" }, $s = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, Rs = { class: "inline-block min-w-full w-full max-w-full py-2 align-middle sm:px-6 lg:px-8" }, Ns = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function ks(t, n) {
  return I(), $("div", Ds, [
    b("div", $s, [
      b("div", Rs, [
        b("div", Ns, [
          xe(t.$slots, "default")
        ])
      ])
    ])
  ]);
}
const js = /* @__PURE__ */ qt(Ms, [["render", ks]]), Fs = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Ls = ["dusk", "onClick"], zs = { class: "px-2" }, Bs = {
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
  setup(t) {
    const n = jt(), o = t, i = se(!1), r = se(!1);
    function s() {
      i.value = r.value = !1;
    }
    function e(l) {
      var a, u;
      (a = o.actions.toggleColumns) != null && a.onReorder ? o.actions.toggleColumns.onReorder(l) : (u = o.actions.toggleColumns) != null && u.onChange && o.actions.toggleColumns.onChange(l);
    }
    return (l, a) => (I(), be(kr, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: t.color,
      onClosed: s
    }, {
      button: Le(() => [...a[5] || (a[5] = [
        b("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          b("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])]),
      default: Le(() => {
        var u, c, d, f, h;
        return [
          b("div", Fs, [
            He(b("div", null, [
              "searchFields" in t.actions && t.actions.searchFields.show ? (I(), $("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: a[0] || (a[0] = (g) => r.value = !0)
              }, [
                a[6] || (a[6] = b("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  b("path", {
                    "fill-rule": "evenodd",
                    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                b("span", null, B((u = ae(n).add_search_fields) != null ? u : "Add search field"), 1)
              ])) : W("", !0),
              "toggleColumns" in t.actions && t.actions.toggleColumns.show ? (I(), $("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: a[1] || (a[1] = (g) => i.value = !0)
              }, [
                a[7] || (a[7] = b("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  b("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                  b("path", {
                    "fill-rule": "evenodd",
                    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                b("span", null, B((c = ae(n).show_hide_columns) != null ? c : "Show / Hide columns"), 1)
              ])) : W("", !0),
              a[9] || (a[9] = b("hr", null, null, -1)),
              "reset" in t.actions ? (I(), $("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: a[2] || (a[2] = (...g) => {
                  var p, v;
                  return ((p = t.actions.reset) == null ? void 0 : p.onClick) && ((v = t.actions.reset) == null ? void 0 : v.onClick(...g));
                })
              }, [
                a[8] || (a[8] = b("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  b("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                b("span", null, B((d = ae(n).grouped_reset) != null ? d : "Reset"), 1)
              ])) : W("", !0)
            ], 512), [
              [Rt, !i.value && !r.value]
            ]),
            He(b("div", null, [
              b("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: a[3] || (a[3] = (g) => r.value = !1)
              }, [
                a[10] || (a[10] = b("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  b("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                b("span", null, B((f = ae(n).add_search_fields) != null ? f : "Add search field"), 1)
              ]),
              (I(!0), $(ut, null, ct(t.actions.searchFields.searchInputs, (g, p) => (I(), $("button", {
                key: p,
                dusk: `add-search-row-${g.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: Ke((v) => t.actions.searchFields.onClick(g.key), ["prevent"])
              }, B(g.label), 9, Ls))), 128))
            ], 512), [
              [Rt, r.value]
            ]),
            He(b("div", null, [
              b("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: a[4] || (a[4] = (g) => i.value = !1)
              }, [
                a[11] || (a[11] = b("svg", {
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4"
                }, [
                  b("path", {
                    d: "M5 12H19M5 12L11 6M5 12L11 18",
                    stroke: "#000000",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)),
                b("span", null, B((h = ae(n).show_hide_columns) != null ? h : "Show / Hide columns"), 1)
              ]),
              b("div", zs, [
                et(Jn, {
                  columns: t.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: e
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [Rt, i.value]
            ]),
            He(b("div", null, [
              xe(l.$slots, "default")
            ], 512), [
              [Rt, !i.value && !r.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function Us(t) {
  const n = se(!1), o = se(null), i = se(0), r = se(0), s = ro({}), e = () => {
    if (t === "default")
      return;
    const v = localStorage.getItem(`table-column-widths-${t}`);
    if (v)
      try {
        const m = JSON.parse(v);
        Object.assign(s, m);
      } catch (m) {
        console.warn("Unable to load column widths:", m);
      }
  }, l = () => {
    t !== "default" && localStorage.setItem(`table-column-widths-${t}`, JSON.stringify(s));
  }, a = (v, m) => {
    v.preventDefault(), v.stopPropagation(), n.value = !0, o.value = m, i.value = v.clientX;
    const y = v.target.closest("th");
    r.value = y.offsetWidth;
    const x = y.closest("table");
    x && x.querySelectorAll("thead th[data-column-key]").forEach((P) => {
      const T = P.getAttribute("data-column-key"), U = P.offsetWidth;
      s[T] || (s[T] = U), P.style.width = `${s[T]}px`;
      const K = Array.from(P.parentNode.children).indexOf(P);
      x.querySelectorAll("tbody tr").forEach((F) => {
        const G = F.children[K];
        G && (G.style.width = `${s[T]}px`);
      });
    }), document.addEventListener("mousemove", u), document.addEventListener("mouseup", c), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, u = (v) => {
    if (!n.value || !o.value)
      return;
    const m = v.clientX - i.value, y = Math.max(50, r.value + m);
    s[o.value] = y;
    const x = document.querySelector(`th[data-column-key="${o.value}"]`);
    if (x) {
      x.style.width = `${y}px`;
      const E = x.closest("table");
      if (E) {
        const P = Array.from(x.parentNode.children).indexOf(x);
        E.querySelectorAll("tbody tr").forEach((U) => {
          const K = U.children[P];
          K && (K.style.width = `${y}px`);
        });
      }
    }
  }, c = () => {
    n.value && (n.value = !1, o.value = null, l(), document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, d = (v) => s[v] || "auto", f = (v, m) => {
    s[v] = m, l();
  }, h = (v) => {
    if (!v)
      return;
    v.querySelectorAll("thead th[data-column-key]").forEach((y) => {
      const x = y.getAttribute("data-column-key");
      if (!s[x]) {
        const T = y.offsetWidth;
        s[x] = Math.max(T, 100);
      }
      y.style.width = `${s[x]}px`;
      const E = Array.from(y.parentNode.children).indexOf(y);
      v.querySelectorAll("tbody tr").forEach((T) => {
        const U = T.children[E];
        U && (U.style.width = `${s[x]}px`);
      });
    });
  }, g = () => {
    Object.keys(s).forEach((v) => {
      delete s[v];
    }), t !== "default" && localStorage.removeItem(`table-column-widths-${t}`);
  }, p = () => {
    n.value && (document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Tt(() => {
    e();
  }), Nr(() => {
    p();
  }), {
    isResizing: n,
    resizingColumn: o,
    columnWidths: s,
    startResize: a,
    getColumnWidth: d,
    setColumnWidth: f,
    resetColumnWidths: g,
    loadColumnWidths: e,
    saveColumnWidths: l,
    initializeColumnWidths: h
  };
}
const Gs = ["dusk"], Vs = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, Ws = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, Ks = { class: "mr-2 sm:mr-4" }, Hs = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, Xs = { class: "overflow-x-auto" }, Ys = { class: "bg-gray-50" }, Qs = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border pinned-checkbox-header",
  style: { width: "60px" }
}, Js = ["id"], Zs = { class: "divide-y divide-gray-200 bg-white" }, qs = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500 pinned-checkbox",
  style: { width: "60px" }
}, _s = ["id", "onUpdate:modelValue"], eu = ["onClick", "data-column-key"], tu = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, ru = {
  key: 0,
  class: "italic text-sm px-2"
}, nu = {
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
  setup(t, { emit: n }) {
    const o = jt(), i = n, r = t;
    no();
    const s = r.resizeableColumns ? Us(r.name) : null;
    oo("columnResize", s);
    const e = se(!1), l = me(() => dn().props.queryBuilderProps ? { ...dn().props.queryBuilderProps[r.name] } : {}), a = se(l.value), u = me(() => l.value.pageName), c = se([]), d = se(null), f = se(!1), h = me(() => l.value.hasToggleableColumns || l.value.hasFilters || l.value.hasSearchInputs ? !1 : !l.value.globalSearch), g = me(() => Object.keys(r.resource).length === 0 ? r.data : "data" in r.resource ? r.resource.data : r.resource), p = me(() => Object.keys(r.resource).length === 0 ? r.meta : "links" in r.resource && "meta" in r.resource && Object.keys(r.resource.links).length === 4 && "next" in r.resource.links && "prev" in r.resource.links ? {
      ...r.resource.meta,
      next_page_url: r.resource.links.next,
      prev_page_url: r.resource.links.prev
    } : "meta" in r.resource ? r.resource.meta : r.resource), v = me(() => g.value.length > 0 ? !0 : p.value.total > 0), m = se({
      reset: {
        onClick: U
      },
      toggleColumns: {
        show: l.value.hasToggleableColumns,
        columns: l.value.columns,
        onChange: k
      },
      searchFields: {
        show: l.value.hasSearchInputs && !r.hideSearchInputsAboveTable,
        searchInputs: l.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: l.value.hasSearchInputsWithoutValue,
        onClick: x
      }
    });
    function y(O) {
      c.value = c.value.filter((M) => M != O), A(O, null);
    }
    function x(O) {
      c.value.push(O);
    }
    const E = me(() => {
      if (c.value.length > 0)
        return !0;
      const O = Lr.parse(location.search.substring(1));
      if (O[u.value] > 1)
        return !0;
      const D = r.name === "default" ? "" : r.name + "_";
      let Y = !1;
      return Pt(["filter", "columns", "cursor", "sort"], (L) => {
        const ye = O[D + L];
        L === "sort" && ye === l.value.defaultSort || ye !== void 0 && (Y = !0);
      }), Y;
    }), P = (O, M) => {
      let D = [];
      if (r.striped && M % 2 && D.push("bg-gray-50"), r.striped ? D.push("hover:bg-gray-100") : D.push("hover:bg-gray-50"), r.rowClass && typeof r.rowClass == "function") {
        const Y = r.rowClass(O);
        Y && D.push(Y);
      }
      return D.join(" ");
    }, T = me(() => {
      if (!r.showExportButton)
        return null;
      const O = new URL(window.location.href);
      O.search = "";
      const M = new URLSearchParams();
      if (l.value.page && l.value.page > 1 && M.set(u.value, l.value.page), l.value.sort) {
        const L = r.name === "default" ? "sort" : `${r.name}_sort`;
        M.set(L, l.value.sort);
      }
      const D = {};
      if (a.value.filters.forEach((L) => {
        L.value !== null && L.value !== void 0 && L.value !== "" && (D[L.key] = L.value);
      }), a.value.searchInputs.forEach((L) => {
        L.value !== null && L.value !== void 0 && L.value !== "" && (D[L.key] = L.value);
      }), Object.keys(D).length > 0) {
        const L = r.name === "default" ? "filter" : `${r.name}_filter`;
        Object.keys(D).forEach((ye) => {
          const Re = D[ye];
          Array.isArray(Re) ? Re.forEach((it, S) => {
            M.set(`${L}[${ye}][${S}]`, it);
          }) : typeof Re == "object" && Re !== null ? Object.keys(Re).forEach((it) => {
            M.set(`${L}[${ye}][${it}]`, Re[it]);
          }) : M.set(`${L}[${ye}]`, Re);
        });
      }
      const Y = a.value.columns.filter((L) => !L.hidden).map((L) => L.key);
      if (Y.length !== a.value.columns.length) {
        const L = r.name === "default" ? "columns" : `${r.name}_columns`;
        Y.forEach((ye) => {
          M.append(`${L}[]`, ye);
        });
      }
      if (l.value.perPageOptions && l.value.perPageOptions.length > 0) {
        const L = new URLSearchParams(window.location.search).get("perPage") || l.value.perPageOptions[0];
        L && L !== l.value.perPageOptions[0] && M.set("perPage", L);
      }
      return M.set("do_export", "1"), M.set("table", r.name || "default"), O.search = M.toString(), O.toString();
    });
    function U() {
      c.value = [], Pt(a.value.filters, (O, M) => {
        a.value.filters[M].value = null;
      }), Pt(a.value.searchInputs, (O, M) => {
        a.value.searchInputs[M].value = null;
      }), Pt(a.value.columns, (O, M) => {
        a.value.columns[M].hidden = O.can_be_hidden ? !l.value.defaultVisibleToggleableColumns.includes(O.key) : !1, a.value.columns[M].pinned = !1;
      }), localStorage.removeItem(`columns-${r.name}`), r.resizeableColumns && s && s.resetColumnWidths(), a.value.sort = null, a.value.cursor = null, a.value.page = 1;
    }
    const K = {};
    function A(O, M) {
      clearTimeout(K[O]), K[O] = setTimeout(() => {
        Se.value && r.preventOverlappingRequests && Se.value.cancel();
        const D = N("searchInputs", O);
        a.value.searchInputs[D].value = M, a.value.cursor = null, a.value.page = 1;
      }, r.inputDebounceMs);
    }
    function F(O) {
      A("global", O);
    }
    function G(O, M) {
      const D = N("filters", O);
      a.value.filters[D].value = M, a.value.cursor = null, a.value.page = 1;
    }
    function V(O) {
      a.value.cursor = null, a.value.perPage = O, a.value.page = 1;
    }
    function N(O, M) {
      return mo(a.value[O], (D) => D.key == M);
    }
    function k(O) {
      a.value.columns = O, a.value.columns.sort((M, D) => M.pinned && !D.pinned ? -1 : !M.pinned && D.pinned ? 1 : 0), q();
    }
    function q() {
      if (r.name && r.name !== "default") {
        const O = a.value.columns.map((M, D) => ({
          key: M.key,
          hidden: M.hidden,
          pinned: M.pinned || !1,
          order: D
        }));
        localStorage.setItem(`columns-${r.name}`, JSON.stringify(O));
      }
    }
    function z() {
      let O = {};
      return Pt(a.value.searchInputs, (M) => {
        M.value !== null && (O[M.key] = M.value);
      }), Pt(a.value.filters, (M) => {
        let D = M.value;
        D !== null && (M.type === "number_range" && Number(Math.max(...M.value)) === Number(M.max) && Number(Math.min(...M.value)) === Number(M.min) && (D = null), O[M.key] = D);
      }), O;
    }
    function J() {
      const O = a.value.columns;
      let M = go(O, (Y) => !Y.hidden), D = bo(M, (Y) => Y.key).sort();
      return yo(D, l.value.defaultVisibleToggleableColumns) ? {} : D;
    }
    function ue() {
      const O = z(), M = J(), D = {};
      Object.keys(O).length > 0 && (D.filter = O), Object.keys(M).length > 0 && (D.columns = M);
      const Y = a.value.cursor, L = a.value.page, ye = a.value.sort, Re = a.value.perPage;
      return Y && (D.cursor = Y), L > 1 && (D.page = L), Re > 1 && (D.perPage = Re), ye && (D.sort = ye), D;
    }
    function he(O) {
      if (!O)
        return null;
      if (r.paginationClickCallback && typeof r.paginationClickCallback == "function") {
        r.paginationClickCallback(O);
        return;
      }
      $e(O);
    }
    function De() {
      const O = Lr.parse(location.search.substring(1)), M = r.name === "default" ? "" : r.name + "_";
      Pt(["filter", "columns", "cursor", "sort"], (Y) => {
        delete O[M + Y];
      }), delete O[u.value], Pt(ue(), (Y, L) => {
        L === "page" ? O[u.value] = Y : L === "perPage" ? O.perPage = Y : O[M + L] = Y;
      });
      let D = Lr.stringify(O, {
        filter(Y, L) {
          return typeof L == "object" && L !== null ? xo(L) : L;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!D || D === u.value + "=1") && (D = ""), D;
    }
    const de = se(!1), Se = se(null);
    function $e(O) {
      !O || So.get(
        O,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: r.preserveScroll !== !1,
          onBefore() {
            de.value = !0;
          },
          onCancelToken(M) {
            Se.value = M;
          },
          onFinish() {
            de.value = !1;
          },
          onSuccess() {
            if (r.preserveScroll === "table-top") {
              const D = d.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: D });
            }
          }
        }
      );
    }
    function ze(O, M, D) {
      var Y;
      r.hasCheckboxes && ((Y = O.target) == null ? void 0 : Y.parentElement.cellIndex) === 0 || i("rowClicked", O, M, D);
    }
    kt(a, () => {
      $e(location.pathname + "?" + De()), f.value = !1;
    }, { deep: !0 }), kt(r.resource, () => {
      const O = r.resource.data.filter((M) => M.__itSelected);
      i("selectionChanged", O);
    }, { deep: !0 });
    const Ae = () => {
      r.resizeableColumns && s && setTimeout(() => {
        var M;
        const O = (M = d.value) == null ? void 0 : M.querySelector("table");
        O && s.initializeColumnWidths(O);
      }, 0);
    };
    Tt(() => {
      document.addEventListener("inertia:success", Ae), we(), r.resizeableColumns && s && setTimeout(() => {
        var M;
        const O = (M = d.value) == null ? void 0 : M.querySelector("table");
        O && s.initializeColumnWidths(O);
      }, 0);
    });
    function we() {
      if (!r.name || r.name === "default")
        return;
      console.log("Loading columns from storage for table:", r.name);
      const O = localStorage.getItem(`columns-${r.name}`);
      if (!!O)
        try {
          const M = JSON.parse(O);
          if (M.length > 0 && "order" in M[0]) {
            const D = new Map(M.map((Y) => [Y.key, Y]));
            a.value.columns.forEach((Y, L) => {
              const ye = D.get(Y.key);
              ye && (a.value.columns[L].hidden = ye.hidden, a.value.columns[L].pinned = ye.pinned || !1);
            }), a.value.columns.sort((Y, L) => {
              var w, C;
              const ye = D.get(Y.key), Re = D.get(L.key);
              if (Y.pinned && !L.pinned)
                return -1;
              if (!Y.pinned && L.pinned)
                return 1;
              const it = (w = ye == null ? void 0 : ye.order) != null ? w : 999, S = (C = Re == null ? void 0 : Re.order) != null ? C : 999;
              return it - S;
            });
          } else
            M.forEach((D, Y) => {
              const L = a.value.columns.findIndex((ye) => ye.key === D.key);
              L !== -1 && (a.value.columns[L].hidden = D.hidden, a.value.columns[L].pinned = D.pinned || !1);
            });
        } catch (M) {
          console.warn("Error loading column order from localStorage:", M);
        }
    }
    Nr(() => {
      document.removeEventListener("inertia:success", Ae);
    });
    function Ee(O) {
      a.value.sort == O ? a.value.sort = `-${O}` : a.value.sort = O, a.value.cursor = null, a.value.page = 1;
    }
    function We(O) {
      const M = N("columns", O);
      return !a.value.columns[M].hidden;
    }
    function Be(O) {
      const M = N("columns", O), D = po(a.value.columns[M]);
      D.onSort = Ee, D.filters = a.value.filters.filter(
        (L) => L.key === O || L.key.startsWith(O + "_") || L.key.includes(O)
      );
      const Y = a.value.searchInputs.filter(
        (L) => L.key === O
      );
      return Y.length > 0 ? (D.searchable = !0, D.searchInputs = Y) : (D.searchable = !1, D.searchInputs = []), D.onFilterChange = G, D.onSearchChange = A, D.color = r.color, D;
    }
    function vt() {
      r.resource.data.forEach((O) => {
        O.__itSelected = f.value;
      });
    }
    function St(O) {
      if (!r.resizeableColumns || !s)
        return "auto";
      const M = s.getColumnWidth(O);
      return M === "auto" ? M : `${M}px`;
    }
    function ht(O) {
      if (!r.resizeableColumns || !s)
        return "0px";
      let M = 0;
      const D = a.value.columns.filter((Y) => !Y.hidden);
      r.hasCheckboxes && (M += 60);
      for (const Y of D) {
        if (Y.key === O)
          break;
        if (Y.pinned) {
          const L = s.getColumnWidth(Y.key);
          M += L === "auto" ? 150 : L;
        }
      }
      return `${M}px`;
    }
    function Ue(O) {
      const M = a.value.columns.find((D) => D.key === O);
      return M && M.pinned;
    }
    function Ve(O) {
      return Ue(O) ? {
        position: "sticky",
        left: ht(O),
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function wt(O) {
      return Ue(O) ? {
        position: "sticky",
        left: ht(O),
        zIndex: 11,
        backgroundColor: "#f9fafb",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const lt = me(() => {
      if (!r.resizeableColumns || !s)
        return "100%";
      let O = 0, M = !1;
      return r.hasCheckboxes && (O += 60), l.value.columns.forEach((D) => {
        if (!We(D.key))
          return;
        const Y = s.getColumnWidth(D.key);
        Y === "auto" ? M = !0 : O += Y;
      }), !M && O > 0 ? `${O}px` : "max(100%, " + (O > 0 ? O + "px" : "800px") + ")";
    }), tt = me(() => r.resource.data.filter((O) => O.__itSelected).length), Ut = me(() => tt.value === 0 ? o.noLineSelected : `${tt.value} ${o.lineSelected}`);
    function _t() {
      r.resizeableColumns && (e.value = !0);
    }
    function rt() {
      r.resizeableColumns && setTimeout(() => {
        e.value = !1;
      }, 100);
    }
    return (O, M) => (I(), be(ao, null, {
      default: Le(() => [
        (I(), $("fieldset", {
          ref_key: "tableFieldset",
          ref: d,
          key: `table-${t.name}`,
          dusk: `table-${t.name}`,
          class: Z(["min-w-0", { "opacity-75": de.value }])
        }, [
          b("div", Vs, [
            l.value.globalSearch ? (I(), $("div", Ws, [
              xe(O.$slots, "tableGlobalSearch", {
                hasGlobalSearch: l.value.globalSearch,
                label: l.value.globalSearch ? l.value.globalSearch.label : null,
                value: l.value.globalSearch ? l.value.globalSearch.value : null,
                onChange: F
              }, () => [
                l.value.globalSearch ? (I(), be(ws, {
                  key: 0,
                  class: "grow",
                  label: l.value.globalSearch.label,
                  value: l.value.globalSearch.value,
                  "on-change": F,
                  color: t.color
                }, null, 8, ["label", "value", "color"])) : W("", !0)
              ], !0)
            ])) : W("", !0),
            b("div", Ks, [
              xe(O.$slots, "tableFilter", {
                hasFilters: l.value.hasFilters,
                hasEnabledFilters: l.value.hasEnabledFilters,
                filters: l.value.filters,
                onFilterChange: G
              }, () => [
                l.value.hasFilters ? (I(), be(bs, {
                  key: 0,
                  "has-enabled-filters": l.value.hasEnabledFilters,
                  filters: l.value.filters,
                  "on-filter-change": G,
                  color: t.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : W("", !0)
              ], !0)
            ]),
            !t.withGroupedMenu && !t.hideSearchInputsAboveTable ? xe(O.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: l.value.hasSearchInputs,
              hasSearchInputsWithoutValue: l.value.hasSearchInputsWithoutValue,
              searchInputs: l.value.searchInputsWithoutGlobal,
              onAdd: x
            }, () => [
              l.value.hasSearchInputs ? (I(), be(di, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": l.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": l.value.hasSearchInputsWithoutValue,
                "on-add": x,
                color: t.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : W("", !0)
            ], !0) : W("", !0),
            t.withGroupedMenu ? W("", !0) : xe(O.$slots, "tableColumns", {
              key: 2,
              hasColumns: l.value.hasToggleableColumns,
              columns: a.value.columns,
              hasHiddenColumns: l.value.hasHiddenColumns,
              onChange: k
            }, () => [
              l.value.hasToggleableColumns ? (I(), be(us, {
                key: 0,
                class: Z({ "mr-2 sm:mr-4": E.value }),
                columns: a.value.columns,
                "has-hidden-columns": l.value.hasHiddenColumns,
                "on-change": k,
                "table-name": t.name,
                color: t.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "table-name", "color"])) : W("", !0)
            ], !0),
            t.withGroupedMenu ? xe(O.$slots, "groupedAction", {
              key: 3,
              actions: m.value
            }, () => [
              et(Bs, {
                color: t.color,
                actions: m.value
              }, {
                default: Le(() => [
                  xe(O.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : W("", !0),
            t.withGroupedMenu ? W("", !0) : xe(O.$slots, "tableReset", {
              key: 4,
              canBeReset: E.value,
              onClick: U
            }, () => [
              E.value ? (I(), $("div", Hs, [
                et(As, {
                  "on-click": U,
                  color: t.color
                }, null, 8, ["color"])
              ])) : W("", !0)
            ], !0)
          ]),
          t.hideSearchInputsAboveTable ? W("", !0) : xe(O.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: l.value.hasSearchInputsWithValue,
            searchInputs: l.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: c.value,
            onChange: A
          }, () => [
            l.value.hasSearchInputsWithValue || c.value.length > 0 ? (I(), be(Ps, {
              key: 0,
              "search-inputs": l.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": c.value,
              "on-change": A,
              "on-remove": y,
              color: t.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : W("", !0)
          ], !0),
          xe(O.$slots, "tableWrapper", { meta: p.value }, () => [
            et(js, {
              class: Z({ "mt-3": !h.value })
            }, {
              default: Le(() => [
                xe(O.$slots, "table", {}, () => [
                  b("div", Xs, [
                    b("table", {
                      class: Z(["divide-y divide-gray-300", { "show-resize-indicators": t.resizeableColumns && e.value }]),
                      style: Ct([{ "table-layout": "fixed", "min-width": "100%" }, { width: lt.value }]),
                      onMouseenter: M[1] || (M[1] = (D) => t.resizeableColumns ? _t : null),
                      onMouseleave: M[2] || (M[2] = (D) => t.resizeableColumns ? rt : null)
                    }, [
                      b("thead", Ys, [
                        xe(O.$slots, "head", {
                          show: We,
                          sortBy: Ee,
                          header: Be
                        }, () => [
                          b("tr", null, [
                            t.hasCheckboxes ? (I(), $("th", Qs, [
                              He(b("input", {
                                type: "checkbox",
                                id: `table-${t.name}-select-header`,
                                onChange: vt,
                                "onUpdate:modelValue": M[0] || (M[0] = (D) => f.value = D),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, Js), [
                                [cn, f.value]
                              ])
                            ])) : W("", !0),
                            (I(!0), $(ut, null, ct(a.value.columns, (D) => (I(), be(Wl, {
                              cell: Be(D.key),
                              style: Ct(wt(D.key))
                            }, {
                              label: Le(() => [
                                xe(O.$slots, `header(${D.key})`, {
                                  label: Be(D.key).label,
                                  column: Be(D.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      b("tbody", Zs, [
                        xe(O.$slots, "body", { show: We }, () => [
                          (I(!0), $(ut, null, ct(g.value, (D, Y) => (I(), $("tr", {
                            key: `table-${t.name}-row-${Y}`,
                            class: Z(P(D, Y))
                          }, [
                            t.hasCheckboxes ? (I(), $("td", qs, [
                              He(b("input", {
                                type: "checkbox",
                                id: `table-${t.name}-select-${Y}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (L) => D.__itSelected = L
                              }, null, 8, _s), [
                                [cn, D.__itSelected]
                              ])
                            ])) : W("", !0),
                            (I(!0), $(ut, null, ct(a.value.columns, (L, ye) => He((I(), $("td", {
                              key: `table-${t.name}-row-${Y}-column-${L.key}`,
                              onClick: (Re) => ze(Re, D, Y),
                              class: Z(L.body_class),
                              "data-column-key": L.key,
                              style: Ct({
                                width: St(L.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...Ve(L.key)
                              })
                            }, [
                              xe(O.$slots, `cell(${L.key})`, { item: D }, () => [
                                yt(B(D[L.key]), 1)
                              ], !0)
                            ], 14, eu)), [
                              [Rt, We(L.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                xe(O.$slots, "pagination", {
                  onClick: he,
                  hasData: v.value,
                  meta: p.value,
                  perPageOptions: l.value.perPageOptions,
                  onPerPageChange: V,
                  showExportButton: t.showExportButton,
                  exportUrl: T.value
                }, () => [
                  b("div", tu, [
                    t.hasCheckboxes ? (I(), $("span", ru, B(Ut.value), 1)) : W("", !0),
                    et(si, {
                      "on-click": he,
                      "has-data": v.value,
                      meta: p.value,
                      "per-page-options": l.value.perPageOptions,
                      "on-per-page-change": V,
                      color: t.color,
                      "show-export-button": t.showExportButton,
                      "export-url": T.value
                    }, {
                      exportButton: Le((D) => [
                        xe(O.$slots, "exportButton", lo(io(D)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button", "export-url"])
                  ])
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, Gs))
      ]),
      _: 3
    }));
  }
}, wu = /* @__PURE__ */ qt(nu, [["__scopeId", "data-v-7f0c6493"]]);
export {
  kr as ButtonWithDropdown,
  Wl as HeaderCell,
  wo as OnClickOutside,
  si as Pagination,
  wu as Table,
  di as TableAddSearchRow,
  us as TableColumns,
  bs as TableFilter,
  ws as TableGlobalSearch,
  As as TableReset,
  Ps as TableSearchRows,
  js as TableWrapper,
  jt as getTranslations,
  xu as setTranslation,
  Su as setTranslations
};
