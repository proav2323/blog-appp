import { HlmScrollAreaModule } from '@spartan-ng/ui-scrollarea-helm';
import { AddBlogComponent } from './components/models/add-blog/add-blog.component';
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
import {
  lucideCross,
  lucideLogIn,
  lucideMenu,
  lucideMessageCircle,
  lucideSend,
  lucideX,
} from '@ng-icons/lucide';
import {
  lucideSearch,
  lucidePlus,
  lucideUser,
  lucideLayers,
  lucideLogOut,
  lucideBold,
  lucideItalic,
  lucideUnderline,
  lucideSave,
  lucideTrash,
  lucideThumbsUp,
  lucideTrash2,
  lucidePen,
  lucideThumbsDown,
} from '@ng-icons/lucide';
import { SupabaseService } from './services/supabase.service';
import {
  BrnSheetContentDirective,
  BrnSheetModule,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
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
import { EditerComponent } from './components/editer/editer.component';
import { NgxEditorModule } from 'ngx-editor';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuillConfigModule, QuillModule } from 'ngx-quill';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrnSelectImports, BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { BrnSelectOptionDirective } from '@spartan-ng/ui-select-brain';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SafeHtmlPipe } from './safe-html.pipe';
import { HeadingComponent } from './components/heading/heading.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { TagsFilterComponent } from './components/tags-filter/tags-filter.component';
import { BlogsListingComponent } from './components/blogs-listing/blogs-listing.component';
import { SerachComponent } from './pages/serach/serach.component';
import { SavesComponent } from './pages/saves/saves.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';
import { SingleBlogComponentT } from './components/single-blog/single-blog.component';
import { EditComponent } from './pages/edit/edit.component';
import { UserComponent } from './pages/user/user.component';
import { HlmSheetModule } from 'libs/ui/ui-sheet-helm/src';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavabrComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddBlogComponent,
    EditerComponent,
    ToolbarComponent,
    SafeHtmlPipe,
    HeadingComponent,
    BlogCardComponent,
    ProfileImageComponent,
    TagsFilterComponent,
    BlogsListingComponent,
    SerachComponent,
    SavesComponent,
    SingleBlogComponent,
    SingleBlogComponentT,
    EditComponent,
    UserComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgxEditorModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    HlmSelectModule,
    BrnSelectModule,
    BrnSelectOptionDirective,
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
    EditorModule,
    ToastrModule.forRoot(),
    BrnSheetModule,
    HlmSheetModule,
    HlmScrollAreaModule,
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
      lucideBold,
      lucideItalic,
      lucideUnderline,
      lucideSave,
      lucideTrash,
      lucideThumbsUp,
      lucideTrash2,
      lucidePen,
      lucideThumbsDown,
      lucideMessageCircle,
      lucideX,
      lucideCross,
      lucideSend,
      lucideMenu,
    }),
  ],
  providers: [
    HlmDialogService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
