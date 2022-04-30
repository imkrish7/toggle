import React, { Component } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { connect } from 'react-redux';
import { PostParamsType } from '../interfacesAndTypes/RequestParams';
import { AppDispatch, RootState } from '../store';
import { getFeed } from '../actions/feedAction';
import { togglePrivacyPost } from '../actions/feedAction';
import Loading from './Loading';
import { deletePost } from '../actions/feedAction';
import { AuthContext, AuthContextType } from "../Context/AuthContext"

type Props = {
  getPosts?: any,
  posts?: any,
  deletePost?: any,
  deletePostResponse?: any
  togglePrivacy?: any
  getTogglePrivacy?: any
}

type State = {
  posts: any
  id: string
}


class Dashboard extends Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {
      posts: [],
      id: ""
    } 
  }

  static contextType: React.Context<AuthContextType>= AuthContext;
  context: any | null;
  componentDidMount(){
    let ctx = this.context;
    if(ctx && ctx.loggedin){
      this.props.getPosts();
      if(ctx && ctx.socket){
        ctx.socket.on("new-post", ({data}:any)=>{
        this.setState({
            posts: [data,...this.state.posts]
        })
      })
      }
    }
  }
  

  componentDidUpdate(prevProps: Props){
    if(this.props.posts && this.props.posts.data && this.props.posts.data !== prevProps.posts.data ){
      this.setState({
        posts: [...this.props.posts.data.posts]
      })
    }
    if(this.props.deletePostResponse && this.props.deletePostResponse.data && this.props.deletePostResponse.data.success && this.props.deletePostResponse.data !== prevProps.deletePostResponse.data){
      const { id } = this.state;
      this.setState({
        posts: [...this.state.posts.filter((post: any)=> post._id !== id)],
        id: ""
      })
    }
    if(this.props.togglePrivacy && this.props.togglePrivacy.data && this.props.togglePrivacy.data.success && this.props.togglePrivacy.data !== prevProps.togglePrivacy.data){
      const { id } = this.state;
      this.setState({
        posts: [...this.state.posts.map((post: any)=> {
          if(id === post._id){
            post.isPrivate = !post.isPrivate;
            return post;
          }
          return post;
        })],
        id: ""
      })
    }
  }

  _deletePost = (id:string)=>{
    const params = {
      id
    }
    this.setState({
      id
    },this.props.deletePost(params))
    
  }

  _togglePost = (id: string)=>{
    const params = {
      id
    }
    this.setState({
      id
    }, this.props.getTogglePrivacy(params))
    
  }

  render(){
    
  return (
	<Container>
    <PostContainer>
      {this.state.posts.length > 0  ? this.state.posts.map((post: PostParamsType)=>{
        return <PostCard handleTogglePrivacy={this._togglePost} handleDelete={this._deletePost} key={post._id} data={post}/>
      }) : this.props.getPosts.loading ? <Loading />  :<Message>Share some memory to your wall</Message> }
    </PostContainer>
  </Container>
  )
    }
}

// Dashboard.contextType = AuthContext;

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
`

const PostContainer = styled.div`
  min-width: 200px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Message = styled.h1`
  color: #636e72;
`

const mapStateProps = (state: RootState)=>{
  return {
    posts: state.dashboardFeed,
    deletePostResponse: state.deletePost,
    togglePrivacy: state.togglePrivacy
  }
}


const mapDispatchToProps = (dispatch: AppDispatch)=>{
  return  {
    getPosts: ()=> dispatch<any>(getFeed()),
    deletePost: (params: any) => dispatch<any>(deletePost(params)),
    getTogglePrivacy: (params:any) => dispatch<any>(togglePrivacyPost(params))
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Dashboard)