import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoPageComponent } from './pages/demo/demo.component';
import { BackendConnTestPageComponent } from './pages/backend-conn-test/backend-conn-test.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    BackendConnTestPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
