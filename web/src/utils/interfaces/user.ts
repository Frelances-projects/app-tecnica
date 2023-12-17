export interface User {
  id: string,
  name: string,
  email: string,
  function: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR',
  schoolId: string,
  createdAt: Date
  school?: {
    id: string
    name: string
  }
}