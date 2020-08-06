import React from 'react';


import whatsappIcon from '../../assets/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherProps {
  teacher: Teacher;
}



const TeacherItem: React.FC<TeacherProps> = ({teacher}) =>{
  async function createNewConnection() {
    await api.post('connections', {
      user_id: teacher.id,
    });
  }
  return  (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name} </strong>
          <span>{teacher.subject} </span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>{teacher.cost}</strong>
        </p>
        <a href={`https://wa.me/${teacher.whatsapp}`} onClick={createNewConnection} target="blank">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>

    </article>
  )
};

export default TeacherItem;