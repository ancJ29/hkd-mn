export function swap<T>(arr: T[], a: number, b: number) {
  if (arr[a] && arr[b]) {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }
}

export function toLocaleString(value: number) {
  return value
    .toLocaleString("vi-Vi", {
      style: "currency",
      currency: "VND",
    })
    .replace("₫", "");
}

export const parseJSON = (value: string) => {
  const parseData = JSON.parse(value);
  return parseData;
};
