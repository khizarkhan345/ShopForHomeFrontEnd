import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../Firebase/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withRouterConfig } from '@angular/router';
import { authInterceptor } from './auth.interceptor';
import { routes } from './app.routes';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withRouterConfig({
    onSameUrlNavigation: 'reload'
  })), provideHttpClient(withInterceptors([authInterceptor])),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ]
};
