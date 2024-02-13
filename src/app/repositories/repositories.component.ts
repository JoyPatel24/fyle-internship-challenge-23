import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../repositories/repositories.model';



@Component({
  selector: 'app-repositories',
  template: `
    
    <div class="container mx-auto p-4">
      <!-- ... -->
    <table>
      <tbody>
        <tr *ngFor="let repository of repositories; let i = index">
          <!-- ... -->
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
    <div class="mt-4">
      <button
        class="mr-4"
        [disabled]="page === 1"
        (click)="onPrevPage()"
      >
        Previous
      </button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <select
        class="border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <button class="ml-4" (click)="onNextPage()">Next</button>
    </div>
  </div>
`,
})
export class RepositoriesComponent implements OnInit {
  @Input() repositories: Repository[];
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  onPrevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  onNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  ngOnInit(): void {}
}