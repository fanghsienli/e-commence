export function convertValidStringQueries(obj: { [key: string]: any }): string {
  const queryParams: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // 檢查值是否應該包含在 query string 中
      if (
        (Array.isArray(value) && value.length > 0) || // 非空陣列
        (typeof value !== "undefined" &&
          value !== null &&
          value !== "" &&
          value !== 0) // 不為 undefined, null, 空字串或 0
      ) {
        // 將值轉換為字串，並處理陣列
        const formattedValue = Array.isArray(value)
          ? value.join(",")
          : value.toString();
        queryParams.push(`${key}=${formattedValue}`);
      }
    }
  }

  // 將 query string 組合起來
  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
}

export function getSearchParamByKeyToNumber({
  searchParams,
  searchParamKey,
  digits = 0,
}: {
  searchParams: URLSearchParams;
  searchParamKey: string;
  digits?: number;
}) {
  for (const [key, value] of searchParams.entries()) {
    if (key === searchParamKey) {
      return Number(parseFloat(value).toFixed(digits));
    }
  }
  return undefined;
}

export function getSearchParamByKeyToStringArray({
  searchParams,
  searchParamKey,
}: {
  searchParams: URLSearchParams;
  searchParamKey: string;
}) {
  for (const [key, value] of searchParams.entries()) {
    if (key === searchParamKey) {
      return value.split(",").filter((x) => x !== "");
    }
  }

  return [];
}

export function getUrlSearchParams() {
  return new URLSearchParams(window.location.search.slice(1));
}
