import styled from "styled-components"
import { useContext, useState } from "react"
import UserContext from "../../../../../context/UserContext";
import api from "../../../../../services/API";
import { toast } from "react-toastify"

export default function SubCategorieComponent(props){

    const [showPopup, setShowPopup] = useState(false);
    const [nameValue, setNameValue] =useState('');
    const { userData } = useContext(UserContext);

    const subCategoriesFiltered = props.itens.filter((obj) => obj.subCategoryId === props.subCategory.subCategoryId);
    const categoriesFiltered = props.categories.filter((obj) => obj.categoryId === props.subCategory.mainCategoryId);

    async function editSubCategory(){

        setShowPopup(false);

        if(nameValue === ''){
            toast.dark('Insira um nome válido');
            return
        }

        try {

            const fixed = nameValue.charAt(0).toUpperCase() + nameValue.slice(1);
            
            const body = {
                newName: fixed,
                subCategoryId: props.subCategory.subCategoryId,
                categoryId: props.subCategory.mainCategoryId
            }
    
            await api.editSubCategory(userData.token, body);
            const getCategories = await api.getAllCategories(userData.token)
                
            const categoryFilter = getCategories.data.filter((e) => e.isActived === true) 

            const subCategoriesArr1 = []
                
            categoryFilter.map(e => subCategoriesArr1.push(e.allSubCategoriesData))
            const concat = [].concat(...subCategoriesArr1)   
                
            const concatFilter = concat.filter((e) => e.isActived === true);

            //console.log(concatFilter, 'concat')

            props.setSubCategories(concatFilter);
            props.setCategories(categoryFilter);

        } catch (error) {
            toast.dark('Não foi possível realizar essa ação no momento!')
        }

    }

    async function disableSubCategory(){

        if(subCategoriesFiltered.length > 0){
            toast.dark('Só é possível desabilitar sub-categorias que não possuem itens registrados.');
            return
        }

        try {

            await api.disableSubCategory(userData.token, props.subCategory.subCategoryId);
            const getCategories = await api.getAllCategories(userData.token)
                
            const categoryFilter = getCategories.data.filter((e) => e.isActived === true) 

            const subCategoriesArr1 = []
                
            categoryFilter.map(e => subCategoriesArr1.push(e.allSubCategoriesData))
            const concat = [].concat(...subCategoriesArr1)   
                
            const concatFilter = concat.filter((e) => e.isActived === true);

            props.setSubCategories(concatFilter);
            props.setCategories(categoryFilter);

            return

        } catch (error) {
            toast.dark('Não foi possível realizar essa ação no momento.')
            return
        }

    }
    

    return(
        <>
        <Container>
            <h2>{props.subCategory.subCategoryName}</h2>
            <h3>Itens cadastrados: {subCategoriesFiltered.length}</h3>
            <h3>Pertencente à: {categoriesFiltered[0].categoryName}</h3>
            <h3>Criado por: {props.subCategory.createdBy.userName} ({props.subCategory.createdBy.userRole})</h3>

            <div>
                <EditButton show={showPopup} onClick={() => setShowPopup(true) }>Editar sub-categoria</EditButton>
                <PopupContainer show={showPopup}> 
                    <label >Novo nome:</label>
                    <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder='Digite aqui...' type='text'></input> 
                    <h4 onClick={disableSubCategory}> Deletar sub-categoria </h4>
                    <h5 onClick={editSubCategory}> Pronto </h5>
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