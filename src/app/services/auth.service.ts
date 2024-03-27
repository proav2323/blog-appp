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
  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    this.loading.next(true);
    await this.session();
    if (this._session && this._session.user) {
      this.setUser(this._session.user.id);
    }
    this.loading.next(false);
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

  async signIn(email: string, password: string) {
    if (!this.supabase.supabase) {
      return;
    }
    const { data, error } =
      await this.supabase.supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (data.user !== null && data.session !== null) {
      this.user.next(data.user);
      return true;
    } else {
      return error
        ? error
          ? error
          : 'somethign went wrong'
        : 'somethign went wrong';
    }
  }

  async signUp(email: string, password: string, name: string) {
    if (!this.supabase.supabase) {
      return;
    }
    const { data, error } = await this.supabase.supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);
    if (data.user !== null && error == null) {
      const dat = await this.supabase.supabase
        .from('users')
        .insert({ name: name, id: data.user.id, saved_blogs: [] });

      if (dat.error) {
        return dat.error;
      }
      return true;
    } else {
      return error ? error : 'somethign went wrong';
    }
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    if (this.supabase.supabase == null) return;
    return this.supabase.supabase.auth.onAuthStateChange(callback);
  }
}
