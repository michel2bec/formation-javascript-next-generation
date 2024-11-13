// Les 3 classes du projet
// Les BO Business Object
 //---------------------------
class Entreprise{
    constructor(){
        this.personnes=[];
        this.equipes=[];
    }
}
//---------------------------
class Equipe{
    constructor(nom){
        this.nom = nom;
        this.personnes =[];
        this.id=Date.now();
    }
}
//---------------------------
class Personne{
    constructor(prenom='',nom='',id=''){
        this.prenom=prenom;
        this.nom=nom;
        this.id=Date.now();
    }
}
//---------------------------
let entreprise = new Entreprise();
//------------------------------------------------
const afficherEquipeHTML=()=>{
    let depot =document.getElementById('equipeDepot');
    depot.innerHTML='';
    const template = document.getElementById("templateEquipe");
    let selectE = document.getElementById('selectEquipe');
    selectE.innerHTML='';
    //----
    // pas d'equipe
    let option = document.createElement('option');
    option.value= -1;
    option.innerText="Pas d'équipe";
    selectE.appendChild(option);
    //----
    let i =0;
    for (let equipe of entreprise.equipes){
        // select equipe
        let option = document.createElement('option');
        option.value= i;
        option.innerText=equipe.nom;
        selectE.appendChild(option);
        // ---
        const clone = template.content.cloneNode(true);
        clone.querySelector("table").setAttribute('data-indice',i);
        let h3 = clone.querySelector("h3");
        h3.innerHTML= equipe.nom;
        btnDelEquipe = clone.querySelector('.btn-danger');
        btnDelEquipe.onclick=(evt)=>{
            let indice = evt.target.closest('table').dataset.indice;
            entreprise.equipes.splice(indice,1);
            afficherEquipeHTML();
        }
        // les personnes
        let depotPersonne = clone.querySelector('.tbodyEquipe');
        const templatePersonne = document.getElementById("templateEquipePersonne");
        let indicePersonne =0;
        for (let p of equipe.personnes ){
            const cloneP = templatePersonne.content.cloneNode(true);
            let td = cloneP.querySelectorAll('td');
            cloneP.querySelector('tr').setAttribute('data-indice',indicePersonne);
            td[0].innerHTML = p.prenom;
            td[1].innerHTML = p.nom;
            // btn onclick delete ...
            btnDelPersonne = cloneP.querySelector('.btn-danger');
            btnDelPersonne.onclick=(evt)=>{
                let iEquipe = evt.target.closest('table').dataset.indice;
                console.log(iEquipe);
                let iPersonne = evt.target.closest('tr').dataset.indice;
                console.log(iPersonne);
                entreprise.equipes[iEquipe].personnes.splice(iPersonne,1);
                afficherEquipeHTML();
            }
            depotPersonne.appendChild(cloneP);
            indicePersonne++;
        }// for personnes
        console.log(clone);
        depot.appendChild(clone);
        i++;
    }// for
   

}
//------------------------------------------------
const afficherPersonneHTML=()=>{
    let depot =document.getElementById('tbodyPersonne');
    depot.innerHTML='';
    const template = document.getElementById("templatePersonne");
    let i=0;
    for (let p of entreprise.personnes){
        const clone = template.content.cloneNode(true);
        clone.querySelector("tr").setAttribute('data-indice',i);
        let td =clone.querySelectorAll('td');
        td[0].innerHTML =p.prenom;
        td[1].innerHTML =p.nom;
        // onclick btn delete
        btnDelPersonne = clone.querySelector('.btn-danger');
        btnDelPersonne.onclick=(evt)=>{
            let i = evt.target.closest('tr').dataset.indice;
            console.log(entreprise.personnes[i].id);
            //let info = entreprises.equipes.map( e => )
            entreprise.personnes.splice(i,1);
            afficherPersonneHTML();
            }
        depot.appendChild(clone);
        i++;
    }
}

document.getElementById('btnAjouterEquipe').onclick=()=>{
    let nom = document.getElementById('equipe').value;
    document.getElementById('equipe').value='';// vider input
    let equipe = new Equipe(nom);
    entreprise.equipes.push(equipe);
    console.log(entreprise);
    afficherEquipeHTML();
}
document.getElementById('btnAjouterPersonne').onclick=()=>{
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const indiceEquipe = document.getElementById('selectEquipe').value;
    document.getElementById('nom').value='';
    document.getElementById('prenom').value='';
    document.getElementById('selectEquipe').value=-1;
  
    const p = new Personne(prenom,nom);
    entreprise.personnes.push(p);
    afficherPersonneHTML();
    if (indiceEquipe != -1){
        entreprise.equipes[indiceEquipe].personnes.push(p);
        afficherEquipeHTML();
    }
}