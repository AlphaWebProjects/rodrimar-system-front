import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import ItensInStock from "./ItemsInStock";
import api from "../../../../../../services/API";
import test from '../../../../../../assets/images/products/test.png';
import ItemsToAdd from "./ItemsToAdd";
import { toast } from "react-toastify"
import UserContext from "../../../../../../context/UserContext";

export default function SubCategorieExtraData({src, description, displayBool}){

    const { userData } = useContext(UserContext);
    
    return(
        <>

            <Container displayBool={displayBool}>

                <img src={src}/>

                <h3>Descrição: {description}</h3>

            </Container>

        </>
    )

}


const Container = styled.div`
width: auto !important;
background-color: none;
height: auto;
display: ${props => (props.displayBool ? 'flex' : 'none')} !important;
flex-direction: column;
justify-content: space-around;
align-items: center;
border: none;
border-radius: 10px;
margin-top: 15px;
flex-wrap: wrap;
overflow-wrap: break-word;
img{
    width: 70px;
    height: 70px;
    margin-right: 20px;
}
`
const SubContainer = styled.div`
width: 80%;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border: 1px solid #0F014D;
padding: 2px 2px 2px 2px;
margin: 3px 3px 3px 3px;
border-radius: 5px;
div{
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 0 !important;
}
form{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
input{
    margin: 8px 0 0 0 !important;
    width: 100% !important;
    height: 50px !important;
    border: 1px solid #0F014D !important;
    border-radius: 6px !important;
    }
`
const DownSelect = styled.div`
margin-top: 8px;
width: 90%;
height: 120px !important;
border-radius: 6px;
select{
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 6px;
    margin-bottom: 8px;
}
input{
    margin: 3px 0 0 0 !important;
    width: 80% !important;
    height: 30px !important;
    border: 1px solid #0F014D !important;
    border-radius: 6px !important;
}
`
const AddSelect = styled.select`
width: 60%;
height: 30px;
border: 1px solid #0F014D;
border-radius: 6px;
`
const ItemAddForm = styled.div `
display: flex !important;
align-items: center !important;
justify-content: center !important;
flex-direction: row !important;
margin-left: 15px !important;
form{
    width: 100%;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: row !important;
    button{
        background-color: #0F014D;
        border-radius: 8px;
        color: white;
        margin: 0 0 2px 8px;
        &:hover{
            cursor: pointer;
        }
    }
    input{
        margin: 0 0 0 10px !important;
        width: 50% !important;
        height: 30px !important;
        border: 1px solid #0F014D !important;
        border-radius: 6px !important;
    }
}
`
