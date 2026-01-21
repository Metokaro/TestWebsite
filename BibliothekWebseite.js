const BuchAuswahl = document.getElementById("BuchAuswahl");
const postButton = document.getElementById("PostButton");
const deleteButton = document.getElementById("DeleteButton");
const editButton = document.getElementById("EditButton");
const notification = document.getElementById("Notification");

const NameEingabe = document.getElementById("NameEingabe");
const AutorEingabe = document.getElementById("AutorEingabe");
const ErscheinungsJahrEingabe = document.getElementById("ErscheinungsJahrEingabe");
const KurzeZusammenfassungEingabe = document.getElementById("KurzeZusammenfassungEingabe");

const BuchName = document.getElementById("BuchName");
const BuchAutor = document.getElementById("BuchAutor");
const BuchErscheinungsJahr = document.getElementById("BuchErscheinungsJahr");
const BuchZusammenfassung = document.getElementById("BuchZusammenfassung");

let buchListe = JSON.parse(localStorage.getItem("buchListe")) || [];

postButton.addEventListener("click", PostNewBook);
deleteButton.addEventListener("click", DeleteCurrentBook);
editButton.addEventListener("click", EditCurrentBook);

BuchAuswahl.addEventListener("change", function () { DisplayCurrentBook(BuchAuswahl.value) });
NameEingabe.addEventListener("change", function () { SwitchEditingMode(NameEingabe.value) });



console.log(buchListe.length);

let currentBook = undefined;

class BuchInfo {
    constructor(_buchName, _autorName, _erscheinungsJahr, _kurzeZusammenfassung) {
        this.buchName = _buchName;
        this.autorName = _autorName;
        this.erscheinungsJahr = _erscheinungsJahr;
        this.kurzeZusammenfassung = _kurzeZusammenfassung;
    }

}
if (buchListe.length < 1) {
   
    buchListe.push(new BuchInfo("Rich dad poor dad", "Robert T. Kiyosaki", 1997, "Handelt sich um die Denkweise einer Billionare, die aus nichts durch seine strenge Denkweise reich geworden ist"));

}

if (buchListe.length > 0) {
    for (let i = 0; i < buchListe.length; i++) {
        let neueBuch = buchListe[i];
        let buchOption = document.createElement("option");
        buchOption.innerHTML = neueBuch.buchName;
        BuchAuswahl.appendChild(buchOption);
    }
}

let beispielBuch = buchListe[0];
DisplayCurrentBook(beispielBuch.buchName);

function PostNewBook() {
    if (AutorEingabe.value && NameEingabe.value && KurzeZusammenfassungEingabe.value && ErscheinungsJahrEingabe.value)
    {
        
        let neueBuch = new BuchInfo(NameEingabe.value, AutorEingabe.value, ErscheinungsJahrEingabe.value, KurzeZusammenfassungEingabe.value);
        if (buchListe.filter((x) => x.buchName == neueBuch.buchName).length > 0)
        {
            buchListe.filter((x) => x.buchName == neueBuch.buchName)[0].autorName = neueBuch.autorName;
            buchListe.filter((x) => x.buchName == neueBuch.buchName)[0].erscheinungsJahr = neueBuch.erscheinungsJahr;
            buchListe.filter((x) => x.buchName == neueBuch.buchName)[0].kurzeZusammenfassung = neueBuch.kurzeZusammenfassung;
            DisplayCurrentBook(neueBuch.buchName);
            if (currentBook.buchName == neueBuch.buchName) {
                BuchAuswahl.value = neueBuch.buchName;
            }
            ShowNotification(neueBuch.buchName, false);
        }
        else
        {
            ShowNotification(neueBuch.buchName, false);
            buchListe.push(neueBuch);
            
            let buchOption = document.createElement("option");
            buchOption.innerHTML = neueBuch.buchName;
            BuchAuswahl.appendChild(buchOption);
            
            DisplayCurrentBook(neueBuch.buchName);
        }
       
        localStorage.setItem("buchListe", JSON.stringify(buchListe));
        ResetInputFields();
    }
}

function SwitchEditingMode(nameEingabe)
{
    console.log(nameEingabe);
    if (buchListe.filter((x) => x.buchName == nameEingabe).length > 0) {
        postButton.innerHTML = "Buch bearbeiten";
    }
    else {
        postButton.innerHTML = "Neue Buch eintragen";
    }
}

function EditCurrentBook()
{
    NameEingabe.value = currentBook.buchName;
    ErscheinungsJahrEingabe.value = currentBook.erscheinungsJahr;
    KurzeZusammenfassungEingabe.innerHTML = currentBook.kurzeZusammenfassung;
    AutorEingabe.value = currentBook.autorName;
}

function ResetInputFields()
{
    NameEingabe.value = "";
    ErscheinungsJahrEingabe.value = "";
    AutorEingabe.value = "";
    KurzeZusammenfassungEingabe.value = "";

}

function ShowNotification(currentBuchName, isDelete) {
    notification.hidden = false;
    if (isDelete) {
        notification.innerHTML = currentBuchName + " entfernt!";
        notification.style.color = "red";
    }
    else if (buchListe.filter((x) => x.buchName == currentBuchName).length > 0)
    {
        notification.innerHTML = currentBuchName + " bearbeitet!";
        notification.style.color = "yellow";
    }
    else
    {
        notification.innerHTML = currentBuchName + " eingetragen!";
        notification.style.color = "green";

    }
    setTimeout(() => {
        notification.hidden = true
            ;
    }, 1500)

}

function DeleteCurrentBook()
{
    buchListe = buchListe.filter((x) => x.buchName != currentBook.buchName);
    ShowNotification(currentBook.buchName, true);
    localStorage.setItem("buchListe", JSON.stringify(buchListe));
    BuchAuswahl.innerHTML = "";
    for (let i = 0; i < buchListe.length; i++) {
        let neueBuch = buchListe[i];
        let buchOption = document.createElement("option");
        buchOption.innerHTML = neueBuch.buchName;
        BuchAuswahl.appendChild(buchOption);
    }
    if (buchListe.length < 1) {
        BuchName.innerHTML = "";
        BuchAutor.innerHTML = "";
        BuchErscheinungsJahr.innerHTML = "";
        BuchZusammenfassung.innerHTML = "";
    }
    else {
        DisplayCurrentBook(BuchAuswahl.value);
    }
    
    
}

function DisplayCurrentBook(currentBook_name)
{
    currentBook = buchListe.filter((x) => x.buchName == currentBook_name)[0]
    BuchName.innerHTML = "Name: " + currentBook.buchName;
    BuchAutor.innerHTML = "Autor: " + currentBook.autorName;
    BuchErscheinungsJahr.innerHTML = "Erscheinungsjahr: " + currentBook.erscheinungsJahr;
    BuchZusammenfassung.innerHTML = currentBook.kurzeZusammenfassung;
}