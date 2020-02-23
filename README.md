# Grapesjs Echarts

[![Build Status](https://travis-ci.org/jvas28/grapesjs-echarts.svg?branch=master)](https://travis-ci.org/jvas28/grapesjs-echarts)

This is a **WORK IN PROGRESS** version of adding chart components to [GrapesJS](https://grapesjs.com/docs/api/component.html) using [Echarts](https://www.echartsjs.com/) library. 

Give it a try in
[Code Pen](https://codepen.io/jvas28/pen/ZEGByOq).

Check a basic result [here](https://codepen.io/jvas28/pen/ZEGByOq).





## Available Components
Currently there are only 3 chart components.
- `Bars Chart`
- `Pie Chart`
- `Donut Chart`

And a special one, the `Custom Chart` which will allow you to create any type of chart by adding the `echarts.options` in JSON string format while I keep bringing more `Chart Components` and `Settings`. 

- Custom
<p align="center">
<img src="screenshots/blocks.png" width="200">
</p>

## Available Settings
- Theme
- Items
  - Name
  - Value
  - Color

<p align="center">
<img src="screenshots/setup.png" width="200">
</p>

This settings are available for all components but `Custom Chart`.




## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-echarts.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-echarts'],
      pluginsOpts: {
        'grapesjs-echarts': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-echarts';
import 'grapesjs/dist/css/grapes.min.css';

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
Designed by [Smartline](https://www.flaticon.com/authors/smartline) from [www.flaticon.com](www.flaticon.com)

## Screenshots

![Bars](screenshots/bars-chart.png)
![Pie](screenshots/pie-chart.png)
![Donut](screenshots/donut-chart.png)


## License

MIT
