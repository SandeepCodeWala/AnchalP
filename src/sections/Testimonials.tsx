import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import { useI18n } from "@/i18n/i18n";

const reviews = [
  { quote: "Thank you itna honest aur dil se guide karne ke liye… Aap sirf ek tarot reader nahi, ek beautiful soul ho 🌸", date: "Apr 2026", meta: "Beautiful Soul" },
  { quote: "आंचल जी, द्वारा किया गया रीडिंग मुझे 100% कनेक्ट होता है — Thank you so much 🙏", date: "Mar 2026", meta: "100% Connect" },
  { quote: "Aapne mujhe jo samay diya aur itna achha guidance diya — mujhe kaafi clarity aur confidence mila. Dhanyavaad Ma'am 😊", date: "Feb 2026", meta: "Confidence" },
  { quote: "Best readings and perfect prediction. I am totally satisfied with her guidance. Thank you so much ma'am.", date: "Jan 2026", meta: "Satisfied" },
  { quote: "आंचल जी, रीडिंग 100% सही बैठता है — उनके मार्गदर्शन में मुझे करियर में सफलता मिली है ❤️", date: "Jan 2026", meta: "Career Success" },
  { quote: "Career growth aur job ke baare me bilkul clear guidance mila. Dobara consult karunga. ⭐⭐⭐⭐⭐", date: "Jan 2026", meta: "Career Growth" },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <section id="testimonials" className="scroll-mt-20 py-6 sm:py-10">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-white/40">
              {t("testimonialsKicker")}
            </div>
            <h2 className="mt-1 font-display text-2xl text-zinc-950 dark:text-white">
              {t("testimonialsTitle")}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-gold/90">
            {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            <span className="ml-2 text-sm text-zinc-500 dark:text-white/50">4.8</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="glass flex flex-col gap-3 rounded-2xl p-5 ring-1 ring-black/8 dark:ring-white/8"
            >
              <div className="flex gap-0.5 text-xs text-gold/80">
                {"★★★★★".split("").map((s, idx) => <span key={idx}>{s}</span>)}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-white/75 italic">
                "{r.quote}"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                <span className="text-[10px] text-zinc-400 dark:text-white/30">{r.date}</span>
                <span className="rounded-full bg-accent/8 px-2.5 py-0.5 text-[10px] font-semibold text-accent border border-accent/10">
                  {r.meta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
