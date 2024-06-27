import AsertoClient, { ClientOptions } from "./AsertoClient";

export default async function createAsertoClient(
  options: ClientOptions,
  body: RequestInit["body"]
) {
  const aserto = new AsertoClient(options);
  await aserto.reload(body);
  return aserto;
}

export { AsertoClient };
