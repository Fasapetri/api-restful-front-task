import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { SecurityComponent } from './security/security.component';
import { TableTasksComponent } from './Views/tasks/tabletasks/tabletasks.component';
import { CreateTasksComponent } from './Views/tasks/createtasks/createtasks.component';
import { EditTasksComponent } from './Views/tasks/edittasks/edittasks.component';

const routes: Routes = [

  {path:'', redirectTo:'login' , pathMatch:'full'},
  {path:'login', component:LoginComponent },
  {path:'dashboard', component: DashboardComponent, canActivate:[SecurityComponent]},

  {path:'tasks', component: TableTasksComponent, canActivate:[SecurityComponent]},
  {path:'tasks/create', component: CreateTasksComponent, canActivate:[SecurityComponent]},
  {path:'tasks/edit/:id', component: EditTasksComponent, canActivate:[SecurityComponent]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }

 export const RoutingComponents = [LoginComponent,DashboardComponent]