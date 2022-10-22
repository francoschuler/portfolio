import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { EmploymentService } from 'src/app/services/employment.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NewEducationComponent } from './new-education/new-education.component';
import { NewEmploymentComponent } from './new-employment/new-employment.component';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
})
export class AboutmeComponent implements OnInit {

  dataEducation: EducationElement[] = [];
  dataEmployment: EmploymentElement[] = [];
  noDataEducation: boolean = false;
  noDataEmployment: boolean = false;
  aboutmeText: any;
  isLogged: boolean = false;

  constructor(private educationService: EducationService,
              private employmentService: EmploymentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getEducations();
    this.getEmployments();
    this.isLogged = this.authService.isLogged();
  }

  /**
   * Gets all education entries
   */
  getEducations() {
    this.educationService.getEducations()
    .subscribe( ( data:any ) => {
      this.dataEducation = data;
      console.log(this.dataEducation[0].period);
      this.noDataEducation = this.dataEducation.length === 0 ? true : false;

    }, (error:any) => {
      this.noDataEducation = true;
      console.log("ERROR trying to get educations.")
    });

  }

    /**
   * Gets all employment entries
   */
     getEmployments() {
      this.employmentService.getEmployments()
      .subscribe( ( data:any ) => {
        console.log('AQUI', data);
        
        this.dataEmployment = data;
        this.noDataEmployment = this.dataEmployment.length === 0 ? true : false;
  
      }, (error:any) => {
        this.noDataEmployment = true;
        
        console.log('antes', this.noDataEmployment);
        console.log("ERROR trying to get employments.")
      });

      console.log('despues', this.noDataEmployment);
      
  
    }

  // DIALOGS

  openNewEducationDialog(): void {

    const dialogRef = this.dialog.open(NewEducationComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("New education added correctly.", "Ok");
        this.getEducations();
      }else if (result == 2) {
        this.openSnackBar("Error. New education cannot be added.", "Ok");
      }
    });
  }

  openEditEducationDialog(id:number, title: string, subtitle: string, period: string, description: string): void {
    console.log("aboutme", id);
    const dialogRef = this.dialog.open(NewEducationComponent, {
      width: '500px',
      data: {
        id: id,
        title: title,
        subtitle: subtitle, 
        period: period,
        description: description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Education entry updated correctly.", "Ok");
        this.getEducations();
      }else if (result == 2) {
        this.openSnackBar("Error. Education entry cannot be updated.", "Ok");
      }
    });
  }

  openNewEmploymentDialog(): void {

    const dialogRef = this.dialog.open(NewEmploymentComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("New employment added correctly.", "Ok");
        this.getEmployments();
      }else if (result == 2) {
        this.openSnackBar("Error. New employment cannot be added.", "Ok");
      }
    });
  }

  openEditEmploymentDialog(id:number, title: string, subtitle: string, period: string, description: string): void {
    console.log("aboutme", id);
    const dialogRef = this.dialog.open(NewEmploymentComponent, {
      width: '500px',
      data: {
        id: id,
        title: title,
        subtitle: subtitle, 
        period: period,
        description: description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Employment entry updated correctly.", "Ok");
        this.getEmployments();
      }else if (result == 2) {
        this.openSnackBar("Error. Employment entry cannot be updated.", "Ok");
      }
    });
  }

  openConfirmationEducation(id:any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: {id: id, type: 'education'}
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result == 1) {
        this.openSnackBar("Education deleted correctly.", "Ok");
        this.getEducations();
      }else if (result == 2) {
        this.openSnackBar("Error. Education cannot be deleted.", "Ok");
      }
    });
  }

  openConfirmationEmployment(id:any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: {id: id, type: 'employment'}
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result == 1) {
        this.openSnackBar("Employment deleted correctly.", "Ok");
        this.getEmployments();
      }else if (result == 2) {
        this.openSnackBar("Error. Employment cannot be deleted.", "Ok");
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    })
  }

}

export interface EducationElement {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  description: string;
}

export interface EmploymentElement {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  description: string;
}
