import AsertoClient from './AsertoClient'

export default async function createAsertoClient(options, body) {
  try {
    const aserto = new AsertoClient(options);
    await aserto.reload(body);
    return aserto;  
  } catch (error) {
    throw error;
  }
}

export { AsertoClient };
