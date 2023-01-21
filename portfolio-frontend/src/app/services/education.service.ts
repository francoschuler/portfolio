import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private firestore: Firestore) { }


  /**
   * Gets all educations
   */
  getEducations(): Observable<Education[]> {
    const educationRef = collection(this.firestore, 'educations');
    const q = query(educationRef, orderBy('period', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Education[]>;
  }

  /**
   * Saves a new education entry
   */
  saveEducation(education: Education){
    const educationRef = collection(this.firestore, 'educations');
    return addDoc(educationRef, education);
  }

  /**
   * Deletes an education entry
   */
  deleteEducation(education: Education) {
    const docRef = doc(this.firestore, `educations/${education.id}`);
    return deleteDoc(docRef);
  }

  /**
   * Updates an education entry
   */

  updateEducation(education: Education, id: string) {
    const docRef = doc(this.firestore, `educations/${id}`);
    return updateDoc(docRef, {...education});
  }


}
