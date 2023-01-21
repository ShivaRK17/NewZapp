import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

// https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}

export class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize :12,
        category:'general',
    }
    static propTypes = {
        country:PropTypes.string.isRequired,
        pageSize:PropTypes.number.isRequired,
        category:PropTypes.string.isRequired
    }
    
    
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading :true,
            page:1,
            totalPages:0
        }
        document.title = `${this.props.category[0].toUpperCase()+this.props.category.slice(1)} - NewZapp`
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalPages:Math.ceil(parsedData.totalResults/this.props.pageSize)
        })
    }
    // handlePrev = async ()=>{
    //     this.setState({page:this.state.page-1})
    //     this.updateNews()
    // }
    // handleNext = async ()=>{
    //     this.setState({page:this.state.page+1});
    //     this.updateNews()
    // }
    fetchMoreData = async ()=>{
        this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            loading:false,
            totalPages:Math.ceil(parsedData.totalResults/this.props.pageSize)
        })
    }

  render() {
    return (
     <>
            <h1 className='text-center my-5'>NewZapp - {this.props.category[0].toUpperCase()+this.props.category.slice(1)==="General"?"Top":this.props.category[0].toUpperCase()+this.props.category.slice(1)} Headlines</h1>
            {this.state.loading && <Spinner/>}
            {/* {this.state.articles.map((e)=>{console.log(e);})} */}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.page<=this.state.totalPages}
                loader={<Spinner/>}
            >
            <div className="container">
                <div className="row">
                    {this.state.articles.map((e,index)=>{
                        return <div className="col-md-4" key={index}>
                            <NewsItem  title={e.title?e.title:""} description={e.description?e.description:""} imgUrl ={e.urlToImage?e.urlToImage:`https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Indianapolis_Star%2C_2011.jpg/2000px-The_Indianapolis_Star%2C_2011.jpg`} source={e.source.name} newsAuthor={e.author} newsDate={e.publishedAt} newsUrl={e.url?e.url:""}/>
                            </div>
                    })}
                </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page===1} onClick={this.handlePrev} className='btn btn-dark m-4'>&larr; Previous</button>
                <button disabled={this.state.page>=Math.ceil(this.state.totalPages/this.props.pageSize)} onClick={this.handleNext} className='btn btn-dark m-4'>Next &rarr;</button>
            </div> */}
     </> 
    )
  }
}

export default News