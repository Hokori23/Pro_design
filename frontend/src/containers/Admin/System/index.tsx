import React, { FC, Fragment } from 'react'
import { List, ListSubheader, Divider } from '@material-ui/core'

// hooks
import useStyles from './useStyles'
import useSystem, { EditDialogProps, FormattedOptionItem } from './useSystem'

// components
import { ListItemValue } from '@/components/ListItemValue'
import EditDialog from './EditDialog'
import EditDialogInput from './EditDialogInput'

interface SystemModuleProps {
  module: string
  option: FormattedOptionItem
  className?: string
  innerClassName?: string
  handleEditDialogOpen: (
    props: Omit<Omit<EditDialogProps, 'open'>, 'valid'>,
  ) => void
}
const SystemModule: FC<SystemModuleProps> = ({
  module,
  option,
  className,
  innerClassName,
  handleEditDialogOpen,
}) => {
  return (
    <Fragment>
      <ListSubheader>{module}</ListSubheader>

      {Object.keys(option).map((key) => {
        return (
          <ListItemValue
            className={className}
            innerClassName={innerClassName}
            key={key}
            onClick={() =>
              handleEditDialogOpen({
                title: `修改${key}`,
                key,
                module,
              })
            }
            primary={key}
            value={option[key].value}
          />
        )
      })}
    </Fragment>
  )
}

const System: FC = () => {
  const classes = useStyles()
  const {
    loading,
    blogConfig,
    clonedBlogConfig,
    editDialog,
    setClonedBlogConfig,
    handleEditDialogClose,
    handleEditDialogOpen,
    handleEditDialogSubmit,
  } = useSystem()
  return (
    <div className={classes.root}>
      <section className={classes.system}>
        <List
          className={classes.systemItem}
          component="nav"
          subheader={<ListSubheader component="div">博客设置</ListSubheader>}
        >
          <Divider light />
          {Object.keys(blogConfig).map((module) => (
            <SystemModule
              className={classes.ValueWrapper}
              handleEditDialogOpen={handleEditDialogOpen}
              innerClassName={classes.ValueInner}
              key={module}
              module={module}
              option={blogConfig[module]}
            />
          ))}
        </List>

        <EditDialog
          handleClose={handleEditDialogClose}
          handleSubmit={handleEditDialogSubmit}
          loading={loading}
          open={editDialog.open}
          title={editDialog.title}
        >
          <EditDialogInput
            blogConfig={clonedBlogConfig}
            itemKey={editDialog.key}
            loading={loading}
            module={editDialog.module}
            setBlogConfig={setClonedBlogConfig}
          />
        </EditDialog>
      </section>
    </div>
  )
}

export default System
