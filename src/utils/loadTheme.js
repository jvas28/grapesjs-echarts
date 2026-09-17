const CDN_BASE = "https://unpkg.com/echarts";

/**
 * Themes ship as separate UMD files in the echarts package and aren't
 * bundled here (they'd otherwise pull in a second, disconnected copy of
 * echarts's internals). Instead we fetch the theme file matching the
 * echarts instance actually in use and let it self-register via the
 * shared `window.echarts` global, so it always lands on the same
 * instance passed to `chart.init()`.
 */
export default function loadTheme(echarts, theme, cb) {
  if (!theme) {
    cb();
    return;
  }
  window.$grapesEcharts = window.$grapesEcharts || { themes: [] };
  if (window.$grapesEcharts.themes.includes(theme)) {
    cb();
    return;
  }
  const script = document.createElement("script");
  script.onload = () => {
    window.$grapesEcharts.themes.push(theme);
    cb();
  };
  script.onerror = () => cb();
  script.src = `${CDN_BASE}@${echarts.version}/theme/${theme}.js`;
  document.head.appendChild(script);
}
