import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { LoginComponent } from '../models/login/login.component';

@Component({
  selector: 'app-navabr',
  templateUrl: './navabr.component.html',
  styleUrl: './navabr.component.css',
})
export class NavabrComponent {
  theme: 'light' | 'dark' = 'light';
  user: any | null = null;
  constructor(
    private themeService: ThemeService,
    private toastrService: ToastrService,
    private auth: AuthService,
    private dilaogService: HlmDialogService
  ) {
    this.themeService.theme$.subscribe((data) => {
      this.theme = data;
    });

    this.auth.user.subscribe((data) => {
      this.user = data;
    });
  }

  toggle() {
    this.themeService.toggleDarkMode();
  }

  public login() {
    const dialogRef = this.dilaogService.open(LoginComponent, {
      contentClass:
        'max-w-[100vw] md:w-[50vw] w-[95vw] overflow-x-hidden overflow-y-scroll max-h-[100vh] h-full dark:text-white text-black noScroll',
    });
  }

  signout() {
    this.auth.signOut();
  }
}
