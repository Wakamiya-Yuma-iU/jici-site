export const fetchData = async (): Promise<Equipment[]> => {
  const response = await fetch('YOUR_GAS_URL');
  const data: Equipment[] = await response.json();
  return data;
};
