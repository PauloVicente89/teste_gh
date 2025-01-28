import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/organisms/layout/layout';
import ListReports from '../pages/reports/list-reports';
import ListActivities from '../pages/activities/activities';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ListActivities />} />
          <Route path="/atividade/listar" element={<ListActivities />} />
          <Route path="/relatorio/listar" element={<ListReports />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
