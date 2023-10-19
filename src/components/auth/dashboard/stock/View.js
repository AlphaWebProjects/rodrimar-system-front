import styled from "styled-components"
import api from "../../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../../ButtonWrapper"
import Button from "../../../../common/form/Button"
import { useContext, useState, useEffect} from "react"
import CategorieComponent from "./view-components/CategorieComponent"
import SubCategorieComponent from "./view-components/SubCategorieComponent"
import { dummys } from "./Dummys"
import SubCategorieContainer from "./view-components/ItemsComponents.js/SubCategorieCointainer"
import CreateImage from "../../../image/CreateImage"
import UserContext from "../../../../context/UserContext"

export default function View(){

    const [subCategoryFilterId, setSubCategoryFilterId] = useState('');
    const [showSubCategoriesPopup, setShowSubCategoriesPopup] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoriesViewBool, setSubCategoriesViewBool] = useState(false);
    const [newItemSubCategorieId, setNewItemSubCategorieId] = useState('');
    const [subCategoryInputValue, setSubCategoryInputValue] = useState({name: '', categoryId: ''});
    const [filteredSubCategoryArr, setFilteredSubCategoryArr] = useState([])

    const [categories, setCategories] = useState([]);
    const [categorieInputValue, setCategorieInputValue] = useState('');
    const [categoriesViewBool, setCategoriesViewBool] = useState(false);
    const [showCategoriesPopup, setShowCategoriesPopup] = useState(false);
    
    const [newItemName, setNewItemName] = useState('');
    const [itens, setItens] = useState([]);
    const [itemInputValue, setItemInputValue] = useState('');
    
    const [imageFile, setImageFile] = useState(undefined);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        
        async function getAll(){

            try {

                const getCategories = await api.getAllCategories(userData.token)
                const getItens = await api.getAllItens(userData.token)
                
                const categoryFilter = getCategories.data.filter((e) => e.isActived === true) 

                const itensFilter = getItens.data.filter((e) => e.enable === true)

                const subCategoriesArr1 = []
                
                categoryFilter.map(e => subCategoriesArr1.push(e.allSubCategoriesData))
                const concat = [].concat(...subCategoriesArr1)   
                
                const concatFilter = concat.filter((e) => e.isActived === true)
            
                setCategories(categoryFilter)
                setItens(itensFilter)
                setSubCategories(concatFilter)
                return

            } catch (error) {
                toast.error('Não foi possível obter todos os dados')
            }

        };

        getAll();
        
      }, []);
    
    function productsSubmit(event){

        event.preventDefault();

        if(subCategoryFilterId === ''){
            toast.dark('Selecione uma sub-categoria');
            return
        }

        if(subCategoryFilterId === 'all'){
            setFilteredSubCategoryArr(subCategories);
            return
        }

        const filteredSubCategory = subCategories.filter((e) => e.subCategoryId === Number(subCategoryFilterId))

        setFilteredSubCategoryArr(filteredSubCategory)

        return

    };

    async function addCategorie(){

        try {
            setShowCategoriesPopup(false)
            const body = {
                name: categorieInputValue.charAt(0).toUpperCase() + categorieInputValue.slice(1),
            }

            await api.createCategory(userData.token, body)

            const getCategories = await api.getAllCategories(userData.token)
            const categoryFilter = getCategories.data.filter((e) => e.isActived === true)
            setCategories(categoryFilter)

        } catch (error) {
            toast.error('Não foi possível criar categoria nesse momento.')
        }

    }

    async function addSubCategorie(){

        if(subCategoryInputValue.name === ''){
            toast.dark('Insira um nome válido')
            return
        }

        try {

            const fixed = subCategoryInputValue.name.charAt(0).toUpperCase() + subCategoryInputValue.name.slice(1);

            const body = {
                name: fixed,
                categoryId: Number(subCategoryInputValue.categoryId)
            }
            
            await api.addSubCategory(userData.token, body)
            const getCategories = await api.getAllCategories(userData.token) 
            const categoryFilter = getCategories.data.filter((e) => e.isActived === true) 

            const subCategoriesArr1 = []
                
            categoryFilter.map(e => subCategoriesArr1.push(e.allSubCategoriesData))
            const concat = [].concat(...subCategoriesArr1)   
                
            const concatFilter = concat.filter((e) => e.isActived === true)
            
            setCategories(categoryFilter)
            setSubCategories(concatFilter)

        } catch (error) {
            toast.dark('Não foi possível realizar essa ação no momento')
            return
        }

        setShowSubCategoriesPopup(false)
    }

    async function addNewItem(){

        if(newItemSubCategorieId === ''){
            toast('Selecione uma sub-categoria para o novo item');
            return
        }
        
        if(newItemName === ''){
            toast('Digite um nome para o novo item')
            return
        }

        if(!imageFile){
            return toast.error("Selecione uma imagem")
        }

        const formData = new FormData();
        formData.append('imageFile', imageFile);

        try {           
            const response = await api.CreateImage({token: userData.token, formData})

            if( response.status === 201){
                toast.dark("Imagem enviada com Sucesso !!") //pode esse toast caso necessario
            }
            const { imageId } = response.data
            //console.log(imageId)

        } catch (error) {
            console.log(error)
            toast.error("Verifique os valores ou contate o desenvolvedor")
        }
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
                        {categories.map((obj) => (
                            <CategorieComponent item={obj} setSubCategories={setSubCategories} setCategories={setCategories} subcategories={subCategories}/>
                        ))}
                    </>
                </ViewContainer>
            </>
            
            }
            

            <b>Sub-categorias</b>
            <div>
                <EditButton show={showSubCategoriesPopup} onClick={() => setShowSubCategoriesPopup(true) }>Adicionar sub-categoria</EditButton>
                <PopupContainer show={showSubCategoriesPopup}> 
                    <input value={subCategoryInputValue.name} onChange={(e) => setSubCategoryInputValue({name: e.target.value, categoryId: subCategoryInputValue.categoryId})} placeholder='Nome...' type='text'></input> 
                    <Select onChange={(e) => setSubCategoryInputValue({name: subCategoryInputValue.name, categoryId: e.target.value})}>
                        {categories.map((e) => (
                            <option value={e.categoryId}>{e.categoryName}</option>
                        ))}
                    </Select>
                    <h5 onClick={addSubCategorie}> Adicionar </h5>
                    <h4 onClick={() => setShowSubCategoriesPopup(false)}>cancelar</h4>
                </PopupContainer>
            </div>
            {subCategoriesViewBool === false ? <h2 onClick={() => setSubCategoriesViewBool(true)}>Exibir</h2> : 
            <>
                <h2 onClick={() => setSubCategoriesViewBool(false)}>Ocultar</h2>
                <ViewContainer>
                    <>
                        {subCategories.map((obj) => (
                            <SubCategorieComponent setCategories={setCategories} setSubCategories={setSubCategories} subCategory={obj} categories={categories} itens={itens}/>
                        ))}
                    </>
                </ViewContainer>
            </>
            }

            <form>
                <p>Itens</p>
                <>
                    <label htmlFor="selectBox">Registrar novo item:</label>
                    <Select onChange={(e) => setNewItemSubCategorieId(e.target.value)} name="filter" id="filter">
                        <option value={''}>Selecione</option>
                        {dummys[1].map((obj) => (
                            <option value={obj.id}>{obj.name}</option>
                        ))} 
                            
                    </Select>

                    <input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Nome do novo item..."></input>

                    <CreateImage imageFile={imageFile} setImageFile={setImageFile}/>
                </>
                
                <ButtonWrapper width={"40%"}>
                    <Button onClick={addNewItem} width={"50%"} height={"50px"}>{"Registrar"}</Button>
                </ButtonWrapper>

                <>
                    <label htmlFor="selectBox">Busque por categoria:</label>
                    <Select name="filter" id="filter" onChange={(e) => setSubCategoryFilterId(e.target.value)}>

                        <option value="">Selecione</option>
                        <option value="all">Todas</option>
                        {subCategories.map((obj) => (
                            <option value={obj.subCategoryId}>{obj.subCategoryName}</option>
                        ))} 
                            
                    </Select>
                </>
                
                <ButtonWrapper width={"40%"}>
                    <Button onClick={productsSubmit} width={"50%"} height={"50px"}>{"Buscar"}</Button>
                </ButtonWrapper>

            </form>

            <ViewContainer>

                {filteredSubCategoryArr.length === 0 ? <h2>Selecione filtro de exibição</h2> : 
                
                <>
                
                    {filteredSubCategoryArr.map((obj) => (
                        <SubCategorieContainer subCategory={obj} categories={categories} subCategories={subCategories} itens={itens}/>
                    ))}

                </>
                
                }
                
            </ViewContainer>

            
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
const ViewContainer = styled.div`
width: 90%;
background-color: white;;
height: auto;
border-radius: 15px;
display: flex;
flex-direction: row;
justify-content: center;
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
margin-bottom: 10px;
margin-top: 10px;
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
