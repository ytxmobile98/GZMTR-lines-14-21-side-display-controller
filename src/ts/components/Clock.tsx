import React, { useState, useEffect } from "react";

const days = ["日", "一", "二", "三", "四", "五", "六"].map((input: string): string => `星期${input}`);

const padZeros = (i: number) => i.toString().padStart(2, "0");

const getDateStrs = (date: Date): [string, string, string] => {
  const dateStr = `${date.getFullYear()}-${padZeros(date.getMonth() + 1)}-${padZeros(date.getDate())}`;
  const dayStr = days[date.getDay()];
  const timeStr = `${padZeros(date.getHours())}:${padZeros(date.getMinutes())}:${padZeros(date.getSeconds())}`;

  return [dateStr, dayStr, timeStr];
}

export default function Clock() {
  const [date, setDate] = useState(new Date());

  const tick = () => {
    setDate(new Date());
  }

  useEffect(() => {
    const timer = window.setTimeout(tick, 10);
    return () => {
      window.clearTimeout(timer);
    }
  });

  const [dateStr, dayStr, timeStr] = getDateStrs(date);
  return (
    <div>
      <p>{dateStr} {dayStr}</p>
      <p>{timeStr}</p>
    </div>
  );
}