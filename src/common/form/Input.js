import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function Input({ mask = '', maskChar = '', formatChars, variant = 'outlined', value='', onChange = () => 0, width, background, events, ...props }) {
  return (mask || maskChar) ? (
    <InputMask  mask={mask} maskChar={maskChar} value={value} onChange={onChange} {...(formatChars && { formatChars })}>
      {() => <StyledTextField {...props} variant={variant} width={width} background={background} events={events}/>}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} onChange={onChange} variant={variant} width={width} background={background} events={events}/>
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
  background-color: ${(props) => props.background || 'initial'};
  pointer-events: ${(props) => props.events || 'initial'};
  width: ${(props) => props.width || 'auto'};
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #391FAA;  // Altere para a cor que você deseja quando o input está em foco
    }
  }
  & label.Mui-focused {
    color: #0F014D;  // Altere para a cor que você deseja quando o rótulo está focado
  }
`;