import auth from "../lib/auth";
import type { MakeGetRequest } from "../types/api/request";

const BASE_URL = "https://content-gmail.googleapis.com";

const makeRequest = async (request: Request) => {
  request.headers.set("Authorization", `Bearer ${auth.accessToken}`);

  const response = await fetch(request);

  if (!response.ok && response.status === 401) {
    // handle reauth
    console.error("UNAUTHENTICATED");
  }

  const data = await response.json();

  return data;
};

export const makeGetRequest: MakeGetRequest = async ({ path, search }) => {
  const url = new URL(path, BASE_URL);
  url.search = search || "";

  return makeRequest(new Request(url.toString()));
};

export const makePostRequest = () => {};
