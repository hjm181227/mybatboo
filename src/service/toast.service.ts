import { Injectable } from '@angular/core';
import { Toast } from "@capacitor/toast";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public async show(message: string, duration: 'short' | 'long' = 'short') {
    await Toast.show({
      text: message,
      position: 'bottom',
      duration
    });
  }
}
