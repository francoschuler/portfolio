import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NewEducationComponent } from './components/aboutme/new-education/new-education.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NewEmploymentComponent } from './components/aboutme/new-employment/new-employment.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NewSkillComponent } from './components/skills/new-skill/new-skill.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    AboutmeComponent,
    NewEducationComponent,
    ConfirmationComponent,
    NewEmploymentComponent,
    SkillsComponent,
    NewSkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }