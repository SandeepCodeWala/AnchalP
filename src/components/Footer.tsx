import Container from "@/components/Container";
import { useI18n } from "@/i18n/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/6">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <div className="font-display text-lg tracking-wide text-zinc-900/90 dark:text-white/90">
            {t("brandName")}
          </div>
          <p className="max-w-md text-sm text-zinc-600 dark:text-white/60">
            {t("footerBody")}
          </p>
        </div>

        <div className="text-sm text-zinc-600 dark:text-white/50">
          © {new Date().getFullYear()} {t("brandName")}. {t("crafted")}
        </div>
      </Container>
    </footer>
  );
}
