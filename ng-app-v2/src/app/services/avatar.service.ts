import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private client: HttpClient) { }

  private get(name: string) {
    let url = `https://ui-avatars.com/api/?name=${name}&color=009688`;
    return this.client.get(url);
  }

}
