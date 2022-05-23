import React from 'react';
import { useState } from 'react';
import styles from '../../styles/components/InputField.module.css';
import { InputPerson } from '../../interfaces/InputPerson';

interface Props {
    person: InputPerson;
    errorMessage: string;
    inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    registerHandler: () => void;
}

const InputField: React.FC<Props> = ({ person, inputHandler, registerHandler, errorMessage }) => {

    return (
        <div className={styles.container}>
            <div className={styles.flexInput}>
                <label className={styles.label}>First name</label>
                <input className={styles.input} placeholder='First name' value={person.firstName} name="firstName" onChange={(event) => inputHandler(event)} type='text' />
            </div>
            <div className={styles.flexInput}>
                <label className={styles.label}>Last name</label>
                <input className={styles.input} placeholder='Last name' value={person.lastName} name="lastName" onChange={(event) => inputHandler(event)} type='text' />
            </div>
            <div className={styles.flexInput}>
                <label className={styles.label}>Age</label>
                <input className={styles.input} placeholder='Age' value={person.age} name="age" onChange={(event) => inputHandler(event)} type='text' />
            </div>
            <div className={styles.flexInput}>
                <label className={styles.label}>Date of birth</label>
                <input className={styles.input} placeholder='dd.mm.yyyy' value={person.dateOfBirth} name="dateOfBirth" onChange={(event) => inputHandler(event)} type='text' />
            </div>
            <div className={styles.flexInput}>
                <label className={styles.label}>Current profession</label>
                <input className={styles.input} placeholder='Current profession' value={person.currentProfession} name="currentProfession" onChange={(event) => inputHandler(event)} type='text' />
            </div>
            <div className={styles.flexButtons}>
                <button className={styles.button} onClick={() => registerHandler()}>Register</button>
            </div>
            {errorMessage &&
                <div className={styles.flexError}>
                    <span
                        className={(errorMessage === 'Successfully registered a new person') ? styles.successMessage : styles.errorMessage}
                    >
                        {errorMessage}
                    </span>
                </div>
            }
        </div>
    )
}

export { InputField };