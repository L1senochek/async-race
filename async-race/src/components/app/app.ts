import { AppView } from '../view/appView';

export class App {
  appWiew = new AppView();
  constructor() {}
  start() {
    // this.appWiew.header.logo;
    console.log('start');
    this.appWiew.main.mainTitleView.setCount(3); // set count items
  }
}
