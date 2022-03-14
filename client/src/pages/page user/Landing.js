import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../navbar/NavbarLogin'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { API } from '../../config/api'
import BookmarkIcon from '../../assets/Vector (6).png'
import BookmarkIconActive from '../../assets/active.png'
import { Card } from 'react-bootstrap'
import Swal from 'sweetalert2'




function Landing() {

    const navigate = useNavigate()
    const [journeys, setJourneys] = useState([])
    const [replace, setReplace] = useState(false)
    const [query, setQuery] = useState('')
    
    
    const getListJourneys = async () => {
        const res = await API.get('/journeys')
        // console.log(res.data.data)
          setJourneys(res.data.data)
      }
      
      
      const handleUndoBookmark = async (x) => {
        await API.delete(`/bookmark/${x.id}`)
        setReplace(false)
        Swal.fire({
          icon: 'success',
          text: 'Sign Up success!',
        })
        console.log(x)
        
      }

      const handleSave = async (x) => {
        setReplace(true)
        const res = await API.post('/bookmark', {idJourney : x})
        console.log(res)
        Swal.fire({
          icon: 'success',
          text: 'Sign Up success!',
        })
    }
      
      useEffect(()=>{
        getListJourneys()
      }, [])

  return (
    <div className='mb-5 container'>
        <NavbarLogin/>
        <div className="content"
        style={{fontWeight: "bold", marginTop: '100px', marginLeft: '100px'}}>
            <h1 className="text-black ms-5"
            >Journey</h1>  
        </div>
        <div className="container search-content d-flex mt-5 form" method='get'>
            <Form.Control type="text" name='s' placeholder="Search" onChange={e => setQuery(e.target.value)} />
            <Button className='ms-2' variant="primary">Search</Button>
        </div>
        <div className='d-flex flex-wrap'>
                {journeys.filter(x => {
                  if(query === ""){
                    return x
                  }else if(x.title.toLowerCase().includes(query.toLowerCase())){
                    return x
                  }else if(x.body.toLowerCase().includes(query.toLowerCase())){
                    return x
                  }
                }).map((x, index)=>
               <div className="flex-wrap m-3" key={index}>
               <Card style={{ width: '18rem' }}>
                 <div className='d-flex justify-content-end m-2'>
                   {replace ? <img src={BookmarkIconActive} style={{ width: '15px'}} onClick={()=>handleUndoBookmark(x.id)} alt=""/> :
                   <img src={BookmarkIcon} style={{ width: '15px'}} onClick={()=>handleSave(x.id)} alt=""/>}
                 </div>
               <Card.Img variant="top" src={x.image} />
                   <Card.Body>
                       <Card.Title>{x.title}</Card.Title>
                       <Card.Text>
                         <Card.Text 
                         className="post__description" 
                         dangerouslySetInnerHTML={{ __html: x.body}}  />
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

export default Landing