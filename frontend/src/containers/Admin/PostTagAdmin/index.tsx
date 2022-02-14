import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from '@/routes'
import classnames from 'classnames'
import { useMobileSize } from '@/hooks/useScreenSize'

// hooks
import usePostTagAdmin from './usePostTagAdmin'
import useStyles, { computeStyles } from './useStyles'

// components
import Main from './Main'
import Edit from './Edit'
import DeleteDialog from './DeleteDialog'
import AddTag from './AddTag'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

const PostTagAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const isMobileSize = useMobileSize()
  const state = useSelector((state: RootState) => state.common)
  const {
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
  } = usePostTagAdmin()
  const theme = useTheme()
  const { childStyle, fabStyle } = computeStyles(state, theme)

  return (
    <div className={classes.root}>
      <section className={classes.gap1}></section>
      <section
        className={classnames('spread-box', classes.tags)}
        style={childStyle}
      >
        <Main
          handleDelete={handleDeleteDialogOpen}
          handleEdit={handleEdit}
          loading={tagsLoading}
          selectedTag={selectedTag}
          tags={tags}
        />
      </section>
      <section className={classes.gap2}></section>
      <section
        className={classnames('spread-box', classes.edit)}
        style={childStyle}
      >
        <Edit
          isNew={isNew}
          loading={editLoading}
          onSubmit={handleSubmit}
          setTag={setSelectedTag}
          tag={selectedTag}
        />
      </section>
      <section className={classes.gap1}></section>
      <DeleteDialog
        deleteTag={deleteTag}
        isMobileSize={isMobileSize}
        loading={deleteLoading}
        onBackdropClick={handleDeleteDialogClose}
        onClose={handleDeleteDialogClose}
        onDelete={onDelete}
        open={deleteDialogOpen}
      />
      <AddTag
        className={classes.fab}
        isMobileSize={isMobileSize}
        onClick={handleSave}
        style={fabStyle}
      />
    </div>
  )
}

export default PostTagAdmin
