import { Component } from '@angular/core';
import { GitHubService } from '../git-hub.service';
import { Repository } from '../repositories.model';

@Component({
  selector: 'app-search',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-medium mb-4">Search Github Repositories</h1>
      <form (ngSubmit)="onSubmit()">
        <div class="flex items-center mb-4">
          <input
            type="text"
            class="flex-1 appearance-none border border-gray-300 rounded-l py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="Enter Github username"
            [(ngModel)]="username"
            name="username"
          />
          <button
            class="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-2 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <app-repositories *ngIf="repositories" [repositories]="repositories" [page]="page" [pageSize]="pageSize" [totalCount]="totalCount"></app-repositories>
    </div>
  `,
})
export class SearchComponent {
  username = '';
  repositories: Repository[] = [];
  page = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private gitHubService: GitHubService) {}

  onSubmit() {
    this.page = 1;
    this.gitHubService.searchRepositories(this.username).subscribe((data) => {
      this.repositories = data.items;
      this.totalCount = data.total_count;
    });
  }
}