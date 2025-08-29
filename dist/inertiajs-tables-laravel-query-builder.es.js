import qn, { ref as se, onMounted as Ct, onBeforeUnmount as _n, openBlock as I, createElementBlock as M, renderSlot as xe, watch as Ft, inject as ct, createBlock as be, withCtx as Le, createElementVNode as b, normalizeClass as Z, withModifiers as Xe, withDirectives as Ke, vShow as Nt, createStaticVNode as eo, normalizeStyle as Rt, toDisplayString as z, createCommentVNode as K, createTextVNode as pt, computed as me, unref as ae, vModelSelect as Tn, vModelText as Yt, watchEffect as to, onUnmounted as Nr, Teleport as Pr, Fragment as it, renderList as st, createVNode as et, withKeys as un, nextTick as In, resolveDynamicComponent as Kt, reactive as ro, getCurrentInstance as no, provide as oo, Transition as ao, vModelCheckbox as cn, normalizeProps as lo, guardReactiveProps as io } from "vue";
import { createPopper as so } from "@popperjs/core/lib/popper-lite";
import uo from "@popperjs/core/lib/modifiers/preventOverflow";
import co from "@popperjs/core/lib/modifiers/flip";
import { createPopper as fo } from "@popperjs/core";
import vo from "lodash-es/uniq";
import ho from "lodash-es/find";
import Lr from "qs";
import go from "lodash-es/clone";
import po from "lodash-es/filter";
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
    return Ct(() => {
      o.value = (r) => {
        r.target === i.value || i.value.contains(r.target) || n.do();
      }, document.addEventListener("click", o.value), document.addEventListener("touchstart", o.value);
    }), _n(() => {
      document.removeEventListener("click", o.value), document.removeEventListener("touchstart", o.value);
    }), (r, s) => (I(), M("div", {
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
      const a = e.split(rn);
      return a[0] === "" && a.length !== 1 && a.shift(), Pn(a, n) || Co(e);
    },
    getConflictingClassGroupIds: (e, a) => {
      const l = o[e] || [];
      return a && i[e] ? [...l, ...i[e]] : l;
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
    validator: a
  }) => a(s))) == null ? void 0 : e.classGroupId;
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
  const r = i.map((s) => typeof s == "string" ? n + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([e, a]) => [n + e, a])) : s);
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
  } = t, i = n.length === 1, r = n[0], s = n.length, e = (a) => {
    const l = [];
    let u = 0, c = 0, d;
    for (let v = 0; v < a.length; v++) {
      let m = a[v];
      if (u === 0) {
        if (m === r && (i || a.slice(v, v + s) === n)) {
          l.push(a.slice(c, v)), c = v + s;
          continue;
        }
        if (m === "/") {
          d = v;
          continue;
        }
      }
      m === "[" ? u++ : m === "]" && u--;
    }
    const f = l.length === 0 ? a : a.substring(c), g = f.startsWith(An), p = g ? f.substring(1) : f, h = d && d > c ? d - c : void 0;
    return {
      modifiers: l,
      hasImportantModifier: g,
      baseClassName: p,
      maybePostfixModifierPosition: h
    };
  };
  return o ? (a) => o({
    className: a,
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
}), Ro = /\s+/, $o = (t, n) => {
  const {
    parseClassName: o,
    getClassGroupId: i,
    getConflictingClassGroupIds: r
  } = n, s = [], e = t.trim().split(Ro);
  let a = "";
  for (let l = e.length - 1; l >= 0; l -= 1) {
    const u = e[l], {
      modifiers: c,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: g
    } = o(u);
    let p = Boolean(g), h = i(p ? f.substring(0, g) : f);
    if (!h) {
      if (!p) {
        a = u + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (h = i(f), !h) {
        a = u + (a.length > 0 ? " " + a : a);
        continue;
      }
      p = !1;
    }
    const v = Mo(c).join(":"), m = d ? v + An : v, y = m + h;
    if (s.includes(y))
      continue;
    s.push(y);
    const x = r(h, p);
    for (let E = 0; E < x.length; ++E) {
      const P = x[E];
      s.push(m + P);
    }
    a = u + (a.length > 0 ? " " + a : a);
  }
  return a;
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
function jo(t, ...n) {
  let o, i, r, s = e;
  function e(l) {
    const u = n.reduce((c, d) => d(c), t());
    return o = Do(u), i = o.cache.get, r = o.cache.set, s = a, a(l);
  }
  function a(l) {
    const u = i(l);
    if (u)
      return u;
    const c = $o(l, o);
    return r(l, c), c;
  }
  return function() {
    return s(No.apply(null, arguments));
  };
}
const Oe = (t) => {
  const n = (o) => o[t] || [];
  return n.isThemeGetter = !0, n;
}, Dn = /^\[(?:([a-z-]+):)?(.+)\]$/i, Fo = /^\d+\/\d+$/, ko = /* @__PURE__ */ new Set(["px", "full", "screen"]), Lo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, zo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Bo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Uo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Go = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, wt = (t) => Qt(t) || ko.has(t) || Fo.test(t), At = (t) => Zt(t, "length", Jo), Qt = (t) => Boolean(t) && !Number.isNaN(Number(t)), zr = (t) => Zt(t, "number", Qt), er = (t) => Boolean(t) && Number.isInteger(Number(t)), Vo = (t) => t.endsWith("%") && Qt(t.slice(0, -1)), ie = (t) => Dn.test(t), Mt = (t) => Lo.test(t), Wo = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ko = (t) => Zt(t, Wo, Rn), Ho = (t) => Zt(t, "position", Rn), Xo = /* @__PURE__ */ new Set(["image", "url"]), Yo = (t) => Zt(t, Xo, qo), Qo = (t) => Zt(t, "", Zo), tr = () => !0, Zt = (t, n, o) => {
  const i = Dn.exec(t);
  return i ? i[1] ? typeof n == "string" ? i[1] === n : n.has(i[1]) : o(i[2]) : !1;
}, Jo = (t) => zo.test(t) && !Bo.test(t), Rn = () => !1, Zo = (t) => Uo.test(t), qo = (t) => Go.test(t), _o = () => {
  const t = Oe("colors"), n = Oe("spacing"), o = Oe("blur"), i = Oe("brightness"), r = Oe("borderColor"), s = Oe("borderRadius"), e = Oe("borderSpacing"), a = Oe("borderWidth"), l = Oe("contrast"), u = Oe("grayscale"), c = Oe("hueRotate"), d = Oe("invert"), f = Oe("gap"), g = Oe("gradientColorStops"), p = Oe("gradientColorStopPositions"), h = Oe("inset"), v = Oe("margin"), m = Oe("opacity"), y = Oe("padding"), x = Oe("saturate"), E = Oe("scale"), P = Oe("sepia"), O = Oe("skew"), B = Oe("space"), W = Oe("translate"), A = () => ["auto", "contain", "none"], k = () => ["auto", "hidden", "clip", "visible", "scroll"], U = () => ["auto", ie, n], V = () => [ie, n], $ = () => ["", wt, At], j = () => ["auto", Qt, ie], q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], L = () => ["solid", "dashed", "dotted", "double", "none"], Q = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ue = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], he = () => ["", "0", ie], De = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], de = () => [Qt, ie];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [tr],
      spacing: [wt, At],
      blur: ["none", "", Mt, ie],
      brightness: de(),
      borderColor: [t],
      borderRadius: ["none", "", "full", Mt, ie],
      borderSpacing: V(),
      borderWidth: $(),
      contrast: de(),
      grayscale: he(),
      hueRotate: de(),
      invert: he(),
      gap: V(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Vo, At],
      inset: U(),
      margin: U(),
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
        overflow: k()
      }],
      "overflow-x": [{
        "overflow-x": k()
      }],
      "overflow-y": [{
        "overflow-y": k()
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
        inset: [h]
      }],
      "inset-x": [{
        "inset-x": [h]
      }],
      "inset-y": [{
        "inset-y": [h]
      }],
      start: [{
        start: [h]
      }],
      end: [{
        end: [h]
      }],
      top: [{
        top: [h]
      }],
      right: [{
        right: [h]
      }],
      bottom: [{
        bottom: [h]
      }],
      left: [{
        left: [h]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", er, ie]
      }],
      basis: [{
        basis: U()
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
        "col-start": j()
      }],
      "col-end": [{
        "col-end": j()
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
        "row-start": j()
      }],
      "row-end": [{
        "row-end": j()
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
        "space-x": [B]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [B]
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
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", wt, ie]
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
        decoration: [...L(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", wt, At]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", wt, ie]
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
        from: [p]
      }],
      "gradient-via-pos": [{
        via: [p]
      }],
      "gradient-to-pos": [{
        to: [p]
      }],
      "gradient-from": [{
        from: [g]
      }],
      "gradient-via": [{
        via: [g]
      }],
      "gradient-to": [{
        to: [g]
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
        "border-opacity": [m]
      }],
      "border-style": [{
        border: [...L(), "hidden"]
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
        "divide-opacity": [m]
      }],
      "divide-style": [{
        divide: L()
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
        outline: ["", ...L()]
      }],
      "outline-offset": [{
        "outline-offset": [wt, ie]
      }],
      "outline-w": [{
        outline: [wt, At]
      }],
      "outline-color": [{
        outline: [t]
      }],
      "ring-w": [{
        ring: $()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [t]
      }],
      "ring-opacity": [{
        "ring-opacity": [m]
      }],
      "ring-offset-w": [{
        "ring-offset": [wt, At]
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
        "mix-blend": [...Q(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": Q()
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
        contrast: [l]
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
        "backdrop-contrast": [l]
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
        "translate-x": [W]
      }],
      "translate-y": [{
        "translate-y": [W]
      }],
      "skew-x": [{
        "skew-x": [O]
      }],
      "skew-y": [{
        "skew-y": [O]
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
        stroke: [wt, At, zr]
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
}, nt = /* @__PURE__ */ jo(_o);
function Pe(t, n, o, i) {
  let r = n ? { ...n } : {}, s = null, e = o ? { ...o } : {}, a = null, l = i ? { ...i } : {}, u = null;
  for (const c of t)
    s === null && c in r && (r = r[c], typeof r == "string" && (s = r)), a === null && c in e && (e = e[c], typeof e == "string" && (a = e)), u === null && c in l && (l = l[c], typeof l == "string" && (u = l));
  return nt(s, a, u);
}
const ea = { class: "relative" }, ta = ["dusk", "disabled"], ra = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, jr = {
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
    function a() {
      s.value = !s.value;
    }
    function l() {
      s.value = !1;
    }
    Ft(s, () => {
      e.value.update(), s.value || i("closed"), s.value && i("opened");
    });
    const u = se(null), c = se(null);
    Ct(() => {
      e.value = so(u.value, c.value, {
        placement: r.placement,
        modifiers: [co, uo]
      });
    }), n({ hide: l });
    const d = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, f = ct("themeVariables"), g = (p) => {
      var v, m;
      let h = "";
      return p === "button" && r.disabled && (h = "cursor-not-allowed"), nt(
        h,
        Pe([p, "base"], d, (v = f == null ? void 0 : f.inertia_table) == null ? void 0 : v.button_with_dropdown, r.ui),
        Pe([p, "color", r.color], d, (m = f == null ? void 0 : f.inertia_table) == null ? void 0 : m.button_with_dropdown, r.ui)
      );
    };
    return (p, h) => (I(), be(wo, { do: l }, {
      default: Le(() => [
        b("div", ea, [
          b("button", {
            ref_key: "button",
            ref: u,
            type: "button",
            dusk: t.dusk,
            disabled: t.disabled,
            class: Z(g("button")),
            "aria-haspopup": "true",
            onClick: Xe(a, ["prevent"])
          }, [
            xe(p.$slots, "button")
          ], 10, ta),
          Ke(b("div", {
            ref_key: "tooltip",
            ref: c,
            class: "absolute z-10"
          }, [
            b("div", ra, [
              xe(p.$slots, "default")
            ])
          ], 512), [
            [Nt, s.value]
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
    return (i, r) => (I(), M("div", {
      class: Z(["column-resize-handle", {
        resizing: t.isActive,
        visible: t.isActive
      }]),
      onMousedown: o
    }, [...r[0] || (r[0] = [
      eo('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ])], 34));
  }
}, oa = /* @__PURE__ */ qt(na, [["__scopeId", "data-v-672a9339"]]), aa = { class: "w-full flex gap-2 justify-between items-center" }, la = { class: "relative inline-flex items-center cursor-pointer" }, ia = ["checked"], $n = {
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
    }, i = ct("themeVariables"), r = (s) => {
      var a, l, u, c;
      let e = n.color;
      return s === "toggle" && n.filter.value === null && (e = "disabled"), nt(
        Pe([s, "base"], o, (l = (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.table_filter) == null ? void 0 : l.toggle_filter, n.ui),
        Pe([s, "color", e], o, (c = (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : c.toggle_filter, n.ui)
      );
    };
    return (s, e) => (I(), M("div", aa, [
      b("label", la, [
        b("input", {
          type: "checkbox",
          checked: t.filter.value,
          class: "sr-only peer",
          onChange: e[0] || (e[0] = (a) => t.onFilterChange(t.filter.key, a.target.checked ? "1" : "0"))
        }, null, 40, ia),
        b("div", {
          class: Z(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", r("toggle")])
        }, null, 2)
      ]),
      b("button", {
        class: Z(r("reset_button")),
        onClick: e[1] || (e[1] = Xe((a) => t.onFilterChange(t.filter.key, null), ["prevent"]))
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
      return nt(
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
}, va = { key: 0 }, ha = { key: 1 }, ga = { class: "z-40" }, pa = {
  ref: "popover_max",
  class: "relative shadow-md"
}, ma = { key: 0 }, ya = { key: 1 }, ba = { draggable: "true" }, xa = { key: 0 }, Sa = { key: 1 }, wa = { key: 0 }, Ea = { key: 1 };
function Ca(t, n, o, i, r, s) {
  var e, a, l, u;
  return I(), M("div", ua, [
    b("div", ca, [
      b("div", {
        class: Z(s.getTheme("main_bar"))
      }, [
        b("div", {
          class: Z(["absolute", s.getTheme("selected_bar")]),
          style: Rt(`width: ${s.rangeWidth}% !important; left: ${s.currentMinValueInPercent}% !important;`)
        }, null, 6),
        b("div", {
          class: Z([s.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: Rt(`left: ${s.currentMinValueInPercent}%;`),
          onMousedown: n[0] || (n[0] = (c) => s.handleMouseDown(c, !0))
        }, [
          b("div", da, [
            b("div", fa, [
              b("div", {
                class: Z(s.getTheme("popover")),
                style: Rt(s.getMarginTop(r.hasOverlap && s.displayFirstDown))
              }, [
                o.prefix ? (I(), M("span", va, z(o.prefix), 1)) : K("", !0),
                pt(" " + z((e = s.currentMinValue) != null ? e : 0) + " ", 1),
                o.suffix ? (I(), M("span", ha, z(o.suffix), 1)) : K("", !0)
              ], 6),
              (I(), M("svg", {
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
          style: Rt(`left: ${s.currentMaxValueInPercent}%;`),
          onMousedown: n[1] || (n[1] = (c) => s.handleMouseDown(c, !1))
        }, [
          b("div", ga, [
            b("div", pa, [
              b("div", {
                class: Z(s.getTheme("popover")),
                style: Rt(s.getMarginTop(r.hasOverlap && !s.displayFirstDown))
              }, [
                o.prefix ? (I(), M("span", ma, z(o.prefix), 1)) : K("", !0),
                pt(" " + z((a = s.currentMaxValue) != null ? a : 0) + " ", 1),
                o.suffix ? (I(), M("span", ya, z(o.suffix), 1)) : K("", !0)
              ], 6),
              b("div", ba, [
                (I(), M("svg", {
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
          o.prefix ? (I(), M("span", xa, z(o.prefix), 1)) : K("", !0),
          pt(" " + z((l = o.min) != null ? l : 0) + " ", 1),
          o.suffix ? (I(), M("span", Sa, z(o.suffix), 1)) : K("", !0)
        ], 2),
        b("div", {
          class: Z(["absolute -mr-1 bottom-0 right-0 -mb-6", s.getTheme("text")])
        }, [
          o.prefix ? (I(), M("span", wa, z(o.prefix), 1)) : K("", !0),
          pt(" " + z((u = o.max) != null ? u : 0) + " ", 1),
          o.suffix ? (I(), M("span", Ea, z(o.suffix), 1)) : K("", !0)
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
function kt() {
  return nn.translations;
}
function yu(t, n) {
  nn.translations[t] = n;
}
function bu(t) {
  nn.translations = t;
}
const Oa = { class: "space-y-4" }, Ta = { class: "block text-sm font-medium text-gray-700 mb-2" }, Ia = { value: "" }, Pa = { value: "exact" }, Aa = { value: "less_than" }, Ma = { value: "greater_than" }, Da = { value: "less_than_or_equal" }, Ra = { value: "greater_than_or_equal" }, $a = { value: "between" }, Na = {
  key: 0,
  class: "space-y-3"
}, ja = { key: 0 }, Fa = { class: "block text-sm font-medium text-gray-700 mb-1" }, ka = { class: "flex items-center" }, La = {
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
}, _a = { class: "sr-only" }, jn = {
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
    const n = t, o = kt(), i = se(""), r = se(""), s = se(""), e = se(""), a = me(() => i.value !== "" && (i.value !== "between" && r.value !== "" && r.value !== null || i.value === "between" && s.value !== "" && s.value !== null && e.value !== "" && e.value !== null));
    function l() {
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
      let h = null;
      switch (i.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          r.value !== "" && r.value !== null && (h = {
            type: i.value,
            number: r.value
          });
          break;
        case "between":
          s.value !== "" && s.value !== null && e.value !== "" && e.value !== null && (h = {
            type: i.value,
            start_number: s.value,
            end_number: e.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, h);
    }
    function d() {
      i.value = "", r.value = "", s.value = "", e.value = "", n.onFilterChange(n.filter.key, null);
    }
    Ct(() => {
      if (n.filter.value) {
        const h = n.filter.value;
        h.type && (i.value = h.type, h.type === "between" ? (s.value = h.start_number || "", e.value = h.end_number || "") : r.value = h.number || "");
      }
    }), Ft(() => n.filter.value, (h) => {
      h ? h.type && (i.value = h.type, h.type === "between" ? (s.value = h.start_number || "", e.value = h.end_number || "") : r.value = h.number || "") : d();
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
    }, g = ct("themeVariables"), p = (h) => {
      var v, m, y, x;
      return nt(
        Pe([h, "base"], f, (m = (v = g == null ? void 0 : g.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : m.number_filter, n.ui),
        Pe([h, "color", n.color], f, (x = (y = g == null ? void 0 : g.inertia_table) == null ? void 0 : y.table_filter) == null ? void 0 : x.number_filter, n.ui)
      );
    };
    return (h, v) => (I(), M("div", Oa, [
      b("div", null, [
        b("label", Ta, z(ae(o).filter_type), 1),
        Ke(b("select", {
          "onUpdate:modelValue": v[0] || (v[0] = (m) => i.value = m),
          class: Z(p("select")),
          onChange: u
        }, [
          b("option", Ia, z(ae(o).no_filter), 1),
          b("option", Pa, z(ae(o).exact_number), 1),
          b("option", Aa, z(ae(o).less_than), 1),
          b("option", Ma, z(ae(o).greater_than), 1),
          b("option", Da, z(ae(o).less_than_or_equal), 1),
          b("option", Ra, z(ae(o).greater_than_or_equal), 1),
          b("option", $a, z(ae(o).number_range), 1)
        ], 34), [
          [Tn, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (I(), M("div", Na, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(i.value) ? (I(), M("div", ja, [
          b("label", Fa, z(l()), 1),
          b("div", ka, [
            t.filter.prefix ? (I(), M("span", La, z(t.filter.prefix), 1)) : K("", !0),
            Ke(b("input", {
              type: "number",
              "onUpdate:modelValue": v[1] || (v[1] = (m) => r.value = m),
              step: t.filter.step || 1,
              class: Z(p("input")),
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
            t.filter.suffix ? (I(), M("span", Ba, z(t.filter.suffix), 1)) : K("", !0)
          ])
        ])) : K("", !0),
        i.value === "between" ? (I(), M("div", Ua, [
          b("div", null, [
            b("label", Ga, z(ae(o).start_number), 1),
            b("div", Va, [
              t.filter.prefix ? (I(), M("span", Wa, z(t.filter.prefix), 1)) : K("", !0),
              Ke(b("input", {
                type: "number",
                "onUpdate:modelValue": v[2] || (v[2] = (m) => s.value = m),
                step: t.filter.step || 1,
                class: Z(p("input")),
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
              t.filter.suffix ? (I(), M("span", Ha, z(t.filter.suffix), 1)) : K("", !0)
            ])
          ]),
          b("div", null, [
            b("label", Xa, z(ae(o).end_number), 1),
            b("div", Ya, [
              t.filter.prefix ? (I(), M("span", Qa, z(t.filter.prefix), 1)) : K("", !0),
              Ke(b("input", {
                type: "number",
                "onUpdate:modelValue": v[3] || (v[3] = (m) => e.value = m),
                step: t.filter.step || 1,
                class: Z(p("input")),
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
              t.filter.suffix ? (I(), M("span", Za, z(t.filter.suffix), 1)) : K("", !0)
            ])
          ])
        ])) : K("", !0)
      ])) : K("", !0),
      a.value ? (I(), M("div", qa, [
        b("button", {
          type: "button",
          class: Z(p("reset_button")),
          onClick: d
        }, [
          b("span", _a, z(ae(o).reset_filter), 1),
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
      ])) : K("", !0)
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
}, hl = { class: "sr-only" }, Fn = {
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
    const n = t, o = kt(), i = se(""), r = se(""), s = se(""), e = se(""), a = me(() => i.value !== "" && (i.value !== "between" && r.value || i.value === "between" && s.value && e.value));
    function l() {
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
      let h = null;
      switch (i.value) {
        case "exact":
        case "before":
        case "after":
          r.value && (h = {
            type: i.value,
            date: r.value
          });
          break;
        case "between":
          s.value && e.value && (h = {
            type: i.value,
            start_date: s.value,
            end_date: e.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, h);
    }
    function d() {
      i.value = "", r.value = "", s.value = "", e.value = "", n.onFilterChange(n.filter.key, null);
    }
    Ct(() => {
      if (n.filter.value) {
        const h = n.filter.value;
        h.type && (i.value = h.type, h.type === "between" ? (s.value = h.start_date || "", e.value = h.end_date || "") : r.value = h.date || "");
      }
    }), Ft(() => n.filter.value, (h) => {
      h ? h.type && (i.value = h.type, h.type === "between" ? (s.value = h.start_date || "", e.value = h.end_date || "") : r.value = h.date || "") : d();
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
    }, g = ct("themeVariables"), p = (h) => {
      var v, m, y, x;
      return nt(
        Pe([h, "base"], f, (m = (v = g == null ? void 0 : g.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : m.date_filter, n.ui),
        Pe([h, "color", n.color], f, (x = (y = g == null ? void 0 : g.inertia_table) == null ? void 0 : y.table_filter) == null ? void 0 : x.date_filter, n.ui)
      );
    };
    return (h, v) => (I(), M("div", el, [
      b("div", null, [
        b("label", tl, z(ae(o).filter_type), 1),
        Ke(b("select", {
          "onUpdate:modelValue": v[0] || (v[0] = (m) => i.value = m),
          class: Z(p("select")),
          onChange: u
        }, [
          b("option", rl, z(ae(o).no_filter), 1),
          b("option", nl, z(ae(o).exact_date), 1),
          b("option", ol, z(ae(o).before_date), 1),
          b("option", al, z(ae(o).after_date), 1),
          b("option", ll, z(ae(o).date_range), 1)
        ], 34), [
          [Tn, i.value]
        ])
      ]),
      i.value && i.value !== "" ? (I(), M("div", il, [
        ["exact", "before", "after"].includes(i.value) ? (I(), M("div", sl, [
          b("label", ul, z(l()), 1),
          Ke(b("input", {
            type: "date",
            "onUpdate:modelValue": v[1] || (v[1] = (m) => r.value = m),
            class: Z(p("input")),
            onChange: c
          }, null, 34), [
            [Yt, r.value]
          ])
        ])) : K("", !0),
        i.value === "between" ? (I(), M("div", cl, [
          b("div", null, [
            b("label", dl, z(ae(o).start_date), 1),
            Ke(b("input", {
              type: "date",
              "onUpdate:modelValue": v[2] || (v[2] = (m) => s.value = m),
              class: Z(p("input")),
              onChange: c
            }, null, 34), [
              [Yt, s.value]
            ])
          ]),
          b("div", null, [
            b("label", fl, z(ae(o).end_date), 1),
            Ke(b("input", {
              type: "date",
              "onUpdate:modelValue": v[3] || (v[3] = (m) => e.value = m),
              class: Z(p("input")),
              onChange: c
            }, null, 34), [
              [Yt, e.value]
            ])
          ])
        ])) : K("", !0)
      ])) : K("", !0),
      a.value ? (I(), M("div", vl, [
        b("button", {
          type: "button",
          class: Z(p("reset_button")),
          onClick: d
        }, [
          b("span", hl, z(ae(o).reset_filter), 1),
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
      ])) : K("", !0)
    ]));
  }
};
function kn(t) {
  let n = se(null), o = se(null);
  return Ct(() => {
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
const gl = { class: "relative inline-block" }, pl = ["dusk"], ml = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, yl = { class: "p-2" }, bl = ["name", "value", "onChange"], xl = ["value"], Sl = {
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
    const [i, r] = kn({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), s = me(() => n.filters.filter((v) => v.key === n.columnKey || v.key.startsWith(n.columnKey + "_") || v.key.includes(n.columnKey))), e = me(() => s.value.some((v) => !u(v)));
    function a() {
      s.value.length > 0 && (o.value = !o.value);
    }
    function l() {
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
    }, g = ct("themeVariables"), p = (v) => {
      var m, y, x, E;
      return nt(
        Pe([v, "base"], f, (y = (m = g == null ? void 0 : g.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : y.select_filter, n.ui),
        Pe([v, "color", n.color], f, (E = (x = g == null ? void 0 : g.inertia_table) == null ? void 0 : x.table_filter) == null ? void 0 : E.select_filter, n.ui)
      );
    };
    function h(v) {
      r.value && !r.value.contains(v.target) && !v.target.closest(`[dusk="column-filter-${n.columnKey}"]`) && l();
    }
    return Ct(() => {
      document.addEventListener("click", h);
    }), Nr(() => {
      document.removeEventListener("click", h);
    }), (v, m) => (I(), M("div", gl, [
      b("button", {
        ref_key: "trigger",
        ref: i,
        onClick: a,
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
      ])], 10, pl),
      (I(), be(Pr, { to: "body" }, [
        o.value ? (I(), M("div", {
          key: 0,
          ref_key: "container",
          ref: r,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: m[0] || (m[0] = Xe(() => {
          }, ["stop"]))
        }, [
          (I(!0), M(it, null, st(s.value, (y) => (I(), M("div", {
            key: y.key
          }, [
            b("h3", ml, z(y.label), 1),
            b("div", yl, [
              y.type === "select" ? (I(), M("select", {
                key: 0,
                name: y.key,
                value: y.value,
                class: Z(p("select")),
                onChange: (x) => c(y.key, x.target.value)
              }, [
                (I(!0), M(it, null, st(y.options, (x, E) => (I(), M("option", {
                  key: E,
                  value: E
                }, z(x), 9, xl))), 128))
              ], 42, bl)) : K("", !0),
              y.type === "toggle" ? (I(), be($n, {
                key: 1,
                filter: y,
                "on-filter-change": c,
                color: t.color
              }, null, 8, ["filter", "color"])) : K("", !0),
              y.type === "number" ? (I(), M("div", Sl, [
                et(jn, {
                  filter: y,
                  "on-filter-change": c,
                  color: t.color
                }, null, 8, ["filter", "color"])
              ])) : K("", !0),
              y.type === "number_range" ? (I(), M("div", wl, [
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
              ])) : K("", !0),
              y.type === "date" ? (I(), M("div", El, [
                et(Fn, {
                  filter: y,
                  "on-filter-change": c,
                  color: t.color
                }, null, 8, ["filter", "color"])
              ])) : K("", !0)
            ])
          ]))), 128))
        ], 512)) : K("", !0)
      ])),
      (I(), be(Pr, { to: "body" }, [
        o.value ? (I(), M("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: l
        })) : K("", !0)
      ]))
    ]));
  }
}, Ol = { class: "relative inline-block" }, Tl = ["dusk"], Il = { class: "p-3" }, Pl = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, Al = { class: "space-y-2" }, Ml = ["value", "placeholder"], Dl = {
  key: 0,
  class: "flex justify-end"
}, Rl = { class: "sr-only" }, $l = {
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
    const n = t, o = kt(), i = se(!1), r = se(null), [s, e] = kn({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), a = me(() => n.searchInputs.find((y) => y.key === n.columnKey)), l = me(() => a.value && a.value.value || ""), u = me(() => l.value !== "");
    async function c() {
      a.value && (i.value = !i.value, i.value && (await In(), r.value && r.value.focus()));
    }
    function d() {
      i.value = !1;
    }
    function f(y) {
      const x = y.target.value;
      g(x);
    }
    function g(y) {
      n.onSearchChange(n.columnKey, y);
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
    }, h = ct("themeVariables"), v = (y) => {
      var x, E, P, O;
      return nt(
        Pe([y, "base"], p, (E = (x = h == null ? void 0 : h.inertia_table) == null ? void 0 : x.table_search) == null ? void 0 : E.column_search, n.ui),
        Pe([y, "color", n.color], p, (O = (P = h == null ? void 0 : h.inertia_table) == null ? void 0 : P.table_search) == null ? void 0 : O.column_search, n.ui)
      );
    };
    function m(y) {
      e.value && !e.value.contains(y.target) && !y.target.closest(`[dusk="column-search-${n.columnKey}"]`) && d();
    }
    return Ct(() => {
      document.addEventListener("click", m);
    }), Nr(() => {
      document.removeEventListener("click", m);
    }), (y, x) => (I(), M("div", Ol, [
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
        i.value ? (I(), M("div", {
          key: 0,
          ref_key: "container",
          ref: e,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: x[1] || (x[1] = Xe(() => {
          }, ["stop"]))
        }, [
          b("div", Il, [
            b("h3", Pl, z(ae(o).search) + " " + z(t.columnLabel), 1),
            b("div", Al, [
              b("input", {
                ref_key: "searchInput",
                ref: r,
                type: "text",
                value: l.value,
                class: Z(v("input")),
                placeholder: `${ae(o).search} ${t.columnLabel.toLowerCase()}...`,
                onInput: f,
                onKeydown: [
                  un(d, ["enter"]),
                  un(d, ["escape"])
                ]
              }, null, 42, Ml),
              l.value && l.value !== "" ? (I(), M("div", Dl, [
                b("button", {
                  type: "button",
                  class: Z(v("reset_button")),
                  onClick: x[0] || (x[0] = (E) => g(""))
                }, [
                  b("span", Rl, z(ae(o).reset), 1),
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
              ])) : K("", !0)
            ])
          ])
        ], 512)) : K("", !0)
      ])),
      (I(), be(Pr, { to: "body" }, [
        i.value ? (I(), M("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: d
        })) : K("", !0)
      ]))
    ]));
  }
};
const Nl = ["data-column-key"], jl = { class: "flex flex-row items-center justify-between w-full" }, Fl = { class: "flex flex-row items-center" }, kl = { class: "uppercase" }, Ll = ["sorted"], zl = {
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
    const n = t, o = ct("columnResize", null), i = me(() => {
      if (!o)
        return "auto";
      const l = o.getColumnWidth(n.cell.key);
      return l === "auto" ? l : `${l}px`;
    }), r = me(() => (o == null ? void 0 : o.isResizing) || !1), s = me(() => (o == null ? void 0 : o.resizingColumn) || null);
    function e() {
      n.cell.sortable && n.cell.onSort(n.cell.key);
    }
    function a(l, u) {
      o && o.startResize(l, u);
    }
    return (l, u) => Ke((I(), M("th", {
      class: Z(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", t.cell.header_class]),
      style: Rt({ width: i.value }),
      "data-column-key": t.cell.key
    }, [
      (I(), be(Kt(t.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: t.cell.sortable ? `sort-${t.cell.key}` : null,
        onClick: Xe(e, ["prevent"])
      }, {
        default: Le(() => [
          b("span", jl, [
            b("span", Fl, [
              xe(l.$slots, "label", {}, () => [
                b("span", kl, z(t.cell.label), 1)
              ], !0),
              xe(l.$slots, "sort", {}, () => [
                t.cell.sortable ? (I(), M("svg", {
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
                  t.cell.sorted ? K("", !0) : (I(), M("path", zl)),
                  t.cell.sorted === "asc" ? (I(), M("path", Bl)) : K("", !0),
                  t.cell.sorted === "desc" ? (I(), M("path", Ul)) : K("", !0)
                ], 10, Ll)) : K("", !0)
              ], !0)
            ]),
            b("span", Gl, [
              xe(l.$slots, "search", {}, () => [
                t.cell.searchable && t.cell.searchInputs && t.cell.searchInputs.length > 0 ? (I(), be($l, {
                  key: 0,
                  "column-key": t.cell.key,
                  "column-label": t.cell.label,
                  "search-inputs": t.cell.searchInputs,
                  "on-search-change": t.cell.onSearchChange,
                  color: t.cell.color,
                  onClick: u[0] || (u[0] = Xe(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : K("", !0)
              ], !0),
              xe(l.$slots, "filter", {}, () => [
                t.cell.filters && t.cell.filters.length > 0 ? (I(), be(Cl, {
                  key: 0,
                  "column-key": t.cell.key,
                  filters: t.cell.filters,
                  "on-filter-change": t.cell.onFilterChange,
                  color: t.cell.color,
                  onClick: u[1] || (u[1] = Xe(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : K("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      t.cell.resizable !== !1 && ae(o) ? (I(), be(oa, {
        key: 0,
        "column-key": t.cell.key,
        "on-resize": a,
        "is-active": r.value && s.value === t.cell.key
      }, null, 8, ["column-key", "is-active"])) : K("", !0)
    ], 14, Nl)), [
      [Nt, !t.cell.hidden]
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
    const n = kt(), o = t, i = me(() => {
      let a = [...o.options];
      return a.push(parseInt(o.value)), vo(a).sort((l, u) => l - u);
    }), r = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, s = ct("themeVariables"), e = (a) => {
      var l, u;
      return nt(
        Pe([a, "base"], r, (l = s == null ? void 0 : s.inertia_table) == null ? void 0 : l.per_page_selector, o.ui),
        Pe([a, "color", o.color], r, (u = s == null ? void 0 : s.inertia_table) == null ? void 0 : u.per_page_selector, o.ui)
      );
    };
    return (a, l) => (I(), M("select", {
      name: "per_page",
      dusk: t.dusk,
      value: t.value,
      class: Z(e("select")),
      onChange: l[0] || (l[0] = (u) => t.onChange(u.target.value))
    }, [
      (I(!0), M(it, null, st(i.value, (u) => (I(), M("option", {
        key: u,
        value: u
      }, z(u) + " " + z(ae(n).per_page), 9, Hl))), 128))
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
    const n = kt(), o = t, i = me(() => "links" in s.value ? s.value.links.length > 0 : !1), r = me(() => Object.keys(s.value).length > 0), s = me(() => o.meta), e = me(() => "prev_page_url" in s.value ? s.value.prev_page_url : null), a = me(() => "next_page_url" in s.value ? s.value.next_page_url : null), l = me(() => parseInt(s.value.per_page));
    return (u, c) => r.value ? (I(), M("nav", Xl, [
      !t.hasData || s.value.total < 1 ? (I(), M("p", Yl, z(ae(n).no_results_found), 1)) : K("", !0),
      t.hasData ? (I(), M("div", {
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
          onClick: c[0] || (c[0] = Xe((d) => t.onClick(e.value), ["prevent"]))
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
            b("span", Ql, z(ae(n).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        et(hn, {
          dusk: "per-page-mobile",
          value: l.value,
          options: t.perPageOptions,
          "on-change": t.onPerPageChange,
          color: t.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (I(), be(Kt(a.value ? "a" : "div"), {
          class: Z([{
            "cursor-not-allowed text-gray-400": !a.value,
            "text-gray-700 hover:text-gray-500": a.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: a.value,
          dusk: a.value ? "pagination-simple-next" : null,
          onClick: c[1] || (c[1] = Xe((d) => t.onClick(a.value), ["prevent"]))
        }, {
          default: Le(() => [
            b("span", Jl, z(ae(n).next), 1),
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
      ], 2)) : K("", !0),
      t.hasData && i.value ? (I(), M("div", Zl, [
        b("div", ql, [
          et(hn, {
            dusk: "per-page-full",
            value: l.value,
            options: t.perPageOptions,
            "on-change": t.onPerPageChange,
            color: t.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          b("p", _l, [
            b("span", ei, z(s.value.from), 1),
            pt(" " + z(ae(n).to) + " ", 1),
            b("span", ti, z(s.value.to), 1),
            pt(" " + z(ae(n).of) + " ", 1),
            b("span", ri, z(s.value.total), 1),
            pt(" " + z(ae(n).results), 1)
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
              onClick: c[2] || (c[2] = Xe((d) => t.onClick(e.value), ["prevent"]))
            }, {
              default: Le(() => [
                b("span", oi, z(ae(n).previous), 1),
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
            (I(!0), M(it, null, st(s.value.links, (d, f) => (I(), M("div", { key: f }, [
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
                  onClick: Xe((g) => t.onClick(d.url), ["prevent"])
                }, {
                  default: Le(() => [
                    pt(z(d.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : K("", !0)
              ])
            ]))), 128)),
            (I(), be(Kt(a.value ? "a" : "div"), {
              class: Z([{
                "cursor-not-allowed text-gray-400": !a.value,
                "text-gray-500 hover:bg-gray-50": a.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: a.value,
              dusk: a.value ? "pagination-next" : null,
              onClick: c[3] || (c[3] = Xe((d) => t.onClick(a.value), ["prevent"]))
            }, {
              default: Le(() => [
                b("span", ai, z(ae(n).next), 1),
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
        t.showExportButton ? (I(), M("div", li, [
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
              pt(" " + z(ae(n).export_csv), 1)
            ], 8, ii)
          ])
        ])) : K("", !0)
      ])) : K("", !0)
    ])) : K("", !0);
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
    return (r, s) => (I(), be(jr, {
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
          (I(!0), M(it, null, st(t.searchInputs, (e, a) => (I(), M("button", {
            key: a,
            dusk: `add-search-row-${e.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: Xe((l) => i(e.key), ["prevent"])
          }, z(e.label), 9, ci))), 128))
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
function gn(t, n) {
  var o = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    n && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), o.push.apply(o, i);
  }
  return o;
}
function yt(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = arguments[n] != null ? arguments[n] : {};
    n % 2 ? gn(Object(o), !0).forEach(function(i) {
      gi(t, i, o[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : gn(Object(o)).forEach(function(i) {
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
function gi(t, n, o) {
  return n in t ? Object.defineProperty(t, n, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[n] = o, t;
}
function ut() {
  return ut = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
      var o = arguments[n];
      for (var i in o)
        Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
    }
    return t;
  }, ut.apply(this, arguments);
}
function pi(t, n) {
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
  var o = pi(t, n), i, r;
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
function Et(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ot = Et(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), hr = Et(/Edge/i), pn = Et(/firefox/i), ur = Et(/safari/i) && !Et(/chrome/i) && !Et(/android/i), zn = Et(/iP(ad|od|hone)/i), Ci = Et(/chrome/i) && Et(/android/i), Bn = {
  capture: !1,
  passive: !1
};
function fe(t, n, o) {
  t.addEventListener(n, o, !Ot && Bn);
}
function ce(t, n, o) {
  t.removeEventListener(n, o, !Ot && Bn);
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
function ht(t, n, o, i) {
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
function Ut(t, n) {
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
function mt() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function Ie(t, n, o, i, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var s, e, a, l, u, c, d;
    if (t !== window && t.parentNode && t !== mt() ? (s = t.getBoundingClientRect(), e = s.top, a = s.left, l = s.bottom, u = s.right, c = s.height, d = s.width) : (e = 0, a = 0, l = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (n || o) && t !== window && (r = r || t.parentNode, !Ot))
      do
        if (r && r.getBoundingClientRect && (X(r, "transform") !== "none" || o && X(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          e -= f.top + parseInt(X(r, "border-top-width")), a -= f.left + parseInt(X(r, "border-left-width")), l = e + s.height, u = a + s.width;
          break;
        }
      while (r = r.parentNode);
    if (i && t !== window) {
      var g = Ut(r || t), p = g && g.a, h = g && g.d;
      g && (e /= h, a /= p, d /= p, c /= h, l = e + c, u = a + d);
    }
    return {
      top: e,
      left: a,
      bottom: l,
      right: u,
      width: d,
      height: c
    };
  }
}
function yn(t, n, o) {
  for (var i = jt(t, !0), r = Ie(t)[n]; i; ) {
    var s = Ie(i)[o], e = void 0;
    if (o === "top" || o === "left" ? e = r >= s : e = r <= s, !e)
      return i;
    if (i === mt())
      break;
    i = jt(i, !1);
  }
  return !1;
}
function Jt(t, n, o, i) {
  for (var r = 0, s = 0, e = t.children; s < e.length; ) {
    if (e[s].style.display !== "none" && e[s] !== ee.ghost && (i || e[s] !== ee.dragged) && ht(e[s], o.draggable, t, !1)) {
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
function Fe(t, n) {
  var o = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== ee.clone && (!n || Ar(t, n)) && o++;
  return o;
}
function bn(t) {
  var n = 0, o = 0, i = mt();
  if (t)
    do {
      var r = Ut(t), s = r.a, e = r.d;
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
function jt(t, n) {
  if (!t || !t.getBoundingClientRect)
    return mt();
  var o = t, i = !1;
  do
    if (o.clientWidth < o.scrollWidth || o.clientHeight < o.scrollHeight) {
      var r = X(o);
      if (o.clientWidth < o.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || o.clientHeight < o.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!o.getBoundingClientRect || o === document.body)
          return mt();
        if (i || n)
          return o;
        i = !0;
      }
    }
  while (o = o.parentNode);
  return mt();
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
            var s = yt({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var e = Ut(r, !0);
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
      t.forEach(function(a) {
        var l = 0, u = a.target, c = u.fromRect, d = Ie(u), f = u.prevFromRect, g = u.prevToRect, p = a.rect, h = Ut(u, !0);
        h && (d.top -= h.f, d.left -= h.e), u.toRect = d, u.thisAnimationDuration && Br(f, d) && !Br(c, d) && (p.top - d.top) / (p.left - d.left) === (c.top - d.top) / (c.left - d.left) && (l = Di(p, f, g, r.options)), Br(d, c) || (u.prevFromRect = c, u.prevToRect = d, l || (l = r.options.animation), r.animate(u, p, d, l)), l && (s = !0, e = Math.max(e, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(n), s ? n = setTimeout(function() {
        typeof i == "function" && i();
      }, e) : typeof i == "function" && i(), t = [];
    },
    animate: function(i, r, s, e) {
      if (e) {
        X(i, "transition", ""), X(i, "transform", "");
        var a = Ut(this.el), l = a && a.a, u = a && a.d, c = (r.left - s.left) / (l || 1), d = (r.top - s.top) / (u || 1);
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
}, gr = {
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
      !o[e.pluginName] || (o[e.pluginName][s] && o[e.pluginName][s](yt({
        sortable: o
      }, i)), o.options[e.pluginName] && o[e.pluginName][n] && o[e.pluginName][n](yt({
        sortable: o
      }, i)));
    });
  },
  initializePlugins: function(n, o, i, r) {
    Gt.forEach(function(a) {
      var l = a.pluginName;
      if (!(!n.options[l] && !a.initializeByDefault)) {
        var u = new a(n, o, n.options);
        u.sortable = n, u.options = n.options, n[l] = u, ut(i, u.defaults);
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
      typeof r.eventProperties == "function" && ut(i, r.eventProperties.call(o[r.pluginName], n));
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
  var n = t.sortable, o = t.rootEl, i = t.name, r = t.targetEl, s = t.cloneEl, e = t.toEl, a = t.fromEl, l = t.oldIndex, u = t.newIndex, c = t.oldDraggableIndex, d = t.newDraggableIndex, f = t.originalEvent, g = t.putSortable, p = t.extraEventProperties;
  if (n = n || o && o[Qe], !!n) {
    var h, v = n.options, m = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !Ot && !hr ? h = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (h = document.createEvent("Event"), h.initEvent(i, !0, !0)), h.to = e || o, h.from = a || o, h.item = r || o, h.clone = s, h.oldIndex = l, h.newIndex = u, h.oldDraggableIndex = c, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = g ? g.lastPutMode : void 0;
    var y = yt(yt({}, p), gr.getEventProperties(i, n));
    for (var x in y)
      h[x] = y[x];
    o && o.dispatchEvent(h), v[m] && v[m].call(n, h);
  }
}
var Ri = ["evt"], qe = function(n, o) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = i.evt, s = mi(i, Ri);
  gr.pluginEvent.bind(ee)(n, o, yt({
    dragEl: F,
    parentEl: Ne,
    ghostEl: oe,
    rootEl: Te,
    nextEl: Bt,
    lastDownEl: Cr,
    cloneEl: je,
    cloneHidden: $t,
    dragStarted: lr,
    putSortable: He,
    activeSortable: ee.active,
    originalEvent: r,
    oldIndex: Xt,
    oldDraggableIndex: dr,
    newIndex: rt,
    newDraggableIndex: Dt,
    hideGhostForTarget: Xn,
    unhideGhostForTarget: Yn,
    cloneNowHidden: function() {
      $t = !0;
    },
    cloneNowShown: function() {
      $t = !1;
    },
    dispatchSortableEvent: function(a) {
      Je({
        sortable: o,
        name: a,
        originalEvent: r
      });
    }
  }, s));
};
function Je(t) {
  ar(yt({
    putSortable: He,
    cloneEl: je,
    targetEl: F,
    rootEl: Te,
    oldIndex: Xt,
    oldDraggableIndex: dr,
    newIndex: rt,
    newDraggableIndex: Dt
  }, t));
}
var F, Ne, oe, Te, Bt, Cr, je, $t, Xt, rt, dr, Dt, mr, He, Ht = !1, Mr = !1, Dr = [], Lt, ft, Vr, Wr, Sn, wn, lr, Vt, fr, vr = !1, yr = !1, Or, Ye, Kr = [], qr = !1, Rr = [], Fr = typeof document < "u", br = zn, En = hr || Ot ? "cssFloat" : "float", $i = Fr && !Ci && !zn && "draggable" in document.createElement("div"), Wn = function() {
  if (!!Fr) {
    if (Ot)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
}(), Kn = function(n, o) {
  var i = X(n), r = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), s = Jt(n, 0, o), e = Jt(n, 1, o), a = s && X(s), l = e && X(e), u = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + Ie(s).width, c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Ie(e).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (s && a.float && a.float !== "none") {
    var d = a.float === "left" ? "left" : "right";
    return e && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return s && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || u >= r && i[En] === "none" || e && i[En] === "none" && u + c > r) ? "vertical" : "horizontal";
}, Ni = function(n, o, i) {
  var r = i ? n.left : n.top, s = i ? n.right : n.bottom, e = i ? n.width : n.height, a = i ? o.left : o.top, l = i ? o.right : o.bottom, u = i ? o.width : o.height;
  return r === a || s === l || r + e / 2 === a + u / 2;
}, ji = function(n, o) {
  var i;
  return Dr.some(function(r) {
    var s = r[Qe].options.emptyInsertThreshold;
    if (!(!s || on(r))) {
      var e = Ie(r), a = n >= e.left - s && n <= e.right + s, l = o >= e.top - s && o <= e.bottom + s;
      if (a && l)
        return i = r;
    }
  }), i;
}, Hn = function(n) {
  function o(s, e) {
    return function(a, l, u, c) {
      var d = a.options.group.name && l.options.group.name && a.options.group.name === l.options.group.name;
      if (s == null && (e || d))
        return !0;
      if (s == null || s === !1)
        return !1;
      if (e && s === "clone")
        return s;
      if (typeof s == "function")
        return o(s(a, l, u, c), e)(a, l, u, c);
      var f = (e ? a : l).options.group.name;
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
Fr && document.addEventListener("click", function(t) {
  if (Mr)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), Mr = !1, !1;
}, !0);
var zt = function(n) {
  if (F) {
    n = n.touches ? n.touches[0] : n;
    var o = ji(n.clientX, n.clientY);
    if (o) {
      var i = {};
      for (var r in n)
        n.hasOwnProperty(r) && (i[r] = n[r]);
      i.target = i.rootEl = o, i.preventDefault = void 0, i.stopPropagation = void 0, o[Qe]._onDragOver(i);
    }
  }
}, Fi = function(n) {
  F && F.parentNode[Qe]._isOutsideThisEl(n.target);
};
function ee(t, n) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = n = ut({}, n), t[Qe] = this;
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
    setData: function(e, a) {
      e.setData("Text", a.textContent);
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
  gr.initializePlugins(this, t, o);
  for (var i in o)
    !(i in n) && (n[i] = o[i]);
  Hn(n);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = n.forceFallback ? !1 : $i, this.nativeDraggable && (this.options.touchStartThreshold = 1), n.supportPointer ? fe(t, "pointerdown", this._onTapStart) : (fe(t, "mousedown", this._onTapStart), fe(t, "touchstart", this._onTapStart)), this.nativeDraggable && (fe(t, "dragover", this), fe(t, "dragenter", this)), Dr.push(this.el), n.store && n.store.get && this.sort(n.store.get(this) || []), ut(this, Ai());
}
ee.prototype = {
  constructor: ee,
  _isOutsideThisEl: function(n) {
    !this.el.contains(n) && n !== this.el && (Vt = null);
  },
  _getDirection: function(n, o) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, n, o, F) : this.options.direction;
  },
  _onTapStart: function(n) {
    if (!!n.cancelable) {
      var o = this, i = this.el, r = this.options, s = r.preventOnFilter, e = n.type, a = n.touches && n.touches[0] || n.pointerType && n.pointerType === "touch" && n, l = (a || n).target, u = n.target.shadowRoot && (n.path && n.path[0] || n.composedPath && n.composedPath()[0]) || l, c = r.filter;
      if (Wi(i), !F && !(/mousedown|pointerdown/.test(e) && n.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && ur && l && l.tagName.toUpperCase() === "SELECT") && (l = ht(l, r.draggable, i, !1), !(l && l.animated) && Cr !== l)) {
        if (Xt = Fe(l), dr = Fe(l, r.draggable), typeof c == "function") {
          if (c.call(this, n, l, this)) {
            Je({
              sortable: o,
              rootEl: u,
              name: "filter",
              targetEl: l,
              toEl: i,
              fromEl: i
            }), qe("filter", o, {
              evt: n
            }), s && n.cancelable && n.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(d) {
          if (d = ht(u, d.trim(), i, !1), d)
            return Je({
              sortable: o,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: i,
              toEl: i
            }), qe("filter", o, {
              evt: n
            }), !0;
        }), c)) {
          s && n.cancelable && n.preventDefault();
          return;
        }
        r.handle && !ht(u, r.handle, i, !1) || this._prepareDragStart(n, a, l);
      }
    }
  },
  _prepareDragStart: function(n, o, i) {
    var r = this, s = r.el, e = r.options, a = s.ownerDocument, l;
    if (i && !F && i.parentNode === s) {
      var u = Ie(i);
      if (Te = s, F = i, Ne = F.parentNode, Bt = F.nextSibling, Cr = i, mr = e.group, ee.dragged = F, Lt = {
        target: F,
        clientX: (o || n).clientX,
        clientY: (o || n).clientY
      }, Sn = Lt.clientX - u.left, wn = Lt.clientY - u.top, this._lastX = (o || n).clientX, this._lastY = (o || n).clientY, F.style["will-change"] = "all", l = function() {
        if (qe("delayEnded", r, {
          evt: n
        }), ee.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !pn && r.nativeDraggable && (F.draggable = !0), r._triggerDragStart(n, o), Je({
          sortable: r,
          name: "choose",
          originalEvent: n
        }), Me(F, e.chosenClass, !0);
      }, e.ignore.split(",").forEach(function(c) {
        Un(F, c.trim(), Hr);
      }), fe(a, "dragover", zt), fe(a, "mousemove", zt), fe(a, "touchmove", zt), fe(a, "mouseup", r._onDrop), fe(a, "touchend", r._onDrop), fe(a, "touchcancel", r._onDrop), pn && this.nativeDraggable && (this.options.touchStartThreshold = 4, F.draggable = !0), qe("delayStart", this, {
        evt: n
      }), e.delay && (!e.delayOnTouchOnly || o) && (!this.nativeDraggable || !(hr || Ot))) {
        if (ee.eventCanceled) {
          this._onDrop();
          return;
        }
        fe(a, "mouseup", r._disableDelayedDrag), fe(a, "touchend", r._disableDelayedDrag), fe(a, "touchcancel", r._disableDelayedDrag), fe(a, "mousemove", r._delayedDragTouchMoveHandler), fe(a, "touchmove", r._delayedDragTouchMoveHandler), e.supportPointer && fe(a, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, e.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(n) {
    var o = n.touches ? n.touches[0] : n;
    Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    F && Hr(F), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var n = this.el.ownerDocument;
    ce(n, "mouseup", this._disableDelayedDrag), ce(n, "touchend", this._disableDelayedDrag), ce(n, "touchcancel", this._disableDelayedDrag), ce(n, "mousemove", this._delayedDragTouchMoveHandler), ce(n, "touchmove", this._delayedDragTouchMoveHandler), ce(n, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(n, o) {
    o = o || n.pointerType == "touch" && n, !this.nativeDraggable || o ? this.options.supportPointer ? fe(document, "pointermove", this._onTouchMove) : o ? fe(document, "touchmove", this._onTouchMove) : fe(document, "mousemove", this._onTouchMove) : (fe(F, "dragend", this), fe(Te, "dragstart", this._onDragStart));
    try {
      document.selection ? Tr(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(n, o) {
    if (Ht = !1, Te && F) {
      qe("dragStarted", this, {
        evt: o
      }), this.nativeDraggable && fe(document, "dragover", Fi);
      var i = this.options;
      !n && Me(F, i.dragClass, !1), Me(F, i.ghostClass, !0), ee.active = this, n && this._appendGhost(), Je({
        sortable: this,
        name: "start",
        originalEvent: o
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ft) {
      this._lastX = ft.clientX, this._lastY = ft.clientY, Xn();
      for (var n = document.elementFromPoint(ft.clientX, ft.clientY), o = n; n && n.shadowRoot && (n = n.shadowRoot.elementFromPoint(ft.clientX, ft.clientY), n !== o); )
        o = n;
      if (F.parentNode[Qe]._isOutsideThisEl(n), o)
        do {
          if (o[Qe]) {
            var i = void 0;
            if (i = o[Qe]._onDragOver({
              clientX: ft.clientX,
              clientY: ft.clientY,
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
    if (Lt) {
      var o = this.options, i = o.fallbackTolerance, r = o.fallbackOffset, s = n.touches ? n.touches[0] : n, e = oe && Ut(oe, !0), a = oe && e && e.a, l = oe && e && e.d, u = br && Ye && bn(Ye), c = (s.clientX - Lt.clientX + r.x) / (a || 1) + (u ? u[0] - Kr[0] : 0) / (a || 1), d = (s.clientY - Lt.clientY + r.y) / (l || 1) + (u ? u[1] - Kr[1] : 0) / (l || 1);
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
        X(oe, "webkitTransform", f), X(oe, "mozTransform", f), X(oe, "msTransform", f), X(oe, "transform", f), Vr = c, Wr = d, ft = s;
      }
      n.cancelable && n.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!oe) {
      var n = this.options.fallbackOnBody ? document.body : Te, o = Ie(F, !0, br, !0, n), i = this.options;
      if (br) {
        for (Ye = n; X(Ye, "position") === "static" && X(Ye, "transform") === "none" && Ye !== document; )
          Ye = Ye.parentNode;
        Ye !== document.body && Ye !== document.documentElement ? (Ye === document && (Ye = mt()), o.top += Ye.scrollTop, o.left += Ye.scrollLeft) : Ye = mt(), Kr = bn(Ye);
      }
      oe = F.cloneNode(!0), Me(oe, i.ghostClass, !1), Me(oe, i.fallbackClass, !0), Me(oe, i.dragClass, !0), X(oe, "transition", ""), X(oe, "transform", ""), X(oe, "box-sizing", "border-box"), X(oe, "margin", 0), X(oe, "top", o.top), X(oe, "left", o.left), X(oe, "width", o.width), X(oe, "height", o.height), X(oe, "opacity", "0.8"), X(oe, "position", br ? "absolute" : "fixed"), X(oe, "zIndex", "100000"), X(oe, "pointerEvents", "none"), ee.ghost = oe, n.appendChild(oe), X(oe, "transform-origin", Sn / parseInt(oe.style.width) * 100 + "% " + wn / parseInt(oe.style.height) * 100 + "%");
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
    qe("setupClone", this), ee.eventCanceled || (je = an(F), je.draggable = !1, je.style["will-change"] = "", this._hideClone(), Me(je, this.options.chosenClass, !1), ee.clone = je), i.cloneId = Tr(function() {
      qe("clone", i), !ee.eventCanceled && (i.options.removeCloneOnHide || Te.insertBefore(je, F), i._hideClone(), Je({
        sortable: i,
        name: "clone"
      }));
    }), !o && Me(F, s.dragClass, !0), o ? (Mr = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (ce(document, "mouseup", i._onDrop), ce(document, "touchend", i._onDrop), ce(document, "touchcancel", i._onDrop), r && (r.effectAllowed = "move", s.setData && s.setData.call(i, r, F)), fe(document, "drop", i), X(F, "transform", "translateZ(0)")), Ht = !0, i._dragStartId = Tr(i._dragStarted.bind(i, o, n)), fe(document, "selectstart", i), lr = !0, ur && X(document.body, "user-select", "none");
  },
  _onDragOver: function(n) {
    var o = this.el, i = n.target, r, s, e, a = this.options, l = a.group, u = ee.active, c = mr === l, d = a.sort, f = He || u, g, p = this, h = !1;
    if (qr)
      return;
    function v(ue, he) {
      qe(ue, p, yt({
        evt: n,
        isOwner: c,
        axis: g ? "vertical" : "horizontal",
        revert: e,
        dragRect: r,
        targetRect: s,
        canSort: d,
        fromSortable: f,
        target: i,
        completed: y,
        onMove: function(de, Se) {
          return xr(Te, o, F, r, de, Ie(de), n, Se);
        },
        changed: x
      }, he));
    }
    function m() {
      v("dragOverAnimationCapture"), p.captureAnimationState(), p !== f && f.captureAnimationState();
    }
    function y(ue) {
      return v("dragOverCompleted", {
        insertion: ue
      }), ue && (c ? u._hideClone() : u._showClone(p), p !== f && (Me(F, He ? He.options.ghostClass : u.options.ghostClass, !1), Me(F, a.ghostClass, !0)), He !== p && p !== ee.active ? He = p : p === ee.active && He && (He = null), f === p && (p._ignoreWhileAnimating = i), p.animateAll(function() {
        v("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (i === F && !F.animated || i === o && !i.animated) && (Vt = null), !a.dragoverBubble && !n.rootEl && i !== document && (F.parentNode[Qe]._isOutsideThisEl(n.target), !ue && zt(n)), !a.dragoverBubble && n.stopPropagation && n.stopPropagation(), h = !0;
    }
    function x() {
      rt = Fe(F), Dt = Fe(F, a.draggable), Je({
        sortable: p,
        name: "change",
        toEl: o,
        newIndex: rt,
        newDraggableIndex: Dt,
        originalEvent: n
      });
    }
    if (n.preventDefault !== void 0 && n.cancelable && n.preventDefault(), i = ht(i, a.draggable, o, !0), v("dragOver"), ee.eventCanceled)
      return h;
    if (F.contains(n.target) || i.animated && i.animatingX && i.animatingY || p._ignoreWhileAnimating === i)
      return y(!1);
    if (Mr = !1, u && !a.disabled && (c ? d || (e = Ne !== Te) : He === this || (this.lastPutMode = mr.checkPull(this, u, F, n)) && l.checkPut(this, u, F, n))) {
      if (g = this._getDirection(n, i) === "vertical", r = Ie(F), v("dragOverValid"), ee.eventCanceled)
        return h;
      if (e)
        return Ne = Te, m(), this._hideClone(), v("revert"), ee.eventCanceled || (Bt ? Te.insertBefore(F, Bt) : Te.appendChild(F)), y(!0);
      var E = on(o, a.draggable);
      if (!E || Bi(n, g, this) && !E.animated) {
        if (E === F)
          return y(!1);
        if (E && o === n.target && (i = E), i && (s = Ie(i)), xr(Te, o, F, r, i, s, n, !!i) !== !1)
          return m(), o.appendChild(F), Ne = o, x(), y(!0);
      } else if (E && zi(n, g, this)) {
        var P = Jt(o, 0, a, !0);
        if (P === F)
          return y(!1);
        if (i = P, s = Ie(i), xr(Te, o, F, r, i, s, n, !1) !== !1)
          return m(), o.insertBefore(F, P), Ne = o, x(), y(!0);
      } else if (i.parentNode === o) {
        s = Ie(i);
        var O = 0, B, W = F.parentNode !== o, A = !Ni(F.animated && F.toRect || r, i.animated && i.toRect || s, g), k = g ? "top" : "left", U = yn(i, "top", "top") || yn(F, "top", "top"), V = U ? U.scrollTop : void 0;
        Vt !== i && (B = s[k], vr = !1, yr = !A && a.invertSwap || W), O = Ui(n, i, s, g, A ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, yr, Vt === i);
        var $;
        if (O !== 0) {
          var j = Fe(F);
          do
            j -= O, $ = Ne.children[j];
          while ($ && (X($, "display") === "none" || $ === oe));
        }
        if (O === 0 || $ === i)
          return y(!1);
        Vt = i, fr = O;
        var q = i.nextElementSibling, L = !1;
        L = O === 1;
        var Q = xr(Te, o, F, r, i, s, n, L);
        if (Q !== !1)
          return (Q === 1 || Q === -1) && (L = Q === 1), qr = !0, setTimeout(Li, 30), m(), L && !q ? o.appendChild(F) : i.parentNode.insertBefore(F, L ? q : i), U && Vn(U, 0, V - U.scrollTop), Ne = F.parentNode, B !== void 0 && !yr && (Or = Math.abs(B - Ie(i)[k])), x(), y(!0);
      }
      if (o.contains(F))
        return y(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    ce(document, "mousemove", this._onTouchMove), ce(document, "touchmove", this._onTouchMove), ce(document, "pointermove", this._onTouchMove), ce(document, "dragover", zt), ce(document, "mousemove", zt), ce(document, "touchmove", zt);
  },
  _offUpEvents: function() {
    var n = this.el.ownerDocument;
    ce(n, "mouseup", this._onDrop), ce(n, "touchend", this._onDrop), ce(n, "pointerup", this._onDrop), ce(n, "touchcancel", this._onDrop), ce(document, "selectstart", this);
  },
  _onDrop: function(n) {
    var o = this.el, i = this.options;
    if (rt = Fe(F), Dt = Fe(F, i.draggable), qe("drop", this, {
      evt: n
    }), Ne = F && F.parentNode, rt = Fe(F), Dt = Fe(F, i.draggable), ee.eventCanceled) {
      this._nulling();
      return;
    }
    Ht = !1, yr = !1, vr = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _r(this.cloneId), _r(this._dragStartId), this.nativeDraggable && (ce(document, "drop", this), ce(o, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ur && X(document.body, "user-select", ""), X(F, "transform", ""), n && (lr && (n.cancelable && n.preventDefault(), !i.dropBubble && n.stopPropagation()), oe && oe.parentNode && oe.parentNode.removeChild(oe), (Te === Ne || He && He.lastPutMode !== "clone") && je && je.parentNode && je.parentNode.removeChild(je), F && (this.nativeDraggable && ce(F, "dragend", this), Hr(F), F.style["will-change"] = "", lr && !Ht && Me(F, He ? He.options.ghostClass : this.options.ghostClass, !1), Me(F, this.options.chosenClass, !1), Je({
      sortable: this,
      name: "unchoose",
      toEl: Ne,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: n
    }), Te !== Ne ? (rt >= 0 && (Je({
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
    })), He && He.save()) : rt !== Xt && rt >= 0 && (Je({
      sortable: this,
      name: "update",
      toEl: Ne,
      originalEvent: n
    }), Je({
      sortable: this,
      name: "sort",
      toEl: Ne,
      originalEvent: n
    })), ee.active && ((rt == null || rt === -1) && (rt = Xt, Dt = dr), Je({
      sortable: this,
      name: "end",
      toEl: Ne,
      originalEvent: n
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    qe("nulling", this), Te = F = Ne = oe = Bt = je = Cr = $t = Lt = ft = lr = rt = Dt = Xt = dr = Vt = fr = He = mr = ee.dragged = ee.ghost = ee.clone = ee.active = null, Rr.forEach(function(n) {
      n.checked = !0;
    }), Rr.length = Vr = Wr = 0;
  },
  handleEvent: function(n) {
    switch (n.type) {
      case "drop":
      case "dragend":
        this._onDrop(n);
        break;
      case "dragenter":
      case "dragover":
        F && (this._onDragOver(n), ki(n));
        break;
      case "selectstart":
        n.preventDefault();
        break;
    }
  },
  toArray: function() {
    for (var n = [], o, i = this.el.children, r = 0, s = i.length, e = this.options; r < s; r++)
      o = i[r], ht(o, e.draggable, this.el, !1) && n.push(o.getAttribute(e.dataIdAttr) || Vi(o));
    return n;
  },
  sort: function(n, o) {
    var i = {}, r = this.el;
    this.toArray().forEach(function(s, e) {
      var a = r.children[e];
      ht(a, this.options.draggable, r, !1) && (i[s] = a);
    }, this), o && this.captureAnimationState(), n.forEach(function(s) {
      i[s] && (r.removeChild(i[s]), r.appendChild(i[s]));
    }), o && this.animateAll();
  },
  save: function() {
    var n = this.options.store;
    n && n.set && n.set(this);
  },
  closest: function(n, o) {
    return ht(n, o || this.options.draggable, this.el, !1);
  },
  option: function(n, o) {
    var i = this.options;
    if (o === void 0)
      return i[n];
    var r = gr.modifyOption(this, n, o);
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
      X(je, "display", "none"), this.options.removeCloneOnHide && je.parentNode && je.parentNode.removeChild(je), $t = !0;
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
      F.parentNode == Te && !this.options.group.revertClone ? Te.insertBefore(je, F) : Bt ? Te.insertBefore(je, Bt) : Te.appendChild(je), this.options.group.revertClone && this.animate(F, je), X(je, "display", ""), $t = !1;
    }
  }
};
function ki(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function xr(t, n, o, i, r, s, e, a) {
  var l, u = t[Qe], c = u.options.onMove, d;
  return window.CustomEvent && !Ot && !hr ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = n, l.from = t, l.dragged = o, l.draggedRect = i, l.related = r || n, l.relatedRect = s || Ie(n), l.willInsertAfter = a, l.originalEvent = e, t.dispatchEvent(l), c && (d = c.call(u, l, e)), d;
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
function Ui(t, n, o, i, r, s, e, a) {
  var l = i ? t.clientY : t.clientX, u = i ? o.height : o.width, c = i ? o.top : o.left, d = i ? o.bottom : o.right, f = !1;
  if (!e) {
    if (a && Or < u * r) {
      if (!vr && (fr === 1 ? l > c + u * s / 2 : l < d - u * s / 2) && (vr = !0), vr)
        f = !0;
      else if (fr === 1 ? l < c + Or : l > d - Or)
        return -fr;
    } else if (l > c + u * (1 - r) / 2 && l < d - u * (1 - r) / 2)
      return Gi(n);
  }
  return f = f || e, f && (l < c + u * s / 2 || l > d - u * s / 2) ? l > c + u / 2 ? 1 : -1 : 0;
}
function Gi(t) {
  return Fe(F) < Fe(t) ? 1 : -1;
}
function Vi(t) {
  for (var n = t.tagName + t.className + t.src + t.href + t.textContent, o = n.length, i = 0; o--; )
    i += n.charCodeAt(o);
  return i.toString(36);
}
function Wi(t) {
  Rr.length = 0;
  for (var n = t.getElementsByTagName("input"), o = n.length; o--; ) {
    var i = n[o];
    i.checked && Rr.push(i);
  }
}
function Tr(t) {
  return setTimeout(t, 0);
}
function _r(t) {
  return clearTimeout(t);
}
Fr && fe(document, "touchmove", function(t) {
  (ee.active || Ht) && t.cancelable && t.preventDefault();
});
ee.utils = {
  on: fe,
  off: ce,
  css: X,
  find: Un,
  is: function(n, o) {
    return !!ht(n, o, n, !1);
  },
  extend: Ii,
  throttle: Gn,
  closest: ht,
  toggleClass: Me,
  clone: an,
  index: Fe,
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
    i.utils && (ee.utils = yt(yt({}, ee.utils), i.utils)), gr.mount(i);
  });
};
ee.create = function(t, n) {
  return new ee(t, n);
};
ee.version = Ei;
var Ge = [], ir, en, tn = !1, Xr, Yr, $r, sr;
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
      $r = en = ir = tn = sr = Xr = Yr = null, Ge.length = 0;
    },
    _handleFallbackAutoScroll: function(o) {
      this._handleAutoScroll(o, !0);
    },
    _handleAutoScroll: function(o, i) {
      var r = this, s = (o.touches ? o.touches[0] : o).clientX, e = (o.touches ? o.touches[0] : o).clientY, a = document.elementFromPoint(s, e);
      if ($r = o, i || this.options.forceAutoScrollFallback || hr || Ot || ur) {
        Qr(o, this.options, a, i);
        var l = jt(a, !0);
        tn && (!sr || s !== Xr || e !== Yr) && (sr && Cn(), sr = setInterval(function() {
          var u = jt(document.elementFromPoint(s, e), !0);
          u !== l && (l = u, Ir()), Qr(o, r.options, u, i);
        }, 10), Xr = s, Yr = e);
      } else {
        if (!this.options.bubbleScroll || jt(a, !0) === mt()) {
          Ir();
          return;
        }
        Qr(o, this.options, jt(a, !1), !1);
      }
    }
  }, ut(t, {
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
    var r = (t.touches ? t.touches[0] : t).clientX, s = (t.touches ? t.touches[0] : t).clientY, e = n.scrollSensitivity, a = n.scrollSpeed, l = mt(), u = !1, c;
    en !== o && (en = o, Ir(), ir = n.scroll, c = n.scrollFn, ir === !0 && (ir = jt(o, !0)));
    var d = 0, f = ir;
    do {
      var g = f, p = Ie(g), h = p.top, v = p.bottom, m = p.left, y = p.right, x = p.width, E = p.height, P = void 0, O = void 0, B = g.scrollWidth, W = g.scrollHeight, A = X(g), k = g.scrollLeft, U = g.scrollTop;
      g === l ? (P = x < B && (A.overflowX === "auto" || A.overflowX === "scroll" || A.overflowX === "visible"), O = E < W && (A.overflowY === "auto" || A.overflowY === "scroll" || A.overflowY === "visible")) : (P = x < B && (A.overflowX === "auto" || A.overflowX === "scroll"), O = E < W && (A.overflowY === "auto" || A.overflowY === "scroll"));
      var V = P && (Math.abs(y - r) <= e && k + x < B) - (Math.abs(m - r) <= e && !!k), $ = O && (Math.abs(v - s) <= e && U + E < W) - (Math.abs(h - s) <= e && !!U);
      if (!Ge[d])
        for (var j = 0; j <= d; j++)
          Ge[j] || (Ge[j] = {});
      (Ge[d].vx != V || Ge[d].vy != $ || Ge[d].el !== g) && (Ge[d].el = g, Ge[d].vx = V, Ge[d].vy = $, clearInterval(Ge[d].pid), (V != 0 || $ != 0) && (u = !0, Ge[d].pid = setInterval(function() {
        i && this.layer === 0 && ee.active._onTouchMove($r);
        var q = Ge[this.layer].vy ? Ge[this.layer].vy * a : 0, L = Ge[this.layer].vx ? Ge[this.layer].vx * a : 0;
        typeof c == "function" && c.call(ee.dragged.parentNode[Qe], L, q, t, $r, Ge[this.layer].el) !== "continue" || Vn(Ge[this.layer].el, L, q);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (n.bubbleScroll && f !== l && (f = jt(f, !1)));
    tn = u;
  }
}, 30), Qn = function(n) {
  var o = n.originalEvent, i = n.putSortable, r = n.dragEl, s = n.activeSortable, e = n.dispatchSortableEvent, a = n.hideGhostForTarget, l = n.unhideGhostForTarget;
  if (!!o) {
    var u = i || s;
    a();
    var c = o.changedTouches && o.changedTouches.length ? o.changedTouches[0] : o, d = document.elementFromPoint(c.clientX, c.clientY);
    l(), u && !u.el.contains(d) && (e("spill"), this.onSpill({
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
ut(ln, {
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
ut(sn, {
  pluginName: "removeOnSpill"
});
var lt;
function Hi() {
  function t() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return t.prototype = {
    dragStart: function(o) {
      var i = o.dragEl;
      lt = i;
    },
    dragOverValid: function(o) {
      var i = o.completed, r = o.target, s = o.onMove, e = o.activeSortable, a = o.changed, l = o.cancel;
      if (!!e.options.swap) {
        var u = this.sortable.el, c = this.options;
        if (r && r !== u) {
          var d = lt;
          s(r) !== !1 ? (Me(r, c.swapClass, !0), lt = r) : lt = null, d && d !== lt && Me(d, c.swapClass, !1);
        }
        a(), i(!0), l();
      }
    },
    drop: function(o) {
      var i = o.activeSortable, r = o.putSortable, s = o.dragEl, e = r || this.sortable, a = this.options;
      lt && Me(lt, a.swapClass, !1), lt && (a.swap || r && r.options.swap) && s !== lt && (e.captureAnimationState(), e !== i && i.captureAnimationState(), Xi(s, lt), e.animateAll(), e !== i && i.animateAll());
    },
    nulling: function() {
      lt = null;
    }
  }, ut(t, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: lt
      };
    }
  });
}
function Xi(t, n) {
  var o = t.parentNode, i = n.parentNode, r, s;
  !o || !i || o.isEqualNode(n) || i.isEqualNode(t) || (r = Fe(t), s = Fe(n), o.isEqualNode(i) && r < s && s++, o.insertBefore(n, o.children[r]), i.insertBefore(t, i.children[s]));
}
var ne = [], tt = [], rr, vt, nr = !1, _e = !1, Wt = !1, Ce, or, Sr;
function Yi() {
  function t(n) {
    for (var o in this)
      o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
    n.options.supportPointer ? fe(document, "pointerup", this._deselectMultiDrag) : (fe(document, "mouseup", this._deselectMultiDrag), fe(document, "touchend", this._deselectMultiDrag)), fe(document, "keydown", this._checkKeyDown), fe(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function(r, s) {
        var e = "";
        ne.length && vt === n ? ne.forEach(function(a, l) {
          e += (l ? ", " : "") + a.textContent;
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
          tt.push(an(ne[s])), tt[s].sortableIndex = ne[s].sortableIndex, tt[s].draggable = !1, tt[s].style["will-change"] = "", Me(tt[s], this.options.selectedClass, !1), ne[s] === Ce && Me(tt[s], this.options.chosenClass, !1);
        i._hideClone(), r();
      }
    },
    clone: function(o) {
      var i = o.sortable, r = o.rootEl, s = o.dispatchSortableEvent, e = o.cancel;
      !this.isMultiDrag || this.options.removeCloneOnHide || ne.length && vt === i && (On(!0, r), s("clone"), e());
    },
    showClone: function(o) {
      var i = o.cloneNowShown, r = o.rootEl, s = o.cancel;
      !this.isMultiDrag || (On(!1, r), tt.forEach(function(e) {
        X(e, "display", "");
      }), i(), Sr = !1, s());
    },
    hideClone: function(o) {
      var i = this;
      o.sortable;
      var r = o.cloneNowHidden, s = o.cancel;
      !this.isMultiDrag || (tt.forEach(function(e) {
        X(e, "display", "none"), i.options.removeCloneOnHide && e.parentNode && e.parentNode.removeChild(e);
      }), r(), Sr = !0, s());
    },
    dragStartGlobal: function(o) {
      o.sortable, !this.isMultiDrag && vt && vt.multiDrag._deselectMultiDrag(), ne.forEach(function(i) {
        i.sortableIndex = Fe(i);
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
      ne.length > 1 && (ne.forEach(function(a) {
        s.addAnimationState({
          target: a,
          rect: _e ? Ie(a) : e
        }), Ur(a), a.fromRect = e, i.removeAnimationState(a);
      }), _e = !1, Qi(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(o) {
      var i = o.sortable, r = o.isOwner, s = o.insertion, e = o.activeSortable, a = o.parentEl, l = o.putSortable, u = this.options;
      if (s) {
        if (r && e._hideClone(), nr = !1, u.animation && ne.length > 1 && (_e || !r && !e.options.sort && !l)) {
          var c = Ie(Ce, !1, !0, !0);
          ne.forEach(function(f) {
            f !== Ce && (xn(f, c), a.appendChild(f));
          }), _e = !0;
        }
        if (!r)
          if (_e || wr(), ne.length > 1) {
            var d = Sr;
            e._showClone(i), e.options.animation && !Sr && d && tt.forEach(function(f) {
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
      if (ne.forEach(function(a) {
        a.thisAnimationDuration = null;
      }), s.options.animation && !r && s.multiDrag.isMultiDrag) {
        or = ut({}, i);
        var e = Ut(Ce, !0);
        or.top -= e.f, or.left -= e.e;
      }
    },
    dragOverAnimationComplete: function() {
      _e && (_e = !1, wr());
    },
    drop: function(o) {
      var i = o.originalEvent, r = o.rootEl, s = o.parentEl, e = o.sortable, a = o.dispatchSortableEvent, l = o.oldIndex, u = o.putSortable, c = u || this.sortable;
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
              var g = Fe(rr), p = Fe(Ce);
              if (~g && ~p && g !== p) {
                var h, v;
                for (p > g ? (v = g, h = p) : (v = p, h = g + 1); v < h; v++)
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
            vt = c;
          }
        if (Wt && this.isMultiDrag) {
          if (_e = !1, (s[Qe].options.sort || s !== r) && ne.length > 1) {
            var m = Ie(Ce), y = Fe(Ce, ":not(." + this.options.selectedClass + ")");
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
            }), l === Fe(Ce))) {
              var x = !1;
              ne.forEach(function(E) {
                if (E.sortableIndex !== Fe(E)) {
                  x = !0;
                  return;
                }
              }), x && a("update");
            }
            ne.forEach(function(E) {
              Ur(E);
            }), c.animateAll();
          }
          vt = c;
        }
        (r === s || u && u.lastPutMode !== "clone") && tt.forEach(function(E) {
          E.parentNode && E.parentNode.removeChild(E);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Wt = !1, tt.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), ce(document, "pointerup", this._deselectMultiDrag), ce(document, "mouseup", this._deselectMultiDrag), ce(document, "touchend", this._deselectMultiDrag), ce(document, "keydown", this._checkKeyDown), ce(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(o) {
      if (!(typeof Wt < "u" && Wt) && vt === this.sortable && !(o && ht(o.target, this.options.draggable, this.sortable.el, !1)) && !(o && o.button !== 0))
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
  }, ut(t, {
    pluginName: "multiDrag",
    utils: {
      select: function(o) {
        var i = o.parentNode[Qe];
        !i || !i.options.multiDrag || ~ne.indexOf(o) || (vt && vt !== i && (vt.multiDrag._deselectMultiDrag(), vt = i), Me(o, i.options.selectedClass, !0), ne.push(o));
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
        _e && s !== Ce ? e = -1 : _e ? e = Fe(s, ":not(." + o.options.selectedClass + ")") : e = Fe(s), r.push({
          multiDragElement: s,
          index: e
        });
      }), {
        items: yi(ne),
        clones: [].concat(tt),
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
  tt.forEach(function(o, i) {
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
      function e(a) {
        if (s[a])
          return s[a].exports;
        var l = s[a] = {
          i: a,
          l: !1,
          exports: {}
        };
        return r[a].call(l.exports, l, l.exports, e), l.l = !0, l.exports;
      }
      return e.m = r, e.c = s, e.d = function(a, l, u) {
        e.o(a, l) || Object.defineProperty(a, l, { enumerable: !0, get: u });
      }, e.r = function(a) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 });
      }, e.t = function(a, l) {
        if (l & 1 && (a = e(a)), l & 8 || l & 4 && typeof a == "object" && a && a.__esModule)
          return a;
        var u = /* @__PURE__ */ Object.create(null);
        if (e.r(u), Object.defineProperty(u, "default", { enumerable: !0, value: a }), l & 2 && typeof a != "string")
          for (var c in a)
            e.d(u, c, function(d) {
              return a[d];
            }.bind(null, c));
        return u;
      }, e.n = function(a) {
        var l = a && a.__esModule ? function() {
          return a.default;
        } : function() {
          return a;
        };
        return e.d(l, "a", l), l;
      }, e.o = function(a, l) {
        return Object.prototype.hasOwnProperty.call(a, l);
      }, e.p = "", e(e.s = "fb15");
    }({
      "00ee": function(r, s, e) {
        var a = e("b622"), l = a("toStringTag"), u = {};
        u[l] = "z", r.exports = String(u) === "[object z]";
      },
      "0366": function(r, s, e) {
        var a = e("1c0b");
        r.exports = function(l, u, c) {
          if (a(l), u === void 0)
            return l;
          switch (c) {
            case 0:
              return function() {
                return l.call(u);
              };
            case 1:
              return function(d) {
                return l.call(u, d);
              };
            case 2:
              return function(d, f) {
                return l.call(u, d, f);
              };
            case 3:
              return function(d, f, g) {
                return l.call(u, d, f, g);
              };
          }
          return function() {
            return l.apply(u, arguments);
          };
        };
      },
      "057f": function(r, s, e) {
        var a = e("fc6a"), l = e("241c").f, u = {}.toString, c = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], d = function(f) {
          try {
            return l(f);
          } catch {
            return c.slice();
          }
        };
        r.exports.f = function(g) {
          return c && u.call(g) == "[object Window]" ? d(g) : l(a(g));
        };
      },
      "06cf": function(r, s, e) {
        var a = e("83ab"), l = e("d1e7"), u = e("5c6c"), c = e("fc6a"), d = e("c04e"), f = e("5135"), g = e("0cfb"), p = Object.getOwnPropertyDescriptor;
        s.f = a ? p : function(v, m) {
          if (v = c(v), m = d(m, !0), g)
            try {
              return p(v, m);
            } catch {
            }
          if (f(v, m))
            return u(!l.f.call(v, m), v[m]);
        };
      },
      "0cfb": function(r, s, e) {
        var a = e("83ab"), l = e("d039"), u = e("cc12");
        r.exports = !a && !l(function() {
          return Object.defineProperty(u("div"), "a", {
            get: function() {
              return 7;
            }
          }).a != 7;
        });
      },
      "13d5": function(r, s, e) {
        var a = e("23e7"), l = e("d58f").left, u = e("a640"), c = e("ae40"), d = u("reduce"), f = c("reduce", { 1: 0 });
        a({ target: "Array", proto: !0, forced: !d || !f }, {
          reduce: function(p) {
            return l(this, p, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "14c3": function(r, s, e) {
        var a = e("c6b6"), l = e("9263");
        r.exports = function(u, c) {
          var d = u.exec;
          if (typeof d == "function") {
            var f = d.call(u, c);
            if (typeof f != "object")
              throw TypeError("RegExp exec method returned something other than an Object or null");
            return f;
          }
          if (a(u) !== "RegExp")
            throw TypeError("RegExp#exec called on incompatible receiver");
          return l.call(u, c);
        };
      },
      "159b": function(r, s, e) {
        var a = e("da84"), l = e("fdbc"), u = e("17c2"), c = e("9112");
        for (var d in l) {
          var f = a[d], g = f && f.prototype;
          if (g && g.forEach !== u)
            try {
              c(g, "forEach", u);
            } catch {
              g.forEach = u;
            }
        }
      },
      "17c2": function(r, s, e) {
        var a = e("b727").forEach, l = e("a640"), u = e("ae40"), c = l("forEach"), d = u("forEach");
        r.exports = !c || !d ? function(g) {
          return a(this, g, arguments.length > 1 ? arguments[1] : void 0);
        } : [].forEach;
      },
      "1be4": function(r, s, e) {
        var a = e("d066");
        r.exports = a("document", "documentElement");
      },
      "1c0b": function(r, s) {
        r.exports = function(e) {
          if (typeof e != "function")
            throw TypeError(String(e) + " is not a function");
          return e;
        };
      },
      "1c7e": function(r, s, e) {
        var a = e("b622"), l = a("iterator"), u = !1;
        try {
          var c = 0, d = {
            next: function() {
              return { done: !!c++ };
            },
            return: function() {
              u = !0;
            }
          };
          d[l] = function() {
            return this;
          }, Array.from(d, function() {
            throw 2;
          });
        } catch {
        }
        r.exports = function(f, g) {
          if (!g && !u)
            return !1;
          var p = !1;
          try {
            var h = {};
            h[l] = function() {
              return {
                next: function() {
                  return { done: p = !0 };
                }
              };
            }, f(h);
          } catch {
          }
          return p;
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
        var a = e("d039"), l = e("b622"), u = e("2d00"), c = l("species");
        r.exports = function(d) {
          return u >= 51 || !a(function() {
            var f = [], g = f.constructor = {};
            return g[c] = function() {
              return { foo: 1 };
            }, f[d](Boolean).foo !== 1;
          });
        };
      },
      "23cb": function(r, s, e) {
        var a = e("a691"), l = Math.max, u = Math.min;
        r.exports = function(c, d) {
          var f = a(c);
          return f < 0 ? l(f + d, 0) : u(f, d);
        };
      },
      "23e7": function(r, s, e) {
        var a = e("da84"), l = e("06cf").f, u = e("9112"), c = e("6eeb"), d = e("ce4e"), f = e("e893"), g = e("94ca");
        r.exports = function(p, h) {
          var v = p.target, m = p.global, y = p.stat, x, E, P, O, B, W;
          if (m ? E = a : y ? E = a[v] || d(v, {}) : E = (a[v] || {}).prototype, E)
            for (P in h) {
              if (B = h[P], p.noTargetGet ? (W = l(E, P), O = W && W.value) : O = E[P], x = g(m ? P : v + (y ? "." : "#") + P, p.forced), !x && O !== void 0) {
                if (typeof B == typeof O)
                  continue;
                f(B, O);
              }
              (p.sham || O && O.sham) && u(B, "sham", !0), c(E, P, B, p);
            }
        };
      },
      "241c": function(r, s, e) {
        var a = e("ca84"), l = e("7839"), u = l.concat("length", "prototype");
        s.f = Object.getOwnPropertyNames || function(d) {
          return a(d, u);
        };
      },
      "25f0": function(r, s, e) {
        var a = e("6eeb"), l = e("825a"), u = e("d039"), c = e("ad6d"), d = "toString", f = RegExp.prototype, g = f[d], p = u(function() {
          return g.call({ source: "a", flags: "b" }) != "/a/b";
        }), h = g.name != d;
        (p || h) && a(RegExp.prototype, d, function() {
          var m = l(this), y = String(m.source), x = m.flags, E = String(x === void 0 && m instanceof RegExp && !("flags" in f) ? c.call(m) : x);
          return "/" + y + "/" + E;
        }, { unsafe: !0 });
      },
      "2ca0": function(r, s, e) {
        var a = e("23e7"), l = e("06cf").f, u = e("50c4"), c = e("5a34"), d = e("1d80"), f = e("ab13"), g = e("c430"), p = "".startsWith, h = Math.min, v = f("startsWith"), m = !g && !v && !!function() {
          var y = l(String.prototype, "startsWith");
          return y && !y.writable;
        }();
        a({ target: "String", proto: !0, forced: !m && !v }, {
          startsWith: function(x) {
            var E = String(d(this));
            c(x);
            var P = u(h(arguments.length > 1 ? arguments[1] : void 0, E.length)), O = String(x);
            return p ? p.call(E, O, P) : E.slice(P, P + O.length) === O;
          }
        });
      },
      "2d00": function(r, s, e) {
        var a = e("da84"), l = e("342f"), u = a.process, c = u && u.versions, d = c && c.v8, f, g;
        d ? (f = d.split("."), g = f[0] + f[1]) : l && (f = l.match(/Edge\/(\d+)/), (!f || f[1] >= 74) && (f = l.match(/Chrome\/(\d+)/), f && (g = f[1]))), r.exports = g && +g;
      },
      "342f": function(r, s, e) {
        var a = e("d066");
        r.exports = a("navigator", "userAgent") || "";
      },
      "35a1": function(r, s, e) {
        var a = e("f5df"), l = e("3f8c"), u = e("b622"), c = u("iterator");
        r.exports = function(d) {
          if (d != null)
            return d[c] || d["@@iterator"] || l[a(d)];
        };
      },
      "37e8": function(r, s, e) {
        var a = e("83ab"), l = e("9bf2"), u = e("825a"), c = e("df75");
        r.exports = a ? Object.defineProperties : function(f, g) {
          u(f);
          for (var p = c(g), h = p.length, v = 0, m; h > v; )
            l.f(f, m = p[v++], g[m]);
          return f;
        };
      },
      "3bbe": function(r, s, e) {
        var a = e("861d");
        r.exports = function(l) {
          if (!a(l) && l !== null)
            throw TypeError("Can't set " + String(l) + " as a prototype");
          return l;
        };
      },
      "3ca3": function(r, s, e) {
        var a = e("6547").charAt, l = e("69f3"), u = e("7dd0"), c = "String Iterator", d = l.set, f = l.getterFor(c);
        u(String, "String", function(g) {
          d(this, {
            type: c,
            string: String(g),
            index: 0
          });
        }, function() {
          var p = f(this), h = p.string, v = p.index, m;
          return v >= h.length ? { value: void 0, done: !0 } : (m = a(h, v), p.index += m.length, { value: m, done: !1 });
        });
      },
      "3f8c": function(r, s) {
        r.exports = {};
      },
      4160: function(r, s, e) {
        var a = e("23e7"), l = e("17c2");
        a({ target: "Array", proto: !0, forced: [].forEach != l }, {
          forEach: l
        });
      },
      "428f": function(r, s, e) {
        var a = e("da84");
        r.exports = a;
      },
      "44ad": function(r, s, e) {
        var a = e("d039"), l = e("c6b6"), u = "".split;
        r.exports = a(function() {
          return !Object("z").propertyIsEnumerable(0);
        }) ? function(c) {
          return l(c) == "String" ? u.call(c, "") : Object(c);
        } : Object;
      },
      "44d2": function(r, s, e) {
        var a = e("b622"), l = e("7c73"), u = e("9bf2"), c = a("unscopables"), d = Array.prototype;
        d[c] == null && u.f(d, c, {
          configurable: !0,
          value: l(null)
        }), r.exports = function(f) {
          d[c][f] = !0;
        };
      },
      "44e7": function(r, s, e) {
        var a = e("861d"), l = e("c6b6"), u = e("b622"), c = u("match");
        r.exports = function(d) {
          var f;
          return a(d) && ((f = d[c]) !== void 0 ? !!f : l(d) == "RegExp");
        };
      },
      4930: function(r, s, e) {
        var a = e("d039");
        r.exports = !!Object.getOwnPropertySymbols && !a(function() {
          return !String(Symbol());
        });
      },
      "4d64": function(r, s, e) {
        var a = e("fc6a"), l = e("50c4"), u = e("23cb"), c = function(d) {
          return function(f, g, p) {
            var h = a(f), v = l(h.length), m = u(p, v), y;
            if (d && g != g) {
              for (; v > m; )
                if (y = h[m++], y != y)
                  return !0;
            } else
              for (; v > m; m++)
                if ((d || m in h) && h[m] === g)
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
        var a = e("23e7"), l = e("b727").filter, u = e("1dde"), c = e("ae40"), d = u("filter"), f = c("filter");
        a({ target: "Array", proto: !0, forced: !d || !f }, {
          filter: function(p) {
            return l(this, p, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      "4df4": function(r, s, e) {
        var a = e("0366"), l = e("7b0b"), u = e("9bdd"), c = e("e95a"), d = e("50c4"), f = e("8418"), g = e("35a1");
        r.exports = function(h) {
          var v = l(h), m = typeof this == "function" ? this : Array, y = arguments.length, x = y > 1 ? arguments[1] : void 0, E = x !== void 0, P = g(v), O = 0, B, W, A, k, U, V;
          if (E && (x = a(x, y > 2 ? arguments[2] : void 0, 2)), P != null && !(m == Array && c(P)))
            for (k = P.call(v), U = k.next, W = new m(); !(A = U.call(k)).done; O++)
              V = E ? u(k, x, [A.value, O], !0) : A.value, f(W, O, V);
          else
            for (B = d(v.length), W = new m(B); B > O; O++)
              V = E ? x(v[O], O) : v[O], f(W, O, V);
          return W.length = O, W;
        };
      },
      "4fad": function(r, s, e) {
        var a = e("23e7"), l = e("6f53").entries;
        a({ target: "Object", stat: !0 }, {
          entries: function(c) {
            return l(c);
          }
        });
      },
      "50c4": function(r, s, e) {
        var a = e("a691"), l = Math.min;
        r.exports = function(u) {
          return u > 0 ? l(a(u), 9007199254740991) : 0;
        };
      },
      5135: function(r, s) {
        var e = {}.hasOwnProperty;
        r.exports = function(a, l) {
          return e.call(a, l);
        };
      },
      5319: function(r, s, e) {
        var a = e("d784"), l = e("825a"), u = e("7b0b"), c = e("50c4"), d = e("a691"), f = e("1d80"), g = e("8aa5"), p = e("14c3"), h = Math.max, v = Math.min, m = Math.floor, y = /\$([$&'`]|\d\d?|<[^>]*>)/g, x = /\$([$&'`]|\d\d?)/g, E = function(P) {
          return P === void 0 ? P : String(P);
        };
        a("replace", 2, function(P, O, B, W) {
          var A = W.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, k = W.REPLACE_KEEPS_$0, U = A ? "$" : "$0";
          return [
            function(j, q) {
              var L = f(this), Q = j == null ? void 0 : j[P];
              return Q !== void 0 ? Q.call(j, L, q) : O.call(String(L), j, q);
            },
            function($, j) {
              if (!A && k || typeof j == "string" && j.indexOf(U) === -1) {
                var q = B(O, $, this, j);
                if (q.done)
                  return q.value;
              }
              var L = l($), Q = String(this), ue = typeof j == "function";
              ue || (j = String(j));
              var he = L.global;
              if (he) {
                var De = L.unicode;
                L.lastIndex = 0;
              }
              for (var de = []; ; ) {
                var Se = p(L, Q);
                if (Se === null || (de.push(Se), !he))
                  break;
                var Re = String(Se[0]);
                Re === "" && (L.lastIndex = g(Q, c(L.lastIndex), De));
              }
              for (var ze = "", Ae = 0, we = 0; we < de.length; we++) {
                Se = de[we];
                for (var Ee = String(Se[0]), We = h(v(d(Se.index), Q.length), 0), Be = [], dt = 1; dt < Se.length; dt++)
                  Be.push(E(Se[dt]));
                var bt = Se.groups;
                if (ue) {
                  var gt = [Ee].concat(Be, We, Q);
                  bt !== void 0 && gt.push(bt);
                  var Ue = String(j.apply(void 0, gt));
                } else
                  Ue = V(Ee, Q, We, Be, bt, j);
                We >= Ae && (ze += Q.slice(Ae, We) + Ue, Ae = We + Ee.length);
              }
              return ze + Q.slice(Ae);
            }
          ];
          function V($, j, q, L, Q, ue) {
            var he = q + $.length, De = L.length, de = x;
            return Q !== void 0 && (Q = u(Q), de = y), O.call(ue, de, function(Se, Re) {
              var ze;
              switch (Re.charAt(0)) {
                case "$":
                  return "$";
                case "&":
                  return $;
                case "`":
                  return j.slice(0, q);
                case "'":
                  return j.slice(he);
                case "<":
                  ze = Q[Re.slice(1, -1)];
                  break;
                default:
                  var Ae = +Re;
                  if (Ae === 0)
                    return Se;
                  if (Ae > De) {
                    var we = m(Ae / 10);
                    return we === 0 ? Se : we <= De ? L[we - 1] === void 0 ? Re.charAt(1) : L[we - 1] + Re.charAt(1) : Se;
                  }
                  ze = L[Ae - 1];
              }
              return ze === void 0 ? "" : ze;
            });
          }
        });
      },
      5692: function(r, s, e) {
        var a = e("c430"), l = e("c6cd");
        (r.exports = function(u, c) {
          return l[u] || (l[u] = c !== void 0 ? c : {});
        })("versions", []).push({
          version: "3.6.5",
          mode: a ? "pure" : "global",
          copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)"
        });
      },
      "56ef": function(r, s, e) {
        var a = e("d066"), l = e("241c"), u = e("7418"), c = e("825a");
        r.exports = a("Reflect", "ownKeys") || function(f) {
          var g = l.f(c(f)), p = u.f;
          return p ? g.concat(p(f)) : g;
        };
      },
      "5a34": function(r, s, e) {
        var a = e("44e7");
        r.exports = function(l) {
          if (a(l))
            throw TypeError("The method doesn't accept regular expressions");
          return l;
        };
      },
      "5c6c": function(r, s) {
        r.exports = function(e, a) {
          return {
            enumerable: !(e & 1),
            configurable: !(e & 2),
            writable: !(e & 4),
            value: a
          };
        };
      },
      "5db7": function(r, s, e) {
        var a = e("23e7"), l = e("a2bf"), u = e("7b0b"), c = e("50c4"), d = e("1c0b"), f = e("65f0");
        a({ target: "Array", proto: !0 }, {
          flatMap: function(p) {
            var h = u(this), v = c(h.length), m;
            return d(p), m = f(h, 0), m.length = l(m, h, h, v, 0, 1, p, arguments.length > 1 ? arguments[1] : void 0), m;
          }
        });
      },
      6547: function(r, s, e) {
        var a = e("a691"), l = e("1d80"), u = function(c) {
          return function(d, f) {
            var g = String(l(d)), p = a(f), h = g.length, v, m;
            return p < 0 || p >= h ? c ? "" : void 0 : (v = g.charCodeAt(p), v < 55296 || v > 56319 || p + 1 === h || (m = g.charCodeAt(p + 1)) < 56320 || m > 57343 ? c ? g.charAt(p) : v : c ? g.slice(p, p + 2) : (v - 55296 << 10) + (m - 56320) + 65536);
          };
        };
        r.exports = {
          codeAt: u(!1),
          charAt: u(!0)
        };
      },
      "65f0": function(r, s, e) {
        var a = e("861d"), l = e("e8b5"), u = e("b622"), c = u("species");
        r.exports = function(d, f) {
          var g;
          return l(d) && (g = d.constructor, typeof g == "function" && (g === Array || l(g.prototype)) ? g = void 0 : a(g) && (g = g[c], g === null && (g = void 0))), new (g === void 0 ? Array : g)(f === 0 ? 0 : f);
        };
      },
      "69f3": function(r, s, e) {
        var a = e("7f9a"), l = e("da84"), u = e("861d"), c = e("9112"), d = e("5135"), f = e("f772"), g = e("d012"), p = l.WeakMap, h, v, m, y = function(A) {
          return m(A) ? v(A) : h(A, {});
        }, x = function(A) {
          return function(k) {
            var U;
            if (!u(k) || (U = v(k)).type !== A)
              throw TypeError("Incompatible receiver, " + A + " required");
            return U;
          };
        };
        if (a) {
          var E = new p(), P = E.get, O = E.has, B = E.set;
          h = function(A, k) {
            return B.call(E, A, k), k;
          }, v = function(A) {
            return P.call(E, A) || {};
          }, m = function(A) {
            return O.call(E, A);
          };
        } else {
          var W = f("state");
          g[W] = !0, h = function(A, k) {
            return c(A, W, k), k;
          }, v = function(A) {
            return d(A, W) ? A[W] : {};
          }, m = function(A) {
            return d(A, W);
          };
        }
        r.exports = {
          set: h,
          get: v,
          has: m,
          enforce: y,
          getterFor: x
        };
      },
      "6eeb": function(r, s, e) {
        var a = e("da84"), l = e("9112"), u = e("5135"), c = e("ce4e"), d = e("8925"), f = e("69f3"), g = f.get, p = f.enforce, h = String(String).split("String");
        (r.exports = function(v, m, y, x) {
          var E = x ? !!x.unsafe : !1, P = x ? !!x.enumerable : !1, O = x ? !!x.noTargetGet : !1;
          if (typeof y == "function" && (typeof m == "string" && !u(y, "name") && l(y, "name", m), p(y).source = h.join(typeof m == "string" ? m : "")), v === a) {
            P ? v[m] = y : c(m, y);
            return;
          } else
            E ? !O && v[m] && (P = !0) : delete v[m];
          P ? v[m] = y : l(v, m, y);
        })(Function.prototype, "toString", function() {
          return typeof this == "function" && g(this).source || d(this);
        });
      },
      "6f53": function(r, s, e) {
        var a = e("83ab"), l = e("df75"), u = e("fc6a"), c = e("d1e7").f, d = function(f) {
          return function(g) {
            for (var p = u(g), h = l(p), v = h.length, m = 0, y = [], x; v > m; )
              x = h[m++], (!a || c.call(p, x)) && y.push(f ? [x, p[x]] : p[x]);
            return y;
          };
        };
        r.exports = {
          entries: d(!0),
          values: d(!1)
        };
      },
      "73d9": function(r, s, e) {
        var a = e("44d2");
        a("flatMap");
      },
      7418: function(r, s) {
        s.f = Object.getOwnPropertySymbols;
      },
      "746f": function(r, s, e) {
        var a = e("428f"), l = e("5135"), u = e("e538"), c = e("9bf2").f;
        r.exports = function(d) {
          var f = a.Symbol || (a.Symbol = {});
          l(f, d) || c(f, d, {
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
        var a = e("1d80");
        r.exports = function(l) {
          return Object(a(l));
        };
      },
      "7c73": function(r, s, e) {
        var a = e("825a"), l = e("37e8"), u = e("7839"), c = e("d012"), d = e("1be4"), f = e("cc12"), g = e("f772"), p = ">", h = "<", v = "prototype", m = "script", y = g("IE_PROTO"), x = function() {
        }, E = function(A) {
          return h + m + p + A + h + "/" + m + p;
        }, P = function(A) {
          A.write(E("")), A.close();
          var k = A.parentWindow.Object;
          return A = null, k;
        }, O = function() {
          var A = f("iframe"), k = "java" + m + ":", U;
          return A.style.display = "none", d.appendChild(A), A.src = String(k), U = A.contentWindow.document, U.open(), U.write(E("document.F=Object")), U.close(), U.F;
        }, B, W = function() {
          try {
            B = document.domain && new ActiveXObject("htmlfile");
          } catch {
          }
          W = B ? P(B) : O();
          for (var A = u.length; A--; )
            delete W[v][u[A]];
          return W();
        };
        c[y] = !0, r.exports = Object.create || function(k, U) {
          var V;
          return k !== null ? (x[v] = a(k), V = new x(), x[v] = null, V[y] = k) : V = W(), U === void 0 ? V : l(V, U);
        };
      },
      "7dd0": function(r, s, e) {
        var a = e("23e7"), l = e("9ed3"), u = e("e163"), c = e("d2bb"), d = e("d44e"), f = e("9112"), g = e("6eeb"), p = e("b622"), h = e("c430"), v = e("3f8c"), m = e("ae93"), y = m.IteratorPrototype, x = m.BUGGY_SAFARI_ITERATORS, E = p("iterator"), P = "keys", O = "values", B = "entries", W = function() {
          return this;
        };
        r.exports = function(A, k, U, V, $, j, q) {
          l(U, k, V);
          var L = function(we) {
            if (we === $ && de)
              return de;
            if (!x && we in he)
              return he[we];
            switch (we) {
              case P:
                return function() {
                  return new U(this, we);
                };
              case O:
                return function() {
                  return new U(this, we);
                };
              case B:
                return function() {
                  return new U(this, we);
                };
            }
            return function() {
              return new U(this);
            };
          }, Q = k + " Iterator", ue = !1, he = A.prototype, De = he[E] || he["@@iterator"] || $ && he[$], de = !x && De || L($), Se = k == "Array" && he.entries || De, Re, ze, Ae;
          if (Se && (Re = u(Se.call(new A())), y !== Object.prototype && Re.next && (!h && u(Re) !== y && (c ? c(Re, y) : typeof Re[E] != "function" && f(Re, E, W)), d(Re, Q, !0, !0), h && (v[Q] = W))), $ == O && De && De.name !== O && (ue = !0, de = function() {
            return De.call(this);
          }), (!h || q) && he[E] !== de && f(he, E, de), v[k] = de, $)
            if (ze = {
              values: L(O),
              keys: j ? de : L(P),
              entries: L(B)
            }, q)
              for (Ae in ze)
                (x || ue || !(Ae in he)) && g(he, Ae, ze[Ae]);
            else
              a({ target: k, proto: !0, forced: x || ue }, ze);
          return ze;
        };
      },
      "7f9a": function(r, s, e) {
        var a = e("da84"), l = e("8925"), u = a.WeakMap;
        r.exports = typeof u == "function" && /native code/.test(l(u));
      },
      "825a": function(r, s, e) {
        var a = e("861d");
        r.exports = function(l) {
          if (!a(l))
            throw TypeError(String(l) + " is not an object");
          return l;
        };
      },
      "83ab": function(r, s, e) {
        var a = e("d039");
        r.exports = !a(function() {
          return Object.defineProperty({}, 1, { get: function() {
            return 7;
          } })[1] != 7;
        });
      },
      8418: function(r, s, e) {
        var a = e("c04e"), l = e("9bf2"), u = e("5c6c");
        r.exports = function(c, d, f) {
          var g = a(d);
          g in c ? l.f(c, g, u(0, f)) : c[g] = f;
        };
      },
      "861d": function(r, s) {
        r.exports = function(e) {
          return typeof e == "object" ? e !== null : typeof e == "function";
        };
      },
      8875: function(r, s, e) {
        var a, l, u;
        (function(c, d) {
          l = [], a = d, u = typeof a == "function" ? a.apply(s, l) : a, u !== void 0 && (r.exports = u);
        })(typeof self < "u" ? self : this, function() {
          function c() {
            var d = Object.getOwnPropertyDescriptor(document, "currentScript");
            if (!d && "currentScript" in document && document.currentScript || d && d.get !== c && document.currentScript)
              return document.currentScript;
            try {
              throw new Error();
            } catch (B) {
              var f = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, g = /@([^@]*):(\d+):(\d+)\s*$/ig, p = f.exec(B.stack) || g.exec(B.stack), h = p && p[1] || !1, v = p && p[2] || !1, m = document.location.href.replace(document.location.hash, ""), y, x, E, P = document.getElementsByTagName("script");
              h === m && (y = document.documentElement.outerHTML, x = new RegExp("(?:[^\\n]+?\\n){0," + (v - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), E = y.replace(x, "$1").trim());
              for (var O = 0; O < P.length; O++)
                if (P[O].readyState === "interactive" || P[O].src === h || h === m && P[O].innerHTML && P[O].innerHTML.trim() === E)
                  return P[O];
              return null;
            }
          }
          return c;
        });
      },
      8925: function(r, s, e) {
        var a = e("c6cd"), l = Function.toString;
        typeof a.inspectSource != "function" && (a.inspectSource = function(u) {
          return l.call(u);
        }), r.exports = a.inspectSource;
      },
      "8aa5": function(r, s, e) {
        var a = e("6547").charAt;
        r.exports = function(l, u, c) {
          return u + (c ? a(l, u).length : 1);
        };
      },
      "8bbf": function(r, s) {
        r.exports = o;
      },
      "90e3": function(r, s) {
        var e = 0, a = Math.random();
        r.exports = function(l) {
          return "Symbol(" + String(l === void 0 ? "" : l) + ")_" + (++e + a).toString(36);
        };
      },
      9112: function(r, s, e) {
        var a = e("83ab"), l = e("9bf2"), u = e("5c6c");
        r.exports = a ? function(c, d, f) {
          return l.f(c, d, u(1, f));
        } : function(c, d, f) {
          return c[d] = f, c;
        };
      },
      9263: function(r, s, e) {
        var a = e("ad6d"), l = e("9f7f"), u = RegExp.prototype.exec, c = String.prototype.replace, d = u, f = function() {
          var v = /a/, m = /b*/g;
          return u.call(v, "a"), u.call(m, "a"), v.lastIndex !== 0 || m.lastIndex !== 0;
        }(), g = l.UNSUPPORTED_Y || l.BROKEN_CARET, p = /()??/.exec("")[1] !== void 0, h = f || p || g;
        h && (d = function(m) {
          var y = this, x, E, P, O, B = g && y.sticky, W = a.call(y), A = y.source, k = 0, U = m;
          return B && (W = W.replace("y", ""), W.indexOf("g") === -1 && (W += "g"), U = String(m).slice(y.lastIndex), y.lastIndex > 0 && (!y.multiline || y.multiline && m[y.lastIndex - 1] !== `
`) && (A = "(?: " + A + ")", U = " " + U, k++), E = new RegExp("^(?:" + A + ")", W)), p && (E = new RegExp("^" + A + "$(?!\\s)", W)), f && (x = y.lastIndex), P = u.call(B ? E : y, U), B ? P ? (P.input = P.input.slice(k), P[0] = P[0].slice(k), P.index = y.lastIndex, y.lastIndex += P[0].length) : y.lastIndex = 0 : f && P && (y.lastIndex = y.global ? P.index + P[0].length : x), p && P && P.length > 1 && c.call(P[0], E, function() {
            for (O = 1; O < arguments.length - 2; O++)
              arguments[O] === void 0 && (P[O] = void 0);
          }), P;
        }), r.exports = d;
      },
      "94ca": function(r, s, e) {
        var a = e("d039"), l = /#|\.prototype\./, u = function(p, h) {
          var v = d[c(p)];
          return v == g ? !0 : v == f ? !1 : typeof h == "function" ? a(h) : !!h;
        }, c = u.normalize = function(p) {
          return String(p).replace(l, ".").toLowerCase();
        }, d = u.data = {}, f = u.NATIVE = "N", g = u.POLYFILL = "P";
        r.exports = u;
      },
      "99af": function(r, s, e) {
        var a = e("23e7"), l = e("d039"), u = e("e8b5"), c = e("861d"), d = e("7b0b"), f = e("50c4"), g = e("8418"), p = e("65f0"), h = e("1dde"), v = e("b622"), m = e("2d00"), y = v("isConcatSpreadable"), x = 9007199254740991, E = "Maximum allowed index exceeded", P = m >= 51 || !l(function() {
          var A = [];
          return A[y] = !1, A.concat()[0] !== A;
        }), O = h("concat"), B = function(A) {
          if (!c(A))
            return !1;
          var k = A[y];
          return k !== void 0 ? !!k : u(A);
        }, W = !P || !O;
        a({ target: "Array", proto: !0, forced: W }, {
          concat: function(k) {
            var U = d(this), V = p(U, 0), $ = 0, j, q, L, Q, ue;
            for (j = -1, L = arguments.length; j < L; j++)
              if (ue = j === -1 ? U : arguments[j], B(ue)) {
                if (Q = f(ue.length), $ + Q > x)
                  throw TypeError(E);
                for (q = 0; q < Q; q++, $++)
                  q in ue && g(V, $, ue[q]);
              } else {
                if ($ >= x)
                  throw TypeError(E);
                g(V, $++, ue);
              }
            return V.length = $, V;
          }
        });
      },
      "9bdd": function(r, s, e) {
        var a = e("825a");
        r.exports = function(l, u, c, d) {
          try {
            return d ? u(a(c)[0], c[1]) : u(c);
          } catch (g) {
            var f = l.return;
            throw f !== void 0 && a(f.call(l)), g;
          }
        };
      },
      "9bf2": function(r, s, e) {
        var a = e("83ab"), l = e("0cfb"), u = e("825a"), c = e("c04e"), d = Object.defineProperty;
        s.f = a ? d : function(g, p, h) {
          if (u(g), p = c(p, !0), u(h), l)
            try {
              return d(g, p, h);
            } catch {
            }
          if ("get" in h || "set" in h)
            throw TypeError("Accessors not supported");
          return "value" in h && (g[p] = h.value), g;
        };
      },
      "9ed3": function(r, s, e) {
        var a = e("ae93").IteratorPrototype, l = e("7c73"), u = e("5c6c"), c = e("d44e"), d = e("3f8c"), f = function() {
          return this;
        };
        r.exports = function(g, p, h) {
          var v = p + " Iterator";
          return g.prototype = l(a, { next: u(1, h) }), c(g, v, !1, !0), d[v] = f, g;
        };
      },
      "9f7f": function(r, s, e) {
        var a = e("d039");
        function l(u, c) {
          return RegExp(u, c);
        }
        s.UNSUPPORTED_Y = a(function() {
          var u = l("a", "y");
          return u.lastIndex = 2, u.exec("abcd") != null;
        }), s.BROKEN_CARET = a(function() {
          var u = l("^r", "gy");
          return u.lastIndex = 2, u.exec("str") != null;
        });
      },
      a2bf: function(r, s, e) {
        var a = e("e8b5"), l = e("50c4"), u = e("0366"), c = function(d, f, g, p, h, v, m, y) {
          for (var x = h, E = 0, P = m ? u(m, y, 3) : !1, O; E < p; ) {
            if (E in g) {
              if (O = P ? P(g[E], E, f) : g[E], v > 0 && a(O))
                x = c(d, f, O, l(O.length), x, v - 1) - 1;
              else {
                if (x >= 9007199254740991)
                  throw TypeError("Exceed the acceptable array length");
                d[x] = O;
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
        var a = e("23e7"), l = e("23cb"), u = e("a691"), c = e("50c4"), d = e("7b0b"), f = e("65f0"), g = e("8418"), p = e("1dde"), h = e("ae40"), v = p("splice"), m = h("splice", { ACCESSORS: !0, 0: 0, 1: 2 }), y = Math.max, x = Math.min, E = 9007199254740991, P = "Maximum allowed length exceeded";
        a({ target: "Array", proto: !0, forced: !v || !m }, {
          splice: function(B, W) {
            var A = d(this), k = c(A.length), U = l(B, k), V = arguments.length, $, j, q, L, Q, ue;
            if (V === 0 ? $ = j = 0 : V === 1 ? ($ = 0, j = k - U) : ($ = V - 2, j = x(y(u(W), 0), k - U)), k + $ - j > E)
              throw TypeError(P);
            for (q = f(A, j), L = 0; L < j; L++)
              Q = U + L, Q in A && g(q, L, A[Q]);
            if (q.length = j, $ < j) {
              for (L = U; L < k - j; L++)
                Q = L + j, ue = L + $, Q in A ? A[ue] = A[Q] : delete A[ue];
              for (L = k; L > k - j + $; L--)
                delete A[L - 1];
            } else if ($ > j)
              for (L = k - j; L > U; L--)
                Q = L + j - 1, ue = L + $ - 1, Q in A ? A[ue] = A[Q] : delete A[ue];
            for (L = 0; L < $; L++)
              A[L + U] = arguments[L + 2];
            return A.length = k - j + $, q;
          }
        });
      },
      a4d3: function(r, s, e) {
        var a = e("23e7"), l = e("da84"), u = e("d066"), c = e("c430"), d = e("83ab"), f = e("4930"), g = e("fdbf"), p = e("d039"), h = e("5135"), v = e("e8b5"), m = e("861d"), y = e("825a"), x = e("7b0b"), E = e("fc6a"), P = e("c04e"), O = e("5c6c"), B = e("7c73"), W = e("df75"), A = e("241c"), k = e("057f"), U = e("7418"), V = e("06cf"), $ = e("9bf2"), j = e("d1e7"), q = e("9112"), L = e("6eeb"), Q = e("5692"), ue = e("f772"), he = e("d012"), De = e("90e3"), de = e("b622"), Se = e("e538"), Re = e("746f"), ze = e("d44e"), Ae = e("69f3"), we = e("b727").forEach, Ee = ue("hidden"), We = "Symbol", Be = "prototype", dt = de("toPrimitive"), bt = Ae.set, gt = Ae.getterFor(We), Ue = Object[Be], Ve = l.Symbol, xt = u("JSON", "stringify"), ot = V.f, T = $.f, D = k.f, N = j.f, J = Q("symbols"), G = Q("op-symbols"), ye = Q("string-to-symbol-registry"), $e = Q("symbol-to-string-registry"), at = Q("wks"), St = l.QObject, Tt = !St || !St[Be] || !St[Be].findChild, It = d && p(function() {
          return B(T({}, "a", {
            get: function() {
              return T(this, "a", { value: 7 }).a;
            }
          })).a != 7;
        }) ? function(re, Y, _) {
          var ve = ot(Ue, Y);
          ve && delete Ue[Y], T(re, Y, _), ve && re !== Ue && T(Ue, Y, ve);
        } : T, _t = function(re, Y) {
          var _ = J[re] = B(Ve[Be]);
          return bt(_, {
            type: We,
            tag: re,
            description: Y
          }), d || (_.description = Y), _;
        }, w = g ? function(re) {
          return typeof re == "symbol";
        } : function(re) {
          return Object(re) instanceof Ve;
        }, S = function(Y, _, ve) {
          Y === Ue && S(G, _, ve), y(Y);
          var ge = P(_, !0);
          return y(ve), h(J, ge) ? (ve.enumerable ? (h(Y, Ee) && Y[Ee][ge] && (Y[Ee][ge] = !1), ve = B(ve, { enumerable: O(0, !1) })) : (h(Y, Ee) || T(Y, Ee, O(1, {})), Y[Ee][ge] = !0), It(Y, ge, ve)) : T(Y, ge, ve);
        }, C = function(Y, _) {
          y(Y);
          var ve = E(_), ge = W(ve).concat(pe(ve));
          return we(ge, function(Ze) {
            (!d || H.call(ve, Ze)) && S(Y, Ze, ve[Ze]);
          }), Y;
        }, R = function(Y, _) {
          return _ === void 0 ? B(Y) : C(B(Y), _);
        }, H = function(Y) {
          var _ = P(Y, !0), ve = N.call(this, _);
          return this === Ue && h(J, _) && !h(G, _) ? !1 : ve || !h(this, _) || !h(J, _) || h(this, Ee) && this[Ee][_] ? ve : !0;
        }, te = function(Y, _) {
          var ve = E(Y), ge = P(_, !0);
          if (!(ve === Ue && h(J, ge) && !h(G, ge))) {
            var Ze = ot(ve, ge);
            return Ze && h(J, ge) && !(h(ve, Ee) && ve[Ee][ge]) && (Ze.enumerable = !0), Ze;
          }
        }, le = function(Y) {
          var _ = D(E(Y)), ve = [];
          return we(_, function(ge) {
            !h(J, ge) && !h(he, ge) && ve.push(ge);
          }), ve;
        }, pe = function(Y) {
          var _ = Y === Ue, ve = D(_ ? G : E(Y)), ge = [];
          return we(ve, function(Ze) {
            h(J, Ze) && (!_ || h(Ue, Ze)) && ge.push(J[Ze]);
          }), ge;
        };
        if (f || (Ve = function() {
          if (this instanceof Ve)
            throw TypeError("Symbol is not a constructor");
          var Y = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]), _ = De(Y), ve = function(ge) {
            this === Ue && ve.call(G, ge), h(this, Ee) && h(this[Ee], _) && (this[Ee][_] = !1), It(this, _, O(1, ge));
          };
          return d && Tt && It(Ue, _, { configurable: !0, set: ve }), _t(_, Y);
        }, L(Ve[Be], "toString", function() {
          return gt(this).tag;
        }), L(Ve, "withoutSetter", function(re) {
          return _t(De(re), re);
        }), j.f = H, $.f = S, V.f = te, A.f = k.f = le, U.f = pe, Se.f = function(re) {
          return _t(de(re), re);
        }, d && (T(Ve[Be], "description", {
          configurable: !0,
          get: function() {
            return gt(this).description;
          }
        }), c || L(Ue, "propertyIsEnumerable", H, { unsafe: !0 }))), a({ global: !0, wrap: !0, forced: !f, sham: !f }, {
          Symbol: Ve
        }), we(W(at), function(re) {
          Re(re);
        }), a({ target: We, stat: !0, forced: !f }, {
          for: function(re) {
            var Y = String(re);
            if (h(ye, Y))
              return ye[Y];
            var _ = Ve(Y);
            return ye[Y] = _, $e[_] = Y, _;
          },
          keyFor: function(Y) {
            if (!w(Y))
              throw TypeError(Y + " is not a symbol");
            if (h($e, Y))
              return $e[Y];
          },
          useSetter: function() {
            Tt = !0;
          },
          useSimple: function() {
            Tt = !1;
          }
        }), a({ target: "Object", stat: !0, forced: !f, sham: !d }, {
          create: R,
          defineProperty: S,
          defineProperties: C,
          getOwnPropertyDescriptor: te
        }), a({ target: "Object", stat: !0, forced: !f }, {
          getOwnPropertyNames: le,
          getOwnPropertySymbols: pe
        }), a({ target: "Object", stat: !0, forced: p(function() {
          U.f(1);
        }) }, {
          getOwnPropertySymbols: function(Y) {
            return U.f(x(Y));
          }
        }), xt) {
          var ke = !f || p(function() {
            var re = Ve();
            return xt([re]) != "[null]" || xt({ a: re }) != "{}" || xt(Object(re)) != "{}";
          });
          a({ target: "JSON", stat: !0, forced: ke }, {
            stringify: function(Y, _, ve) {
              for (var ge = [Y], Ze = 1, kr; arguments.length > Ze; )
                ge.push(arguments[Ze++]);
              if (kr = _, !(!m(_) && Y === void 0 || w(Y)))
                return v(_) || (_ = function(Zn, pr) {
                  if (typeof kr == "function" && (pr = kr.call(this, Zn, pr)), !w(pr))
                    return pr;
                }), ge[1] = _, xt.apply(null, ge);
            }
          });
        }
        Ve[Be][dt] || q(Ve[Be], dt, Ve[Be].valueOf), ze(Ve, We), he[Ee] = !0;
      },
      a630: function(r, s, e) {
        var a = e("23e7"), l = e("4df4"), u = e("1c7e"), c = !u(function(d) {
          Array.from(d);
        });
        a({ target: "Array", stat: !0, forced: c }, {
          from: l
        });
      },
      a640: function(r, s, e) {
        var a = e("d039");
        r.exports = function(l, u) {
          var c = [][l];
          return !!c && a(function() {
            c.call(null, u || function() {
              throw 1;
            }, 1);
          });
        };
      },
      a691: function(r, s) {
        var e = Math.ceil, a = Math.floor;
        r.exports = function(l) {
          return isNaN(l = +l) ? 0 : (l > 0 ? a : e)(l);
        };
      },
      ab13: function(r, s, e) {
        var a = e("b622"), l = a("match");
        r.exports = function(u) {
          var c = /./;
          try {
            "/./"[u](c);
          } catch {
            try {
              return c[l] = !1, "/./"[u](c);
            } catch {
            }
          }
          return !1;
        };
      },
      ac1f: function(r, s, e) {
        var a = e("23e7"), l = e("9263");
        a({ target: "RegExp", proto: !0, forced: /./.exec !== l }, {
          exec: l
        });
      },
      ad6d: function(r, s, e) {
        var a = e("825a");
        r.exports = function() {
          var l = a(this), u = "";
          return l.global && (u += "g"), l.ignoreCase && (u += "i"), l.multiline && (u += "m"), l.dotAll && (u += "s"), l.unicode && (u += "u"), l.sticky && (u += "y"), u;
        };
      },
      ae40: function(r, s, e) {
        var a = e("83ab"), l = e("d039"), u = e("5135"), c = Object.defineProperty, d = {}, f = function(g) {
          throw g;
        };
        r.exports = function(g, p) {
          if (u(d, g))
            return d[g];
          p || (p = {});
          var h = [][g], v = u(p, "ACCESSORS") ? p.ACCESSORS : !1, m = u(p, 0) ? p[0] : f, y = u(p, 1) ? p[1] : void 0;
          return d[g] = !!h && !l(function() {
            if (v && !a)
              return !0;
            var x = { length: -1 };
            v ? c(x, 1, { enumerable: !0, get: f }) : x[1] = 1, h.call(x, m, y);
          });
        };
      },
      ae93: function(r, s, e) {
        var a = e("e163"), l = e("9112"), u = e("5135"), c = e("b622"), d = e("c430"), f = c("iterator"), g = !1, p = function() {
          return this;
        }, h, v, m;
        [].keys && (m = [].keys(), "next" in m ? (v = a(a(m)), v !== Object.prototype && (h = v)) : g = !0), h == null && (h = {}), !d && !u(h, f) && l(h, f, p), r.exports = {
          IteratorPrototype: h,
          BUGGY_SAFARI_ITERATORS: g
        };
      },
      b041: function(r, s, e) {
        var a = e("00ee"), l = e("f5df");
        r.exports = a ? {}.toString : function() {
          return "[object " + l(this) + "]";
        };
      },
      b0c0: function(r, s, e) {
        var a = e("83ab"), l = e("9bf2").f, u = Function.prototype, c = u.toString, d = /^\s*function ([^ (]*)/, f = "name";
        a && !(f in u) && l(u, f, {
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
        var a = e("da84"), l = e("5692"), u = e("5135"), c = e("90e3"), d = e("4930"), f = e("fdbf"), g = l("wks"), p = a.Symbol, h = f ? p : p && p.withoutSetter || c;
        r.exports = function(v) {
          return u(g, v) || (d && u(p, v) ? g[v] = p[v] : g[v] = h("Symbol." + v)), g[v];
        };
      },
      b64b: function(r, s, e) {
        var a = e("23e7"), l = e("7b0b"), u = e("df75"), c = e("d039"), d = c(function() {
          u(1);
        });
        a({ target: "Object", stat: !0, forced: d }, {
          keys: function(g) {
            return u(l(g));
          }
        });
      },
      b727: function(r, s, e) {
        var a = e("0366"), l = e("44ad"), u = e("7b0b"), c = e("50c4"), d = e("65f0"), f = [].push, g = function(p) {
          var h = p == 1, v = p == 2, m = p == 3, y = p == 4, x = p == 6, E = p == 5 || x;
          return function(P, O, B, W) {
            for (var A = u(P), k = l(A), U = a(O, B, 3), V = c(k.length), $ = 0, j = W || d, q = h ? j(P, V) : v ? j(P, 0) : void 0, L, Q; V > $; $++)
              if ((E || $ in k) && (L = k[$], Q = U(L, $, A), p)) {
                if (h)
                  q[$] = Q;
                else if (Q)
                  switch (p) {
                    case 3:
                      return !0;
                    case 5:
                      return L;
                    case 6:
                      return $;
                    case 2:
                      f.call(q, L);
                  }
                else if (y)
                  return !1;
              }
            return x ? -1 : m || y ? y : q;
          };
        };
        r.exports = {
          forEach: g(0),
          map: g(1),
          filter: g(2),
          some: g(3),
          every: g(4),
          find: g(5),
          findIndex: g(6)
        };
      },
      c04e: function(r, s, e) {
        var a = e("861d");
        r.exports = function(l, u) {
          if (!a(l))
            return l;
          var c, d;
          if (u && typeof (c = l.toString) == "function" && !a(d = c.call(l)) || typeof (c = l.valueOf) == "function" && !a(d = c.call(l)) || !u && typeof (c = l.toString) == "function" && !a(d = c.call(l)))
            return d;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      c430: function(r, s) {
        r.exports = !1;
      },
      c6b6: function(r, s) {
        var e = {}.toString;
        r.exports = function(a) {
          return e.call(a).slice(8, -1);
        };
      },
      c6cd: function(r, s, e) {
        var a = e("da84"), l = e("ce4e"), u = "__core-js_shared__", c = a[u] || l(u, {});
        r.exports = c;
      },
      c740: function(r, s, e) {
        var a = e("23e7"), l = e("b727").findIndex, u = e("44d2"), c = e("ae40"), d = "findIndex", f = !0, g = c(d);
        d in [] && Array(1)[d](function() {
          f = !1;
        }), a({ target: "Array", proto: !0, forced: f || !g }, {
          findIndex: function(h) {
            return l(this, h, arguments.length > 1 ? arguments[1] : void 0);
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
        var a = e("23e7"), l = e("4d64").indexOf, u = e("a640"), c = e("ae40"), d = [].indexOf, f = !!d && 1 / [1].indexOf(1, -0) < 0, g = u("indexOf"), p = c("indexOf", { ACCESSORS: !0, 1: 0 });
        a({ target: "Array", proto: !0, forced: f || !g || !p }, {
          indexOf: function(v) {
            return f ? d.apply(this, arguments) || 0 : l(this, v, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      ca84: function(r, s, e) {
        var a = e("5135"), l = e("fc6a"), u = e("4d64").indexOf, c = e("d012");
        r.exports = function(d, f) {
          var g = l(d), p = 0, h = [], v;
          for (v in g)
            !a(c, v) && a(g, v) && h.push(v);
          for (; f.length > p; )
            a(g, v = f[p++]) && (~u(h, v) || h.push(v));
          return h;
        };
      },
      caad: function(r, s, e) {
        var a = e("23e7"), l = e("4d64").includes, u = e("44d2"), c = e("ae40"), d = c("indexOf", { ACCESSORS: !0, 1: 0 });
        a({ target: "Array", proto: !0, forced: !d }, {
          includes: function(g) {
            return l(this, g, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), u("includes");
      },
      cc12: function(r, s, e) {
        var a = e("da84"), l = e("861d"), u = a.document, c = l(u) && l(u.createElement);
        r.exports = function(d) {
          return c ? u.createElement(d) : {};
        };
      },
      ce4e: function(r, s, e) {
        var a = e("da84"), l = e("9112");
        r.exports = function(u, c) {
          try {
            l(a, u, c);
          } catch {
            a[u] = c;
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
        var a = e("428f"), l = e("da84"), u = function(c) {
          return typeof c == "function" ? c : void 0;
        };
        r.exports = function(c, d) {
          return arguments.length < 2 ? u(a[c]) || u(l[c]) : a[c] && a[c][d] || l[c] && l[c][d];
        };
      },
      d1e7: function(r, s, e) {
        var a = {}.propertyIsEnumerable, l = Object.getOwnPropertyDescriptor, u = l && !a.call({ 1: 2 }, 1);
        s.f = u ? function(d) {
          var f = l(this, d);
          return !!f && f.enumerable;
        } : a;
      },
      d28b: function(r, s, e) {
        var a = e("746f");
        a("iterator");
      },
      d2bb: function(r, s, e) {
        var a = e("825a"), l = e("3bbe");
        r.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
          var u = !1, c = {}, d;
          try {
            d = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, d.call(c, []), u = c instanceof Array;
          } catch {
          }
          return function(g, p) {
            return a(g), l(p), u ? d.call(g, p) : g.__proto__ = p, g;
          };
        }() : void 0);
      },
      d3b7: function(r, s, e) {
        var a = e("00ee"), l = e("6eeb"), u = e("b041");
        a || l(Object.prototype, "toString", u, { unsafe: !0 });
      },
      d44e: function(r, s, e) {
        var a = e("9bf2").f, l = e("5135"), u = e("b622"), c = u("toStringTag");
        r.exports = function(d, f, g) {
          d && !l(d = g ? d : d.prototype, c) && a(d, c, { configurable: !0, value: f });
        };
      },
      d58f: function(r, s, e) {
        var a = e("1c0b"), l = e("7b0b"), u = e("44ad"), c = e("50c4"), d = function(f) {
          return function(g, p, h, v) {
            a(p);
            var m = l(g), y = u(m), x = c(m.length), E = f ? x - 1 : 0, P = f ? -1 : 1;
            if (h < 2)
              for (; ; ) {
                if (E in y) {
                  v = y[E], E += P;
                  break;
                }
                if (E += P, f ? E < 0 : x <= E)
                  throw TypeError("Reduce of empty array with no initial value");
              }
            for (; f ? E >= 0 : x > E; E += P)
              E in y && (v = p(v, y[E], E, m));
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
        var a = e("6eeb"), l = e("d039"), u = e("b622"), c = e("9263"), d = e("9112"), f = u("species"), g = !l(function() {
          var y = /./;
          return y.exec = function() {
            var x = [];
            return x.groups = { a: "7" }, x;
          }, "".replace(y, "$<a>") !== "7";
        }), p = function() {
          return "a".replace(/./, "$0") === "$0";
        }(), h = u("replace"), v = function() {
          return /./[h] ? /./[h]("a", "$0") === "" : !1;
        }(), m = !l(function() {
          var y = /(?:)/, x = y.exec;
          y.exec = function() {
            return x.apply(this, arguments);
          };
          var E = "ab".split(y);
          return E.length !== 2 || E[0] !== "a" || E[1] !== "b";
        });
        r.exports = function(y, x, E, P) {
          var O = u(y), B = !l(function() {
            var $ = {};
            return $[O] = function() {
              return 7;
            }, ""[y]($) != 7;
          }), W = B && !l(function() {
            var $ = !1, j = /a/;
            return y === "split" && (j = {}, j.constructor = {}, j.constructor[f] = function() {
              return j;
            }, j.flags = "", j[O] = /./[O]), j.exec = function() {
              return $ = !0, null;
            }, j[O](""), !$;
          });
          if (!B || !W || y === "replace" && !(g && p && !v) || y === "split" && !m) {
            var A = /./[O], k = E(O, ""[y], function($, j, q, L, Q) {
              return j.exec === c ? B && !Q ? { done: !0, value: A.call(j, q, L) } : { done: !0, value: $.call(q, j, L) } : { done: !1 };
            }, {
              REPLACE_KEEPS_$0: p,
              REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: v
            }), U = k[0], V = k[1];
            a(String.prototype, y, U), a(
              RegExp.prototype,
              O,
              x == 2 ? function($, j) {
                return V.call($, this, j);
              } : function($) {
                return V.call($, this);
              }
            );
          }
          P && d(RegExp.prototype[O], "sham", !0);
        };
      },
      d81d: function(r, s, e) {
        var a = e("23e7"), l = e("b727").map, u = e("1dde"), c = e("ae40"), d = u("map"), f = c("map");
        a({ target: "Array", proto: !0, forced: !d || !f }, {
          map: function(p) {
            return l(this, p, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      da84: function(r, s, e) {
        (function(a) {
          var l = function(u) {
            return u && u.Math == Math && u;
          };
          r.exports = l(typeof globalThis == "object" && globalThis) || l(typeof window == "object" && window) || l(typeof self == "object" && self) || l(typeof a == "object" && a) || Function("return this")();
        }).call(this, e("c8ba"));
      },
      dbb4: function(r, s, e) {
        var a = e("23e7"), l = e("83ab"), u = e("56ef"), c = e("fc6a"), d = e("06cf"), f = e("8418");
        a({ target: "Object", stat: !0, sham: !l }, {
          getOwnPropertyDescriptors: function(p) {
            for (var h = c(p), v = d.f, m = u(h), y = {}, x = 0, E, P; m.length > x; )
              P = v(h, E = m[x++]), P !== void 0 && f(y, E, P);
            return y;
          }
        });
      },
      dbf1: function(r, s, e) {
        (function(a) {
          e.d(s, "a", function() {
            return u;
          });
          function l() {
            return typeof window < "u" ? window.console : a.console;
          }
          var u = l();
        }).call(this, e("c8ba"));
      },
      ddb0: function(r, s, e) {
        var a = e("da84"), l = e("fdbc"), u = e("e260"), c = e("9112"), d = e("b622"), f = d("iterator"), g = d("toStringTag"), p = u.values;
        for (var h in l) {
          var v = a[h], m = v && v.prototype;
          if (m) {
            if (m[f] !== p)
              try {
                c(m, f, p);
              } catch {
                m[f] = p;
              }
            if (m[g] || c(m, g, h), l[h]) {
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
        var a = e("ca84"), l = e("7839");
        r.exports = Object.keys || function(c) {
          return a(c, l);
        };
      },
      e01a: function(r, s, e) {
        var a = e("23e7"), l = e("83ab"), u = e("da84"), c = e("5135"), d = e("861d"), f = e("9bf2").f, g = e("e893"), p = u.Symbol;
        if (l && typeof p == "function" && (!("description" in p.prototype) || p().description !== void 0)) {
          var h = {}, v = function() {
            var O = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]), B = this instanceof v ? new p(O) : O === void 0 ? p() : p(O);
            return O === "" && (h[B] = !0), B;
          };
          g(v, p);
          var m = v.prototype = p.prototype;
          m.constructor = v;
          var y = m.toString, x = String(p("test")) == "Symbol(test)", E = /^Symbol\((.*)\)[^)]+$/;
          f(m, "description", {
            configurable: !0,
            get: function() {
              var O = d(this) ? this.valueOf() : this, B = y.call(O);
              if (c(h, O))
                return "";
              var W = x ? B.slice(7, -1) : B.replace(E, "$1");
              return W === "" ? void 0 : W;
            }
          }), a({ global: !0, forced: !0 }, {
            Symbol: v
          });
        }
      },
      e163: function(r, s, e) {
        var a = e("5135"), l = e("7b0b"), u = e("f772"), c = e("e177"), d = u("IE_PROTO"), f = Object.prototype;
        r.exports = c ? Object.getPrototypeOf : function(g) {
          return g = l(g), a(g, d) ? g[d] : typeof g.constructor == "function" && g instanceof g.constructor ? g.constructor.prototype : g instanceof Object ? f : null;
        };
      },
      e177: function(r, s, e) {
        var a = e("d039");
        r.exports = !a(function() {
          function l() {
          }
          return l.prototype.constructor = null, Object.getPrototypeOf(new l()) !== l.prototype;
        });
      },
      e260: function(r, s, e) {
        var a = e("fc6a"), l = e("44d2"), u = e("3f8c"), c = e("69f3"), d = e("7dd0"), f = "Array Iterator", g = c.set, p = c.getterFor(f);
        r.exports = d(Array, "Array", function(h, v) {
          g(this, {
            type: f,
            target: a(h),
            index: 0,
            kind: v
          });
        }, function() {
          var h = p(this), v = h.target, m = h.kind, y = h.index++;
          return !v || y >= v.length ? (h.target = void 0, { value: void 0, done: !0 }) : m == "keys" ? { value: y, done: !1 } : m == "values" ? { value: v[y], done: !1 } : { value: [y, v[y]], done: !1 };
        }, "values"), u.Arguments = u.Array, l("keys"), l("values"), l("entries");
      },
      e439: function(r, s, e) {
        var a = e("23e7"), l = e("d039"), u = e("fc6a"), c = e("06cf").f, d = e("83ab"), f = l(function() {
          c(1);
        }), g = !d || f;
        a({ target: "Object", stat: !0, forced: g, sham: !d }, {
          getOwnPropertyDescriptor: function(h, v) {
            return c(u(h), v);
          }
        });
      },
      e538: function(r, s, e) {
        var a = e("b622");
        s.f = a;
      },
      e893: function(r, s, e) {
        var a = e("5135"), l = e("56ef"), u = e("06cf"), c = e("9bf2");
        r.exports = function(d, f) {
          for (var g = l(f), p = c.f, h = u.f, v = 0; v < g.length; v++) {
            var m = g[v];
            a(d, m) || p(d, m, h(f, m));
          }
        };
      },
      e8b5: function(r, s, e) {
        var a = e("c6b6");
        r.exports = Array.isArray || function(u) {
          return a(u) == "Array";
        };
      },
      e95a: function(r, s, e) {
        var a = e("b622"), l = e("3f8c"), u = a("iterator"), c = Array.prototype;
        r.exports = function(d) {
          return d !== void 0 && (l.Array === d || c[u] === d);
        };
      },
      f5df: function(r, s, e) {
        var a = e("00ee"), l = e("c6b6"), u = e("b622"), c = u("toStringTag"), d = l(function() {
          return arguments;
        }()) == "Arguments", f = function(g, p) {
          try {
            return g[p];
          } catch {
          }
        };
        r.exports = a ? l : function(g) {
          var p, h, v;
          return g === void 0 ? "Undefined" : g === null ? "Null" : typeof (h = f(p = Object(g), c)) == "string" ? h : d ? l(p) : (v = l(p)) == "Object" && typeof p.callee == "function" ? "Arguments" : v;
        };
      },
      f772: function(r, s, e) {
        var a = e("5692"), l = e("90e3"), u = a("keys");
        r.exports = function(c) {
          return u[c] || (u[c] = l(c));
        };
      },
      fb15: function(r, s, e) {
        if (e.r(s), typeof window < "u") {
          var a = window.document.currentScript;
          {
            var l = e("8875");
            a = l(), "currentScript" in document || Object.defineProperty(document, "currentScript", { get: l });
          }
          var u = a && a.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
          u && (e.p = u[1]);
        }
        e("99af"), e("4de4"), e("4160"), e("c975"), e("d81d"), e("a434"), e("159b"), e("a4d3"), e("e439"), e("dbb4"), e("b64b");
        function c(w, S, C) {
          return S in w ? Object.defineProperty(w, S, {
            value: C,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : w[S] = C, w;
        }
        function d(w, S) {
          var C = Object.keys(w);
          if (Object.getOwnPropertySymbols) {
            var R = Object.getOwnPropertySymbols(w);
            S && (R = R.filter(function(H) {
              return Object.getOwnPropertyDescriptor(w, H).enumerable;
            })), C.push.apply(C, R);
          }
          return C;
        }
        function f(w) {
          for (var S = 1; S < arguments.length; S++) {
            var C = arguments[S] != null ? arguments[S] : {};
            S % 2 ? d(Object(C), !0).forEach(function(R) {
              c(w, R, C[R]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(w, Object.getOwnPropertyDescriptors(C)) : d(Object(C)).forEach(function(R) {
              Object.defineProperty(w, R, Object.getOwnPropertyDescriptor(C, R));
            });
          }
          return w;
        }
        function g(w) {
          if (Array.isArray(w))
            return w;
        }
        e("e01a"), e("d28b"), e("e260"), e("d3b7"), e("3ca3"), e("ddb0");
        function p(w, S) {
          if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(w)))) {
            var C = [], R = !0, H = !1, te = void 0;
            try {
              for (var le = w[Symbol.iterator](), pe; !(R = (pe = le.next()).done) && (C.push(pe.value), !(S && C.length === S)); R = !0)
                ;
            } catch (ke) {
              H = !0, te = ke;
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
        function h(w, S) {
          (S == null || S > w.length) && (S = w.length);
          for (var C = 0, R = new Array(S); C < S; C++)
            R[C] = w[C];
          return R;
        }
        function v(w, S) {
          if (!!w) {
            if (typeof w == "string")
              return h(w, S);
            var C = Object.prototype.toString.call(w).slice(8, -1);
            if (C === "Object" && w.constructor && (C = w.constructor.name), C === "Map" || C === "Set")
              return Array.from(w);
            if (C === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(C))
              return h(w, S);
          }
        }
        function m() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function y(w, S) {
          return g(w) || p(w, S) || v(w, S) || m();
        }
        function x(w) {
          if (Array.isArray(w))
            return h(w);
        }
        function E(w) {
          if (typeof Symbol < "u" && Symbol.iterator in Object(w))
            return Array.from(w);
        }
        function P() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function O(w) {
          return x(w) || E(w) || v(w) || P();
        }
        var B = e("a352"), W = /* @__PURE__ */ e.n(B);
        function A(w) {
          w.parentElement !== null && w.parentElement.removeChild(w);
        }
        function k(w, S, C) {
          var R = C === 0 ? w.children[0] : w.children[C - 1].nextSibling;
          w.insertBefore(S, R);
        }
        var U = e("dbf1");
        e("13d5"), e("4fad"), e("ac1f"), e("5319");
        function V(w) {
          var S = /* @__PURE__ */ Object.create(null);
          return function(R) {
            var H = S[R];
            return H || (S[R] = w(R));
          };
        }
        var $ = /-(\w)/g, j = V(function(w) {
          return w.replace($, function(S, C) {
            return C.toUpperCase();
          });
        });
        e("5db7"), e("73d9");
        var q = ["Start", "Add", "Remove", "Update", "End"], L = ["Choose", "Unchoose", "Sort", "Filter", "Clone"], Q = ["Move"], ue = [Q, q, L].flatMap(function(w) {
          return w;
        }).map(function(w) {
          return "on".concat(w);
        }), he = {
          manage: Q,
          manageAndEmit: q,
          emit: L
        };
        function De(w) {
          return ue.indexOf(w) !== -1;
        }
        e("caad"), e("2ca0");
        var de = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
        function Se(w) {
          return de.includes(w);
        }
        function Re(w) {
          return ["transition-group", "TransitionGroup"].includes(w);
        }
        function ze(w) {
          return ["id", "class", "role", "style"].includes(w) || w.startsWith("data-") || w.startsWith("aria-") || w.startsWith("on");
        }
        function Ae(w) {
          return w.reduce(function(S, C) {
            var R = y(C, 2), H = R[0], te = R[1];
            return S[H] = te, S;
          }, {});
        }
        function we(w) {
          var S = w.$attrs, C = w.componentData, R = C === void 0 ? {} : C, H = Ae(Object.entries(S).filter(function(te) {
            var le = y(te, 2), pe = le[0];
            return le[1], ze(pe);
          }));
          return f(f({}, H), R);
        }
        function Ee(w) {
          var S = w.$attrs, C = w.callBackBuilder, R = Ae(We(S));
          Object.entries(C).forEach(function(te) {
            var le = y(te, 2), pe = le[0], ke = le[1];
            he[pe].forEach(function(re) {
              R["on".concat(re)] = ke(re);
            });
          });
          var H = "[data-draggable]".concat(R.draggable || "");
          return f(f({}, R), {}, {
            draggable: H
          });
        }
        function We(w) {
          return Object.entries(w).filter(function(S) {
            var C = y(S, 2), R = C[0];
            return C[1], !ze(R);
          }).map(function(S) {
            var C = y(S, 2), R = C[0], H = C[1];
            return [j(R), H];
          }).filter(function(S) {
            var C = y(S, 2), R = C[0];
            return C[1], !De(R);
          });
        }
        e("c740");
        function Be(w, S) {
          if (!(w instanceof S))
            throw new TypeError("Cannot call a class as a function");
        }
        function dt(w, S) {
          for (var C = 0; C < S.length; C++) {
            var R = S[C];
            R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(w, R.key, R);
          }
        }
        function bt(w, S, C) {
          return S && dt(w.prototype, S), C && dt(w, C), w;
        }
        var gt = function(S) {
          var C = S.el;
          return C;
        }, Ue = function(S, C) {
          return S.__draggable_context = C;
        }, Ve = function(S) {
          return S.__draggable_context;
        }, xt = /* @__PURE__ */ function() {
          function w(S) {
            var C = S.nodes, R = C.header, H = C.default, te = C.footer, le = S.root, pe = S.realList;
            Be(this, w), this.defaultNodes = H, this.children = [].concat(O(R), O(H), O(te)), this.externalComponent = le.externalComponent, this.rootTransition = le.transition, this.tag = le.tag, this.realList = pe;
          }
          return bt(w, [{
            key: "render",
            value: function(C, R) {
              var H = this.tag, te = this.children, le = this._isRootComponent, pe = le ? {
                default: function() {
                  return te;
                }
              } : te;
              return C(H, R, pe);
            }
          }, {
            key: "updated",
            value: function() {
              var C = this.defaultNodes, R = this.realList;
              C.forEach(function(H, te) {
                Ue(gt(H), {
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
              var H = this.defaultNodes, te = H.length, le = R.children, pe = le.item(C);
              if (pe === null)
                return te;
              var ke = Ve(pe);
              if (ke)
                return ke.index;
              if (te === 0)
                return 0;
              var re = gt(H[0]), Y = O(le).findIndex(function(_) {
                return _ === re;
              });
              return C < Y ? 0 : te;
            }
          }, {
            key: "_isRootComponent",
            get: function() {
              return this.externalComponent || this.rootTransition;
            }
          }]), w;
        }(), ot = e("8bbf");
        function T(w, S) {
          var C = w[S];
          return C ? C() : [];
        }
        function D(w) {
          var S = w.$slots, C = w.realList, R = w.getKey, H = C || [], te = ["header", "footer"].map(function(_) {
            return T(S, _);
          }), le = y(te, 2), pe = le[0], ke = le[1], re = S.item;
          if (!re)
            throw new Error("draggable element must have an item slot");
          var Y = H.flatMap(function(_, ve) {
            return re({
              element: _,
              index: ve
            }).map(function(ge) {
              return ge.key = R(_), ge.props = f(f({}, ge.props || {}), {}, {
                "data-draggable": !0
              }), ge;
            });
          });
          if (Y.length !== H.length)
            throw new Error("Item slot must have only one child");
          return {
            header: pe,
            footer: ke,
            default: Y
          };
        }
        function N(w) {
          var S = Re(w), C = !Se(w) && !S;
          return {
            transition: S,
            externalComponent: C,
            tag: C ? Object(ot.resolveComponent)(w) : S ? ot.TransitionGroup : w
          };
        }
        function J(w) {
          var S = w.$slots, C = w.tag, R = w.realList, H = w.getKey, te = D({
            $slots: S,
            realList: R,
            getKey: H
          }), le = N(C);
          return new xt({
            nodes: te,
            root: le,
            realList: R
          });
        }
        function G(w, S) {
          var C = this;
          Object(ot.nextTick)(function() {
            return C.$emit(w.toLowerCase(), S);
          });
        }
        function ye(w) {
          var S = this;
          return function(C, R) {
            if (S.realList !== null)
              return S["onDrag".concat(w)](C, R);
          };
        }
        function $e(w) {
          var S = this, C = ye.call(this, w);
          return function(R, H) {
            C.call(S, R, H), G.call(S, w, R);
          };
        }
        var at = null, St = {
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
            default: function(S) {
              return S;
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
        }, Tt = ["update:modelValue", "change"].concat(O([].concat(O(he.manageAndEmit), O(he.emit)).map(function(w) {
          return w.toLowerCase();
        }))), It = Object(ot.defineComponent)({
          name: "draggable",
          inheritAttrs: !1,
          props: St,
          emits: Tt,
          data: function() {
            return {
              error: !1
            };
          },
          render: function() {
            try {
              this.error = !1;
              var S = this.$slots, C = this.$attrs, R = this.tag, H = this.componentData, te = this.realList, le = this.getKey, pe = J({
                $slots: S,
                tag: R,
                realList: te,
                getKey: le
              });
              this.componentStructure = pe;
              var ke = we({
                $attrs: C,
                componentData: H
              });
              return pe.render(ot.h, ke);
            } catch (re) {
              return this.error = !0, Object(ot.h)("pre", {
                style: {
                  color: "red"
                }
              }, re.stack);
            }
          },
          created: function() {
            this.list !== null && this.modelValue !== null && U.a.error("modelValue and list props are mutually exclusive! Please set one or another.");
          },
          mounted: function() {
            var S = this;
            if (!this.error) {
              var C = this.$attrs, R = this.$el, H = this.componentStructure;
              H.updated();
              var te = Ee({
                $attrs: C,
                callBackBuilder: {
                  manageAndEmit: function(ke) {
                    return $e.call(S, ke);
                  },
                  emit: function(ke) {
                    return G.bind(S, ke);
                  },
                  manage: function(ke) {
                    return ye.call(S, ke);
                  }
                }
              }), le = R.nodeType === 1 ? R : R.parentElement;
              this._sortable = new W.a(le, te), this.targetDomElement = le, le.__draggable_component__ = this;
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
              var S = this.list;
              return S || this.modelValue;
            },
            getKey: function() {
              var S = this.itemKey;
              return typeof S == "function" ? S : function(C) {
                return C[S];
              };
            }
          },
          watch: {
            $attrs: {
              handler: function(S) {
                var C = this._sortable;
                !C || We(S).forEach(function(R) {
                  var H = y(R, 2), te = H[0], le = H[1];
                  C.option(te, le);
                });
              },
              deep: !0
            }
          },
          methods: {
            getUnderlyingVm: function(S) {
              return this.componentStructure.getUnderlyingVm(S) || null;
            },
            getUnderlyingPotencialDraggableComponent: function(S) {
              return S.__draggable_component__;
            },
            emitChanges: function(S) {
              var C = this;
              Object(ot.nextTick)(function() {
                return C.$emit("change", S);
              });
            },
            alterList: function(S) {
              if (this.list) {
                S(this.list);
                return;
              }
              var C = O(this.modelValue);
              S(C), this.$emit("update:modelValue", C);
            },
            spliceList: function() {
              var S = arguments, C = function(H) {
                return H.splice.apply(H, O(S));
              };
              this.alterList(C);
            },
            updatePosition: function(S, C) {
              var R = function(te) {
                return te.splice(C, 0, te.splice(S, 1)[0]);
              };
              this.alterList(R);
            },
            getRelatedContextFromMoveEvent: function(S) {
              var C = S.to, R = S.related, H = this.getUnderlyingPotencialDraggableComponent(C);
              if (!H)
                return {
                  component: H
                };
              var te = H.realList, le = {
                list: te,
                component: H
              };
              if (C !== R && te) {
                var pe = H.getUnderlyingVm(R) || {};
                return f(f({}, pe), le);
              }
              return le;
            },
            getVmIndexFromDomIndex: function(S) {
              return this.componentStructure.getVmIndexFromDomIndex(S, this.targetDomElement);
            },
            onDragStart: function(S) {
              this.context = this.getUnderlyingVm(S.item), S.item._underlying_vm_ = this.clone(this.context.element), at = S.item;
            },
            onDragAdd: function(S) {
              var C = S.item._underlying_vm_;
              if (C !== void 0) {
                A(S.item);
                var R = this.getVmIndexFromDomIndex(S.newIndex);
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
            onDragRemove: function(S) {
              if (k(this.$el, S.item, S.oldIndex), S.pullMode === "clone") {
                A(S.clone);
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
            onDragUpdate: function(S) {
              A(S.item), k(S.from, S.item, S.oldIndex);
              var C = this.context.index, R = this.getVmIndexFromDomIndex(S.newIndex);
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
            computeFutureIndex: function(S, C) {
              if (!S.element)
                return 0;
              var R = O(C.to.children).filter(function(pe) {
                return pe.style.display !== "none";
              }), H = R.indexOf(C.related), te = S.component.getVmIndexFromDomIndex(H), le = R.indexOf(at) !== -1;
              return le || !C.willInsertAfter ? te : te + 1;
            },
            onDragMove: function(S, C) {
              var R = this.move, H = this.realList;
              if (!R || !H)
                return !0;
              var te = this.getRelatedContextFromMoveEvent(S), le = this.computeFutureIndex(te, S), pe = f(f({}, this.context), {}, {
                futureIndex: le
              }), ke = f(f({}, S), {}, {
                relatedContext: te,
                draggedContext: pe
              });
              return R(ke, C);
            },
            onDragEnd: function() {
              at = null;
            }
          }
        }), _t = It;
        s.default = _t;
      },
      fb6a: function(r, s, e) {
        var a = e("23e7"), l = e("861d"), u = e("e8b5"), c = e("23cb"), d = e("50c4"), f = e("fc6a"), g = e("8418"), p = e("b622"), h = e("1dde"), v = e("ae40"), m = h("slice"), y = v("slice", { ACCESSORS: !0, 0: 0, 1: 2 }), x = p("species"), E = [].slice, P = Math.max;
        a({ target: "Array", proto: !0, forced: !m || !y }, {
          slice: function(B, W) {
            var A = f(this), k = d(A.length), U = c(B, k), V = c(W === void 0 ? k : W, k), $, j, q;
            if (u(A) && ($ = A.constructor, typeof $ == "function" && ($ === Array || u($.prototype)) ? $ = void 0 : l($) && ($ = $[x], $ === null && ($ = void 0)), $ === Array || $ === void 0))
              return E.call(A, U, V);
            for (j = new ($ === void 0 ? Array : $)(P(V - U, 0)), q = 0; U < V; U++, q++)
              U in A && g(j, q, A[U]);
            return j.length = q, j;
          }
        });
      },
      fc6a: function(r, s, e) {
        var a = e("44ad"), l = e("1d80");
        r.exports = function(u) {
          return a(l(u));
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
        var a = e("4930");
        r.exports = a && !Symbol.sham && typeof Symbol.iterator == "symbol";
      }
    }).default;
  });
})(Ln);
const qi = /* @__PURE__ */ vi(Ln.exports), _i = ["data-column-key"], es = { class: "flex items-center" }, ts = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], rs = {
  key: 1,
  class: "ml-4 w-11 flex justify-center"
}, Jn = {
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
    Ft(() => o.columns, (u) => {
      !s.value && !e.value && (r.value = [...u]), e.value && setTimeout(() => {
        e.value = !1;
      }, 100);
    }, { deep: !0 });
    function a(u, c) {
      const d = r.value.findIndex((f) => f.key === u);
      d !== -1 && (r.value[d].hidden = !c), i("columns-changed", r.value);
    }
    function l() {
      e.value = !0, i("columns-changed", r.value);
    }
    return (u, c) => (I(), be(ae(qi), {
      modelValue: r.value,
      "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
      "item-key": "key",
      animation: 200,
      handle: ".drag-handle",
      onChange: l,
      onStart: c[1] || (c[1] = (d) => s.value = !0),
      onEnd: c[2] || (c[2] = (d) => s.value = !1)
    }, {
      item: Le(({ element: d }) => [
        b("div", {
          class: "py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0",
          "data-test": "column-item",
          "data-column-key": d.key
        }, [
          b("div", es, [
            c[3] || (c[3] = b("div", { class: "drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600" }, [
              b("svg", {
                class: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                b("path", { d: "M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" })
              ])
            ], -1)),
            b("p", {
              class: Z(["text-sm text-gray-900", { "text-gray-400": d.hidden }])
            }, z(d.label), 3)
          ]),
          d.can_be_hidden ? (I(), M("button", {
            key: 0,
            type: "button",
            class: Z(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
              "bg-green-500": !d.hidden,
              "bg-gray-200": d.hidden
            }]),
            "aria-pressed": !d.hidden,
            "aria-labelledby": `toggle-column-${d.key}`,
            "aria-describedby": `toggle-column-${d.key}`,
            dusk: `toggle-column-${d.key}`,
            onClick: Xe((f) => a(d.key, d.hidden), ["prevent"])
          }, [
            c[4] || (c[4] = b("span", { class: "sr-only" }, "Column status", -1)),
            b("span", {
              "aria-hidden": "true",
              class: Z([{
                "translate-x-5": !d.hidden,
                "translate-x-0": d.hidden
              }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
            }, null, 2)
          ], 10, ts)) : (I(), M("div", rs, [...c[5] || (c[5] = [
            b("span", { class: "text-xs text-gray-400" }, "Fixe", -1)
          ])]))
        ], 8, _i)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
};
const ns = {
  key: 0,
  class: "ml-1"
}, os = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, as = { class: "px-2" }, ls = {
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
    Ft(() => n.columns, (s) => {
      o.value = [...s];
    }, { deep: !0, immediate: !0 });
    const i = me(() => o.value.filter((s) => s.hidden).length);
    function r(s) {
      o.value = [...s], n.onChange(s);
    }
    return (s, e) => (I(), be(jr, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: t.color
    }, {
      button: Le(() => [
        e[0] || (e[0] = b("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
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
        t.hasHiddenColumns ? (I(), M("span", ns, "(" + z(i.value) + ")", 1)) : K("", !0)
      ]),
      default: Le(() => [
        b("div", os, [
          b("div", as, [
            e[1] || (e[1] = b("div", { class: "py-2 text-xs text-gray-500 font-medium uppercase" }, " Glissez pour r\xE9organiser ", -1)),
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
}, is = /* @__PURE__ */ qt(ls, [["__scopeId", "data-v-c5ec77f1"]]), ss = {
  key: 0,
  class: "ml-1"
}, us = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, cs = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, ds = { class: "p-2" }, fs = ["name", "value", "onChange"], vs = ["value"], hs = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, gs = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, ps = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, ms = {
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
    const o = me(() => n.filters.filter((l) => !i(l)).length);
    function i(l) {
      if (l.value === null)
        return !0;
      switch (l.type) {
        case "number_range":
          return Number(Math.max(...l.value)) === Number(l.max) && Number(Math.min(...l.value)) === Number(l.min);
        case "select":
          return l.value === "";
        case "toggle":
          return !1;
        case "date":
          return !l.value || typeof l.value == "object" && !l.value.type;
        case "number":
          return !l.value || typeof l.value == "object" && !l.value.type;
        default:
          return !l.value;
      }
    }
    function r(l) {
      let u = l.value;
      l.value && (Number(Math.max(...l.value)) === Number(l.max) && Number(Math.min(...l.value)) === Number(l.min) ? u = null : Number(Math.min(...l.value)) === 0 && Number(Math.max(...l.value)) === 0 && (u = ["0", "0"])), n.onFilterChange(l.key, u);
    }
    const s = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, e = ct("themeVariables"), a = (l) => {
      var u, c, d, f;
      return nt(
        Pe([l, "base"], s, (c = (u = e == null ? void 0 : e.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : c.select_filter, n.ui),
        Pe([l, "color", n.color], s, (f = (d = e == null ? void 0 : e.inertia_table) == null ? void 0 : d.table_filter) == null ? void 0 : f.select_filter, n.ui)
      );
    };
    return (l, u) => (I(), be(jr, {
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
        t.hasEnabledFilters ? (I(), M("span", ss, "(" + z(o.value) + ")", 1)) : K("", !0)
      ]),
      default: Le(() => [
        b("div", us, [
          (I(!0), M(it, null, st(t.filters, (c, d) => (I(), M("div", { key: d }, [
            b("h3", cs, z(c.label), 1),
            b("div", ds, [
              c.type === "select" ? (I(), M("select", {
                key: 0,
                name: c.key,
                value: c.value,
                class: Z(a("select", t.color)),
                onChange: (f) => t.onFilterChange(c.key, f.target.value)
              }, [
                (I(!0), M(it, null, st(c.options, (f, g) => (I(), M("option", {
                  key: g,
                  value: g
                }, z(f), 9, vs))), 128))
              ], 42, fs)) : K("", !0),
              c.type === "toggle" ? (I(), be($n, {
                key: 1,
                filter: c,
                "on-filter-change": t.onFilterChange,
                color: t.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : K("", !0),
              c.type === "number_range" ? (I(), M("div", hs, [
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
              ])) : K("", !0),
              c.type === "date" ? (I(), M("div", gs, [
                et(Fn, {
                  filter: c,
                  "on-filter-change": t.onFilterChange,
                  color: t.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : K("", !0),
              c.type === "number" ? (I(), M("div", ps, [
                et(jn, {
                  filter: c,
                  "on-filter-change": t.onFilterChange,
                  color: t.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : K("", !0)
            ])
          ]))), 128))
        ])
      ]),
      _: 1
    }, 8, ["color"]));
  }
}, ys = { class: "relative" }, bs = ["placeholder", "value"], xs = {
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
    }, i = ct("themeVariables"), r = (s) => {
      var e, a;
      return nt(
        Pe([s, "base"], o, (e = i == null ? void 0 : i.inertia_table) == null ? void 0 : e.global_search, n.ui),
        Pe([s, "color", n.color], o, (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.global_search, n.ui)
      );
    };
    return (s, e) => (I(), M("div", ys, [
      b("input", {
        class: Z(r("input")),
        placeholder: t.label,
        value: t.value,
        type: "text",
        name: "global",
        onInput: e[0] || (e[0] = (a) => t.onChange(a.target.value))
      }, null, 42, bs),
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
}, Ss = { class: "flex rounded-md shadow-sm relative mt-3" }, ws = ["for"], Es = ["id", "name", "value", "onInput"], Cs = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Os = ["dusk", "onClick"], Ts = {
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
    function r(l) {
      return i.forcedVisibleSearchInputs.includes(l);
    }
    Ft(i.forcedVisibleSearchInputs, (l) => {
      const u = l.length > 0 ? l[l.length - 1] : null;
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
    }, e = ct("themeVariables"), a = (l) => {
      var u, c;
      return nt(
        Pe([l, "base"], s, (u = e == null ? void 0 : e.inertia_table) == null ? void 0 : u.table_search_rows, i.ui),
        Pe([l, "color", i.color], s, (c = e == null ? void 0 : e.inertia_table) == null ? void 0 : c.table_search_rows, i.ui)
      );
    };
    return (l, u) => (I(!0), M(it, null, st(t.searchInputs, (c, d) => Ke((I(), M("div", {
      key: d,
      class: "px-4 sm:px-0"
    }, [
      b("div", Ss, [
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
          b("span", null, z(c.label), 1)
        ], 8, ws),
        (I(), M("input", {
          id: c.key,
          ref_for: !0,
          ref: n.el,
          key: c.key,
          name: c.key,
          value: c.value,
          type: "text",
          class: Z(a("input")),
          onInput: (f) => t.onChange(c.key, f.target.value)
        }, null, 42, Es)),
        b("div", Cs, [
          b("button", {
            class: Z(a("remove_button")),
            dusk: `remove-search-row-${c.key}`,
            onClick: Xe((f) => t.onRemove(c.key), ["prevent"])
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
          ])], 10, Os)
        ])
      ])
    ])), [
      [Nt, c.value !== null || r(c.key)]
    ])), 128));
  }
}, Is = {
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
    const n = kt(), o = t, i = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, r = ct("themeVariables"), s = (e) => {
      var a, l;
      return nt(
        Pe([e, "base"], i, (a = r == null ? void 0 : r.inertia_table) == null ? void 0 : a.reset_button, o.ui),
        Pe([e, "color", o.color], i, (l = r == null ? void 0 : r.inertia_table) == null ? void 0 : l.reset_button, o.ui)
      );
    };
    return (e, a) => {
      var l;
      return I(), M("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: Z(s("button")),
        "aria-haspopup": "true",
        onClick: a[0] || (a[0] = Xe((...u) => t.onClick && t.onClick(...u), ["prevent"]))
      }, [
        a[1] || (a[1] = b("svg", {
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
        b("span", null, z((l = ae(n).reset) != null ? l : "Reset"), 1)
      ], 2);
    };
  }
}, Ps = {}, As = { class: "flow-root" }, Ms = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, Ds = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, Rs = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function $s(t, n) {
  return I(), M("div", As, [
    b("div", Ms, [
      b("div", Ds, [
        b("div", Rs, [
          xe(t.$slots, "default")
        ])
      ])
    ])
  ]);
}
const Ns = /* @__PURE__ */ qt(Ps, [["render", $s]]), js = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Fs = ["dusk", "onClick"], ks = { class: "px-2" }, Ls = {
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
    const n = kt(), o = t, i = se(!1), r = se(!1);
    function s() {
      i.value = r.value = !1;
    }
    function e(a) {
      var l, u;
      (l = o.actions.toggleColumns) != null && l.onReorder ? o.actions.toggleColumns.onReorder(a) : (u = o.actions.toggleColumns) != null && u.onChange && o.actions.toggleColumns.onChange(a);
    }
    return (a, l) => (I(), be(jr, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: t.color,
      onClosed: s
    }, {
      button: Le(() => [...l[5] || (l[5] = [
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
        var u, c, d, f, g;
        return [
          b("div", js, [
            Ke(b("div", null, [
              "searchFields" in t.actions && t.actions.searchFields.show ? (I(), M("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: l[0] || (l[0] = (p) => r.value = !0)
              }, [
                l[6] || (l[6] = b("svg", {
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
                b("span", null, z((u = ae(n).add_search_fields) != null ? u : "Add search field"), 1)
              ])) : K("", !0),
              "toggleColumns" in t.actions && t.actions.toggleColumns.show ? (I(), M("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: l[1] || (l[1] = (p) => i.value = !0)
              }, [
                l[7] || (l[7] = b("svg", {
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
                b("span", null, z((c = ae(n).show_hide_columns) != null ? c : "Show / Hide columns"), 1)
              ])) : K("", !0),
              l[9] || (l[9] = b("hr", null, null, -1)),
              "reset" in t.actions ? (I(), M("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: l[2] || (l[2] = (...p) => {
                  var h, v;
                  return ((h = t.actions.reset) == null ? void 0 : h.onClick) && ((v = t.actions.reset) == null ? void 0 : v.onClick(...p));
                })
              }, [
                l[8] || (l[8] = b("svg", {
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
                b("span", null, z((d = ae(n).grouped_reset) != null ? d : "Reset"), 1)
              ])) : K("", !0)
            ], 512), [
              [Nt, !i.value && !r.value]
            ]),
            Ke(b("div", null, [
              b("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: l[3] || (l[3] = (p) => r.value = !1)
              }, [
                l[10] || (l[10] = b("svg", {
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
                b("span", null, z((f = ae(n).add_search_fields) != null ? f : "Add search field"), 1)
              ]),
              (I(!0), M(it, null, st(t.actions.searchFields.searchInputs, (p, h) => (I(), M("button", {
                key: h,
                dusk: `add-search-row-${p.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: Xe((v) => t.actions.searchFields.onClick(p.key), ["prevent"])
              }, z(p.label), 9, Fs))), 128))
            ], 512), [
              [Nt, r.value]
            ]),
            Ke(b("div", null, [
              b("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: l[4] || (l[4] = (p) => i.value = !1)
              }, [
                l[11] || (l[11] = b("svg", {
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
                b("span", null, z((g = ae(n).show_hide_columns) != null ? g : "Show / Hide columns"), 1)
              ]),
              b("div", ks, [
                l[12] || (l[12] = b("div", { class: "py-2 text-xs text-gray-500 font-medium uppercase" }, " Glissez pour r\xE9organiser ", -1)),
                et(Jn, {
                  columns: t.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: e
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [Nt, i.value]
            ]),
            Ke(b("div", null, [
              xe(a.$slots, "default")
            ], 512), [
              [Nt, !i.value && !r.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function zs(t) {
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
  }, a = () => {
    t !== "default" && localStorage.setItem(`table-column-widths-${t}`, JSON.stringify(s));
  }, l = (v, m) => {
    v.preventDefault(), v.stopPropagation(), n.value = !0, o.value = m, i.value = v.clientX;
    const y = v.target.closest("th");
    r.value = y.offsetWidth;
    const x = y.closest("table");
    x && x.querySelectorAll("thead th[data-column-key]").forEach((P) => {
      const O = P.getAttribute("data-column-key"), B = P.offsetWidth;
      s[O] || (s[O] = B), P.style.width = `${s[O]}px`;
      const W = Array.from(P.parentNode.children).indexOf(P);
      x.querySelectorAll("tbody tr").forEach((k) => {
        const U = k.children[W];
        U && (U.style.width = `${s[O]}px`);
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
        E.querySelectorAll("tbody tr").forEach((B) => {
          const W = B.children[P];
          W && (W.style.width = `${y}px`);
        });
      }
    }
  }, c = () => {
    n.value && (n.value = !1, o.value = null, a(), document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, d = (v) => s[v] || "auto", f = (v, m) => {
    s[v] = m, a();
  }, g = (v) => {
    if (!v)
      return;
    v.querySelectorAll("thead th[data-column-key]").forEach((y) => {
      const x = y.getAttribute("data-column-key");
      if (!s[x]) {
        const O = y.offsetWidth;
        s[x] = Math.max(O, 100);
      }
      y.style.width = `${s[x]}px`;
      const E = Array.from(y.parentNode.children).indexOf(y);
      v.querySelectorAll("tbody tr").forEach((O) => {
        const B = O.children[E];
        B && (B.style.width = `${s[x]}px`);
      });
    });
  }, p = () => {
    Object.keys(s).forEach((v) => {
      delete s[v];
    }), t !== "default" && localStorage.removeItem(`table-column-widths-${t}`);
  }, h = () => {
    n.value && (document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return Ct(() => {
    e();
  }), Nr(() => {
    h();
  }), {
    isResizing: n,
    resizingColumn: o,
    columnWidths: s,
    startResize: l,
    getColumnWidth: d,
    setColumnWidth: f,
    resetColumnWidths: p,
    loadColumnWidths: e,
    saveColumnWidths: a,
    initializeColumnWidths: g
  };
}
const Bs = ["dusk"], Us = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0" }, Gs = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4"
}, Vs = { class: "mr-2 sm:mr-4" }, Ws = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, Ks = { class: "overflow-x-auto" }, Hs = { class: "bg-gray-50" }, Xs = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border",
  style: { width: "60px" }
}, Ys = ["id"], Qs = { class: "divide-y divide-gray-200 bg-white" }, Js = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500",
  style: { width: "60px" }
}, Zs = ["id", "onUpdate:modelValue"], qs = ["onClick", "data-column-key"], _s = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, eu = {
  key: 0,
  class: "italic text-sm px-2"
}, tu = {
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
    const o = kt(), i = n, r = t;
    no();
    const s = r.resizeableColumns ? zs(r.name) : null;
    oo("columnResize", s);
    const e = se(!1), a = me(() => dn().props.queryBuilderProps ? { ...dn().props.queryBuilderProps[r.name] } : {}), l = se(a.value), u = me(() => a.value.pageName), c = se([]), d = se(null), f = se(!1), g = me(() => a.value.hasToggleableColumns || a.value.hasFilters || a.value.hasSearchInputs ? !1 : !a.value.globalSearch), p = me(() => Object.keys(r.resource).length === 0 ? r.data : "data" in r.resource ? r.resource.data : r.resource), h = me(() => Object.keys(r.resource).length === 0 ? r.meta : "links" in r.resource && "meta" in r.resource && Object.keys(r.resource.links).length === 4 && "next" in r.resource.links && "prev" in r.resource.links ? {
      ...r.resource.meta,
      next_page_url: r.resource.links.next,
      prev_page_url: r.resource.links.prev
    } : "meta" in r.resource ? r.resource.meta : r.resource), v = me(() => p.value.length > 0 ? !0 : h.value.total > 0), m = se({
      reset: {
        onClick: B
      },
      toggleColumns: {
        show: a.value.hasToggleableColumns,
        columns: a.value.columns,
        onChange: j
      },
      searchFields: {
        show: a.value.hasSearchInputs && !r.hideSearchInputsAboveTable,
        searchInputs: a.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: a.value.hasSearchInputsWithoutValue,
        onClick: x
      }
    });
    function y(T) {
      c.value = c.value.filter((D) => D != T), A(T, null);
    }
    function x(T) {
      c.value.push(T);
    }
    const E = me(() => {
      if (c.value.length > 0)
        return !0;
      const T = Lr.parse(location.search.substring(1));
      if (T[u.value] > 1)
        return !0;
      const N = r.name === "default" ? "" : r.name + "_";
      let J = !1;
      return Pt(["filter", "columns", "cursor", "sort"], (G) => {
        const ye = T[N + G];
        G === "sort" && ye === a.value.defaultSort || ye !== void 0 && (J = !0);
      }), J;
    }), P = (T, D) => {
      let N = [];
      if (r.striped && D % 2 && N.push("bg-gray-50"), r.striped ? N.push("hover:bg-gray-100") : N.push("hover:bg-gray-50"), r.rowClass && typeof r.rowClass == "function") {
        const J = r.rowClass(T);
        J && N.push(J);
      }
      return N.join(" ");
    }, O = me(() => {
      if (!r.showExportButton)
        return null;
      const T = new URL(window.location.href);
      T.search = "";
      const D = new URLSearchParams();
      if (a.value.page && a.value.page > 1 && D.set(u.value, a.value.page), a.value.sort) {
        const G = r.name === "default" ? "sort" : `${r.name}_sort`;
        D.set(G, a.value.sort);
      }
      const N = {};
      if (l.value.filters.forEach((G) => {
        G.value !== null && G.value !== void 0 && G.value !== "" && (N[G.key] = G.value);
      }), l.value.searchInputs.forEach((G) => {
        G.value !== null && G.value !== void 0 && G.value !== "" && (N[G.key] = G.value);
      }), Object.keys(N).length > 0) {
        const G = r.name === "default" ? "filter" : `${r.name}_filter`;
        Object.keys(N).forEach((ye) => {
          const $e = N[ye];
          Array.isArray($e) ? $e.forEach((at, St) => {
            D.set(`${G}[${ye}][${St}]`, at);
          }) : typeof $e == "object" && $e !== null ? Object.keys($e).forEach((at) => {
            D.set(`${G}[${ye}][${at}]`, $e[at]);
          }) : D.set(`${G}[${ye}]`, $e);
        });
      }
      const J = l.value.columns.filter((G) => !G.hidden).map((G) => G.key);
      if (J.length !== l.value.columns.length) {
        const G = r.name === "default" ? "columns" : `${r.name}_columns`;
        J.forEach((ye) => {
          D.append(`${G}[]`, ye);
        });
      }
      if (a.value.perPageOptions && a.value.perPageOptions.length > 0) {
        const G = new URLSearchParams(window.location.search).get("perPage") || a.value.perPageOptions[0];
        G && G !== a.value.perPageOptions[0] && D.set("perPage", G);
      }
      return D.set("do_export", "1"), D.set("table", r.name || "default"), T.search = D.toString(), T.toString();
    });
    function B() {
      c.value = [], Pt(l.value.filters, (T, D) => {
        l.value.filters[D].value = null;
      }), Pt(l.value.searchInputs, (T, D) => {
        l.value.searchInputs[D].value = null;
      }), Pt(l.value.columns, (T, D) => {
        l.value.columns[D].hidden = T.can_be_hidden ? !a.value.defaultVisibleToggleableColumns.includes(T.key) : !1;
      }), localStorage.removeItem(`columns-${r.name}`), r.resizeableColumns && s && s.resetColumnWidths(), l.value.sort = null, l.value.cursor = null, l.value.page = 1;
    }
    const W = {};
    function A(T, D) {
      clearTimeout(W[T]), W[T] = setTimeout(() => {
        Se.value && r.preventOverlappingRequests && Se.value.cancel();
        const N = $("searchInputs", T);
        l.value.searchInputs[N].value = D, l.value.cursor = null, l.value.page = 1;
      }, r.inputDebounceMs);
    }
    function k(T) {
      A("global", T);
    }
    function U(T, D) {
      const N = $("filters", T);
      l.value.filters[N].value = D, l.value.cursor = null, l.value.page = 1;
    }
    function V(T) {
      l.value.cursor = null, l.value.perPage = T, l.value.page = 1;
    }
    function $(T, D) {
      return mo(l.value[T], (N) => N.key == D);
    }
    function j(T, D = null) {
      if (Array.isArray(T))
        l.value.columns = T;
      else {
        const N = $("columns", T);
        l.value.columns[N].hidden = !D;
      }
      q();
    }
    function q() {
      if (r.name && r.name !== "default") {
        const T = l.value.columns.map((D, N) => ({
          key: D.key,
          hidden: D.hidden,
          order: N
        }));
        localStorage.setItem(`columns-${r.name}`, JSON.stringify(T));
      }
    }
    function L() {
      let T = {};
      return Pt(l.value.searchInputs, (D) => {
        D.value !== null && (T[D.key] = D.value);
      }), Pt(l.value.filters, (D) => {
        let N = D.value;
        N !== null && (D.type === "number_range" && Number(Math.max(...D.value)) === Number(D.max) && Number(Math.min(...D.value)) === Number(D.min) && (N = null), T[D.key] = N);
      }), T;
    }
    function Q() {
      const T = l.value.columns;
      let D = po(T, (J) => !J.hidden), N = bo(D, (J) => J.key).sort();
      return yo(N, a.value.defaultVisibleToggleableColumns) ? {} : N;
    }
    function ue() {
      const T = L(), D = Q(), N = {};
      Object.keys(T).length > 0 && (N.filter = T), Object.keys(D).length > 0 && (N.columns = D);
      const J = l.value.cursor, G = l.value.page, ye = l.value.sort, $e = l.value.perPage;
      return J && (N.cursor = J), G > 1 && (N.page = G), $e > 1 && (N.perPage = $e), ye && (N.sort = ye), N;
    }
    function he(T) {
      if (!T)
        return null;
      if (r.paginationClickCallback && typeof r.paginationClickCallback == "function") {
        r.paginationClickCallback(T);
        return;
      }
      Re(T);
    }
    function De() {
      const T = Lr.parse(location.search.substring(1)), D = r.name === "default" ? "" : r.name + "_";
      Pt(["filter", "columns", "cursor", "sort"], (J) => {
        delete T[D + J];
      }), delete T[u.value], Pt(ue(), (J, G) => {
        G === "page" ? T[u.value] = J : G === "perPage" ? T.perPage = J : T[D + G] = J;
      });
      let N = Lr.stringify(T, {
        filter(J, G) {
          return typeof G == "object" && G !== null ? xo(G) : G;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!N || N === u.value + "=1") && (N = ""), N;
    }
    const de = se(!1), Se = se(null);
    function Re(T) {
      !T || So.get(
        T,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: r.preserveScroll !== !1,
          onBefore() {
            de.value = !0;
          },
          onCancelToken(D) {
            Se.value = D;
          },
          onFinish() {
            de.value = !1;
          },
          onSuccess() {
            if (r.preserveScroll === "table-top") {
              const N = d.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: N });
            }
          }
        }
      );
    }
    function ze(T, D, N) {
      var J;
      r.hasCheckboxes && ((J = T.target) == null ? void 0 : J.parentElement.cellIndex) === 0 || i("rowClicked", T, D, N);
    }
    Ft(l, () => {
      Re(location.pathname + "?" + De()), f.value = !1;
    }, { deep: !0 }), Ft(r.resource, () => {
      const T = r.resource.data.filter((D) => D.__itSelected);
      i("selectionChanged", T);
    }, { deep: !0 });
    const Ae = () => {
      r.resizeableColumns && s && setTimeout(() => {
        var D;
        const T = (D = d.value) == null ? void 0 : D.querySelector("table");
        T && s.initializeColumnWidths(T);
      }, 0);
    };
    Ct(() => {
      document.addEventListener("inertia:success", Ae), we(), r.resizeableColumns && s && setTimeout(() => {
        var D;
        const T = (D = d.value) == null ? void 0 : D.querySelector("table");
        T && s.initializeColumnWidths(T);
      }, 0);
    });
    function we() {
      if (!r.name || r.name === "default")
        return;
      const T = localStorage.getItem(`columns-${r.name}`);
      if (!!T)
        try {
          const D = JSON.parse(T);
          if (D.length > 0 && "order" in D[0]) {
            const N = new Map(D.map((J) => [J.key, J]));
            l.value.columns.forEach((J, G) => {
              const ye = N.get(J.key);
              ye && (l.value.columns[G].hidden = ye.hidden);
            }), l.value.columns.sort((J, G) => {
              var Tt, It;
              const ye = N.get(J.key), $e = N.get(G.key), at = (Tt = ye == null ? void 0 : ye.order) != null ? Tt : 999, St = (It = $e == null ? void 0 : $e.order) != null ? It : 999;
              return at - St;
            });
          } else
            D.forEach((N, J) => {
              const G = l.value.columns.findIndex((ye) => ye.key === N.key);
              G !== -1 && (l.value.columns[G].hidden = N.hidden);
            });
        } catch (D) {
          console.warn("Error loading column order from localStorage:", D);
        }
    }
    Nr(() => {
      document.removeEventListener("inertia:success", Ae);
    });
    function Ee(T) {
      l.value.sort == T ? l.value.sort = `-${T}` : l.value.sort = T, l.value.cursor = null, l.value.page = 1;
    }
    function We(T) {
      const D = $("columns", T);
      return !l.value.columns[D].hidden;
    }
    function Be(T) {
      const D = $("columns", T), N = go(a.value.columns[D]);
      N.onSort = Ee, N.filters = a.value.filters.filter(
        (G) => G.key === T || G.key.startsWith(T + "_") || G.key.includes(T)
      );
      const J = a.value.searchInputs.filter(
        (G) => G.key === T
      );
      return J.length > 0 ? (N.searchable = !0, N.searchInputs = J) : (N.searchable = !1, N.searchInputs = []), N.onFilterChange = U, N.onSearchChange = A, N.color = r.color, N;
    }
    function dt() {
      r.resource.data.forEach((T) => {
        T.__itSelected = f.value;
      });
    }
    function bt(T) {
      if (!r.resizeableColumns || !s)
        return "auto";
      const D = s.getColumnWidth(T);
      return D === "auto" ? D : `${D}px`;
    }
    const gt = me(() => {
      if (!r.resizeableColumns || !s)
        return "100%";
      let T = 0, D = !1;
      return r.hasCheckboxes && (T += 60), a.value.columns.forEach((N) => {
        if (!We(N.key))
          return;
        const J = s.getColumnWidth(N.key);
        J === "auto" ? D = !0 : T += J;
      }), !D && T > 0 ? `${T}px` : "max(100%, " + (T > 0 ? T + "px" : "800px") + ")";
    }), Ue = me(() => r.resource.data.filter((T) => T.__itSelected).length), Ve = me(() => Ue.value === 0 ? o.noLineSelected : `${Ue.value} ${o.lineSelected}`);
    function xt() {
      r.resizeableColumns && (e.value = !0);
    }
    function ot() {
      r.resizeableColumns && setTimeout(() => {
        e.value = !1;
      }, 100);
    }
    return (T, D) => (I(), be(ao, null, {
      default: Le(() => [
        (I(), M("fieldset", {
          ref_key: "tableFieldset",
          ref: d,
          key: `table-${t.name}`,
          dusk: `table-${t.name}`,
          class: Z(["min-w-0", { "opacity-75": de.value }])
        }, [
          b("div", Us, [
            a.value.globalSearch ? (I(), M("div", Gs, [
              xe(T.$slots, "tableGlobalSearch", {
                hasGlobalSearch: a.value.globalSearch,
                label: a.value.globalSearch ? a.value.globalSearch.label : null,
                value: a.value.globalSearch ? a.value.globalSearch.value : null,
                onChange: k
              }, () => [
                a.value.globalSearch ? (I(), be(xs, {
                  key: 0,
                  class: "grow",
                  label: a.value.globalSearch.label,
                  value: a.value.globalSearch.value,
                  "on-change": k,
                  color: t.color
                }, null, 8, ["label", "value", "color"])) : K("", !0)
              ], !0)
            ])) : K("", !0),
            b("div", Vs, [
              xe(T.$slots, "tableFilter", {
                hasFilters: a.value.hasFilters,
                hasEnabledFilters: a.value.hasEnabledFilters,
                filters: a.value.filters,
                onFilterChange: U
              }, () => [
                a.value.hasFilters ? (I(), be(ms, {
                  key: 0,
                  "has-enabled-filters": a.value.hasEnabledFilters,
                  filters: a.value.filters,
                  "on-filter-change": U,
                  color: t.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : K("", !0)
              ], !0)
            ]),
            !t.withGroupedMenu && !t.hideSearchInputsAboveTable ? xe(T.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: a.value.hasSearchInputs,
              hasSearchInputsWithoutValue: a.value.hasSearchInputsWithoutValue,
              searchInputs: a.value.searchInputsWithoutGlobal,
              onAdd: x
            }, () => [
              a.value.hasSearchInputs ? (I(), be(di, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": a.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": a.value.hasSearchInputsWithoutValue,
                "on-add": x,
                color: t.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : K("", !0)
            ], !0) : K("", !0),
            t.withGroupedMenu ? K("", !0) : xe(T.$slots, "tableColumns", {
              key: 2,
              hasColumns: a.value.hasToggleableColumns,
              columns: l.value.columns,
              hasHiddenColumns: a.value.hasHiddenColumns,
              onChange: j
            }, () => [
              a.value.hasToggleableColumns ? (I(), be(is, {
                key: 0,
                class: Z({ "mr-2 sm:mr-4": E.value }),
                columns: l.value.columns,
                "has-hidden-columns": a.value.hasHiddenColumns,
                "on-change": j,
                "table-name": t.name,
                color: t.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "table-name", "color"])) : K("", !0)
            ], !0),
            t.withGroupedMenu ? xe(T.$slots, "groupedAction", {
              key: 3,
              actions: m.value
            }, () => [
              et(Ls, {
                color: t.color,
                actions: m.value
              }, {
                default: Le(() => [
                  xe(T.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : K("", !0),
            t.withGroupedMenu ? K("", !0) : xe(T.$slots, "tableReset", {
              key: 4,
              canBeReset: E.value,
              onClick: B
            }, () => [
              E.value ? (I(), M("div", Ws, [
                et(Is, {
                  "on-click": B,
                  color: t.color
                }, null, 8, ["color"])
              ])) : K("", !0)
            ], !0)
          ]),
          t.hideSearchInputsAboveTable ? K("", !0) : xe(T.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: a.value.hasSearchInputsWithValue,
            searchInputs: a.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: c.value,
            onChange: A
          }, () => [
            a.value.hasSearchInputsWithValue || c.value.length > 0 ? (I(), be(Ts, {
              key: 0,
              "search-inputs": a.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": c.value,
              "on-change": A,
              "on-remove": y,
              color: t.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : K("", !0)
          ], !0),
          xe(T.$slots, "tableWrapper", { meta: h.value }, () => [
            et(Ns, {
              class: Z({ "mt-3": !g.value })
            }, {
              default: Le(() => [
                xe(T.$slots, "table", {}, () => [
                  b("div", Ks, [
                    b("table", {
                      class: Z(["divide-y divide-gray-300", { "show-resize-indicators": t.resizeableColumns && e.value }]),
                      style: Rt([{ "table-layout": "fixed", "min-width": "100%" }, { width: gt.value }]),
                      onMouseenter: D[1] || (D[1] = (N) => t.resizeableColumns ? xt : null),
                      onMouseleave: D[2] || (D[2] = (N) => t.resizeableColumns ? ot : null)
                    }, [
                      b("thead", Hs, [
                        xe(T.$slots, "head", {
                          show: We,
                          sortBy: Ee,
                          header: Be
                        }, () => [
                          b("tr", null, [
                            t.hasCheckboxes ? (I(), M("th", Xs, [
                              Ke(b("input", {
                                type: "checkbox",
                                id: `table-${t.name}-select-header`,
                                onChange: dt,
                                "onUpdate:modelValue": D[0] || (D[0] = (N) => f.value = N),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, Ys), [
                                [cn, f.value]
                              ])
                            ])) : K("", !0),
                            (I(!0), M(it, null, st(l.value.columns, (N) => (I(), be(Wl, {
                              key: `table-${t.name}-header-${N.key}`,
                              cell: Be(N.key)
                            }, {
                              label: Le(() => [
                                xe(T.$slots, `header(${N.key})`, {
                                  label: Be(N.key).label,
                                  column: Be(N.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell"]))), 128))
                          ])
                        ], !0)
                      ]),
                      b("tbody", Qs, [
                        xe(T.$slots, "body", { show: We }, () => [
                          (I(!0), M(it, null, st(p.value, (N, J) => (I(), M("tr", {
                            key: `table-${t.name}-row-${J}`,
                            class: Z(P(N, J))
                          }, [
                            t.hasCheckboxes ? (I(), M("td", Js, [
                              Ke(b("input", {
                                type: "checkbox",
                                id: `table-${t.name}-select-${J}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (G) => N.__itSelected = G
                              }, null, 8, Zs), [
                                [cn, N.__itSelected]
                              ])
                            ])) : K("", !0),
                            (I(!0), M(it, null, st(l.value.columns, (G, ye) => Ke((I(), M("td", {
                              key: `table-${t.name}-row-${J}-column-${G.key}`,
                              onClick: ($e) => ze($e, N, J),
                              class: Z(G.body_class),
                              "data-column-key": G.key,
                              style: Rt({
                                width: bt(G.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              })
                            }, [
                              xe(T.$slots, `cell(${G.key})`, { item: N }, () => [
                                pt(z(N[G.key]), 1)
                              ], !0)
                            ], 14, qs)), [
                              [Nt, We(G.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                xe(T.$slots, "pagination", {
                  onClick: he,
                  hasData: v.value,
                  meta: h.value,
                  perPageOptions: a.value.perPageOptions,
                  onPerPageChange: V,
                  showExportButton: t.showExportButton,
                  exportUrl: O.value
                }, () => [
                  b("div", _s, [
                    t.hasCheckboxes ? (I(), M("span", eu, z(Ve.value), 1)) : K("", !0),
                    et(si, {
                      "on-click": he,
                      "has-data": v.value,
                      meta: h.value,
                      "per-page-options": a.value.perPageOptions,
                      "on-per-page-change": V,
                      color: t.color,
                      "show-export-button": t.showExportButton,
                      "export-url": O.value
                    }, {
                      exportButton: Le((N) => [
                        xe(T.$slots, "exportButton", lo(io(N)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button", "export-url"])
                  ])
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0)
        ], 10, Bs))
      ]),
      _: 3
    }));
  }
}, xu = /* @__PURE__ */ qt(tu, [["__scopeId", "data-v-e90ca159"]]);
export {
  jr as ButtonWithDropdown,
  Wl as HeaderCell,
  wo as OnClickOutside,
  si as Pagination,
  xu as Table,
  di as TableAddSearchRow,
  is as TableColumns,
  ms as TableFilter,
  xs as TableGlobalSearch,
  Is as TableReset,
  Ts as TableSearchRows,
  Ns as TableWrapper,
  kt as getTranslations,
  yu as setTranslation,
  bu as setTranslations
};
