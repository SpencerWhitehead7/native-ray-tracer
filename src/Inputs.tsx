import { Component, Setter } from "solid-js";

import { Scene } from "./sceneTypes";

type NumberInputProps = {
  labelName: string;
  fieldName: keyof Scene;
  scene: Scene;
  setScene: Setter<Scene>;
} & Partial<HTMLInputElement>;

export const NumberInput: Component<NumberInputProps> = (p) => (
  <label>
    {p.labelName}:
    <input
      type="number"
      min={p.min}
      max={p.max}
      value={p.scene[p.fieldName] as number}
      onChange={(e) => {
        const min = Number(p.min);
        const max = Number(p.max);
        let v = Number(e.currentTarget.value);
        v = Math.floor(v);
        if (v < min) v = min;
        if (v > max) v = max;

        p.setScene((s) => ({ ...s, [p.fieldName]: v }));
      }}
    />
  </label>
);
