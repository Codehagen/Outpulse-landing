import { CheckCircle2, Clock, PieChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturesBenefits() {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Spar tid",
      description:
        "Reduser administrative oppgaver med 70%. AI-agenter håndterer repetitive henvendelser, booking og oppfølging automatisk.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Bedre kundeopplevelse",
      description:
        "Umiddelbar respons 24/7. Personlige samtaler. Konsistent kommunikasjon som bygger tillit og reduserer ventetid.",
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "Økt konvertering",
      description:
        "Fang opp flere leads med proaktiv kontakt. Reduser frafall med 40% gjennom intelligent oppfølging av potensielle kunder.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Skalerbar løsning",
      description:
        "Håndter hundrevis av samtaler samtidig uten å øke bemanning. Skalér opp eller ned etter behov uten ekstra kostnader.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Fordelene med Outpulse
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oppdag hvordan Outpulse kan transformere kundeinteraksjoner og
            frigjøre ressurser i din bedrift
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute -top-20 -right-20 size-40 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-background">
                {benefit.icon}
              </div>

              <h3 className="mb-2 text-xl font-medium">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="rounded-xl bg-muted/50 p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-medium md:text-3xl">
                Klar til å automatisere kundeinteraksjoner?
              </h3>
              <p className="mt-4 text-muted-foreground">
                Prøv Outpulse i dag og se hvordan AI-agenter kan frigjøre tid,
                forbedre kundekommunikasjon og øke konvertering for din bedrift.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="#">Kom i gang</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#">Be om demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
