import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Form,Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,getUserInfo } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import img from "../imgs/login.png"
const Login = () => {
  const dispatch = useDispatch();
  const { errors: userErrors, isAuth, userInfo } = useSelector((state) => state.user);
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getUserInfo())
    if (isAuth && userInfo.role==='user') 
    nav("/profile");
    else if(isAuth && userInfo.role==='admin') 
    nav("/dashbord");
  }, [isAuth,nav,userInfo.role]);
  const {register, handleSubmit, formState: { errors },} = useForm();
  const submitFnct = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div>
      <section className="vh-100 ">
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center text-center ">
            <div className="col-sm-5 text-black">
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Form
                  onSubmit={handleSubmit(submitFnct)}
                  style={{ width: " 23rem" }}
                >
                  <img src={img} style={{paddingBottom:"5%"}}/>

                  <Form.Group className="form-outline mb-4">
                    <Form.Control
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      type="email"
                      label="email address"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      placeholder="Addresse email"
                    />
                    {userErrors?.includes("register") && <p>{userErrors}</p>}
                  </Form.Group>

                  <Form.Group className="form-outline mb-4">
                    <Form.Control
                      {...register("password")}
                      type="password"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Mot de passe"
                      htmlFor="typeEmailX"
                    />
                    {userErrors?.includes("password") && <p>{userErrors}</p>}
                  </Form.Group>

                  <div className="pt-1 mb-4">
                    <Button
                      style={{backgroundColor:"#3AB4F2"}}
                      className="btn  btn-lg btn-block"
                      type="submit"
                    >
                      Se connecter
                    </Button>
                  </div>

                  <p>
                    Pas encore membre ?{" "}
                    <Link to='/register' className="link-info" style={{color:"#0078AA"}}>
                      Inscrivez-vous
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
