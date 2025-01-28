import api from '../http/axios.config';

interface IParams {
  page: number;
}

export class ReportService {
  static async findAll(params?: IParams) {
    const { data } = await api.get('reports', { params });
    return data;
  }
}
