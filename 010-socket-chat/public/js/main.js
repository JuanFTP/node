const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8081/api/auth/"
  : "Heroku";

const formLogin = document.querySelector("#log-in-form");
const button = document.querySelector("#google_signout");

function handleCredentialResponse(response) {
  const body = { id_token: response.credential };

  fetch(url + "google-sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch(console.warn);
}

button.onclick = async () => {
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};

  for (let item of formLogin.elements) {
    if (item.name.length > 0) {
      formData[item.name] = item.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg);
      }

      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
