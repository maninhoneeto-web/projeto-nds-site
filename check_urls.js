const https = require('https');
const urls = [
  'https://backend.intelbras.com/sites/default/files/2020-05/IM5-frontal-esquerda.jpg',
  'https://backend.intelbras.com/sites/default/files/2021-06/iM5-SC-Frente-Dir.jpg',
  'https://backend.intelbras.com/sites/default/files/2022-04/iM7-Full-Color_Perspectiva-1-1.jpg',
  'https://backend.intelbras.com/sites/default/files/2021-08/iM4-C-Frente_Esq_0.jpg'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, res.statusCode);
  });
});
