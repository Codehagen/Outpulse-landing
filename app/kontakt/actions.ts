"use server";

import { z } from "zod";

// Define the state structure
interface ContactState {
  message: string | null;
  success: boolean | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

// Define the validation schema
const ContactSchema = z.object({
  name: z.string().min(2, { message: "Navn må inneholde minst 2 tegn." }),
  email: z.string().email({ message: "Ugyldig e-postadresse." }),
  message: z
    .string()
    .min(10, { message: "Meldingen må inneholde minst 10 tegn." }),
});

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Extract form data
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Validate the data
  const validatedFields = ContactSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      message: "Vennligst korriger feilene i skjemaet.",
      success: false,
      errors: fieldErrors,
    };
  }

  // Data is valid
  const { name, email, message } = validatedFields.data;

  try {
    // --- TODO: Implement actual submission logic (e.g., send email, save to DB) ---
    console.log("Contact form submission:", { name, email, message });
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      message: "Takk for din henvendelse! Vi kontakter deg snarlig.",
      success: true,
    };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return {
      message: "Innsending feilet. Noe gikk galt.",
      success: false,
    };
  }
}
