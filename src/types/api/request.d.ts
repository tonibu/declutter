/* eslint-disable @typescript-eslint/no-explicit-any */

export type MakeGetRequest = ({
  path,
  search,
}: {
  path: string;
  search?: string;
}) => Promise<any>;
