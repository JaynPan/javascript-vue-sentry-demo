import { createApp } from 'vue'
import * as Sentry from "@sentry/vue"

import './style.css'
import App from './App.vue'

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://92258962dd4282d23491589c81b84ef4@o4505934128939008.ingest.sentry.io/4505981398286336",
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
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

app.mount('#app')
