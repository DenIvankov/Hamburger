import type { AxiosError, Method } from "axios";
import { axiosInstance } from "../axios";

const normalizeHeaders = (headers?: HeadersInit) => {
  if (!headers) return undefined;
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return headers;
};

export const customInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await axiosInstance.request<T>({
    url,
    method: (options?.method as Method | undefined) ?? "GET",
    headers: normalizeHeaders(options?.headers),
    data: options?.body,
    signal: options?.signal ?? undefined,
  });

  // Возвращаем данные в формате, совместимом с Orval react-query client
  return {
    data: response.data,
    status: response.status,
    headers: response.headers,
  } as T;
};

export type ErrorType<Error> = AxiosError<Error>;
