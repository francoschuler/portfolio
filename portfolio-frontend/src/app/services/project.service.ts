import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private firestore: Firestore) { }


  /**
   * Gets all projects
   */
  getProjects(): Observable<Project[]> {
    const projectRef = collection(this.firestore, 'projects');
    return collectionData(projectRef, { idField: 'id' }) as Observable<Project[]>;
  }

  /**
   * Saves a new project entry
   */
  saveProject(project: Project){
    const projectRef = collection(this.firestore, 'projects');
    return addDoc(projectRef, project);
  }

  /**
   * Deletes a project entry
   */
  deleteProject(project: Project) {
    const docRef = doc(this.firestore, `projects/${project.id}`);
    return deleteDoc(docRef);
  }

  /**
   * Updates a project entry
   */

  updateProject(project: Project, id: string) {
    const docRef = doc(this.firestore, `projects/${id}`);
    return updateDoc(docRef, {...project});
  }


}
