import AsertoClient from './AsertoClient'

export default function createAsertoClient(options) {
  const aserto = new AsertoClient(options);
  return aserto;
}

export { AsertoClient };
