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

  saveProject() {

    let data = {
      title: this.newProject.get('title')?.value,
      description: this.newProject.get('description')?.value,
      skills: this.newProject.get('skills')?.value,
      urlImg: this.newProject.get('urlImg')?.value,
      urlDemo: this.newProject.get('urlDemo')?.value,
      urlRepo: this.newProject.get('urlRepo')?.value
    }

    if (this.data == null) {
      this.projectService.saveProject(data)
                  .subscribe( (result:any) => {
                    this.dialogRef.close(1);
                  }, (error:any) => {
                    this.dialogRef.close(2);
                  });
    } else {
      this.projectService.updateProject(data, this.data.id)
      .subscribe( (result:any) => {
        this.dialogRef.close(1);
      }, (error:any) => {
        this.dialogRef.close(2);
      });
    }
  }

  cancelSave() {
    this.dialogRef.close(3);
  }

}
