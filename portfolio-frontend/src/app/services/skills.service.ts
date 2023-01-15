import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/Skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private firestore: Firestore) { }


  /**
   * Gets all skills
   */
  getSkills(): Observable<Skill[]> {
    const skillRef = collection(this.firestore, 'skills');
    return collectionData(skillRef, { idField: 'id' }) as Observable<Skill[]>;
  }

  /**
   * Saves a new skill entry
   */
  saveSkill(skill: Skill){
    const skillRef = collection(this.firestore, 'skills');
    return addDoc(skillRef, skill);
  }

  /**
   * Deletes an skill entry
   */
  deleteSkill(skill: Skill) {
    const docRef = doc(this.firestore, `skills/${skill.id}`);
    return deleteDoc(docRef);
  }

  /**
   * Updates an skill entry
   */

  updateSkill(skill: Skill, id: string) {
    const docRef = doc(this.firestore, `skills/${id}`);
    return updateDoc(docRef, {...skill});
  }



}
