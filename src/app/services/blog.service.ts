import { Injectable, WritableSignal, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { PostgrestError } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogs: WritableSignal<any[]> = signal([]);
  constructor(
    private supabase: SupabaseService,
    private toastr: ToastrService
  ) {
    if (this.supabase.supabase) {
      this.supabase.supabase
        .channel('blogs')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'blogs' },
          this.getAll
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'blogs' },
          this.getAll
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'blogs' },
          this.getAll
        )
        .subscribe((blogs) => {});
    }
    this.supabase.supabase;
  }

  async add(
    title: string,
    desc: string,
    content: string,
    userId: string,
    tags: string[],
    image: string
  ): Promise<null | PostgrestError | true> {
    if (!this.supabase.supabase) {
      return null;
    }
    const data = await this.supabase.supabase.from('blogs').insert({
      title: title,
      description: desc,
      content: content,
      created_by: userId,
      likes: [],
      tags: tags,
      thumbnail: image,
    });

    if (data.error) {
      return data.error;
    }

    return true;
  }

  getAll() {
    if (!this.supabase.supabase) {
    } else {
      this.supabase.supabase
        .from('blogs')
        .select(`*, created_by (*)`)
        .then((data) => {
          if (data.error === null) {
            this.blogs.set(data.data ?? []);
          } else {
            this.toastr.success(
              'Something went wrong! Please try again later',
              data.error.message
            );
          }
        });
    }
  }
}
