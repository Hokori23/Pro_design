import unified from 'unified'

declare module 'rehype-components' {
  interface ComponentsProps {
    [key: string]: React.ReactNode
  }
  interface ComponentsOptions {
    components: ComponentsProps
  }
  function rehypeComponents(
    options: ComponentsOptions,
  ): unified.Processor.Transformer
  export = rehypeComponents
}
