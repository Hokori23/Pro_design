import { Router } from 'express'
import asyncWrapper from 'async-wrapper-express-ts'
import { UploadService } from '@service'
import { isUndef, Restful } from '@utils'
import { FileType } from '@service/UploadService'
import { CodeDictionary } from '@const'

const uploadRouter = Router()

/**
 * 获取上传token
 * @path /token
 * @param { string } fileName
 * @param { FileType } fileType
 */
uploadRouter.get(
  '/token',
  asyncWrapper(async (req, res, next) => {
    const { fileName, fileType } = req.query
    if (
      isUndef(fileName) ||
      isUndef(fileType) ||
      isUndef(FileType[Number(fileType)])
    ) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res
        .status(200)
        .json(
          UploadService.generateSignature(Number(fileType), fileName as string),
        )
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default uploadRouter
