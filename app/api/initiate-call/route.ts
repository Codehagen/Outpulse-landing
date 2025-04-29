import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phoneNumber, storeNumber } = await request.json();

    // Validate the phone number
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Format the phone number if needed
    // The API expects the number in E.164 format (e.g., +4798453571)
    const formattedNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber.replace(/\D/g, "")}`;

    // Optional: Store the phone number for marketing purposes if consent is given
    if (storeNumber) {
      // Here you would integrate with your CRM or database
      console.log(`Storing phone number: ${formattedNumber} for marketing`);
    }

    // Call the Eleven Labs API
    const response = await fetch(
      "https://api.elevenlabs.io/v1/convai/twilio/outbound_call",
      {
        method: "POST",
        headers: {
          "xi-api-key":
            process.env.ELEVENLABS_API_KEY ||
            "sk_44ecd3e27e19a5754b9ea5b1600a600dd245bad742f58c12",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: process.env.ELEVENLABS_AGENT_ID || "wKvQLHUlu3acQkVsNbFj",
          agent_phone_number_id:
            process.env.ELEVENLABS_PHONE_ID || "chhOGGyJ0zneA95WSADV",
          to_number: formattedNumber,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("ElevenLabs API error:", errorData);
      return NextResponse.json(
        { success: false, error: "Failed to initiate call" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error initiating call:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
