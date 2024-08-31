/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SHOW_PRIVATE_POSTS: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
