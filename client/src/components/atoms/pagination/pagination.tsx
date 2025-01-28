import './pagination.css';

interface IProps {
  total: number;
  page: number;
  itemsLenght: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ total, page, itemsLenght, onPageChange }: IProps): JSX.Element {
  const maxPages = Math.ceil(total / 10);
  if (total === 0) return <></>;

  return (
    <div id="pagination">
      <span>
        {Array.from({ length: maxPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={page === pageNum}
            className={page === pageNum ? 'active' : ''}
          >
            {pageNum}
          </button>
        ))}
        Mostrando {itemsLenght} de {total} itens.
      </span>
    </div>
  );
}
