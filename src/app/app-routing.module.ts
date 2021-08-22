import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';

const routes: Routes = [
  { path:'home', component:HomeComponent },
  { path:'employees', component:ListEmployeeComponent },
  { path:'employees/:id', component:EmployeeComponent},
  { path:'', redirectTo:'/home', pathMatch:'full'},
  { path:'**', component:PathNotFoundComponent}
];

@NgModule({
  declarations:[
    HomeComponent,
    EmployeeComponent,
    ListEmployeeComponent,
    PathNotFoundComponent
  ],
  imports: [HttpClientModule,BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

