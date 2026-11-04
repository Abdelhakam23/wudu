import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4 text-right">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-4 h-4 text-accent-light" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                {APP_NAME}
              </span>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-md">
              منصة تعليمية إسلامية موثوقة تهدف إلى تيسير تعلم أحكام الطهارة وصفة صلاة النبي ﷺ الصحيحة بأدلتها من القرآن والسنة النبوية الصحيحة، مع الشرح البصري التوضيحي.
            </p>
            <div className="text-xs text-foreground/60 bg-secondary/50 p-3 rounded-md border border-border/60 max-w-md">
              مبنية وفق منهج أهل السنة والجماعة، معتمدة على ما صح في الصحيحين والسنن المعتمدة.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-right">
            <h4 className="text-sm font-semibold text-foreground tracking-wide">
              أقسام المنصة
            </h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Reliable Sources & Verification */}
          <div className="space-y-3 text-right">
            <h4 className="text-sm font-semibold text-foreground tracking-wide">
              المصادر المعتمدة
            </h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>القرآن الكريم (رواية حفص عن عاصم)</li>
              <li>صحيح الإمام البخاري رحمه الله</li>
              <li>صحيح الإمام مسلم رحمه الله</li>
              <li>سنن أبي داود والترمذي والنسائي</li>
              <li>جامع المتون الفقهية المعتمدة</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/60 gap-4">
          <p>
            جميع الحقوق محفوظة © {currentYear} {APP_NAME}. وقف تعليمي لوجه الله تعالى.
          </p>
          <div className="flex items-center gap-1.5">
            <span>نسأل الله القبول والإخلاص</span>
            <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
}
