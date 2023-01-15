import { Setter, Component, createSignal, For, Switch, Match } from "solid-js";

import {
  Color,
  Coloration,
  ColorC,
  DirectionalC,
  Material,
  PlaneC,
  Point,
  Reflective,
  ReflectiveC,
  Refractive,
  RefractiveC,
  Scene,
  SElement,
  SLight,
  SphereC,
  SphericalC,
  SurfaceType,
  Texture,
  TextureC,
  Vector3,
} from "./sceneTypes";

type SElementEditorProps = {
  sElement: SElement;
  i: number;
  setScene: Setter<Scene>;
};

export const SElementEditor: Component<SElementEditorProps> = (p) => {
  const [sElement, setSElement] = createSignal(p.sElement);
  const [isEditMode, setIsEditMode] = createSignal(false);
  const toggleEditMode = () => setIsEditMode((isE) => !isE);

  const onSaveDelete = () => {
    if (isEditMode()) {
      p.setScene((s) => ({
        ...s,
        elements: [
          ...s.elements.slice(0, p.i),
          sElement(),
          ...s.elements.slice(p.i + 1),
        ],
      }));
    } else {
      p.setScene((s) => ({
        ...s,
        elements: [...s.elements.slice(0, p.i), ...s.elements.slice(p.i + 1)],
      }));
    }

    toggleEditMode();
  };

  const onEnterExitEditMode = () => {
    if (isEditMode()) setSElement(p.sElement);

    toggleEditMode();
  };

  return (
    <div>
      <Switch>
        <Match when={(sElement() as SphereC).Sphere !== undefined}>
          <XYZEditor
            point={(sElement() as SphereC).Sphere.center}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Point) => {
              setSElement((s) => ({
                ...s,
                Sphere: {
                  ...(s as SphereC).Sphere,
                  center: updatedVal,
                },
              }));
            }}
            fieldName="Center"
          />
          <NumberEditor
            number={(sElement() as SphereC).Sphere.radius}
            isEditMode={isEditMode()}
            onChange={(updatedVal: number) => {
              setSElement((s) => ({
                ...s,
                Sphere: {
                  ...(s as SphereC).Sphere,
                  radius: updatedVal,
                },
              }));
            }}
            fieldName="Radius"
          />
          <MaterialEditor
            material={(sElement() as SphereC).Sphere.material}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Material) => {
              setSElement((s) => ({
                ...s,
                Sphere: {
                  ...(s as SphereC).Sphere,
                  material: updatedVal,
                },
              }));
            }}
          />
        </Match>
        <Match when={(sElement() as PlaneC).Plane !== undefined}>
          <XYZEditor
            point={(sElement() as PlaneC).Plane.origin}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Point) => {
              setSElement((s) => ({
                ...s,
                Plane: {
                  ...(s as PlaneC).Plane,
                  origin: updatedVal,
                },
              }));
            }}
            fieldName="Origin"
          />
          <XYZEditor
            point={(sElement() as PlaneC).Plane.normal}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Vector3) => {
              setSElement((s) => ({
                ...s,
                Plane: {
                  ...(s as PlaneC).Plane,
                  normal: updatedVal,
                },
              }));
            }}
            fieldName="Normal"
          />
          <MaterialEditor
            material={(sElement() as PlaneC).Plane.material}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Material) => {
              setSElement((s) => ({
                ...s,
                Plane: {
                  ...(s as PlaneC).Plane,
                  material: updatedVal,
                },
              }));
            }}
          />
        </Match>
      </Switch>

      <button type="button" onClick={onEnterExitEditMode}>
        {isEditMode() ? "Cancel" : "Edit"}
      </button>
      <button type="button" onClick={onSaveDelete}>
        {isEditMode() ? "Save" : "Delete"}
      </button>
    </div>
  );
};

type SLightEditorProps = {
  sLight: SLight;
  i: number;
  setScene: Setter<Scene>;
};

