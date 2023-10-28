import { ElementParam } from '../../types/creator/creator';
import CreatorElement from './creator';

export class View {
  protected view: CreatorElement;
  constructor(param: ElementParam) {
    this.view = this.createView(param);
  }

  getHTMLElement(): HTMLElement {
    return this.view.getElement();
  }

  createView(param: ElementParam): CreatorElement {
    return new CreatorElement(param);
  }

  getPropertyElem(param: HTMLElement | null): HTMLElement {
    if (param instanceof HTMLElement) {
      return param;
    } else {
      throw new Error();
    }
  }

  appendElems([...elem]: (ElementParam | HTMLElement)[]): void {
    [...elem].forEach((element) => {
      if (element instanceof HTMLElement) {
        this.view.getElement().append(element);
      } else {
        const mainElem = new CreatorElement(element);
        this.view.getElement().append(mainElem.getElement());
      }
    });
  }

  setCallback(callback: (e?: Event) => void) {
    this.view.getElement().addEventListener('click', callback);
  }

  clearWrapper() {
    this.view.getElement().innerHTML = '';
  }

  getInputValue() {
    if (this.view.elem instanceof HTMLInputElement) {
      return this.view.elem.value;
    }
  }

  getButtonElement(): HTMLButtonElement {
    if (this.view.elem instanceof HTMLButtonElement) {
      return this.view.elem;
    } else {
      throw new Error('is not btn');
    }
  }
}
