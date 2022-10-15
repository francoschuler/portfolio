import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }


  /**
   * Gets all skills
   */
  getSkills() {
    const endpoint = `${environment.url}/skills`;
    return this.http.get(endpoint);
  }

  /**
   * Saves a new skill
   */
  saveSkill(body:any){
    const endpoint = `${environment.url}/skills`;
    return this.http.post(endpoint, body);
  }

  /**
   * Deletes a skill 
   */
  deleteSkill(id:any) {
    const endpoint = `${environment.url}/skills/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * Updates a skill
   */

  updateSkill(body: any, id: any) {
    const endpoint = `${environment.url}/skills/${id}`;
    return this.http.put(endpoint, body);
  }

}
