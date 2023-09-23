import type { VNode, VNodeData } from '../vnode';

export type Attrs = Record<string, string | number | boolean>;

const xlinkNS = 'http://www.w3.org/1999/xlink';
const xmlNS = 'http://www.w3.org/XML/1998/namespace';
const colonChar = 58;
const xChar = 120;

function updateAttrs(oldVnode: VNode, vnode: VNode): void {
  // 用于缓存attrs的name
  let key: string;
  // 用于缓存Vnode的dom
  const elm: Element = vnode.elm as Element;
  // 用于缓存旧VNode的attrs
  let oldAttrs = oldVnode.data && oldVnode.data.attrs;
  // 用于缓存新VNode的attrs
  let attrs = vnode.data && vnode.data.attrs;

  // 如果新旧VNode都没有attrs属性，直接返回
  if (!oldAttrs && !attrs) return;
  // 如果新旧VNode的attrs属性相同，直接返回
  if (oldAttrs === attrs) return;
  //  如果旧VNode没有attrs，将其设置为空对象
  oldAttrs = oldAttrs || {};
  //  如果新VNode没有attrs，将其设置为空对象
  attrs = attrs || {};

  // 遍历新VNode的attrs
  for (key in attrs) {
    // 获取当前attrs的值
    const cur = attrs[key];
    // 获取旧VNode对应的attrs的值
    const old = oldAttrs[key];
    // 如果新旧VNode的attrs值不相同
    if (old !== cur) {
      // 如果新VNode的attrs值为true
      if (cur === true) {
        // 通过setAttribute设置为空字符串
        elm.setAttribute(key, '');
      } else if (cur === false) {
        // 如果新VNode的attrs值为false，则删除key
        elm.removeAttribute(key);
      } else {
        // 设置svg的属性
        if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur as any);
        } else if (key.charCodeAt(3) === colonChar) {
          // Assume xml namespace
          elm.setAttributeNS(xmlNS, key, cur as any);
        } else if (key.charCodeAt(5) === colonChar) {
          // Assume xlink namespace
          elm.setAttributeNS(xlinkNS, key, cur as any);
        } else {
          // 通过setAttribute设置值
          elm.setAttribute(key, `${cur}`);
        }
      }
    }
  }
  // 遍历旧VNode的attrs
  for (key in oldAttrs) {
    // 如果新VNode的attrs中没有相同的key，则直接删除该attrs属性
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

export const attributesModule = { create: updateAttrs, update: updateAttrs };
