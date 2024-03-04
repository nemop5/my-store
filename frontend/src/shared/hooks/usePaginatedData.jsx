import { useState } from "react";

export const usePaginatedData = (initialPage = 1, initialLimit = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const resetPage = () => setCurrentPage(1);

  const nextPage = () => setCurrentPage((currentPage) => currentPage + 1);

  return { currentPage, resetPage, limit, setLimit, nextPage };
};
