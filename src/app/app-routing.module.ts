import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'crisis-list', component: CrisisListComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, 
      // {enableTracing: true} // debug enable
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
