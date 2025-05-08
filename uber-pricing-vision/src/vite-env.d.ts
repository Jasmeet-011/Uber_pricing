/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GEMINI_API_KEY: string;
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
