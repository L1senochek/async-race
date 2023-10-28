import { EngineDriveModeResponse, Order, QueryParamLimits, Sort, StatusEngineParam } from '../../types/api/api';
import { Visibility } from '../../types/appWiew';
import { ApiRequest } from '../api/api';
import { View } from '../creator/view';
import { HeaderView } from './header/header';
import { ItemView } from './main/garage/itemsWrapper/item/item';
import { MainView } from './main/main';
import { ItemWinners } from './main/winners/tableWinners/tableWinners';

export class PageWrapperView extends View {}
export class AppView {
  wrapper!: PageWrapperView;
  header!: HeaderView;
  main!: MainView;
  apiRequest = new ApiRequest();
  curNumberPage = 1;
  numPageWin = 1;
  clickToResetBtn = false;

  constructor() {
    this.checkFirstLoad();
    this.changeView();

    this.setCallbackForCreateBtn();
    this.setCallbackForGenerateBtn();
    this.setCallbackForUpdateBtn();
    this.setCallbackForResetBtn();
    this.setCallbackForRaceBtn();
    this.toWinnersBtn();
    this.toGarageBtn();

    this.setCallbackForGaragePrevNextBtn();
    this.setCallbackForWinnersPrevNextBtn();

    this.setCallbackForWinnersHeader();
  }

  private changeView(): void {
    this.header = new HeaderView({ tag: 'header', classNames: ['header'] });
    this.main = new MainView({ tag: 'main', classNames: ['main'] });

    this.wrapper = new PageWrapperView({ classNames: ['wrapper'] });
    this.wrapper.appendElems([this.header.getHTMLElement(), this.main.getHTMLElement()]);
    document.body.prepend(this.wrapper.getHTMLElement());
  }

  async drawItems(curNumberPage: number) {
    const itemsResponse = await this.apiRequest.getItems(curNumberPage);
    this.main.garageView.itemsWrapperView.clearWrapper();
    itemsResponse.items.forEach((item) => {
      const currentItem = new ItemView(item);
      currentItem.itemRoad.itemBtnWrapper.itemBtnStop.getButtonElement().disabled = true;
      currentItem.setCallback((event) => {
        this.targetAction(event);
      });
      this.main.garageView.itemsWrapperView.appendElems([currentItem.getHTMLElement()]);
    });
    this.getItemsInGarage();
    this.getGarageNumberPage();
    this.addBannerWinnerActive(Visibility.REMOVE);
  }

  targetAction(event?: Event) {
    if (event && event?.currentTarget instanceof HTMLElement && event.target instanceof HTMLElement) {
      const currentTarget = event.currentTarget;
      const id = currentTarget.dataset.id;
      const target = event.target;
      if (typeof id === 'string') {
        this.setInputValues(id, target, currentTarget);
        this.deleteItem(id, target);
        this.startDrive(id, target, currentTarget);
        this.stopDrive(id, target, currentTarget);
      }
    }
  }

  async setCallbackForRaceBtn() {
    this.header.nav.navItemStatus.btnRace.setCallback(async (event) => {
      this.resetAllItems();
      const idItems = await this.apiRequest.getItems(this.curNumberPage);
      const target = event?.target;
      const successfulResponses = new Set();
      this.clickToResetBtn = false;
      if (target instanceof HTMLButtonElement) {
        target.disabled = true;
      }
      const promises = idItems.items.map(async (item) => {
        const currentTarget = this.main.garageView.itemsWrapperView
          .getHTMLElement()
          .querySelector(`[data-id="${item.id}"]`);
        const stopBtn = currentTarget?.querySelector('.stop');
        const startBtn = currentTarget?.querySelector('.start');
        if (stopBtn instanceof HTMLButtonElement && startBtn instanceof HTMLButtonElement) {
          stopBtn.disabled = false;
          startBtn.disabled = true;
        }
        if (target instanceof HTMLElement && currentTarget instanceof HTMLElement) {
          const started = await this.apiRequest.engineStatus(item.id, StatusEngineParam.STATUS_STARTED);
          const drived = this.apiRequest.engineDriveMode(item.id);
          this.startItemAnim(drived, started.distance / started.velocity, currentTarget);
          if ((await drived).success && successfulResponses.size < 1) {
            const drivedForWin = {
              id: item.id,
              response: await drived,
              velocity: started.velocity,
              distance: started.distance,
            };
            successfulResponses.add(drivedForWin);
            const winner = successfulResponses.values().next().value;
            await this.addWinner(winner);
            return drivedForWin;
          }
        }
      });
      await Promise.all(promises);
    });
  }

