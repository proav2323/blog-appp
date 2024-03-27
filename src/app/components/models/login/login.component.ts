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
import { RegisterComponent } from '../register/register.component';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';
  isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  error: WritableSignal<{ email: string; password: string }> = signal({
    email: '',
    password: '',
  });

  constructor(private deilog: HlmDialogService) {
    this.isSubmitted.subscribe((data) => {
      if (data === true) {
        this.form.controls['email'].valueChanges.subscribe((data) => {
          if (this.form.invalid) {
            if (this.form.controls['email'].hasError('required')) {
              this.error.set({ ...this.error(), email: 'Email is required' });
            } else if (this.form.controls['email'].hasError('email')) {
              this.error.set({ ...this.error(), email: 'Invalid email' });
            } else {
              this.error.set({ ...this.error(), email: '' });
            }
          } else {
            this.error.set({ ...this.error(), email: '' });
          }
        });

        this.form.controls['password'].valueChanges.subscribe((data) => {
          if (this.form.invalid) {
            if (this.form.controls['password'].hasError('required')) {
              this.error.set({
                ...this.error(),
                password: 'Password is required',
              });
            } else if (this.form.controls['password'].hasError('minlength')) {
              this.error.set({
                ...this.error(),
                password: 'Password should be 8 or longer length',
              });
            } else {
              this.error.set({ ...this.error(), password: '' });
            }
          } else {
            this.error.set({ ...this.error(), password: '' });
          }
        });
      }
    });
  }

  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<undefined>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  openReg() {
    this._dialogRef.close();
    this.deilog.open(RegisterComponent, {
      contentClass:
        'max-w-[100vw] md:w-[50vw] w-[95vw] overflow-x-hidden overflow-y-scroll max-h-[100vh] h-full dark:text-white text-black noScroll',
    });
  }

  login() {
    if (this.form.valid) {
    } else {
      if (this.form.controls['email'].hasError('required')) {
        this.error.set({
          ...this.error(),
          email: 'Email is required',
        });
      } else if (this.form.controls['email'].hasError('email')) {
        this.error.set({ ...this.error(), email: 'Invalid email' });
      }

      if (this.form.controls['password'].hasError('required')) {
        this.error.set({
          ...this.error(),
          password: 'Password is required',
        });
      } else if (this.form.controls['password'].hasError('minlength')) {
        this.error.set({
          ...this.error(),
          password: 'Password should be 8 or longer length',
        });
      }
    }
    this.isSubmitted.next(true);
  }
}
