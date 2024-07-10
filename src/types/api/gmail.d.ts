export type Header = {
  name: string;
  value: string;
};

export type MessagePartBody = {
  attachmentId?: string;
  size: number;
  data?: string;
};

export type MessagePart = {
  partId: string;
  mimeType: string;
  filename?: string;
  headers: Header[];
  body?: MessagePartBody;
  parts?: MessagePart[];
};

export type Message = {
  id: string;
  threadId: string;
  labelIds: [string];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: MessagePart;
  sizeEstimate: number;
  raw: string;
};

export type MessagesGetOptions = {
  id: string;
  format?: "minimal" | "full" | "raw" | "metadata";
  metadataHeaders?: string[];
};

export type MessagesListOptions = {
  includeSpamTrash?: boolean;
  labelIds?: string[];
  maxResults?: number;
  pageToken?: string;
  q?: string;
};

export type MessagesListReturn = {
  messages: Pick<Message, "id" | "threadId">[];
  nextPageToken: string;
  resultSizeEstimate: number;
};

export type Messages = {
  batchDelete: () => Promise<void>;
  delete: () => Promise<void>;
  get: (options: MessagesGetOptions) => Promise<Message>;
  list: (options?: MessagesListOptions) => Promise<MessagesListReturn>;
  trash: () => Promise<void>;
};
