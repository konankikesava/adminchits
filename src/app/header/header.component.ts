import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent  {

  constructor(private profileServices:ProfileService){
      
  }

  

}
