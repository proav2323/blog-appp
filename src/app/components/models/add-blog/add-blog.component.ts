import { Component, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  blog: WritableSignal<string> = signal('');
}
