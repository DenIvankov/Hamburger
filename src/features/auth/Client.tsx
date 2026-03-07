"use client";

import { useState } from "react";
import { PhoneForm } from "./PhoneForm";
import { CodeForm } from "./CodeForm";

export function Client() {
  const [step, setStep] = useState<"phone" | "code">("phone");

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
