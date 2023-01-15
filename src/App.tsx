import { For, Show, createSignal, createEffect } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";

import {
  DirectionalC,
  newDirectionalC,
  newPlaneC,
  newSphereC,
  newSphericalC,
  PlaneC,
  Scene,
  SphereC,
  SphericalC,
} from "./sceneTypes";

import { NumberInput } from "./Inputs";
import { SElementEditor, SLightEditor } from "./Editors";

import "./app.css";

const MIN_WIDTH = 320;
const MAX_WIDTH = 32_000;

const MIN_HEIGHT = 240;
const MAX_HEIGHT = 24_000;

const MIN_D_OFFSET = 0;
const MAX_D_OFFSET = Infinity;

const MIN_FOV = 1;
const MAX_FOV = 180;

const MIN_RECURSION_DEPTH = 1;
const MAX_RECURSION_DEPTH = 20;

export const App = () => {
  let ctx: CanvasRenderingContext2D;

  const [scene, setScene] = createSignal<Scene>(testJson);
  const [isGenerating, setIsGenerating] = createSignal(false);
  const toggleIsGenerating = () => setIsGenerating((isG) => !isG);

  createEffect(() => console.log(scene()));

  const generateImage = async () => {
    toggleIsGenerating();

    const start = performance.now();
    const imageDataValues = (await invoke("generate", {
      sceneJson: JSON.stringify(scene()),
    })) as number[];
    console.log("time::", performance.now() - start);
    const imageData = new Uint8ClampedArray(imageDataValues);

    toggleIsGenerating();

    ctx.canvas.width = scene().width;
    ctx.canvas.height = scene().height;
    ctx.putImageData(
      new ImageData(imageData, scene().width, scene().height),
      0,
      0
    );
  };

  return (
    <div class="container">
      <form class="controls">
        <h1>Ray Tracer</h1>

        <h2>Basic Settings</h2>

        <NumberInput
          labelName="Width"
          fieldName="width"
          scene={scene()}
          setScene={setScene}
          min={String(MIN_WIDTH)}
          max={String(MAX_WIDTH)}
        />
        <NumberInput
          labelName="Height"
          fieldName="height"
          scene={scene()}
          setScene={setScene}
          min={String(MIN_HEIGHT)}
          max={String(MAX_HEIGHT)}
        />
        <NumberInput
          labelName="X Offset"
          fieldName="x_offset"
          scene={scene()}
          setScene={setScene}
          min={String(MIN_D_OFFSET)}
          max={String(MAX_D_OFFSET)}
        />
        <NumberInput
          labelName="Y Offset"
          fieldName="y_offset"
          scene={scene()}
          setScene={setScene}
          min={String(MIN_D_OFFSET)}
          max={String(MAX_D_OFFSET)}
        />
        <NumberInput
          labelName="Field of View"
          fieldName="fov"
          scene={scene()}
          setScene={setScene}
          min={String(MIN_FOV)}
          max={String(MAX_FOV)}
        />
        <NumberInput
          labelName="Max Recursion Depth"
          fieldName="max_recursion_depth"
          scene={scene()}
          setScene={setScene}
          min={String(MIN_RECURSION_DEPTH)}
          max={String(MAX_RECURSION_DEPTH)}
        />

        <h2>Elements</h2>

        <h3>Spheres</h3>

        <For each={scene().elements} fallback="No spheres created">
          {(ele, i) =>
            (ele as SphereC).Sphere !== undefined ? (
              <SElementEditor sElement={ele} i={i()} setScene={setScene} />
            ) : null
          }
        </For>
        <button
          type="button"
          onClick={() => {
            setScene((s) => ({
              ...s,
              elements: [...s.elements, newSphereC()],
            }));
          }}
        >
          Add Sphere
        </button>

        <h3>Planes</h3>

        <For each={scene().elements} fallback="No planes created">
          {(ele, i) =>
            (ele as PlaneC).Plane !== undefined ? (
              <SElementEditor sElement={ele} i={i()} setScene={setScene} />
            ) : null
          }
        </For>
        <button
          type="button"
          onClick={() => {
            setScene((s) => ({
              ...s,
              elements: [...s.elements, newPlaneC()],
            }));
          }}
        >
          Add Plane
        </button>

        <h2>Lighting</h2>

        <h3>Directional</h3>

        <For each={scene().lights} fallback="No lights created">
          {(ele, i) =>
            (ele as DirectionalC).Directional !== undefined ? (
              <SLightEditor sLight={ele} i={i()} setScene={setScene} />
            ) : null
          }
        </For>
        <button
          type="button"
          onClick={() => {
            setScene((s) => ({
              ...s,
              lights: [...s.lights, newDirectionalC()],
            }));
          }}
        >
          Add Directional
        </button>

        <h3>Spherical</h3>

        <For each={scene().lights} fallback="No lights created">
          {(ele, i) =>
            (ele as SphericalC).Spherical !== undefined ? (
              <SLightEditor sLight={ele} i={i()} setScene={setScene} />
            ) : null
          }
        </For>
        <button
          type="button"
          onClick={() => {
            setScene((s) => ({
              ...s,
              lights: [...s.lights, newSphericalC()],
            }));
          }}
        >
          Add Spherical
        </button>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            generateImage();
          }}
        >
          Generate
        </button>
      </form>

      <div class="image">
        <Show when={!isGenerating()} fallback={<div class="loading" />}>
          <canvas
            ref={(ele) => {
              ctx = ele.getContext("2d")!;
            }}
          />
        </Show>
      </div>
    </div>
  );
};

