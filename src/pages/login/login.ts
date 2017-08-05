import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController,MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { email:'', password:'',app_id: 'ganesh',date_stamp: '1433203820',hash: '74067c0677004cf719beb41c3ac7f7de98b09191558173152be0512451a500a2' };
  data: any;

  constructor(public menu: MenuController,public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  		this.menu.swipeEnable(false);
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}