import React, { useState } from 'react'
import NavbarLogin from '../../navbar/NavbarLogin'
import { Button, Form } from 'react-bootstrap'
import { API } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import addFile from '../../assets/add (1).png'
import Swal from 'sweetalert2';







function Add(){

  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    title: "",
    image: "",
    body: "",
  })
  
  
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

    const editorState = EditorState.createEmpty()

    const [body, setBody] = useState(editorState)
    
    const onEditorStateChange = (editorState) => {
      setBody(editorState)
    }

    
    // console.log(form.body.value.length);
    const [isError, setError] = useState(null)
    const handleSubmit = async (e) => {
      // const data = editorState.getCurrentContent() 
      try {
        e.preventDefault()
        e.persist()
        
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        formData.set("title", form.title);
        formData.set("body", form.body.value);
        formData.set("image", form.image[0]);
        
        if(form.body.value.length < 50){
          setError('Required, Add description minimum length 50 characters')
        }else if (form.body.value.length > 50){
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await API.post('/journey', formData, config).then(res => {
                console.log(res);
                if(res.data.status === 'success'){
                  navigate('/home')
                }
              })
              Swal.fire(
                'Logout!',
                'Your account has been Logout.',
                'success'
              )
            }
          })
        }
      } catch (e) {
        console.log(e);
      }
    }

  return (
    <div className='mb-5 container'>
        <NavbarLogin/>
        <div className="content"
        style={{fontWeight: "bold", marginTop: '100px', marginLeft: '100px'}}>
            <h1 className="text-black"
            >New Journey</h1>  
        </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="container search-content d-flex mt-5">
            <Form.Control type="text" onChange={handleChange} name='title' value={form.title} placeholder="Title" style={{border: '1px solid'}} />
        </div>
        <div className="editor mt-5 container">
          <Editor
          editorStyle={{border: '1px solid', height: '300px'}}
          editorState={body}
          toolbarStyle={{border: '1px solid'}}
          toolbarClassName="demo-toolbar-custom"
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor-custom"
          onEditorStateChange={onEditorStateChange}
          />
        <div className="image-upload mt-3 d-flex">
          <label htmlFor="file-input" className='justify-content-end' style={{width: '100%', border: '1px solid'}}>
            <img src={addFile} style={{width: '50px'}}/>
            <span>Add Thumbnail</span>
            <input id="file-input" name='image' onChange={handleChange} hidden type="file" />
          </label>
        </div>
        </div>
        <img src={preview} alt="" />
        <Button type='submit' className='btn btn-primary mt-5'>Submit</Button>
        <textarea style={{display:'none'}} 
        disabled ref={(val) => form.body = val} 
        value={draftToHtml(convertToRaw(body.getCurrentContent())) } />
        {isError !== null && <div className="errors"> {isError} </div>}
        </form>
    </div>
  )
}

export default Add