export const getTemplateSubject = (data?: any) => {
  switch (data) {
    case "PENDING":
      return "Payment Pending for Your LMS Course";
    case "CONFIRMED":
      return "Purchase Confirmation";
    case "CANCELLED":
      return "Payment Failure for Your LMS Course Purchase";
  }
};
