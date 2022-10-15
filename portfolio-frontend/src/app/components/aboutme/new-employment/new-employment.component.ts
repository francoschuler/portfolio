import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmploymentService } from 'src/app/services/employment.service';

@Component({
  selector: 'app-new-employment',
  templateUrl: './new-employment.component.html',
  styleUrls: ['./new-employment.component.scss']
})
export class NewEmploymentComponent implements OnInit {

  newEmployment: FormGroup | any;

  formType: string = "Add";

  constructor(private formBuilder: FormBuilder,
              private employmentServcie: EmploymentService,
              private dialogRef: MatDialogRef<NewEmploymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data == null) {
      this.newEmployment = this.formBuilder.group({
        title: ['', Validators. required],
        subtitle: ['', Validators. required],
        period: ['', Validators. required],
        description: ['', Validators. required],
      });
    } else {
      this.formType = "Update";
      this.newEmployment = this.formBuilder.group({
        title: [this.data.title, Validators. required],
        subtitle: [this.data.subtitle, Validators. required],
        period: [this.data.period, Validators. required],
        description: [this.data.description, Validators. required]
      })
    }
  }

  saveEmployment() {

    let data = {
      title: this.newEmployment.get('title')?.value,
      subtitle: this.newEmployment.get('subtitle')?.value,
      period: this.newEmployment.get('period')?.value,
      description: this.newEmployment.get('description')?.value
    }

    if (this.data == null) {
      this.employmentServcie.saveEmployment(data)
                  .subscribe( (result:any) => {
                    this.dialogRef.close(1);
                  }, (error:any) => {
                    this.dialogRef.close(2);
                  });
    } else {
      this.employmentServcie.updateEmployment(data, this.data.id)
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
