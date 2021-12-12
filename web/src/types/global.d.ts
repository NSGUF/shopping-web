
declare interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

declare interface ListResponse<T> {
  items: T[]
  total: 0
}