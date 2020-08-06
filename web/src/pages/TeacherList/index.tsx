import React, {useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';



const TeacherList: React.FC = () => { 
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  async function searchTeacher(e: FormEvent) {
    e.preventDefault();

    const {data} = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time
      }
    });

    setTeachers(data);
  }
  

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeacher}>
          <Select
            name="subject"
            label="Matéria"
            options={[
              { id: 1, value: 'Artes', label: 'Artes' },
              { id: 2, value: 'Biologia', label: 'Biologia' },
              { id: 3, value: 'Ciência', label: 'Ciência' },
              { id: 4, value: 'Educação Física', label: 'Educação Física' },
              { id: 5, value: 'Matemática', label: 'Matemática' },
            ]}
            value={subject} 
            onChange={({target}) => setSubject(target.value)} 
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { id: 1, value: '0', label: 'Domingo' },
              { id: 2, value: '1', label: 'Segunda-feira' },
              { id: 3, value: '2', label: 'Terça-feira' },
              { id: 4, value: '3', label: 'Quarta-feira' },
              { id: 5, value: '4', label: 'Quinta-feira' },
              { id: 6, value: '5', label: 'Sexta-feira' },
              { id: 7, value: '6', label: 'Sábado' },
            ]}
            value={weekDay} 
            onChange={({target}) => setWeekDay(target.value)} 
          />
          <Input 
            name="time" 
            label="Hora" 
            type="time" 
            value={time} 
            onChange={({target}) => setTime(target.value)}  
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  )
};

export default TeacherList;
