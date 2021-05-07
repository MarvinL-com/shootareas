import {Avis} from "./avis";
import {Region} from "./region";
import {City} from "./city";
import {User} from "./user";

export interface Lieu {
  id: number
  nom: string
  slug: string
  localisation: object
  region: Region
  city: City
  eclaireur: User
  avis: Avis[]
  shoots: object
  created_at: string
}
