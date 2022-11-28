import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pig } from './Pig';
import {Observable,Subject, tap} from'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PigService {

  pigs:any;
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient){
    this.pigs = []
  }

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }


  getPigs(){
    return this.http.get<Pig>('https://272.selfip.net/apps/CExpTwLOJp/collections/pigList/documents/')
  }

  addPigs(values){

    // parse location into name, latitude, longitude
    let locationDetails = values.location.split(",",3);

    this.http.post('https://272.selfip.net/apps/CExpTwLOJp/collections/pigList/documents/',
    {
      "key":values.name, 
      "data":[
        {
            "name":values.name,
            "phoneNumber": values.phoneNumber,
            "pigInfo": values.pigInfo,
            "location": locationDetails[0],
            "latitude": locationDetails[1],
            "longitude": locationDetails[2],
            "timeReported": (new Date().getTime()),
            "status": "READY FOR PICKUP",
            "extraNote": values.extraNote
        }
      ] 
    }).pipe( tap(()=>{this._refreshNeeded$.next()})).subscribe((data:any)=>{ console.log(data)})
  }

  deletePig(name){
    this.http.delete('https://272.selfip.net/apps/CExpTwLOJp/collections/pigList/documents/'+name+'/'
    ).pipe( tap(()=>{this._refreshNeeded$.next()})).subscribe((data:any)=>{console.log(data)})
  }

}
