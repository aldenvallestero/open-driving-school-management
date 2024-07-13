import AxiosClient from "../client/axios-client";

export class VehicleService extends AxiosClient {
  async createVehicle(token: string, vehicle: any) {
    try {
      console.log("vehicle", vehicle);
      const { data } = await this.vehicleClient.post("/", vehicle, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
