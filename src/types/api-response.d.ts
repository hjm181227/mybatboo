declare interface ApiResponse<T> {
  data: T,
  message: string,
  code: string | number | null
}
