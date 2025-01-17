import { makeAutoObservable } from "mobx";

class SearchStore {
  searchDashboard = "";
  searchFilial = "";
  searchArxive = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchDashboard(query: string) {
    this.searchDashboard = query;
  }

  setSearchFilial(query: string) {
    this.searchFilial = query;
  }

  setSearchArxive(query: string) {
    this.searchArxive = query;
  }
}

const searchStore = new SearchStore();
export default searchStore;
