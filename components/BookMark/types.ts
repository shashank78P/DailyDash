export interface BookMarkContextDto {
    showInnerPage: boolean, 
    setShowInnerPage: Function,
    isCardView: boolean,
    setIsCardView: Function,
    handelSelectAndEdit: Function,
    isEdit: boolean,
    setIsEdit: Function,
    selected: any,
    setSelected: Function,
    selectedTab: string,
    setSelectedTab: Function,
    createBookMark: boolean,
    setCreateBookMark: Function,
    selectedId : string | null,
    setSelectedId: Function,
    search : string ,
    setSearch : Function,
    rows : string,
    setRows : Function,
    page : string,
    setPage : Function,
    status:string,
    setStatus:Function,
    openFilter : boolean,
    setOpenFilter : Function,
    sortBy : string,
    setSortBy : Function,
    sortOrder : number,
    setSortOrder : Function,
    fromDate : Date,
    setFromDate :Function
    toDate : Date,
    setToDate :Function
}

export const bookMarkPrioirityStyle: any = {
    "HIGH": "text-purple-700 bg-purple-200 p-2 rounded-lg",
    "MEDIUM": "text-orange-700 bg-orange-200 p-2 rounded-lg",
    "LOW": "text-yellow-700 bg-yellow-200 p-2 rounded-lg"
}