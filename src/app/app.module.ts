import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstComponent } from './pages/first/first.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './Ngrx/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './Ngrx/app.effects';
import { LoadXlsxComponent } from './pages/load-excel/load-excel.component';
import { LoadCsvComponent } from './pages/load-csv/load-csv.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralViewComponent } from './pages/data/general-view/general-view.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CompareTwoDsComponent } from './pages/data/compare-two-ds/compare-two-ds.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { VariablesGroupComponent } from './components/variables-group/variables-group.component';


@NgModule({
  declarations: [
    LoadCsvComponent,
    LoadXlsxComponent,
    AppComponent,
    FirstComponent,
    PageNotFoundComponent,
    GeneralViewComponent,
    CompareTwoDsComponent,
    VariablesGroupComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
