// Write your JS code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {
    blogsData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogDetailsData()
  }

  getBlogDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      author: data.author,
      id: data.id,
      avatarUrl: data.avatar_url,
      imageUrl: data.image_url,
      title: data.title,
      topic: data.topic,
      content: data.content,
    }
    this.setState({blogsData: updatedData, isLoading: false})
  }

  renderBlogsDetails = () => {
    const {blogsData} = this.state
    const {title, avatarUrl, author, imageUrl, content} = blogsData
    return (
      <div className="blogs-details-container">
        <h1 className="title">{title}</h1>
        <div className="author-details">
          <img src={avatarUrl} alt={author} className="author-image" />
          <p className="author-name">{author}</p>
        </div>
        <img src={imageUrl} alt={title} className="image-url" />
        <p className="content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogsDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
