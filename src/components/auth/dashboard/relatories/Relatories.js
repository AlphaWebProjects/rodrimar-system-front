import styled from "styled-components"
import api from "../../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../../ButtonWrapper"
import Button from "../../../../common/form/Button"
import { useContext, useState } from "react"

export default function Relatories(){

    return(
        <>
        
            <Container>
                
                <h1> Relatórios </h1>

                <Select>

                    

                </Select>

            </Container>

        </>
    )

}

const Container = styled.div`
width: 90%;
height: auto;
border-radius: 15px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 4px solid #0F014D;
padding: 25px 0 25px 0;
flex-wrap: wrap;
h2{
    cursor: pointer;
    margin: 10px 3px 10px 0;
    transition: transform 0.3s ease;
    &:hover {
    transform: scale(1.1);
  }
}
h3{
    font-size: 15px;
    color: #0F014D;
    line-height: 20px;
}
h4{
    font-size: 13px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 10px;
    &:hover{
        color: red;
        cursor: pointer;
    }
}
h5{
    font-size: 20px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 15px;
    &:hover{
        color: green;
        cursor: pointer;
    } 
}
b{
    font-size: 25px;
    margin: 15px 0 10px 0;
}
h1{
    font-size: 35px;
    line-height: 60px;
    margin-bottom: 30px;
}
p{
    margin-top: 40px;
    font-size: 25px;
    line-height: 20px;
    color: #0F014D;
}
form{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    label{
        margin: 40px 0 15px 0;
    }
    input{
        width: 50%;
        height: 50px;
        border: none;
        border-radius: 10px;
        margin-bottom: 20px;
        margin-top: 10px;
    }
}
`
const Select = styled.select`
width: 50%;
height: 50px;
border: none;
border-radius: 10px;
margin-bottom: 10px;
margin-top: 10px;
`