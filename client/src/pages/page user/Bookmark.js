import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../navbar/NavbarLogin'
import { API } from '../../config/api'
import { Card, Button } from 'react-bootstrap'
import BookmarkIcon from '../../assets/Vector (6).png'
import BookmarkIconActive from '../../assets/active.png'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'



function Bookmark() {

    const [MyBookmark, setMyBookmark] = useState([])
    const [replace, setReplace] = useState(true)
    const path = 'http://localhost:5000/uploads/'

    const getMyBookmark = async () => {
        const res = await API.get('/my-bookmarks')
        setMyBookmark(res.data.data)
        console.log(res.data.data);
    }

    const handleUndoBookmark = async (x) => {
      try {
        const res = await API.delete(`/my-bookmark/${x}`)
      setReplace(false)
      getMyBookmark()
      Swal.fire({
        icon: 'success',
        text: 'Sign Up success!',
      })
      console.log(res)
      console.log(x)
      } catch (e) {
        console.log(e)
      }
      
    }

    useEffect(()=>{
        getMyBookmark()
    }, [])

  return (
    <div className='container mb-5'>
        <NavbarLogin/>
        <div className="content"
        style={{fontWeight: "bold", marginTop: '100px', marginLeft: '100px'}}>
            <h1 className="text-black"
            >Bookmark</h1>  
        </div>
        <div className='d-flex flex-wrap'>
                {MyBookmark.map((x, index)=>
               <div className="flex-wrap m-3" key={index}>
               <Card style={{ width: '18rem' }}>
                 <div className='d-flex justify-content-end m-2'>
                 {replace ? <img src={BookmarkIconActive} style={{ width: '15px'}} onClick={()=>handleUndoBookmark(x.id)} alt=""/> :
                  <img src={BookmarkIcon} style={{ width: '15px'}} alt=""/>
                 }
                 </div>
               <Card.Img variant="top" src={path + x.journey.image} />
                   <Card.Body>
                       <Card.Title>{x.journey.title}</Card.Title>
                       <Card.Text>
                         <Card.Text 
                         className="post__description" 
                         dangerouslySetInnerHTML={{ __html: x.journey.body}}  />
                       </Card.Text>
                       <Link to={`/detail-U/${x.id}`} style={{ textDecoration: "none" }}>
                        <Button variant="primary">Go Reading</Button>
                       </Link>
                   </Card.Body>
               </Card>
           </div>)}
        </div>
    </div>
  )
}

export default Bookmark