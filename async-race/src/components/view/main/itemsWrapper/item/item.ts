import { ElementParam } from '../../../../../types/creator/creator';
import { View } from '../../../../creator/view';
import { ItemRoad } from './itemRoad/itemRoad';
import { ItemStatus } from './itemStatus/itemStatus';

export class ItemView extends View {
  itemStatus!: ItemStatus;
  itemRoad!: ItemRoad;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.itemStatus = new ItemStatus({ classNames: ['item__status'] });
    this.itemRoad = new ItemRoad({ classNames: ['item__road'] });

    this.view.getElement().append(this.itemStatus.getHTMLElement(), this.itemRoad.getHTMLElement());
  }
}
