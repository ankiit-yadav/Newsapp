import React,{Component} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


class News extends Component {

  static defaultProps = {
     country:'in',
     pages:7,
     category:'science'

  };
  static propTypes = {
     country:PropTypes.string,
     pages:PropTypes.number,
     category:PropTypes.string

  };


  constructor() {
    super();
    this.state={
      page:1,
      articles:[],
      loading:false
    }
  }

    async componentDidMount( ) {
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bdb2db6384f4a478e81919c093a064d&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData= await data.json();
    //  console.log(parsedData);
      this.setState({        
          articles:parsedData.articles,
          results:parsedData.totalResults,
          loading:false
      })
    }

      handleNextChange=async ()=>{
       // console.log(1);
       if(this.state.page+1>Math.ceil(this.state.results/9)){

       }
       else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bdb2db6384f4a478e81919c093a064d&page=${this.state.page +1}&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData= await data.json();
      this.setState({
           page:this.state.page+1,        
          articles:parsedData.articles,
          loading:false
      })
    }

    }

    handlePrevChange= async ()=>{
      //console.log(1);
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bdb2db6384f4a478e81919c093a064d&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData= await data.json();
      this.setState({
           page:this.state.page-1,        
          articles:parsedData.articles,
          loading:false
      })

    }

    render() {
      
        return(
          <>
            <div className="container my-3">
            <h1 className="text-center my-5">News App-Top Headlines</h1>
            {this.state.loading && <Spinner/>}
            <div className='row mx-5 my-6' >
            {!this.state.loading && this.state.articles.map((element)=>{
              return  <div className='col-md-4 ' key={element.title}>
                         <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} author={element.author} time={element.publishedAt} source={element.source.name}/>  
                      </div>                       
            })}        
            </div>
            <div className="container d-flex justify-content-between my-5">
            <button disabled={this.state.page<=1} type="button" className="btn btn-md btn-dark" onClick={this.handlePrevChange}> &#x2190; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.results/this.props.pageSize)} type="button" className="btn btn-md btn-dark" onClick={this.handleNextChange}>Next &#x2192;</button>
            </div>
            </div>


          </>
        );
    }
}


export default News;