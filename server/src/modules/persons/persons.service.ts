import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"
import { Person } from "@/modules/persons/entities/person.entity"

@Injectable()
export class PersonsService {
  constructor(private dataSource: DataSource) {}

  get() {
    return this.dataSource.manager.find(Person)
  }
}
