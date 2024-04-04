import { Injectable, WritableSignal, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { PostgrestError } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogs: WritableSignal<any[]> = signal([]);
  loading: WritableSignal<boolean> = signal(false);
  constructor(
    private supabase: SupabaseService,
    private toastr: ToastrService
  ) {
    if (this.supabase.supabase) {
      this.supabase.supabase
        .channel('blogs')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'blogs' },
          () => {
            this.getAll();
            console.log('blogs realtime');
          }
        )
        .subscribe((blogs) => {});
    }
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
      this.loading.set(true);
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
          this.loading.set(false);
        });
    }
  }

  getFiltered(tag: string) {
    if (!this.supabase.supabase) {
    } else {
      if (tag !== '') {
        this.loading.set(true);
        this.supabase.supabase
          .from('blogs')
          .select(`*, created_by (*)`)
          .contains('tags', [tag])
          .then((data) => {
            if (data.error === null) {
              this.blogs.set(data.data ?? []);
            } else {
              this.toastr.success(
                'Something went wrong! Please try again later',
                data.error.message
              );
            }
            this.loading.set(false);
          });
      } else {
        this.getAll();
      }
    }
  }

  getSingleReturn(tag: string[]) {
    this.loading.set(true);
    if (!this.supabase.supabase) {
      this.loading.set(false);
      return null;
    } else {
      if (tag.length >= 1) {
        this.loading.set(false);
        return this.supabase.supabase
          .from('blogs')
          .select(`*, created_by (*)`)
          .in('id', tag);
      } else {
        this.loading.set(false);
        return 'no data';
      }
    }
  }

  getFilteredSearch(tag: string) {
    if (!this.supabase.supabase) {
    } else {
      if (tag !== '') {
        console.log(
          `title.cs.'${tag}',description.cs.'${tag}',tags.cs.'{${tag}}'`
        );
        this.loading.set(true);
        this.supabase.supabase
          .from('blogs')
          .select(`*, created_by (*)`)
          .textSearch('title', `${tag}`, {
            config: 'english',
            type: 'websearch',
          })
          .then((data) => {
            if (data.error === null) {
              this.blogs.set(data.data ?? []);
            } else {
              this.toastr.error(
                'Something went wrong! Please try again later',
                data.error.message
              );
            }
            this.loading.set(false);
          });
      } else {
        this.getAll();
      }
    }
  }

  async saveBlog(blogId: string, userid: string, savedBlogs: string[]) {
    if (!this.supabase.supabase) {
      return null;
    }

    const find = savedBlogs.find((data) => data === blogId);

    if (find) {
      return;
    }
    const saved_blogs = [...savedBlogs, blogId];

    const data = await this.supabase.supabase
      .from('users')
      .update({ saved_blogs: saved_blogs })
      .eq('id', userid);

    return data;
  }

  async removeBlog(blogId: string, userid: string, savedBlogs: string[]) {
    if (!this.supabase.supabase) {
      return null;
    }

    const find = savedBlogs.find((data) => data === blogId);

    if (!find) {
      return;
    }
    const saved_blogs = savedBlogs.filter((data) => data !== blogId);

    const data = await this.supabase.supabase
      .from('users')
      .update({ saved_blogs: saved_blogs })
      .eq('id', userid);

    return data;
  }
}
