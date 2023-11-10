import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'extra',
        loadChildren: () => import('../tab_extra/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'last',
        loadChildren: () => import('../tab_last/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../tab_home/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('../tab_info/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'details',
        loadChildren: () => import('../tab_details/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home(home:home)',
        pathMatch: 'full'
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
