import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NewProjectComponent } from './new-project/new-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  dataProjects: ProjectElement[] = [];
  noDataProject: boolean = false;
  isLogged: boolean = false;
  loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
    this.isLogged = this.authService.isLogged();
  }

      /**
   * Gets all employment entries
   */
    getProjects() {
        this.projectService.getProjects()
        .subscribe( ( data:any ) => {
          console.log('AQUI', data);
          
          this.dataProjects = data;
          this.noDataProject = this.dataProjects.length === 0 ? true : false;
    
        }, (error:any) => {
          this.noDataProject = true;
          console.log("ERROR trying to get employments.")
        });
  
      }

  openNewProjectDialog(): void {

    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1) {
        this.openSnackBar("New project added correctly.", "Ok");
      }else if (result == 2) {
        this.openSnackBar("Error. New project cannot be added.", "Ok");
      }
    });
  }

  openEditProjectDialog(id:number, title: string, description: string, skills: string, urlImg: string, urlDemo: string, urlRepo: string): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      data: {
        id: id,
        title: title,
        description: description,
        skills: skills,
        urlImg: urlImg,
        urlDemo: urlDemo,
        urlRepo: urlRepo,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Project updated correctly.", "Ok");
        this.getProjects();
      }else if (result == 2) {
        this.openSnackBar("Error. Project cannot be updated.", "Ok");
      }
    });
  }

  openConfirmationProject(id:any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: {id: id, type: 'project'}
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result == 1) {
        this.openSnackBar("Project deleted correctly.", "Ok");
        this.getProjects();
      }else if (result == 2) {
        this.openSnackBar("Error. Project cannot be deleted.", "Ok");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    })
  }

}

export interface ProjectElement {
  id: number;
  title: string;
  description: string;
  skills: string;
  urlImg: string;
  urlRepo: string;
  urlDemo: string;
}