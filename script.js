const inputs = document.querySelectorAll('.filters input')
const outputs = document.querySelectorAll('output')
const filters = document.querySelector('.filters')
const resetBtn = document.querySelector('.btn-reset')
const html = document.querySelector('html')
const nextBtn = document.querySelector('.btn-next')
const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/`;
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const slideContainer = document.querySelector('.slideContainer');
const slide = document.querySelector('.slide');
const loadBtn = document.querySelector('input[type="file"]');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const saveBtn = document.querySelector('.btn-save');
const fullScreen = document.querySelector('.fullscreen');

let i = -1

canvas.width = slide.width
canvas.height = slide.height

window.addEventListener('load', () => {
    ctx.drawImage(slide,0,0, canvas.width, canvas.height);

    loadBtn.classList.remove('btn-active')
    saveBtn.classList.remove('btn-active')
    nextBtn.classList.remove('btn-active')
    resetBtn.classList.remove('btn-active')
})

const filtersObject = {}

function handleUpdate(e) {
    const slide = document.querySelector('.slide');
    const suffix = e.target.dataset.sizing || '';
    e.target.nextElementSibling.innerText = e.target.value
    ctx.filter = `${e.target.name}(${e.target.value}${suffix})`
    ctx.drawImage(slide, 0, 0, slide.width,  slide.height);
    document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
}

filters.addEventListener('change', handleUpdate)

filters.addEventListener('mousemove', (e) => {
    if (e.target.type === 'range') {
        handleUpdate(e)
    }
})


// reset

resetBtn.addEventListener('click', e => {
    html.removeAttribute('style')

    outputs.forEach(el => el.previousElementSibling.name === 'saturate' ? el.innerText = 100 : el.innerText = 0)

    inputs.forEach(el => el.name === 'saturate' ? el.value = 100 : el.value = 0)

    loadBtn.classList.remove('btn-active')
    saveBtn.classList.remove('btn-active')
    nextBtn.classList.remove('btn-active')

    resetBtn.classList.add('btn-active')
})

// next
nextBtn.addEventListener('click', () => {
    const slideContainer = document.querySelector('.slideContainer');
    const index = ++i % images.length
    const img = new Image();
    let isLoading = true

    img.src = `${base}${getDayTime()}/${images[index]}`;
    img.classList.add('slide')
    
    img.onload = () => {      
        isLoading = false
        slideContainer.innerHTML = ''
        slideContainer.appendChild(img)
    }; 
    

    if (isLoading) {
        slideContainer.innerHTML = '<span class="loader">......loading</span>'
    }

    loadBtn.classList.remove('btn-active')
    saveBtn.classList.remove('btn-active')
    resetBtn.classList.remove('btn-active')

    nextBtn.classList.add('btn-active')
})

const getDayTime = () => {
    const DATE = new Date()

    if (DATE.getHours() >= 06 && DATE.getHours() < 12){
        return 'morning'
    } else if (DATE.getHours() >= 12 && DATE.getHours() < 18){
        return 'day'
    } else if (DATE.getHours() >= 18 && DATE.getHours() < 24){
        return 'evening'
    } else {
        return 'night'
    }
}

// load

loadBtn.addEventListener('change', function(e) {
    const file = loadBtn.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
        slide.setAttribute('src', reader.result)
    }
    reader.readAsDataURL(file);

    resetBtn.classList.remove('btn-active')
    saveBtn.classList.remove('btn-active')
    nextBtn.classList.remove('btn-active')

    loadBtn.classList.add('btn-active')
})


// save

saveBtn.addEventListener('click',  () => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL('image/jpeg');
    a.download = "image.jpg";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    resetBtn.classList.remove('btn-active')
    loadBtn.classList.remove('btn-active')
    nextBtn.classList.remove('btn-active')

    saveBtn.classList.add('btn-active')
})


// fullscreen
fullScreen.addEventListener('click', function() {
    if(!window.screenTop && !window.screenY){
        document.documentElement.requestFullscreen();
        fullScreen.classList.add('exit')
      } else{
        fullScreen.classList.remove('exit')
        document.exitFullscreen();
      }
})

//отключение контекст-меню
window.addEventListener('contextmenu', e => e.preventDefault())


