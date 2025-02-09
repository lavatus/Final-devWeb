import React, { Fragment, useEffect, useState} from 'react'
import { mobile } from "../../responsive";
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader'
import {getProductDetail} from '../../redux/callAPI/productCall'
import { useLocation } from "react-router-dom";
import styled from '@emotion/styled';
import { Add, Remove } from "@mui/icons-material";
import NewNavbar from '../../components/NewNavbar'
import Footer from '../../components/Footer'
import {addItemToCart} from '../../redux/callAPI/cartCall'
import MetaData from '../../components/MetaData'


const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection:"column" })}
`;



const ImgContainer = styled.div`
    flex: 1;
`;


const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;

const ProductName = styled.h1`
    font-weight: 200;
`;

const Desc = styled.div`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    width: max-content;
    font-weight: 200;
    font-size: 20px;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};\
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option`
`;

const AddContainer =  styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justity-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    margin-left: 20px;
    &:hover{    
        background-color: #f8f4f4;
    }
`;


const ProductDetail = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch(); 

  const { product, error } = useSelector((state) => state.product);

  const [color, setColor] = useState("");
  const [strap, setStrap] = useState("");
  const [quantity, setQuantity] = useState(1);

  // chỉnh giới hạn <= stock
  const handleQuantity = (type) => {
    if (type === "dec") {
      if(1 >= quantity) return;
      setQuantity(quantity - 1);

    } else {
      if (product.stock <= quantity) return;
      setQuantity(quantity + 1);
    }
    };

    const handleClickAdd2Cart = (e)=>{
      e.preventDefault();
      dispatch(addItemToCart([id,quantity]))
      alert("Thêm thành công")
    }

  useEffect(()=>{
    // if(error){
    //   setShowAlert(true);
    // }

    dispatch(getProductDetail(id))
  },[dispatch,error,id])

  return (
    <Fragment>
      <MetaData title = "Chi tiết sản phẩm" />
      <NewNavbar/>
      {(!product)  ? <Loader/>:(<Fragment>

        <Wrapper> 
          
          <ImgContainer>
            <Image src={product.image[0].url}/>
          </ImgContainer>

          <InfoContainer>
            <ProductName>{product.name}</ProductName>
            <Desc>{product.description}</Desc>
            <Price>{product.price} VNĐ</Price>

            <FilterContainer>
              <Filter>
                <FilterTitle>Màu: {product.color} </FilterTitle>
                {/* {product.color?.map((c) => (
                            <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                        ))}   */}
              </Filter>
              
              <Filter>
                  <FilterTitle>Dây đeo: {product.strap}</FilterTitle>
                  {/* <FilterSize onChange={(e) => setStrap(e.target.value)}>
                      {product.strap?.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                      ))}
                  </FilterSize> */}
              </Filter>
            </FilterContainer>

            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleClickAdd2Cart} >Thêm vào giỏ hàng</Button>
            </AddContainer>

          </InfoContainer>
        </Wrapper>

      </Fragment>)}
      <Footer/>
    </Fragment>
  )
}

export default ProductDetail