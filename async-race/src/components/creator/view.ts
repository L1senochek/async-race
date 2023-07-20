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
}
