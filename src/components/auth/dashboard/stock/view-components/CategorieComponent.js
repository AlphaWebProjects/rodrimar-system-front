import styled from "styled-components"
import api from "../../../../../services/API"
import { toast } from "react-toastify"
import UserContext from "../../../../../context/UserContext"
import { useContext, useState } from "react"

export default function CategorieComponent(props){

    const { userData } = useContext(UserContext);

    const subCategoriesFiltered = props.subcategories.filter((obj) => obj.mainCategoryId === props.item.categoryId);

    const [showPopup, setShowPopup] = useState(false);
    const [nameValue, setNameValue] = useState('')

    async function disableCategory(){

        if(subCategoriesFiltered.length > 0){
            toast.dark("Só é possível desabilitar categorias que não possuem sub-categorias registradas.");
            return
        }

        try {

            await api.disableCategory(userData.token, props.item.categoryId);
            const getCategories = await api.getAllCategories(userData.token)
            const getSubCategories = await api.getAllSubCategories(userData.token)

            const categoryFilter = getCategories.data.filter((e) => e.isActived === true)

            props.setCategories(categoryFilter)
            props.setSubCategories(getSubCategories.data)

            toast.dark(`${props.item.categoryName} foi desabilitada com sucesso`)

            return

        } catch (error) {
            toast.dark('Não foi possível desabilitar a categoria no momento')
            return
        }

    }

    async function editCategory(){

        if(nameValue === ''){
            toast.dark('A insira um nome válido')
        }

        const fixed = nameValue.charAt(0).toUpperCase() + nameValue.slice(1);

        try {

            const body = {
                newName: fixed,
                categoryId: props.item.categoryId
            }

            await api.editCategory(userData.token, body)
            const getCategories = await api.getAllCategories(userData.token)
            const getSubCategories = await api.getAllSubCategories(userData.token)

            const categoryFilter = getCategories.data.filter((e) => e.isActived === true)

            props.setCategories(categoryFilter)
            props.setSubCategories(getSubCategories.data)

            setShowPopup(false)
            setNameValue('')

        } catch (error) {
            
        }

    }

    return(
        <>
        <Container>
            <h2>{props.item.categoryName}</h2>
            <h3>Sub-categorias cadastradas: {subCategoriesFiltered.length}</h3>
            <h3>Criado por: {props.item.createdBy.userName} ({props.item.createdBy.userRole})</h3>

            <div>
                <EditButton show={showPopup} onClick={() => setShowPopup(true) }>Editar categoria</EditButton>
                <PopupContainer show={showPopup}> 
                    <label >Novo nome:</label>
                    <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder='Digite aqui...' type='text'></input> 
                    <h4 onClick={disableCategory} > Desabilitar categoria </h4>
                    <h5 onClick={editCategory}> Pronto </h5>
                    <h4 onClick={() => setShowPopup(false)}>cancelar</h4>
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
margin: 0 3px 10px 0;
h2{
    font-size: 20px;
    color: #0F014D;
    line-height: 25px;
}
h3{
    font-size: 15px;
    color: #0F014D;
    line-height: 35px;
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