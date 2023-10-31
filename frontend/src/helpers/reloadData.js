// Purpose: provide reloading data by calling service method
export const reloadData = async (fetchServiceFn, setData) => {
  const response = await fetchServiceFn();

  setData(response.data);
};
