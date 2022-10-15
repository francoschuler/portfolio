import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmploymentService {

  constructor(private http: HttpClient) { }


  /**
   * Gets all employments
   */
  getEmployments() {
    const endpoint = `${environment.url}/employments`;
    return this.http.get(endpoint);
  }

  /**
   * Saves a new employment entry
   */
  saveEmployment(body:any){
    const endpoint = `${environment.url}/employments`;
    return this.http.post(endpoint, body);
  }

  /**
   * Deletes an employment entry
   */
  deleteEmployment(id:any) {
    const endpoint = `${environment.url}/employments/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * Updates an employment entry
   */
  updateEmployment(body: any, id: any) {
    const endpoint = `${environment.url}/employments/${id}`;
    return this.http.put(endpoint, body);
  }

}
