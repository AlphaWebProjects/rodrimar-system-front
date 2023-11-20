import { toast } from "react-toastify";
import styled from "styled-components"
import { useState } from "react";
import { GrDocumentUpload } from 'react-icons/gr';

export default function CreateImage({imageFile, setImageFile}){
    
    const [imageSrc, setImageSrc] = useState(null);

    function handleFileForm({ target: { files } }){
        const file = files[0]

        if(!file){
            setImageFile(undefined)
            return
        }

        const validImageTypes = [
            'image/jpeg', 
            'image/png'
        ];

        if (!validImageTypes.includes(file.type)) {
            toast.error('Tipo de arquivo inválido! Por favor, carregue uma imagem válida.');
            setImageFile(undefined)
            return;
        }

        setImageFile(file)

        const reader = new FileReader();
        reader.onload = (e) => {
        setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    
    return(
        <Container>
            <label>{"Selecione uma imagem para o Item:"}</label>
            <SubContainer>
                <ImagePreviewContainer>
                    {imageFile ? <img alt="" src={imageSrc}/>:<EmptyImageContainer/>}
                </ImagePreviewContainer>

                <InputContainer>
                    <LabelStyled border={imageFile?("#0B83BE"):("#02131B75")}>
                        <FileInputStyled
                            onChange={handleFileForm}
                            placeholder="Insira um nome para a Categoria"
                            name="imageFile"
                            type="file"
                            value={''}
                        />
                            {"Escolher Imagem"}
                        <UploadIcon/>
                    </LabelStyled>
                </InputContainer>
            </SubContainer>
        </Container>
    )
}
const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > label {
        font-size: 15px;
        margin: 0 !important;
    }
`
const SubContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0; 
`
const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-top: 10px;
`
const ImagePreviewContainer = styled(InputContainer)`
    > img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        background-color: red;
        border-radius: 10px;
        border: 3px solid #DBDBDB;
    }
`
const EmptyImageContainer = styled.div`
    width: 200px;
    height: 200px;
    background-color: #E0E0E0;
    border-radius: 10px;
    border: 3px solid #DBDBDB;
`
const FileInputStyled = styled.input`
    display: none;
`
const LabelStyled = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    padding: 1.5vh 1.2vw;
    column-gap: 10px;
    text-align: center;
    border: 2px solid;
    border-color: ${props => props.border}; 
    background-color: #FFFFFF;
    cursor: pointer;
    color: #171717;
    font-size: 15px;
    margin: 0 !important;
`
const UploadIcon = styled(GrDocumentUpload)`
    font-size: 19px;
`