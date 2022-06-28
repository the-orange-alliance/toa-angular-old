import { Injectable } from '@angular/core';
import Ranking from '../models/Ranking';

@Injectable()
export class RankingSorter {

  public byRank(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => a.rank - b.rank);
    }
  }

  public byTeam(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => a.team.teamNumber - b.team.teamNumber);
    }
  }

  public byAverageRP(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => b.rankingPoints / b.played - a.rankingPoints / a.played);
    }
  }

  public byOpr(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => b.opr - a.opr);  // note sort descending
    }
  }

  public byNpOpr(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => b.npOpr - a.npOpr);  // note sort descending
    }
  }
}
