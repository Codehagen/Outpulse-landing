"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Use Textarea for message
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Use Label for accessibility
import { submitContactForm } from "@/app/contact/actions"; // Adjust path if necessary
import { Loader2, CheckCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sender...
        </>
      ) : (
        "Send melding"
      )}
    </Button>
  );
}

export function ContactForm() {
  const initialState = { message: null, success: null, errors: {} };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // If submission was successful, show the success message
  if (state.success === true) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-green-50 p-6 text-center dark:bg-green-900/20">
        <CheckCircle className="mb-3 h-10 w-10 text-green-600" />
        <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
          Melding sendt!
        </h3>
        <p className="mt-1 text-sm text-green-700 dark:text-green-400">
          {state.message || "Takk for din henvendelse."}
        </p>
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* General Error Message */}
      {state.message && !state.success && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/30 dark:text-red-300">
          {state.message}
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Navn</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Ditt navn"
          required
          aria-describedby="name-error"
        />
        {state.errors?.name && (
          <p id="name-error" className="text-sm text-red-600">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">E-post</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="din.epost@eksempel.com"
          required
          aria-describedby="email-error"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-red-600">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">Melding</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Skriv din melding her..."
          required
          rows={5}
          aria-describedby="message-error"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-red-600">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
