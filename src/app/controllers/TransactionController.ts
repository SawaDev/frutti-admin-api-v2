import { Client } from "app/models/Client";
import { Transaction } from "app/models/Transaction"
import { Wallet } from "app/models/Wallet";
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export default {
  Create: async (req: Request, res: Response) => {
    try {
      const trx = await Transaction.startTransaction();
      try {
        const data: Transaction = req.body

        if (data.client_id) {
          const existingClient = await Client.query(trx).findById(data.client_id).forUpdate()

          if (!existingClient) {
            trx.rollback()
            return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Client not found' });
          }

          await existingClient.$query(trx).patch({
            balance: existingClient.balance + data.amount * (data.distribution ? data.distribution : 1),
          });
        }

        const existingWallet = await Wallet.query(trx).findById(data.wallet_id).forUpdate()

        if (!existingWallet) {
          await trx.rollback()
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Wallet not found' });
        }

        await existingWallet.$query(trx).patch({
          balance: existingWallet.balance + data.amount,
        });

        const transaction = await Transaction.query(trx).insertAndFetch(data);

        await trx.commit();

        return res.send({ success: true, data: transaction })
      } catch (err) {
        await trx.rollback()
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  Update: async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    try {
      const existingTransaction = await Transaction.query().findById(id);

      if (!existingTransaction) {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Valyuta topilmadi!' });
      }

      const transaction = await Transaction.query().updateAndFetchById(id, {})

      return res.send({ success: true, data: transaction })
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Something went wrong!' });
    }
  },

  GetAll: async (req: Request, res: Response) => {
    const currencies = await Transaction
      .query()
      .select("id", "created_at", "type", "amount")
      .withGraphFetched("[client, wallet]")
    return res.send({ success: true, data: currencies })
  },

  Get: async (req: Request, res: Response) => {
    const { id } = req.params

    const existingTransaction = await Transaction
      .query()
      .select("id", "created_at", "type", "amount")
      .findById(id)
      .withGraphFetched("[client, wallet]")

    if (!existingTransaction) {
      return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: "Pul o'tkazmasi topilmadi!" });
    }

    return res.send({ success: true, data: existingTransaction })
  },

  Delete: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const trx = await Transaction.startTransaction()
      try {
        const existingTransaction = await Transaction.query().findById(id)

        if(!existingTransaction) {
          await trx.rollback()
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Transaction not found' });
        }

        if (existingTransaction?.client_id) {
          const existingClient = await Client.query(trx).findById(existingTransaction?.client_id).forUpdate()

          if (!existingClient) {
            trx.rollback()
            return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Client not found' });
          }

          await existingClient.$query(trx).patch({
            balance: existingClient.balance - existingTransaction.amount,
          });
        }

        const existingWallet = await Wallet.query(trx).findById(existingTransaction.wallet_id).forUpdate()

        if (!existingWallet) {
          await trx.rollback()
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Wallet not found' });
        }

        await existingWallet.$query(trx).patch({
          balance: existingWallet.balance - existingTransaction.amount,
        });

        await Transaction.query().deleteById(id)

        return res.send({ success: true, message: "Pul o'tkazmasi muvaffaqiyatli o'chirildi!" })
      } catch (err) {
        await trx.rollback()
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Something went wrong!' });
    }
  },
}
