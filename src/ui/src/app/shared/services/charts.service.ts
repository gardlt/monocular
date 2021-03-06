import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { ChartVersion } from '../models/chart-version';
import { CONFIG } from '../../config';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';

/* TODO, This is a mocked class. */
@Injectable()
export class ChartsService {
  hostname: string = CONFIG.backendHostname

  constructor(private http: Http) { }

  /**
   * Get all charts from the API
   *
   * @return {Observable} An observable that will an array with all Charts
   */
  getCharts(repo: string = "all"): Observable<Chart[]> {
    let url: string
    switch(repo) {
      case 'all' : {
        url = `${this.hostname}/v1/charts`
        break
      }
      default: {
        url = `${this.hostname}/v1/charts/${repo}`
      }
    }
    return this.http.get(url)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  /**
   * Get a chart using the API
   *
   * @param {string} repo Repository name
   * @param {string} chartName Chart name
   * @return {Observable} An observable that will a chart instance
   */
  getChart(repo: string, chartName: string): Observable<Chart> {
    // Transform Observable<Chart[]> into Observable<Chart>[]
    return this.http.get(`${this.hostname}/v1/charts/${repo}/${chartName}`)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  /* TODO, use backend search API endpoint */
  searchCharts(query): Observable<Chart[]> {
    let re = new RegExp(query, 'i');
    return this.getCharts().map(charts => {
      return charts.filter(chart => {
        return chart.attributes.name.match(re) || chart.attributes.description.match(re) || this.keywordsMatch(chart, re)
      })
    })
  }

  keywordsMatch(chart: Chart, re): boolean {
    let keywords: string[] = chart.attributes.keywords
    if(!keywords) return false

    return keywords.some((keyword) => {
      return !!keyword.match(re)
    })
  }

  /**
   * Get a chart Readme using the API
   *
   * @param {string} repo Repository name
   * @param {string} chartName Chart name
   * @param {string} version Chart version
   * @return {Observable} An observable that will be a chartReadme
   */
  getChartReadme(chartVersion: ChartVersion): Observable<Response> {
    return this.http.get(`${this.hostname}${chartVersion.attributes.readme}`)
  }
  /**
   * Get chart versions using the API
   *
   * @param {string} repo Repository name
   * @param {string} chartName Chart name
   * @return {Observable} An observable containing an array of ChartVersions
   */
  getVersions(repo: string, chartName: string): Observable<ChartVersion[]> {
    return this.http.get(`${this.hostname}/v1/charts/${repo}/${chartName}/versions`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Get chart version using the API
   *
   * @param {string} repo Repository name
   * @param {string} chartName Chart name
   * @return {Observable} An observable containing an array of ChartVersions
   */
  getVersion(repo: string, chartName: string, version: string): Observable<ChartVersion> {
    return this.http.get(`${this.hostname}/v1/charts/${repo}/${chartName}/versions/${version}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
