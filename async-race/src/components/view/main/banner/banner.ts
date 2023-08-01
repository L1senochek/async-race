import { View } from '../../../creator/view';

export class BannerView extends View {
  countItems!: number;
  constructor() {
    super({ classNames: ['banner'] });
  }
}
