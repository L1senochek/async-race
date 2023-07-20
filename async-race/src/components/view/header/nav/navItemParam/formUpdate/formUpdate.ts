import { ElementParam } from '../../../../../../types/creator/creator';
import { View } from '../../../../../creator/view';

class UpdateTextParam extends View {}
class UpdateColorparam extends View {}
class UpdateItem extends View {}

export class FormUpdate extends View {
  updateTextParam!: UpdateTextParam;
  updateColorparam!: UpdateColorparam;
  updateItem!: UpdateItem;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
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
    this.updateItem = new UpdateItem({ tag: 'button', classNames: ['btn', 'update'], innerText: 'UPDATE' });

    this.view
      .getElement()
      .prepend(
        this.updateTextParam.getHTMLElement(),
        this.updateColorparam.getHTMLElement(),
        this.updateItem.getHTMLElement()
      );
  }
}
