import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { environment } from 'src/envirnment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { SupabaseService } from './services/supabase.service';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BlogYY';
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService
  ) {
    this.authService.loading.subscribe((data) => {
      this.loading = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.supabaseService.getSupabse();
    this.authService.getUser();
    this.authService.authChanges(
      (event: AuthChangeEvent, session: Session | null) => {
        this.authService._session = session;
        this.authService.getUser();
      }
    );
  }
}
