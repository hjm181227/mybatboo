import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://15.164.23.13:8080/';

  constructor(
    private http: HttpClient) {
  }

  public getData() {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }

  // 이미지(capacitor/camera의 Photo)와 디바이스의 geolocation을 서버로 전송
  public sendImageAndLocation(image: Photo, geolocation?: GeolocationPosition) {
    const url = `${this.apiUrl}/data`;
    const data = {
      image: image,
      geolocation: geolocation
    };
    return this.http.post(url, data);
  }
}
