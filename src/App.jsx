import "./app.scss";
import { useState } from "react";
import logo from "../src/assets/logo_final sf.png";

// imagens da forca
import forca0 from "../src/assets/forca0.png";
import forca1 from "../src/assets/forca1.png";
import forca2 from "../src/assets/forca2.png";
import forca3 from "../src/assets/forca3.png";
import forca4 from "../src/assets/forca4.png";
import forca5 from "../src/assets/forca5.png";
import forca6 from "../src/assets/forca6.png";

// Palavras divididas por dificuldade
const facil = [
  "casa",
  "bola",
  "gato",
  "pato",
  "peixe",
  "sol",
  "lua",
  "fogo",
  "agua",
  "vento",
  "flor",
  "frio",
  "calor",
  "neve",
  "dado",
  "muro",
  "arroz",
  "fruta",
  "ninho",
  "cinto",
  "barco",
  "folha",
  "sino",
  "faca",
  "nuvem",
  "vaca",
  "gelo",
  "pedra",
  "ponte",
  "sapo",
  "mesa",
  "copo",
  "tocha",
  "bala",
  "areia",
  "chave",
  "cobra",
  "tigre",
  "festa",
  "natal",
  "manga",
  "couro",
  "rato",
  "verde",
  "muro",
  "touro",
  "burro",
  "treno",
  "porta",
  "tempo",
];
const normal = [
  "camiseta",
  "elefante",
  "cachorro",
  "abacaxi",
  "pirata",
  "montanha",
  "girafa",
  "telefone",
  "escada",
  "carteira",
  "formiga",
  "macaneta",
  "tapete",
  "varanda",
  "barulho",
  "corrente",
  "bicicleta",
  "planeta",
  "chiclete",
  "palhaco",
  "armario",
  "janelao",
  "soldado",
  "espelho",
  "computar",
  "oceano",
  "lenhador",
  "profeta",
  "musical",
  "igreja",
  "torneira",
  "biscoito",
  "refresco",
  "gramado",
  "chuveiro",
  "camisola",
  "lavador",
  "campeao",
  "portaria",
  "pintura",
  "relogio",
  "pescador",
  "magneto",
  "folhagem",
  "hospital",
  "gorila",
  "colher",
  "varrendo",
  "torneio",
];
const dificil = [
  "ornitorrinco",
  "paralelepipedo",
  "extraordinario",
  "anticonstitucional",
  "desenvolvimento",
  "inconstitucional",
  "responsabilidade",
  "comunicabilidade",
  "infraestrutura",
  "caracteristica",
  "independencia",
  "conhecimento",
  "investigacao",
  "representante",
  "estabelecimento",
  "universidade",
  "automatizacao",
  "transformacao",
  "revolucionario",
  "beneficiamento",
  "eletricidade",
  "demonstrativo",
  "compreensivel",
  "observatorio",
  "meteorologia",
  "interplanetario",
  "caracterizacao",
  "institucional",
  "participativo",
  "protagonista",
  "compartilhamento",
  "documentario",
  "reconhecimento",
  "apresentacao",
  "desconhecido",
  "transformador",
  "interessante",
  "aproximadamente",
  "radioatividade",
  "multiplicacao",
  "construcao",
  "organizacao",
  "habilitacao",
  "coordenador",
  "alimentacao",
  "aproveitamento",
  "mobilizacao",
  "comunicacao",
  "aprimoramento",
  "retransmissao",
];

// imagens em array para fácil controle
const imagensForca = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

