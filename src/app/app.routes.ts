import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    {path: "", component: AboutComponent},
    {path: "resume", component: ResumeComponent},
    {path: "portfolio", component: ProjectsComponent},
    {path: "contact", component: ContactComponent},
    { path: '**', component: ErrorPageComponent },

];
