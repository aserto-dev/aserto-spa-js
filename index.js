import AsertoClient from 'src/AsertoClient'

export default async function createAsertoClient(options) {
  const aserto = new AsertoClient(options);
  //await aserto.checkSession();
  return aserto;
}

export { AsertoClient };
