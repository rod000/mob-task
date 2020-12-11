import { Component, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMapsEvent, GoogleMapControlOptions,LatLng, MarkerOptions, Marker, GoogleMapOptions, GoogleMap, Environment, GoogleMapsMapTypeId } from "@ionic-native/google-maps";

import { ActionSheetController, AlertController, Platform } from "@ionic/angular";

@Component({
  selector: 'app-goo-maps',
  templateUrl: './goo-maps.page.html',
  styleUrls: ['./goo-maps.page.scss'],
})
export class GooMapsPage implements OnInit {

  
  map: GoogleMap;
  position:any ={lat: 3.8895616000000004, lng: 11.5113984};

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,) {}

  ngOnInit() {
    //this.platform.ready().then(() => this.loadMap());
    this.loadMap();
  }

  async mapOptions(){
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Satellite',
        handler: () => {
          console.log('Satellite clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
        }
      }, {
        text: 'Plan',
        handler: () => {
          console.log('Plan clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
        }
      }, {
        text: 'Terrain',
        handler: () => {
          console.log('Terrain clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
        }
      }, {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  placeMarker(markerTitle: string) {
    const marker: Marker = this.map.addMarkerSync({
       title: markerTitle,
       icon: 'red',
       animation: 'DROP',
       position: this.map.getCameraPosition().target
    });
 }

  async addMarker() {
    const alert = await this.alertController.create({
      header: 'Ajouter un emplacement',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Le titre'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ajouter',
          handler: data => {
            console.log('Titre: ' + data.title);
            this.placeMarker(data.title);
          }
        }
      ]
    });
    await alert.present();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyALJYjIJ2bsHUhMe9NxUtr_PdZ9iixz5DI',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyALJYjIJ2bsHUhMe9NxUtr_PdZ9iixz5DI'
      });
  
    let mapOptions: GoogleMapOptions = {
      controls:{
        myLocation:true,
      myLocationButton:true
      },
      camera: {
        target: this.position,
        zoom: 18,
        tilt: 30
      },
      
      };
  
    this.map = GoogleMaps.create('map',mapOptions);
  
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {

          console.info(this.position)
          
          this.map.addMarker({
              title: 'My Position',
              icon: 'red',
              animation: 'DROP',
              position: this.position
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert("By GNJ");
                });
        });
        
      });
  
    }

}
