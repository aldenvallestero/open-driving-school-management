import AxiosClient from "../client/axios-client";

export class VehicleService extends AxiosClient {
  async createVehicle(token: string, vehicle: any) {
    try {
      const { data } = await this.vehicleClient.post("/", vehicle, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getVehicleById(token: string, vehicleId: string) {
    try {
      const { data } = await this.vehicleClient.get(`/${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllVehicleesBySchoolId(token: string) {
    try {
      const { data } = await this.vehicleClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateVehicle(token: string, vehicleId: string, address: string) {
    try {
      const { data } = await this.vehicleClient.put(
        `/${vehicleId}`,
        { address },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteVehicle(token: string, vehicle: string) {
    try {
      const { data } = await this.vehicleClient.delete(`/${vehicle}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
