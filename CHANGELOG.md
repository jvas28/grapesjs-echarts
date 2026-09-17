# Changelog

## v1.0.0

First stable release. Rebuilt to work with current GrapesJS and ECharts, plus a much larger set of chart types and a reworked editing experience.

### Breaking changes

- `echarts` and `grapesjs` are now **peer dependencies** instead of being bundled — install `echarts` yourself alongside this plugin. See [Migrating from 0.0.x](README.md#migrating-from-00x) in the README.

### Compatibility fixes

- Fixed loading under ECharts v5/v6: the old `import echarts from "echarts"` silently resolved to `undefined`, since ECharts's ESM entry stopped having a default export.
- Fixed the "two different echarts instances" crash some bundlers (Vite in particular) threw — caused by this plugin bundling its own copy of `echarts` instead of sharing the host app's.
- Chart themes now load on demand from a CDN matched to the actual `echarts.version` in use, instead of being bundled at build time (broken under ECharts v6's stricter `exports` map) or pointing at a hardcoded, long-stale `echarts@4.6.0`.
- Charts now render on initial load (not just on attribute change), fixing charts staying blank after a `storageManager` reload.
- Fixed resizing: dragging/inserting a chart now actually resizes it (was only wired up to the Style Manager's width/height inputs), and the underlying chart-instance lookup no longer relies on a DOM attribute that GrapesJS's own re-render was silently wiping.
- Modernized the whole build toolchain: webpack 5, current babel/css/sass loaders, dropped the unmaintained `node-sass` and `babel-minify-webpack-plugin`.

### New chart types

Area, Stacked Bar, Radar, Funnel, Rose (Nightingale pie), Horizontal Bar, Gauge, and Scatter — on top of the original Bars, Pie, Donut, Lines, and Custom charts.

### Editing UX

- Live preview: edits apply automatically (debounced) instead of requiring an explicit Save click.
- Native color picker per item, with an auto-assigned default palette.
- Full list of ECharts' built-in themes in the theme dropdown (was hardcoded to 3).
- Numeric inputs for values/points, and an empty-state hint before the first item is added.

## v0.0.20 and earlier

See the [git history](https://github.com/jvas28/grapesjs-echarts/commits/master) — no changelog was kept before v1.0.0.
