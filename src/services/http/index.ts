import { foodAdvertisement, materialAdvertisement, menuItems } from "@/fake-data";
import loadingStore from "@/services/http/store/loading";
import isValidIP from "@/services/ip-checker";
import logger from "@/services/logger";
import axios from "axios";
import { z } from "zod";

const host = import.meta.env.BASE_URL;
const FAKE = true;

interface ApiCallProps<T, S extends z.ZodTypeAny> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: T;
  defaultValue?: unknown;
  schema?: S;
}

export default async function callApi<T, S extends z.ZodTypeAny>({
  method,
  path,
  data,
  defaultValue,
  schema,
}: ApiCallProps<T, S>) {
  if (!isValidIP()) {
    logger.info(`API CALL from invalid IP: ${path}`);
    return defaultValue || undefined;
  }

  loadingStore.startLoading();
  try {
    const _data = await fetchData({ method, path, data, defaultValue });
    if (schema) {
      const result = schema?.safeParse(_data);
      return result?.success ? result.data : undefined;
    }
    return _data;
  } catch (error) {
    logger.error(`API ERROR for path ${path}: ${error || "Unknown error"}`);
  } finally {
    loadingStore.stopLoading();
  }

  return defaultValue || undefined;
}

async function fetchData<T, S extends z.ZodTypeAny>({
  method,
  path,
  data,
  defaultValue,
}: ApiCallProps<T, S>) {
  if (FAKE) {
    return await getFakeData(path);
  }
  const res = await axios({
    method,
    url: `${host}${path}`,
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.status < 400 ? res.data : defaultValue || undefined;
}

const getFakeData = async (path: string) => {
  await _delay(500);
  switch (path) {
  case "/api/get_Jin_din_rou_menu": {
    return menuItems();
  }
  case "/api/food-advertisement": {
    return foodAdvertisement;
  }
  case "/api/material-advertisement": {
    return materialAdvertisement;
  }
  }
};

function _delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
