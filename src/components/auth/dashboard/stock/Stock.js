import styled from "styled-components"
import api from "../../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../../ButtonWrapper"
import Button from "../../../../common/form/Button"
import { useContext, useState } from "react"
import View from "./View"

export default function Stock(){

    return(
        <Container>
            <p>
                ESTOQUE
            </p>

            <View/>

        </Container>
    )

}

const Container = styled.div`
width: 90%;
height: auto;
border-radius: 15px;
display: flex;
flex-direction: column;
align-items: center;
border: none;
padding: 25px 0 25px 0;
p{
    font-size: 30px;
    line-height: 60px;
    color: #0F014D;
}
`