import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

import searchIcon from '../../assets/images/icons/search.svg';

function TeacherList(){
    const [subject, setSubject] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [time, setTime] = useState("");
    const [teachers, setTeachers] = useState([]);

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes',{
            params: {
                subject, 
                week_day, 
                time
            }
        });
        setTeachers(response.data);
    }


    return(
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os Proffys disponíveis.">
               <form id="search-teachers" onSubmit={searchTeachers}>
                   <div className="div-input-sub">
                    <Select 
                            name="subject" 
                            label="Matéria" 
                            value={subject}
                            onChange={(e) => {setSubject(e.target.value);}}
                            options={[
                                { value:'Artes', label:'Artes'},
                                { value:'Biologia', label:'Biologia'},
                                { value:'Ciências', label:'Ciências'},
                                { value:'Educação Física', label:'Educação Física'},
                                { value:'Física', label:'Física'},
                                { value:'Geografia', label:'Geografia'},
                                { value:'História', label:'História'},
                                { value:'Português', label:'Português'},
                                { value:'Matemática', label:'Matemática'},
                            ]}    
                        />
                    </div>
                    <div className="div-input-week">
                        <Select 
                            name="week_day" 
                            label="Dia da Semana"
                            value={week_day}
                            onChange={(e) => {setWeekDay(e.target.value);}} 
                            options={[
                                { value:'0', label:'Domingo'},
                                { value:'1', label:'Segunda Feira'},
                                { value:'2', label:'Terça Feira'},
                                { value:'3', label:'Quarta Feira'},
                                { value:'4', label:'Quinta Feira'},
                                { value:'5', label:'Sexta Feira'},
                                { value:'6', label:'Sábado'},
                            ]}    
                        />
                    </div>
                    <div className="div-input-time">
                        <Input type="time" name="time" label="Hora" value={time} onChange={(e) => {setTime(e.target.value)}} /> 
                    </div>
                    <div className="div-input-search">
                        <button type="submit">
                            <img className="img-search" src={searchIcon} alt="Buscar"/></button>
                    </div>
               </form>
           </PageHeader>

           <main>
               {
                    teachers.map((teacher: Teacher) => {
                        return (<TeacherItem 
                                    key={teacher.id} 
                                    teacher={teacher}
                                />);
                    })
               }
           </main>
        </div>
    )
}

export default TeacherList;