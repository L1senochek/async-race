import { ElementParam } from '../../../../types/creator/creator';
import { View } from '../../../creator/view';
import { ItemView } from './item/item';

export class ItemsWrapperView extends View {
  item!: ItemView;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.item = new ItemView({ classNames: ['item__wrapper'] });
    this.view.getElement().append(this.item.getHTMLElement());
  }
}
