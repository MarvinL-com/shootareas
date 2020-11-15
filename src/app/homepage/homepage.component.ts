import {Component, OnInit} from '@angular/core';
import {LieuService} from "../lieu.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private lieuService: LieuService, private location: Location) {
  }

  goRandomLieu(): void {
    this.lieuService.doGetLieuByRandom().subscribe(lieu=> {
      console.log(lieu)
      location.assign('/lieu/' + lieu.slug)
    })
  }

  ngOnInit(): void {
  }

}
