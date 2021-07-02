import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url: string = 'https://manager-projects-api.herokuapp.com/projects';

  constructor(private http: HttpClient) { }

  save(body: any) {
    return this.http.post(`${this.url}`, body);
  }

  update(body: any) {
    const id = body._id;
    delete body._id;
    return this.http.patch(`${this.url}/${id}`, body);
  }

  getAll() {
    return this.http.get(`${this.url}`);
  }

  getById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
