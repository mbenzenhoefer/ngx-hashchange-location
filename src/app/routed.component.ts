import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './routed.component.html'
})
export class RoutedComponent {
  routingDestination: string;

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.routingDestination = params.randomId;
    });
  }
}
