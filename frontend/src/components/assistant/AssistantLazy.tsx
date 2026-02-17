"use client";

import dynamic from "next/dynamic";

const ContextualAssistant = dynamic(
  () => import("./ContextualAssistant"),
  { ssr: false }
);

export default function AssistantLazy() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <ContextualAssistant />
      </div>
    </section>
  );
}
