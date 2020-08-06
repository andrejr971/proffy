import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

const TeacherForm: React.FC = () => { 
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
      {week_day: '', from: '', to: ''},
    ]);

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, {
      week_day: '', from: '', to: ''
    }]);
  }

  function setScheduleItemsValue(position: number, field: string, value: string) {
    const newArray = scheduleItems.map((schedule, index) => {
      if (index === position) {
        return {...schedule, [field]: value}
      }

      return schedule;
    });

    setScheduleItems(newArray);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    
    const data = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }

    api.post('classes', data).then(() => {
      alert('Cadastrado com sucesso');
      history.push('study');
    }).catch(err => console.log(err));
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas" 
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input 
              name="name"
              value={name} 
              onChange={({target}) => setName(target.value)} 
              label="Nome completo" 
              type="text" 
            />
            <Input 
              name="avatar"
              value={avatar} 
              onChange={({target}) => setAvatar(target.value)} 
              label="Avatar" 
              type="text" 
            />
            <Input 
              name="whatsapp"
              value={whatsapp} 
              onChange={({target}) => setWhatsapp(target.value)} 
              label="Whatsapp" 
              type="text" 
            />

            <Textarea 
              name="bio" 
              label="Bio"
              value={bio} 
              onChange={({target}) => setBio(target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sorbe a aula</legend>
            <Select         
              name="subject" 
              label="Matéria"
              options={[
                {id: 1, value: 'Artes', label: 'Artes'},
                {id: 2, value: 'Biologia', label: 'Biologia'},
                {id: 3, value: 'Ciência', label: 'Ciência'},
                {id: 4, value: 'Educação Física', label: 'Educação Física'},
              ]}
              value={subject} 
              onChange={({target}) => setSubject(target.value)}
            />
            <Input 
              name="cost" 
              value={cost} 
              onChange={({target}) => setCost(target.value)}  
              label="Custo da sua hora por aula" 
              type="text" />
          </fieldset>

          <fieldset>
            <legend>Horários disponíveis <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button></legend>

            {scheduleItems.map((schedule, index) => (
              <div key={schedule.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={schedule.week_day}
                  onChange={(e) => setScheduleItemsValue(index, 'week_day', e.target.value)}
                  options={[
                    { id: 1, value: '0', label: 'Domingo' },
                    { id: 2, value: '1', label: 'Segunda-feira' },
                    { id: 3, value: '2', label: 'Terça-feira' },
                    { id: 4, value: '3', label: 'Quarta-feira' },
                    { id: 5, value: '4', label: 'Quinta-feira' },
                    { id: 6, value: '5', label: 'Sexta-feira' },
                    { id: 7, value: '6', label: 'Sábado' },
                  ]}
                />
                <Input name="from" 
                  label="Das" 
                  type="time" 
                  value={schedule.from}
                  onChange={(e) => setScheduleItemsValue(index, 'from', e.target.value)} 
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time" 
                  value={schedule.to}
                  onChange={(e) => setScheduleItemsValue(index, 'to', e.target.value)} 
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>

            <button type="submit">
              Salvar Cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
};

export default TeacherForm;