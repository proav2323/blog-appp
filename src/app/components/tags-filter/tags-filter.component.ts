import { Component, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrl: './tags-filter.component.css',
})
export class TagsFilterComponent {
  blogs: any[] = [];
  tags: string[] = [];
  selectedTag: string = '';
  constructor(
    private blogsService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.selectedTag = data['tag'] ?? '';
      this.blogsService.getFiltered(data['tag'] ?? '');
    });
    effect(() => {
      this.blogs = this.blogsService.blogs();

      this.blogs.forEach((data) => {
        this.tags = [...this.tags, ...data.tags];
      });

      this.tags = this.tags.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
      });
    });
  }

  select(tag: string) {
    if (this.selectedTag === tag) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigate(['/'], { queryParams: { tag: tag } });
    }
  }
}
