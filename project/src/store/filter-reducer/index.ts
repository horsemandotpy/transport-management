import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  goodsData: [],
  filteredGoods: [],
  goodsAllClients: [],
  goodsWarehouse: [],
  selectedCustomerItems: [],
  selectedWarehouseItems: [],
  setCustomerIds: [],
  setWarehouseIds: [],
  transDate: {
    fromDate: "2023-10-11",
    toDate: "2023-10-13",
  },
  numberpage: 10,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    storeSetGoodsData: (state: any, { payload }: PayloadAction<any>) => {
      state.goodsData = payload;
    },
    storeSetGoodsAllClients: (state: any, { payload }: PayloadAction<any>) => {
      state.goodsAllClients = payload;
    },
    storeSetGoodsWareHouse: (state: any, { payload }: PayloadAction<any>) => {
      state.goodsWarehouse = payload;
    },
    storeSetFilteredGoods: (state: any, { payload }: PayloadAction<any>) => {
      state.filteredGoods = payload;
    },
    storeSetSelectedCustomerItems: (
      state: any,
      { payload }: PayloadAction<any>
    ) => {
      state.selectedCustomerItems = payload;
    },
    storeSetSelectedWarehouseItems: (
      state: any,
      { payload }: PayloadAction<any>
    ) => {
      state.selectedWarehouseItems = payload;
    },
    storeSetSetCustomerIds: (state: any, { payload }: PayloadAction<any>) => {
      state.setCustomerIds = payload;
    },
    storeSetSetWarehouseIds: (state: any, { payload }: PayloadAction<any>) => {
      state.setWarehouseIds = payload;
    },
    storeSetTransDate: (state: any, { payload }: PayloadAction<any>) => {
      state.transDate = payload;
    },
    storeSetNumberPage: (state: any, { payload }: PayloadAction<any>) => {
      state.numberpage = payload;
    },
  },
});

export const {
  storeSetGoodsData,
  storeSetGoodsAllClients,
  storeSetGoodsWareHouse,
  storeSetFilteredGoods,
  storeSetSelectedCustomerItems,
  storeSetSelectedWarehouseItems,
  storeSetSetCustomerIds,
  storeSetSetWarehouseIds,
  storeSetTransDate,
  storeSetNumberPage,
} = filterSlice.actions;
export default filterSlice.reducer;
