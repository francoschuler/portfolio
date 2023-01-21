import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employment } from '../models/Employment';

@Injectable({
  providedIn: 'root'
})
export class EmploymentService {

  constructor(private firestore: Firestore) { }


  /**
   * Gets all employments
   */
  getEmployments(): Observable<Employment[]> {
    const employmentRef = collection(this.firestore, 'employments');
    const q = query(employmentRef, orderBy('period', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Employment[]>;
  }

  /**
   * Saves a new employment entry
   */
  saveEmployment(employment: Employment){
    const educationRef = collection(this.firestore, 'employments');
    return addDoc(educationRef, employment);
  }

  /**
   * Deletes an employment entry
   */
  deleteEmployment(employment: Employment) {
    const docRef = doc(this.firestore, `employments/${employment.id}`);
    return deleteDoc(docRef);
  }

  /**
   * Updates an employment entry
   */

  updateEmployment(employment: Employment, id: string) {
    const docRef = doc(this.firestore, `employments/${id}`);
    return updateDoc(docRef, {...employment});
  }



}