export const SLightEditor: Component<SLightEditorProps> = (p) => {
  const [sLight, setSLight] = createSignal(p.sLight);
  const [isEditMode, setIsEditMode] = createSignal(false);
  const toggleEditMode = () => setIsEditMode((isE) => !isE);

  const onSaveDelete = () => {
    if (isEditMode()) {
      p.setScene((s) => ({
        ...s,
        lights: [
          ...s.lights.slice(0, p.i),
          sLight(),
          ...s.lights.slice(p.i + 1),
        ],
      }));
    } else {
      p.setScene((s) => ({
        ...s,
        lights: [...s.lights.slice(0, p.i), ...s.lights.slice(p.i + 1)],
      }));
    }

    toggleEditMode();
  };

  const onEnterExitEditMode = () => {
    if (isEditMode()) setSLight(p.sLight);

    toggleEditMode();
  };

  return (
    <div>
      <Switch>
        <Match when={(sLight() as DirectionalC).Directional !== undefined}>
          <XYZEditor
            point={(sLight() as DirectionalC).Directional.direction}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Vector3) => {
              setSLight((s) => ({
                ...s,
                Directional: {
                  ...(s as DirectionalC).Directional,
                  direction: updatedVal,
                },
              }));
            }}
            fieldName="Center"
          />
          <ColorEditor
            color={(sLight() as DirectionalC).Directional.color}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Color) => {
              setSLight((s) => ({
                ...s,
                Directional: {
                  ...(s as DirectionalC).Directional,
                  color: updatedVal,
                },
              }));
            }}
          />
          <NumberEditor
            number={(sLight() as DirectionalC).Directional.intensity}
            isEditMode={isEditMode()}
            onChange={(updatedVal: number) => {
              setSLight((s) => ({
                ...s,
                Directional: {
                  ...(s as DirectionalC).Directional,
                  intensity: updatedVal,
                },
              }));
            }}
            fieldName="Intensity"
          />
        </Match>
        <Match when={(sLight() as SphericalC).Spherical !== undefined}>
          <XYZEditor
            point={(sLight() as SphericalC).Spherical.position}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Point) => {
              setSLight((s) => ({
                ...s,
                Plane: {
                  ...(s as SphericalC).Spherical,
                  position: updatedVal,
                },
              }));
            }}
            fieldName="Position"
          />
          <ColorEditor
            color={(sLight() as SphericalC).Spherical.color}
            isEditMode={isEditMode()}
            onChange={(updatedVal: Color) => {
              setSLight((s) => ({
                ...s,
                Spherical: {
                  ...(s as SphericalC).Spherical,
                  color: updatedVal,
                },
              }));
            }}
          />
          <NumberEditor
            number={(sLight() as SphericalC).Spherical.intensity}
            isEditMode={isEditMode()}
            onChange={(updatedVal: number) => {
              setSLight((s) => ({
                ...s,
                Spherical: {
                  ...(s as SphericalC).Spherical,
                  intensity: updatedVal,
                },
              }));
            }}
            fieldName="Intensity"
          />
        </Match>
      </Switch>

      <button type="button" onClick={onEnterExitEditMode}>
        {isEditMode() ? "Cancel" : "Edit"}
      </button>
      <button type="button" onClick={onSaveDelete}>
        {isEditMode() ? "Save" : "Delete"}
      </button>
    </div>
  );
};

type XYZEditorProps = {
  point: Point | Vector3;
  isEditMode: boolean;
  onChange: (updatedVal: Point | Vector3) => void;
  fieldName: string;
};

// works for Points and Vector3s, which have the same underlying type signature
const XYZEditor: Component<XYZEditorProps> = (p) => (
  <div>
    <p>{p.fieldName}:</p>
    {p.isEditMode ? (
      <For each={Object.entries(p.point)}>
        {([pointCompName, pointComp]) => (
          <label>
            {pointCompName}:
            <input
              type="number"
              value={pointComp}
              onChange={(e) => {
                p.onChange({
                  ...p.point,
                  [pointCompName]: Number(e.currentTarget.value),
                });
              }}
            />
          </label>
        )}
      </For>
    ) : (
      <p>
        {p.point.x}, {p.point.y}, {p.point.z}
      </p>
    )}
  </div>
);

