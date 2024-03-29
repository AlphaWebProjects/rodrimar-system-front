import styled from "styled-components"
import api from "../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../ButtonWrapper"
import Button from "../../../common/form/Button"
import { useContext, useState } from "react"
import Stock from "./stock/Stock"
import Relatories from "./relatories/Relatories"

export default function Dashboard(){

    const [stock, setStock] = useState(undefined);
    const [relatories, setRelatories] = useState(undefined)

    function viewStock(){
        setStock(true)
        setRelatories(false)
    }

    function viewRelatories(){
        setStock(false)
        setRelatories(true)
    }
    
    return(
        <Container>
           <Header>
                <ButtonWrapper width={"100%"}>
                    <Button width={"50%"} onClick={viewStock} height={"75px"}>{"Estoque"}</Button>
                </ButtonWrapper>
                
                <ButtonWrapper width={"100%"}>
                    <Button onClick={viewRelatories} width={"50%"} height={"75px"}>{"Relatórios"}</Button>
                </ButtonWrapper>
           </Header>

           {(stock === true && relatories === false)

                ?

                <Stock/>

                :

                ''

           }

           {(stock === false && relatories === true)
           
                ?

                <Relatories/>

                :

                ''

           }

        </Container>
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
padding: 40px 0 40px 0;
`
const Header = styled.div`
width: 90%;
height: 150px;
border-radius: 10px;
border: 4px solid #0F014D;
display: flex;
justify-content: space-around;
align-items: center;
margin-bottom: 40px;
`

