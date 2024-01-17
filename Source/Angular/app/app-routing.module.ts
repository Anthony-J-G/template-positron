import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo/demo.component';
import { BackendPageComponent } from './pages/backend/backend.component';
import { CppPageComponent } from './pages/cpp/cpp.component';

const routes: Routes = [
  { path: '', component: DemoPageComponent },
  { path: 'backend', component: BackendPageComponent },
  { path: 'cpp', component: CppPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }