import { Post } from "app/models/Post"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { updateObjectById } from "utils/functions";
import { v4 as uuidv4 } from "uuid"

export default {
  Create: async (req: Request, res: Response) => {
    const data = req.body
    const post = await Post.query().insertAndFetch(data)
    return res.send({ success: true, data: post })
  },

  Update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const trx = await Post.startTransaction();

      try {
        const existingPost = await Post.query(trx).findById(id).forUpdate();

        if (!existingPost) {
          await trx.rollback();
          return res.status(404).send({ success: false, message: 'Post not found' });
        }

        if (data.details) {
          existingPost.details.push(...data.details);
        }

        await existingPost.$query(trx).patch({
          name: data.name || existingPost.name,
          description: data.description || existingPost.description,
          published: data.published || existingPost.published,
          details: existingPost.details,
        });

        const updatedPost = await Post.query(trx)
          .select('id', 'name', 'description', 'published', 'details', 'created_at', 'updated_at')
          .findById(id);

        await trx.commit();

        return res.send({ success: true, data: updatedPost });
      } catch (error) {
        await trx.rollback();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  AddDetail: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const trx = await Post.startTransaction();

      try {
        const existingPost = await Post.query(trx).findById(id).forUpdate();

        if (!existingPost) {
          await trx.rollback();
          return res.status(404).send({ success: false, message: 'Post not found' });
        }

        const shortUuid = uuidv4().replace(/-/g, '').substring(0, 8);

        if (data) {
          existingPost.details.push({
            id: shortUuid,
            ...data
          });
        }

        await existingPost.$query(trx).patch({
          details: existingPost.details,
        });

        const updatedPost = await Post.query(trx)
          .select('id', 'name', 'description', 'published', 'details', 'created_at', 'updated_at')
          .findById(id);

        await trx.commit();

        return res.send({ success: true, data: updatedPost });
      } catch (error) {
        await trx.rollback();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  UpdateDetail: async (req: Request, res: Response) => {
    try {
      const { id, detailId } = req.params;
      const data = req.body;

      const trx = await Post.startTransaction();

      try {
        const existingPost = await Post.query(trx).findById(id).forUpdate();

        if (!existingPost) {
          await trx.rollback();
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Post not found' });
        }

        const detailsUpdated = updateObjectById(existingPost.details, detailId, data)

        await existingPost.$query(trx).patch({
          details: detailsUpdated,
        });

        const updatedPost = await Post.query(trx)
          .select('id', 'name', 'description', 'published', 'details', 'created_at', 'updated_at')
          .findById(id);

        await trx.commit();

        return res.send({ success: true, data: updatedPost });
      } catch (error) {
        await trx.rollback();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  CopyDetail: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const { id, detailId } = req.params;

      const trx = await Post.startTransaction();

      try {
        const existingPost = await Post.query(trx).findById(id).forUpdate();

        const targetDetail = existingPost?.details.find(detail => detail.id === detailId)

        if (!existingPost) {
          await trx.rollback();
          return res.status(404).send({ success: false, message: `Post with id ${id} not found` });
        }

        if (!targetDetail?.image) return res.status(StatusCodes.BAD_REQUEST).send({ success: false, message: "Image not found" })

        const newDetails = Array.from({ length: data.count }).map((_) => ({
          ...targetDetail,
          id: uuidv4().replace(/-/g, '').substring(0, 8),
        }));

        existingPost.details.push(...newDetails);

        await existingPost.$query(trx).patch({
          details: existingPost.details,
        });

        const updatedPost = await Post.query(trx)
          .select('id', 'name', 'description', 'published', 'details', 'created_at', 'updated_at')
          .findById(id);

        await trx.commit();

        return res.send({ success: true, data: updatedPost });
      } catch (error) {
        await trx.rollback();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  GetAll: async (req: Request, res: Response) => {
    const posts = await Post.query().select("id", "created_at", "name", "published", "description", "details")
    return res.send({ success: true, data: posts })
  },

  Get: async (req: Request, res: Response) => {
    const { id } = req.params

    const post = await Post.query().select("id", "created_at", "name", "published", "description", "details").findById(id)

    if (!post) return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: "Post not found!" })

    return res.send({ success: true, data: post })
  },

  Delete: async (req: Request, res: Response) => {
    const { id } = req.params
    await Post.query().deleteById(id)
    return res.send({ success: true, message: "Post deleted successfully" })
  },

  DeleteDetail: async (req: Request, res: Response) => {
    try {
      const { id, detailId } = req.params;
      const trx = await Post.startTransaction();

      try {
        const existingPost = await Post.query(trx).findById(id).forUpdate();

        if (!existingPost) {
          await trx.rollback();
          return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Post not found' });
        }

        const detailsUpdated = existingPost.details.filter((detail) => {
          return detail.id !== detailId
        })

        await existingPost.$query(trx).patch({
          details: detailsUpdated,
        });

        await trx.commit();

        return res.send({ success: true, message: 'Detail deleted successfully!' });
      } catch (error) {
        await trx.rollback();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  },

  CreateMany: async (req: Request, res: Response) => {
    const dataArray = req.body;
    const createdPosts: Post[] = [];

    for (const data of dataArray) {
      const post = await Post.query().insertAndFetch(data);
      createdPosts.push(post);
    }

    return res.send({ success: true, data: createdPosts });
  },

  CreateManyDetail: async (req: Request, res: Response) => {
    try {
      const postsData = req.body;

      const trx = await Post.startTransaction();

      try {
        const updatedPosts: (Post | undefined)[] = [];

        for (const postData of postsData) {
          const { id, details } = postData;

          const existingPost = await Post.query(trx).findById(id).forUpdate();

          if (!existingPost) {
            await trx.rollback();
            return res.status(404).send({ success: false, message: `Post with id ${id} not found` });
          }

          const newDetails = details.map(detail => ({
            id: uuidv4().replace(/-/g, '').substring(0, 8),
            ...detail
          }));

          existingPost.details.push(...newDetails);

          await existingPost.$query(trx).patch({
            details: existingPost.details,
          });

          const updatedPost = await Post.query(trx)
            .select('id', 'name', 'description', 'published', 'details', 'created_at', 'updated_at')
            .findById(id);

          updatedPosts.push(updatedPost);
        }

        await trx.commit();

        return res.send({ success: true, data: updatedPosts });
      } catch (error) {
        await trx.rollback();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Internal server error' });
    }
  }
}
