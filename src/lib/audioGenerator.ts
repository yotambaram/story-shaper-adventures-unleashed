
const voiceStyleMapping: Record<string, string> = {
  "Calm Mom": "EXAVITQu4vr4xnSDxMaL", // Sarah
  "Excited Dad": "TX3LPaxmHKxFdv7VOQHJ", // Liam
  "Warm Teacher": "pFZP5JQG7iQjIQuC4Bku", // Lily
  "Grandma": "XB0fDUnXU5powFXDhCwa", // Charlotte
  "Professional Narrator": "onwK4e9ZLuTAKqWW03F9" // Daniel
};

export async function generateAudio(text: string, voiceStyle: string): Promise<string | null> {
  // Check for production deployment
  const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    console.warn("ElevenLabs API key not configured");
    
    if (isProduction) {
      console.log("Production environment detected without API key");
      throw new Error("API key not configured. Please set up your VITE_ELEVENLABS_API_KEY in environment variables.");
    } else {
      console.log("Using demo mode with mock audio URL for local development");
      return "https://example.com/audio.mp3";
    }
  }

  // Limit text length to avoid hitting API limits (ElevenLabs typically has a 2500 character limit for free tier)
  const limitedText = text.length > 2500 ? text.substring(0, 2500) : text;
  
  // Get voice from mapping or use default
  const voiceId = voiceStyleMapping[voiceStyle] || voiceStyleMapping["Professional Narrator"];
  
  try {
    console.log(`Generating audio with voice: ${voiceStyle}`);
    console.log(`Text length: ${limitedText.length} characters`);
    console.log(`Using voice ID: ${voiceId}`);
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json'
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
      const errorData = await response.text();
      console.error("ElevenLabs API error:", response.status, errorData);
      
      if (response.status === 401) {
        throw new Error("Authentication failed: Please check your ElevenLabs API key");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded: You've reached your ElevenLabs free tier limit. Please check your ElevenLabs account.");
      } else if (response.status >= 500) {
        throw new Error("ElevenLabs server error: Please try again later");
      } else {
        throw new Error(`Failed to generate audio (${response.status}): ${errorData}`);
      }
    }

    // Convert the response to a Blob and create a URL
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}
