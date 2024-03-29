import { Component, WritableSignal, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  blog: WritableSignal<string> = signal('');

  constructor(private sanitizer: DomSanitizer) {}
  chnageBlog(eventT: string) {
    const val: any = this.sanitizer.bypassSecurityTrustStyle(eventT);
    this.blog.set(val.changingThisBreaksApplicationSecurity);
  }
}
