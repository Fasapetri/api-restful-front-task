import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ApiService} from '../../Service/api/api.service';
import { LogoutI } from '../../Models/Auth/Logout.interface';

import { Router } from '@angular/router'
import { ResponseI } from 'src/app/Models/Auth/response.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userLoginOn=false;
  userData?:ResponseI;
  LogoutForm = new FormGroup({
    user_id : new FormControl('', Validators.required)
  })

  constructor( private api:ApiService, private router:Router){
  }




  ngOnInit(): void{

     }

    /*  Logout(){
      let userLogout:LogoutI;
      userLogout={
        user_id:1
      };
        this.api.LogoutUser(userLogout).subscribe( res =>{
          console.log(res);
        })
     } */

    Logout(){
      this.api.Logout();
    }

}
