import AxiosClient from '../client/axios-client'

export default class BranchService extends AxiosClient {
  async createBranch(token: string, address: string) {
    try {
      const { data } = await this.branchClient.post('/', { address }, { headers: { Authorization: `Bearer ${token}` } })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getAllBranchesBySchoolId(token: string) {
    try {
      const { data } = await this.branchClient.get('/', { headers: { Authorization: `Bearer ${token}` } })
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
