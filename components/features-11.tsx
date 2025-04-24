import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Globe,
  Calendar,
  Database,
  MessageSquare,
  GitBranch,
  User,
  FileText,
  CheckSquare,
  Clock,
} from "lucide-react";

export default function Features3() {
  return (
    <section className="dark:bg-muted/25 bg-zinc-50 py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            Alt i én arbeidsflyt
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-balance">
            Book et møte. Oppdater CRM. Send en SMS. Outpulse integrerer med
            dine systemer slik at AI-agentene ikke bare snakker, men tar
            handling. Du definerer samtalen og beslutningspunktene, Outpulse
            gjør resten.
          </p>
        </div>

        <div className="mx-auto grid gap-2 sm:grid-cols-5">
          <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
            <CardHeader>
              <div className="md:p-6">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  <p className="font-medium">Book et møte</p>
                </div>
                <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                  Outpulse kan automatisk booke møter direkte i din kalender.
                  AI-agenten finner passende tidspunkter, sender bekreftelser og
                  reduserer &quot;no-shows&quot;.
                </p>
              </div>
            </CardHeader>

            <div className="relative h-fit pl-6 md:pl-12">
              <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_50%_0%,transparent,var(--color-background)_100%)]"></div>

              <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t p-4 dark:bg-zinc-950">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/10 p-3 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">April 2024</h3>
                      <div className="flex gap-2">
                        <button className="p-1 rounded hover:bg-primary/20">
                          <Clock className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 p-3">
                    {["M", "T", "O", "T", "F", "L", "S"].map((day, i) => (
                      <div
                        key={i}
                        className="text-center text-xs text-muted-foreground py-1"
                      >
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                      <div
                        key={date}
                        className={`text-center p-1 text-sm ${
                          date === 15
                            ? "bg-primary text-primary-foreground rounded-full"
                            : ""
                        } ${
                          [8, 12, 18, 25].includes(date)
                            ? "border rounded-md"
                            : ""
                        }`}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-3">
                    <div className="flex justify-between gap-2">
                      <div className="text-xs text-muted-foreground">
                        <CheckSquare className="size-3 inline mr-1" />
                        <span>Ledige tidspunkter</span>
                      </div>
                      <button className="text-xs text-primary">
                        Vis flere
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
            <CardHeader className="p-6">
              <div className="flex items-center gap-2">
                <Database className="size-5 text-primary" />
                <p className="font-medium">Oppdater CRM</p>
              </div>
              <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                AI-agenten oppdaterer kundedata og logger samtaler automatisk i
                ditt CRM-system.
              </p>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <div className="relative">
                <div className="overflow-hidden rounded-lg border p-4 bg-background">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-2 border-b">
                      <User className="size-4 text-primary" />
                      <span className="text-sm font-medium">Kundedata</span>
                    </div>
                    <div className="space-y-2 p-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          Navn:
                        </span>
                        <span className="text-xs font-medium">Anna Hansen</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          Status:
                        </span>
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 rounded-full">
                          Aktiv
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          Samtaler:
                        </span>
                        <span className="text-xs font-medium">3</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border-t">
                      <FileText className="size-4 text-primary" />
                      <span className="text-xs font-medium">Siste notat</span>
                    </div>
                    <div className="text-xs p-2 bg-muted/50 rounded border">
                      Interessert i produktdemo. Følg opp neste uke.
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_75%_50%,transparent,var(--color-background)_100%)]"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="group p-6 shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-12">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="size-5 text-primary" />
              <p className="font-medium">Send SMS</p>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm mb-8">
              Send påminnelser, bekreftelser eller oppfølginger automatisk etter
              samtalen.
            </p>

            <div className="flex justify-center gap-6">
              <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 relative flex aspect-square size-16 items-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                <span className="absolute right-2 top-1 block text-sm">
                  SMS
                </span>
                <MessageSquare className="mt-auto size-4" />
              </div>
              <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                <Globe className="size-4" />
              </div>
            </div>
          </Card>
          <Card className="group relative shadow-zinc-950/5 sm:col-span-3 sm:rounded-none sm:rounded-br-xl">
            <CardHeader className="p-6 md:p-12">
              <div className="flex items-center gap-2">
                <GitBranch className="size-5 text-primary" />
                <p className="font-medium">Dynamisk samtaleflyt</p>
              </div>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                Du definerer samtalens gang og beslutningspunkter. AI-en
                tilpasser seg hvert svar og tar handling.
              </p>
            </CardHeader>
            <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                  <img
                    className="m-auto size-8 invert dark:invert-0"
                    src="https://oxymor-ns.tailus.io/logos/linear.svg"
                    alt="Linear logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                  <img
                    className="m-auto size-8 invert dark:invert-0"
                    src="https://oxymor-ns.tailus.io/logos/netlify.svg"
                    alt="Netlify logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                  <img
                    className="m-auto size-8 invert dark:invert-0"
                    src="https://oxymor-ns.tailus.io/logos/github.svg"
                    alt="github logo"
                    width="32"
                    height="32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
