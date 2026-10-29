import { useEffect, useState, type FormEvent } from "react";

type IconName =
  | "arrow"
  | "bottle"
  | "coffee"
  | "delivery"
  | "drop"
  | "fruit"
  | "leaf"
  | "menu"
  | "package"
  | "spark"
  | "support"
  | "x";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    bottle: <><path d="M9 3h6v4l2 3v10H7V10l2-3V3Z" /><path d="M9 14h8" /></>,
    coffee: <><path d="M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" /><path d="M16 10h1a3 3 0 0 1 0 6h-1M8 4v1m4-1v1" /></>,
    delivery: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
    drop: <path d="M12 3S6 10 6 15a6 6 0 0 0 12 0c0-5-6-12-6-12Z" />,
    fruit: <><circle cx="9" cy="13" r="5" /><circle cx="15" cy="13" r="5" /><path d="M12 8c0-3 2-5 5-5M12 8C9 7 8 5 8 3" /></>,
    leaf: <><path d="M20 4C12 4 6 7 5 13c-1 5 4 8 8 6 5-2 6-9 7-15Z" /><path d="M4 21c3-6 7-9 12-12" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    package: <><path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z" /><path d="m4 7 8 4 8-4M12 11v10" /></>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    support: <><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v5h3v-5H4Zm13 0v5h3v-5h-3ZM17 19c-1 2-3 2-5 2" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}

const services = [
  {
    icon: "drop" as IconName,
    number: "01",
    title: "Water & hydration",
    text: "Water dispensers, bottled water and refreshing soft drinks, delivered and maintained.",
  },
  {
    icon: "coffee" as IconName,
    number: "02",
    title: "Coffee moments",
    text: "Complete coffee and tea setups that make every break feel considered.",
  },
  {
    icon: "fruit" as IconName,
    number: "03",
    title: "Fresh at work",
    text: "Seasonal fruit and nourishing snacks curated for happy, energised teams.",
  },
  {
    icon: "package" as IconName,
    number: "04",
    title: "Everyday essentials",
    text: "Sustainable disposables and workplace supplies, always there when needed.",
  },
  {
    icon: "delivery" as IconName,
    number: "05",
    title: "Food & catering",
    text: "From daily lunches to memorable meetings, delivered with care and precision.",
  },
  {
    icon: "support" as IconName,
    number: "06",
    title: "Tailored service",
    text: "One reliable partner, responsive support and a plan shaped around your workplace.",
  },
];