export default function App() {
  const [modalAberto, setModalAberto] = useState(false);
  const [nivel, setNivel] = useState("facil");
  const [palavra, setPalavra] = useState("");
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [estadoJogo, setEstadoJogo] = useState("inicio"); // inicio, jogando, venceu, perdeu

  // sorteia palavra conforme dificuldade
  const sortearPalavra = (nivelAtual) => {
    const lista =
      nivelAtual === "facil"
        ? facil
        : nivelAtual === "normal"
        ? normal
        : dificil;
    const aleatoria =
      lista[Math.floor(Math.random() * lista.length)].toUpperCase();
    setPalavra(aleatoria);
    setLetrasUsadas([]);
    setErros(0);
    setEstadoJogo("jogando");
  };

  // ao clicar em uma letra
  const tentativa = (letra) => {
    if (estadoJogo !== "jogando") return;
    if (letrasUsadas.includes(letra)) return;
    setLetrasUsadas([...letrasUsadas, letra]);

    if (!palavra.includes(letra)) {
      const novosErros = erros + 1;
      setErros(novosErros);
      if (novosErros === 6) setEstadoJogo("perdeu");
    } else {
      const todasDescobertas = palavra
        .split("")
        .every((l) => letrasUsadas.includes(l) || l === letra);
      if (todasDescobertas) {
        setEstadoJogo("venceu");
        calcularPontuacao();
      }
    }
  };

  const calcularPontuacao = () => {
    const base = nivel === "facil" ? 10 : nivel === "normal" ? 20 : 40;
    const bonus = Math.max(0, 6 - erros) * 5;
    setPontos(pontos + base + bonus);
  };

  const reiniciar = () => {
    sortearPalavra(nivel);
  };

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  // Modal de configuração (sem botão Iniciar)
  function ConfiguracaoModal({ abrirModal, fechaModal }) {
    if (!abrirModal) return null;

    const Switch = ({ ativo, onClick }) => (
      <label className="switch" onClick={onClick}>
        <input type="checkbox" checked={ativo} readOnly />
        <span className="slider" />
      </label>
    );

    return (
      <div className="Modal">
        <div className="conteudoModal">
          <div className="divBotaoFechaModal">
            <button onClick={fechaModal}>❌</button>
          </div>
          <h1>CONFIGURAÇÕES</h1>
          <div className="dificuldadeModal">
            <h2>Escolha a dificuldade</h2>
            <div className="opcao">
              <Switch
                ativo={nivel === "facil"}
                onClick={() => setNivel("facil")}
              />
              <span>Fácil</span>
            </div>
            <div className="opcao">
              <Switch
                ativo={nivel === "normal"}
                onClick={() => setNivel("normal")}
              />
              <span>Normal</span>
            </div>
            <div className="opcao">
              <Switch
                ativo={nivel === "dificil"}
                onClick={() => setNivel("dificil")}
              />
              <span>Difícil</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderPalavra = () =>
    palavra.split("").map((letra, i) =>
      letrasUsadas.includes(letra) ? (
        <span key={i} className="letra">
          {letra}
        </span>
      ) : (
        <span key={i} className="traco">
          _
        </span>
      )
    );

  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
      <header>
        <img
          src={logo}
          alt="Logo do jogo da forca"
          onClick={() => window.location.reload()}
        />
        <div className="headerTitulo">
          <h4>JOGO DA</h4>
          <h1>FORCA</h1>
        </div>
        <button onClick={abrirModal}>⚙️ Configurações</button>
      </header>

      <ConfiguracaoModal abrirModal={modalAberto} fechaModal={fecharModal} />

      <main className="jogo">
        {/* --- TELA INICIAL --- */}
        {estadoJogo === "inicio" && (
          <div className="regras">
            <h2>Bem-vindo ao Jogo da Forca!</h2>
            <p>
              Regras simples:
              <br />- Escolha a dificuldade nas configurações
              <br />- Adivinhe as letras da palavra antes de completar a forca!
              <br />- Você tem 6 tentativas antes de ser enforcado.
            </p>
            <button
              className="btnIniciar"
              onClick={() => sortearPalavra(nivel)}
            >
              🎮 Iniciar Jogo
            </button>
          </div>
        )}

        {/* --- JOGO EM ANDAMENTO / RESULTADOS --- */}
        {estadoJogo !== "inicio" && (
          <>
            <div className="divForcaPalavra">
              <img
                src={imagensForca[erros]}
                alt="Forca"
                className="imagemForca"
              />
              <div className="palavra">{renderPalavra()}</div>
            </div>

            {estadoJogo === "jogando" && (
              <div className="teclado">
                {alfabeto.map((letra) => (
                  <button
                    key={letra}
                    disabled={letrasUsadas.includes(letra)}
                    onClick={() => tentativa(letra)}
                  >
                    {letra}
                  </button>
                ))}
              </div>
            )}

            {estadoJogo === "venceu" && (
              <div className="vitoria">
                Parabéns! Você acertou a palavra <strong>{palavra}</strong>
                <p>Pontuação total: {pontos}</p>
                <button onClick={reiniciar}>Jogar Novamente</button>
              </div>
            )}

            {estadoJogo === "perdeu" && (
              <div className="derrota">
                Você perdeu! A palavra era <strong>{palavra}</strong>
                <p>Pontuação total: {pontos}</p>
                <button onClick={reiniciar}>Tentar Novamente</button>
              </div>
            )}
          </>
        )}
      </main>
      <footer>
        <div className="divFooter">
          <img
            src={logo}
            alt="Logo do jogo da forca"
            onClick={() => window.location.reload()}
          />
          <div>
            <p>IFPE - Tecnologia em Análise e Desenvolvimento de Sistemas.</p>
            <p>Projeto realizado como atividade de Introdução a Programação</p>
            <p>Alunos: Alexandre Alves, Maria Alice Guerra e Rafael Vicente</p>
            <p>Professor: Willbert Santos</p>
          </div>
        </div>
      </footer>
    </>
  );
}
