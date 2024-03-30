import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private supabse: SupabaseService, private toast: ToastrService) {}

  async addImage(file: any, userId: string) {
    if (!this.supabse.supabase) {
      return null;
    }
    console.log(file.name);
    const dat = await this.supabse.supabase.storage
      .from('image')
      .upload(`${userId}/public/${file.name}`, file);

    if (dat === null) {
      this.toast.error('something went wrong');
      return null;
    } else if (dat.data === null) {
      this.toast.error(String(dat.error.message));
      return null;
    }

    const data = await this.supabse.supabase.storage
      .from('image')
      .getPublicUrl(dat.data.path);

    return data;
  }
}
