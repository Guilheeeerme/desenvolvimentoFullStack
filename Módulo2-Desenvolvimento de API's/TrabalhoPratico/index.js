const fs = require("fs").promises;

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
createJsonFile();

/* Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. */
// prettier-ignore
// async function numberOfCities(uf) {
//   uf = uf.toLowerCase();
//   await fs.readFile(`${folder}${uf}.json`, (err, data) => {
//     if (err) throw err;

//     let cities = JSON.parse(data);
//     let mappedCities = cities.map((city) => {
//       return {
//         Cidade: city.Nome,
//       };
//     });
//     console.log(`O estado ${uf.toUpperCase()} possui ${mappedCities.length} cidades`);
//     console.log(mappedCities);
//   });
// }
// numberOfCities("ac");
