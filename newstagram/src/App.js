import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { Article } from './components/Article'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://newsapi.org/v2/top-headlines?country=us&apiKey=70f4c4ff880c4fd1bbe25a646cc17644")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result.articles
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {

    const { isLoaded, items } = this.state;
    return (
      <div style={{display:"grid", margin:"0 auto"}}>

        <h1 style={{textAlign:"center"}}>Newstagram</h1>

          {isLoaded ? items.map((item) => {
              return (
                <Article item={item} />
              )
          }): <p>Loading...</p>}
        
      </div>
    )
  }
}

export default App
