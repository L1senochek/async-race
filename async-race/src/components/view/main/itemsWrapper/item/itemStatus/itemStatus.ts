import { ElementParam } from '../../../../../../types/creator/creator';
import { View } from '../../../../../creator/view';

export class ItemBtnSelect extends View {}
export class ItemBtnRemove extends View {}
export class ItemName extends View {}

export class ItemStatus extends View {
  itemBtnSelect!: ItemBtnSelect;
  itemBtnRemove!: ItemBtnRemove;
  itemName!: ItemName;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.itemBtnSelect = new ItemBtnSelect({ tag: 'button', classNames: ['item__btn', 'select'], innerText: 'SELECT' });
    this.itemBtnRemove = new ItemBtnRemove({ tag: 'button', classNames: ['item__btn', 'remove'], innerText: 'REMOVE' });
    this.itemName = new ItemName({ tag: 'h4', classNames: ['item__name'], innerText: 'Catesla' });

    this.view
      .getElement()
      .append(this.itemBtnSelect.getHTMLElement(), this.itemBtnRemove.getHTMLElement(), this.itemName.getHTMLElement());
  }
}
