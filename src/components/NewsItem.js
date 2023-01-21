import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl, newsAuthor, newsDate,source } = this.props
        return (
            <>
                <div className="card">
                    <div style={{display:'flex',position:'absolute',right:'0'}}>
                    <span className="badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
                        {source}
                    </span>
                    </div>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {newsAuthor ? newsAuthor : "Unknown"} On {new Date(newsDate).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem