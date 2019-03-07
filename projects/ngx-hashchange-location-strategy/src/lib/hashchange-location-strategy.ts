import { Inject, Injectable, Optional } from '@angular/core';
import { HashLocationStrategy, APP_BASE_HREF, PlatformLocation } from '@angular/common';

/**
 * @description
 * Extends angulars' HashLocationStrategy (see https://github.com/angular/angular/blob/master/packages/common/src/location/hash_location_strategy.ts)
 * to fire HTML5 location API hashchange event.
 *
 */
@Injectable()
export class HashChangeLocationStrategy extends HashLocationStrategy {
  private hashChangeFireTimeout: number = -1;

  constructor(
    private readonly appPlatformLocation: PlatformLocation,
    @Optional() @Inject(APP_BASE_HREF) appBaseHref?: string
  ) {
    super(appPlatformLocation);
  }

  pushState(state: any, title: string, path: string, queryParams: string): void {
    const oldUrl: string = this._getCurrentUrl();
    super.pushState(state, title, path, queryParams);
    this._fireHashChangeEvent(oldUrl);
  }

  replaceState(state: any, title: string, path: string, queryParams: string): void {
    const oldUrl: string = this._getCurrentUrl();
    super.replaceState(state, title, path, queryParams);
    this._fireHashChangeEvent(oldUrl);
  }

  private _fireHashChangeEvent(oldUrl: string): void {
    // do not create HashChangeEvent since angular listens to this object type
    // creating HashChangeEvent creates infinite loop in angular routing
    const changeEvt = new Event('hashchange');

    // cast to any to make ts readonly attributes writable
    (changeEvt as any).oldURL = oldUrl;
    (changeEvt as any).newURL = this._getCurrentUrl();

    // fire the event after the routing has finished for all current routings
    // not doing this leads to an loop because of inconsistent states when firing events
    if (this.hashChangeFireTimeout) {
      clearTimeout(this.hashChangeFireTimeout);
    }
    this.hashChangeFireTimeout = setTimeout(() => {
      window.dispatchEvent(changeEvt);
    });
  }

  private _getCurrentUrl(): string {
    // in the browser the platformLocation object is derived as "PlatformBrowserLocation"
    // and contains the current locations' href
    // this object is not exported, so we use any type
    return (this.appPlatformLocation as any).location.href;
  }
}
