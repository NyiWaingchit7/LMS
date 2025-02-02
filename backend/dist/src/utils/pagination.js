"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = void 0;
const usePagination = (perPage, allData, req) => {
    const page = Number(req.query.page) || 1;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const totalPages = Math.ceil(allData.length / perPage);
    const startIndex = (page - 1) * perPage;
    const data = allData.slice(startIndex, startIndex + perPage);
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationLinks.push({
            label: i,
            url: `?page=${i}&searchKey=${req.query.searchKey}`,
            active: i === page,
        });
    }
    const links = [
        {
            label: "prev",
            url: page > 1 ? `?page=${page - 1}&searchKey=${req.query.searchKey}` : null,
        },
        ...paginationLinks,
        {
            label: "next",
            url: page < totalPages
                ? `?page=${page + 1}&searchKey=${req.query.searchKey}`
                : null,
        },
    ];
    const has_more_pages = page < totalPages;
    return {
        data,
        links,
        has_more_pages,
    };
};
exports.usePagination = usePagination;
