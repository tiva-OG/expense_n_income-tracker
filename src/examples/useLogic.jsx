import { useMemo } from 'react';

const range = (start, stop) => {
  const length = stop - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export const ELLIPSIS = '...';

export function useLogic({
  currentPage,
  pageSize,
  siblingCount = 1,
  totalCount,
}) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // number of pages on screen is given (siblingCount + firstPage + lastPage + currentPage + 2*ELLIPSIS)
    const totalPageNumbers = siblingCount + 5;

    const firstPage = 1;
    const lastPage = totalPageCount;

    /*
      CASE 1: number of pages is less than the totalPageNumbers,
      return the range [1, totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(firstPage, lastPage);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPageCount);

    /* only show the ellipsis when there are at least three positions 
    remaining before/after the left/right page */
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPageCount - 2;

    // CASE 2: no left ellipsis to be shown but right ellipsis
    if (!showLeftEllipsis && showRightEllipsis) {
      const leftCount = 3 + 2 * siblingCount;
      const leftRange = range(firstPage, leftCount);

      return [...leftRange, ELLIPSIS, lastPage];
    }

    // CASE 3: no right ellipsis to be shown but left ellipsis
    if (showLeftEllipsis && !showRightEllipsis) {
      const rightCount = 3 + 2 * siblingCount;
      const rightRange = range(lastPage - rightCount + 1, lastPage);

      return [firstPage, ELLIPSIS, ...rightRange];
    }

    // CASE 4: show both left and right ellipsis
    if (showLeftEllipsis && showRightEllipsis) {
      const midRange = range(leftSibling, rightSibling);

      return [firstPage, ELLIPSIS, midRange, ELLIPSIS, lastPage];
    }
  }, [currentPage, pageSize, siblingCount, totalCount]);

  return paginationRange;
}
