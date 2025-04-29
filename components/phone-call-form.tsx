"use client";

import { useState } from "react";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function PhoneCallForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<
    null | "calling" | "completed" | "failed"
  >(null);

  const handleSubmit = async () => {
    if (!phoneNumber) {
      return;
    }

    setIsModalOpen(true);
  };

  const initiateCall = async () => {
    if (!isConsentGiven) {
      return;
    }

    setIsLoading(true);
    setCallStatus("calling");

    try {
      const response = await fetch("/api/initiate-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          storeNumber: isConsentGiven,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate call");
      }

      setCallStatus("completed");
    } catch (error) {
      console.error("Error initiating call:", error);
      setCallStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <div className="flex flex-col md:flex-row gap-2">
        <PhoneInput
          defaultCountry="NO"
          international={false}
          placeholder="Ditt telefonnummer"
          value={phoneNumber}
          onChange={setPhoneNumber}
          className="flex-1"
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !phoneNumber}
          className="whitespace-nowrap"
        >
          Start samtale
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          {!callStatus && (
            <>
              <DialogHeader>
                <DialogTitle>Prøv Outpulse</DialogTitle>
                <DialogDescription>
                  Vår AI vil ringe deg på {phoneNumber} for å demonstrere
                  hvordan Outpulse fungerer.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-start space-x-2 my-4">
                <Checkbox
                  id="consent-dialog"
                  checked={isConsentGiven}
                  onCheckedChange={(checked) =>
                    setIsConsentGiven(checked as boolean)
                  }
                  className="mt-0.5"
                />
                <Label
                  htmlFor="consent-dialog"
                  className="text-xs text-muted-foreground"
                >
                  Jeg godtar at Outpulse kan lagre mitt nummer og kontakte meg.
                </Label>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Avbryt
                </Button>
                <Button
                  onClick={initiateCall}
                  disabled={isLoading || !isConsentGiven}
                >
                  {isLoading ? "Ringer..." : "Ring meg"}
                </Button>
              </DialogFooter>
            </>
          )}

          {callStatus === "calling" && (
            <>
              <DialogHeader>
                <DialogTitle>Vi ringer deg nå</DialogTitle>
                <DialogDescription>
                  AI ringer deg nå på {phoneNumber}. Vennligst sjekk telefonen
                  din.
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 flex items-center justify-center">
                <div className="animate-pulse bg-primary/20 rounded-full p-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Vil du vite mer om Outpulse?
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#link">Bli med på ventelisten</Link>
                  </Button>
                </div>
              </div>
            </>
          )}

          {callStatus === "completed" && (
            <>
              <DialogHeader>
                <DialogTitle>Samtale startet</DialogTitle>
                <DialogDescription>
                  Vi har startet en samtale til {phoneNumber}. Takk for at du
                  prøver Outpulse!
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 flex items-center justify-center">
                <div className="bg-primary/20 rounded-full p-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Vil du vite mer om Outpulse?
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#link">Bli med på ventelisten</Link>
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setIsModalOpen(false)}>Lukk</Button>
              </DialogFooter>
            </>
          )}

          {callStatus === "failed" && (
            <>
              <DialogHeader>
                <DialogTitle>Kunne ikke ringe</DialogTitle>
                <DialogDescription>
                  Beklager, vi kunne ikke starte samtalen. Vennligst prøv igjen
                  senere.
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 flex items-center justify-center">
                <div className="bg-destructive/20 rounded-full p-4">
                  <svg
                    className="w-8 h-8 text-destructive"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Vil du vite mer om Outpulse?
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#link">Bli med på ventelisten</Link>
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={() => {
                    setCallStatus(null);
                    setIsModalOpen(false);
                  }}
                >
                  Lukk
                </Button>
                <Button onClick={() => setCallStatus(null)} variant="default">
                  Prøv igjen
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
