import React from 'react';
import ReactDOM from 'react-dom';

class ListItem extends React.Component {
  handleClick() {
    console.log(`You clicked ${this.props.name}!`);
  }

  render() {
    return (
      <li onClick={this.handleClick}>{this.props.name}</li>
    );
  }
}

class ListForm extends React.Component {
  saveComment(event) {
    event.preventDefault();
    this.props.onSaveComment(this.refs.name.value);
  }

  render()  {
    return (
      <form onSubmit={this.saveComment}>
        <input type="text" ref="name" />
        <button type="submit">Save</button>
      </form>
    );
  }
}

class ListMaker extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.state = {
      names: this.props.names
    };
  }

  // getInitialState() {
  //   return {
  //     names: this.props.names
  //   }
  // }

  addName(newName) {
    let names = this.state.names;
    names.push(newName);
    this.setState({
      names: names
    });
  }

  render() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} name={item} />
    });
    return (
      <div>
        <ul>
          {listItems}
        </ul>
        <ListForm onSaveComment={this.addName} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListMaker name={["Michealangelo", "Donatello", "Raphael", "Leonardo"]} /> ,
    document.querySelector('.app')
  );
})
