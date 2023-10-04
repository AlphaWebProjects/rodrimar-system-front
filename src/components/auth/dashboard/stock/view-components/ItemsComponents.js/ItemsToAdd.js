
export default function ItemsToAdd(props){



    return(
            
        <>

            <option value={undefined}>Selecione um item</option>
            {props.filteredItems.map((o) => (
                    <>
                        <option value={`${o.id} - ${o.name}`} >{o.name}</option>
                    </>
                ))}

        </>
            
    
        
    )

}


