"use client";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [country, setCountry] = useState([]);
  // return data;

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("https://restcountries.com/v3.1/all");
      const data = await resp.json();
      setCountry(data);
    };
    getData();
  }, []);
  console.log(country);
  // The scrollable element for your list
  const parentRef = useRef();

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: country.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `100vh`,
          overflow: "auto", // Make it scroll!
        }}
      >
        <div>
          <p>this is experimental</p>
          <input type="text" placeholder="type in this field" />
        </div>

        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {country[virtualItem.index].name.common}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
