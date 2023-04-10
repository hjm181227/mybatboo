import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public async showToast(message: string) {
    // await Toast.show({
    //   text: message
    // });
  }
}
