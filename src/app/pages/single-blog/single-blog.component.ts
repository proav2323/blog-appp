import {
  Component,
  effect,
  WritableSignal,
  signal,
  CreateEffectOptions,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lucideThermometerSun } from '@ng-icons/lucide';
import { HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css',
})
export class SingleBlogComponent {
  loading: boolean = false;
  commentL: WritableSignal<boolean> = signal(false);
  blog: any | null = null;
  id: string = '';
  user: any | null = null;
  isLiked: WritableSignal<boolean> = signal(false);
  first: WritableSignal<boolean> = signal(true);
  comment: string = '';
  commentId: WritableSignal<string> = signal('');
  editingC: WritableSignal<boolean> = signal(false);
  lol: WritableSignal<string> = signal('');
  constructor(
    private AuthService: AuthService,
    private blogService: BlogService,
    private router: Router,
    private atcivatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private supabase: SupabaseService
  ) {
    this.atcivatedRoute.params.subscribe((data) => {
      this.id = data['id'] ?? '';
      this.blogService.getBlog(this.id ?? '');
    });

    setTimeout(() => {
      this.first.set(false);
    }, 1500);

    this.AuthService.user.subscribe((data) => {
      if (data !== null) {
        this.user = data;
      } else {
        this.user = null;
      }
    });

    if (this.supabase.supabase) {
      this.supabase.supabase
        .channel('blogss')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'blogs' },
          (payload) => {
            this.blogService.getBlog(this.id);
            console.log('lol');
          }
        )
        .subscribe((blogs) => {});

      this.supabase.supabase
        .channel('commentss')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'comments' },
          (payload) => {
            this.blogService.getBlog(this.id);
            console.log('lol');
          }
        )
        .subscribe((blogs) => {});
    }
    effect(
      () => {
        this.loading = this.blogService.loading();
        this.blog = this.blogService.blog();

        if (this.user === null) {
          this.isLiked.set(false);
        } else {
          if (this.blog !== null) {
            const fild = this.blog.likes.find(
              (dataa: any) => dataa === this.user.id
            );

            if (fild) {
              this.isLiked.set(true);
            } else {
              this.isLiked.set(false);
            }
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  async like(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.user) {
      this.toastr.error('Please login first');
      return;
    }

    if (this.isLiked() === false) {
      const data = await this.blogService.saveBlogLikes(
        this.blog.id,
        this.user.id,
        this.blog.likes
      );

      if (data === undefined) {
        this.toastr.error('already liked');
      } else if (data === null) {
        this.toastr.error('something went wrong');
      } else if (data.error) {
        this.toastr.error(data.error.message);
      } else {
        this.toastr.success('blog liked');
      }
    } else {
      const data = await this.blogService.removeBlogLikes(
        this.blog.id,
        this.user.id,
        this.blog.likes
      );

      if (data === undefined) {
        this.toastr.error('you haven"t like this');
      } else if (data === null) {
        this.toastr.error('something went wrong');
      } else if (data.error) {
        this.toastr.error(data.error.message);
      } else {
        this.toastr.success('blog unliked');
      }
    }
  }

  delte() {
    const data = this.blogService.deleteBlog(this.id);
    if (data === undefined) {
      this.toastr.error('something went wrong');
    } else {
      data.then((data) => {
        if (data.error === null) {
          this.router.navigate(['/']);
          this.toastr.success('blog deleted');
        } else {
          this.toastr.error(data.error.message);
        }
      });
    }
  }

  edit() {
    if (this.blog == null) {
      return;
    }
    this.router.navigateByUrl(`/edit/${this.blog.id}`);
  }

  async addComment() {
    if (this.comment === '' || this.user === null || this.blog === null) {
      return;
    }
    this.commentL.set(true);
    const data = await this.blogService.addComment(
      this.comment,
      this.user.id,
      this.blog.id
    );

    if (data === null) {
      this.toastr.error('something went wrong');
    } else if (data === true) {
      this.comment = '';
      this.toastr.success('comment added');
    } else {
      this.toastr.error(data.message);
    }
    this.commentL.set(false);
  }

  async dComment(commentId: string) {
    if (commentId === '' || this.user === null) {
      return;
    }
    this.commentL.set(true);
    const data = await this.blogService.dComment(commentId, this.user.id);

    if (data === null) {
      this.toastr.error('something went wrong');
    } else if (data === true) {
      this.comment = '';
      this.toastr.success('comment deleeted');
    } else {
      this.toastr.error(data.message);
    }
    this.commentL.set(false);
  }

  async editComment(commentId: string) {
    if (this.lol() === '' || this.user === null) {
    } else {
      this.commentL.set(true);
      const data = await this.blogService.upComment(
        this.lol(),
        commentId,
        this.user.id
      );

      if (data === null) {
        this.toastr.error('something went wrong');
      } else if (data === true) {
        this.comment = '';
        this.toastr.success('comment added');
      } else {
        this.toastr.error(data.message);
      }
      this.commentL.set(false);
    }
    this.editingC.set(false);
  }
  editCo(id: string) {
    this.commentId.set(id);
    this.editingC.set(true);
    this.lol.set('');
  }

  change(e: any) {
    this.lol.set(e.target.value);
  }
}
