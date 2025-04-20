
import { useToast } from "@/hooks/use-toast";

interface ElevenLabsVoice {
  voice_id: string;
  name: string;
}

const voiceStyleMapping: Record<string, string> = {
  "Calm Mom": "EXAVITQu4vr4xnSDxMaL", // This is a made-up ID
  "Excited Dad": "VR6AewLTigWG4xSOukaG", // This is a made-up ID
  "Warm Teacher": "pNInz6obpgDQGcFmaJgB", // This is a made-up ID
  "Grandma": "jBpfuIE2acCO8z3wKNLl", // This is a made-up ID
  "Professional Narrator": "TxGEqnHWrfWFTfGW9XjX" // This is a made-up ID
};

export async function generateAudio(text: string, voiceStyle: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
  
  if (!apiKey) {
    console.error("Eleven Labs API key not configured");
    return null;
  }

  // Limit text length to avoid hitting API limits
  const limitedText = text.length > 3000 ? text.substring(0, 3000) : text;
  
  // Get voice ID from mapping or use default
  const voiceId = voiceStyleMapping[voiceStyle] || voiceStyleMapping["Professional Narrator"];
  
  try {
    // For now, since we can't make actual API calls in this demo, return a mock URL
    // In a real implementation, you would make a fetch call to Eleven Labs API
    console.log(`Would generate audio with voice: ${voiceStyle}, voice ID: ${voiceId}`);
    console.log(`Text length: ${limitedText.length} characters`);
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a mock audio URL for demo purposes
    return "https://example.com/audio.mp3";
    
    /* 
    // Real implementation would be:
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
      throw new Error(`Failed to generate audio: ${response.status}`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
    */
  } catch (error) {
    console.error("Error generating audio:", error);
    return null;
  }
}
