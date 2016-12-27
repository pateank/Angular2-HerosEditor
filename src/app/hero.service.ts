import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private appUrl = 'http://hero-demo-dev.us-west-2.elasticbeanstalk.com';
  //private appUrl = 'http://localhost:8080';
  private heroListUrl = this.appUrl + '/heroes';  
  private addHeroUrl = this.appUrl + '/hero/update';
  private deleteHeroUrl = this.appUrl + '/hero/remove/';
  
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroListUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  getHero(id: string): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): Promise<Hero> {
    return this.post(hero);
  }

  delete(hero: Hero): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.deleteHeroUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.addHeroUrl, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json() as Hero)
      .catch(this.handleError);
  }

  // Update existing Hero
  /*private put(hero: Hero): Promise<Hero> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
