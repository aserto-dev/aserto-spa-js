# Aserto single-page application javascript SDK

Loosely modeled after the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js).

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

You need a valid access token before you can instantiate the client. For 
the next few examples, the `accessToken` variable is assumed to contain a 
valid access token. 

To obtain one via Auth0 (for example), use code like this:

```js
// get a valid access token, e.g. from Auth0 getTokenSilently()
import createAuth0Client from '@auth0/auth0-spa-js';
const auth0 = await createAuth0Cient(
  domain: '<AUTH0_DOMAIN>',
  client_id: '<AUTH0_CLIENT_ID>',
  redirect_uri: '<MY_CALLBACK_URL>'
);
const accessToken = await auth0.getTokenSilently();
```

Create an `AsertoClient` in the following way:

```js
import createAsertoClient from '@aserto/aserto-spa-js';

const aserto = await createAsertoClient({
  accessToken: accessToken,  // valid access token
  serviceUrl: 'https://service-url', // defaults to window.location.origin
  endpoint: '/__accessmap', // access map endpoint, defaults to /__accessmap
  defaultMap: { // pass a default map for endpoints that don't expose a map
    visible: true,  // visible defaults to true
    enabled: true,  // enabled defaults to true
    allowed: false  // allowed defaults to false
  }
});

// or you can just instantiate the client on its own
import { AsertoClient } from '@aserto/aserto-spa-js';

const aserto = new AsertoClient({
  accessToken: accessToken,
  serviceUrl: 'https://service-url', // defaults to window.location.origin
  endpoint: '/__accessmap' // access map endpoint, defaults to  /__accessmap
});

// explicitly load 
await aserto.reload();
```

## Usage 

### accessMap() 

Retrieves a javascript object that holds the access map

```js
console.log(aserto.accessMap());
```

### resourceMap('path')

Retrieves a map associated with a specific resource.

The `path` argument is in the form `/path/to/resource`. It may contain a `__id` component to indicate an parameter - for example, `/mycars/__id`.

The returned map will be in the following format: 
```js
{
  GET: {
    visible: true,
    enabled: false,
    allowed: false
  },
  POST: {
    visible: true,
    enabled: false,
    allowed: false
  },
  PUT: {
    //...
  },
  DELETE: {
    //...
  }
}
```

Check whether a verb / path combination is visible and enabled:
```js
const path = '/api/path';
const resource = aserto.resourceMap(path));
const isVisible = resource.GET.visible;
const isEnabled = resource.GET.enabled;
```

Display the values for all access levels on each verb for the path:
```js
const path = '/api/path';
const resource = aserto.resourceMap(path));
for (const verb of ['GET', 'POST', 'PUT', 'DELETE']) {
  for (const access of ['visible', 'enabled', 'allowed']) {
    console.log(`${verb} ${path} ${access} is ${resource[verb][access]}`);
  }
}
```

