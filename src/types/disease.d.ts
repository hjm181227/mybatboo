declare interface DiseaseInfo {
  developmentCondition: string,
  symptoms: string,
  preventionMethod: string,
  infectionRoute: string,
  imageList: {
    imageTitle: string,
    imagePath: string
  }[]
}

declare interface DiseaseSearchList {
  totalCnt: number,
  sickList: {
    sickKey: string,
    sickNameKor: string,
    sickNameEng: string,
    cropName: string,
    thumbImg: string
  }[]
}
