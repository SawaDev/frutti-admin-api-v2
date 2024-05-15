import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID
});

export default {
  Upload: async (req: Request, res: Response) => {
    const file = req.file;
    if (file && process.env.AWS_BUCKET_NAME) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
      };

      try {
        const file = await s3.upload(params).promise();
        return res.status(StatusCodes.OK).send({ success: true, data: file.Location });
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error uploading file to S3');
      }
    }
    return res.status(StatusCodes.BAD_REQUEST).send('You didnt upload the file!');
  },
}
