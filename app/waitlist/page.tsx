import { WaitlistForm } from "@/components/waitlist-form"; // Adjust path if necessary
import { HeroHeader } from "@/components/hero5-header";
import FooterSection from "@/components/footer";

export default function WaitlistPage() {
  return (
    <>
      <HeroHeader />
      <main>
        <section className="py-16 pt-32 md:py-24 md:pt-48">
          <div className="mx-auto max-w-lg px-6">
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Bli med på ventelisten!
              </h1>
              <p className="mt-4 text-muted-foreground">
                Vær blant de første som får tilgang til Outpulse når vi
                lanserer. Motta eksklusive oppdateringer og tidlig tilgang ved å
                legge igjen din e-postadresse under.
              </p>
            </div>

            <div className="mt-8">
              <WaitlistForm />
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Vi sender deg kun relevant informasjon og aldri spam.
            </p>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
