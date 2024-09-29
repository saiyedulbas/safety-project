import { Component,computed,inject,OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MasterServiceService } from '../../services/master-service.service';
import { productInfoObjectModel } from '../../models/dummyProduct';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dummy-product',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './dummy-product.component.html',
  styleUrl: './dummy-product.component.css'
})
export class DummyProductComponent implements OnInit{
ngOnInit(): void {
  this.loadDummyProduct();
  this.cardDimensions.set(Array(this.htmlProductInfoValues().length).fill({ width: 300, height: 200 }));
}
htmlProductInfoValues = signal<productInfoObjectModel>([]);
masterService = inject(MasterServiceService);
dummyCategoriesData = signal<string[]>([]);
selectedCategory = signal<string | null>(null);
searchQuery = signal<string>('');
cardDimensions = signal<{ width: number; height: number }[]>([]);

filteredProducts = computed(() => {
  const products = this.htmlProductInfoValues();
  const selectedCategory = this.selectedCategory();
  const searchQuery = this.searchQuery().toLowerCase();
console.log(searchQuery);
  return products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
});
onCategorySelect(category: string | null) {
  this.selectedCategory.set(category);
  console.log(this.selectedCategory());
}
onSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.value); 
  this.searchQuery.set(target.value);
}

loadDummyProduct(){
  var jsonObjectFinal;
jsonObjectFinal= this.masterService.loadDummyJSONProductData();
this.htmlProductInfoValues.set(jsonObjectFinal);


    
    const categories = Array.from(new Set(jsonObjectFinal.map(item => item.category)));
    
    
   
    this.dummyCategoriesData.set(categories);
    
   
   


}

onResizeStart(event: MouseEvent, index: number) {
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = this.cardDimensions()[index].width;
  const startHeight = this.cardDimensions()[index].height;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const newWidth = Math.max(startWidth + (moveEvent.clientX - startX), 100); 
    const newHeight = Math.max(startHeight + (moveEvent.clientY - startY), 100); 
    this.cardDimensions.set([...this.cardDimensions().slice(0, index), { width: newWidth, height: newHeight }, ...this.cardDimensions().slice(index + 1)]);
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}
trackByFn(index: number, item: any) {
  return index; 
}
}
