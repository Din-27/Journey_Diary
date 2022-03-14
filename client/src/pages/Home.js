import React, { useState, useEffect, useContext } from 'react'
import NavbarUnk from '../navbar/NavbarUnk'
import Jumbotron from '../assets/Jumbotron.png'
import { Form, Button } from 'react-bootstrap'
import CardContentLogin from '../component/CardContentLogin'
import ModalLogin from '../component/modals/ModalLogin'
import ModalRegis from '../component/modals/ModalRegis'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import {API} from '../config/api'
import BookmarkIcon from '../assets/Vector (6).png'
import { Card } from 'react-bootstrap'
import { UserContext } from '../context/UserContext'







function Home() {
    const [modalShow, setModalShow] = useState(false)
    const [modalShowRegis, setModalShowRegis] = useState(false)
    const [Journey, setJourney] = useState([])
    const [query, setQuery] = useState('')
    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    const getListJourneys = async (x) => {
      const res = await API.get('/journeys')
      console.log(res.data.data)
      setJourney(res.data.data)
    }

  
    useEffect(()=>{
      getListJourneys()
    }, [])


  return (
    <div className='container mb-5'>
        <NavbarUnk 
        modalShowOn={()=>setModalShow(true)} 
        modalShowOff={()=>setModalShow(false)}
        modalShowOnRegis={()=>setModalShowRegis(true)}
        modalShowOffRegis={()=>setModalShowRegis(false)}/>
        <div className="banner-image w-100 d-flex justify-content-center align-items-center">
            <img src={Jumbotron} alt="" />
        </div>
        <div className="content"
        style={{fontWeight: "bold", marginTop: '100px', marginLeft: '100px'}}>
            <h1 className="text-black ms-5"
            >Journey</h1>  
        </div>
        <div className="container search-content d-flex mt-5">
          <Form.Control type="text" name='s' placeholder="Search" onChange={e => setQuery(e.target.value)} />
            <Button className='ms-2' variant="primary">Search</Button>
        </div>
        <div className="d-flex flex-wrap">
        {Journey.filter(x => { 
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
                   <img src={BookmarkIcon} style={{ width: '15px'}} alt="" onClick={()=>setModalShow(true)}/>
                 </div>
               <Card.Img variant="top" src={x.image} />
                   <Card.Body>
                       <Card.Title>{x.title.slice(10)}</Card.Title>
                       <Card.Text>
                         <div className="post__description" dangerouslySetInnerHTML={{ __html: x.body.slice(5000)}}  />
                       </Card.Text>
                       <Link to={`/detail/${x.id}`} style={{ textDecoration: "none" }}>
                        <Button variant="primary">Go Reading</Button>
                       </Link>
                   </Card.Body>
               </Card>
           </div>)}
        </div>
        <ModalLogin show={modalShow} onHide={() => setModalShow(false)}/>
        <ModalRegis show={modalShowRegis} onHide={() => setModalShowRegis(false)}/>
    </div>
  )
}

export default Home