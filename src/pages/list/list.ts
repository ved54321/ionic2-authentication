import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { FormPage } from '../../pages/form/form';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  searchQuery: string = '';
  studentvoices: any;
  selectedItem: any;
  icons: string[];
  items: studentvoice[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider,public loadingCtrl: LoadingController) {
     this.authService.getstudentvoice().subscribe(studentvoices =>{
        let loader = this.loadingCtrl.create({
          content: "Please wait..." 
        });
        loader.present();
        this.items = studentvoices;
        this.initializeItems();
        loader.dismiss();
    }); 

  }

  initializeItems() {
    this.studentvoices = this.items;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
  this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.studentvoices = this.studentvoices.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  new_idea(){
    this.navCtrl.setRoot(FormPage);
  }

}

interface studentvoice{
  user_id: number;
  title: string;
  body: string;
  id: number;
}