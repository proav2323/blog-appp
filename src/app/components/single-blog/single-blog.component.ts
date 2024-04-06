import { Component, Input, WritableSignal, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-blogg',
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css',
})
export class SingleBlogComponentT {
  @Input() blog!: any;
  user: any | null = null;
  isLiked: WritableSignal<boolean> = signal(false);
  constructor(private authSaervice: AuthService) {}
}
