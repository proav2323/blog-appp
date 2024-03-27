import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NavabrComponent } from './components/navabr/navabr.component';
import { HomeComponent } from './pages/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { heroSun } from '@ng-icons/heroicons/outline';
import { heroMoon } from '@ng-icons/heroicons/outline';
import { lucideLogIn } from '@ng-icons/lucide';
import { lucideSearch } from '@ng-icons/lucide';
import { SupabaseService } from './services/supabase.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/models/login/login.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { HlmIconComponent, HlmIconModule } from '@spartan-ng/ui-icon-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogModule,
  HlmDialogDescriptionDirective,
  HlmDialogService,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelModule } from '@spartan-ng/ui-label-helm';
import { RegisterComponent } from './components/models/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavabrComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    HlmButtonDirective,
    HlmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmIconModule,
    HlmInputModule,
    HlmLabelModule,
    ToastrModule.forRoot(),
    NgIconsModule.withIcons({
      heroUsers,
      heroMoon,
      heroSun,
      lucideLogIn,
      lucideSearch,
    }),
  ],
  providers: [HlmDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
