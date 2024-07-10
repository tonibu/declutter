import queryString from "query-string";
import { makeGetRequest } from "./request";
import type { Messages } from "../types/api/gmail";

const messages: Messages = {
  batchDelete: async () => {},
  delete: async () => {},
  get: async ({ id, format, metadataHeaders }) =>
    makeGetRequest({
      path: `gmail/v1/users/me/messages/${id}`,
      search: queryString.stringify({ format, metadataHeaders }),
    }),
  list: async (options) =>
    makeGetRequest({
      path: "gmail/v1/users/me/messages",
      search: options ? queryString.stringify(options) : undefined,
    }),
  trash: async () => {},
};

export default {
  messages,
};
