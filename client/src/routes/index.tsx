import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/organisms/layout/layout";
import ListActivities from "../pages/activities/list-activities";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ListActivities />} />
          <Route path="/atividade/listar" element={<ListActivities />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}