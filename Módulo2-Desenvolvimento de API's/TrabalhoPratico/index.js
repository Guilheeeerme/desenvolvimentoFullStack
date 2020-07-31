const fs = require("fs");

const cities = require("./data/Cidades.json");
const states = require("./data/Estados.json");

const folder = "./Módulo2-Desenvolvimento de API's/TrabalhoPratico/output";

const info = [];

/* Criar uma função que irá criar um arquivo JSON para cada estado representado no arquivo Estado.json,
e o seu conteúdo será um array das cidades pertencentes a aquele estado, de acordo com o arquivo Cidades.json.
O nome do arquivo deve ser o UF do estado, por exemplo: MG.json. */
function getInfos() {
  states.forEach((state) => {
    info.push(cities.filter((city) => city.Estado === state.ID));
  });
  return info;
}
getInfos();

// prettier-ignore
async function createJsonFile() {
  for (let i = 0; i < info.length; i++)
    await fs.writeFile(`./${folder}/${states[i].Sigla}.json`, JSON.stringify(info[i], null, 2),
    (err) => {
      if (err) throw err;
      console.log(err);
    });
}
createJsonFile();

/* Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. */
// prettier-ignore
async function numberOfCities(uf) {
  uf = uf.toLowerCase();
  await fs.readFile(`./${folder}/${uf}.json`, (err, data) => {
    if (err) throw err;

    let cities = JSON.parse(data);
    let mappedCities = cities.map((city) => {
      return {
        Cidade: city.Nome,
      };
    });
    console.log(`O estado ${uf.toUpperCase()} possui ${mappedCities.length} cidades`);
    console.log(mappedCities);
  });
}
numberOfCities("ac");
