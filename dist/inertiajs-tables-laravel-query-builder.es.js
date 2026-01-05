import { ref as O, onMounted as he, onBeforeUnmount as Qt, openBlock as f, createElementBlock as v, renderSlot as E, watch as ge, inject as ie, createBlock as B, withCtx as H, createElementVNode as a, normalizeClass as N, withModifiers as Q, withDirectives as J, vShow as ye, createStaticVNode as Jt, normalizeStyle as fe, toDisplayString as C, createCommentVNode as _, createTextVNode as me, computed as L, unref as j, vModelSelect as kt, vModelText as Oe, watchEffect as Zt, onUnmounted as Ye, Teleport as Ke, Fragment as se, renderList as ae, createVNode as re, withKeys as mt, nextTick as Ct, resolveDynamicComponent as Fe, reactive as er, isRef as tr, getCurrentInstance as rr, provide as or, Transition as nr, vModelCheckbox as gt, normalizeProps as lr, guardReactiveProps as sr } from "vue";
import { createPopper as ar } from "@popperjs/core/lib/popper-lite";
import ir from "@popperjs/core/lib/modifiers/preventOverflow";
import ur from "@popperjs/core/lib/modifiers/flip";
import { createPopper as cr } from "@popperjs/core";
import dr from "lodash-es/uniq";
import fr from "vuedraggable";
import mr from "lodash-es/find";
import Ze from "qs";
import gr from "lodash-es/clone";
import hr from "lodash-es/filter";
import pr from "lodash-es/findKey";
import ve from "lodash-es/forEach";
import vr from "lodash-es/isEqual";
import br from "lodash-es/map";
import yr from "lodash-es/pickBy";
import { usePage as ht, router as xr } from "@inertiajs/vue3";
const wr = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const n = e, o = O(null), l = O(null);
    return he(() => {
      o.value = (t) => {
        t.target === l.value || l.value.contains(t.target) || n.do();
      }, document.addEventListener("click", o.value), document.addEventListener("touchstart", o.value);
    }), Qt(() => {
      document.removeEventListener("click", o.value), document.removeEventListener("touchstart", o.value);
    }), (t, s) => (f(), v("div", {
      ref_key: "root",
      ref: l
    }, [
      E(t.$slots, "default")
    ], 512));
  }
}, kr = (e, n) => {
  const o = new Array(e.length + n.length);
  for (let l = 0; l < e.length; l++)
    o[l] = e[l];
  for (let l = 0; l < n.length; l++)
    o[e.length + l] = n[l];
  return o;
}, Cr = (e, n) => ({
  classGroupId: e,
  validator: n
}), _t = (e = /* @__PURE__ */ new Map(), n = null, o) => ({
  nextPart: e,
  validators: n,
  classGroupId: o
}), Xe = "-", pt = [], _r = "arbitrary..", Sr = (e) => {
  const n = Mr(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: l
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return $r(i);
      const m = i.split(Xe), r = m[0] === "" && m.length > 1 ? 1 : 0;
      return St(m, r, n);
    },
    getConflictingClassGroupIds: (i, m) => {
      if (m) {
        const r = l[i], u = o[i];
        return r ? u ? kr(u, r) : r : u || pt;
      }
      return o[i] || pt;
    }
  };
}, St = (e, n, o) => {
  if (e.length - n === 0)
    return o.classGroupId;
  const t = e[n], s = o.nextPart.get(t);
  if (s) {
    const u = St(e, n + 1, s);
    if (u)
      return u;
  }
  const i = o.validators;
  if (i === null)
    return;
  const m = n === 0 ? e.join(Xe) : e.slice(n).join(Xe), r = i.length;
  for (let u = 0; u < r; u++) {
    const d = i[u];
    if (d.validator(m))
      return d.classGroupId;
  }
}, $r = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const n = e.slice(1, -1), o = n.indexOf(":"), l = n.slice(0, o);
  return l ? _r + l : void 0;
})(), Mr = (e) => {
  const {
    theme: n,
    classGroups: o
  } = e;
  return zr(o, n);
}, zr = (e, n) => {
  const o = _t();
  for (const l in e) {
    const t = e[l];
    ot(t, o, l, n);
  }
  return o;
}, ot = (e, n, o, l) => {
  const t = e.length;
  for (let s = 0; s < t; s++) {
    const i = e[s];
    qr(i, n, o, l);
  }
}, qr = (e, n, o, l) => {
  if (typeof e == "string") {
    Ir(e, n, o);
    return;
  }
  if (typeof e == "function") {
    Tr(e, n, o, l);
    return;
  }
  Nr(e, n, o, l);
}, Ir = (e, n, o) => {
  const l = e === "" ? n : $t(n, e);
  l.classGroupId = o;
}, Tr = (e, n, o, l) => {
  if (Pr(e)) {
    ot(e(l), n, o, l);
    return;
  }
  n.validators === null && (n.validators = []), n.validators.push(Cr(o, e));
}, Nr = (e, n, o, l) => {
  const t = Object.entries(e), s = t.length;
  for (let i = 0; i < s; i++) {
    const [m, r] = t[i];
    ot(r, $t(n, m), o, l);
  }
}, $t = (e, n) => {
  let o = e;
  const l = n.split(Xe), t = l.length;
  for (let s = 0; s < t; s++) {
    const i = l[s];
    let m = o.nextPart.get(i);
    m || (m = _t(), o.nextPart.set(i, m)), o = m;
  }
  return o;
}, Pr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Fr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, o = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  const t = (s, i) => {
    o[s] = i, n++, n > e && (n = 0, l = o, o = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(s) {
      let i = o[s];
      if (i !== void 0)
        return i;
      if ((i = l[s]) !== void 0)
        return t(s, i), i;
    },
    set(s, i) {
      s in o ? o[s] = i : t(s, i);
    }
  };
}, rt = "!", vt = ":", Or = [], bt = (e, n, o, l, t) => ({
  modifiers: e,
  hasImportantModifier: n,
  baseClassName: o,
  maybePostfixModifierPosition: l,
  isExternal: t
}), jr = (e) => {
  const {
    prefix: n,
    experimentalParseClassName: o
  } = e;
  let l = (t) => {
    const s = [];
    let i = 0, m = 0, r = 0, u;
    const d = t.length;
    for (let x = 0; x < d; x++) {
      const h = t[x];
      if (i === 0 && m === 0) {
        if (h === vt) {
          s.push(t.slice(r, x)), r = x + 1;
          continue;
        }
        if (h === "/") {
          u = x;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? m++ : h === ")" && m--;
    }
    const b = s.length === 0 ? t : t.slice(r);
    let y = b, z = !1;
    b.endsWith(rt) ? (y = b.slice(0, -1), z = !0) : b.startsWith(rt) && (y = b.slice(1), z = !0);
    const q = u && u > r ? u - r : void 0;
    return bt(s, z, y, q);
  };
  if (n) {
    const t = n + vt, s = l;
    l = (i) => i.startsWith(t) ? s(i.slice(t.length)) : bt(Or, !1, i, void 0, !0);
  }
  if (o) {
    const t = l;
    l = (s) => o({
      className: s,
      parseClassName: t
    });
  }
  return l;
}, Ar = (e) => {
  const n = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((o, l) => {
    n.set(o, 1e6 + l);
  }), (o) => {
    const l = [];
    let t = [];
    for (let s = 0; s < o.length; s++) {
      const i = o[s], m = i[0] === "[", r = n.has(i);
      m || r ? (t.length > 0 && (t.sort(), l.push(...t), t = []), l.push(i)) : t.push(i);
    }
    return t.length > 0 && (t.sort(), l.push(...t)), l;
  };
}, Rr = (e) => ({
  cache: Fr(e.cacheSize),
  parseClassName: jr(e),
  sortModifiers: Ar(e),
  ...Sr(e)
}), Lr = /\s+/, Er = (e, n) => {
  const {
    parseClassName: o,
    getClassGroupId: l,
    getConflictingClassGroupIds: t,
    sortModifiers: s
  } = n, i = [], m = e.trim().split(Lr);
  let r = "";
  for (let u = m.length - 1; u >= 0; u -= 1) {
    const d = m[u], {
      isExternal: b,
      modifiers: y,
      hasImportantModifier: z,
      baseClassName: q,
      maybePostfixModifierPosition: x
    } = o(d);
    if (b) {
      r = d + (r.length > 0 ? " " + r : r);
      continue;
    }
    let h = !!x, w = l(h ? q.substring(0, x) : q);
    if (!w) {
      if (!h) {
        r = d + (r.length > 0 ? " " + r : r);
        continue;
      }
      if (w = l(q), !w) {
        r = d + (r.length > 0 ? " " + r : r);
        continue;
      }
      h = !1;
    }
    const S = y.length === 0 ? "" : y.length === 1 ? y[0] : s(y).join(":"), I = z ? S + rt : S, R = I + w;
    if (i.indexOf(R) > -1)
      continue;
    i.push(R);
    const W = t(w, h);
    for (let G = 0; G < W.length; ++G) {
      const X = W[G];
      i.push(I + X);
    }
    r = d + (r.length > 0 ? " " + r : r);
  }
  return r;
}, Br = (...e) => {
  let n = 0, o, l, t = "";
  for (; n < e.length; )
    (o = e[n++]) && (l = Mt(o)) && (t && (t += " "), t += l);
  return t;
}, Mt = (e) => {
  if (typeof e == "string")
    return e;
  let n, o = "";
  for (let l = 0; l < e.length; l++)
    e[l] && (n = Mt(e[l])) && (o && (o += " "), o += n);
  return o;
}, Vr = (e, ...n) => {
  let o, l, t, s;
  const i = (r) => {
    const u = n.reduce((d, b) => b(d), e());
    return o = Rr(u), l = o.cache.get, t = o.cache.set, s = m, m(r);
  }, m = (r) => {
    const u = l(r);
    if (u)
      return u;
    const d = Er(r, o);
    return t(r, d), d;
  };
  return s = i, (...r) => s(Br(...r));
}, Wr = [], K = (e) => {
  const n = (o) => o[e] || Wr;
  return n.isThemeGetter = !0, n;
}, zt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, qt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Dr = /^\d+\/\d+$/, Gr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ur = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Hr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Kr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Xr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Pe = (e) => Dr.test(e), A = (e) => !!e && !Number.isNaN(Number(e)), be = (e) => !!e && Number.isInteger(Number(e)), et = (e) => e.endsWith("%") && A(e.slice(0, -1)), de = (e) => Gr.test(e), Yr = () => !0, Qr = (e) => Ur.test(e) && !Hr.test(e), It = () => !1, Jr = (e) => Kr.test(e), Zr = (e) => Xr.test(e), eo = (e) => !$(e) && !M(e), to = (e) => je(e, Pt, It), $ = (e) => zt.test(e), _e = (e) => je(e, Ft, Qr), tt = (e) => je(e, so, A), yt = (e) => je(e, Tt, It), ro = (e) => je(e, Nt, Zr), Ue = (e) => je(e, Ot, Jr), M = (e) => qt.test(e), Be = (e) => Ae(e, Ft), oo = (e) => Ae(e, ao), xt = (e) => Ae(e, Tt), no = (e) => Ae(e, Pt), lo = (e) => Ae(e, Nt), He = (e) => Ae(e, Ot, !0), je = (e, n, o) => {
  const l = zt.exec(e);
  return l ? l[1] ? n(l[1]) : o(l[2]) : !1;
}, Ae = (e, n, o = !1) => {
  const l = qt.exec(e);
  return l ? l[1] ? n(l[1]) : o : !1;
}, Tt = (e) => e === "position" || e === "percentage", Nt = (e) => e === "image" || e === "url", Pt = (e) => e === "length" || e === "size" || e === "bg-size", Ft = (e) => e === "length", so = (e) => e === "number", ao = (e) => e === "family-name", Ot = (e) => e === "shadow", io = () => {
  const e = K("color"), n = K("font"), o = K("text"), l = K("font-weight"), t = K("tracking"), s = K("leading"), i = K("breakpoint"), m = K("container"), r = K("spacing"), u = K("radius"), d = K("shadow"), b = K("inset-shadow"), y = K("text-shadow"), z = K("drop-shadow"), q = K("blur"), x = K("perspective"), h = K("aspect"), w = K("ease"), S = K("animate"), I = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], R = () => [
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
  ], W = () => [...R(), M, $], G = () => ["auto", "hidden", "clip", "visible", "scroll"], X = () => ["auto", "contain", "none"], P = () => [M, $, r], Y = () => [Pe, "full", "auto", ...P()], Se = () => [be, "none", "subgrid", M, $], $e = () => ["auto", {
    span: ["full", be, M, $]
  }, be, M, $], ce = () => [be, "auto", M, $], Me = () => ["auto", "min", "max", "fr", M, $], ze = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ne = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], le = () => ["auto", ...P()], ue = () => [Pe, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...P()], F = () => [e, M, $], we = () => [...R(), xt, yt, {
    position: [M, $]
  }], qe = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Ve = () => ["auto", "cover", "contain", no, to, {
    size: [M, $]
  }], Le = () => [et, Be, _e], Z = () => [
    "",
    "none",
    "full",
    u,
    M,
    $
  ], te = () => ["", A, Be, _e], ke = () => ["solid", "dashed", "dotted", "double"], We = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], U = () => [A, et, xt, yt], Ie = () => [
    "",
    "none",
    q,
    M,
    $
  ], Ce = () => ["none", A, M, $], Te = () => ["none", A, M, $], Ee = () => [A, M, $], pe = () => [Pe, "full", ...P()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [de],
      breakpoint: [de],
      color: [Yr],
      container: [de],
      "drop-shadow": [de],
      ease: ["in", "out", "in-out"],
      font: [eo],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [de],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [de],
      shadow: [de],
      spacing: ["px", A],
      text: [de],
      "text-shadow": [de],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", Pe, $, M, h]
      }],
      container: ["container"],
      columns: [{
        columns: [A, $, M, m]
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
        object: W()
      }],
      overflow: [{
        overflow: G()
      }],
      "overflow-x": [{
        "overflow-x": G()
      }],
      "overflow-y": [{
        "overflow-y": G()
      }],
      overscroll: [{
        overscroll: X()
      }],
      "overscroll-x": [{
        "overscroll-x": X()
      }],
      "overscroll-y": [{
        "overscroll-y": X()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: Y()
      }],
      "inset-x": [{
        "inset-x": Y()
      }],
      "inset-y": [{
        "inset-y": Y()
      }],
      start: [{
        start: Y()
      }],
      end: [{
        end: Y()
      }],
      top: [{
        top: Y()
      }],
      right: [{
        right: Y()
      }],
      bottom: [{
        bottom: Y()
      }],
      left: [{
        left: Y()
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: [be, "auto", M, $]
      }],
      basis: [{
        basis: [Pe, "full", "auto", m, ...P()]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      flex: [{
        flex: [A, Pe, "auto", "initial", "none", $]
      }],
      grow: [{
        grow: ["", A, M, $]
      }],
      shrink: [{
        shrink: ["", A, M, $]
      }],
      order: [{
        order: [be, "first", "last", "none", M, $]
      }],
      "grid-cols": [{
        "grid-cols": Se()
      }],
      "col-start-end": [{
        col: $e()
      }],
      "col-start": [{
        "col-start": ce()
      }],
      "col-end": [{
        "col-end": ce()
      }],
      "grid-rows": [{
        "grid-rows": Se()
      }],
      "row-start-end": [{
        row: $e()
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
        "auto-cols": Me()
      }],
      "auto-rows": [{
        "auto-rows": Me()
      }],
      gap: [{
        gap: P()
      }],
      "gap-x": [{
        "gap-x": P()
      }],
      "gap-y": [{
        "gap-y": P()
      }],
      "justify-content": [{
        justify: [...ze(), "normal"]
      }],
      "justify-items": [{
        "justify-items": [...ne(), "normal"]
      }],
      "justify-self": [{
        "justify-self": ["auto", ...ne()]
      }],
      "align-content": [{
        content: ["normal", ...ze()]
      }],
      "align-items": [{
        items: [...ne(), {
          baseline: ["", "last"]
        }]
      }],
      "align-self": [{
        self: ["auto", ...ne(), {
          baseline: ["", "last"]
        }]
      }],
      "place-content": [{
        "place-content": ze()
      }],
      "place-items": [{
        "place-items": [...ne(), "baseline"]
      }],
      "place-self": [{
        "place-self": ["auto", ...ne()]
      }],
      p: [{
        p: P()
      }],
      px: [{
        px: P()
      }],
      py: [{
        py: P()
      }],
      ps: [{
        ps: P()
      }],
      pe: [{
        pe: P()
      }],
      pt: [{
        pt: P()
      }],
      pr: [{
        pr: P()
      }],
      pb: [{
        pb: P()
      }],
      pl: [{
        pl: P()
      }],
      m: [{
        m: le()
      }],
      mx: [{
        mx: le()
      }],
      my: [{
        my: le()
      }],
      ms: [{
        ms: le()
      }],
      me: [{
        me: le()
      }],
      mt: [{
        mt: le()
      }],
      mr: [{
        mr: le()
      }],
      mb: [{
        mb: le()
      }],
      ml: [{
        ml: le()
      }],
      "space-x": [{
        "space-x": P()
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": P()
      }],
      "space-y-reverse": ["space-y-reverse"],
      size: [{
        size: ue()
      }],
      w: [{
        w: [m, "screen", ...ue()]
      }],
      "min-w": [{
        "min-w": [
          m,
          "screen",
          "none",
          ...ue()
        ]
      }],
      "max-w": [{
        "max-w": [
          m,
          "screen",
          "none",
          "prose",
          {
            screen: [i]
          },
          ...ue()
        ]
      }],
      h: [{
        h: ["screen", "lh", ...ue()]
      }],
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...ue()]
      }],
      "max-h": [{
        "max-h": ["screen", "lh", ...ue()]
      }],
      "font-size": [{
        text: ["base", o, Be, _e]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: [l, M, tt]
      }],
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", et, $]
      }],
      "font-family": [{
        font: [oo, $, n]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: [t, M, $]
      }],
      "line-clamp": [{
        "line-clamp": [A, "none", M, tt]
      }],
      leading: [{
        leading: [
          s,
          ...P()
        ]
      }],
      "list-image": [{
        "list-image": ["none", M, $]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "list-style-type": [{
        list: ["disc", "decimal", "none", M, $]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "placeholder-color": [{
        placeholder: F()
      }],
      "text-color": [{
        text: F()
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...ke(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: [A, "from-font", "auto", M, _e]
      }],
      "text-decoration-color": [{
        decoration: F()
      }],
      "underline-offset": [{
        "underline-offset": [A, "auto", M, $]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: P()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", M, $]
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
        content: ["none", M, $]
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
        bg: we()
      }],
      "bg-repeat": [{
        bg: qe()
      }],
      "bg-size": [{
        bg: Ve()
      }],
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, be, M, $],
          radial: ["", M, $],
          conic: [be, M, $]
        }, lo, ro]
      }],
      "bg-color": [{
        bg: F()
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
        from: F()
      }],
      "gradient-via": [{
        via: F()
      }],
      "gradient-to": [{
        to: F()
      }],
      rounded: [{
        rounded: Z()
      }],
      "rounded-s": [{
        "rounded-s": Z()
      }],
      "rounded-e": [{
        "rounded-e": Z()
      }],
      "rounded-t": [{
        "rounded-t": Z()
      }],
      "rounded-r": [{
        "rounded-r": Z()
      }],
      "rounded-b": [{
        "rounded-b": Z()
      }],
      "rounded-l": [{
        "rounded-l": Z()
      }],
      "rounded-ss": [{
        "rounded-ss": Z()
      }],
      "rounded-se": [{
        "rounded-se": Z()
      }],
      "rounded-ee": [{
        "rounded-ee": Z()
      }],
      "rounded-es": [{
        "rounded-es": Z()
      }],
      "rounded-tl": [{
        "rounded-tl": Z()
      }],
      "rounded-tr": [{
        "rounded-tr": Z()
      }],
      "rounded-br": [{
        "rounded-br": Z()
      }],
      "rounded-bl": [{
        "rounded-bl": Z()
      }],
      "border-w": [{
        border: te()
      }],
      "border-w-x": [{
        "border-x": te()
      }],
      "border-w-y": [{
        "border-y": te()
      }],
      "border-w-s": [{
        "border-s": te()
      }],
      "border-w-e": [{
        "border-e": te()
      }],
      "border-w-t": [{
        "border-t": te()
      }],
      "border-w-r": [{
        "border-r": te()
      }],
      "border-w-b": [{
        "border-b": te()
      }],
      "border-w-l": [{
        "border-l": te()
      }],
      "divide-x": [{
        "divide-x": te()
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": te()
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "border-style": [{
        border: [...ke(), "hidden", "none"]
      }],
      "divide-style": [{
        divide: [...ke(), "hidden", "none"]
      }],
      "border-color": [{
        border: F()
      }],
      "border-color-x": [{
        "border-x": F()
      }],
      "border-color-y": [{
        "border-y": F()
      }],
      "border-color-s": [{
        "border-s": F()
      }],
      "border-color-e": [{
        "border-e": F()
      }],
      "border-color-t": [{
        "border-t": F()
      }],
      "border-color-r": [{
        "border-r": F()
      }],
      "border-color-b": [{
        "border-b": F()
      }],
      "border-color-l": [{
        "border-l": F()
      }],
      "divide-color": [{
        divide: F()
      }],
      "outline-style": [{
        outline: [...ke(), "none", "hidden"]
      }],
      "outline-offset": [{
        "outline-offset": [A, M, $]
      }],
      "outline-w": [{
        outline: ["", A, Be, _e]
      }],
      "outline-color": [{
        outline: F()
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
        shadow: F()
      }],
      "inset-shadow": [{
        "inset-shadow": ["none", b, He, Ue]
      }],
      "inset-shadow-color": [{
        "inset-shadow": F()
      }],
      "ring-w": [{
        ring: te()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: F()
      }],
      "ring-offset-w": [{
        "ring-offset": [A, _e]
      }],
      "ring-offset-color": [{
        "ring-offset": F()
      }],
      "inset-ring-w": [{
        "inset-ring": te()
      }],
      "inset-ring-color": [{
        "inset-ring": F()
      }],
      "text-shadow": [{
        "text-shadow": ["none", y, He, Ue]
      }],
      "text-shadow-color": [{
        "text-shadow": F()
      }],
      opacity: [{
        opacity: [A, M, $]
      }],
      "mix-blend": [{
        "mix-blend": [...We(), "plus-darker", "plus-lighter"]
      }],
      "bg-blend": [{
        "bg-blend": We()
      }],
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      "mask-image-linear-pos": [{
        "mask-linear": [A]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": U()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": U()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": F()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": U()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": U()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": F()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": U()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": U()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": F()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": U()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": U()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": F()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": U()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": U()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": F()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": U()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": U()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": F()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": U()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": U()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": F()
      }],
      "mask-image-radial": [{
        "mask-radial": [M, $]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": U()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": U()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": F()
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
        "mask-radial-at": R()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [A]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": U()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": U()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": F()
      }],
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      "mask-position": [{
        mask: we()
      }],
      "mask-repeat": [{
        mask: qe()
      }],
      "mask-size": [{
        mask: Ve()
      }],
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      "mask-image": [{
        mask: ["none", M, $]
      }],
      filter: [{
        filter: [
          "",
          "none",
          M,
          $
        ]
      }],
      blur: [{
        blur: Ie()
      }],
      brightness: [{
        brightness: [A, M, $]
      }],
      contrast: [{
        contrast: [A, M, $]
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
        "drop-shadow": F()
      }],
      grayscale: [{
        grayscale: ["", A, M, $]
      }],
      "hue-rotate": [{
        "hue-rotate": [A, M, $]
      }],
      invert: [{
        invert: ["", A, M, $]
      }],
      saturate: [{
        saturate: [A, M, $]
      }],
      sepia: [{
        sepia: ["", A, M, $]
      }],
      "backdrop-filter": [{
        "backdrop-filter": [
          "",
          "none",
          M,
          $
        ]
      }],
      "backdrop-blur": [{
        "backdrop-blur": Ie()
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [A, M, $]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [A, M, $]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", A, M, $]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [A, M, $]
      }],
      "backdrop-invert": [{
        "backdrop-invert": ["", A, M, $]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [A, M, $]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [A, M, $]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": ["", A, M, $]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": P()
      }],
      "border-spacing-x": [{
        "border-spacing-x": P()
      }],
      "border-spacing-y": [{
        "border-spacing-y": P()
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", M, $]
      }],
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      duration: [{
        duration: [A, "initial", M, $]
      }],
      ease: [{
        ease: ["linear", "initial", w, M, $]
      }],
      delay: [{
        delay: [A, M, $]
      }],
      animate: [{
        animate: ["none", S, M, $]
      }],
      backface: [{
        backface: ["hidden", "visible"]
      }],
      perspective: [{
        perspective: [x, M, $]
      }],
      "perspective-origin": [{
        "perspective-origin": W()
      }],
      rotate: [{
        rotate: Ce()
      }],
      "rotate-x": [{
        "rotate-x": Ce()
      }],
      "rotate-y": [{
        "rotate-y": Ce()
      }],
      "rotate-z": [{
        "rotate-z": Ce()
      }],
      scale: [{
        scale: Te()
      }],
      "scale-x": [{
        "scale-x": Te()
      }],
      "scale-y": [{
        "scale-y": Te()
      }],
      "scale-z": [{
        "scale-z": Te()
      }],
      "scale-3d": ["scale-3d"],
      skew: [{
        skew: Ee()
      }],
      "skew-x": [{
        "skew-x": Ee()
      }],
      "skew-y": [{
        "skew-y": Ee()
      }],
      transform: [{
        transform: [M, $, "", "none", "gpu", "cpu"]
      }],
      "transform-origin": [{
        origin: W()
      }],
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      translate: [{
        translate: pe()
      }],
      "translate-x": [{
        "translate-x": pe()
      }],
      "translate-y": [{
        "translate-y": pe()
      }],
      "translate-z": [{
        "translate-z": pe()
      }],
      "translate-none": ["translate-none"],
      accent: [{
        accent: F()
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      "caret-color": [{
        caret: F()
      }],
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", M, $]
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
        "scroll-m": P()
      }],
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      "scroll-my": [{
        "scroll-my": P()
      }],
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      "scroll-me": [{
        "scroll-me": P()
      }],
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      "scroll-p": [{
        "scroll-p": P()
      }],
      "scroll-px": [{
        "scroll-px": P()
      }],
      "scroll-py": [{
        "scroll-py": P()
      }],
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      "scroll-pl": [{
        "scroll-pl": P()
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
        "will-change": ["auto", "scroll", "contents", "transform", M, $]
      }],
      fill: [{
        fill: ["none", ...F()]
      }],
      "stroke-w": [{
        stroke: [A, Be, _e, tt]
      }],
      stroke: [{
        stroke: ["none", ...F()]
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
}, oe = /* @__PURE__ */ Vr(io);
function V(e, n, o, l) {
  let t = n ? { ...n } : {}, s = null, i = o ? { ...o } : {}, m = null, r = l ? { ...l } : {}, u = null;
  for (const d of e)
    s === null && d in t && (t = t[d], typeof t == "string" && (s = t)), m === null && d in i && (i = i[d], typeof i == "string" && (m = i)), u === null && d in r && (r = r[d], typeof r == "string" && (u = r));
  return oe(s, m, u);
}
const uo = { class: "relative" }, co = ["dusk", "disabled"], fo = { class: "mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" }, Qe = {
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
    const l = o, t = e, s = O(!1), i = O(null);
    function m() {
      s.value = !s.value;
    }
    function r() {
      s.value = !1;
    }
    ge(s, () => {
      i.value.update(), s.value || l("closed"), s.value && l("opened");
    });
    const u = O(null), d = O(null);
    he(() => {
      i.value = ar(u.value, d.value, {
        placement: t.placement,
        modifiers: [ur, ir]
      });
    }), n({ hide: r });
    const b = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, y = ie("themeVariables"), z = (q) => {
      var h, w;
      let x = "";
      return q === "button" && t.disabled && (x = "cursor-not-allowed"), oe(
        x,
        V([q, "base"], b, (h = y == null ? void 0 : y.inertia_table) == null ? void 0 : h.button_with_dropdown, t.ui),
        V([q, "color", t.color], b, (w = y == null ? void 0 : y.inertia_table) == null ? void 0 : w.button_with_dropdown, t.ui)
      );
    };
    return (q, x) => (f(), B(wr, { do: r }, {
      default: H(() => [
        a("div", uo, [
          a("button", {
            ref_key: "button",
            ref: u,
            type: "button",
            dusk: e.dusk,
            disabled: e.disabled,
            class: N(z("button")),
            "aria-haspopup": "true",
            onClick: Q(m, ["prevent"])
          }, [
            E(q.$slots, "button")
          ], 10, co),
          J(a("div", {
            ref_key: "tooltip",
            ref: d,
            class: "absolute z-50"
          }, [
            a("div", fo, [
              E(q.$slots, "default")
            ])
          ], 512), [
            [ye, s.value]
          ])
        ])
      ]),
      _: 3
    }));
  }
};
const Re = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [l, t] of n)
    o[l] = t;
  return o;
}, mo = {
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
    const n = e, o = (l) => {
      n.onResize(l, n.columnKey);
    };
    return (l, t) => (f(), v("div", {
      class: N(["column-resize-handle", {
        resizing: e.isActive,
        visible: e.isActive
      }]),
      onMousedown: o
    }, [...t[0] || (t[0] = [
      Jt('<div class="resize-separator" data-v-672a9339></div><div class="resize-grip" data-v-672a9339><div class="grip-dots" data-v-672a9339><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div><div class="grip-dot" data-v-672a9339></div></div></div>', 2)
    ])], 34));
  }
}, go = /* @__PURE__ */ Re(mo, [["__scopeId", "data-v-672a9339"]]), ho = { class: "w-full flex gap-2 justify-between items-center" }, po = { class: "relative inline-flex items-center cursor-pointer" }, vo = ["checked"], jt = {
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
    }, l = ie("themeVariables"), t = (s) => {
      var m, r, u, d;
      let i = n.color;
      return s === "toggle" && n.filter.value === null && (i = "disabled"), oe(
        V([s, "base"], o, (r = (m = l == null ? void 0 : l.inertia_table) == null ? void 0 : m.table_filter) == null ? void 0 : r.toggle_filter, n.ui),
        V([s, "color", i], o, (d = (u = l == null ? void 0 : l.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : d.toggle_filter, n.ui)
      );
    };
    return (s, i) => (f(), v("div", ho, [
      a("label", po, [
        a("input", {
          type: "checkbox",
          checked: e.filter.value,
          class: "sr-only peer",
          onChange: i[0] || (i[0] = (m) => e.onFilterChange(e.filter.key, m.target.checked ? "1" : "0"))
        }, null, 40, vo),
        a("div", {
          class: N(["peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:transition-all", t("toggle")])
        }, null, 2)
      ]),
      a("button", {
        class: N(t("reset_button")),
        onClick: i[1] || (i[1] = Q((m) => e.onFilterChange(e.filter.key, null), ["prevent"]))
      }, [...i[2] || (i[2] = [
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
}, bo = {
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
      const n = this.getTheme("button"), o = /h-(\d+)/, l = n.match(o), t = 4;
      let s = null;
      return l && 1 in l ? s = l[1] : s = t, e ? `margin-top: ${(s - t + 12) * 0.25}rem` : `margin-top: -${((s - t) / 2 + 9) * 0.25}rem`;
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
      let l = (e.clientX - this.rangePositions.x) / this.rangePositions.width * 100 / 100 * (Number(this.max) - Number(this.min)) + Number(this.min), t = Number(Math.round(l / this.step) * this.step).toFixed(2);
      t >= this.min && t <= this.max && (this.moveMin && t !== this.currentMinValue && t <= this.currentMaxValue && (this.internalValue = [t, this.currentMaxValue]), this.moveMax && t !== this.currentMaxValue && t >= this.currentMinValue && (this.internalValue = [this.currentMinValue, t])), this.detectIfOverlap();
    },
    handleMouseUp(e) {
      this.moveMin = this.moveMax = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), this.$emit("update:modelValue", [this.currentMinValue, this.currentMaxValue]);
    },
    getTheme(e) {
      var n, o, l, t, s, i;
      return oe(
        V([e, "base"], this.fallbackTheme, (l = (o = (n = this.themeVariables) == null ? void 0 : n.inertia_table) == null ? void 0 : o.table_filter) == null ? void 0 : l.number_range_filter, this.ui),
        V([e, "color", this.color], this.fallbackTheme, (i = (s = (t = this.themeVariables) == null ? void 0 : t.inertia_table) == null ? void 0 : s.table_filter) == null ? void 0 : i.number_range_filter, this.ui)
      );
    }
  }
}, yo = {
  ref: "range",
  class: "flex w-full my-4 items-center justify-center",
  unselectable: "on",
  onselectstart: "return false;"
}, xo = { class: "py-1 relative min-w-full" }, wo = { class: "z-40" }, ko = {
  ref: "popover_min",
  class: "relative shadow-md"
}, Co = { key: 0 }, _o = { key: 1 }, So = { class: "z-40" }, $o = {
  ref: "popover_max",
  class: "relative shadow-md"
}, Mo = { key: 0 }, zo = { key: 1 }, qo = { draggable: "true" }, Io = { key: 0 }, To = { key: 1 }, No = { key: 0 }, Po = { key: 1 };
function Fo(e, n, o, l, t, s) {
  var i, m, r, u;
  return f(), v("div", yo, [
    a("div", xo, [
      a("div", {
        class: N(s.getTheme("main_bar"))
      }, [
        a("div", {
          class: N(["absolute", s.getTheme("selected_bar")]),
          style: fe(`width: ${s.rangeWidth}% !important; left: ${s.currentMinValueInPercent}% !important;`)
        }, null, 6),
        a("div", {
          class: N([s.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: fe(`left: ${s.currentMinValueInPercent}%;`),
          onMousedown: n[0] || (n[0] = (d) => s.handleMouseDown(d, !0))
        }, [
          a("div", wo, [
            a("div", ko, [
              a("div", {
                class: N(s.getTheme("popover")),
                style: fe(s.getMarginTop(t.hasOverlap && s.displayFirstDown))
              }, [
                o.prefix ? (f(), v("span", Co, C(o.prefix), 1)) : _("", !0),
                me(" " + C((i = s.currentMinValue) != null ? i : 0) + " ", 1),
                o.suffix ? (f(), v("span", _o, C(o.suffix), 1)) : _("", !0)
              ], 6),
              (f(), v("svg", {
                class: N(["absolute w-full h-2 left-0", [t.hasOverlap && s.displayFirstDown ? "bottom-6 rotate-180" : "top-100", s.getTheme("popover_arrow")]]),
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
          class: N([s.getTheme("button"), "absolute flex items-center justify-center -ml-2 top-0 cursor-pointer"]),
          style: fe(`left: ${s.currentMaxValueInPercent}%;`),
          onMousedown: n[1] || (n[1] = (d) => s.handleMouseDown(d, !1))
        }, [
          a("div", So, [
            a("div", $o, [
              a("div", {
                class: N(s.getTheme("popover")),
                style: fe(s.getMarginTop(t.hasOverlap && !s.displayFirstDown))
              }, [
                o.prefix ? (f(), v("span", Mo, C(o.prefix), 1)) : _("", !0),
                me(" " + C((m = s.currentMaxValue) != null ? m : 0) + " ", 1),
                o.suffix ? (f(), v("span", zo, C(o.suffix), 1)) : _("", !0)
              ], 6),
              a("div", qo, [
                (f(), v("svg", {
                  class: N(["absolute w-full h-2 left-0 top-100", [t.hasOverlap && !s.displayFirstDown ? "bottom-6 rotate-180" : "top-100", s.getTheme("popover_arrow")]]),
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
          class: N(["absolute -ml-1 bottom-0 left-0 -mb-6", s.getTheme("text")])
        }, [
          o.prefix ? (f(), v("span", Io, C(o.prefix), 1)) : _("", !0),
          me(" " + C((r = o.min) != null ? r : 0) + " ", 1),
          o.suffix ? (f(), v("span", To, C(o.suffix), 1)) : _("", !0)
        ], 2),
        a("div", {
          class: N(["absolute -mr-1 bottom-0 right-0 -mb-6", s.getTheme("text")])
        }, [
          o.prefix ? (f(), v("span", No, C(o.prefix), 1)) : _("", !0),
          me(" " + C((u = o.max) != null ? u : 0) + " ", 1),
          o.suffix ? (f(), v("span", Po, C(o.suffix), 1)) : _("", !0)
        ], 2)
      ], 2)
    ])
  ], 512);
}
const At = /* @__PURE__ */ Re(bo, [["render", Fo]]), nt = {
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
function xe() {
  return nt.translations;
}
function Ds(e, n) {
  nt.translations[e] = n;
}
function Gs(e) {
  nt.translations = e;
}
const Oo = { class: "space-y-4" }, jo = { class: "block text-sm font-medium text-gray-700 mb-2" }, Ao = { value: "" }, Ro = { value: "exact" }, Lo = { value: "less_than" }, Eo = { value: "greater_than" }, Bo = { value: "less_than_or_equal" }, Vo = { value: "greater_than_or_equal" }, Wo = { value: "between" }, Do = {
  key: 0,
  class: "space-y-3"
}, Go = { key: 0 }, Uo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Ho = { class: "flex items-center" }, Ko = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, Xo = ["step"], Yo = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, Qo = {
  key: 1,
  class: "space-y-3"
}, Jo = { class: "block text-sm font-medium text-gray-700 mb-1" }, Zo = { class: "flex items-center" }, en = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, tn = ["step"], rn = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, on = { class: "block text-sm font-medium text-gray-700 mb-1" }, nn = { class: "flex items-center" }, ln = {
  key: 0,
  class: "text-sm text-gray-500 mr-1"
}, sn = ["step"], an = {
  key: 1,
  class: "text-sm text-gray-500 ml-1"
}, un = {
  key: 1,
  class: "flex justify-end"
}, cn = { class: "sr-only" }, Rt = {
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
    const n = e, o = xe(), l = O(""), t = O(""), s = O(""), i = O(""), m = L(() => l.value !== "" && (l.value !== "between" && t.value !== "" && t.value !== null || l.value === "between" && s.value !== "" && s.value !== null && i.value !== "" && i.value !== null));
    function r() {
      switch (l.value) {
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
      t.value = "", s.value = "", i.value = "", l.value === "" ? b() : d();
    }
    function d() {
      if (l.value === "")
        return;
      let x = null;
      switch (l.value) {
        case "exact":
        case "less_than":
        case "greater_than":
        case "less_than_or_equal":
        case "greater_than_or_equal":
          t.value !== "" && t.value !== null && (x = {
            type: l.value,
            number: t.value
          });
          break;
        case "between":
          s.value !== "" && s.value !== null && i.value !== "" && i.value !== null && (x = {
            type: l.value,
            start_number: s.value,
            end_number: i.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, x);
    }
    function b() {
      l.value = "", t.value = "", s.value = "", i.value = "", n.onFilterChange(n.filter.key, null);
    }
    he(() => {
      if (n.filter.value) {
        const x = n.filter.value;
        x.type && (l.value = x.type, x.type === "between" ? (s.value = x.start_number || "", i.value = x.end_number || "") : t.value = x.number || "");
      }
    }), ge(() => n.filter.value, (x) => {
      x ? x.type && (l.value = x.type, x.type === "between" ? (s.value = x.start_number || "", i.value = x.end_number || "") : t.value = x.number || "") : b();
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
    }, z = ie("themeVariables"), q = (x) => {
      var h, w, S, I;
      return oe(
        V([x, "base"], y, (w = (h = z == null ? void 0 : z.inertia_table) == null ? void 0 : h.table_filter) == null ? void 0 : w.number_filter, n.ui),
        V([x, "color", n.color], y, (I = (S = z == null ? void 0 : z.inertia_table) == null ? void 0 : S.table_filter) == null ? void 0 : I.number_filter, n.ui)
      );
    };
    return (x, h) => (f(), v("div", Oo, [
      a("div", null, [
        a("label", jo, C(j(o).filter_type), 1),
        J(a("select", {
          "onUpdate:modelValue": h[0] || (h[0] = (w) => l.value = w),
          class: N(q("select")),
          onChange: u
        }, [
          a("option", Ao, C(j(o).no_filter), 1),
          a("option", Ro, C(j(o).exact_number), 1),
          a("option", Lo, C(j(o).less_than), 1),
          a("option", Eo, C(j(o).greater_than), 1),
          a("option", Bo, C(j(o).less_than_or_equal), 1),
          a("option", Vo, C(j(o).greater_than_or_equal), 1),
          a("option", Wo, C(j(o).number_range), 1)
        ], 34), [
          [kt, l.value]
        ])
      ]),
      l.value && l.value !== "" ? (f(), v("div", Do, [
        ["exact", "less_than", "greater_than", "less_than_or_equal", "greater_than_or_equal"].includes(l.value) ? (f(), v("div", Go, [
          a("label", Uo, C(r()), 1),
          a("div", Ho, [
            e.filter.prefix ? (f(), v("span", Ko, C(e.filter.prefix), 1)) : _("", !0),
            J(a("input", {
              type: "number",
              "onUpdate:modelValue": h[1] || (h[1] = (w) => t.value = w),
              step: e.filter.step || 1,
              class: N(q("input")),
              onInput: d,
              placeholder: "0"
            }, null, 42, Xo), [
              [
                Oe,
                t.value,
                void 0,
                { number: !0 }
              ]
            ]),
            e.filter.suffix ? (f(), v("span", Yo, C(e.filter.suffix), 1)) : _("", !0)
          ])
        ])) : _("", !0),
        l.value === "between" ? (f(), v("div", Qo, [
          a("div", null, [
            a("label", Jo, C(j(o).start_number), 1),
            a("div", Zo, [
              e.filter.prefix ? (f(), v("span", en, C(e.filter.prefix), 1)) : _("", !0),
              J(a("input", {
                type: "number",
                "onUpdate:modelValue": h[2] || (h[2] = (w) => s.value = w),
                step: e.filter.step || 1,
                class: N(q("input")),
                onInput: d,
                placeholder: "0"
              }, null, 42, tn), [
                [
                  Oe,
                  s.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (f(), v("span", rn, C(e.filter.suffix), 1)) : _("", !0)
            ])
          ]),
          a("div", null, [
            a("label", on, C(j(o).end_number), 1),
            a("div", nn, [
              e.filter.prefix ? (f(), v("span", ln, C(e.filter.prefix), 1)) : _("", !0),
              J(a("input", {
                type: "number",
                "onUpdate:modelValue": h[3] || (h[3] = (w) => i.value = w),
                step: e.filter.step || 1,
                class: N(q("input")),
                onInput: d,
                placeholder: "0"
              }, null, 42, sn), [
                [
                  Oe,
                  i.value,
                  void 0,
                  { number: !0 }
                ]
              ]),
              e.filter.suffix ? (f(), v("span", an, C(e.filter.suffix), 1)) : _("", !0)
            ])
          ])
        ])) : _("", !0)
      ])) : _("", !0),
      m.value ? (f(), v("div", un, [
        a("button", {
          type: "button",
          class: N(q("reset_button")),
          onClick: b
        }, [
          a("span", cn, C(j(o).reset_filter), 1),
          h[4] || (h[4] = a("svg", {
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
      ])) : _("", !0)
    ]));
  }
}, dn = { class: "space-y-2" }, fn = { class: "block text-sm font-medium text-gray-700 mb-2" }, mn = { value: "" }, gn = { value: "exact" }, hn = { value: "before" }, pn = { value: "after" }, vn = { value: "between" }, bn = {
  key: 0,
  class: "space-y-3"
}, yn = { key: 0 }, xn = { class: "block text-sm font-medium text-gray-700 mb-1" }, wn = {
  key: 1,
  class: "space-y-3"
}, kn = { class: "block text-sm font-medium text-gray-700 mb-1" }, Cn = { class: "block text-sm font-medium text-gray-700 mb-1" }, _n = {
  key: 1,
  class: "flex justify-end"
}, Sn = { class: "sr-only" }, Lt = {
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
    const n = e, o = xe(), l = O(""), t = O(""), s = O(""), i = O(""), m = L(() => l.value !== "" && (l.value !== "between" && t.value || l.value === "between" && s.value && i.value));
    function r() {
      switch (l.value) {
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
      t.value = "", s.value = "", i.value = "", l.value === "" ? b() : d();
    }
    function d() {
      if (l.value === "")
        return;
      let x = null;
      switch (l.value) {
        case "exact":
        case "before":
        case "after":
          t.value && (x = {
            type: l.value,
            date: t.value
          });
          break;
        case "between":
          s.value && i.value && (x = {
            type: l.value,
            start_date: s.value,
            end_date: i.value
          });
          break;
      }
      n.onFilterChange(n.filter.key, x);
    }
    function b() {
      l.value = "", t.value = "", s.value = "", i.value = "", n.onFilterChange(n.filter.key, null);
    }
    he(() => {
      if (n.filter.value) {
        const x = n.filter.value;
        x.type && (l.value = x.type, x.type === "between" ? (s.value = x.start_date || "", i.value = x.end_date || "") : t.value = x.date || "");
      }
    }), ge(() => n.filter.value, (x) => {
      x ? x.type && (l.value = x.type, x.type === "between" ? (s.value = x.start_date || "", i.value = x.end_date || "") : t.value = x.date || "") : b();
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
    }, z = ie("themeVariables"), q = (x) => {
      var h, w, S, I;
      return oe(
        V([x, "base"], y, (w = (h = z == null ? void 0 : z.inertia_table) == null ? void 0 : h.table_filter) == null ? void 0 : w.date_filter, n.ui),
        V([x, "color", n.color], y, (I = (S = z == null ? void 0 : z.inertia_table) == null ? void 0 : S.table_filter) == null ? void 0 : I.date_filter, n.ui)
      );
    };
    return (x, h) => (f(), v("div", dn, [
      a("div", null, [
        a("label", fn, C(j(o).filter_type), 1),
        J(a("select", {
          "onUpdate:modelValue": h[0] || (h[0] = (w) => l.value = w),
          class: N(q("select")),
          onChange: u
        }, [
          a("option", mn, C(j(o).no_filter), 1),
          a("option", gn, C(j(o).exact_date), 1),
          a("option", hn, C(j(o).before_date), 1),
          a("option", pn, C(j(o).after_date), 1),
          a("option", vn, C(j(o).date_range), 1)
        ], 34), [
          [kt, l.value]
        ])
      ]),
      l.value && l.value !== "" ? (f(), v("div", bn, [
        ["exact", "before", "after"].includes(l.value) ? (f(), v("div", yn, [
          a("label", xn, C(r()), 1),
          J(a("input", {
            type: "date",
            "onUpdate:modelValue": h[1] || (h[1] = (w) => t.value = w),
            class: N(q("input")),
            onChange: d
          }, null, 34), [
            [Oe, t.value]
          ])
        ])) : _("", !0),
        l.value === "between" ? (f(), v("div", wn, [
          a("div", null, [
            a("label", kn, C(j(o).start_date), 1),
            J(a("input", {
              type: "date",
              "onUpdate:modelValue": h[2] || (h[2] = (w) => s.value = w),
              class: N(q("input")),
              onChange: d
            }, null, 34), [
              [Oe, s.value]
            ])
          ]),
          a("div", null, [
            a("label", Cn, C(j(o).end_date), 1),
            J(a("input", {
              type: "date",
              "onUpdate:modelValue": h[3] || (h[3] = (w) => i.value = w),
              class: N(q("input")),
              onChange: d
            }, null, 34), [
              [Oe, i.value]
            ])
          ])
        ])) : _("", !0)
      ])) : _("", !0),
      m.value ? (f(), v("div", _n, [
        a("button", {
          type: "button",
          class: N(q("reset_button")),
          onClick: b
        }, [
          a("span", Sn, C(j(o).reset_filter), 1),
          h[4] || (h[4] = a("svg", {
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
      ])) : _("", !0)
    ]));
  }
};
function Et(e) {
  let n = O(null), o = O(null);
  return he(() => {
    Zt((l) => {
      if (!o.value || !n.value)
        return;
      let t = o.value.el || o.value, s = n.value.el || n.value;
      if (!(s instanceof HTMLElement) || !(t instanceof HTMLElement))
        return;
      let { destroy: i } = cr(s, t, e);
      l(i);
    });
  }), [n, o];
}
const $n = { class: "relative inline-block" }, Mn = ["dusk"], zn = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, qn = { class: "p-2" }, In = ["name", "value", "onChange"], Tn = ["value"], Nn = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Pn = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Fn = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, On = {
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
    const n = e, o = O(!1);
    O(null);
    const [l, t] = Et({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), s = L(() => n.filters.filter((h) => h.key === n.columnKey || h.key.startsWith(n.columnKey + "_") || h.key.includes(n.columnKey))), i = L(() => s.value.some((h) => !u(h)));
    function m() {
      s.value.length > 0 && (o.value = !o.value);
    }
    function r() {
      o.value = !1;
    }
    function u(h) {
      if (h.value === null)
        return !0;
      switch (h.type) {
        case "number_range":
          return Number(Math.max(...h.value)) === Number(h.max) && Number(Math.min(...h.value)) === Number(h.min);
        case "select":
          return h.value === "";
        case "toggle":
          return !1;
        case "date":
          return !h.value || typeof h.value == "object" && !h.value.type;
        default:
          return !h.value;
      }
    }
    function d(h, w) {
      n.onFilterChange(h, w);
    }
    function b(h) {
      let w = h.value;
      h.value && (Number(Math.max(...h.value)) === Number(h.max) && Number(Math.min(...h.value)) === Number(h.min) ? w = null : Number(Math.min(...h.value)) === 0 && Number(Math.max(...h.value)) === 0 && (w = ["0", "0"])), n.onFilterChange(h.key, w);
    }
    const y = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, z = ie("themeVariables"), q = (h) => {
      var w, S, I, R;
      return oe(
        V([h, "base"], y, (S = (w = z == null ? void 0 : z.inertia_table) == null ? void 0 : w.table_filter) == null ? void 0 : S.select_filter, n.ui),
        V([h, "color", n.color], y, (R = (I = z == null ? void 0 : z.inertia_table) == null ? void 0 : I.table_filter) == null ? void 0 : R.select_filter, n.ui)
      );
    };
    function x(h) {
      t.value && !t.value.contains(h.target) && !h.target.closest(`[dusk="column-filter-${n.columnKey}"]`) && r();
    }
    return he(() => {
      document.addEventListener("click", x);
    }), Ye(() => {
      document.removeEventListener("click", x);
    }), (h, w) => (f(), v("div", $n, [
      a("button", {
        ref_key: "trigger",
        ref: l,
        onClick: m,
        class: N([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": i.value,
            "text-gray-400 hover:text-gray-600": !i.value
          }
        ]),
        dusk: `column-filter-${e.columnKey}`
      }, [...w[1] || (w[1] = [
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
      ])], 10, Mn),
      (f(), B(Ke, { to: "body" }, [
        o.value ? (f(), v("div", {
          key: 0,
          ref_key: "container",
          ref: t,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: w[0] || (w[0] = Q(() => {
          }, ["stop"]))
        }, [
          (f(!0), v(se, null, ae(s.value, (S) => (f(), v("div", {
            key: S.key
          }, [
            a("h3", zn, C(S.label), 1),
            a("div", qn, [
              S.type === "select" ? (f(), v("select", {
                key: 0,
                name: S.key,
                value: S.value,
                class: N(q("select")),
                onChange: (I) => d(S.key, I.target.value)
              }, [
                (f(!0), v(se, null, ae(S.options, (I, R) => (f(), v("option", {
                  key: R,
                  value: R
                }, C(I), 9, Tn))), 128))
              ], 42, In)) : _("", !0),
              S.type === "toggle" ? (f(), B(jt, {
                key: 1,
                filter: S,
                "on-filter-change": d,
                color: e.color
              }, null, 8, ["filter", "color"])) : _("", !0),
              S.type === "number" ? (f(), v("div", Nn, [
                re(Rt, {
                  filter: S,
                  "on-filter-change": d,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : _("", !0),
              S.type === "number_range" ? (f(), v("div", Pn, [
                re(At, {
                  modelValue: S.value,
                  "onUpdate:modelValue": [(I) => S.value = I, (I) => b(S)],
                  max: S.max,
                  min: S.min,
                  prefix: S.prefix,
                  suffix: S.suffix,
                  step: S.step,
                  color: e.color
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "prefix", "suffix", "step", "color"])
              ])) : _("", !0),
              S.type === "date" ? (f(), v("div", Fn, [
                re(Lt, {
                  filter: S,
                  "on-filter-change": d,
                  color: e.color
                }, null, 8, ["filter", "color"])
              ])) : _("", !0)
            ])
          ]))), 128))
        ], 512)) : _("", !0)
      ])),
      (f(), B(Ke, { to: "body" }, [
        o.value ? (f(), v("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: r
        })) : _("", !0)
      ]))
    ]));
  }
}, jn = { class: "relative inline-block" }, An = ["dusk"], Rn = { class: "p-3" }, Ln = { class: "text-xs uppercase tracking-wide text-gray-600 mb-2" }, En = { class: "space-y-2" }, Bn = ["value", "placeholder"], Vn = {
  key: 0,
  class: "flex justify-end"
}, Wn = { class: "sr-only" }, Dn = {
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
    const n = e, o = xe(), l = O(!1), t = O(null), [s, i] = Et({
      placement: "bottom-end",
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["top-end", "bottom-start", "top-start"] } }
      ]
    }), m = L(() => n.searchInputs.find((S) => S.key === n.columnKey)), r = L(() => m.value && m.value.value || ""), u = L(() => r.value !== "");
    async function d() {
      m.value && (l.value = !l.value, l.value && (await Ct(), t.value && t.value.focus()));
    }
    function b() {
      l.value = !1;
    }
    function y(S) {
      const I = S.target.value;
      z(I);
    }
    function z(S) {
      n.onSearchChange(n.columnKey, S);
    }
    const q = {
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
    }, x = ie("themeVariables"), h = (S) => {
      var I, R, W, G;
      return oe(
        V([S, "base"], q, (R = (I = x == null ? void 0 : x.inertia_table) == null ? void 0 : I.table_search) == null ? void 0 : R.column_search, n.ui),
        V([S, "color", n.color], q, (G = (W = x == null ? void 0 : x.inertia_table) == null ? void 0 : W.table_search) == null ? void 0 : G.column_search, n.ui)
      );
    };
    function w(S) {
      i.value && !i.value.contains(S.target) && !S.target.closest(`[dusk="column-search-${n.columnKey}"]`) && b();
    }
    return he(() => {
      document.addEventListener("click", w);
    }), Ye(() => {
      document.removeEventListener("click", w);
    }), (S, I) => (f(), v("div", jn, [
      a("button", {
        ref_key: "trigger",
        ref: s,
        onClick: d,
        class: N([
          "p-1 rounded hover:bg-gray-100 transition-colors duration-150",
          {
            "text-blue-500": u.value,
            "text-gray-400 hover:text-gray-600": !u.value
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
      ])], 10, An),
      (f(), B(Ke, { to: "body" }, [
        l.value ? (f(), v("div", {
          key: 0,
          ref_key: "container",
          ref: i,
          class: "bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max",
          onClick: I[1] || (I[1] = Q(() => {
          }, ["stop"]))
        }, [
          a("div", Rn, [
            a("h3", Ln, C(j(o).search) + " " + C(e.columnLabel), 1),
            a("div", En, [
              a("input", {
                ref_key: "searchInput",
                ref: t,
                type: "text",
                value: r.value,
                class: N(h("input")),
                placeholder: `${j(o).search} ${e.columnLabel.toLowerCase()}...`,
                onInput: y,
                onKeydown: [
                  mt(b, ["enter"]),
                  mt(b, ["escape"])
                ]
              }, null, 42, Bn),
              r.value && r.value !== "" ? (f(), v("div", Vn, [
                a("button", {
                  type: "button",
                  class: N(h("reset_button")),
                  onClick: I[0] || (I[0] = (R) => z(""))
                }, [
                  a("span", Wn, C(j(o).reset), 1),
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
              ])) : _("", !0)
            ])
          ])
        ], 512)) : _("", !0)
      ])),
      (f(), B(Ke, { to: "body" }, [
        l.value ? (f(), v("div", {
          key: 0,
          class: "fixed inset-0 z-[9998]",
          onClick: b
        })) : _("", !0)
      ]))
    ]));
  }
};
const Gn = ["data-column-key"], Un = { class: "flex flex-row items-center justify-between w-full" }, Hn = { class: "flex flex-row items-center" }, Kn = { class: "uppercase" }, Xn = ["sorted"], Yn = {
  key: 0,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
}, Qn = {
  key: 1,
  fill: "currentColor",
  d: "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
}, Jn = {
  key: 2,
  fill: "currentColor",
  d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
}, Zn = { class: "flex items-center space-x-1" }, el = {
  __name: "HeaderCell",
  props: {
    cell: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const n = e, o = ie("columnResize", null), l = L(() => {
      if (!o)
        return "auto";
      const r = o.getColumnWidth(n.cell.key);
      return r === "auto" ? r : `${r}px`;
    }), t = L(() => (o == null ? void 0 : o.isResizing) || !1), s = L(() => (o == null ? void 0 : o.resizingColumn) || null);
    function i() {
      n.cell.sortable && n.cell.onSort(n.cell.key);
    }
    function m(r, u) {
      o && o.startResize(r, u);
    }
    return (r, u) => J((f(), v("th", {
      class: N(["py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border", e.cell.header_class]),
      style: fe({ width: l.value }),
      "data-column-key": e.cell.key
    }, [
      (f(), B(Fe(e.cell.sortable ? "button" : "div"), {
        class: "w-full",
        dusk: e.cell.sortable ? `sort-${e.cell.key}` : null,
        onClick: Q(i, ["prevent"])
      }, {
        default: H(() => [
          a("span", Un, [
            a("span", Hn, [
              E(r.$slots, "label", {}, () => [
                a("span", Kn, C(e.cell.label), 1)
              ], !0),
              E(r.$slots, "sort", {}, () => [
                e.cell.sortable ? (f(), v("svg", {
                  key: 0,
                  "aria-hidden": "true",
                  class: N(["w-3 h-3 ml-2", {
                    "text-gray-400": !e.cell.sorted,
                    "text-green-500": e.cell.sorted
                  }]),
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 320 512",
                  sorted: e.cell.sorted
                }, [
                  e.cell.sorted ? _("", !0) : (f(), v("path", Yn)),
                  e.cell.sorted === "asc" ? (f(), v("path", Qn)) : _("", !0),
                  e.cell.sorted === "desc" ? (f(), v("path", Jn)) : _("", !0)
                ], 10, Xn)) : _("", !0)
              ], !0)
            ]),
            a("span", Zn, [
              E(r.$slots, "search", {}, () => [
                e.cell.searchable && e.cell.searchInputs && e.cell.searchInputs.length > 0 ? (f(), B(Dn, {
                  key: 0,
                  "column-key": e.cell.key,
                  "column-label": e.cell.label,
                  "search-inputs": e.cell.searchInputs,
                  "on-search-change": e.cell.onSearchChange,
                  color: e.cell.color,
                  onClick: u[0] || (u[0] = Q(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "column-label", "search-inputs", "on-search-change", "color"])) : _("", !0)
              ], !0),
              E(r.$slots, "filter", {}, () => [
                e.cell.filters && e.cell.filters.length > 0 ? (f(), B(On, {
                  key: 0,
                  "column-key": e.cell.key,
                  filters: e.cell.filters,
                  "on-filter-change": e.cell.onFilterChange,
                  color: e.cell.color,
                  onClick: u[1] || (u[1] = Q(() => {
                  }, ["stop"]))
                }, null, 8, ["column-key", "filters", "on-filter-change", "color"])) : _("", !0)
              ], !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["dusk"])),
      e.cell.resizable !== !1 && j(o) ? (f(), B(go, {
        key: 0,
        "column-key": e.cell.key,
        "on-resize": m,
        "is-active": t.value && s.value === e.cell.key
      }, null, 8, ["column-key", "is-active"])) : _("", !0)
    ], 14, Gn)), [
      [ye, !e.cell.hidden]
    ]);
  }
}, tl = /* @__PURE__ */ Re(el, [["__scopeId", "data-v-8684dc95"]]), rl = ["dusk", "value"], ol = ["value"], wt = {
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
    const n = xe(), o = e, l = L(() => {
      let m = [...o.options];
      return m.push(parseInt(o.value)), dr(m).sort((r, u) => r - u);
    }), t = {
      select: {
        base: "block min-w-max shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, s = ie("themeVariables"), i = (m) => {
      var r, u;
      return oe(
        V([m, "base"], t, (r = s == null ? void 0 : s.inertia_table) == null ? void 0 : r.per_page_selector, o.ui),
        V([m, "color", o.color], t, (u = s == null ? void 0 : s.inertia_table) == null ? void 0 : u.per_page_selector, o.ui)
      );
    };
    return (m, r) => (f(), v("select", {
      name: "per_page",
      dusk: e.dusk,
      value: e.value,
      class: N(i("select")),
      onChange: r[0] || (r[0] = (u) => e.onChange(u.target.value))
    }, [
      (f(!0), v(se, null, ae(l.value, (u) => (f(), v("option", {
        key: u,
        value: u
      }, C(u) + " " + C(j(n).per_page), 9, ol))), 128))
    ], 42, rl));
  }
}, nl = {
  key: 0,
  class: "bg-white flex items-center"
}, ll = { key: 0 }, sl = { class: "hidden sm:inline ml-2" }, al = { class: "hidden sm:inline mr-2" }, il = {
  key: 2,
  class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
}, ul = { class: "flex flex-row space-x-4 items-center grow" }, cl = { class: "hidden lg:block text-sm text-gray-700 grow pr-2" }, dl = { class: "font-medium" }, fl = { class: "font-medium" }, ml = { class: "font-medium" }, gl = {
  class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
  "aria-label": "Pagination"
}, hl = { class: "sr-only" }, pl = { class: "sr-only" }, vl = {
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
    const n = xe(), o = e, l = L(() => "links" in s.value ? s.value.links.length > 0 : !1), t = L(() => Object.keys(s.value).length > 0), s = L(() => o.meta), i = L(() => "prev_page_url" in s.value ? s.value.prev_page_url : null), m = L(() => "next_page_url" in s.value ? s.value.next_page_url : null), r = L(() => parseInt(s.value.per_page));
    return (u, d) => t.value ? (f(), v("nav", nl, [
      !e.hasData || s.value.total < 1 ? (f(), v("p", ll, C(j(n).no_results_found), 1)) : _("", !0),
      e.hasData ? (f(), v("div", {
        key: 1,
        class: N(["flex-1 flex justify-between", { "sm:hidden": l.value }])
      }, [
        (f(), B(Fe(i.value ? "a" : "div"), {
          class: N([{
            "cursor-not-allowed text-gray-400": !i.value,
            "text-gray-700 hover:text-gray-500": i.value
          }, "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: i.value,
          dusk: i.value ? "pagination-simple-previous" : null,
          onClick: d[0] || (d[0] = Q((b) => e.onClick(i.value), ["prevent"]))
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
            a("span", sl, C(j(n).previous), 1)
          ]),
          _: 1
        }, 8, ["class", "href", "dusk"])),
        re(wt, {
          dusk: "per-page-mobile",
          value: r.value,
          options: e.perPageOptions,
          "on-change": e.onPerPageChange,
          color: e.color
        }, null, 8, ["value", "options", "on-change", "color"]),
        (f(), B(Fe(m.value ? "a" : "div"), {
          class: N([{
            "cursor-not-allowed text-gray-400": !m.value,
            "text-gray-700 hover:text-gray-500": m.value
          }, "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white"]),
          href: m.value,
          dusk: m.value ? "pagination-simple-next" : null,
          onClick: d[1] || (d[1] = Q((b) => e.onClick(m.value), ["prevent"]))
        }, {
          default: H(() => [
            a("span", al, C(j(n).next), 1),
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
      ], 2)) : _("", !0),
      e.hasData && l.value ? (f(), v("div", il, [
        a("div", ul, [
          re(wt, {
            dusk: "per-page-full",
            value: r.value,
            options: e.perPageOptions,
            "on-change": e.onPerPageChange,
            color: e.color
          }, null, 8, ["value", "options", "on-change", "color"]),
          a("p", cl, [
            a("span", dl, C(s.value.from), 1),
            me(" " + C(j(n).to) + " ", 1),
            a("span", fl, C(s.value.to), 1),
            me(" " + C(j(n).of) + " ", 1),
            a("span", ml, C(s.value.total), 1),
            me(" " + C(j(n).results), 1)
          ])
        ]),
        a("div", null, [
          a("nav", gl, [
            (f(), B(Fe(i.value ? "a" : "div"), {
              class: N([{
                "cursor-not-allowed text-gray-400": !i.value,
                "text-gray-500 hover:bg-gray-50": i.value
              }, "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"]),
              href: i.value,
              dusk: i.value ? "pagination-previous" : null,
              onClick: d[2] || (d[2] = Q((b) => e.onClick(i.value), ["prevent"]))
            }, {
              default: H(() => [
                a("span", hl, C(j(n).previous), 1),
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
            (f(!0), v(se, null, ae(s.value.links, (b, y) => (f(), v("div", { key: y }, [
              E(u.$slots, "link", {}, () => [
                !isNaN(b.label) || b.label === "..." ? (f(), B(Fe(b.url ? "a" : "div"), {
                  key: 0,
                  href: b.url,
                  dusk: b.url ? `pagination-${b.label}` : null,
                  class: N(["relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700", {
                    "cursor-not-allowed": !b.url,
                    "hover:bg-gray-50": b.url,
                    "bg-white": !b.active,
                    "bg-gray-100": b.active
                  }]),
                  onClick: Q((z) => e.onClick(b.url), ["prevent"])
                }, {
                  default: H(() => [
                    me(C(b.label), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "dusk", "class", "onClick"])) : _("", !0)
              ])
            ]))), 128)),
            (f(), B(Fe(m.value ? "a" : "div"), {
              class: N([{
                "cursor-not-allowed text-gray-400": !m.value,
                "text-gray-500 hover:bg-gray-50": m.value
              }, "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"]),
              href: m.value,
              dusk: m.value ? "pagination-next" : null,
              onClick: d[3] || (d[3] = Q((b) => e.onClick(m.value), ["prevent"]))
            }, {
              default: H(() => [
                a("span", pl, C(j(n).next), 1),
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
      ])) : _("", !0)
    ])) : _("", !0);
  }
}, bl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "add-search-input-menu",
  class: "min-w-max"
}, yl = ["dusk", "onClick"], xl = {
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
    const n = e, o = O(null);
    function l(t) {
      n.onAdd(t), o.value.hide();
    }
    return (t, s) => (f(), B(Qe, {
      ref_key: "dropdown",
      ref: o,
      dusk: "add-search-row-dropdown",
      disabled: !e.hasSearchInputsWithoutValue,
      class: "w-auto",
      color: e.color
    }, {
      button: H(() => [...s[0] || (s[0] = [
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
        a("div", bl, [
          (f(!0), v(se, null, ae(e.searchInputs, (i, m) => (f(), v("button", {
            key: m,
            dusk: `add-search-row-${i.key}`,
            class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            role: "menuitem",
            onClick: Q((r) => l(i.key), ["prevent"])
          }, C(i.label), 9, yl))), 128))
        ])
      ]),
      _: 1
    }, 8, ["disabled", "color"]));
  }
}, wl = ["data-column-key"], kl = { class: "flex items-center" }, Cl = ["onClick", "title"], _l = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, Sl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4",
  viewBox: "0 0 24 24"
}, $l = ["aria-pressed", "aria-labelledby", "aria-describedby", "dusk", "onClick"], Bt = {
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
    const o = e, l = n, t = O([...o.columns]), s = O(!1), i = O(!1);
    ge(() => o.columns, (d) => {
      !s.value && !i.value && (t.value = [...d]), i.value && setTimeout(() => {
        i.value = !1;
      }, 100);
    }, { deep: !0 });
    function m(d, b) {
      const y = t.value.findIndex((z) => z.key === d);
      y !== -1 && (t.value[y].hidden = !b), l("columns-changed", t.value);
    }
    function r(d, b) {
      const y = t.value.findIndex((z) => z.key === d);
      y !== -1 && (t.value[y].pinned = !b), t.value.sort((z, q) => z.pinned && !q.pinned ? -1 : !z.pinned && q.pinned ? 1 : 0), l("columns-changed", t.value);
    }
    function u() {
      i.value = !0, l("columns-changed", t.value);
    }
    return (d, b) => (f(), B(j(fr), {
      modelValue: t.value,
      "onUpdate:modelValue": b[0] || (b[0] = (y) => t.value = y),
      "item-key": "key",
      animation: 200,
      handle: ".drag-handle",
      onChange: u,
      onStart: b[1] || (b[1] = (y) => s.value = !0),
      onEnd: b[2] || (b[2] = (y) => s.value = !1)
    }, {
      item: H(({ element: y }) => [
        a("div", {
          class: "py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0",
          "data-test": "column-item",
          "data-column-key": y.key
        }, [
          a("div", kl, [
            b[5] || (b[5] = a("div", { class: "drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600" }, [
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
              class: N(["mr-2 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600", { "text-blue-500": y.pinned }]),
              onClick: Q((z) => r(y.key, y.pinned), ["prevent"]),
              title: y.pinned ? "D\xE9s\xE9pingler la colonne" : "\xC9pingler la colonne"
            }, [
              y.pinned ? (f(), v("svg", _l, [...b[3] || (b[3] = [
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
              ])])) : (f(), v("svg", Sl, [...b[4] || (b[4] = [
                a("path", {
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "1.5",
                  d: "M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z"
                }, null, -1)
              ])]))
            ], 10, Cl)) : _("", !0),
            a("p", {
              class: N(["text-sm text-gray-900", { "text-gray-400": y.hidden, "font-semibold": y.pinned }])
            }, C(y.label), 3)
          ]),
          y.can_be_hidden && !y.pinned ? (f(), v("button", {
            key: 0,
            type: "button",
            class: N(["ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500", {
              "bg-green-500": !y.hidden,
              "bg-gray-200": y.hidden
            }]),
            "aria-pressed": !y.hidden,
            "aria-labelledby": `toggle-column-${y.key}`,
            "aria-describedby": `toggle-column-${y.key}`,
            dusk: `toggle-column-${y.key}`,
            onClick: Q((z) => m(y.key, y.hidden), ["prevent"])
          }, [
            b[6] || (b[6] = a("span", { class: "sr-only" }, "Column status", -1)),
            a("span", {
              "aria-hidden": "true",
              class: N([{
                "translate-x-5": !y.hidden,
                "translate-x-0": y.hidden
              }, "inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"])
            }, null, 2)
          ], 10, $l)) : _("", !0)
        ], 8, wl)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
};
const Ml = {
  key: 0,
  class: "ml-1"
}, zl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "toggle-columns-menu",
  class: "min-w-max"
}, ql = { class: "px-2" }, Il = {
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
    const n = e, o = O([...n.columns]);
    ge(() => n.columns, (s) => {
      o.value = [...s];
    }, { deep: !0, immediate: !0 });
    const l = L(() => o.value.filter((s) => s.hidden).length);
    function t(s) {
      o.value = [...s], n.onChange(s);
    }
    return (s, i) => (f(), B(Qe, {
      placement: "bottom-end",
      dusk: "columns-dropdown",
      color: e.color
    }, {
      button: H(() => [
        i[0] || (i[0] = a("svg", {
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
        e.hasHiddenColumns ? (f(), v("span", Ml, "(" + C(l.value) + ")", 1)) : _("", !0)
      ]),
      default: H(() => [
        a("div", zl, [
          a("div", ql, [
            re(Bt, {
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
}, Tl = /* @__PURE__ */ Re(Il, [["__scopeId", "data-v-eadc618a"]]), Nl = {
  key: 0,
  class: "ml-1"
}, Pl = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "filter-menu",
  class: "min-w-max"
}, Fl = { class: "text-xs uppercase tracking-wide bg-gray-100 p-3" }, Ol = { class: "p-2" }, jl = ["name", "value", "onChange"], Al = ["value"], Rl = {
  key: 2,
  class: "py-4 px-8",
  style: { "min-width": "250px" }
}, Ll = {
  key: 3,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, El = {
  key: 4,
  class: "py-4 px-8",
  style: { "min-width": "300px" }
}, Bl = {
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
    O(null);
    const o = L(() => n.filters.filter((r) => !l(r)).length);
    function l(r) {
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
      let u = r.value;
      r.value && (Number(Math.max(...r.value)) === Number(r.max) && Number(Math.min(...r.value)) === Number(r.min) ? u = null : Number(Math.min(...r.value)) === 0 && Number(Math.max(...r.value)) === 0 && (u = ["0", "0"])), n.onFilterChange(r.key, u);
    }
    const s = {
      select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
          primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500"
        }
      }
    }, i = ie("themeVariables"), m = (r) => {
      var u, d, b, y;
      return oe(
        V([r, "base"], s, (d = (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_filter) == null ? void 0 : d.select_filter, n.ui),
        V([r, "color", n.color], s, (y = (b = i == null ? void 0 : i.inertia_table) == null ? void 0 : b.table_filter) == null ? void 0 : y.select_filter, n.ui)
      );
    };
    return (r, u) => (f(), B(Qe, {
      placement: "bottom-end",
      dusk: "filters-dropdown",
      color: e.color
    }, {
      button: H(() => [
        u[0] || (u[0] = a("svg", {
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
        e.hasEnabledFilters ? (f(), v("span", Nl, "(" + C(o.value) + ")", 1)) : _("", !0)
      ]),
      default: H(() => [
        a("div", Pl, [
          (f(!0), v(se, null, ae(e.filters, (d, b) => (f(), v("div", { key: b }, [
            a("h3", Fl, C(d.label), 1),
            a("div", Ol, [
              d.type === "select" ? (f(), v("select", {
                key: 0,
                name: d.key,
                value: d.value,
                class: N(m("select", e.color)),
                onChange: (y) => e.onFilterChange(d.key, y.target.value)
              }, [
                (f(!0), v(se, null, ae(d.options, (y, z) => (f(), v("option", {
                  key: z,
                  value: z
                }, C(y), 9, Al))), 128))
              ], 42, jl)) : _("", !0),
              d.type === "toggle" ? (f(), B(jt, {
                key: 1,
                filter: d,
                "on-filter-change": e.onFilterChange,
                color: e.color
              }, null, 8, ["filter", "on-filter-change", "color"])) : _("", !0),
              d.type === "number_range" ? (f(), v("div", Rl, [
                re(At, {
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
              d.type === "date" ? (f(), v("div", Ll, [
                re(Lt, {
                  filter: d,
                  "on-filter-change": e.onFilterChange,
                  color: e.color
                }, null, 8, ["filter", "on-filter-change", "color"])
              ])) : _("", !0),
              d.type === "number" ? (f(), v("div", El, [
                re(Rt, {
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
}, Vl = { class: "relative" }, Wl = ["placeholder", "value"], Dl = {
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
    }, l = ie("themeVariables"), t = (s) => {
      var i, m;
      return oe(
        V([s, "base"], o, (i = l == null ? void 0 : l.inertia_table) == null ? void 0 : i.global_search, n.ui),
        V([s, "color", n.color], o, (m = l == null ? void 0 : l.inertia_table) == null ? void 0 : m.global_search, n.ui)
      );
    };
    return (s, i) => (f(), v("div", Vl, [
      a("input", {
        class: N(t("input")),
        placeholder: e.label,
        value: e.value,
        type: "text",
        name: "global",
        onInput: i[0] || (i[0] = (m) => e.onChange(m.target.value))
      }, null, 42, Wl),
      i[1] || (i[1] = a("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
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
}, Gl = { class: "flex rounded-md shadow-sm relative mt-3" }, Ul = ["for"], Hl = ["id", "name", "value", "onInput"], Kl = { class: "absolute inset-y-0 right-0 pr-3 flex items-center" }, Xl = ["dusk", "onClick"], Yl = {
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
    const n = { el: O([]) };
    let o = L(() => n.el.value);
    const l = e;
    function t(r) {
      return l.forcedVisibleSearchInputs.includes(r);
    }
    ge(l.forcedVisibleSearchInputs, (r) => {
      const u = r.length > 0 ? r[r.length - 1] : null;
      !u || Ct().then(() => {
        const d = mr(o.value, (b) => b.name === u);
        d && d.focus();
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
    }, i = ie("themeVariables"), m = (r) => {
      var u, d;
      return oe(
        V([r, "base"], s, (u = i == null ? void 0 : i.inertia_table) == null ? void 0 : u.table_search_rows, l.ui),
        V([r, "color", l.color], s, (d = i == null ? void 0 : i.inertia_table) == null ? void 0 : d.table_search_rows, l.ui)
      );
    };
    return (r, u) => (f(!0), v(se, null, ae(e.searchInputs, (d, b) => J((f(), v("div", {
      key: b,
      class: "px-4 sm:px-0"
    }, [
      a("div", Gl, [
        a("label", {
          for: d.key,
          class: "inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        }, [
          u[0] || (u[0] = a("svg", {
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
          a("span", null, C(d.label), 1)
        ], 8, Ul),
        (f(), v("input", {
          id: d.key,
          ref_for: !0,
          ref: n.el,
          key: d.key,
          name: d.key,
          value: d.value,
          type: "text",
          class: N(m("input")),
          onInput: (y) => e.onChange(d.key, y.target.value)
        }, null, 42, Hl)),
        a("div", Kl, [
          a("button", {
            class: N(m("remove_button")),
            dusk: `remove-search-row-${d.key}`,
            onClick: Q((y) => e.onRemove(d.key), ["prevent"])
          }, [...u[1] || (u[1] = [
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
          ])], 10, Xl)
        ])
      ])
    ])), [
      [ye, d.value !== null || t(d.key)]
    ])), 128));
  }
}, Ql = {
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
    const n = xe(), o = e, l = {
      button: {
        base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
          primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
          dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500"
        }
      }
    }, t = ie("themeVariables"), s = (i) => {
      var m, r;
      return oe(
        V([i, "base"], l, (m = t == null ? void 0 : t.inertia_table) == null ? void 0 : m.reset_button, o.ui),
        V([i, "color", o.color], l, (r = t == null ? void 0 : t.inertia_table) == null ? void 0 : r.reset_button, o.ui)
      );
    };
    return (i, m) => {
      var r;
      return f(), v("button", {
        ref: "button",
        type: "button",
        dusk: "reset-table",
        class: N(s("button")),
        "aria-haspopup": "true",
        onClick: m[0] || (m[0] = Q((...u) => e.onClick && e.onClick(...u), ["prevent"]))
      }, [
        m[1] || (m[1] = a("svg", {
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
        a("span", null, C((r = j(n).reset) != null ? r : "Reset"), 1)
      ], 2);
    };
  }
}, Jl = {}, Zl = { class: "flow-root" }, es = { class: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, ts = { class: "inline-block min-w-full w-full max-w-full py-2 align-middle sm:px-6 lg:px-8" }, rs = { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" };
function os(e, n) {
  return f(), v("div", Zl, [
    a("div", es, [
      a("div", ts, [
        a("div", rs, [
          E(e.$slots, "default")
        ])
      ])
    ])
  ]);
}
const ns = /* @__PURE__ */ Re(Jl, [["render", os]]), ls = {
  role: "menu",
  "aria-orientation": "horizontal",
  "aria-labelledby": "grouped-actions-menu",
  class: "w-56"
}, ss = ["dusk", "onClick"], as = { class: "px-2" }, is = {
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
    const n = xe(), o = e, l = O(!1), t = O(!1);
    function s() {
      l.value = t.value = !1;
    }
    function i(m) {
      var r, u;
      (r = o.actions.toggleColumns) != null && r.onReorder ? o.actions.toggleColumns.onReorder(m) : (u = o.actions.toggleColumns) != null && u.onChange && o.actions.toggleColumns.onChange(m);
    }
    return (m, r) => (f(), B(Qe, {
      ref: "dropdown",
      dusk: "grouped-actions-dropdown",
      class: "w-auto",
      color: e.color,
      onClosed: s
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
        var u, d, b, y, z;
        return [
          a("div", ls, [
            J(a("div", null, [
              "searchFields" in e.actions && e.actions.searchFields.show ? (f(), v("button", {
                key: 0,
                dusk: "add-search-fields-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[0] || (r[0] = (q) => t.value = !0)
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
                a("span", null, C((u = j(n).add_search_fields) != null ? u : "Add search field"), 1)
              ])) : _("", !0),
              "toggleColumns" in e.actions && e.actions.toggleColumns.show ? (f(), v("button", {
                key: 1,
                dusk: "toggle-column-button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[1] || (r[1] = (q) => l.value = !0)
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
                a("span", null, C((d = j(n).show_hide_columns) != null ? d : "Show / Hide columns"), 1)
              ])) : _("", !0),
              r[9] || (r[9] = a("hr", null, null, -1)),
              "reset" in e.actions ? (f(), v("button", {
                key: 2,
                dusk: "reset-button",
                class: "text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center",
                role: "menuitem",
                onClick: r[2] || (r[2] = (...q) => {
                  var x, h;
                  return ((x = e.actions.reset) == null ? void 0 : x.onClick) && ((h = e.actions.reset) == null ? void 0 : h.onClick(...q));
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
                a("span", null, C((b = j(n).grouped_reset) != null ? b : "Reset"), 1)
              ])) : _("", !0)
            ], 512), [
              [ye, !l.value && !t.value]
            ]),
            J(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[3] || (r[3] = (q) => t.value = !1)
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
                a("span", null, C((y = j(n).add_search_fields) != null ? y : "Add search field"), 1)
              ]),
              (f(!0), v(se, null, ae(e.actions.searchFields.searchInputs, (q, x) => (f(), v("button", {
                key: x,
                dusk: `add-search-row-${q.key}`,
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                role: "menuitem",
                onClick: Q((h) => e.actions.searchFields.onClick(q.key), ["prevent"])
              }, C(q.label), 9, ss))), 128))
            ], 512), [
              [ye, t.value]
            ]),
            J(a("div", null, [
              a("button", {
                type: "button",
                class: "text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center",
                onClick: r[4] || (r[4] = (q) => l.value = !1)
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
                a("span", null, C((z = j(n).show_hide_columns) != null ? z : "Show / Hide columns"), 1)
              ]),
              a("div", as, [
                re(Bt, {
                  columns: e.actions.toggleColumns.columns,
                  "can-sort": !0,
                  onColumnsChanged: i
                }, null, 8, ["columns"])
              ])
            ], 512), [
              [ye, l.value]
            ]),
            J(a("div", null, [
              E(m.$slots, "default")
            ], 512), [
              [ye, !l.value && !t.value]
            ])
          ])
        ];
      }),
      _: 3
    }, 8, ["color"]));
  }
};
function us(e) {
  const n = O(!1), o = O(null), l = O(0), t = O(0), s = er({}), i = () => {
    const w = tr(e) ? j(e) : e;
    return w ? `${w}-columnWidths` : null;
  }, m = () => {
    const w = i();
    if (!w)
      return;
    const S = localStorage.getItem(w);
    if (S)
      try {
        const I = JSON.parse(S);
        Object.assign(s, I);
      } catch (I) {
        console.warn("Unable to load column widths:", I);
      }
  }, r = () => {
    const w = i();
    !w || localStorage.setItem(w, JSON.stringify(s));
  }, u = (w, S) => {
    w.preventDefault(), w.stopPropagation(), n.value = !0, o.value = S, l.value = w.clientX;
    const I = w.target.closest("th");
    t.value = I.offsetWidth;
    const R = I.closest("table");
    R && R.querySelectorAll("thead th[data-column-key]").forEach((G) => {
      const X = G.getAttribute("data-column-key"), P = G.offsetWidth;
      s[X] || (s[X] = P), G.style.width = `${s[X]}px`;
      const Y = Array.from(G.parentNode.children).indexOf(G);
      R.querySelectorAll("tbody tr").forEach(($e) => {
        const ce = $e.children[Y];
        ce && (ce.style.width = `${s[X]}px`);
      });
    }), document.addEventListener("mousemove", d), document.addEventListener("mouseup", b), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", document.body.classList.add("is-resizing-columns");
  }, d = (w) => {
    if (!n.value || !o.value)
      return;
    const S = w.clientX - l.value, I = Math.max(50, t.value + S);
    s[o.value] = I;
    const R = document.querySelector(`th[data-column-key="${o.value}"]`);
    if (R) {
      R.style.width = `${I}px`;
      const W = R.closest("table");
      if (W) {
        const G = Array.from(R.parentNode.children).indexOf(R);
        W.querySelectorAll("tbody tr").forEach((P) => {
          const Y = P.children[G];
          Y && (Y.style.width = `${I}px`);
        });
      }
    }
  }, b = () => {
    n.value && (n.value = !1, o.value = null, r(), document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", b), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  }, y = (w) => s[w] || "auto", z = (w, S) => {
    s[w] = S, r();
  }, q = (w) => {
    if (!w)
      return;
    w.querySelectorAll("thead th[data-column-key]").forEach((I) => {
      const R = I.getAttribute("data-column-key");
      if (!s[R]) {
        const X = I.offsetWidth;
        s[R] = Math.max(X, 100);
      }
      I.style.width = `${s[R]}px`;
      const W = Array.from(I.parentNode.children).indexOf(I);
      w.querySelectorAll("tbody tr").forEach((X) => {
        const P = X.children[W];
        P && (P.style.width = `${s[R]}px`);
      });
    });
  }, x = () => {
    Object.keys(s).forEach((S) => {
      delete s[S];
    });
    const w = i();
    w && localStorage.removeItem(w);
  }, h = () => {
    n.value && (document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", b), document.body.style.userSelect = "", document.body.style.cursor = "", document.body.classList.remove("is-resizing-columns"));
  };
  return he(() => {
    m();
  }), Ye(() => {
    h();
  }), {
    isResizing: n,
    resizingColumn: o,
    columnWidths: s,
    startResize: u,
    getColumnWidth: y,
    setColumnWidth: z,
    resetColumnWidths: x,
    loadColumnWidths: m,
    saveColumnWidths: r,
    initializeColumnWidths: q
  };
}
const cs = ["dusk"], ds = { class: "flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0 space-x-2" }, fs = {
  key: 0,
  class: "flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0"
}, ms = {
  key: 0,
  class: "mr-4 sm:mr-0"
}, gs = ["href"], hs = { class: "overflow-x-auto" }, ps = { class: "bg-gray-50" }, vs = {
  key: 0,
  class: "text-left text-sm font-semibold text-gray-900 relative resize-border pinned-checkbox-header",
  style: { width: "60px" }
}, bs = ["id"], ys = { class: "divide-y divide-gray-200 bg-white" }, xs = {
  key: 0,
  class: "whitespace-nowrap text-sm text-gray-500 pinned-checkbox",
  style: { width: "60px" }
}, ws = ["id", "onUpdate:modelValue"], ks = ["onClick", "data-column-key"], Cs = { class: "flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200" }, _s = {
  key: 0,
  class: "italic text-sm px-2"
}, Ss = {
  key: 1,
  class: "flex justify-center py-4"
}, $s = {
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
    },
    localStorageName: {
      type: String,
      default: null,
      required: !1
    }
  },
  emits: ["rowClicked", "selectionChanged"],
  setup(e, { emit: n }) {
    const o = xe(), l = n, t = e, s = L(() => t.localStorageName ? t.localStorageName : t.name && t.name !== "default" ? `table-${t.name}` : null);
    rr();
    const i = t.resizeableColumns ? us(s) : null;
    or("columnResize", i);
    const m = O(!1), r = L(() => ht().props.queryBuilderProps ? { ...ht().props.queryBuilderProps[t.name] } : {}), u = O(r.value), d = O([]), b = O(null), y = O(null), z = O(!1);
    let q;
    const x = L(() => r.value.pageName), h = O([]), w = O(null), S = O(!1), I = L(() => r.value.hasToggleableColumns || r.value.hasFilters || r.value.hasSearchInputs ? !1 : !r.value.globalSearch), R = L(() => r.value.infiniteScrolling ? d.value : Object.keys(t.resource).length === 0 ? t.data : "data" in t.resource ? t.resource.data : t.resource), W = L(() => Object.keys(t.resource).length === 0 ? t.meta : "links" in t.resource && "meta" in t.resource && Object.keys(t.resource.links).length === 4 && "next" in t.resource.links && "prev" in t.resource.links ? {
      ...t.resource.meta,
      next_page_url: t.resource.links.next,
      prev_page_url: t.resource.links.prev
    } : "meta" in t.resource ? t.resource.meta : t.resource), G = L(() => R.value.length > 0 ? !0 : W.value.total > 0), X = O({
      reset: {
        onClick: Me
      },
      toggleColumns: {
        show: r.value.hasToggleableColumns,
        columns: r.value.columns,
        onChange: qe
      },
      searchFields: {
        show: r.value.hasSearchInputs && !t.hideSearchInputsAboveTable,
        searchInputs: r.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: r.value.hasSearchInputsWithoutValue,
        onClick: Y
      }
    });
    function P(c) {
      h.value = h.value.filter((g) => g != c), ne(c, null);
    }
    function Y(c) {
      h.value.push(c);
    }
    const Se = L(() => {
      if (h.value.length > 0)
        return !0;
      const c = Ze.parse(location.search.substring(1));
      if (c[x.value] > 1)
        return !0;
      const p = t.name === "default" ? "" : t.name + "_";
      let T = !1;
      return ve(["filter", "columns", "cursor", "sort"], (k) => {
        const D = c[p + k];
        k === "sort" && D === r.value.defaultSort || D !== void 0 && (T = !0);
      }), T;
    }), $e = (c, g) => {
      let p = [];
      if (t.striped && g % 2 && p.push("bg-gray-50"), t.striped ? p.push("hover:bg-gray-100") : p.push("hover:bg-gray-50"), t.rowClass && typeof t.rowClass == "function") {
        const T = t.rowClass(c);
        T && p.push(T);
      }
      return p.join(" ");
    }, ce = L(() => {
      if (!t.showExportButton)
        return null;
      const c = new URL(window.location.href);
      c.search = "";
      const g = new URLSearchParams();
      if (r.value.page && r.value.page > 1 && g.set(x.value, r.value.page), r.value.sort) {
        const k = t.name === "default" ? "sort" : `${t.name}_sort`;
        g.set(k, r.value.sort);
      }
      const p = {};
      if (u.value.filters.forEach((k) => {
        k.value !== null && k.value !== void 0 && k.value !== "" && (p[k.key] = k.value);
      }), u.value.searchInputs.forEach((k) => {
        k.value !== null && k.value !== void 0 && k.value !== "" && (p[k.key] = k.value);
      }), Object.keys(p).length > 0) {
        const k = t.name === "default" ? "filter" : `${t.name}_filter`;
        Object.keys(p).forEach((D) => {
          const ee = p[D];
          Array.isArray(ee) ? ee.forEach((Ne, Je) => {
            g.set(`${k}[${D}][${Je}]`, Ne);
          }) : typeof ee == "object" && ee !== null ? Object.keys(ee).forEach((Ne) => {
            g.set(`${k}[${D}][${Ne}]`, ee[Ne]);
          }) : g.set(`${k}[${D}]`, ee);
        });
      }
      const T = u.value.columns.filter((k) => !k.hidden).map((k) => k.key);
      if (T.length !== u.value.columns.length) {
        const k = t.name === "default" ? "columns" : `${t.name}_columns`;
        T.forEach((D) => {
          g.append(`${k}[]`, D);
        });
      }
      if (r.value.perPageOptions && r.value.perPageOptions.length > 0) {
        const k = new URLSearchParams(window.location.search).get("perPage") || r.value.perPageOptions[0];
        k && k !== r.value.perPageOptions[0] && g.set("perPage", k);
      }
      return g.set("do_export", "1"), g.set("table", t.name || "default"), c.search = g.toString(), c.toString();
    });
    function Me() {
      h.value = [], ve(u.value.filters, (c, g) => {
        u.value.filters[g].value = null;
      }), ve(u.value.searchInputs, (c, g) => {
        u.value.searchInputs[g].value = null;
      }), ve(u.value.columns, (c, g) => {
        u.value.columns[g].hidden = c.can_be_hidden ? !r.value.defaultVisibleToggleableColumns.includes(c.key) : !1, u.value.columns[g].pinned = !1;
      }), s.value && localStorage.removeItem(`${s.value}-columns`), t.resizeableColumns && i && i.resetColumnWidths(), u.value.sort = null, u.value.cursor = null, u.value.page = 1;
    }
    const ze = {};
    function ne(c, g) {
      clearTimeout(ze[c]), ze[c] = setTimeout(() => {
        Ie.value && t.preventOverlappingRequests && Ie.value.cancel();
        const p = we("searchInputs", c);
        u.value.searchInputs[p].value = g, u.value.cursor = null, u.value.page = 1;
      }, t.inputDebounceMs);
    }
    function le(c) {
      ne("global", c);
    }
    function ue(c, g) {
      const p = we("filters", c);
      u.value.filters[p].value = g, u.value.cursor = null, u.value.page = 1;
    }
    function F(c) {
      u.value.cursor = null, u.value.perPage = c, u.value.page = 1;
    }
    function we(c, g) {
      return pr(u.value[c], (p) => p.key == g);
    }
    function qe(c) {
      u.value.columns = c, u.value.columns.sort((g, p) => g.pinned && !p.pinned ? -1 : !g.pinned && p.pinned ? 1 : 0), Ve();
    }
    function Ve() {
      if (!s.value)
        return;
      const c = u.value.columns.map((g, p) => ({
        key: g.key,
        hidden: g.hidden,
        pinned: g.pinned || !1,
        order: p
      }));
      localStorage.setItem(`${s.value}-columns`, JSON.stringify(c));
    }
    function Le() {
      let c = {};
      return ve(u.value.searchInputs, (g) => {
        g.value !== null && (c[g.key] = g.value);
      }), ve(u.value.filters, (g) => {
        let p = g.value;
        p !== null && (g.type === "number_range" && Number(Math.max(...g.value)) === Number(g.max) && Number(Math.min(...g.value)) === Number(g.min) && (p = null), c[g.key] = p);
      }), c;
    }
    function Z() {
      const c = u.value.columns;
      let g = hr(c, (T) => !T.hidden), p = br(g, (T) => T.key).sort();
      return vr(p, r.value.defaultVisibleToggleableColumns) ? {} : p;
    }
    function te() {
      const c = Le(), g = Z(), p = {};
      Object.keys(c).length > 0 && (p.filter = c), Object.keys(g).length > 0 && (p.columns = g);
      const T = u.value.cursor, k = u.value.page, D = u.value.sort, ee = u.value.perPage;
      return T && (p.cursor = T), k > 1 && (p.page = k), ee > 1 && (p.perPage = ee), D && (p.sort = D), p;
    }
    function ke(c) {
      if (!c)
        return null;
      if (t.paginationClickCallback && typeof t.paginationClickCallback == "function") {
        t.paginationClickCallback(c);
        return;
      }
      Ce(c);
    }
    function We() {
      const c = Ze.parse(location.search.substring(1)), g = t.name === "default" ? "" : t.name + "_";
      ve(["filter", "columns", "cursor", "sort"], (T) => {
        delete c[g + T];
      }), delete c[x.value], ve(te(), (T, k) => {
        k === "page" ? c[x.value] = T : k === "perPage" ? c.perPage = T : c[g + k] = T;
      });
      let p = Ze.stringify(c, {
        filter(T, k) {
          return typeof k == "object" && k !== null ? yr(k) : k;
        },
        skipNulls: !0,
        strictNullHandling: !0
      });
      return (!p || p === x.value + "=1") && (p = ""), p;
    }
    const U = O(!1), Ie = O(null);
    function Ce(c) {
      !c || xr.get(
        c,
        {},
        {
          replace: !0,
          preserveState: !0,
          preserveScroll: t.preserveScroll !== !1,
          onBefore() {
            U.value = !0;
          },
          onCancelToken(g) {
            Ie.value = g;
          },
          onFinish() {
            U.value = !1;
          },
          onSuccess() {
            if (t.preserveScroll === "table-top") {
              const p = w.value.getBoundingClientRect().top + window.pageYOffset + -8;
              window.scrollTo({ top: p });
            }
          }
        }
      );
    }
    function Te(c, g, p) {
      var T;
      t.hasCheckboxes && ((T = c.target) == null ? void 0 : T.parentElement.cellIndex) === 0 || l("rowClicked", c, g, p);
    }
    async function Ee() {
      if (!(z.value || !b.value)) {
        z.value = !0;
        try {
          const c = await fetch(b.value, {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest"
            }
          });
          if (!c.ok)
            throw new Error("Network response was not ok");
          const g = await c.json();
          d.value = [...d.value, ...g.data], b.value = g.next_page_url;
        } catch (c) {
          console.error("Error loading more data:", c);
        } finally {
          z.value = !1;
        }
      }
    }
    function pe() {
      !r.value.infiniteScrolling || !y.value || (q && (q.disconnect(), q = null), t.resource && t.resource.data && d.value.length === 0 && (d.value = [...t.resource.data], b.value = W.value.next_page_url || null), q = new IntersectionObserver(
        (c) => {
          c.forEach((g) => {
            g.isIntersecting && Ee();
          });
        },
        {
          rootMargin: "0px 0px 100px 0px",
          threshold: 0.1
        }
      ), q.observe(y.value));
    }
    ge(u, () => {
      r.value.infiniteScrolling && (d.value = [], b.value = null), Ce(location.pathname + "?" + We()), S.value = !1;
    }, { deep: !0 }), ge(() => t.resource, () => {
      var c;
      if (!r.value.infiniteScrolling && ((c = t.resource) == null ? void 0 : c.data)) {
        const g = t.resource.data.filter((p) => p.__itSelected);
        l("selectionChanged", g);
      }
    }, { deep: !0 }), ge(() => r.value, (c) => {
      var p;
      if (!r.value.infiniteScrolling)
        return;
      const g = ((p = t.resource) == null ? void 0 : p.data) || [];
      if (g.length > 0) {
        d.value = [...g], b.value = W.value.next_page_url || null;
        const T = g.filter((k) => k.__itSelected);
        l("selectionChanged", T), setTimeout(() => {
          y.value && pe();
        }, 100);
      }
    }, { deep: !0 });
    const lt = () => {
      t.resizeableColumns && i && setTimeout(() => {
        var g;
        const c = (g = w.value) == null ? void 0 : g.querySelector("table");
        c && i.initializeColumnWidths(c);
      }, 0), r.value.infiniteScrolling && setTimeout(() => {
        y.value && pe();
      }, 100);
    };
    he(() => {
      document.addEventListener("inertia:success", lt), Vt(), t.resizeableColumns && i && setTimeout(() => {
        var g;
        const c = (g = w.value) == null ? void 0 : g.querySelector("table");
        c && i.initializeColumnWidths(c);
      }, 0), r.value.infiniteScrolling && pe();
    });
    function Vt() {
      if (!s.value)
        return;
      const c = localStorage.getItem(`${s.value}-columns`);
      if (!!c)
        try {
          const g = JSON.parse(c);
          if (g.length > 0 && "order" in g[0]) {
            const p = new Map(g.map((T) => [T.key, T]));
            u.value.columns.forEach((T, k) => {
              const D = p.get(T.key);
              D && (u.value.columns[k].hidden = D.hidden, u.value.columns[k].pinned = D.pinned || !1);
            }), u.value.columns.sort((T, k) => {
              var dt, ft;
              const D = p.get(T.key), ee = p.get(k.key);
              if (T.pinned && !k.pinned)
                return -1;
              if (!T.pinned && k.pinned)
                return 1;
              const Ne = (dt = D == null ? void 0 : D.order) != null ? dt : 999, Je = (ft = ee == null ? void 0 : ee.order) != null ? ft : 999;
              return Ne - Je;
            });
          } else
            g.forEach((p, T) => {
              const k = u.value.columns.findIndex((D) => D.key === p.key);
              k !== -1 && (u.value.columns[k].hidden = p.hidden, u.value.columns[k].pinned = p.pinned || !1);
            });
        } catch (g) {
          console.warn("Error loading column order from localStorage:", g);
        }
    }
    Ye(() => {
      document.removeEventListener("inertia:success", lt), q && (q.disconnect(), q = null);
    });
    function st(c) {
      u.value.sort == c ? u.value.sort = `-${c}` : u.value.sort = c, u.value.cursor = null, u.value.page = 1;
    }
    function De(c) {
      const g = we("columns", c);
      return !u.value.columns[g].hidden;
    }
    function Ge(c) {
      const g = we("columns", c), p = gr(u.value.columns[g]);
      p.onSort = st, p.filters = u.value.filters.filter(
        (k) => k.key === c || k.key.startsWith(c + "_") || k.key.includes(c)
      );
      const T = u.value.searchInputs.filter(
        (k) => k.key === c
      );
      return T.length > 0 ? (p.searchable = !0, p.searchInputs = T) : (p.searchable = !1, p.searchInputs = []), p.onFilterChange = ue, p.onSearchChange = ne, p.color = t.color, p;
    }
    function Wt() {
      t.resource.data.forEach((c) => {
        c.__itSelected = S.value;
      });
    }
    function Dt(c) {
      if (!t.resizeableColumns || !i)
        return "auto";
      const g = i.getColumnWidth(c);
      return g === "auto" ? g : `${g}px`;
    }
    function at(c) {
      if (!t.resizeableColumns || !i)
        return "0px";
      let g = 0;
      const p = u.value.columns.filter((T) => !T.hidden);
      t.hasCheckboxes && (g += 60);
      for (const T of p) {
        if (T.key === c)
          break;
        if (T.pinned) {
          const k = i.getColumnWidth(T.key);
          g += k === "auto" ? 150 : k;
        }
      }
      return `${g}px`;
    }
    function it(c) {
      const g = u.value.columns.find((p) => p.key === c);
      return g && g.pinned;
    }
    function Gt(c) {
      return it(c) ? {
        position: "sticky",
        left: at(c),
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    function Ut(c) {
      return it(c) ? {
        position: "sticky",
        left: at(c),
        zIndex: 11,
        backgroundColor: "#f9fafb",
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      } : {};
    }
    const Ht = L(() => {
      if (!t.resizeableColumns || !i)
        return "100%";
      let c = 0, g = !1;
      return t.hasCheckboxes && (c += 60), r.value.columns.forEach((p) => {
        if (!De(p.key))
          return;
        const T = i.getColumnWidth(p.key);
        T === "auto" ? g = !0 : c += T;
      }), !g && c > 0 ? `${c}px` : "max(100%, " + (c > 0 ? c + "px" : "800px") + ")";
    }), ut = L(() => R.value.filter((c) => c.__itSelected)), ct = L(() => ut.value.length), Kt = L(() => ct.value === 0 ? o.noLineSelected : `${ct.value} ${o.lineSelected}`);
    function Xt() {
      t.resizeableColumns && (m.value = !0);
    }
    function Yt() {
      t.resizeableColumns && setTimeout(() => {
        m.value = !1;
      }, 100);
    }
    return (c, g) => (f(), B(nr, null, {
      default: H(() => [
        (f(), v("fieldset", {
          ref_key: "tableFieldset",
          ref: w,
          key: `table-${e.name}`,
          dusk: `table-${e.name}`,
          class: N(["min-w-0", { "opacity-75": U.value }])
        }, [
          a("div", ds, [
            r.value.globalSearch ? (f(), v("div", fs, [
              E(c.$slots, "tableGlobalSearch", {
                hasGlobalSearch: r.value.globalSearch,
                label: r.value.globalSearch ? r.value.globalSearch.label : null,
                value: r.value.globalSearch ? r.value.globalSearch.value : null,
                onChange: le
              }, () => [
                r.value.globalSearch ? (f(), B(Dl, {
                  key: 0,
                  class: "grow",
                  label: r.value.globalSearch.label,
                  value: r.value.globalSearch.value,
                  "on-change": le,
                  color: e.color
                }, null, 8, ["label", "value", "color"])) : _("", !0)
              ], !0)
            ])) : _("", !0),
            a("div", null, [
              E(c.$slots, "tableFilter", {
                hasFilters: r.value.hasFilters,
                hasEnabledFilters: r.value.hasEnabledFilters,
                filters: r.value.filters,
                onFilterChange: ue
              }, () => [
                r.value.hasFilters ? (f(), B(Bl, {
                  key: 0,
                  "has-enabled-filters": r.value.hasEnabledFilters,
                  filters: r.value.filters,
                  "on-filter-change": ue,
                  color: e.color
                }, null, 8, ["has-enabled-filters", "filters", "color"])) : _("", !0)
              ], !0)
            ]),
            !e.withGroupedMenu && !e.hideSearchInputsAboveTable ? E(c.$slots, "tableAddSearchRow", {
              key: 1,
              hasSearchInputs: r.value.hasSearchInputs,
              hasSearchInputsWithoutValue: r.value.hasSearchInputsWithoutValue,
              searchInputs: r.value.searchInputsWithoutGlobal,
              onAdd: Y
            }, () => [
              r.value.hasSearchInputs ? (f(), B(xl, {
                key: 0,
                "search-inputs": r.value.searchInputsWithoutGlobal,
                "has-search-inputs-without-value": r.value.hasSearchInputsWithoutValue,
                "on-add": Y,
                color: e.color
              }, null, 8, ["search-inputs", "has-search-inputs-without-value", "color"])) : _("", !0)
            ], !0) : _("", !0),
            e.withGroupedMenu ? _("", !0) : E(c.$slots, "tableColumns", {
              key: 2,
              hasColumns: r.value.hasToggleableColumns,
              columns: u.value.columns,
              hasHiddenColumns: r.value.hasHiddenColumns,
              onChange: qe
            }, () => [
              r.value.hasToggleableColumns ? (f(), B(Tl, {
                key: 0,
                columns: u.value.columns,
                "has-hidden-columns": r.value.hasHiddenColumns,
                "on-change": qe,
                "table-name": e.name,
                color: e.color
              }, null, 8, ["columns", "has-hidden-columns", "table-name", "color"])) : _("", !0)
            ], !0),
            e.withGroupedMenu ? E(c.$slots, "groupedAction", {
              key: 3,
              actions: X.value
            }, () => [
              re(is, {
                color: e.color,
                actions: X.value
              }, {
                default: H(() => [
                  E(c.$slots, "bulk-actions", {}, void 0, !0)
                ]),
                _: 3
              }, 8, ["color", "actions"])
            ], !0) : _("", !0),
            e.withGroupedMenu ? _("", !0) : E(c.$slots, "tableReset", {
              key: 4,
              canBeReset: Se.value,
              onClick: Me
            }, () => [
              Se.value ? (f(), v("div", ms, [
                re(Ql, {
                  "on-click": Me,
                  color: e.color
                }, null, 8, ["color"])
              ])) : _("", !0)
            ], !0),
            e.showExportButton ? E(c.$slots, "exportButton", {
              key: 5,
              exportUrl: ce.value,
              translations: j(o)
            }, () => [
              a("a", {
                href: ce.value,
                class: "relative flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              }, [...g[3] || (g[3] = [
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
              ])], 8, gs)
            ], !0) : _("", !0)
          ]),
          e.hideSearchInputsAboveTable ? _("", !0) : E(c.$slots, "tableSearchRows", {
            key: 0,
            hasSearchRowsWithValue: r.value.hasSearchInputsWithValue,
            searchInputs: r.value.searchInputsWithoutGlobal,
            forcedVisibleSearchInputs: h.value,
            onChange: ne
          }, () => [
            r.value.hasSearchInputsWithValue || h.value.length > 0 ? (f(), B(Yl, {
              key: 0,
              "search-inputs": r.value.searchInputsWithoutGlobal,
              "forced-visible-search-inputs": h.value,
              "on-change": ne,
              "on-remove": P,
              color: e.color
            }, null, 8, ["search-inputs", "forced-visible-search-inputs", "color"])) : _("", !0)
          ], !0),
          E(c.$slots, "tableWrapper", { meta: W.value }, () => [
            re(ns, {
              class: N({ "mt-3": !I.value })
            }, {
              default: H(() => [
                E(c.$slots, "table", {}, () => [
                  a("div", hs, [
                    a("table", {
                      class: N(["divide-y divide-gray-300", { "show-resize-indicators": e.resizeableColumns && m.value }]),
                      style: fe([{ "table-layout": "fixed", "min-width": "100%" }, { width: Ht.value }]),
                      onMouseenter: g[1] || (g[1] = (p) => e.resizeableColumns ? Xt : null),
                      onMouseleave: g[2] || (g[2] = (p) => e.resizeableColumns ? Yt : null)
                    }, [
                      a("thead", ps, [
                        E(c.$slots, "head", {
                          show: De,
                          sortBy: st,
                          header: Ge
                        }, () => [
                          a("tr", null, [
                            e.hasCheckboxes ? (f(), v("th", vs, [
                              J(a("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-header`,
                                onChange: Wt,
                                "onUpdate:modelValue": g[0] || (g[0] = (p) => S.value = p),
                                class: "rounded-sm mr-1 border-gray-300 m-1"
                              }, null, 40, bs), [
                                [gt, S.value]
                              ])
                            ])) : _("", !0),
                            (f(!0), v(se, null, ae(u.value.columns, (p) => (f(), B(tl, {
                              cell: Ge(p.key),
                              style: fe(Ut(p.key))
                            }, {
                              label: H(() => [
                                E(c.$slots, `header(${p.key})`, {
                                  label: Ge(p.key).label,
                                  column: Ge(p.key)
                                }, void 0, !0)
                              ]),
                              _: 2
                            }, 1032, ["cell", "style"]))), 256))
                          ])
                        ], !0)
                      ]),
                      a("tbody", ys, [
                        E(c.$slots, "body", { show: De }, () => [
                          (f(!0), v(se, null, ae(R.value, (p, T) => (f(), v("tr", {
                            key: `table-${e.name}-row-${T}`,
                            class: N($e(p, T))
                          }, [
                            e.hasCheckboxes ? (f(), v("td", xs, [
                              J(a("input", {
                                type: "checkbox",
                                id: `table-${e.name}-select-${T}`,
                                class: "rounded-sm m-1 border-gray-300",
                                "onUpdate:modelValue": (k) => p.__itSelected = k
                              }, null, 8, ws), [
                                [gt, p.__itSelected]
                              ])
                            ])) : _("", !0),
                            (f(!0), v(se, null, ae(u.value.columns, (k, D) => J((f(), v("td", {
                              key: `table-${e.name}-row-${T}-column-${k.key}`,
                              onClick: (ee) => Te(ee, p, k.key),
                              class: N(k.body_class),
                              "data-column-key": k.key,
                              style: fe({
                                width: Dt(k.key),
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                ...Gt(k.key)
                              })
                            }, [
                              E(c.$slots, `cell(${k.key})`, { item: p }, () => [
                                me(C(p[k.key]), 1)
                              ], !0)
                            ], 14, ks)), [
                              [ye, De(k.key)]
                            ])), 128))
                          ], 2))), 128))
                        ], !0)
                      ])
                    ], 38)
                  ])
                ], !0),
                a("div", {
                  ref_key: "intersectElement",
                  ref: y,
                  style: { height: "1px", width: "100%" }
                }, null, 512),
                r.value.infiniteScrolling ? _("", !0) : E(c.$slots, "pagination", {
                  key: 0,
                  onClick: ke,
                  hasData: G.value,
                  meta: W.value,
                  perPageOptions: r.value.perPageOptions,
                  onPerPageChange: F,
                  showExportButton: e.showExportButton
                }, () => [
                  a("div", Cs, [
                    e.hasCheckboxes ? (f(), v("span", _s, C(Kt.value), 1)) : _("", !0),
                    re(vl, {
                      "on-click": ke,
                      "has-data": G.value,
                      meta: W.value,
                      "per-page-options": r.value.perPageOptions,
                      "on-per-page-change": F,
                      color: e.color,
                      "show-export-button": e.showExportButton
                    }, {
                      exportButton: H((p) => [
                        E(c.$slots, "exportButton", lr(sr(p)), void 0, !0)
                      ]),
                      _: 3
                    }, 8, ["has-data", "meta", "per-page-options", "color", "show-export-button"])
                  ])
                ], !0),
                r.value.infiniteScrolling && z.value ? (f(), v("div", Ss, [...g[4] || (g[4] = [
                  a("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" }, null, -1)
                ])])) : _("", !0)
              ]),
              _: 3
            }, 8, ["class"])
          ], !0),
          E(c.$slots, "tableSummary", {
            data: R.value,
            meta: W.value,
            selectedItems: ut.value
          }, void 0, !0)
        ], 10, cs))
      ]),
      _: 3
    }));
  }
}, Us = /* @__PURE__ */ Re($s, [["__scopeId", "data-v-f8c91696"]]);
export {
  Qe as ButtonWithDropdown,
  tl as HeaderCell,
  wr as OnClickOutside,
  vl as Pagination,
  Us as Table,
  xl as TableAddSearchRow,
  Tl as TableColumns,
  Bl as TableFilter,
  Dl as TableGlobalSearch,
  Ql as TableReset,
  Yl as TableSearchRows,
  ns as TableWrapper,
  xe as getTranslations,
  Ds as setTranslation,
  Gs as setTranslations
};
