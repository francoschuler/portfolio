import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skill } from 'src/app/models/Skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillsService } from 'src/app/services/skills.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NewSkillComponent } from './new-skill/new-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  dataSkill: Skill[] = [];
  dataFrontend: Skill[] =  [];
  dataBackend: Skill[] =  [];
  dataOthers: Skill[] =  [];
  noDataSkill: boolean = false;
  isLogged: boolean = false;

  constructor(private skillsService: SkillsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getSkills();
    this.isLogged = this.authService.isLoggedIn();
  }

  /**
   * Gets all skills
   */
  getSkills() {
    this.skillsService.getSkills()
    .subscribe( ( skills ) => {
      this.dataSkill = skills; 
      this.noDataSkill = this.dataSkill.length == 0;
      this.processSkillsResponse(this.dataSkill);
    }, (error:any) => {
      this.noDataSkill = true;
      console.log("ERROR trying to get skills.")
    });

  }

  processSkillsResponse(data:any){

    this.dataFrontend = [];
    this.dataBackend = [];
    this.dataOthers = [];

    data.forEach( (skill:Skill) => {
      if(skill.stack === 'Frontend') {
        // console.log("FRONTEND", skill.name, skill.id)
        this.dataFrontend.push(skill);
      }else if(skill.stack === 'Backend') {
        // console.log("BACKEND", skill.name, skill.id)
        this.dataBackend.push(skill);
      }else if(skill.stack === 'Others') {
        // console.log("OTHERS", skill.name, skill.id)
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
        this.openSnackBar("New skill added correctly.", "Ok", "success-snackbar");
        this.getSkills();
      }else if (result == 2) {
        this.openSnackBar("Error. New skill cannot be added.", "Ok", "error-snackbar");
      }
    });
  }

  openEditSkillDialog(id:string | undefined, name: string, icon: string, stack: string, level: number): void {
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
        this.openSnackBar("Skill updated correctly.", "Ok", "success-snackbar");
        this.getSkills();
      }else if (result == 2) {
        this.openSnackBar("Error. Skill entry cannot be updated.", "Ok", "error-snackbar");
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
        this.openSnackBar("Skill deleted correctly.", "Ok", "success-snackbar");
        this.getSkills();
      }else if (result == 2) {
        this.openSnackBar("Error. Skill cannot be deleted.", "Ok", "error-snackbar");
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


