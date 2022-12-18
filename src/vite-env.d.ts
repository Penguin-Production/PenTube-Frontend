/// <reference types="vite/client" />
interface ImportMetaEnv {
    // information about the current build
    readonly VITE_APP_TITLE?: string;
    readonly VITE_APP_DESCRIPTION?: string;
    readonly VITE_APP_AUTHOR?: string;
    readonly VITE_APP_VERSION?: string;
    readonly VITE_APP_BUILD_DATE?: string;
    // mandatory environment variables
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}