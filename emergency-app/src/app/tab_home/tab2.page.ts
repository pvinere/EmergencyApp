import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SharedService } from '../shared/service';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  userName$: Observable<string> | undefined;
  currentCity: any;
  currentCountry: any;
  latitude: number | undefined;
  longitude: number | undefined;
  jsonData: any;
  filteredData: any;
  searchQuery: string = '';
  

  constructor(
    public authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HttpClient,
    
    @Inject(SharedService)private sharedService: SharedService
  ) 
  { }

  getLocationData(latitude: number, longitude: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    console.log('Current city:', this.http.get<any>(url));
    
    return this.http.get<any>(url);
    
}

  makeCall()
  {
    var phoneNumber = '112';
    window.location.href = 'tel:' + phoneNumber;
  }

  async getCityName() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;

    console.log('Current position:', this.latitude , this.longitude);
    
    this.getLocationData(this.latitude, this.longitude).subscribe((data) => {
      console.log('Response from Nominatim API:', data);
      
      
      const city = data.address && data.address.city ? data.address.city : null;
      const country = data.address && data.address.country ? data.address.country : null;
      if (city) {
        this.currentCity = city;
        this.currentCountry = country;
        console.log('Current city:', this.currentCity);
        const emergencyNumber = this.getEmergencyNumber(country);
        if (emergencyNumber) {
          console.log('Emergency number for', country, ':', emergencyNumber);
        } else {
          console.log('Emergency number not found for', country);
        }
      } else {
        console.log('City not found in the response');
      }
    });
  }

  loadJSON() {
    this.http.get('assets/database_numbers.json').subscribe((data) => {
      this.jsonData = data;
      this.filteredData = [...this.jsonData];
      
    });
  }

  getEmergencyNumber(country: string): string | null {
    const countryData = this.jsonData.data.find((item: any) => item.Country.Name === country);
    if (countryData) {
      return countryData.Ambulance.All[0] || null; 
    }
    return null; 
  }
  

  
  
  

  
  ngOnInit(): void {
    this.loadJSON();
    this.getCityName();
    
    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid =user.uid;
        console.log("UID from tab2Home: " + this.sharedService.uid);
        localStorage.setItem('uid', uid); 
        this.sharedService.uid = uid;
        this.userName$ = this.afs.doc<any>(`users/${uid}`).valueChanges().pipe(
          map(userData => {
            
            if (userData) {
              return userData.name;
            } else {
              
              return 'Unknown'; 
              
            }
          })
        );
      }
    });

    

}





searchBarEmpty: boolean = true;
  lastSearchQuery: string = '';

  filterCountries(event: Event) {
    const query: string = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchQuery = query;

    if (query === '') {
     
      this.filteredData = [];
    } else {
      
      this.filteredData = this.jsonData.data.filter((item: any) => {
        return item.Country.Name.toLowerCase().includes(query);
      });
    }
  }
}


