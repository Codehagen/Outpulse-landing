import { NextRequest, NextResponse } from "next/server";

/**
 * Defines the expected structure of the incoming webhook payload.
 * Based on the user's example, we expect at least a 'telefon' field.
 */
interface IncomingSmsWebhookPayload {
  telefon: string; // The phone number to send the SMS to
  content: string; // The message content for the SMS
  name?: string; // Optional: Name associated with the number (used for logging)
  // Add any other fields that are expected from the webhook provider.
  // If this webhook is from a specific SMS provider like Sveve for *incoming* SMS,
  // refer to their "Motta SMS" (Receive SMS) documentation for the exact payload structure,
  // as the provided documentation was for *sending* SMS.
}

// Define an interface for the Sveve API SendMessage response for better type safety
interface SveveSendResponse {
  response: {
    msgOkCount: number;
    stdSMSCount: number;
    ids: number[];
    fatalError?: string;
    errors?: Array<{
      number: string;
      message: string;
    }>;
  };
}

const SVEVE_API_URL = "https://sveve.no/SMS/SendMessage";

export async function POST(request: NextRequest) {
  console.log("Incoming POST request to /api/webhook/sms");
  try {
    // Ensure the request body is JSON
    if (!request.headers.get("content-type")?.includes("application/json")) {
      console.warn("Received non-JSON request for SMS webhook.");
      return NextResponse.json(
        { error: "Request body must be application/json" },
        { status: 415 }
      );
    }

    const body = await request.json();
    console.log("Webhook payload received:", body);

    // Validate that the body is an object and not an array or primitive
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      console.warn(
        "Invalid payload structure for SMS webhook. Expected a JSON object. Received:",
        body
      );
      return NextResponse.json(
        { error: "Invalid payload structure: expected a JSON object." },
        { status: 400 }
      );
    }

    // Type assertion after basic validation. For more robust validation, consider libraries like Zod.
    const payload = body as IncomingSmsWebhookPayload;
    const { telefon, content, name } = payload;

    if (typeof telefon !== "string" || telefon.trim() === "") {
      console.warn(
        'Missing or invalid "telefon" field in SMS webhook payload:',
        payload
      );
      return NextResponse.json(
        {
          error:
            'Telefonnummer (feltet "telefon") mangler eller er ugyldig i forespørselen.',
        },
        { status: 400 }
      );
    }
    if (typeof content !== "string" || content.trim() === "") {
      console.warn(
        'Missing or invalid "content" field in SMS webhook payload:',
        payload
      );
      return NextResponse.json(
        {
          error:
            'Meldingstekst (feltet "content") mangler eller er ugyldig i forespørselen.',
        },
        { status: 400 }
      );
    }

    console.log(
      `Attempting to send SMS to: ${telefon} with message: "${content}"${
        name ? ` (Name: ${name})` : ""
      }`
    );

    // Prepare data for Sveve API
    const sveveUser = process.env.SVEVE_USER;
    const svevePasswd = process.env.SVEVE_PASSWORD;
    const sveveFrom = process.env.SVEVE_FROM_SENDER || "Outpulse"; // Default sender if not set

    if (!sveveUser || !svevePasswd) {
      console.error(
        "Sveve API credentials (SVEVE_USER, SVEVE_PASSWORD) are not configured in environment variables."
      );
      return NextResponse.json(
        { error: "SMS sending service is not configured." },
        { status: 500 }
      );
    }

    const svevePayload = {
      user: sveveUser,
      passwd: svevePasswd,
      to: telefon,
      msg: content,
      from: sveveFrom,
      f: "json",
    };

    console.log(
      "Sending payload to Sveve API:",
      Omit(svevePayload, ["passwd"])
    );

    const sveveApiResponse = await fetch(SVEVE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(svevePayload),
    });

    const sveveResponseData: SveveSendResponse = await sveveApiResponse.json();
    console.log("Sveve API Response Status:", sveveApiResponse.status);
    console.log("Sveve API Response Data:", sveveResponseData);

    if (
      sveveApiResponse.ok &&
      sveveResponseData.response &&
      sveveResponseData.response.msgOkCount > 0
    ) {
      console.log(
        `Successfully sent ${sveveResponseData.response.msgOkCount} SMS via Sveve.`
      );
      return NextResponse.json(
        {
          message: "Webhook received and SMS sent successfully via Sveve.",
          sveveResponse: sveveResponseData.response,
          details: {
            to: telefon,
            messagePreview:
              content.substring(0, 50) + (content.length > 50 ? "..." : ""),
          },
        },
        { status: 200 }
      );
    } else {
      console.error(
        "Failed to send SMS via Sveve API or all messages failed.",
        sveveResponseData
      );
      return NextResponse.json(
        {
          error: "Failed to send SMS via Sveve.",
          sveveError:
            sveveResponseData.response?.fatalError ||
            "Unknown error from Sveve",
          sveveFullResponse: sveveResponseData.response,
        },
        {
          status:
            sveveApiResponse.status === 200 ? 500 : sveveApiResponse.status,
        }
      );
    }
  } catch (error) {
    console.error("Error processing SMS webhook or calling Sveve API:", error);
    let errorMessage = "Internal server error";
    let statusCode = 500;
    if (error instanceof SyntaxError) {
      errorMessage = "Invalid JSON in request body.";
      statusCode = 400;
    }
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

// Utility function to omit keys from an object (for logging sensitive data)
function Omit<T extends object, K extends [...(keyof T)[]]>(
  obj: T,
  keys: K
): { [P in Exclude<keyof T, K[number]>]: T[P] } {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

// Optional: Add a GET handler for testing or to indicate the endpoint's purpose.
export async function GET() {
  return NextResponse.json(
    {
      message:
        "Dette endepunktet er for mottak av POST-forespørsler for å sende SMS via Sveve.",
      description:
        'Send en POST-forespørsel med en JSON body som inneholder "telefon" (mottaker) og "content" (melding).',
      examplePayload: {
        telefon: "4798765432",
        content: "Hello from the webhook!",
        name: "Test User (valgfritt)",
      },
      requiredEnvironmentVariables: [
        "SVEVE_USER (Ditt Sveve API-brukernavn)",
        "SVEVE_PASSWORD (Ditt Sveve API-passord)",
        "SVEVE_FROM_SENDER (Valgfritt, standarder til 'Outpulse')",
      ],
    },
    { status: 200 }
  );
}
