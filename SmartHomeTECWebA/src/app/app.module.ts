import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InfoComponent } from './info/info.component';
import { EshopComponent } from './eshop/eshop.component';

//Definicion de los URLS para navegar en la Web
const appRoutes: Routes = [
  //Definicion de los URLS para navegar en la Web
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashComponent },
  { path: 'info', component: InfoComponent },
  { path: 'eshop', component: EshopComponent },

  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashComponent,
    NotfoundComponent,
    InfoComponent,
    EshopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
