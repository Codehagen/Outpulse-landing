import { ContactForm } from "@/components/contact-form";
import { HeroHeader } from "@/components/hero5-header";
import FooterSection from "@/components/footer";
import PhoneCallForm from "@/components/phone-call-form";

export default function ContactPage() {
  return (
    <>
      <HeroHeader />
      <main>
        <section className="py-16 pt-32 md:py-24 md:pt-48">
          <div className="mx-auto max-w-2xl px-6">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Kontakt oss
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Har du spørsmål, tilbakemeldinger eller ønsker du en demo? Fyll
                ut skjemaet under, så tar vi kontakt med deg.
              </p>
            </div>

            <PhoneCallForm />
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
