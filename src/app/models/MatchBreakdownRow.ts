export class MatchBreakdownConstants {
  trueValue = -1000;
  falseValue = -2000;
}

export class MatchBreakdownRow {
  isTitle: boolean;
  name: string;
  red: number;
  blue: number;
  points: number;
  isVelocityVortexParking: boolean;
  isVelocityVortexCapBall: boolean;

  redIcon: string;
  blueIcon: string;

  constructor (isTitle: boolean, name: string, red: number, blue: number, points: number, velocityVortexParking: boolean, velocityVortexCapBall: boolean) {
    this.isTitle = isTitle;
    this.name = name;
    this.red = red;
    this.blue = blue;
    this.points = points;
    this.isVelocityVortexParking = velocityVortexParking;
    this.isVelocityVortexCapBall = velocityVortexCapBall;

    const constants = new MatchBreakdownConstants();
    this.redIcon = this.red === constants.trueValue ? 'check' : this.red === constants.falseValue ? 'close' : null;
    this.blueIcon = this.blue === constants.trueValue ? 'check' : this.blue === constants.falseValue ? 'close' : null;
  }

  getRedPoints(): string {
    if (this.isTitle) {
      return `${this.red} Points`
    } else {
      return this.getString(this.red);
    }
  }

  getBluePoints(): string {
    if (this.isTitle) {
      return `${this.blue} Points`
    } else {
      return this.getString(this.blue);
    }
  }

  getString(s: number): string {
    if (this.isVelocityVortexParking) {
      return this.getVelocityVortexParkingString(s);
    } else if (this.isVelocityVortexCapBall) {
      return this.getVelocityVortexCapBallString(s);
    } else {
      const constants = new MatchBreakdownConstants();
      const isTrue = s === constants.trueValue;
      const isFalse = s === constants.falseValue;
      const isTrueFalse = isTrue || isFalse;

      const name = !isTrueFalse ? s : '';
      const pts = !isTrueFalse ? s * this.points : isTrue ? this.points : 0;
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
}

export function MatchBreakdownTitle(name: string, redScore: number, blueScore: number) {
  return new MatchBreakdownRow(true, name, redScore, blueScore, -1, false, false)
}

export function MatchBreakdownField(name: string, red: number, blue: number, points: number) {
  return new MatchBreakdownRow(false, name, red, blue, points, false, false);
}

export function MatchBreakdownVelocityVortexParkingField(name: string, red: number, blue: number) {
  return new MatchBreakdownRow(false, name, red, blue, -1, true, false);
}

export function MatchBreakdownVelocityVortexCapBallField(name: string, red: number, blue: number) {
  return new MatchBreakdownRow(false, name, red, blue, -1, false, true);
}

export function MatchBreakdownBoolField(name: string, red: boolean, blue: boolean, points: number) {
  const constants = new MatchBreakdownConstants();
  return new MatchBreakdownRow(false, name, red ? constants.trueValue : constants.falseValue, blue ? constants.trueValue : constants.falseValue, points, false, false);
}
