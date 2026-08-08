"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi, Time, CandlestickSeries } from "lightweight-charts";

interface OHLC {
  time: number;
  open: string;
  high: string;
  low: string;
  close: string;
}

export function LightweightFallback() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#000000" },
        textColor: "#a1a1aa",
      },
      grid: {
        vertLines: { color: "#27272a" },
        horzLines: { color: "#27272a" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#a3e635", // lime-400
      downColor: "#f87171", // red-400
      borderVisible: false,
      wickUpColor: "#a3e635",
      wickDownColor: "#f87171",
    });
    seriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    // Fetch data from backend API
    fetch("http://localhost:8000/v1/market-data/history")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const formattedData = data.history.map((d: OHLC) => ({
          time: d.time as Time,
          open: Number.parseFloat(d.open),
          high: Number.parseFloat(d.high),
          low: Number.parseFloat(d.low),
          close: Number.parseFloat(d.close),
        }));
        candlestickSeries.setData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] border border-zinc-800 bg-black rounded overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-500 z-10">
          Loading Market Data...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 z-10">
          Failed to load market data
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
