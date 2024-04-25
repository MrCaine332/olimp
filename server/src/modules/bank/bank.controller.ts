import { Controller, Get } from "@nestjs/common"
import { BankService } from "./bank.service"

@Controller("bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get("balance")
  async getBalance() {
    const data = await this.bankService.getBalance()
    return data
  }
}
