export interface User {
  id: string
  name: string
  email: string
  function: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  schoolId: string
  imtId?: string
  createdAt: Date
  school?: {
    id: string
    name: string
  }
}
