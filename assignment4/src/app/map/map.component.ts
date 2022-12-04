import { Component, AfterViewInit } from '@angular/core';
import { icon, Marker } from 'leaflet';
import { PigService } from '../pig.service';
import * as L from 'leaflet';
import { Pig } from '../Pig';

// need to add to make leaflet icons work
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  public pigs;
  public pigCoords = [];

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 49.2541785110616, -122.96467386848254 ],
      zoom: 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  
  constructor(private ps: PigService) {
    this.pigs = [];
    
      this.ps.getPigs().subscribe((data)=>{
        this.pigCoords = [];
        this.pigs = data

        for (let i =0;i<this.pigs.length;i++){
          let temp = [this.pigs[i].data[0].latitude, this.pigs[i].data[0].longitude,this.pigs[i].data[0].location,this.pigs[i].data[0].status];
          this.pigCoords.push(temp);
        }

        this.setMarkers();
      })
    }

  ngAfterViewInit(): void { 
    this.initMap();

    this.ps.refreshNeeded$.subscribe((data)=>{
      this.ps.getPigs().subscribe((data)=>{
        this.pigCoords = [];
        this.pigs = data

        for (let i =0;i<this.pigs.length;i++){
          let temp = [this.pigs[i].data[0].latitude, this.pigs[i].data[0].longitude,this.pigs[i].data[0].location,this.pigs[i].data[0].status];
          this.pigCoords.push(temp);
        }

        this.setMarkers();
      })
    })
  }
  
  setMarkers(){
    let latitude;
    let longitude;
    let occurances = 0;

    // Loop through pigCoords
    for (let i=0;i<this.pigCoords.length;i++){

      if (this.pigCoords[i][3] === "READY FOR PICKUP"){
        latitude = this.pigCoords[i][0];
        longitude = this.pigCoords[i][1];
        occurances = 0;
      
        // Count number of times each location pops up
        for (let j = 0;j<this.pigCoords.length;j++){
          if (this.pigCoords[i][2] == this.pigCoords[j][2]){
            occurances++;
          }
        }

        // Place marker on each pair of coordinates
        if (occurances == 1){ 
          L.marker([latitude, longitude])
          .addTo(this.map)
          .bindPopup(`<b>${this.pigCoords[i][2]}</b><br/>${occurances} pig reported.`).openPopup();
        }        
        else{
          L.marker([latitude, longitude])
          .addTo(this.map)
          .bindPopup(`<b>${this.pigCoords[i][2]}</b><br/>${occurances} pigs reported.`).openPopup();
        }
      }
    }
  }
}
