import { View } from '../../../creator/view';
import { ButtonWinners } from './buttonsWinners/buttonsWinners';
import { WinnersNumPage } from './numPage/numPage';
import { TableWinners } from './tableWinners/tableWinners';
import { WinnersTitle } from './winTitle/winTitle';

export class WinnersView extends View {
  winTitle!: WinnersTitle;
  numPage!: WinnersNumPage;
  tableWinners!: TableWinners;
  buttonsWinners!: ButtonWinners;

  constructor() {
    super({ classNames: ['winners'] });
    this.changeView();
  }

  private changeView(): void {
    this.winTitle = new WinnersTitle();
    this.numPage = new WinnersNumPage();
    this.tableWinners = new TableWinners();
    this.buttonsWinners = new ButtonWinners();

    this.view
      .getElement()
      .append(
        this.winTitle.getHTMLElement(),
        this.numPage.getHTMLElement(),
        this.tableWinners.getHTMLElement(),
        this.buttonsWinners.getHTMLElement()
      );
  }
}
