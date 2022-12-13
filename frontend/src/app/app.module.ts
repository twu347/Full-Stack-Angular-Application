import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthorizedHomepageComponent } from './components/authorized-homepage/authorized-homepage.component';
import { MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './components/comment/comment.component';
import { CommentService } from './shared/services/comment.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminSigninComponent } from './components/admin-signin/admin-signin.component';
import { UnauthroizedHomeComponent } from './components/unauthroized-home/unauthroized-home.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { MatExpansionModule } from '@angular/material';
import { AdminPolicyComponent } from './components/admin-policy/admin-policy.component';
import { PolicyComponent } from './components/policy/policy.component';
import { DmcaComponent } from './components/dmca/dmca.component';
import { PrivacyComponent } from './components/privacy/privacy.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    MainPageComponent,
    AuthorizedHomepageComponent,
    CommentComponent,
    AdminHomeComponent,
    AdminSigninComponent,
    UnauthroizedHomeComponent,
    AdminProfileComponent,
    AdminPolicyComponent,
    PolicyComponent,
    DmcaComponent,
    PrivacyComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    MatExpansionModule,
  ],
  providers: [AuthService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

