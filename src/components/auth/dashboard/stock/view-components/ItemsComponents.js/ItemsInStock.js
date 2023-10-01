import styled from "styled-components"
import { useContext, useState } from "react"

export default function ItemsInStock(props){

    //const [selected, setSelected] = useState(false)

    const filteredStockItems = props.itemsInStock.filter((e) => e.itemId === props.item.id)
    
    if(filteredStockItems.length === 0){
        return(
            <option>Não disponível</option>
        )
    }

    return(
        
        (props.item.id === filteredStockItems[0].itemId) 
        
        ? 
            
                <>
                    <option readOnly>Visualização</option>
                    {filteredStockItems.map((i) => (
                        <option readOnly>
                            {i.insertedAt} - {i.value}
                        </option>
                    ))}
                </>
            
        
        : 

        ''
        
    )

}


