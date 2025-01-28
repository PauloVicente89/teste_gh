import api from "../http/axios.config";
import { IActivity, ICreateActivity, IUpdateActivity } from "../interfaces/activities.interface";

export class ActivityService {
    static async create (body: ICreateActivity): Promise<IActivity> {
        const { data } = await api.post("activities", body)
        return data
    }

    static async findAll(params?: any) {
        const { data } = await api.get("activities", { params })
        return data
    }

    static async update(id: string, body: IUpdateActivity) {
        const { data } = await api.patch(`activities/${id}`, body)
        return data
    }

    static async delete(id: string) {
        await api.delete(`activities/${id}`)
    }
}