import {Component, OnInit} from '@angular/core';
import {Lieu} from "../lieu";
import {LieuService} from "../lieu.service";
import {MessageService} from "../message.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss']
})
export class LieuxComponent implements OnInit {
  lieux: Lieu[]

  constructor(private lieuService: LieuService, private messageService: MessageService, private http: HttpClient) {
  }

  getLieux(): void {
    this.lieuService.doGetLieux().subscribe(lieux => this.lieux = lieux)
  }

  ngOnInit(): void {
    this.getLieux()
  }

}
