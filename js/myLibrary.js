'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function changeWhenScroll(option) {
  /**
   * input
   * - elementChange: thêm dấu '.'
   * - classChange: không thêm dấu '.'
   * - scrollTopValue
   */
  document.onscroll = function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const filterHeight = $(option.elementChange)
    if (scrollTop > option.scrollTopValue) {
        filterHeight.classList.add(option.classChange)
    } else {
        filterHeight.classList.remove(option.classChange)
    }
  }
}

function tabUI(option) {
  /**
   * Tự động thêm activeClass cho các tab
   * Input
   * - tabs: phải thêm dấu '.'
   * - classActive: phải là class, không cần thêm dấu '.'
   * 
   * Khi sử dụng line thì thêm class cha của tabs
   * line và item ngang hàng
   * Input
   * - parentElement: phải thêm dấu '.'
   * - line: phải thêm dấu '.' 
   */
  const tabs = $$(option.tabs)
  const line = $(option.line)
  const tabActive = $(`.${option.classActive}`)
  let htmls = ''
  if (line) {
    line.style.width = `${tabActive.offsetWidth}px`
    line.style.left = `${tabActive.offsetLeft}px`
  }

  tabs.forEach(function(tab,index) {
    htmls += `<div class="allProductItem" id="id-${index}"></div>`
    tab.onclick = function() {
      $(`.${option.classActive}`).classList.remove(option.classActive)
      this.classList.add(option.classActive)

      if (line) {
        const parrent = $(option.parentElement)
        parrent.style.position = 'relative'
        line.style.position = 'absolute'
        line.style.width = `${this.offsetWidth}px`
        line.style.left = `${this.offsetLeft}px`
      }
      // pans.forEach(function(pan) {
        
      //   if (pan.id === ('id-'+ index)) {
      //     pan.classList.remove('display-none')
      //   } else {
      //     pan.classList.add('display-none')
      //   }
      // }) 
      if (pans) {
        pans.forEach(function(pan) {
          pan.style.display = 'none'
        })
        pans[index].style.display = 'flex'
        } 
    }
  })
  $(option.pansContainer).innerHTML = htmls
  const pans = $$(option.pans)
}  

function changeSizeWhenAction(option) {
  /**
   * input gồm
   *    - items: class hoặc id của 1 element, nhớ thêm dấu '.' hoặc '#'
        - action: hành đông thực hiện (ví dụ mousedown)
        - actionOpposite: hành động trái ngược (ví dụ mouseup)
        - scaleAfter: size sau khi thực hiện action (0 < size < 1)
        - transition
   */
  const items = document.querySelectorAll(option.items)
  items.forEach(function(item) {
    item.addEventListener(option.action, function() {
        item.style.transform = `scale(${option.scaleAfter})`
        item.style.transition = option.transition
    })

    item.addEventListener(option.actionOpposite, function() {
        item.style.transform = 'scale(1)'
        item.style.transition = option.transition
    })
})
}

