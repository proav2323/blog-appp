import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}
  _session: AuthSession | null = null;
  user: BehaviorSubject<any | null> = new BehaviorSubject(null);

  async session() {
    if (this.supabase.supabase == null) return;

    const data = await this.supabase.supabase.auth.getSession();
    this._session = data.data.session;
    return data.error;
  }

  async getUser() {
    if (this.supabase.supabase == null) {
      console.log('jkll');
      return;
    }
    await this.session();

    if (this._session && this._session.user) {
      this.setUser(this._session.user.id);
    }

    // console.log(this.profile('1a607301-dbe0-4b51-865f-c2a86bb46b68'));
  }

  async profile(id: string) {
    if (this.supabase.supabase == null) {
      return;
    }
    const data = await this.supabase.supabase.from('users').select('*');

    return data;
  }

  async setUser(id: string) {
    if (this.supabase.supabase == null) return;
    const data = await this.supabase.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    this.user.next(data.data ?? null);
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    if (this.supabase.supabase == null) return;
    return this.supabase.supabase.auth.onAuthStateChange(callback);
  }
}
