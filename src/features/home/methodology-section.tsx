import { ListOrdered, Eye, BookCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const methodologySteps = [
  {
    icon: ListOrdered,
    title: "التسلسل والترتيب الشرعي",
    description:
      "تدرج تعليمي منطقي يتبع خطوات الوضوء ومواضع الصلاة بحسب ما ورد في السنة النبوية الصحيحة، خطوة تلو الأخرى.",
  },
  {
    icon: Eye,
    title: "الشرح البصري التوضيحي",
    description:
      "رسوم تعليمية مرسومة خصيصاً لتوضيح هيئة العضو وحدوده بدقة، كحدود الوجه والمرفقين وهيئات الركوع والسجود.",
  },
  {
    icon: BookCheck,
    title: "التمييز بين الفروض والسنن",
    description:
      "بيان واضح لما هو ركن وفرض واجب لا تصح العبادة بدونه، وما هو سنة مؤكدة ومستحب يُثاب فاعله ولا تبطل بتركه.",
  },
  {
    icon: Sparkles,
    title: "تحقيق الخشوع والطمأنينة",
    description:
      "توفير الأدعية والأذكار مشكولة بالكامل بالحركات الإعرابية لتيسير نطقها الصحيح وتحقيق السكينة في الصلاة.",
  },
];

export function MethodologySection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeading
          centered
          badge="منهجية التعلم"
          title="كيف تضمن المنصة تعليماً صحيحاً وميسراً؟"
          description="صُممت التجربة التعليمية لتكون مناسبة لجميع الأعمار؛ من الأطفال والناشئة إلى الكبار، وفق معايير فقهية دقيقة."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {methodologySteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-subtle hover:shadow-card transition-shadow text-right space-y-3"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
