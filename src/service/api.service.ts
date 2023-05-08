import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from "rxjs";

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
    const url = `${this.apiUrl}/crop/diagnosis`;
    const formData = new FormData();
    const headers = new HttpHeaders();
    const requestInput = {
      userId: 10,
      userLatitude: 0,
      userLongitude: 0,
      regDate: new Date(),
      cropType: 1
    };
    console.log(requestInput, image);
    headers.append('Content-Type', 'multipart/form-data');

    formData.append('requestInput', JSON.stringify(requestInput));

    formData.append('image', image, 'test-image');
    // formData.append('userName', 'fe');
    // formData.append('saveName', 'fe-test2');
    return this.http.post(url, formData, { headers, withCredentials: true }).pipe(
      catchError(err => err)
    );
  }

  public requestDiagnosis(recordId: number) {

  }

  public getDiagnosisResult(recordId: number): Observable<DiagnosisRecord> {
    return of({
      cropType: CropType.pepper,
      diagnosisResults: [
        { diseaseCode: DiseaseCode.고추점무늬병, accuracy: 0.9, bbox: { x1: 0, x2: 100, y1: 0, y2: 100 } },
        { diseaseCode: DiseaseCode.고추정상, accuracy: 0.9, bbox: { x1: 0, x2: 100, y1: 0, y2: 100 } },
      ],
      userId: 1,
      userLatitude: 37.123,
      userLongitude: 127.123,
      recordId: 1,
      regDate: new Date(),
      imagePath: 'http://localhost:8080/fe-test2.jpg'
    });
    // return this.http.get(`${this.apiUrl}/diagnosis-record/${recordId}`).pipe(
    //   catchError(err => err)
    // )
  }

  public loadCurrentUser(): Observable<User> {
    return this.http.get(`${this.apiUrl}/member/user`).pipe(
      tap(res => console.log('loadCurrentUser: ', res)),
      map(user => user as User)
    );
  }
}
