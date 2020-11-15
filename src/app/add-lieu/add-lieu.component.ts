import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Lieu} from "../lieu";
import {LieuService} from "../lieu.service";
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-add-lieu',
  templateUrl: './add-lieu.component.html',
  styleUrls: ['./add-lieu.component.scss']
})
export class AddLieuComponent implements OnInit {
  step: number = 0
  addLieuForm: FormGroup
  resultList: Array<Lieu> = []
  newLieu: Lieu = {
    id: null,
    nom: "",
    avis: undefined,
    created_at: null,
    eclaireur: this.lsService.getObject('user').id,
    localisation: undefined,
    region: undefined,
    shoots: undefined,
    slug: "",
  }


  constructor(private fb: FormBuilder, private lieuService: LieuService, private lsService: LocalStorageService) {
  }

  get nom(): string {
    return this.addLieuForm.get('nom').value
  }

  ngOnInit(): void {
    this.addLieuForm = this.fb.group({'nom': ['']})
  }

  handleSearch() {
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
    console.log('selectLieu', this.nom)
    this.addLieuForm.patchValue({nom: this.nom})
  }

  isDisabled(): boolean {
    return this.nom === ''
  }

  prevStep(): void {
    this.step--
  }

  nextStep(): void {
    this.step++
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
