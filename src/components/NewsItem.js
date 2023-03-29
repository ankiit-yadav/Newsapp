import React,{Component} from 'react';

class NewsItem extends Component {

    render() {
        let {title,description,urlToImage,url,author,time,source} = this.props;
        return(
            <>
               <div className="card my-3 mx-3" >
               <span class="position-absolute top-0 translate-middle badge  bg-danger" style={{fontSize:'14',zIndex:'1',left:'89%'}}>{source}</span>
                <img src={urlToImage?urlToImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} className="card-img-top" alt="..."/>
                <div className="card-body ">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p class="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(time).toGMTString()}</small></p>
                    <a href={url} className="btn btn-sm btn-dark ">Read More</a>
                </div>
               </div> 
            </>
        );
    }
}


export default NewsItem;