type NumberEditorProps = {
  number: number;
  isEditMode: boolean;
  onChange: (updatedVal: number) => void;
  fieldName: string;
};

// works for any raw number
const NumberEditor: Component<NumberEditorProps> = (p) => (
  <div>
    <p>{p.fieldName}:</p>
    {p.isEditMode ? (
      <label>
        <input
          type="number"
          value={p.number}
          onChange={(e) => {
            p.onChange(Number(e.currentTarget.value));
          }}
        />
      </label>
    ) : (
      <p>{p.number}</p>
    )}
  </div>
);

type MaterialEditorProps = {
  material: Material;
  isEditMode: boolean;
  onChange: (updatedVal: Material) => void;
};

const MaterialEditor: Component<MaterialEditorProps> = (p) => (
  <div>
    <p>Material:</p>
    <ColorationEditor
      coloration={p.material.coloration}
      isEditMode={p.isEditMode}
      onChange={(updatedVal: Coloration) => {
        p.onChange({ ...p.material, coloration: updatedVal });
      }}
    />
    <NumberEditor
      number={p.material.albedo}
      isEditMode={p.isEditMode}
      onChange={(updatedVal: number) => {
        p.onChange({ ...p.material, albedo: updatedVal });
      }}
      fieldName="Albedo"
    />
    <SurfaceEditor
      surface={p.material.surface}
      isEditMode={p.isEditMode}
      onChange={(updatedVal: SurfaceType) => {
        p.onChange({ ...p.material, surface: updatedVal });
      }}
    />
  </div>
);

type ColorationEditorProps = {
  coloration: Coloration;
  isEditMode: boolean;
  onChange: (updatedVal: Coloration) => void;
};

const ColorationEditor: Component<ColorationEditorProps> = (p) => (
  <div>
    <p>Coloration:</p>
    {p.isEditMode && (
      <div>
        <label style={{ display: "inline-block", width: "120px" }}>
          Color
          <input
            type="radio"
            value="color"
            checked={(p.coloration as ColorC).Color !== undefined}
            onChange={() => {
              p.onChange({ Color: { red: 0, green: 0, blue: 0 } });
            }}
          />
        </label>
        <label style={{ display: "inline-block", width: "120px" }}>
          Texture
          <input
            type="radio"
            value="texture"
            checked={(p.coloration as TextureC).Texture !== undefined}
            onChange={() => {
              p.onChange({ Texture: { path: "assets/checkerboard.png" } });
            }}
          />
        </label>
      </div>
    )}
    <Switch>
      <Match when={(p.coloration as ColorC).Color !== undefined}>
        <ColorEditor
          color={(p.coloration as ColorC).Color}
          isEditMode={p.isEditMode}
          onChange={(updatedVal: Color) => {
            p.onChange({ Color: updatedVal });
          }}
        />
      </Match>
      <Match when={(p.coloration as TextureC).Texture !== undefined}>
        <TextureEditor
          texture={(p.coloration as TextureC).Texture}
          isEditMode={p.isEditMode}
          onChange={(updatedVal: Texture) => {
            p.onChange({ Texture: updatedVal });
          }}
        />
      </Match>
    </Switch>
  </div>
);

type ColorEditorProps = {
  color: Color;
  isEditMode: boolean;
  onChange: (updatedVal: Color) => void;
};

const ColorEditor: Component<ColorEditorProps> = (p) => (
  <div>
    <p>Color:</p>
    {p.isEditMode ? (
      <For each={Object.entries(p.color)}>
        {([colorCompName, colorComp]) => (
          <label>
            {colorCompName}:
            <input
              type="number"
              value={colorComp}
              onChange={(e) => {
                p.onChange({
                  ...p.color,
                  [colorCompName]: Number(e.currentTarget.value),
                });
              }}
            />
          </label>
        )}
      </For>
    ) : (
      <p>
        ({p.color.red}, {p.color.green}, {p.color.blue})
      </p>
    )}
  </div>
);

