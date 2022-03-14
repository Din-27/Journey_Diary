import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../navbar/NavbarLogin'
import { API } from '../../config/api'
import { useParams } from 'react-router-dom'
import dateFormat, { masks } from "dateformat";




function DetailLogin() {

    const { id } = useParams()
    const [JourneyId, setJourneyId] = useState([])
    const [userInfo, setUserInfo] = useState([])


    const getJourney = async () => {
        try {
            const res = await API.get(`/journey/${id}`)
            // console.log(res);
            setUserInfo(res.data.data.user)
            setJourneyId(res.data.data)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        getJourney()
    }, [])


  return (
    <div className='container mb-5'>
        <NavbarLogin/>
        <div className="content"
        style={{fontWeight: "bold", marginTop: '100px', marginLeft: '100px'}}>
        <div className='d-flex'>
            <div className=''>
                <h1 className="text-black"
                style={{fontWeight: 'bold'}}
                >Journey</h1>
                <h4 className="text-primary"
                >{dateFormat(JourneyId.createdAt, 'dddd, d mmmm, yyyy')}</h4>
            </div>
            <div className='mt-3'>
                <p style={{marginLeft: '700px'}}>{userInfo.title}</p>
            </div>
        </div>
        </div>
        <div className="image-content ms-3 mt-5">
            <img src={JourneyId.image} style={{width: '100%'}} alt="" />
            <h1 className='text-center mt-5' 
            >{JourneyId.title}
            </h1>
            <div className='text-center mt-5'
            style={{marginTop: '50px'}} 
            dangerouslySetInnerHTML={{ __html: JourneyId.body}}/>
        </div>
    </div>
  )
}

export default DetailLogin