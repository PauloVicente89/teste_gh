import { useCallback, useEffect, useState } from 'react';
import { IActivity } from '../../interfaces/activities.interface';
import { ActivityService } from '../../services/activities.service';
import './styles/list-activities.css';
import Loading from '../../components/atoms/loading/loading';
import Pagination from '../../components/atoms/pagination/pagination';
import { useForm } from 'react-hook-form';
import CreateActivity from './create-activity';

interface Filters {
  name?: string;
}

export default function ListActivities(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const { handleSubmit: handleSubmitFilters, register: registerFilters } = useForm();

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ActivityService.findAll({
        ...filters,
        page: currentPage,
      });
      setTotal(data.count);
      setActivities(data.data);
    } catch {
      setError('Erro ao listar atividades');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilter = (values: Filters) => {
    setFilters(values);
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <div id="activities">
      <div id="listActivities">
        <h2>Atividades</h2>

        <form onSubmit={handleSubmitFilters(handleFilter)} id="activitiesFilters">
          <p>Busque atividades por:</p>
          <input type="text" {...registerFilters('name')} name="name" placeholder="Nome" />
          <button type="submit">Buscar</button>
        </form>

        {loading ? <Loading /> : <></>}
        {activities && !loading ? (
          <table className="activitiesTable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Início</th>
                <th>Fim</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} className="tableRow">
                  <td>{activity.name}</td>
                  <td>{formatDate(activity.date)}</td>
                  <td>{activity.inicialized_at}</td>
                  <td>{activity.finalized_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{error}</p>
        )}
        <Pagination
          page={currentPage}
          total={total}
          itemsLenght={activities?.length || 0}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="divisor"></div>
      <div id="createActivity">
        <CreateActivity fetchActivities={fetchActivities} />
      </div>
    </div>
  );
}
