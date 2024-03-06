const fetchdata = async (num: number) => {
  const res = await fetch(`https://tracking.bosta.co/shipments/track/${num}`);
  const result = await res.json()
  return result
};
export {fetchdata}

const dateConverterToTime = (time: string) => {
  const date = new Date(time);
  let hours = date.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  const mins = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  return `at ${hours}:${mins} ${ampm}`
};
export  {dateConverterToTime}