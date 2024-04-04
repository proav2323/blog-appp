import { ActivatedRoute } from '@angular/router';
import { Component, effect } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrl: './serach.component.css',
})
export class SerachComponent {
  search: string = '';
  blogs: any[] = [];

  constructor(
    private blogService: BlogService,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.queryParams.subscribe((data) => {
      this.search = data['search'] ?? '';
      this.blogService.getFilteredSearch(data['search'] ?? '');
    });
    effect(() => {
      this.blogs = this.blogService.blogs();
    });
  }
}
