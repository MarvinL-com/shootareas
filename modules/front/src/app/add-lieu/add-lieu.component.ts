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
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-lieu',
  templateUrl: './add-lieu.component.html',
  styleUrls: ['./add-lieu.component.scss']
})
export class AddLieuComponent implements OnInit {
  step: number = 0
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


  constructor(private fb: FormBuilder, private lieuService: LieuService, private cityService: CityService, private regionService: RegionService, private lsService: LocalStorageService, private router: Router) {
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
      nom: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      avis: new FormGroup({
        accessible: new FormControl(0),
        passage: new FormControl(3),
        nocturne: new FormControl(false),
        public: new FormControl(false),
        note: new FormControl(2),
        message: new FormControl(''),
        links: new FormControl('')
      })
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


  selectLieu = (lieu: Lieu): void => {
    //todo handle select existing Lieu
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
    const {region, city, localisation, avis} = this.newLieu
    switch (this.step) {
      case 0:
        return this.nom === '' || this.resultList.length > 0
      case 1:
        return region === undefined || city === undefined || localisation === undefined
      case 2:
        return !this.addLieuForm.valid
    }

  }

  prevStep(): void {
    this.step--
  }

  nextStep(): void {
    this.step++
  }

  goStep(step: number): void {
    this.step = step
  }

  moreLinks(): void {
    this.nbLinks.push(_.max(this.nbLinks) + 1)
  }

  lessLinks(id): void {
    this.nbLinks = this.nbLinks.filter((n, index) => id !== index)
  }

  handleSubmit(): void {
    //patch values from FORM to newLieu
    this.newLieu = {...this.newLieu, avis: this.addLieuForm.get('avis').value, nom: this.nom}

    //send newLieu to Back
    this.lieuService.doSaveLieu(this.newLieu).subscribe(lieu => {
      //success
      this.router.navigate(['/lieu/' + lieu.slug])
    })
  }
}
