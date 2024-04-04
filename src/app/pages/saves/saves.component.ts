import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.css',
})
export class SavesComponent {
  blogs: any[] = [];

  constructor(
    public auth: AuthService,
    private blogService: BlogService,
    private toastrService: ToastrService
  ) {
    this.auth.user.subscribe((data) => {
      if (data !== null) {
        this.blogs = [];
        const dataa = this.blogService.getSingleReturn(data.saved_blogs);

        if (dataa === null) {
          this.toastrService.error('something went wrong');
        } else if (dataa === 'no data') {
        } else {
          dataa.then((data) => {
            if (data.error === null) {
              this.blogs = data.data ?? [];
            } else {
              this.toastrService.error(data.error.message);
            }
          });
        }
      } else {
        this.blogs = [];
      }
    });
  }
}
