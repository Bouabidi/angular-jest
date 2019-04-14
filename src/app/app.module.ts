import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login.component';
import { HomeComponent, SearchComponent } from './router/router';
import { ToggleComponent } from './component/toggle/toggle.component';
import { HoverFocusDirective } from './directive/hoverfocus.directive';
import { FormComponent } from './component/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    HomeComponent,
    ToggleComponent,
    HoverFocusDirective,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
