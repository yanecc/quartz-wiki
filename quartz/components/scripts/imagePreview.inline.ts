interface ImagePreviewState {
  isActive: boolean
  isDragging: boolean
  isFullscreen: boolean
  rotation: number
  scale: number
  translateX: number
  translateY: number
  dragStartX: number
  dragStartY: number
  initialTranslateX: number
  initialTranslateY: number
  // 新增：用于跟踪活动指针
  activePointerId: number | null
  // 新增：用于双击检测
  lastTapTime: number
  lastTapX: number
  lastTapY: number
}

const state: ImagePreviewState = {
  isActive: false,
  isDragging: false,
  isFullscreen: false,
  rotation: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
  dragStartX: 0,
  dragStartY: 0,
  initialTranslateX: 0,
  initialTranslateY: 0,
  activePointerId: null,
  lastTapTime: 0,
  lastTapX: 0,
  lastTapY: 0
}

// 双击检测配置
const DOUBLE_TAP_DELAY = 400 // 毫秒
const DOUBLE_TAP_TOLERANCE = 12 // 像素

// SVG图标定义
const SVG_ICONS = {
  rotateLeft: `<svg t="1757074645763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="735" data-spm-anchor-id="a313x.icontype_icons.0.i2.54293a816ao8iW" width="200" height="200"><path d="M576 576v64l-448.064-0.064v256L576 896v64H115.2a51.2 51.2 0 0 1-50.816-44.8L64 908.8V627.2a51.2 51.2 0 0 1 44.8-50.816L115.2 576H576z" fill="#FFFFAA" p-id="736" data-spm-anchor-id="a313x.icontype_icons.0.i3.54293a816ao8iW" class=""></path><path d="M908.8 64H627.2a51.2 51.2 0 0 0-51.2 51.2V960h332.8a51.2 51.2 0 0 0 51.2-51.2V115.2a51.2 51.2 0 0 0-51.2-51.2zM896 128v768h-256V128h256z" fill="#f4ea2a" p-id="737" data-spm-anchor-id="a313x.icontype_icons.0.i1.54293a816ao8iW" class=""></path><path d="M41.984 397.184l3.392 4.672 118.72 136.64a32 32 0 0 0 40.512 6.528l4.672-3.392 136.576-118.72a32 32 0 0 0-37.312-51.712l-4.672 3.392-85.44 74.24 0.192-8.704a288 288 0 0 1 287.68-274.432 32 32 0 0 0 0-64 352 352 0 0 0-351.232 328.96l-61.44-70.784a32 32 0 0 0-40.448-6.528l-4.672 3.392a32 32 0 0 0-6.528 40.448z" fill="#d81e06" p-id="738" data-spm-anchor-id="a313x.icontype_icons.0.i0.54293a816ao8iW" class="selected"></path></svg>`,
  rotateRight: `<svg t="1757074691325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1107" data-spm-anchor-id="a313x.icontype_icons.0.i8.54293a816ao8iW" width="200" height="200"><path d="M448 576v64l448.064-0.064v256L448 896v64h460.8a51.2 51.2 0 0 0 50.816-44.8l0.384-6.4V627.2a51.2 51.2 0 0 0-44.8-50.816L908.8 576H448z" fill="#FFFFAA" p-id="1108" data-spm-anchor-id="a313x.icontype_icons.0.i7.54293a816ao8iW" class=""></path><path d="M115.2 64h281.6a51.2 51.2 0 0 1 51.2 51.2V960H115.2a51.2 51.2 0 0 1-51.2-51.2V115.2a51.2 51.2 0 0 1 51.2-51.2zM128 128v768h256V128H128z" fill="#f4ea2a" p-id="1109" data-spm-anchor-id="a313x.icontype_icons.0.i6.54293a816ao8iW" class=""></path><path d="M982.016 397.184l-3.392 4.672-118.72 136.64a32 32 0 0 1-40.512 6.528l-4.672-3.392-136.576-118.72a32 32 0 0 1 37.312-51.712l4.672 3.392 85.44 74.24-0.192-8.704a288 288 0 0 0-287.68-274.432 32 32 0 0 1 0-64 352 352 0 0 1 351.232 328.96l61.44-70.784a32 32 0 0 1 40.448-6.528l4.672 3.392a32 32 0 0 1 6.528 40.448z" fill="#d81e06" p-id="1110" data-spm-anchor-id="a313x.icontype_icons.0.i9.54293a816ao8iW" class="selected"></path></svg>`,
  fullScreen: `<svg t="1757074462090" class="icon" viewBox="0 0 1068 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2281" width="200" height="200"><path d="M439.873957 585.07507l-241.52734 242.001853v-217.801668a41.092864 41.092864 0 1 0-82.090825-4.270621v321.720111a41.235218 41.235218 0 0 0 40.808156 41.282669h311.755329a41.282669 41.282669 0 1 0 0-82.565338H256.237257l241.52734-242.001854a41.140315 41.140315 0 0 0-57.89064-58.365152zM697.534754 443.195551l241.527341-242.001853v217.801668a41.092864 41.092864 0 0 0 82.090824 3.321594V102.020389a41.519926 41.519926 0 0 0-40.808155-41.282669h-311.755329a41.282669 41.282669 0 0 0 0 82.565338h212.58202l-241.52734 242.001854A40.997961 40.997961 0 0 0 697.534754 443.195551z" fill="#FF212A" p-id="2282"></path><path d="M157.538462 467.395737a42.326599 42.326599 0 0 0 42.231696-42.231696V214.954588c0-57.416126 54.569045-69.753475 100.122335-69.753476h168.452271a42.231696 42.231696 0 0 0 0-84.463392H299.892493c-113.883225 0-184.111214 58.839666-184.111214 154.216868v210.209453a41.899537 41.899537 0 0 0 41.757183 42.231696zM978.921223 560.874884a42.326599 42.326599 0 0 0-42.231696 42.231696v210.209453c0 57.416126-54.569045 69.753475-100.122335 69.753476h-168.452271a42.231696 42.231696 0 0 0 0 84.463392h168.452271c113.408712 0 184.111214-58.839666 184.111214-154.216868v-210.209453a41.614829 41.614829 0 0 0-41.757183-42.231696z" fill="#FFFFAA" p-id="2283" data-spm-anchor-id="a313x.icontype_icons.0.i6.54293a81xXfrdU" class="selected"></path></svg>`,
  close: `<svg t="1757079786302" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2881" width="200" height="200"><path d="M358.7584 219.7504h474.0608c65.4336 0 118.528 53.0432 118.528 118.528v474.0608c0 65.4336-53.0432 118.528-118.528 118.528H358.7584c-65.4336 0-118.528-53.0432-118.528-118.528V338.2784c0-65.4848 53.0432-118.528 118.528-118.528z" fill="#00a971" p-id="2882" data-spm-anchor-id="a313x.manage_type_mylikes.0.i21.2b333a81rA1CUb" class=""></path><path d="M660.1216 67.584H186.112c-65.4336 0-118.528 53.0432-118.528 118.528v474.0608c0 65.4336 53.0432 118.528 118.528 118.528h474.0608c65.4336 0 118.528-53.0432 118.528-118.528V186.112c-0.0512-65.4848-53.0944-118.528-118.5792-118.528z m-76.9024 387.9424H348.16l106.4448 102.5024c6.912 6.912 6.912 27.648-7.6288 37.632-14.5408 9.984-30.6176 6.912-37.5296 0L250.5216 435.6608c-3.1744-3.2256-5.1712-7.68-5.1712-12.544 0-4.9152 1.9968-9.3184 5.1712-12.544l158.9248-160c6.912-6.912 30.9248-14.9504 45.1584 0 14.2336 14.9504 6.912 33.4336 0 40.3456L348.16 388.3008h235.1104c9.728 0 23.9616 14.1312 23.9616 34.816s-14.2336 32.4096-24.0128 32.4096z" fill="#f4ea2a" p-id="2883" data-spm-anchor-id="a313x.manage_type_mylikes.0.i17.2b333a81rA1CUb" class=""></path></svg>`
}

