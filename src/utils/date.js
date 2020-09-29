function timestampToDate(timestamp) {
  if (!timestamp) return null;
  return new Date(timestamp * 1000);
}

export default {
  timestampToDate,
};
