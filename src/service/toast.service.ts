import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public async showToast(message: string) {
    await Toast.show({
      text: message
    });
  }
}
