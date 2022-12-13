import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthorizedHomepageComponent } from './components/authorized-homepage/authorized-homepage.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CommentComponent } from './components/comment/comment.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { RoleGuard } from './shared/guard/role.guard';
import { AdminSigninComponent } from './components/admin-signin/admin-signin.component';
import { UnauthroizedHomeComponent } from './components/unauthroized-home/unauthroized-home.component';
import { UnauthGuard } from './shared/guard/unauth.guard';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminPolicyComponent } from './components/admin-policy/admin-policy.component';
import { PolicyComponent } from './components/policy/policy.component'; 
import { DmcaComponent } from './components/dmca/dmca.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'admin-signin', component: AdminSigninComponent},
  {path: 'register-user', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'profile', component: ProfileComponent, },
  {path: 'main-page', component: MainPageComponent},
  {path: 'authorized-homepage', component: AuthorizedHomepageComponent, canActivate: [AuthGuard], children: [
    {
        path: 'main-page',
        component: MainPageComponent,
      }

  ]}, //need to add AuthGuard}
  {path: 'comment', component: CommentComponent},
  {path: 'admin', component:AdminHomeComponent, 
      children: [
      {
        path: 'authorized-homepage',
        component: AuthorizedHomepageComponent,
      },

      {
        path: 'admin-signin',
        component: AdminSigninComponent,
      },

      {
        path: 'main-page',
        component: MainPageComponent,
      }

    ],

},

{path: 'unauthorized-home', component: UnauthroizedHomeComponent},
{path: 'admin-profile', component: AdminProfileComponent},
{path: 'admin-policy', component: AdminPolicyComponent},
{path: 'policy', component: PolicyComponent},
{path: 'privacy', component: PrivacyComponent},
{path: 'dmca', component: DmcaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