  async addWinner(winner: { id: number; response: { success: true }; velocity: number; distance: number }) {
    if (!this.clickToResetBtn && winner) {
      const checkHaveWinner = await this.apiRequest.getWinner(winner.id);
      const time = Math.round(winner.distance / winner.velocity);
      if (Object.keys(checkHaveWinner).length === 0) {
        await this.apiRequest.createWinner({ id: winner.id, wins: 1, time: time });
        await this.addBanerWinner(winner.id, time);
      } else {
        if (time > checkHaveWinner.time) {
          await this.apiRequest.updateWinner(winner.id, { id: winner.id, wins: checkHaveWinner.wins + 1, time: time });
          await this.addBanerWinner(winner.id, time);
        } else {
          await this.apiRequest.updateWinner(winner.id, {
            id: winner.id,
            wins: checkHaveWinner.wins + 1,
            time: checkHaveWinner.time,
          });
          await this.addBanerWinner(winner.id, checkHaveWinner.time);
        }
      }
    }
  }

  async addBanerWinner(id: number, time: number) {
    const winnerData = await this.apiRequest.getItem(id);
    this.addBannerWinnerActive(Visibility.ACTIVE);
    this.main.banner.getHTMLElement().innerHTML = `${winnerData.name} came first (${time}ms)!`;
  }

  addBannerWinnerActive(visible: Visibility) {
    if (visible === Visibility.ACTIVE) {
      this.main.banner.getHTMLElement().classList.add(Visibility.ACTIVE);
    } else {
      this.main.banner.getHTMLElement().classList.remove(Visibility.ACTIVE);
    }
  }

  setInputValues(id: string, target?: HTMLElement, currentTarget?: HTMLElement) {
    if (target?.classList.contains('select')) {
      const itemName = currentTarget?.querySelector('.item__name');
      const itemColor = currentTarget?.querySelector('.svg_color')?.getAttribute('fill');
      if (itemName) {
        this.header.nav.navItemParam.formUpdate.updateTextParam.updateInputTextParam(itemName.innerHTML);
      }
      if (itemColor) {
        this.header.nav.navItemParam.formUpdate.updateColorparam.updateColorparam(itemColor);
      }
      this.header.nav.navItemParam.formUpdate.currentItem = Number(id);
    }
  }

  async deleteItem(id: string, target: HTMLElement) {
    if (target.classList.contains('remove')) {
      await this.apiRequest.deleteItem(Number(id));
      await this.apiRequest.deleteWinner(Number(id));
      this.drawItems(this.curNumberPage);
    }
  }

  async startDrive(id: string, target?: HTMLElement, currentTarget?: HTMLElement) {
    const stopBtn = currentTarget?.querySelector('.stop');
    if (stopBtn instanceof HTMLButtonElement) {
      stopBtn.disabled = false;
    }
    if (target?.classList.contains('start') || target?.classList.contains('race')) {
      const statusStarted = await this.apiRequest.engineStatus(Number(id), StatusEngineParam.STATUS_STARTED);
      const drived = this.apiRequest.engineDriveMode(Number(id));
      const time = statusStarted.distance / statusStarted.velocity; //ms
      this.startItemAnim(drived, time, currentTarget, target);
      if (target instanceof HTMLButtonElement) {
        target.disabled = true;
      }
    }
  }

  async startItemAnim(
    drived: Promise<EngineDriveModeResponse>,
    time: number,
    currentTarget?: HTMLElement,
    target?: HTMLElement
  ) {
    const cat = currentTarget?.querySelector('.cat');
    if (cat instanceof HTMLElement) {
      cat.style.transition = `left ${time}ms linear`;
      if (window.innerWidth > 750) {
        cat.style.left = `${window.innerWidth - 150 - 191.94}px`;
        if ((await drived).success === false) {
          cat.style.left = `${cat.getBoundingClientRect().left - 191.94}px`;
          cat.style.transition = '';
        }
      } else {
        cat.style.left = `${window.innerWidth - 100}px`;
        if ((await drived).success === false) {
          cat.style.left = `${cat.getBoundingClientRect().left}px`;
          cat.style.transition = '';
        }
      }
      if (target instanceof HTMLButtonElement) {
        target.disabled = false;
      }
    }
  }

  async stopDrive(id: string, target?: HTMLElement, currentTarget?: HTMLElement) {
    if (target?.classList.contains('stop')) {
      await this.apiRequest.engineStatus(Number(id), StatusEngineParam.STATUS_STOPPED);
      const cat = currentTarget?.querySelector('.cat');
      if (cat instanceof HTMLElement) {
        cat.style.left = '0px';
        cat.style.transition = '';
      }
      if (target instanceof HTMLButtonElement) {
        target.disabled = true;
      }
    }
  }

