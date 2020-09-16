const { listenerCount } = require("process");

const fs = require("fs").promises; // Evitar precisar fazer then/catch

init();
async function init() {
  await createJsonFile();
  await getStatesWithMoreOrLessCities(true); // para pegar os estados que tem mais cidades
  await getStatesWithMoreOrLessCities(false); // para pegar os estados que tem menos cidades
  await getBiggerOrSmallerNameCities(true); // maior nome de cidade
  await getBiggerOrSmallerNameCities(false); // menor nome de cidade
  await getBiggerOrSmallerCityName(true); // maior nome entre todos estados
  await getBiggerOrSmallerCityName(false); // menos nome entre todos estados
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
// que mais possuem cidades e dos cinco que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Você
// pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
// “UF - 74”, “UF - 72”, “UF - 65”]
async function getStatesWithMoreOrLessCities(more) {
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

  if (more) {
    list
      .slice(0, 5)
      .forEach((item) => result.push(`${item.uf} - ${item.count}`));
  } else {
    list.slice(-5).forEach((item) => result.push(`${item.uf} - ${item.count}`));
  }
}

// Criar um método que imprima no console um array com a cidade de maior nome de
// cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
// Cidade – UF”, ...].

// &&&

// Criar um método que imprima no console um array com a cidade de menor nome
// de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
// da Cidade – UF”, ...].
async function getBiggerOrSmallerNameCities(bigger) {
  const states = JSON.parse(await fs.readFile("./data/Estados.json"));
  const result = [];
  for (state of states) {
    let city;
    if (bigger) {
      city = await getBiggerName(state.Sigla);
    } else {
      city = await getSmallerName(state.Sigla);
    }
    result.push(`${city.Nome} - ${state.Sigla}`);
  }
  console.log(result);
}

async function getBiggerName(uf) {
  const cities = JSON.parse(await fs.readFile(`./output/${uf}.json`));

  let result;

  // prettier-ignore
  cities.forEach((city) => {
    if (!result) result = city;
    else if (city.Nome.length > result.Nome.length) result = city;
    else if (city.Nome.length === result.Nome.length && city.Nome.toLowerCase() < result.Nome.toLowerCase()) result = city;
  });

  return result;
}

async function getSmallerName(uf) {
  const cities = JSON.parse(await fs.readFile(`./output/${uf}.json`));

  let result;

  // prettier-ignore
  cities.forEach((city) => {
    if (!result) result = city;
    else if (city.Nome.length < result.Nome.length) result = city;
    else if (city.Nome.length === result.Nome.length && city.Nome.toLowerCase() < result.Nome.toLowerCase()) result = city;
  });

  return result;
}

// Criar um método que imprima no console a cidade de maior nome entre todos os
// estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".

// &&&

// Criar um método que imprima no console a cidade de menor nome entre todos os
// estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
async function getBiggerOrSmallerCityName(bigger) {
  const states = JSON.parse(await fs.readFile("./files/Estados.json"));
  const list = [];
  for (state of states) {
    let city;
    if (bigger) {
      city = await getBiggerName(state.Sigla);
    } else {
      city = await getSmallerName(state.Sigla);
    }
    list.push({ name: city.Nome, uf: state.Sigla });
  }
  const result = list.reduce((prev, current) => {
    if (bigger) {
      if (prev.name.length > current.name.length) return prev;
      else if (prev.name.length < current.name.length) return current;
      else
        return prev.name.toLowerCase() < current.name.toLowerCase()
          ? prev
          : current;
    } else {
      if (prev.name.length < current.name.length) return prev;
      else if (prev.name.length > current.name.length) return current;
      else
        return prev.name.toLowerCase() < current.name.toLowerCase()
          ? prev
          : current;
    }
  });
  console.log(`${result.name} - ${result.uf}`);
}
