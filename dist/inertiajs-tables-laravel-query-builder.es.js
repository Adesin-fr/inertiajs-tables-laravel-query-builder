import { ref as I, onMounted as je, onBeforeUnmount as Ye, openBlock as f, createElementBlock as p, renderSlot as V, watch as _e, inject as ie, createBlock as F, withCtx as j, createElementVNode as s, normalizeClass as k, withModifiers as R, withDirectives as G, vShow as U, resolveDynamicComponent as de, toDisplayString as y, createCommentVNode as w, computed as P, Fragment as E, renderList as W, unref as B, createVNode as ae, createTextVNode as Z, normalizeStyle as ye, nextTick as Xe, getCurrentInstance as Je, onUnmounted as Ze, Transition as et, vModelCheckbox as Ae } from "vue";
import { createPopper as tt } from "@popperjs/core/lib/popper-lite";
import rt from "@popperjs/core/lib/modifiers/preventOverflow";
import ot from "@popperjs/core/lib/modifiers/flip";
import lt from "lodash-es/uniq";
import { usePage as Ve, router as nt } from "@inertiajs/vue3";
import st from "lodash-es/find";
import Pe from "qs";
import at from "lodash-es/clone";
import it from "lodash-es/filter";
import ut from "lodash-es/findKey";
import X from "lodash-es/forEach";
import ct from "lodash-es/isEqual";
import dt from "lodash-es/map";
import ft from "lodash-es/pickBy";
const gt = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const l = e, n = I(null), o = I(null);
    return je(() => {
      n.value = (i) => {
        i.target === o.value || o.value.contains(i.target) || l.do();
      }, document.addEventListener("click", n.value), document.addEventListener("touchstart", n.value);
    }), Ye(() => {
      document.removeEventListener("click", n.value), document.removeEventListener("touchstart", n.value);
    }), (i, t) => (f(), p("div", {
      ref_key: "root",
      ref: o
    }, [
      V(i.$slots, "default")
    ], 512));
  }
}, Oe = "-", pt = (e) => {
  const l = mt(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (r) => {
      const a = r.split(Oe);
      return a[0] === "" && a.length !== 1 && a.shift(), Ge(a, l) || ht(r);
    },
    getConflictingClassGroupIds: (r, a) => {
      const u = n[r] || [];
      return a && o[r] ? [...u, ...o[r]] : u;
    }
  };
}, Ge = (e, l) => {
  var r;
  if (e.length === 0)
    return l.classGroupId;
  const n = e[0], o = l.nextPart.get(n), i = o ? Ge(e.slice(1), o) : void 0;
  if (i)
    return i;
  if (l.validators.length === 0)
    return;
  const t = e.join(Oe);
  return (r = l.validators.find(({
    validator: a
  }) => a(t))) == null ? void 0 : r.classGroupId;
}, Be = /^\[(.+)\]$/, ht = (e) => {
  if (Be.test(e)) {
    const l = Be.exec(e)[1], n = l == null ? void 0 : l.substring(0, l.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, mt = (e) => {
  const {
    theme: l,
    prefix: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return vt(Object.entries(e.classGroups), n).forEach(([t, r]) => {
    Fe(r, o, t, l);
  }), o;
}, Fe = (e, l, n, o) => {
  e.forEach((i) => {
    if (typeof i == "string") {
      const t = i === "" ? l : Re(l, i);
      t.classGroupId = n;
      return;
    }
    if (typeof i == "function") {
      if (bt(i)) {
        Fe(i(o), l, n, o);
        return;
      }
      l.validators.push({
        validator: i,
        classGroupId: n
      });
      return;
    }
    Object.entries(i).forEach(([t, r]) => {
      Fe(r, Re(l, t), n, o);
    });
  });
}, Re = (e, l) => {
  let n = e;
  return l.split(Oe).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, bt = (e) => e.isThemeGetter, vt = (e, l) => l ? e.map(([n, o]) => {
  const i = o.map((t) => typeof t == "string" ? l + t : typeof t == "object" ? Object.fromEntries(Object.entries(t).map(([r, a]) => [l + r, a])) : t);
  return [n, i];
}) : e, yt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let l = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const i = (t, r) => {
    n.set(t, r), l++, l > e && (l = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(t) {
      let r = n.get(t);
      if (r !== void 0)
        return r;
      if ((r = o.get(t)) !== void 0)
        return i(t, r), r;
    },
    set(t, r) {
      n.has(t) ? n.set(t, r) : i(t, r);
    }
  };
}, Ee = "!", xt = (e) => {
  const {
    separator: l,
    experimentalParseClassName: n
  } = e, o = l.length === 1, i = l[0], t = l.length, r = (a) => {
    const u = [];
    let g = 0, c = 0, v;
    for (let $ = 0; $ < a.length; $++) {
      let N = a[$];
      if (g === 0) {
        if (N === i && (o || a.slice($, $ + t) === l)) {
          u.push(a.slice(c, $)), c = $ + t;
          continue;
        }
        if (N === "/") {
          v = $;
          continue;
        }
      }
      N === "[" ? g++ : N === "]" && g--;
    }
    const h = u.length === 0 ? a : a.substring(c), M = h.startsWith(Ee), q = M ? h.substring(1) : h, z = v && v > c ? v - c : void 0;
    return {
      modifiers: u,
      hasImportantModifier: M,
      baseClassName: q,
      maybePostfixModifierPosition: z
    };
  };
  return n ? (a) => n({
    className: a,
    parseClassName: r
  }) : r;
}, wt = (e) => {
  if (e.length <= 1)
    return e;
  const l = [];
  let n = [];
  return e.forEach((o) => {
    o[0] === "[" ? (l.push(...n.sort(), o), n = []) : n.push(o);
  }), l.push(...n.sort()), l;
}, kt = (e) => ({
  cache: yt(e.cacheSize),
  parseClassName: xt(e),
  ...pt(e)
}), Ct = /\s+/, Mt = (e, l) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: i
  } = l, t = [], r = e.trim().split(Ct);
  let a = "";
  for (let u = r.length - 1; u >= 0; u -= 1) {
    const g = r[u], {
      modifiers: c,
      hasImportantModifier: v,
      baseClassName: h,
      maybePostfixModifierPosition: M
    } = n(g);
    let q = Boolean(M), z = o(q ? h.substring(0, M) : h);
    if (!z) {
      if (!q) {
        a = g + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (z = o(h), !z) {
        a = g + (a.length > 0 ? " " + a : a);
        continue;
      }
      q = !1;
    }
    const $ = wt(c).join(":"), N = v ? $ + Ee : $, O = N + z;
    if (t.includes(O))
      continue;
    t.push(O);
    const H = i(z, q);
    for (let D = 0; D < H.length; ++D) {
      const K = H[D];
      t.push(N + K);
    }
    a = g + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function St() {
  let e = 0, l, n, o = "";
  for (; e < arguments.length; )
    (l = arguments[e++]) && (n = We(l)) && (o && (o += " "), o += n);
  return o;
}
const We = (e) => {
  if (typeof e == "string")
    return e;
  let l, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (l = We(e[o])) && (n && (n += " "), n += l);
  return n;
};
function $t(e, ...l) {
  let n, o, i, t = r;
  function r(u) {
    const g = l.reduce((c, v) => v(c), e());
    return n = kt(g), o = n.cache.get, i = n.cache.set, t = a, a(u);
  }
  function a(u) {
    const g = o(u);
    if (g)
      return g;
    const c = Mt(u, n);
    return i(u, c), c;
  }
  return function() {
    return t(St.apply(null, arguments));
  };
}
const T = (e) => {
  const l = (n) => n[e] || [];
  return l.isThemeGetter = !0, l;
}, De = /^\[(?:([a-z-]+):)?(.+)\]$/i, _t = /^\d+\/\d+$/, qt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Tt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, zt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Nt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Vt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Pt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, J = (e) => fe(e) || qt.has(e) || _t.test(e), re = (e) => ge(e, "length", Lt), fe = (e) => Boolean(e) && !Number.isNaN(Number(e)), Ie = (e) => ge(e, "number", fe), xe = (e) => Boolean(e) && Number.isInteger(Number(e)), It = (e) => e.endsWith("%") && fe(e.slice(0, -1)), x = (e) => De.test(e), oe = (e) => Tt.test(e), Ft = /* @__PURE__ */ new Set(["length", "size", "percentage"]), jt = (e) => ge(e, Ft, Ue), Ot = (e) => ge(e, "position", Ue), At = /* @__PURE__ */ new Set(["image", "url"]), Bt = (e) => ge(e, At, Et), Rt = (e) => ge(e, "", Gt), we = () => !0, ge = (e, l, n) => {
  const o = De.exec(e);
  return o ? o[1] ? typeof l == "string" ? o[1] === l : l.has(o[1]) : n(o[2]) : !1;
}, Lt = (e) => zt.test(e) && !Nt.test(e), Ue = () => !1, Gt = (e) => Vt.test(e), Et = (e) => Pt.test(e), Wt = () => {
  const e = T("colors"), l = T("spacing"), n = T("blur"), o = T("brightness"), i = T("borderColor"), t = T("borderRadius"), r = T("borderSpacing"), a = T("borderWidth"), u = T("contrast"), g = T("grayscale"), c = T("hueRotate"), v = T("invert"), h = T("gap"), M = T("gradientColorStops"), q = T("gradientColorStopPositions"), z = T("inset"), $ = T("margin"), N = T("opacity"), O = T("padding"), H = T("saturate"), D = T("scale"), K = T("sepia"), pe = T("skew"), he = T("space"), me = T("translate"), Q = () => ["auto", "contain", "none"], le = () => ["auto", "hidden", "clip", "visible", "scroll"], be = () => ["auto", x, l], _ = () => [x, l], ke = () => ["", J, re], ne = () => ["auto", fe, x], Ce = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], te = () => ["solid", "dashed", "dotted", "double", "none"], ue = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ce = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], se = () => ["", "0", x], ve = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [fe, x];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [we],
      spacing: [J, re],
      blur: ["none", "", oe, x],
      brightness: L(),
      borderColor: [e],
      borderRadius: ["none", "", "full", oe, x],
      borderSpacing: _(),
      borderWidth: ke(),
      contrast: L(),
      grayscale: se(),
      hueRotate: L(),
      invert: se(),
      gap: _(),
      gradientColorStops: [e],
      gradientColorStopPositions: [It, re],
      inset: be(),
      margin: be(),
      opacity: L(),
      padding: _(),
      saturate: L(),
      scale: L(),
      sepia: se(),
      skew: L(),
      space: _(),
      translate: _()
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", x]
      }],
      container: ["container"],
      columns: [{
        columns: [oe]
      }],
      "break-after": [{
        "break-after": ve()
      }],
      "break-before": [{
        "break-before": ve()
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
        overflow: le()
      }],
      "overflow-x": [{
        "overflow-x": le()
      }],
      "overflow-y": [{
        "overflow-y": le()
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
        basis: be()
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
        grow: se()
      }],
      shrink: [{
        shrink: se()
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
        "col-start": ne()
      }],
      "col-end": [{
        "col-end": ne()
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
        gap: [h]
      }],
      "gap-x": [{
        "gap-x": [h]
      }],
      "gap-y": [{
        "gap-y": [h]
      }],
      "justify-content": [{
        justify: ["normal", ...ce()]
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal", ...ce(), "baseline"]
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [...ce(), "baseline"]
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
        "space-x": [he]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [he]
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
          screen: [oe]
        }, oe]
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
        text: ["base", oe, re]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ie]
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
        "line-clamp": ["none", fe, Ie]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", J, x]
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
        "placeholder-opacity": [N]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [e]
      }],
      "text-opacity": [{
        "text-opacity": [N]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...te(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", J, re]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", J, x]
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
        "bg-opacity": [N]
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
        from: [q]
      }],
      "gradient-via-pos": [{
        via: [q]
      }],
      "gradient-to-pos": [{
        to: [q]
      }],
      "gradient-from": [{
        from: [M]
      }],
      "gradient-via": [{
        via: [M]
      }],
      "gradient-to": [{
        to: [M]
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
        "border-opacity": [N]
      }],
      "border-style": [{
        border: [...te(), "hidden"]
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
        "divide-opacity": [N]
      }],
      "divide-style": [{
        divide: te()
      }],
      "border-color": [{
        border: [i]
      }],
      "border-color-x": [{
        "border-x": [i]
      }],
      "border-color-y": [{
        "border-y": [i]
      }],
      "border-color-t": [{
        "border-t": [i]
      }],
      "border-color-r": [{
        "border-r": [i]
      }],
      "border-color-b": [{
        "border-b": [i]
      }],
      "border-color-l": [{
        "border-l": [i]
      }],
      "divide-color": [{
        divide: [i]
      }],
      "outline-style": [{
        outline: ["", ...te()]
      }],
      "outline-offset": [{
        "outline-offset": [J, x]
      }],
      "outline-w": [{
        outline: [J, re]
      }],
      "outline-color": [{
        outline: [e]
      }],
      "ring-w": [{
        ring: ke()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [e]
      }],
      "ring-opacity": [{
        "ring-opacity": [N]
      }],
      "ring-offset-w": [{
        "ring-offset": [J, re]
      }],
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      shadow: [{
        shadow: ["", "inner", "none", oe, Rt]
      }],
      "shadow-color": [{
        shadow: [we]
      }],
      opacity: [{
        opacity: [N]
      }],
      "mix-blend": [{
        "mix-blend": [...ue(), "plus-lighter", "plus-darker"]
      }],
      "bg-blend": [{
        "bg-blend": ue()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [n]
      }],
      brightness: [{
        brightness: [o]
      }],
      contrast: [{
        contrast: [u]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", oe, x]
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
        sepia: [K]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
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
        "backdrop-opacity": [N]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [H]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [K]
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
        duration: L()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", x]
      }],
      delay: [{
        delay: L()
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
        "translate-x": [me]
      }],
      "translate-y": [{
        "translate-y": [me]
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
        stroke: [J, re, Ie]
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
}, ee = /* @__PURE__ */ $t(Wt);
function A(e, l, n, o) {
  let i = { ...l }, t = null, r = { ...n }, a = null, u = { ...o }, g = null;
  for (const c of e)
    t === null && c in i && (i = i[c], typeof i == "string" && (t = i)), a === null && c in r && (r = r[c], typeof r == "string" && (a = r)), g === null && c in u && (u = u[c], typeof u == "string" && (g = u));
  return ee(t, a, g);
}
const Dt = { class: "relative" }, Ut = ["dusk", "disabled"], Ht = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, qe = {
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
  setup(e, { expose: l, emit: n }) {
    const o = n, i = e, t = I(!1), r = I(null);
    function a() {
      t.value = !t.value;
    }
    function u() {
      t.value = !1;
    }
    _e(t, () => {
      r.value.update(), t.value || o("closed"), t.value && o("opened");
    });
    const g = I(null), c = I(null);
    je(() => {
      r.value = tt(g.value, c.value, {
        placement: i.placement,
        modifiers: [ot, rt]
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
    }, h = ie("themeVariables"), M = (q) => {
      var $, N;
      let z = "";
      return q === "button" && i.disabled && (z = "cursor-not-allowed"), ee(
        z,
        A([q, "base"], v, ($ = h == null ? void 0 : h.inertia_table) == null ? void 0 : $.button_with_dropdown, i.ui),
        A([q, "color", i.color], v, (N = h == null ? void 0 : h.inertia_table) == null ? void 0 : N.button_with_dropdown, i.ui)
      );
    };
    return (q, z) => (f(), F(gt, { do: u }, {
      default: j(() => [
        s("div", Dt, [
          s("button", {
            ref_key: "button",
            ref: g,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: k(M("button")),
            "aria-haspopup": "true",
            onClick: R(a, ["prevent"])
          }, [
            V(q.$slots, "button")
          ], 10, Ut),
          G(s("div", {
            ref_key: "tooltip",
            ref: c,
            class: "absolute z-10"
          }, [
            s("div", Ht, [
              V(q.$slots, "default")
            ])
          ], 512), [
            [U, t.value]
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
    const l = e;
    function n() {
      l.cell.sortable && l.cell.onSort(l.cell.key);
    }
    return (o, i) => G((f(), p("th", Kt, [
      (f(), F(de(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: R(n, ["prevent"])
      }, {
        default: j(() => [
          s("span", Qt, [
            V(o.$slots, "label", {}, () => [
              s("span", Yt, y(e.cell.label), 1)
            ]),
            V(o.$slots, "sort", {}, () => [
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
    ], 512)), [
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
    search: "Search..."
  }
}, rr = Te.translations;
function ze() {
  return Te.translations;
}
function sl(e, l) {
  Te.translations[e] = l;
}
function al(e) {
  Te.translations = e;
}
const or = ["dusk", "value"], lr = ["value"], Le = {
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
    const l = ze(), n = e, o = P(() => {
      let a = [...n.options];
      return a.push(parseInt(n.value)), lt(a).sort((u, g) => u - g);
    }), i = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, t = ie("themeVariables"), r = (a) => {
      var u, g;
      return ee(
        A([a, "base"], i, (u = t == null ? void 0 : t.inertia_table) == null ? void 0 : u.per_page_selector, n.ui),
        A([a, "color", n.color], i, (g = t == null ? void 0 : t.inertia_table) == null ? void 0 : g.per_page_selector, n.ui)
      );
    };
    return (a, u) => (f(), p("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: k(r("select")),
      onChange: u[0] || (u[0] = (g) => e.onChange(g.target.value))
    }, [
      (f(!0), p(E, null, W(o.value, (g) => (f(), p("option", {
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
    const l = ze(), n = e, o = P(() => "links" in t.value ? t.value.links.length > 0 : !1), i = P(() => Object.keys(t.value).length > 0), t = P(() => n.meta), r = P(() => "prev_page_url" in t.value ? t.value.prev_page_url : null), a = P(() => "next_page_url" in t.value ? t.value.next_page_url : null), u = P(() => parseInt(t.value.per_page));
    return (g, c) => i.value ? (f(), p("nav", nr, [
      !e.hasData || t.value.total < 1 ? (f(), p("p", sr, y(B(l).no_results_found), 1)) : w("", !0),
      e.hasData ? (f(), p("div", {
        key: 1,
        class: k(["flex-1 flex justify-between", { "sm:hidden": o.value }])
      }, [
        (f(), F(de(r.value ? "a" : "div"), {
          class: k([{
            "cursor-not-allowed text-gray-400": !r.value,
            "text-gray-700 hover:text-gray-500": r.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: r.value,
          dusk: r.value ? "pagination-simple-previous" : null,
          onClick: c[0] || (c[0] = R((v) => e.onClick(r.value), ["prevent"]))
        }, {
          default: j(() => [
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
            s("span", ar, y(B(l).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        ae(Le, {
          dusk: "per-page-mobile",
          value: u.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (f(), F(de(a.value ? "a" : "div"), {
          class: k([{
            "cursor-not-allowed text-gray-400": !a.value,
            "text-gray-700 hover:text-gray-500": a.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: a.value,
          dusk: a.value ? "pagination-simple-next" : null,
          onClick: c[1] || (c[1] = R((v) => e.onClick(a.value), ["prevent"]))
        }, {
          default: j(() => [
            s("span", ir, y(B(l).next), 1),
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
      ], 2)) : w("", !0),
      e.hasData && o.value ? (f(), p("div", ur, [
        s("div", cr, [
          ae(Le, {
            dusk: "per-page-full",
            value: u.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          s("p", dr, [
            s("span", fr, y(t.value.from), 1),
            Z(" " + y(B(l).to) + " ", 1),
            s("span", gr, y(t.value.to), 1),
            Z(" " + y(B(l).of) + " ", 1),
            s("span", pr, y(t.value.total), 1),
            Z(" " + y(B(l).results), 1)
          ])
        ]),
        s("div", null, [
          s("nav", hr, [
            (f(), F(de(r.value ? "a" : "div"), {
              class: k([{
                "cursor-not-allowed text-gray-400": !r.value,
                "text-gray-500 hover:bg-gray-50": r.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: r.value,
              dusk: r.value ? "pagination-previous" : null,
              onClick: c[2] || (c[2] = R((v) => e.onClick(r.value), ["prevent"]))
            }, {
              default: j(() => [
                s("span", mr, y(B(l).previous), 1),
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
            (f(!0), p(E, null, W(t.value.links, (v, h) => (f(), p("div", { key: h }, [
              V(g.$slots, "link", {}, () => [
                !isNaN(v.label) || v.label === "..." ? (f(), F(de(v.url ? "a" : "div"), {
                  key: 0,
                  href: v.url,
                  dusk: v.url ? `pagination-${v.label}` : null,
                  class: k(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !v.url,
                    "hover:bg-gray-50": v.url,
                    "bg-white": !v.active,
                    "bg-gray-100": v.active
                  }]),
                  onClick: R((M) => e.onClick(v.url), ["prevent"])
                }, {
                  default: j(() => [
                    Z(y(v.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : w("", !0)
              ])
            ]))), 128)),
            (f(), F(de(a.value ? "a" : "div"), {
              class: k([{
                "cursor-not-allowed text-gray-400": !a.value,
                "text-gray-500 hover:bg-gray-50": a.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: a.value,
              dusk: a.value ? "pagination-next" : null,
              onClick: c[3] || (c[3] = R((v) => e.onClick(a.value), ["prevent"]))
            }, {
              default: j(() => [
                s("span", br, y(B(l).next), 1),
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
    const l = e, n = I(null);
    function o(i) {
      l.onAdd(i), n.value.hide();
    }
    return (i, t) => (f(), F(qe, {
      ref_key: "dropdown",
      ref: n,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: j(() => t[0] || (t[0] = [
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
      ])),
      default: j(() => [
        s("div", yr, [
          (f(!0), p(E, null, W(e.searchInputs, (r, a) => (f(), p("button", {
            key: a,
            dusk: `add-search-row-${r.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: R((u) => o(r.key), ["prevent"])
          }, y(r.label), 9, xr))), 128))
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
}, Mr = { class: "px-2" }, Sr = { class: "divide-y divide-gray-200" }, $r = { class: "text-sm text-gray-900" }, _r = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], qr = {
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
    const l = e, n = P(() => l.columns.filter((o) => o.hidden).length);
    return (o, i) => (f(), F(qe, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: j(() => [
        i[0] || (i[0] = s("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-5 w-5 text-gray-400",
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
        e.hasHiddenColumns ? (f(), p("span", kr, "(" + y(n.value) + ")", 1)) : w("", !0)
      ]),
      default: j(() => [
        s("div", Cr, [
          s("div", Mr, [
            s("ul", Sr, [
              (f(!0), p(E, null, W(l.columns, (t, r) => G((f(), p("li", {
                key: r,
                class: "py-2 flex items-center justify-between"
              }, [
                s("p", $r, y(t.label), 1),
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
                  onClick: R((a) => e.onChange(t.key, t.hidden), ["prevent"])
                }, [
                  i[1] || (i[1] = s("span", { class: "sr-only" }, "Column status", -1)),
                  s("span", {
                    "aria-hidden": "true",
                    class: k([{
                      "translate-x-5": !t.hidden,
                      "translate-x-0": t.hidden
                    }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
                  }, null, 2)
                ], 10, _r)
              ])), [
                [U, t.can_be_hidden]
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
    const l = e, n = {
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
    }, o = ie("themeVariables"), i = (t) => {
      var a, u, g, c;
      let r = l.color;
      return t === "toggle" && l.filter.value === null && (r = "disabled"), ee(
        A([t, "base"], n, (u = (a = o == null ? void 0 : o.inertia_table) == null ? void 0 : a.table_filter) == null ? void 0 : u.toggle_filter, l.ui),
        A([t, "color", r], n, (c = (g = o == null ? void 0 : o.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : c.toggle_filter, l.ui)
      );
    };
    return (t, r) => (f(), p("div", Tr, [
      s("label", zr, [
        s("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: r[0] || (r[0] = (a) => e.onFilterChange(e.filter.key, a.target.checked ? "1" : "0"))
        }, null, 40, Nr),
        s("div", {
          class: k(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", i("toggle")])
        }, null, 2)
      ]),
      s("button", {
        class: k(i("reset_button")),
        onClick: r[1] || (r[1] = R((a) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, r[2] || (r[2] = [
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
      ]), 2)
    ]));
  }
}, He = (e, l) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of l)
    n[o] = i;
  return n;
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
      const l = this.getTheme("button"), n = /h-(\d+)/, o = l.match(n), i = 4;
      let t = null;
      return o && 1 in o ? t = o[1] : t = i, e ? `margin-top: ${(t - i + 12) * 0.25}rem` : `margin-top: -${((t - i) / 2 + 9) * 0.25}rem`;
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
      let o = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), i = Number(Math.round(o / this.step) * this.step).toFixed(2);
      i >= this.min && i <= this.max && (this.moveMin && i !== this.currentMinValue && i <= this.currentMaxValue && (this.internalValue = [i, this.currentMaxValue]), this.moveMax && i !== this.currentMaxValue && i >= this.currentMinValue && (this.internalValue = [this.currentMinValue, i])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var l, n, o, i, t, r;
      return ee(
        A([e, "base"], this.fallbackTheme, (o = (n = (l = this.themeVariables) == null ? void 0 : l.inertia_table) == null ? void 0 : n.table_filter) == null ? void 0 : o.number_range_filter, this.ui),
        A([e, "color", this.color], this.fallbackTheme, (r = (t = (i = this.themeVariables) == null ? void 0 : i.inertia_table) == null ? void 0 : t.table_filter) == null ? void 0 : r.number_range_filter, this.ui)
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
}, Ar = { key: 0 }, Br = { key: 1 }, Rr = { class: "z-40" }, Lr = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Gr = { key: 0 }, Er = { key: 1 }, Wr = { draggable: "true" }, Dr = { key: 0 }, Ur = { key: 1 }, Hr = { key: 0 }, Kr = { key: 1 };
function Qr(e, l, n, o, i, t) {
  var r, a, u, g;
  return f(), p("div", Ir, [
    s("div", Fr, [
      s("div", {
        class: k(t.getTheme("main_bar"))
      }, [
        s("div", {
          class: k(["absolute", t.getTheme("selected_bar")]),
          style: ye(`width: ${t.rangeWidth}% !important; left: ${t.currentMinValueInPercent}% !important;`)
        }, null, 6),
        s("div", {
          class: k([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ye(`left: ${t.currentMinValueInPercent}%;`),
          onMousedown: l[0] || (l[0] = (c) => t.handleMouseDown(c, !0))
        }, [
          s("div", jr, [
            s("div", Or, [
              s("div", {
                class: k(t.getTheme("popover")),
                style: ye(t.getMarginTop(i.hasOverlap && t.displayFirstDown))
              }, [
                n.prefix ? (f(), p("span", Ar, y(n.prefix), 1)) : w("", !0),
                Z(" " + y((r = t.currentMinValue) != null ? r : 0) + " ", 1),
                n.suffix ? (f(), p("span", Br, y(n.suffix), 1)) : w("", !0)
              ], 6),
              (f(), p("svg", {
                class: k(["absolute w-full h-2 left-0", [i.hasOverlap && t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                x: "0px",
                y: "0px",
                viewBox: "0 0 255 255",
                "xml:space": "preserve"
              }, l[2] || (l[2] = [
                s("polygon", {
                  class: "fill-current",
                  points: "0,0 127.5,127.5 255,0"
                }, null, -1)
              ]), 2))
            ], 512)
          ])
        ], 38),
        s("div", {
          class: k([t.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: ye(`left: ${t.currentMaxValueInPercent}%;`),
          onMousedown: l[1] || (l[1] = (c) => t.handleMouseDown(c, !1))
        }, [
          s("div", Rr, [
            s("div", Lr, [
              s("div", {
                class: k(t.getTheme("popover")),
                style: ye(t.getMarginTop(i.hasOverlap && !t.displayFirstDown))
              }, [
                n.prefix ? (f(), p("span", Gr, y(n.prefix), 1)) : w("", !0),
                Z(" " + y((a = t.currentMaxValue) != null ? a : 0) + " ", 1),
                n.suffix ? (f(), p("span", Er, y(n.suffix), 1)) : w("", !0)
              ], 6),
              s("div", Wr, [
                (f(), p("svg", {
                  class: k(["absolute w-full h-2 left-0 top-100", [i.hasOverlap && !t.displayFirstDown ? "bottom-6 rotate-180" : "top-100", t.getTheme("popover_arrow")]]),
                  x: "0px",
                  y: "0px",
                  viewBox: "0 0 255 255",
                  "xml:space": "preserve"
                }, l[3] || (l[3] = [
                  s("polygon", {
                    class: "fill-current",
                    points: "0,0 127.5,127.5 255,0"
                  }, null, -1)
                ]), 2))
              ])
            ], 512)
          ])
        ], 38),
        s("div", {
          class: k(["absolute -ml-1 bottom-0 left-0 -mb-6", t.getTheme("text")])
        }, [
          n.prefix ? (f(), p("span", Dr, y(n.prefix), 1)) : w("", !0),
          Z(" " + y((u = n.min) != null ? u : 0) + " ", 1),
          n.suffix ? (f(), p("span", Ur, y(n.suffix), 1)) : w("", !0)
        ], 2),
        s("div", {
          class: k(["absolute -mr-1 bottom-0 right-0 -mb-6", t.getTheme("text")])
        }, [
          n.prefix ? (f(), p("span", Hr, y(n.prefix), 1)) : w("", !0),
          Z(" " + y((g = n.max) != null ? g : 0) + " ", 1),
          n.suffix ? (f(), p("span", Kr, y(n.suffix), 1)) : w("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const Yr = /* @__PURE__ */ He(Pr, [["render", Qr]]), Xr = {
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
    const n = P(() => l.filters.filter((u) => !o(u)).length);
    function o(u) {
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
    function i(u) {
      let g = u.value;
      u.value && (Number(Math.max(...u.value)) === Number(u.max) && Number(Math.min(...u.value)) === Number(u.min) ? g = null : Number(Math.min(...u.value)) === 0 && Number(Math.max(...u.value)) === 0 && (g = ["0", "0"])), l.onFilterChange(u.key, g);
    }
    const t = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, r = ie("themeVariables"), a = (u) => {
      var g, c, v, h;
      return ee(
        A([u, "base"], t, (c = (g = r == null ? void 0 : r.inertia_table) == null ? void 0 : g.table_filter) == null ? void 0 : c.select_filter, l.ui),
        A([u, "color", l.color], t, (h = (v = r == null ? void 0 : r.inertia_table) == null ? void 0 : v.table_filter) == null ? void 0 : h.select_filter, l.ui)
      );
    };
    return (u, g) => (f(), F(qe, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: j(() => [
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
        e.hasEnabledFilters ? (f(), p("span", Xr, "(" + y(n.value) + ")", 1)) : w("", !0)
      ]),
      default: j(() => [
        s("div", Jr, [
          (f(!0), p(E, null, W(e.filters, (c, v) => (f(), p("div", { key: v }, [
            s("h3", Zr, y(c.label), 1),
            s("div", eo, [
              c.type === "select" ? (f(), p("select", {
                key: 0,
                name: c.key,
                value: c.value,
                class: k(a("select", e.color)),
                onChange: (h) => e.onFilterChange(c.key, h.target.value)
              }, [
                (f(!0), p(E, null, W(c.options, (h, M) => (f(), p("option", {
                  key: M,
                  value: M
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
                  "onUpdate:modelValue": [(h) => c.value = h, (h) => i(c)],
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
    const l = e, n = {
      input: {
        base: "block w-full pl-9 text-sm rounded-md shadow-sm",
        color: {
          primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300"
        }
      }
    }, o = ie("themeVariables"), i = (t) => {
      var r, a;
      return ee(
        A([t, "base"], n, (r = o == null ? void 0 : o.inertia_table) == null ? void 0 : r.global_search, l.ui),
        A([t, "color", l.color], n, (a = o == null ? void 0 : o.inertia_table) == null ? void 0 : a.global_search, l.ui)
      );
    };
    return (t, r) => (f(), p("div", no, [
      s("input", {
        class: k(i("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: r[0] || (r[0] = (a) => e.onChange(a.target.value))
      }, null, 42, so),
      r[1] || (r[1] = s("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
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
    let n = P(() => l.el.value);
    const o = e;
    function i(u) {
      return o.forcedVisibleSearchInputs.includes(u);
    }
    _e(o.forcedVisibleSearchInputs, (u) => {
      const g = u.length > 0 ? u[u.length - 1] : null;
      !g || Xe().then(() => {
        const c = st(n.value, (v) => v.name === g);
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
    }, r = ie("themeVariables"), a = (u) => {
      var g, c;
      return ee(
        A([u, "base"], t, (g = r == null ? void 0 : r.inertia_table) == null ? void 0 : g.table_search_rows, o.ui),
        A([u, "color", o.color], t, (c = r == null ? void 0 : r.inertia_table) == null ? void 0 : c.table_search_rows, o.ui)
      );
    };
    return (u, g) => (f(!0), p(E, null, W(e.searchInputs, (c, v) => G((f(), p("div", {
      key: v,
      class: "px-4 sm:px-0"
    }, [
      s("div", io, [
        s("label", {
          for: c.key,
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
          s("span", null, y(c.label), 1)
        ], 8, uo),
        (f(), p("input", {
          id: c.key,
          ref_for: !0,
          ref: l.el,
          key: c.key,
          name: c.key,
          value: c.value,
          type: "text",
          class: k(a("input")),
          onInput: (h) => e.onChange(c.key, h.target.value)
        }, null, 42, co)),
        s("div", fo, [
          s("button", {
            class: k(a("remove_button")),
            dusk: `remove-search-row-${c.key}`,
            onClick: R((h) => e.onRemove(c.key), ["prevent"])
          }, g[1] || (g[1] = [
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
          ]), 10, go)
        ])
      ])
    ])), [
      [U, c.value !== null || i(c.key)]
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
    const l = ze(), n = e, o = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, i = ie("themeVariables"), t = (r) => {
      var a, u;
      return ee(
        A([r, "base"], o, (a = i == null ? void 0 : i.inertia_table) == null ? void 0 : a.reset_button, n.ui),
        A([r, "color", n.color], o, (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.reset_button, n.ui)
      );
    };
    return (r, a) => {
      var u;
      return f(), p("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: k(t("button")),
        "aria-haspopup": "true",
        onClick: a[0] || (a[0] = R((...g) => e.onClick && e.onClick(...g), ["prevent"]))
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
        s("span", null, y((u = B(l).reset) != null ? u : "Reset"), 1)
      ], 2);
    };
  }
}, mo = {}, bo = { class: "flow-root" }, vo = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, yo = { class: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, xo = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function wo(e, l) {
  return f(), p("div", bo, [
    s("div", vo, [
      s("div", yo, [
        s("div", xo, [
          V(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const ko = /* @__PURE__ */ He(mo, [["render", wo]]), Co = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, Mo = ["dusk", "onClick"], So = { class: "px-2" }, $o = { class: "divide-y divide-gray-200" }, _o = { class: "text-sm text-gray-900" }, qo = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], To = {
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
    const l = ze(), n = I(!1), o = I(!1);
    function i() {
      n.value = o.value = !1;
    }
    return (t, r) => (f(), F(qe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: i
    }, {
      button: j(() => r[5] || (r[5] = [
        s("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          class: "h-5 w-5 text-gray-400"
        }, [
          s("path", { d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })
        ], -1)
      ])),
      default: j(() => {
        var a, u, g, c, v;
        return [
          s("div", Co, [
            G(s("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (f(), p("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[0] || (r[0] = (h) => o.value = !0)
              }, [
                r[6] || (r[6] = s("svg", {
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
                s("span", null, y((a = B(l).add_search_fields) != null ? a : "Add search field"), 1)
              ])) : w("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (f(), p("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[1] || (r[1] = (h) => n.value = !0)
              }, [
                r[7] || (r[7] = s("svg", {
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
                s("span", null, y((u = B(l).show_hide_columns) != null ? u : "Show / Hide columns"), 1)
              ])) : w("", !0),
              r[9] || (r[9] = s("hr", null, null, -1)),
              "reset" in e.actions ? (f(), p("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[2] || (r[2] = (...h) => {
                  var M, q;
                  return ((M = e.actions.reset) == null ? void 0 : M.onClick) && ((q = e.actions.reset) == null ? void 0 : q.onClick(...h));
                })
              }, [
                r[8] || (r[8] = s("svg", {
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
                s("span", null, y((g = B(l).grouped_reset) != null ? g : "Reset"), 1)
              ])) : w("", !0)
            ], 512), [
              [U, !n.value && !o.value]
            ]),
            G(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[3] || (r[3] = (h) => o.value = !1)
              }, [
                r[10] || (r[10] = s("svg", {
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
                s("span", null, y((c = B(l).add_search_fields) != null ? c : "Add search field"), 1)
              ]),
              (f(!0), p(E, null, W(e.actions.searchFields.searchInputs, (h, M) => (f(), p("button", {
                key: M,
                dusk: `add-search-row-${h.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: R((q) => e.actions.searchFields.onClick(h.key), ["prevent"])
              }, y(h.label), 9, Mo))), 128))
            ], 512), [
              [U, o.value]
            ]),
            G(s("div", null, [
              s("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[4] || (r[4] = (h) => n.value = !1)
              }, [
                r[11] || (r[11] = s("svg", {
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
                s("span", null, y((v = B(l).show_hide_columns) != null ? v : "Show / Hide columns"), 1)
              ]),
              s("div", So, [
                s("ul", $o, [
                  (f(!0), p(E, null, W(e.actions.toggleColumns.columns, (h, M) => G((f(), p("li", {
                    key: M,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    s("p", _o, y(h.label), 1),
                    s("button", {
                      type: "button",
                      class: k(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
                        "bg-green-500": !h.hidden,
                        "bg-gray-200": h.hidden
                      }]),
                      "aria-pressed": !h.hidden,
                      "aria-labelledby": `toggle-column-${h.key}`,
                      "aria-describedby": `toggle-column-${h.key}`,
                      dusk: `toggle-column-${h.key}`,
                      onClick: R((q) => e.actions.toggleColumns.onChange(h.key, h.hidden), ["prevent"])
                    }, [
                      r[12] || (r[12] = s("span", { class: "sr-only" }, "Column status", -1)),
                      s("span", {
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
              [U, n.value]
            ]),
            G(s("div", null, [
              V(t.$slots, "default")
            ], 512), [
              [U, !n.value && !o.value]
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
}, Ao = ["id"], Bo = { class: "divide-y divide-gray-200 bg-white" }, Ro = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500"
}, Lo = ["id", "onUpdate:modelValue"], Go = ["onClick"], Eo = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, Wo = { class: "italic text-sm px-2" }, il = {
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
    const n = l, o = e;
    Je();
    const i = I(0), t = P(() => {
      let d = Ve().props.queryBuilderProps ? { ...Ve().props.queryBuilderProps[o.name] } : {};
      return d._updates = i.value, d;
    }), r = I(t.value), a = P(() => t.value.pageName), u = I([]), g = I(null), c = I(!1), v = P(() => t.value.hasToggleableColumns || t.value.hasFilters || t.value.hasSearchInputs ? !1 : !t.value.globalSearch), h = P(() => Object.keys(o.resource).length === 0 ? o.data : "data" in o.resource ? o.resource.data : o.resource), M = P(() => Object.keys(o.resource).length === 0 ? o.meta : "links" in o.resource && "meta" in o.resource && Object.keys(o.resource.links).length === 4 && "next" in o.resource.links && "prev" in o.resource.links ? {
      ...o.resource.meta,
      next_page_url: o.resource.links.next,
      prev_page_url: o.resource.links.prev
    } : "meta" in o.resource ? o.resource.meta : o.resource), q = P(() => h.value.length > 0 ? !0 : M.value.total > 0), z = I({
      reset: {
        onClick: H
      },
      toggleColumns: {
        show: t.value.hasToggleableColumns,
        columns: t.value.columns,
        onChange: le
      },
      searchFields: {
        show: t.value.hasSearchInputs,
        searchInputs: t.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: t.value.hasSearchInputsWithoutValue,
        onClick: N
      }
    });
    function $(d) {
      u.value = u.value.filter((m) => m != d), K(d, null);
    }
    function N(d) {
      u.value.push(d);
    }
    const O = P(() => {
      if (u.value.length > 0)
        return !0;
      const d = Pe.parse(location.search.substring(1));
      if (d[a.value] > 1)
        return !0;
      const b = o.name === "default" ? "" : o.name + "_";
      let C = !1;
      return X(["filter", "columns", "cursor", "sort"], (S) => {
        const Y = d[b + S];
        S === "sort" && Y === t.value.defaultSort || Y !== void 0 && (C = !0);
      }), C;
    });
    function H() {
      u.value = [], X(r.value.filters, (d, m) => {
        r.value.filters[m].value = null;
      }), X(r.value.searchInputs, (d, m) => {
        r.value.searchInputs[m].value = null;
      }), X(r.value.columns, (d, m) => {
        r.value.columns[m].hidden = d.can_be_hidden ? !t.value.defaultVisibleToggleableColumns.includes(d.key) : !1;
      }), localStorage.removeItem(`columns-${o.name}`), r.value.sort = null, r.value.cursor = null, r.value.page = 1;
    }
    const D = {};
    function K(d, m) {
      clearTimeout(D[d]), D[d] = setTimeout(() => {
        ue.value && o.preventOverlappingRequests && ue.value.cancel();
        const b = Q("searchInputs", d);
        r.value.searchInputs[b].value = m, r.value.cursor = null, r.value.page = 1;
      }, o.inputDebounceMs);
    }
    function pe(d) {
      K("global", d);
    }
    function he(d, m) {
      const b = Q("filters", d);
      r.value.filters[b].value = m, r.value.cursor = null, r.value.page = 1;
    }
    function me(d) {
      r.value.cursor = null, r.value.perPage = d, r.value.page = 1;
    }
    function Q(d, m) {
      return ut(r.value[d], (b) => b.key == m);
    }
    function le(d, m) {
      const b = Q("columns", d);
      r.value.columns[b].hidden = !m;
      const C = r.value.columns.map((S) => ({
        key: S.key,
        hidden: S.hidden
      }));
      localStorage.setItem(`columns-${o.name}`, JSON.stringify(C));
    }
    function be() {
      let d = {};
      return X(r.value.searchInputs, (m) => {
        m.value !== null && (d[m.key] = m.value);
      }), X(r.value.filters, (m) => {
        let b = m.value;
        b !== null && (m.type === "number_range" && Number(Math.max(...m.value)) === Number(m.max) && Number(Math.min(...m.value)) === Number(m.min) && (b = null), d[m.key] = b);
      }), d;
    }
    function _() {
      const d = r.value.columns;
      let m = it(d, (C) => !C.hidden), b = dt(m, (C) => C.key).sort();
      return ct(b, t.value.defaultVisibleToggleableColumns) ? {} : b;
    }
    function ke() {
      const d = be(), m = _(), b = {};
      Object.keys(d).length > 0 && (b.filter = d), Object.keys(m).length > 0 && (b.columns = m);
      const C = r.value.cursor, S = r.value.page, Y = r.value.sort, $e = r.value.perPage;
      return C && (b.cursor = C), S > 1 && (b.page = S), $e > 1 && (b.perPage = $e), Y && (b.sort = Y), b;
    }
    function ne(d) {
      var C, S, Y;
      if (!d)
        return null;
      const m = (C = Ve().props.queryBuilderProps[o.name].pageName) != null ? C : "page", b = (Y = (S = new URL(d)) == null ? void 0 : S.searchParams) == null ? void 0 : Y.get(m);
      b !== null ? r.value.page = b : ce(d);
    }
    function Ce() {
      const d = Pe.parse(location.search.substring(1)), m = o.name === "default" ? "" : o.name + "_";
      X(["filter", "columns", "cursor", "sort"], (C) => {
        delete d[m + C];
      }), delete d[a.value], X(ke(), (C, S) => {
        S === "page" ? d[a.value] = C : S === "perPage" ? d.perPage = C : d[m + S] = C;
      });
      let b = Pe.stringify(d, {
        filter(C, S) {
          return typeof S == "object" && S !== null ? ft(S) : S;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!b || b === a.value + "=1") && (b = ""), b;
    }
    const te = I(!1), ue = I(null);
    function ce(d) {
      !d || nt.get(
        d,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: o.preserveScroll !== !1,
          onBefore() {
            te.value = !0;
          },
          onCancelToken(m) {
            ue.value = m;
          },
          onFinish() {
            te.value = !1;
          },
          onSuccess() {
            if (o.preserveScroll === "table-top") {
              const b = g.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: b });
            }
            i.value++;
          }
        }
      );
    }
    function se(d, m, b) {
      var C;
      o.hasCheckboxes && ((C = d.target) == null ? void 0 : C.parentElement.cellIndex) === 0 || n("rowClicked", d, m, b);
    }
    _e(r, () => {
      ce(location.pathname + "?" + Ce()), c.value = !1;
    }, { deep: !0 }), _e(o.resource, () => {
      const d = o.resource.data.filter((m) => m.__itSelected);
      n("selectionChanged", d);
    }, { deep: !0 });
    const ve = () => {
      i.value++;
    };
    je(() => {
      document.addEventListener("inertia:success", ve);
      const d = localStorage.getItem(`columns-${o.name}`);
      if (d) {
        const m = JSON.parse(d);
        X(r.value.columns, (b, C) => {
          r.value.columns[C].hidden = m[C].hidden;
        });
      }
    }), Ze(() => {
      document.removeEventListener("inertia:success", ve);
    });
    function L(d) {
      r.value.sort == d ? r.value.sort = `-${d}` : r.value.sort = d, r.value.cursor = null, r.value.page = 1;
    }
    function Ne(d) {
      const m = Q("columns", d);
      return !r.value.columns[m].hidden;
    }
    function Me(d) {
      const m = Q("columns", d), b = at(t.value.columns[m]);
      return b.onSort = L, b;
    }
    function Ke() {
      o.resource.data.forEach((d) => {
        d.__itSelected = c.value;
      });
    }
    const Se = P(() => o.resource.data.filter((d) => d.__itSelected).length), Qe = P(() => Se.value === 0 ? "Aucune s\xE9lection" : `${Se.value} \xE9l\xE9ment${Se.value > 1 ? "s" : ""} s\xE9lectionn\xE9${Se.value > 1 ? "s" : ""}`);
    return (d, m) => (f(), F(et, null, {
      default: j(() => [
        (f(), p("fieldset", {
          ref_key: "tableFieldset",
          ref: g,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: k(["min-w-0", { "opacity-75": te.value }])
        }, [
          s("div", No, [
            t.value.globalSearch ? (f(), p("div", Vo, [
              V(d.$slots, "tableGlobalSearch", {
                hasGlobalSearch: t.value.globalSearch,
                label: t.value.globalSearch ? t.value.globalSearch.label : null,
                value: t.value.globalSearch ? t.value.globalSearch.value : null,
                onChange: pe
              }, () => [
                t.value.globalSearch ? (f(), F(ao, {
                  key: 0,
                  class: "grow",
                  label: t.value.globalSearch.label,
                  value: t.value.globalSearch.value,
                  "on-change": pe,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : w("", !0)
              ])
            ])) : w("", !0),
            s("div", Po, [
              V(d.$slots, "tableFilter", {
                hasFilters: t.value.hasFilters,
                hasEnabledFilters: t.value.hasEnabledFilters,
                filters: t.value.filters,
                onFilterChange: he
              }, () => [
                t.value.hasFilters ? (f(), F(lo, {
                  key: 0,
                  "has-enabled-filters": t.value.hasEnabledFilters,
                  filters: t.value.filters,
                  "on-filter-change": he,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : w("", !0)
              ])
            ]),
            e.withGroupedMenu ? w("", !0) : V(d.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: t.value.hasSearchInputs,
              hasSearchInputsWithoutValue: t.value.hasSearchInputsWithoutValue,
              searchInputs: t.value.searchInputsWithoutGlobal,
              onAdd: N
            }, () => [
              t.value.hasSearchInputs ? (f(), F(wr, {
                key: 0,
                class: "mr-2 sm:mr-4",
                "search-inputs": t.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": t.value.hasSearchInputsWithoutValue,
                "on-add": N,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : w("", !0)
            ]),
            e.withGroupedMenu ? w("", !0) : V(d.$slots, "tableColumns", {
              key: 2,
              hasColumns: t.value.hasToggleableColumns,
              columns: t.value.columns,
              hasHiddenColumns: t.value.hasHiddenColumns,
              onChange: le
            }, () => [
              t.value.hasToggleableColumns ? (f(), F(qr, {
                key: 0,
                class: k({ "mr-2 sm:mr-4": O.value }),
                columns: t.value.columns,
                "has-hidden-columns": t.value.hasHiddenColumns,
                "on-change": le,
                color: e.color
              }, null, 8, ["class", "columns", "has-hidden-columns", "color"])) : w("", !0)
            ]),
            e.withGroupedMenu ? V(d.$slots, "groupedAction", {
              key: 3,
              actions: z.value
            }, () => [
              ae(To, {
                color: e.color,
                actions: z.value
              }, {
                default: j(() => [
                  V(d.$slots, "bulk-actions")
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ]) : w("", !0),
            e.withGroupedMenu ? w("", !0) : V(d.$slots, "tableReset", {
              key: 4,
              canBeReset: O.value,
              onClick: H
            }, () => [
              O.value ? (f(), p("div", Io, [
                ae(ho, {
                  "on-click": H,
                  color: e.color
                }, null, 8, ["color"])
              ])) : w("", !0)
            ])
          ]),
          V(d.$slots, "tableSearchRows", {
            hasSearchRowsWithValue: t.value.hasSearchInputsWithValue,
            searchInputs: t.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: u.value,
            onChange: K
          }, () => [
            t.value.hasSearchInputsWithValue || u.value.length > 0 ? (f(), F(po, {
              key: 0,
              "search-inputs": t.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": u.value,
              "on-change": K,
              "on-remove": $,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : w("", !0)
          ]),
          V(d.$slots, "tableWrapper", { meta: M.value }, () => [
            ae(ko, {
              class: k({ "mt-3": !v.value })
            }, {
              default: j(() => [
                V(d.$slots, "table", {}, () => [
                  s("table", Fo, [
                    s("thead", jo, [
                      V(d.$slots, "head", {
                        show: Ne,
                        sortBy: L,
                        header: Me
                      }, () => [
                        s("tr", null, [
                          e.hasCheckboxes ? (f(), p("th", Oo, [
                            G(s("input", {
                              type: "checkbox",
                              id: `table-${e.name}-select-header`,
                              onChange: Ke,
                              "onUpdate:modelValue": m[0] || (m[0] = (b) => c.value = b),
                              class: "rounded-sm mr-1 border-gray-300 m-1"
                            }, null, 40, Ao), [
                              [Ae, c.value]
                            ])
                          ])) : w("", !0),
                          (f(!0), p(E, null, W(t.value.columns, (b) => (f(), F(tr, {
                            key: `table-${e.name}-header-${b.key}`,
                            cell: Me(b.key)
                          }, {
                            label: j(() => [
                              V(d.$slots, `header(${b.key})`, {
                                label: Me(b.key).label,
                                column: Me(b.key)
                              })
                            ]),
                            _: 2
                          }, 1032, ["cell"]))), 128))
                        ])
                      ])
                    ]),
                    s("tbody", Bo, [
                      V(d.$slots, "body", { show: Ne }, () => [
                        (f(!0), p(E, null, W(h.value, (b, C) => (f(), p("tr", {
                          key: `table-${e.name}-row-${C}`,
                          class: k(["", {
                            "bg-gray-50": e.striped && C % 2,
                            "hover:bg-gray-100": e.striped,
                            "hover:bg-gray-50": !e.striped
                          }])
                        }, [
                          e.hasCheckboxes ? (f(), p("td", Ro, [
                            G(s("input", {
                              type: "checkbox",
                              id: `table-${e.name}-select-${C}`,
                              class: "rounded-sm m-1 border-gray-300",
                              "onUpdate:modelValue": (S) => b.__itSelected = S
                            }, null, 8, Lo), [
                              [Ae, b.__itSelected]
                            ])
                          ])) : w("", !0),
                          (f(!0), p(E, null, W(t.value.columns, (S, Y) => G((f(), p("td", {
                            key: `table-${e.name}-row-${C}-column-${S.key}`,
                            onClick: ($e) => se($e, b, C),
                            class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          }, [
                            V(d.$slots, `cell(${S.key})`, { item: b }, () => [
                              Z(y(b[S.key]), 1)
                            ])
                          ], 8, Go)), [
                            [U, Ne(S.key)]
                          ])), 128))
                        ], 2))), 128))
                      ])
                    ])
                  ])
                ]),
                V(d.$slots, "pagination", {
                  onClick: ne,
                  hasData: q.value,
                  meta: M.value,
                  perPageOptions: t.value.perPageOptions,
                  onPerPageChange: me
                }, () => [
                  s("div", Eo, [
                    s("span", Wo, y(Qe.value), 1),
                    ae(vr, {
                      "on-click": ne,
                      "has-data": q.value,
                      meta: M.value,
                      "per-page-options": t.value.perPageOptions,
                      "on-per-page-change": me,
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
  gt as OnClickOutside,
  vr as Pagination,
  il as Table,
  wr as TableAddSearchRow,
  qr as TableColumns,
  lo as TableFilter,
  ao as TableGlobalSearch,
  ho as TableReset,
  po as TableSearchRows,
  ko as TableWrapper,
  ze as getTranslations,
  sl as setTranslation,
  al as setTranslations
};
