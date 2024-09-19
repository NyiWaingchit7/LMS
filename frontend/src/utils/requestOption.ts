const accessToken = localStorage.getItem("accessToken");
export const headerOptions = {
  Authorization: `Bearer ${accessToken}`,
  "content-type": "application/json",
};
