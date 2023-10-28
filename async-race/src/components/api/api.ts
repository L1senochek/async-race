import {
  CreateItem,
  EngineDriveModeResponse,
  EngineResponse,
  HeadersResponse,
  HttpMetods,
  HttpStatusCodes,
  Item,
  ItemsResponse,
  Order,
  Path,
  QueryParamLimits,
  Sort,
  StatusEngineParam,
  Winner,
  Winners,
} from '../../types/api/api';

export class ApiRequest {
  constructor() {}
  async getAllItems(): Promise<Item[]> {
    try {
      return await (await fetch(`${Path.GARAGE}`)).json();
    } catch (error) {
      console.log('getAllItems', error);
      throw error;
    }
  }

  async clearGarage(): Promise<void> {
    const allItems = await this.getAllItems();
    allItems.forEach((item: Item) => {
      this.deleteItem(item.id);
    });
  }

  async clearWinners(): Promise<void> {
    const allWinners = await this.getAllWinners();
    allWinners.forEach((item: Winner) => {
      this.deleteWinner(item.id);
    });
  }

  async getAllWinners(): Promise<Winner[]> {
    try {
      return (await fetch(`${Path.WINNERS}`)).json();
    } catch (error) {
      console.log('getWinners', error);
      throw error;
    }
  }

  async getItems(pageNum: number): Promise<ItemsResponse> {
    try {
      const response = await fetch(`${Path.GARAGE}?_page=${pageNum}&_limit=${QueryParamLimits.GARAGE_LIMIT}`);
      return {
        items: await response.json(),
        count: response.headers.get(HeadersResponse.X_TOTAL_COUNT),
      };
    } catch (error) {
      console.log('getItems', error);
      throw error;
    }
  }

  async getItem(id: number): Promise<Item> {
    try {
      return await (await fetch(`${Path.GARAGE}/${id}`)).json();
    } catch (error) {
      console.log('getItem', error);
      throw error;
    }
  }

  async createItem(body: CreateItem): Promise<Item> {
    try {
      return await (
        await fetch(`${Path.GARAGE}`, {
          method: HttpMetods.POST,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
    } catch (error) {
      console.log('createItem', error);
      throw error;
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      await (
        await fetch(`${Path.GARAGE}/${id}`, {
          method: HttpMetods.DELETE,
        })
      ).json();
    } catch (error) {
      console.log('deleteItem', error);
      throw error;
    }
  }

  async updateItem(id: number, body: CreateItem): Promise<Item> {
    try {
      return await (
        await fetch(`${Path.GARAGE}/${id}`, {
          method: HttpMetods.PUT,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      ).json();
    } catch (error) {
      console.log('updateItem', error);
      throw error;
    }
  }

  async engineStatus(id: number, status: StatusEngineParam): Promise<EngineResponse> {
    try {
      const response = await (
        await fetch(`${Path.ENGINE}?id=${id}&status=${status}`, {
          method: HttpMetods.PATCH,
        })
      ).json();
      return response;
    } catch (error) {
      console.log('engineStatus', error);
      throw error;
    }
  }

  async engineDriveMode(id: number): Promise<EngineDriveModeResponse> {
    try {
      const response = await fetch(`${Path.ENGINE}?id=${id}&status=${StatusEngineParam.STATUS_DRIVE}`, {
        method: 'PATCH',
      });
      return response.status !== HttpStatusCodes.OK ? { success: false } : { ...(await response.json()) };
    } catch (error) {
      console.log('engineDriveMode', error);
      throw error;
    }
  }

  async getWinners(page: number, sort?: Sort, order?: Order): Promise<Winners> {
    try {
      const response = await fetch(
        `${Path.WINNERS}?_page=${page}&_limit=${QueryParamLimits.WINNERS_LIMIT}${
          sort && order ? `&_sort=${sort}&_order=${order}` : ``
        }`
      );
      return {
        data: await response.json(),
        count: response.headers.get(HeadersResponse.X_TOTAL_COUNT),
      };
    } catch (error) {
      console.log('getWinners', error);
      throw error;
    }
  }

  async getWinner(id: number): Promise<Winner> {
    try {
      return await (await fetch(`${Path.WINNERS}/${id}`)).json();
    } catch (error) {
      console.log('getWinner', error);
      throw error;
    }
  }

  async createWinner(body: Winner): Promise<Winner> {
    try {
      return (
        await fetch(`${Path.WINNERS}`, {
          method: HttpMetods.POST,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
    } catch (error) {
      console.log('createWinner', error);
      throw error;
    }
  }

  async deleteWinner(id: number): Promise<void> {
    try {
      return (
        await fetch(`${Path.WINNERS}/${id}`, {
          method: 'DELETE',
        })
      ).json();
    } catch (error) {
      console.log('deleteWinner', error);
      throw error;
    }
  }

  async updateWinner(id: number, body: Winner): Promise<Winner> {
    try {
      return (
        await fetch(`${Path.WINNERS}/${id}`, {
          method: HttpMetods.PUT,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
    } catch (error) {
      console.log('updateWinner', error);
      throw error;
    }
  }
}
