import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { Table } from '../components/table/Table';
import { InputField } from '../components/inputfield/InputField';
import { Person } from '../interfaces/Person';
import { InputPerson } from '../interfaces/InputPerson';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home: NextPage = () => {

  const [registerPerson, setRegisterPerson] = useState<InputPerson>({
    firstName: '',
    lastName: '',
    age: '',
    dateOfBirth: '',
    currentProfession: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [persons, setPersons] = useState<Person[]>([]);
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setRegisterPerson({ ...registerPerson, [name]: value });
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/persons')
      .then(res => {
        setPersons(res.data.persons);
      });
  }, []);

  const registerHandler = (): void => {
    const { firstName, lastName, age, dateOfBirth, currentProfession } = registerPerson;
    // convert dateOfBirth string to date.
    const dates = dateOfBirth.split('.');
    const dateChecker = new Date(dates[1] + '/' + dates[0] + '/' + dates[2]);
    // small validation
    if (firstName.length === 0 || lastName.length === 0 || currentProfession.length === 0 || age.length === 0) {
      setErrorMessage('All fields must be filled');
      return;
    }
    // check if date is valid
    if (isNaN(dateChecker.getFullYear())) {
      setErrorMessage('Date of birth is not valid');
      return;
    }
    if (isNaN(Number(age))) {
      setErrorMessage('Age must be a number');
      return;
    }
    const newPerson: Person = {
      firstName,
      lastName,
      age: Number(age),
      dateOfBirth: dateChecker,
      currentProfession
    }
    axios.post('http://localhost:3000/api/persons', JSON.stringify(newPerson), { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        setPersons(persons => [...persons, newPerson]);
        setErrorMessage(res.data.message);
        setRegisterPerson({
          firstName: '',
          lastName: '',
          age: '',
          dateOfBirth: '',
          currentProfession: ''
        });
      }, err => {
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to my first TypeScript project</h1>
      <Table persons={persons} />
      <InputField person={registerPerson} inputHandler={inputHandler} registerHandler={registerHandler} errorMessage={errorMessage} />
    </div>
  )
}

export default Home;