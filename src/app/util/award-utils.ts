import AwardRecipient from '../models/AwardRecipient';

export class AwardSorter {

  constructor() {
  }

  public sort(items: AwardRecipient[]) {
    items.sort(function (a, b) {
      return (a.award.displayOrder > b.award.displayOrder) ? 1 : ((b.award.displayOrder > a.award.displayOrder) ? -1 : 0);
    });
    return items;
  }
}
