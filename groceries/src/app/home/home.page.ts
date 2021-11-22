import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
// Add Controller
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../providers/groceries-service.service';
import { InputDialogService } from '../providers/input-dialog.service';
// Add Sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'Grocery List';

  constructor(
    //Add toast controller
    public toastController: ToastController,
    public alertController: AlertController,
    public dataService: GroceriesServiceService,
    public inputDialogService: InputDialogService,
    public socialSharing: SocialSharing
  ) {}
  loadItems() {
    return this.dataService.getItems();
  }

  // Remove items
  async removeItem(item, index) {
    console.log('Removing Item -', item, index);
    const toast = await this.toastController.create({
      message: 'Successfully removed - ' + item.name + '...',
      duration: 3000,
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  // Share items
  async shareItem(item, index) {
    console.log('Sharing Item -', item, index);
    const toast = await this.toastController.create({
      message: 'Successfully shared - ' + item.name + '...',
      duration: 3000,
    });
    toast.present();
    // Check if sharing via email is supported
    // Create variable
    let message =
      'Grocery Item - Name: ' + item.name + ' - Quantity: ' + item.quantity;
    let subject = 'Shared via Groceries app';

    this.socialSharing
      .share(message, subject)
      .then(() => {
        // Sharing via email is possible
        console.log('Shared Successfuly');
      })
      .catch((error) => {
        // Sharing via email is not possible
        console.log('Error while sharing', error);
      });
  }

  // Edit items
  async editItem(item, index) {
    console.log('Edit Item - ', item, index);
    const toast = await this.toastController.create({
      message: 'Successfully Editing items - ' + index + '...',
      duration: 3000,
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }
  // Add items
  addItem() {
    console.log('Adding Item');
    this.inputDialogService.showPrompt();
  }
}
