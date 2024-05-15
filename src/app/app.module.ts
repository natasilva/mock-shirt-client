import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ViewComponent } from './pages/view/view.component';
import { FormComponent } from './pages/form/form.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    //ViewComponent,
    //FormComponent
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
