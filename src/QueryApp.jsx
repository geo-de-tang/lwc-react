import React, { useEffect, useState } from "react";
import { ChartComponent } from "./ChartComponent";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function QueryApp(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Example chartProps={props.chartProps} expiration={props.expiration} />
    </QueryClientProvider>
  );
}

const initialData = [];

function Example(props) {
  const [openInterest, setOpenInterest] = useState(initialData);
  const [open, setOpen] = useState(initialData);
  const [volume, setVolume] = useState(initialData);

  const strike = 700;

  useEffect(() => {
    fetch(
      `http://localhost:3000/optionData?expiration=${props.expiration}&strike=${strike}`
    )
      .then((response) => response.json())
      .then((da) => {
        const a = da.strikes; 
        const b = a.sort(
          (c, d) => new Date(c.quote_date) - new Date(d.quote_date)
        );

        const c = b.map((s) => {
          const { quote_date, ...rest } = s;
          return {
            value: rest,
            time: quote_date.substring(0, 10),
          };
        });

        const d = c.reduce(
          (prev, curr) => ({ ...prev, [curr.time]: curr.value }),
          {}
        );

        console.log(JSON.stringify(d));

        const e = Array.from(Object.entries(d)).map(([key, value]) => ({
          time: key,
          value: value.open_interest,
        }));

        const f = Array.from(Object.entries(d)).map(([key, value]) => ({
          time: key,
          value: value.trade_volume,
        }));

        const g = Array.from(Object.entries(d)).map(([key, value]) => ({
          time: key,
          value: value.open,
        }));

        setOpenInterest(e);
        setVolume(f);
        setOpen(g);
      });
  }, []);
  // const response = await fetch('https://api.npms.io/v2/search?q=react');
  //   const data = await response.json();
  //   this.setState({ totalReactPackages: data.total })

  return (
    <>
      <div>{props.expiration} and strike={strike}</div>
      <div>Open Interest</div>
      <ChartComponent {...props} data={openInterest}></ChartComponent>
      <div>Volume</div>
      <ChartComponent {...props} data={volume}></ChartComponent>
      <div>Open</div>
      <ChartComponent {...props} data={open}></ChartComponent>
    </>
  );
}
