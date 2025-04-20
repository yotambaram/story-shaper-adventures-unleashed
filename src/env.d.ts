
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_ELEVENLABS_API_KEY: string
  readonly VITE_ELEVENLABS_APLKEY: string  // Add the typo variant
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
