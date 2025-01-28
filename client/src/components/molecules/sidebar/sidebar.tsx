import { Link } from 'react-router-dom';
import './sidebar.css';

export default function SideBar(): JSX.Element {
  return (
    <div id="sidebar">
      <ul>
        <Link to={'/atividade/listar'}>
          <li>Minhas atividades</li>
        </Link>
        <Link to={'/relatorio/listar'}>
          <li>Ver relatórios</li>
        </Link>
      </ul>
    </div>
  );
}
