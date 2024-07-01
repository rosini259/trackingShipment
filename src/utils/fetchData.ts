"use server"
const fetchData = async (num: number) => {
  const res = await fetch(`https://tracking.bosta.co/shipments/track/${num}`);
  const result = await res.json();
  return result;
};
export { fetchData };
