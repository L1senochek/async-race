import { ElementParam } from '../../../../../../types/creator/creator';
import { View } from '../../../../../creator/view';

class UpdateTextParam extends View {
  updateInputTextParam(paramValue: string) {
    if (this.view.elem instanceof HTMLInputElement) {
      this.view.elem.value = paramValue;
    }
  }
}
class UpdateColorparam extends View {
  updateColorparam(paramValue: string) {
    if (this.view.elem instanceof HTMLInputElement) {
      this.view.elem.value = paramValue;
    }
  }
}
class UpdateItemBtn extends View {}

export class FormUpdate extends View {
  updateTextParam!: UpdateTextParam;
  updateColorparam!: UpdateColorparam;
  updateItemBtn!: UpdateItemBtn;
  currentItem: number;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
    this.currentItem = 1111;
  }

  private changeView(): void {
    this.updateTextParam = new UpdateTextParam({
      tag: 'input',
      classNames: ['param'],
      attributes: {
        type: 'text',
      },
    });
    this.updateColorparam = new UpdateColorparam({
      tag: 'input',
      classNames: ['color'],
      attributes: {
        type: 'color',
      },
    });
    this.updateItemBtn = new UpdateItemBtn({ tag: 'button', classNames: ['btn', 'update'], innerText: 'UPDATE' });

    this.view
      .getElement()
      .prepend(
        this.updateTextParam.getHTMLElement(),
        this.updateColorparam.getHTMLElement(),
        this.updateItemBtn.getHTMLElement()
      );
  }
}
