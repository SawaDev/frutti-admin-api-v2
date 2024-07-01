import { Expense } from "app/models/Expense"
import { ExpenseCategory } from "app/models/ExpenseCategory"
import { Wallet } from "app/models/Wallet"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export default {
  CreateCategory: async (req: Request, res: Response) => {
    const data: ExpenseCategory = req.body

    const expenseCategory = await ExpenseCategory.query().insertAndFetch(data);

    return res.send({ success: true, data: expenseCategory })
  },

  UpdateCategory: async (req: Request, res: Response) => {
    const data = req.body;
    const { categoryId } = req.params;

    const expenseCategory = await ExpenseCategory.query().updateAndFetchById(categoryId, data);

    if (!expenseCategory) {
      return res.status(404).send({ error: 'Expense category not found' });
    }

    res.send(expenseCategory);
  },

  GetAllExpenseCategories: async (req: Request, res: Response) => {
    const expenses = await ExpenseCategory.query().select("")
    return res.send({ success: true, data: expenses })
  },

  Create: async (req: Request, res: Response) => {
    try {
      const trx = await Expense.startTransaction()
      try {
        const data: Expense = req.body

        const existingWallet = await Wallet.query(trx).findById(data.wallet_id)

        if (!existingWallet) return res.status(StatusCodes.BAD_REQUEST).send({ success: false, message: "Wallet not found!" })

        if (data.category_id) {

          const existingExpenseCategory = await ExpenseCategory.query(trx).findById(data.category_id)

          if (!existingExpenseCategory) return res.status(StatusCodes.BAD_REQUEST).send({ success: false, message: "Category not found!" })
        }

        await existingWallet.$query(trx).patch({
          balance: existingWallet.balance - data.amount,
        });

        const expense = await Expense.query(trx).insertAndFetch(data)

        await trx.commit();
        return res.send({ success: true, data: expense })
      } catch (err) {
        await trx.rollback()
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  GetAll: async (req: Request, res: Response) => {
    const expenses = await Expense
      .query().select()
      .withGraphFetched("[expense_category, wallet]")
    return res.send({ success: true, data: expenses })
  },

  Get: async (req: Request, res: Response) => {
    const { id } = req.params

    const existingExpense = await Expense.query().select().withGraphFetched("[expense_category, wallet]").findById(id)

    if (!existingExpense) {
      return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Harajat topilmadi!' });
    }

    return res.send({ success: true, data: existingExpense })
  },

  Delete: async (req: Request, res: Response) => {
    const { id } = req.params
    await Expense.query().deleteById(id)
    try {
      const trx = await Expense.startTransaction()
      try {
        const existingExpense = await Expense.query().findById(id)

        if (!existingExpense) {
          await trx.rollback()
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Expense not found' });
        }

        const existingWallet = await Wallet.query(trx).findById(existingExpense.wallet_id).forUpdate()

        if (!existingWallet) {
          await trx.rollback()
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Wallet not found' });
        }

        await existingWallet.$query(trx).patch({
          balance: existingWallet.balance + existingExpense.amount,
        });

        await Expense.query().deleteById(id)

        return res.send({ success: true, message: "Harajat muvaffaqiyatli o'chirildi!" })
      } catch (err) {
        await trx.rollback()
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Something went wrong!' });
    }
  },
}
