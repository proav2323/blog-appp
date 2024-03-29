import { BehaviorSubject } from 'rxjs';
import {
  Component,
  WritableSignal,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AddBlogComponent {
  content: BehaviorSubject<string> = new BehaviorSubject('');
  error: WritableSignal<{ title: string; desc: string; content: string }> =
    signal({
      title: '',
      desc: '',
      content: '',
    });
  loading: WritableSignal<boolean> = signal(false);
  isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: any | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.auth.user.subscribe((data) => {
      this.user = data;
    });
    this.isSubmitted.subscribe((data) => {
      if (data === true) {
        this.form.controls['title'].valueChanges.subscribe((data) => {
          if (this.form.controls['title'].hasError('required')) {
            this.error.set({ ...this.error(), title: 'Title Is Required' });
          } else {
            this.error.set({ ...this.error(), title: '' });
          }
        });
        this.form.controls['desc'].valueChanges.subscribe((data) => {
          if (this.form.controls['desc'].hasError('required')) {
            this.error.set({
              ...this.error(),
              desc: 'Description Is Required',
            });
          } else {
            this.error.set({ ...this.error(), desc: '' });
          }
        });
        this.content.subscribe((data) => {
          if (this.content.getValue() === '') {
            this.error.set({ ...this.error(), content: 'content is required' });
          } else {
            this.error.set({ ...this.error(), content: '' });
          }
        });
      }
    });
  }
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });

  async add() {
    if (this.form.valid && this.content.getValue() !== '') {
      this.form.disable();
      this.loading.set(true);
      const data = await this.blogService.add(
        this.form.controls['title'].value!,
        this.form.controls['desc'].value!,
        this.content.getValue(),
        this.user.id
      );

      if (data === null) {
        this.toast.error('something went wrong');
      } else if (data === true) {
        this.toast.success('blog added');
        this.router.navigateByUrl('/');
      } else {
        this.toast.error(data.message);
      }

      this.form.enable();
      this.loading.set(false);
    } else {
      if (this.form.controls['title'].hasError('required')) {
        this.error.set({ ...this.error(), title: 'Title Is Required' });
      }
      if (this.form.controls['desc'].hasError('required')) {
        this.error.set({
          ...this.error(),
          desc: 'Description Is Required',
        });
      }
      if (this.content.getValue() === '') {
        this.error.set({
          ...this.error(),
          content: 'content is required',
        });
      }
    }
    this.isSubmitted.next(true);
  }
  chnageBlog(eventT: string) {
    const val: any = this.sanitizer.bypassSecurityTrustStyle(eventT);
    this.content.next(val.changingThisBreaksApplicationSecurity);
  }
}
