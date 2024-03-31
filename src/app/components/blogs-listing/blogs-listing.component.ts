import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, Input, effect } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs-listing',
  templateUrl: './blogs-listing.component.html',
  styleUrl: './blogs-listing.component.css',
})
export class BlogsListingComponent {
  @Input() blogs: any[] = [];
  @Input() showButton: boolean = true;
  @Input() url: string = '';
  loading: boolean = false;
  user: any | null = null;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private AuthService: AuthService
  ) {
    effect(() => {
      this.loading = this.blogService.loading();
    });
  }

  reset() {
    this.router.navigateByUrl(this.url);
  }
}
