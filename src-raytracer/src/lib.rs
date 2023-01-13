#[macro_use]
extern crate serde_derive;
extern crate image;
extern crate serde;

mod matrix;
pub mod point;
mod rendering;
pub mod scene;
pub mod vector;

use std::convert::TryInto;

use scene::Scene;

use rendering::{cast_ray, Ray};

pub fn render(scene: &Scene) -> Vec<u8> {
  let pixel_count = scene.height * scene.width;

  let mut pixel_data: Vec<u8> = vec![255; (pixel_count * 4).try_into().unwrap()];

  for y in 0..scene.height {
    for x in 0..scene.width {
      let ray = Ray::create_prime(x + scene.x_offset, y + scene.y_offset, scene);
      let rgba = cast_ray(scene, &ray, 0).to_rgba();
      let i = ((y * scene.width) + x) as usize;
      pixel_data[i * 4] = rgba[0];
      pixel_data[i * 4 + 1] = rgba[1];
      pixel_data[i * 4 + 2] = rgba[2];
    }
  }

  pixel_data
}
