import { Routes } from '@angular/router';
import { MapasComponent } from './maps/mapas/mapas.component';
import { MaptilerComponent } from './maptiler/maptiler.component';

export const routes: Routes = [
  { path: 'mapas', component: MapasComponent },
  { path: 'maptiler', component: MaptilerComponent },
];
