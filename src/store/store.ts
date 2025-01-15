import { makeAutoObservable } from "mobx";

class SearchStore {
  searchDashboard = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchDashboard(query: string) {
    this.searchDashboard = query;
  }
}

const searchStore = new SearchStore();
export default searchStore;
