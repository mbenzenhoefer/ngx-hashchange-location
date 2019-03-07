import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy } from '@angular/common';
import { HashChangeLocationStrategy } from 'projects/ngx-hashchange-location-strategy/src/public_api';
import { RoutedComponent } from './routed.component';

@NgModule({
  declarations: [AppComponent, RoutedComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: LocationStrategy, useClass: HashChangeLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
