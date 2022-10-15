import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.scss']
})
export class NewEducationComponent implements OnInit {

  newEducation: FormGroup | any;

  formType: string = "Add";

  constructor(private formBuilder: FormBuilder,
              private educationService: EducationService,
              private dialogRef: MatDialogRef<NewEducationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data == null) {
      this.newEducation = this.formBuilder.group({
        title: ['', Validators. required],
        subtitle: ['', Validators. required],
        period: ['', Validators. required],
        description: ['', Validators. required],
      });
    } else {
      this.formType = "Update";
      this.newEducation = this.formBuilder.group({
        title: [this.data.title, Validators. required],
        subtitle: [this.data.subtitle, Validators. required],
        period: [this.data.period, Validators. required],
        description: [this.data.description, Validators. required]
      })
    }
  }

  saveEducation() {

    let data = {
      title: this.newEducation.get('title')?.value,
      subtitle: this.newEducation.get('subtitle')?.value,
      period: this.newEducation.get('period')?.value,
      description: this.newEducation.get('description')?.value
    }

    if (this.data == null) {
      this.educationService.saveEducation(data)
                  .subscribe( (result:any) => {
                    this.dialogRef.close(1);
                  }, (error:any) => {
                    this.dialogRef.close(2);
                  });
    } else {
      this.educationService.updateEducation(data, this.data.id)
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
