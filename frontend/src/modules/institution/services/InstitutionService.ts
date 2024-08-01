import axios from 'axios'

export default class TeacherService {
  private apiUrl = 'https://api.example.com/teachers'

  registerInstituion(teacher: any) {
    return axios.post(this.apiUrl, teacher)
  }
}
