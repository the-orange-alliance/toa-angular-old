export class MatchBreakdownConstants {
  trueValue = -1000;
  falseValue = -2000;
}

export class MatchBreakdownRow {
  isTitle: boolean;
  name: string;
  red: number | string;
  blue: number | string;
  redPoints: number;
  bluePoints: number;
  isVelocityVortexParking: boolean;
  isVelocityVortexCapBall: boolean;
  ultimateGoalWobble: boolean;
  freightFrenzyParking: boolean;
  freightFrenzyBarcodeElement: boolean;

  redIcon: string;
  blueIcon: string;

  constructor (isTitle: boolean,
               name: string,
               red: number | string,
               blue: number | string,
               redPoints: number,
               bluePoints: number,
               velocityVortexParking: boolean,
               velocityVortexCapBall: boolean,
               ultimateGoalWobble: boolean = false,
               freightFrenzyParking: boolean = false,
               freightFrenzyBarcodeElement: boolean = false
  ) {
    this.isTitle = isTitle;
    this.name = name;
    this.red = red;
    this.blue = blue;
    this.redPoints = redPoints;
    this.bluePoints = bluePoints;
    this.isVelocityVortexParking = velocityVortexParking;
    this.isVelocityVortexCapBall = velocityVortexCapBall;
    this.ultimateGoalWobble = ultimateGoalWobble;
    this.freightFrenzyParking = freightFrenzyParking;
    this.freightFrenzyBarcodeElement = freightFrenzyBarcodeElement;

    const constants = new MatchBreakdownConstants();
    this.redIcon = this.red === constants.trueValue ? 'check' : this.red === constants.falseValue ? 'close' : null;
    this.blueIcon = this.blue === constants.trueValue ? 'check' : this.blue === constants.falseValue ? 'close' : null;
  }

  getRedPoints(): string {
    if (this.isTitle) {
      return `${this.red} Points`
    } else {
      return this.getString(this.red, 'red');
    }
  }

  getBluePoints(): string {
    if (this.isTitle) {
      return `${this.blue} Points`
    } else {
      return this.getString(this.blue, 'blue');
    }
  }

  getString(s: number | string, alliance: 'red' | 'blue'): string {
    if (this.isVelocityVortexParking && typeof s === 'number') {
      return this.getVelocityVortexParkingString(s);
    } else if (this.isVelocityVortexCapBall && typeof s === 'number') {
      return this.getVelocityVortexCapBallString(s);
    } else if (this.ultimateGoalWobble && typeof s === 'number') {
      return this.getUltimateGoalWobbleString(s);
    } else if (this.freightFrenzyParking && typeof s === 'string') {
      return this.getFreightFrenzyParking(s);
    } else if (this.freightFrenzyBarcodeElement && typeof s === 'string') {
      return this.getFreightFrenzyBarcodeElement(s);
    } else {
      const constants = new MatchBreakdownConstants();
      const isTrue = s === constants.trueValue;
      const isFalse = s === constants.falseValue;
      const isTrueFalse = isTrue || isFalse;

      const name = !isTrueFalse ? s : '';
      let pts;
      if (alliance === 'red') {
        pts = (!isTrueFalse && typeof s === 'number') ? s * this.redPoints : isTrue ? this.redPoints : 0;
      } else {
        pts = (!isTrueFalse && typeof s === 'number') ? s * this.redPoints : isTrue ? this.redPoints : 0;
      }
      return s !== 0 && !isFalse ? `${name} (${pts > 0 ? '+' : ''}${pts})` : isFalse ? '' : '0';
    }
  }

  getVelocityVortexParkingString(key: number) {
    switch (key) {
      case 1:
        return 'On Center Vortex (+5)';
      case 2:
        return 'Completely On Center Vortex (+10)';
      case 3:
        return 'On Corner Ramp (+5)';
      case 4:
        return 'Completely On Corner Ramp (+10)';
    }
    return 'Not Parked';
  }

  getVelocityVortexCapBallString(key: number) {
    switch (key) {
      case 1:
        return 'Low (+10)';
      case 2:
        return 'High (+20)';
      case 3:
        return 'Capping (+40)';
    }
    return 'Not Scored';
  }

  getUltimateGoalWobbleString(key: number) {
    switch (key) {
      case 1:
        return 'Start Line (+5)';
      case 2:
        return 'Drop Zone (+20)';
      case 0:
        return 'Not Scored';
    }
    return 'Not Scored';
  }

  getFreightFrenzyBarcodeElement(key: string) {
    switch (key) {
      case 'DUCK':
        return 'Duck';
      case 'TEAM_SHIPPING_ELEMENT':
        return 'Team Shipping Element';
    }
    return 'Not Scored';
  }

  getFreightFrenzyParking(key: string) {
    switch (key) {
      case 'NONE':
        return 'None';
      case 'IN_WAREHOUSE':
        return 'Partially in Warehouse';
      case 'COMPLETELY_IN_WAREHOUSE':
        return 'Completely in Warehouse';
      case 'IN_STORAGE':
        return 'Partially in Storage';
      case 'COMPLETELY_IN_STORAGE':
        return 'Completely in Storage';
    }
    return 'Not Scored';
  }
}

export function MatchBreakdownTitle(name: string, redScore: number, blueScore: number) {
  return new MatchBreakdownRow(true, name, redScore, blueScore, -1, -1, false, false)
}

export function MatchBreakdownField(name: string, red: number, blue: number, points: number) {
  return new MatchBreakdownRow(false, name, red, blue, points, points, false, false);
}

export function MatchBreakdownFreightFrenzyParkingLocation(name: string, red: string, blue: string) {
  return new MatchBreakdownRow(false, name, red, blue, -1, -1, false, false, false, true);
}

export function MatchBreakdownFreightFrenzyBarcodeElement(name: string, red: string, blue: string) {
  return new MatchBreakdownRow(false, name, red, blue, -1, -1, false, false, false, false, true);
}

export function MatchBreakdownUltimateGoalWobbleField(name: string, red: number, blue: number) {
  return new MatchBreakdownRow(false, name, red, blue, -1, -1, false, false, true);
}

export function MatchBreakdownVelocityVortexParkingField(name: string, red: number, blue: number) {
  return new MatchBreakdownRow(false, name, red, blue, -1, -1, true, false);
}

export function MatchBreakdownVelocityVortexCapBallField(name: string, red: number, blue: number) {
  return new MatchBreakdownRow(false, name, red, blue, -1, -1, false, true);
}

export function MatchBreakdownBoolField(name: string, red: boolean, blue: boolean, points: number) {
  const constants = new MatchBreakdownConstants();
  return new MatchBreakdownRow(false, name, red ? constants.trueValue : constants.falseValue, blue ? constants.trueValue : constants.falseValue, points, points, false, false);
}

export function MatchBreakdownBoolFieldVariable(name: string, red: boolean, blue: boolean, redPoint: number, bluePoint) {
  const constants = new MatchBreakdownConstants();
  return new MatchBreakdownRow(false, name, red ? constants.trueValue : constants.falseValue, blue ? constants.trueValue : constants.falseValue, redPoint, bluePoint, false, false);
}
