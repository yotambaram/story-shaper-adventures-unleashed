
const voiceStyleMapping: Record<string, string> = {
  "Calm Mom": "nova",
  "Excited Dad": "echo",
  "Warm Teacher": "alloy",
  "Grandma": "shimmer",
  "Professional Narrator": "onyx"
};

export async function generateAudio(text: string, voiceStyle: string): Promise<string | null> {
  // Check for production deployment
  const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn("OpenAI API key not configured");
    
    if (isProduction) {
      console.log("Production environment detected without API key");
      return null; // Return null in production when no key is available
    } else {
      console.log("Using demo mode with mock audio URL for local development");
      // Return demo URL for testing without API key in development only
      return "https://example.com/audio.mp3";
    }
  }

  // Limit text length to avoid hitting API limits
  const limitedText = text.length > 4096 ? text.substring(0, 4096) : text;
  
  // Get voice from mapping or use default
  const voice = voiceStyleMapping[voiceStyle] || voiceStyleMapping["Professional Narrator"];
  
  try {
    console.log(`Generating audio with voice: ${voiceStyle}`);
    console.log(`Text length: ${limitedText.length} characters`);
    
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: limitedText,
        voice: voice,
        response_format: 'mp3'
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