const testJson: Scene = {
  width: 320,
  height: 240,
  x_offset: 0,
  y_offset: 0,
  fov: 90.0,
  elements: [
    {
      Sphere: {
        center: {
          x: 0.0,
          y: 0.0,
          z: -5.0,
        },
        radius: 1.0,
        material: {
          coloration: {
            Color: {
              red: 0.2,
              green: 1.0,
              blue: 0.2,
            },
          },
          albedo: 0.18,
          surface: {
            Reflective: {
              reflectivity: 0.7,
            },
          },
        },
      },
    },
    {
      Sphere: {
        center: {
          x: -3.0,
          y: 1.0,
          z: -6.0,
        },
        radius: 2.0,
        material: {
          coloration: {
            Texture: {
              path: "assets/checkerboard.png",
            },
          },
          albedo: 0.58,
          surface: "Diffuse",
        },
      },
    },
    {
      Sphere: {
        center: {
          x: 2.0,
          y: 1.0,
          z: -4.0,
        },
        radius: 1.5,
        material: {
          coloration: {
            Color: {
              red: 1.0,
              green: 1.0,
              blue: 1.0,
            },
          },
          albedo: 0.18,
          surface: {
            Refractive: {
              index: 1.5,
              transparency: 1.0,
            },
          },
        },
      },
    },
    {
      Plane: {
        origin: {
          x: 0.0,
          y: -2.0,
          z: -5.0,
        },
        normal: {
          x: 0.0,
          y: -1.0,
          z: 0.0,
        },
        material: {
          coloration: {
            Texture: {
              path: "assets/checkerboard.png",
            },
          },
          albedo: 0.18,
          surface: {
            Reflective: {
              reflectivity: 0.5,
            },
          },
        },
      },
    },
    {
      Plane: {
        origin: {
          x: 0.0,
          y: 0.0,
          z: -20.0,
        },
        normal: {
          x: 0.0,
          y: 0.0,
          z: -1.0,
        },
        material: {
          coloration: {
            Color: {
              red: 0.2,
              green: 0.3,
              blue: 1.0,
            },
          },
          albedo: 0.38,
          surface: "Diffuse",
        },
      },
    },
  ],
  lights: [
    {
      Spherical: {
        position: {
          x: -2.0,
          y: 10.0,
          z: -3.0,
        },
        color: {
          red: 0.3,
          green: 0.8,
          blue: 0.3,
        },
        intensity: 10000.0,
      },
    },
    {
      Spherical: {
        position: {
          x: 0.25,
          y: 0.0,
          z: -2.0,
        },
        color: {
          red: 0.8,
          green: 0.3,
          blue: 0.3,
        },
        intensity: 250.0,
      },
    },
    {
      Directional: {
        direction: {
          x: 0.0,
          y: 0.0,
          z: -1.0,
        },
        color: {
          red: 1.0,
          green: 1.0,
          blue: 1.0,
        },
        intensity: 0.0,
      },
    },
  ],
  shadow_bias: 1e-13,
  max_recursion_depth: 10,
};
