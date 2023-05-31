import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { ParamsBuilder } from "../params.builder";
import { StorageService } from "@mapiacompany/armory";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://15.164.23.13:8080';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
  }

  public getData() {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }

  ////////////////////////////////
  // 작물 진단 관련 api

  // 이미지(capacitor/camera의 Photo)와 디바이스의 geolocation을 서버로 전송
  public requestDiagnosis({
                            image,
                            geolocation,
                            cropType
                          }: DiagnosisRequestInput): Observable<ApiResponse<DiagnosisRecord>> {
    const url = `${this.apiUrl}/crop/diagnosis`;
    const formData = new FormData();
    const headers = new HttpHeaders();
    const { latitude, longitude } = geolocation;
    const requestInput = {
      userLatitude: latitude,
      userLongitude: longitude,
      cropType
    };
    headers.append('Content-Type', 'multipart/form-data');

    formData.append('requestInput', JSON.stringify(requestInput));

    formData.append('image', image, image.name);

    const token = this.storage.get('token');
    // return from(Http.post({
    //   url,
    //   headers: {
    //     'content-type': `multipart/form-data`,
    //     'Content-Type': `multipart/form-data`,
    //     'Authorization': `Bearer ${token}`
    //   },
    //   data: {
    //     requestInput: JSON.stringify(requestInput),
    //     image: formData.get('image')
    //   }
    // }).then(res => res.data));
    return this.http.post(url, formData, { headers }).pipe(
      map(res => res as ApiResponse<DiagnosisRecord>)
    );
  }

  public getDiagnosisResult(recordId: number): Observable<DiagnosisRecord> {
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
    return this.http.get<ApiResponse<DiagnosisRecord>>(`${this.apiUrl}/crop/diagnosisRecord?diagnosisRecordId=${recordId}`).pipe(
      map(res => res.data),
    );
  }

  public getDiagnosisMemoList(recordId: number): Observable<DiagnosisRecordMemo[]> {
    return this.http.get<ApiResponse<DiagnosisRecordMemo[]>>(`${this.apiUrl}/crop/manage/read/list`, {
      params: ParamsBuilder.from({ diagnosisRecordId: recordId })
    }).pipe(
      map(res => res.data),
    );
  }

  public getDiagnosisMemoDetail(recordId: number): Observable<DiagnosisRecordMemo> {
    return this.http.get<ApiResponse<DiagnosisRecordMemo>>(`${this.apiUrl}/crop/manage/read/detail`, {
      params: ParamsBuilder.from({ myCropId: recordId })
    }).pipe(
      map(res => res.data),
    );
  }

  public addDiagnosisRecordMemo(recordId: number, contents: string): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/crop/manage/create`, {}, {
      params: ParamsBuilder.from({
        diagnosisId: recordId,
        contents
      })
    }).pipe(
      map(res => res.data),
    )
  }

  public updateDiagnosisRecordMemo(memoId: number, contents: string): Observable<any> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/crop/manage/update`, {}, {
      params: ParamsBuilder.from({
        myCropId: memoId,
        contents
      })
    }).pipe(
      map(res => res.data),
    )
  }

  public deleteDiagnosisRecordMemo(memoId: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/crop/manage/delete`, {
      params: { myCropId: memoId }
    }).pipe(
      map(res => res.data),
    )
  }

  ////
  ////////////////////////////////


  ////////////////////////////////
  ////  유저 정보 관련 api

  public loadCurrentUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/member/currentUser`).pipe(
      map(res => res.data),
    );
  }

  public deleteAccount(): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/member/delete`).pipe(
      map(res => res.data),
    )
  }

  public loadUserCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/crop/category/list`).pipe(
      map(res => res.data)
    )
  }

  ////
  ////////////////////////////////

  ////////////////////////////////
  //// 병해 검색 api

  public searchDisease(input: { cropName: string, keyword: string, page: number, listNum: number }): Observable<DiseaseSearchList> {
    return this.http.get<ApiResponse<DiseaseSearchList>>(`${this.apiUrl}/crop/sickList`, {
      params: ParamsBuilder.from({
        cropName: input.cropName,
        sickNameKor: input.keyword,
        displayCount: input.listNum,
        startPoint: input.page - 1
      })
    }).pipe(
      map(res => res.data),
    )
  }

  public loadSickDetail(sickKey: string): Observable<DiseaseDetail> {
    return this.http.get<ApiResponse<DiseaseDetail>>(`${this.apiUrl}/crop/sickDetail`, { params: ParamsBuilder.from({ sickKey }) }).pipe(
      map(res => res.data)
    )
  }

  ////
  ////////////////////////////////

  // 병해 발생 정보 api
  public loadOccurenceInfo(): Observable<OccurenceInfoList> {
    return this.http.get<ApiResponse<OccurenceInfoList>>(`${this.apiUrl}/crop/noticeList`).pipe(
      map((res: ApiResponse<OccurenceInfoList>) => res.data)
    )
  }


  // ////////////////////////
  // 내 작물관리 (카테고리) 관련 api

  public loadCategoryDiagnosisRecords(categoryId: number): Observable<{ diagnosisRecord: DiagnosisRecord, diagnosisResultList: DiagnosisItem[] }[]> {
    return this.http.get(`${this.apiUrl}/crop/category/record`, { params: ParamsBuilder.from({ categoryId }) }).pipe(
      map(res => (res as ApiResponse<{ diagnosisRecord: DiagnosisRecord, diagnosisResultList: DiagnosisItem[] }[]>).data)
    )
  }

  public createCategory(categoryName: string): Observable<Category> {
    return this.http.post(`${this.apiUrl}/crop/category/create`, {}, {
      params: ParamsBuilder.from({ name: categoryName })
    }).pipe(
      map(res => (res as ApiResponse<Category>).data)
    )
  }

  public deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/crop/category/delete`, {
      params: ParamsBuilder.from({ categoryId })
    })
  }

  public updateCategory(categoryId: number, editInfo: { name: string, memo: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/crop/category/update`, {}, {
      params: ParamsBuilder.from({ id: categoryId, changeName: editInfo.name, changeMemo: editInfo.memo })
    })
  }

  public loadCategoryByName(name: string) {
    return this.http.get(`${this.apiUrl}/crop/category/name`, { params: ParamsBuilder.from({ name }) }).pipe(
      map(res => (res as ApiResponse<Category>).data),
    )
  }

  public changeDiagnosisRecordCategory(recordId: number, categoryId: number) {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/crop/diagnosisRecord/${recordId}/category/update`, {}, {
      params: ParamsBuilder.from({ categoryId })
    }).pipe(
      map(res => res.data)
    )
  }


  ////
  //////////////////////////


  //////////////////////////
  //// 농약 정보 api

  public loadPesticideList(input: { page: number, displayCount: number, cropName: string, diseaseName: string }): Observable<{ totalCount: number, list: Pesticide[], displayCount: number, startPoint: number }> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/crop/psisList`, {
      startPoint: `${input.page - 1}`.toString(),
      displayCount: `${input.displayCount}`.toString(),
      cropName: input.cropName,
      diseaseWeedName: input.diseaseName
    }).pipe(
      map(res => res.data),
      map(({ response }) => ({
        totalCount: response.totalCount,
        list: response.list.item,
        displayCount: response.displayCount,
        startPoint: response.startPoint
      }))
    )
  }


  //////////////////////////
  //// 전문가 문의 api

  public loadInquiryHistory() {
    return this.http.get<ApiResponse<Inquiry[]>>(`${this.apiUrl}/crop/inquiry/list`).pipe(
      map(res => res.data)
    )
  }

  public loadInquiryDetail(inquiryId: number) {
    return this.http.get<ApiResponse<Inquiry>>(`${this.apiUrl}/crop/inquiry/${inquiryId}`).pipe(
      map(res => res.data)
    )
  }

  public sendInquiry(input: { diagnosisId: number, title: string, contents: string }) {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/crop/inquiry/register`, {
      diagnosisRecordId: input.diagnosisId,
      title: input.title,
      contents: input.contents
    }, {}).pipe(
      map(res => res.data)
    )
  }

  public deleteInquiry(inquiryId: number) {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/crop/inquiry/delete`, {
      params: ParamsBuilder.from({ inquiryId })
    }).pipe(
      map(res => res.data)
    )
  }

  public loadInquiryReply(replyId: number): Observable<Reply> {
    return this.http.get<ApiResponse<Reply>>(`${this.apiUrl}/crop/reply/${replyId}`).pipe(
      map(res => res.data)
    )
  }

  public loadUserDiagnosisRecords(): Observable<DiagnosisRecord[]> {
    return this.http.get<ApiResponse<DiagnosisRecord[]>>(`${this.apiUrl}/crop/list/diagnosisRecord`).pipe(
      map(res => res.data)
    )
  }

  // 전문가 계정만 가능
  public replyToInquiry(inquiryId: number, contents: string) {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/crop/reply/register`, {
      inquiryId,
      contents
    })
  }
}