function switchBtn(option) {
  /**
   * input
   * - frameElement:
   * - buttonElement:
   * - buttonOnElement:
   * - buttonOffElement:
   * - frame: {
          width:
          height:
          backgroundColor:
          borderRadius:
        },
  * - button: {
          width:
          height:
          backgroundColor:
          borderRadius:
          left:
        },       
  * - buttonActiveBackgroundColor: 'white',
  * - frameActiveBackgroundColor: '#222222'
  * 
  * Cách dùng
  * - frameElement là class cha lớn nhất
  * - sau đó là buttonElement
  * - cuối cùng là buttonOnElement và buttonOffElement ngang cấp nhau
   */
  let isOn = false
  const frame = $(option.frameElement)
  const button = $(option.buttonElement)
  const buttonOn = $(option.buttonOnElement)
  const buttonOff = $(option.buttonOffElement)

  const styles = `
  ${option.frameElement} {
    background-color: ${option.frame.backgroundColor};
    width: ${option.frame.width};
    height: ${option.frame.height};
    border-radius: ${option.frame.borderRadius};
    position: relative; 
    cursor:pointer;
  }

  ${option.frameElement}.frameActive {
    background-color: ${option.frameActiveBackgroundColor};
    transition: all 0.2s ease ;
  }
  
  ${option.buttonElement} {
    display: flex;
    position: absolute;
    content: '';
    background-color: ${option.button.backgroundColor};
    top: 50%;
    transform: translateY(-50%);
    left: ${option.button.left};
    width: ${option.button.width};
    height: ${option.button.height};
    border-radius: ${option.button.borderRadius};
    transition: all 0.2s ease;
  }
  
  ${option.buttonElement}.btnActive {
    background-color: ${option.buttonActiveBackgroundColor};
    left: calc(100% - ${option.button.width} - ${option.button.left});
    transition: all 0.2s ease ;
  } 

  ${option.buttonOnElement} {
    margin:auto;
    display: none
  }

  ${option.buttonOffElement} {
    margin: auto;
    display: block
  }

  .display-none {
    display: none !important;
  }

  .display-block {
    display: block !important;
  }
  `
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  frame.appendChild(styleSheet)

  frame.onclick = function() {
    if (isOn == false) {
      isOn = true
    } else isOn = false
    button.classList.toggle('btnActive')
    frame.classList.toggle('frameActive')
    buttonOn.classList.toggle('display-block')
    buttonOff.classList.toggle('display-none')
  }
}


function notFocusElement(option) {
  /* 
  input
  - logo:
  - currentLogoZ_index: 
  - layer: 
  - optionFrame: 
  - classWhenFocus: 

  cách dùng:
  - logo là class lớn nhất bao bọc layer và optionFrame
  - layer và optionFrame ngang hàng
  - classWhenFocus để !important, không cần thêm dấu '.'
  - logo, layer, optionFrame phải thêm dấu '.'
  - currentLogoZ_index là z-index hiện tại của logo
*/

  const logoOnclick = $(option.logo)
  const layerElement = $(option.layer)
  const optionElement = $(option.optionFrame)

  const layerStyles = `
  ${option.layer} {
    content: '';
    background-color: transparent;
    z-index: ${option.currentLogoZ_index + 1};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    cursor: default;
}
  `
  const styleSheet = document.createElement("style")
  styleSheet.innerText = layerStyles
  logoOnclick.appendChild(styleSheet)

  optionElement.style.zIndex = option.currentLogoZ_index + 2;

  logoOnclick.onclick = function() {
    optionElement.classList.add(option.classWhenFocus)
    layerElement.classList.add(option.classWhenFocus)
  }

  layerElement.onclick = function(e) {
    optionElement.classList.remove(option.classWhenFocus)
    layerElement.classList.remove(option.classWhenFocus)
    e.stopPropagation()
  }
}

