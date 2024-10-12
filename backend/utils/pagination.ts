import { Request } from "express";

export const usePagination = (
  page: number,
  perPage: number,
  allData: any[],
  req: Request
) => {
  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
  const totalPages = Math.ceil(allData.length / perPage);
  const startIndex = (page - 1) * perPage;
  const data = allData.slice(startIndex, startIndex + perPage);

  const links = [] as any[];
  for (let i = 1; i <= totalPages; i++) {
    links.push({
      label: i,
      url: `${baseUrl}?page=${i}`,
      active: i === page,
    });
  }
  //   const links = [
  //     {
  //       label: "next",
  //       url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
  //     },
  //     ...paginationLinks,
  //     { label: "prev", url: page > 1 ? `${baseUrl}?page=${page - 1}` : null },
  //   ];

  return {
    data,
    links,
  };
};
