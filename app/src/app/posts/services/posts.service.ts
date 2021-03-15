import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  getPosts(): Promise<any> {
    console.log(`${environment.baseUrl}/posts`);
    return this.http.get(`${environment.baseUrl}/posts`).toPromise();
  }

  getPost(id: string): Promise<any> {
    return this.http.get(`${environment.baseUrl}/posts/${id}`).toPromise();
  }

  deletePost(id: string): Promise<any> {
    return this.http.delete(`${environment.baseUrl}/posts/${id}`).toPromise();
  }

  createPost(post: PostModel): Promise<any> {
    return this.http.post(`${environment.baseUrl}/posts`, post).toPromise();
  }

  updatePost(post: PostModel): Promise<any> {
    return this.http.put(`${environment.baseUrl}/posts`, post).toPromise();
  }
}

