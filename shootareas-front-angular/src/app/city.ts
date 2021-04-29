import {Region} from './region'

export interface City {
  id: number
  nom: string
  zipcode: number
  region: Region
}
