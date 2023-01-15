export type Scene = {
  width: number; // u32
  height: number; // u32
  x_offset: number; // u32
  y_offset: number; // u32

  fov: number; // f64
  elements: SElement[];
  lights: SLight[];

  shadow_bias: number; // f64, very small
  max_recursion_depth: number; // u32
};

export type SElement = SphereC | PlaneC;

export type SphereC = {
  Sphere: {
    center: Point;
    radius: number; // f64
    material: Material;
  };
};

export type PlaneC = {
  Plane: {
    origin: Point;
    normal: Vector3;
    material: Material;
  };
};

export type Point = {
  x: number; // f64
  y: number; // f64
  z: number; // f64
};

export type Material = {
  coloration: Coloration;
  albedo: number; // f32
  surface: SurfaceType;
};

export type Coloration = ColorC | TextureC;

export type ColorC = {
  Color: Color;
};

export type Color = {
  red: number; // f32
  green: number; // f32
  blue: number; // f32
};

export type TextureC = {
  Texture: Texture;
};

export type Texture = {
  path: string;
};

export type SurfaceType = "Diffuse" | ReflectiveC | RefractiveC;

export type ReflectiveC = {
  Reflective: Reflective;
};

export type Reflective = {
  reflectivity: number; // f32
};

export type RefractiveC = {
  Refractive: Refractive;
};

export type Refractive = {
  index: number; // f32
  transparency: number; // f32
};

export type Vector3 = {
  x: number; // f64
  y: number; // f64
  z: number; // f64
};

export type SLight = DirectionalC | SphericalC;

export type DirectionalC = {
  Directional: {
    direction: Vector3;
    color: Color;
    intensity: number; // f32
  };
};

export type SphericalC = {
  Spherical: {
    position: Point;
    color: Color;
    intensity: number; // f32
  };
};

export const newSphereC = (): SphereC => ({
  Sphere: {
    center: newXYZ(),
    radius: 1,
    material: newMaterial(),
  },
});

export const newPlaneC = (): PlaneC => ({
  Plane: {
    origin: newXYZ(),
    normal: newXYZ(),
    material: newMaterial(),
  },
});

export const newDirectionalC = (): DirectionalC => ({
  Directional: {
    direction: newXYZ(),
    color: newColor(),
    intensity: 1,
  },
});

export const newSphericalC = (): SphericalC => ({
  Spherical: {
    position: newXYZ(),
    color: newColor(),
    intensity: 1,
  },
});

const newXYZ = (): Point | Vector3 => ({ x: 0, y: 0, z: 0 });
const newMaterial = (): Material => ({
  coloration: newColorC(),
  albedo: 1,
  surface: newSurface(),
});

const newColor = (): Color => ({ red: 0, green: 0, blue: 0 });
const newColorC = (): ColorC => ({ Color: newColor() });
const newSurface = (): SurfaceType => "Diffuse";

export const TEXTURES = ["blue", "checkerboard", "flower", "leaf", "tile"].map(
  (name) => `assets/${name}.png`
);

export const getName = (name: string) =>
  name.split("/").at(-1)?.split(".")?.at(0);
