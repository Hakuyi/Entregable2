import { Component, OnInit } from '@angular/core';
import {  User } from "../models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
 user = {} as User;
  constructor(
    private toastCtrl:  ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController

  )   {
    

     }


   

  ngOnInit() {}

  async registrarse(User: User){
    if(this.formValidation()){
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor... "
      })
      await loader.present();

      try{
        await this.afAuth.createUserWithEmailAndPassword(User.email, User.password).then (data =>{
          console.log(data);

          this.navCtrl.navigateRoot("home")
        })


      }
      catch(e: any){
        e.message = "Error al registrarse";
        let errormessager = e.message || e.getLocalizatedMessage();

        this.showToast(errormessager)
        

      }
      await loader.dismiss();

    }

  }

  formValidation(){

    if(this.user.email){
      this.showToast("Ingrese un Correo");
      return false;
    }
    if(this.user.password){
      this.showToast("Ingrese una Contraseña");
      return false;
    }
    return false;
  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());

  }

}
