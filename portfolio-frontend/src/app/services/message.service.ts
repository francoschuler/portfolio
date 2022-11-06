import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }


  /**
   * Gets all messages
   */
  getMessages() {
    const endpoint = `${environment.url}/messages`;
    return this.http.get(endpoint);
  }

  /**
   * Saves a new message
   */
  sendMessage(body:any){
    const endpoint = `${environment.url}/messages`;
    return this.http.post(endpoint, body);
  }

  /**
   * Deletes a message
   */
  // deleteMessage(id:any) {
  //   const endpoint = `${environment.url}/messages/${id}`;
  //   return this.http.delete(endpoint);
  // }

  /**
   * Updates a message
   */

  // updateMessage(body: any, id: any) {
  //   const endpoint = `${environment.url}/messages/${id}`;
  //   return this.http.put(endpoint, body);
  // }
}
