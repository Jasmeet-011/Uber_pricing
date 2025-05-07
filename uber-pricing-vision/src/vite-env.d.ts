/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GEMINI_API_KEY: string;
  VITE_FRONTEND_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
