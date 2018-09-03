/**
 * Created by Kyle Flynn on 5/28/2017.
 */
export class MatchType {

  /*
   0 - Practice Match
   1 - Qualification Match
   21 - Quarterfinals Series 1
   22 - Quarterfinals Series 2
   23 - Quarterfinals Series 3
   24 - Quarterfinals Series 4
   31 - Semifinals Series 1
   32 - Semifinals Series 2
   4 Finals
  */

  static PRACTICE_MATCH = 0;
  static QUALS_MATCH = 1;
  static QUARTERS_MATCH_1 = 21;
  static QUARTERS_MATCH_2 = 22;
  static QUARTERS_MATCH_3 = 23;
  static QUARTERS_MATCH_4 = 24;
  static SEMIS_MATCH_1 = 31;
  static SEMIS_MATCH_2 = 32;
  static FINALS_MATCH = 4;

}

export class MatchParser {

  match_data: any;

  constructor(match_data: any) {
    // 1617-FIM-CMP0-E002
    this.match_data = match_data;
  }

  getSeasonID(): string {
    return this.match_data.match_key.toString().split('-')[0];
  }

  getRegionID(): string {
    return this.match_data.match_key.toString().split('-')[1];
  }

  getEventID(): string {
    const split = this.match_data.match_key.toString().split('-');
    return split[0] + '-' + split[1] + '-' + split[2];
  }

  toString() {
    let output = '';

    switch (this.match_data.tournament_level) {
      case MatchType.PRACTICE_MATCH:
        output += 'Practice Match ';
        break;
      case MatchType.QUALS_MATCH:
        output += 'Qual Match ';
        break;
      case MatchType.QUARTERS_MATCH_1:
        output += 'Quarters Series 1 Match ';
        break;
      case MatchType.QUARTERS_MATCH_2:
        output += 'Quarters Series 2 Match ';
        break;
      case MatchType.QUARTERS_MATCH_3:
        output += 'Quarters Series 3 Match ';
        break;
      case MatchType.QUARTERS_MATCH_4:
        output += 'Quarters Series 4 Match ';
        break;
      case MatchType.SEMIS_MATCH_1:
        output += 'Semis Series 1 Match ';
        break;
      case MatchType.SEMIS_MATCH_2:
        output += 'Semis Series 2 Match ';
        break;
      case MatchType.FINALS_MATCH:
        output += 'Finals Match ';
        break;
    }
    output += this.getMatchNumber();
    return output;
  }

  getMatchNumber(): number {
    const match_string = this.match_data.match_key.toString().split('-')[3];
    const match_number = match_string.substring(1, match_string.length);
    let number = '';
    for (let i = 0; i < match_number.length; i++) {
      if (match_number[i] !== '0') {
        number =  match_number.substring(i, match_number.length);
        break;
      }
    }
    return parseInt(number, 10);
  }

}

export class MatchSorter {

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
    const pivotValue = items[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      // -1 means items[i] < pivotValue, 1 means items[i] > pivotValue
      if (this.shouldSwap(items[i], pivotValue) === -1) {
        this.swap(items, i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(items, right, partitionIndex);
    return partitionIndex;
  }

  private swap(items, index1, index2) {
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }

  private shouldSwap(match1, match2) {
    const parser_1 = new MatchParser(match1);
    const parser_2 = new MatchParser(match2);

    if (match1.tournament_level === match2.tournament_level) {
      return parser_1.getMatchNumber() < parser_2.getMatchNumber() ? -1 : 1;
    } else {
      if (match1.tournament_level === MatchType.FINALS_MATCH) {
        return 1;
      }
      if (match2.tournament_level === MatchType.FINALS_MATCH) {
        return -1;
      }
      return match1.tournament_level < match2.tournament_level ? -1 : 1;
    }

  }

}
