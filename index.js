// GET SCHEME ON PAGE LOAD
document.addEventListener('load', fetchColors())

// GET NEW SCHEME ON BUTTON CLICK
document.getElementById('get-color-btn').addEventListener('click', fetchColors)

document.addEventListener('click', e => {
  if(e.target.dataset.code){
    navigator.clipboard.writeText(e.target.dataset.code)

    e.target.setAttribute("data-tooltip", " Copied!!")
    
    setTimeout(function(){
      e.target.setAttribute("data-tooltip", "")
  }, 600);
  }
})

// ADD TOOLTIP OF "COPY TO CLIPBOARD" ON HOVER
document.addEventListener('mouseover', e => {
  if(e.target.dataset.code && window.matchMedia("(min-width: 400px)").matches){    
    e.target.setAttribute("data-tooltip", "Copy to clipboard")
  }
})

// TOOGLE NIGHT / DAY MODE

const changeModeBtn = document.getElementById('change-mode-btn')

  changeModeBtn.addEventListener('click', ()=> {
  document.body.classList.toggle('dark')
  document.getElementById('schemes-list').classList.toggle('dark')
  document.getElementById('get-color-btn').classList.toggle('dark')
  changeModeBtn.classList.toggle('dark')
})

// FETCH COLORS FROM API
function fetchColors() {
  const colorValue = document.getElementById('color-input').value.slice(1)
  const schemesValue = document.getElementById('schemes-list').value

  fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemesValue}&count=5`)
    .then(res => res.json())
    .then(data => getHtml(data)) 
}

// GET THE HTML & IDENTIFY EACH COLOR
function getHtml(data) {
  let htmlColors = ''
  let htmlCodes = ''
      data.colors.forEach(e => {
        htmlColors += `
          <div data-code="${e.hex.value}" id="${e.hex.value}" class="color" style="background-color:${e.hex.value}">
          </div>
          `
        htmlCodes += `
          <p data-code="${e.hex.value}" id="${e.hex.value}" class="hex">${e.hex.value}</p>
        `
        document.getElementById('colors').innerHTML = htmlColors
        document.getElementById('codes').innerHTML = htmlCodes
      })
}







