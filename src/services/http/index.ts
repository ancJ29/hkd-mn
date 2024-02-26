import isValidIP from "@/services/ip-checker";
import logger from "@/services/logger";
import axios from "axios";
type ApiCallProps<T> = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: T;
  cache?: boolean | number;
  defaultValue?: unknown;
};

const FAKE = true;
const host = import.meta.env.BASE_URL;
export default async function callApi<T>({
  method,
  path,
  data,
  defaultValue,
}: ApiCallProps<T>) {
  if (!isValidIP()) {
    logger.info(`API CALL from invalid IP: ${path}`);
    return defaultValue || undefined;
  }

  try {
    if (FAKE) {
      if (path === 'a')  {
        return xxx
      }
     }
    const res = await axios({
      method,
      url: `${host}${path}`,
      data: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });
    logger.error(`API ERROR for path ${path}: ${res.status} ${res.statusText}`);
    return res.status < 400 ? res.data : defaultValue || undefined;
  } catch (error) {
    logger.error(`API ERROR for path ${path}: ${error || "Unknown error"}`);
  }

  return defaultValue || undefined;
}
