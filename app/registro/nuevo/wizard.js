"use client";

import { useState } from "react";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nombre: "", titular: "" });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <div className="flex justify-center mb-6 space-x-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              step === n
                ? "bg-blue-400 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      {step === 1 && <Stage1 form={form} setForm={setForm} next={next} />}
      {step === 2 && (
        <Stage2 form={form} setForm={setForm} next={next} prev={prev} />
      )}
      {step === 3 && (
        <Stage3 form={form} setStep={setStep} />
      )}
    </div>
  );
}
