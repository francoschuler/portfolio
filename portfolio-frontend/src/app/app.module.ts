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
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsComponent } from './components/projects/projects.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ContactmeComponent } from './components/contactme/contactme.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';

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
    NewSkillComponent,
    LoginComponent,
    ProjectsComponent,
    ContactmeComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
