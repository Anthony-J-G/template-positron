import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoPageComponent } from './pages/demo/demo.component';
import { BackendPageComponent } from './pages/backend/backend.component';
import { PythonPageComponent } from './pages/python/python.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    BackendPageComponent,
    PythonPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
