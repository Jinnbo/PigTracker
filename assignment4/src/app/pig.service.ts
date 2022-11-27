import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pig } from './Pig';

@Injectable({
  providedIn: 'root'
})
export class PigService {

  pigs:any;

  constructor(private http: HttpClient){
    this.pigs = []
  }

  getPigs(){
    return this.http.get<Pig>('https://272.selfip.net/apps/CExpTwLOJp/collections/pigList/documents/')
  }

  addPigs(values){

    this.http.post('https://272.selfip.net/apps/CExpTwLOJp/collections/pigList/documents/',
    {
      "key":values.name, 
      "data":[
        {
            "name":values.name,
            "phoneNumber": values.phoneNumber,
            "pigInfo": values.pigInfo,
            "location": values.location,
            "timeReported": (new Date().getTime()),
            "status": "READY FOR PICKUP",
            "extraNote": values.extraNote
        }
      ] 
    }
    ).subscribe((data:any)=>{
      console.log(data)
    })
  }

  deletePig(name){
    this.http.delete('https://272.selfip.net/apps/CExpTwLOJp/collections/pigList/documents/'+name+'/'
    ).subscribe((data:any)=>{console.log(data)})
  }

}
