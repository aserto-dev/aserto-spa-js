import AsertoClient from './AsertoClient'

export default async function createAsertoClient(options) {
  const aserto = new AsertoClient(options);
  await aserto.loadAccessMap();
  return aserto;
}

export { AsertoClient };
