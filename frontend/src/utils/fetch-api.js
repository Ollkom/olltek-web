import qs from "qs";
import { getStrapiURL } from "./api-helpers";
import { getLocale } from "./locale";

export async function fetchAPI(path, urlParamsObject = {}, options = {}, tag) {
  const locale = await getLocale();
  try {
    // Merge default and user options
    const mergedOptions = {
      //next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      ...(tag && { next: { tags: [tag] } }),
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}&locale=${locale}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}
