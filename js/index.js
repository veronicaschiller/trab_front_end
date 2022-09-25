const DivHistorico = document.querySelector(".Historico")
const spanBadge = document.querySelector("span.position-absolute ")
const btAdicionar = document.querySelector("#btnAdicionar")
const glicMomento = document.querySelector("#Gli")
const nph = document.querySelector("#Nph")
const complemento = document.querySelector("#Comp")
const rapida = document.querySelector("#Rap")

let insulinasSalvas
let insulinas

const carregaInsulina = async () => {
const dados = await axios.get("http://localhost:3000/insulina")
 insulinas = dados.data

 let resposta =  ""
 for (const insulina of insulinas) {
    resposta += `
    <div class="col-6 col-sm-4 col-md-3 mx-auto">
    <div class="card" style="width: 18rem; height: 18rem;">
      <div class="card-body">
        <h5 class="card-title fw-bold fs-3"> Dose ${insulina.id + 1}</h5>
        <p class="card-text fw-bold">Momento: ${insulina.Glicose_momento}</p>
        <p class="card-text fw-bold">NPh: ${insulina.Nph}</p>
        <p class="card-text fw-bold">Complemento: ${insulina.complemento}</p>
        <p class="card-text fw-bold">Rápida: ${insulina.Rapida}</p>
      </div>
    </div>    
  </div>  
  `
 }
 DivHistorico.innerHTML = resposta

 insulinasSalvas = localStorage.getItem("insulina") ? localStorage.getItem("insulina").split(";") :
 []
spanBadge.innerHTML= insulinasSalvas.length
}

window.addEventListener("load", carregaInsulina)

DivHistorico.addEventListener("click", e => {
  if(e.target.classList("btAdicionar")){
    const div = e.target.parentElement
  const tagH5 = div.querySelector("button")
  const idNome = tagH5.innerText
  
  const partes = idNome.split("-")

  const id = partes[0]

  insulinasSalvas.push(id)
 spanBadge.innerText = insulinasSalvas.length
 
 localStorage.setItem("insulina", insulinasSalvas.join(";"))
  }
})
btAdicionar.addEventListener("click", (e) =>{
  e.preventDefault()
  axios.post("http://localhost:3000/insulina",{
  Glicose_momento: glicMomento.value,
  Nph: nph.value,
  complemento: complemento.value,
  Rapida: rapida.value
})
carregaInsulina()
localStorage.setItem(btAdicionar)
})