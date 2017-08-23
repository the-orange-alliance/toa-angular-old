export class RankSorter {

  constructor() {}

  public sort(items, left, right) {
    let pivot, partitionIndex;

    if (left < right) {
      pivot = right;
      partitionIndex = this.partition(items, pivot, left, right);

      this.sort(items, left, partitionIndex - 1);
      this.sort(items, partitionIndex + 1, right);
    }

    return items;
  }

  private partition(items, pivot, left, right) {
    let pivotValue = items[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      // -1 means items[i] < pivotValue, 1 means items[i] > pivotValue
      if (items[i].Rank < pivotValue.rank) {
        this.swap(items, i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(items, right, partitionIndex);
    return partitionIndex;
  }

  private swap(items, index1, index2) {
    let temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }

}
