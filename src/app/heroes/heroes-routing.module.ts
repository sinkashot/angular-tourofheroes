import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

const routes: Routes = [
  {path: 'heroes', component: HeroListComponent, data: {animation: 'heroes'}},
  {path: 'detail/:id', component: HeroDetailComponent, data: {animation: 'detail'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
