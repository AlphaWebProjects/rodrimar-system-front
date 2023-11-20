import styled from "styled-components";
import ItemsToAdd from "./ItemsToAdd";
import SubCategorieExtraData from "./SubCategorieExtraData";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"


export default function ItensDisplay({e, receptBillItens, setReceptBillItens, receptBillQuantity, setReceptBillQuantity}){

    const [displayBool, setDisplayBool] = useState(false)
    const [moreOrLess, setMoreOrLess] = useState('mais')

    function setDisplay(){

        if(displayBool){
            setMoreOrLess('mais')
        }else{
            setMoreOrLess('menos')
        }

        setDisplayBool(!displayBool)

    }

    function addToReceptBill(e){

        const arr = receptBillItens;

        let testArr = [];

        arr.map(function(item){

            if(e.itemId === item.itemId){

                testArr.push(e)
                
            }

        })

        if(testArr.length > 0){
            toast.error('Item já adicionado à nota');
            return
        }

        if(e.stock === 0 || e.stock === '0'){
            toast.error('Este item não se encontra no estoque no momento');
            return
        }

        arr.push(e)

        setReceptBillItens(arr)
        setReceptBillQuantity(Number(receptBillQuantity) - 1)
        setReceptBillQuantity(Number(receptBillQuantity) + 1)

    }

    return(
        <>

            <Container>

            <div>

                <h4 onClick={setDisplay}>Exibir {moreOrLess}</h4>

                <h3>{e.name}</h3>

                {e.insertedStock.length > 0 ? <h3>Último preço: {e.insertedStock[e.insertedStock.length - 1].insertedItemPrice}</h3> : ''}

                <h3>No estoque: {e.stock}</h3>

                <h5 onClick={() => addToReceptBill(e)}>+</h5>

            </div>

            <SubCategorieExtraData displayBool={displayBool} src={e.imageUrl} description={e.description}/>

            </Container>
        
        </>
    )

}

const Container = styled.div`
width: 80%;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border: 1px solid #0F014D;
padding: 2px 2px 2px 2px;
margin: 3px 3px 3px 3px;
border-radius: 5px;
div{
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 0 !important;
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
    width: 100% !important;
    height: 50px !important;
    border: 1px solid #0F014D !important;
    border-radius: 6px !important;
    }
`
