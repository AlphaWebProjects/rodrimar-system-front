import styled from "styled-components"
import { useContext, useState, useEffect } from "react"
import Button from "../../../../../../common/form/Button"
import { ButtonWrapper } from "../../../../ButtonWrapper"
import { toast } from "react-toastify"
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR"
import api from "../../../../../../services/API"
import UserContext from "../../../../../../context/UserContext"



export default function ItemsToAdd(props){

    return(
            
        <>

            <option value={0}>Selecione um item</option>
            {props.filteredItens.map((o) => (
                    <>
                        <option value={o.itemId} >{o.name}</option>
                    </>
                ))}

        </>
            
    
        
    )

}


