declare interface DiagnosisRecord {
  cropType: number,
  diagnosisItems: DiagnosisItem[],
  userId: number,
  userLongitude: number,
  userLatitude: number,
  recordId: number,
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
