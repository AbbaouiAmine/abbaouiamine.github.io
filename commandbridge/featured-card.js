(function () {
  function card() {
    var wrap = document.createElement("div");
    wrap.id = "commandbridge-featured";
    wrap.style.cssText =
      "max-width:1120px;margin:0 auto 28px;padding:0 2%;";
    wrap.innerHTML =
      '<a href="/commandbridge" style="display:block;text-decoration:none;color:#2a2520;background:#fff;border:1px solid rgba(26,18,8,.08);border-radius:24px;box-shadow:0 18px 48px rgba(0,0,0,.06);padding:22px 26px;">' +
      '<p style="margin:0 0 6px;font-family:Roboto Mono,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#e09500;">Case study</p>' +
      '<h3 style="margin:0 0 8px;font-family:Roboto Mono,monospace;letter-spacing:.06em;text-transform:uppercase;font-size:20px;">Command Bridge</h3>' +
      '<p style="margin:0;color:#555;font-family:Inter,Open Sans,sans-serif;">Pont local mobile → desktop : QR pairing, copie uniquement, jamais d’exécution.</p>' +
      "</a>";
    return wrap;
  }

  function mount() {
    if (document.getElementById("commandbridge-featured")) return true;
    var host =
      document.getElementById("portfolio") ||
      document.getElementById("projects") ||
      document.querySelector("section#portfolio");
    if (!host) return false;
    host.insertBefore(card(), host.firstChild);
    return true;
  }

  if (mount()) return;
  var n = 0;
  var t = setInterval(function () {
    n += 1;
    if (mount() || n > 40) clearInterval(t);
  }, 250);
})();
