import { makeAutoObservable } from "mobx";

class SearchStore {
  searchDashboard = "";
  totalPaymentFee = 0;
  totalPrice = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchDashboard(query: string) {
    this.searchDashboard = query;
  }

  setTotalPaymentFee(fee: number) {
    this.totalPaymentFee = fee;
  }

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }
}

const searchStore = new SearchStore();
export default searchStore;
