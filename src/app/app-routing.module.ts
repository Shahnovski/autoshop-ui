import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { CarEditComponent } from './car-edit/car-edit.component';

const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'view/:id', component: CarDetailsComponent },
  { path: 'add', component: CreateCarComponent },
  { path: 'edit/:id', component: CarEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
