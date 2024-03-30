import { Component, effect } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  blogs: any[] = [];
  constructor(private blogService: BlogService) {
    this.blogService.getAll();
    effect(() => {
      this.blogs = this.blogService.blogs();
    });
  }
}
