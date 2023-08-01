import { Item } from '../../../../../../types/api/api';
import { View } from '../../../../../creator/view';
import { ItemRoad } from './itemRoad/itemRoad';
import { ItemStatus } from './itemStatus/itemStatus';

export class ItemView extends View {
  itemStatus!: ItemStatus;
  itemRoad!: ItemRoad;
  constructor(itemParam: Item) {
    super({ classNames: ['item__wrapper'] });
    this.changeView(itemParam);
  }

  private changeView(itemParam: Item): void {
    this.getHTMLElement().dataset.id = String(itemParam.id);
    this.itemStatus = new ItemStatus({ classNames: ['item__status'] }, itemParam);
    this.itemRoad = new ItemRoad({ classNames: ['item__road'] }, itemParam);

    this.view.getElement().append(this.itemStatus.getHTMLElement(), this.itemRoad.getHTMLElement());
  }
}
