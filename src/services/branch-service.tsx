import AxiosClient from "../client/axios-client";

export class BranchService extends AxiosClient {
  async createBranch(token: string, branch: any) {
    try {
      const { data } = await this.branchClient.post("/", branch, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllBranchesBySchoolId(token: string) {
    try {
      const { data } = await this.branchClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBranch(token: string, branchId: string, address: string) {
    try {
      const { data } = await this.branchClient.put(
        `/${branchId}`,
        { address },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBranch(token: string, branch: string) {
    try {
      const { data } = await this.branchClient.delete(`/${branch}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
