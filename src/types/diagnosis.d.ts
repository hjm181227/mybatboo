declare interface DiagnosisRecord {
  cropType: CropType,
  diagnosisResults: DiagnosisItem[],
  userId: number,
  userLongitude: number,
  userLatitude: number,
  recordId: number,
  regDate: Date,
  imagePath: string
}

declare interface DiagnosisItem {
  diseaseCode: DiseaseCode,
  accuracy: number,
  bbox: BBox,
}

declare enum CropType {
  pepper = 0,
  strawberry = 1,
  lettuce = 2,
  tomato = 3,
}

declare enum DiseaseCode {
  '고추정상'= 0,
  '고추마일드모틀바이러스'= 1,
  '고추점무늬병' = 2,
  '딸기정상' = 3,
  '딸기잿빛곰팡이병' = 4,
  '딸기흰가루병' = 5,
  '상추정상' = 6,
  '상추균핵병' = 7,
  '상추노균병' = 8,
  '토마토정상' = 9,
  '토마토잎곰팡이병'  = 10,
  '토마토황화잎말이바이러스' = 11
}


declare interface BBox {
  x1: number,
  x2: number,
  y1: number,
  y2: number
}
