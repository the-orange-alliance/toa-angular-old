export default class VirtualScroll<T> {
  private _containerHeight: number;
  private _rowHeight: number;
  private _listItems: T[];
  private _scrollPosition: number;

  constructor(containerHeight: number, rowHeight: number, listItems: T[]) {
    this._containerHeight = containerHeight;
    this._rowHeight = rowHeight;
    this._listItems = listItems;
    this._scrollPosition = 0;
  }

  public getRenderedItems(): T[] {
    return this._listItems.slice(this.getStartIndex(), this.getEndIndex());
  }

  public getTopOffset(): number {
    return this.getStartIndex() * this._rowHeight;
  }

  public getListHeight(): number {
    return this.listItems.length * this._rowHeight;
  }

  public getStartIndex(): number {
    return Math.floor(this.scrollPosition / this._rowHeight);
  }

  public getEndIndex(): number {
    return Math.ceil((this.scrollPosition + this._containerHeight) / this._rowHeight);
  }

  get scrollPosition(): number {
    return this._scrollPosition;
  }

  set scrollPosition(value: number) {
    this._scrollPosition = value;
  }

  get listItems(): T[] {
    return this._listItems;
  }

  set listItems(value: T[]) {
    this._listItems = value;
  }
}
