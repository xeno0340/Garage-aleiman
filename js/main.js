(function () {
  "use strict";

  /* =========================================================
     i18n
  ========================================================= */
  var langPill = document.querySelector(".lang-pill");

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", lang === "ar");

    document.querySelectorAll(".i18n").forEach(function (el) {
      var v = el.getAttribute("data-" + lang);
      if (v !== null) el.innerHTML = v;
    });

    document.querySelectorAll(".lang-pill button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-setlang") === lang);
    });
    if (langPill) langPill.setAttribute("data-active", lang);

    renderServices(lang);
    renderGallery(lang);
  }

  document.querySelectorAll(".lang-pill button").forEach(function (b) {
    b.addEventListener("click", function () {
      applyLang(b.getAttribute("data-setlang"));
    });
  });

  /* =========================================================
     Mobile nav
  ========================================================= */
  var menuToggle = document.querySelector(".menu-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     Services
  ========================================================= */
  var icons = {
    engine:
      '<path d="M4 16V9h6l3-3h5v4h3v6h-3l-2 3H9l-2-3H4z"/><circle cx="19" cy="9" r="1.3"/>',
    gearbox:
      '<circle cx="12" cy="12" r="3.1"/><path d="M12 3v3M12 18v3M4.2 7l2.6 1.5M17.2 15.5l2.6 1.5M4.2 17l2.6-1.5M17.2 8.5l2.6-1.5M3 12h3M18 12h3"/>',
    hydraulic: '<path d="M12 3c3 4 6 7.3 6 10.5A6 6 0 1 1 6 13.5C6 10.3 9 7 12 3z"/>',
    electric: '<path d="M13 3 5 14h5l-1 7 8-11h-5l1-7z"/>',
    ac: '<path d="M12 2v20M4.2 6l15.6 12M19.8 6 4.2 18"/>',
    paint:
      '<path d="M4 20c0-3 2-4 2-7V7a2 2 0 0 1 2-2h6l4 4v2h-2v5c0 3 2 4 2 7"/><path d="M8 5v6M12 5v6"/>',
    parts: '<rect x="4" y="8" width="16" height="12" rx="0.5"/><path d="M4 8l8-4 8 4M8 8v4M16 8v4"/>',
    equipment: '<rect x="4" y="5" width="16" height="6" rx="0.5"/><path d="M7 11v8M17 11v8M4 19h16"/>'
  };

  var services = [
    { icon: "engine", en: "Engine Works", ar: "أعمال المحركات", en2: "Diesel &amp; petrol rebuilds", ar2: "إصلاح محركات ديزل وبنزين" },
    { icon: "gearbox", en: "Manual Gearbox", ar: "علبة التروس اليدوية", en2: "Teardown &amp; rebuild", ar2: "فك وتركيب وإصلاح" },
    { icon: "gearbox", en: "Automatic Transmission", ar: "الجير الأوتوماتيك", en2: "Valve body &amp; clutch packs", ar2: "فالف بودي وأطقم الكلتش" },
    { icon: "hydraulic", en: "Hydraulic Systems", ar: "الأنظمة الهيدروليكية", en2: "Pumps, rams &amp; lifts", ar2: "مضخات وأذرع ورافعات" },
    { icon: "electric", en: "Auto Electrician", ar: "كهرباء السيارات", en2: "Wiring &amp; diagnostics", ar2: "تمديدات وفحص إلكتروني" },
    { icon: "ac", en: "AC, Chiller &amp; Freezer", ar: "تكييف، شيلر وفريزر", en2: "Regas &amp; compressor work", ar2: "إعادة شحن وصيانة الكمبروسر" },
    { icon: "paint", en: "Denting &amp; Painting", ar: "سمكرة ودهان", en2: "Colour-matched respray", ar2: "دهان بمطابقة اللون" },
    { icon: "parts", en: "Used Parts &amp; Scrap", ar: "قطع غيار مستعملة وسكراب", en2: "Engines, gearboxes &amp; more", ar2: "محركات وجيربوكس وغيرها" },
    { icon: "equipment", en: "Equipment Repair Centre", ar: "مركز صيانة المعدات", en2: "Boom lifts &amp; site machinery", ar2: "رافعات ومعدات الموقع" }
  ];

  function renderServices(lang) {
    var host = document.getElementById("serviceList");
    if (!host) return;
    host.innerHTML = services
      .map(function (s) {
        var title = lang === "ar" ? s.ar : s.en;
        var sub = lang === "ar" ? s.ar2 : s.en2;
        return (
          '<div class="service-item"><span class="service-icon"><svg viewBox="0 0 24 24">' +
          icons[s.icon] +
          '</svg></span><div class="service-copy"><h3>' +
          title +
          "</h3><span>" +
          sub +
          "</span></div></div>"
        );
      })
      .join("");
  }

  /* =========================================================
     Gallery
  ========================================================= */
  var photos = [
    { key: "engineblock", big: true, en: "Engine Works", en2: "Cylinder head rebuild", ar: "أعمال المحركات", ar2: "إصلاح رأس السلندر" },
    { key: "gearbox", en: "Gearbox", en2: "Differential &amp; gearbox teardown", ar: "الجيربوكس", ar2: "فك وفحص الدفرنس وعلبة التروس" },
    { key: "transmission", en: "Transmission", en2: "Stripped down for inspection", ar: "جير أوتوماتيك", ar2: "مفكوك وتحت الفحص" },
    { key: "paint-black", en: "Paint Booth", en2: "Gloss black, full respray", ar: "كبينة الدهان", ar2: "أسود لامع، دهان كامل" },
    { key: "paint-red", en: "Paint Booth", en2: "Colour-matched respray", ar: "كبينة الدهان", ar2: "دهان بمطابقة اللون" },
    { key: "paint-silver", en: "Paint Booth", en2: "Metallic silver finish", ar: "كبينة الدهان", ar2: "دهان فضي ميتاليك" },
    { key: "engine", en: "Used Parts", en2: "Used engine, ready for sale", ar: "قطع مستعملة", ar2: "محرك مستعمل جاهز للبيع" },
    { key: "boomlift", en: "Equipment Repair", en2: "Boom lift hydraulics", ar: "صيانة المعدات", ar2: "هيدروليك رافعة بوم" },
    { key: "building", en: "The Workshop", en2: "Street 17, Sanayya", ar: "الورشة", ar2: "شارع 17، الصناعية" },
    { key: "signage", en: "Garage Al Eiman", en2: "Sanayya, Doha", ar: "كراج الإيمان", ar2: "الصناعية، الدوحة" }
  ];

  function renderGallery(lang) {
    var host = document.getElementById("gallery");
    if (!host) return;
    host.innerHTML = photos
      .map(function (p) {
        var label = lang === "ar" ? p.ar : p.en;
        var cap = lang === "ar" ? p.ar2 : p.en2;
        return (
          '<figure class="tile' +
          (p.big ? " big" : "") +
          '"><img src="images/' +
          p.key +
          '.jpg" alt="' +
          label +
          '" loading="lazy"><figcaption class="tag"><b>' +
          label +
          '</b><span class="cap">' +
          cap +
          "</span></figcaption></figure>"
        );
      })
      .join("");
  }

  applyLang("en");
})();