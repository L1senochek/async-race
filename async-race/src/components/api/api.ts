import {
  Item,
  ItemsResponse,
  HttpMetods,
  Path,
  HeadersResponse,
  QueryParams,
  EngineResponse,
  EngineDriveModeResponse,
  Sort,
  Order,
  Winner,
  Winners,
} from '../../types/api/api';

// const testItem = { name: 'string', color: 'string', id: 4 };
export class ApiRequest {
  constructor() {}

  test() {
    // this.clearGarage();
    this.getAllItems();
    this.engineStatus(6, QueryParams.STATUS_STARTED);
    this.engineDriveMode(6);
    this.getWinner(1);
    this.getWinners(1, 1);
    this.deleteWinner(1);
    // this.startItemEngine(1);
    // this.stopItemEngine(1);
    // this.deleteItem(6);
    // this.createItem(testItem);
    // this.getItem(6);
  }
  // private async TryCatchFetch<T>(url: string, options?: RequestInit): Promise<T> {
  //   try {
  //     const response = await fetch(url, options);
  //     if (!response.ok) {
  //       throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.log('Error: ', error);
  //     throw error;
  //   }
  // }

  // async getAllItems(): Promise<Item[]> {
  //   return await this.TryCatchFetch<Item[]>(`${Path.GARAGE}`);
  // }

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
    console.log(allItems[0]);
    allItems.forEach((item: Item) => {
      this.deleteItem(item.id);
    });
  }

  async getItems(pageNum: number): Promise<ItemsResponse> {
    try {
      const response = await fetch(`${Path.GARAGE}?_page=${pageNum}&_limit=${QueryParams.GARAGE_LIMIT}`);
      console.log(response.json());
      return {
        items: await response.json(),
        count: response.headers.get(HeadersResponse.X_TOTAL_COUNT),
      };
    } catch (error) {
      console.log('getItems', error);
      throw error;
    }
  }

  async getItem(id: number): Promise<ItemsResponse> {
    try {
      // console.log(await (await fetch(`${Path.GARAGE}/${id}`)).json());
      return await (await fetch(`${Path.GARAGE}/${id}`)).json();
    } catch (error) {
      console.log('getItem', error);
      throw error;
    }
  }

  async createItem(body: Item): Promise<Item> {
    try {
      return await (
        await fetch(`${Path.GARAGE}`, {
          method: HttpMetods.POST,
          headers: {
            'Content-Type': 'appliItemion/json',
          },
          body: JSON.stringify(body),
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

  async updateItem(id: number, body: Item): Promise<Item> {
    try {
      return await (
        await fetch(`${Path.GARAGE}/${id}`, {
          method: HttpMetods.PUT,
          headers: {
            'Content-Type': 'appliItemion/json',
          },
          body: JSON.stringify(body),
        })
      ).json();
    } catch (error) {
      console.log('updateItem', error);
      throw error;
    }
  }

  // engineStatus
  async engineStatus(id: number, status: QueryParams): Promise<EngineResponse> {
    try {
      const response = await (
        await fetch(`${Path.ENGINE}?id=${id}&status=${status}`, {
          method: HttpMetods.PATCH,
        })
      ).json();
      console.log('222222222222', response);
      return response;
    } catch (error) {
      console.log('engineStatus', error);
      throw error;
    }
  }

  // async startItemEngine(id: number): Promise<EngineResponse> {
  //   try {
  //     const response = await (
  //       await fetch(`${Path.ENGINE}?id=${id}&status=started`, {
  //         method: HttpMetods.PATCH,
  //       })
  //     ).json();
  //     console.log('222222222222', response);
  //     return response;
  //   } catch (error) {
  //     console.log('startItemEngine', error);
  //     throw error;
  //   }
  // }

  // async stopItemEngine(id: number) {
  //   const response = await (
  //     await fetch(`${Path.ENGINE}?id=${id}&status=stopped`, {
  //       method: HttpMetods.PATCH,
  //     })
  //   ).json();
  //   console.log('333333333333', response);

  //   return response;
  // }
  async engineDriveMode(id: number): Promise<EngineDriveModeResponse> {
    try {
      const response = await fetch(`${Path.ENGINE}?id=${id}&status=${QueryParams.STATUS_DRIVE}`, {
        method: 'PATCH',
      });
      return response.status !== 200 ? { success: false } : { ...(await response.json()) };
    } catch (error) {
      console.log('engineDriveMode', error);
      throw error;
    }
  }

  async getWinners(page: number, limit: number, sort?: Sort, order?: Order): Promise<Winners> {
    try {
      const response = await fetch(
        `${Path.WINNERS}?_page=${page}&_limit=${limit}${sort && order ? `&_sort=${sort}&_order=${order}` : ``}`
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
