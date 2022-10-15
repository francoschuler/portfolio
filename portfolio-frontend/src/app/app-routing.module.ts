import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { HomeComponent } from './components/home/home.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'aboutme', component: AboutmeComponent },
  { path: 'skills', component: SkillsComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
