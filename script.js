function runSlider() {
  const photos = [
    {
      text: 'Rostov-on-Don, Admiral',
      img: 'https://on-desktop.com/wps/2017Animals___Cats_Sad_red_cat_standing_on_green_grass_116984_.jpg'
    },
    {
      text: 'Sochi Thieves',
      img: 'https://s1.stc.all.kpcdn.net/putevoditel/projectid_103889/images/tild3463-3139-4630-b563-646166616434__20180225_gaf_uw8_101.jpg'
    },
    {
      text: 'Rostov-on-Don Patriotic',
      img: 'https://a-stathttpsic.besthdwallpaper.com/scared-kitten-wallpaper-2560x2048-85267_33.jpg'
    }
  ]

  const photoDescriptions = [
    {
      apartmentArea: '81 m2',
      repairTime: '3.5 months',
      repairCost: 'Upon request'
    },
    {
      apartmentArea: '105 m2',
      repairTime: '4 months',
      repairCost: 'Upon request'
    },
    {
      apartmentArea: '93 m2',
      repairTime: '3 months',
      repairCost: 'Upon request'
    },
  ]

  if (!photos.length) return

  let arrowsBox = document.querySelector('.arrows')
  let left = '<span class="left">&#10229;</span>'
  arrowsBox.innerHTML = left
  for (let i = 0; i < photos.length; i ++) {
    let dot = document.createElement('span')
    dot.innerHTML = ` &#8226;`
    dot.classList.add('dot')
    arrowsBox.append(dot)
  }
  let right = '<span class="right">&#10230;</span>'
  arrowsBox.innerHTML += right
  let leftArrow = document.querySelector('.arrows .left')
  let rightArrow = document.querySelector('.arrows .right')
  let imageContainer = document.querySelector('.container__image')
  let switchBox = document.querySelector('.switch-box')
  let listInfo = document.querySelector('.list')
  let dotsBox = arrowsBox.getElementsByClassName('dot')
  console.log(arrowsBox)
  console.log('.', dotsBox[0])
  let index = 0

  for (let i = 0; i < photos.length; i++) {
    let box = document.createElement('div')
    box.style.display = 'inline-block'
    let rectangle = document.createElement('div')
    rectangle.classList.add('rectangle')
    let btn = document.createElement('button')
    btn.textContent = photos[i].text
    btn.classList.add('btn')
    rectangle.style.width = `${btn.textContent.length * 8}px`
    box.append(btn, rectangle)
    switchBox.append(box)
  }

  let buttons = switchBox.querySelectorAll('.btn')
  buttons[0].classList.add('isActive')
  buttons[0].nextElementSibling.classList.add('rectangle-active')
  dotsBox[0].classList.add('dot-active')
  getImage()
  putText()

  function getIndexActive(collection) {
    for (let i = 0; i < collection.children.length; i++) {
      let divBtn = collection.children[i].querySelector('.btn')
      if (divBtn.classList.contains('isActive')) return i
    }
  }
  function getImage(i = 0) {
    let src = photos[i].img
    imageContainer.style.backgroundImage = `url(${src})`
  }
  function putText(k = 0) {
    let items = listInfo.querySelectorAll('.item')
    let objValues = Object.values(photoDescriptions[k])
    for (let i = 0; i < items.length; i++) {
      let textSpan = items[i].querySelector('span')
      if (i === 0) {
        textSpan.textContent = photos[k].text
      }
      else {
        textSpan.textContent = objValues[i-1]
      }
    }
  }

  function addClass() {
    for (let k = 0; k < photos.length; k++) {
      let btnBox = switchBox.children[k].querySelector('.btn')
      let rectBox = switchBox.children[k].querySelector('.rectangle')
      let dot = dotsBox[k]
      if (btnBox.classList.contains('isActive')) {
        btnBox.classList.remove('isActive')
        rectBox.classList.remove('rectangle-active')
      }
      if (dot.classList.contains('dot-active')) {
        dot.classList.remove('dot-active')
      }
    }
  }

  getIndexActive(switchBox)
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
      addClass()
      let target = event.target
      target.classList.add('isActive')
      target.nextElementSibling.classList.add('rectangle-active')
      index = getIndexActive(switchBox)
      dotsBox[index].classList.add('dot-active')
      getImage(index)
      putText(index)
    })
  }

  leftArrow.addEventListener('click', () => {
    index--
    if (index < 0) {
      while(index + photos.length < 0) {
        index += photos.length
      }
    }
    index = (index + photos.length) % photos.length
    addClass()
    buttons[index].classList.add('isActive')
    buttons[index].nextElementSibling.classList.add('rectangle-active')
    dotsBox[index].classList.add('dot-active')
    getImage(index)
    putText(index)
  })
  rightArrow.addEventListener('click', () => {
    index = (++index) % photos.length
    addClass()
    buttons[index].classList.add('isActive')
    buttons[index].nextElementSibling.classList.add('rectangle-active')
    dotsBox[index].classList.add('dot-active')
    getImage(index)
    putText(index)
  })
  console.log(leftArrow)
  console.log(rightArrow)
}
document.addEventListener('DOMContentLoaded', runSlider)
  