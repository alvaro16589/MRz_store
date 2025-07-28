import { ApplicationConfig, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';// image loader


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr({
      closeButton:true, 
      timeOut:4000,
      preventDuplicates:true,
      progressBar: true
    }), // Toastr providers
    
    {// custom image loader
     provide: IMAGE_LOADER,
     useValue: (config: ImageLoaderConfig) => {
       return `${config.src}`;
     }
  },
  ]
};
