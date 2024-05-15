import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNotificationPage } from './admin-notification.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNotificationPageRoutingModule {}
