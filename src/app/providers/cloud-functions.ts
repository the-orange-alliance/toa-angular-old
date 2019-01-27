import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CloudFunctions {

  private baseUrl = 'https://us-central1-the-orange-alliance.cloudfunctions.net/requireValidations';
  // private baseUrl = 'http://localhost:5000/the-orange-alliance/us-central1/requireValidations'; // Tests Only

  constructor(private http: HttpClient) {}

  public generateApiKey(uid: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': 'Bearer ' + uid
      });

      this.http.get(this.baseUrl + '/generateKey', {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public generateEventApiKey(uid: string, eventKey: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': 'Bearer ' + uid,
        'data': eventKey
      });

      this.http.get(this.baseUrl + '/eventKey', {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public playlistMatchify(uid: string, eventKey: string, playlistID: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': `Bearer ${uid}`,
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
    });
  }

  public setVideos(uid: string, eventKey: string, videos: any[]): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': `Bearer ${uid}`,
        'data': eventKey
      });

      this.http.post(this.baseUrl + '/setVideos', videos, {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public createEvent(uid: string, eventData: any[]): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': `Bearer ${uid}`
      });

      this.http.post(this.baseUrl + '/createEvent', eventData, {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public updateEvent(uid: string, eventKey: string, eventData: any[]): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': `Bearer ${uid}`,
        'data': eventKey
      });

      this.http.post(this.baseUrl + '/updateEvent', eventData, {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public addEventMedia(uid: string, mediaData: any): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': `Bearer ${uid}`,
        'data': 'event'
      });

      this.http.post(this.baseUrl + '/addMedia', mediaData, {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public addTeamMedia(uid: string, mediaData: any): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      const headers = new HttpHeaders({
        'authorization': `Bearer ${uid}`,
        'data': 'team'
      });

      this.http.post(this.baseUrl + '/addMedia', mediaData, {headers: headers}).subscribe((data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }
}
