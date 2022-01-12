import AsertoClient, { ClientOptions } from './AsertoClient'

export default async function createAsertoClient(
  options: ClientOptions,
  body: RequestInit['body']
) {
  try {
    const aserto = new AsertoClient(options)
    await aserto.reload(body)
    return aserto
  } catch (error) {
    throw error
  }
}

export { AsertoClient }
