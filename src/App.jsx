import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, Check, ChevronLeft, ChevronRight, Copy, MapPin, Menu, Navigation,
  Phone, Printer, X,
} from "lucide-react";

import logo from "./img/logo.png";
import businessCard from "./img/business-card.webp";
import bags480 from "./img/paper-bags-480.webp";
import bags960 from "./img/paper-bags-960.webp";
import cleaning480 from "./img/cleaning-supplies-480.webp";
import cleaning960 from "./img/cleaning-supplies-960.webp";
import aisle1_480 from "./img/store-inside-1-480.webp";
import aisle1_960 from "./img/store-inside-1-960.webp";
import aisle3_480 from "./img/store-inside-3-480.webp";
import aisle3_960 from "./img/store-inside-3-960.webp";
import desk480 from "./img/checkout-desk-480.webp";
import desk960 from "./img/checkout-desk-960.webp";

/* ------------------------------------------------------------------ */
/* Στοιχεία επιχείρησης: αλλάξτε τα εδώ                               */
/* ------------------------------------------------------------------ */
const BIZ = {
  name: "Καλογερόπουλος Εξοπλισμοί Ι.Κ.Ε.",
  street: "Παπαφλέσσα 35-37",
  city: "Πύργος 27131",
  phone: "2621035932",
  phoneLabel: "26210 35932",
  fax: "2621024932",
  faxLabel: "26210 24932",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Παπαφλέσσα 35-37, Πύργος 27131"),
};

const NAV = [
  { id: "arxiki", label: "Αρχική" },
  { id: "katalogos", label: "Κατάλογος" },
  { id: "katastima", label: "Το Κατάστημα" },
  { id: "epikoinonia", label: "Επικοινωνία" },
];

const CATEGORIES = [
  {
    id: "syskevasia",
    short: "Συσκευασία",
    title: "Είδη Συσκευασίας",
    text: "Για πακέτο, ντελίβερι και βιτρίνα.",
    items: [
      ["Κουτιά πίτσας", "28 × 37,5 κ.ά."],
      ["Κουτιά ψητοπωλείου", "διάφορα μεγέθη"],
      ["Χάρτινες σακούλες kraft με χερούλι", "φυσικό, χρώματα"],
      ["Σκεύη αλουμινίου με καπάκι", "μερίδα, οικογενειακό"],
      ["Μπολ σαλάτας kraft", "750 ml"],
      ["Μεμβράνη και αλουμινόχαρτο", "επαγγελματικά ρολά"],
    ],
  },
  {
    id: "xartika",
    short: "Χαρτικά",
    title: "Χαρτικά & Είδη Υγιεινής",
    text: "Για κουζίνα, σάλα και τουαλέτες πελατών.",
    items: [
      ["Ρολά κουζίνας", "οικιακά, επαγγελματικά"],
      ["Χαρτί υγείας", "jumbo, οικιακό"],
      ["Χειροπετσέτες διπλωτές", "ZZ"],
      ["Χαρτοπετσέτες εστίασης", "1φυλλες, 2φυλλες"],
      ["Χαρτί περιτυλίγματος", "λευκό, λαδόχαρτο"],
      ["Υγρά μαντηλάκια", "πακέτα"],
    ],
  },
  {
    id: "plastika",
    short: "Πλαστικά",
    title: "Πλαστικά Σκεύη",
    text: "Για καφετέριες, ζαχαροπλαστεία και take away.",
    items: [
      ["Ποτήρια κρύων ροφημάτων", "PET"],
      ["Καπάκια ποτηριών και μπολ", "25/32 oz"],
      ["Δοχεία φαγητού με καπάκι", "διάφορα ml"],
      ["Καλαμάκια", "ίσια, μπαμπού"],
      ["Πιάτα και μαχαιροπίρουνα", "μιας χρήσης"],
      ["Σακούλες τροφίμων", "διάφορα μεγέθη"],
    ],
  },
  {
    id: "katharistika",
    short: "Καθαριστικά",
    title: "Καθαριστικά & Απορρυπαντικά",
    text: "Επώνυμα και επαγγελματικά, σε μικρή και μεγάλη συσκευασία.",
    items: [
      ["Υγρά πιάτων", "1 L, 4 L"],
      ["Χλωρίνες", "απλή, παχύρρευστη"],
      ["Καθαριστικά δαπέδου", "συμπυκνωμένα"],
      ["Λιποκαθαριστικά κουζίνας", "σπρέι"],
      ["Σφουγγάρια και σύρματα", "τεμάχιο, κιβώτιο"],
      ["Γάντια μιας χρήσης", "νιτριλίου, βινυλίου"],
    ],
  },
];

