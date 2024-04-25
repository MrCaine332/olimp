import { Controller, Get } from "@nestjs/common"
import { PersonsService } from "./persons.service"

@Controller("persons")
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  async get() {
    const persons = await this.personsService.get()
    return persons
  }
}
