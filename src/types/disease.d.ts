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
  cropName: string,
  diseaseWeedName: string,
  diseaseUseSeq: number,
  dilutUnit: string, // 희석배수
  pestiUse: string // 사용적기
  pestiCode: number,
  pestiBrandName: string, //상표명
  pestiKorName: string, //농약명
  compName: string, //법인명
  useSuittime: string,  //안전사용기준 (수확 ~일 전)
  useNum: string, //안전사용기준 (~회 이내)
  useName: string,  //용도
  wafindex: string, //WAF지수
}
