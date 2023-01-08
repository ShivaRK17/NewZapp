import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

// https://newsapi.org/v2/top-headlines?country=in&apiKey=ead588ece4d44a349a68f4e29090f4a8

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading :true,
            page:1,
            totalPages:0
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ead588ece4d44a349a68f4e29090f4a8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = fetch(url);
        data.then((val)=>{
            return val.json();
        }).then((val)=>{
            this.setState({articles:val.articles,totalPages:val.totalResults,loading:false})
        })
    }
    handlePrev = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ead588ece4d44a349a68f4e29090f4a8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = fetch(url);
        data.then((val)=>{
            return val.json();
        }).then((val)=>{
            this.setState({articles:val.articles,loading:false})
        })
        this.setState({page:this.state.page-1})
    }
    handleNext = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ead588ece4d44a349a68f4e29090f4a8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({page:this.state.page+1,articles:parsedData.articles,loading:false})
    }

  render() {
    return (
     <>
        <div className="container">
            <h1 className='text-center my-5'>NewZapp - Top Headlines</h1>
            {this.state.loading && <Spinner/>}
            {/* {this.state.articles.map((e)=>{console.log(e);})} */}
            <div className="row">
                {this.state.loading || this.state.articles.map((e)=>{
                    return <div className="col-md-4" key={e.url?e.url:""}>
                        <NewsItem  title={e.title?e.title:""} description={e.description?e.description:""} imgUrl ={e.urlToImage?e.urlToImage:`https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Indianapolis_Star%2C_2011.jpg/2000px-The_Indianapolis_Star%2C_2011.jpg`} newsUrl={e.url?e.url:""}/>
                        </div>
                })}
                {/* <div className="col-md-4">
                    <NewsItem title="MyTitle" description="This is some random content used to write desc" imgUrl = "https://images.livemint.com/img/2023/01/08/600x338/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bl_1673190621683_1673190622833_1673190622833.jpg"/>
                </div> */}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page===1} onClick={this.handlePrev} className='btn btn-dark m-4'>&larr; Previous</button>
                <button disabled={this.state.page>=Math.ceil(this.state.totalPages/this.props.pageSize)} onClick={this.handleNext} className='btn btn-dark m-4'>Next &rarr;</button>
            </div>
        </div>   
     </> 
    )
  }
}

export default News