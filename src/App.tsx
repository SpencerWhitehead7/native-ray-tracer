import { invoke } from "@tauri-apps/api/tauri";

const w = 320;
const h = 240;

export const App = () => {
  let ctx: CanvasRenderingContext2D;

  const generateImage = async () => {
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    const start = performance.now();
    const imageDataValues = (await invoke("generate", {
      sceneJson: JSON.stringify(test_json),
    })) as number[];
    console.log("time::", performance.now() - start);
    const imageData = new Uint8ClampedArray(imageDataValues);
    ctx.putImageData(new ImageData(imageData, w, h), 0, 0);
  };

  return (
    <div>
      <div>
        <button type="button" onClick={generateImage}>
          Generate
        </button>
      </div>

      <div>
        <canvas
          ref={(ele) => {
            ctx = ele.getContext("2d")!;
          }}
        />
      </div>
    </div>
  );
};

const test_json = {
  // width: 32000,
  // height: 24000,
  width: w,
  height: h,
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
