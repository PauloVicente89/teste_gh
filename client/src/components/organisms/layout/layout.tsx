import { ReactNode } from 'react';
import './layout.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({children}: LayoutProps): JSX.Element {
  return (
    <div id="layout">{children}</div>
  )
}
