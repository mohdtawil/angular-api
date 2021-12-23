import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BoxDetailsComponent } from './box-details/box-details.component';
import { BoxesComponent } from './boxes/boxes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'boxes/page/:pageId/limit/:limitId' , component: BoxesComponent},
  {path: 'authors' , component: AuthorsComponent},
  {path: 'boxes/:id' , component: BoxDetailsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
