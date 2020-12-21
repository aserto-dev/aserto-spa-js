# Aserto single-page application javascript SDK

Loosely modeled after the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-sdk).

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @aserto/aserto-spa-js
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @aserto/aserto-spa-js
```

## Getting Started

### Creating the client

Create an `AsertoClient` instance before rendering or initializing your application. You should only have one instance of the client.

```js
import createAsertoClient from '@aserto/aserto-spa-js';

const token = validAccessToken; // e.g. from Auth0 getTokenSilently()
const endpoint = 'authzmap'; // authz map endpoint, defaults to /authzmap

const aserto = await createAsertoClient({
  token: validAccessToken,
  endpoint: endpoint
});

// or you can just instantiate the client on its own
import { AsertoClient } from '@aserto/aserto-spa-js';

const aserto = new AsertoClient({
  token: validAccessToken,
  endpoint: endpoint
});
```
