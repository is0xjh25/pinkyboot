import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { capitalize } from '../Utilities.js/Utilities';
import { getUserInfo } from '../Utilities.js/API';
import { BsBack, BsTrash, BsUpload } from 'react-icons/bs';
import { BiStar, BiEdit} from 'react-icons/bi';

const ss = {
  infoGroup: {
    position: "relative",
    textAlign: "center",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    paddingTop: "5%",
    color: "var(--bs-light)",
  },
  buttonGroup: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
  },
  buttonBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
    height: "100%",
  },
  button: {
    width: "60px",
    height: "60px",
    border: "2px solid ",
    borderRadius: "10%",
    fontSize: "30px",
  },
  info: {
		paddingTop: "2%",
    fontSize: "30px"
  }
}

function Display(props) {
	const {post, poster, user, authority, close, setPage, handleStarPost} = props;
	return(
		<>
			<div style={ss.infoGroup}>
			{
				post.trade === "buy" ?
				<h1 className="text-danger">Looking for...</h1>
				:
				<h1 className="text-danger">Find a new owner...</h1>
			}
				<div className="row" style={ss.info}>
					<div className="col"><b>Brand:</b> {post.brand}</div>
					<div className="col"><b>Model:</b> {post.model}</div>
					<div className="col"><b>Price:</b> 
						{post.price}
						{
							post.negotiable ?
							<span style={{fontSize: "smaller"}}> (negoitable)</span>
							:
							null
						}
					</div>
				</div>
				<div className="row" style={ss.info}>
					<div className="col"><b>Status:</b> {post.status}</div>
					<div className="col"><b>Description:</b> {post.description}</div>
				</div>
				<h1 className="text-danger" style={{marginTop:"10px"}}>~Contact~</h1>
				<div className="row" style={ss.info}>
					<div className="col"><b>User:</b> {poster.id}</div>
					<div className="col"><b>Email:</b> {poster.email}</div>
					<div className="col"><b>Location:</b> {poster.location}</div>
				</div>
			</div>
			<div style={ss.buttonGroup}>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-light shadow" onClick={()=>{close();}} style={ss.button}><BsBack/></button>
				</div>
				{
					authority === 0 ?
					<div style={ss.buttonBox}>
						<button className="btn btn-outline-primary shadow" onClick={()=>setPage("edit")} style={ss.button}><BiEdit/></button>
					</div>
					:
					<div style={ss.buttonBox}></div>
				}
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-warning shadow" onClick={()=>handleStarPost(user, post)}style={ss.button}><BiStar/></button>
				</div>
			</div>
		</>
	)
}

function Edit(props) {
	const {post, poster, setPage, handleDeletePost} = props;
	return(
		<>
			<div style={ss.infoGroup}>
			{
				post.trade === "buy" ?
				<h1 className="text-danger">Looking for...</h1>
				:
				<h1 className="text-danger">Find a new owner...</h1>
			}
				<div className="row" style={ss.info}>
					<div className="col"><b>Brand:</b> {post.brand}</div>
					<div className="col"><b>Model:</b> {post.model}</div>
					<div className="col"><b>Price:</b> {post.price}</div>
				</div>
				<div className="row" style={ss.info}>
					<div className="col"><b>Status:</b> {post.status}</div>
					<div className="col"><b>Description:</b> {post.description}</div>
				</div>
				<h1 className="text-danger" style={{marginTop:"10px"}}>~Contact~</h1>
				<div className="row" style={ss.info}>
					<div className="col"><b>User:</b> {poster.id}</div>
					<div className="col"><b>Email:</b> {poster.email}</div>
					<div className="col"><b>Location:</b> {poster.location}</div>
				</div>
			</div>
			<div style={ss.buttonGroup}>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-light shadow" onClick={()=>setPage("display")} style={ss.button}><BsBack/></button>
				</div>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-danger shadow" onClick={()=>handleDeletePost(post)}style={ss.button}><BsTrash/></button>
				</div>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-warning shadow" style={ss.button}><BsUpload/></button>
				</div>
			</div>
		</>
	)
}

const Post = (props) => {
	
	const {post, user, page, setPage, handleDeletePost, handleStarPost} = props;
	const [poster, setPoster] = useState({});
	const [authority, setAuthority] = useState(1);

	useEffect(() => {
		getUserInfo(post.posterId).then(pr => {
			// set authority
			(user === "admin" || user === pr.id) ? setAuthority(0) : setAuthority(1);
			setPoster(pr);
		})
	},[]);

	return (
		<>
		  <Popup trigger={			
				<tr className='trade-row'>
					<td>{capitalize(post.brand)}</td>
					<td>{post.model.toUpperCase()}</td>
					<td>{capitalize(post.status)}</td>
					<td>{post.price}</td>
					<td>{poster.location}</td>
					<td>{poster.id}</td>
					<td>{poster.email}</td>
				</tr>
			} modal>
				{close => (
      	<div className="popup"> 
				{ 
					page === "none" ? 
					<div onClick={close()}></div>
					:
					page === "display" ?
		  		<Display post={post} poster={poster} user={user} authority={authority} close={close} setPage={setPage} handleStarPost={handleStarPost}/> 
					:
					page === "edit" ?
		  		<Edit post={post} poster={poster} close={close} setPage={setPage} handleDeletePost={handleDeletePost}/>
					: 
					null 
				}
		 		</div>)}
			</Popup>
		</>
	)
}

export default Post;
