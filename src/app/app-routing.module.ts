import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './pages/view/view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' }, // Rota padrão
  { path: 'view', component: ViewComponent },
  { path: 'form', component: FormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
