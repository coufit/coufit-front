// app/page.tsx
"use client";

import React, { useState } from "react";
import HomePage from "@/components/home/HomePage";
import Footer from "@/components/home/Footer";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("home");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <>
      <HomePage
        setCurrentPage={setCurrentPage}
        aiModalOpen={aiModalOpen}
        setAiModalOpen={setAiModalOpen}
      />
      <Footer />
    </>
  );
}
