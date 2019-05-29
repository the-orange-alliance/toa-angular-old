import { ISerializable } from './ISerializable';

export default class TOAUser implements ISerializable {
  uid: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
  metadata: any[];
  level: number;
  team: string;
  apiKey: string;
  favoriteTeams: string[];
  favoriteEvents: string[];
  adminEvents: string[];
  eventsApiKeys: any;
  adminRegions: string[];
  adminTeams: string[];
  emailLinked: boolean;
  googleLinked: boolean;
  githubLinked: boolean;
  phoneLinked: boolean;
  isDev: boolean;

  firebaseUser: firebase.User = null;

  toJSON(): object {
    return {
      uid: this.uid,
      email: this.email,
      emailVerified: this.emailVerified,
      phoneNumber: this.phoneNumber,
      displayName: this.displayName,
      photoURL: this.photoURL,
      disabled: this.disabled,
      metadata: this.metadata,
      level: this.level,
      team: this.team,
      api_key: this.apiKey,
      favorite_teams: this.favoriteTeams,
      favorite_events: this.favoriteEvents,
      admin_events: this.adminEvents,
      events_api_keys: this.eventsApiKeys,
      admin_regions: this.adminRegions,
      admin_teams: this.adminTeams,
      email_linked: this.emailLinked,
      google_linked: this.googleLinked,
      github_linked: this.githubLinked,
      phone_linked: this.phoneLinked,
      isDev: this.isDev
    };
  }

  fromJSON(json: any): TOAUser {
    const user: TOAUser = new TOAUser();
    user.uid = json.uid;
    user.email = json.email;
    user.emailVerified = json.emailVerified;
    user.phoneNumber = json.phoneNumber;
    user.displayName = json.displayName;
    user.photoURL = json.photoURL;
    user.disabled = json.disabled;
    user.metadata = json.metadata;
    user.level = json.level || 1;
    user.team = json.team;
    user.apiKey = json.api_key;
    user.favoriteTeams = json.favorite_teams || [];
    user.favoriteEvents = json.favorite_events || [];
    user.adminEvents = json.admin_events || [];
    user.eventsApiKeys = json.events_api_keys;
    user.adminRegions = json.admin_regions || [];
    user.adminTeams = json.admin_teams || [];
    user.emailLinked = json.email_linked;
    user.googleLinked = json.google_linked;
    user.githubLinked = json.github_linked;
    user.phoneLinked = json.phone_linked;
    user.isDev = json.isDev;
    return user;
  }
}
