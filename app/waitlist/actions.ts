"use server";

import { z } from "zod";

// Define the state structure returned by the action
interface WaitlistState {
  message: string | null;
  success: boolean | null;
  email?: string;
  errors?: {
    email?: string[];
  };
}

// Basic schema for email validation
// Using refine to potentially add more complex checks later if needed
const EmailSchema = z.object({
  email: z.string().email({ message: "Ugyldig e-postadresse." }),
});

export async function addToWaitlist(
  prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const emailValue = formData.get("email");

  // Validate email using Zod
  const validatedFields = EmailSchema.safeParse({ email: emailValue });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    // Return error state for display
    return {
      message: fieldErrors.email?.[0] || "Ugyldig e-post.",
      success: false,
      errors: fieldErrors,
    };
  }

  const validatedEmailData = validatedFields.data.email; // Access the email field

  try {
    // --- TODO: Implement actual database/waitlist saving logic here ---
    console.log(`Waitlist submission received: ${validatedEmailData}`);
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success state
    return {
      message: "Takk! Du er nå på ventelisten.",
      success: true,
      email: validatedEmailData, // Optionally return the email
    };
  } catch (error) {
    console.error("Failed to add to waitlist:", error);
    return {
      message: "Noe gikk galt. Prøv igjen senere.",
      success: false,
    };
  }
}
