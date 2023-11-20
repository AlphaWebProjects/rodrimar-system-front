import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import ItensInStock from "./ItemsInStock";
import api from "../../../../../../services/API";
import test from '../../../../../../assets/images/products/test.png';
import ItemsToAdd from "./ItemsToAdd";
import { toast } from "react-toastify"
import UserContext from "../../../../../../context/UserContext";
import SubCategorieExtraData from "./SubCategorieExtraData";
import ItensDisplay from "./ItensDisplay";

export default function SubCategorieContainer(
    {allImages, setAllImages, subCategory, categories, subCategories, itens, useEffectBool, setUseEffectBool, setReceptBillItens, receptBillItens, receptBillQuantity, setReceptBillQuantity}
    ){

    const { userData } = useContext(UserContext);

    const filteredCategorie = categories.filter((e) => e.categoryId === subCategory.mainCategoryId);

    const [filteredItens, setFilteredItens] = useState(itens.filter((e) => e.subCategoryId === subCategory.subCategoryId))
    const [downStockItemId, setDownStockItemId] = useState(0);
    const [price, setPrice] = useState('');
    const [downQuantity, setDownQuantity] = useState('');
    const [plates, setPlates] = useState([]);
    const [plateId, setPlateId] = useState('')

    const [insertedItensUseEffectBool, setInsertedItensUseEffectBool] = useState(true)

    useEffect(() => {
        
        async function getAll(){

            try {

                const getPlates = await api.getAllPlates(userData.token)
                const getImages = await api.getAllImages(userData.token);
                const getItens = await api.getAllItens(userData.token)

                setAllImages(getImages.data);
                const onlyEnabledItens = getItens.data.filter((e) => e.enable === true);

                
                const filtered = onlyEnabledItens.filter((e) => e.subCategoryId === subCategory.subCategoryId)

                setFilteredItens(filtered)

                setPlates(getPlates.data)

                return

            } catch (error) {
                console.log(error)
                toast.error('Não foi possível obter todos os dados')
            }

        };

        getAll();
        
      }, [useEffectBool]);

    async function downItem(event){

        event.preventDefault();

        if(downStockItemId === 0){
            toast.error('Selecione um item')
            return
        }

        const quantityConverted = Math.floor(Number(downQuantity))
        if(quantityConverted <= 0 || quantityConverted === '' || downQuantity === ''){
            toast.error('Insira uma quantidade válida')
            return
        }

        if(plateId === ''){
            toast.error('Selecione uma placa');
            return
        }

        console.log(itens[0].itemId, downStockItemId)

        const stockItemFilter = itens.filter((i) => i.itemId === Number(downStockItemId))

        console.log(stockItemFilter)
        
        if(Number(stockItemFilter[0].stock) < Number(downQuantity)){
            toast.error('Não há itens no estoque o suficiente para essa quantidade de baixas');
            return
        }

        const downQuantityNumber = Number(downQuantity)

        const body = {
                itemId: Number(downStockItemId),
                deletedQuantity: Number(downQuantityNumber.toFixed(2)),
                licenseId: Number(plateId)
            }

        await api.deleteItem(userData.token, body)

        setInsertedItensUseEffectBool(!insertedItensUseEffectBool)

        setDownStockItemId(0);
        setPrice('');
        setDownQuantity('');
        setPlateId('');
        setFilteredItens(itens.filter((e) => e.subCategoryId === subCategory.subCategoryId))
        setUseEffectBool(!useEffectBool)

        toast.dark('Item adicionado ao estoque com sucesso.')

        return

    }
    

    return(
        <>

        <h2>{subCategory.subCategoryName}</h2>
        <h3>{`(${filteredCategorie[0].categoryName})`}</h3>

        <Container>
            {filteredItens.length < 1 ? <h2>Não há itens registrados nesta sub-categoria</h2> : 
            
            <>
            
                {filteredItens.map((e) => (
                    <>
                        
                        <ItensDisplay 
                        e={e} 
                        receptBillItens={receptBillItens} 
                        setReceptBillItens={setReceptBillItens}
                        receptBillQuantity={receptBillQuantity}
                        setReceptBillQuantity={setReceptBillQuantity}
                        />

                    </>
                ))}
            
            </>
            
            }
            

        </Container>

        <ItemAddForm>
            <form>
                <AddSelect value={downStockItemId} onChange={(e) => setDownStockItemId(e.target.value)} required>
                    
                    <ItemsToAdd filteredItens={filteredItens}/>

                </AddSelect>

                <AddSelect value={plateId} onChange={(e) => setPlateId(e.target.value)} required>
                    
                    <option value=''> Selecione uma placa </option>
                    {plates.map((p) => (

                        <option value={p.id}>{p.license}</option>

                    ))}

                </AddSelect>

                <input value={downQuantity} onChange={(e) => setDownQuantity(e.target.value)} required type='number' placeholder='Quantidade...'></input>

                <button onClick={downItem}>Dar baixa</button>
            </form>
        </ItemAddForm>
        </>
    )

}

const Container = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px solid #0F014D;
padding: 5px 5px 5px 5px;
border-radius: 10px;
margin: 10px 0 10px 0;
flex-wrap: wrap;
h3{
    font-size: 15px !important;
    color: #0F014D; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
h5{
    font-size: 20px !important;
    color: #0F014D;
    line-height: 20px;
    margin-top: 0 !important;
    &:hover{
        color: green;
        cursor: pointer;
    } 
}
h4{
    font-size: 12px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 0px !important;
    &:hover{
        color: #0F014D !important;
        cursor: pointer;
    }
}
img{
    width: 95px;
    height: 95px;
}
`

const AddSelect = styled.select`
width: 60%;
height: 30px;
border: 1px solid #0F014D;
border-radius: 6px;
margin-left: 10px;
`
const ItemAddForm = styled.div `
display: flex !important;
align-items: center !important;
justify-content: center !important;
flex-direction: row !important;
margin-left: 15px !important;
margin-bottom: 55px;
form{
    width: 100%;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: row !important;
    button{
        background-color: #0F014D;
        border-radius: 8px;
        width: 20%;
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
