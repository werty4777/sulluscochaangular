import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {AgmCoreModule} from '@agm/core';

import {LoginComponent} from './login/login.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {ServiceOAuthService} from './authService/service-oauth.service';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthInterceptorService} from './interceptor/auth-interceptor.service';
import {OrdenCompraComponent} from './productos/orden-compra/orden-compra.component';
import {MatTableModule} from '@angular/material/table';
import {OrderServiceService} from './Services/product/orderProduct/order-service.service';
import {CardsServiceService} from './Services/cards-service.service';

const googlekey = '583458414138-95g5d9orqll8ldlc0p693kd25f24a883.apps.googleusercontent.com';


@NgModule({
    imports: [

        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        SocialLoginModule, MatTableModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,


    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            googlekey
                        )
                    },

                ]
            } as SocialAuthServiceConfig,
        }, ServiceOAuthService, {

            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true

        }, OrderServiceService,CardsServiceService
    ],
    exports: [
        OrdenCompraComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
