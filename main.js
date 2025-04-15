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

let muslayek = ['Thor', 'Gorka', 'Ame', 'Zabarte', 'Merino', 'Txiki', 'Umerez', 'Una', 'Bersa', 'Etxe', 'Carrizo'];

let ekipokuk = ['Alex', 'Arraio Jr', 'Arraio', 'Arru', 'Arka', 'Thor', 'Carrizo', 'Elortxa', 'Eritz', 
  'Gaitan', 'Garate', 'Estevez', 'Etxe', 'Joxe', 'Javi', 'Leta', 'Juan Mari', 'Patxi',
  'Noga', 'Pablo', 'Peña', 'Luken', 'Uranga', 'Josu', 'Tximi'
]

function sorteue_elegiu(zein){
  window.location.href='/sorteuek/pertsonak.html?sorteue=' + encodeURIComponent(zein);
}

function pertsonak_elegiu(zein){
  const urlParams = new URLSearchParams(window.location.search);
  const sorteue = urlParams.get('sorteue');
  if(zein == 1){
    localStorage.setItem('pertsonak', JSON.stringify(muslayek));
  }else{
    localStorage.setItem('pertsonak', JSON.stringify(ekipokuk));
  }
  window.location.href='/sorteuek/public/'+ sorteue + '.html';
}
