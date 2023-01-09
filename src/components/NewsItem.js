import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl, newsAuthor, newsDate,source } = this.props
        return (
            <>
                <div className="card">
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
                        {source}
                    </span>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">By {newsAuthor ? newsAuthor : "Unknown"} On {new Date(newsDate).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem