import styled from 'styled-components';

const Contain = styled.div`
  height: 100vh;
  width: 100%;
  background-size: 300% 300%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  padding: ${props => props.padding || '20px'};
  border-radius: 20px;
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.3);
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '500px'};
  margin-left: ${props => props.mrgL ||'0px'};
  margin-right: ${props => props.mrgR ||'0px'}
`;


const Heading = styled.h1`
  font-size: 56px;
  background: -webkit-linear-gradient(#8c22bd, #3532ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center; 
`;


const WelcomeText = styled.h2`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 30px;
  font-weight: 900;
  background: -webkit-linear-gradient(#2ef587, #00ebdf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-align: center; 
`;

const InputField = styled.input`
  display: block;
  width: auto;
  padding: 10px;
  margin: 10px auto;
  border: 1px solid #555;
  border-radius: 15px;
  background-color: #444;
  color: #fff;
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  max-width: 100px;
  padding: 10px;
  margin: 20px auto 10px;
  border: none;
  border-radius: 15px;
  background-color: #0077ff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #0066cc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
`;
export {Contain,LoginButton,LoginContainer,InputField,WelcomeText,Heading}