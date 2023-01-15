import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  newProject: FormGroup | any;

  formType: string = "Add";

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<NewProjectComponent>,
              private projectService: ProjectService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data == null) {
      this.newProject = this.formBuilder.group({
        title: ['', Validators. required],
        description: ['', Validators. required],
        skills: ['', Validators.required],
        urlImg: ['', Validators. required],
        urlDemo: ['', Validators. required],
        urlRepo: ['', Validators. required],
      });
    } else {
      this.formType = "Update";
      this.newProject = this.formBuilder.group({
        title: [this.data.title, Validators. required],
        description: [this.data.description, Validators. required],
        skills: [this.data.skills, Validators.required],
        urlImg: [this.data.urlImg, Validators. required],
        urlDemo: [this.data.urlDemo, Validators. required],
        urlRepo: [this.data.urlRepo, Validators. required],
      })
    }
  }

  async saveProject() {

    const data = this.newProject.value;

    if (this.data == null) {
      try{
        const response = await this.projectService.saveProject(data);
        this.dialogRef.close(1);
      } catch(error) {
        this.dialogRef.close(2);
      }
    } else {
      try{
        const response = await this.projectService.updateProject(data, this.data.id);
        this.dialogRef.close(1);
      } catch(error) {
        this.dialogRef.close(2);
      }
    }
  }

  cancelSave() {
    this.dialogRef.close(3);
  }

}
