import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }


  /**
   * Gets all educations
   */
  getEducations() {
    const endpoint = `${environment.url}/educations`;
    return this.http.get(endpoint);
  }

  /**
   * Saves a new education entry
   */
  saveEducation(body:any){
    const endpoint = `${environment.url}/educations`;
    return this.http.post(endpoint, body);
  }

  /**
   * Deletes an education entry
   */
  deleteEducation(id:any) {
    const endpoint = `${environment.url}/educations/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * Updates an education entry
   */

  updateEducation(body: any, id: any) {
    const endpoint = `${environment.url}/educations/${id}`;
    return this.http.put(endpoint, body);
  }


}
