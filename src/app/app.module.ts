import { HlmMenuBarModule } from '@spartan-ng/ui-menu-helm';
import { NgModule } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
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
import {
  lucideSearch,
  lucidePlus,
  lucideUser,
  lucideLayers,
  lucideLogOut,
} from '@ng-icons/lucide';
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
import { HlmSkeletonModule } from '@spartan-ng/ui-skeleton-helm';
import { HlmAvatarModule } from '@spartan-ng/ui-avatar-helm';

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
    BrowserAnimationsModule,
    HlmButtonDirective,
    HlmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmIconModule,
    HlmInputModule,
    HlmLabelModule,
    HlmSkeletonModule,
    HlmAvatarModule,
    HlmMenuBarModule,
    BrnMenuTriggerDirective,
    ToastrModule.forRoot(),
    NgIconsModule.withIcons({
      heroUsers,
      heroMoon,
      heroSun,
      lucideLogIn,
      lucideSearch,
      lucidePlus,
      lucideUser,
      lucideLayers,
      lucideLogOut,
    }),
  ],
  providers: [HlmDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
