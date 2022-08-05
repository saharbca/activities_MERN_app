import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import {useDispatch,useSelector} from 'react-redux'
import {registerUser} from '../slices/userSlice'
import {useNavigate} from'react-router-dom'
import { Link } from "react-router-dom";
import * as yup from 'yup';

const Register = () => {
 /* const schema=yup.object().shape({
    image:yup
    .mixed()
    .required("you need to provide ")
    .test("filesize","the file is too large",(value)=>{
      console.log(value)
    return value && value[0].size<=2000000})
  })*/
  const dispatch= useDispatch()
  const {errors: userErrors,isAuth}=useSelector(state =>state.user)
  const nav=useNavigate()
  useEffect(()=>{
    if(isAuth)
    nav('/')

  },[isAuth])
  const { register, handleSubmit, formState: { errors } } = useForm(/*{validationSchema:schema}*/);
 
  const submitFnct=(data)=>{

  dispatch(registerUser(data))
      
  }
  return (
    <div>
      <div className="container-fluid ">
          <div className="row d-flex justify-content-center   ">
            <div className="col-sm-5 text-black">
        <Form onSubmit={handleSubmit(submitFnct)} encType="multipart/form-data">

        <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Image</Form.Label>
            <Form.Control {...register("image")}    type="file" accept=".png, .jpg, .jpeg" name="image" />
            {errors.image && <p>{errors.image.message}</p>}
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicText" >
            
            <Form.Label>Prénom</Form.Label>
            <Form.Control {...register("firstName",{ pattern: /^[A-Za-z]+$/i })} type="text" placeholder="Entrez votre prénom" />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText2">
            <Form.Label>Nom</Form.Label>
            <Form.Control {...register("lastName")} type="text" placeholder="Entrez votre nom" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Addresse email</Form.Label>
            <Form.Control {...register("email",{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}  type="email" placeholder="Entrez votre email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {errors.email && <p>Email invalide</p>}
            {userErrors && <p>{userErrors}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText3">
            <Form.Label>Addresse</Form.Label>
            <Form.Control {...register("address")} type="text" placeholder="Entrez votre addresse" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicText4">
            <Form.Label>Age</Form.Label>
            <Form.Control {...register("age", { min: 10, max: 99 })} type="number" placeholder="Entrez votre age" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control {...register("password")} type="password" placeholder="Entrez votre mot de passe" />
          </Form.Group>

          <Form.Label>Sexe</Form.Label>
          <Form.Group className="mb-3"  >
            <Form.Check  {...register("gender")} type="radio" name="gender" label="Male " value="M" inline  />
            <Form.Check {...register("gender")}  type="radio" name="gender" label="Female "  value="F" inline  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Image</Form.Label>
            <Form.Control {...register("image")}    type="file" accept=".png, .jpg, .jpeg" name="image" />
            {errors.image && <p>{errors.image.message}</p>}
          </Form.Group>

          <div className="pt-1 mb-4">
                    <button
                      style={{backgroundColor:"#3AB4F2"}}
                      className="btn  btn-lg btn-block"
                      type="submit"
                    >
                      Valider
                    </button>
           </div>
      
          <p className="text-center">
                    Déjà membre ?{" "}
                    <Link to='/login' className="link-info" style={{color:"#0078AA"}}>
                      Connectez-vous
                    </Link>
          </p>
        </Form>
    </div>
    </div>
          </div>
     </div>
  )
}

export default Register