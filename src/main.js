import { createApp } from 'vue'
import * as Sentry from "@sentry/vue"

import './style.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://b64288c77e4787f7cc2a7f1ce30242b0@o4505934128939008.ingest.sentry.io/4505981531717632",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0,
  release: import.meta.env.VITE_RELEASE_VERSION,
  environment: import.meta.env.MODE,
});

app.use(router).mount('#app')
