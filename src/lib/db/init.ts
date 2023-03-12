import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Person, GeonamesCity, GeonamesAdminArea } from './model'

export class Database extends Dexie {
  people!: Table<Person, number>
  geonamesCities!: Table<GeonamesCity, number>
  geonamesAdminAreas!: Table<GeonamesAdminArea, string>

  constructor() {
    super("transithd")
    this.version(1).stores({
      people: "++id, name",
      geonamesCities: "++id,nameAscii",
      geonamesAdminAreas: "id,nameAscii"
    })
  }
}

const database = new Database()
export default database

