import { MatDialogModule } from '@angular/material/dialog';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { ViewComponent } from './pages/view/view.component';
import { FormComponent } from './pages/form/form.component';
import { EstimateComponent } from './components/estimate/estimate.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EstimateItensComponent } from './components/estimate-itens/estimate-itens.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    EstimateComponent,
    FormComponent,
    EstimateItensComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
