import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo/demo.component';
import { BackendConnTestPageComponent } from './pages/backend-conn-test/backend-conn-test.component';

const routes: Routes = [
  { path: 'demo', component: DemoPageComponent },
  { path: 'test-backend', component: BackendConnTestPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
