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

const host = import.meta.env.BASE_URL;
export default async function callApi<T>({
  method,
  path,
  data,
  defaultValue,
  cache = false,
}: ApiCallProps<T>) {
  if (!isValidIP()) {
    logger.info(`API CALL from invalid IP: ${path}`);
    return defaultValue || undefined;
  }
  const fromCache = cache ? _getCache(path) : undefined;
  if (fromCache) {
    return fromCache;
  }

  try {
    const res = await axios({
      method,
      url: `${host}${path}`,
      data: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });
    logger.error(`API ERROR for path ${path}: ${res.status} ${res.statusText}`);
    return res.status < 400
      ? _cache(res.data, { cache, path })
      : defaultValue || undefined;
  } catch (error) {
    logger.error(`API ERROR for path ${path}: ${error || "Unknown error"}`);
  }

  return defaultValue || undefined;
}

function _getCache(path: string) {
  try {
    return JSON.parse(localStorage.getItem(`CACHE_${path}`) || "");
  } catch (error) {
    // ignore
  }
}

function _cache(
  data: unknown,
  {
    path,
    cache = false,
  }: {
    path: string;
    cache: boolean | number;
  },
) {
  if (cache) {
    localStorage.setItem(`CACHE_${path}`, JSON.stringify(data));
  }
  return data;
}
