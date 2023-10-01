import styled from "styled-components"
import api from "../../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../../ButtonWrapper"
import Button from "../../../../common/form/Button"
import { useContext, useState } from "react"
import CategorieComponent from "./view-components/CategorieComponent"
import SubCategorieComponent from "./view-components/SubCategorieComponent"
import { dummys } from "./Dummys"
import SubCategorieContainer from "./view-components/ItemsComponents.js/SubCategorieCointainer"

export default function View(){

    const [categorieValue, setCategorieValue] = useState('allcategories');
    const [subCategorieValue, setSubCategorieValue] = useState('allsubcategories');
    const [orderValue, setOrderValue] = useState('first');
    const [itemInputValue, setItemInputValue] = useState('');
    const [categorieInputValue, setCategorieInputValue] = useState('');
    const [categoriesViewBool, setCategoriesViewBool] = useState(false);
    const [subCategoriesViewBool, setSubCategoriesViewBool] = useState(false);
    const [showCategoriesPopup, setShowCategoriesPopup] = useState(false);
    const [subCategorieInputValue, setSubCategorieInputValue] = useState({name: '', categorie: ''});
    const [showSubCategoriesPopup, setShowSubCategoriesPopup] = useState(false);
    
    function productsSubmit(event){
        event.preventDefault();
    };

    function addCategorie(){

        setShowCategoriesPopup(false)
        dummys[0].push(
            {
                id: (dummys[0].length + 1),
                name: categorieInputValue,
                createdBy: 'Admin-1'
            }
        )
    }

    function addSubCategorie(){

        setShowSubCategoriesPopup(false)

        const filteredArr = dummys[0].filter(obj => obj.name === subCategorieInputValue.categorie);

        if(filteredArr.length === 0){
            toast('Categoria inexistente')
            return
        }

        dummys[1].push(
            {
                id: (dummys[1].length + 1),
                categorieId: filteredArr[0].id,
                name: subCategorieInputValue.name,
                createdBy: 'Admin-2'
            }
        )
    }

    return(
        <Container>

            <h1>Visuzalização</h1>

            <b>Categorias</b>
            <div>
                <EditButton show={showCategoriesPopup} onClick={() => setShowCategoriesPopup(true) }>Adicionar categoria</EditButton>
                <PopupContainer show={showCategoriesPopup}> 
                    <input value={categorieInputValue} onChange={(e) => setCategorieInputValue(e.target.value)} placeholder='Nome...' type='text'></input> 
                    <h5 onClick={addCategorie}> Adicionar </h5>
                    <h4 onClick={() => setShowCategoriesPopup(false)}>cancelar</h4>
                </PopupContainer>
            </div>
            {categoriesViewBool === false ? <h2 onClick={() => setCategoriesViewBool(true)}>Exibir</h2> : 
            <>
                <h2 onClick={() => setCategoriesViewBool(false)}>Ocultar</h2>
                <ViewContainer>
                    <>
                        {dummys[0].map((obj) => (
                            <CategorieComponent item={obj} subcategories={dummys[1]}/>
                        ))}
                    </>
                </ViewContainer>
            </>
            
            }
            

            <b>Sub-categorias</b>
            <div>
                <EditButton show={showSubCategoriesPopup} onClick={() => setShowSubCategoriesPopup(true) }>Adicionar sub-categoria</EditButton>
                <PopupContainer show={showSubCategoriesPopup}> 
                    <input value={subCategorieInputValue.name} onChange={(e) => setSubCategorieInputValue({name: e.target.value, categorie: subCategorieInputValue.categorie})} placeholder='Nome...' type='text'></input> 
                    <input value={subCategorieInputValue.categorie} onChange={(e) => setSubCategorieInputValue({name: subCategorieInputValue.name, categorie: e.target.value})} placeholder='Categoria a ser vinculada...' type='text'></input>
                    <h5 onClick={addSubCategorie}> Adicionar </h5>
                    <h4 onClick={() => setShowSubCategoriesPopup(false)}>cancelar</h4>
                </PopupContainer>
            </div>
            {subCategoriesViewBool === false ? <h2 onClick={() => setSubCategoriesViewBool(true)}>Exibir</h2> : 
            <>
                <h2 onClick={() => setSubCategoriesViewBool(false)}>Ocultar</h2>
                <ViewContainer>
                    <>
                        {dummys[1].map((obj) => (
                            <SubCategorieComponent item={obj} categories={dummys[0]} items={dummys[2]}/>
                        ))}
                    </>
                </ViewContainer>
            </>
            }

            <form onSubmit={productsSubmit}>
                <p>Itens</p>
                <>
                    <label htmlFor="selectBox">Selecione uma categoria:</label>
                    <Select name="filter" id="filter" onChange={(e) => e.target.value(categorieValue)}>

                        <option value="allcategories">Todas</option>
                        {dummys[0].map((obj) => (
                            <option value={obj.id}>{obj.name}</option>
                        ))} 
                            
                    </Select>
                </>

                <>
                    <label htmlFor="selectBox">Selecione uma sub-categoria:</label>
                    <Select name="filter" id="filter" onChange={(e) => setSubCategorieValue(e.target.value)}>

                        <option value="allsubcategories">Todas</option>
                        {dummys[1].map((obj) => (
                            <option value={obj.id}>{obj.name}</option>
                        ))}
                            
                        
                    </Select>
                </>
                
                <>
                    <label htmlFor="selectBox">Selecione uma ordem:</label>
                    <Select name="products" id="products" onChange={(e) => setOrderValue(e.target.value)}>

                            <option value="first">Primeiro inserido</option>
                            <option value="last">Último inserido</option>
                            <option value="alphabetic">Ordem alfabética</option>
                        
                    </Select>
                </>

                <label >Busque por um item específico:</label>
                <input placeholder='Digite aqui...' type='text' value={itemInputValue} onChange={(e) => setItemInputValue(e.target.value)}></input>
                
                <ButtonWrapper width={"40%"}>
                    <Button type='submit' width={"50%"} height={"50px"}>{"Buscar"}</Button>
                </ButtonWrapper>

                <ViewContainer>
                    {dummys[1].map((obj) => (
                        <SubCategorieContainer obj={obj} dummys={dummys}/>
                    ))}
                </ViewContainer>

            </form>

            
            
        </Container>
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
        margin: 25px 0 15px 0;
    }
    input{
        width: 50%;
        height: 50px;
        border: none;
        border-radius: 10px;
        margin-bottom: 20px;
    }
}
`
const ViewContainer = styled.div`
width: 90%;
background-color: white;;
height: auto;
border-radius: 15px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
border: 4px solid #0F014D;
padding: 25px 15px 25px 15px;
flex-wrap: wrap;
margin: 15px 0 15px 0;
`
const Select = styled.select`
width: 50%;
height: 50px;
border: none;
border-radius: 10px;
`
const EditButton = styled.div`
display: ${props => (props.show ? 'none' : 'block')};
border-radius: 10px;
padding: 5px;
margin-top: 10px;
transition: transform 0.3s ease;
&:hover {
    transform: scale(1.1);
    color: green;
    cursor: pointer;
  }
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
