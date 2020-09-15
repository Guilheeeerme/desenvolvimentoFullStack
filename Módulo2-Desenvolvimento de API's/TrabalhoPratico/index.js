const fs = require("fs").promises; // Evitar precisar fazer then/catch

init();
async function init() {
  await createJsonFile();
  console.log(await getCitiesCount("SP"));
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
