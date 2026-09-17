# Grapesjs Echarts

[![Build Status](https://travis-ci.org/jvas28/grapesjs-echarts.svg?branch=master)](https://travis-ci.org/jvas28/grapesjs-echarts)

This is a **WORK IN PROGRESS** version of adding :chart_with_upwards_trend: chart components to [GrapesJS](https://grapesjs.com/docs/api/component.html) using [Echarts](https://www.echartsjs.com/) library.

Give it a try in
[Code Pen](https://codepen.io/jvas28/pen/ZEGByOq).

Check a basic result [here](https://codepen.io/jvas28/pen/qBdRWBp).

## Available Components :bar_chart:

- `Bars Chart`
- `Horizontal Bar Chart`
- `Stacked Bar Chart`
- `Lines Chart`
- `Area Chart`
- `Pie Chart`
- `Donut Chart`
- `Rose Chart`
- `Radar Chart`
- `Funnel Chart`
- `Gauge Chart`
- `Scatter Chart`

And a special one, the `Custom Chart` which will allow you to create any type of chart by adding `echarts.options` in JSON string format.

<p align="center">
<img src="screenshots/blocks.png" width="200">
</p>

## Available Settings

- Theme — the full set of [ECharts built-in themes](https://echarts.apache.org/en/download-theme.html), loaded on demand
- Items — automatically applied as you edit, no explicit save step
  - Name
  - Value (or, for Scatter, X/Y points)
  - Color — native color picker, defaults to an auto-assigned palette
- Min / Max — `Gauge Chart` only

<p align="center">
<img src="screenshots/setup.png" width="200">
</p>

These settings are available for all components but `Custom Chart`.

## I18n Support

If you want to customize some strings used in this app you can use pluginOpts to pass a set of translations or if you just want to change the language you can pass your prefered local (Between english and spanish for now ), I'm open to PRs for other languages, still small plugin so not that much to translate. :wink:

```
...
pluginsOpts: {
          "grapesjs-echarts": {
            intl: {
              locale: "en", // "es" also available
              messages: {
                en: {
                  components: {
                    bars: { name: "My new bars name" },
                  },
                },
              },
            },
          },
        },
...
```

Reference [locale](https://github.com/jvas28/grapesjs-echarts/tree/master/src/locale) folder to get the idea of the structure for labels.

## Requirements

This plugin does not bundle `grapesjs` or `echarts` &mdash; both are peer
dependencies, so your app supplies a single shared copy of each (this also
avoids the "two different echarts instances" errors some bundlers, like
Vite, would otherwise throw). Supported versions:

- `grapesjs` >= 0.19
- `echarts` ^5 or ^6

## Usage

Directly in the browser

```html
<link
  href="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/echarts@6"></script>
<script src="https://unpkg.com/grapesjs-echarts.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
    container: "#gjs",
    // ...
    plugins: ["grapesjs-echarts"],
    pluginsOpts: {
      "grapesjs-echarts": {
        /* options */
      },
    },
  });
</script>
```

Modern javascript

```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-echarts';
import 'grapesjs/dist/css/grapes.min.css';
// echarts must be installed (it's a peer dependency), no import needed here

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```

## Development

Clone the repository

```sh
$ git clone https://github.com/jvas28/grapesjs-echarts.git
$ cd grapesjs-echarts
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```

## Credits

### Icons

The original Bars, Pie, Donut and Custom chart icons were designed by [Smartline](https://www.flaticon.com/authors/smartline) from [www.flaticon.com](www.flaticon.com). The icons for the newer chart types are simple hand-drawn SVGs.

## Roadmap V1

- [x] Basic Bars Chart
- [x] Basic Pie Chart
- [x] Basic Donut Chart
- [x] Basic Lines Chart
- [x] Area, Stacked Bar, Horizontal Bar, Rose, Radar, Funnel, Gauge and Scatter charts
- [x] Live preview while editing (no more explicit Save step)
- [x] Color picker for items
- [ ] Tooltip trait
- [ ] Toolbox trait
- [ ] Legend trait
- [ ] Grid trait

## Screenshots

![Lines](screenshots/lines-chart.png)
![Bars](screenshots/bars-chart.png)
![Pie](screenshots/pie-chart.png)
![Donut](screenshots/donut-chart.png)

## License

MIT
