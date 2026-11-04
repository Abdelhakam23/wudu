import { ShieldCheck, Smartphone, Search, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    icon: ShieldCheck,
    title: "أدلة نبوية موثقة",
    description:
      "جميع الأحاديث والأحكام مستمدة من أصح المصادر الإسلامية كصحيحي البخاري ومسلم، مع توثيق الرواة وأرقام الأحاديث.",
  },
  {
    icon: Smartphone,
    title: "تصميم متجاوب وسهل الاستخدام",
    description:
      "واجهة عربية أصيلة متوافقة تماماً مع الهواتف الذكية والأجهزة اللوحية وشاشات الحاسوب، بخطوط واضحة ومريحة للعين.",
  },
  {
    icon: Search,
    title: "بحث ذكي شامل",
    description:
      "محرك بحث عربي متطور يدعم التجريد من التشكيل ومرادفات الكلمات للوصول السريع إلى أي خطوة أو ذكر أو حديث.",
  },
  {
    icon: Users,
    title: "ملائمة لجميع الفئات العمرية",
    description:
      "محتوى رصين وسهل ومبسط يناسب تعليم الأطفال في المدارس والبيوت، كما يفيد الكبار والمسلمين الجدد.",
  },
];

export function PlatformFeatures() {
  return (
    <section className="py-16 md:py-20 bg-brand-sage/10 border-t border-border/60">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeading
          centered
          badge="مميزات المنصة"
          title="لماذا منصة تعليم الوضوء والصلاة؟"
          description="بيئة تعليمية إلكترونية نقية من الإعلانات والمشتتات، مخصصة لخدمة الركنين الأعظمين في الإسلام."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-subtle text-right"
              >
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 text-accent-light" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