const benefits = [
  ["spark", "One trusted supplier", "Fewer vendors, less admin and one team that knows your workplace."],
  ["delivery", "Reliable deliveries", "Flexible schedules and dependable service, right when you need it."],
  ["support", "Human support", "Helpful people who respond quickly and solve problems thoughtfully."],
  ["leaf", "Smarter choices", "Lower-impact products and practical ways to reduce workplace waste."],
] as const;

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!quoteOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuoteOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [quoteOpen]);

  const openQuoteForm = () => {
    closeMenu();
    setQuoteOpen(true);
  };

  const sendQuoteToWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello EvaFlow, I'd like to request a quote.",
      "",
      `Name: ${form.get("name")}`,
      `Contact number: ${form.get("contact")}`,
      `Request for: ${form.get("request")}`,
    ].join("\n");

    window.open(
      `https://wa.me/358413262978?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setQuoteOpen(false);
    event.currentTarget.reset();
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/#top" aria-label="EvaFlow home">
          <img src="/assets/evaflow-logo.png" alt="" />
        </a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/about" onClick={closeMenu}>About us</a>
          <a href="/#catering" onClick={closeMenu}>Catering</a>
          <a href="/menus" onClick={closeMenu}>Menus</a>
          <a href="/#locations" onClick={closeMenu}>Locations</a>
          <a href="/#approach" onClick={closeMenu}>Why EvaFlow</a>
          <button className="nav-cta" onClick={openQuoteForm} type="button">
            Request a quote <Icon name="arrow" size={18} />
          </button>
        </nav>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </header>

      {quoteOpen && (
        <div className="quote-modal-backdrop" onMouseDown={() => setQuoteOpen(false)}>
          <div
            aria-labelledby="quote-form-title"
            aria-modal="true"
            className="quote-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close quote form"
              className="quote-modal-close"
              onClick={() => setQuoteOpen(false)}
              type="button"
            >
              <Icon name="x" size={20} />
            </button>
            <p className="eyebrow">Start a conversation</p>
            <h2 id="quote-form-title">Request a quote</h2>
            <p className="quote-modal-intro">
              Share a few details and continue directly in WhatsApp.
            </p>
            <form className="quote-form" onSubmit={sendQuoteToWhatsApp}>
              <label>
                Your name
                <input autoFocus name="name" placeholder="Enter your name" required type="text" />
              </label>
              <label>
                Contact number
                <input
                  autoComplete="tel"
                  inputMode="tel"
                  name="contact"
                  placeholder="+358..."
                  required
                  type="tel"
                />
              </label>
              <label>
                Request for
                <textarea
                  name="request"
                  placeholder="Tell us what your workplace needs"
                  required
                  rows={3}
                />
              </label>
              <button className="button quote-submit" type="submit">
                Send via WhatsApp <Icon name="arrow" size={19} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <a className="brand brand-light" href="/#top" aria-label="EvaFlow home">
          <img src="/assets/evaflow-logo.png" alt="" />
        </a>
        <p>Workplace essentials for happier, healthier and more productive teams.</p>
      </div>
      <div>
        <p className="footer-label">Explore</p>
        <a href="/#services">Services</a>
        <a href="/about">About us</a>
        <a href="/#catering">Catering</a>
        <a href="/menus">Menus</a>
        <a href="/#approach">Why EvaFlow</a>
        <a href="/#locations">Locations</a>
      </div>
      <div>
        <p className="footer-label">Visit</p>
        <p>Helsinki, Finland<br />Service across Uusimaa</p>
      </div>
      <div>
        <p className="footer-label">Follow</p>
        <a href="/#contact">LinkedIn</a>
        <a href="/#contact">Instagram</a>
      </div>
      <p className="copyright">© 2025 EvaFlow Services. All rights reserved.</p>
    </footer>
  );
}

function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="inner-page" id="top">
        <div className="page-intro">
          <p className="eyebrow">The story behind EvaFlow</p>
          <h1>Service shaped by<br /><em>experience.</em></h1>
        </div>
        <section className="about-section">
          <div className="founder-portrait">
            <img src="/assets/founder.jpeg" alt="EvaFlow founder in a professional kitchen" />
            <div className="founder-caption">
              <span>Founder-led service</span>
              <strong>Personal care, every day.</strong>
            </div>
          </div>
          <div className="about-content">
            <p className="eyebrow">Meet the founder</p>
            <h2>International expertise, delivered with <em>Finnish precision.</em></h2>
            <p className="about-lead">
              EvaFlow is built on first-hand hospitality experience, cultural
              understanding and direct, personal leadership. Every client works
              with a decision-maker who understands both the details and the
              bigger picture.
            </p>
            <div className="milestone-grid">
              <article><strong>8+</strong><div><h3>Years in Finland</h3><p>Deep knowledge of Finnish workplace culture, punctuality standards and dietary needs—from gluteeniton and laktoositon to vegaani.</p></div></article>
              <article><strong>AMK</strong><div><h3>Recognised qualifications</h3><p>A Bachelor&apos;s Degree in Hotel Management &amp; Catering Technology, officially recognised as comparable to a Finnish AMK degree, plus postgraduate studies in Marketing &amp; Retail.</p></div></article>
              <article><strong>1:1</strong><div><h3>Direct leadership</h3><p>Hands-on expertise across food hygiene, Oiva and Hygieniapassi standards, kitchen operations, customer care and strategic procurement.</p></div></article>
              <article><strong>Global</strong><div><h3>Perspective with Thai roots</h3><p>International experience shaped by time living and working in Thailand—bringing warmth, culinary curiosity and gracious service to every partnership.</p></div></article>
            </div>
          </div>
        </section>
        <section className="inner-cta">
          <p className="eyebrow">Personal from day one</p>
          <h2>Let&apos;s build a service around <em>your team.</em></h2>
          <a className="button button-primary" href="/#contact">Meet EvaFlow <Icon name="arrow" size={19} /></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function MenusPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="inner-page" id="top">
        <div className="page-intro menu-page-intro">
          <p className="eyebrow">Fresh, flexible catering</p>
          <h1>Menus made for<br /><em>modern teams.</em></h1>
        </div>
        <section className="menus-section">
          <div className="menus-image">
            <img src="/assets/menus.jpg" alt="Fresh sandwiches and pastries prepared for workplace catering" />
            <span>Seasonal · Fresh · Flexible</span>
          </div>
          <div className="menus-content">
            <p className="eyebrow">Our menus</p>
            <h2>Something for<br /><em>every gathering.</em></h2>
            <p className="menus-intro">Our menus change with the seasons and can be adapted to suit your team. Here are a few of our most requested formats.</p>
            <div className="menu-list">
              <details open><summary><span>01</span> Morning &amp; breakfast</summary><p>Filled rolls, overnight oats, fruit, yoghurt, pastries and freshly brewed coffee.</p></details>
              <details><summary><span>02</span> Lunch &amp; team tables</summary><p>Colourful salads, warm seasonal dishes, artisan bread and nourishing plant-forward sides.</p></details>
              <details><summary><span>03</span> Meetings &amp; celebrations</summary><p>Open sandwiches, savoury bites, cakes and elegant finger food for effortless hosting.</p></details>
            </div>
            <a className="text-link" href="/#contact">Request the current menu <Icon name="arrow" size={18} /></a>
          </div>
        </section>
        <section className="menu-principles">
          <article><span>01</span><h3>Season-led</h3><p>Menus evolve with fresh ingredients and the rhythm of the year.</p></article>
          <article><span>02</span><h3>Dietary-aware</h3><p>Clear, considered options for gluten-free, lactose-free and vegan guests.</p></article>
          <article><span>03</span><h3>Made to fit</h3><p>Flexible formats for everyday lunches, meetings and important occasions.</p></article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/about") return <AboutPage />;
  if (path === "/menus") return <MenusPage />;

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Workplace essentials, effortlessly managed</p>
            <h1>Everything your workplace needs to <em>flow.</em></h1>
            <p className="hero-intro">
              From fresh water and great coffee to catering and daily supplies,
              we make busy workplaces feel cared for.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services">
                Explore our services <Icon name="arrow" size={19} />
              </a>
              <a className="text-link" href="#contact">Talk to our team</a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>ES</span><span>ML</span><span>AK</span>
              </div>
              <p><strong>Trusted across Finland</strong><br />by teams big and small</p>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/assets/hero-office.jpg" alt="A bright, modern workplace kitchen" />
            <div className="floating-card">
              <span className="float-icon"><Icon name="spark" size={20} /></span>
              <div><strong>One less thing to worry about.</strong><small>We keep your workplace stocked.</small></div>
            </div>
            <div className="hero-badge"><strong>10+</strong><span>years of<br />reliable service</span></div>
          </div>
        </section>

        <section className="client-strip" aria-label="Our promise">
          <p>Refreshment</p><span />
          <p>Workplace supplies</p><span />
          <p>Reliable delivery</p><span />
          <p>Human service</p>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What we deliver</p>
              <h2>Good days start with the <em>little things.</em></h2>
            </div>
            <p>
              A complete workplace service, tailored to your people. Choose what
              you need and we&apos;ll take care of the rest.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-card-top">
                  <span className="service-icon"><Icon name={service.icon} /></span>
                  <span>{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contact" aria-label={`Ask about ${service.title}`}>
                  Learn more <Icon name="arrow" size={17} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="catering-section" id="catering">
          <div className="catering-heading">
            <p className="eyebrow">EvaFlow catering</p>
            <h2>Food that works<br />for <em>every workday.</em></h2>
            <p>
              Fresh, flexible catering for meetings, team moments and everyday
              office lunches. Thoughtfully prepared for your schedule, group size
              and dietary requirements.
            </p>
            <a className="button button-dark" href="#contact">
              Plan your catering <Icon name="arrow" size={19} />
            </a>
          </div>
          <div className="catering-visual">
            <img src="/assets/catering.jpg" alt="A generous table of fresh catering dishes" />
          </div>
          <div className="catering-options">
            <article><span>01</span><h3>Office lunches</h3><p>Balanced buffet and individually packed options for everyday teams.</p></article>
            <article><span>02</span><h3>Meetings &amp; events</h3><p>Breakfasts, coffee breaks, finger food and polished event menus.</p></article>
            <article><span>03</span><h3>Dietary care</h3><p>Clear labelling and thoughtful gluten-free, lactose-free and vegan choices.</p></article>
          </div>
        </section>

        <section className="locations-section" id="locations">
          <div className="locations-intro">
            <p className="eyebrow">Locations served</p>
            <h2>Local service across<br /><em>the capital region.</em></h2>
            <p>Reliable delivery routes and responsive support throughout Helsinki and the surrounding business districts.</p>
          </div>
          <div className="location-list">
            <article><span>01</span><h3>Helsinki</h3><p>City centre, Pasila, Kalasatama, Ruoholahti and surrounding districts.</p></article>
            <article><span>02</span><h3>Espoo</h3><p>Keilaniemi, Otaniemi, Leppävaara and key workplace hubs.</p></article>
            <article><span>03</span><h3>Vantaa</h3><p>Aviapolis, Tikkurila and neighbouring commercial areas.</p></article>
            <article className="location-note"><Icon name="delivery" /><p>Outside these areas? <a href="#contact">Ask our team</a> about a tailored delivery route.</p></article>
          </div>
        </section>

        <section className="experience-section">
          <div className="experience-image">
            <img src="/assets/coffee-space.jpg" alt="A thoughtfully designed workplace coffee area" />
            <div className="image-note"><Icon name="coffee" size={21} /> Better breaks, built in.</div>
          </div>
          <div className="experience-copy">
            <p className="eyebrow">More than supplies</p>
            <h2>A workplace people look forward to.</h2>
            <p>
              The right details change how a workday feels. We bring together
              thoughtful products, dependable logistics and friendly support in
              one refreshingly simple service.
            </p>
            <ul>
              <li><span>01</span> A service plan built around your team</li>
              <li><span>02</span> Quality products, thoughtfully sourced</li>
              <li><span>03</span> Proactive restocking and responsive care</li>
            </ul>
            <a className="button button-dark" href="#contact">Build your service plan <Icon name="arrow" size={19} /></a>
          </div>
        </section>

        <section className="section benefits-section" id="approach">
          <div className="benefit-heading">
            <p className="eyebrow">Why EvaFlow</p>
            <h2>Simple for you.<br /><em>Better for everyone.</em></h2>
          </div>
          <div className="benefit-grid">
            {benefits.map(([icon, title, text]) => (
              <article key={title}>
                <span><Icon name={icon} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="community-section" id="community">
          <div className="community-copy">
            <p className="eyebrow">Community in motion</p>
            <h2>Supporting sport.<br /><em>Refreshing communities.</em></h2>
            <p>
              We believe good energy should travel beyond the workplace. That&apos;s
              why we support local sports, active communities and initiatives
              that bring people together.
            </p>
            <a className="text-link light" href="#contact">Discover our partnerships <Icon name="arrow" size={18} /></a>
          </div>
          <div className="community-image">
            <img src="/assets/community.jpg" alt="Community volunteers working together outdoors" />
            <p>Real people. Local impact.</p>
          </div>
        </section>

        <section className="quote-section">
          <div>
            <p className="eyebrow">Made for modern teams</p>
            <blockquote>“EvaFlow makes the everyday things feel completely effortless.”</blockquote>
          </div>
          <div className="quote-person">
            <span>NS</span>
            <p><strong>Niina Salonen</strong><br />Office Manager, Helsinki</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>Let&apos;s make your workplace <em>flow.</em></h2>
          </div>
          <div className="contact-content">
            <p>Tell us what your team needs. We&apos;ll come back with a clear, no-pressure proposal.</p>
            <a className="button button-white" href="mailto:sales@evaflowservices.com">
              sales@evaflowservices.com <Icon name="arrow" size={19} />
            </a>
            <a className="phone-link" href="tel:+358413262978">+358 41 326 2978</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
