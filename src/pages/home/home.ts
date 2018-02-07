import { Component, trigger } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';


///add
 import { Http } from '@angular/http';
import'rxjs/add/operator/map';

declare var google;
///
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(public navCtrl: NavController,public platform:Platform,private http: Http) {

    platform.ready().then(()=>{
      this.loadmap();
    })

  }

    loadmap(){
    this.map = new GoogleMap('map',{
     'controls': {
    'compass':true,
    'myLocationButton':true,
    'indoorPicker':true,
    'zoom':true
     },
     'gestures':{
       'scroll':true,
       'tilt':true,
       'rotate':true,
       'zoom':true
     },
     'camera':{
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30,
      'bearing':50
     
     }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready .... :)');
    })
   }
    
  
///add

ionviewDidload(){
 // this.displayGoogleMap();
  this.getMarkers();
}





getMarkers(){
  this.http.get('assets\data\markers.json').map((res)=>res.json()).subscribe(data=>{
    this.addMarkersMap(data);
  }); 
}

addMarkersMap(markers){
for(let marker of markers){
  var loc ={lat:marker.latitude ,lng:marker.longitude}
  marker = new google.maps.Marker({
    position : loc,
    map: this.map,
    title:marker.name,
    label:marker.content

  });

}
}
////




}
