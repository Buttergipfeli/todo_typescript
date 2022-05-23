import { NextPage } from 'next'
import React from 'react';
import styles from '../../styles/Table.module.css';
import { Person } from '../../interfaces/Person';

interface Props {
    persons: Person[];
}

const Table: React.FC<Props> = ({ persons }) => {
    return (
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                    <th>Date of birth</th>
                    <th>Current profession</th>
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                {persons &&
                    persons.map((person: Person, index: number) =>
                        <tr key={index}>
                            <td>{person.firstname}</td>
                            <td>{person.lastname}</td>
                            <td>{person.age}</td>
                            <td>{person.dateOfBirth.toLocaleDateString()}</td>
                            <td>{person.currentProfession}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export { Table };