  async setCallbackForCreateBtn() {
    const formCreate = this.header.nav.navItemParam.formCreate;
    const btn = formCreate.createItemBtn;
    btn.setCallback(async (event) => {
      event?.preventDefault();
      const itemName = formCreate.createTextParam.getInputValue();
      const itemColor = formCreate.createColorparam.getInputValue();
      if (typeof itemName === 'string' && typeof itemColor === 'string') {
        await this.apiRequest.createItem({
          name: itemName,
          color: itemColor,
        });
      }
      this.drawItems(this.curNumberPage);
    });
  }

  async setCallbackForUpdateBtn() {
    const formUpdate = this.header.nav.navItemParam.formUpdate;
    const btn = formUpdate.updateItemBtn;
    btn.setCallback(async (event) => {
      event?.preventDefault();
      const itemName = formUpdate.updateTextParam.getInputValue();
      const itemColor = formUpdate.updateColorparam.getInputValue();
      const id = this.header.nav.navItemParam.formUpdate.currentItem;
      if (typeof itemName === 'string' && typeof itemColor === 'string') {
        await this.apiRequest.updateItem(id, {
          name: itemName,
          color: itemColor,
        });
      }
      this.drawItems(this.curNumberPage);
    });
  }

  generateRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`;
  }

  generateRandomName() {
    const breed = [
      'Abyssinian',
      'Angora',
      'Bengal',
      'Persian',
      'Siamese',
      'Siberian',
      'Sphynx',
      'Aegean',
      'Somali',
      'Toyger',
    ];
    const nameCat = ['Tiger', 'Smokey', 'Felix', 'Catexus', 'Leo', 'Shiro', 'Chibi', 'Sakura', 'Kotetsu', 'Catesla'];
    return `${breed[Math.floor(Math.random() * breed.length)]} ${nameCat[Math.floor(Math.random() * nameCat.length)]}`;
  }

  async generateItemsPack(num: number) {
    for (let index = 0; index < num; index += 1) {
      await this.apiRequest.createItem({
        name: this.generateRandomName(),
        color: this.generateRandomColor(),
      });
    }
  }

  setCallbackForGenerateBtn() {
    this.header.nav.navItemStatus.btnGenerate.setCallback(async () => {
      await this.generateItemsPack(100);
      this.getItemsInGarage();
      this.drawItems(this.curNumberPage);
    });
  }

  async clearItemsInGarage() {
    await this.apiRequest.clearGarage();
  }

  async clearItemsInWinners() {
    await this.apiRequest.clearWinners();
  }

  async checkFirstLoad() {
    if (!localStorage.getItem('firstLoad')) {
      localStorage.setItem('firstLoad', 'true');
      await this.clearItemsInGarage();
      await this.clearItemsInWinners();
      await this.generateItemsPack(4);
    }
    this.drawItems(this.curNumberPage);
  }

  async toWinnersBtn() {
    this.header.nav.navItemState.toWinners.setCallback(async (event) => {
      event?.preventDefault();
      this.changeVisebility(Visibility.ACTIVE);
      this.getWinnersForTable(this.numPageWin);
    });
  }

  async getWinnersForTable(numPageWin: number, sort?: Sort, order?: Order) {
    this.main.winnersView.tableWinners.itemsTableWinners.getHTMLElement().innerHTML = '';
    const winners = await this.apiRequest.getWinners(numPageWin, sort, order);
    this.main.winnersView.winTitle.setCount(Number(winners.count));
    this.main.winnersView.numPage.setCount(numPageWin);
    winners.data.forEach((winner, i) => {
      const currentItem = new ItemWinners(winner, i);
      this.main.winnersView.tableWinners.itemsTableWinners.appendElems([currentItem.getHTMLElement()]);
    });
  }

  async toGarageBtn() {
    this.header.nav.navItemState.toGarage.setCallback((event) => {
      event?.preventDefault();
      this.changeVisebility(Visibility.REMOVE);
    });
  }

  changeVisebility(visible: Visibility) {
    if (visible === Visibility.ACTIVE) {
      this.wrapper.getHTMLElement().classList.add(Visibility.ACTIVE);
    } else {
      this.wrapper.getHTMLElement().classList.remove(Visibility.ACTIVE);
    }
  }

  async resetAllItems() {
    const items = Array.from(this.main.garageView.itemsWrapperView.getHTMLElement().children);
    items.forEach(async (item) => {
      if (item instanceof HTMLElement) {
        const stopBtn = item.querySelector('.stop');
        const startBtn = item.querySelector('.start');
        if (stopBtn instanceof HTMLButtonElement && startBtn instanceof HTMLButtonElement) {
          stopBtn.disabled = true;
          startBtn.disabled = false;
        }
        this.apiRequest.engineStatus(Number(item.dataset.id), StatusEngineParam.STATUS_STOPPED);
        const cat = item.querySelector('.cat');
        if (cat instanceof HTMLElement) {
          cat.style.left = '0px';
          cat.style.transition = '';
        }
      }
    });
    this.addBannerWinnerActive(Visibility.REMOVE);
  }

  async setCallbackForResetBtn() {
    this.header.nav.navItemStatus.btnReset.setCallback(() => {
      this.header.nav.navItemStatus.btnRace.getButtonElement().disabled = false;
      this.clickToResetBtn = true;
      this.resetAllItems();
    });
  }

  async getItemsInGarage() {
    const allItems = await this.apiRequest.getAllItems();
    this.main.garageView.garageTitleView.setCount(allItems.length);
  }

  getGarageNumberPage() {
    this.main.garageView.garageNumPageView.countPage = this.curNumberPage;
    this.main.garageView.garageNumPageView.setCount(this.curNumberPage);
  }

  setCallbackForGaragePrevNextBtn() {
    this.main.garageView.btnWrapper.setCallback((event?: Event) => {
      if (event && event.target instanceof HTMLElement) {
        this.prevGarageBtn(event.target);
        this.nextGarageBtn(event.target);
      }
    });
  }

  prevGarageBtn(target: HTMLElement) {
    if (target.classList.contains('btn-garage__prev')) {
      if (this.curNumberPage > 1) {
        this.curNumberPage -= 1;
        this.drawItems(this.curNumberPage);
      }
    }
  }

  async nextGarageBtn(target: HTMLElement) {
    if (target.classList.contains('btn-garage__next')) {
      const allItems = await this.apiRequest.getAllItems();
      if (this.curNumberPage < Math.ceil(allItems.length / QueryParamLimits.GARAGE_LIMIT)) {
        this.curNumberPage += 1;
        this.drawItems(this.curNumberPage);
      }
    }
  }

  setCallbackForWinnersPrevNextBtn() {
    this.main.winnersView.buttonsWinners.setCallback((event?: Event) => {
      if (event && event.target instanceof HTMLElement) {
        this.prevWinnersBtn(event.target);
        this.nextWinnersBtn(event.target);
      }
    });
  }

  prevWinnersBtn(target: HTMLElement) {
    if (target.classList.contains('winner__prev')) {
      if (this.numPageWin > 1) {
        this.numPageWin -= 1;
        this.getWinnersForTable(this.numPageWin);
      }
    }
  }

  async nextWinnersBtn(target: HTMLElement) {
    if (target.classList.contains('winner__next')) {
      const allItems = await this.apiRequest.getAllWinners();
      if (this.numPageWin < Math.ceil(allItems.length / QueryParamLimits.WINNERS_LIMIT)) {
        this.numPageWin += 1;
        this.getWinnersForTable(this.numPageWin);
      }
    }
  }

  async setCallbackForWinnersHeader() {
    this.main.winnersView.tableWinners.headerTableWinners.setCallback(async (event?: Event) => {
      if (event && event.target instanceof HTMLElement) {
        await this.winsSort(event.target);
        await this.bestTimeSort(event.target);
      }
    });
  }

  async winsSort(target: HTMLElement) {
    if (target.closest('.sort-wins')) {
      target.closest('.sort-wins')?.classList.add('active');
      target.closest('.sort-wins')?.classList.toggle('ascending');
      if (target.closest('.sort-wins')?.classList.contains('ascending')) {
        await this.getWinnersForTable(this.numPageWin, Sort.WINS, Order.ASC);
      } else {
        await this.getWinnersForTable(this.numPageWin, Sort.WINS, Order.DESC);
      }
    }
  }

  async bestTimeSort(target: HTMLElement) {
    if (target.closest('.sort-time')) {
      target.closest('.sort-time')?.classList.add('active');
      target.closest('.sort-time')?.classList.toggle('ascending');
      if (target.closest('.sort-time')?.classList.contains('ascending')) {
        await this.getWinnersForTable(this.numPageWin, Sort.TIME, Order.ASC);
      } else {
        await this.getWinnersForTable(this.numPageWin, Sort.TIME, Order.DESC);
      }
    }
  }
}
