import styled from "styled-components"
import api from "../../../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../../../ButtonWrapper"
import Button from "../../../../../common/form/Button"
import { useContext, useState } from "react"

export default function SubCategorieComponent(props){

    const [showPopup, setShowPopup] = useState(false);

    const subCategoriesFiltered = props.items.filter((obj) => obj.subCategorieId === props.item.id)

    return(
        <>
        <Container>
            <h2>{props.item.name}</h2>
            <h3>Itens cadastrados: {subCategoriesFiltered.length}</h3>
            <h3>Criado por: {props.item.createdBy}</h3>

            <div>
                <EditButton show={showPopup} onClick={() => setShowPopup(true) }>Editar item</EditButton>
                <PopupContainer show={showPopup}> 
                    <label >Novo nome:</label>
                    <input placeholder='Digite aqui...' type='text'></input> 
                    <h4> Deletar sub-categoria </h4>
                    <h5 onClick={() => setShowPopup(false)}> Pronto </h5>
                </PopupContainer>
            </div>
        </Container>
        </>
    )

}

const Container = styled.div`
width: 33%;
height: auto;
border-radius: 15px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px solid #0F014D;
padding: 10px 0 10px 0;
margin: 0 3px 20px 0;
h2{
    font-size: 20px;
    color: #0F014D;
    line-height: 25px;
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
`

const EditButton = styled.button`
display: ${props => (props.show ? 'none' : 'block')};
border-radius: 10px;
padding: 5px;
margin-top: 10px;
`

const PopupContainer = styled.div`
margin-top: 10px;
width: auto;
height: auto;
background-color: white;
padding: 20px 20px 15px 20px;
border: 1px solid #0F014D;
display: ${props => (props.show ? 'block' : 'none')};
border-radius: 10px;
align-items: center;
justify-content: center;
text-align: center;
input{
    border: 1px solid #0F014D;
    border-radius: 10px;
    height: 25px;
    margin-left: 10px;
}
`;