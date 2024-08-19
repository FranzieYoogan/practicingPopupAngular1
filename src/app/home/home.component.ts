import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private shared: SharedService, private http: HttpClient){}


  ngOnInit(): void {
      
    const img:any = document.getElementById('img')

    setInterval(() => {

      img.style.transform = "scale(1.2)"
      img.style.transition = "0.5s"


      setTimeout(() => {

         img.style.transform = "scale(1)"

      }, 500);

    }, 1000);


  }


  show() {
    const containerForm:any = document.getElementById('containerForm')

    containerForm.style.display = "flex"

    setTimeout(() => {
    
      containerForm.style.opacity = "1"
      containerForm.style.marginRight = "3em"

    }, 500);

  }

  close() {

    const containerForm:any = document.getElementById('containerForm')

    setTimeout(() => {
    
      containerForm.style.opacity = "0"
      containerForm.style.marginRight = "0em"

    }, 500);

      containerForm.style.display = "flex"

  }


  send(){ 

    const email:any = document.getElementById('email')
    const name:any = document.getElementById('name')
    const about:any = document.getElementById('about')

    const body = {

      email: email.value,
      name: name.value,
      about: about.value

    }

    this.shared.getData(body).subscribe((config) => {


      console.log("data posted", config)

    })

  }

}
