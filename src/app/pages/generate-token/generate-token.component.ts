import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-token',
  standalone: true,
  imports: [],
  templateUrl: './generate-token.component.html',
  styleUrl: './generate-token.component.css'
})
export class GenerateTokenComponent {
setToken(){
  localStorage.setItem('token', 'yourTokenValueHere');

}
removeToken(){
  localStorage.removeItem('token');
}
}
