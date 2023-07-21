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

  async test() {
    // this.clearGarage();
    const dff = await this.getAllItems();
    console.log(dff, 'dfs');
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

  async TryCatchMethod<T>(method: () => Promise<T>, name: string): Promise<T> {
    try {
      return await method();
    } catch (error) {
      console.log(name, error);
      throw error;
    }
  }

  // _______________ с использованием TryCatchMethod ______________
  async getAllItems(): Promise<Item[]> {
    return await this.TryCatchMethod<Item[]>(async () => {
      return await (await fetch(`${Path.GARAGE}`)).json();
    }, 'getAllItems');
  }

  // async getAllItems(): Promise<Item[]> {
  //   try {
  //     return await (await fetch(`${Path.GARAGE}`)).json();
  //   } catch (error) {
  //     console.log('getAllItems', error);
  //     throw error;
  //   }
  // }

  async clearGarage(): Promise<void> {
    const allItems = await this.getAllItems();
    console.log(allItems[0]);
    allItems.forEach((item: Item) => {
      this.deleteItem(item.id);
    });
  }

  // _______________ с использованием TryCatchMethod ______________
  // async getItems(pageNum: number): Promise<ItemsResponse> {
  //   return await this.TryCatchMethod<ItemsResponse>(async () => {
  //     const response = await fetch(`${Path.GARAGE}?_page=${pageNum}&_limit=${QueryParams.GARAGE_LIMIT}`);
  //     return {
  //       items: await response.json(),
  //       count: response.headers.get(HeadersResponse.X_TOTAL_COUNT),
  //     };
  //   }, 'getItems');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async getItem(id: number): Promise<ItemsResponse> {
  //   return await this.TryCatchMethod<ItemsResponse>(async () => {
  //     return await (await fetch(`${Path.GARAGE}/${id}`)).json();
  //   }, 'getItem');
  // }
  async getItem(id: number): Promise<ItemsResponse> {
    try {
      // console.log(await (await fetch(`${Path.GARAGE}/${id}`)).json());
      return await (await fetch(`${Path.GARAGE}/${id}`)).json();
    } catch (error) {
      console.log('getItem', error);
      throw error;
    }
  }

  // _______________ с использованием TryCatchMethod ______________
  // async createItem(body: Item): Promise<Item> {
  //   return await this.TryCatchMethod<Item>(async () => {
  //     return await (
  //       await fetch(`${Path.GARAGE}`, {
  //         method: HttpMetods.POST,
  //         headers: {
  //           'Content-Type': 'appliItemion/json',
  //         },
  //         body: JSON.stringify(body),
  //       })
  //     ).json();
  //   }, 'createItem');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async deleteItem(id: number): Promise<void> {
  //   return await this.TryCatchMethod<void>(async () => {
  //     await (
  //       await fetch(`${Path.GARAGE}/${id}`, {
  //         method: HttpMetods.DELETE,
  //       })
  //     ).json();
  //   }, 'deleteItem');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async updateItem(id: number, body: Item): Promise<Item> {
  //   return await this.TryCatchMethod<Item>(async () => {
  //     return await (
  //       await fetch(`${Path.GARAGE}/${id}`, {
  //         method: HttpMetods.PUT,
  //         headers: {
  //           'Content-Type': 'appliItemion/json',
  //         },
  //         body: JSON.stringify(body),
  //       })
  //     ).json();
  //   }, 'updateItem');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async engineStatus(id: number, status: QueryParams): Promise<EngineResponse> {
  //   return await this.TryCatchMethod<EngineResponse>(async () => {
  //     return await (
  //       await fetch(`${Path.ENGINE}?id=${id}&status=${status}`, {
  //         method: HttpMetods.PATCH,
  //       })
  //     ).json();
  //   }, 'engineStatus');
  // }
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

  // _______________ с использованием TryCatchMethod ______________
  // async engineDriveMode(id: number): Promise<EngineDriveModeResponse> {
  //   return await this.TryCatchMethod<EngineDriveModeResponse>(async () => {
  //     const response = await fetch(`${Path.ENGINE}?id=${id}&status=${QueryParams.STATUS_DRIVE}`, {
  //       method: 'PATCH',
  //     });
  //     return response.status !== 200 ? { success: false } : { ...(await response.json()) };
  //   }, 'engineDriveMode');
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

  // _______________ с использованием TryCatchMethod ______________
  // async getWinners(page: number, limit: number, sort?: Sort, order?: Order): Promise<Winners> {
  //   return await this.TryCatchMethod<Winners>(async () => {
  //     const response = await fetch(
  //       `${Path.WINNERS}?_page=${page}&_limit=${limit}${sort && order ? `&_sort=${sort}&_order=${order}` : ``}`
  //     );
  //     return {
  //       data: await response.json(),
  //       count: response.headers.get(HeadersResponse.X_TOTAL_COUNT),
  //     };
  //   }, 'getWinners');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async getWinner(id: number): Promise<Winner> {
  //   return await this.TryCatchMethod<Winner>(async () => {
  //     return await (await fetch(`${Path.WINNERS}/${id}`)).json();
  //   }, 'getWinner');
  // }

  async getWinner(id: number): Promise<Winner> {
    try {
      return await (await fetch(`${Path.WINNERS}/${id}`)).json();
    } catch (error) {
      console.log('getWinner', error);
      throw error;
    }
  }

  // _______________ с использованием TryCatchMethod ______________
  // async createWinner(body: Winner): Promise<Winner> {
  //   return await this.TryCatchMethod<Winner>(async () => {
  //     return (
  //       await fetch(`${Path.WINNERS}`, {
  //         method: HttpMetods.POST,
  //         body: JSON.stringify(body),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //     ).json();
  //   }, 'createWinner');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async deleteWinner(id: number): Promise<void> {
  //   return await this.TryCatchMethod<void>(async () => {
  //     return (
  //       await fetch(`${Path.WINNERS}/${id}`, {
  //         method: 'DELETE',
  //       })
  //     ).json();
  //   }, 'deleteWinner');
  // }

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

  // _______________ с использованием TryCatchMethod ______________
  // async updateWinner(id: number, body: Winner): Promise<Winner> {
  //   return await this.TryCatchMethod<Winner>(async () => {
  //     return (
  //       await fetch(`${Path.WINNERS}/${id}`, {
  //         method: HttpMetods.PUT,
  //         body: JSON.stringify(body),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //     ).json();
  //   }, 'updateWinner');
  // }

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
