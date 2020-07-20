import React, {useState} from 'react';
import './conversor-moedas.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import  Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{ faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import ListarMoedas from './listar-moedas';
import axios from 'axios';

function ConversorMoedas() {

const  FIXER_URL = 'http://data.fixer.io/api/latest?access_key=5c2321d59b59e4df46f03bed1c18d541';


const [valor, setValor] = useState('1');
const [moedaDe, setMoedaDe] = useState('BRL');
const [moedaPara, setMoedaPara] = useState('USD');
const [exibirSpinner, setExibirSpinner] = useState(false);
const [formValidado, setFormValidado] = useState(false);
const [exibirModal, setExibirModal] = useState(false);
const [resultadoConversao, setResultadoConversao] = useState('');
const [exibirMsgErro, setExibirMsgErro] = useState('false');

function handleValor(event) {
  setValor(event.target.value.replace(/\D/g, ''));
}

function  handleMoedaDe(event) {
  setMoedaDe(event.target.value);
}

function handleMoedaPara(event){
  setMoedaPara(event.target.value);
}

function handleFecharModal(event){
  setValor('1');
  setMoedaDe('BRL');
  setMoedaPara('USD');
  setFormValidado(false);
  setExibirModal(false);
}

function converter (event) {
  event.preventDefault();
  setFormValidado(true);
  if(event.currentTarget.checkValidity() === true){
   //TODO implementar a chamada ao Fixer.oi
    setExibirSpinner(true);
    axios.get(FIXER_URL)
      .then(res =>{
        const cotacao = obterCotacao(res.data);
        if(cotacao) {
        setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
        setExibirModal(true);
        setExibirSpinner(false);
        setExibirMsgErro(false);
      }else{ 
        exibirErro();}
      }).catch(err => exibirErro());

  }
}

function obterCotacao(dadosCotacao){
  if(!dadosCotacao || dadosCotacao.success !== true){
    return false;
  }
  const cotacaoDe = dadosCotacao.rates[moedaDe];
  const cotacaoPara = dadosCotacao.rates[moedaPara];
  const cotacao = (1/ cotacaoDe * cotacaoPara) * valor;
  return cotacao.toFixed(2);
}

function exibirErro(){
  setExibirMsgErro(true);
  setExibirSpinner(false);
}

  return (
    <div>
   <h1 className="text-center">Conversor de moedas</h1>
   <Alert variant="danger" show={exibirMsgErro}>
     Erro obtendo dados de conversão,tente novamente.
   </Alert>
   <Jumbotron>
     <Form onSubmit={converter} noValidate validated={formValidado}>
       <Form.Row>
         <Col sm="3">
          <Form.Control placeholder="0" 
                        value={valor}
                        onChange={handleValor}
                        required />
         </Col>

         <Col sm="3">
          <Form.Control as="select" 
            value={moedaDe}
            onChange={handleMoedaDe}>
            <ListarMoedas />
          </Form.Control>
         </Col>

         <Col sm="1" className="text-center" style={{paddinTop:'5px'}}>
         <FontAwesomeIcon icon={faAngleDoubleRight} />
         </Col>

         <Col sm="3">
          <Form.Control as="select"
            value={moedaPara}
            onChange={handleMoedaPara}>
              <ListarMoedas />
          </Form.Control>
         </Col>
         <Col sm="2">
          <Button variant="success" type="submit" data-testid="btn-converter">
            <span className={exibirSpinner ? null : 'hidden'}>
            <Spinner animation="border" size="sm" />
            </span >
            <span className={exibirSpinner ? 'hidden' : null }>
            Converter
            </span>
            </Button>
         </Col>
       </Form.Row>
     </Form>
     <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
      <Modal.Header closeButton>
        <Modal.Title>Conversão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {resultadoConversao}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleFecharModal}>
          Nova Conversão
        </Button>
      </Modal.Footer>

     </Modal>
   </Jumbotron>
   </div>
  );
    
 
}

export default ConversorMoedas;
