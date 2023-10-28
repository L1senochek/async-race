import { ElementParam } from '../../../../../../types/creator/creator';
import { View } from '../../../../../creator/view';

class CreateTextParam extends View {}
class CreateColorparam extends View {}
class CreateItemBtn extends View {}

export class FormCreate extends View {
  createTextParam!: CreateTextParam;
  createColorparam!: CreateColorparam;
  createItemBtn!: CreateItemBtn;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.createTextParam = new CreateTextParam({
      tag: 'input',
      classNames: ['param'],
      attributes: {
        type: 'text',
      },
    });
    this.createColorparam = new CreateColorparam({
      tag: 'input',
      classNames: ['color'],
      attributes: {
        type: 'color',
      },
    });
    this.createItemBtn = new CreateItemBtn({ tag: 'button', classNames: ['btn', 'create'], innerText: 'CREATE' });

    this.view
      .getElement()
      .prepend(
        this.createTextParam.getHTMLElement(),
        this.createColorparam.getHTMLElement(),
        this.createItemBtn.getHTMLElement()
      );
  }
}
