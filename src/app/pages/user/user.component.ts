import {
  Component,
  effect,
  WritableSignal,
  signal,
  CreateEffectOptions,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lucideThermometerSun } from '@ng-icons/lucide';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  loading: boolean = true;
  id: string = '';
  user: any | null = null;
  currentuser: any | null = null;
  first: WritableSignal<boolean> = signal(true);

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
      this.AuthService.profile(this.id);
      this.first.set(false);
    });

    this.AuthService.user.subscribe((data) => {
      if (data !== null) {
        this.currentuser = data;
      } else {
        this.currentuser = null;
      }
    });

    this.AuthService.buser.subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });

    this.AuthService.loadingg.subscribe((data) => {
      this.loading = data;
    });

    if (this.supabase.supabase) {
      this.supabase.supabase
        .channel('blogss')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'users' },
          (payload) => {
            this.AuthService.profile(this.id);
          }
        )
        .subscribe((blogs) => {});
    }
  }
}
