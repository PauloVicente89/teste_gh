import { useCallback, useEffect, useState } from 'react';
import Loading from '../../components/atoms/loading/loading';
import Pagination from '../../components/atoms/pagination/pagination';
import { IReport } from '../../interfaces/reports.interface';
import { ReportService } from '../../services/reports.service';
import './styles/list-reports.css';

export default function ListReports(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [reports, setReports] = useState<IReport[]>([]);

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ReportService.findAll({
        page: currentPage,
      });
      setTotal(data.count);
      setReports(data.data);
    } catch {
      setError('Erro ao buscar relatório');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <>
      <div id="listReports">
        <h2>Relatório</h2>

        {loading ? <Loading /> : <></>}
        {reports && !loading ? (
          <table className="reportsTable">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Tempo</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index} className="tableRow">
                  <td>{formatDate(report.date)}</td>
                  <td>{report.hours}:00</td>
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
          itemsLenght={reports?.length || 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
