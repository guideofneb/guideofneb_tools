var y = function(e) {
    this.value = e;
};
y.math = {
    isDegree: !0,
    acos: function(e) {
        return y.math.isDegree ? 180 / Math.PI * Math.acos(e) : Math.acos(e);
    },
    add: function(e, t) {
        return e + t;
    },
    asin: function(e) {
        return y.math.isDegree ? 180 / Math.PI * Math.asin(e) : Math.asin(e);
    },
    atan: function(e) {
        return y.math.isDegree ? 180 / Math.PI * Math.atan(e) : Math.atan(e);
    },
    acosh: function(e) {
        return Math.log(e + Math.sqrt(e * e - 1));
    },
    asinh: function(e) {
        return Math.log(e + Math.sqrt(e * e + 1));
    },
    atanh: function(e) {
        return Math.log((1 + e) / (1 - e));
    },
    C: function(e, t) {
        var h = 1, u = e - t, n = t;
        n < u && (n = u, u = t);
        for(var a = n + 1; a <= e; a++)h *= a;
        return h / y.math.fact(u);
    },
    changeSign: function(e) {
        return -e;
    },
    cos: function(e) {
        return y.math.isDegree && (e = y.math.toRadian(e)), Math.cos(e);
    },
    cosh: function(e) {
        return (Math.pow(Math.E, e) + Math.pow(Math.E, -1 * e)) / 2;
    },
    div: function(e, t) {
        return e / t;
    },
    fact: function(e) {
        if (e % 1 !== 0) return "NaN";
        for(var t = 1, h = 2; h <= e; h++)t *= h;
        return t;
    },
    inverse: function(e) {
        return 1 / e;
    },
    log: function(e) {
        return Math.log(e) / Math.log(10);
    },
    mod: function(e, t) {
        return e % t;
    },
    mul: function(e, t) {
        return e * t;
    },
    P: function(e, t) {
        for(var h = 1, u = Math.floor(e) - Math.floor(t) + 1; u <= Math.floor(e); u++)h *= u;
        return h;
    },
    Pi: function(e, t, h) {
        for(var u = 1, n = e; n <= t; n++)u *= Number(h.postfixEval({
            n
        }));
        return u;
    },
    pow10x: function(e) {
        for(var t = 1; e--;)t *= 10;
        return t;
    },
    sigma: function(e, t, h) {
        for(var u = 0, n = e; n <= t; n++)u += Number(h.postfixEval({
            n
        }));
        return u;
    },
    sin: function(e) {
        return y.math.isDegree && (e = y.math.toRadian(e)), Math.sin(e);
    },
    sinh: function(e) {
        return (Math.pow(Math.E, e) - Math.pow(Math.E, -1 * e)) / 2;
    },
    sub: function(e, t) {
        return e - t;
    },
    tan: function(e) {
        return y.math.isDegree && (e = y.math.toRadian(e)), Math.tan(e);
    },
    tanh: function(e) {
        return y.sinha(e) / y.cosha(e);
    },
    toRadian: function(e) {
        return e * Math.PI / 180;
    }
}, y.Exception = function(e) {
    this.message = e;
};
var p = y;
function v(e, t) {
    for(var h = 0; h < e.length; h++)e[h] += t;
    return e;
}
var D = [
    "sin",
    "cos",
    "tan",
    "pi",
    "(",
    ")",
    "P",
    "C",
    " ",
    "asin",
    "acos",
    "atan",
    "7",
    "8",
    "9",
    "int",
    "cosh",
    "acosh",
    "ln",
    "^",
    "root",
    "4",
    "5",
    "6",
    "/",
    "!",
    "tanh",
    "atanh",
    "Mod",
    "1",
    "2",
    "3",
    "*",
    "sinh",
    "asinh",
    "e",
    "log",
    "0",
    ".",
    "+",
    "-",
    ",",
    "Sigma",
    "n",
    "Pi",
    "pow"
], A = [
    "sin",
    "cos",
    "tan",
    "&pi;",
    "(",
    ")",
    "P",
    "C",
    " ",
    "asin",
    "acos",
    "atan",
    "7",
    "8",
    "9",
    "Int",
    "cosh",
    "acosh",
    " ln",
    "^",
    "root",
    "4",
    "5",
    "6",
    "&divide;",
    "!",
    "tanh",
    "atanh",
    " Mod ",
    "1",
    "2",
    "3",
    "&times;",
    "sinh",
    "asinh",
    "e",
    " log",
    "0",
    ".",
    "+",
    "-",
    ",",
    "&Sigma;",
    "n",
    "&Pi;",
    "pow"
], _ = [
    p.math.sin,
    p.math.cos,
    p.math.tan,
    "PI",
    "(",
    ")",
    p.math.P,
    p.math.C,
    " ".anchor,
    p.math.asin,
    p.math.acos,
    p.math.atan,
    "7",
    "8",
    "9",
    Math.floor,
    p.math.cosh,
    p.math.acosh,
    Math.log,
    Math.pow,
    Math.sqrt,
    "4",
    "5",
    "6",
    p.math.div,
    p.math.fact,
    p.math.tanh,
    p.math.atanh,
    p.math.mod,
    "1",
    "2",
    "3",
    p.math.mul,
    p.math.sinh,
    p.math.asinh,
    "E",
    p.math.log,
    "0",
    ".",
    p.math.add,
    p.math.sub,
    ",",
    p.math.sigma,
    "n",
    p.math.Pi,
    Math.pow
], W = {
    0: 11,
    1: 0,
    2: 3,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 11,
    8: 11,
    9: 1,
    10: 10,
    11: 0,
    12: 11,
    13: 0,
    14: -1
}, R = [
    0,
    0,
    0,
    3,
    4,
    5,
    10,
    10,
    14,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    10,
    0,
    1,
    1,
    1,
    2,
    7,
    0,
    0,
    2,
    1,
    1,
    1,
    2,
    0,
    0,
    3,
    0,
    1,
    6,
    9,
    9,
    11,
    12,
    13,
    12,
    8
], d = {
    0: !0,
    1: !0,
    3: !0,
    4: !0,
    6: !0,
    8: !0,
    9: !0,
    12: !0,
    13: !0,
    14: !0
}, b = {
    0: !0,
    1: !0,
    2: !0,
    3: !0,
    4: !0,
    5: !0,
    6: !0,
    7: !0,
    8: !0,
    9: !0,
    10: !0,
    11: !0,
    12: !0,
    13: !0
}, k = {
    0: !0,
    3: !0,
    4: !0,
    8: !0,
    12: !0,
    13: !0
}, m = {
}, O = {
    0: !0,
    1: !0,
    3: !0,
    4: !0,
    6: !0,
    8: !0,
    12: !0,
    13: !0
}, B = {
    1: !0
}, c = [
    [],
    [
        "1",
        "2",
        "3",
        "7",
        "8",
        "9",
        "4",
        "5",
        "6",
        "+",
        "-",
        "*",
        "/",
        "(",
        ")",
        "^",
        "!",
        "P",
        "C",
        "e",
        "0",
        ".",
        ",",
        "n",
        " "
    ],
    [
        "pi",
        "ln",
        "Pi"
    ],
    [
        "sin",
        "cos",
        "tan",
        "Del",
        "int",
        "Mod",
        "log",
        "pow"
    ],
    [
        "asin",
        "acos",
        "atan",
        "cosh",
        "root",
        "tanh",
        "sinh"
    ],
    [
        "acosh",
        "atanh",
        "asinh",
        "Sigma"
    ]
];
function G(e, t, h, u) {
    for(var n = 0; n < u; n++)if (e[h + n] !== t[n]) return !1;
    return !0;
}
p.addToken = function(e) {
    for(var t = 0; t < e.length; t++){
        var h = e[t].token.length, u = -1;
        c[h] = c[h] || [];
        for(var n = 0; n < c[h].length; n++)if (e[t].token === c[h][n]) {
            u = D.indexOf(c[h][n]);
            break;
        }
        u === -1 ? (D.push(e[t].token), R.push(e[t].type), c.length <= e[t].token.length && (c[e[t].token.length] = []), c[e[t].token.length].push(e[t].token), _.push(e[t].value), A.push(e[t].show)) : (D[u] = e[t].token, R[u] = e[t].type, _[u] = e[t].value, A[u] = e[t].show);
    }
};
function H(e) {
    for(var t = [], h = e.length, u, n, a, o = 0; o < h; o++){
        if (o < h - 1 && e[o] === " " && e[o + 1] === " ") continue;
        for(u = "", n = e.length - o > c.length - 2 ? c.length - 1 : e.length - o; n > 0; n--){
            if (c[n] === void 0) continue;
            for(a = 0; a < c[n].length; a++)G(e, c[n][a], o, n) && (u = c[n][a], a = c[n].length, n = 0);
        }
        if (o += u.length - 1, u === "") throw new p.Exception("Can't understand after " + e.slice(o));
        var r = D.indexOf(u);
        t.push({
            index: r,
            token: u,
            type: R[r],
            eval: _[r],
            precedence: W[R[r]],
            show: A[r]
        });
    }
    return t;
}
p.lex = function(e, t) {
    var h = {
        value: p.math.changeSign,
        type: 0,
        pre: 21,
        show: "-"
    }, u = {
        value: ")",
        show: ")",
        type: 5,
        pre: 0
    }, n = {
        value: "(",
        type: 4,
        pre: 0,
        show: "("
    }, a = [
        n
    ], o = [], r = e, l = d, M = 0, i = m, q = "", w;
    typeof t != "undefined" && p.addToken(t);
    var g = {
    }, E = H(r);
    for(w = 0; w < E.length; w++){
        var P = E[w];
        if (P.type === 14) {
            if (w > 0 && w < E.length - 1 && E[w + 1].type === 1 && (E[w - 1].type === 1 || E[w - 1].type === 6)) throw new p.Exception("Unexpected Space");
            continue;
        }
        var L = P.index, C = P.token, s = P.type, I = P.eval, z = P.precedence, N = P.show, f = a[a.length - 1], x;
        for(x = o.length; (x--) && o[x] === 0;)if ([
            0,
            2,
            3,
            4,
            5,
            9,
            11,
            12,
            13
        ].indexOf(s) !== -1) {
            if (l[s] !== !0) throw console.log(e, P, E, l), new p.Exception(C + " is not allowed after " + q);
            a.push(u), l = b, i = O, v(o, -1).pop();
        }
        if (l[s] !== !0) throw new p.Exception(C + " is not allowed after " + q);
        if (i[s] === !0 && (s = 2, I = p.math.mul, N = "&times;", z = 3, w = w - C.length), g = {
            value: I,
            type: s,
            pre: z,
            show: N
        }, s === 0) l = d, i = m, v(o, 2).push(2), a.push(g), a.push(n);
        else if (s === 1) f.type === 1 ? (f.value += I, v(o, 1)) : a.push(g), l = b, i = k;
        else if (s === 2) l = d, i = m, v(o, 2), a.push(g);
        else if (s === 3) a.push(g), l = b, i = O;
        else if (s === 4) v(o, 1), M++, l = d, i = m, a.push(g);
        else if (s === 5) {
            if (!M) throw new p.Exception("Closing parenthesis are more than opening one, wait What!!!");
            M--, l = b, i = O, a.push(g), v(o, 1);
        } else if (s === 6) {
            if (f.hasDec) throw new p.Exception("Two decimals are not allowed in one number");
            f.type !== 1 && (f = {
                value: 0,
                type: 1,
                pre: 0
            }, a.push(f), v(o, -1)), l = B, v(o, 1), i = m, f.value += I, f.hasDec = !0;
        } else s === 7 && (l = b, i = O, v(o, 1), a.push(g));
        s === 8 ? (l = d, i = m, v(o, 4).push(4), a.push(g), a.push(n)) : s === 9 ? (f.type === 9 ? f.value === p.math.add ? (f.value = I, f.show = N, v(o, 1)) : f.value === p.math.sub && N === "-" && (f.value = p.math.add, f.show = "+", v(o, 1)) : f.type !== 5 && f.type !== 7 && f.type !== 1 && f.type !== 3 && f.type !== 13 ? C === "-" && (l = d, i = m, v(o, 2).push(2), a.push(h), a.push(n)) : (a.push(g), v(o, 2)), l = d, i = m) : s === 10 ? (l = d, i = m, v(o, 2), a.push(g)) : s === 11 ? (l = d, i = m, a.push(g)) : s === 12 ? (l = d, i = m, v(o, 6).push(6), a.push(g), a.push(n)) : s === 13 && (l = b, i = O, a.push(g)), v(o, -1), q = C;
    }
    for(x = o.length; (x--) && o[x] === 0;)a.push(u), v(o, -1).pop();
    if (l[5] !== !0) throw new p.Exception("complete the expression");
    for(; M--;)a.push(u);
    return a.push(u), new p(a);
};
var F = p;
F.prototype.toPostfix = function() {
    for(var e = [], t, h, u, n, a, o = [
        {
            value: "(",
            type: 4,
            pre: 0
        }
    ], r = this.value, l = 1; l < r.length; l++)if (r[l].type === 1 || r[l].type === 3 || r[l].type === 13) r[l].type === 1 && (r[l].value = Number(r[l].value)), e.push(r[l]);
    else if (r[l].type === 4) o.push(r[l]);
    else if (r[l].type === 5) for(; (h = o.pop()).type !== 4;)e.push(h);
    else if (r[l].type === 11) {
        for(; (h = o.pop()).type !== 4;)e.push(h);
        o.push(h);
    } else {
        t = r[l], n = t.pre, a = o[o.length - 1], u = a.pre;
        var M = a.value == "Math.pow" && t.value == "Math.pow";
        if (n > u) o.push(t);
        else {
            for(; u >= n && !M || M && n < u;)h = o.pop(), a = o[o.length - 1], e.push(h), u = a.pre, M = t.value == "Math.pow" && a.value == "Math.pow";
            o.push(t);
        }
    }
    return new F(e);
};
var S = F;
S.prototype.postfixEval = function(e) {
    e = e || {
    }, e.PI = Math.PI, e.E = Math.E;
    for(var t = [], h, u, n, a = this.value, o = typeof e.n != "undefined", r = 0; r < a.length; r++)a[r].type === 1 ? t.push({
        value: a[r].value,
        type: 1
    }) : a[r].type === 3 ? t.push({
        value: e[a[r].value],
        type: 1
    }) : a[r].type === 0 || a[r].type === 7 ? typeof t[t.length - 1].type == "undefined" ? t[t.length - 1].value.push(a[r]) : t[t.length - 1].value = a[r].value(t[t.length - 1].value) : a[r].type === 8 ? (h = t.pop(), u = t.pop(), t.push({
        type: 1,
        value: a[r].value(u.value, h.value)
    })) : a[r].type === 10 ? (h = t.pop(), u = t.pop(), typeof u.type == "undefined" ? (u.value = u.concat(h), u.value.push(a[r]), t.push(u)) : typeof h.type == "undefined" ? (h.unshift(u), h.push(a[r]), t.push(h)) : t.push({
        type: 1,
        value: a[r].value(u.value, h.value)
    })) : a[r].type === 2 || a[r].type === 9 ? (h = t.pop(), u = t.pop(), typeof u.type == "undefined" ? (u = u.concat(h), u.push(a[r]), t.push(u)) : typeof h.type == "undefined" ? (h.unshift(u), h.push(a[r]), t.push(h)) : t.push({
        type: 1,
        value: a[r].value(u.value, h.value)
    })) : a[r].type === 12 ? (h = t.pop(), typeof h.type != "undefined" && (h = [
        h
    ]), u = t.pop(), n = t.pop(), t.push({
        type: 1,
        value: a[r].value(n.value, u.value, new S(h))
    })) : a[r].type === 13 && (o ? t.push({
        value: e[a[r].value],
        type: 3
    }) : t.push([
        a[r]
    ]));
    if (t.length > 1) throw new S.Exception("Uncaught Syntax error");
    return t[0].value > 1000000000000000 ? "Infinity" : parseFloat(t[0].value.toFixed(15));
}, S.eval = function(e, t, h) {
    return typeof t == "undefined" ? this.lex(e).toPostfix().postfixEval() : typeof h == "undefined" ? typeof t.length != "undefined" ? this.lex(e, t).toPostfix().postfixEval() : this.lex(e).toPostfix().postfixEval(t) : this.lex(e, t).toPostfix().postfixEval(h);
};
var K = S;
K.prototype.formulaEval = function() {
    for(var e, t, h, u = [], n = this.value, a = 0; a < n.length; a++)n[a].type === 1 || n[a].type === 3 ? u.push({
        value: n[a].type === 3 ? n[a].show : n[a].value,
        type: 1
    }) : n[a].type === 13 ? u.push({
        value: n[a].show,
        type: 1
    }) : n[a].type === 0 ? u[u.length - 1] = {
        value: n[a].show + (n[a].show != "-" ? "(" : "") + u[u.length - 1].value + (n[a].show != "-" ? ")" : ""),
        type: 0
    } : n[a].type === 7 ? u[u.length - 1] = {
        value: (u[u.length - 1].type != 1 ? "(" : "") + u[u.length - 1].value + (u[u.length - 1].type != 1 ? ")" : "") + n[a].show,
        type: 7
    } : n[a].type === 10 ? (e = u.pop(), t = u.pop(), n[a].show === "P" || n[a].show === "C" ? u.push({
        value: "<sup>" + t.value + "</sup>" + n[a].show + "<sub>" + e.value + "</sub>",
        type: 10
    }) : u.push({
        value: (t.type != 1 ? "(" : "") + t.value + (t.type != 1 ? ")" : "") + "<sup>" + e.value + "</sup>",
        type: 1
    })) : n[a].type === 2 || n[a].type === 9 ? (e = u.pop(), t = u.pop(), u.push({
        value: (t.type != 1 ? "(" : "") + t.value + (t.type != 1 ? ")" : "") + n[a].show + (e.type != 1 ? "(" : "") + e.value + (e.type != 1 ? ")" : ""),
        type: n[a].type
    })) : n[a].type === 12 && (e = u.pop(), t = u.pop(), h = u.pop(), u.push({
        value: n[a].show + "(" + h.value + "," + t.value + "," + e.value + ")",
        type: 12
    }));
    return u[0].value;
};
var J = K;
export { J as default };
