import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }


  /**
   * Gets all projects
   */
  getProjects() {
    const endpoint = `${environment.url}/projects`;
    return this.http.get(endpoint);
  }

  /**
   * Saves a new project
   */
  saveProject(body:any){
    const endpoint = `${environment.url}/projects`;
    return this.http.post(endpoint, body);
  }

  /**
   * Deletes a project
   */
  deleteProject(id:any) {
    const endpoint = `${environment.url}/projects/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * Updates a project
   */

  updateProject(body: any, id: any) {
    const endpoint = `${environment.url}/project/${id}`;
    return this.http.put(endpoint, body);
  }
}
