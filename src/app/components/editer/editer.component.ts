import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  WritableSignal,
} from '@angular/core';
import { shareReplay, firstValueFrom } from 'rxjs';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrl: './editer.component.css',
})
export class EditerComponent implements OnDestroy, OnInit {
  @Input() classT =
    'flex-col flex py-2 px-4 dark:border-slate-800 border-slate-200 border-[1px] rounded-b-md outline-none';
  @Input() edit = true;
  @Input() value!: WritableSignal<string>;
  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          codeBlock: {
            HTMLAttributes: {
              class:
                'dark:bg-slate-600 shadow-2xl bg-slate-200 py-1 px-2 rounded-md',
            },
          },
          code: {
            HTMLAttributes: {
              class:
                'dark:bg-slate-600 shadow-2xl bg-slate-200 py-1 px-2 rounded-md',
            },
          },
          blockquote: {
            HTMLAttributes: {
              class:
                'dark: border-l-[5px] dark:border-slate-600 border-slate-200 px-2 py-1',
            },
          },
        }),
        Underline,
        Heading.configure({
          HTMLAttributes: {
            class: 'text-2xl',
            levels: [1],
          },
        }),
        Link.configure({
          linkOnPaste: true,
          openOnClick: true,
          autolink: true,
          HTMLAttributes: {
            class: 'text-blue-500',
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: '',
          },
        }),
      ],
      editable: this.edit,
      onUpdate: ({ editor }) => {
        this.value.set(editor.getHTML());
        console.log(this.value());
      },
      editorProps: {
        attributes: {
          class: this.classT,
        },
      },
      content: this.value(),
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
