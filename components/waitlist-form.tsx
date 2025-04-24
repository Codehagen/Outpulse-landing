"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addToWaitlist } from "@/app/waitlist/actions"; // Adjust path if necessary
import { Loader2, CheckCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Vennligst vent...
        </>
      ) : (
        "Bli med"
      )}
    </Button>
  );
}

export function WaitlistForm() {
  const initialState = { message: null, success: null, errors: {} };
  const [state, formAction] = useFormState(addToWaitlist, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form logic could be removed if we replace the form on success
  // useEffect(() => {
  //   if (state.success) {
  //     formRef.current?.reset();
  //   }
  // }, [state]);

  // If submission was successful, show the success message instead of the form
  if (state.success === true) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-green-50 p-6 text-center dark:bg-green-900/20">
        <CheckCircle className="mb-3 h-10 w-10 text-green-600" />
        <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
          Takk!
        </h3>
        <p className="mt-1 text-sm text-green-700 dark:text-green-400">
          {state.message || "Du er nå på ventelisten."}
          <br />
          {state.email && <span className="font-medium">({state.email})</span>}
        </p>
        {/* Optionally add a button to reset/go back? */}
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="flex-grow">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="din.epost@eksempel.com"
            required
            aria-describedby="email-error"
            className="w-full"
            // Clear potential error style if user starts typing again?
            // Might need more complex state management for this
          />
          {state.errors?.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {state.errors.email[0]}
            </p>
          )}
          {/* Show general server error if not an email format error */}
          {state.message && !state.success && !state.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.message}</p>
          )}
        </div>
        <SubmitButton />
      </div>
      {/* Success message below form removed as we now replace the form */}
    </form>
  );
}
