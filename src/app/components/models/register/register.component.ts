import {
  Component,
  signal,
  WritableSignal,
  effect,
  inject,
  HostBinding,
} from '@angular/core';
import { Router } from '@angular/router';
import { rxHostBinding } from '@spartan-ng/ui-core';
import {
  BrnDialogRef,
  injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';

  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<undefined>();
}
