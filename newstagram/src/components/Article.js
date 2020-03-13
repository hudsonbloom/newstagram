import React from 'react'
import '../App.css';
import moment from 'moment'
import { GetSourceLogo } from './GetSourceLogo'


export const Article = (props) => {

    const { item } = props;

    const author = item.author ? item.author : item.source.name;
    const logo = GetSourceLogo(item.source.name)
    return (
        <div style={{margin:"0 auto"}}>

        <div className="article-box">

        <div className="header">
                <img className="profilePic" src={logo}></img>
            
            <div className="nameBox">
                <p className="username">{author}</p>
                <p className="sourceName">{item.source.name}</p>
            </div>
            

        </div>
        <a href={item.url} target="_blank" >
            <img className="article-img" src={item.urlToImage}></img>
        </a>

        <div className="description">
            <p><b>{author}</b> {item.title}. {item.description}</p>
            <small>{moment(item.publishedAt).fromNow()}</small>
        </div>
        {/* <a href={item.url}><h3>{item.title}</h3></a> */}

            

            
        </div>
        </div>
    )
}

