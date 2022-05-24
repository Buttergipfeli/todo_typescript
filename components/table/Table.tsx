import { NextPage } from 'next'
import React from 'react';
import styles from '../../styles/components/Table.module.css';
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
                {persons.length > 0 &&
                    persons.map((person: Person, index: number) =>
                        <tr key={index}>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.age}</td>
                            <td>{new Date(person.dateOfBirth).toLocaleDateString()}</td>
                            <td>{person.currentProfession}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export { Table };