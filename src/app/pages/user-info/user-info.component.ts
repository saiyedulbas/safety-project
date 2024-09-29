import { Component,inject,OnInit, signal } from '@angular/core';
import { ActivatedRoute, Data, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SingleUser, SingleUserNotFOund, UserData } from '../../models/singleUser';
import { MasterServiceService } from '../../services/master-service.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
route = inject(ActivatedRoute);
userId:number = 0;
userInfo = signal<UserData |null>(null);
userNotFound: string = " ";
masterService = inject(MasterServiceService);
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.loadSingleUser(this.userId);

      
    });
  }
  loadSingleUser(id:number){
    try {
      this.masterService.loadUserById(id).subscribe({
        next: (res: SingleUser) => {
          this.userNotFound = "User Found";
          console.log('user data fetched successfully:', res);
          this.userInfo.set(res.data);
        },
        error: (err) => {
          this.userNotFound = "User Not Found";
          console.error('Error fetching user:', err);
          // You can show an error message to the user here
        }
      });
    } catch (error) {
      console.error('Server error:', error);
      // Additional error handling for any synchronous issues
    }
  } 
  }

