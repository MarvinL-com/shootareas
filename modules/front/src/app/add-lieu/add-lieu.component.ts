import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Lieu} from "../lieu";
import {LieuService} from "../lieu.service";
import {LocalStorageService} from "../local-storage.service";
import {Region} from "../region";
import {Avis} from "../avis";
import {RegionService} from "../region.service";
import {CityService} from "../city.service";
import {LngLatLike} from "mapbox-gl";
import {City} from "../city";
import _ from 'lodash'

@Component({
  selector: 'app-add-lieu',
  templateUrl: './add-lieu.component.html',
  styleUrls: ['./add-lieu.component.scss']
})
export class AddLieuComponent implements OnInit {
  step: number = 2
  steps: Array<object> = [{title: 'Nom'}, {title: 'Localisation'}, {title: 'Avis'}]
  addLieuForm: FormGroup
  nbLinks: Array<number> = [0]

  resultList: Array<Lieu> = []
  regionList: Array<Region> = []
  cityList: Array<City> = []

  locationList: Array<object> = []
  location: object = {longitude: 0, latitude: 0}
  newLieu: Lieu = {
    id: null,
    nom: "",
    avis: undefined,
    created_at: null,
    eclaireur: this.lsService.getObject('user').id,
    localisation: undefined,
    region: undefined,
    city: undefined,
    shoots: undefined,
    slug: "",
  }


  constructor(private fb: FormBuilder, private lieuService: LieuService, private cityService: CityService, private regionService: RegionService, private lsService: LocalStorageService) {
  }

  get nom(): string {
    return this.addLieuForm.get('nom').value
  }

  get zip(): string {
    return this.newLieu.city?.zipcode + ' ' + this.newLieu.region.nom
  }

  get selectedRegion(): object {
    return this.addLieuForm.get('region').value
  }


  ngOnInit(): void {
    this.addLieuForm = this.fb.group({
      'nom': [''],
      region: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    })
    this.regionService.doGetRegions().subscribe(result => {
      this.regionList = result
    })
  }


  handleSearch(): void {
    if (this.nom === '') {
      this.resultList = []
      return
    }

    this.lieuService.doSearchLieuByNom(this.nom).subscribe((result) => {
      this.resultList = result
    })
  }


  selectLieu = (lieu: Lieu = null): void => {
    if (lieu !== null) {
      //todo handle select existing Lieu
      return
    }
    this.addLieuForm.patchValue({nom: this.nom})
  }

  selectRegion = (region): void => {
    //change map location
    this.location = region.coords
    this.newLieu.region = region
    // fetch cities
    this.cityService.doGetCitiesByRegion(region).subscribe(result => {
      this.cityList = result
    })
  }

  selectCity = (city): void => {
    //todo center on city
    this.newLieu.city = this.cityList[city]
  }

  updateLocation(coords: LngLatLike): void {
    this.newLieu.localisation = {...this.newLieu.localisation, ...coords}
  }

  isDisabled(): boolean {
    return this.nom === '' || this.resultList.length > 0
  }

  prevStep(): void {
    this.step--
  }

  nextStep(): void {
    this.step++
  }

  moreLinks(): void {
    this.nbLinks.push(_.max(this.nbLinks)+1)
  }

  lessLinks(id): void {
    console.log(this.nbLinks)
    this.nbLinks = this.nbLinks.filter((n, index) => id !== index)
  }

  handleSubmit(): void {
    switch (this.step) {
      case 0:
        this.selectLieu()
        this.nextStep()
        break
      default:
        break
    }
  }
}