let currentImage: HTMLImageElement | null = null
let previewContainer: HTMLElement | null = null
let previewImage: HTMLImageElement | null = null
let controlsContainer: HTMLElement | null = null
let scaleSlider: HTMLInputElement | null = null
let scalePercentage: HTMLElement | null = null
let percentageTimeout: NodeJS.Timeout | null = null
let savedScrollPosition: number = 0

const createPreviewHTML = (): string => {
  return `
    <div class="image-preview-overlay">
      <div class="image-preview-container">
        <img class="image-preview-img" />
        <div class="image-preview-controls">
          <div class="scale-container">
            <input type="range" class="image-preview-zoom" min="10" max="300" value="100" />
            <div class="scale-percentage">100%</div>
          </div>
          <div class="control-buttons">
            <button class="control-btn rotate-left" title="左旋90°">
              ${SVG_ICONS.rotateLeft}
            </button>
            <button class="control-btn rotate-right" title="右旋90°">
              ${SVG_ICONS.rotateRight}
            </button>
            <button class="control-btn fullscreen-toggle" title="全屏">
              ${SVG_ICONS.fullScreen}
            </button>
            <button class="control-btn close-preview" title="退出预览">
              ${SVG_ICONS.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

const calculateFitScale = (): number => {
  if (!previewImage || !currentImage) return 1

  const containerWidth = state.isFullscreen ? window.screen.width : window.innerWidth * 0.9
  const containerHeight = state.isFullscreen ? window.screen.height : window.innerHeight * 0.9

  const imageWidth = currentImage.naturalWidth
  const imageHeight = currentImage.naturalHeight

  const scaleX = containerWidth / imageWidth
  const scaleY = containerHeight / imageHeight

  return Math.min(scaleX, scaleY, 1)
}

const resetToInitialScale = (): void => {
  state.scale = calculateFitScale()
  state.translateX = 0
  state.translateY = 0
  updateImageTransform()
  updateScaleSlider()
}

const updateImageTransform = (): void => {
  if (!previewImage) return

  const transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale}) rotate(${state.rotation}deg)`
  previewImage.style.transform = transform
}

