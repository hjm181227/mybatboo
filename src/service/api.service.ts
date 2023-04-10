import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from "@capacitor/camera";
import { ParamsBuilder } from "../params.builder";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://15.164.23.13:8080';

  constructor(
    private http: HttpClient) {
  }

  public getData() {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }

  // 이미지(capacitor/camera의 Photo)와 디바이스의 geolocation을 서버로 전송
  public sendImageAndLocation(image: File, geolocation?: GeolocationPosition): Observable<any> {
    const url = `${this.apiUrl}/savefile`;
    const formData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    formData.append('file', image, 'test-image');
    formData.append('userName', 'fe');
    formData.append('saveName', 'fe-test2');
    return this.http.post(url, formData, { headers, withCredentials: true}).pipe(
      catchError(err => err)
    );
  }
}
