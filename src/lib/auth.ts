import { signal } from "@preact/signals-core";

type TokenClient = google.accounts.oauth2.TokenClient;
type TokenResponse = google.accounts.oauth2.TokenResponse;

const CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPE = "https://mail.google.com/";

const authClient = signal<TokenClient | null>(null);
const tokenResponse = signal<TokenResponse | null>(null);

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
        scope: SCOPE,
        callback: (response) => {
          tokenResponse.value = response;
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
  get accessToken() {
    return tokenResponse.value?.access_token;
  },
  get hasGrantedAccess() {
    return (
      !!tokenResponse.value &&
      google.accounts.oauth2.hasGrantedAllScopes(tokenResponse.value, SCOPE)
    );
  },
};
