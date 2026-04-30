import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import { useI18n } from "@/i18n/i18n";
import { useTheme } from "@/theme/theme";
import { cn } from "@/utils/cn";

function NavLink({
  href,
  children,
  onClick
}: {
  href: string;
  children: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-2 text-sm text-zinc-700 transition dark:text-white/70",
        "hover:text-zinc-950 hover:bg-black/[0.04] dark:hover:text-white dark:hover:bg-white/[0.04]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      )}
    >
      {children}
    </a>
  );
}

export default function Header({
  readingLabel,
  onStart,
  onReset
}: {
  readingLabel: string;
  onStart: () => void;
  onReset: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const togglePill =
    "inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] p-1 text-xs dark:border-white/10 dark:bg-white/[0.03]";
  const toggleOption = (active: boolean) =>
    cn(
      "rounded-full px-3 py-2 font-semibold transition",
      active
        ? "bg-accent text-white shadow-glow"
        : "text-zinc-700 hover:bg-black/[0.04] dark:text-white/75 dark:hover:bg-white/[0.04]"
    );

  const links = useMemo(
    () => [
      { label: t("navAbout"), href: "#about" },
      { label: t("navVoices"), href: "#testimonials" },
      { label: t("navReadings"), href: "#readings" },
      { label: t("navShuffle"), href: "#experience" },
      { label: t("navContact"), href: "#contact" }
    ],
    [t]
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-xl dark:from-midnight/80" />
      <Container className="relative">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-2 py-2 text-zinc-900/90 transition hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white/90 dark:hover:text-white"
            aria-label={t("brandName")}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-black/[0.03] ring-1 ring-black/10 dark:bg-white/[0.04] dark:ring-white/10">
              <span className="text-gold/90">✶</span>
              <span className="absolute -inset-2 rounded-2xl bg-accent/20 blur-xl" />
            </span>
            <span className="font-display text-lg tracking-wide">
              <span className="hidden sm:inline">{t("brandName")}</span>
              <span className="sm:hidden">Anchal P</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <div className={togglePill} aria-label={t("langLabel")}>
              <button
                type="button"
                className={toggleOption(lang === "en")}
                onClick={() => setLang("en")}
              >
                {t("langEnglish")}
              </button>
              <button
                type="button"
                className={toggleOption(lang === "hi")}
                onClick={() => setLang("hi")}
              >
                {t("langHindi")}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "glass inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition",
                "text-zinc-700 ring-black/10 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                "dark:text-white/80 dark:ring-white/10 dark:hover:text-white"
              )}
              aria-label={t("themeLabel")}
              title={theme === "dark" ? t("themeDark") : t("themeLight")}
            >
              {theme === "dark" ? "☾" : "☉"}
            </button>

            <GlowButton variant="ghost" onClick={onReset}>
              {t("reset")}
            </GlowButton>
            <GlowButton onClick={onStart}>{t("startReading")}</GlowButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "glass inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition",
                "text-zinc-700 ring-black/10 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                "dark:text-white/80 dark:ring-white/10 dark:hover:text-white"
              )}
              aria-label={t("themeLabel")}
              title={theme === "dark" ? t("themeDark") : t("themeLight")}
            >
              {theme === "dark" ? "☾" : "☉"}
            </button>

            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className={cn(
                "glass inline-flex h-10 items-center justify-center rounded-full px-3 text-xs font-semibold ring-1 transition",
                "text-zinc-700 ring-black/10 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                "dark:text-white/80 dark:ring-white/10 dark:hover:text-white"
              )}
              aria-label={t("langLabel")}
              title={t("langLabel")}
            >
              {lang === "en" ? t("langHindi") : t("langEnglish")}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 ring-1 ring-black/10 transition hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white/80 dark:ring-white/10 dark:hover:text-white"
              aria-label={t("menu")}
              aria-expanded={open}
            >
              {open ? "×" : "≡"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="lg:hidden"
            >
              <div className="glass mb-3 rounded-2xl p-3 ring-1 ring-black/10 dark:ring-white/10">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {links.map((l) => (
                      <NavLink
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </NavLink>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 border-t border-black/10 pt-3 dark:border-white/10">
                    <div className={togglePill} aria-label={t("langLabel")}>
                      <button
                        type="button"
                        className={toggleOption(lang === "en")}
                        onClick={() => setLang("en")}
                      >
                        {t("langEnglish")}
                      </button>
                      <button
                        type="button"
                        className={toggleOption(lang === "hi")}
                        onClick={() => setLang("hi")}
                      >
                        {t("langHindi")}
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <GlowButton
                        className="flex-1"
                        onClick={() => {
                          setOpen(false);
                          onStart();
                        }}
                      >
                        {t("start")}
                      </GlowButton>
                      <GlowButton
                        className="flex-1"
                        variant="ghost"
                        onClick={() => {
                          setOpen(false);
                          onReset();
                        }}
                      >
                        {t("reset")}
                      </GlowButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
