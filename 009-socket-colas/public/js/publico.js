const socket = io();

const lblTicket1 = document.querySelector("#lbl-ticket-1");
const lblTicket2 = document.querySelector("#lbl-ticket-2");
const lblTicket3 = document.querySelector("#lbl-ticket-3");
const lblTicket4 = document.querySelector("#lbl-ticket-4");

const lblDesktop1 = document.querySelector("#lbl-desktop-1");
const lblDesktop2 = document.querySelector("#lbl-desktop-2");
const lblDesktop3 = document.querySelector("#lbl-desktop-3");
const lblDesktop4 = document.querySelector("#lbl-desktop-4");

socket.on("recent", (payload) => {
  const audio = new Audio("./../audio/new-ticket.mp3");
  audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  lblTicket1.innerText = getLabel("Ticket ", ticket1?.id);
  lblTicket2.innerText = getLabel("Ticket ", ticket2?.id);
  lblTicket3.innerText = getLabel("Ticket ", ticket3?.id);
  lblTicket4.innerText = getLabel("Ticket ", ticket4?.id);

  lblDesktop1.innerText = getLabel("Desktop ", ticket1?.desktop);
  lblDesktop2.innerText = getLabel("Desktop ", ticket2?.desktop);
  lblDesktop3.innerText = getLabel("Desktop ", ticket3?.desktop);
  lblDesktop4.innerText = getLabel("Desktop ", ticket4?.desktop);
});

const getLabel = (type, number) => (number ? `${type} ${number}` : "");