const resetPosition = (): void => {
  state.translateX = 0
  state.translateY = 0
  updateImageTransform()
}

const updateScaleSlider = (): void => {
  const slider = document.querySelector('.image-preview-zoom') as HTMLInputElement
  const percentage = document.querySelector('.scale-percentage') as HTMLElement
  if (slider && percentage) {
    const scalePercent = Math.round(state.scale * 100)
    slider.value = scalePercent.toString()
    percentage.textContent = `${scalePercent}%`
    percentage.style.display = 'block'

    if (percentageTimeout) {
      clearTimeout(percentageTimeout)
    }

    percentageTimeout = setTimeout(() => {
      percentage.style.display = 'none'
    }, 3000)
  }
}

// 检测双击（包括双击触摸）
const isDoubleTap = (x: number, y: number): boolean => {
  const currentTime = Date.now()
  const timeDiff = currentTime - state.lastTapTime
  const distanceX = Math.abs(x - state.lastTapX)
  const distanceY = Math.abs(y - state.lastTapY)

  state.lastTapTime = currentTime
  state.lastTapX = x
  state.lastTapY = y

  return timeDiff < DOUBLE_TAP_DELAY &&
         distanceX < DOUBLE_TAP_TOLERANCE &&
         distanceY < DOUBLE_TAP_TOLERANCE
}

// 使用 Pointer Events 处理拖拽开始
const handlePointerDown = (e: PointerEvent): void => {
  if (!previewImage || e.target !== previewImage) return

  // 如果已经有活动的指针，忽略新的指针（防止多点触控）
  if (state.activePointerId !== null && state.activePointerId !== e.pointerId) return

  // 阻止默认行为
  e.preventDefault()

  // 设置指针捕获
  previewImage.setPointerCapture(e.pointerId)

  // 检测双击
  if (e.pointerType === 'touch' || e.pointerType === 'pen') {
    if (isDoubleTap(e.clientX, e.clientY)) {
      resetToInitialScale()
      return
    }
  }

  state.activePointerId = e.pointerId
  state.isDragging = true
  state.dragStartX = e.clientX
  state.dragStartY = e.clientY
  state.initialTranslateX = state.translateX
  state.initialTranslateY = state.translateY

  previewImage.style.cursor = 'grabbing'
}

// 使用 Pointer Events 处理拖拽移动
const handlePointerMove = (e: PointerEvent): void => {
  if (!state.isDragging || !previewImage) return
  if (state.activePointerId !== e.pointerId) return

  e.preventDefault()

  const deltaX = e.clientX - state.dragStartX
  const deltaY = e.clientY - state.dragStartY

  state.translateX = state.initialTranslateX + deltaX
  state.translateY = state.initialTranslateY + deltaY

  updateImageTransform()
}

