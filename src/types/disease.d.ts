declare interface DiseaseDetail {
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
  sickList: DiseaseSearchItem[]
}

declare interface DiseaseSearchItem {
  sickKey: string,
  sickNameKor: string,
  sickNameEng: string,
  cropName: string,
  thumbImg: string
}

declare interface Pesticide {

}
