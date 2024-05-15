import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNotificationPageRoutingModule } from './admin-notification-routing.module';

import { AdminNotificationPage } from './admin-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNotificationPageRoutingModule
  ],
  declarations: [AdminNotificationPage]
})
export class AdminNotificationPageModule {}
