import { ElementParam } from '../../../types/creator/creator';
import { View } from '../../creator/view';
import { WinnersView } from './winners/winners';
import { GarageView } from './garage/garage';
import { BannerView } from './banner/banner';

export class MainView extends View {
  garageView!: GarageView;
  winnersView!: WinnersView;
  banner!: BannerView;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
    this.banner = new BannerView();

    this.view
      .getElement()
      .prepend(this.garageView.getHTMLElement(), this.winnersView.getHTMLElement(), this.banner.getHTMLElement());
  }
}
