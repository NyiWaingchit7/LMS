export const getChipColor = (status: any) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "CONFIRMED":
      return "success";
    case "CANCELLED":
      return "error";
  }
};
