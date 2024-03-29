import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddBlogComponent } from './components/models/add-blog/add-blog.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'add', component: AddBlogComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
