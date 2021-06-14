import { PostTag } from '@/utils/Request/PostTag'
import { useEffect, useState } from 'react'
import Request from '@/utils/Request'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { store } from '@/store'
import { RouteName } from '@/routes'

export default () => {
  const [isNew, setIsNew] = useState(false)
  const [selectedTag, setSelectedTag] = useState<PostTag | null>(null)
  const [tags, setTags] = useState<PostTag[]>([])
  const [tagsLoading, setTagsLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTag, setDeleteTag] = useState<PostTag | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const dispatch = useSelector(() => store.dispatch.common)

  const RetrieveAll = async () => {
    setTagsLoading(true)
    const res = await Request.PostTag.RetrieveAll()
    setTagsLoading(false)
    if (res?.data) {
      setTags(res.data)
    }
  }
  const handleEdit = (tag: PostTag) => {
    setIsNew(false)
    setSelectedTag(_.cloneDeep(tag))
  }
  const onEdit = async () => {
    setEditLoading(true)
    const res = await Request.PostTag.Edit(selectedTag as PostTag)
    setEditLoading(false)
    if (res?.data) {
      // 更新左侧Main数据
      const clonedTags: PostTag[] = _.cloneDeep(tags).map((v) =>
        v.id !== res.data!.id ? v : res.data,
      ) as PostTag[]
      setTags(clonedTags)
    }
  }
  const handleSave = () => {
    setIsNew(true)
    const defaultTag: PostTag = {
      name: '',
      description: '',
      slug: '',
      iconClass: '',
      iconColor: 'default',
    }
    setSelectedTag(defaultTag)
  }
  const onSave = async () => {
    setEditLoading(true)
    const res = await Request.PostTag.Create(selectedTag as PostTag)
    setEditLoading(false)
    if (res?.data) {
      // 更新左侧Main数据
      void RetrieveAll()
    }
  }
  const handleSubmit = () => {
    if (isNew) {
      void onSave()
    } else {
      void onEdit()
    }
  }
  const handleDeleteDialogOpen = (tag: PostTag) => {
    setDeleteDialogOpen(true)
    setDeleteTag(tag)
  }
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }
  const onDelete = async () => {
    if (!deleteTag) return
    setDeleteLoading(true)
    const res = await Request.PostTag.Delete(deleteTag.id as number)
    setDeleteLoading(false)
    const flag = res?.code === 0
    if (flag) {
      // 更新左侧Main数据
      void RetrieveAll()
    }
    return flag
  }

  useEffect(() => {
    void RetrieveAll()
    dispatch.SET_APPBAR_TITLE(`管理${RouteName.POST_TAG_ADMIN}`)
  }, [])

  return {
    isNew,
    tags,
    tagsLoading,
    editLoading,
    selectedTag,
    deleteDialogOpen,
    deleteTag,
    deleteLoading,
    setSelectedTag,
    handleEdit,
    handleSave,
    handleSubmit,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    onDelete,
  }
}
