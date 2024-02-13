import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly API_URL = 'https://api.github.com/users';
  private readonly CACHE: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  getUserRepositories(username: string, page = 1, perPage = 10) {
    const cacheKey = `${username}-page-${page}-perPage-${perPage}`;
    if (_.has(this.CACHE, cacheKey)) {
      return Promise.resolve(this.CACHE[cacheKey]);
    }

    return this.http
      .get(`${this.API_URL}/${username}/repos`, {
        params: { page, per_page: perPage },
      })
      .toPromise()
      .then((response) => {
        this.CACHE[cacheKey] = response;
        return response;
      });
  }
}