const GALLERY = [
  { s: cleaning480, l: cleaning960, title: "Απορρυπαντικά", alt: "Διάδρομος με απορρυπαντικά, σαμπουάν και καθαριστικά στα ράφια" },
  { s: aisle3_480, l: aisle3_960, title: "Συσκευασίες εστίασης", alt: "Ράφια με κουτιά πίτσας, δίσκους και χαρτιά περιτυλίγματος" },
  { s: aisle1_480, l: aisle1_960, title: "Χαρτικά και είδη καθαρισμού", alt: "Διάδρομος με ρολά κουζίνας, χαρτιά υγείας και είδη καθαρισμού" },
  { s: desk480, l: desk960, title: "Ο πάγκος εξυπηρέτησης", alt: "Ο πάγκος εξυπηρέτησης του καταστήματος" },
];

/* ------------------------------------------------------------------ */
/* Βοηθητικά                                                           */
/* ------------------------------------------------------------------ */
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

function buzz() {
  try { navigator.vibrate && navigator.vibrate(10); } catch { /* δεν υποστηρίζεται */ }
}

/**
 * Κουμπί με αντίδραση στο πάτημα: συρρίκνωση, κύμα από το σημείο αφής
 * και μικρή δόνηση σε κινητά Android. Δουλεύει ως <a> ή <button>.
 */
const Press = React.forwardRef(function Press({ href, className = "", children, onClick, haptic = false, ...rest }, ref) {
  const Tag = href ? "a" : "button";
  const onPointerDown = (e) => {
    if (reducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2.2;
    const dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.width = dot.style.height = d + "px";
    dot.style.left = e.clientX - r.left - d / 2 + "px";
    dot.style.top = e.clientY - r.top - d / 2 + "px";
    el.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  };
  const handleClick = (e) => {
    if (haptic) buzz();
    onClick && onClick(e);
  };
  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : "button"}
      className={"btn " + className}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
});

function JumpLink({ id, children, className = "", onNavigate }) {
  return (
    <a
      href={"#" + id}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(id);
        onNavigate && onNavigate();
      }}
    >
      {children}
    </a>
  );
}

function CopyButton({ value, label }) {
  const [done, setDone] = useState(false);
  const textRef = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      buzz();
      setTimeout(() => setDone(false), 1800);
    } catch {
      const t = textRef.current;
      if (t) {
        const r = document.createRange();
        r.selectNodeContents(t);
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
      }
    }
  };
  return (
    <>
      <span ref={textRef} className="sr-only">{value}</span>
      <Press
        onClick={copy}
        aria-label={"Αντιγραφή " + label}
        className={"btn-ghost h-11 px-3 text-sm " + (done ? "is-done" : "")}
      >
        {done ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        <span aria-live="polite">{done ? "Αντιγράφηκε" : "Αντιγραφή"}</span>
      </Press>
    </>
  );
}

