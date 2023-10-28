import { Item } from '../../../../../../../types/api/api';
import { ElementParam } from '../../../../../../../types/creator/creator';
import { View } from '../../../../../../creator/view';
import { cat, flag } from '../../../../../../data/data';

export class ItemBtnStart extends View {}
export class ItemBtnStop extends View {}
export class ItemBtnWrapper extends View {
  itemBtnStart!: ItemBtnStart;
  itemBtnStop!: ItemBtnStop;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.itemBtnStart = new ItemBtnStart({
      tag: 'button',
      classNames: ['btn', 'item__btn', 'start'],
      innerText: 'START',
    });
    this.itemBtnStop = new ItemBtnStop({ tag: 'button', classNames: ['btn', 'item__btn', 'stop'], innerText: 'STOP' });
    this.view.getElement().append(this.itemBtnStart.getHTMLElement(), this.itemBtnStop.getHTMLElement());
  }
}

export class ItemSvg extends View {
  color!: string;
  constructor(param: ElementParam, itemParam: Item) {
    super(param);
    this.color = itemParam.color;
    this.changeView();
  }
  private changeView(): void {
    this.setColor(this.color);
  }

  setColor(color: string): void {
    this.view.getElement().innerHTML = this.view.replaceColorSvg(cat, color);
  }
}

export class Finish extends View {
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }
  private changeView(): void {
    this.view.getElement().innerHTML = flag;
  }
}

export class ItemTrack extends View {
  item!: ItemSvg;
  finish!: Finish;
  constructor(param: ElementParam, itemParam: Item) {
    super(param);
    this.changeView(itemParam);
  }

  private changeView(itemParam: Item): void {
    this.item = new ItemSvg({ classNames: ['item__img', 'cat'] }, itemParam);
    this.finish = new Finish({ classNames: ['item__img', 'finish'] });

    this.view.getElement().append(this.item.getHTMLElement(), this.finish.getHTMLElement());
  }
}

export class ItemRoad extends View {
  itemBtnWrapper!: ItemBtnWrapper;
  itemTrack!: ItemTrack;
  constructor(param: ElementParam, itemParam: Item) {
    super(param);
    this.changeView(itemParam);
  }

  private changeView(itemParam: Item): void {
    this.itemBtnWrapper = new ItemBtnWrapper({ classNames: ['item__btn-wrapper'] });
    this.itemTrack = new ItemTrack({ classNames: ['item__track'] }, itemParam);

    this.view.getElement().append(this.itemBtnWrapper.getHTMLElement(), this.itemTrack.getHTMLElement());
  }
}
