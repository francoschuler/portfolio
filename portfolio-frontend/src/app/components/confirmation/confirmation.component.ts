import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { EmploymentService } from 'src/app/services/employment.service';
import { ProjectService } from 'src/app/services/project.service';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  confirmationType: string = "";

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any,
              private educationService: EducationService,
              private employmentService: EmploymentService,
              private skillsService: SkillsService,
              private projectService: ProjectService,
              private authService: AuthService) {

              this.confirmationType = this.data.type;
  }

  ngOnInit(): void {
  }

  async deleteEducation () {
    try{
      const response = await this.educationService.deleteEducation(this.data);
      this.dialogRef.close(1);
    } catch(error) {
      this.dialogRef.close(2);
    }
  }

  async deleteEmployment () {
    try{
      const response = await this.employmentService.deleteEmployment(this.data);
      this.dialogRef.close(1);
    } catch(error) {
      this.dialogRef.close(2);
    }
  }

  async deleteSkill() {
    try{
      const response = await this.skillsService.deleteSkill(this.data);
      this.dialogRef.close(1);
    } catch(error) {
      this.dialogRef.close(2);
    }
  }

  async deleteProject() {
    try{
      const response = await this.projectService.deleteProject(this.data);
      this.dialogRef.close(1);
    } catch(error) {
      this.dialogRef.close(2);
    }
  }

  logout() {
    this.authService.logout();
    this.dialogRef.close(1);
  }

  send(){
    this.dialogRef.close(1);
  }

  cancel() {
    this.dialogRef.close(3);
  }

}
