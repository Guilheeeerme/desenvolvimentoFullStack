import React, { Component } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import InputFullSalary from "./components/InputFullSalary";
import InputReadOnly from "./components/InputReadOnly";
import { calculateSalaryFrom } from "./helpers/salary";
import Bar from "./components/Bar";

const COLOR_INSS = "#E67E22";
const COLOR_IRPF = "#C0392B";
const COLOR_NET_SALARY = "#16A085";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  handleFullSalaryChange = (newValue) => {
    this.setState({ fullSalary: newValue });
  };

  render() {
    const { fullSalary } = this.state;

    const salaryObject = calculateSalaryFrom(fullSalary);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percentINSS,
      percentIRPF,
      percentNetSalary,
    } = salaryObject;

    return (
      <div className="container">
        <h1>React Salário</h1>
        <div className="row">
          <InputFullSalary
            currentValue={fullSalary}
            onSalaryChange={this.handleFullSalaryChange}
          />
        </div>
        <div className="row">
          <InputReadOnly label="Base INSS" value={baseINSS} />
          <InputReadOnly
            label="Desconto INSS"
            value={discountINSS}
            percentage={percentINSS}
            color={COLOR_INSS}
          />
          <InputReadOnly label="Base IRPF" value={baseIRPF} />
          <InputReadOnly
            label="Desconto IRPF"
            value={discountIRPF}
            percentage={percentIRPF}
            color={COLOR_IRPF}
          />
          <InputReadOnly
            label="Salário Líquido"
            value={netSalary}
            percentage={percentNetSalary}
            color={COLOR_NET_SALARY}
          />
        </div>
        <Bar
          inss={percentINSS}
          irpf={percentIRPF}
          netSalary={percentNetSalary}
          colorINSS={COLOR_INSS}
          colorIRPF={COLOR_IRPF}
          colorNetSalary={COLOR_NET_SALARY}
        />
      </div>
    );
  }
}
