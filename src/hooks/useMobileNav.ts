"use client";

import { useState } from "react";

export const useMobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((value) => !value);

  return { isOpen, close, toggle };
};
