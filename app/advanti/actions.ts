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

// --- New Action for Requesting a Call ---

// Define the state structure for the call request
interface CallRequestState {
  message: string | null;
  success: boolean | null;
  errors?: {
    phone?: string[];
    consent?: string[];
  };
}

// Define the validation schema for the call request
const RequestCallSchema = z.object({
  phone: z
    .string()
    .min(8, { message: "Telefonnummer må inneholde minst 8 siffer." }), // Basic validation, consider a more specific phone regex or library
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du må godta vilkårene for å bli oppringt." }),
  }),
});

export async function requestCallAction(
  prevState: CallRequestState,
  formData: FormData
): Promise<CallRequestState> {
  const rawFormData = {
    phone: formData.get("phone"),
    // Checkbox value comes as "on" or null, convert to boolean for validation
    consent: formData.get("consent") === "on" ? true : false,
  };

  const validatedFields = RequestCallSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      message: "Vennligst korriger feilene.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { phone, consent } = validatedFields.data;

  try {
    console.log(`Initiating call to: ${phone}, consent given: ${consent}`);

    // Make a POST request to the /api/initiate-call endpoint
    const response = await fetch(
      new URL(
        "/api/initiate-call",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      ),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phone, // Ensure this matches the expected field name in /api/initiate-call
          storeNumber: consent, // Assuming /api/initiate-call uses this
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Try to parse error, default to empty object
      console.error(
        "Failed to initiate call via API:",
        response.status,
        errorData
      );
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    // Assuming the API returns a JSON response, you can parse it if needed
    // const responseData = await response.json();
    // console.log("Call initiation API response:", responseData);

    return {
      message: `Vi ringer deg på ${phone} om kort tid!`, // Modify based on actual API response/behavior
      success: true,
    };
  } catch (error) {
    console.error("Request call action failed:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Kunne ikke starte samtale. Prøv igjen senere.";
    return {
      message: errorMessage,
      success: false,
    };
  }
}
