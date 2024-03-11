import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared/service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule, IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule, 
    AngularFireModule,
    AngularFireAuthModule,
   ], 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},SharedService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
