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
                Oi!!
            </Container>

        </>
    )

}

const Container = styled.div`
width: 90%;
min-height: 200px;
background-color: #E6E4E4;
border-radius: 15px;
display: flex;
align-items: center;
flex-direction: column;
border: 4px solid #0F014D;
padding: 20px 0 20px 0;
`