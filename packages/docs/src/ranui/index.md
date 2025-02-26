# ranui

Development scheme based on `Web Components`

## Feature

1. **High Cross-Framework Compatibility**: Our solution seamlessly adapts to a wide array of leading front-end frameworks, including `React`, `Vue`, `Preact`, `SolidJS`, `Svelte`, and more. It also integrates smoothly with any project built on `JavaScript` and adhering to `W3C` standards. No matter your choice of technology stack, we guarantee consistent and reliable support.
2. **Pure Native Experience**: Our solution eliminates the need for dependencies on front-end frameworks like `npm`, `React`/`Vue`, or complex build tools such as `webpack`/`vite`. It truly embodies the essence of Web technology. You can get started effortlessly, just like manipulating native `div` tags, immediately experiencing the purity and intuitiveness of the technology. This design not only simplifies project structure but also reduces the cost of learning and usage, enabling every developer to appreciate the native charm of Web technology.
3. **Ultimate Modular Design**: Utilizing the principle of minimal modularization, we carefully dismantle large and complex systems or applications into extremely small, functionally independent, and easily reusable component units. This approach significantly enhances code maintainability, scalability, and reusability.
4. **Fully Open-Source for Free Learning**: Our project fully adheres to the `MIT` open-source license, granting unrestricted access to all source code. This means you are free to access, learn from, reference, and even modify our code, whether for personal development or commercial applications. We firmly believe that open-source is a vital pathway for technological advancement and innovation.
5. **Interactive and Comprehensive Documentation**: We provide detailed and highly interactive documentation, where all component examples are live and interactive. This allows you to directly experience the component functionality while reading, deepening your understanding and enabling quick hands-on learning. This design is aimed at providing you with the most intuitive and efficient learning experience possible.
6. **Type-Checking Support**: Our development environment is fully built on `TypeScript`, equipped with comprehensive declaration files and type definitions, ensuring smooth integration for both `JavaScript` and `TypeScript` projects. With powerful type-checking capabilities, we significantly enhance code readability, maintainability, and project robustness, bringing unprecedented convenience and peace of mind to development work.
7. **Enhanced Durability and Stability**: Our solution offers exceptional stability, eliminating concerns about disruptive updates encountered during version upgrades, such as `React` from version `15` to `16` (with `fiber`) or `Vue` from version `2` to `3` (with `hooks`). We ensure that your components won't be forced into unnecessary updates or redevelopments, thus avoiding potential project interruptions and additional workloads. This translates into a continuous and hassle-free project operation.

## Situation

<a style="display:inline-block;margin-left: 4px;" href="https://github.com/chaxus/ran"><img src="https://img.shields.io/github/actions/workflow/status/chaxus/ran/ci.yml" alt="Build Status"></a>
<a style="display:inline-block;margin-left: 4px;" href="https://github.com/chaxus/ran"><img src="https://img.shields.io/npm/v/ranui.svg" alt="npm-v"></a>
<a style="display:inline-block;margin-left: 4px;" href="https://github.com/chaxus/ran"><img src="https://img.shields.io/npm/dt/ranui.svg" alt="npm-d"></a>
<a style="display:inline-block;margin-left: 4px;" href="https://github.com/chaxus/ran"><img src="https://img.badgesize.io/https:/unpkg.com/ranui/dist/umd/index.umd.cjs?label=brotli&compression=brotli" alt="brotli"></a>
<a style="display:inline-block;margin-left: 4px;" href="https://github.com/chaxus/ran"><img src="https://img.shields.io/badge/module%20formats-umd%2C%20esm-green.svg" alt="module formats: umd, esm"></a>

- `git`：<a href="https://github.com/chaxus/ran/tree/main/packages/ranui">`https://github.com/chaxus/ran/tree/main/packages/ranui`</a>
- `npm`：<a href="https://www.npmjs.com/package/ranui">`https://www.npmjs.com/package/ranui`</a>

## Usage

In most cases, you can use it just like a native `div` tag.

Here are some examples

1. `html`
2. `js`
3. `jsx`
4. `vue`
5. `tsx`

### 1.`html`

```html
<script src="./ranui/dist/umd/index.umd.cjs"></script>

<body>
  <r-button>Button</r-button>
</body>
```

### 2.`js`

```js
import 'ranui';

const Button = document.createElement('r-button');
Button.appendChild('this is button text');
document.body.appendChild(Button);
```

### 3.`jsx`