function Photo({ s, l, alt, className = "", eager = false, sizes = "(min-width: 1024px) 40vw, 90vw" }) {
  return (
    <img
      src={s}
      srcSet={`${s} 480w, ${l} 960w`}
      sizes={sizes}
      alt={alt}
      width="960"
      height="1280"
      loading={eager ? "eager" : "lazy"}
      fetchpriority={eager ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Κεφαλίδα                                                            */
/* ------------------------------------------------------------------ */
function TopStrip() {
  return (
    <div className="hidden border-b border-line bg-kraft-soft text-[0.82rem] text-muted md:block">
      <div className="wrap flex h-9 items-center justify-between gap-6">
        <span className="flex items-center gap-5">
          <span>{BIZ.street}, {BIZ.city}</span>
          <span className="tabular-nums">Τηλ. {BIZ.phoneLabel}</span>
          <span className="tabular-nums">Fax {BIZ.faxLabel}</span>
        </span>
        <span>Χονδρική και λιανική</span>
      </div>
    </div>
  );
}

function Header({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header border-b border-line bg-paper">
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <JumpLink id="arxiki" onNavigate={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5 rounded-md">
          <img src={logo} alt="" width="44" height="44" className="h-10 w-10 shrink-0 md:h-11 md:w-11" />
          <span className="min-w-0 leading-[1.15]">
            <span className="block truncate text-[1.02rem] font-extrabold tracking-tight text-ink">Καλογερόπουλος</span>
            <span className="block truncate text-[0.78rem] text-muted">Εξοπλισμοί Ι.Κ.Ε.</span>
          </span>
        </JumpLink>

        <nav aria-label="Κύρια πλοήγηση" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <JumpLink
              key={n.id}
              id={n.id}
              className={"nav-link py-2 text-[0.95rem] font-semibold " + (active === n.id ? "is-active" : "")}
            >
              {n.label}
            </JumpLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Press href={"tel:" + BIZ.phone} haptic className="btn-primary hidden h-11 px-4 text-[0.95rem] lg:inline-flex">
            <Phone size={17} aria-hidden="true" />
            <span className="tabular-nums">{BIZ.phoneLabel}</span>
          </Press>
          <Press
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            className="btn-ghost h-11 w-11 lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </Press>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={"grid overflow-hidden transition-[grid-template-rows] duration-200 lg:hidden " + (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <nav aria-label="Μενού κινητού" className="min-h-0">
          <ul className="wrap border-t border-line pb-2">
            {NAV.map((n) => (
              <li key={n.id}>
                <JumpLink
                  id={n.id}
                  onNavigate={() => setOpen(false)}
                  className={"menu-row flex min-h-[3.25rem] items-center justify-between border-b border-line text-[1.05rem] font-semibold " + (active === n.id ? "text-green" : "text-ink")}
                >
                  {n.label}
                  <ChevronRight size={18} aria-hidden="true" className="text-muted" />
                </JumpLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Αρχική                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="arxiki" className="anchor">
      <div className="wrap grid gap-8 pb-12 pt-8 md:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-16">
        <div className="min-w-0">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem] font-semibold text-muted" aria-label="Τι εμπορευόμαστε">
            {["χαρτικά", "πλαστικά", "είδη συσκευασίας", "επαγγελματικοί εξοπλισμοί"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.2rem]">
            Χαρτικά, συσκευασίες και καθαριστικά για την επιχείρησή σας
          </h1>

          <p className="mt-5 max-w-[38rem] text-[1.06rem] leading-relaxed text-muted">
            Εισάγουμε και πουλάμε είδη για ψητοπωλεία, καφετέριες, ζαχαροπλαστεία, φούρνους, ιχθυοπωλεία
            και κρεοπωλεία. Εξυπηρετούμε και πελάτες λιανικής στο κατάστημά μας, στην Παπαφλέσσα 35-37 στον Πύργο.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Press href={"tel:" + BIZ.phone} haptic className="btn-primary h-[3.25rem] px-5 text-base">
              <Phone size={19} aria-hidden="true" />
              Καλέστε <span className="tabular-nums">{BIZ.phoneLabel}</span>
            </Press>
            <Press onClick={() => scrollToId("katalogos")} className="btn-outline h-[3.25rem] px-5 text-base">
              Δείτε τον κατάλογο
              <ArrowRight size={18} aria-hidden="true" />
            </Press>
          </div>
        </div>

        <figure className="min-w-0">
          <Photo
            s={bags480}
            l={bags960}
            eager
            sizes="(min-width: 1024px) 34vw, 92vw"
            alt="Ράφια με χάρτινες σακούλες σε μπλε, κόκκινο και kraft, και καρούλια κορδέλας"
            className="aspect-[4/3] w-full rounded-lg bg-line object-cover object-[center_72%] lg:aspect-[4/5] lg:object-center"
          />
          <figcaption className="mt-2.5 text-[0.84rem] text-muted">
            Χάρτινες σακούλες και κορδέλες στα ράφια του καταστήματος.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Κατάλογος                                                           */
/* ------------------------------------------------------------------ */
function Catalog() {
  const [tab, setTab] = useState(CATEGORIES[0].id);
  const tabRefs = useRef({});

  const onTabKey = (e, i) => {
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % CATEGORIES.length;
    if (e.key === "ArrowLeft") next = (i - 1 + CATEGORIES.length) % CATEGORIES.length;
    if (next === null) return;
    e.preventDefault();
    const id = CATEGORIES[next].id;
    setTab(id);
    tabRefs.current[id] && tabRefs.current[id].focus();
  };

  return (
    <section id="katalogos" className="anchor border-t border-line bg-paper">
      <div className="wrap py-12 md:py-20">
        <div className="max-w-[40rem]">
          <h2 className="text-[1.75rem] font-extrabold tracking-[-0.015em] text-ink md:text-[2.25rem]">Κατάλογος</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Ενδεικτικά είδη από τα ράφια μας. Για διαθεσιμότητα, ποσότητες και τιμές χονδρικής ρωτήστε μας στο
            τηλέφωνο.
          </p>
        </div>

        {/* Καρτέλες: μόνο στο κινητό, για λιγότερο σκρολάρισμα */}
        <div className="tabs-scroll -mx-4 mt-7 overflow-x-auto px-4 md:hidden">
          <div role="tablist" aria-label="Κατηγορίες" className="flex w-max gap-2">
            {CATEGORIES.map((c, i) => (
              <Press
                key={c.id}
                role="tab"
                id={"tab-" + c.id}
                aria-selected={tab === c.id}
                aria-controls={"panel-" + c.id}
                tabIndex={tab === c.id ? 0 : -1}
                ref={(el) => (tabRefs.current[c.id] = el)}
                onClick={() => setTab(c.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={"tab h-11 px-4 text-[0.95rem] " + (tab === c.id ? "is-on" : "")}
              >
                {c.short}
              </Press>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-x-14 gap-y-12 md:mt-12 md:grid-cols-2">
          {CATEGORIES.map((c) => (
            <section
              key={c.id}
              id={"panel-" + c.id}
              aria-labelledby={"h-" + c.id}
              className={"cat min-w-0 " + (tab === c.id ? "" : "max-md:hidden")}
            >
              <h3 id={"h-" + c.id} className="text-[1.2rem] font-bold text-ink">{c.title}</h3>
              <p className="mt-1 text-[0.95rem] text-muted">{c.text}</p>
              <ul className="mt-4 border-t border-line">
                {c.items.map(([name, spec]) => (
                  <li key={name} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span className="min-w-0 text-[0.98rem] text-ink">{name}</span>
                    <span className="shrink-0 text-right text-[0.84rem] text-kraft-ink">{spec}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-lg bg-kraft-soft p-5 sm:flex-row sm:items-center sm:justify-between md:mt-14 md:p-6">
          <p className="text-[1rem] text-ink">
            <strong className="font-bold">Δεν βρήκατε αυτό που ψάχνετε;</strong>{" "}
            <span className="text-muted">Στο κατάστημα έχουμε πολύ περισσότερα είδη από όσα χωράνε εδώ.</span>
          </p>
          <Press href={"tel:" + BIZ.phone} haptic className="btn-primary h-12 shrink-0 px-5">
            <Phone size={18} aria-hidden="true" />
            Ρωτήστε μας
          </Press>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Το Κατάστημα                                                        */
/* ------------------------------------------------------------------ */
function StoreSection() {
  const [open, setOpen] = useState(null);
  const touchX = useRef(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d) => setOpen((i) => (i + d + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <section id="katastima" className="anchor border-t border-line bg-paper">
      <div className="wrap grid gap-8 py-12 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0 max-w-[36rem]">
          <h2 className="text-[1.75rem] font-extrabold tracking-[-0.015em] text-ink md:text-[2.25rem]">Το κατάστημα</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Θα μας βρείτε στην Παπαφλέσσα 35-37 στον Πύργο. Στους διαδρόμους υπάρχουν κουτιά πίτσας, σκεύη
            αλουμινίου, χάρτινες σακούλες, χαρτικά, ποτήρια, καθαριστικά και πολλά ακόμη, σε τεμάχιο ή σε κιβώτιο.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Αν είστε επαγγελματίας, πάρτε μας τηλέφωνο από πριν. Ετοιμάζουμε την παραγγελία σας και την
            παραλαμβάνετε από τον πάγκο.
          </p>
        </div>

        <ul className="snap-row -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0" aria-label="Φωτογραφίες καταστήματος">
          {GALLERY.map((g, i) => (
            <li key={g.title} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <figure>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="photo-btn block w-full overflow-hidden rounded-lg bg-line"
                  aria-label={"Μεγέθυνση: " + g.title}
                >
                  <Photo
                    s={g.s}
                    l={g.l}
                    alt={g.alt}
                    sizes="(min-width: 1024px) 26vw, (min-width: 768px) 45vw, 72vw"
                    className="aspect-[4/5] w-full object-cover md:aspect-[4/3]"
                  />
                </button>
                <figcaption className="mt-2 text-[0.88rem] font-semibold text-ink">{g.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[open].title}
          className="lightbox fixed inset-0 z-[60] flex items-center justify-center"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <Press onClick={close} aria-label="Κλείσιμο" autoFocus className="lb-btn lb-close h-12 w-12 rounded-full">
            <X size={22} aria-hidden="true" />
          </Press>
          <figure className="flex max-h-full w-full max-w-[720px] flex-col items-center gap-3 px-4" onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY[open].l} alt={GALLERY[open].alt} className="max-h-[72vh] w-auto rounded-md object-contain" />
            <figcaption className="text-center font-semibold text-white">{GALLERY[open].title}</figcaption>
            <div className="flex items-center gap-4">
              <Press onClick={() => step(-1)} aria-label="Προηγούμενη" className="lb-btn h-12 w-12 rounded-full"><ChevronLeft size={22} aria-hidden="true" /></Press>
              <span className="text-sm text-white tabular-nums">{open + 1} / {GALLERY.length}</span>
              <Press onClick={() => step(1)} aria-label="Επόμενη" className="lb-btn h-12 w-12 rounded-full"><ChevronRight size={22} aria-hidden="true" /></Press>
            </div>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Επικοινωνία                                                         */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="epikoinonia" className="anchor border-t border-line bg-kraft-soft">
      <div className="wrap grid gap-10 py-12 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="min-w-0">
          <h2 className="text-[1.75rem] font-extrabold tracking-[-0.015em] text-ink md:text-[2.25rem]">Επικοινωνία</h2>
          <p className="mt-3 max-w-[34rem] leading-relaxed text-muted">
            Πείτε μας τι χρειάζεστε και σε τι ποσότητα. Σας λέμε τι υπάρχει, πόσο κοστίζει και πότε είναι έτοιμο.
          </p>

          <dl className="mt-8 grid gap-0 border-t border-line-strong">
            <div className="contact-row">
              <dt className="contact-label"><MapPin size={18} aria-hidden="true" />Διεύθυνση</dt>
              <dd className="contact-value">{BIZ.street}, {BIZ.city}</dd>
              <dd className="contact-action">
                <Press href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="btn-ghost h-11 px-3 text-sm">
                  <Navigation size={16} aria-hidden="true" />
                  Οδηγίες
                </Press>
              </dd>
            </div>
            <div className="contact-row">
              <dt className="contact-label"><Phone size={18} aria-hidden="true" />Τηλέφωνο</dt>
              <dd className="contact-value tabular-nums select-all">{BIZ.phoneLabel}</dd>
              <dd className="contact-action">
                <Press href={"tel:" + BIZ.phone} haptic className="btn-primary h-11 px-4 text-sm">
                  <Phone size={16} aria-hidden="true" />
                  Κλήση
                </Press>
              </dd>
            </div>
            <div className="contact-row">
              <dt className="contact-label"><Printer size={18} aria-hidden="true" />Fax</dt>
              <dd className="contact-value tabular-nums select-all">{BIZ.faxLabel}</dd>
              <dd className="contact-action"><CopyButton value={BIZ.fax} label="αριθμού fax" /></dd>
            </div>
          </dl>
        </div>

        <figure className="hidden min-w-0 lg:block">
          <img
            src={businessCard}
            alt="Η επαγγελματική κάρτα της Καλογερόπουλος Εξοπλισμοί Ι.Κ.Ε."
            width="900"
            height="414"
            loading="lazy"
            decoding="async"
            className="card-img w-full rounded-md"
          />
          <figcaption className="mt-3 text-[0.84rem] text-muted">Η κάρτα του καταστήματος.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Υποσέλιδο και μπάρα κινητού                                         */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width="44" height="44" loading="lazy" className="h-11 w-11" />
          <div className="leading-tight">
            <p className="font-extrabold text-ink">{BIZ.name}</p>
            <p className="mt-0.5 text-sm text-muted">Εισαγωγές · Εμπόριο</p>
          </div>
        </div>
        <address className="grid gap-1 text-[0.92rem] not-italic text-muted md:text-right">
          <span>{BIZ.street}, {BIZ.city}</span>
          <span className="tabular-nums">Τηλ. {BIZ.phoneLabel} · Fax {BIZ.faxLabel}</span>
        </address>
      </div>
      <div className="wrap border-t border-line py-4 text-[0.8rem] text-muted">
        © {new Date().getFullYear()} {BIZ.name}
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <>
      <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper lg:hidden">
        <div className="wrap grid grid-cols-[1.4fr_1fr] gap-2.5 py-2.5">
          <Press href={"tel:" + BIZ.phone} haptic className="btn-primary h-[3.25rem] text-[1.02rem]">
            <Phone size={19} aria-hidden="true" />
            Κλήση
          </Press>
          <Press href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="btn-outline h-[3.25rem] text-[1.02rem]">
            <MapPin size={19} aria-hidden="true" />
            Χάρτης
          </Press>
        </div>
      </div>
      <div className="mobile-bar-spacer lg:hidden" aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
export default function App() {
  const [active, setActive] = useState("arxiki");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      el && obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <TopStrip />
      <Header active={active} />
      <main>
        <Hero />
        <Catalog />
        <StoreSection />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
