export const DiseaseCode: { [name: string]: number } = {
  '고추 정상': 0,
  '고추마일드모틀바이러스': 1,
  '고추점무늬병': 2,
  '딸기 정상': 3,
  '딸기잿빛곰팡이병': 4,
  '딸기흰가루병': 5,
  '상추 정상': 6,
  '상추균핵병': 7,
  '상추노균병': 8,
  '토마토 정상': 9,
  '토마토잎곰팡이병': 10,
  '토마토황화잎말이바이러스': 11
}

export const DiseaseNames = Object.keys(DiseaseCode);

export const CropCode: { [name: string]: number } = {
  '고추': 0,
  '딸기': 1,
  '상추': 2,
  '토마토': 3,
}

export const CropNames = Object.keys(CropCode);
