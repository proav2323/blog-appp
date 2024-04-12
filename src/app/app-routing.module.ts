import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddBlogComponent } from './components/models/add-blog/add-blog.component';
import { AuthGuard } from './auth.guard';
import { SerachComponent } from './pages/serach/serach.component';
import { SavesComponent } from './pages/saves/saves.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';
import { EditComponent } from './pages/edit/edit.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'add', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SerachComponent },
  { path: 'saves', component: SavesComponent },
  { path: 'blog/:id', component: SingleBlogComponent },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
