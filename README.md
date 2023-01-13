# Ray Tracer

Native, cross platform app for ray tracing in [rust](https://www.rust-lang.org/) via [Tauri](https://tauri.app/) and [Solid](https://www.solidjs.com/).

The actual raytracing logic in `src-raytracer/src/raytracer` is copied without modification (except formatting and dependency updates) from https://github.com/bheisler/raytracer (described, quite interestingly, [here](https://bheisler.github.io/post/writing-raytracer-in-rust-part-1/)). To my bottomless frustration, there are a hundred crappy ray tracing libraries in rust, most of them based on https://raytracing.github.io/, and zero good ones. I picked this one because it's relatively feature complete and easy to integrate, but it would be nice to replace it with a proper productionized library someday.
