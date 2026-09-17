// All themes ECharts ships under `echarts/theme/*`, loaded on demand at
// runtime (see src/utils/loadTheme.js) so this list can stay in sync with
// whatever ECharts version the host app provides.
export default [
  "azul",
  "bee-inspired",
  "blue",
  "caravan",
  "carp",
  "cool",
  "dark",
  "dark-blue",
  "dark-bold",
  "dark-digerati",
  "dark-fresh-cut",
  "dark-mushroom",
  "eduardo",
  "forest",
  "fresh-cut",
  "fruit",
  "gray",
  "green",
  "helianthus",
  "infographic",
  "inspired",
  "jazz",
  "london",
  "macarons",
  "macarons2",
  "mint",
  "rainbow",
  "red",
  "red-velvet",
  "roma",
  "royal",
  "sakura",
  "shine",
  "tech-blue",
  "vintage",
].map((value) => ({
  value,
  label: value
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" "),
}));
