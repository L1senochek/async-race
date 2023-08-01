import { ElementParam } from '../../types/creator/creator';

export default class CreatorElement {
  elem: HTMLElement | null;
  constructor(param: ElementParam) {
    this.elem = null;
    this.createElem(param);
  }

  getElement(): HTMLElement {
    if (this.elem) {
      return this.elem;
    } else {
      throw new Error();
    }
  }

  createElem(param: ElementParam): void {
    this.elem = document.createElement(param.tag ?? 'div');
    param.classNames.map((cssClass) => {
      if (this.elem instanceof HTMLElement) {
        this.elem.classList.add(cssClass);
      }
    });
    if (param.innerText !== undefined) {
      this.elem.innerText = param.innerText;
    }
    if (param.callback) {
      this.elem.addEventListener('click', param.callback);
    }
    if (param.attributes) {
      const { type, placeholder } = param.attributes;
      this.elem.setAttribute('type', type);
      if (placeholder) {
        this.elem.setAttribute('placeholder', placeholder);
      }
    }
    if (this.elem instanceof HTMLAnchorElement && param.href) {
      this.elem.href = param.href;
      this.elem.target = '_blank';
    }
  }

  getValue(): string {
    return this.elem instanceof HTMLInputElement ? this.elem.value : '';
  }

  replaceColorSvg(svg: string, newColor: string): string {
    return svg.replace('fill="#aaa"', `fill="${newColor}"`);
  }
}
