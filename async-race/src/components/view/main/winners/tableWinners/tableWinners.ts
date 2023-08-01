import { Winner } from '../../../../../types/api/api';
import { ApiRequest } from '../../../../api/api';
import { View } from '../../../../creator/view';
import { cat } from '../../../../data/data';

export class HeaderTableWinners extends View {
  constructor() {
    super({ classNames: ['winners__header'] });
    this.addHeaderText();
  }

  addHeaderText(): void {
    this.view.getElement().innerHTML = `<span class="table-item">Number</span><span class="table-item">Cat</span><span class="table-item">Name</span><span class="table-item sort-wins">Wins<span class="sort-arrow arrow-wins"></span></span><span class="table-item sort-time">Best time(mseconds)<span class="sort-arrow arrow-time"></span></span>`;
  }
}
export class ItemsTableWinners extends View {}
export class ItemWinners extends View {
  apiRequest = new ApiRequest();
  constructor(itemParamWinners: Winner, count: number) {
    super({ classNames: ['winner__item'] });
    this.addItemWinner(itemParamWinners, count);
  }

  async addItemWinner(itemParamWinners: Winner, count: number) {
    const idItem = await this.apiRequest.getItem(itemParamWinners.id);
    const svgItem = this.view.replaceColorSvg(cat, idItem.color);
    this.view.getElement().innerHTML = `<span class="table-item">${
      count + 1
    }</span><span class="table-item">${svgItem}</span><span class="table-item">${
      idItem.name
    }</span><span class="table-item">${itemParamWinners.wins}</span><span class="table-item">${
      itemParamWinners.time
    }</span>`;
  }
}
export class TableWinners extends View {
  headerTableWinners!: HeaderTableWinners;
  itemsTableWinners!: ItemsTableWinners;
  itemWinners!: ItemWinners;
  constructor() {
    super({ classNames: ['winners__table'] });
    this.changeView();
  }

  private changeView(): void {
    this.headerTableWinners = new HeaderTableWinners();
    this.itemsTableWinners = new ItemsTableWinners({ classNames: ['winners__items'] });
    this.view.getElement().append(this.headerTableWinners.getHTMLElement(), this.itemsTableWinners.getHTMLElement());
  }
}