// 使用 Pointer Events 处理拖拽结束
const handlePointerUp = (e: PointerEvent): void => {
  if (!state.isDragging || !previewImage) return
  if (state.activePointerId !== e.pointerId) return

  // 释放指针捕获
  previewImage.releasePointerCapture(e.pointerId)

  state.isDragging = false
  state.activePointerId = null
  previewImage.style.cursor = 'grab'
}

// 处理指针取消事件
const handlePointerCancel = (e: PointerEvent): void => {
  if (!previewImage) return
  if (state.activePointerId !== e.pointerId) return

  // 释放指针捕获
  try {
    previewImage.releasePointerCapture(e.pointerId)
  } catch (error) {
    // 忽略释放捕获时的错误
  }

  state.isDragging = false
  state.activePointerId = null
  if (previewImage) {
    previewImage.style.cursor = 'grab'
  }
}

// 处理鼠标双击（仅针对鼠标设备）
const handleDoubleClick = (e: MouseEvent): void => {
  if (!previewImage || e.target !== previewImage) return
  resetToInitialScale()
}

// 处理鼠标滚轮缩放
const handleWheel = (e: WheelEvent): void => {
  if (!previewImage || e.target !== previewImage) return

  e.preventDefault()

  const delta = e.deltaY < 0 ? 1.1 : 0.9
  const newScale = Math.min(Math.max(state.scale * delta, 0.1), 3)

  state.scale = newScale
  updateImageTransform()
  updateScaleSlider()
}

