import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Add HttpClientModule to the providers
const updatedConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule)
  ]
};

bootstrapApplication(AppComponent, updatedConfig)
  .catch((err) => console.error(err));