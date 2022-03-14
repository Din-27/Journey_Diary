import React from 'react'
import { Card } from 'react-bootstrap'
import BookmarkIcon from '../assets/Vector (6).png'




function CardContent({image, CardTitle, CardText, onDetail}) {
  return (
    <div className="container mt-5 d-flex flex-wrap">
        <Card style={{ width: '18rem' }}>
          <div className='d-flex justify-content-end m-2' onClick={onDetail} >
            <img src={BookmarkIcon} style={{ width: '15px'}} alt=""/>
          </div>
        <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{CardTitle}</Card.Title>
                <Card.Text>
                  <div className="post__description" dangerouslySetInnerHTML={{ __html: {CardText} }}  />
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CardContent