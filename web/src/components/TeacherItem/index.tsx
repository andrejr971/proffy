import React from 'react';


import whatsappIcon from '../../assets/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => (
  <article className="teacher-item">
    <header>
      <img src="https://avatars0.githubusercontent.com/u/49952031?v=4" alt="André Junior"/>
      <div>
        <strong>André Junior</strong>
        <span>Química</span>
      </div>
    </header>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      <br/>
      Illum nam consequuntur sequi temporibus. Quae, amet maiores. Ab, recusandae sunt dolore non porro quaerat molestiae natus voluptates sit quasi placeat itaque?
    </p>

    <footer>
      <p>
        Preço/hora
        <strong>R$ 80,00</strong>
      </p>
      <button type="button">
        <img src={whatsappIcon} alt="Whatsapp"/>
        Entrar em contato
      </button>
    </footer>

  </article>
  );

export default TeacherItem;