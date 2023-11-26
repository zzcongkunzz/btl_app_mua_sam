import SORT_TYPE from "../../constant/sortType";

export const initStoreReducer = {
    ACCESS_TOKEN: null,
    roles: null,
    user: null,
    criteria:{
        nameProductOrCategory: null,
        category: [],
        sortBy:  SORT_TYPE.NEW,
    },
    listCart: [],
    cartNotication: 0,
    listProduct: [],
    pageIndex: 'Home',
    pageHistory: ['/'],
};
