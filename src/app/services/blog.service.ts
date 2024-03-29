import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { PostgrestError } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private supabase: SupabaseService) {}

  async add(
    title: string,
    desc: string,
    content: string,
    userId: string
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
    });

    if (data.error) {
      return data.error;
    }

    return true;
  }
}
