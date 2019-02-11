import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'firebase/app';

@Injectable()
export class CloudFunctions {

  private baseUrl = 'https://us-central1-the-orange-alliance.cloudfunctions.net/requireValidations';
  // private baseUrl = 'http://localhost:5000/the-orange-alliance/us-central1/requireValidations'; // Tests Only

  constructor(private http: HttpClient) {}

  public allUsers(user: User): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`
        });

        this.http.get(this.baseUrl + '/allUsers', {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public generateApiKey(user: User): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`
        });

        this.http.get(this.baseUrl + '/generateKey', {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public generateEventApiKey(user: User, eventKey: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': eventKey
        });

        this.http.get(this.baseUrl + '/eventKey', {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public playlistMatchify(user: User, eventKey: string, playlistID: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': eventKey
        });

        const body = {
          'playlistID': playlistID
        };

        this.http.post(this.baseUrl + '/playlistMatchify', body, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public setVideos(user: User, eventKey: string, videos: any[]): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': eventKey
        });

        this.http.post(this.baseUrl + '/setVideos', videos, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public createEvent(user: User, eventData: any[]): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`
        });

        this.http.post(this.baseUrl + '/createEvent', eventData, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public updateEvent(user: User, eventKey: string, eventData: any[]): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': eventKey
        });

        this.http.post(this.baseUrl + '/updateEvent', eventData, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public addEventMedia(user: User, mediaData: any): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': 'event'
        });

        this.http.post(this.baseUrl + '/addMedia', mediaData, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public addTeamMedia(user: User, mediaData: any): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': 'team'
        });

        this.http.post(this.baseUrl + '/addMedia', mediaData, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public addStream(user: User, streamData: any): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`
        });

        this.http.post(this.baseUrl + '/addStream', streamData, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public hideStream(user: User, streamData: any): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`
        });

        this.http.post(this.baseUrl + '/hideStream', streamData, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public dumpCache(user: User, route: string): Promise<any> {
    return this.toaPost(user, '', `/web/dumpCache?route=/api/${route}`);
  }

  public toaPost(user: User, body: any, route: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': route
        });

        this.http.post(this.baseUrl + '/toaapi', body, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public toaPut(user: User, body: any, route: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': route
        });

        this.http.put(this.baseUrl + '/toaapi', body, {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  public toaDelete(user: User, route: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.userToVerKey(user).then((key) => {
        const headers = new HttpHeaders({
          'authorization': `Bearer ${key}`,
          'data': route
        });

        this.http.delete(this.baseUrl + '/toaapi', {headers: headers}).subscribe((data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  private userToVerKey(user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      user.getIdToken(true).then((token) => {
        resolve(token);
      }).catch((err: any) => {
        reject(err);
      });
    });
  }
}
