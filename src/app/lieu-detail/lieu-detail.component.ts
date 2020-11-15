import {Component, OnInit} from '@angular/core';
import {Lieu} from "../lieu";
import {ActivatedRoute} from "@angular/router";
import {LieuService} from "../lieu.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-lieu-detail',
  templateUrl: './lieu-detail.component.html',
  styleUrls: ['./lieu-detail.component.scss']
})
export class LieuDetailComponent implements OnInit {
  lieu: Lieu

  constructor(
    private lieuService: LieuService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getLieu()
  }

  getLieu(): void {
    const slug = this.route.snapshot.paramMap.get('slug')
    this.lieuService.doGetLieuBySlug(slug).subscribe(lieux => this.lieu = lieux[0])
  }

  goBack(): void {
    this.location.back()
  }
}
