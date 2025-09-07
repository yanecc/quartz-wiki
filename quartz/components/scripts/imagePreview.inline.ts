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
  initialTranslateY: 0
}

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
let savedScrollPosition: number = 0 // 保存滚动位置

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

    // 清除之前的定时器
    if (percentageTimeout) {
      clearTimeout(percentageTimeout)
    }

    // 延长显示时间到3秒
    percentageTimeout = setTimeout(() => {
      percentage.style.display = 'none'
    }, 3000)
  }
}

const openPreview = (img: HTMLImageElement): void => {
  if (state.isActive) return

  // 保存当前滚动位置
  savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop

  currentImage = img
  state.isActive = true
  state.rotation = 0
  state.translateX = 0
  state.translateY = 0

  // 创建预览容器
  const previewHTML = createPreviewHTML()
  document.body.insertAdjacentHTML('beforeend', previewHTML)

  // 获取元素引用
  previewContainer = document.querySelector('.image-preview-overlay')
  previewImage = document.querySelector('.image-preview-img') as HTMLImageElement
  controlsContainer = document.querySelector('.image-preview-controls')
  scaleSlider = document.querySelector('.image-preview-zoom') as HTMLInputElement
  scalePercentage = document.querySelector('.scale-percentage')

  if (!previewContainer || !previewImage) return

  // 设置图片源
  previewImage.src = img.src
  previewImage.alt = img.alt

  // 等待图片加载完成后设置初始缩放
  previewImage.onload = () => {
    state.scale = calculateFitScale()
    updateImageTransform()
    updateScaleSlider()
  }

  // 绑定事件
  bindEvents()

  // 禁止页面滚动并显示预览
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollPosition}px`
  document.body.style.width = '100%'
  previewContainer.style.display = 'flex'
}

const closePreview = (): void => {
  if (!state.isActive || !previewContainer) return

  state.isActive = false
  state.isFullscreen = false

  // 恢复页面滚动
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''

  // 移除事件监听
  unbindEvents()

  // 移除预览容器
  previewContainer.remove()

  // 恢复滚动位置
  window.scrollTo({
    top: savedScrollPosition,
    behavior: 'instant' // 使用instant避免动画
  })

  // 清理引用
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

  // 重置位置和缩放
  setTimeout(() => {
    state.scale = calculateFitScale()
    resetPosition()
    updateScaleSlider()
  }, 100)
}

const handleMouseDown = (e: MouseEvent): void => {
  if (!previewImage || e.target !== previewImage) return

  state.isDragging = true
  state.dragStartX = e.clientX
  state.dragStartY = e.clientY
  state.initialTranslateX = state.translateX
  state.initialTranslateY = state.translateY

  previewImage.style.cursor = 'grabbing'
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent): void => {
  if (!state.isDragging || !previewImage) return

  const deltaX = e.clientX - state.dragStartX
  const deltaY = e.clientY - state.dragStartY

  state.translateX = state.initialTranslateX + deltaX
  state.translateY = state.initialTranslateY + deltaY

  updateImageTransform()
}

const handleMouseUp = (): void => {
  if (!state.isDragging || !previewImage) return

  state.isDragging = false
  previewImage.style.cursor = 'grab'
}

// 新增：触摸事件处理函数
const handleTouchStart = (e: TouchEvent): void => {
  if (!previewImage || e.target !== previewImage) return
  if (e.touches.length !== 1) return

  // 阻止默认行为，防止页面滚动
  e.preventDefault()

  const touch = e.touches[0]
  state.isDragging = true
  state.dragStartX = touch.clientX
  state.dragStartY = touch.clientY
  state.initialTranslateX = state.translateX
  state.initialTranslateY = state.translateY
}

const handleTouchMove = (e: TouchEvent): void => {
  if (!state.isDragging || !previewImage) return
  if (e.touches.length !== 1) return

  // 阻止默认行为，防止页面滚动
  e.preventDefault()

  const touch = e.touches[0]
  const deltaX = touch.clientX - state.dragStartX
  const deltaY = touch.clientY - state.dragStartY

  state.translateX = state.initialTranslateX + deltaX
  state.translateY = state.initialTranslateY + deltaY

  updateImageTransform()
}

const handleTouchEnd = (e: TouchEvent): void => {
  if (!state.isDragging || !previewImage) return

  state.isDragging = false
}

const handleDoubleClick = (e: MouseEvent): void => {
  if (!previewImage || e.target !== previewImage) return
  resetToInitialScale()
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
  }
}

const handleFullscreenChange = (): void => {
  const isCurrentlyFullscreen = !!(document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement)

  if (state.isFullscreen !== isCurrentlyFullscreen) {
    state.isFullscreen = isCurrentlyFullscreen

    // 重置位置和缩放
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

  // 鼠标悬停在滑块上时显示百分比
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

  // 鼠标拖拽事件
  previewImage?.addEventListener('mousedown', handleMouseDown)
  previewImage?.addEventListener('dblclick', handleDoubleClick)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)

  // 新增：触摸拖拽事件
  previewImage?.addEventListener('touchstart', handleTouchStart, { passive: false })
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
  document.addEventListener('touchcancel', handleTouchEnd)

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
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  // 解绑触摸事件
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
  document.removeEventListener('touchcancel', handleTouchEnd)

  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
}

// 初始化
document.addEventListener('nav', () => {
  // 为所有图片添加点击事件
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
