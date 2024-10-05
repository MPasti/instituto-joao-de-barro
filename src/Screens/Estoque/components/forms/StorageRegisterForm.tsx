import { Form, Input, InputContainer } from "../../styles"

export const StorageRegisterForm = () => {
    return (
        <Form>
            <InputContainer>
                <label htmlFor="">Nome do material</label>
                <Input type="text"/>
            </InputContainer>
            <InputContainer>
                <label htmlFor="">Quantidade</label>
                <Input type="text"/>
            </InputContainer>
            <InputContainer>
                <label htmlFor="">Descrição</label>
                <Input type="text"/>
            </InputContainer>
        </Form>
    )
}