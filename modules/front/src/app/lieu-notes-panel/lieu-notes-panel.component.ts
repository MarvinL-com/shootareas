import {Component, Input, OnInit} from '@angular/core';
import {Avis} from "../avis";

@Component({
  selector: 'app-lieu-notes-panel',
  templateUrl: './lieu-notes-panel.component.html',
  styleUrls: ['./lieu-notes-panel.component.scss']
})
export class LieuNotesPanelComponent implements OnInit {
  criteres = {
    note: {
      0: "Vraiment naze",
      1: "Pas top",
      2: "Bof bof",
      3: "Mouais…",
      4: "Cool ! ",
      5: "The place to be"
    }, accessible: {
      0: "Les doigts dans le nez",
      1: "Facile",
      2: "Tranquille",
      3: "Normal",
      4: "Échauffement requis",
      5: "Réservé au casse-cous"
    }, passage: {
      0: "Désertique.",
      1: "Zen",
      2: "Un peu de passage",
      3: "On est pas chez mémé",
      4: "Y a foule",
      5: "Tout le monde est ici !"
    }
  }

  @Input()
  avis
    :
    Avis

  constructor() {
  }


  ngOnInit()
    :
    void {
  }

  getText(critere
            :
            string
  ) {
    switch (critere) {
      case "note": {
        switch (this.avis[critere]) {
          case 0:
          case 1:
            return
          case 2:
            return "Bof bof"
          case 3:
            return "Mouais…"
          case 4:
            return "Cool !"
          case 5:
            return "Génial"
        }
      }
    }
    return "pipi de chat"
  }
}
