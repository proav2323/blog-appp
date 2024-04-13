import { Injectable, WritableSignal, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import {
  PostgrestError,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogs: WritableSignal<any[]> = signal([]);
  blog: WritableSignal<any | null> = signal(null);
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
          (payload) => {
            this.getAll();
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

  getSingleBlog(id: string) {
    this.loading.set(true);
    if (!this.supabase.supabase) {
      this.loading.set(false);
      return null;
    } else {
      if (id !== '') {
        this.loading.set(false);
        return this.supabase.supabase
          .from('blogs')
          .select(`*, created_by (*)`)
          .eq('id', id)
          .single();
      } else {
        this.loading.set(false);
        return 'no data';
      }
    }
  }

  async edit(
    id: string,
    title: string,
    desc: string,
    content: string,
    tags: string[],
    image: string
  ): Promise<null | PostgrestError | true> {
    if (!this.supabase.supabase) {
      return null;
    }
    const data = await this.supabase.supabase
      .from('blogs')
      .update({
        title: title,
        description: desc,
        content: content,
        likes: [],
        tags: tags,
        thumbnail: image,
      })
      .eq('id', id);

    if (data.error) {
      return data.error;
    }

    return true;
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

  async saveBlogLikes(blogId: string, userid: string, savedBlogs: string[]) {
    if (!this.supabase.supabase) {
      return null;
    }

    const find = savedBlogs.find((data) => data === userid);

    if (find) {
      return;
    }
    const saved_blogs = [...savedBlogs, userid];

    const data = await this.supabase.supabase
      .from('blogs')
      .update({ likes: saved_blogs })
      .eq('id', blogId);

    return data;
  }

  async removeBlogLikes(blogId: string, userid: string, savedBlogs: string[]) {
    if (!this.supabase.supabase) {
      return null;
    }
    const find = savedBlogs.find((data) => data === userid);

    if (!find) {
      return;
    }
    const saved_blogs = savedBlogs.filter((data) => data !== userid);

    const data = await this.supabase.supabase
      .from('blogs')
      .update({ likes: saved_blogs })
      .eq('id', blogId);

    return data;
  }

  getBlog(id: string) {
    if (!this.supabase.supabase || id === '') {
      this.blog.set(null);
      return;
    }
    this.loading.set(true);
    this.supabase.supabase
      .from('blogs')
      .select(`*, created_by (*), comments (*, comment_by (*)))`)
      .eq('id', id)
      .single()
      .then((data) => {
        if (data.error === null) {
          this.blog.set(data.data ?? null);
        } else {
          this.toastr.error(
            'Something went wrong! Please try again later ' + data.error.message
          );
          this.blog.set(null);
        }
        this.loading.set(false);
      });
  }

  async addComment(text: string, userId: string, blogId: string) {
    if (!this.supabase.supabase) {
      return null;
    }
    const data = await this.supabase.supabase.from('comments').insert({
      text: text,
      comment_by: userId,
      blog_on: blogId,
    });

    if (data.error) {
      return data.error;
    }

    return true;
  }

  async upComment(text: string, commentId: string, userId: string) {
    if (!this.supabase.supabase) {
      return null;
    }
    const data = await this.supabase.supabase
      .from('comments')
      .update({
        text: text,
      })
      .eq('id', commentId)
      .eq('comment_by', userId);

    if (data.error) {
      return data.error;
    }

    return true;
  }

  async dComment(commentId: string, userId: string) {
    if (!this.supabase.supabase) {
      return null;
    }
    const data = await this.supabase.supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('comment_by', userId);

    if (data.error) {
      return data.error;
    }

    return true;
  }

  deleteBlog(blogId: string) {
    if (!this.supabase.supabase || blogId === '') {
      return;
    }
    this.loading.set(true);
    return this.supabase.supabase
      .from('blogs')
      .delete()
      .eq('id', blogId)
      .single();
  }
}
