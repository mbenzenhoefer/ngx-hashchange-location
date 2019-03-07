# ngx-hashchange-location-strategy

Detect hashchange when the Angular SPA routes to different state.

Detailed information on the approach and the solution in my blog: [https://www.moritz-benzenhoefer.com/2019/03/angular-detect-hashchange-from-outside/](https://www.moritz-benzenhoefer.com/2019/03/angular-detect-hashchange-from-outside/).

## Table of Contents
* [Description](#description)
* [Usage](#usage)
* [Limitations](#limitations)

## Description
### Problem
Listening to the hash change of the browsers' URL is a big deal when not using HTML5 location API. Since Angular uses the `history` API (because of states etc.), there is no other option to use when working with Angular and listening to the URL `hashchange` from outside the application (p.e. when running in a frame and propagate the change to the parent).

### Solution
My solution overwrites the default `HashLocationStrategy` of Angular. It calls the `HashLocationStrategy`s method to route in the application and then throws the `hashchange` event manually.

## Usage
Use the location strategy provided by this library instead of Angulars' [HashLocationStrategy](https://angular.io/api/common/HashLocationStrategy).


### Installation

First you need to install the npm module:

```sh
npm install ngx-hashchange-location-strategy
```

### Add to application

```ts
// ...
import { HashChangeCompatibleHashLocationStrategy } from 'ngx-hashchange-location-strategy';

@NgModule({
  // ...
  providers: [
    { provide: LocationStrategy, useClass: HashChangeLocationStrategy },
    // ...
  ],
  // ...
})
export class AppModule {}
```

### Event payload
The event payload contains the properties `oldURL` and `newURL` as the standard [HashChangeEvent](https://developer.mozilla.org/en-US/docs/Web/API/HashChangeEvent) does.

### Listen to hashchange from outside the Angular application

```js
const handleHashChange = evt => {
  console.log('hashchange event triggered!');
  console.log(evt);
};

window.addEventListener('hashchange', handleHashChange);
```

## Limitations
Due to the fact that there may be multiple routings ongoing (one after an other) in the same Angular cycle, only the last `hashchange` event is propagated. Reason: Angular listens to `HashChangeEvents` and if we throw it again and again, the application will stuck in an infinite routing loop.
