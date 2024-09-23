import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../inventory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var window: any; // For Bootstrap modals

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class InventoryComponent implements OnInit {

  items: any[] = [];
  selectedItem: any = null;
  
  purchaseQuantity: number = 0;
  purchasePrice: number = 0;
  
  spendQuantity: number = 0;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.inventoryService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  openPurchaseModal(item: any): void {
    this.selectedItem = item;
    this.purchaseQuantity = 0;
    this.purchasePrice = 0;
    var purchaseModal = new window.bootstrap.Modal(document.getElementById('purchaseModal'));
    purchaseModal.show();
  }

  openSpendModal(item: any): void {
    this.selectedItem = item;
    this.spendQuantity = 0;
    var spendModal = new window.bootstrap.Modal(document.getElementById('spendModal'));
    spendModal.show();
  }

  purchaseItem(): void {
    if (this.selectedItem && this.purchaseQuantity > 0 && this.purchasePrice > 0) {
      const data = {
        itemId: this.selectedItem.id,
        quantity: this.purchaseQuantity,
        price: this.purchasePrice
      };
      // console.log(data);
      
      this.inventoryService.purchaseItem(data).subscribe(response => {
        this.loadItems(); // Reload items to update stock
        window.bootstrap.Modal.getInstance(document.getElementById('purchaseModal')).hide();
      });
    }
  }

  spendItem(): void {
    if (this.selectedItem && this.spendQuantity > 0) {
      const data = {
        itemId: this.selectedItem.id,
        quantity: this.spendQuantity
      };

      console.log(data);
      
      this.inventoryService.spendItem(data).subscribe(response => {
        this.loadItems(); // Reload items to update stock
        window.bootstrap.Modal.getInstance(document.getElementById('spendModal')).hide();
      });
    }
  }
}
