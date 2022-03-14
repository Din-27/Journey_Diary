import React, { useContext, useEffect, useState } from 'react'
import NavbarLogin from '../../navbar/NavbarLogin'
import { Form, Image } from 'react-bootstrap'
import Close from '../../assets/close.png'
import { UserContext } from '../../context/UserContext'
import { API, setAuthToken } from '../../config/api'
import BookmarkIcon from '../../assets/Vector (6).png'
import Avatar from '../../assets/man.png'
import { Card, Button } from 'react-bootstrap'
import { useNavigate, useParams, Link } from 'react-router-dom'




function Profile() {

    const { id } = useParams()
    const [my, setMy] = useState([])
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [editAvatar, setEditAvatar] = useState(false)
    const path = 'http://localhost:5000/uploads/'
    const [form, setForm] = useState({
        name: "",
        email: "",
        image: ""
    })


    const [state, dispatch] = useContext(UserContext)
    useEffect(()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
    }, [state])

    console.log(state.data.id);

    const getMyJourney = async () => {
        try {
            const res = await API.get('/my-journey')
            setMy(res.data.data)
            console.log(res.data.data);
        } catch (e) {
            
        }
    }

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers:{
                    "Content-type" : "multpart/form-data"
                }
            }

            const formData = new FormData()
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
              }
              formData.set("name", form.name);
              formData.set("email", form.email);

              const res = await API.patch(
                "/user/" + id,
                // data,
                formData,
                config
              );
            //   console.log(data);
              console.log(res);
              setEditAvatar(false)
            //   renderUpdate()
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getMyJourney()
    },[])

  return (
    <div className='container mb-5'>
        <NavbarLogin/>
        <div className="content"
        style={{fontWeight: "bold", marginTop: '100px', marginLeft: '100px'}}>
            <h1 className="text-black ms-5"
            >Profile</h1>  
        </div>
        <div className="container search-content d-flex mt-5 justify-content-center">
            <div className='flex-column text-center'>
            {state.data.image === null ?  
                 <div>
                    <label htmlFor="file-input">
                    {preview ? 
                        <Image roundedCircle style={{width: '170px', height: '190px'}} onClick={()=>setEditAvatar(true)} src={preview} alt="" />
                        :
                        <Card.Img roundedCircle style={{width: '170px', height: '190px'}} src={Avatar} onClick={()=>setEditAvatar(true)}/>}
                        <input id="file-input" name='image' hidden type="file" onChange={handleChange}/>
                    </label>
                 </div>
                  :  
                  <div>
                    <label htmlFor="file-input">
                        {preview ? 
                        <Image roundedCircle style={{width: '170px', height: '190px'}} onClick={()=>setEditAvatar(true)} src={preview} alt="" />
                        : 
                        <Image roundedCircle style={{width: '170px', height: '190px'}} onClick={()=>setEditAvatar(true)} src={path + state.data.image} alt="" />}
                        <input id="file-input" name='image' hidden type="file" onChange={handleChange}/>
                    </label>
                 </div>}
                  <p>Click Avatar for update profile</p>
                {editAvatar ? 
                <div>
                    <div>
                        <input className='mt-5' type="name" name='name' placeholder={state.data.name} onChange={handleChange} />
                    </div>
                    <div>
                        <input className='mt-1' type="email" name='email' placeholder={state.data.email} onChange={handleChange} />
                    </div>
                    <button className='btn btn-primary mt-1 me-1' onClick={handleUpdate}>Submit</button>
                    <button className='btn btn-danger mt-1 ms-1' onClick={()=>setEditAvatar(false)}>Cancel</button>
                </div> : 
                <div>
                <h3 
                className='mt-5'
                style={{fontWeight: 'bold'}}>{state.data.name}</h3>
                <h5 className='mt-1'>{state.data.email}</h5>
                </div>}
            </div>
        </div>
            <div className="profileJourney"
            style={{fontWeight: "bold"}}>
                <h1 className="text-black m-5"
                >My-Journey</h1>  
            </div>
        <div className='d-flex flex-wrap mt-2'>
                {my && my.map((x, y)=>
               <div className="flex-wrap m-3" key={y}>
               <Card style={{ width: '18rem' }}>
                 <div className='d-flex justify-content-end m-2'>
                   <img src={BookmarkIcon} style={{ width: '15px'}} alt=""/>
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

export default Profile