import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutedComponent } from './routed.component';

const routes: Routes = [
  {
    path: ':randomId',
    component: RoutedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
