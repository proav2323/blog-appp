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
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private supabasee: SupabaseService,
    private toastr: ToastrService
  ) {}
  _session: AuthSession | null = null;
  user: BehaviorSubject<any | null> = new BehaviorSubject(null);
  buser: BehaviorSubject<any | null> = new BehaviorSubject(null);
  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingg: BehaviorSubject<boolean> = new BehaviorSubject(false);
  async session() {
    if (this.supabasee.supabase == null) return;

    const data = await this.supabasee.supabase.auth.getSession();
    this._session = data.data.session;
    return data.error;
  }

  async getUser() {
    if (this.supabasee.supabase == null) {
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

  profile(id: string) {
    if (this.supabasee.supabase == null) {
      return;
    }
    this.loadingg.next(true);
    this.supabasee.supabase
      .from('users')
      .select('*, blogs(*, created_by (*))')
      .eq('id', id)
      .single()
      .then((data) => {
        if (data.error === null) {
          this.buser.next(data.data);
        } else {
          this.buser.next(null);
          this.toastr.error(data.error.message);
        }
        this.loadingg.next(false);
      });
  }

  async setUser(id: string) {
    if (this.supabasee.supabase === null) return;
    const data = await this.supabasee.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    this.user.next(data.data ?? null);
  }

  async signIn(email: string, password: string) {
    if (!this.supabasee.supabase) {
      return;
    }
    const { data, error } =
      await this.supabasee.supabase.auth.signInWithPassword({
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
    if (!this.supabasee.supabase) {
      return;
    }
    const { data, error } = await this.supabasee.supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);
    if (data.user !== null && error == null) {
      const dat = await this.supabasee.supabase
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
    if (this.supabasee.supabase == null) return;
    return this.supabasee.supabase.auth.onAuthStateChange(callback);
  }

  async signOut() {
    if (!this.supabasee.supabase) {
      return;
    }

    const { error } = await this.supabasee.supabase.auth.signOut();

    if (error) {
      this.toastr.error(error.message);
    }

    this._session = null;
    this.user.next(null);
  }

  chnage() {
    if (this._session !== null) {
      if (!this.supabasee.supabase) {
      } else {
        this.supabasee.supabase
          .from('users')
          .select('*')
          .eq('id', this._session.user.id)
          .single()
          .then((data) => {
            this.user.next(data.data ?? null);
          });
      }
    } else {
      console.log(this._session);
    }
  }

  relatime() {
    if (this.supabasee.supabase) {
      this.supabasee.supabase
        .channel('users')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'users' },
          () => {
            this.chnage();
            console.log('user realtime');
          }
        )
        .subscribe((users) => {
          // this.toastr.error(users);
        });
    } else {
      console.log('dsmndafjajsdbjsdbsafbdanbfshbdfsajb');
    }
  }

  update(name: string, about: string, image: string) {
    if (
      this.supabasee.supabase === null ||
      this._session === null ||
      this._session.user === null
    ) {
      return null;
    }
    return this.supabasee.supabase
      .from('users')
      .update({ name: name, about: about ?? '', image: image ?? null })
      .eq('id', this._session.user.id);
  }
}
