"use client";

import { useState } from "react";
import { PhoneForm } from "./PhoneForm";
import { CodeForm } from "./CodeForm";

export function Client() {
  const [step, setStep] = useState<"phone" | "code">("phone");

  return (
    <div className="flex justify-center mt-20">
      {step === "phone" && (
        <PhoneForm
          onSuccess={() => {
            setStep("code");
          }}
        />
      )}

      {step === "code" && <CodeForm />}
    </div>
  );
}
