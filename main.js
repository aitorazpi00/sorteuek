if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sorteuek/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registrado con éxito:", registration);
    })
    .catch((error) => {
      console.log("Error al registrar el Service Worker:", error);
    });
}

function sorteue_elegiu(zein){
  if (zein === "sorteo"){
    window.location.href='/sorteuek/public/pertsonak_elegiu.html';
  }else
    window.location.href='/sorteuek/public/' + encodeURIComponent(zein) + '.html';
}

function pertsonak_aukerau(zein){
  window.location.href='/sorteuek/public/sorteo.html?pertsonak='+zein;
}