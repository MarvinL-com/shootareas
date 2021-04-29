import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LieuxComponent} from "./lieux/lieux.component";
import {LieuDetailComponent} from "./lieu-detail/lieu-detail.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {AddLieuComponent} from "./add-lieu/add-lieu.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'lieux', component: LieuxComponent},
  {path: 'lieu/:slug', component: LieuDetailComponent},
  {path: 'connexion', component: AuthenticationComponent},
  {path: 'ajouter', component: AddLieuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