function slideNotRepeat(option) {
  /**
   * thêm dấu '.' vào tất cả trừ transition và pxMove
   * input
   * selectItems
   * arrowPrev: nút prev 
   * arrowNext: nút next 
   * items: từng item,
   * container: class chứa tất cả item,
   * screenShow: class dùng để show ra cho user, class này sẽ xài thuộc tính overflow: hidden trong css
   * transition
   * pxMove: số px sẽ move khi nhất nút next hoặc prev
   * 
   * cách dùng:
   * selectItems là class cha to nhất
   * tiếp theo là arrowPrev,arrowNext,screenShow ngang cấp
   * screenShow là class cha của container
   * container là class cha của items
   */
  const selectElements = $$(option.selectItems)
  selectElements.forEach(function(selectElement) {
    const prevbtn = selectElement.querySelector(option.arrowPrev)
    const nextbtn = selectElement.querySelector(option.arrowNext)
    const itemElement = selectElement.querySelectorAll(option.items)
    const containerElement = selectElement.querySelector(option.container)
    const screenShowElement = selectElement.querySelector(option.screenShow)
    let index = 0
  
    const arrowStyle = `
    ${option.arrowNext}, ${option.arrowPrev} {
      font-size: 3rem;
      border: 0.05rem solid rgb(0 0 0/0.3);
      background-color: white;
      border-radius: 10rem;
      padding: 0.7rem;
      z-index: 1;
      height: 2.8rem;
      width: 2.8rem;
      margin: auto;
      cursor: pointer;
  }
  
  ${option.arrowNext}:hover, ${option.arrowPrev}:hover {
      transform: scale(1.04);
      box-shadow: 0 0.6rem 0.6rem rgba(0, 0, 0, 0.12);
  }
  
  ${option.arrowPrev} {
      display: none;
  }
  `
    const styleSheet = document.createElement("style")
    styleSheet.innerText = arrowStyle
    selectElement.appendChild(styleSheet)
  
    screenShowElement.style.overflow = 'hidden'
    const screenWidth = screenShowElement.offsetWidth
    let allElementWidth = 0
    itemElement.forEach(function(item) {
      allElementWidth+=item.offsetWidth
    })
  
    function prevFunc() {
      index--
      nextbtn.style.display = 'block'
      if (index <= 0) {
        index = 0
        prevbtn.style.display = 'none'
      }
      containerElement.style.transition =  option.transition
      containerElement.style.transform = `translateX(-${option.pxMove*index}px)`
    }
  
    function nextFunc() {
      index++
      prevbtn.style.display = 'block'
      containerElement.style.transition =  option.transition
      containerElement.style.transform = `translateX(-${option.pxMove*index}px)`
      let containerCurrentPosition = containerElement.style.transform.replace('translateX(','').replace('px)','')
      const screenWidth = screenShowElement.offsetWidth
      if (-containerCurrentPosition >= (allElementWidth-screenWidth)) {
        nextbtn.style.display = 'none'
        containerElement.style.transform = `translateX(-${allElementWidth-screenWidth}px)`
      } 
    }
  
    prevbtn.onclick = prevFunc
    nextbtn.onclick = nextFunc
  })
}

function render(option) {
  const renderElements = $$(option.elementRender);
  renderElements.forEach(function(renderElement,index) {
    let htmls = '';
    if (option.data[index] != undefined) {
      (option.data[index]).forEach(function(idPlace) {
          let imgData = function(img_src,imgClassname) {
            let result = ''
            for (let i = 0; i < img_src.length; i++) {
              result+=`<img src="${img_src[i]}" alt="" class="${imgClassname}">`
            }
            return result
          }
        let html = `
                <div class="productItem l-3" id=${idPlace.id}>
                    <div class="productItem__partShow">
                        <div class="img">
                            <div class="img__arrow-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                                    <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4">
                                    </path>
                                </svg>
                            </div>
                            <div class="img__screenShow">
                                <div class="screenShow__container">
                                  ${imgData(idPlace.img.img_src,idPlace.img.imgClassname)}
                                </div>
                            </div>
                            <div class="img__arrow-next">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                                    <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28">
            
                                    </path>
                                </svg>
                            </div>
                            <div class="host"></div>
                            <div class="favorite" value = ${idPlace.isFavorite}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
                                    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="productItem__infor">
                        <div class="place_and_rate">
                          <div class="place">
                          ${idPlace.infor.address}
                          </div>
                          <div class="rate">
                          <div class="rate__star">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 12px; width: 12px; fill: currentcolor;">
                              <path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
                            </svg>
                          </div>
                          <div class="rate__point">
                            ${idPlace.infor.rate}
                          </div>
                          </div>
                        </div>
                        <div class="hostInfor">Chủ nhà: <span>${idPlace.infor.host}</span></div>
                        <div class="dateInfor">
                          ${idPlace.infor.date}
                        </div>
                        <div class="price">
                          <span class="price__num">$${idPlace.infor.price}</span> / đêm
                        </div>
                    </div>
      
                </div>
        `
        htmls+=html
      })
      renderElement.innerHTML = htmls
    }
  })
}