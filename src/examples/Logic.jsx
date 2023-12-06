import { List, ListItem } from '@material-ui/core';
import { useLogic } from './useLogic';

export default function Logic(props) {
  const {
    className,
    currentPage,
    onPageChange,
    pageSize,
    siblingCount = 1,
    totalCount,
  } = props;

  const paginationRange = useLogic({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
}
