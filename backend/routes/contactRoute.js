const express = require('express');
const Contact = require('../model/Contact');

const contactRoute = express.Router();

contactRoute.post('/contact-form', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required!' });
        };
        const userEmailExist = await Contact.findOne({ email });
        if (userEmailExist) {
            return res.status(409).json({ message: 'Email already exist!' });
        };
        const userPhoneExist = await Contact.findOne({ phone });
        if (userPhoneExist) {
            return res.status(409).json({ message: 'Phone number already exist!' });
        };

        const saveContact = await Contact.create({ name, email, phone, message });
        return res.status(201).json({
            message: 'Form submited successfully',
            saveContact
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error!' });
    };
});

contactRoute.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error!' });
    };
});

contactRoute.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(400).json({ message: 'Contact not found!' });
        };
        return res.status(200).json({ message: 'Contact has been deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error!' });
    };
});

module.exports = contactRoute;