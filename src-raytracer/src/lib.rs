#[macro_use]
extern crate serde_derive;
extern crate image;
extern crate rayon;
extern crate serde;

mod matrix;
pub mod point;
mod rendering;
pub mod scene;
pub mod vector;

use rayon::prelude::*;

use scene::Scene;

use rendering::{cast_ray, Ray};

pub fn render(scene: &Scene) -> Vec<u8> {
  (0..scene.height * scene.width)
    .collect::<Vec<u32>>()
    .par_iter()
    .flat_map(|i| -> [u8; 4] {
      let x = i % scene.width;
      let y = i / scene.width;
      let ray = Ray::create_prime(x + scene.x_offset, y + scene.y_offset, scene);
      cast_ray(scene, &ray, 0).to_arr()
    })
    .collect()
}
