import { ReactNode } from 'react';
import './layout.css';
import Sidebar from '../../molecules/sidebar/sidebar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div id="layout">
      <Sidebar />
      <div id="layoutContent">{children}</div>
    </div>
  );
}
