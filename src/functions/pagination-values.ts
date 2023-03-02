export const getPaginationValues = (query: any) => {
    return {
        searchName: query.searchName ?? '',
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        pageNumber: isNaN(+query.pageNumber) ? 1 : +query.pageNumber,
        pageSize: isNaN(+query.pageSize) ? 10 : +query.pageSize,
    }
} // need more explanation

