"use client";

import { useState } from "react";

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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width={24} height={24}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width={24} height={24}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width={24} height={24}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

function CapitolIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75a2.25 2.25 0 0 0-2.25 2.25v.75h4.5V6A2.25 2.25 0 0 0 12 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 9.75h13.5M6.75 9.75V15m3-5.25V15m3-5.25V15m3-5.25V15m-12 3h13.5M3.75 18h16.5" />
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

/* ─────────────── Navigation ─────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const paypalHref = "https://paypal.com";

  const links = [
    { label: "Welcome", href: "#welcome" },
    { label: "Vision", href: "#vision" },
    { label: "Visit", href: "#visit" },
    { label: "Prayer", href: "#prayer" },
    { label: "Connect", href: "#connect" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Name */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              TMC
            </div>
            <span className="text-lg font-bold text-primary-dark tracking-tight hidden sm:inline">
              The Mission Church
            </span>
            <span className="text-lg font-bold text-primary-dark tracking-tight sm:hidden">
              TMC
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={paypalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Donate
            </a>
            <a
              href="#prayer"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              <HeartIcon className="w-4 h-4" />
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
                  className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={paypalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3 mt-2 inline-flex items-center justify-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Donate
              </a>
              <a
                href="#prayer"
                onClick={() => setMobileOpen(false)}
                className="mx-3 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                <HeartIcon className="w-4 h-4" />
                Prayer Request
              </a>
            </div>
          </div>
        )}
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
        <img src="/images/hero.jpg" alt="The Mission Church community" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 via-primary-dark/50 to-primary-dark/30" />
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

        {/* Video Placeholder — replace with <video> or embed */}
        <div className="mt-10 w-full max-w-2xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/5 aspect-video flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-all shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-primary-dark/50 to-primary/30" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/80 text-sm font-medium tracking-wide">Watch Our Story</p>
            </div>
            {/* Corner label */}
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest text-white/40 bg-white/10 rounded px-2 py-0.5">
              Video Placeholder
            </span>
          </div>
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
              <img src="/images/home1.jpg" alt="Our community" className="w-full h-full object-cover" />
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
              The Mission Church is a non-denominational community where people
              from all walks of life come together to worship, grow, and go.
              We gather to be transformed — and then we go out to transform
              our neighborhoods, our city, and beyond.
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Whether you&apos;re new to faith or have been walking with God for
              years, there&apos;s a place for you here in the DMV — and a
              purpose waiting for you.
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

        {/* Vision Statement Placeholder */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-accent/20">
          <blockquote className="text-xl sm:text-2xl text-foreground/80 leading-relaxed italic">
            &ldquo;
            {/* TODO: Replace with your actual vision statement */}
            <span className="text-primary font-medium not-italic">
              [Your Vision Statement Here]
            </span>
            &rdquo;
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
                desc: "Sundays at 10:00 AM — Join us for worship, the Word, and fellowship. We'd love to see you there.",
              },
              {
                icon: <MapPinIcon className="w-6 h-6 text-primary" />,
                title: "Location",
                desc: "Northern Virginia (DMV area). Final address details are coming soon. Look for the signs and friendly faces ready to greet you!",
              },
              {
                icon: <CapitolIcon className="w-6 h-6 text-primary" />,
                title: "DMV Community",
                desc: "We welcome neighbors from Northern Virginia, DC, and Maryland who are looking for authentic faith and community.",
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
              <img src="/images/home1.jpg" alt="Our church community" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Prayer Section ─────────────── */

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

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Prayer Request Link */}
          <a
            href="#"
            /* TODO: Replace href with your prayer request form link (e.g., Google Form, Typeform, etc.) */
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-full bg-accent-light/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <HeartIcon className="w-7 h-7 text-accent-light" />
            </div>
            <h3 className="text-xl font-bold mb-2">Submit a Prayer Request</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Fill out our confidential prayer request form and our prayer team
              will begin praying for you.
            </p>
            <span className="inline-flex items-center gap-1 text-accent-light font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
              Submit Request
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </a>

          {/* Prayer Line */}
          <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all">
            <div className="w-14 h-14 rounded-full bg-accent-light/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <PhoneIcon className="w-7 h-7 text-accent-light" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Our Prayer Line</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Speak directly with someone who cares. Our prayer line is
              available for you.
            </p>
            {/* TODO: Replace with actual prayer line phone number */}
            <a
              href="tel:+10000000000"
              className="inline-flex items-center gap-2 text-accent-light font-bold text-lg hover:text-white transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              (000) 000-0000
            </a>
            <p className="text-white/40 text-xs mt-2">[Phone Number TBD]</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Donate Section ─────────────── */

function DonateSection() {
  return (
    <section id="donate" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-accent/20 shadow-sm text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Give Online
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Support the Ministry
          </h2>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Your generosity helps us serve our church family and local
            community. You can give securely through PayPal.
          </p>
          <a
            href="https://paypal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-sm"
          >
            Donate with PayPal
          </a>
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
            { label: "Worship", size: "col-span-2 row-span-2", aspect: "aspect-square", img: "/images/hero.jpg" },
            { label: "Small Groups", size: "", aspect: "aspect-square", img: "/images/home1.jpg" },
            { label: "Youth", size: "", aspect: "aspect-square", img: "/images/hero.jpg" },
            { label: "DMV Outreach", size: "", aspect: "aspect-square", img: "/images/home1.jpg" },
            { label: "Fellowship", size: "", aspect: "aspect-square", img: "/images/hero.jpg" },
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
          Stay up to date with what&apos;s happening at The Mission Church. Follow us on social
          media for encouragement, event updates, and community highlights
          across Northern Virginia and the greater DMV.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {[
            {
              name: "Facebook",
              icon: <FacebookIcon className="w-6 h-6" />,
              href: "#", // TODO: Replace with actual Facebook link
              color: "hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]",
            },
            {
              name: "Instagram",
              icon: <InstagramIcon className="w-6 h-6" />,
              href: "#", // TODO: Replace with actual Instagram link
              color: "hover:bg-[#e4405f] hover:text-white hover:border-[#e4405f]",
            },
            {
              name: "YouTube",
              icon: <YouTubeIcon className="w-6 h-6" />,
              href: "#", // TODO: Replace with actual YouTube link
              color: "hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000]",
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 transition-all ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 sm:p-12 text-white">
          {/* Image placeholder */}
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            {/* 
              TODO: Replace with church logo
              <Image src="/images/logo.png" alt="The Mission Church Logo" width={48} height={48} />
            */}
            <span className="text-2xl font-bold">TMC</span>
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

/* ─────────────── Footer ─────────────── */

function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[0.65rem] leading-none">
                TMC
              </div>
              <span className="font-bold text-lg">The Mission Church</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
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
                { label: "Prayer Request", href: "#prayer" },
                { label: "Donate", href: "https://paypal.com", external: true },
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
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/70 mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-white/50">
              <p className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-white/30" />
                {/* TODO: Replace with actual address */}
                [Northern Virginia Campus Address TBD]
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-white/30" />
                {/* TODO: Replace with actual phone */}
                <a href="tel:+10000000000" className="hover:text-white transition-colors">
                  (000) 000-0000
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {/* TODO: Replace hrefs with actual social media links */}
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="YouTube">
                <YouTubeIcon className="w-5 h-5" />
              </a>
            </div>
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
      <DonateSection />
      <CommunitySection />
      <ConnectSection />
      <Footer />
    </>
  );
}