const openPreview = (img: HTMLImageElement): void => {
  if (state.isActive) return

  savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop

  currentImage = img
  state.isActive = true
  state.rotation = 0
  state.translateX = 0
  state.translateY = 0
  state.activePointerId = null
  state.lastTapTime = 0
  state.lastTapX = 0
  state.lastTapY = 0

  const previewHTML = createPreviewHTML()
  document.body.insertAdjacentHTML('beforeend', previewHTML)

  previewContainer = document.querySelector('.image-preview-overlay')
  previewImage = document.querySelector('.image-preview-img') as HTMLImageElement
  controlsContainer = document.querySelector('.image-preview-controls')
  scaleSlider = document.querySelector('.image-preview-zoom') as HTMLInputElement
  scalePercentage = document.querySelector('.scale-percentage')

  if (!previewContainer || !previewImage) return

  previewImage.src = img.src
  previewImage.alt = img.alt

  previewImage.onload = () => {
    state.scale = calculateFitScale()
    updateImageTransform()
    updateScaleSlider()
    previewContainer!.style.display = 'flex'
  }

  bindEvents()

  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollPosition}px`
  document.body.style.width = '100%'
}

const closePreview = (): void => {
  if (!state.isActive || !previewContainer) return

  state.isActive = false
  state.isFullscreen = false

  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''

  unbindEvents()
  previewContainer.remove()

  window.scrollTo({
    top: savedScrollPosition,
    behavior: 'instant'
  })

  previewContainer = null
  previewImage = null
  controlsContainer = null
  scaleSlider = null
  scalePercentage = null
  currentImage = null
}

const rotateLeft = (): void => {
  state.rotation -= 90
  updateImageTransform()
}

const rotateRight = (): void => {
  state.rotation += 90
  updateImageTransform()
}

const toggleFullscreen = (): void => {
  if (!previewContainer) return

  state.isFullscreen = !state.isFullscreen

  if (state.isFullscreen) {
    previewContainer.requestFullscreen?.() ||
    (previewContainer as any).webkitRequestFullscreen?.() ||
    (previewContainer as any).msRequestFullscreen?.()
  } else {
    document.exitFullscreen?.() ||
    (document as any).webkitExitFullscreen?.() ||
    (document as any).msExitFullscreen?.()
  }

  setTimeout(() => {
    state.scale = calculateFitScale()
    resetPosition()
    updateScaleSlider()
  }, 100)
}

const handleScaleChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  const percentage = parseInt(target.value)
  state.scale = percentage / 100
  updateImageTransform()
  updateScaleSlider()
}

const handleKeyDown = (e: KeyboardEvent): void => {
  if (!state.isActive) return

  switch (e.key) {
    case 'Escape':
      closePreview()
      break
    case 'ArrowLeft':
      rotateLeft()
      break
    case 'ArrowRight':
      rotateRight()
      break
    case 'f':
    case 'F':
      toggleFullscreen()
      break
    case '+':
    case '=':
      state.scale = Math.min(state.scale * 1.1, 3)
      updateImageTransform()
      updateScaleSlider()
      break
    case '-':
    case '_':
      state.scale = Math.max(state.scale * 0.9, 0.1)
      updateImageTransform()
      updateScaleSlider()
      break
  }
}

const handleFullscreenChange = (): void => {
  const isCurrentlyFullscreen = !!(document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement)

  if (state.isFullscreen !== isCurrentlyFullscreen) {
    state.isFullscreen = isCurrentlyFullscreen

    setTimeout(() => {
      state.scale = calculateFitScale()
      resetPosition()
      updateScaleSlider()
    }, 100)
  }
}

const bindEvents = (): void => {
  if (!previewContainer) return

  // 控制按钮事件
  const rotateLeftBtn = previewContainer.querySelector('.rotate-left')
  const rotateRightBtn = previewContainer.querySelector('.rotate-right')
  const fullscreenBtn = previewContainer.querySelector('.fullscreen-toggle')
  const closeBtn = previewContainer.querySelector('.close-preview')

  rotateLeftBtn?.addEventListener('click', rotateLeft)
  rotateRightBtn?.addEventListener('click', rotateRight)
  fullscreenBtn?.addEventListener('click', toggleFullscreen)
  closeBtn?.addEventListener('click', closePreview)

  // 缩放滑块事件
  scaleSlider?.addEventListener('input', handleScaleChange)

  scaleSlider?.addEventListener('mouseenter', () => {
    const percentage = document.querySelector('.scale-percentage') as HTMLElement
    if (percentage) {
      percentage.style.display = 'block'
      if (percentageTimeout) {
        clearTimeout(percentageTimeout)
      }
    }
  })

  scaleSlider?.addEventListener('mouseleave', () => {
    const percentage = document.querySelector('.scale-percentage') as HTMLElement
    if (percentage) {
      percentageTimeout = setTimeout(() => {
        percentage.style.display = 'none'
      }, 1000)
    }
  })

  // 使用 Pointer Events 统一处理拖拽
  previewImage?.addEventListener('pointerdown', handlePointerDown)
  previewImage?.addEventListener('pointermove', handlePointerMove)
  previewImage?.addEventListener('pointerup', handlePointerUp)
  previewImage?.addEventListener('pointercancel', handlePointerCancel)

  // 仅为鼠标设备保留双击事件
  previewImage?.addEventListener('dblclick', handleDoubleClick)

  // 添加滚轮缩放支持
  previewImage?.addEventListener('wheel', handleWheel, { passive: false })

  // 键盘事件
  document.addEventListener('keydown', handleKeyDown)

  // 全屏变化事件
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)

  // 点击背景关闭
  previewContainer.addEventListener('click', (e) => {
    if (e.target === previewContainer) {
      closePreview()
    }
  })
}

const unbindEvents = (): void => {
  // 移除 Pointer Events
  if (previewImage) {
    previewImage.removeEventListener('pointerdown', handlePointerDown)
    previewImage.removeEventListener('pointermove', handlePointerMove)
    previewImage.removeEventListener('pointerup', handlePointerUp)
    previewImage.removeEventListener('pointercancel', handlePointerCancel)
    previewImage.removeEventListener('dblclick', handleDoubleClick)
    previewImage.removeEventListener('wheel', handleWheel)
  }

  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
}

// 初始化
document.addEventListener('nav', () => {
  const images = document.querySelectorAll('img')

  images.forEach(img => {
    const imageElement = img as HTMLImageElement

    const clickHandler = () => {
      openPreview(imageElement)
    }

    imageElement.addEventListener('click', clickHandler)
    imageElement.style.cursor = 'pointer'

    // 清理函数
    window.addCleanup(() => {
      imageElement.removeEventListener('click', clickHandler)
      imageElement.style.cursor = ''
    })
  })
})