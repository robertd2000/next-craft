import React from 'react';
import { breakpoints } from "../constants";
import { useBreakpointContext } from "@/components/side-menu/ui/tabs/breakpoints";

export const Breakpoints = () => {
  const { setWidth, width } = useBreakpointContext();
  
  return (
    <div>
      {breakpoints.map((breakpoint) => (
        <div key={breakpoint} className={`flex justify-center items-center cursor-pointer py-2 border-b-2 ${breakpoint === width ? 'bg-gray-200' : ''}`} onClick={() => setWidth(breakpoint)}>
          {breakpoint}
        </div>
      ))}
    </div>
  );
};
