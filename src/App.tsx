import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";

export const App = () => {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  const greet = async () => {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  };

  return (
    <div>
      <div>
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="button" onClick={() => greet()}>
          Greet
        </button>
      </div>

      <p>{greetMsg}</p>
    </div>
  );
};
