import { BehaviorSubject } from 'rxjs';
import {
  Component,
  signal,
  WritableSignal,
  effect,
  inject,
  HostBinding,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { rxHostBinding } from '@spartan-ng/ui-core';
import {
  BrnDialogRef,
  injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { AuthService } from 'src/app/services/auth.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';
  isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  error: WritableSignal<{ name: string; about: string }> = signal({
    name: '',
    about: '',
  });
  loading: WritableSignal<boolean> = signal(false);
  uLoading: WritableSignal<boolean> = signal(false);
  user: any | null = null;
  image: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private deilog: HlmDialogService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private imageService: ImageService
  ) {
    this.uLoading.set(true);
    this.authService.user.subscribe((data) => {
      this.user = data;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['about'].setValue(data.about ?? '');
      if (localStorage.getItem('uImage') !== null) {
        this.image.next(localStorage.getItem('uImage') ?? '');
      } else {
        this.image.next(data.image ?? '');
      }
      this.uLoading.set(false);
    });
    this.isSubmitted.subscribe((data) => {
      if (data === true) {
        this.form.controls['name'].valueChanges.subscribe((data) => {
          if (this.form.invalid) {
            if (this.form.controls['name'].hasError('required')) {
              this.error.set({ ...this.error(), name: 'Name is required' });
            } else {
              this.error.set({ ...this.error(), name: '' });
            }
          } else {
            this.error.set({ ...this.error(), name: '' });
          }
        });
      }
    });
  }

  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<undefined>();

  form: FormGroup = new FormGroup({
    name: new FormControl(
      {
        value: this.user !== null ? this.user.name : '',
        disabled: this.loading(),
      },
      [Validators.required]
    ),
    about: new FormControl(
      {
        value: this.user !== null ? this.user.about : '',
        disabled: this.loading(),
      },
      [Validators.required]
    ),
  });

  login() {
    if (this.form.valid && this.user !== null) {
      this.form.disable();
      this.loading.set(true);
      const data = this.authService.update(
        this.form.controls['name'].value,
        this.form.controls['about'].value,
        this.image.getValue()
      );

      if (data === null) {
        this.toast.error('Something went wrong');
        this.form.enable();
        this.loading.set(false);
        return;
      }

      data.then((data) => {
        if (data.error === null) {
          this.toast.success('user updated');
          this.close();
        } else {
          this.user.next(null);
          this.toast.error(data.error.message);
        }
        this.loading.set(false);
        this.form.enable();
        this.removeImg();
      });
    } else {
      if (this.form.controls['name'].hasError('required')) {
        this.error.set({
          ...this.error(),
          name: 'Name is required',
        });
      }
    }
    this.isSubmitted.next(true);
  }

  close() {
    this._dialogRef.close();
  }

  async addImg(e: any) {
    const file = e.target.files[0];
    this.loading.set(true);
    const data = await this.imageService.addImage(file, this.user.id);
    if (data === null) {
      this.toast.error('something went wrong');
    } else {
      this.image.next(data.data.publicUrl);
      localStorage.setItem('uImage', data.data.publicUrl);
    }
    this.loading.set(false);
  }

  removeImg() {
    localStorage.removeItem('uImage');
    this.image.next('');
  }
}
