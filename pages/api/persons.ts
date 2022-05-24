// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import { Person } from '../../interfaces/Person';
const persons: Person[] = require('../../data/persons.json');

type Data = {
    message?: string;
    persons?: Person[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
): void {

    if (req.method === 'GET') {
        res.status(200).json({ persons });
    } else if (req.method === 'POST') {
        const { firstName, lastName, age, dateOfBirth, currentProfession }: Person = req.body;
        // small validation
        if (firstName.length === 0 || lastName.length === 0 || currentProfession.length === 0 || age < 0) {
            res.status(400).json({ message: 'All fields must be filled' });
            return;
        }
        if (typeof dateOfBirth !== 'string') {
            res.status(400).json({ message: 'Date of birth is not valid' });
            return;
        }
        if (isNaN(age)) {
            res.status(400).json({ message: 'Age must be a number' });
            return;
        }
        let person: Person = req.body;
        if (persons.length === 0) {
            person.id = 1;
        } else {
            person.id = Math.max(...persons.map<number>(p => (p.id))) + 1;
        }
        persons.push(person);
        fs.writeFileSync('./data/persons.json', JSON.stringify(persons));
        res.status(200).json({ message: 'Successfully registered a new person' });
    } else if (req.method === 'DELETE') {
        const { id }: { id: number } = req.body;
        const index = persons.findIndex(p => p.id === id);
        if (index === -1) {
            res.status(404).json({ message: 'Person not found' });
            return;
        }
        persons.splice(index, 1);
        fs.writeFileSync('./data/persons.json', JSON.stringify(persons));
        res.status(200).json({ message: 'Successfully deleted the person' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
