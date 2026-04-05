"use client";

import { useState, useEffect, type FormEvent } from "react";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { isSundayLiveServiceWindowEastern } from "@/lib/live-window";

/** Google Form — stay connected (serve, life groups, availability, prayer). */
const STAY_CONNECTED_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdaEes6DcdpgcuX79IVHvtzyikxbTJdbQgU3FkhuJNP8dy5Rg/viewform";

/** Sunday live banner “Join Now” — replace with your Zoom (or stream) URL */
const LIVE_STREAM_URL = "https://zoom.us";

/* ─────────────── Icon Components ─────────────── */

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function MapFoldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75H7.5a2.25 2.25 0 0 0-2.25 2.25v11.25a2.25 2.25 0 0 0 2.25 2.25h.75m9-13.5H18a2.25 2.25 0 0 1 2.25 2.25v11.25a2.25 2.25 0 0 1-2.25 2.25h-.75m0 0H15M9 6.75v13.5m1.5-13.5v13.5m3-13.5v13.5m-1.5-13.5H9m4.5 0H12m6.75 4.5V9a2.25 2.25 0 0 0-2.25-2.25H15m0 0v13.5m0 0h1.125a2.25 2.25 0 0 0 2.25-2.25V9.75"
      />
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 0-6-2.292c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

function MonumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3.75 2.25 15h-4.5L12 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 20.25h9" />
    </svg>
  );
}

/* ─────────────── Live Banner ─────────────── */

function LiveBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow(isSundayLiveServiceWindowEastern());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-primary-dark text-white text-center text-sm py-2 px-4">
      <a
        href={LIVE_STREAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-medium hover:underline"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        We Are Live — Join Now
      </a>
    </div>
  );
}

/* ─────────────── Navigation ─────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Welcome", href: "#welcome" },
    { label: "Vision", href: "#vision" },
    { label: "Visit", href: "#visit" },
    { label: "Get connected", href: "#stay-connected" },
    { label: "Prayer", href: "#prayer" },
    { label: "Connect", href: "#connect" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <LiveBanner />
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo: horizontal lockup */}
          <a href="#" className="flex items-center shrink-0 min-w-0">
            <img
              src="/logo/logo-horizontal-colored.svg"
              alt="The Mission Church"
              className="h-14 sm:h-16 md:h-17 w-auto max-w-[min(100%,min(92vw,36rem))] object-contain object-left"
              width={870}
              height={318}
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#prayer"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              <HeartIcon className="w-5 h-5" />
              Prayer Request
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#prayer"
                onClick={() => setMobileOpen(false)}
                className="mx-3 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-full text-base font-semibold hover:bg-primary-dark transition-colors"
              >
                <HeartIcon className="w-5 h-5" />
                Prayer Request
              </a>
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}

/* ─────────────── Hero Section ─────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/worship.jpeg" alt="The Mission Church community" className="absolute inset-0 w-full h-full object-cover" />
        {/* Base blue wash + stronger gradient for legibility on busier photos */}
        <div className="absolute inset-0 bg-primary/35" />
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/92 via-primary-dark/72 to-primary-dark/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-accent-light text-sm sm:text-base font-semibold tracking-widest uppercase mb-4 sm:mb-6">
          Welcome Home
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 mb-5">
          <MapPinIcon className="w-4 h-4 text-accent-light" />
          <span className="text-xs sm:text-sm text-white/85 font-medium tracking-wide">
            Serving Northern Virginia &amp; the DMV
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6 sm:mb-8">
          Called to Love.
          <br />
          <span className="text-accent-light">Sent to Serve.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          The Mission Church — a community rooted in faith, united in love,
          and sent to make a difference in Northern Virginia and beyond.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#visit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-primary-dark px-8 py-4 rounded-full text-base font-semibold hover:bg-accent-light hover:text-primary-dark transition-all shadow-lg hover:shadow-xl"
          >
            Plan Your Visit
          </a>
          <a
            href="#welcome"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 transition-all"
          >
            Learn More
          </a>
        </div>

      </div>

      {/* Subtle local-inspired line art */}
      <div className="absolute bottom-0 left-0 right-0 opacity-35 pointer-events-none">
        <svg viewBox="0 0 1440 140" className="w-full h-24 text-white/40" fill="none">
          <path d="M0 115h340l40-26 50 26h210l30-74 30 74h155l25-52 25 52h535" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────── Welcome Section ─────────────── */

