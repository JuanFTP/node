const socket = io();
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es requerido");
}

const lblDesktop = document.querySelector("#lbl-desktop");
const lblInFocus = document.querySelector("#lbl-in-focus");
const btnNextTicket = document.querySelector("#btn-next-ticket");

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
  /*socket.emit("create-ticket", null, (data) => {
		lblCreate.innerText = data.message;
	});*/
});
