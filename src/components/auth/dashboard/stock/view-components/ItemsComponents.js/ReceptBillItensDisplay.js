import styled from "styled-components"
import { useContext, useState, useEffect } from "react"
import Button from "../../../../../../common/form/Button"
import { ButtonWrapper } from "../../../../ButtonWrapper"
import { toast } from "react-toastify"
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR"
import api from "../../../../../../services/API"
import UserContext from "../../../../../../context/UserContext"
import {GrSubtractCircle} from "react-icons/gr"

export default function ReceptBillItensDisplay({e, receptBillItens, setReceptBillItens, receptBillQuantity, setReceptBillQuantity, itensTotalPrice, setItensTotalPrice}){

    const [receptBillItensValues, setReceptBillItensValues] = useState({unityPrice: '', quantity: ''})
    const [disableMechanics, setDisableMechanics] = useState({bool: false, readyOrReset: 'Pronto'})

    function removeItem(){

        const arr1 = receptBillItens;
        const arr2 = itensTotalPrice;

        

        const receptBillItensFilter = arr1.filter((o) => o.itemId !== e.itemId)
        const receptBillTotalPriceFilter = arr2.filter((o) => o.itemId !== e.itemId)


        setReceptBillItens(receptBillItensFilter)
        setItensTotalPrice(receptBillTotalPriceFilter)

        setReceptBillQuantity(Number(receptBillQuantity) - 1)
        setReceptBillQuantity(Number(receptBillQuantity) + 1)

    }

    function ready(){

        if(receptBillItensValues.unityPrice === '' || receptBillItensValues.quantity === ''){
            toast.error('Preencha os valores')
            return
        }

        if(disableMechanics.bool === false){

            const arr = itensTotalPrice

            const body = {
                itemName: e.name,
                itemId: e.itemId,
                quantity: Number(receptBillItensValues.quantity),
                unityPrice: Number(receptBillItensValues.unityPrice),
                totalItemPrice: Number(receptBillItensValues.unityPrice) * Number(receptBillItensValues.quantity)
            }

            arr.push(body)

            setItensTotalPrice(arr)

            setReceptBillQuantity(Number(receptBillQuantity) - 1)
            setReceptBillQuantity(Number(receptBillQuantity) + 1)

            setDisableMechanics({bool: true, readyOrReset: 'Editar'})

        }else{

            const arr = itensTotalPrice;

            const filter = arr.filter((o) => o.itemId !== e.itemId)

            setItensTotalPrice(filter)

            setReceptBillQuantity(Number(receptBillQuantity) - 1)
            setReceptBillQuantity(Number(receptBillQuantity) + 1)

            setDisableMechanics({bool: false, readyOrReset: 'Pronto'})
            
        }

    }

    return(

        <>

        <Container>

        <Icon onClick={() => removeItem()}/>

            <SubContainer>

                <img src={e.imageUrl}/>

                <h3>{e.name}</h3>

            </SubContainer>

            <input 
            value={receptBillItensValues.unityPrice} 
            onChange={(e) => setReceptBillItensValues({unityPrice: e.target.value, quantity: receptBillItensValues.quantity})}
            placeholder="Preço-unidade" 
            type='number'
            disabled={disableMechanics.bool}
            />

            <input 
            value={receptBillItensValues.quantity}
            onChange={(e) => setReceptBillItensValues({unityPrice: receptBillItensValues.unityPrice, quantity: e.target.value})}
            placeholder="Quantidade" 
            type='number'
            disabled={disableMechanics.bool}
            />

            <p onClick={ready}>{disableMechanics.readyOrReset}</p>

        </Container>

            
        </>

    )

}

const SubContainer = styled.div`
img{
    width: 50px !important;
    height: 50px !important;
}
display: flex !important;
justify-content: space-between !important;

`

const Container = styled.div`
display: flex;
flex-direction: row;
border: none !important;
input{
    width: 100% !important;
    margin-left: 15px !important;
    &:disabled{
        background-color: lightgray;
    }
}
p{
    font-size: 15px !important;
    margin: 0 0 15px 8px !important;
    cursor: pointer;
}
`

const Icon = styled(GrSubtractCircle)`
width: 40px;
height: 40px;
margin-right: 10px;
`