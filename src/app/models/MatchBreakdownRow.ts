export class MatchBreakdownConstants {
  trueValue: number = -100;
  falseValue: number = -200;
}

export class MatchBreakdownRow {
  isTitle: boolean;
  name: string;
  red: number;
  blue: number;
  points: number;
  isVelocityVortexParking: boolean;
  isVelocityVortexCapBall: boolean;

  constructor (isTitle: boolean, name: string, red: number, blue: number, points: number, velocityVortexParking: boolean, velocityVortexCapBall: boolean) {
    this.isTitle = isTitle;
    this.name = name;
    this.red = red;
    this.blue = blue;
    this.points = points;
    this.isVelocityVortexParking = velocityVortexParking;
    this.isVelocityVortexCapBall = velocityVortexCapBall;
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
      let mark = s.toString();
      if (s === constants.trueValue || s === constants.falseValue) {
        mark = s === constants.trueValue ? '✅️' : '❎';
      }
      return s > 0 ? `${mark} (+${s * this.points})`: '0';
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
