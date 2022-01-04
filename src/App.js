import React, { Component } from 'react'
import './App.css';
import { Article } from './components/Article'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      commonWords: []
    };

    this.splitWords = this.splitWords.bind(this);
    this.wordFreq = this.wordFreq.bind(this);
  }

  splitWords = (string) => {
    const blacklist = ['the', '-', 'of', 'in', 'as', 'and', 'to', 'at', 'is', 'for', 'the', 'on', 'a', 'its', 'are', 'all', 'that', 'they', 'will', 'was', '#', 'chars]', ' '];
    var words = string.replace(/[.]/g, '').split(/\s/);
    var array = []

    words.forEach(word => {
      if (blacklist.includes(word)) return

      word = word.toLowerCase();
      word = word.replace(/[.:#]/g, '').split(/\s/);
      word = " #" + word;
      array.push(word)
    });

    return array
  }

  wordFreq = (words) => {
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    var keysSorted = Object.keys(freqMap).sort(function(a,b){
      return freqMap[b]-freqMap[a]
    })  

    var sliced = keysSorted.slice(0, 1);
    return sliced;
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

          var array = [];
          result.articles.forEach(item => {
            if (item.title){
              array.push(this.splitWords(item.title))
            }
          });
          

          var flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
          console.log(flatten(array))
          var commonWords = this.wordFreq(flatten(array))
          this.setState({commonWords: commonWords}) 

          

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
    const commonWrds = this.state.commonWords.join();


    return (
      <div style={{display:"grid", margin:"0 auto"}}>

      <div  style={{textAlign:"center", marginBottom:"30px"}}>
        <h1 style={{marginBottom:"10px"}}>Newstagram</h1>
        <p style={{margin:"0"}}>Top News from around the World</p>
        <small>Built with React JS</small>
        <p style={{paddingTop:"10px"}}><b>Trending:</b> {commonWrds}</p>
      </div>


          {isLoaded ? items.map((item) => {

            if (item.urlToImage){
                return <Article item={item} />
            } else {
                return
            }
              
          }): <p style={{textAlign:"center"}}>Loading...</p>}


          <div className="footer">
            <p>Version 1.0.0 - News from newsapi.org - <a href="https://github.com/hudsonbloom">github.com/hudsonbloom</a>
            
            </p>
          </div>
      </div>
    )
  }
}

export default App
