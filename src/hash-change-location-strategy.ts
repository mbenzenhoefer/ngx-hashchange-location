import { HashLocationStrategy, APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { Inject, Optional, Injectable } from '@angular/core';

/**
 * @description
 * Extends angulars' HashLocationStrategy (see https://github.com/angular/angular/blob/master/packages/common/src/location/hash_location_strategy.ts)
 * to fire HTML5 location API hashchange event.
 *
 */
@Injectable()
export class HashChangeCompatibleHashLocationStrategy extends HashLocationStrategy {
  private hashChangeFireTimeout: number;

  constructor(
    appPlatformLocation: PlatformLocation,
    @Optional() @Inject(APP_BASE_HREF) appBaseHref?: string
  ) {
    super(appPlatformLocation, appBaseHref);
  }

  pushState(state: any, title: string, path: string, queryParams: string): void {
    const oldUrl: string = this._getOldUrl();
    super.pushState(state, title, path, queryParams);
    this._fireHashChangeEvent(oldUrl);
  }

  replaceState(state: any, title: string, path: string, queryParams: string): void {
    const oldUrl: string = this._getOldUrl();
    super.replaceState(state, title, path, queryParams);
    this._fireHashChangeEvent(oldUrl);
  }

  private _fireHashChangeEvent(oldUrl: string): void {
    // do not create HashChangeEvent since angular listens to this object type
    // creating HashChangeEvent creates infinite loop in angular routing
    const changeEvt = new Event('hashchange');

    // cast to any to make ts readonly attributes writable
    (changeEvt as any).oldURL = oldUrl;
    (changeEvt as any).newURL = window.location.href;

    // fire the event after the routing has finished for all current routings
    // not doing this leads to an loop because of inconsistent states when firing events
    if (this.hashChangeFireTimeout) {
      clearTimeout(this.hashChangeFireTimeout);
    }
    this.hashChangeFireTimeout = setTimeout(() => {
      window.dispatchEvent(changeEvt);
    });
  }

  private _getOldUrl(): string {
    return window.location.href;
  }
}
