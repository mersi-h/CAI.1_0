// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// 1. First, update your environment.ts file:
// src/environments/environment.ts

export const environment = {
  production: false,
  aiApiUrl: 'https://api.openai.com/v1', // Not used when using mock service
  aiApiKey: '', // Not needed when using mock service
  useMockAiService: true // Toggle between mock and real service
};

