const { listenerCount } = require("process");

const fs = require("fs").promises; // Evitar precisar fazer then/catch

init();
async function init() {
  await createJsonFile();
  await getStatesWithMoreCities();
}

/* Criar uma função que irá criar um arquivo JSON para cada estado representado no arquivo Estado.json,
e o seu conteúdo será um array das cidades pertencentes a aquele estado, de acordo com o arquivo Cidades.json.
O nome do arquivo deve ser o UF do estado, por exemplo: MG.json. */
async function createJsonFile() {
  let data = await fs.readFile("./data/Estados.json");
  const states = JSON.parse(data);

  data = await fs.readFile("./data/Cidades.json");
  const cities = JSON.parse(data);

  for (state of states) {
    const stateCities = cities.filter((city) => city.Estado === state.ID);
    await fs.writeFile(
      `./output/${state.Sigla}.json`,
      JSON.stringify(stateCities, null, 2),
      (err) => {
        if (err) throw err;
        console.log(err);
      }
    );
  }
}

/* Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. */
async function getCitiesCount(uf) {
  const data = await fs.readFile(`./output/${uf}.json`);
  const cities = JSON.parse(data);
  return `O estado ${uf} tem ${cities.length} cidades.`;
}

// Criar um método que imprima no console um array com o UF dos cinco estados
// que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
// pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
// “UF - 74”, “UF - 72”, “UF - 65”]

async function getStatesWithMoreCities() {
  const states = JSON.parse(await fs.readFile("./data/Estados.json"));
  const list = [];

  for (state of states) {
    const count = await getCitiesCount(state.Sigla);
    list.push({ uf: state.Sigla, count });
  }

  list.sort((a, b) => {
    if (a.count < b.count) return 1;
    else if (a.count > b.count) return -1;
    else return 0;
  });

  const result = [];
  list.slice(0, 5).forEach((item) => result.push(item.uf + " - " + item.count));

  console.log(result);
}
