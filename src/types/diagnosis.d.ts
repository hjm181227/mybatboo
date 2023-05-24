declare interface DiagnosisRecord {
  cropType: number,
  id: number,
  diagnosisResults: DiagnosisItem[],
  diagnosisRecordId: number,
  userId: number,
  userLongitude: number,
  userLatitude: number,
  regDate: Date,
  imagePath: string
}

declare interface DiagnosisItem {
  diseaseCode: number,
  sickKey: string,
  accuracy: number,
  boxX1: number,
  boxX2: number,
  boxY1: number,
  boxY2: number
}

declare interface DiagnosisRequestInput {
  image: File,
  geolocation: { latitude: number, longitude: number },
  cropType: number
}

declare interface OccurenceInfoList {
  forecastList: OccurenceInfo[];
  forecastListSize: number;
  warningList: OccurenceInfo[];
  warningListSize: number;
  watchList: OccurenceInfo[];
  watchListSize: number;
}

declare interface OccurenceInfo {
  cropName: string,
  sickNameKor: string,
  sickKey: string
}
