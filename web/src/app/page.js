import CtaButton from "@/components/cta/cta";
import GlowMenu from "@/components/left-nav/glow-menu";

function LeftNav() {
  const items = [
    {
      label: "Начало",
      path: "M3 10v10h18V10l-9-7-9 7zm9 9V8.5L18.5 12V19h-13v-7l4.5-3.5V19z",
      href: "#home",
    },
    {
      label: "Кои сме ние",
      path: "M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z",
      href: "#about",
    },
    {
      label: "Портфолио",
      path: "M4 7h7v7H4V7zm9 0h7v7h-7V7zM4 16h7v4H4v-4zm9 0h7v4h-7v-4z",
      href: "#work",
    },
    {
      label: "Контакти",
      path: "M4 6h16v12H4V6zm8 5L4 6h16l-8 5z",
      href: "#contact",
    },
  ];

  function NavItem({ d, text, href }) {
    return (
      <a
        href={href}
        className="group/item relative flex items-center gap-3 rounded-xl px-2 py-2 text-white/80 hover:text-white transition-colors"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path d={d} fill="currentColor" />
          </svg>
        </span>
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 group-hover/item:opacity-100 blur-md transition-opacity duration-300 [background:radial-gradient(70%_60%_at_20%_20%,rgba(34,211,238,.25),transparent_60%)]" />
        <span className="whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm">
          {text}
        </span>
      </a>
    );
  }

  return (
    <aside className="group relative z-40 h-full">
      <div className="h-full w-[72px] group-hover:w-[240px] transition-[width] duration-300 rounded-3xl bg-white/5 border border-white/10 backdrop-blur p-3 overflow-visible">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <span className="text-xl font-black">G</span>
          </div>
          <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">Меню</span>
        </div>

        {/* Items */}
        <nav role="navigation" className="mt-6 flex flex-col gap-2">
          {items.map((it) => (
            <NavItem key={it.label} d={it.path} text={it.label} href={it.href} />
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-3 left-3 right-3">
          <a href="#start" className="group/cta relative flex items-center gap-3 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 px-2 py-2 text-cyan-200 hover:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-200">
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z" fill="currentColor" />
              </svg>
            </span>
            <span className="whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-semibold">
              Стартирай
            </span>
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover/cta:opacity-100 blur-lg transition-opacity duration-300 [background:radial-gradient(70%_60%_at_20%_20%,rgba(34,211,238,.35),transparent_60%)]" />
          </a>
        </div>
      </div>
    </aside>
  );
}

function MiniBarChart() {
  return (
    <div className="flex items-end gap-1 h-16">
      {[6, 12, 8, 14, 9, 15, 10, 8, 12, 5].map((h, i) => (
        <div key={i} className="w-1.5 rounded-full bg-white/70" style={{ height: `${h * 4}px` }} />
      ))}
    </div>
  );
}

function Knob() {
  return (
    <div className="relative aspect-square w-full max-w-[260px] mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-600" />
      <div className="absolute inset-[6%] rounded-full bg-neutral-900" />
      <div className="absolute inset-[20%] rounded-full bg-neutral-800" />
      <div className="absolute right-[18%] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-6">
      <div className="grid h-[calc(100vh-2rem)] grid-cols-[88px_1fr_360px] grid-rows-[1fr] gap-4 sm:gap-6">
        {/* Left header/sidebar with animated glow menu */}
        <GlowMenu
          items={[
            { label: "Начало", path: "M3 10v10h18V10l-9-7-9 7zm9 9V8.5L18.5 12V19h-13v-7l4.5-3.5V19z", href: "#home" },
            { label: "Кои сме ние", path: "M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z", href: "#about" },
            { label: "Портфолио", path: "M4 7h7v7H4V7zm9 0h7v7h-7V7zM4 16h7v4H4v-4zm9 0h7v4h-7v-4z", href: "#work" },
            { label: "Контакти", path: "M4 6h16v12H4V6zm8 5L4 6h16l-8 5z", href: "#contact" },
          ]}
          cta={{ label: "Стартирай", href: "#start" }}
        />

        {/* Main showcase */}
        <section className="relative rounded-[28px] bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 overflow-hidden">
          {/* Notch illusion cut-in */}
          <div className="absolute -top-7 left-1/2 z-20 -translate-x-1/2 h-14 w-[46%] rounded-b-[48px] bg-neutral-950 border-x border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]" />

          {/* Brand inside the big element */}
          <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2">
            <div className="rounded-full bg-white/5 border border-white/10 px-5 py-2 backdrop-blur">
              <p className="text-sm tracking-widest font-semibold">H&M WEBSITE PROVISIONING</p>
            </div>
          </div>

          {/* Top bar glass overlay */}
          <div className="absolute inset-x-0 top-0 z-10 h-24 rounded-b-[44px] bg-neutral-950/40 backdrop-blur-sm border-b border-white/10" />

          <div className="relative h-full grid grid-cols-1 md:grid-cols-2">
            {/* hero copy */}
            <div className="flex flex-col justify-end md:justify-center p-8 sm:p-12 gap-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                Създай своя
                <br /> УЕБСАЙТ
              </h2>
              <p className="text-white/70 max-w-sm">Изработваме бързи и модерни уебсайтове с Next.js и Tailwind. Оптимизирани за SEO, конверсия и скорост.</p>
              <div className="pt-2">
                <CtaButton href="#">Започни сега</CtaButton>
              </div>
            </div>

            {/* product visual placeholder */}
            <div className="relative flex items-center justify-center p-8">
              <div className="absolute bottom-8 h-24 w-64 rounded-full bg-black/70 blur-2xl" />
              <div className="relative h-64 w-48 sm:h-80 sm:w-60 rounded-[28px] bg-gradient-to-br from-zinc-200 to-zinc-500 shadow-2xl" />
            </div>
          </div>

          {/* bottom-left info card */}
          <div className="absolute left-6 bottom-6 w-[min(520px,92%)]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-lg font-semibold">Стартер пакет за уебсайт</p>
              <p className="mt-2 text-sm text-white/70">Бърз, отзивчив сайт с чист семантичен код, интегрирани анализи и базова on-page SEO оптимизация. Готов за публикуване за дни, не месеци.</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 text-sm font-semibold">
                  От 2 999 лв
                </span>
                <CtaButton href="#">Започни проекта</CtaButton>
              </div>
            </div>
          </div>
        </section>

        {/* Right column cards */}
        <aside className="grid grid-rows-[1fr_1.2fr] gap-4 sm:gap-6">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold tracking-wider">ПРОИЗВОДИТЕЛНОСТ И SEO</p>
            <p className="mt-2 text-xs text-white/70">90+ Lighthouse резултати (LCP, CLS, INP). Чист HTML, оптимизирани изображения, cache и метаданни.</p>
            <div className="mt-4">
              <MiniBarChart />
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 flex flex-col">
            <div className="flex-1 flex items-center">
              <Knob />
            </div>
            <p className="mt-4 text-sm font-bold tracking-wider">ЛЕСНО УПРАВЛЕНИЕ</p>
            <p className="text-xs text-white/70">Админ достъп и визуални контроли за бързи промени без код. Интеграция с хостинг и домейн.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
