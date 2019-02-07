import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UploadService {

  private baseUrl = 'https://api.imgur.com/3';
  private clientId = '0e76f4508feb80d';

  constructor(private http: HttpClient){

  }

  public uploadImage(image: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      let headers = new HttpHeaders({'Authorization': `Client-ID ${this.clientId}`});

      this.http.post(this.baseUrl + '/image',{image}, {headers: headers}).subscribe((data: any) => {
        if (data && data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      }, (err: any) => {
        reject(err);
      });
    });
  }
}
