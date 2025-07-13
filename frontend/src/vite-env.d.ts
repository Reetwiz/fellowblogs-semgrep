/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND1_BASE_URL: string;
  readonly VITE_BACKEND2_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
