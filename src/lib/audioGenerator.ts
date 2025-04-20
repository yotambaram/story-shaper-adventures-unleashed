
interface ElevenLabsVoice {
  voice_id: string;
  name: string;
}

// Real Eleven Labs voice IDs
const voiceStyleMapping: Record<string, string> = {
  "Calm Mom": "EXAVITQu4vr4xnSDxMaL", // Sarah
  "Excited Dad": "CwhRBWXzGAHq8TQ4Fs17", // Roger
  "Warm Teacher": "FGY2WhTYpPnrIDTdsKH5", // Laura
  "Grandma": "XB0fDUnXU5powFXDhCwa", // Charlotte
  "Professional Narrator": "TX3LPaxmHKxFdv7VOQHJ" // Liam
};

export async function generateAudio(text: string, voiceStyle: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
  
  if (!apiKey) {
    console.error("Eleven Labs API key not configured");
    console.log("Using demo mode with mock audio URL");
    // Return demo URL for testing without API key
    return "https://example.com/audio.mp3";
  }

  // Limit text length to avoid hitting API limits
  const limitedText = text.length > 3000 ? text.substring(0, 3000) : text;
  
  // Get voice ID from mapping or use default
  const voiceId = voiceStyleMapping[voiceStyle] || voiceStyleMapping["Professional Narrator"];
  
  try {
    console.log(`Generating audio with voice: ${voiceStyle}, voice ID: ${voiceId}`);
    console.log(`Text length: ${limitedText.length} characters`);
    
    // Make the actual API call to Eleven Labs
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text: limitedText,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate audio (${response.status}): ${errorText}`);
    }

    // Convert the response to a Blob and create a URL
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Error generating audio:", error);
    return null;
  }
}
