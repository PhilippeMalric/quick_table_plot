import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareTwoDsComponent } from './pages/data/compare-two-ds/compare-two-ds.component';
import { FirstComponent } from './pages/first/first.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: FirstComponent },
  { path: 'maison', component: CompareTwoDsComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