type TextureEditorProps = {
  texture: Texture;
  isEditMode: boolean;
  onChange: (updatedVal: Texture) => void;
};

const TextureEditor: Component<TextureEditorProps> = (p) => (
  <div>
    <p>Texture:</p>
    {p.isEditMode ? (
      <label>
        <input // TODO: Dropdown of all possible textures
          type="string"
          value={p.texture.path}
          onChange={(e) => {
            p.onChange({
              ...p.texture,
              path: e.currentTarget.value,
            });
          }}
        />
      </label>
    ) : (
      <p>{p.texture.path.split("/").at(-1)?.split(".")?.at(0)}</p>
    )}
  </div>
);

type SurfaceEditorProps = {
  surface: SurfaceType;
  isEditMode: boolean;
  onChange: (updatedVal: SurfaceType) => void;
};

const SurfaceEditor: Component<SurfaceEditorProps> = (p) => (
  <div>
    <p>Surface:</p>
    {p.isEditMode && (
      <div>
        <label style={{ display: "inline-block", width: "80px" }}>
          Diffuse
          <input
            type="radio"
            value="color"
            checked={p.surface === "Diffuse"}
            onChange={() => {
              p.onChange("Diffuse");
            }}
          />
        </label>
        <label style={{ display: "inline-block", width: "80px" }}>
          Reflective
          <input
            type="radio"
            value="texture"
            checked={(p.surface as ReflectiveC).Reflective !== undefined}
            onChange={() => {
              p.onChange({ Reflective: { reflectivity: 0.5 } });
            }}
          />
        </label>
        <label style={{ display: "inline-block", width: "80px" }}>
          Refractive
          <input
            type="radio"
            value="texture"
            checked={(p.surface as RefractiveC).Refractive !== undefined}
            onChange={() => {
              p.onChange({ Refractive: { index: 1.5, transparency: 1 } });
            }}
          />
        </label>
      </div>
    )}
    <Switch>
      <Match when={p.surface === "Diffuse"}>Diffuse</Match>
      <Match when={(p.surface as ReflectiveC).Reflective !== undefined}>
        <ReflectivityEditor
          reflective={(p.surface as ReflectiveC).Reflective}
          isEditMode={p.isEditMode}
          onChange={(updatedVal: Reflective) => {
            p.onChange({ Reflective: updatedVal });
          }}
        />
      </Match>
      <Match when={(p.surface as RefractiveC).Refractive !== undefined}>
        <RefractivityEditor
          refractive={(p.surface as RefractiveC).Refractive}
          isEditMode={p.isEditMode}
          onChange={(updatedVal: Refractive) => {
            p.onChange({ Refractive: updatedVal });
          }}
        />
      </Match>
    </Switch>
  </div>
);

type ReflectivityEditorProps = {
  reflective: Reflective;
  isEditMode: boolean;
  onChange: (updatedVal: Reflective) => void;
};

const ReflectivityEditor: Component<ReflectivityEditorProps> = (p) => (
  <div>
    <p>Reflective:</p>
    <NumberEditor
      number={p.reflective.reflectivity}
      isEditMode={p.isEditMode}
      onChange={(updatedVal: number) => {
        p.onChange({ reflectivity: updatedVal });
      }}
      fieldName="Reflectivity"
    />
  </div>
);

type RefractivityEditorProps = {
  refractive: Refractive;
  isEditMode: boolean;
  onChange: (updatedVal: Refractive) => void;
};

const RefractivityEditor: Component<RefractivityEditorProps> = (p) => (
  <div>
    <p>Refractive:</p>
    <NumberEditor
      number={p.refractive.index}
      isEditMode={p.isEditMode}
      onChange={(updatedVal: number) => {
        p.onChange({ ...p.refractive, index: updatedVal });
      }}
      fieldName="Index"
    />
    <NumberEditor
      number={p.refractive.transparency}
      isEditMode={p.isEditMode}
      onChange={(updatedVal: number) => {
        p.onChange({ ...p.refractive, transparency: updatedVal });
      }}
      fieldName="Transparency"
    />
  </div>
);
