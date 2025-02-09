
import styled from "@emotion/styled";
import { mobile } from "../../responsive";
import React, { useState } from "react";
import NewNavbar from "../../components/NewNavbar";
import {useDispatch} from 'react-redux'
import { register } from "../../redux/callAPI/userCall";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: linear-gradient(120deg, #2980b9, #8e44ad)
`;
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 25px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border: 2px solid teal;
  border-radius: 15px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;



const Register = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 

    const redirect = location.search ? location.search.split("=")[1] : "/login";

    const registerSubmit = (e) => {
        e.preventDefault();
        dispatch(register({name,email,password}));
        history(redirect);
    }    

    return (
        <>  
            <div style={{position:"fixed", width:"100%"}}>
            <NewNavbar/>  
            </div>
            <Container>
              
                <Wrapper>
                    <Title>ĐĂNG KÍ</Title>
                    <Form onSubmit={registerSubmit}>
                        <Input
                            placeholder="Tên"
                            type="text"
                            required
                            name="name"
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <Input 
                            placeholder="Email" 
                            type='email'
                            required
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        <Input 
                            placeholder="Mật khẩu"
                            type="password"
                            required
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        {/* <Input placeholder="Xác nhận mật khẩu"
                            type="password"
                            
                            onChange={registerDataChange}
                        />  */}

                        <Button type="submit">
                            Tạo tài khoản
                        </Button>
                    </Form>
                    <Link href="/login">Đăng nhập</Link>
                </Wrapper>
            </Container>
        </>
    )
}

export default Register