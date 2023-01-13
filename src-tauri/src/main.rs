#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use raytracer::render;
use raytracer::scene::Scene;

#[tauri::command]
fn generate(scene_json: &str) -> Vec<u8> {
  let scene: Scene = serde_json::from_str(scene_json).unwrap();

  render(&scene)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![generate])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
