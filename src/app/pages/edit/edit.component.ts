import { BehaviorSubject } from 'rxjs';
import {
  Component,
  WritableSignal,
  signal,
  ViewEncapsulation,
  Signal,
  effect,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  content: BehaviorSubject<string> = new BehaviorSubject('');
  image: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem('image') ?? ''
  );
  error: WritableSignal<{
    title: string;
    desc: string;
    content: string;
    image: string;
  }> = signal({
    title: '',
    desc: '',
    content: '',
    image: '',
  });
  loading: WritableSignal<boolean> = signal(false);
  load = false;
  isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: any | null = null;
  tags: string[] = [];
  tag: string = '';
  blog: BehaviorSubject<any | null> = new BehaviorSubject(null);
  first: WritableSignal<boolean> = signal(true);

  constructor(
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService,
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.auth.user.subscribe((data) => {
      this.user = data;
      if (data !== null) {
        this.activatedRoute.params.subscribe((data) => {
          this.loading.set(true);
          const dataa = this.blogService.getSingleBlog(data['id'] ?? '');
          if (dataa === 'no data') {
            this.toast.error('something went wrong');
          } else if (dataa === null) {
            this.toast.error('something went wrong');
          } else {
            dataa.then((data) => {
              if (
                data.error === null &&
                this.user.id === data.data.created_by.id
              ) {
                this.blog.next(data.data);
              } else if (
                data.error === null &&
                this.user.id !== data.data.created_by.id
              ) {
                this.toast.error('you are not the author of this blog');
                this.router.navigateByUrl('/');
              } else {
                this.toast.error(data.error!.message);
              }
              this.loading.set(false);
            });
          }
          this.first.set(false);
        });
      }
    });

    this.blog.subscribe((data) => {
      if (data !== null) {
        this.content.next(data.content);
        this.image.next(data.thumbnail);
        this.tags = data.tags;
        this.form.controls['title'].setValue(data.title);
        this.form.controls['desc'].setValue(data.description);
      }
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

        this.image.subscribe((data) => {
          if (this.content.getValue() === '') {
            this.error.set({
              ...this.error(),
              image: 'Image is required',
            });
          } else {
            this.error.set({ ...this.error(), image: '' });
          }
        });
      }
    });

    effect(() => {
      this.load = this.blogService.loading();
    });
  }
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    tag: new FormControl(''),
  });

  async add() {
    if (
      this.form.valid &&
      this.content.getValue() !== '' &&
      this.image.getValue() !== '' &&
      this.tags.length >= 1 &&
      this.blog.getValue() !== null
    ) {
      this.form.disable();
      this.loading.set(true);
      const data = await this.blogService.edit(
        this.blog.getValue().id,
        this.form.controls['title'].value!,
        this.form.controls['desc'].value!,
        this.content.getValue(),
        this.tags,
        this.image.getValue()
      );

      if (data === null) {
        this.toast.error('something went wrong');
      } else if (data === true) {
        this.toast.success('blog edited');
        this.router.navigateByUrl(`blog/${this.blog.getValue().id}`);
      } else {
        this.toast.error(data.message);
      }

      this.form.enable();
      this.loading.set(false);
      localStorage.removeItem('image');
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

      if (this.image.getValue() === '') {
        this.error.set({
          ...this.error(),
          image: 'Image is required',
        });
      }

      if (this.tags.length <= 0) {
        this.toast.error('atleast one tag are required');
      }
    }
    this.isSubmitted.next(true);
  }
  chnageBlog(eventT: string) {
    const val: any = this.sanitizer.bypassSecurityTrustStyle(eventT);
    this.content.next(val.changingThisBreaksApplicationSecurity);
  }

  removeImg() {
    this.image.next('');
    localStorage.removeItem('image');
  }

  async addImg(e: any) {
    const file = e.target.files[0];
    this.loading.set(true);
    const data = await this.imageService.addImage(file, this.user.id);
    if (data === null) {
      this.toast.error('something went wrong');
    } else {
      this.image.next(data.data.publicUrl);
      localStorage.setItem('image', data.data.publicUrl);
    }
    this.loading.set(false);
  }

  addTag() {
    if (
      this.form.controls['tag'].value !== null &&
      this.form.controls['tag'].value !== ''
    ) {
      const tag = this.form.controls['tag'].value;
      const find = this.tags.find((data) => data === tag);

      if (find === undefined) {
        this.tags.push(tag);
      }

      this.form.controls['tag'].reset();
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((data) => data !== tag);
  }
}
