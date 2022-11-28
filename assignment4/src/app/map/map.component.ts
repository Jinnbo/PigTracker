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
        this.pigs = data

        for (let i =0;i<this.pigs.length;i++){
          let temp = [this.pigs[i].data[0].latitude, this.pigs[i].data[0].longitude,this.pigs[i].data[0].location];
          this.pigCoords.push(temp);
        }

        this.get();
      })
    }

  ngAfterViewInit(): void { 
    this.initMap();

    // L.marker([49.2276, -123.0076]).addTo(this.map)
    // .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();
  }
  
  get(){
    let latitude;
    let longitude;

    // Count number of times each location pops up

    // Loop through pigCoords
    for (let i=0;i<this.pigCoords.length;i++){
      latitude = this.pigCoords[i][0];
      longitude = this.pigCoords[i][1];

      // Place marker on each pair of coordinates
      L.marker([latitude, longitude]).addTo(this.map)
    .bindPopup(`<b>${this.pigCoords[i][2]}</b><br/>cases reported.`).openPopup();

    }



  }

}
