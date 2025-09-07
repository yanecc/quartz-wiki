// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
// @ts-ignore
import imagePreviewScript from "./scripts/imagePreview.inline"
import imagePreviewStyle from "./styles/imagePreview.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return <div id="quartz-body">{children}</div>
}

Body.afterDOMLoaded = [clipboardScript, imagePreviewScript]
Body.css = [clipboardStyle, imagePreviewStyle]

export default (() => Body) satisfies QuartzComponentConstructor
