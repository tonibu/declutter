import { signal } from "@preact/signals-core";

type TokenClient = google.accounts.oauth2.TokenClient;

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = import.meta.env.VITE_GOOGLE_SCOPE;

const authClient = signal<TokenClient | null>(null);
const accessToken = signal<string | null>(null);

const init = (): Promise<TokenClient> =>
  new Promise((resolve, reject) => {
    if (authClient.value) {
      return resolve(authClient.value);
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          accessToken.value = response.access_token;
        },
        error_callback: (error) => {
          // authorization error
          console.log(error);
        },
      });

      authClient.value = client;
      resolve(client);
    };

    script.onerror = (error) => {
      console.log(error);
      reject(error);
    };

    document.head.appendChild(script);
  });

const requestToken = () => {
  if (!authClient.value) {
    // authorization error

    return;
  }

  authClient.value.requestAccessToken();
};

export default {
  init,
  requestToken,
  accessToken,
};
