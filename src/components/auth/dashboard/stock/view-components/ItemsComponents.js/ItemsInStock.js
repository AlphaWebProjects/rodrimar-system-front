import styled from "styled-components"
import { useContext, useState } from "react"
import Button from "../../../../../../common/form/Button"
import { ButtonWrapper } from "../../../../ButtonWrapper"
import { toast } from "react-toastify"

export default function ItemsInStock(props){

    //fazer o get aqui, e verificar a length da array. Toda vez que houver alteração, faz a filtragem novamente. Ou fazer por setTime
    const [downQuantity, setDownQuantity] = useState('')

    const filteredStockItems = props.itemsInStock.filter((e) => e.itemId === props.item.id)

    function downItem(event){

        event.preventDefault();

        const converted = Math.floor(Number(downQuantity));
        if(converted <= 0 || converted === '' || downQuantity === ''){
            toast('Insira uma quantidade válida')
            return
        }

        if(converted > 10){
            toast('Quantidade máxima de itens por vez atingida')
            return
        }

    }
    
    if(filteredStockItems.length === 0){
        return(
            <h2>Não disponível</h2>
        )
    }


    return(
        
        (props.item.id === filteredStockItems[0].itemId) 
        
        ? 
            
                <>
                    <select>
                        <option readOnly>Visualização</option>
                        {filteredStockItems.map((i) => (
                            <option readOnly>
                                {i.insertedAt} - {i.value}
                            </option>
                        ))}
                    </select>

                    <input value={downQuantity} onChange={(e) => setDownQuantity(e.target.value)} type="number" placeholder="Quantidade..."></input>

                    <ButtonWrapper width={'60%'}>
                        <Button onClick={downItem} fontsize={'5'} type='submit' width={"70%"} height={"35px"}>Dar baixa</Button>
                    </ButtonWrapper>
                    
                </>
            
        
        : 

        ''
        
    )

}


