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
import { ModelComponent } from './components/providers/model/model.component';
import { LoginComponent } from './components/models/login/login.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogService,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';

@NgModule({
  declarations: [
    AppComponent,
    NavabrComponent,
    HomeComponent,
    ModelComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    HlmButtonDirective,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmDialogFooterComponent,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmIconComponent,
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
