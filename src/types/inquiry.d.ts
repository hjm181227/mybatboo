declare interface Inquiry {
  diagnosisId: number,
  userId: number,
  title: string,
  contents: string,
  regDate: Date,
  replyId: number,
  id: number,
}

declare interface Reply {
  replyId: number,
  userId: number,
  content: string,
  inquiryId: number,
  regDate: Date,
}
