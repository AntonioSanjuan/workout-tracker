export interface Pagination<T> {
    pageElements: number
    moreElements: boolean,
    lastElement?: T
}