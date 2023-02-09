import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
} from '../../constants';

interface JSONResponse {
  code: number;
  status: string;
  message: string;
  data: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = '/api';
  }

  async get(route: string) {
    return await this.sendRequest(GET, route)
    // return this.http.get(`${this.ROOT_URL}/${route}`);
  }

  async post(route: string, payload: Object) {
    return await this.sendRequest(POST, route, payload)
    // return this.http.post(`${this.ROOT_URL}/${route}`, payload);
  }

  async patch(route: string, payload: Object) {
    return await this.sendRequest(PATCH, route, payload)
    // return this.http.patch(`${this.ROOT_URL}/${route}`, payload);
  }

  async delete(route: string) {
    return await this.sendRequest(DELETE, route)
    // return this.http.delete(`${this.ROOT_URL}/${route}`);
  }

  private sendRequest(method: string, route: string, payload?: unknown): Promise<JSONResponse> {
    return new Promise((resolve) => {
      let observable: Observable<unknown>;
      switch (method) {
        case GET:
          observable = this.http.get(`${this.ROOT_URL}/${route}`);
          break;
        case POST:
          observable = this.http.post(`${this.ROOT_URL}/${route}`, payload);
          break;
        case PATCH:
          observable = this.http.patch(`${this.ROOT_URL}/${route}`, payload);
          break;
        case DELETE:
          observable = this.http.delete(`${this.ROOT_URL}/${route}`);
          break;
        default:
          throw Error(`Request method [${method}] not supported.`);
      }

      observable.subscribe((res) => {
        resolve(res as JSONResponse);
      });
    })
  }
}
