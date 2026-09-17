// Default swatch colors handed out (round-robin) to new items/series so a
// freshly added row already has a visible, distinct color instead of
// `null` (which a native <input type="color"> can't represent anyway).
const PALETTE = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];

export default function nextColor(index) {
  return PALETTE[index % PALETTE.length];
}
