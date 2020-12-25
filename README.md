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

const aserto = createAsertoClient({
  accessToken: accessToken,  // valid access token
  serviceUrl: 'https://service-url', // defaults to window.location.origin
  endpoint: '/__accessmap' // access map endpoint, defaults to /__accessmap
});

// or you can just instantiate the client on its own
import { AsertoClient } from '@aserto/aserto-spa-js';

const aserto = new AsertoClient({
  accessToken: accessToken,
  serviceUrl: 'https://service-url', // defaults to window.location.origin
  endpoint: '/__accessmap' // access map endpoint, defaults to  /__accessmap
});
```

### Get the access map for a service that exposes it

First, make sure that the service supports an access map endpoint - for example using the NodeJS Express middleware [express-jwt-aserto](https://github.com/aserto-dev/express-jwt-aserto). 

Once a service exposes the endpoint, you can call the `getAccessMap()` function on the `AsertoClient` instance to retrieve the map.

The following example adds an event handler to a button that retrieves the access map and logs it to the console:

```html
<button id="get-access-map">Get Access Map</button>
```

```js
document.getElementById('get-access-map').addEventListener('click', async () => {
  const [accessMap, error] = await aserto.getAccessMap();
  if (error) {
    console.error(error);
  } else {
    console.log(accessMap);
  }
});
