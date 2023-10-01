import styled from "styled-components"
import { useContext, useState } from "react"
import ItensInStock from "./ItemsInStock";
import { dummys } from "../../Dummys";
import Button from "../../../../../../common/form/Button";
import { ButtonWrapper } from "../../../../ButtonWrapper";
import { AiFillPlusCircle } from 'react-icons/ai';
import test from '../../../../../../assets/images/products/test.png'

export default function SubCategorieContainer(props){

    const filteredCategorie = dummys[0].filter((e) => e.id === props.obj.categorieId)
    const filteredItems = dummys[2].filter((e) => e.subCategorieId === props.obj.id)

    const [showPopup, setShowPopup] = useState(false);

    function ItemSubmit(event){

        event.preventDefault()
        console.log('submit')
        //mandar um delete com o id do item no estoque
    }

    function addToStock(itemId, itemName){

        const obj = {
            id: (dummys[3].length + 1),
            itemId: itemId,
            name: itemName,
            insertedAt: '25/09/2023',
            value: '55',
            insertedBy: 'Admin-1'
        };

        dummys[3].push(obj);

    }

    return(
        <>

        <h2>{props.obj.name}</h2>
        <h3>{`(${filteredCategorie[0].name})`}</h3>
        <Plus/>

        <Container>
            {filteredItems.map((e) => (
                <>
                    <SubContainer>

                        <img src={test}/>
                        <h3>{e.name}</h3>
                        <h3>No estoque: {e.inStock}</h3>
                        
                        <div>

                            <Select value='Adicionados ao estoque:'>
                                
                                <ItensInStock readOnly items={dummys[2]} item={e} itemsInStock={dummys[3]}/>
                            
                            </Select>
                                    
                        </div>

                        <ButtonWrapper width={'60%'}>
                            <Button fontsize={'5'} type='submit' width={"70%"} height={"25px"}>Dar baixa</Button>
                        </ButtonWrapper>

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
`
const Select = styled.select`
margin-top: 8px;
width: 90%;
height: 30px;
border: 1px solid black;
border-radius: 6px;
`
const Plus = styled(AiFillPlusCircle)`
    width: 20px;
    height: 20px;
    margin-left: 0.5%;
    color: #0F014D;
    cursor: pointer;
    &:hover{
        color:blue;
    }
`
const PopupContainer = styled.div`
margin-top: 10px;
width: auto;
height: auto;
background-color: white;
padding: 20px 20px 15px 20px;
border: 1px solid #0F014D;
display: block;
border-radius: 10px;
align-items: center;
justify-content: center;
text-align: center;
input{
    border: 1px solid #0F014D;
    border-radius: 10px;
    height: 12px;
    margin-left: 0px;
}
`;