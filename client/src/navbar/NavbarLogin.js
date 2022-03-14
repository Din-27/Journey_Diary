import React, { useContext, useEffect } from 'react'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import Icon from '../assets/Icon.png'
import Avatar from '../assets/man.png'
import Profile from '../assets/user 2.png'
import Add from '../assets/Vector (7).png'
import Bookmark from '../assets/Vector (6).png'
import Logout from '../assets/iconLogout.png'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom'
import { setAuthToken, API } from '../config/api'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'


function NavbarLogin() {

  const [state, dispatch] = useContext(UserContext)
  const path = 'http://localhost:5000/uploads/'
  const navigate = useNavigate()

  const HomeUser = () =>{
    navigate('/home')
  }
  const AddBook = () =>{
    navigate('/add-journey')
  }
  const BookSave = () =>{
    navigate('/bookmark')
  }
  const ProfileUser = () =>{
    navigate('/profile/' + state.data.id)
  }
  const LogoutUser = () =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "LOGOUT",
        });
        Swal.fire(
          'Logout!',
          'Your account has been Logout.',
          'success'
        )
      }
    })
  }

   useEffect(()=>{
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }else if(state.isLogin === false && !localStorage.token){
      navigate('/')
    }
  },[state])

  const checkUser = async () => {
    try {
    const response = await API.get("/check-auth");

    if (response.status === 404) {
        return dispatch({
        type: "AUTH_ERROR",
        });
    }
    let payload = response.data.data.user;
    payload.token = localStorage.token;
    dispatch({
        type: "USER_SUCCESS",
        payload,
    });
    } catch (error) {
    console.log(error);
    }
  };

  useEffect(()=>{
    checkUser()
  }, [])

  return (
    <Navbar bg="light" className="navbar fixed-top navbar-expand-lg navbar-dark
    shadow-lg">
    <Container>
      <Navbar.Collapse>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
            <img src={Icon} alt="Logo" onClick={HomeUser} />
        </Nav>
          <Dropdown className="dropdown">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
              {state.data.image === null ?  
                 <Image id="navbar-dark-example" roundedCircle style={{width: '50px', height: '50px'}} src={Avatar} />
                  :  
                  <Image  id="navbar-dark-example" roundedCircle style={{width: '50px', height: '50px'}} src={path + state.data.image} alt="" />}
                <span className="caret"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item 
                className='m-3' 
                onClick={ProfileUser}
                href="#/action-1"
                style={{fontWeight: 'bold'}}>
                  <img className='me-2' src={Profile} alt="" />
                  Profile</Dropdown.Item>
                <Dropdown.Item 
                className='m-2' 
                onClick={AddBook}
                href="#/action-2"
                style={{fontWeight: 'bold'}}>
                  <img className='me-2' src={Add} alt="" />
                  New Journey</Dropdown.Item>
                <Dropdown.Item 
                onClick={BookSave}
                className='m-3' 
                href="#/action-3"
                style={{fontWeight: 'bold'}}>
                  <img className='me-3' src={Bookmark} alt="" />
                  Bookmark</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                onClick={LogoutUser}
                className='m-2' 
                href="#/action-3"
                style={{fontWeight: 'bold'}}>
                  <img className='me-2' src={Logout} alt="" />
                  Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarLogin