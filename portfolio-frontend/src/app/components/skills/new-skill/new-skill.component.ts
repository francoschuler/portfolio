import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from 'src/app/models/Skill';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.scss']
})
export class NewSkillComponent implements OnInit {

  newSkill: FormGroup | any;
  icon: string = "";
  level: number = 0;

  formType: string = "Add";

  constructor(private formBuilder: FormBuilder,
              private skillsService: SkillsService,
              private dialogRef: MatDialogRef<NewSkillComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data.action === 'save') {
      this.newSkill = this.formBuilder.group({
        name: ['', Validators.required],
        icon: ['', Validators.required]
      });
    } else if (this.data.action === 'update') {
      this.formType = "Update";
      this.newSkill = this.formBuilder.group({
        name: [this.data.name, Validators. required],
        icon: [this.data.icon, Validators. required]
      });
      this.level = this.data.level;
    }
  }

  async saveSkill() {

    const data: Skill = {
      name: this.newSkill.get('name')?.value,
      icon: this.newSkill.get('icon')?.value,
      stack: this.data.stack,
      level: this.level
    }

    console.log(data);
    

    if (this.data.action === 'save') {
      try{
        const response = await this.skillsService.saveSkill(data);
        this.dialogRef.close(1);
      } catch(error) {
        this.dialogRef.close(2);
      }
    } else if (this.data.action === 'update') {

      try{
        const response = await this.skillsService.updateSkill(data, this.data.id);
        this.dialogRef.close(1);
      } catch(error) {
        this.dialogRef.close(2);
      }
    }
  }


  cancelSave() {
    this.dialogRef.close(3);
  }

  showIcon (input: string) {
    this.icon = input;
  }

  changeLevel(value: number) {
    this.level = value;
  }


}
