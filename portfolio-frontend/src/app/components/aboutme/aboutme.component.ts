import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Education } from 'src/app/models/Education';
import { Employment } from 'src/app/models/Employment';
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

  dataEducation: Education[] = [];
  dataEmployment: Employment[] = [];
  noDataEducation: boolean = false;
  noDataEmployment: boolean = false;
  aboutmeText: any;
  isLogged: boolean = false;
  loading: boolean = false;

  constructor(private educationService: EducationService,
              private employmentService: EmploymentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getEducations();
    this.getEmployments();
    this.isLogged = this.authService.isLoggedIn();
  }

  /**
   * Gets all education entries
   */
  getEducations() {
    this.educationService.getEducations()
    .subscribe( ( educations ) => {
      this.dataEducation = educations;
      this.noDataEducation = this.dataEducation.length === 0;

    }, (error:any) => {
      this.noDataEducation = true;
      console.log("ERROR trying to get educations.", error)
    });

  }

    /**
   * Gets all employment entries
   */
    getEmployments() {
      this.employmentService.getEmployments()
      .subscribe( ( employments ) => {
        this.dataEmployment = employments;
        this.noDataEmployment = this.dataEmployment.length === 0;
  
      }, (error:any) => {
        this.noDataEmployment = true;
        console.log("ERROR trying to get employments.", error)
      });

    }

  // DIALOGS

  openNewEducationDialog(): void {

    const dialogRef = this.dialog.open(NewEducationComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("New education added correctly.", "Ok", "success-snackbar");
        this.getEducations();
      }else if (result == 2) {
        this.openSnackBar("Error. New education cannot be added.", "Ok", "error-snackbar");
      }
    });
  }

  openEditEducationDialog(id:string, title: string, subtitle: string, period: string, description: string): void {
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
        this.openSnackBar("Education entry updated correctly.", "Ok", "success-snackbar");
        this.getEducations();
      }else if (result == 2) {
        this.openSnackBar("Error. Education entry cannot be updated.", "Ok", "error-snackbar");
      }
    });
  }

  openNewEmploymentDialog(): void {

    const dialogRef = this.dialog.open(NewEmploymentComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("New employment added correctly.", "Ok", "success-snackbar");
        this.getEmployments();
      }else if (result == 2) {
        this.openSnackBar("Error. New employment cannot be added.", "Ok", "error-snackbar");
      }
    });
  }

  openEditEmploymentDialog(id:string | undefined, title: string, subtitle: string, period: string, description: string): void {
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
        this.openSnackBar("Employment entry updated correctly.", "Ok", "success-snackbar");
        this.getEmployments();
      }else if (result == 2) {
        this.openSnackBar("Error. Employment entry cannot be updated.", "Ok", "error-snackbar");
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
        this.openSnackBar("Education deleted correctly.", "Ok", "success-snackbar");
        this.getEducations();
      }else if (result == 2) {
        this.openSnackBar("Error. Education cannot be deleted.", "Ok", "error-snackbar");
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
        this.openSnackBar("Employment deleted correctly.", "Ok", "success-snackbar");
        this.getEmployments();
      }else if (result == 2) {
        this.openSnackBar("Error. Employment cannot be deleted.", "Ok", "error-snackbar");
      }
    });
  }


  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [panelClass],
    })
  }

}