Because `react` synthetic events, in order to more convenient to use, by `react` higher-order components encapsulation [ranui](https://www.npmjs.com/package/ranui), Output the [@ranui/react](https://www.npmjs.com/package/@ranui/react)

In `react`, use the [@ranui/react](https://www.npmjs.com/package/@ranui/react) will be more smooth, by higher-order functions after package, and `react` ecosystem.

[ranui](https://www.npmjs.com/package/ranui), however, still can be in any `js` or `ts` in use.

```jsx
import 'ranui';
const App = () => {
  return (
    <>
      <r-button>Button</r-button>
    </>
  );
};
```

### 4.`vue`

```vue
<template>
  <r-button>Button</r-button>
</template>
<script>
import 'ranui';
</script>
```

### 5.`tsx`

Because `react` synthetic events, in order to more convenient to use, by `react` higher-order components encapsulation [ranui](https://www.npmjs.com/package/ranui), Output the [@ranui/react](https://www.npmjs.com/package/@ranui/react)

In `react`, use the [@ranui/react](https://www.npmjs.com/package/@ranui/react) will be more smooth, by higher-order functions after package, and `react` ecosystem.

[ranui](https://www.npmjs.com/package/ranui), however, still can be in any `js` or `ts` in use.

```tsx
// react 18
import type { SyntheticEvent } from 'react';
import React, { useRef } from 'react';
import 'ranui';

const FilePreview = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const uploadFile = (e: SyntheticEvent<HTMLDivElement>) => {
    if (ref.current) {
      const uploadFile = document.createElement('input');
      uploadFile.setAttribute('type', 'file');
      uploadFile.click();
      uploadFile.onchange = (e) => {
        const { files = [] } = uploadFile;
        if (files && files?.length > 0 && ref.current) {
          ref.current.setAttribute('src', '');
          const file = files[0];
          const url = URL.createObjectURL(file);
          ref.current.setAttribute('src', url);
        }
      };
    }
  };
  return (
    <div>
      <r-preview ref={ref}></r-preview>
      <r-button type="primary" onClick={uploadFile}>
        choose file to preview
      </r-button>
    </div>
  );
};
```

jsx defines the types of all HTML-native components in TypeScript. The type 'web component' is not in the jsx definition. You need to add it manually. Otherwise there is a type problem, but it actually works.

```ts
// typings.d.ts
interface RButton {
  type?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

interface RPreview {
  src?: string | Blob | ArrayBuffer;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
}

declare namespace JSX {
  interface IntrinsicElements {
    'r-preview': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & RPreview;
    'r-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & RButton;
  }
}
```

## Import

Support for on-demand import

```js
import 'ranui/button';
```

For some globally displayed components, such as preview and message, additional styles need to be loaded

```js
import 'ranui/preview';
import 'ranui/style';
```

It can also be imported globally, which is more convenient, so that there is no need to consider anything, so that it is done.

- `ES module`

```js
import 'ranui';
```

- `UMD`, `IIFE`, `CJS`

```html
<script src="./ranui/dist/umd/index.umd.cjs"></script>
```

## Overview

- `Button`

<div style="display:inline-block;margin-right: 8px;margin-bottom: 12px;">
     <r-button type="primary">Primary button</r-button>
</div>
<div style="display:inline-block;margin-right: 8px;margin-bottom: 12px;">
     <r-button type="warning">Warning button</r-button>
</div>
<div style="display:inline-block;margin-right: 8px;margin-bottom: 12px;">
    <r-button type="text">Text button</r-button>
</div>
<div style="display:inline-block;margin-right: 8px;margin-bottom: 12px;">
    <r-button >Default button</r-button>
</div>

- `Icon`

<div style='display:flex'>
     <r-icon name="lock" size="50" ></r-icon>
     <r-icon name="user" size="50" ></r-icon>
     <r-icon name="loading" size="50" color="#1E90FF" spin></r-icon>
</div>

- `Skeleton`

<div style="width: 100px;margin-top:10px">
    <r-skeleton ></r-skeleton>
</div>
<div style="margin-top:10px">
    <r-skeleton ></r-skeleton>
</div>
<div style="margin-top:10px">
    <r-skeleton ></r-skeleton>
</div>
<div style="width: 200px;margin-top:10px;margin-bottom: 12px;">
    <r-skeleton ></r-skeleton>
</div>

- `Input`

<div style="display:block;margin-right: 8px;margin-bottom: 12px;">
     <r-input label="user"></r-input>
</div>

<div style="display:block;margin-right: 8px;margin-bottom: 12px;">
     <r-input icon="lock" type="password"></r-input>
</div>

- `message`

<r-button onclick="message.info('This is a hint')">Information prompt</r-button>
<r-button onclick="message.warning('This is a hint')">Warning prompt</r-button>
<r-button onclick="message.error('This is a hint')">Error prompt</r-button>
<r-button onclick="message.success('This is a hint')">Success tip</r-button>
<r-button onclick="message.toast('This is a hint')">toast tip</r-button>

- `Tab`

<div style="display:block;margin-right: 8px;margin-bottom: 12px;">
   <r-tabs>
      <r-tab label="home" icon="home">tab1</r-tab>
      <r-tab label="message" icon="message">tab2</r-tab>
      <r-tab label="user" icon="user">tab3</r-tab>
   </r-tabs>
</div>

- `Radar`

<r-radar style="width:300px;height:300px;display: block;" abilitys='[{"abilityName":"HP","scoreRate":"10"},{"abilityName":"Attack","scoreRate":"90"},{"abilityName":"DEF","scoreRate":"20"},{"abilityName":"Element mastery","scoreRate":"50"},{"abilityName":"Critical Hit Chance","scoreRate":"80"},{"abilityName":"Critical hit damage","scoreRate":"50"}]'></r-radar>

- `Progress`

<r-progress type="drag" ></r-progress>

- `Player`

<r-player style="display: block;width:100%;max-width:600px;height:300px;" src="/ran/hls/example.m3u8"></r-player>

- `Select`

<r-select style="width: 120px; height: 40px" value="185" action="click">
  <r-option value="185">Mike</r-option>
  <r-option value="186">Tom</r-option>
  <r-option value="187">Lucy</r-option>
</r-select>

## Event

- `react`

[@ranui/react](https://www.npmjs.com/package/@ranui/react) By `react` higher-order functions encapsulated [ranui](https://www.npmjs.com/package/ranui) and become, `Event` events follow `react` Event specification. It is slightly different from the W3C standard.

- Modern 'web' standards

In the W3C standard, you can use the on attribute to define event handlers on HTML elements. But this is the old event handler approach.

Modern web development recommends the addEventListener method.

```html
<r-button id="button">Button</r-button>

<script>
  const button = document.getElementById('button');
  button.addEventListener('click', function (event) {
    alert('New click event!');
  });
</script>
```

However, if you do need to use the 'on' attribute, here is an example:

```html
<r-input onchange="change(this.value)"></r-input>

<script>
  function change(e) {
    console.log('e--->', e);
  }
</script>
```

Note that using the 'on' attribute to define event handlers has some limitations and disadvantages.

For example, you can't use event capture or event delegation, and each event type requires a separate attribute.

This is why the addEventListener method is recommended for modern web development.

You can also use the 'property' method:

```html
<r-input id="input"></r-input>

<script>
  const input = document.getElementById("input")
  input.onchange = (e) {
    console.log('e--->', e)
  }
</script>
```

## style

### `::part`

```html
<r-input id="input"></r-input>

<style>
  /* #input refers to the current custom element
input in ::part(input) refers to the class  of the Shadow DOM element inside the current custom element*/
  #input::part(input) {
    width: 100px;
  }
</style>
```

For specific pseudo-class names(`::part`), please refer to the specific introduction.

### Pass in by attribute

A `sheet` attribute is added to all components, passing in a `CSSStyleSheet` string. It will be inserted directly into the `Shadow DOM`.

### `CSS3` variable `var`

By setting the `CSS3` variable for a component, you can customize the specified styles within the component, such as:

<r-progress percent="70" total="100"></r-progress>
<r-progress percent="70" total="100" style="--ran-progress-wrap:linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);"></r-progress>

```html
<r-progress percent="70" total="100"></r-progress>
<r-progress percent="70" total="100" style="--ran-progress-wrap:linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);"></r-progress>
```

For specific `CSS3` variable names, refer to the introduction and description of each component.

## Compatibility

- Do not support `IE`, others have better support

![](../../assets/ranui/customElements.png)

## Contributors

<a href="https://github.com/chaxus/ran/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=chaxus/ran" />
</a>

## Other

1. [优秀的组件设计](https://www.checklist.design/)
2. [在线生成 CSS 渐变色](https://webgradients.com/)
3. [优秀设计作品，有 psd 和 sketch](https://webgradients.com/)
4. [3D UI 设计，类似于 3D 版的 figma](https://spline.design/)
5. [设计规范](https://lawsofux.com/)
6. [优秀设计作品](https://dribbble.com/)
7. [element UI 中文网](https://element.eleme.cn/#/zh-CN)
8. [Ant design 中文网](https://ant.design/index-cn)
9. [在线绘制 CSS 动画](https://animista.net/)
10. [tailwindcss](https://www.tailwindcss.cn/resources)
11. [animate css](https://animate.style/)
12. [can i use](https://caniuse.com/)
13. [figma](https://www.figma.com/)

## Protocols and standards

1. [RFCs](https://www.rfc-editor.org/)
2. [ECMA](https://www.ecma-international.org/)
3. [w3c](https://www.w3.org/)
