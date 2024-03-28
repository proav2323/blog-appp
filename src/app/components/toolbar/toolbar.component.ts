import { Component, Input } from '@angular/core';
import { Editor } from '@tiptap/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input() edit = true;
  @Input() editor!: Editor;

  bold() {
    this.editor.chain().focus().toggleBold().run();
  }
}