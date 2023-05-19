import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from "rxjs";
import { ParamsBuilder } from "../params.builder";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://15.164.23.13:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  public getData() {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }

  // 이미지(capacitor/camera의 Photo)와 디바이스의 geolocation을 서버로 전송
  public requestDiagnosis({ image, geolocation, cropType }: DiagnosisRequestInput): Observable<ApiResponse<DiagnosisRecord>> {
    const url = `${this.apiUrl}/crop/diagnosis`;
    const formData = new FormData();
    const headers = new HttpHeaders();
    const { latitude, longitude } = geolocation;
    const requestInput = {
      userId: 10,
      userLatitude: latitude,
      userLongitude: longitude,
      regDate: new Date(),
      cropType
    };
    headers.append('Content-Type', 'multipart/form-data');

    formData.append('requestInput', JSON.stringify(requestInput));

    formData.append('image', image, 'test-image');
    // formData.append('userName', 'fe');
    // formData.append('saveName', 'fe-test2');
    return this.http.post(url, formData, { headers, withCredentials: true }).pipe(
      catchError(err => err),
      map(res => res as ApiResponse<DiagnosisRecord>)
    );
  }

  public getDiagnosisResult(recordId: number): Observable<ApiResponse<DiagnosisRecord>> {
    // return of({
    //   cropType: CropType.pepper,
    //   diagnosisResults: [
    //     { diseaseCode: DiseaseCode.고추점무늬병, accuracy: 0.9, bbox: { x1: 0, x2: 100, y1: 0, y2: 100 } },
    //     { diseaseCode: DiseaseCode.고추정상, accuracy: 0.9, bbox: { x1: 0, x2: 100, y1: 0, y2: 100 } },
    //   ],
    //   userId: 1,
    //   userLatitude: 37.123,
    //   userLongitude: 127.123,
    //   recordId: 1,
    //   regDate: new Date(),
    //   imagePath: 'http://localhost:8080/fe-test2.jpg'
    // });
    return this.http.get(`${this.apiUrl}/crop/diagnosisRecord?diagnosisRecordId=${recordId}`).pipe(
      map(res => res as ApiResponse<DiagnosisRecord>),
    );
  }

  public loadCurrentUser(): Observable<User> {
    return this.http.get(`${this.apiUrl}/member/currentUser`).pipe(
      map(res => res as ApiResponse<User>),
      map(res => res.data),
    );
  }

  public loadOccurenceInfo(): Observable<ApiResponse<OccurenceInfoList>> {
    return this.http.get(`${this.apiUrl}/crop/noticeList`).pipe(
      map(res => res as ApiResponse<OccurenceInfoList>)
    )
  }

  public loadUserCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get(`${this.apiUrl}/crop/category/list`).pipe(
      map(res => res as ApiResponse<Category[]>),
      tap(console.log)
    )
  }

  public loadCategoryDiagnosisRecords(categoryId: number): Observable<DiagnosisRecord[]> {
    return this.http.get(`${this.apiUrl}/crop/category/record`, { params: ParamsBuilder.from({ categoryId }) }).pipe(
      map(res => (res as ApiResponse<DiagnosisRecord[]>).data)
    )
  }
}