function WelcomeSection() {
  return (
    <section id="welcome" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Community Photo */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/images/life-group.jpeg" alt="Our community" className="w-full h-full object-cover" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              A home to belong.
              <br />
              <span className="text-primary">A mission to live.</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              The Mission Church started with a simple conviction: the church
              isn&apos;t a building — it&apos;s a people on a mission. What began as
              a small group of families gathering in Northern Virginia has grown
              into a vibrant, multi-generational community united by one calling —
              to love God, love people, and make disciples wherever we go.
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              We&apos;re a non-denominational church where people from every
              background and season of life come together to worship, grow, and
              serve. We believe the gospel changes everything — how we treat our
              neighbors, how we raise our families, and how we show up in our
              city. Every week we gather to be transformed, and then we go out
              to be the hands and feet of Jesus in the DMV and beyond.
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Whether you&apos;re exploring faith for the first time or you&apos;ve
              been following Jesus for decades, there&apos;s a seat at the table
              for you here — and a mission waiting for you.
            </p>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
            >
              Come see for yourself
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Full-Bleed Mission Statement ─────────────── */

function MissionBanner() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark to-primary">
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
          We don&apos;t just gather.
          <br />
          <span className="text-accent-light">We go.</span>
        </h2>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
          Built for community. Driven by mission. Serving Northern Virginia
          and the DMV — and everywhere God sends us.
        </p>
      </div>
    </section>
  );
}

/* ─────────────── Vision Section ─────────────── */

