import { config } from "./config";
import { headerOptions } from "./requestOption";

interface Props {
  method?: string;
  url: string;
  body?: null | any;
}
export const fetchFunction = async ({
  method = "GET",
  url,
  body = null,
}: Props) => {
  try {
    const response = await fetch(`${config.apiUrl}/${url}`, {
      method,
      headers: headerOptions(),
      body,
    });
    const data = await response.json();
    return { data, response };
  } catch (error) {
    throw error;
  }
};
