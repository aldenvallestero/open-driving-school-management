import AxiosClient from '../client/axios-client'

export default class SchoolService extends AxiosClient {
  async register(school: any) {
    try {
      const { data } = await this.schoolClient.post('/register', { ...school })
      return data
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async login(email: string, password: string) {
    try {
      const { data } = await this.schoolClient.post('/login', { ...{ email, password } })
      return data
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async logout() {
    localStorage.removeItem('token')
  }

  async getSchool(token: string) {
    try {
      const { data } = await this.schoolClient.get('/', { headers: { Authorization: `Bearer ${token}` } })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getSchoolById(schoolId: string) {
    try {
      const { data } = await this.schoolClient.get(`/${schoolId}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