function VisionSection() {
  return (
    <section id="vision" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <SparklesIcon className="w-8 h-8 text-primary" />
        </div>
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          Our Vision
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 leading-tight">
          Where We&apos;re Going
        </h2>

        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-accent/20">
          <blockquote className="text-xl sm:text-2xl text-foreground/80 leading-relaxed italic">
            &ldquo;A Church on Mission for Christ &mdash; reaching every corner of the DMV.&rdquo;
          </blockquote>
          <p className="text-text-muted text-sm mt-6">
            — The Mission Church Vision Statement
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Faith",
              desc: "Rooted in God's Word, growing together in truth and grace.",
            },
            {
              title: "Community",
              desc: "Real relationships built on love, trust, and mutual support.",
            },
            {
              title: "Mission",
              desc: "Sent to serve — making a difference in our neighborhood and beyond.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-accent/10 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-primary-dark mb-2">
                {value.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Visit / What to Expect Section ─────────────── */

function VisitSection() {
  return (
    <section id="visit" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Plan Your Visit
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            What to Expect
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            We know visiting a new church can feel intimidating. Here&apos;s
            what you can expect when you walk through our doors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info Cards */}
          <div className="space-y-6">
            {[
              {
                icon: <ClockIcon className="w-6 h-6 text-primary" />,
                title: "Service Times",
                desc: "Sundays at 10:00 AM — Join us for worship, the Word, and fellowship—we would love to see you there!",
              },
              {
                icon: <BookOpenIcon className="w-6 h-6 text-primary" />,
                title: "Life Groups",
                desc: "Connect beyond Sunday in smaller groups for friendship, prayer, and growing together in Scripture.",
              },
              {
                icon: <SparklesIcon className="w-6 h-6 text-primary" />,
                title: "Worship Nights",
                desc: "Join us for evenings focused on praise, prayer, and worship as we seek God together.",
              },
              {
                icon: <MapFoldIcon className="w-6 h-6 text-primary" />,
                title: "DMV Community",
                desc: "We welcome neighbors from Northern Virginia, DC, and Maryland—whether you're new to the area, exploring faith, or looking for a church family.",
              },
              {
                icon: <UsersIcon className="w-6 h-6 text-primary" />,
                title: "Come As You Are",
                desc: "No dress code, no judgment. Whether it's jeans and sneakers or your Sunday best, you're welcome here.",
              },
              {
                icon: <HeartIcon className="w-6 h-6 text-primary" />,
                title: "For Families",
                desc: "We love kids! Safe, fun, and engaging programs available for children of all ages during service.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Church Photo */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img src="/images/outreach.jpeg" alt="Our church community" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Prayer Section ─────────────── */

function PrayerRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    const trimmed = request.trim();
    if (!trimmed) {
      setErrorMessage("Prayer request message is required.");
      setStatus("error");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm("prayer-request", {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        request: trimmed.slice(0, 5000),
        "bot-field": "",
      });
      if (!res.ok) {
        setErrorMessage("Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setRequest("");
    } catch {
      setErrorMessage("Could not send your request. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left">
        <div className="w-14 h-14 rounded-full bg-accent-light/20 flex items-center justify-center mb-4">
          <HeartIcon className="w-7 h-7 text-accent-light" />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank you</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Your prayer request was received. Our team will pray for you.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-accent-light font-semibold text-sm hover:text-white transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      name="prayer-request"
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left"
    >
      <div className="w-14 h-14 rounded-full bg-accent-light/20 flex items-center justify-center mx-auto sm:mx-0 mb-4">
        <HeartIcon className="w-7 h-7 text-accent-light" />
      </div>
      <h3 className="text-xl font-bold mb-1 text-center sm:text-left">Submit a Prayer Request</h3>
      <p className="text-white/60 text-sm leading-relaxed mb-6">
        Share as much or as little as you&apos;re comfortable with. Optional contact info helps us follow up only if you want that.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="prayer-name" className="block text-xs font-medium text-white/60 mb-1.5">
            Name <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="prayer-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="prayer-email" className="block text-xs font-medium text-white/60 mb-1.5">
            Email <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="prayer-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/50"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="prayer-phone" className="block text-xs font-medium text-white/60 mb-1.5">
            Phone <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="prayer-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/50"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor="prayer-request" className="block text-xs font-medium text-white/60 mb-1.5">
            How can we pray for you? <span className="text-accent-light">*</span>
          </label>
          <textarea
            id="prayer-request"
            name="request"
            required
            rows={4}
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/50 resize-y min-h-[100px]"
            placeholder="Your prayer request…"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-accent-light text-primary-dark px-5 py-3 rounded-full text-sm font-semibold hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send prayer request"}
      </button>
    </form>
  );
}

function PrayerSection() {
  return (
    <section id="prayer" className="py-20 sm:py-28 bg-primary-dark text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
          <HeartIcon className="w-8 h-8 text-accent-light" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          We&apos;d Love to Pray for You
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Whatever you&apos;re going through, you don&apos;t have to face it
          alone. Share your prayer request and our team will lift you up in
          prayer.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          <PrayerRequestForm />

          {/* Prayer Line */}
          <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all h-fit">
            <div className="w-14 h-14 rounded-full bg-accent-light/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <PhoneIcon className="w-7 h-7 text-accent-light" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Call Our Prayer Line</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4 text-center">
              Speak directly with someone who cares. Our prayer line is
              available for you.
            </p>
            <p className="text-center text-accent-light font-semibold text-lg">Coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Image Gallery / Community Section ─────────────── */

function CommunitySection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Life at The Mission Church
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            A Place to Belong
          </h2>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Worship", size: "col-span-2 row-span-2", aspect: "aspect-square", img: "/images/worship.jpeg" },
            { label: "Life Groups", size: "", aspect: "aspect-square", img: "/images/life-group.jpeg" },
            { label: "Youth", size: "", aspect: "aspect-square", img: "/images/youth.jpg" },
            { label: "DMV Outreach", size: "", aspect: "aspect-square", img: "/images/outreach.jpeg" },
            { label: "Fellowship", size: "", aspect: "aspect-square", img: "/images/fellowship.jpg" },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.size} ${item.aspect} rounded-2xl overflow-hidden relative group`}
            >
              <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary-dark/30 group-hover:bg-primary-dark/40 transition-colors flex items-end p-4">
                <p className="text-white text-sm font-semibold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Stay connected (Google Form CTA) ─────────────── */

function StayConnectedCtaSection() {
  return (
    <section id="stay-connected" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-8 sm:p-12 text-white text-center shadow-lg">
          <p className="text-accent-light text-sm font-semibold tracking-widest uppercase mb-3">
            Welcome to The Mission Church
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            We&apos;d Love to Stay Connected With You
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Share your contact info, how you&apos;d like to get involved (serve, life groups, sports,
            young adults), when you&apos;re typically available, and how we can pray for you.
          </p>
          <a
            href={STAY_CONNECTED_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary-dark px-8 py-3.5 rounded-full font-semibold hover:bg-accent-light transition-colors shadow-lg"
          >
            Open connection form
          </a>
          <p className="mt-4 text-sm text-white/55">
            Opens a short Google Form in a new tab
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Connect / Social Section ─────────────── */

function ConnectSection() {
  return (
    <section id="connect" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          Stay Connected
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Follow Along With Us
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto mb-10">
          Stay up to date with what&apos;s happening at The Mission Church — encouragement,
          event updates, and community highlights across Northern Virginia and the greater DMV.
        </p>

        <p className="text-text-muted font-medium mb-12">Coming soon</p>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 sm:p-12 text-white">
          {/* Image placeholder */}
          <div className="mx-auto mb-6 flex justify-center">
            <img
              src="/logo/logo-white.svg"
              alt="The Mission Church"
              className="h-24 sm:h-28 w-auto max-w-[min(100%,24rem)] object-contain"
              width={444}
              height={437}
            />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            We Can&apos;t Wait to Meet You
          </h3>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            Whether it&apos;s your first time or you&apos;re looking for a church
            home, our doors are open and our hearts are ready.
          </p>
          <a
            href="#visit"
            className="inline-flex items-center gap-2 bg-white text-primary-dark px-8 py-3.5 rounded-full font-semibold hover:bg-accent-light transition-colors shadow-lg"
          >
            Plan Your Visit
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Contact (footer) ─────────────── */

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    const em = email.trim();
    const msg = message.trim();
    if (!em) {
      setErrorMessage("Email is required.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!msg) {
      setErrorMessage("Please enter a message.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm("contact", {
        name: name.trim(),
        email: em,
        message: msg.slice(0, 5000),
        "bot-field": "",
      });
      if (!res.ok) {
        setErrorMessage("Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("Could not send your message. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-white/70 leading-relaxed">
        Thank you — we received your message and will be in touch when we can.
      </p>
    );
  }

  return (
    <form name="contact" onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="contact-name" className="block text-xs font-medium text-white/50 mb-1">
          Name <span className="text-white/35">(optional)</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/40"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-xs font-medium text-white/50 mb-1">
          Email <span className="text-accent-light">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/40"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs font-medium text-white/50 mb-1">
          Message <span className="text-accent-light">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-accent-light/40 resize-y min-h-[72px]"
          placeholder="How can we help?"
        />
      </div>
      {errorMessage && (
        <p className="text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center bg-accent-light text-primary-dark px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

/* ─────────────── Footer ─────────────── */

function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <div className="mb-5">
              <img
                src="/logo/logo-white.svg"
                alt="The Mission Church"
                className="h-16 sm:h-20 md:h-24 w-auto max-w-[min(100%,26rem)] object-contain object-left"
                width={444}
                height={437}
              />
            </div>
            <p className="text-white/50 text-base leading-relaxed">
              A welcoming non-denominational church serving Northern Virginia
              and the DMV.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/70 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Welcome", href: "#welcome" },
                { label: "Our Vision", href: "#vision" },
                { label: "Plan Your Visit", href: "#visit" },
                { label: "Get connected", href: "#stay-connected" },
                { label: "Prayer Request", href: "#prayer" },
                { label: "Contact", href: "#contact" },
                {
                  label: "Connection form",
                  href: STAY_CONNECTED_FORM_URL,
                  external: true,
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/70 mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-white/50 mb-5">
              <p className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 shrink-0 text-white/30" />
                Coming soon
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 shrink-0 text-white/30" />
                Coming soon
              </p>
            </div>
            <p className="text-xs font-medium text-white/50 mb-3">Send us a message</p>
            <ContactForm />
            <p className="text-sm text-white/50 mt-5">Social media — Coming soon</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} The Mission Church. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Main Page ─────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <MissionBanner />
      <VisionSection />
      <VisitSection />
      <PrayerSection />
      <CommunitySection />
      <StayConnectedCtaSection />
      <ConnectSection />
      <Footer />
    </>
  );
}
