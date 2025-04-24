import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-medium">
            Outpulse-økosystemet forener AI-agenter, integrasjoner og
            handlingskraft.
          </h2>
          <div className="space-y-6">
            <p>
              Outpulse er mer enn bare samtaler. Det støtter et helt økosystem –
              fra AI-agenter til API-er og plattformer som hjelper bedrifter å
              automatisere kundekontakt effektivt.
            </p>
            <p>
              Systemet vårt{" "}
              <span className="font-bold">
                integrerer sømløst med dine eksisterende verktøy
              </span>{" "}
              – fra kalendere til CRM og meldingssystemer. Dette gjør at
              AI-agentene ikke bare kan kommunisere med kundene dine, men også
              utføre konkrete handlinger som forbedrer arbeidsflyten.
            </p>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="gap-1 pr-1.5"
            >
              <Link href="#">
                <span>Les mer</span>
                <ChevronRight className="size-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
