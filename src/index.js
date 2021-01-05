import AsertoClient from './AsertoClient'

export default async function createAsertoClient(options) {
  try {
    const aserto = new AsertoClient(options);
    await aserto.reload();
    return aserto;  
  } catch (error) {
    throw error;
  }
}

export { AsertoClient };
