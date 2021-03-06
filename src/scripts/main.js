import React from 'react';
import ReactDOM from 'react-dom';

class ListItem extends React.Component {
  handleClick() {
    this.props.onRemove(this.props.index);
  }

  render() {
    return (
      <li onClick={this.handleClick.bind(this)}>{this.props.name}</li>
    );
  }
}

class ListForm extends React.Component {
  saveComment(event) {
    event.preventDefault();
    this.props.onSaveComment(this.refs.name.value);
  }

  render() {
    return (
      <form onSubmit={this.saveComment.bind(this)}>
        <input type="text" ref="name" />
        <button type="submit">Save</button>
      </form>
    );
  }
}

class ListMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: this.props.names
    };
  }

  addName(newName) {
    let names = this.state.names.slice();
    names.push(newName);
    this.setState({
      names: names
    });
  }

  removeName(index) {
    let names = this.state.names.slice();
    names.splice(index, 1);
    this.setState({
      names: names
    });
  }

  render() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} name={item} onRemove={this.removeName.bind(this)} index={i}/>
    });
    return (
      <div>
        <h1> React List Maker </h1>
        <ul>
          {listItems}
        </ul>
        <ListForm onSaveComment={this.addName.bind(this)} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListMaker names={["Alpha", "Bravo", "Charlie", "Alpha", "Charlie", "Bravo"]} /> ,
    document.querySelector('.app')
  );
})
