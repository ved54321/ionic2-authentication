import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  studentvoices: studentvoice[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider,public loadingCtrl: LoadingController) {
     this.authService.getstudentvoice().subscribe(studentvoices =>{
        let loader = this.loadingCtrl.create({
          content: "Please wait..." 
        });
        loader.present();
        this.studentvoices = studentvoices;
        loader.dismiss();
    }); 
  }
}

interface studentvoice{
  user_id: number;
  title: string;
  body: string;
  id: number;
}