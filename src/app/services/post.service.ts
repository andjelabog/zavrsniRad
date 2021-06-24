import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import Post from '../models/post.model';

@Injectable()
export class PostService {
  postsUrl = `${environment.apiUrl}/posts`;

  constructor(
    private http: HttpClient
  ) { }

  public getPosts(): Observable<Post[]> {
    return this.http
      .get(this.postsUrl)
      .pipe(map(response => response['data'] as Post[]));
  }

  public getPublishedPosts(): Observable<Post[]> {
    return this.getPosts()
      .pipe(map(posts => {
        return posts
          .filter(post => post.isPublished)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }));
  }

  public getPostById(id: string): Observable<Post> {
    return this.http.get(`${this.postsUrl}/${id}`)
      .pipe(map(response => response['data'] as Post));
  }
}