import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillsService } from 'src/app/services/skills.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NewSkillComponent } from './new-skill/new-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  dataSkill: SkillElement[] = [];
  dataFrontend: SkillElement[] =  [];
  dataBackend: SkillElement[] =  [];
  dataOthers: SkillElement[] =  [];
  noDataSkill: boolean = false;

  constructor(private skillsService: SkillsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSkills();
  }

  /**
   * Gets all skills
   */
  getSkills() {
    this.skillsService.getSkills()
    .subscribe( ( data:any ) => {
      this.dataSkill = data; 
      this.noDataSkill = this.dataSkill.length == 0 ? true : false;
      this.processSkillsResponse(this.dataSkill);
    }, (error:any) => {
      this.noDataSkill = true;
      console.log("ERROR trying to get educations.")
    });

  }

  processSkillsResponse(data:any){

    this.dataFrontend = [];
    this.dataBackend = [];
    this.dataOthers = [];

    data.forEach( (skill:SkillElement) => {
      if(skill.stack === 'Frontend') {
        console.log("FRONTEND", skill.name, skill.id)
        this.dataFrontend.push(skill);
      }else if(skill.stack === 'Backend') {
        console.log("BACKEND", skill.name, skill.id)
        this.dataBackend.push(skill);
      }else if(skill.stack === 'Others') {
        console.log("OTHERS", skill.name, skill.id)
        this.dataOthers.push(skill);
      }
    })
  }

  // DIALOGS

  openNewSkillDialog(stack: string): void {

    const dialogRef = this.dialog.open(NewSkillComponent, {
      width: '500px',
      data: {stack: stack, action: 'save'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("New skill added correctly.", "Ok");
        this.getSkills();
      }else if (result == 2) {
        this.openSnackBar("Error. New skill cannot be added.", "Ok");
      }
    });
  }

  openEditSkillDialog(id:number, name: string, icon: string, stack: string, level: number): void {
    const dialogRef = this.dialog.open(NewSkillComponent, {
      width: '500px',
      data: {
        id: id,
        name: name,
        icon: icon,
        stack: stack,
        level: level,
        action: 'update'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Skill updated correctly.", "Ok");
        this.getSkills();
      }else if (result == 2) {
        this.openSnackBar("Error. Skill entry cannot be updated.", "Ok");
      }
    });
  }

  openConfirmationSkill(id:any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: {id: id, type: 'skill'}
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result == 1) {
        this.openSnackBar("Skill deleted correctly.", "Ok");
        this.getSkills();
      }else if (result == 2) {
        this.openSnackBar("Error. Skill cannot be deleted.", "Ok");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    })
  }

}

export interface SkillElement {
  id: number;
  name: string;
  icon: string;
  stack: string;
  level: number;
}
