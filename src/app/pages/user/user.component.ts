import { Component, inject, signal, OnInit } from '@angular/core';
import { fullUserArray, Funding, UserGetResponseModel, UserInfo } from '../../models/user';
import { MasterServiceService } from '../../services/master-service.service';
import { Data, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  userList = signal<fullUserArray>([]);
  supportInfo = signal<Funding |null>(null);
  page: number = 0;
  perPage: number = 0;
  totalPage: number = 0;
  router = inject(Router);
ngOnInit(): void {
  this.loadUsers();
}
  masterService = inject(MasterServiceService);
  loadUsers(){
    
    try {
      this.masterService.loadUsers().subscribe({
        next: (res: UserGetResponseModel) => {
          console.log('user data fetched successfully:', res);
          this.userList.set(res.data);
          this.page = res.page;
          this.perPage = res.per_page;
          this.totalPage = res.total_pages;
          this.supportInfo.set(res.support);
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          // You can show an error message to the user here
        }
      });
    } catch (error) {
      console.error('Server error:', error);
      // Additional error handling for any synchronous issues
    }
  }
  userInfo(item:number){
    this.router.navigate(['/user-info'],{ queryParams: { userId: item } }); 
  }
}
