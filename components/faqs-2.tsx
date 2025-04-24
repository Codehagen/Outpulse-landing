"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQsTwo() {
  const faqItems = [
    {
      id: "item-1",
      question: "Hvordan kommer jeg i gang med Outpulse?",
      answer:
        "Kom i gang på få minutter! Registrer deg på plattformen, definer dine første samtalemaler, og koble til dine eksisterende systemer gjennom våre integrasjoner. Vårt team hjelper deg med oppsett og konfigurasjon.",
    },
    {
      id: "item-2",
      question: "Hvilke systemer kan Outpulse integreres med?",
      answer:
        "Outpulse integrerer med de fleste kalender-systemer (Google Calendar, Microsoft Outlook), CRM-løsninger (Salesforce, HubSpot, Pipedrive), og kommunikasjonskanaler (SMS, e-post, chat). Kontakt oss for å diskutere dine spesifikke integrasjonsbehov.",
    },
    {
      id: "item-3",
      question: "Hvor avanserte er AI-agentene?",
      answer:
        "Våre AI-agenter er bygget på de nyeste språkmodellene og kan håndtere komplekse samtaler, forstå kontekst, og utføre handlinger basert på kundenes svar. De lærer kontinuerlig og blir stadig bedre på å håndtere dine spesifikke kundeinteraksjoner.",
    },
    {
      id: "item-4",
      question: "Hvordan sikrer dere personvern og datasikkerhet?",
      answer:
        "Vi følger strenge GDPR-retningslinjer og bransjestandarder for sikkerhet. All data krypteres både under overføring og lagring. Vi tilbyr dataprosesseringsavtaler (DPA) og lar deg kontrollere hvilke data som lagres og hvordan de brukes.",
    },
    {
      id: "item-5",
      question: "Hva koster Outpulse?",
      answer:
        "Vi tilbyr fleksible prismodeller basert på ditt behov. Fra startpakker for mindre bedrifter til skalerbare enterprise-løsninger. Prisen avhenger av antall samtaler, integrasjoner, og tilleggsfunksjoner. Kontakt oss for et skreddersydd pristilbud.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Ofte stilte spørsmål
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Finn raske og omfattende svar på vanlige spørsmål om vår plattform,
            AI-agenter og integrasjonsmuligheter.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Finner du ikke det du leter etter? Kontakt vårt{" "}
            <Link href="#" className="text-primary font-medium hover:underline">
              supportteam
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
