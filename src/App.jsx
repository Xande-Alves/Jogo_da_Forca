import "./app.scss";
import logo from "../src/assets/logo_final.png";
import { useState } from "react";

export default function App() {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true); // Abre o modal configurações
  };

  const modalFechado = () => {
    setModalAberto(false); // Fecha o modal configurações
  };

  function ConfiguracaoModal({ abrirModal, fechaModal }) {
    const [ativo, setAtivo] = useState(false); //Estado do switch

    if (!abrirModal) return null; // Não renderiza o modal se isOpen for falso

    return (
      <>
        <div className="Modal">
          <div className="conteudoModal">
            <h1>CONFIGURAÇÕES</h1>
            <div className="divBotaoFechaModal">
              <button onClick={fechaModal}>❌</button>
            </div>
            <div className="dificuldadeModal">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={ativo}
                  onChange={() => setAtivo(!ativo)}
                />
                <span className="slider" />
              </label>
              <span>Fácil</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header>
        <img src={logo} alt="Logo do Jogo da Forca, um emoji enforcado." />
        <div className="headerTitulo">
          <h4>JOGO DA</h4>
          <h1>FORCA</h1>
        </div>
        <button onClick={abrirModal}>Configurações</button>
      </header>
      {/* MODAL CONFIGURAÇÕES */}
      <ConfiguracaoModal abrirModal={modalAberto} fechaModal={modalFechado} />
    </>
  );
}
