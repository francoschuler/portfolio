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
              private employmentService: EmploymentService,
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

  async saveEmployment() {

    const data = this.newEmployment.value;

    if (this.data == null) {
      try{
        const response = await this.employmentService.saveEmployment(data);
        this.dialogRef.close(1);
      } catch(error) {
        this.dialogRef.close(2);
      }
    } else {
      try{
        const response = await this.employmentService.updateEmployment(data, this.data.id);
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
