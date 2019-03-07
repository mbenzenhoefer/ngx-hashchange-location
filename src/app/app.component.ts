import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  routeSomewhere(): void {
    // randomly changes the location to trigger event
    this.router.navigate(['', Math.random() * 1000]);
  }
}
