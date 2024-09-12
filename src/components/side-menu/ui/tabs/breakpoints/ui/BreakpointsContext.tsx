'use client'

import React, {createContext, ReactNode, useContext, useState} from 'react';
import {breakpointsMap} from "@/components/side-menu/ui/tabs/breakpoints";

interface IBreakpointContext {
  setWidth: (width: string) => void;
  breakpoint: string;
  width: string;
}

const BreakpointContext = createContext<IBreakpointContext | null>(null);

interface IProps {
  children: ReactNode
}

export const BreakpointsProvider = ({ children }: IProps) => {
  const [width, setWidth] = useState('100%');
  
  return (
    <BreakpointContext.Provider value={{ setWidth, breakpoint: breakpointsMap[width], width }}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpointContext = () => {
  return useContext(BreakpointContext);
};
