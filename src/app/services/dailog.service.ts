import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface data {
  user?: any;
}

export type modelType = 'login' | '';

@Injectable({
  providedIn: 'root',
})
export class DailogService {
  open: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  type: BehaviorSubject<modelType> = new BehaviorSubject<modelType>('');
  data: BehaviorSubject<data | undefined> = new BehaviorSubject<
    data | undefined
  >(undefined);
  constructor() {}

  openDialog(type: modelType, data: data | undefined) {
    this.open.next(true);
    this.type.next(type);
    this.data.next(data);
  }

  onClose() {
    this.open.next(false);
    this.type.next('');
    this.data.next(undefined);
  }
}
