import api from '../http/axios.config';
import { IActivity, ICreateActivity } from '../interfaces/activities.interface';

interface IParams {
  page: number;
  name?: string;
}

export class ActivityService {
  static async create(body: ICreateActivity): Promise<IActivity> {
    const { data } = await api.post('activities', body);
    return data;
  }

  static async findAll(params?: IParams) {
    const { data } = await api.get('activities', { params });
    return data;
  }
}
