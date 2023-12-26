export interface Information {
  id: string
  name: string
  description: string
  date: string
  schoolId: string
  school: {
    id: string
    name: string
  }
}
