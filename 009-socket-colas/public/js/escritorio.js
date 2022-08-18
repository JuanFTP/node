const socket = io();
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es requerido");
}

const lblDesktop = document.querySelector("#lbl-desktop");
const lblInFocus = document.querySelector("#lbl-in-focus");
const lblMainInFocus = document.querySelector("#lbl-main-in-focus");
const lblAlert = document.querySelector("#lbl-alert");
const lblFollowing = document.querySelector("#lbl-following");

const btnNextTicket = document.querySelector("#btn-next-ticket");

const containerAlert = document.querySelector("#container-alert");

const desktop = searchParams.get("escritorio");

lblDesktop.innerText = `Desktop ${desktop}`;

socket.on("connect", () => {
  btnNextTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnNextTicket.disabled = true;
});

socket.on("last-ticket", (last_number) => {
  //lblCreate.innerText = `Ticket ${last_number}`;
});

btnNextTicket.addEventListener("click", () => {
  socket.emit("take-ticket", { desktop }, (payload) => {
    const { isCorrect, message, ticket, inList } = payload;

    if (!isCorrect) {
      lblMainInFocus.innerText = message;
      lblInFocus.innerText = "";
      containerAlert.style.display = "";
    } else {
      lblMainInFocus.innerText = "Atendiendo al ";
      lblInFocus.innerText = `Ticket ${ticket.id}`;
    }

    lblFollowing.innerText = inList ? inList : 0;
  });
});
