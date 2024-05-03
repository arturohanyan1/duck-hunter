const filterValue = <T>(value: T): boolean =>
  value !== undefined && value !== null;

export const getQueryString = (
  params: Record<string, any>,
  joinArrayValues = false
): string => {
  return Object.entries(params)
    .filter(([_, value]) => filterValue(value))
    .map(([key, value]) => {
      if (!Array.isArray(value)) {
        return key + "=" + encodeURIComponent(value);
      } else if (joinArrayValues) {
        return (
          key +
          "=" +
          value
            .filter(filterValue)
            .map((item) => encodeURIComponent(item))
            .join(",")
        );
      } else {
        return value
          .filter(filterValue)
          .map((item) => `${key}[]` + "=" + encodeURIComponent(item))
          .join("&");
      }
    })
    .filter(Boolean)
    .join("&");
};
