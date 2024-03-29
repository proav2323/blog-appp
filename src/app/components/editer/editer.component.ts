import { ThemeService } from './../../services/theme.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { shareReplay, firstValueFrom } from 'rxjs';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { EditorOptions } from 'tinymce';
import Theme from 'quill/core/theme';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrl: './editer.component.css',
})
export class EditerComponent {
  theme: 'light' | 'dark' = 'light';
  @Input() value!: string;
  @Input() editT = true;
  @Output() text = new EventEmitter<string>();
  constructor(private ThemeService: ThemeService) {
    this.ThemeService.theme$.subscribe((data) => {
      this.theme = data;
      this.edit.set({
        base_url: '/tinymce',
        suffix: '.min',
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        selector: 'textarea',
        statusbar: false,
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        skin: this.theme === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: this.theme === 'dark' ? 'dark' : 'default',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
        editable_root: this.editT,
        setup: (editor: any) => {
          editor.on('input NodeChange', () => {
            this.text.emit(editor.getContent({ format: 'html' }));
          });
        },
      });
    });
  }

  edit: WritableSignal<any> = signal({
    plugins:
      'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
    toolbar:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    selector: 'textarea',
    statusbar: false,
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: this.theme === 'dark' ? 'oxide-dark' : 'oxide',
    content_css: this.theme === 'dark' ? 'dark' : 'default',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    editable_root: this.editT,
    setup: (editor: any) => {
      editor.on('keyup', () => {
        editor.setContent(this.value);
        console.log(this.value);
        console.log('klol');
      });
    },
  });

  chnage() {
    console.log(this.value);
  }
}
