import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { TransactionsService } from "./transactions.service"
import { ZodPipe } from "@/pipes/zod.pipe"
import {
  SubmitTransactionsDto,
  submitTransactionsSchema,
} from "./dto/submit-transactions.dto"

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post("submit")
  @HttpCode(HttpStatus.OK)
  async submitTransactions(
    @Body(new ZodPipe(submitTransactionsSchema)) body: SubmitTransactionsDto
  ) {
    const result = await this.transactionsService.submitTransactions(
      body.transactions
    )
    console.log(result)

    return result
  }
}
