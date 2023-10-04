import styled from "styled-components";
import { useContext, useState } from "react";
import ItensInStock from "./ItemsInStock";
import { dummys } from "../../Dummys";
import Button from "../../../../../../common/form/Button";
import { ButtonWrapper } from "../../../../ButtonWrapper";
import test from '../../../../../../assets/images/products/test.png';
import ItemsToAdd from "./ItemsToAdd";
import { toast } from "react-toastify"

export default function SubCategorieContainer(props){

    const filteredCategorie = dummys[0].filter((e) => e.id === props.obj.categorieId)
    const filteredItems = dummys[2].filter((e) => e.subCategorieId === props.obj.id)

    const [addStockItemData, setAddStockItemData] = useState('')
    const [price, setPrice] = useState('')
    const [addQuantity, setAddQuantity] = useState('')
    const [filtered, setFiltered] = useState([]) 

    function addItem(event){

        event.preventDefault();

        if(addStockItemData === ''){
            toast('Selecione um item')
            return
        }

        const priceConverted = Number(price)
        if(priceConverted <= 0 || priceConverted === '' || price === ''){
            toast('Dê um preço válido ao item')
            return
        }

        const quantityConverted = Math.floor(Number(addQuantity))
        if(quantityConverted <= 0 || quantityConverted === '' || addQuantity === ''){
            toast('Insira uma quantidade válida')
            return
        }

        if(quantityConverted > 10){
            toast('Máximo de itens por vez atingido')
            return
        }

        const obj = {
            id: (dummys[3].length + 1),
            itemId: Number(addStockItemData[0]),
            name: addStockItemData.slice(4),
            insertedAt: '25/09/2023',
            value: priceConverted.toFixed(2),
            insertedBy: 'Admin-1'
        };

        dummys[3].push(obj);

    }

    return(
        <>

        <h2>{props.obj.name}</h2>
        <h3>{`(${filteredCategorie[0].name})`}</h3>

        <ItemAddForm>
            <form>
                <AddSelect onChange={(e) => setAddStockItemData(e.target.value)} required>
                    
                    <ItemsToAdd filteredItems={filteredItems}/>

                </AddSelect>

                <input value={price} onChange={(e) => setPrice(e.target.value)} required type='number' placeholder='Preço do item...'></input>

                <input value={addQuantity} onChange={(e) => setAddQuantity(e.target.value)} required type='number' placeholder='Quantidade...'></input>

                <button onClick={addItem}>Adicionar item ao estoque</button>
            </form>
        </ItemAddForm>

        <Container>
            {filteredItems.map((e) => (
                <>
                    <SubContainer>

                        <img src={test}/>
                        <h3>{e.name}</h3>
                        <h3>No estoque: {e.inStock}</h3>
                        
                        <div>

                            <DownSelect>
                                
                                <ItensInStock readOnly filtered={filtered} setFiltered={setFiltered} items={dummys[2]} item={e} itemsInStock={dummys[3]}/>                            

                            </DownSelect>
                                    
                        </div>

                    </SubContainer>

                </>
            ))}

        </Container>
        </>
    )

}

const Container = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border: 2px solid #0F014D;
padding: 20px 20px 20px 20px;
border-radius: 10px;
margin: 0 0 40px 0;
flex-wrap: wrap;

h3{
    font-size: 15px;
    color: #0F014D; 
}
h5{
    font-size: 13px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 5px;
    &:hover{
        color: green;
        cursor: pointer;
    } 
}
h4{
    font-size: 13px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 5px;
    &:hover{
        color: red;
        cursor: pointer;
    }
}
img{
    width: 95px;
    height: 95px;
}
`
const SubContainer = styled.div`
width: 24%;
height: auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid #0F014D;
padding: 15px 0px 15px 0px;
margin: 10px 5px 10px 0;
border-radius: 5px;
div{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width: 50% !important;
    height: 30px !important;
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
}
input{
    margin: 8px 0 0 0 !important;
    width: 50% !important;
    height: 60% !important;
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
