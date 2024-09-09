"use strict";
(() => {
  let e = document.querySelector("div.preloader"),
    t = document.getElementById("selectopt"),
    n = document.querySelector("div.buy-section"),
    a = document.querySelector("div.sell-section"),
    l = document.querySelector("div.calculated-result"),
    s = document.querySelectorAll("div.error"),
    o = document.querySelector("div.sell-form form"),
    p = document.querySelector("div.buy-form form"),
    r = document.querySelector("div.option-show span"),
    i = document.querySelector("div.option-cross span"),
    d = document.querySelector("div.menu-wrapper");
    calculatedresult = document.querySelector("div#calculatedresult");
  const u = 0.015;
  window.addEventListener("load", () => {
    e.style.display = "none";
  }),
    r.addEventListener("click", () => {
      (r.style.display = "none"), d.classList.add("show");
    }),
    i.addEventListener("click", () => {
      (r.style.display = "block"), d.classList.remove("show");
    });
  let c = () => {
    let e = t.value;
    (l.style.display = "none"),
      (l.innerHTML = ""),
      (s[0].textContent = ""),
      (s[1].textContent = ""),
      "buy" === e
        ? ((n.style.display = "block"), (a.style.display = "none"))
        : "sell" === e &&
          ((n.style.display = "none"), (a.style.display = "block"));
  };
  const y = (e) => {
    let t = 10;
    return (
      e <= 5e4
        ? ((t = (0.4 * e) / 100), t < 10 && (t = 10))
        : e > 5e4 && e <= 5e5
        ? (t = (0.33 * e) / 100)
        : e > 5e5 && e <= 2e6
        ? (t = (0.31 * e) / 100)
        : e > 2e6 && e <= 1e7
        ? (t = (0.27 * e) / 100)
        : e > 1e7 && (t = (0.24 * e) / 100),
      Number(t.toFixed(2))
    );
  };
  let v = (e, t) => {
    let n = e * t,
      a = (n * u) / 100;
    return n + y(n) + 25 + a;
  };
  t.addEventListener("change", c),
    o.addEventListener("submit", (e) => {
      e.preventDefault();
      let t = parseFloat(o.sellprice.value),
        n = parseFloat(o.buyprice.value),
        a = parseFloat(o.quantity.value),
        p = parseFloat(o.tax.value);
      if (t && n && a && p)
        if (t < 0 && n < 0 && a < 0) s[0].textContent = "Invalid Data";
        else {
          let e = t * a,
            s = v(n, a),
            o = ((e * u) / 100).toFixed(2),
            r = y(e),
            i = 0,
            d = e - 25 - o - r,
            c = d - s;
          c > 0 && (i = ((c * p) / 100).toFixed(2));
          let m = (c - i).toFixed(2);
          d = (d - i).toFixed(2);
          let b = `\n<div class="result-wrapper">\n<h2>Calculated Share Result:</h2>\n<p>Total Sell Value : <span>${e}</span> </p>\n<p>Dp Charge: <span> 25 </span> </p>\n<p>Sebon Fee: <span> ${o} </span> </p>\n<p>Broker Commission : <span> ${r} </span> </p>\n<p>Capital Gain Tax: <span> ${i} </span> </p>\n<p>Profit/Loss: <span> ${m} </span> </p>\n<p>Return on Investment : <span> ${(
            (m / s) *
            100
          ).toFixed(
            2
          )} %</span> </p>\n<hr>\n<p>Total Receivable Amount: <span>${d}</span></p>\n</div>\n</div>`;
          (l.style.display = "block"), (l.innerHTML = b);
          calculatedresult.scrollIntoView({  behavior: 'smooth',
            block: 'center' });
        }
      else s[0].textContent = "* Are Mandatory field.";
    }),
    p.addEventListener("submit", (e) => {
      e.preventDefault();
      let t = parseFloat(p.buyprice.value),
        n = parseFloat(p.quantity.value);
      if (t && n)
        if (t < 0 && n < 0) s[1].textContent = "Invalid Data";
        else {
          let e = t * n,
            a = v(t, n).toFixed(2),
            s = `\n<div class="result-wrapper">\n<h2>Calculated Share Result:</h2>\n<p>Total Buy Amount : <span>${e}</span> </p>\n<p>Dp Charge: <span> 25 </span> </p>\n<p>Sebon Fee: <span> ${(
              (e * u) /
              100
            ).toFixed(2)} </span> </p>\n<p>Broker Commission : <span> ${y(
              e
            )} </span> </p>\n<hr>\n<p>Total Payable Amount: <span> ${a} </span> </p>\n</div>\n</div>`;
          (l.style.display = "block"), (l.innerHTML = s);
          calculatedresult.scrollIntoView({  behavior: 'smooth',
            block: 'center' });
        }
      else s[1].textContent = "* Are Mandatory field.";
    }),
    c();
})();
