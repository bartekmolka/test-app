import React, { Component } from 'react'
import ColorsContext, { ColorsContextType } from '../contexts/useContext';
import { ColorRGB } from '../types/Color';

import styles from '../styles/form.module.scss';

export default class FilterColor extends Component {
  static contextType = ColorsContext;

  ctx = this.context as ColorsContextType
  setFilters = this.ctx.setFilters;

  state: ColorRGB = this.ctx.filters as ColorRGB;

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.target.value);
    const name: string = e.target.name;
    this.setState(({ [name]: value }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setFilters(this.state);
  };

  handleReset = () => {
    this.setFilters({ red: -1, green: -1, blue: -1, saturation: -1 });
  }
  
  render() {
    return (
      <div>
        <h1> Filter colors by giving % of minimum color value in rgb 🖍️ 🌈</h1>
        <form onSubmit={e => this.handleSubmit(e)} className={styles.form}>
          <input type="text" id="colorInput" name="red" placeholder="RED" onChange={e => this.handleChange(e)} />
          <input type="text" id="colorInput" name="green" placeholder="BLUE" onChange={e => this.handleChange(e)} />
          <input type="text" id="colorInput" name="blue" placeholder="GREEN" onChange={e => this.handleChange(e)} />
          <input type="text" id="colorInput" name="saturation" placeholder="SATURATION" onChange={e => this.handleChange(e)} />
          <input type="submit" value="Filter" />
          <input type="reset" value="Reset" onClick={this.handleReset} />
        </form>
      </div>
    )
  }
}