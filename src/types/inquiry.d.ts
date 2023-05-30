declare interface Inquiry {
  diagnosisId: number,
  userId: number,
  title: string,
  contents: string,
  regDate: Date,
  cnt: number,
  replyId: number,
  inquiryId: number,
}

declare interface Reply {
  replyId: number,
  userId: number,
  content: string,
  inquiryId: number,
  regDate: Date,
}
