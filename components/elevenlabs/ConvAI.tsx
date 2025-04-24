"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConversation } from "@11labs/react";
import { cn } from "@/lib/utils";

export function ConvAI() {
  const conversation = useConversation({
    onConnect: () => {
      console.log("connected");
    },
    onDisconnect: () => {
      console.log("disconnected");
    },
    onError: (error) => {
      console.log(error);
      alert("Det oppstod en feil under samtalen");
    },
    onMessage: (message) => {
      console.log(message);
    },
  });

  const getSignedUrl = async (): Promise<string> => {
    const response = await fetch("/api/get-signed-url");
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`);
    }
    const { signedUrl } = await response.json();
    return signedUrl;
  };

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission directly here
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        console.error("Mikrofonrettigheter avslått");
        alert("Du må gi tilgang til mikrofonen for å bruke denne funksjonen.");
        return;
      }

      const signedUrl = await getSignedUrl();

      // Start the conversation with your signed url
      const conversationId = await conversation.startSession({
        signedUrl,
      });
      console.log("Started conversation with ID:", conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert(
        "Kunne ikke starte samtalen. Vennligst sjekk konsollen for detaljer."
      );
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to stop conversation:", error);
    }
  }, [conversation]);

  // Determine if conversation is active/connected
  const isConnected =
    conversation !== null && conversation.status === "connected";

  // Handler that calls either start or stop based on connection state
  const handleConversationToggle = () => {
    if (isConnected) {
      stopConversation();
    } else {
      startConversation();
    }
  };

  return (
    <div className={"flex justify-center items-center gap-x-4"}>
      <Card className={"rounded-3xl"}>
        <CardContent>
          <CardHeader>
            <CardTitle className={"text-center"}>
              {conversation.status === "connected"
                ? conversation.isSpeaking
                  ? `Agenten snakker`
                  : "Agenten lytter"
                : "Frakoblet"}
            </CardTitle>
          </CardHeader>
          <div className={"flex flex-col gap-y-4 text-center"}>
            <div
              className={cn(
                "orb my-16 mx-12",
                conversation.status === "connected" && conversation.isSpeaking
                  ? "orb-active animate-orb"
                  : conversation.status === "connected"
                  ? "animate-orb-slow orb-inactive"
                  : "orb-inactive"
              )}
            ></div>

            <Button
              variant={"outline"}
              className={"rounded-full"}
              size={"lg"}
              onClick={handleConversationToggle}
            >
              {isConnected ? "Avslutt samtalen" : "Start samtalen"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
