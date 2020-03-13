import React from 'react'
import '../App.css';
import moment from 'moment'

export const Article = (props) => {

    const { item } = props;

    const author = item.author ? item.author : item.source.name;
    return (
        <div style={{margin:"0 auto"}}>

        <div className="article-box">

        <div className="header">
            <p className="username">{author}</p>
            <p className="sourceName">{item.source.name}</p>

        </div>
        <img className="article-img" src={item.urlToImage}></img>

        <div className="description">
            <p><b>{author}</b> {item.description}</p>
            <small>{moment(item.publishedAt).fromNow()}</small>
        </div>
        {/* <a href={item.url}><h3>{item.title}</h3></a> */}

            

            
        </div>
        </div>
    )
}
