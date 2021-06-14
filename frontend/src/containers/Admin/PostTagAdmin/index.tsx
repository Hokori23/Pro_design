import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from '@/routes'
import { useMediaQuery, useTheme } from '@material-ui/core'
import classnames from 'classnames'

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

const PostTagAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))
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
