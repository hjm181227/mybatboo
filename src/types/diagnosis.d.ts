declare interface DiagnosisRecord {
  cropType: number,
  diagnosisItems: DiagnosisItem[],
  diagnosisRecordId: number,
  userId: number,
  userLongitude: number,
  userLatitude: number,
  regDate: Date,
  imagePath: string
}

declare interface DiagnosisItem {
  diseaseCode: number,
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
  forecastList: string[];
  forecastListSize: number;
  warningList: string[];
  warningListSize: number;
  watchList: string[];
  watchListSize: number;
}
