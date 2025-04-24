"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Database, Phone, Calendar, ClipboardCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function Features() {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  const images = {
    "item-1": {
      image: "/charts.png",
      alt: "Illustrasjon av AI salgsagent",
    },
    "item-2": {
      image: "/music.png",
      alt: "Illustrasjon av AI kundeservice",
    },
    "item-3": {
      image: "/mail2.png",
      alt: "Illustrasjon av AI avtalebooking",
    },
    "item-4": {
      image: "/payments.png",
      alt: "Illustrasjon av AI lead-kvalifisering",
    },
  };

  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            Hva er Outpulse?
          </h2>
          <p>
            Outpulse gjør det enkelt å bruke AI-roboter for bedriften din.
            Outpulse er den perfekte ansatte som kan håndtere salg, møte booking
            og all din kundesupport. Outpulse´s AI høres ut som et menneske, kan
            snakke alle språk og jobber 24/7.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Database className="size-4" />
                  AI Salgsagenter
                </div>
              </AccordionTrigger>
              <AccordionContent>
                La Outpulse sine AI-agenter jobbe utrettelig med salg 24/7. De
                kan ringe potensielle kunder, følge opp leads og booke møter –
                alt med en naturlig, menneskelig stemme.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Phone className="size-4" />
                  AI Kundeservice
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Forbedre kundeopplevelsen med AI-drevet support. Outpulse svarer
                på vanlige spørsmål, løser problemer og gir assistanse døgnet
                rundt, slik at dine ansatte kan fokusere på mer komplekse saker.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Calendar className="size-4" />
                  AI Avtalebooking
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Automatiser bookingprosessen. Outpulse kan integreres med
                kalenderen din for å avtale møter, sende bekreftelser og
                påminnelser, og redusere &quot;no-shows&quot;.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <ClipboardCheck className="size-4" />
                  AI Lead-kvalifisering
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Effektiviser salgsprosessen ved å la Outpulse kvalifisere leads.
                AI-agenten stiller de riktige spørsmålene og sender kun de
                varmeste leadene videre til salgsteamet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
            <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  <Image
                    src={images[activeItem].image}
                    className="size-full object-cover object-left-top dark:mix-blend-lighten"
                    alt={images[activeItem].alt}
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
