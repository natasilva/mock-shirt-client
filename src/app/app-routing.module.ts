import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './pages/view/view.component';
import { FormComponent } from './pages/form/form.component';
import { EstimateComponent } from './components/estimate/estimate.component';
import { EstimateItensComponent } from './components/estimate-itens/estimate-itens.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'view', component: ViewComponent },
  { path: 'itens', component: EstimateItensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }