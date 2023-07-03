"use client";

import React from "react";
import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback((e: React.MouseEvent) => {
        if(e.target === overlay.current && onDismiss) {
            onDismiss(); 
        }
  }, [onDismiss, overlay]);


  return (
    <div ref={overlay} className="modal overflow-x-hidden overflow-y-auto" onClick={handleClick}>
      <Button
        variant="ghost"
        onClick={onDismiss}
        className="absolute top-4 right-8 z-50"
      >
        <X />
      </Button>

      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
