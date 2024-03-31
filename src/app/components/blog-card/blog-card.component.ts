import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any = {};
  shortTitle: string = '';
  shortDesc: string = '';
  user: any | null = null;
  isSaved: WritableSignal<boolean> = signal(false);

  constructor(
    private AuthService: AuthService,
    private toastr: ToastrService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.shortTitle = this.blog.title.substring(0, 20) + '...';
    this.shortDesc = this.blog.description.substring(0, 20) + '...';
    this.AuthService.user.subscribe((data) => {
      this.user = data;
      if (data !== null) {
        const find = this.user.saved_blogs.find(
          (data: any) => data === this.blog.id
        );

        if (find) {
          this.isSaved.set(true);
        } else {
          this.isSaved.set(false);
        }
      }
    });
  }

  async save(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.user) {
      this.toastr.error('Please login first');
      return;
    }

    if (this.isSaved() === false) {
      const data = await this.blogService.saveBlog(
        this.blog.id,
        this.user.id,
        this.user.saved_blogs
      );

      if (data === undefined) {
        this.toastr.error('blog alredy in your saves');
      } else if (data === null) {
        this.toastr.error('something went wrong');
      } else if (data.error) {
        this.toastr.error(data.error.message);
      } else {
        this.toastr.success('blog saved');
      }
    } else {
      const data = await this.blogService.removeBlog(
        this.blog.id,
        this.user.id,
        this.user.saved_blogs
      );

      if (data === undefined) {
        this.toastr.error('no blog found in your saves');
      } else if (data === null) {
        this.toastr.error('something went wrong');
      } else if (data.error) {
        this.toastr.error(data.error.message);
      } else {
        this.toastr.success('blog removed from your saves');
      }
    }
  }
}
