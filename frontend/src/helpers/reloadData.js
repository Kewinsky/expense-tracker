export const reloadData = async (fetchServiceFn, setData) => {
  const response = await fetchServiceFn();

  setData(response.data);
};
