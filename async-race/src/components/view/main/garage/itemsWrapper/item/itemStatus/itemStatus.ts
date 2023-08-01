import { Item } from '../../../../../../../types/api/api';
import { ElementParam } from '../../../../../../../types/creator/creator';
import { View } from '../../../../../../creator/view';

export class ItemBtnSelect extends View {}
export class ItemBtnRemove extends View {}
export class ItemName extends View {}

export class ItemStatus extends View {
  itemBtnSelect!: ItemBtnSelect;
  itemBtnRemove!: ItemBtnRemove;
  itemName!: ItemName;
  constructor(param: ElementParam, itemParam: Item) {
    super(param);
    this.changeView(itemParam);
  }

  private changeView(itemParam: Item): void {
    this.itemBtnSelect = new ItemBtnSelect({
      tag: 'button',
      classNames: ['btn', 'item__btn', 'select'],
      innerText: 'SELECT',
    });
    this.itemBtnRemove = new ItemBtnRemove({
      tag: 'button',
      classNames: ['btn', 'item__btn', 'remove'],
      innerText: 'REMOVE',
    });
    this.itemName = new ItemName({ tag: 'h4', classNames: ['item__name'], innerText: itemParam.name });

    this.view
      .getElement()
      .append(this.itemBtnSelect.getHTMLElement(), this.itemBtnRemove.getHTMLElement(), this.itemName.getHTMLElement());
  }
}
