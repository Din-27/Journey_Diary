import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BookmarkIcon from '../assets/Vector (6).png'
import BookmarkIconActive from '../assets/active.png'






function CardContentLogin({body, title, id, index, replace, handleUndoBookmark, handleSave, image}) {

 


  return (
    <div className="flex-wrap m-3" key={index}>
               <Card style={{ width: '18rem' }}>
                 <div className='d-flex justify-content-end m-2'>
                   {replace ? <img src={BookmarkIconActive} style={{ width: '15px'}} onClick={handleUndoBookmark} alt=""/> :
                   <img src={BookmarkIcon} style={{ width: '15px'}} onClick={handleSave} alt=""/>}
                 </div>
               <Card.Img variant="top" src={image} />
                   <Card.Body>
                       <Card.Title>{title}</Card.Title>
                       <Card.Text>
                         <Card.Text 
                         className="post__description" 
                         dangerouslySetInnerHTML={{ __html: body}}  />
                       </Card.Text>
                       <Link to={`/detail-U/${id}`} style={{ textDecoration: "none" }}>
                        <Button variant="primary">Go Reading</Button>
                       </Link>
                   </Card.Body>
               </Card>
           </div>
  )
}

export default CardContentLogin