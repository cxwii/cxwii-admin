/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASEPATH: 'dev' | 'pro'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
