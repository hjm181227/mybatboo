declare interface Inquiry {
  diagnosisId: number,
  userId: number,
  content: string,
  regDate: Date,
}

declare interface Reply {
  replyId: number,
  userId: number,
  content: string,
  inquiryId: number,
  regDate: Date,
}
